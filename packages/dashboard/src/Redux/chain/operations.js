
import {Types as settingTypes} from 'Redux/settings/actions'
import {registerDeps} from 'Redux/DepMiddleware'
import {Creators} from './actions'
import {
    Pipeline, 
    PollingDataSource,
    AddReceiptsHandler,
    EnsureTransactionsHandler
} from 'eth-pipeline';
import ETHHistory from 'eth-history';
import {Logger} from 'buidl-utils';
import Web3 from 'web3';
import {default as storageOps} from 'Redux/storage/operations';
import * as DBNames from 'Redux/storage/DBNames';
import ReduxInjector from 'Redux/common/handlers/ReduxInjector';
import BlockStore from 'Redux/common/handlers/BlockStoreHandler';
import AnalyticsHandler from 'Redux/common/handlers/RootAnalyticsHandler';

const log = new Logger({component: "ChainOps"});

const init = () => async (dispatch, getState) => {
    dispatch(Creators.initStart())
    try {
        let ethProvider = window.ethereum;
        if(!ethProvider && window.web3){
          ethProvider =  window.web.currentProvider;
        }
        if(ethProvider) {
          log.info("Have ethProvider, creating Web3 instance...");
          let web3 = new Web3(ethProvider);

          log.info("Enabling Web3...");
          let acts = await ethProvider.enable();
          if(!acts) {
            log.warn("User rejected web3!");
            //user denied access to app
            dispatch(Creators.accessDenied());
            dispatch(Creators.failure(new Error("User denied access to web3")));
            return;
          }
  
          let network = await web3.eth.net.getNetworkType();
          log.info("Using network", network);
          await dispatch(storageOps.changeNetwork(network));
          //establish the latest block number
          let block = await web3.eth.getBlockNumber();

          log.info("Current block", block);

          let lastBlock = await dispatch(_initBlocks({currentBlock: block, web3}));
          let blocks = getState().chain.blocks;
          //have to sort in ascending order
          blocks = [
              ...blocks
          ];
          blocks.sort((a,b)=>a.timestamp-b.timestamp);
          let settings = getState().settings.params.storage;

          let poller = new PollingDataSource({
              web3,
              interval: 5000,
              lastKnownBlock: lastBlock
          });

          let pl = new Pipeline({
              web3,
              blockSource: poller,
              blocks,
              historyWindowSize: settings.maxBlocks
          });
          pl.use(new EnsureTransactionsHandler());
          pl.use(new AddReceiptsHandler());
          pl.use(new ReduxInjector({dispatch, getState}));
          pl.use(new BlockStore());
          pl.use(new AnalyticsHandler());

          await pl.init();
          dispatch(Creators.initSuccess({
              web3,
              pipeline: pl,
              currentBlock: lastBlock
          }));
        }

    } catch (e) {
        log.error("Problem initializing chain", e);
        dispatch(Creators.failure(e));
    }
}

const startSubscriptions = () => async (dispatch,getState) => {
    let chain = getState().chain;
    let web3 = chain.web3;
    let pl = chain.pipeline;
    await pl.start();
}

const toggleRealtime = () => async (dispatch, getState) => {
    let chain = getState().chain;
    let pl = chain.pipeline;
    let current = chain.realtimeEnabled;
    dispatch(Creators.updateRealtime(!current));
    if(current) {
        //was on, now stop
        await pl.stop();
    } else {
        await pl.start();
    }
}


const _initBlocks = ({web3,currentBlock}) => async (dispatch, getState) => {
    if(!currentBlock) {
        return currentBlock; //nothing to recover
    }

    let settings = getState().settings.params.storage;
    let start = currentBlock?currentBlock-settings.maxBlocks:1;
    if(start < 0) {
        start = 1;
    }
    let end = currentBlock?currentBlock:start+settings.maxBlocks;
    let span = (end - start)+1; //end is inclusive

    let r = await getState().storage.instance.readAll({
        database: DBNames.Blocks,
        limit: settings.maxBlocks,
        sort: [
            {
                field: "number",
                order: "DESC"
            }
        ]
    });
    if(r.length > 0) {
        dispatch(Creators.updateBlocks(r));
        return r[0].number;
    }

    //need to recover blocks. Using eth history utility even though not dealing with contract 
    let sync = new ETHHistory({
        web3,
        abi: [{
            name: "mock"
        }],
        targetAddress: "0x0" //not needed for blocks
    });
    let highestBlock = 0;
    let blocks = [];
    let count = 0;
    await sync.recoverBlocks({
        fromBlock: start,
        toBlock: end,
        includeReceipts: false,
        maxRetries: 5,
        concurrency: 4
    }, async (e, b)=>{
        if(e) {
            log.error("Problem recovering blocks", e);
        } else if(b) {
            ++count;
            dispatch(Creators.updateRecoveryProgress({progress: count, total: span}));
            blocks.push(b);
            if(b.number > highestBlock) {
                highestBlock = b.number;
            }
        }
    });
    if(blocks.length > 0) {
        //pull txns for first block 
        blocks.sort((a,b)=>b.timestamp-a.timestamp);
        let ctx = {
            web3
        };
        let solo = new AddReceiptsHandler();
        let updated = [
            ...blocks
        ];
        dispatch(Creators.updateRecoveryProgress({progress: 0, total: 1, message: "Getting transactions for block: " + updated[0].number}));
        await solo.newBlock(ctx, updated[0], ()=>{});
        dispatch(Creators.updateBlocks(updated));
        dispatch(Creators.updateRecoveryProgress({progress: 1, total: 1}));
    }

    return highestBlock;
}


export default {
    init,
    startSubscriptions,
    toggleRealtime
}

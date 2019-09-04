import {Handler} from 'eth-pipeline';
import {Logger} from 'buidl-utils';
import * as DBNames from 'Redux/storage/DBNames';
import {Creators} from 'Redux/chain/actions';

const log = new Logger({component: "BlockStoreHandler"});

export default class BlockStore extends Handler {
    constructor(props) {
        super({name: "BlockStoreHandler"});
        
        [
            'newBlock',
            'purgeBlock'
        ].forEach(fn=>this[fn]=this[fn].bind(this));
    }

    async newBlock(ctx, block, next) {
        let storage = ctx.getState().storage.instance;
        await storage.create({
            database: DBNames.Blocks,
            key: ""+block.number,
            data: block
        });
        let settings = ctx.getState().settings.params.storage;
        ctx.dispatch(Creators.addBlock(block, settings.maxBlocks));
        return next();
    }

    async purgeBlock(ctx, block, next) {
        log.info("Removing block", block.number);
        let storage = ctx.getState().storage.instance;
        await storage.remove({
            database: DBNames.Blocks,
            key: ""+block.number
        });
        ctx.dispatch(Creators.removeBlock(block));
        return next();
    }
}
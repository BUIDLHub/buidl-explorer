import {Types} from './actions'
import {createReducer} from 'reduxsauce'

const INIT = {
    loading: false,
    error: null,
    web3: null,
    recoveryProgress: {
        total: 0,
        progress: 0,
        startBlock: 0,
        endBlock: 0
    },
    currentBlock: 0,
    pipeline: null,
    web3Enabled: false,
    blocks: [],
    transactions: [],
    realtimeEnabled: true
}

const start = (state=INIT) => {
    return {
        ...state, 
        loading: true, 
        error: null
    }
}

const done = (state=INIT, action) => {
    return {
        ...state,
        loading: false, 
        web3: action.props.web3,
        web3Enabled: true,
        pipeline: action.props.pipeline,
        currentBlock: action.props.currentBlock
    }
}


const fail = (state=INIT, action) => {
    return {
        ...state, 
        loading: false,
        error: action.error
    }
}

const addBlock = (state=INIT, action) => {

    let blocks = state.blocks.reduce((o, b)=>{
        o[b.number] = b;
        return o;
    },{});
    blocks[action.block.number] = action.block;
    blocks = Object.keys(blocks).map(b=>blocks[b]);
    
    blocks.sort((a,b)=>b.timestamp-a.timestamp);
    if(blocks.length > action.maxAllowed) {
        
        blocks = blocks.slice(0, action.maxAllowed);
    }
    let txns = blocks.reduce((a,b)=>{
        return [
            ...a,
            ...b.transactions 
        ]
    }, []);
    return {
        ...state,
        blocks,
        transactions: txns,
        currentBlock: action.block.number
    }
}

const removeBlock = (state=INIT, action) => {
    let txns = [];
    let blocks = state.blocks.filter(b=>{
        if(b.number!==action.block.number) {
            txns = [
                ...txns,
                ...b.transactions
            ];
            return true;
        }
        return false;
    });
    blocks.sort((a,b)=>{
        return b.timestamp - a.timestamp;
    })
    return {
        ...state,
        blocks,
        transactions: txns,
        currentBlock: blocks[0].number
    }
}

const updateBlocks = (state=INIT, action) => {
    let blocks = [
        ...action.blocks
    ];
    blocks.sort((a,b)=>b.timestamp-a.timestamp);
    let txns = blocks.reduce((a, b)=>{
        return [
            ...a,
            ...b.transactions
        ]
    }, []);
    return {
        ...state,
        blocks,
        transactions: txns,
        currentBlock: blocks[0].number
    }
}

const updateRT = (state=INIT, action) => {
    return {
        ...state,
        realtimeEnabled: action.running
    }
}

const updateProgress = (state=INIT, action) => {
    
    return {
        ...state,
        recoveryProgress: action.progress
    }
}

const denied = (state=INIT) => {
    return {
        ...state,
        web3Enabled: false
    }
}

const HANDLERS = {
    [Types.INIT_START]: start,
    [Types.INIT_SUCCESS]: done, 
    [Types.FAILURE]: fail,
    [Types.ACCESS_DENIED]: denied,
    [Types.UPDATE_BLOCKS]: updateBlocks,
    [Types.ADD_BLOCK]: addBlock,
    [Types.REMOVE_BLOCK]: removeBlock,
    [Types.UPDATE_REALTIME]: updateRT,
    [Types.UPDATE_RECOVERY_PROGRESS]: updateProgress
}

export default createReducer(INIT, HANDLERS);
import {connect} from 'react-redux';
import Analytics from './Analytics';

const s2p = state => {
    let blocks = state.chain.blocks;
    
    let range = {
        toBlock: 0,
        fromBlock: 0
    };
    if(blocks.length > 0) {
        range.toBlock = blocks[0].number;
        range.fromBlock = blocks[blocks.length-1].number;
    }
    let latest = blocks[0] || {number: 0}
    let analytics = state.analytics;
    let fails = analytics.data._failures || {total: 0};
    let gas = analytics.data._globalGasUsed || {total: 0};
    let txns = analytics.data._globalTxnCount || {total: 0}

    return {
        metrics: {
            blockRange: range,
            latestBlock: latest.number,
            latestMineTime: '0s',
            txnCount: txns.total,
            txnRate: 0,
            gasConsumed: gas.total,
            gasAverage: 0,
            failCount: fails.total,
            failGas: 0
        }
    }
}

const d2p = dispatch => {
    return {

    }
}

export default connect(s2p, d2p)(Analytics);
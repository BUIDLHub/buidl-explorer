import {connect} from 'react-redux';
import List from './BlockList';

const s2p = state => {
    let an = state.analytics || {};
    an = an.data._blockStats || {};

    let blocks = state.chain.blocks.map(b=>{
        let a = an[b.number] || {
            contractCalls: 0,
            valueXfers: 0
        };
        return {
            ...b,
            stats: a
        }
    });
    //show latest 10 blocks 
    blocks = blocks.slice(0, 10);

    return {
        blocks
    }
}

const d2p = dispatch => {
    return {

    }
}
export default connect(s2p, d2p)(List)
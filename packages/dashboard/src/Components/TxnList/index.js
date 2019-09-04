import {connect} from 'react-redux';
import List from './TxnList'

const s2p = state => {
    let txns = state.chain.transactions || [];
    if(txns.length > 10) {
        txns = txns.slice(0, 10);
    }
    return {
        txns
    }
}

const d2p = dispatch => {
    return {

    }
}
export default connect(s2p, d2p)(List)
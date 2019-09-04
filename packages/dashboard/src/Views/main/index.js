import {connect} from 'react-redux'
import Main from './Main'
import {default as ops} from 'Redux/chain/operations';

const s2p = state => {
    return {
        recoveryProgress: state.chain.recoveryProgress,
        realtimeEnabled: state.chain.realtimeEnabled
    }
}

const d2p = dispatch => {
    return {
        toggleWeb3: () => dispatch(ops.toggleSubscriptions())
    }
}

export default connect(s2p, d2p)(Main)
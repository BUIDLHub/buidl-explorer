import {connect} from 'react-redux'
import Recovery from './Recovery'

const s2p = state => {
    return {
        progress: state.chain.recoveryProgress
    }
}

const d2p = dispatch => {
    return {

    }
}

export default connect(s2p, d2p)(Recovery)
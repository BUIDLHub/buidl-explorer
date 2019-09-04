import {connect} from 'react-redux';
import Nav from './Nav';
import {withRouter} from 'react-router-dom';
import {default as chainOps} from 'Redux/chain/operations';

const s2p = state => {
    return  {
        web3Running: state.chain.realtimeEnabled
    }
}

const d2p = dispatch => {
    return {
        goHome: () => {

        },
        toggleNetwork: () => {
            dispatch(chainOps.toggleRealtime())
        },
        toSettings: () => {

        },

    }
}

export default withRouter(connect(s2p, d2p)(Nav))
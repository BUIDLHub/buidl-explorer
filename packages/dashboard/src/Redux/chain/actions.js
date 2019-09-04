import {createActions} from 'reduxsauce'

const {Types, Creators} = createActions({
    initStart: null,
    initSuccess: ['props'],
    failure: ['error'],
    accessDenied: [],
    updateRecoveryProgress: ['progress', 'total'],
    updateRealtime: ['running'],
    updateBlocks: ['blocks'],
    addBlock: ['block', 'maxAllowed'],
    removeBlock: ['block']
}, {prefix: "chain."});
export {
    Types, Creators
}
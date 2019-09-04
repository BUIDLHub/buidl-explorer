import {createActions} from 'reduxsauce';

const {
  Types,Creators
} = createActions({
  initStart: null,
  initSuccess: ['pipeline'],
  updateData: ['data'],
  failure: ['error']
}, {prefix: "analytics."});

export {
  Types,
  Creators
}
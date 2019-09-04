import {Types} from './actions';
import {createReducer} from 'reduxsauce';

const INIT = {
  loading: false,
  data: {},
  error: null
}

const start = (state=INIT) => {
  return {
    ...state,
    loading: true,
    error: null
  }
}

const success = (state=INIT, action) => {
  return {
    ...state,
    loading: false,
    pipeline: action.pipeline
  }
}

const fail = (state=INIT, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  }
}

const update = (state=INIT, action) => {
    return {
        ...state,
        data: action.data
    }
}

const HANDLERS = {
  [Types.INIT_START]: start,
  [Types.INIT_SUCCESS]: success,
  [Types.UPDATE_DATA]: update,
  [Types.FAILURE]: fail
}

export default createReducer(INIT, HANDLERS);

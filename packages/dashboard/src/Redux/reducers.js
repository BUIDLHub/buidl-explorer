import { combineReducers } from 'redux';
import {default as init} from './init/reducers'
import {reducer as toastrReducer} from 'react-redux-toastr'
import {default as settings} from './settings/reducers'
import {default as chain} from './chain/reducers'
import {default as analytics} from './analytics/reducers';
import {default as storage} from './storage/reducers';

/**
 * Collection of all dashboard state tree reducers
 */
export default combineReducers({
  toastr: toastrReducer,
  init,
  settings,
  chain,
  analytics,
  storage
});

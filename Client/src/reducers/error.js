import {RESET_ERROR, SET_ERROR} from '../actions/error';
/**
 * logger middleware to check every action and its affect on update the store.
 * @param {object} state state object of error
 * @param {object} action contains action to execute (none async)
 * @return {object} the new state value
 */
export default function error(state=false, action) {
  switch (action.type) {
    case RESET_ERROR:
      return false;
    case SET_ERROR:
      return true;
    default:
      return state;
  }
}

import {STORE_APOLLO_CLIENT} from '../actions/apolloClient';
/**
 * logger middleware to check every action and its affect on update the store.
 * @param {object} state state object of apolloClient
 * @param {object} action contains action to execute (none async)
 * @return {object} the new state value
 */
export default function apolloClient(state={}, action) {
  switch (action.type) {
    case STORE_APOLLO_CLIENT:
      return action.client;
    default:
      return state;
  }
}

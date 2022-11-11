import {CHANGE_CURRENCY} from '../actions/currency';
/**
 * logger middleware to check every action and its affect on update the store.
 * @param {object} state state object of currency
 * @param {object} action contains action to execute (none async)
 * @return {object} the new state value
 */
export default function currency(state={index: 0, label: 'USD', symbol: '$'}, action) {
  switch (action.type) {
    case CHANGE_CURRENCY:
      return {
        ...action.currency,
      };
    default:
      return state;
  }
}

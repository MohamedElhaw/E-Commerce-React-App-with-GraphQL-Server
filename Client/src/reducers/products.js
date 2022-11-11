import {ADD_PRODUCT} from '../actions/product';
/**
 * logger middleware to check every action and its affect on update the store.
 * @param {object} state state object of products
 * @param {object} action contains action to execute (none async)
 * @return {object} the new state value
 */
export default function products(state={}, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        [action.id]: {
          ...action.product,
        },
      };
    default:
      return state;
  }
}

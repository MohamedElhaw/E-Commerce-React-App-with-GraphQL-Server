import {LOAD_CATEGORY} from '../actions/category';
/**
 * logger middleware to check every action and its affect on update the store.
 * @param {object} state state object of categories
 * @param {object} action contains action to execute (none async)
 * @return {object} the new state value
 */
export default function categories(state={}, action) {
  switch (action.type) {
    case LOAD_CATEGORY:
      return {
        ...state,
        [action.data.name]: {
          products: action.data.products,
        },
      };
    default:
      return state;
  }
}

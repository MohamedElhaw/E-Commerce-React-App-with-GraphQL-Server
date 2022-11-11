import {ADD_TO_CART, INCREMENT_QUANTITY, DECREMENT_QUANTITY} from '../actions/cart';
/**
 * logger middleware to check every action and its affect on update the store.
 * @param {object} state state object of cart
 * @param {object} action contains action to execute (none async)
 * @return {object} the new state value
 */
export default function addToCart(state={}, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        [action.cartItem.id]: {
          ...action.cartItem,
          'product': {
            ...action.cartItem.product,
            'selectedAttributes': {
              ...action.cartItem.product.selectedAttributes,
            },
          },
        },
      };
    case INCREMENT_QUANTITY:
      return {
        ...state,
        [action.cartItemId]: {
          ...state[action.cartItemId],
          'product': {
            ...state[action.cartItemId].product,
            quantity: state[action.cartItemId].product.quantity+=1,
          },
        },
      };
    case DECREMENT_QUANTITY:
      return state[action.cartItemId].product.quantity===1?state:
                    {
                      ...state,
                      [action.cartItemId]: {
                        ...state[action.cartItemId],
                        'product': {
                          ...state[action.cartItemId].product,
                          quantity: state[action.cartItemId].product.quantity-=1,
                        },
                      },
                    };
    default:
      return state;
  }
}

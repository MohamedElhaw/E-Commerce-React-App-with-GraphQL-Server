// Declare action type variables
export const ADD_TO_CART = 'ADD_TO_CART';
export const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
export const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY';

/**
 * Action creator.
 * @param {object} cartItem cartItem object that will add
 * @return {object} action with type ADD_TO_CART and payload (cartItem)
 */
export const addToCart = (cartItem) => {
  return {
    type: ADD_TO_CART,
    cartItem,
  };
};

/**
 * Action creator.
 * @param {object} cartItemId id of the cartItem
 * @return {object} action with type INCREMENT_QUANTITY and payload (cartItemId)
 */
export const incrementQuantity = (cartItemId) => {
  return {
    type: INCREMENT_QUANTITY,
    cartItemId,
  };
};

/**
 * Action creator.
 * @param {object} cartItemId id of the cartItem
 * @return {object} action with type DECREMENT_QUANTITY and payload (cartItemId)
 */
export const decrementQuantity = (cartItemId) => {
  return {
    type: DECREMENT_QUANTITY,
    cartItemId,
  };
};

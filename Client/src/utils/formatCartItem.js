/**
 * function to generate random strings
 * @return {string} string id
 */
const generateID=()=> {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

/**
 * format cart Item object
 * @param {string} productId state object of currency
 * @param {object} prices contains prices of the product
 * @param {object} selectedAttributes conatins selected attributes of the cartItem
 * @return {object} formated cart item
 */
const formatCartItem= (productId, prices, selectedAttributes)=>{
  return {
    id: generateID(), // used to deal with each cart item object
    timeStamp: Date.now(), // used to sort items by creation time
    product: {
      id: productId,
      prices,
      selectedAttributes,
      quantity: 1,
    },
  };
};

export default formatCartItem;

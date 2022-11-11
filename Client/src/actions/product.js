import {gql} from '@apollo/client';
import {setError, resetError} from './error';

// Declare action type variable
export const ADD_PRODUCT='ADD_PRODUCT';

/**
 * Action creator.
 * @param {string} id product id
 * @param {object} product product object
 * @return {object} action with type ADD_PRODUCT and payload (id , product)
 */
export const addProduct=(id, product)=>{
  return {
    type: ADD_PRODUCT,
    id,
    product,
  };
};
export const productData=`id,
  name,
  inStock,
  gallery,
  description,
  attributes{
    id,
    name,
    type,
    items{
      displayValue,
      value,
      id
    }
  },
  prices{
    currency{
      symbol
    },
    amount
  },
  brand`;
/**
 * Load produc query.
 * @param {string} id product id
 * @return {string} query string
 */
export const loadProductQuery=(id)=>{
  return (
    `product(id:"${id}"){
      ${productData}
    }`
  );
};

/**
 * Get product data from api.
 * @param {object} client client object
 * @param {string} id product id
 * @return {Function} dispatch to dispatch data to the store
 */
export const handleLoadProduct=(client, id)=>{
  return async (dispatch)=>{
    let result;
    try {
      result =await client.query({
        query: gql`
                query{
                    ${loadProductQuery(id)}
                }`,
      });
      dispatch(addProduct(id, result.data.product));
      // reset error
      dispatch(resetError());
    } catch (error) {
      console.log('Load product error: ', error );
      // show 404 page
      dispatch(setError());
    }
  };
};

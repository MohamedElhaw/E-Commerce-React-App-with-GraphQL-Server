import {loadCurrenciesQuery} from './currency';
import {loadCategoryQuery} from './category';
import {loadProductQuery} from './product';
import {gql} from '@apollo/client';
import {resetError, setError} from './error';
import {loadCategory} from './category';
import {addProduct} from './product';

/**
 * load navbar and category at one queryr.
 * @param {object} client client object
 * @param {object} category category object
 * @return {Function} dispatch to dispatch data to the store
 */
export const loadNavbarAndCategory =(client, category)=>{
  return async (dispatch)=>{
    let result;
    try {
      result= await client.query({
        query: gql`
          query{
              ${loadCurrenciesQuery()}${loadCategoryQuery(category)}
          }`,
      });
      dispatch(loadCategory(result.data.category));
      // reset error
      dispatch(resetError());
      return result;
    } catch (error) {
      console.log('Load currencies and category error: ', error);
      // show 404 page
      dispatch(setError());
    }
  };
};

/**
 * load navbar and product at one query.
 * @param {object} client client object
 * @param {string} id product id
 * @return {Function} dispatch to dispatch data to the store
 */
export const loadNavbarAndProduct =(client, id)=>{
  return async (dispatch)=>{
    let result;
    try {
      result= await client.query({
        query: gql`
                query{
                    ${loadCurrenciesQuery()}${loadProductQuery(id)}
                }`,
      });
      dispatch(addProduct(id, result.data.product));
      // reset error
      dispatch(resetError());
      return result;
    } catch (error) {
      console.log('Load currencies and product error: ', error);
      // show 404 page
      dispatch(setError());
    }
  };
};

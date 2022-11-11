import {gql} from '@apollo/client';
import {setError, resetError} from './error';
import {productData} from './product';

// Declare action type variable
export const LOAD_CATEGORY='LOAD_CATEGORY';

/**
 * load category queryr.
 * @param {object} category category that need to load
 * @return {string} query string
 */
export const loadCategoryQuery=(category)=>{
  return (
    `category(input:{title:"${category}"}){
      name,
      products{
        ${productData}
      }
    }`
  );
};
/**
 * Action creator.
 * @param {object} data returned data from server
 * @return {object} action with type LOAD_CATEGORY and payload (data)
 */
export const loadCategory=(data)=>{
  return {
    type: LOAD_CATEGORY,
    data,
  };
};
/**
 * async action to fetch data from server.
 * @param {object} client client object
 * @param {object} category category object
 * @return {Function} dispatch to dispatch data to the store
 */
export const handleLoadCategory=(client, category)=>{
  return async (dispatch)=>{
    let result;
    try {
      result= await client.query({
        query: gql`
          query{
              ${loadCategoryQuery(category)}
          }`,
      });
      dispatch(loadCategory(result.data.category));
      dispatch(resetError());// reset error
    } catch (error) {
      console.log('Load category error: ', error);
      dispatch(setError());// show 404 page
    }
  };
};

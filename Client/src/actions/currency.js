import {gql} from '@apollo/client';
import {setError, resetError} from '../actions/error';

// Declare action type variables
export const CHANGE_CURRENCY='CHANGE_CURRENCY';
export const SET_CURRENCY_LOADED='SET_CURRENCY_LOADED';
export const RESET_CURRENCY_LOADED='RESET_CURRENCY_LOADED';

/**
 * Action creator.
 * @param {object} currency
 * @return {object} action with type CHANGE_CURRENCY and payload (currency)
 */
export const changeCurrency=(currency)=>{
  return {
    type: CHANGE_CURRENCY,
    currency,
  };
};

/**
 * load currencies query.
 * @return {string} query string
 */
export const loadCurrenciesQuery=()=>{
  return (`
    currencies{
        label,
        symbol,
    } `
  );
};

/**
 * load currencies from api
 * @param {object} client client object
 * @return {Function} dispatch to dispatch data to the store
 */
export const loadCurrencies= (client)=>{
  return async (dispatch)=>{
    let result;
    try {
      result= await client.query({
        query: gql`
          query{
              ${loadCurrenciesQuery()}
          }`,
      });
      // reset error
      dispatch(resetError());
      return result.data;
    } catch (error) {
      console.log('Load currency error: ', error);
      // show 404 page
      dispatch(setError());
    }
  };
};

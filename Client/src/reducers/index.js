import {combineReducers} from 'redux';
import apolloClient from './apolloClient';
import categories from './categories';
import products from './products';
import error from './error';
import currency from './currency';
import cart from './cart';

export default combineReducers({
  apolloClient,
  categories,
  products,
  currency,
  cart,
  error,
});

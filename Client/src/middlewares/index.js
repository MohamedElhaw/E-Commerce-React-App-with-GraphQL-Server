import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from './logger';

// Combine the middlewares
export default applyMiddleware(
    thunk,
    logger,
);

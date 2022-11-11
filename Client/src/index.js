import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App';
import reducer from './reducers';
import middleware from './middlewares';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

// create store
const store=createStore(reducer, middleware);

// create apollo client
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});


ReactDOM.render(
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App client={client}/>
      </ApolloProvider>
    </Provider>,
    document.getElementById('root'),
);

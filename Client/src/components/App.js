import React, {Component} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {connect} from 'react-redux';
import Loading from './Loading';
import Navbar from './Navbar';
import Product from './Product';
import Cart from './Cart';
import NotFound from './NotFound';
import {loadNavbarAndCategory} from '../actions/combineQueries';
import {loadNavbarAndProduct} from '../actions/combineQueries';
import Category from './Category';
import {storeApolloClient} from '../actions/apolloClient';
import {setError} from '../actions/error';
import PropTypes from 'prop-types';

class App extends Component {
  state={
    currencies: [],
  };

  async componentDidMount() {
    const {dispatch, client}=this.props;
    // add apollo client to the store to use it in any component
    dispatch(storeApolloClient(client));
    // get the URL the user used it when load the app
    const path = window.location.pathname;
    let result;
    if (path === '/' || path==='/clothes' || path==='/tech') {
      // get the category name from path
      const category=path.slice(1)?path.slice(1):'all';
      // load the navbar and catehory depend on the URL the user used
      result=await dispatch(loadNavbarAndCategory(client, category));
    } else if (path.includes('/product')) {
      // get the product id from the path to load it
      const id=path.slice(9);
      // load the navbar and product depend on the URL the user used
      result=await dispatch(loadNavbarAndProduct(client, id));
    } else if (path==='/cart') {
      if (this.state.currencies.length===0) {
        // load all category and navbar if user use cart path
        result=await dispatch(loadNavbarAndCategory(client, 'all'));
      }
    } else {
      // set error of other paths used to show undefind page
      dispatch(setError());
      return;
    }
    // set the state with the currencies return from api
    result&&this.setState({currencies: result['data'].currencies});
  }

  render() {
    const {error}=this.props;
    const {currencies}=this.state;
    if (currencies.length===0&&!error) {
      return <Loading/>;
    } else if (error) {
      return <NotFound/>;
    }
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar currencies={currencies}/>
          <Routes>
            <Route exact path="/" element={<Category name={'all'} header={'All'}/>}/>
            <Route path="/clothes" element={<Category name={'clothes'} header={'Clothes'}/>}/>
            <Route path="/tech" element={<Category name={'tech'} header={'Technologies'}/>}/>
            <Route path="/product/:id" element={<Product/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/:dynPath" element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(({error})=>({error}))(App);

App.propTypes={
  dispatch: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
  error: PropTypes.bool.isRequired,
};

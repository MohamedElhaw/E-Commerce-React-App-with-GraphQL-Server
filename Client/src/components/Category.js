import React, {Component} from 'react';
import {connect} from 'react-redux';
import {handleLoadCategory} from '../actions/category';
import ProductCard from './ProductCard';
import Loading from './Loading';
import NotFound from './NotFound';
import Pagination from './Pagination';
import PropTypes from 'prop-types';
import './Category.scss';

class Category extends Component {
  state={
    currentPage: 1,
    noOfItemsPerPage: 10,
  };

  /* if the component was first load (componentDidMount), so to dispatch action to load data from api
    else if the component was already loaded before by either all, clothes or tech,
    so to update category component if name props is changed */
  async componentDidMount() {
    const {dispatch, client, name, products}=this.props;
    !products&&await dispatch(handleLoadCategory(client, name));
  }
  async componentDidUpdate() {
    const {dispatch, client, name, products}=this.props;
    !products&&await dispatch(handleLoadCategory(client, name));
  }
  // set current page to slice the mapping array on the page
  setCurrentPage=(e, noOfPages)=>{
    let {currentPage}=this.state;
    if (e.target.name==='previous'&& currentPage!==1) {
      currentPage-=1;
    } else if (e.target.name==='next'&& currentPage!==noOfPages) {
      currentPage+=1;
    }
    this.setState({currentPage});
  };
  // control and set item per page
  handleChangeNoOfItemsPerPage=(e)=>{
    let {noOfItemsPerPage}=this.state;
    noOfItemsPerPage =e.target.value<=0?1:e.target.value; // prevent 0 or negative numbers
    this.setState({noOfItemsPerPage});
  };

  // Show productCards on DOM and apply pagination
  showProductCards=()=>{
    const {products}=this.props;
    const {currentPage, noOfItemsPerPage}=this.state;
    // Declare variables for pagination
    const indexOfLastItem=currentPage*noOfItemsPerPage;
    const indexOfFirsrItem=indexOfLastItem-noOfItemsPerPage;
    return (
      products.slice(indexOfFirsrItem, indexOfLastItem).map((product)=><ProductCard key={product.id} product={product}/>)
    );
  };

  render() {
    const {products, error}=this.props;
    if (!products) {
      return <Loading/>;
    } else if (error) {
      return <NotFound/>;
    }
    const {currentPage, noOfItemsPerPage}=this.state;
    const noOfitems=products.length;
    const noOfPages= Math.ceil(noOfitems/noOfItemsPerPage);
    return (
      <section className="category">
        <h2>{this.props.header}</h2>
        <div className="items-per-page">
          <label htmlFor="category-items-per-page">Items per page:</label>
          <input id="category-items-per-page" type="number" min="1" max="1000"value={this.state.noOfItemsPerPage}
            onChange={(e)=>this.handleChangeNoOfItemsPerPage(e)}/>
        </div>
        <div className="product-cards-container">
          {this.showProductCards()}
        </div>
        <Pagination setCurrentPage={this.setCurrentPage} currentPage={currentPage} noOfPages={noOfPages}/>
      </section>
    );
  }
}

export default connect(({apolloClient, categories, error}, {name, header})=>{
  const products=categories[name]?categories[name].products:null;
  return {
    client: apolloClient,
    products,
    name,
    header,
    error,
  };
})(Category);

Category.propTypes={
  dispatch: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
  products: PropTypes.array,
  name: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
};

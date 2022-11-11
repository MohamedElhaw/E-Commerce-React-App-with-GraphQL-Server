import React, {Component} from 'react';
import {connect} from 'react-redux';
import CartCard from './CartCard';
import Pagination from './Pagination';
import PropTypes from 'prop-types';
import './Cart.scss';

class Cart extends Component {
  state={
    currentPage: 1,
    noOfItemsPerPage: 10,
  };

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
    // prevent 0 or negative numbers
    noOfItemsPerPage =e.target.value<=0?1:e.target.value;
    this.setState({noOfItemsPerPage});
  };

  /**
 * Show cart Items on DOM with pagination
    // 1. sort by timestamp(new is first)
    // 2. slice the array to show two items per page
    // 3. map to return CartCard component with each cartItem
 * @return {array} Array of CartCard component with each cartItem
 */
  showCartItems=()=>{
    const {cartItems}=this.props;
    // Declare variables for pagination
    const {currentPage, noOfItemsPerPage}=this.state;
    const indexOfLastItem=currentPage*noOfItemsPerPage;
    const indexOfFirsrItem=indexOfLastItem-noOfItemsPerPage;
    return (
      cartItems.sort((a, b)=>b.timeStamp-a.timeStamp).slice(indexOfFirsrItem, indexOfLastItem).map((cartItem, index)=><CartCard
        key={index} cartItem={cartItem} miniCart={false}/>)
    );
  };

  render() {
    const {empty, cartItems}=this.props;
    const {currentPage, noOfItemsPerPage} =this.state;
    const noOfitems=cartItems.length;
    const noOfPages= Math.ceil(noOfitems/noOfItemsPerPage);
    return (
      <div className="cart-container">
        <h2>Cart</h2>
        {empty?
          <div>Cart is empty</div>:
          <div className="cart-contents">
            <div className="items-per-page">
              <label htmlFor="cart-items-per-page">Items per page:</label>
              <input id="cart-items-per-page" type="number" min="1" max="1000"value={this.state.noOfItemsPerPage}
                onChange={(e)=>this.handleChangeNoOfItemsPerPage(e)}/>
            </div>
            <ul className="cart-card-list">
              {this.showCartItems()}
            </ul>
            <Pagination setCurrentPage={this.setCurrentPage} currentPage={currentPage} noOfPages={noOfPages}/>
          </div>
        }
      </div>
    );
  }
}

export default connect(({cart, products, currency})=>{
  const cartItems=Object.keys(cart).map((cartId)=>cart[cartId]);
  const empty=cartItems.length===0? true:false;
  return {
    cart,
    empty,
    cartItems,
    products,
    currency,
  };
})(Cart);

Cart.propTypes={
  cart: PropTypes.object.isRequired,
  empty: PropTypes.bool.isRequired,
  cartItems: PropTypes.array.isRequired,
  products: PropTypes.object.isRequired,
  currency: PropTypes.object.isRequired,
};

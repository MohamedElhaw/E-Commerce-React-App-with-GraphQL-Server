import React, {Component} from 'react';
import {connect} from 'react-redux';
import CartCard from './CartCard';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import './MiniCart.scss';


class MiniCart extends Component {
  /**
    * calculate price of all cart items
      1. get array with all cartItems price x quantity
      2. make the sum of this array and return it with two decimal numbers.
    * @return {array} Array of CartCard component with each cartItem
  */
  totalCartPrice=()=>{
    const {cartItems, currency}=this.props;
    return (cartItems.map((cartItem)=> cartItem.product.prices[currency.index].amount*cartItem.product.quantity)
        .reduce((prev, curr)=>prev+curr)).toFixed(2);
  };

  /**
    * Show miniCart Items on DOM
      1. sort by timestamp(new is first)
      2. map to return CartCard component with each cartItem
    * @return {array} Array of CartCard component with each cartItem
  */
  showMiniCartItems=()=>{
    const {cartItems}=this.props;
    return (
      cartItems.sort((a, b)=>b.timeStamp-a.timeStamp).map((cartItem, index)=><CartCard key={index} cartItem={cartItem} miniCart={true}/>)
    );
  };

  render() {
    const {empty, currency, noOfItems}=this.props;
    return (
      <div className="mini-cart-container">
        {empty?
        <h3 className="mini-cart-empty">Cart is empty</h3>:
        <div className="mini-cart-content">
          <h3>
            My Bag, {noOfItems} {noOfItems>1?`items`:`item`}
          </h3>
          <ul className="mini-cart-card-list">
            {this.showMiniCartItems()}
          </ul>
          <div className="total-cart-price">
            <div>Total</div>
            <div>
              {currency.symbol}{this.totalCartPrice()}
            </div>
          </div>
          <div onClick={this.props.miniCartDisplayToggle} className="bag-checkout">
            <NavLink to="/cart" className="view-bag">VIEW BAG</NavLink>
            <button className="check-out">CHECK OUT</button>
          </div>
        </div>
        }
      </div>
    );
  }
}

export default connect(({cart, currency})=>{
  const cartItems=Object.keys(cart).map((cartId)=>cart[cartId]);
  const empty=cartItems.length===0? true:false;
  const noOfItems=cartItems.length;
  return {
    empty,
    cartItems,
    currency,
    noOfItems,
  };
})(MiniCart);

MiniCart.propTypes={
  empty: PropTypes.bool.isRequired,
  cartItems: PropTypes.array.isRequired,
  currency: PropTypes.object.isRequired,
  miniCartDisplayToggle: PropTypes.func.isRequired,
  noOfItems: PropTypes.number.isRequired,
};

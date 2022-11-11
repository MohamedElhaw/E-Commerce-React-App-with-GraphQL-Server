import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import formatCartItem from '../utils/formatCartItem';
import {addToCart} from '../actions/cart';
import PropTypes from 'prop-types';
import './ProductCard.scss';
import {addProduct} from '../actions/product';

class ProductCard extends Component {
  addToCart=(e)=>{
    e.preventDefault();
    e.stopPropagation();
    const {attributes, inStock}=this.props.product;
    if (attributes.length===0&&inStock) {
      const {dispatch, product}=this.props;
      const {id, prices}=product;
      dispatch(addProduct(id, product));
      const cartItem=formatCartItem(id, prices, {});
      dispatch(addToCart(cartItem));
    } else if (attributes.length!==0&&inStock) {
      alert('Please select product attributes from product page before adding to cart.');
    } else if (!inStock) {
      alert('Sorry, this product now is out of stock. Please recheck it later');
    }
  };

  render() {
    const {id, name, inStock, gallery, prices}=this.props.product;
    const {currencyIndex}=this.props;
    return (
      <div className="card-container">
        <NavLink to={`/product/${id}`}>
          <div className="img-container">
            <img src={gallery[0]} alt={name}/>
            <span>{!inStock&&'OUT OF STOCK'}</span>
            <img className="add-to-cart" src="/images/shopping-cart2.svg" alt="shopping cart" onClick={(e)=>this.addToCart(e)}/>
          </div>
          <div className="product-info">
            <div className="product-name">{name}</div>
            <div className="product-price">
              <span className="currency-symbol">{prices[currencyIndex].currency['symbol']}</span>
              <span className="price">{prices[currencyIndex].amount}</span>
            </div>
          </div>
        </NavLink>
      </div>
    );
  }
}

export default connect(({currency}, {product})=>{
  const {index}=currency;
  return {
    currencyIndex: index,
    product,
  };
})(ProductCard);

ProductCard.propTypes={
  dispatch: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  currencyIndex: PropTypes.number.isRequired,
};

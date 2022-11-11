import React, {Component} from 'react';
import {connect} from 'react-redux';
import {incrementQuantity, decrementQuantity} from '../actions/cart';
import Attributes from './Attributes';
import PropTypes from 'prop-types';
import './CartCard.scss';


class CartCard extends Component {
  state={
    selectedImageIndex: 0,
  };
  // ChangeImage function used to navigate on product images gallery
  changeImage=(e)=>{
    let {selectedImageIndex}=this.state;
    const {gallery}=this.props.product;
    const maxNOfImages=gallery.length-1;
    if (selectedImageIndex<maxNOfImages&&e.target.name==='forward') {
      selectedImageIndex+=1;
    } else if (selectedImageIndex>0&&e.target.name==='backward') {
      selectedImageIndex-=1;
    }
    this.setState({selectedImageIndex});
  };
  // handleChangeQuanity used to increment/decrement product quanity
  handleChangeQuanity=(e)=>{
    const changeType=e.target.name;
    if (changeType==='increment') {
      this.props.dispatch(incrementQuantity(this.props.cartId));
    } else {
      this.props.dispatch(decrementQuantity(this.props.cartId));
    }
  };

  render() {
    const {name, gallery, brand, attributes, prices}=this.props.product;
    const {selectedImageIndex}=this.state;
    const {currencyIndex, selectedAttributes, quantity, miniCart}=this.props;
    const maxNOfImages=gallery.length-1;
    return (
      <li className={miniCart?'mini-cart-card-container':'cart-card-container'}>
        <div className="card-product-details">
          <div className="card-product-info">
            <div className={miniCart?'':'brand'}>{brand}</div>
            <div>{name}</div>
          </div>
          <div className={miniCart?'mini-cart-card-price':'cart-card-price'}>
            {prices[currencyIndex].currency.symbol}{(prices[currencyIndex].amount*quantity).toFixed(2)}
          </div>
          {attributes.length!==0?<div className="card-attributes-container">
            {attributes.map((attribute, index)=> <Attributes key={index}
              selectedAttributes={selectedAttributes} attribute={attribute} disabled={true}/>)}
          </div>:null}
        </div>
        <div className="card-quantity-image">
          <div className="card-set-quantity">
            <button name="increment" onClick={(e)=>this.handleChangeQuanity(e)}>+</button>
            <div>{quantity}</div>
            <button name="decrement" onClick={(e)=>this.handleChangeQuanity(e)}>-</button>
          </div>
          <div className="card-image-container">
            <img className="card-product-img"src={gallery[selectedImageIndex]} alt={name}/>
            {miniCart||gallery.length<=1? null:
            <div className="fwd-bkwd">
              <button disabled={selectedImageIndex===0} className="bkwd-arrow"
                name="backward" onClick={(e)=>this.changeImage(e)}>
              </button>
              <button disabled={selectedImageIndex===maxNOfImages} className="fwd-arrow"
                name="forward" onClick={(e)=>this.changeImage(e)}>
              </button>
            </div>}
          </div>
        </div>
      </li>
    );
  }
}

export default connect(({currency, products}, {cartItem, miniCart})=>{
  const {id, selectedAttributes, quantity}=cartItem.product;
  const product=products[id];
  const {index}=currency;
  return {
    id,
    selectedAttributes,
    quantity,
    product,
    currencyIndex: index,
    miniCart,
    cartId: cartItem.id,
  };
})(CartCard);

CartCard.propTypes={
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  selectedAttributes: PropTypes.object.isRequired,
  quantity: PropTypes.number.isRequired,
  product: PropTypes.object.isRequired,
  currencyIndex: PropTypes.number.isRequired,
  miniCart: PropTypes.bool.isRequired,
  cartId: PropTypes.string.isRequired,
};

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addToCart} from '../actions/cart';
import {handleLoadProduct} from '../actions/product';
import Attributes from './Attributes';
import Loading from './Loading';
import NotFound from './NotFound';
import formatCartItem from '../utils/formatCartItem';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import './Product.scss';

class Product extends Component {
  state={
    selectedImageIndex: 0,
    selectedAttributes: {},
    missingAttributes: [],
  };
  // load the product from api and dispatch it to store
  async componentDidMount() {
    if (!this.props.product) {
      const {dispatch, client, id}=this.props;
      await dispatch(handleLoadProduct(client, id));
    }
  }
  // handle image view is used to set the state with required image index to view
  handleImageView=(index)=>this.setState({selectedImageIndex: index});
  // set the selected attributes in the state
  handleSelectedAttributes=(e)=>{
    const {selectedAttributes}=this.state;
    const name=e.target.name;
    const value=e.target.value;
    selectedAttributes[name]=value;
    this.setState({selectedAttributes});
  };

  // handleAddToCart function is used to add items in cart
  handleAddToCart=(e)=>{
    e.preventDefault();
    const {prices, attributes}=this.props.product;
    const {selectedAttributes}=this.state;
    // all attributes have to be selected before add
    if (attributes.length===Object.keys(selectedAttributes).length) {
      const {dispatch, id}=this.props;
      const cartItem=formatCartItem(id, prices, selectedAttributes);
      dispatch(addToCart(cartItem));
      this.setState({selectedAttributes: {}});// reset attributes after each add
      this.state.missingAttributes.length!==0&&this.setState({missingAttributes: []});// reset misising attributes after each add
    } else {
      /** 1st get the missing attributes by first filter what is not in the selected attributes
      2nd get the attribute name of each one missing */
      const missingAttributes=attributes.filter((attribute)=> !(attribute.id in selectedAttributes))
          .map((attribute)=> attribute.name);
      this.setState({missingAttributes});
    }
  };
  // addWarning function is used to return in DOM the elements of missing attributes
  addWarning=(missAttributes)=>{
    return (
      <div className="warning-message">
        <p>Please choose the product:</p>
        <ul>
          {missAttributes.map((attribute, index)=><li key={index}>{attribute}</li>)}
        </ul>
      </div>
    );
  };

  render() {
    const {product, error}=this.props;
    if (!product) {
      return <Loading/>;
    } else if (error) {
      return <NotFound/>;
    }
    const {description, name, gallery, brand, attributes, prices, inStock}=product;
    const {selectedImageIndex, selectedAttributes, missingAttributes}=this.state;
    const {currencyIndex}=this.props;
    return (
      <section className="product-container">
        <div className="images-container">
          <div className="left-images-container">
            {gallery.map((url, index)=><img className= {index===selectedImageIndex? 'left-selected-image':''}
              key={index} src={url} alt={name} onClick={()=>this.handleImageView(index)}/>)}
          </div>
          <div className="selected-image">
            <img src={gallery[selectedImageIndex]} alt={name}/>
          </div>
        </div>
        <div className="product-details">
          {!inStock&&<div className="out-of-stock">OUT OF STOCK</div>}
          <div className="brand">{brand}</div>
          <div className="product-name">{name}</div>
          <form onSubmit={(e)=>this.handleAddToCart(e)}>
            <div className="attributes-container">
              {attributes.map((attribute, index)=> <Attributes key={index} selectAttribute={(e)=>this.handleSelectedAttributes(e)}
                selectedAttributes={selectedAttributes}
                attribute={attribute}
                disabled={!inStock}/>)}
            </div>
            <div className="price-section">
              PRICE:
              <div className="price">{prices[currencyIndex].currency.symbol}{prices[currencyIndex].amount}</div>
            </div>
            <button disabled={!inStock} onClick={(e)=>this.handleAddToCart(e)} type="submit"> ADD TO CART </button>
            {missingAttributes.length!==0&&this.addWarning(missingAttributes)}
          </form>
          <div className="product-description"> {parse(description)}
          </div>
        </div>
      </section>
    );
  }
}

export default connect(({apolloClient, currency, products, error})=>{
  const id=window.location.pathname.slice(9);// get the product id from the url
  const product=products[id]? products[id]:null;
  const {index}=currency;
  return {
    client: apolloClient,
    id,
    product,
    currencyIndex: index,
    error,
  };
})(Product);

Product.propTypes={
  dispatch: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  product: PropTypes.object,
  currencyIndex: PropTypes.number.isRequired,
  error: PropTypes.bool.isRequired,
};

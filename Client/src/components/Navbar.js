import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import MiniCart from './MiniCart';
import {changeCurrency} from '../actions/currency';
import PropTypes from 'prop-types';
import './Navbar.scss';

class Navbar extends Component {
  state={
    mobileMenuToggle: false,
    currencyDropdownToggle: false,
    miniCartDisplayToggle: false,
    selectedCurrency: '$',
  };
  // add event listener on document click when the component mounted on order to close the currency dropdown menu when event fires
  async componentDidMount() {
    document.addEventListener('click', (e)=>{
      e.preventDefault();
      if (this.state.currencyDropdownToggle&&window.innerWidth>700) {
        this.setState({currencyDropdownToggle: false});// close the dropdown menu when click outside and not in mobile view
      }
    });
    window.addEventListener('resize', ()=>this.setState({currencyDropdownToggle: false}));// reset the currency dropdown menu for any screen resize
  }
  // function to return dropdown menu of the currencies
  getCurrencyDropDown=(currencies)=>{
    return currencies.map((currency, index)=>{
      return (
        <li onClick={(e)=>{
          this.handleSelectedCurrency(e);
          this.currencyDropdownToggle(e);
        }}
        key={index}>{currency.symbol} {currency.label}</li>
      );
    });
  };
  // handle currency selection and dispatch the changes to the store
  handleSelectedCurrency=(e)=>{
    e.preventDefault();
    const {dispatch, currencies}=this.props;
    const symbol=e.target.firstChild.data;
    const label=currencies.find((currency)=> currency.symbol===symbol).label;
    this.setState({selectedCurrency: symbol});
    const index=currencies.findIndex((currency)=>currency.label===label);
    dispatch(changeCurrency({index, label, symbol}));
  };
  // mobileMenuToggle used to toggle view of the menu button on navbar at mobile view
  mobileMenuToggle=(e)=>{
    e.preventDefault();
    const {mobileMenuToggle}=this.state;
    this.setState({mobileMenuToggle: !mobileMenuToggle});
  };
  // currencyDropdownToggle used to toggle of view the currency dropdown menu
  currencyDropdownToggle=(e)=>{
    const {currencyDropdownToggle}=this.state;
    e.stopPropagation(); // Avoid event bubbling to the dom to let "click "event listener on DOM close the menu
    this.setState({currencyDropdownToggle: !currencyDropdownToggle});
  };
  // miniCartDisplayToggle used to toggle view of the minicart window
  miniCartDisplayToggle=()=>{
    const {miniCartDisplayToggle}=this.state;
    this.setState({miniCartDisplayToggle: !miniCartDisplayToggle});
  };
  // handleClickMiniCart is used to prevent close the miniCart window when inside click and close it at outside click
  handleClickMiniCartWrapper=(e)=>{
    e.stopPropagation();
    e.target.id==='minicart-wrapper'&&this.setState({miniCartDisplayToggle: false});
  };

  render() {
    const {currencies, cart}=this.props;
    const noOfCartProducts=Object.keys(cart).length;
    const {mobileMenuToggle, currencyDropdownToggle, miniCartDisplayToggle, selectedCurrency}=this.state;
    return (
      <nav>
        <div className="mob-menu" onClick={(e)=>this.mobileMenuToggle(e)}>
          <img src="/images/menu.svg" alt="menu-icon"/>
        </div>
        <ul className={mobileMenuToggle?'nav-list nav-left':'nav-list nav-left none'}>
          <li><NavLink to="/">All</NavLink></li>
          <li><NavLink to="/clothes">Clothes</NavLink></li>
          <li><NavLink to="/tech">Technologies</NavLink></li>
        </ul>
        <div className="logo"><NavLink to="/"><img src="/images/logo.png" alt="Logo"/></NavLink></div>
        <ul className={mobileMenuToggle?'nav-list nav-right':'nav-list nav-right none'}>
          <li className="currency" onClick={(e)=>this.currencyDropdownToggle(e)}>
            <div className={currencyDropdownToggle?'currency-nav rotate':'currency-nav'}>
              <div>{selectedCurrency}</div>
              <img src="/images/dropdown.svg" alt="Dropdown arrow"/>
            </div>
            <ul className={currencyDropdownToggle?'currency-dropdown-list':'hide'}>
              {this.getCurrencyDropDown(currencies)}
            </ul>
          </li>
          <li className="cart" onClick={()=> this.miniCartDisplayToggle()}>
            <div className="cart-wrapper">
              <img src="/images/shopping-cart.svg" alt="shopping cart"/>
              {noOfCartProducts!==0?<span>{noOfCartProducts<=9?noOfCartProducts:'+9'}</span>:null}
            </div>
            <div id="minicart-wrapper" onClick={(e)=>this.handleClickMiniCartWrapper(e)}
              className={miniCartDisplayToggle?'Wrap-minicart-show':'hide'}>
              <ul className={miniCartDisplayToggle?'minicart-show':'hide'}>
                <MiniCart miniCart={true} miniCartDisplayToggle={this.miniCartDisplayToggle}/>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    );
  }
}

export default connect(({apolloClient, cart}, {currencies})=>{
  return {
    client: apolloClient,
    currencies,
    cart,
  };
})(Navbar);

Navbar.propTypes={
  dispatch: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
  currencies: PropTypes.array.isRequired,
  cart: PropTypes.object.isRequired,
};

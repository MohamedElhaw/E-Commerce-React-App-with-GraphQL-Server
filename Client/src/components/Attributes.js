import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Attributes.scss';

class Attributes extends Component {
  render() {
    const {attribute, selectAttribute, selectedAttributes, disabled}=this.props;
    const attributeName=attribute.name;
    return (
      <div className="attribute">
        <h4>{attributeName}:</h4>
        <ul>
          {attribute.items.map((item)=>{
            return (
              <li className="attribute-item"key={item.id}>
                <input disabled={disabled} name={attributeName} checked={false} type="radio" value={item.value}
                  onChange={(e)=>selectAttribute(e)}/>
                {attributeName==='Color'?
                  // if the attribute is color return label with background of this color
                  <label className={selectedAttributes[attributeName]===item.value?
                      'attribute-item-color selected-color':'attribute-item-color'}
                  style={{backgroundColor: `${item.value}`}}>
                  </label>:
                  // else return label with the value of this attribute
                  <label className={selectedAttributes[attributeName]===item.value?
                  'attribute-item-others selected-others':'attribute-item-others'}>
                    {item.value}
                  </label>}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

Attributes.propTypes={
  attribute: PropTypes.object.isRequired,
  selectAttribute: PropTypes.func, // not required because attribue compoenent is used as view in cart/minicart
  selectedAttributes: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Attributes;

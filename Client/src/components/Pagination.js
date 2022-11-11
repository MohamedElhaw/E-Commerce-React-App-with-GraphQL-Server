import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './pagination.scss';

class Pagination extends Component {
  render() {
    const {noOfPages, setCurrentPage, currentPage}=this.props;
    return (
      <div className={noOfPages!==1?'pagination':'pagination-none'}>
        <img className={currentPage!==1?'pagination-arrow':'pagination-arrow inactive'}
          name="previous" alt="previous" src="/images/left-arrow.svg"
          onClick={(e)=>setCurrentPage(e, noOfPages)}/>
        {`${currentPage} / ${noOfPages}`}
        <img className={currentPage!==noOfPages?'pagination-arrow':'pagination-arrow inactive'}
          name="next" alt="next" src="/images/right-arrow.svg"
          onClick={(e)=>setCurrentPage(e, noOfPages)}/>
      </div>
    );
  }
}

export default Pagination;

Pagination.propTypes={
  noOfPages: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

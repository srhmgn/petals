import React, { PropTypes } from 'react';

import './index.css';

function Row({ children, rowIndex }) {
  return (
    <div className='row' id={ `row${rowIndex}` }>
      { children }
    </div>
  );
}

Row.propTypes = {
  children: PropTypes.node.isRequired,
  rowIndex: PropTypes.number.isRequired,
};

export default Row;

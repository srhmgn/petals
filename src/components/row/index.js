import React, { PropTypes } from 'react';

import './index.css';

function Row({ children, rowIndex, ...props }) {
  return (
    <div className='row' id={ `row${rowIndex}` } { ...props }>
      { children }
    </div>
  );
}

Row.propTypes = {
  children: PropTypes.node.isRequired,
  rowIndex: PropTypes.number.isRequired,
};

export default Row;

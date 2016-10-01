import React, { PropTypes } from 'react';

import './index.css';

function Row({ children }) {
  return (
    <div className='row'>
      { children }
    </div>
  );
}

Row.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Row;

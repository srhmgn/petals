import React, { PropTypes } from 'react';

import './index.css';

function ValueSetter() {
  return (
    <div className='row' id={ `row${rowIndex}` } { ...props }>
      { children }
    </div>
  );
}

ValueSetter.propTypes = {};

export default ValueSetter;

import React, { PropTypes } from 'react';

import './index.css';

const MAX_SIZE = 4;
const MIN_SIZE = 2;

function Controls({
  buildRows,
  reset,
  setSize,
  size,
}) {
  const canIncrement = size + 1 <= MAX_SIZE;
  const canDecrement = size - 1 >= MIN_SIZE;

  return (
    <div className='controls'>
      <div className='controls__size-controls'>
        <button
          className='controls__size-btn'
          disabled={ !canDecrement }
          onClick={ () => setSize(size - 1) }>
          -
        </button>
        <span className='controls__size'>{ size }</span>
        <button
          className='controls__size-btn'
          disabled={ !canIncrement }
          onClick={ () => setSize(size + 1) }>
          +
        </button>
      </div>

      <button
        className='controls__btn'
        onClick={ () => buildRows(size) }>New game</button>

      <button
        className='controls__btn'
        onClick={ reset }>Reset</button>
    </div>
  );
}

Controls.propTypes = {
  buildRows: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  setSize: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
};

export default Controls;

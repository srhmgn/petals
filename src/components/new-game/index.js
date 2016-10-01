import React, { PropTypes } from 'react';

import './index.css';

const MAX_SIZE = 4;
const MIN_SIZE = 2;

function NewGame({
  buildRows,
  setSize,
  size,
}) {
  const canIncrement = size + 1 <= MAX_SIZE;
  const canDecrement = size - 1 >= MIN_SIZE;

  return (
    <div className='new-game'>
      <div className='new-game__size-controls'>
        <button
          className='new-game__size-btn'
          disabled={ !canDecrement }
          onClick={ () => setSize(size - 1) }>
          -
        </button>
        <span className='new-game__size'>{ size }</span>
        <button
          className='new-game__size-btn'
          disabled={ !canIncrement }
          onClick={ () => setSize(size + 1) }>
          +
        </button>
      </div>
      <button
        className='new-game__go'
        onClick={ () => buildRows(size) }>New game</button>
    </div>
  );
}

NewGame.propTypes = {
  buildRows: PropTypes.func.isRequired,
  setSize: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
};

export default NewGame;

import React, { PropTypes } from 'react';

import './index.css';

function Board({ children }) {
  return (
    <div className='board'>
      { children }
    </div>
  );
}

Board.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Board;

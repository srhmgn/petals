import React, { PropTypes } from 'react';

import './index.css';

function GameWrapper({ children }) {
  return (
    <div className='game-wrapper'>
      { children }
    </div>
  );
}

GameWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameWrapper;

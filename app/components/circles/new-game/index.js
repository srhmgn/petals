import React, { Component, PropTypes } from 'react';

import './index.css';

const MAX_SIZE = 5;
const MIN_SIZE = 2;

class NewGame extends Component {
  static propTypes = {
    buildNewGame: PropTypes.func.isRequired,
  };

  state = {
    size: 3,
  };

  render() {
    const { buildNewGame } = this.props;
    const { size } = this.state;

    const canIncrement = size + 1 <= MAX_SIZE;
    const canDecrement = size - 1 >= MIN_SIZE;

    return (
      <div className='new-game'>
        <div className='new-game__size-controls'>
          <button
            className='new-game__size-btn'
            disabled={ !canDecrement }
            onClick={ () => this.setState({ size: size - 1 }) }>
            -
          </button>
          <span className='new-game__size'>{ size }</span>
          <button
            className='new-game__size-btn'
            disabled={ !canIncrement }
            onClick={ () => this.setState({ size: size + 1 }) }>
            +
          </button>
        </div>
        <button
          className='new-game__go'
          onClick={ () => buildNewGame(size) }>New game</button>
      </div>
    );
  }
}

export default NewGame;

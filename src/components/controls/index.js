import React, { PureComponent, PropTypes } from 'react';

import './index.css';

const MAX_SIZE = 8;
const MIN_SIZE = 3;

const MAX_PETALS = 4;
const MIN_PETALS = 3;

class Controls extends PureComponent {
  static propTypes = {
    buildRows: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    petalCount: PropTypes.number.isRequired,
    reset: PropTypes.func.isRequired,
    setPetalCount: PropTypes.func.isRequired,
    setSize: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired,
    toggleInstructions: PropTypes.func.isRequired,
  };

  state = {
    settings: false,
  };

  render() {
    const {
      buildRows,
      isDisabled,
      petalCount,
      reset,
      setPetalCount,
      setSize,
      size,
      toggleInstructions,
    } = this.props;
    const { settings } = this.state;

    const canIncrementSize = size + 1 <= MAX_SIZE;
    const canDecrementSize = size - 1 >= MIN_SIZE;
    const canIncrementPetals = petalCount + 1 <= MAX_PETALS;
    const canDecrementPetals = petalCount - 1 >= MIN_PETALS;

    return (
      <div className='controls'>
        <div className='controls__row'>
          <button
            className='controls__btn'
            disabled={ isDisabled }
            onClick={ () => this.setState({ settings: !settings }) }>#</button>

          <button
            className='controls__btn'
            disabled={ isDisabled }
            onClick={ () => buildRows(size, petalCount) }>New</button>

          <button
            className='controls__btn'
            disabled={ isDisabled }
            onClick={ reset }>Reset</button>

          <button
            className='controls__btn'
            onClick={ toggleInstructions }>?</button>
        </div>
        { settings &&
          <div className='controls__row'>
            <div className='controls__size-controls'>
              <label>Size</label>
              <button
                className='controls__size-btn'
                disabled={ !canDecrementSize }
                onClick={ () => setSize(size - 1) }>
                -
              </button>
              <span className='controls__size'>{ size }</span>
              <button
                className='controls__size-btn'
                disabled={ !canIncrementSize }
                onClick={ () => setSize(size + 1) }>
                +
              </button>
            </div>

            <div className='controls__size-controls'>
              <label>Petals</label>
              <button
                className='controls__size-btn'
                disabled={ !canDecrementPetals }
                onClick={ () => setPetalCount(petalCount - 1) }>
                -
              </button>
              <span className='controls__size'>{ petalCount }</span>
              <button
                className='controls__size-btn'
                disabled={ !canIncrementPetals }
                onClick={ () => setPetalCount(petalCount + 1) }>
                +
              </button>
            </div>
          </div> }
      </div>
    );
  }
}

export default Controls;

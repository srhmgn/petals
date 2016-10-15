import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames';

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
    won: PropTypes.bool.isRequired,
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
      won,
    } = this.props;
    const { settings } = this.state;

    const canIncrementSize = size + 1 <= MAX_SIZE;
    const canDecrementSize = size - 1 >= MIN_SIZE;
    const canIncrementPetals = petalCount + 1 <= MAX_PETALS;
    const canDecrementPetals = petalCount - 1 >= MIN_PETALS;

    const wrapperClasses = cx({
      'controls': true,
      'controls--won': won,
    });

    return (
      <div className={ wrapperClasses }>
        <div className='controls__row'>
          <button
            className='u-btn'
            onClick={ () => buildRows(size, petalCount) }>New</button>

          { won && 'YOU WON!' }

          { !won && <button
            className='u-btn'
            disabled={ isDisabled }
            onClick={ reset }>Reset</button> }

          { !won && <button
            className='u-btn u-btn--small'
            disabled={ isDisabled }
            onClick={ () => this.setState({ settings: !settings }) }>#</button> }

          { !won && <button
            className='u-btn u-btn--small'
            onClick={ toggleInstructions }>?</button> }
        </div>
        { settings &&
          <div className='controls__row'>
            <div className='controls__size-controls'>
              <label>Size</label>
              <button
                className='u-btn u-btn--small'
                disabled={ !canDecrementSize }
                onClick={ () => setSize(size - 1) }>
                -
              </button>
              <span className='controls__size'>{ size }</span>
              <button
                className='u-btn u-btn--small'
                disabled={ !canIncrementSize }
                onClick={ () => setSize(size + 1) }>
                +
              </button>
            </div>

            <div className='controls__size-controls'>
              <label>Petals</label>
              <button
                className='u-btn u-btn--small'
                disabled={ !canDecrementPetals }
                onClick={ () => setPetalCount(petalCount - 1) }>
                -
              </button>
              <span className='controls__size'>{ petalCount }</span>
              <button
                className='u-btn u-btn--small'
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

import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames';
import R from 'ramda';

import './index.css';

import { OPERATIONS } from '../../constants';

const MAX_SIZE = 8;
const MIN_SIZE = 3;

const MAX_PETALS = 4;
const MIN_PETALS = 3;

const rowMap = {
  GAME_OPTIONS: 0,
  GAME_CONTROLS: 1,
};

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
    currentRow: rowMap.GAME_CONTROLS,
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
    const { currentRow } = this.state;

    const canIncrementSize = size + 1 <= MAX_SIZE;
    const canDecrementSize = size - 1 >= MIN_SIZE;
    const canIncrementPetals = petalCount + 1 <= MAX_PETALS;
    const canDecrementPetals = petalCount - 1 >= MIN_PETALS;

    const wrapperClasses = cx({
      'controls': true,
      'controls--won': won,
    });

    const rowButtons = (
      <span className='controls__row-btns'>
        <button
          className='u-btn u-btn--small'
          disabled={
            isDisabled || !R.contains(currentRow + 1, R.values(rowMap))
          }
          onClick={ () => this.setState({ currentRow: currentRow + 1 }) }>
          <span className='u-90'>{ '>' }</span>
        </button>

        <button
          className='u-btn u-btn--small'
          disabled={
            isDisabled || !R.contains(currentRow - 1, R.values(rowMap))
          }
          onClick={ () => this.setState({ currentRow: currentRow - 1 }) }>
          <span className='u-90'>{ '<' }</span>
        </button>
      </span>
    );

    return (
      <div className={ wrapperClasses }>
        <div className='controls__inner'>
          <div className={ `controls__row controls__row--off-${currentRow}` }>
            { rowButtons }

            <button
              className='u-btn'
              onClick={ () => buildRows(size, petalCount) }>New</button>

            <button
              className='u-btn'
              disabled={ isDisabled }
              onClick={ reset }>Reset</button>

            <button
              className='u-btn u-btn--small'
              onClick={ toggleInstructions }>?</button>
          </div>
          <div className={ `controls__row controls__row--off-${currentRow}` }>
            { rowButtons }

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
          </div>
        </div>
      </div>
    );
  }
}

export default Controls;

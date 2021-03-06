import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames';
import R from 'ramda';

import './index.css';

import { OPERATIONS } from '../../constants';
import { getValue } from '../../utils';

const MAX_SIZE = 8;
const MIN_SIZE = 3;

const MAX_PETALS = 6;
const MIN_PETALS = 3;

const rowMap = {
  GAME_OPTIONS: 0,
  GAME_CONTROLS: 1,
};

class Controls extends PureComponent {
  static propTypes = {
    buildRows: PropTypes.func,
    isDisabled: PropTypes.bool.isRequired,
    isSettings: PropTypes.bool,
    operations: PropTypes.object,
    petalCount: PropTypes.number,
    petalName: PropTypes.string,
    pos: PropTypes.object,
    reset: PropTypes.func,
    rows: PropTypes.array,
    setOperation: PropTypes.func,
    setPetalCount: PropTypes.func,
    setRowCircle: PropTypes.func,
    setSize: PropTypes.func,
    size: PropTypes.number,
    toggleInstructions: PropTypes.func,
    won: PropTypes.bool,
  };

  state = {
    currentRow: rowMap.GAME_OPTIONS,
  };

  render() {
    const {
      buildRows,
      isDisabled,
      isSettings,
      operations,
      petalCount,
      petalName,
      pos,
      reset,
      rows,
      setOperation,
      setPetalCount,
      setRowCircle,
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
      'controls--settings': !isSettings,
      [`controls--${petalName}`]: petalName,
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

    const innerContent = isSettings ? [
      <div
        className={ `controls__row controls__row--off-${currentRow}` }
        key='0'>
        { rowButtons }

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
          onClick={ toggleInstructions }>?</button> }
      </div>,
      <div
        className={ `controls__row controls__row--off-${currentRow}` }
        key='1'>
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
      </div>,
    ] : (
      <div className='controls__row'>
        <span className='controls__row-btns'>
          { R.keys(OPERATIONS).map((operationName, i) => {
            const buttonClasses = cx({
              'u-btn u-btn--small u-btn--dark': true,
              'is-active': operations[petalName].label ===
                OPERATIONS[operationName].label,
            });

            return (
              <button
                className={ buttonClasses }
                disabled={ isDisabled }
                key={ i }
                onClick={ () =>
                  setOperation({
                    [petalName]: OPERATIONS[operationName],
                  })
                }>
                { OPERATIONS[operationName].label }
              </button>
            );
          }) }
        </span>

        <span className='controls__row-btns'>
          { R.range(1, 10).map(n => {
            const { rowIndex, circleIndex } = pos;

            const buttonClasses = cx({
              'u-btn u-btn--small u-btn--dark': true,
              'is-active': rows[rowIndex]
                && Number(getValue(rows[rowIndex][circleIndex])) === n,
            });

            return (
              <button
                className={ buttonClasses }
                disabled={ isDisabled }
                key={ n }
                onClick={ () =>
                  setRowCircle({
                    value: n,
                    ...pos,
                  })
                }>
                { n }
              </button>
            );
          }) }
        </span>
      </div>
    );

    return (
      <div className={ wrapperClasses }>
        <div className='controls__inner'>
          { innerContent }
        </div>
      </div>
    );
  }
}

export default Controls;

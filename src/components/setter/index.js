import React, { PureComponent, PropTypes } from 'react';
import R from 'ramda';
import cx from 'classnames';

import { OPERATIONS } from '../../constants';

import './index.css';

class Setter extends PureComponent {
  static propTypes = {
    activeIndex: PropTypes.number,
    closeSetter: PropTypes.func.isRequired,
    mousePos: PropTypes.array,
    parentIndex: PropTypes.string,
    petalName: PropTypes.string,
    setOperation: PropTypes.func.isRequired,
  };

  componentDidUpdate() {
    if (this.props.petalName) {
      this.component.focus();
    }
  }

  render() {
    const {
      activeIndex,
      mousePos = [],
      petalName,
      setOperation,
    } = this.props;

    if (!petalName) return null;
    const [left, top] = mousePos;

    const finalLeft = document.body.clientWidth - left > 98 ?
      left : left - 98;

    return (
      <ul
        className='setter'
        onKeyDown={ this.onKeyDown }
        ref={ c => { this.component = c; } }
        style={ { left: finalLeft, top } }
        tabIndex='-1'>
        { R.keys(OPERATIONS).map((operationName, i) => {
          if (
            petalName === 'int' &&
            (operationName === 'SUBTRACT' || operationName === 'MODULO')
          ) return null;

          const setterClasses = cx({
            'setter__item': true,
            'setter__item--current': i === activeIndex,
          });

          return (
            <li className={ setterClasses } key={ i }>
              <button
                className='u-reset-button'
                onClick={ () =>
                  setOperation({
                    [petalName]: OPERATIONS[operationName],
                  })
                }>
                { OPERATIONS[operationName].label }
              </button>
            </li>
          );
        }) }
      </ul>
    );
  }

  onKeyDown = (e) => {
    const {
      activeIndex,
      closeSetter,
      parentIndex,
      petalName,
      setOperation,
    } = this.props;

    let nextOperation;

    switch (e.key) {
    case 'ArrowRight':
      nextOperation = R.values(OPERATIONS)[activeIndex + 1];
      break;
    case 'ArrowLeft':
      nextOperation = R.values(OPERATIONS)[activeIndex - 1];
      break;
    case 'Escape':
      console.log(parentIndex);
      const [, rowIndex, circleIndex] =
        parentIndex.match(/row(\d+)-circle(\d+)/);
      const circleInput = document
        .querySelectorAll('.row')[rowIndex]
        .querySelectorAll('.circle__number')[circleIndex];
      circleInput.focus();
      closeSetter();
      break;
    default:
      break;
    }

    if (nextOperation) {
      setOperation({
        [petalName]: nextOperation,
        isKeyboardAction: true,
      });
    }
  }
}

export default Setter;

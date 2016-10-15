import React, { PureComponent, PropTypes } from 'react';
import R from 'ramda';
import cx from 'classnames';

import { OPERATIONS } from '../../constants';
import { petalClassMap } from '../petal';

import './index.css';

class OperationSetter extends PureComponent {
  static propTypes = {
    activeIndex: PropTypes.number,
    closeOperationSetter: PropTypes.func,
    mousePos: PropTypes.array,
    opener: PropTypes.object,
    parentIndex: PropTypes.string,
    petalName: PropTypes.string,
    setOperation: PropTypes.func,
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

    const finalLeft = document.body.clientWidth - left > 70 ?
      left : left - 70;

    return (
      <ul
        className='operation-setter u-btn__wrapper'
        onKeyDown={ this.onKeyDown }
        ref={ c => { this.component = c; } }
        style={ { left: finalLeft, top } }
        tabIndex='-1'>
        { R.keys(OPERATIONS).map((operationName, i) => {
          const operationSetterClasses = cx({
            'operation-setter__item': true,
            [`operation-setter__item--${petalClassMap[petalName]}`]: true,
            'operation-setter__item--current': i === activeIndex,
          });

          return (
            <li className={ operationSetterClasses } key={ i }>
              <button
                className='u-btn u-btn--small u-btn--dark'
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
      closeOperationSetter,
      opener,
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
      opener && opener.focus();
      closeOperationSetter();
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

export default OperationSetter;

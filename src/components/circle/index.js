import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames';
import R from 'ramda';

import { petalClassMap } from '../petal';
import { getValue, isStatic } from '../../utils';

import './index.css';

const MOUSE_POS_MAP = {
  rightAlt: [50, 53],
  right: [50, 53],
  bottomLeft: [95, 30],
  bottomRight: [95, 30],
};

class Circle extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    circleIndex: PropTypes.number.isRequired,
    closeValueSetter: PropTypes.func,
    data: PropTypes.object.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    isValueSetterOption: PropTypes.bool,
    openOperationSetter: PropTypes.func,
    openValueSetter: PropTypes.func,
    rowIndex: PropTypes.number.isRequired,
    setValue: PropTypes.func.isRequired,
  };

  state = {
    displayValue: this.getValue(),
  };

  componentDidMount() {
    this._keyInterval = window.setInterval(this.checkKeyEvents, 150);
  }

  componentWillReceiveProps(newProps) {
    if (R.equals(newProps.data.dynamic, {})) {
      this.setState({ displayValue: 'EMPTY' });
    }
  }

  componentWillUnmount() {
    window.clearInterval(this._keyInterval);
  }

  render() {
    const {
      children,
      circleIndex,
      data: { dynamic: { value } },
      isDisabled,
     } = this.props;

    const numberClassNames = cx({
      'circle__number': true,
      'circle__number--static': this.isStatic(),
      'circle__number--disabled': isDisabled,
    });

    return (
      <span
        className='circle'
        id={ `circle${circleIndex}` }
        ref={ c => { this.component = c; } }>
        <svg
          className='circle__svg'
          onClick={ (e) =>
            e.target === e.currentTarget &&
              this.focusInput()
          }
          viewBox='0 0 200 200'
          xmlns='http://www.w3.org/2000/svg'>
          { children }
        </svg>
        <span
          className={ numberClassNames }
          onClick={ this.handleEvent }
          onKeyDown={ this.handleEvent }
          tabIndex='-1'>
          <span className='circle__number-inner'>
            { value }
          </span>
        </span>
      </span>
    );
  }

  getValue() {
    return getValue(this.props.data);
  }

  getInput = () => {
    return this.component.querySelector('.circle__number');
  }

  focusInput = () => {
    this.getInput().focus();
  }

  isStatic() {
    return isStatic(this.props.data);
  }

  handleEvent = (e) => {
    const {
      circleIndex,
      closeValueSetter,
      isDisabled,
      isValueSetterOption,
      openValueSetter,
      rowIndex,
      setValue,
    } = this.props;

    if (isDisabled || this.isStatic()) return;

    switch (e.type) {
    case 'click':
      isValueSetterOption ? closeValueSetter() : openValueSetter({
        circleIndex,
        mousePos: [e.clientX, e.clientY],
        rowIndex,
      });
      e.preventDefault();
      break;
    case 'keydown':
      closeValueSetter();
      if (e.key.match(/[1-9]/)) {
        setValue(e.key);
        return;
      }
      this.keys.push(e.key);
      this.shiftKey = e.shiftKey;
      break;

    default:
      return;
    }
  }

  checkKeyEvents = () => {
    if (!this.keys.length) return;
    const firstTwoKeys = this.keys.slice(0, 2);

    this.shiftKey ? this.openOperationSetterForPetal(firstTwoKeys) :
        this.focusOnNeighboringField(firstTwoKeys);

    this.keys = [];
    this.shiftKey = false;
  }

  openOperationSetterForPetal = (keys) => {
    const {
      circleIndex,
      openOperationSetter,
      rowIndex,
    } = this.props;

    const input = this.getInput();

    function openOperationSetterAndBlurInput(petalName, parentRow, parentCircle) {
      const petal = document.querySelector(
        `#game #row${parentRow} #circle${parentCircle} .petal--${petalClassMap[petalName]}`
      );

      if (!petal) return;

      const dimensions = petal.getBoundingClientRect();

      openOperationSetter({
        petalName,
        parentIndex: `row${parentRow}-circle${parentCircle}`,
        opener: input,
        mousePos: [
          dimensions.left + MOUSE_POS_MAP[petalName][0],
          dimensions.top + MOUSE_POS_MAP[petalName][1],
        ],
      });
    }

    if (R.contains('ArrowUp', keys) && R.contains('ArrowRight', keys)) {
      openOperationSetterAndBlurInput(
        'bottomLeft',
        rowIndex - 1,
        circleIndex + 1,
      );
    } else if (R.contains('ArrowDown', keys) && R.contains('ArrowLeft', keys)) {
      openOperationSetterAndBlurInput(
        'bottomLeft',
        rowIndex,
        circleIndex,
      );
    } else if (R.contains('ArrowUp', keys) && R.contains('ArrowLeft', keys)) {
      openOperationSetterAndBlurInput(
        'bottomRight',
        rowIndex - 1,
        circleIndex,
      );
    } else if (R.contains('ArrowDown', keys) && R.contains('ArrowRight', keys)) {
      openOperationSetterAndBlurInput(
        'bottomRight',
        rowIndex,
        circleIndex,
      );
    } else if (R.contains('ArrowRight', keys)) {
      openOperationSetterAndBlurInput(
        'right',
        rowIndex,
        circleIndex,
      ) || openOperationSetterAndBlurInput(
        'rightAlt',
        rowIndex,
        circleIndex,
      );
    } else if (R.contains('ArrowLeft', keys)) {
      openOperationSetterAndBlurInput(
        'right',
        rowIndex,
        circleIndex - 1,
      ) || openOperationSetterAndBlurInput(
        'rightAlt',
        rowIndex,
        circleIndex - 1,
      );
    }
  }

  focusOnNeighboringField = (keys) => {
    const {
      circleIndex,
      rowIndex,
    } = this.props;

    const selectors = [];

    if (R.contains('ArrowDown', keys)) {
      const bottomRight = `#row${rowIndex + 1} #circle${circleIndex}`;
      const bottomLeft = `#row${rowIndex + 1} #circle${circleIndex - 1}`;

      if (R.contains('ArrowRight', keys)) {
        selectors.push(bottomRight);
      } else if (R.contains('ArrowLeft', keys)) {
        selectors.push(bottomLeft);
      } else {
        selectors.push(bottomRight);
        selectors.push(bottomLeft);
      }
    } else if (R.contains('ArrowUp', keys)) {
      if (R.contains('ArrowRight', keys)) {
        selectors.push(`#row${rowIndex - 1} #circle${circleIndex + 1}`);
      } else {
        selectors.push(`#row${rowIndex - 1} #circle${circleIndex}`);
      }
    } else if (R.contains('ArrowRight', keys)) {
      selectors.push(`#row${rowIndex} #circle${circleIndex + 1}`);
    } else if (R.contains('ArrowLeft', keys)) {
      selectors.push(`#row${rowIndex} #circle${circleIndex - 1}`);
    }

    selectors.some(selector => {
      const neighbor = document.querySelector(`#game ${selector} .circle__number`);
      if (neighbor) {
        neighbor.focus();
        return true;
      }

      return false;
    });
  }

  keys = [];
  shiftKey = false;
}

export default Circle;

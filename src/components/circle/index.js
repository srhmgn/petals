import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames';
import R from 'ramda';

import { petalClassMap } from '../petal';
import { getValue, isStatic } from '../../utils';

import './index.css';

class Circle extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    circleIndex: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    rowIndex: PropTypes.number.isRequired,
    pos: PropTypes.object,
    setPetalName: PropTypes.func,
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
      pos = {},
      rowIndex,
    } = this.props;

    const numberClassNames = cx({
      'circle__number': true,
      'circle__number--static': this.isStatic(),
      'circle__number--disabled': isDisabled,
      'circle__number--active': pos.circleIndex === circleIndex &&
        pos.rowIndex === rowIndex,
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
      isDisabled,
      setValue,
    } = this.props;

    if (isDisabled || this.isStatic()) return;

    switch (e.type) {
    case 'keydown':
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
      rowIndex,
      setPetalName,
    } = this.props;

    function openOperationSetterAndBlurInput(petalName, parentRow, parentCircle) {
      const petal = document.querySelector(
        `#game #row${parentRow} #circle${parentCircle} .petal--${petalClassMap[petalName]}`
      );

      if (!petal) return;
      setPetalName(petalName);
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

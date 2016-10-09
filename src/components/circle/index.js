import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames';
import R from 'ramda';

import { petalClassMap } from '../petal';
import { getValue, isStatic } from '../../utils';

import './index.css';

const MOUSE_POS_MAP = {
  right: [50, 80],
  bottomLeft: [150, 12],
  bottomRight: [80, 12],
};

class Circle extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    circleIndex: PropTypes.number.isRequired,
    closeSetter: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    openSetter: PropTypes.func.isRequired,
    rowIndex: PropTypes.number.isRequired,
    setValue: PropTypes.func.isRequired,
    value: PropTypes.string,
    won: PropTypes.bool.isRequired,
  };

  state = {
    displayValue: this.getValue(),
  };

  componentDidMount() {
    window.setInterval(this.checkKeyEvents, 150);

    const {
      circleIndex,
      rowIndex,
    } = this.props;

    if (circleIndex === 0 && rowIndex === 0) {
      this.focusInput();
    }
  }

  componentWillReceiveProps(newProps) {
    if (R.equals(newProps.data.dynamic, {})) {
      this.setState({ displayValue: 'EMPTY' });
    }
  }

  render() {
    const { children, circleIndex, won } = this.props;
    const { displayValue } = this.state;

    const numberClassNames = cx({
      'circle__number': true,
      'circle__number--static': this.isStatic(),
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
        <input
          className={ numberClassNames }
          onBlur={ this.handleEvent }
          onChange={ this.handleEvent }
          onFocus={ this.handleEvent }
          onKeyDown={ this.handleEvent }
          readOnly={ won || this.isStatic() }
          value={ displayValue === 'EMPTY' ? '' : displayValue } />
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
      closeSetter,
      data: { dynamic },
      setValue,
      won,
    } = this.props;

    if (won || this.isStatic()) return;

    switch (e.type) {
    case 'focus':
      closeSetter();
      this.setState({ displayValue: '' });
      break;
    case 'blur':
      this.setState({ displayValue: dynamic.value || '' });
      break;
    case 'change':
      if (!e.target.value.match(/^[1-9]?$/)) return;
      this.setState({ displayValue: e.target.value });
      if (e.target.value) setValue(e.target.value);
      break;
    case 'keydown':
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

    this.shiftKey ? this.openSetterForPetal(firstTwoKeys) :
        this.focusOnNeighboringField(firstTwoKeys);

    this.keys = [];
    this.shiftKey = false;
  }

  openSetterForPetal = (keys) => {
    const {
      circleIndex,
      openSetter,
      rowIndex,
    } = this.props;

    const input = this.getInput();

    function openSetterAndBlurInput(petalName, parentRow, parentCircle) {
      const petal = document.querySelector(
        `#row${parentRow} #circle${parentCircle} .petal--${petalClassMap[petalName]}`
      );

      if (!petal) return;

      const dimensions = petal.getBoundingClientRect();

      openSetter({
        petalName,
        parentIndex: `row${parentRow}-circle${parentCircle}`,
        opener: input,
        mousePos: [
          dimensions.left + MOUSE_POS_MAP[petalName][0],
          dimensions.top + MOUSE_POS_MAP[petalName][1],
        ],
      });

      input.blur();
    }

    if (R.contains('ArrowUp', keys) && R.contains('ArrowRight', keys)) {
      openSetterAndBlurInput(
        'bottomLeft',
        rowIndex - 1,
        circleIndex + 1,
      );
    } else if (R.contains('ArrowDown', keys) && R.contains('ArrowLeft', keys)) {
      openSetterAndBlurInput(
        'bottomLeft',
        rowIndex,
        circleIndex,
      );
    } else if (R.contains('ArrowUp', keys) && R.contains('ArrowLeft', keys)) {
      openSetterAndBlurInput(
        'bottomRight',
        rowIndex - 1,
        circleIndex,
      );
    } else if (R.contains('ArrowDown', keys) && R.contains('ArrowRight', keys)) {
      openSetterAndBlurInput(
        'bottomRight',
        rowIndex,
        circleIndex,
      );
    } else if (R.contains('ArrowRight', keys)) {
      openSetterAndBlurInput(
        'right',
        rowIndex,
        circleIndex,
      );
    } else if (R.contains('ArrowLeft', keys)) {
      openSetterAndBlurInput(
        'right',
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
      const neighbor = document.querySelector(`${selector} input`);
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

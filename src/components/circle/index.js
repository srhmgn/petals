import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames';
import R from 'ramda';

import { getValue, isStatic } from '../../utils';

import './index.css';

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
      <span className='circle' id={ `circle${circleIndex}` }>
        { children }
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

  isStatic() {
    return isStatic(this.props.data);
  }

  handleEvent = (e) => {
    const {
      circleIndex,
      closeSetter,
      data: { dynamic },
      openSetter,
      rowIndex,
      setValue,
      won,
    } = this.props;

    if (won || this.isStatic()) return;

    closeSetter();

    switch (e.type) {
    case 'focus':
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
      if (e.shiftKey) {
        this.focusOnPetal(e, rowIndex, circleIndex, openSetter);
      } else {
        this.focusOnNeighboringField(e.key, rowIndex, circleIndex);
      }
      break;
    default:
      return;
    }
  }

  focusOnPetal = (e, rowIndex, circleIndex, openSetter) => {
    switch (e.key) {
    case 'ArrowRight':
      const rightPetal =
        e.target.parentNode.querySelector('.petal--right');
      const dimensions =
        rightPetal && rightPetal.getBoundingClientRect();

      dimensions && openSetter({
        petalName: 'right',
        parentIndex: `row${rowIndex}-circle${circleIndex}`,
        mousePos: [
          dimensions.left + 50,
          dimensions.top + 80,
        ],
      });
      e.target.blur();
      break;
    default:
      break;
    }
  }

  focusOnNeighboringField = (key, rowIndex, circleIndex) => {
    const selectors = [];

    switch (key) {
    case 'ArrowRight':
      selectors.push(`#row${rowIndex} #circle${circleIndex + 1}`);
      break;
    case 'ArrowLeft':
      selectors.push(`#row${rowIndex} #circle${circleIndex - 1}`);
      break;
    case 'ArrowDown':
      selectors.push(`#row${rowIndex + 1} #circle${circleIndex}`);
      selectors.push(`#row${rowIndex + 1} #circle${circleIndex - 1}`);
      break;
    case 'ArrowUp':
      selectors.push(`#row${rowIndex - 1} #circle${circleIndex}`);
      break;
    default:
      break;
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
}

export default Circle;

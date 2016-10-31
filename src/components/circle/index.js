import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames';
import R from 'ramda';

import { getValue, isStatic } from '../../utils';

import './index.css';

class Circle extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    circleIndex: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    pos: PropTypes.object,
    rowIndex: PropTypes.number.isRequired,
    setPos: PropTypes.func,
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
    const {
      children,
      circleIndex,
      data: { dynamic: { value } },
      isDisabled,
      pos = {},
      rowIndex,
      setPos,
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
        onClick={ () => setPos({ rowIndex, circleIndex }) }>
        <svg
          className='circle__svg'
          viewBox='0 0 200 200'
          xmlns='http://www.w3.org/2000/svg'>
          { children }
        </svg>
        <span className={ numberClassNames }>
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

  isStatic() {
    return isStatic(this.props.data);
  }
}

export default Circle;

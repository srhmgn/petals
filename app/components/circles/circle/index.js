import React, { Component, PropTypes } from 'react';
import R from 'ramda';
import cx from 'classnames';

import { getValue, isStatic } from '../utils';
import { OPERATIONS } from '../index';

import Petal from './petal';

import './index.css';

// disable internal numbers for now/ever - they're ugly
const SHOW_INT_NUMBERS = false;

class Circle extends Component {
  static propTypes = {
    data: PropTypes.object,
    index: PropTypes.string.isRequired,
    neighbors: PropTypes.object,
    openSetter: PropTypes.object,
    operations: PropTypes.object,
    petals: PropTypes.object,
    setOpenSetter: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    value: PropTypes.string,
  };

  state = {
    displayValue: this.getValue(),
  };

  render() {
    const {
      data: { statik },
      index,
      neighbors,
      openSetter,
      operations,
      setOpenSetter,
    } = this.props;

    const { displayValue } = this.state;
    const value = this.getValue();
    const { bottomLeft, bottomRight, left } = neighbors;

    const apply = (operation, ...args) => {
      let initialValue;
      let finalArgs = args;

      switch (operation) {
      case OPERATIONS.ADD:
        initialValue = 0;
        break;
      case OPERATIONS.MULTIPLY:
        initialValue = 1;
        break;
      case OPERATIONS.SUBTRACT:
      case OPERATIONS.DIVIDE:
        initialValue = R.max(...args);
        finalArgs = [R.min(...args)];
        break;
      default:
        return null;
      }

      return finalArgs.reduce((acc, n) => {
        return operation.func(acc, Number(n));
      }, initialValue);
    };

    const doExist = (...args) => R.none(R.isNil, args);

    const bottomLeftInt = doExist(bottomLeft, left) ? (
      <span
        className='circle__bottom-left-int u-is-circle'
        data-content={ SHOW_INT_NUMBERS ?
          apply(operations.int, value, bottomLeft, left) : null
        }
        key={ 0 } />
    ) : null;

    const bottomInt = doExist(bottomRight, bottomLeft) ? (
      <span
        className='circle__bottom-int u-is-circle'
        data-content={ SHOW_INT_NUMBERS ?
          apply(operations.int, value, bottomRight, bottomLeft) : null
        }
        key={ 1 } />
    ) : null;

    const petalProps = {
      openSetter,
      operations,
      neighbors,
      parentIndex: index,
      parentValue: value,
      setOpenSetter,
      statikData: statik,
    };

    const numberClassNames = cx({
      'circle__number': true,
      'circle__number--static': this.isStatic(),
    });

    return (
      <span className='circle'>
        <Petal name='bottomLeft' { ...petalProps }>
          { bottomInt }
          { bottomLeftInt }
        </Petal>
        <Petal name='bottomRight' { ...petalProps } />
        <Petal name='right' { ...petalProps } />
        <input
          className={ numberClassNames }
          onBlur={ this.handleEvent }
          onChange={ this.handleEvent }
          onFocus={ this.handleEvent }
          readOnly={ this.isStatic() }
          value={ displayValue } />
      </span>
    );
  }

  getNeighbor({ children, className, dynamic, statik }) {
    const isStaticProp = !R.isNil(statik);

    return (
      <span
        className={ cx({
          'neighbor': true,
          'neighbor--invalid': isStaticProp && Number(dynamic) !== Number(statik),
          'neighbor--static': isStaticProp,
        }, className) }
        data-content={ isStaticProp ? statik : dynamic }>
        { children }
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
      data: { dynamic },
      setValue,
    } = this.props;

    if (this.isStatic()) return;

    switch (e.type) {
    case 'focus':
      this.setState({ displayValue: '' });
      break;
    case 'blur':
      this.setState({ displayValue: dynamic.value });
      break;
    case 'change':
      if (!e.target.value.match(/^[1-9]*$/)) return;
      this.setState({ displayValue: e.target.value });
      if (e.target.value) setValue(e.target.value);
      break;
    default:
      return;
    }
  }
}

export default Circle;

import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import { getValue, isStatic } from '../utils';

import './index.css';

class Circle extends Component {
  static propTypes = {
    children: PropTypes.node,
    data: PropTypes.object.isRequired,
    setValue: PropTypes.func.isRequired,
    value: PropTypes.string,
  };

  state = {
    displayValue: this.getValue(),
  };

  render() {
    const { children } = this.props;
    const { displayValue } = this.state;

    // const bottomLeftInt = doExist(bottomLeft, left) ? (
    //   <span
    //     className='circle__bottom-left-int u-is-circle'
    //     data-content={ SHOW_INT_NUMBERS ?
    //       apply(operations.int, value, bottomLeft, left) : null
    //     }
    //     key={ 0 } />
    // ) : null;

    // const bottomInt = doExist(bottomRight, bottomLeft) ? (
    //   <span
    //     className='circle__bottom-int u-is-circle'
    //     data-content={ SHOW_INT_NUMBERS ?
    //       apply(operations.int, value, bottomRight, bottomLeft) : null
    //     }
    //     key={ 1 } />
    // ) : null;

    const numberClassNames = cx({
      'circle__number': true,
      'circle__number--static': this.isStatic(),
    });

    return (
      <span className='circle'>
        { children }
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

  // getNeighbor({ children, className, dynamic, statik }) {
  //   const isStaticProp = !R.isNil(statik);

  //   return (
  //     <span
  //       className={ cx({
  //         'neighbor': true,
  //         'neighbor--invalid': isStaticProp && Number(dynamic) !== Number(statik),
  //         'neighbor--static': isStaticProp,
  //       }, className) }
  //       data-content={ isStaticProp ? statik : dynamic }>
  //       { children }
  //     </span>
  //   );
  // }

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

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
      data: { dynamic },
      setValue,
    } = this.props;

    if (this.isStatic()) return;

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
    default:
      return;
    }
  }
}

export default Circle;

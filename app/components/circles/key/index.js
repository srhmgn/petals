import React, { Component, PropTypes } from 'react';
import R from 'ramda';
import cx from 'classnames';

import { OPERATIONS } from '../index';

import './index.css';

class Key extends Component {
  static propTypes = {
    operations: PropTypes.object,
    setOperation: PropTypes.func,
  };

  state = {
    currentSection: null,
  };

  render() {
    const {
      operations,
      setOperation,
    } = this.props;

    const { currentSection } = this.state;

    const optionClasses = cx({
      'key__options u-key-list': true,
      'key__options--visible': !!currentSection,
    });

    const rightClasses = cx({
      'key__item key__item--right': true,
      'key__item--selected': currentSection === 'right',
    });

    const bottomRightClasses = cx({
      'key__item key__item--bottom-right': true,
      'key__item--selected': currentSection === 'bottomRight',
    });

    const bottomLeftClasses = cx({
      'key__item key__item--bottom-left': true,
      'key__item--selected': currentSection === 'bottomLeft',
    });

    const intClasses = cx({
      'key__item key__item--int': true,
      'key__item--selected': currentSection === 'int',
    });

    return (
      <div className='key'>
        <ul className='key__list u-key-list'>
          <li className={ rightClasses }>
            <button
              className='u-reset-button'
              onClick={ () => this.setCurrentSection('right') }>
              { operations.right.label }
            </button>
          </li>
          <li className={ bottomRightClasses }>
            <button
              className='u-reset-button'
              onClick={ () => this.setCurrentSection('bottomRight') }>
              { operations.bottomRight.label }
            </button>
          </li>
          <li className={ bottomLeftClasses }>
            <button
              className='u-reset-button'
              onClick={ () => this.setCurrentSection('bottomLeft') }>
              { operations.bottomLeft.label }
            </button>
          </li>
          <li className={ intClasses }>
            <button
              className='u-reset-button'
              onClick={ () => this.setCurrentSection('int') }>
              { operations.int.label }
            </button>
          </li>
        </ul>
        <ul className={ optionClasses }>
          { R.keys(OPERATIONS).map((operationName, i) => {
            const currentLabel = currentSection &&
              operations[currentSection].label;

            if (
              currentSection === 'int' &&
              (operationName === 'SUBTRACT' || operationName === 'DIVIDE')
            ) return null;

            const keyClasses = cx({
              'key__item': true,
              'key__item--current':
                OPERATIONS[operationName].label === currentLabel,
            });

            return (
              <li className={ keyClasses } key={ i }>
                <button
                  className='u-reset-button'
                  onClick={ () => {
                    setOperation(
                      currentSection,
                      OPERATIONS[operationName],
                    );
                    this.setState({
                      currentSection: null,
                    });
                  } }>
                  { OPERATIONS[operationName].label }
                </button>
              </li>
            );
          }) }
        </ul>
      </div>
    );
  }

  setCurrentSection = (name) => {
    const { currentSection } = this.state;

    this.setState({
      currentSection: (currentSection === name) ? null : name,
    });
  }
}

export default Key;

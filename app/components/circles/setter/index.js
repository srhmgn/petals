import React, { PropTypes } from 'react';
import R from 'ramda';
import cx from 'classnames';

import { OPERATIONS } from '../index';

import './index.css';

function Setter({
  name,
  operations,
  setOperation,
}) {
  return (
    <ul style={ { display: 'none' } }>
      { R.keys(OPERATIONS).map((operationName, i) => {
        const currentLabel = operations[name].label;

        if (
          name === 'int' &&
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
              onClick={ () =>
                setOperation(
                  name,
                  OPERATIONS[operationName],
                )
              }>
              { OPERATIONS[operationName].label }
            </button>
          </li>
        );
      }) }
    </ul>
  );
}

Setter.propTypes = {
  name: PropTypes.string.isRequired,
  operations: PropTypes.object.isRequired,
  setOperation: PropTypes.func.isRequired,
};

export default Setter;

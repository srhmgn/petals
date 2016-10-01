import React, { PropTypes } from 'react';
import R from 'ramda';
import cx from 'classnames';

import { OPERATIONS } from '../../constants';

import './index.css';

function Setter({
  openSetter,
  operations,
  setOperation,
}) {
  const { mousePos, name } = openSetter;
  const [left, top] = mousePos;

  const finalLeft = document.body.clientWidth - left > 98 ?
    left : left - 98;

  return (
    <ul className='setter' style={ { left: finalLeft, top } }>
      { R.keys(OPERATIONS).map((operationName, i) => {
        const currentLabel = operations[name].label;

        if (
          name === 'int' &&
          (operationName === 'SUBTRACT' || operationName === 'MODULO')
        ) return null;

        const setterClasses = cx({
          'setter__item': true,
          'setter__item--current':
            OPERATIONS[operationName].label === currentLabel,
        });

        return (
          <li className={ setterClasses } key={ i }>
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
  openSetter: PropTypes.object.isRequired,
  operations: PropTypes.object.isRequired,
  setOperation: PropTypes.func.isRequired,
};

export default Setter;

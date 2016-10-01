import React, { PropTypes } from 'react';
import R from 'ramda';
import cx from 'classnames';

import { OPERATIONS } from '../../constants';

import './index.css';

function Setter({
  mousePos = [],
  operations,
  petalName,
  setOperation,
}) {
  if (!petalName) return null;
  const [left, top] = mousePos;

  const finalLeft = document.body.clientWidth - left > 98 ?
    left : left - 98;

  return (
    <ul className='setter' style={ { left: finalLeft, top } }>
      { R.keys(OPERATIONS).map((operationName, i) => {
        const currentLabel = operations[petalName].label;

        if (
          petalName === 'int' &&
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
                setOperation({
                  [petalName]: OPERATIONS[operationName],
                })
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
  mousePos: PropTypes.array,
  operations: PropTypes.object.isRequired,
  petalName: PropTypes.string,
  setOperation: PropTypes.func.isRequired,
};

export default Setter;

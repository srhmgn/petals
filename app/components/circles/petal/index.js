import React, { PropTypes } from 'react';
import cx from 'classnames';

import './index.css';

const classMap = {
  bottomLeft: 'bottom-left',
  bottomRight: 'bottom-right',
  right: 'right',
};

function Petal({
  children,
  contentValue,
  isInvalid,
  isStatic,
  debug: {
    dynamic,
    isDebugMode,
    operationLabel,
  },
  name,
  openSetter,
  parentIndex,
  setOpenSetter,
}) {
  const isOpen = openSetter && openSetter.name === name &&
    openSetter.parentIndex === parentIndex;

  return (
    <span
      className={ cx({
        'petal': true,
        [`petal--${classMap[name]}`]: true,
        'petal--invalid': isInvalid,
        'petal--static': isStatic,
      }) }
      data-content={
        isDebugMode ?
          `${dynamic || ''}${operationLabel}${contentValue}` :
          contentValue
      }
      onClick={ (e) => setOpenSetter(isOpen ? null : {
        mousePos: [e.clientX, e.clientY ],
        name,
        parentIndex,
      }, e) }>
      { children }
    </span>
  );
}

Petal.propTypes = {
  children: PropTypes.node,
  contentValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  debug: PropTypes.object.isRequired,
  isInvalid: PropTypes.bool.isRequired,
  isStatic: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  openSetter: PropTypes.object,
  parentIndex: PropTypes.string.isRequired,
  setOpenSetter: PropTypes.func.isRequired,
};

export default Petal;

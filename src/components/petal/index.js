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
  closeSetter,
  contentValue,
  isInvalid,
  isStatic,
  name,
  openSetter,
  parentIndex,
  setter,
}) {
  const isOpen = setter && setter.petalName === name &&
    setter.parentIndex === parentIndex;

  return (
    <span
      className={ cx({
        'petal': true,
        [`petal--${classMap[name]}`]: true,
        'petal--invalid': isInvalid,
        'petal--static': isStatic,
      }) }
      data-content={ contentValue }
      onClick={ (e) => isOpen ?
        closeSetter() : openSetter({
          mousePos: [e.clientX, e.clientY ],
          parentIndex,
          petalName: name,
        }) }>
      { children }
    </span>
  );
}

Petal.propTypes = {
  children: PropTypes.node,
  closeSetter: PropTypes.func.isRequired,
  contentValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  isInvalid: PropTypes.bool.isRequired,
  isStatic: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  openSetter: PropTypes.func.isRequired,
  parentIndex: PropTypes.string.isRequired,
  setter: PropTypes.object,
};

export default Petal;

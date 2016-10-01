import React, { PropTypes } from 'react';
import cx from 'classnames';

import './index.css';

const classMap = {
  bottom: 'bottom',
  bottomLeft: 'bottom-left',
  bottomRight: 'bottom-right',
  right: 'right',
};

function Petal({
  closeSetter,
  contentValue,
  ints,
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
      { ints.map(int =>
        <span
          className={ `petal__int petal__int-${classMap[int]}` }
          key={ int } />
      ) }
    </span>
  );
}

Petal.propTypes = {
  closeSetter: PropTypes.func.isRequired,
  contentValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  ints: PropTypes.arrayOf(PropTypes.string),
  isInvalid: PropTypes.bool.isRequired,
  isStatic: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  openSetter: PropTypes.func.isRequired,
  parentIndex: PropTypes.string.isRequired,
  setter: PropTypes.object,
};

export default Petal;

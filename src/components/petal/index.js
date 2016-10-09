import React, { PropTypes } from 'react';
import cx from 'classnames';

import './index.css';

const petalPath = 'M0,69.17C0.64,44,9.55,21.33,27,2c2.33-2.59,3.71-2.71,6.21-.07C60.79,31.06,68,76.31,50.72,112.36a121.29,121.29,0,0,1-17.31,26.09c-2.44,2.88-4,2.94-6.56.05C9.39,119,.35,96.2,0,69.17Z';

export const petalClassMap = {
  bottom: 'bottom',
  bottomLeft: 'bottom-left',
  bottomRight: 'bottom-right',
  right: 'right',
};

function Petal({
  closeSetter,
  isInvalid,
  name,
  openSetter,
  parentIndex,
  setter,
}) {
  const isOpen = setter && setter.petalName === name &&
    setter.parentIndex === parentIndex;

  return (
    <path
      className={ cx({
        'petal': true,
        [`petal--${petalClassMap[name]}`]: true,
        'petal--invalid': isInvalid,
      }) }
      d={ petalPath }
      onClick={ (e) => {
        console.log('petal');
        isOpen ?
          closeSetter() : openSetter({
            mousePos: [e.clientX, e.clientY ],
            parentIndex,
            petalName: name,
          });
      } } />
  );
}

Petal.propTypes = {
  closeSetter: PropTypes.func.isRequired,
  isInvalid: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  openSetter: PropTypes.func.isRequired,
  parentIndex: PropTypes.string.isRequired,
  setter: PropTypes.object,
};

export default Petal;

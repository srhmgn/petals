import React, { PropTypes } from 'react';
import R from 'ramda';
import cx from 'classnames';

import { apply, doExist } from '../../utils';

import './index.css';

const classMap = {
  bottomLeft: 'bottom-left',
  bottomRight: 'bottom-right',
  right: 'right',
};

function Petal({
  children,
  name,
  openSetter,
  operations,
  neighbors,
  parentIndex,
  parentValue,
  setOpenSetter,
  statikData,
}) {
  const neighborValue = neighbors[name];
  if (!doExist(neighborValue)) return null;

  const dynamic = apply(operations[name], parentValue, neighborValue);
  const statik = (statikData && statikData[name]) ?
    statikData[name] : null;
  const isStaticProp = !R.isNil(statik);
  const isOpen = openSetter && openSetter.name === name &&
    openSetter.parentIndex === parentIndex;

  return (
    <span
      className={ cx({
        'petal': true,
        [`petal--${classMap[name]}`]: true,
        'petal--invalid': isStaticProp && Number(dynamic) !== Number(statik),
        'petal--static': isStaticProp,
      }) }
      data-content={ isStaticProp ? statik : dynamic }
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
  name: PropTypes.string.isRequired,
  neighbors: PropTypes.object.isRequired,
  openSetter: PropTypes.object,
  operations: PropTypes.object.isRequired,
  parentIndex: PropTypes.string.isRequired,
  parentValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  setOpenSetter: PropTypes.func.isRequired,
  statikData: PropTypes.object.isRequired,
};

export default Petal;

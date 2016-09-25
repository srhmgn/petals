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
  operations,
  neighbors,
  parentValue,
  statikData,
}) {
  const neighborValue = neighbors[name];
  if (!doExist(neighborValue)) return null;

  const dynamic = apply(operations.right, parentValue, neighborValue);
  const statik = (statikData && statikData[name]) ?
    statikData[name] : null;
  const isStaticProp = !R.isNil(statik);

  return (
    <span
      className={ cx({
        'petal': true,
        [`petal--${classMap[name]}`]: true,
        'petal--invalid': isStaticProp && Number(dynamic) !== Number(statik),
        'petal--static': isStaticProp,
      }) }
      data-content={ isStaticProp ? statik : dynamic }
      onClick={ () => { } }>
      { children }
    </span>
  );
}

Petal.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  neighbors: PropTypes.object.isRequired,
  operations: PropTypes.object.isRequired,
  parentValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  statikData: PropTypes.object.isRequired,
};

export default Petal;

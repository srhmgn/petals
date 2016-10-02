import R from 'ramda';
import { createSelector, createStructuredSelector } from 'reselect';

import { apply, doExist, getValue } from '../utils';
import { OPERATIONS } from '../constants';

const selectOperations = R.prop('operations');
const selectRows = R.prop('rows');

const SHOW_INTS = false;

function getPetalProps(name, petalProps) {
  const {
    operations,
    neighbors,
    parentValue,
    statikData,
    ...props,
  } = petalProps;

  const neighborValue = neighbors[name];
  if (!doExist(neighborValue)) return null;

  const dynamic = neighborValue ?
    apply(operations[name], parentValue, neighborValue) : null;
  const statik = (statikData && statikData[name]) ?
    statikData[name] : null;
  const isStatic = !R.isNil(statik);

  const ints = [];

  if (name === 'bottomLeft' && SHOW_INTS) {
    const { bottomLeft, left, bottomRight } = neighbors;
    doExist(bottomLeft, left) && ints.push('bottomLeft');
    doExist(bottomRight, bottomLeft) && ints.push('bottom');
  }

  return {
    contentValue: isStatic ? statik : '',
    ints,
    isStatic,
    isInvalid: isStatic && Number(dynamic) !== Number(statik),
    name,
    ...props,
  };
}

const selectCircleProps = createSelector(
  selectOperations,
  selectRows,
  R.prop('setter'),
  (operations, rows, setter) =>
    rows.map((row, rowIndex) => {
      const nextRow = rows[rowIndex + 1];
      return row.map((circle, circleIndex) => {
        const basePetalProps = {
          neighbors: {
            bottomLeft: nextRow && getValue(nextRow[circleIndex - 1]),
            bottomRight: nextRow && getValue(nextRow[circleIndex]),
            left: getValue(row[circleIndex - 1]),
            right: getValue(row[circleIndex + 1]),
          },
          operations,
          parentIndex: `row${rowIndex}-circle${circleIndex}`,
          parentValue: getValue(circle),
          setter,
          statikData: circle.statik,
        };

        return {
          data: circle,
          petals: [
            getPetalProps('right', basePetalProps),
            getPetalProps('bottomLeft', basePetalProps),
            getPetalProps('bottomRight', basePetalProps),
          ],
        };
      });
    })
);

const selectSetterProps = createSelector(
  selectOperations,
  R.prop('setter'),
  (operations, setterProps) => {
    let activeIndex;

    if (setterProps) {
      const currentLabel = operations[setterProps.petalName].label;
      activeIndex = R.findIndex(
        R.propEq('label', currentLabel),
        R.values(OPERATIONS),
      );
    }

    return {
      activeIndex,
      ...setterProps,
    };
  }
);

const selectWon = createSelector(
  selectCircleProps,
  circleProps =>
    circleProps.every(row =>
      row.every(({ petals }) =>
        petals.every(petal => !petal || !petal.isInvalid)
      )
    )
);

export default createStructuredSelector({
  circleProps: selectCircleProps,
  gameId: R.prop('gameId'),
  operations: selectOperations,
  rows: selectRows,
  setterProps: selectSetterProps,
  size: R.prop('size'),
  won: selectWon,
});

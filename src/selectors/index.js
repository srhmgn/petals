import R from 'ramda';
import { createSelector, createStructuredSelector } from 'reselect';

import { apply, doExist, getValue } from '../utils';

const selectOperations = R.prop('operations');
const selectRows = R.prop('rows');
const selectWon = R.prop('won');

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

  return {
    contentValue: isStatic ? statik : '',
    isStatic,
    isInvalid: isStatic && Number(dynamic) !== Number(statik),
    name,
    ...props,
  };
}

const circleProps = createSelector(
  selectOperations,
  selectRows,
  selectWon,
  (operations, rows, won) =>
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
          parentIndex: `${rowIndex}${circleIndex}`,
          parentValue: getValue(circle),
          statikData: circle.statik,
        };

        return {
          data: circle,
          petals: [
            getPetalProps('right', basePetalProps),
            getPetalProps('bottomLeft', basePetalProps),
            getPetalProps('bottomRight', basePetalProps),
          ],
          won,
        };
      });
    })
);

const selectSetterProps = createSelector(
  selectOperations,
  R.prop('setter'),
  (operations, setterProps) => ({
    operations, // TODO
    ...setterProps,
  })
);

export default createStructuredSelector({
  operations: selectOperations,
  rows: selectRows,
  setterProps: selectSetterProps,
  won: selectWon,
  circleProps: circleProps,
});

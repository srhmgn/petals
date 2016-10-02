import R from 'ramda';

import { buildRows } from '../utils';

export default function(state = [], action) {
  switch (action.type) {
  case 'BUILD_ROWS':
    return buildRows(action.size);
  case 'SET_ROW_CIRCLE':
    return getUpdatedRow(state, action);
  case 'CLEAR_ROW_VALUES':
    return state.map(row =>
      row.map(circle => R.assocPath(['dynamic'], {}, circle))
    );
  default:
    return state;
  }
}

function getUpdatedRow(state, action) {
  const row = state[action.rowIndex];
  const circle = row[action.circleIndex];
  const newCircle = R.assocPath(
    ['dynamic', 'value'],
    action.value,
    circle,
  );
  const newRow = R.update(action.circleIndex, newCircle, row);
  return R.update(action.rowIndex, newRow, state);
}

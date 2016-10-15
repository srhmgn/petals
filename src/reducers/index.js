import { combineReducers } from 'redux';

import gameId from './game-id';
import instructions from './instructions';
import operations from './operations';
import operationSetter from './operation-setter';
import petalCount from './petal-count';
import rows from './rows';
import size from './size';
import valueSetter from './value-setter';

const petals = combineReducers({
  gameId,
  instructions,
  operations,
  operationSetter,
  petalCount,
  rows,
  size,
  valueSetter,
});

export default petals;

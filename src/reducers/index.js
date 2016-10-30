import { combineReducers } from 'redux';

import gameId from './game-id';
import instructions from './instructions';
import operations from './operations';
import petalCount from './petal-count';
import petalName from './petal-name';
import rows from './rows';
import size from './size';

const petals = combineReducers({
  gameId,
  instructions,
  operations,
  petalCount,
  petalName,
  rows,
  size,
});

export default petals;

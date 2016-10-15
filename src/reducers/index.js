import { combineReducers } from 'redux';

import gameId from './game-id';
import instructions from './instructions';
import operations from './operations';
import petalCount from './petal-count';
import rows from './rows';
import setter from './operation-setter';
import size from './size';

const petals = combineReducers({
  gameId,
  instructions,
  operations,
  petalCount,
  rows,
  setter,
  size,
});

export default petals;

import { combineReducers } from 'redux';

import gameId from './game-id';
import instructions from './instructions';
import operations from './operations';
import rows from './rows';
import setter from './setter';
import size from './size';

const petals = combineReducers({
  gameId,
  instructions,
  operations,
  rows,
  setter,
  size,
});

export default petals;

import { combineReducers } from 'redux';

import gameId from './game-id';
import operations from './operations';
import rows from './rows';
import setter from './setter';
import size from './size';

const petals = combineReducers({
  gameId,
  operations,
  rows,
  setter,
  size,
});

export default petals;

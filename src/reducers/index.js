import { combineReducers } from 'redux';

import gameId from './game-id';
import operations from './operations';
import rows from './rows';
import setter from './setter';

const petals = combineReducers({
  gameId,
  operations,
  rows,
  setter,
});

export default petals;

import { combineReducers } from 'redux';

import operations from './operations';
import rows from './rows';
import setter from './setter';
import won from './won';

const petals = combineReducers({
  operations,
  rows,
  setter,
  won,
});

export default petals;

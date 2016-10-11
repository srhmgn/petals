import R from 'ramda';

import { OPERATIONS } from '../constants';

const INITIAL_STATE = {
  right: OPERATIONS.ADD,
  bottomLeft: OPERATIONS.ADD,
  bottomRight: OPERATIONS.ADD,
};

export default function(state = INITIAL_STATE, { type, ...newOp }) {
  switch (type) {
  case 'SET_OPERATION':
    return R.merge(state, newOp);
  case 'BUILD_ROWS':
  case 'RESET_GAME':
    return INITIAL_STATE;
  default:
    return state;
  }
}

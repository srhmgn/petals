import { DEFAULT_SIZE } from '../constants';

export default function(state = DEFAULT_SIZE, action) {
  switch (action.type) {
  case 'SET_SIZE':
    return action.size;
  default:
    return state;
  }
}

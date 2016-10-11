import { DEFAULT_PETAL_COUNT } from '../constants';

export default function(state = DEFAULT_PETAL_COUNT, action) {
  switch (action.type) {
  case 'SET_PETAL_COUNT':
    return action.petalCount;
  default:
    return state;
  }
}

import { buildRows } from '../utils';

export default function(state = [], action) {
  switch (action.type) {
  case 'BUILD_ROWS':
    return buildRows(action.size);
  default:
    return state;
  }
}

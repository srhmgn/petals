const INITIAL_STATE = { rowIndex: 0, circleIndex: 0 };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SET_POS':
    return {
      circleIndex: action.circleIndex,
      rowIndex: action.rowIndex,
    };
  default:
    return state;
  }
}

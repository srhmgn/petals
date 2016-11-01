export default function(state = 'right', action) {
  switch (action.type) {
  case 'SET_PETAL_NAME':
    return action.petalName;
  case 'BUILD_ROWS':
  case 'RESET_GAME':
    return 'right';
  default:
    return state;
  }
}

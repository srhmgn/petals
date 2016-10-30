export default function(state = 'right', action) {
  switch (action.type) {
  case 'SET_PETAL_NAME':
    return action.petalName;
  default:
    return state;
  }
}

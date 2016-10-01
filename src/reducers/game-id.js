export default function(state = 0, action) {
  switch (action.type) {
  case 'BUILD_ROWS':
    return state + 1;
  default:
    return state;
  }
}

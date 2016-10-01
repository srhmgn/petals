export default function(state = false, action) {
  switch (action.type) {
  case 'SET_WON':
    return action.won;
  default:
    return state;
  }
}

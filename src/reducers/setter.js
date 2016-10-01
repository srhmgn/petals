export default function(state = null, { type, ...props }) {
  switch (type) {
  case 'OPEN_SETTER':
    return props;
  case 'SET_OPERATION':
  case 'CLOSE_SETTER':
    return null;
  default:
    return state;
  }
}

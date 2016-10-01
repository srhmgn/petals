export default function(state = null, { type, ...props }) {
  switch (type) {
  case 'OPEN_SETTER':
    return props;
  case 'CLOSE_SETTER':
    return null;
  default:
    return state;
  }
}

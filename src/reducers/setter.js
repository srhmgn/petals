export default function(state = null, { type, ...props }) {
  switch (type) {
  case 'OPEN_SETTER':
    return props;
  default:
    return state;
  }
}

export default function(state = null, action) {
  const { type, ...props } = action;
  switch (type) {
  case 'OPEN_VALUE_SETTER':
    return props;
  default:
    return null;
  }
}

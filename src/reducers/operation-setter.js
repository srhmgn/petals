export default function(state = null, action) {
  const { type, isKeyboardAction, ...props } = action;
  switch (type) {
  case 'OPEN_OPERATION_SETTER':
    return props;
  case 'SET_OPERATION':
    return isKeyboardAction ? state : null;
  default:
    return null;
  }
}

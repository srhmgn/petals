export default function(state = null, { type, ...props }) {
  return type === 'OPEN_SETTER' ? props : null;
}

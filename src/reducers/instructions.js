import R from 'ramda';
const INITIAL_STATE = {
  isVisible: true,
  step: 0,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'TOGGLE_INSTRUCTIONS':
    return R.assoc(
      'isVisible',
      !state.isVisible,
      state
    );
  case 'SET_INSTRUCTIONS_STEP':
    return R.assoc(
      'step',
      action.step,
      state
    );
  default:
    return state;
  }
}

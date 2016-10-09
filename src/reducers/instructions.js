import R from 'ramda';
const INITIAL_STATE = {
  isVisible: false,
  step: 0,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'TOGGLE_INSTRUCTIONS':
    return {
      isVisible: !state.isVisible,
      step: 0,
    };
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

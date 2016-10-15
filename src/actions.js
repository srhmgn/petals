/* operation */

export const setOperation = props => ({
  type: 'SET_OPERATION',
  ...props,
});

/* setter */

export const openOperationSetter = props => ({
  type: 'OPEN_SETTER',
  ...props,
});

export const closeOperationSetter = () => ({
  type: 'CLOSE_SETTER',
});

/* rows */

export const buildRows = (size, petalCount) => ({
  type: 'BUILD_ROWS',
  size,
  petalCount,
});

export const setRowCircle = props => ({
  type: 'SET_ROW_CIRCLE',
  ...props,
});

export const resetGame = () => ({
  type: 'RESET_GAME',
});

/* size */

export const setSize = size => ({
  type: 'SET_SIZE',
  size,
});

/* petal count */

/* size */

export const setPetalCount = petalCount => ({
  type: 'SET_PETAL_COUNT',
  petalCount,
});

/* instructions */

export const toggleInstructions = () => ({
  type: 'TOGGLE_INSTRUCTIONS',
});

export const setInstructionStep = step => ({
  type: 'SET_INSTRUCTIONS_STEP',
  step,
});

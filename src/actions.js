/* operation */

export const setOperation = props => ({
  type: 'SET_OPERATION',
  ...props,
});

/* setter */

export const openSetter = props => ({
  type: 'OPEN_SETTER',
  ...props,
});

export const closeSetter = () => ({
  type: 'CLOSE_SETTER',
});

/* rows */

export const buildRows = size => ({
  type: 'BUILD_ROWS',
  size,
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

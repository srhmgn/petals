/* won */

export const setWon = won => ({
  type: 'SET_WON',
  won,
});

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

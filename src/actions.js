export const setWon = won => ({
  type: 'SET_WON',
  won,
});

export const buildRows = size => ({
  type: 'BUILD_ROWS',
  size,
});

export const setOperation = props => ({
  type: 'BUILD_ROWS',
  ...props,
});

import R from 'ramda';

export const DEFAULT_SIZE = 2;

export const OPERATIONS = {
  ADD: {
    func: R.add,
    label: '+',
    inverse: 'SUBTRACT',
  },
  SUBTRACT: {
    func: R.subtract,
    label: '-',
    inverse: 'ADD',
  },
  MULTIPLY: {
    func: R.multiply,
    label: 'x',
    inverse: 'DIVIDE',
  },
  DIVIDE: {
    func: R.divide,
    label: '÷',
    inverse: 'MULTIPLY',
  },
};

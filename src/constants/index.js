import R from 'ramda';

export const DEFAULT_SIZE = 4;
export const DEFAULT_PETAL_COUNT = 6;

export const OPERATIONS = {
  ADD: {
    func: R.add,
    label: '+',
    inverse: 'SUBTRACT',
  },
  MULTIPLY: {
    func: R.multiply,
    label: 'x',
    inverse: 'DIVIDE',
  },
  SUBTRACT: {
    func: R.subtract,
    label: '–',
    inverse: 'ADD',
  },
  DIVIDE: {
    func: R.divide,
    label: '÷',
    inverse: 'MULTIPLY',
  },
};

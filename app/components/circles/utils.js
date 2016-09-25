import R from 'ramda';

import { OPERATIONS } from './index';

export function getRandom(max = 10) {
  const list = R.range(1, max);
  return list[Math.floor(Math.random() * list.length)];
}

export function getValue(data) {
  if (!data) return null;

  const { statik, dynamic } = data;

  return isStatic(data) ? statik.value : dynamic.value;
}

export function isStatic({ statik }) {
  return !R.isNil(statik.value);
}

export const doExist = (...args) => R.none(R.isNil, args);

export const apply = (operation, ...args) => {
  let initialValue;
  let finalArgs = args;

  switch (operation) {
  case OPERATIONS.ADD:
    initialValue = 0;
    break;
  case OPERATIONS.MULTIPLY:
    initialValue = 1;
    break;
  case OPERATIONS.SUBTRACT:
  case OPERATIONS.DIVIDE:
    initialValue = R.max(...args);
    finalArgs = [R.min(...args)];
    break;
  default:
    return null;
  }

  return finalArgs.reduce((acc, n) => {
    return operation.func(acc, Number(n));
  }, initialValue);
};

import R from 'ramda';

import { OPERATIONS } from './index';

export function getRows(size = 4) {
  const rows = [];

  for (let i = size; i > 0; i--) {
    rows.push(R.range(0, i).map(() => {
      return {
        statik: getStatic(),
        dynamic: {
          value: getRandom(),
        },
      };
    }));
  }

  return rows;
}

function getStatic() {
  const staticOdds = 4;

  const out = {
    bottomLeft: oneIn(staticOdds) ? getRandom(18) : undefined,
    bottomRight: oneIn(staticOdds) ? getRandom(18) : undefined,
    right: oneIn(staticOdds) ? getRandom(18) : undefined,
  };

  return R.filter(R.identity, out);
}

function oneIn(max = 2) {
  return getRandom(max) === 1;
}

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
  case OPERATIONS.MODULO:
    initialValue = R.max(...args);
    finalArgs = [R.min(...args)];
    break;
  default:
    return null;
  }

  const out = finalArgs.reduce((acc, n) => {
    return operation.func(acc, Number(n));
  }, initialValue);

  return out.toFixed();
};

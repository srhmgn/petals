import R from 'ramda';

import { OPERATIONS } from './index';

export function buildRows(size) {
  const rows = [];

  for (let i = size; i > 0; i--) {
    rows.push(R.range(0, i).map(() => {
      return {
        statik: getStatic(),
        dynamic: {
          value: '',
        },
      };
    }));
  }

  return rows;
}

function getStatic() {
  const staticOdds = 4;

  const out = {
    bottomLeft: oneIn(staticOdds) ? getRandomPetalValue() : undefined,
    bottomRight: oneIn(staticOdds) ? getRandomPetalValue() : undefined,
    right: oneIn(staticOdds) ? getRandomPetalValue() : undefined,
  };

  return R.filter(R.identity, out);
}

const nonPrimes = R.range(19, 82).filter(n =>
  R.any(x => {
    return n % x === 0 && n / x <= 9;
  }, R.range(2, 10))
);

function getRandomPetalValue() {
  const list = R.concat(R.range(1, 19), nonPrimes);
  return getRandomFromList(list);
}

function oneIn(max = 2) {
  return getRandom(max) === 1;
}

export function getRandom(max = 10) {
  const list = R.range(1, max);
  return getRandomFromList(list);
}

export function getRandomFromList(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export function getValue(data) {
  if (!data) return null;

  const { statik, dynamic } = data;

  if (isStatic(data)) return statik.value;

  return dynamic ? (dynamic.value || 'EMPTY') : null;
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

function getRandomOperation(except = []) {
  const list = R.without(except, OPERATIONS);

  return list[getRandomFromList(R.keys(list))];
}

function getValueAndStatik({ value, operation, tried = [] }) {
  const newValue = getRandomFromList(
    R.without(tried, R.range(1, 10))
  );

  const statik = operation.func(
    Math.max(value, newValue),
    Math.min(value, newValue)
  );

  if (statik % 1 === 0 && statik > 0) {
    return { newValue, statik };
  }

  tried.push(newValue);

  return getValueAndStatik({ value, operation, tried });
}

function getOperationAndStatic({ values, tried = [] }) {
  const operation = getRandomOperation(tried);
  const statik = operation.func(
    Math.max(values[0], values[1]),
    Math.min(values[0], values[1]),
  );

  // console.log(
  //   'trying...',
  //   values[0],
  //   operation.label,
  //   values[1],
  //   '=',
  //   statik,
  // );

  if (statik % 1 === 0 && statik > 0) {
    return { statik, operation };
  }

  tried.push(operation);

  return getOperationAndStatic({ values, tried });
}

export function setUpGame() {
  const firstValue = getRandom();

  const right = getRandomOperation();
  const bottomRight = getRandomOperation();

  const {
    newValue: secondValue,
    statik: firstStatikRight,
  } = getValueAndStatik({ value: firstValue, operation: right });

  const {
    newValue: thirdValue,
    statik: firstStatikBottomRight,
  } = getValueAndStatik({ value: firstValue, operation: bottomRight });

  const {
    operation: bottomLeft,
    statik: firstStatikBottomLeft,
  } = getOperationAndStatic({ values: [secondValue, thirdValue] });

  const {
    newValue: fourthValue,
    statik: secondStatikRight,
  } = getValueAndStatik({ value: secondValue, operation: right });

  console.log('-----');
  console.log('2nd', secondValue);
  console.log(right.label);
  console.log('1st', firstValue);
  console.log(firstStatikRight);
  console.log('-----');
  console.log('3rd', thirdValue);
  console.log(bottomRight.label);
  console.log('1st', firstValue);
  console.log(firstStatikBottomRight);
  console.log('-----');
  console.log('2nd', secondValue);
  console.log(bottomLeft.label);
  console.log('3rd', thirdValue);
  console.log(firstStatikBottomLeft);
  console.log('-----');
  console.log('2nd', secondValue);
  console.log(right.label);
  console.log('4th', fourthValue);
  console.log(secondStatikRight);

  return {
    rows: [
      [
        {
          dynamic: {},
          statik: {
            bottomRight: firstStatikBottomRight,
            right: firstStatikRight,
          },
        },
        {
          dynamic: {},
          statik: {
            bottomLeft: firstStatikBottomLeft,
            right: secondStatikRight,
          },
        },
        {
          dynamic: {},
          statik: {},
        },
      ],
      [
        {
          dynamic: {},
          statik: {},
        },
        {
          dynamic: {},
          statik: {},
        },
      ],
    ],
    operations: {
      right: OPERATIONS.ADD,
      bottomLeft: true ? OPERATIONS.ADD : bottomLeft, // for linting
      bottomRight: OPERATIONS.ADD,
    },
  };
}

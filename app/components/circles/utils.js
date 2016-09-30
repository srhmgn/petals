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

const PETAL_LIST = R.concat(R.range(1, 19), nonPrimes);

function getRandomPetalValue() {
  return getRandomFromList(PETAL_LIST);
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
  if (args.some(R.equals('EMPTY'))) return null;

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

  if (statik % 1 === 0 && statik > 0) {
    return { statik, operation };
  }

  tried.push(operation);

  return getOperationAndStatic({ values, tried });
}

export function getStatiks({ pairs }) {
  const possibleStatiks = [];
  const possibleNewValues = R.range(1, 10);

  pairs.forEach(({ value, operation }) => {
    // console.log(value);
    // console.log(operation.label);

    possibleStatiks.push(
      possibleNewValues.map(newValue =>
        apply(operation, newValue, value)
      )
    );
  });

  // console.log(possibleStatiks);

  const valuesWithValidStatiks = R.range(1, 10).filter(value =>
    possibleStatiks.every(statikList =>
      R.contains(Number(statikList[value - 1]), PETAL_LIST)
    )
  );

  if (valuesWithValidStatiks.length === 0) return {};

  const value = getRandomFromList(valuesWithValidStatiks);

  // console.log(valuesWithValidStatiks);

  const out = {
    secondStatikBottomRight: possibleStatiks[0][value - 1],
    secondStatikBottomLeft: possibleStatiks[1][value - 1],
    thirdStatikRight: possibleStatiks[2][value - 1],
    fifthValue: value,
  };

  // console.log(out);

  return out;
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
    newValue: fourthValue,
    statik: firstStatikBottomRight,
  } = getValueAndStatik({ value: firstValue, operation: bottomRight });

  const {
    operation: bottomLeft,
    statik: firstStatikBottomLeft,
  } = getOperationAndStatic({ values: [secondValue, fourthValue] });

  const {
    newValue: thirdValue,
    statik: secondStatikRight,
  } = getValueAndStatik({ value: secondValue, operation: right });

  const {
    secondStatikBottomRight,
    secondStatikBottomLeft,
    thirdStatikRight,
    fifthValue,
  } = getStatiks({
    pairs: [
      { value: secondValue, operation: bottomRight },
      { value: thirdValue, operation: bottomLeft },
      { value: fourthValue, operation: right },
    ],
  });

  if (!fifthValue) {
    // console.log('didnt work, starting over');
    return setUpGame();
  }

  // console.log(
  //   'right',
  //   right.label,
  //   'bottomleft',
  //   bottomLeft.label,
  //   'bottomRight',
  //   bottomRight.label,
  // );

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
            bottomRight: secondStatikBottomRight,
            right: secondStatikRight,
          },
        },
        {
          dynamic: {},
          statik: {
            bottomLeft: secondStatikBottomLeft,
          },
        },
      ],
      [
        {
          dynamic: {},
          statik: {
            right: thirdStatikRight,
          },
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

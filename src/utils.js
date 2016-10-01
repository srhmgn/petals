import R from 'ramda';

import { OPERATIONS } from './constants';

const nonPrimes = R.range(19, 82).filter(n =>
  R.any(x => {
    return n % x === 0 && n / x <= 9;
  }, R.range(2, 10))
);

const PETAL_LIST = R.concat(R.range(1, 19), nonPrimes);

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

  return out;
};

function getRandomOperation(except = []) {
  const list = R.without(except, OPERATIONS);
  return list[getRandomFromList(R.keys(list))];
}

function setBottomLeft({ circle, operations, neighbor, tried = [] }) {
  const operation = getRandomOperation(tried);
  const values = [circle.getValue(), neighbor.getValue()];

  const statik = operation.func(
    Math.max(values[0], values[1]),
    Math.min(values[0], values[1]),
  );

  if (statik % 1 === 0 && statik > 0) {
    operations.bottomLeft = operation;
    circle.setStatic({ bottomLeft: statik });
    return false;
  }

  tried.push(operation);

  return setBottomLeft({ circle, operations, neighbor, tried });
}

export function setValueAndStatiks({ circle, operations, sets }) {
  const possibleStatiks = [];
  const possibleNewValues = R.range(1, 10);

  sets.forEach(({ setCircle, operationName }) => {
    possibleStatiks.push(
      possibleNewValues.map(newValue =>
        apply(operations[operationName], newValue, setCircle.getValue())
      )
    );
  });

  const valuesWithValidStatiks = R.range(1, 10).filter(value =>
    possibleStatiks.every(statikList =>
      R.contains(Number(statikList[value - 1]), PETAL_LIST)
    )
  );

  if (valuesWithValidStatiks.length === 0) return false;

  const value = getRandomFromList(valuesWithValidStatiks);

  circle.setValue(value);

  sets.forEach(({ setCircle, operationName }, i) =>
    setCircle.setStatic({ [operationName]: possibleStatiks[i][value - 1] })
  );

  return true;
}

class Circle {
  constructor(statik = {}) {
    this.statik = statik;
  }

  setValue(val) {
    this.value = val;
  }

  getValue() {
    return this.value;
  }

  setStatic(statikPair) {
    this.statik = R.merge(this.statik, statikPair);
  }

  toObj() {
    return {
      statik: this.statik,
      dynamic: {
        // value: this.value,
      },
    };
  }
}

function buildRowShape(rows, rowCount) {
  if (rowCount === 0) return rows;

  const row = [];
  R.times(() => {
    row.push(new Circle());
  }, rowCount);
  rows.push(row);

  return buildRowShape(rows, rowCount - 1);
}

export function buildRows(size) {
  /* eslint-disable no-console */
  console.log('setting up game');
  /* eslint-enable no-console */

  const operations = {
    right: getRandomOperation(),
    bottomRight: getRandomOperation(),
  };

  const rows = buildRowShape([], size);

  rows[0][0].setValue(getRandom());

  // size = 2

  setValueAndStatiks({
    circle: rows[0][1],
    operations,
    sets: [
      { setCircle: rows[0][0], operationName: 'right' },
    ],
  }) || buildRows(size);

  setValueAndStatiks({
    circle: rows[1][0],
    operations,
    sets: [
      { setCircle: rows[0][0], operationName: 'bottomRight' },
    ],
  }) || buildRows(size);

  setBottomLeft({
    circle: rows[0][1],
    neighbor: rows[1][0],
    operations,
  });

  // size = 3

  if (size >= 3) {
    setValueAndStatiks({
      circle: rows[0][2],
      operations,
      sets: [
        { setCircle: rows[0][1], operationName: 'right' },
      ],
    }) || buildRows(size);

    setValueAndStatiks({
      circle: rows[1][1],
      operations,
      sets: [
        { setCircle: rows[0][1], operationName: 'bottomRight' },
        { setCircle: rows[0][2], operationName: 'bottomLeft' },
        { setCircle: rows[1][0], operationName: 'right' },
      ],
    }) || buildRows(size);

    setValueAndStatiks({
      circle: rows[2][0],
      operations,
      sets: [
        { setCircle: rows[1][0], operationName: 'bottomRight' },
        { setCircle: rows[1][1], operationName: 'bottomLeft' },
      ],
    }) || buildRows(size);
  }

  // size = 4

  if (size >= 4) {
    setValueAndStatiks({
      circle: rows[0][3],
      operations,
      sets: [
        { setCircle: rows[0][2], operationName: 'right' },
        { setCircle: rows[0][2], operationName: 'bottomRight' },
      ],
    }) || buildRows(size);

    setValueAndStatiks({
      circle: rows[1][2],
      operations,
      sets: [
        { setCircle: rows[1][1], operationName: 'right' },
        { setCircle: rows[0][2], operationName: 'bottomRight' },
        { setCircle: rows[0][3], operationName: 'bottomLeft' },
      ],
    }) || buildRows(size);

    setValueAndStatiks({
      circle: rows[2][1],
      operations,
      sets: [
        { setCircle: rows[2][0], operationName: 'right' },
        { setCircle: rows[1][1], operationName: 'bottomRight' },
        { setCircle: rows[1][2], operationName: 'bottomLeft' },
      ],
    }) || buildRows(size);

    setValueAndStatiks({
      circle: rows[3][0],
      operations,
      sets: [
        { setCircle: rows[2][0], operationName: 'bottomRight' },
        { setCircle: rows[2][1], operationName: 'bottomLeft' },
      ],
    }) || buildRows(size);
  }

  return rows.map(row =>
    row.map(circle => circle.toObj())
  );
}

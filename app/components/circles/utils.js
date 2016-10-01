import R from 'ramda';

import { OPERATIONS } from './index';

// export function buildRows(size) {
//   const rows = [];

//   for (let i = size; i > 0; i--) {
//     rows.push(R.range(0, i).map(() => {
//       return {
//         statik: getStatic(),
//         dynamic: {
//           value: '',
//         },
//       };
//     }));
//   }

//   return rows;
// }

// function getStatic() {
//   const staticOdds = 4;

//   const out = {
//     bottomLeft: oneIn(staticOdds) ? getRandomPetalValue() : undefined,
//     bottomRight: oneIn(staticOdds) ? getRandomPetalValue() : undefined,
//     right: oneIn(staticOdds) ? getRandomPetalValue() : undefined,
//   };

//   return R.filter(R.identity, out);
// }

const nonPrimes = R.range(19, 82).filter(n =>
  R.any(x => {
    return n % x === 0 && n / x <= 9;
  }, R.range(2, 10))
);

const PETAL_LIST = R.concat(R.range(1, 19), nonPrimes);

// function getRandomPetalValue() {
//   return getRandomFromList(PETAL_LIST);
// }

// function oneIn(max = 2) {
//   return getRandom(max) === 1;
// }

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

// const {
//   operation: bottomLeft,
//   statik: firstStatikBottomLeft,
// } = getOperationAndStatic({ values: [secondValue, thirdValue] });

// function setOperationAndStatic({ values, tried = [] }) {
//   const operation = getRandomOperation(tried);
//   const statik = operation.func(
//     Math.max(values[0], values[1]),
//     Math.min(values[0], values[1]),
//   );

//   if (statik % 1 === 0 && statik > 0) {
//     return { statik, operation };
//   }

//   tried.push(operation);

//   return getOperationAndStatic({ values, tried });
// }

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
      dynamic: {},
    };
  }
}

function buildRows(rows, rowCount) {
  if (rowCount === 0) return rows;

  const row = [];
  R.times(() => {
    row.push(new Circle());
  }, rowCount);
  rows.push(row);

  return buildRows(rows, rowCount - 1);
}

export function setUpGame(size = 2) {
  /* eslint-disable no-console */
  console.log('setting up game');
  /* eslint-enable no-console */

  const operations = {
    right: getRandomOperation(),
    bottomRight: getRandomOperation(),
  };

  const rows = buildRows([], size);

  rows[0][0].setValue(getRandom());

  setValueAndStatiks({
    circle: rows[0][1],
    operations,
    sets: [
      { setCircle: rows[0][0], operationName: 'right' },
    ],
  }) || setUpGame();

  setValueAndStatiks({
    circle: rows[1][0],
    operations,
    sets: [
      { setCircle: rows[0][0], operationName: 'bottomRight' },
    ],
  }) || setUpGame();

  setBottomLeft({
    circle: rows[0][1],
    neighbor: rows[1][0],
    operations,
  });

  // console.log(rows);

  // const notAllRowsHaveValues = rows.some(row =>
  //   row.some(circle => circle.getValue());
  // );

  // if (notAllRowsHaveValues) {
  //   /* eslint-disable no-console */
  //   console.log('didnt work, starting over');
  //   /* eslint-enable no-console */
  //   return setUpGame();
  // }

  // const {
  //   value: thirdValue,
  //   statiks: [
  //     firstStatikBottomRight,
  //   ],
  // } = getValueAndStatiks([
  //   { value: firstValue, operation: bottomRight },
  // ]);

  // const {
  //   operation: bottomLeft,
  //   statik: firstStatikBottomLeft,
  // } = getOperationAndStatic({ values: [secondValue, thirdValue] });

  // const {
  //   value: thirdValue,
  //   statiks: [
  //     secondStatikRight,
  //   ],
  // } = getValueAndStatiks([
  //   { value: secondValue, operation: right },
  // ]);

  // const {
  //   value: fifthValue,
  //   statiks: [
  //     secondStatikBottomRight,
  //     secondStatikBottomLeft,
  //     thirdStatikRight,
  //   ],
  // } = getValueAndStatiks([
  //   { value: secondValue, operation: bottomRight },
  //   { value: thirdValue, operation: bottomLeft },
  //   { value: fourthValue, operation: right },
  // ]);

  // const {
  //   value: sixthValue,
  //   statiks: [
  //     thirdStatikBottomRight,
  //     thirdStatikBottomLeft,
  //   ],
  // } = getValueAndStatiks([
  //   { value: fourthValue, operation: bottomRight },
  //   { value: fifthValue, operation: bottomLeft },
  // ]);

  // if (!fifthValue || !sixthValue) {
  //   /* eslint-disable no-console */
  //   console.log('didnt work, starting over');
  //   /* eslint-enable no-console */
  //   return setUpGame();
  // }

  return {
    rows: rows.map(row =>
      row.map(circle => circle.toObj())
    ),
    operations: {
      right: OPERATIONS.ADD,
      bottomLeft: OPERATIONS.ADD,
      bottomRight: OPERATIONS.ADD,
    },
  };
}

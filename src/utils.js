import R from 'ramda';

import { OPERATIONS } from './constants';

const nonPrimes = R.range(19, 82).filter(n =>
  R.any(x => {
    return n % x === 0 && n / x <= 9;
  }, R.range(2, 10))
);

const PETAL_LIST = R.concat(R.range(1, 19), nonPrimes);

// number of petals required to allow alt version of petal

const minCountForAltMap = {
  right: 4,
  bottomRight: 5,
  bottomLeft: 6,
};

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

  if (valuesWithValidStatiks.length === 0) throw new Error('no statiks');

  const value = getRandomFromList(valuesWithValidStatiks);

  circle.setValue(value);

  sets.forEach(({ setCircle, operationName }, i) => {
    setCircle.setStatic({ [operationName]: possibleStatiks[i][value - 1] });
  });
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

  toObj(debug = false) {
    return {
      statik: this.statik,
      dynamic: {
        value: debug ? this.value : '',
      },
    };
  }
}

function getAltPetal(petalName, petalCount, index) {
  if (petalCount < minCountForAltMap[petalName]) return petalName;

  return index % 2 === 0 ? petalName : `${petalName}Alt`;
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

export function buildRows(size, petalCount, tries = 0) {
  /* eslint-disable no-console */
  console.log('setting up game', tries);
  /* eslint-enable no-console */

  if (tries >= 10) return null;

  const operations = {
    rightAlt: getRandomOperation(),
    right: getRandomOperation(),
    bottomRight: getRandomOperation(),
    bottomRightAlt: getRandomOperation(),
    bottomLeftAlt: getRandomOperation(),
  };

  const rows = buildRowShape([], size);

  rows[0][0].setValue(getRandom());

  try {
    // size = 2

    setValueAndStatiks({
      circle: rows[0][1],
      operations,
      sets: [
        { setCircle: rows[0][0], operationName: 'right' },
      ],
    });

    setValueAndStatiks({
      circle: rows[1][0],
      operations,
      sets: [
        { setCircle: rows[0][0], operationName: 'bottomRight' },
      ],
    });

    setBottomLeft({
      circle: rows[0][1],
      neighbor: rows[1][0],
      operations,
    });

    R.range(3, size + 1).forEach(s => {
      setValueAndStatiks({
        circle: rows[0][s - 1],
        operations,
        sets: [
          {
            setCircle: rows[0][s - 2],
            operationName: getAltPetal('right', petalCount, s),
          },
        ],
      });

      setValueAndStatiks({
        circle: rows[1][s - 2],
        operations,
        sets: [
          {
            setCircle: rows[0][s - 2],
            operationName: getAltPetal('bottomRight', petalCount, s),
          },
          {
            setCircle: rows[0][s - 1],
            operationName: getAltPetal('bottomLeft', petalCount, s),
          },
          {
            setCircle: rows[1][s - 3],
            operationName: getAltPetal('right', petalCount, s),
          },
        ],
      });

      R.range(2, s - 1).forEach(ss => {
        setValueAndStatiks({
          circle: rows[ss][s - ss - 1],
          operations,
          sets: [
            {
              setCircle: rows[ss][s - ss - 2],
              operationName: getAltPetal('right', petalCount, s),
            },
            {
              setCircle: rows[ss - 1][s - ss - 1],
              operationName: getAltPetal('bottomRight', petalCount, s),
            },
            {
              setCircle: rows[ss - 1][s - ss],
              operationName: getAltPetal('bottomLeft', petalCount, s),
            },
          ],
        });
      });

      setValueAndStatiks({
        circle: rows[s - 1][0],
        operations,
        sets: [
          {
            setCircle: rows[s - 2][0],
            operationName: getAltPetal('bottomRight', petalCount, s),
          },
          {
            setCircle: rows[s - 2][1],
            operationName: getAltPetal('bottomLeft', petalCount, s),
          },
        ],
      });
    });
  } catch (err) {
    return buildRows(size, petalCount, tries + 1);
  }

  const shouldDebug = window.location.search.match('debug');

  return rows.map(row =>
    row.map(circle => circle.toObj(shouldDebug))
  );
}

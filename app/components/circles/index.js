import React, { Component } from 'react';
import R from 'ramda';

import { getRandom, getValue } from './utils';

import Circle from './circle';
import Key from './key';

import './index.css';

export const OPERATIONS = {
  ADD: {
    func: R.add,
    label: '+',
  },
  SUBTRACT: {
    func: R.subtract,
    label: '-',
  },
  MULTIPLY: {
    func: R.multiply,
    label: 'x',
  },
  DIVIDE: {
    func: R.divide,
    label: '÷',
  },
};

class Circles extends Component {
  state = {
    rows: [
      [
        {
          statik: {
            value: getRandom(),
          },
          dynamic: {},
        },
        {
          statik: {
            bottomLeft: getRandom(40),
            right: getRandom(40),
          },
          dynamic: {
            value: getRandom(),
          },
        },
        {
          statik: {},
          dynamic: {
            value: getRandom(),
          },
        },
      ],
      [
        {
          statik: {
            bottomRight: getRandom(40),
          },
          dynamic: {
            value: getRandom(),
          },
        },
        {
          statik: {
            value: getRandom(),
          },
          dynamic: {},
        },
      ],
      [
        {
          statik: {
            value: getRandom(),
          },
          dynamic: {},
        },
      ],
    ],
    operations: {
      right: OPERATIONS.ADD,
      bottomLeft: OPERATIONS.SUBTRACT,
      bottomRight: OPERATIONS.MULTIPLY,
      int: OPERATIONS.ADD,
    },
  };

  render() {
    const { operations, rows } = this.state;

    return (
      <div className='circles'>
        { rows.map(this.createCircles) }
        <Key
          operations={ operations }
          setOperation={
            (name, operation) =>
              this.setState({
                operations: R.merge(
                  operations,
                  { [name]: operation },
                ),
              })
          } />
      </div>
    );
  }

  createCircles = (row, rowIndex) => {
    const { operations, rows } = this.state;
    const nextRow = rows[rowIndex + 1];

    return (
      <div className='circles__row' key={ rowIndex }>
        { row.map((rowData, i) =>
          <Circle
            data={ rowData }
            key={ i }
            neighbors={ {
              bottomLeft: nextRow && getValue(nextRow[i - 1]),
              bottomRight: nextRow && getValue(nextRow[i]),
              left: getValue(row[i - 1]),
              right: getValue(row[i + 1]),
            } }
            operations={ operations }
            setValue={ v => {
              const newCircle = R.assocPath(['dynamic', 'value'], v, rowData);
              const newRow = R.update(i, newCircle, row);
              this.setState({
                rows: R.update(rowIndex, newRow, rows),
              });
            } } />
        ) }
      </div>
    );
  }
}

export default Circles;

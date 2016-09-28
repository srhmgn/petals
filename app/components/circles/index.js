import React, { Component } from 'react';
import R from 'ramda';

import { getRandom, getValue } from './utils';

import Circle from './circle';
import Setter from './setter';

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
            bottomLeft: getRandom(18),
            right: getRandom(18),
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
            bottomRight: getRandom(18),
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
    openSetter: null,
  };

  render() {
    const { openSetter, operations, rows } = this.state;

    return (
      <div className='circles'>
        { rows.map(this.createCircles) }
        { openSetter ?
          <Setter
            key={ `${openSetter.name}${openSetter.parentIndex}` }
            openSetter={ openSetter }
            operations={ operations }
            setOperation={ this.setOperation } /> : null }
      </div>
    );
  }

  createCircles = (row, rowIndex) => {
    const { openSetter, operations, rows } = this.state;
    const nextRow = rows[rowIndex + 1];

    return (
      <div className='circles__row' key={ rowIndex }>
        { row.map((rowData, i) =>
          <Circle
            data={ rowData }
            index={ `${rowIndex}${i}` }
            key={ i }
            neighbors={ {
              bottomLeft: nextRow && getValue(nextRow[i - 1]),
              bottomRight: nextRow && getValue(nextRow[i]),
              left: getValue(row[i - 1]),
              right: getValue(row[i + 1]),
            } }
            openSetter={ openSetter }
            operations={ operations }
            setOpenSetter={ v => this.setState({ openSetter: v }) }
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

  setOperation = (name, operation) =>
    this.setState({
      operations: R.merge(
        this.state.operations,
        { [name]: operation },
      ),
    })
}

export default Circles;

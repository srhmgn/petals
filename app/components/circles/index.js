import React, { Component } from 'react';
import R from 'ramda';

import { getRows, getValue } from './utils';

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
  MODULO: {
    func: R.modulo,
    label: '%',
  },
  DIVIDE: {
    func: R.divide,
    label: '÷',
  },
};

class Circles extends Component {
  state = {
    rows: getRows(),
    operations: {
      right: OPERATIONS.ADD,
      bottomLeft: OPERATIONS.SUBTRACT,
      bottomRight: OPERATIONS.MULTIPLY,
      int: OPERATIONS.ADD,
    },
    openSetter: null,
  };

  render() {
    const {
      openSetter,
      operations,
      rows,
    } = this.state;

    return (
      <div className='circles' onClick={ (e) => this.setOpenSetter(null, e) }>
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
            setOpenSetter={ this.setOpenSetter }
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

  setOpenSetter = (v, e) => {
    this.setState({ openSetter: v });
    e && e.stopPropagation();
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

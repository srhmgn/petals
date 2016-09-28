import React, { Component } from 'react';
import R from 'ramda';

import { buildRows, getValue, apply, doExist } from './utils';

import Circle from './circle';
import Petal from './petal';
import Setter from './setter';

import './index.css';

// disable internal numbers for now/ever - they're ugly
const SHOW_INT_NUMBERS = false;

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
    displaySize: 3,
    openSetter: null,
    operations: {
      right: OPERATIONS.ADD,
      bottomLeft: OPERATIONS.SUBTRACT,
      bottomRight: OPERATIONS.MULTIPLY,
      int: OPERATIONS.ADD,
    },
    rows: buildRows(3),
  };

  render() {
    const {
      displaySize,
      openSetter,
      operations,
      rows,
    } = this.state;

    this.petals = [];

    const circles = rows.map(this.createCircles);
    const won = R.all(R.propEq('isInvalid', false), this.petals);

    return (
      <div className='circles' onClick={ (e) => this.setOpenSetter(null, e) }>
        { won && <h2>You won!</h2> }
        { circles }
        { openSetter ?
          <Setter
            key={ `${openSetter.name}${openSetter.parentIndex}` }
            openSetter={ openSetter }
            operations={ operations }
            setOperation={ this.setOperation } /> : null }
        <h2>New game:</h2>
        { displaySize }
        <button
          onClick={ () =>
            this.setState({ displaySize: displaySize + 1 })
          }>+</button>
        <button
          onClick={ () =>
            this.setState({ displaySize: displaySize - 1 })
          }>-</button>
        <button
          onClick={ () =>
            this.setState({ rows: buildRows(displaySize) })
          }>Go</button>
      </div>
    );
  }

  getPetalProps = (name, petalProps) => {
    const {
      operations,
      neighbors,
      parentValue,
      statikData,
      ...props,
    } = petalProps;

    const neighborValue = neighbors[name];
    if (!doExist(neighborValue)) return null;

    const dynamic = apply(operations[name], parentValue, neighborValue);
    const statik = (statikData && statikData[name]) ?
      statikData[name] : null;
    const isStatic = !R.isNil(statik);

    return {
      name,
      isInvalid: isStatic && Number(dynamic) !== Number(statik),
      isStatic,
      contentValue: isStatic ? statik : dynamic,
      ...props,
    };
  }

  getInts = (petalProps) => {
    const {
      operations,
      neighbors,
      parentValue,
    } = petalProps;

    if (!neighbors) return null;

    const { bottomLeft, left, bottomRight } = neighbors;

    const bottomLeftInt = doExist(bottomLeft, left) ? (
      <span
        className='circle__bottom-left-int u-is-circle'
        data-content={ SHOW_INT_NUMBERS ?
          apply(operations.int, parentValue, bottomLeft, left) : null
        }
        key={ 0 } />
    ) : null;

    const bottomInt = doExist(bottomRight, bottomLeft) ? (
      <span
        className='circle__bottom-int u-is-circle'
        data-content={ SHOW_INT_NUMBERS ?
          apply(operations.int, parentValue, bottomRight, bottomLeft) : null
        }
        key={ 1 } />
    ) : null;

    return [bottomLeftInt, bottomInt];
  }

  createCircles = (row, rowIndex) => {
    const {
      openSetter,
      operations,
      rows,
    } = this.state;
    const nextRow = rows[rowIndex + 1];

    return (
      <div className='circles__row' key={ rowIndex }>
        { row.map((rowData, i) => {
          const neighbors = {
            bottomLeft: nextRow && getValue(nextRow[i - 1]),
            bottomRight: nextRow && getValue(nextRow[i]),
            left: getValue(row[i - 1]),
            right: getValue(row[i + 1]),
          };

          const petalProps = {
            openSetter,
            operations,
            neighbors,
            parentIndex: `${rowIndex}${i}`,
            parentValue: getValue(rowData),
            setOpenSetter: this.setOpenSetter,
            statikData: rowData.statik,
          };

          const rightPetal = this.getPetalProps('right', petalProps);
          const bottomLeftPetal = this.getPetalProps('bottomLeft', petalProps);
          const bottomRightPetal = this.getPetalProps('bottomRight', petalProps);

          rightPetal && this.petals.push(rightPetal);
          bottomLeftPetal && this.petals.push(bottomLeftPetal);
          bottomRightPetal && this.petals.push(bottomRightPetal);

          return (
            <Circle
              data={ rowData }
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
              } }>
              { rightPetal ? <Petal { ...rightPetal } /> : null }
              { bottomLeftPetal ?
                <Petal { ...bottomLeftPetal }>
                  { this.getInts(petalProps) }
                </Petal> : null }
              { bottomRightPetal ? <Petal { ...bottomRightPetal } /> : null }
            </Circle>
          );
        }) }
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

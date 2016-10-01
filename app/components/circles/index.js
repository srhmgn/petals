import React, { Component } from 'react';
import R from 'ramda';
import uuid from 'node-uuid';

import {
  apply,
  doExist,
  getValue,
  setUpGame,
} from './utils';

import Circle from './circle';
import Message from './message';
import NewGame from './new-game';
import Petal from './petal';
import Setter from './setter';

import './index.css';

// disable internal numbers for now/ever - they're ugly
const SHOW_INT_NUMBERS = false;
export const DEFAULT_SIZE = 2;

export const OPERATIONS = {
  ADD: {
    func: R.add,
    label: '+',
    inverse: 'SUBTRACT',
  },
  SUBTRACT: {
    func: R.subtract,
    label: '-',
    inverse: 'ADD',
  },
  MULTIPLY: {
    func: R.multiply,
    label: 'x',
    inverse: 'DIVIDE',
  },
  DIVIDE: {
    func: R.divide,
    label: '÷',
    inverse: 'MULTIPLY',
  },
};

class Circles extends Component {
  state = {
    gameId: uuid.v4(),
    openSetter: null,
  };

  componentWillMount() {
    this.setState(setUpGame(DEFAULT_SIZE));
  }

  render() {
    const {
      openSetter,
      operations,
      rows,
    } = this.state;

    this.isDebugMode = document.location.search.match('debug');

    this.petals = [];

    const circles = rows.map(this.getCircles);

    if (!this.won) {
      this.won = R.all(R.propEq('isInvalid', false), this.petals);
    }

    return (
      <div className='circles' onClick={ (e) => this.setOpenSetter(null, e) }>
        <Message title={ this.won ? 'You won!' : null } />
        <NewGame
          buildNewGame={ size => {
            this.won = false;
            this.setState(R.merge(
              { gameId: uuid.v4() },
              setUpGame(size),
            ));
          } } />
        { circles }
        { openSetter ?
          <Setter
            key={ `${openSetter.name}${openSetter.parentIndex}` }
            openSetter={ openSetter }
            operations={ operations }
            setOperation={ this.setOperation } /> : null }
      </div>
    );
  }

  getCircles = (row, rowIndex) => {
    const {
      openSetter,
      operations,
      rows,
      gameId,
    } = this.state;
    const nextRow = rows[rowIndex + 1];

    return (
      <div className='circles__row' key={ `${gameId}${rowIndex}` }>
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
              key={ `${gameId}${i}` }
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
              } }
              won={ this.won }>
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

    const dynamic = neighborValue ?
      apply(operations[name], parentValue, neighborValue) : null;
    const statik = (statikData && statikData[name]) ?
      statikData[name] : null;
    const isStatic = !R.isNil(statik);

    return {
      contentValue: isStatic ? statik : '',
      debug: {
        dynamic,
        isDebugMode: this.isDebugMode,
        operationLabel: operations[name].label,
        statik,
      },
      isStatic,
      isInvalid: isStatic && Number(dynamic) !== Number(statik),
      name,
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

  won = false;

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

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import connector from '../selectors';
import { DEFAULT_SIZE } from '../constants';

import Board from '../components/board';
import Circle from '../components/circle';
import Controls from '../components/controls';
import Message from '../components/message';
import Petal from '../components/petal';
import Row from '../components/row';
import Setter from '../components/setter';
import Test from '../components/test';

class Game extends PureComponent {
  componentWillMount() {
    this.props.buildRows(DEFAULT_SIZE);
  }

  render() {
    const {
      buildRows,
      circleProps,
      resetGame,
      closeSetter,
      gameId,
      openSetter,
      setOperation,
      setRowCircle,
      setSize,
      setterProps,
      size,
      won,
    } = this.props;

    return (
      <Board key={ gameId }>
        <Message title={ won ? 'You won!' : null } />

        <Controls
          buildRows={ buildRows }
          reset={ resetGame }
          setSize={ setSize }
          size={ size } />

        { false && <Test /> }
        { circleProps.map((circleRow, rowIndex) =>
          <Row key={ rowIndex } rowIndex={ rowIndex }>

            { circleRow.map((circle, circleIndex) =>
              <Circle
                circleIndex={ circleIndex }
                closeSetter={
                  () => setterProps.mousePos && closeSetter()
                }
                key={ circleIndex }
                openSetter={ openSetter }
                rowIndex={ rowIndex }
                setValue={ value =>
                  setRowCircle({
                    circleIndex,
                    rowIndex,
                    value,
                  }) }
                won={ won }
                { ...circle }>

                { circle.petals.map((petal, petalIndex) =>
                  !!petal && [
                    <Petal
                      closeSetter={ closeSetter }
                      key={ petalIndex }
                      openSetter={ openSetter }
                      { ...petal } />,
                    <text
                      className='petal__text'
                      key={ `${petalIndex}-text` }
                      x='160'
                      y='100'>
                      { petal.contentValue }
                    </text>,
                  ]
                ) }
              </Circle>
            ) }

          </Row>
        ) }

        <Setter
          closeSetter={ closeSetter }
          setOperation={ setOperation }
          { ...setterProps } />
      </Board>
    );
  }
}

function TestPetal(props) {
  return <path
          d='M0,69.17C0.64,44,9.55,21.33,27,2c2.33-2.59,3.71-2.71,6.21-.07C60.79,31.06,68,76.31,50.72,112.36a121.29,121.29,0,0,1-17.31,26.09c-2.44,2.88-4,2.94-6.56.05C9.39,119,.35,96.2,0,69.17Z'
          { ...props } />
}

Game.propTypes = {
  buildRows: PropTypes.func.isRequired,
  circleProps: PropTypes.array.isRequired,
  closeSetter: PropTypes.func.isRequired,
  gameId: PropTypes.number.isRequired,
  openSetter: PropTypes.func.isRequired,
  operations: PropTypes.object.isRequired,
  resetGame: PropTypes.func.isRequired,
  rows: PropTypes.array.isRequired,
  setOperation: PropTypes.func.isRequired,
  setRowCircle: PropTypes.func.isRequired,
  setSize: PropTypes.func.isRequired,
  setterProps: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired,
  won: PropTypes.bool.isRequired,
};

const mapDispatchToProps = ({
  buildRows: actions.buildRows,
  resetGame: actions.resetGame,
  closeSetter: actions.closeSetter,
  openSetter: actions.openSetter,
  setOperation: actions.setOperation,
  setRowCircle: actions.setRowCircle,
  setSize: actions.setSize,
});

export default connect(
  connector,
  mapDispatchToProps,
)(Game);

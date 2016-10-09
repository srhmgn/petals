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
import PetalText from '../components/petal-text';
import Row from '../components/row';
import Setter from '../components/setter';

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
                    <PetalText
                      key={ `${petalIndex}-text` }
                      { ...petal } />,
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

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

class Game extends PureComponent {
  componentWillMount() {
    this.props.buildRows(DEFAULT_SIZE);
  }

  render() {
    const {
      buildRows,
      circleProps,
      clearValues,
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
          reset={ clearValues }
          setSize={ setSize }
          size={ size } />

        { circleProps.map((circleRow, rowIndex) =>
          <Row key={ rowIndex }>

            { circleRow.map((circle, circleIndex) =>
              <Circle
                closeSetter={
                  () => setterProps.mousePos && closeSetter()
                }
                key={ circleIndex }
                setValue={ value =>
                  setRowCircle({
                    circleIndex,
                    rowIndex,
                    value,
                  }) }
                won={ won }
                { ...circle }>

                { circle.petals.map((petal, petalIndex) =>
                  petal ?
                    <Petal
                      closeSetter={ closeSetter }
                      key={ petalIndex }
                      openSetter={ openSetter }
                      { ...petal } /> : null

                ) }
              </Circle>
            ) }

          </Row>
        ) }

        <Setter
          setOperation={ setOperation }
          { ...setterProps } />
      </Board>
    );
  }
}

Game.propTypes = {
  buildRows: PropTypes.func.isRequired,
  circleProps: PropTypes.array.isRequired,
  clearValues: PropTypes.func.isRequired,
  closeSetter: PropTypes.func.isRequired,
  gameId: PropTypes.number.isRequired,
  openSetter: PropTypes.func.isRequired,
  operations: PropTypes.object.isRequired,
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
  clearValues: actions.clearValues,
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

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import connector from '../selectors';
import { DEFAULT_SIZE, DEFAULT_PETAL_COUNT } from '../constants';

import Board from '../components/board';
import Controls from '../components/controls';
import GameWrapper from '../components/game-wrapper';
import Instructions from '../components/instructions';

class Game extends PureComponent {
  componentWillMount() {
    this.props.buildRows(DEFAULT_SIZE, DEFAULT_PETAL_COUNT);
  }

  render() {
    const {
      buildRows,
      circleProps,
      gameId,
      instructions,
      isDisabled,
      operations,
      petalCount,
      petalName,
      pos,
      resetGame,
      rows,
      setInstructionStep,
      setOperation,
      setPetalCount,
      setPetalName,
      setPos,
      setRowCircle,
      setSize,
      size,
      toggleInstructions,
      won,
    } = this.props;

    return (
      <GameWrapper
        isDisabled={ isDisabled }
        key={ gameId }
        operations={ operations }
        petalName={ petalName }
        pos={ pos }
        rows={ rows }
        setOperation={ setOperation }
        setPetalName={ setPetalName }
        setPos={ setPos }
        setRowCircle={ setRowCircle }>
        <Instructions
          setStep={ setInstructionStep }
          toggleInstructions={ toggleInstructions }
          { ...instructions } />

        { !instructions.isVisible && <Controls
          buildRows={ buildRows }
          isDisabled={ isDisabled }
          isSettings
          petalCount={ petalCount }
          petalName={ petalName }
          reset={ resetGame }
          setPetalCount={ setPetalCount }
          setSize={ setSize }
          size={ size }
          toggleInstructions={ toggleInstructions }
          won={ won } /> }

        <Board
          circleProps={ circleProps }
          gameId={ gameId }
          isDisabled={ isDisabled }
          key={ gameId }
          setOperation={ setOperation }
          setPetalName={ setPetalName }
          setPos={ setPos }
          setRowCircle={ setRowCircle } />

        { !instructions.isVisible && <Controls
          isDisabled={ isDisabled }
          operations={ operations }
          petalName={ petalName }
          pos={ pos }
          rows={ rows }
          setOperation={ setOperation }
          setRowCircle={ setRowCircle } /> }
      </GameWrapper>
    );
  }
}

Game.propTypes = {
  buildRows: PropTypes.func.isRequired,
  circleProps: PropTypes.array.isRequired,
  gameId: PropTypes.number.isRequired,
  instructions: PropTypes.object.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  operations: PropTypes.object,
  petalCount: PropTypes.number.isRequired,
  petalName: PropTypes.string.isRequired,
  pos: PropTypes.object,
  resetGame: PropTypes.func.isRequired,
  rows: PropTypes.array.isRequired,
  setInstructionStep: PropTypes.func.isRequired,
  setOperation: PropTypes.func.isRequired,
  setPetalCount: PropTypes.func.isRequired,
  setPetalName: PropTypes.func.isRequired,
  setPos: PropTypes.func.isRequired,
  setRowCircle: PropTypes.func.isRequired,
  setSize: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  toggleInstructions: PropTypes.func.isRequired,
  won: PropTypes.bool.isRequired,
};

const mapDispatchToProps = ({
  buildRows: actions.buildRows,
  resetGame: actions.resetGame,
  setInstructionStep: actions.setInstructionStep,
  setOperation: actions.setOperation,
  setPetalCount: actions.setPetalCount,
  setPetalName: actions.setPetalName,
  setPos: actions.setPos,
  setRowCircle: actions.setRowCircle,
  setSize: actions.setSize,
  toggleInstructions: actions.toggleInstructions,
});

export default connect(
  connector,
  mapDispatchToProps,
)(Game);

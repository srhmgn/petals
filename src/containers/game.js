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
      closeOperationSetter,
      closeValueSetter,
      gameId,
      instructions,
      isDisabled,
      valueSetterProps,
      openOperationSetter,
      openValueSetter,
      operationSetterProps,
      petalCount,
      resetGame,
      setInstructionStep,
      setOperation,
      setPetalCount,
      setRowCircle,
      setSize,
      size,
      toggleInstructions,
      won,
    } = this.props;

    return (
      <GameWrapper key={ gameId } preventScroll={ instructions.isVisible }>
        <Instructions
          setStep={ setInstructionStep }
          toggleInstructions={ toggleInstructions }
          { ...instructions } />

        <Controls
          buildRows={ buildRows }
          isDisabled={ isDisabled }
          petalCount={ petalCount }
          reset={ resetGame }
          setPetalCount={ setPetalCount }
          setSize={ setSize }
          size={ size }
          toggleInstructions={ toggleInstructions }
          won={ won } />

        <Board
          circleProps={ circleProps }
          closeOperationSetter={ closeOperationSetter }
          closeValueSetter={ closeValueSetter }
          gameId={ gameId }
          isDisabled={ isDisabled }
          key={ gameId }
          openOperationSetter={ openOperationSetter }
          openValueSetter={ openValueSetter }
          operationSetterProps={ operationSetterProps }
          setOperation={ setOperation }
          setRowCircle={ setRowCircle }
          valueSetterProps={ valueSetterProps } />
      </GameWrapper>
    );
  }
}

Game.propTypes = {
  buildRows: PropTypes.func.isRequired,
  circleProps: PropTypes.array.isRequired,
  closeOperationSetter: PropTypes.func.isRequired,
  closeValueSetter: PropTypes.func.isRequired,
  gameId: PropTypes.number.isRequired,
  instructions: PropTypes.object.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  openOperationSetter: PropTypes.func.isRequired,
  openValueSetter: PropTypes.func.isRequired,
  operationSetterProps: PropTypes.object.isRequired,
  petalCount: PropTypes.number.isRequired,
  resetGame: PropTypes.func.isRequired,
  setInstructionStep: PropTypes.func.isRequired,
  setOperation: PropTypes.func.isRequired,
  setPetalCount: PropTypes.func.isRequired,
  setRowCircle: PropTypes.func.isRequired,
  setSize: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  toggleInstructions: PropTypes.func.isRequired,
  valueSetterProps: PropTypes.object,
  won: PropTypes.bool.isRequired,
};

const mapDispatchToProps = ({
  buildRows: actions.buildRows,
  resetGame: actions.resetGame,
  closeOperationSetter: actions.closeOperationSetter,
  closeValueSetter: actions.closeValueSetter,
  openOperationSetter: actions.openOperationSetter,
  openValueSetter: actions.openValueSetter,
  setInstructionStep: actions.setInstructionStep,
  setOperation: actions.setOperation,
  setPetalCount: actions.setPetalCount,
  setRowCircle: actions.setRowCircle,
  setSize: actions.setSize,
  toggleInstructions: actions.toggleInstructions,
});

export default connect(
  connector,
  mapDispatchToProps,
)(Game);

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
      closeValueSetter,
      gameId,
      instructions,
      isDisabled,
      valueSetterProps,
      openValueSetter,
      operations,
      petalCount,
      petalName,
      resetGame,
      setInstructionStep,
      setOperation,
      setPetalCount,
      setPetalName,
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
          isDisabled={ isDisabled }
          petalName={ petalName }
          operations={ operations }
          setOperation={ setOperation } />

        <Board
          circleProps={ circleProps }
          closeValueSetter={ closeValueSetter }
          gameId={ gameId }
          isDisabled={ isDisabled }
          key={ gameId }
          openValueSetter={ openValueSetter }
          setOperation={ setOperation }
          setPetalName={ setPetalName }
          setRowCircle={ setRowCircle }
          valueSetterProps={ valueSetterProps } />

        <Controls
          buildRows={ buildRows }
          isBottom
          isDisabled={ isDisabled }
          petalCount={ petalCount }
          reset={ resetGame }
          setPetalCount={ setPetalCount }
          setSize={ setSize }
          size={ size }
          toggleInstructions={ toggleInstructions }
          won={ won } />
      </GameWrapper>
    );
  }
}

Game.propTypes = {
  buildRows: PropTypes.func.isRequired,
  circleProps: PropTypes.array.isRequired,
  closeValueSetter: PropTypes.func.isRequired,
  gameId: PropTypes.number.isRequired,
  instructions: PropTypes.object.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  openValueSetter: PropTypes.func.isRequired,
  operations: PropTypes.object,
  petalName: PropTypes.string.isRequired,
  petalCount: PropTypes.number.isRequired,
  resetGame: PropTypes.func.isRequired,
  setInstructionStep: PropTypes.func.isRequired,
  setOperation: PropTypes.func.isRequired,
  setPetalCount: PropTypes.func.isRequired,
  setPetalName: PropTypes.func.isRequired,
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
  closeValueSetter: actions.closeValueSetter,
  openValueSetter: actions.openValueSetter,
  setInstructionStep: actions.setInstructionStep,
  setOperation: actions.setOperation,
  setPetalCount: actions.setPetalCount,
  setPetalName: actions.setPetalName,
  setRowCircle: actions.setRowCircle,
  setSize: actions.setSize,
  toggleInstructions: actions.toggleInstructions,
});

export default connect(
  connector,
  mapDispatchToProps,
)(Game);

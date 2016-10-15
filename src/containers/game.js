import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import connector from '../selectors';
import { DEFAULT_SIZE, DEFAULT_PETAL_COUNT } from '../constants';

import Board from '../components/board';
import Controls from '../components/controls';
import GameWrapper from '../components/game-wrapper';
import Instructions from '../components/instructions';
import Message from '../components/message';

class Game extends PureComponent {
  componentWillMount() {
    this.props.buildRows(DEFAULT_SIZE, DEFAULT_PETAL_COUNT);
  }

  render() {
    const {
      buildRows,
      circleProps,
      resetGame,
      closeOperationSetter,
      gameId,
      instructions,
      isDisabled,
      openOperationSetter,
      petalCount,
      setInstructionStep,
      setOperation,
      setPetalCount,
      setRowCircle,
      setSize,
      setterOperationProps,
      size,
      toggleInstructions,
      won,
    } = this.props;

    return (
      <GameWrapper key={ gameId } preventScroll={ instructions.isVisible }>
        <Message won={ won } />
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
          toggleInstructions={ toggleInstructions } />

        <Board
          circleProps={ circleProps }
          closeOperationSetter={ closeOperationSetter }
          gameId={ gameId }
          isDisabled={ isDisabled }
          key={ gameId }
          openOperationSetter={ openOperationSetter }
          setOperation={ setOperation }
          setRowCircle={ setRowCircle }
          setterOperationProps={ setterOperationProps } />
      </GameWrapper>
    );
  }
}

Game.propTypes = {
  buildRows: PropTypes.func.isRequired,
  circleProps: PropTypes.array.isRequired,
  closeOperationSetter: PropTypes.func.isRequired,
  gameId: PropTypes.number.isRequired,
  instructions: PropTypes.object.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  openOperationSetter: PropTypes.func.isRequired,
  petalCount: PropTypes.number.isRequired,
  resetGame: PropTypes.func.isRequired,
  setInstructionStep: PropTypes.func.isRequired,
  setOperation: PropTypes.func.isRequired,
  setPetalCount: PropTypes.func.isRequired,
  setRowCircle: PropTypes.func.isRequired,
  setSize: PropTypes.func.isRequired,
  setterOperationProps: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired,
  toggleInstructions: PropTypes.func.isRequired,
  won: PropTypes.bool.isRequired,
};

const mapDispatchToProps = ({
  buildRows: actions.buildRows,
  resetGame: actions.resetGame,
  closeOperationSetter: actions.closeOperationSetter,
  openOperationSetter: actions.openOperationSetter,
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

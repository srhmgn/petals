import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import connector from '../selectors';
import { DEFAULT_SIZE } from '../constants';

import Board from '../components/board';
import Controls from '../components/controls';
import GameWrapper from '../components/game-wrapper';
import Instructions from '../components/instructions';
import Message from '../components/message';

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
      instructions,
      isDisabled,
      openSetter,
      setInstructionStep,
      setOperation,
      setRowCircle,
      setSize,
      setterProps,
      size,
      toggleInstructions,
      won,
    } = this.props;

    return (
      <GameWrapper>
        <Message isBanner won={ won } />
        <Message title='petals' />

        <Instructions
          setStep={ setInstructionStep }
          toggleInstructions={ toggleInstructions }
          { ...instructions } />

        <Controls
          buildRows={ buildRows }
          isDisabled={ isDisabled }
          reset={ resetGame }
          setSize={ setSize }
          size={ size }
          toggleInstructions={ toggleInstructions } />

        <Board
          circleProps={ circleProps }
          closeSetter={ closeSetter }
          isDisabled={ isDisabled }
          key={ gameId }
          openSetter={ openSetter }
          setOperation={ setOperation }
          setRowCircle={ setRowCircle }
          setterProps={ setterProps } />
      </GameWrapper>
    );
  }
}

Game.propTypes = {
  buildRows: PropTypes.func.isRequired,
  circleProps: PropTypes.array.isRequired,
  closeSetter: PropTypes.func.isRequired,
  gameId: PropTypes.number.isRequired,
  instructions: PropTypes.object.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  openSetter: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  setInstructionStep: PropTypes.func.isRequired,
  setOperation: PropTypes.func.isRequired,
  setRowCircle: PropTypes.func.isRequired,
  setSize: PropTypes.func.isRequired,
  setterProps: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired,
  toggleInstructions: PropTypes.func.isRequired,
  won: PropTypes.bool.isRequired,
};

const mapDispatchToProps = ({
  buildRows: actions.buildRows,
  resetGame: actions.resetGame,
  closeSetter: actions.closeSetter,
  openSetter: actions.openSetter,
  setInstructionStep: actions.setInstructionStep,
  setOperation: actions.setOperation,
  setRowCircle: actions.setRowCircle,
  setSize: actions.setSize,
  toggleInstructions: actions.toggleInstructions,
});

export default connect(
  connector,
  mapDispatchToProps,
)(Game);

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { setWon } from '../actions';

import Board from '../components/board';

function Game({ won, onSetWon }) {
  return (
    <Board setWon={ onSetWon } won={ won } />
  );
}

Game.propTypes = {
  onSetWon: PropTypes.func.isRequired,
  won: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  won: state.won,
});

const mapDispatchToProps = ({
  onSetWon: setWon,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game);

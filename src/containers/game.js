import React from 'react';
import { connect } from 'react-redux';

import { setWon } from '../actions';

import Board from '../components/board';

const Game = ({ won, onSetWon }) => {
  return (
    <Board setWon={ onSetWon } won={ won } />
  );
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

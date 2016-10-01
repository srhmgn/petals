import React from 'react';
import { connect } from 'react-redux';

import { setWon } from '../actions';

import Board from '../components/board';

const Game = ({ dispatch }) => {
  return (
    <Board />
  );
};

export default connect()(Game);

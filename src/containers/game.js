import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import connector from '../selectors';
import { DEFAULT_SIZE } from '../constants';

import Circle from '../components/circle';
import Message from '../components/message';
import NewGame from '../components/new-game';
import Petal from '../components/petal';
import Setter from '../components/setter';

import '../components/Board/index.css';

class Game extends PureComponent {
  componentWillMount() {
    this.props.buildRows(DEFAULT_SIZE);
  }

  render() {
    const {
      buildRows,
      circleProps,
      closeSetter,
      gameId,
      openSetter,
      setOperation,
      setRowCircle,
      setterProps,
      won,
    } = this.props;

    return (
      <div className='circles' key={ gameId }>
        <Message title={ won ? 'You won!' : null } />
        <NewGame buildRows={ buildRows } />
        { circleProps.map((circleRow, rowIndex) =>
          <div className='circles__row' key={ rowIndex }>
            { circleRow.map((circle, circleIndex) =>
              <Circle
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
          </div>
        ) }
        <Setter
          setOperation={ setOperation }
          { ...setterProps } />
      </div>
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
  rows: PropTypes.array.isRequired,
  setOperation: PropTypes.func.isRequired,
  setRowCircle: PropTypes.func.isRequired,
  setterProps: PropTypes.object.isRequired,
  won: PropTypes.bool.isRequired,
};

const mapDispatchToProps = ({
  buildRows: actions.buildRows,
  closeSetter: actions.closeSetter,
  openSetter: actions.openSetter,
  setOperation: actions.setOperation,
  setRowCircle: actions.setRowCircle,
});

export default connect(
  connector,
  mapDispatchToProps,
)(Game);

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { setWon, buildRows } from '../actions';
import connector from '../selectors';
import { DEFAULT_SIZE } from '../constants';

import Circle from '../components/circle';
import Petal from '../components/petal';
import Setter from '../components/setter';

import '../components/Board/index.css';

class Game extends PureComponent {
  componentWillMount() {
    this.props.onBuildRows(DEFAULT_SIZE);
  }

  render() {
    const {
      circleProps,
      setterProps,
    } = this.props;

    return (
      <div className='circles'>
        { circleProps.map((circleRow, rowIndex) =>
          <div className='circles__row' key={ rowIndex }>
            { circleRow.map((circle, circleIndex) =>
              <Circle key={ circleIndex } { ...circle }>
                { circle.petals.map((petal, petalIndex) =>
                  petal ?
                    <Petal { ...petal } key={ petalIndex } /> : null
                ) }
              </Circle>
            ) }
          </div>
        ) }
        <Setter { ...setterProps } />
      </div>
    );
  }
}

Game.propTypes = {
  circleProps: PropTypes.array.isRequired,
  onBuildRows: PropTypes.func.isRequired,
  onSetWon: PropTypes.func.isRequired,
  operations: PropTypes.object.isRequired,
  rows: PropTypes.array.isRequired,
  setterProps: PropTypes.object.isRequired,
  won: PropTypes.bool.isRequired,
};

const mapDispatchToProps = ({
  onBuildRows: buildRows,
  onSetWon: setWon,
});

export default connect(
  connector,
  mapDispatchToProps,
)(Game);

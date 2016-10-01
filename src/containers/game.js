import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import connector from '../selectors';
import { DEFAULT_SIZE } from '../constants';

import Circle from '../components/circle';
import Petal from '../components/petal';
import Setter from '../components/setter';

import '../components/Board/index.css';

class Game extends PureComponent {
  componentWillMount() {
    this.props.buildRows(DEFAULT_SIZE);
  }

  render() {
    const {
      circleProps,
      closeSetter,
      openSetter,
      setOperation,
      setRowCircle,
      setterProps,
    } = this.props;

    return (
      <div className='circles'>
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

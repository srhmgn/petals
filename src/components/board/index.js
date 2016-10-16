import React, { PropTypes, PureComponent } from 'react';
import Hammer from 'react-hammerjs';

import Circle from '../circle';
import Row from '../row';
import Petal from '../petal';
import PetalText from '../petal-text';
import OperationSetter from '../operation-setter';
import ValueSetter from '../value-setter';

import './index.css';

class Board extends PureComponent {
  static propTypes = {
    circleProps: PropTypes.array.isRequired,
    closeOperationSetter: PropTypes.func,
    closeValueSetter: PropTypes.func,
    gameId: PropTypes.number,
    isDisabled: PropTypes.bool.isRequired,
    openOperationSetter: PropTypes.func,
    openValueSetter: PropTypes.func,
    operationSetterProps: PropTypes.object,
    setOperation: PropTypes.func,
    setRowCircle: PropTypes.func,
    valueSetterProps: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.currentSize = props.circleProps && props.circleProps[0] ?
      props.circleProps[0].length : 0;
    this.originalScale = document.querySelector('body').offsetWidth /
      (120 * this.currentSize);

    this.startingScale = this.originalScale;

    this.state = {
      scale: this.originalScale,
    };
  }

  render() {
    const {
      circleProps,
      closeOperationSetter,
      closeValueSetter,
      gameId,
      isDisabled,
      valueSetterProps,
      openOperationSetter,
      openValueSetter,
      setOperation,
      setRowCircle,
      operationSetterProps,
    } = this.props;

    return (
      <Hammer
        onPinch={ this.handlePinch }
        options={ {
          recognizers: {
            pinch: { enable: true },
          },
        } }>
        <div
          className='board'
          id={ gameId ? 'game' : null }
          style={ {
            transform: this.state.scale < 1 ? `scale(${this.state.scale})` : 'none',
          } }>
          <ValueSetter
            setRowCircle={ setRowCircle }
            { ...valueSetterProps } />

          { circleProps.map((circleRow, rowIndex) =>
            <Row
              key={ rowIndex }
              rowIndex={ rowIndex }
              style={ {
                width: this.state.scale < 1 ? 'auto' : 120 * this.currentSize,
                zIndex: 1000 - rowIndex,
              } }>

              { circleRow.map((circle, circleIndex) =>
                <Circle
                  circleIndex={ circleIndex }
                  closeValueSetter={ closeValueSetter }
                  isDisabled={ isDisabled }
                  key={ circleIndex }
                  openOperationSetter={ openOperationSetter }
                  openValueSetter={ openValueSetter }
                  rowIndex={ rowIndex }
                  setValue={ value =>
                    setRowCircle({
                      circleIndex,
                      rowIndex,
                      value,
                    }) }
                  { ...circle }>

                  { circle.petals.map((petal, petalIndex) =>
                    !!petal && [
                      <Petal
                        closeOperationSetter={ closeOperationSetter }
                        isDisabled={ isDisabled }
                        key={ petalIndex }
                        openOperationSetter={ openOperationSetter }
                        { ...petal } />,
                      <PetalText
                        key={ `${petalIndex}-text` }
                        { ...petal } />,
                    ]
                  ) }
                </Circle>
              ) }

            </Row>
          ) }

          <OperationSetter
            closeOperationSetter={ closeOperationSetter }
            setOperation={ setOperation }
            { ...operationSetterProps } />
        </div>
      </Hammer>
    );
  }

  handlePinch = (e) => {
    if (e.isFinal) {
      this.startingScale = this.state.scale;
      return;
    }
    const newScale = this.startingScale * e.scale;
    if (newScale < this.originalScale) return;

    this.setState({
      scale: newScale,
    });
  }
}

export default Board;

import React, { PropTypes, PureComponent } from 'react';
import Hammer from 'react-hammerjs';

import Circle from '../circle';
import Row from '../row';
import Petal from '../petal';
import PetalText from '../petal-text';

import './index.css';

class Board extends PureComponent {
  static propTypes = {
    circleProps: PropTypes.array.isRequired,
    gameId: PropTypes.number,
    isDisabled: PropTypes.bool.isRequired,
    setPetalName: PropTypes.func,
    setPos: PropTypes.func,
  };

  constructor(props) {
    super(props);

    const body = document.querySelector('body');
    this.currentSize = props.circleProps && props.circleProps[0] ?
      props.circleProps[0].length : 0;

    this.originalScale = body.offsetWidth / (120 * this.currentSize);
    this.isTallerThanContainer = (body.offsetHeight - 120) <=
      (140 * this.currentSize);

    this.startingScale = this.originalScale;

    this.state = {
      scale: this.originalScale,
    };
  }

  render() {
    const {
      circleProps,
      gameId,
      isDisabled,
      setPetalName,
      setPos,
    } = this.props;

    let transform;
    let style;

    if (this.state.scale < 1) {
      const translateAmount = `-${this.state.scale * 50}%`;
      const translate = `translate(${translateAmount}, ${translateAmount})`;
      transform = `${translate} scale(${this.state.scale})`;
      style = { transform, left: '50%', top: '50%' };
    } else if (!this.isTallerThanContainer) {
      transform = 'translate(-50%, -50%)';
      style = { transform, left: '50%', top: '50%' };
    } else {
      transform = 'translate(-50%, 0)';
      style = { transform, left: '50%' };
    }

    return (
      <Hammer
        onPinch={ this.handlePinch }
        options={ {
          recognizers: {
            pinch: { enable: true },
          },
        } }>
        <div className='board'>
          <div
            className='board__inner'
            id={ gameId ? 'game' : null }
            style={ style }>
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
                    isDisabled={ isDisabled }
                    key={ circleIndex }
                    rowIndex={ rowIndex }
                    setPos={ setPos }
                    { ...circle }>

                    { circle.petals.map((petal, petalIndex) =>
                      !!petal && [
                        <Petal
                          isDisabled={ isDisabled }
                          key={ petalIndex }
                          setPetalName={ setPetalName }
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
          </div>
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

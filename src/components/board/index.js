import React, { PropTypes, PureComponent } from 'react';
import Hammer from 'react-hammerjs';
import throttle from 'lodash.throttle';

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

  _isMounted = true;

  state = {
    scale: 1,
  }

  componentWillMount() {
    this.scaleBoard();
    this._isMounted = true;

    this.listener = window.addEventListener(
      'resize',
      throttle(this.scaleBoard, 200)
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('resize', this.listener);
  }

  render() {
    const {
      circleProps,
      gameId,
      isDisabled,
      setPetalName,
      setPos,
    } = this.props;

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
            style={ this.state.style }>
            { circleProps.map((circleRow, rowIndex) =>
              <Row
                key={ rowIndex }
                rowIndex={ rowIndex }
                style={ {
                  width: this.state.scale <= 1 ? 'auto' : 120 * this.currentSize,
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

  scaleBoard = () => {
    if (!this._isMounted) return;

    const { circleProps } = this.props;

    const body = document.querySelector('body');
    this.currentSize = circleProps && circleProps[0] ?
      circleProps[0].length : 0;

    this.originalScale = (body.offsetWidth / (120 * this.currentSize));

    this.isTallerThanContainer = (body.offsetHeight - 160) <=
      (130 * this.currentSize * this.originalScale);

    this.startingScale = this.originalScale;

    const top = this.isTallerThanContainer ? 62 : '50%';
    const left = '50%';
    const translateAmount = this.originalScale < 1 ?
      `-${this.originalScale * 50}%` : '-50%';
    const leftTransform = translateAmount;
    const topTransform = this.isTallerThanContainer ? 0 : translateAmount;

    let transform = `translate3d(${leftTransform}, ${topTransform}, 0)`;
    if (this.originalScale < 1) {
      transform += ` scale(${this.originalScale})`;
    }

    this.setState({
      scale: this.originalScale,
      style: { transform, left, top },
    });
  }
}

export default Board;

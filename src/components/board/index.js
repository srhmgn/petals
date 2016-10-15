import React, { PropTypes } from 'react';

import Circle from '../circle';
import Row from '../row';
import Petal from '../petal';
import PetalText from '../petal-text';
import Setter from '../setter';

import './index.css';

function Board({
  circleProps,
  closeSetter,
  gameId,
  isDisabled,
  openSetter,
  setOperation,
  setRowCircle,
  setterProps,
}) {
  const currentSize = circleProps && circleProps[0] ?
    circleProps[0].length : 0;

  return (
    <div className='board' id={ gameId ? 'game' : null }>
      { circleProps.map((circleRow, rowIndex) =>
        <Row
          key={ rowIndex }
          rowIndex={ rowIndex }
          style={ {
            width: 160 * currentSize,
            zIndex: 1000 - rowIndex,
          } }>

          { circleRow.map((circle, circleIndex) =>
            <Circle
              circleIndex={ circleIndex }
              closeSetter={
                () => setterProps.mousePos && closeSetter()
              }
              isDisabled={ isDisabled }
              key={ circleIndex }
              openSetter={ openSetter }
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
                    closeSetter={ closeSetter }
                    isDisabled={ isDisabled }
                    key={ petalIndex }
                    openSetter={ openSetter }
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

      <Setter
        closeSetter={ closeSetter }
        setOperation={ setOperation }
        { ...setterProps } />
    </div>
  );
}

Board.propTypes = {
  circleProps: PropTypes.array.isRequired,
  closeSetter: PropTypes.func,
  gameId: PropTypes.number,
  isDisabled: PropTypes.bool.isRequired,
  openSetter: PropTypes.func,
  setOperation: PropTypes.func,
  setRowCircle: PropTypes.func,
  setterProps: PropTypes.object,
};

export default Board;

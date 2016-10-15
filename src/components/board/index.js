import React, { PropTypes } from 'react';

import Circle from '../circle';
import Row from '../row';
import Petal from '../petal';
import PetalText from '../petal-text';
import OperationSetter from '../operation-setter';

import './index.css';

function Board({
  circleProps,
  closeOperationSetter,
  gameId,
  isDisabled,
  openOperationSetter,
  setOperation,
  setRowCircle,
  setterOperationProps,
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
              closeOperationSetter={
                () => setterOperationProps.mousePos && closeOperationSetter()
              }
              isDisabled={ isDisabled }
              key={ circleIndex }
              openOperationSetter={ openOperationSetter }
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
        { ...setterOperationProps } />
    </div>
  );
}

Board.propTypes = {
  circleProps: PropTypes.array.isRequired,
  closeOperationSetter: PropTypes.func,
  gameId: PropTypes.number,
  isDisabled: PropTypes.bool.isRequired,
  openOperationSetter: PropTypes.func,
  setOperation: PropTypes.func,
  setRowCircle: PropTypes.func,
  setterOperationProps: PropTypes.object,
};

export default Board;

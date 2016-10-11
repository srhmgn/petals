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
  isDisabled,
  openSetter,
  setOperation,
  setRowCircle,
  setterProps,
}) {
  return (
    <div className='board'>
      { circleProps.map((circleRow, rowIndex) =>
        <Row key={ rowIndex } rowIndex={ rowIndex }>

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
  isDisabled: PropTypes.bool.isRequired,
  openSetter: PropTypes.func,
  setOperation: PropTypes.func,
  setRowCircle: PropTypes.func,
  setterProps: PropTypes.object,
};

export default Board;

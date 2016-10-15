import React, { PropTypes } from 'react';

import './index.css';

function ValueSetter({
  circleIndex,
  mousePos,
  rowIndex,
  setRowCircle,
}) {
  if (!mousePos) return null;
  const [left, top] = mousePos;

  const finalLeft = document.body.clientWidth - left > 96 ?
    left : left - 96;

  function setValue(e) {
    setRowCircle({
      circleIndex,
      rowIndex,
      value: e.target.innerHTML,
    });
  }

  return (
    <div className='value-setter' style={ { left: finalLeft, top } }>
      <button className='u-btn u-btn--small' onClick={ setValue }>1</button>
      <button className='u-btn u-btn--small' onClick={ setValue }>2</button>
      <button className='u-btn u-btn--small' onClick={ setValue }>3</button>
      <button className='u-btn u-btn--small' onClick={ setValue }>4</button>
      <button className='u-btn u-btn--small' onClick={ setValue }>5</button>
      <button className='u-btn u-btn--small' onClick={ setValue }>6</button>
      <button className='u-btn u-btn--small' onClick={ setValue }>7</button>
      <button className='u-btn u-btn--small' onClick={ setValue }>8</button>
      <button className='u-btn u-btn--small' onClick={ setValue }>9</button>
    </div>
  );
}

ValueSetter.propTypes = {
  circleIndex: PropTypes.number,
  mousePos: PropTypes.array,
  rowIndex: PropTypes.number,
  setRowCircle: PropTypes.func,
};

export default ValueSetter;

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

  const finalLeft = document.body.clientWidth - left > 106 ?
    left : left - 106;

  function setValue(e) {
    setRowCircle({
      circleIndex,
      rowIndex,
      value: e.target.innerHTML,
    });
    document
      .querySelector(`#game #row${rowIndex} #circle${circleIndex} .circle__number`)
      .focus();
  }

  const btnKlass = 'u-btn u-btn--small u-btn--dark';

  return (
    <div className='value-setter u-btn__wrapper' style={ { left: finalLeft, top } }>
      <button className={ btnKlass } onClick={ setValue }>1</button>
      <button className={ btnKlass } onClick={ setValue }>2</button>
      <button className={ btnKlass } onClick={ setValue }>3</button>
      <button className={ btnKlass } onClick={ setValue }>4</button>
      <button className={ btnKlass } onClick={ setValue }>5</button>
      <button className={ btnKlass } onClick={ setValue }>6</button>
      <button className={ btnKlass } onClick={ setValue }>7</button>
      <button className={ btnKlass } onClick={ setValue }>8</button>
      <button className={ btnKlass } onClick={ setValue }>9</button>
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

import React, { PropTypes } from 'react';
import cx from 'classnames';
import './index.css';

const stepsText = [
  'Each petal has a value. This number will not change.',
  'To start, set the values around a petal.',
  'Each petal uses the addition operation by default. Click on a petal to change its operation to subtraction, multiplication, or division.',
  'But be careful - you\'re also changing the operation for all petals of the same color!',
  'If the operation, applied to the outer number, equals the value in the petal, the petal will brighten. When all the petal are bright, you win!',
];

const TOTAL_STEPS = 4;

function Instructions({
  isVisible,
  setStep,
  step,
  toggleInstructions,
}) {
  const wrapperClasses = cx({
    'instructions': true,
    'instructions--visible': isVisible,
    [`instructions--step-${step}`]: true,
  });

  const canIncrement = step + 1 <= TOTAL_STEPS;
  const canDecrement = step - 1 >= 0;

  function getStepContents() {
    switch (step) {
    case 0:
      return (
        <div className='instructions__data-group'>
          <Data className='instructions__data' showSvg>40</Data>
        </div>
      );
    case 1:
      return (
        <div className='instructions__data-group'>
          <Data className='instructions__data'>5</Data>
          <Data className='instructions__data' showSvg>40</Data>
          <Data className='instructions__data'>8</Data>
        </div>
      );
    case 2:
      return (
        <div className='instructions__data-group'>
          <Data className='instructions__data'>5</Data>
          <Data className='instructions__data' showSetter showSvg>40</Data>
          <Data className='instructions__data'>8</Data>
        </div>
      );
    case 3:
      return [
        <div
          className='instructions__data-group instructions__data-group--small'
          key='0'>
          <Data className='instructions__data'>6</Data>
          <Data className='instructions__data' showSvg>12</Data>
          <Data className='instructions__data'>6</Data>
        </div>,
        <div
          className='instructions__data-group'
          key='1'>
          <Data className='instructions__data'>5</Data>
          <Data className='instructions__data' showSvg>40</Data>
          <Data className='instructions__data'>8</Data>
        </div>,
        <div
          className='instructions__data-group instructions__data-group--small'
          key='2'>
          <Data className='instructions__data'>2</Data>
          <Data className='instructions__data' showSvg>8</Data>
          <Data className='instructions__data'>2</Data>
        </div>,
      ];
    case 4:
      return (
        <div className='instructions__data-group'>
          <Data className='instructions__data'>5</Data>
          <Data className='instructions__data' showSvg>40</Data>
          <Data className='instructions__data'>8</Data>
        </div>
      );
    default:
      return null;
    }
  }

  return (
    <div className={ wrapperClasses }>
      <div className='instructions__inner'>
        <div className='instructions__circle'>
          { getStepContents() }
        </div>
        <p className='instructions__text'>
          { stepsText[step] }
        </p>
        <button
          className='controls__size-btn'
          disabled={ !canDecrement }
          onClick={ () => setStep(step - 1) }>
          «
        </button>
        <button
          className='controls__size-btn'
          disabled={ !canIncrement }
          onClick={ () => setStep(step + 1) }>
          »
        </button>
        <button
          className='controls__btn instructions__close-btn'
          onClick={ toggleInstructions }>
          Close
        </button>
      </div>
    </div>
  );
}

function Data({
  children,
  showSetter = false,
  showSvg = false,
  ...props,
}) {
  return (
    <span className='instructions__data' { ...props }>
      <span className='instructions__data-value'>{ children }</span>
      { showSvg &&
        <svg
          className='instructions__data-svg'
          viewBox='0 0 42.9 70.9'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M20.9,1.1c-5.8,8.2-10.3,17-13.8,26.4c-0.9,2.4,2.5,4.2,4.2,2.4C18.9,21.6,26.4,13.3,34,5c-1.3-1-2.6-2-3.9-3
            C20.2,15.7,10.3,29.4,0.4,43.1c-1.7,2.4,1.9,5,3.9,3c12-11.7,24.1-23.4,37.5-33.5c-1-1.3-2-2.6-3-3.9
            c-9.1,10.7-18.2,21.5-27.4,32.2c1.2,1.2,2.4,2.4,3.5,3.5c5.6-6.7,12-12.6,19.2-17.6c-1.1-1.1-2.3-2.3-3.4-3.4
            C22.4,34.8,13.9,46.2,5.5,57.6c-1.7,2.3,2.2,5.3,3.9,3C16.2,52,24,44.3,32.9,37.9c-1.1-1.1-2.3-2.3-3.4-3.4
            c-5.4,7.2-11.1,14.2-17.1,20.9c1.3,1,2.6,2,3.9,3c5-7.2,11-13.3,18.2-18.2c-1.1-1.1-2.3-2.3-3.4-3.4c-4.8,7.4-9.4,15-13.8,22.8
            c-1.1,2,1.3,5,3.4,3.4c5.5-4.2,10.9-8.4,16.4-12.6c-1.1-1.1-2.3-2.3-3.4-3.4c-4.5,6.5-9,12.9-13.6,19.4c1.4,0.8,2.9,1.7,4.3,2.5
            c2-3.9,4.5-6.7,8.1-9c-1.3-0.7-2.5-1.4-3.8-2.2c0.1,3.6-0.8,6.4-2.6,9.4c-1.3,2,1.4,5,3.4,3.4c1.5-1.1,3-2.3,4.5-3.4
            c2.5-1.9,0-6.3-2.5-4.3c-1.5,1.1-3,2.3-4.5,3.4c1.1,1.1,2.3,2.3,3.4,3.4c2.3-3.7,3.4-7.6,3.3-11.9c0-1.8-2.1-3.2-3.8-2.2
            c-4.3,2.7-7.6,6.2-9.9,10.8c-1.5,2.9,2.5,5.1,4.3,2.5c4.5-6.5,9-12.9,13.6-19.4c1.4-2-1.4-4.9-3.4-3.4
            c-5.5,4.2-10.9,8.4-16.4,12.6c1.1,1.1,2.3,2.3,3.4,3.4c4.3-7.8,8.9-15.3,13.8-22.8c1.3-2-1.4-4.8-3.4-3.4
            c-7.9,5.4-14.6,12.1-20,20c-1.6,2.3,2,5.1,3.9,3c6.3-7,12.2-14.3,17.8-21.9c1.5-2-1.4-4.8-3.4-3.4C20.9,40.2,12.7,48,5.7,56.9
            c1.3,1,2.6,2,3.9,3C18,48.5,26.5,37.1,34.9,25.7c1.5-2-1.4-4.8-3.4-3.4c-7.6,5.2-14.4,11.3-20.3,18.4c-2,2.4,1.4,6,3.5,3.5
            c9.4-10.5,18.5-21.2,27.6-32c1.7-2-0.6-5.8-3-3.9C25.6,18.7,13.2,30.6,0.8,42.6c1.3,1,2.6,2,3.9,3c9.9-13.7,19.8-27.4,29.6-41.1
            c1.7-2.3-2-5.1-3.9-3C22.9,9.8,15.3,18.1,7.8,26.4c1.4,0.8,2.8,1.6,4.2,2.4c3.3-9,7.8-17.4,13.3-25.2C27.1,1,22.8-1.5,20.9,1.1
            L20.9,1.1z' />
        </svg> }
        { showSetter &&
          <img
            className='instructions__setter-svg'
            src='images/instructions-setter.svg' /> }
    </span>
  );
}

Data.propTypes = {
  children: PropTypes.node.isRequired,
  showSetter: PropTypes.bool,
  showSvg: PropTypes.bool,
};

Instructions.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  setStep: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  toggleInstructions: PropTypes.func.isRequired,
};

export default Instructions;

import React, { PropTypes } from 'react';
import cx from 'classnames';

import Board from '../board';

import './index.css';

const stepsText = [
  'Each petal has a value. This number will not change.',
  'To start, set the values around a petal.',
  'Each petal uses the addition operation by default. Click on a petal to change its operation to subtraction, multiplication, or division. But be careful - you\'re also changing the operation for all petals of the same color!',
  'If the operation, applied to the outer number, equals the value in the petal, the petal will brighten.',
  'When all the petals are bright, you win!',
];

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

  const canIncrement = step + 1 < stepsText.length;
  const canDecrement = step - 1 >= 0;

  function getBoardProps() {
    const setterCoords = document.querySelectorAll('#instructions .petal--right')[1] ?
      document.querySelectorAll('#instructions .petal--right')[1].getBoundingClientRect() : {};
    const coords = {
      left: setterCoords.left + 40,
      top: setterCoords.top - 70,
    };

    switch (step) {
    case 0:
      return {
        circleProps: [
          [
            {
              data: {
                dynamic: { value: '' },
                statik: {
                  bottomRight: 4,
                  right: 5,
                },
              },
              petals: [
                {
                  contentValue: 5,
                  isInvalid: true,
                  name: 'right',
                },
                {
                  contentValue: 4,
                  isInvalid: true,
                  name: 'bottomRight',
                },
              ],
            },
            {
              data: {
                dynamic: { value: '' },
                statik: {
                  bottomRight: 5,
                  bottomLeft: 9,
                  right: 40,
                },
              },
              petals: [
                {
                  contentValue: 5,
                  isInvalid: true,
                  name: 'bottomRight',
                },
                {
                  contentValue: 9,
                  isInvalid: true,
                  name: 'bottomLeft',
                },
                {
                  contentValue: 40,
                  isInvalid: true,
                  name: 'right',
                },
              ],
            },
            {
              data: {
                dynamic: { value: '' },
                statik: {
                  bottomLeft: 9,
                },
              },
              petals: [
                {
                  contentValue: 9,
                  isInvalid: true,
                  name: 'bottomLeft',
                },
              ],
            },
          ],
          [
            {
              data: {
                dynamic: { value: '' },
                statik: {
                  right: 4,
                  bottomRight: 4,
                },
              },
              petals: [
                {
                  contentValue: 4,
                  isInvalid: true,
                  name: 'bottomRight',
                },
                {
                  contentValue: 4,
                  isInvalid: true,
                  name: 'right',
                },
              ],
            },
            {
              data: {
                dynamic: { value: '' },
                statik: {
                  bottomLeft: 2,
                },
              },
              petals: [
                {
                  contentValue: 2,
                  isInvalid: true,
                  name: 'bottomLeft',
                },
              ],
            },
          ],
          [
            {
              data: {
                dynamic: { value: '' },
                statik: {},
              },
              petals: [],
            },
          ],
        ],
      };
    case 1:
      return {
        circleProps: [
          [
            {
              data: {
                dynamic: { value: '' },
                statik: {
                  bottomRight: 4,
                  right: 5,
                },
              },
              petals: [
                {
                  contentValue: 5,
                  isInvalid: true,
                  name: 'right',
                },
                {
                  contentValue: 4,
                  isInvalid: true,
                  name: 'bottomRight',
                },
              ],
            },
            {
              data: {
                dynamic: { value: '5' },
                statik: {
                  bottomRight: 5,
                  bottomLeft: 9,
                  right: 40,
                },
              },
              petals: [
                {
                  contentValue: 5,
                  isInvalid: true,
                  name: 'bottomRight',
                },
                {
                  contentValue: 9,
                  isInvalid: true,
                  name: 'bottomLeft',
                },
                {
                  contentValue: 40,
                  isInvalid: true,
                  name: 'right',
                },
              ],
            },
            {
              data: {
                dynamic: { value: '8' },
                statik: {
                  bottomLeft: 9,
                },
              },
              petals: [
                {
                  contentValue: 9,
                  isInvalid: true,
                  name: 'bottomLeft',
                },
              ],
            },
          ],
          [
            {
              data: {
                dynamic: { value: '' },
                statik: {
                  right: 4,
                  bottomRight: 4,
                },
              },
              petals: [
                {
                  contentValue: 4,
                  isInvalid: true,
                  name: 'bottomRight',
                },
                {
                  contentValue: 4,
                  isInvalid: true,
                  name: 'right',
                },
              ],
            },
            {
              data: {
                dynamic: { value: '' },
                statik: {
                  bottomLeft: 2,
                },
              },
              petals: [
                {
                  contentValue: 2,
                  isInvalid: true,
                  name: 'bottomLeft',
                },
              ],
            },
          ],
          [
            {
              data: {
                dynamic: { value: '' },
                statik: {},
              },
              petals: [],
            },
          ],
        ],
      };
    case 2:
      return {
        circleProps: [
          [
            {
              data: {
                dynamic: { value: '' },
                statik: {
                  bottomRight: 4,
                  right: 5,
                },
              },
              petals: [
                {
                  contentValue: 5,
                  isInvalid: true,
                  name: 'right',
                },
                {
                  contentValue: 4,
                  isInvalid: true,
                  name: 'bottomRight',
                },
              ],
            },
            {
              data: {
                dynamic: { value: '5' },
                statik: {
                  bottomRight: 5,
                  bottomLeft: 9,
                  right: 40,
                },
              },
              petals: [
                {
                  contentValue: 5,
                  isInvalid: true,
                  name: 'bottomRight',
                },
                {
                  contentValue: 9,
                  isInvalid: true,
                  name: 'bottomLeft',
                },
                {
                  contentValue: 40,
                  isInvalid: true,
                  name: 'right',
                },
              ],
            },
            {
              data: {
                dynamic: { value: '8' },
                statik: {
                  bottomLeft: 9,
                },
              },
              petals: [
                {
                  contentValue: 9,
                  isInvalid: true,
                  name: 'bottomLeft',
                },
              ],
            },
          ],
          [
            {
              data: {
                dynamic: { value: '' },
                statik: {
                  right: 4,
                  bottomRight: 4,
                },
              },
              petals: [
                {
                  contentValue: 4,
                  isInvalid: true,
                  name: 'bottomRight',
                },
                {
                  contentValue: 4,
                  isInvalid: true,
                  name: 'right',
                },
              ],
            },
            {
              data: {
                dynamic: { value: '' },
                statik: {
                  bottomLeft: 2,
                },
              },
              petals: [
                {
                  contentValue: 2,
                  isInvalid: true,
                  name: 'bottomLeft',
                },
              ],
            },
          ],
          [
            {
              data: {
                dynamic: { value: '' },
                statik: {},
              },
              petals: [],
            },
          ],
        ],
        operationSetterProps: {
          activeIndex: 2,
          mousePos: [coords.left, coords.top],
          petalName: 'right',
        },
      };
    case 3:
      return {
        circleProps: [
          [
            {
              data: {
                dynamic: { value: '' },
                statik: {
                  bottomRight: 4,
                  right: 5,
                },
              },
              petals: [
                {
                  contentValue: 5,
                  isInvalid: true,
                  name: 'right',
                },
                {
                  contentValue: 4,
                  isInvalid: true,
                  name: 'bottomRight',
                },
              ],
            },
            {
              data: {
                dynamic: { value: '5' },
                statik: {
                  bottomRight: 5,
                  bottomLeft: 9,
                  right: 40,
                },
              },
              petals: [
                {
                  contentValue: 5,
                  isInvalid: true,
                  name: 'bottomRight',
                },
                {
                  contentValue: 9,
                  isInvalid: true,
                  name: 'bottomLeft',
                },
                {
                  contentValue: 40,
                  isInvalid: false,
                  name: 'right',
                },
              ],
            },
            {
              data: {
                dynamic: { value: '8' },
                statik: {
                  bottomLeft: 9,
                },
              },
              petals: [
                {
                  contentValue: 9,
                  isInvalid: true,
                  name: 'bottomLeft',
                },
              ],
            },
          ],
          [
            {
              data: {
                dynamic: { value: '' },
                statik: {
                  right: 4,
                  bottomRight: 4,
                },
              },
              petals: [
                {
                  contentValue: 4,
                  isInvalid: true,
                  name: 'bottomRight',
                },
                {
                  contentValue: 4,
                  isInvalid: true,
                  name: 'right',
                },
              ],
            },
            {
              data: {
                dynamic: { value: '' },
                statik: {
                  bottomLeft: 2,
                },
              },
              petals: [
                {
                  contentValue: 2,
                  isInvalid: true,
                  name: 'bottomLeft',
                },
              ],
            },
          ],
          [
            {
              data: {
                dynamic: { value: '' },
                statik: {},
              },
              petals: [],
            },
          ],
        ],
        operationSetterProps: {
          activeIndex: 2,
          mousePos: [coords.left, coords.top],
          petalName: 'right',
        },
      };
    case 4:
      return {
        circleProps: [
          [
            {
              data: {
                dynamic: { value: '1' },
                statik: {
                  bottomRight: 4,
                  right: 5,
                },
              },
              petals: [
                {
                  contentValue: 5,
                  isInvalid: false,
                  name: 'right',
                },
                {
                  contentValue: 4,
                  isInvalid: false,
                  name: 'bottomRight',
                },
              ],
            },
            {
              data: {
                dynamic: { value: '5' },
                statik: {
                  bottomRight: 5,
                  bottomLeft: 9,
                  right: 40,
                },
              },
              petals: [
                {
                  contentValue: 5,
                  isInvalid: false,
                  name: 'bottomRight',
                },
                {
                  contentValue: 9,
                  isInvalid: false,
                  name: 'bottomLeft',
                },
                {
                  contentValue: 40,
                  isInvalid: false,
                  name: 'right',
                },
              ],
            },
            {
              data: {
                dynamic: { value: '8' },
                statik: {
                  bottomLeft: 9,
                },
              },
              petals: [
                {
                  contentValue: 9,
                  isInvalid: false,
                  name: 'bottomLeft',
                },
              ],
            },
          ],
          [
            {
              data: {
                dynamic: { value: '4' },
                statik: {
                  right: 4,
                  bottomRight: 4,
                },
              },
              petals: [
                {
                  contentValue: 4,
                  isInvalid: false,
                  name: 'bottomRight',
                },
                {
                  contentValue: 4,
                  isInvalid: false,
                  name: 'right',
                },
              ],
            },
            {
              data: {
                dynamic: { value: '1' },
                statik: {
                  bottomLeft: 2,
                },
              },
              petals: [
                {
                  contentValue: 2,
                  isInvalid: false,
                  name: 'bottomLeft',
                },
              ],
            },
          ],
          [
            {
              data: {
                dynamic: { value: '1' },
                statik: {},
              },
              petals: [],
            },
          ],
        ],
      };
    default:
      return {};
    }
  }

  return (
    <div className={ wrapperClasses } id='instructions'>
      <div className='instructions__inner'>
        <Board
          isDisabled
          key={ step }
          { ...getBoardProps() } />
        <div className='instructions__footer'>
          <p className='instructions__text'>
            { stepsText[step] }
          </p>
          <button
            className='u-btn u-btn--small'
            disabled={ !canDecrement }
            onClick={ () => setStep(step - 1) }>
            «
          </button>
          <button
            className='u-btn u-btn--small'
            disabled={ !canIncrement }
            onClick={ () => setStep(step + 1) }>
            »
          </button>
          <button
            className='u-btn instructions__close-btn'
            onClick={ toggleInstructions }>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

Instructions.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  setStep: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  toggleInstructions: PropTypes.func.isRequired,
};

export default Instructions;

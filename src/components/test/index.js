import React, { Component } from 'react';

import './index.css';

class Test extends Component {
  render() {
    return (
      <div className='test-wrapper'>
        <div className='test-row'>
          <svg
            className='test-circle-svg'
            viewBox='0 0 200 200'
            xmlns='http://www.w3.org/2000/svg'>
          </svg>
        </div>
        <div className='test-row'>
          <svg
            className='test-circle-svg'
            viewBox='0 0 200 200'
            xmlns='http://www.w3.org/2000/svg'>
            <Petal
              className='test-petal--right'
              onClick={ () => { console.log('right') } } />
            <Petal
              className='test-petal--bottom-right'
              onClick={ () => { console.log('bottomright') } } />
          </svg>
          <svg
            className='test-circle-svg'
            viewBox='0 0 200 200'
            xmlns='http://www.w3.org/2000/svg'>
            <Petal
              className='test-petal--bottom-left'
              onClick={ () => { console.log('bottomleft') } } />
          </svg>
        </div>
        <div className='test-row'>
          <svg
            className='test-circle-svg'
            viewBox='0 0 200 200'
            xmlns='http://www.w3.org/2000/svg'>
            <Petal
              className='test-petal--right'
              onClick={ () => { console.log('right') } } />
            <Petal
              className='test-petal--bottom-right'
              onClick={ () => { console.log('bottomright') } } />
          </svg>
          <svg
            className='test-circle-svg'
            viewBox='0 0 200 200'
            xmlns='http://www.w3.org/2000/svg'>
            <Petal
              className='test-petal--right'
              onClick={ () => { console.log('right') } } />
            <Petal
              className='test-petal--bottom-left'
              onClick={ () => { console.log('bottomleft') } } />
            <Petal
              className='test-petal--bottom-right'
              onClick={ () => { console.log('bottomright') } } />
          </svg>
          <svg
            className='test-circle-svg'
            viewBox='0 0 200 200'
            xmlns='http://www.w3.org/2000/svg'>
            <Petal
              className='test-petal--bottom-left'
              onClick={ () => { console.log('bottomleft') } } />
          </svg>
        </div>
      </div>
    );
  }
}

function Petal(props) {
  return <path
          d='M0,69.17C0.64,44,9.55,21.33,27,2c2.33-2.59,3.71-2.71,6.21-.07C60.79,31.06,68,76.31,50.72,112.36a121.29,121.29,0,0,1-17.31,26.09c-2.44,2.88-4,2.94-6.56.05C9.39,119,.35,96.2,0,69.17Z'
          { ...props } />
}

export default Test;

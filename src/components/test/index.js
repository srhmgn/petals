import React, { } from 'react';

import './index.css';

function Test() {
  return (
    <div className='test-wrapper'>
      <span className='test-svg-wrapper'>
        <svg
          className='test-circle-svg'
          viewBox='0 0 200 200'
          xmlns='http://www.w3.org/2000/svg'>
          <circle className='test-petal--right' cx='100' cy='100' r='100'/>
          <circle className='test-circle' cx='100' cy='100' r='100'/>
        </svg>
      </span>
      <span className='test-svg-wrapper'>
        <svg
          className='test-circle-svg'
          viewBox='0 0 200 200'
          xmlns='http://www.w3.org/2000/svg'>
          <circle className='test-circle' cx='100' cy='100' r='100'/>
          <circle className='test-petal--right' cx='100' cy='100' r='100'/>
          <circle className='test-petal--bottom-left' cx='100' cy='100' r='100'/>
        </svg>
      </span>
      <span className='test-svg-wrapper'>
        <svg
          className='test-circle-svg'
          viewBox='0 0 200 200'
          xmlns='http://www.w3.org/2000/svg'>
          <circle className='test-circle' cx='100' cy='100' r='100'/>
          <circle className='test-petal--bottom-left' cx='100' cy='100' r='100'/>
        </svg>
      </span>
    </div>
  );
}

export default Test;

import React from 'react';
import ReactDOM from 'react-dom';
import Circles from './components/circles';

import './main.css';

ReactDOM.render(
  <Circles />,
  document.body.appendChild(document.createElement('div'))
);

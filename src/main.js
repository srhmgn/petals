import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Game from './containers/game';
import './main.css';
import configureStore from './configure-store';

ReactDOM.render(
  <Provider store={ configureStore() }>
    <Game />
  </Provider>,
  document.body.appendChild(document.createElement('div')),
);

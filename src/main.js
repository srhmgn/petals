import React from 'react';
import ReactDOM from 'react-dom';
import Game from './containers/game';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

import './main.css';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.body.appendChild(document.createElement('div')),
);

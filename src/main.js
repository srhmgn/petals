import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';

import Game from './containers/game';
import reducer from './reducers';
import './main.css';

const logger = createLogger();
const store = createStore(
  reducer,
  applyMiddleware(logger),
);

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.body.appendChild(document.createElement('div')),
);

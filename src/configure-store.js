import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import reducer from './reducers';

export default function configureStore() {
  const logger = createLogger({
    collapsed: true,
  });

  return (process.env.NODE_ENV !== 'production') ?
    createStore(
      reducer,
      applyMiddleware(logger),
    ) : createStore(reducer);
}

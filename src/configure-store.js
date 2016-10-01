import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import reducer from './reducers';

export default function configureStore() {
  const logger = createLogger();

  return createStore(
    reducer,
    applyMiddleware(logger),
  );
}

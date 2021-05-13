import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from '../reducers'; //no need to mention index.js as js will automatically find index.js in this case

let store;

export function configureStore() {
  store = createStore(reducer, applyMiddleware(thunk, logger));

  return store;
}

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistedReducer} from './reducers';
import { persistStore } from 'redux-persist';
import rootSaga from './sagas';
import {composeWithDevTools} from 'redux-devtools-extension'

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

const persistor = persistStore(store)

sagaMiddleware.run(rootSaga);

export {store, persistor}
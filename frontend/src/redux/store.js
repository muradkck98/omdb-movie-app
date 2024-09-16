import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { moviesReducer } from './reducers';
import { watchMoviesSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(moviesReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchMoviesSaga);

export default store;

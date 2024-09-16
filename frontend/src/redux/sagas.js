import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchMoviesSuccess, fetchMoviesFailure, FETCH_MOVIES_REQUEST } from './actions';
import { fetchMovies } from '../Api/api';

function* fetchMoviesSaga(action) {
  try {
    const response = yield call(fetchMovies, action.keyword);
    yield put(fetchMoviesSuccess(response.data));
  } catch (error) {
    yield put(fetchMoviesFailure(error.message));
  }
}

export function* watchMoviesSaga() {
  yield takeLatest(FETCH_MOVIES_REQUEST, fetchMoviesSaga);
}

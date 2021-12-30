import { all, fork } from 'redux-saga/effects';
import wineSaga from './wine';

export default function* rootSaga() {
    yield all([fork(wineSaga)]);
}

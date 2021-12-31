import { all, fork, takeEvery, call, put } from 'redux-saga/effects';
import { wineInfoByImageRequest } from '../../../src/api/ApiService';
import * as actions from '../actions/wine';
import { WINE_INFO_BY_IMAGE_SUCCESS } from '../actions/wine';

function wineInfoByImageRequestAPI(data) {
    return wineInfoByImageRequest(data);
}

function* wineInfoByImage(data) {
    try {
        data = data.payload.wineImage;
        const wineList = yield call(wineInfoByImageRequestAPI, data);
        yield put({
            type: WINE_INFO_BY_IMAGE_SUCCESS,
            payload: wineList
        });
    } catch (e) {
        console.log(e);
    } finally {
    }
}

function* watchWineInfoByImage() {
    yield takeEvery(actions.WINE_INFO_BY_IMAGE_REQUEST, wineInfoByImage);
}

export default function* wineSaga() {
    yield all([fork(watchWineInfoByImage)]);
}

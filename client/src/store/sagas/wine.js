import { all, fork, takeEvery, call, put } from 'redux-saga/effects';
import { wineInfoByImageRequest, wineInfoByKeywordRequest } from '../../../src/api/ApiService';
import * as actions from '../actions/wine';

function wineInfoByImageRequestAPI(data) {
    return wineInfoByImageRequest(data);
}

function wineInfoByKeywordRequestAPI(data) {
    return wineInfoByKeywordRequest(data);
}

function* wineInfoByImage(data) {
    try {
        data = data.payload.wineImage;
        const wineList = yield call(wineInfoByImageRequestAPI, data);
        yield put({
            type: actions.WINE_INFO_BY_IMAGE_SUCCESS,
            payload: wineList
        });
    } catch (e) {
        console.log(e);
    } finally {
    }
}

function* wineInfoByKeyword(data) {
    try {
        data = data.payload;
        const wineList = yield call(wineInfoByKeywordRequestAPI, data);
        yield put({
            type: actions.WINE_INFO_BY_KEYWORD_SUCCESS,
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

function* watchWineInfoByKeyword() {
    yield takeEvery(actions.WINE_INFO_BY_KEYWORD_REQUEST, wineInfoByKeyword);
}

export default function* wineSaga() {
    yield all([fork(watchWineInfoByImage), fork(watchWineInfoByKeyword)]);
}

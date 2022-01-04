import { all, fork, takeEvery, call, put } from 'redux-saga/effects';
import { everyWineInfoRequest, wineInfoByImageRequest, wineOrderRequest, wineInfoByKeywordRequest } from '../../../src/api/ApiService';
import * as actions from '../actions/wine';

function wineOrderRequestAPI(data) {
    return wineOrderRequest(data);
}

function everyWineInfoRequestAPI() {
    return everyWineInfoRequest();
}

function wineInfoByImageRequestAPI(data) {
    return wineInfoByImageRequest(data);
}

function wineInfoByKeywordRequestAPI(data) {
    return wineInfoByKeywordRequest(data);
}

function* orderWine(data) {
    try {
        const res = yield call(wineOrderRequestAPI, data.payload);
        alert(`${data.roomNum}호 주문이 완료되었습니다.`);
        yield put({
            type: actions.WINE_ORDER_BY_ROOM_NUMBER_SUCCESS
        });
    } catch (e) {
        yield put({
            type: actions.WINE_ORDER_BY_ROOM_NUMBER_FAILURE
        });
    }
}

function* everyWineInfo() {
    try {
        const everyWineList = yield call(everyWineInfoRequestAPI);
        yield put({
            type: actions.EVERY_WINE_INFO_SUCCESS,
            payload: everyWineList.data
        });
    } catch (e) {
        yield put({
            type: actions.EVERY_WINE_INFO_FAILURE
        });
    }
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
            payload: wineList.data
        });
    } catch (e) {
        console.log(e);
    } finally {
    }
}

function* watchOrderWine() {
    yield takeEvery(actions.WINE_ORDER_BY_ROOM_NUMBER_REQUEST, orderWine);
}

function* watchEveryWineInfo() {
    yield takeEvery(actions.EVERY_WINE_INFO_REQUEST, everyWineInfo);
}

function* watchWineInfoByImage() {
    yield takeEvery(actions.WINE_INFO_BY_IMAGE_REQUEST, wineInfoByImage);
}

function* watchWineInfoByKeyword() {
    yield takeEvery(actions.WINE_INFO_BY_KEYWORD_REQUEST, wineInfoByKeyword);
}

export default function* wineSaga() {
    yield all([fork(watchWineInfoByImage), fork(watchWineInfoByKeyword), fork(watchEveryWineInfo), fork(watchOrderWine)]);
}

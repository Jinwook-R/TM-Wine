import {
    WINE_INFO_BY_IMAGE_REQUEST,
    WINE_INFO_BY_IMAGE_SUCCESS,
    LOAD_WINE_INFO_DONE_CHANGE,
    WINE_INFO_BY_KEYWORD_REQUEST,
    WINE_INFO_BY_KEYWORD_FAILURE,
    WINE_INFO_BY_KEYWORD_SUCCESS,
    WINE_INFO_BY_IMAGE_FAILURE,
    EVERY_WINE_INFO_REQUEST,
    EVERY_WINE_INFO_SUCCESS,
    EVERY_WINE_INFO_FAILURE,
    WINE_ORDER_BY_ROOM_NUMBER_REQUEST,
    WINE_ORDER_BY_ROOM_NUMBER_SUCCESS,
    WINE_ORDER_BY_ROOM_NUMBER_FAILURE,
    WINE_LABEL_NAME_CHANGE
} from '../actions/wine.js';

export const initialState = {
    loadWineInfoLoading: false,
    loadWineInfoDone: false,
    loadWineInfoError: false,
    loadEveryWineInfoLoading: false,
    loadEveryWineInfoDone: false,
    loadEveryWineInfoError: false,
    loadWineOrderLoading: false,
    loadWineOrderDone: false,
    loadWineOrderError: false,
    wineList: [],
    everyWineList: {},
    labelName: ''
};

export const wineLabelNameChangeAction = () => {
    return {
        type: WINE_LABEL_NAME_CHANGE
    };
};

export const wineOrderAction = (data) => {
    return {
        type: WINE_ORDER_BY_ROOM_NUMBER_REQUEST,
        payload: data
    };
};

export const everyWineInfoAction = () => {
    return {
        type: EVERY_WINE_INFO_REQUEST
    };
};

export const wineInfoByImageAction = (data) => {
    return {
        type: WINE_INFO_BY_IMAGE_REQUEST,
        payload: {
            wineImage: data
        }
    };
};

export const wineInfoByKeywordAction = (data) => {
    return {
        type: WINE_INFO_BY_KEYWORD_REQUEST,
        payload: {
            keyword: data
        }
    };
};

export const LoadWineInfoDoneChangeAction = () => {
    return {
        type: LOAD_WINE_INFO_DONE_CHANGE
    };
};

export default (state = initialState, action) => {
    const { type, payload, error } = action;
    console.log(payload);
    switch (type) {
        case WINE_LABEL_NAME_CHANGE:
            return {
                ...state,
                labelName: ''
            };
        case EVERY_WINE_INFO_REQUEST:
            return {
                ...state,
                loadEveryWineInfoLoading: true
            };
        case EVERY_WINE_INFO_SUCCESS:
            return {
                ...state,
                loadEveryWineInfoLoading: false,
                loadEveryWineInfoDone: true,
                everyWineList: payload
            };
        case EVERY_WINE_INFO_FAILURE:
            return {
                ...state,
                loadEveryWineInfoLoading: false,
                loadEveryWineInfoDone: false,
                loadEveryWineInfoError: true
            };
        case WINE_INFO_BY_IMAGE_REQUEST:
            return {
                ...state,
                loadWineInfoLoading: true
            };
        case WINE_INFO_BY_IMAGE_SUCCESS:
            const wineResult = Object.values(payload).slice(1, Object.keys(payload).length);
            return {
                ...state,
                loadWineInfoLoading: false,
                loadWineInfoDone: true,
                wineList: wineResult ?? [],
                labelName: payload.labelName
            };
        case WINE_INFO_BY_IMAGE_FAILURE:
            return {
                ...state,
                loadWineInfoLoading: false,
                loadWineInfoDone: false,
                loadWineInfoError: true
            };
        case WINE_INFO_BY_KEYWORD_FAILURE:
            return {
                ...state,
                loadWineInfoLoading: false,
                loadWineInfoDone: false,
                loadWineInfoError: false
            };
        case WINE_INFO_BY_KEYWORD_REQUEST:
            return {
                ...state,
                loadWineInfoLoading: true
            };
        case WINE_INFO_BY_KEYWORD_SUCCESS:
            return {
                ...state,
                loadWineInfoLoading: false,
                loadWineInfoDone: true,
                wineList: Object.values(payload) ?? []
            };
        case LOAD_WINE_INFO_DONE_CHANGE:
            return {
                ...state,
                loadWineInfoDone: false
            };
        case WINE_ORDER_BY_ROOM_NUMBER_REQUEST:
            return {
                ...state,
                loadWineOrderLoading: true
            };
        case WINE_ORDER_BY_ROOM_NUMBER_SUCCESS:
            return {
                ...state,
                loadWineOrderLoading: false,
                loadWineOrderDone: true,
                wineList: Object.values(payload) ?? []
            };
        case WINE_ORDER_BY_ROOM_NUMBER_FAILURE:
            return {
                ...state,
                loadWineOrderError: false
            };
        default:
            return state;
    }
};

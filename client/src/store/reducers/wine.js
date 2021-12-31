import { WINE_INFO_BY_IMAGE_REQUEST, WINE_INFO_BY_IMAGE_SUCCESS, LOAD_WINE_INFO_DONE_CHANGE } from '../actions/wine.js';

export const initialState = {
    loadWineInfoLoading: false,
    loadWineInfoDone: false,
    loadWineInfoError: false,
    wineList: []
};

export const wineInfoByImageAction = (data) => {
    return {
        type: WINE_INFO_BY_IMAGE_REQUEST,
        payload: {
            wineImage: data
        }
    };
};

export const LoadWineInfoDoneChange = () => {
    return {
        type: LOAD_WINE_INFO_DONE_CHANGE
    };
};

export default (state = initialState, action) => {
    const { type, payload, error } = action;
    switch (type) {
        case WINE_INFO_BY_IMAGE_REQUEST:
            return {
                ...state,
                loadWineInfoLoading: true
            };
        case WINE_INFO_BY_IMAGE_SUCCESS:
            return {
                ...state,
                loadWineInfoLoading: false,
                loadWineInfoDone: true,
                wineList: payload ?? []
            };
        case LOAD_WINE_INFO_DONE_CHANGE:
            return {
                ...state,
                loadWineInfoDone: false
            };
        default:
            return state;
    }
};

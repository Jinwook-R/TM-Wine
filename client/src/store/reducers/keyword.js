import { GET_KEYWORD_LIST } from '../actions/keyword';

const initialState = {
    situation: {
        list: [
            ['#분위기 낼 때 좋아요', 0],
            ['#특별한 날 마시기 좋아요', 1],
            ['#알아서 추천해주세요', 2],
            ['#가성비가 좋아요', 3]
        ]
    },
    flavor: {
        list: [
            ['#깊은 풍미를 느끼고 싶어요', 4],
            ['#과일향이 좋아요', 5],
            ['#떫고 씁쓸해요', 6],
            ['#스파이시함이 매력적이에요', 7],
            ['#달지 않고 깔끔해요', 8],
            ['#달달한 게 좋아요', 9],
            ['#목넘김이 부드러워요', 10],
            ['#바디감이 있어요', 11],
            ['#산미가 있어요', 12]
        ]
    },
    harmony: {
        list: [
            ['#고기류와 잘 어울려요', 13],
            ['#디저트류와 잘 어울려요', 14],
            ['#치즈와 잘 어울려요', 15],
            ['#해산물과 잘 어울려요', 16]
        ]
    }
};

export const keywordListByKeyword = (data) => {
    return {
        type: GET_KEYWORD_LIST,
        payload: data
    };
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_KEYWORD_LIST:
            return state[payload];
        default:
            return state;
    }
};

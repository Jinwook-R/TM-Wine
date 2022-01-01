import { combineReducers } from 'redux';
import wine from './wine';
import keyword from './keyword';

const rootReducer = (state, action) => {
    switch (action.type) {
        default: {
            const combineReducer = combineReducers({
                wine,
                keyword
            });
            return combineReducer(state, action);
        }
    }
};

export default rootReducer;

import { combineReducers } from 'redux';
import wine from './wine';

const rootReducer = (state, action) => {
    switch (action.type) {
        default: {
            const combineReducer = combineReducers({
                wine
            });
            return combineReducer(state, action);
        }
    }
};

export default rootReducer;

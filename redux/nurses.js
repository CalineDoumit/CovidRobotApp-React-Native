import * as ActionTypes from './ActionTypes';

export const Nurses = (state = {
    isLoading: true,
    errMess: null,
    nurses: [],
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_NURSES:
            return { ...state, isLoading: false, errMess: null, nurses: action.payload, inactivenurses: [] };

        case ActionTypes.NURSES_LOADING:
            return { ...state, isLoading: true, errMess: null, nurses: [], inactivenurses: [] };

        case ActionTypes.NURSES_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, nurses: [], inactivenurses: [] };

        default:
            return state;
    }
};

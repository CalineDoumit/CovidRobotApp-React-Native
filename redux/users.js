import * as ActionTypes from './ActionTypes';

export const Users = (state = {
    isLoading: true,
    errMess: null,
    users: [],
    inactiveusers: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_USERS:
            return { ...state, isLoading: false, errMess: null, users: action.payload, inactiveusers: [] };

        case ActionTypes.USERS_LOADING:
            return { ...state, isLoading: true, errMess: null, users: [], inactiveusers: [] };

        case ActionTypes.USERS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, users: [], inactiveusers: [] };

        case ActionTypes.ADD_INACTIVEUSERS:
            return { ...state, isLoading: false, errMess: null, users: [], inactiveusers: action.payload };

        default:
            return state;
    }
};
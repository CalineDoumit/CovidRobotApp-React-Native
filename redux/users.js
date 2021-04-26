import * as ActionTypes from './ActionTypes';

export const Users = (state = {
    isLoading: true,
    errMess: null,
    users: [],
    correspondingUser:[],
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_USERS:
            return { ...state, isLoading: false, errMess: null, users: action.payload,correspondingUser:[]};

        case ActionTypes.USERS_LOADING:
            return { ...state, isLoading: true, errMess: null, users: [], correspondingUser:[]};

        case ActionTypes.USERS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, users: [], correspondingUser:[] };

       
        case ActionTypes.ADD_CORRESPONDINGUSER:
            console.log("corresonding Patient from redux "+ JSON.stringify(action.payload))
            return { ...state, isLoading: false, errMess: null, users: [],correspondingUser:action.payload };

        default:
            return state;
    }
};
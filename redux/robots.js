import * as ActionTypes from './ActionTypes';

export const Robots = (state = { 
    isLoading: true,
    errMess: null,
    robots:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_ROBOTS:
            return {...state, isLoading: false, errMess: null, robots: action.payload};

        case ActionTypes.ROBOTS_LOADING:
            return {...state, isLoading: true, errMess: null, robots: []};

        case ActionTypes.ROBOTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, robots: []};

        default:
          return state;
      }
}; 
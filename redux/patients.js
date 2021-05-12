import * as ActionTypes from './ActionTypes';

export const Patients = (state = {
    isLoading: true,
    errMess: null,
    patients: [],
    correspondingPatient: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PATIENTS:
            return { ...state, isLoading: false, errMess: null, patients: action.payload, correspondingPatient: [] };

        case ActionTypes.PATIENTS_LOADING:
            return { ...state, isLoading: true, errMess: null, patients: [], correspondingPatient: [] };

        case ActionTypes.PATIENTS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, patients: [], correspondingPatient: [] };

        case ActionTypes.ADD_CORRESPONDINGPATIENT:
            return { ...state, isLoading: false, errMess: null, patients: [], correspondingPatient: action.payload };

        default:
            return state;
    }
};
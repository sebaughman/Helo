import { combineReducers } from 'redux';
import {SET_STATE, SET_FRIENDS, UPDATE_USER, ADD_FRIEND, REMOVE_FRIEND} from './constraints'

const initialState = {
    id: '',
    email: "",
    first_name: "",
    last_name: "",
    gender: "",
    hair_color: "",
    eye_color: "",
    hobby: "",
    birthday_day: '',
    birthday_month: "",
    birthday_year: '',
    image: '',
}


function user(state = initialState, action){
    switch(action.type){
        case `${SET_STATE}_PENDING`:
            return  Object.assign({}, state);
        case `${SET_STATE}_FULFILLED`:
            return Object.assign({}, state, action.payload );
        case `${SET_STATE}_REJECTED`:
            return [`State not set`];
        case UPDATE_USER: 
            return Object.assign({}, state, action.payload)
        default:
            return state;
    }
}

function friends(state = [], action){
    switch(action.type){
        case `${SET_FRIENDS}_PENDING`:
            return  state;
        case `${SET_FRIENDS}_FULFILLED`:
            return  [...state, ...action.payload]
        case `${SET_FRIENDS}_REJECTED`:
            return [`Friends not set`];
        case `${ADD_FRIEND}_PENDING`:
            return  state;
        case `${ADD_FRIEND}_FULFILLED`:
            return  [...state, action.payload]
        case `${ADD_FRIEND}_REJECTED`:
            return [`Friend not added`];
        case `${REMOVE_FRIEND}_PENDING`:
            return  state;
        case `${REMOVE_FRIEND}_FULFILLED`:
            return  action.payload
        case `${REMOVE_FRIEND}_REJECTED`:
            return [`Friend not removed`];
        default:
            return state;
    }
}

const reducer = combineReducers({user, friends});

export default reducer;

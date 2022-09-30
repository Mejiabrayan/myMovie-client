import { SET_FILTER, SET_MOVIES, SET_USER, UPDATE_USER } from '../actions/actions';

import { combineReducers } from 'redux';

function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default: return state;
    }
}

function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            return action.value;
        default: return state;
    }
}

function user(state = '', action) {
    switch (action.type) {
        case SET_USER:
            return action.value || localStorage.getItem('user');
        default: return state;
    }
}

function updateUser(state = '', action) {
    switch (action.type) {
        case UPDATE_USER:
            return action.value;
        default: return state;
    }
}

// built-in combineReducers function from Redux
const moviesApp = combineReducers({
    visibilityFilter,
    movies,
    user,
    updateUser

})

export default moviesApp;


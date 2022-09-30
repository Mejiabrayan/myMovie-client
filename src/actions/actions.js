// ACTION TYPES
export const SET_MOVIES = 'SET_MOVIES';
// action type constant for the set visibility filter action type constant for the set visibility filter
export const SET_FILTER = 'SET_FILTER';
// action type constant for the set user action type constant for the set user
export const SET_USER = 'SET_USER';
// action type constant for the set user action type constant for the set user
export const UPDATE_USER = 'UPDATE_USER';


// action creator for the set movies action creator for the set movies
export function setMovies(value) {
    return { type: SET_MOVIES, value };
}
// action creator for the set visibility filter action creator for the set visibility filter
export function setFilter(value) {
    return { type: SET_FILTER, value };
}
// action creator for the set user action creator for the set user
export function setUser(value) {
    return { type: SET_USER, value };
}
// action creator for the set update user action creator for the set update user
export function updateUser(value) {
    return { type: UPDATE_USER, value }
}

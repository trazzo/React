import * as ActionTypes from './ActionTypes';

export const Dishes = (state = {
        isLoading: true,
        errMess: null,
        dishes: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_DISHES:
            return {...state, isLoading: false, errMess: null, dishes: action.payload};

        case ActionTypes.DISHES_LOADING:
            /* {...state, whatever} => indicates you can pass the actual state (no matter 
            what value it is having) and add to it the next properties in this case:
            - isLoading
            - errMess 
            - dishes
            returning a copy of the original state getting the new values without mutating it */
            return {...state, isLoading: true, errMess: null, dishes: []};
        case ActionTypes.DISHES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, dishes: []};

        default:
            return state;
    }
};
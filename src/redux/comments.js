import * as ActionTypes from './ActionTypes';


export const Comments = (state = {
    errMess: null,
    comments:[]
}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, isLoading: false, errMess: null, comments: action.payload};
    
        case ActionTypes.COMMENTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, comments: []};
        
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.comments.length;
            comment.date = new Date().toISOString();
            return {...state, comments: state.comments.concat(comment)};
            /*whatever was in the state and the value of 
            "state.comments.concat(comment)" for the property "comments"
            which is an array
            */

        default:
            return state;
    }
}
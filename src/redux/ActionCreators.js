import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload:  comment
});

/*To post a comment, we should send the post object to the server after stringify it. If
everything was OK on the server, we will receive the object "comment" updated from the server, we should
parse that JSON and dispatch it to our redux store.
If an error ocurred on the server, we will get an error (worked in the catch)*/ 
export const postComment = (dishId, rating, author, comment) => 
    (dispatch) => {

        const newComment = {
            dishId: dishId,
            rating: rating,
            author: author,
            comment: comment
        }
        newComment.date = new Date().toISOString();

        return fetch(baseUrl + 'comments', {
            method: 'POST', 
            body: JSON.stringify(newComment),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        })
            .then(response => {
                if (response.ok) {
                return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
            .then(response => response.json())
            .then(response => dispatch(addComment(response)))
            /*in this moment, the server has returned the "comment" updated, it
            will have an ID now. It will be posted into my redux store with the next line*/
            .catch(error => { console.log('Post comments', error.message);
                alert('Your comment could not be posted\nError: ' + error.message);
                });
    };



export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
        .then(response => {
            if (response.ok) {
            return response;
            } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        },
        error => {
                var errmess = new Error(error.message);
                throw errmess;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
};

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchComments = () => (dispatch) => {    
    return fetch(baseUrl + 'comments')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
};

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

/* LEADERS CREATOR TASK 1*/

export const fetchLeaders = () => (dispatch) => {
    
    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
};

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

/* WORKING WITH CONTACT FORM TASK 2*/

export const postFeedback = (firstname, lastname, telnum , email, agree, contactType, message) => 
    (dispatch) => {

        const newFeedback = {
            firstname: firstname,
            lastname: lastname,
            telnum: telnum,
            email: email,
            agree: agree,
            contactType: contactType,
            message: message
        }

        return fetch(baseUrl + 'feedback', {
            method: 'POST', 
            body: JSON.stringify(newFeedback),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        })
            .then(response => {
                if (response.ok) {
                return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
            .then(response => response.json())
            .then(response => dispatch(addFeedback(response)))
            .then(response => alert("Thank you for your feedback! \n" +  JSON.stringify(response.payload)))
            .catch(error => { console.log('Post feedback', error.message);
                alert('Your feedback could not be sent\nError: ' + error.message);
                });
    };

    export const addFeedback = (feedback) => ({
        type: ActionTypes.ADD_FEEDBACK,
        payload:  feedback
    });

    export const feedbacksFailed = (errmess) => ({
        type: ActionTypes.FEEDBACKS_FAILED,
        payload: errmess
    });

    export const addFeedbacks = (feedbacks) => ({
        type: ActionTypes.ADD_FEEDBACKS,
        payload: feedbacks
    });
    
    export const fetchFeedbacks = () => (dispatch) => {    
        return fetch(baseUrl + 'feedback')
        .then(response => {
            if (response.ok) {
              return response;
            } else {
              var error = new Error('Error ' + response.status + ': ' + response.statusText);
              error.response = response;
              throw error;
            }
          },
          error => {
                var errmess = new Error(error.message);
                throw errmess;
          })
        .then(response => response.json())
        .then(feedbacks => dispatch(addFeedbacks(feedbacks)))
        .catch(error => dispatch(feedbacksFailed(error.message)));
    };


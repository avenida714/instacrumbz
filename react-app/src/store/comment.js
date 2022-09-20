const CREATE_COMMENT = 'comment/createComment';
const READ_COMMENT = 'comment/readComment'; // get all comments action type
const UPDATE_COMMENT = 'comment/updateComment';
const DELETE_COMMENT = 'comment/deleteComment';




//Action Creators:
const actionCreateComment = (comment) => {
    return {
        type: CREATE_COMMENT,
        comment
    }
}
const actionReadComment = (comment) => {
    return {
        type: READ_COMMENT,
        comment
    }
}
const actionUpdateComment = (comment) => {
    return {
        type: UPDATE_COMMENT,
        comment
    }
}
const actionDeleteComment = (id) => {
    return {
        type: DELETE_COMMENT,
        id
    }
}


//thunk:
// Get all comment 
export const getPostComment = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}/all_comments`)

    if (response.ok) {
        const comments = await response.json()
        dispatch(actionReadComment(comments.comments))
    }
    return response;
}


// Create a comment for post
export const createComment = (newCommentData) => async (dispatch) => {
    const response = await fetch(`/api/posts/${newCommentData.post_id}/new_comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCommentData)
    });

    if (response.ok) {
      const newComment = await response.json();
      dispatch(actionCreateComment(newComment));
      return newComment
    }
    return response;
  };


  // Update a comment for post
  export const updateAComment = (editCommentData) => async (dispatch) => {
    const response = await fetch(`/api/comment/${editCommentData.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(editCommentData)
    })
    if (response.ok) {
        const edittedComment = await response.json()
        dispatch(actionUpdateComment(edittedComment))
        return edittedComment
    }
    return response;
}


// Delete a comment 
  export const deleteAComment = (id) => async (dispatch) => {
  
    const response = await fetch(`/api/comment/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
  
    });
  
    if (response.ok) {
    //   const comment = await response.json();
      dispatch(actionDeleteComment(id));
    }
    return response;
  };




//Initial State:
const initialState = {};

//Reducer:
const commentsReducer = (state = initialState, action) => {

    let newState = {}

    switch (action.type) {
        case CREATE_COMMENT: {
            newState = {...state}
            newState[action.comment.id] = action.comment
            return newState
        }

        case READ_COMMENT: {
            action.comment.forEach((comment) => {
                newState[comment.id] = comment
            })
            return newState;
        }

        case UPDATE_COMMENT: {
            newState = {...state}
            newState[action.comment.id] = action.comment
            return newState
        }

        case DELETE_COMMENT: {
            newState = {...state}
            delete newState[action.id]
            return newState
        }
 
        default:
            return state;
    };
};


export default commentsReducer;
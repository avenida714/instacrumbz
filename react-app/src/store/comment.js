import { getOnePostById } from "./posts";

const CREATE_COMMENT = "comment/createComment";
const READ_COMMENT = "comment/readComment"; // get all comments action type
const UPDATE_COMMENT = "comment/updateComment";
const DELETE_COMMENT = "comment/deleteComment";

//Action Creators:
const actionCreateComment = (comment) => {
  return {
    type: CREATE_COMMENT,
    comment,
  };
};
const actionReadComment = (comment) => {
  return {
    type: READ_COMMENT,
    comment,
  };
};
const actionUpdateComment = (comment) => {
  return {
    type: UPDATE_COMMENT,
    comment,
  };
};
const actionDeleteComment = (id) => {
  return {
    type: DELETE_COMMENT,
    id,
  };
};

//thunk:
// Get all comment
export const getPostComment = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/all_comments`);

  if (response.ok) {
    const comments = await response.json();
    dispatch(actionReadComment(comments.comments));
  }
  return response;
};

// Create a comment for post
export const createComment = (newCommentData) => async (dispatch) => {
  const response = await fetch(
    `/api/posts/${newCommentData.post_id}/new_comment`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCommentData),
    }
  );
  if (response.ok) {
    const newComment = await response.json();
    await dispatch(actionCreateComment(newComment));
    await dispatch(getOnePostById(newCommentData.post_id));
    return newComment;
  }
  return response;
};

// Update a comment for post
export const updateAComment =
  (editCommentData, commentId) => async (dispatch) => {
    const response = await fetch(`/api/comment/${commentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editCommentData),
    });
    // console.log("response*****************",response)

    if (response.ok) {
      const edittedComment = await response.json();
      dispatch(actionUpdateComment(edittedComment));
      // console.log("edittedComment***************",edittedComment)
      return edittedComment;
    }
    return response;
  };

// Delete a comment
export const deleteAComment = (id) => async (dispatch) => {
  const response = await fetch(`/api/comment/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  console.log("response*****************", response);

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
  let newState = {};

  switch (action.type) {
    case CREATE_COMMENT: {
      newState = { ...state };
      newState[action.comment.id] = action.comment;
      return newState;
    }

    case READ_COMMENT: {
      action.comment.forEach((comment) => {
        newState[comment.id] = comment;
      });
      return newState;
    }

    case UPDATE_COMMENT: {
      newState = { ...state };
      console.log("newState before", newState);
      newState[action.comment.id] = action.comment;
      console.log("newState after", newState);
      return newState;
    }

    case DELETE_COMMENT: {
      newState = { ...state };
      delete newState[action.id];
      return newState;
    }

    default:
      return state;
  }
};

export default commentsReducer;

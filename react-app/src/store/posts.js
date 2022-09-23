//Types:
const CREATE_POST = "posts/createPost";
const READ_ONE_POST = "posts/readPost"; // get single post action type
const UPDATE_POST = "posts/updatePost";
const DELETE_POST = "posts/deletePost";
const LOAD_ALL_POSTS = "posts/loadPosts"; // get all posts action type maybe can be used for load posts and load all post curr user

const LIKE_POST = "posts/likePost";
const UNLIKE_POST = "posts/unlikePost";

//Action Creators:
const actionCreatePost = (post) => {
  return {
    type: CREATE_POST,
    post,
  };
};
const actionReadPost = (post) => {
  return {
    type: READ_ONE_POST,
    post,
  };
};
const actionUpdatePost = (post) => {
  return {
    type: UPDATE_POST,
    post,
  };
};
const actionDeletePost = (postId) => {
  return {
    type: DELETE_POST,
    postId,
  };
};
const actionLoadPosts = (posts) => {
  return {
    type: LOAD_ALL_POSTS,
    posts,
  };
};
const actionLikePost = (post) => {
  return {
    type: LIKE_POST,
    post,
  };
};

//Thunks:

//TO-DO: example thunk      V -> new post form data goes here from component
export const createAPost = (newPostInfo) => async (dispatch) => {
  const response = await fetch("/api/posts/new_post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPostInfo),
  });
  if (response.ok) {
    const post = await response.json();
    dispatch(actionCreatePost(post));
    return post;
  }
  return response;
};

//TO-DO: Fetch One Post by Id
export const getOnePostById = (postId) => async (dispatch) => {
  console.log("postId *******************", postId, Number(postId));

  const response = await fetch(`/api/posts/${postId}`);
  if (response.ok) {
    const postById = await response.json();
    dispatch(actionReadPost(postById));
    return postById;
  }
  return response;
};

//TO-DO:                      V -> id, content
export const updateAPost = (data) => async (dispatch) => {
  const response = await fetch(`/api/posts/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const edittedPost = await response.json();
    dispatch(actionUpdatePost(edittedPost));
    return edittedPost;
  }
  return response;
};

//TO-DO:

//TO-DO: Fetch all Posts in general
export const getAllPosts = () => async (dispatch) => {
  const response = await fetch(`/api/posts/all`);
  if (response.ok) {
    const data = await response.json();
    // console.log("***********THIS IS THE DATA.POSTS *************", data.posts);
    dispatch(actionLoadPosts(data.posts)); //revist
    return data;
  }
  return response;
};

//TO-DO: Fetch All posts of Current User
export const loadCurrUserPosts = () => async (dispatch) => {
  const response = await fetch(`/api/posts/current`, {});
  if (response.ok) {
    const data = await response.json();
    dispatch(actionLoadPosts(data.current_posts)); //revist
    return data;
  }
  return response;
};

//TO-DO: Fetch all Posts of another User
export const getPostsOtherUserId = (id) => async (dispatch) => {
  const response = await fetch(`/api/posts/user/${id}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(actionLoadPosts(data.posts)); //revist
    return data;
  }
};

export const deleteAPost = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    // const deleteMe = await response.json() //revist later
    dispatch(actionDeletePost(postId));
    dispatch(loadCurrUserPosts());
    // return deleteMe;
  }
  return response;
};

//TO-DO:
export const likeAPost = (post) => async (dispatch) => {
  const response = await fetch(`/api/posts/${post.id}/post_likes`, {
    method: "POST",
  });
  if (response.ok) {
    dispatch(actionLikePost(post));
  }
};

//TO-DO:
export const unlikeAPost = (postId) => async (dispatch) => {
  const response = await fetch(``);
};

//Initial State:
const initialState = {};

//Reducer:
const postsReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case CREATE_POST: {
      newState = { ...state };
      newState[action.post.id] = action.post;
      return newState;
    }
    case READ_ONE_POST: {
      newState = { ...state };
      newState[action.post.id] = action.post;
      return newState;
    }
    case UPDATE_POST: {
      newState = { ...state };
      newState[action.post.id] = action.post;
      return newState;
    }
    case DELETE_POST: {
      newState = { ...state };
      delete newState[action.postId];
      return newState;
    }
    case LOAD_ALL_POSTS: {
      action.posts.forEach((post) => {
        newState[post.id] = post;
      });
      return newState;
    }
    case LIKE_POST: {
      newState = { ...state };
      console.log(action.post.likes);
      newState[action.post.id] = action.post;
      //   console.log(newState[action.post.id]);
      return newState;
    }
    default:
      return state;
  }
};

export default postsReducer;

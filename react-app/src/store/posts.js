//Types:
const CREATE_POST = 'posts/createPost';
const READ_POST = 'posts/readPost'; // get single post action type
const UPDATE_POST = 'posts/updatePost';
const DELETE_POST = 'posts/deletePost';
const LOAD_ALL_POSTS = 'posts/loadPosts'; // get all posts action type maybe can be used for load posts and load all post curr user

const LIKE_POST = 'posts/likePost';
const UNLIKE_POST = 'posts/unlikePost';

//Action Creators:
const actionCreatePost = (post) => {
    return {
        type: CREATE_POST,
        post
    }
}
const actionReadPost = () => {
    return {
        type: READ_POST,
        //payload here
    }
}
const actionUpdatePost = () => {
    return {
        type: UPDATE_POST,
        //payload here
    }
}
const actionDeletePost = () => {
    return {
        type: DELETE_POST,
        //payload here
    }
}
const actionLoadPosts = () => {
    return {
        type: LOAD_ALL_POSTS,
        //payload here
    }
}


//Thunks:
//TO-DO: example thunk      V -> new post form data goes here from component
export const createAPost = ( ) => async (dispatch) => {
    const response = await fetch('/api/posts/new_post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(/* form data */)
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
    const response = await fetch(`/api/posts/${postId}`, {
    })
    if (response.ok) {
        const postById = await response.json();
        dispatch(actionReadPost(postById));
        return postById;
    };
    return response;
};


//TO-DO:                      V -> id, content
export const updateAPost = (data) => async (dispatch) => {
    const response = await fetch(`/api/posts/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (response.ok) {
        const edittedPost = await response.json()
        dispatch(actionUpdatePost(edittedPost))
        return edittedPost
    }
    return response;
}


//TO-DO:
export const deleteAPost = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        // const deleteMe = await response.json() //revist later
        dispatch(actionDeletePost(postId));
        // return deleteMe;
    }
    return response;
}


//TO-DO: Fetch all Posts in general
export const getAllPosts = () => async (dispatch) => {
    const response = await fetch(`/api/posts/all`)
    if (response.ok) {
        const data = await response.json()
        dispatch(actionLoadPosts(data.posts)) //revist
        return data;
    }
}


//TO-DO: Fetch All posts of Current User
export const loadCurrUserPosts = () => async (dispatch) => {
    const response = await fetch(`/api/posts/current`, {
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(actionLoadPosts(data.current_posts)) //revist
        return data;
    }
    return response;
}


//TO-DO: Fetch all Posts of another User
export const getPostsOtherUserId = (id) => async (dispatch) => {
    const response = await fetch(`/api/posts/user/${id}`)
    if (response.ok) {
        const data = await response.json()
        dispatch(actionLoadPosts(data.posts)) //revist
        return data;
    }
}


//TO-DO:
export const likeAPost = (postId) => async (dispatch) => {
    const response = await fetch(``)
}


//TO-DO:
export const unlikeAPost = (postId) => async (dispatch) => {
    const response = await fetch(``)
}


//Initial State:
const initialState = {};

//Reducer:
const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_POST: {
            return
        }
        case READ_POST: {
            return
        }
        case UPDATE_POST: {
            return
        }
        case DELETE_POST: {
            return
        }
        case LOAD_ALL_POSTS: {
            return
        }
        default:
            return state;
    };
};

export default postsReducer;

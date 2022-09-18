//Types:
const CREATE_POST = 'posts/createPost';
const READ_POST = 'posts/readSpot';
const UPDATE_POST = 'posts/updateSpot';
const DELETE_POST = 'posts/deleteSpot';
const LOAD_ALL_SPOTS = 'posts/loadSpots'; //might not need this?


//Action Creators:
const actionCreatePost = () => {
    return {
        type: CREATE_POST,
        //payload here
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
        type: LOAD_ALL_SPOTS,
        //payload here
    }
}


//Thunks:
//TO-DO: example thunk
export const createAPost = () => async (dispatch) => {
    const response = await fetch('/api/posts/new-post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            image_url,
            caption,
            location,
            owner_id
        })
    });
    if (response.ok) {
        const post = await response.json();
        dispatch(actionCreatePost(post));
        return post;
    };
    return response;
};


//Initial State:
const initialState = {};

//Reducer:
const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default postsReducer;

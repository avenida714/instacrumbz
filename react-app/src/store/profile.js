//Types:
const LOAD_USERPROFILE = "userprofile/LOAD_USERPROFILE";
const EDIT_USERPROFILE = "userprofile/EDIT_USERPROFILE";

//Action Creators:
const loadProfile = (post, profile) => {
  return {
    type: LOAD_USERPROFILE,
    post,
    profile
  };
};

const editProfile = (userId) => {
  return {
    type: EDIT_USERPROFILE,
    userId,
  };
};

//Thunks:
export const loadUserProfile = (userId) => async (dispatch) => {

  const res = await fetch(`/api/profile/${userId}`);
  if (res.ok) {
    const profile = await res.json();

    dispatch(loadProfile(profile.post, profile.profile));
  }
};

export const editUserProfile = (userId, profile) => async (dispatch) => {
  const res = await fetch(`/api/profile/edit/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });
  if (res.ok) {
    const editedUserProfile = await res.json();
    dispatch(editProfile(editedUserProfile));
    return editedUserProfile;
  }
};

//Initial State:
const initialState = {};

//Reducer:
const userProfileReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case LOAD_USERPROFILE:
   
      newState = { ...state}
      newState.post = action.post;
      newState.profile = action.profile;
   
      return { ...newState };
    case EDIT_USERPROFILE:
      console.log(action);
      newState = action.userId;
      return { ...newState };
    default:
      return state;
  }
};

export default userProfileReducer;

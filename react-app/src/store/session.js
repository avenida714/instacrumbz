// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const FOLLOW_USER = "session/FOLLOW_USER";
const UNFOLLOW_USER = "session/UNFOLLOW_USER";
const LOAD_USER = "session/LOAD_USER";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const followUser = (user) => ({
  type: FOLLOW_USER,
  user,
});

const unfollowUser = (user) => ({
  type: UNFOLLOW_USER,
  user,
});

const loadUser = (user) => ({
  type: LOAD_USER,
  user,
});

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const signUp = (username, name, email, password) => async (dispatch) => {
  console.log("store/session");
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      name,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      console.log("data.errors", data.errors);
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const userFollow = (userId) => async (dispatch) => {
  const res = await fetch(`/api/followers/profile_follows/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(followUser(data));
    console.log("USERFOLLOW");
    console.log(data);
    return data;
  }
};

export const userUnfollow = (userId) => async (dispatch) => {
  const res = await fetch(`/api/followers/profile_follows/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(unfollowUser(data));
    console.log("USERUNFOLLOW");
    console.log(data);
    return data;
  }
};

export const loadUserRequest = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (res.ok) {
    const user = await res.json();
    console.log("LOADUSER");
    console.log(user);
    dispatch(loadUser(user));
  }
};

export default function reducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    case FOLLOW_USER:
      newState.user.followers.push(action.user);
      return { ...newState };
    case UNFOLLOW_USER:
      const index = newState.user.followers.findIndex(
        (user) => user.id === action.user.id
      );
      newState.user.followers.splice(index, 1);
      return { ...newState };
    case LOAD_USER:
      return { user: action.user };
    default:
      return state;
  }
}

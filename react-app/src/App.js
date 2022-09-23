import React, { useState, useEffect } from "react";
import { BrowserRouter, Route,  Switch, useHistory,  Redirect,} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
// import NavBar from './components/NavBar';
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import UserProfilePage from "./components/ProfilePage";

import LiveFeedPage from "./components/LiveFeedPage";
import { CurrentUserPage } from "./components/UsersPostCard";
import SinglePost from "./components/SinglePostModal/SinglePost";
import LoginFormModal from "./components/LoginFormModal";
import EditProfile from "./components/EditProfile";
// import CreatePostForm from './components/PostForm/CreatePostForm';
// import EditPostForm from './components/PostForm/EditPostForm';
import CreatePostForm from "./components/CreatePostModal/CreatePostForm";
import EditPostForm from "./components/CreatePostModal/EditPostForm";




function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return user ? (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>

        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>

        <ProtectedRoute path="/profile/:userId" exact={true}>
          <UserProfilePage />
        </ProtectedRoute>

        <ProtectedRoute path="/profile/edit/:userId" exact={true}>
          <EditProfile />
        </ProtectedRoute>

        <ProtectedRoute path="/" exact={true}>
          <LiveFeedPage />
        </ProtectedRoute>

        {/* <ProtectedRoute path='/post/current' exact={true} >
          <CurrentUserPage />
        </ProtectedRoute> */}

        <ProtectedRoute exact path="/post/:postId" >
          <SinglePost />
        </ProtectedRoute>

        <Route exact path="/posts" component={CreatePostForm} />

        <Route exact path="/posts/:postId/edit" component={EditPostForm} />

        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
      </Switch>
    </BrowserRouter>
  ) : (
    <BrowserRouter>
      <Redirect to="/login" />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>

        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

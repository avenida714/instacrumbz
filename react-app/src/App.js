import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import UserProfilePage from './components/ProfilePage';

import LiveFeedPage from './components/LiveFeedPage';
import { CurrentUserPage } from './components/UsersPostCard';
import SinglePost from './components/SinglePost';
import LoginFormModal from './components/LoginFormModal';




function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>

        <Route path='/login' exact={true}>
          {/* <LoginForm /> */}
          <LoginFormModal />
        </Route>

        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>

        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>

        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>

        <ProtectedRoute path='/profile/:userId' exact={true} >
          <UserProfilePage />
        </ProtectedRoute>

        <ProtectedRoute path='/' exact={true} >
          <LiveFeedPage />
        </ProtectedRoute>

        <ProtectedRoute path='/current' exact={true} >
          <CurrentUserPage />
        </ProtectedRoute>

        <ProtectedRoute path='/post/:postId' exact={true} >
          <SinglePost />
        </ProtectedRoute>

      </Switch>
    </BrowserRouter>
  );
}

export default App;

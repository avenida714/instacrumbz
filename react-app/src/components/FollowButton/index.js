import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useParams, useHistory } from "react-router-dom";
import { userFollow, userUnfollow } from "../../store/session";
import { loadUserProfile } from "../../store/profile";

const ToggleFollow = (profile) => {
  profile = profile.profile;
  const dispatch = useDispatch();
  let { userId } = useParams();
  userId = Number(userId);
  const sessionUser = useSelector((state) => state.session.user);

  const [userIsFollowing, setUserIsFollowing] = useState(false);

  // is the logged in user following the profile being viewed
  // sessionUser.id is in the profile's following list
  // forEach follower of the profile
  // check if the followerId === sessionUser.id (logged in user)
  useEffect(() => {
    profile.followers.forEach((follower) => {
      // followers of the profile being viewed
      console.log("FOLLOWER");
      console.log(follower);
      let followerId = follower[0];
      test = followerId
      console.log(followerId);
      if (sessionUser.id === followerId) {
        setUserIsFollowing(true);
        // if logged in user is following the profile being viewed
      }
    });
  }, [profile.followers]);

  const followProfile = async (e) => {
    e.preventDefault();
    dispatch(userFollow(profile.id))
    setUserIsFollowing(true);
  };

  const unfollowProfile = async (e) => {
    e.preventDefault();
    dispatch(userUnfollow(profile.id))
    setUserIsFollowing(true);
  };


  return (
    <div>
      <button onClick={followProfile}></button>
      <button onClick={unfollowProfile}></button>
    </div>
  );
};

export default ToggleFollow;

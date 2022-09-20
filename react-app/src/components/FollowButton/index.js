import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { loadUserProfile } from "../../store/profile";
import { userFollow, userUnfollow } from "../../store/session";
import './FollowButton.css'

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
      console.log(followerId);
      if (sessionUser.id === followerId) {
        setUserIsFollowing(true);
        // if logged in user is following the profile being viewed
      }
    });
  }, [profile.followers]);

  const followProfile = async (e) => {
    e.preventDefault();
    let followUser = await dispatch(userFollow(profile.id))
    if (followUser){
      if (followUser.user.username === profile.username || sessionUser.username === profile.username) {
        dispatch(loadUserProfile(profile.id))
      }
    }
      setUserIsFollowing(true)
  };

  const unfollowProfile = async (e) => {
    e.preventDefault();
    let unfollowUser = await dispatch(userUnfollow(profile.id))
    if (unfollowUser){
      if (unfollowUser.user.username === profile.username || sessionUser.username === profile.username) {
        dispatch(loadUserProfile(profile.id))
      }
    }
      setUserIsFollowing(false);
  };
  console.log("here------", profile.followers)
  if (sessionUser.username === profile.username) {
    return (
      <div>
        <button className='followButton' onClick={followProfile}></button>
      </div>
    );
  } else {
    return (
      <button className="unfollowButton" onClick={unfollowProfile}></button>

    )
  }
};

export default ToggleFollow;

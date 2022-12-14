import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { loadUserProfile } from "../../store/profile";
import { userFollow, userUnfollow } from "../../store/session";
import { RiUserUnfollowFill } from "react-icons/ri";
import "./FollowButton.css";

const ToggleFollow = (profile) => {
  profile = profile.profile;
  const dispatch = useDispatch();
  let { userId } = useParams();
  userId = Number(userId);
  const sessionUser = useSelector((state) => state.session.user);
  const [userIsFollowing, setUserIsFollowing] = useState(false);

  useEffect(() => {
    profile.followers.forEach((follower) => {
      console.log(follower);
      let followerId = follower.id;
      if (sessionUser.id === followerId) {
        setUserIsFollowing(true);
      }
    });
  }, [profile.followers]);

  const followProfile = async (e) => {
    e.preventDefault();
    let followUser = await dispatch(userFollow(profile.id));
    if (followUser) {
      if (
        followUser.user.username === profile.username ||
        sessionUser.username === profile.username
      ) {
        dispatch(loadUserProfile(profile.id));
      }
    }
    setUserIsFollowing(true);
  };

  const unfollowProfile = async (e) => {
    e.preventDefault();
    let unfollowUser = await dispatch(userUnfollow(profile.id));
    if (unfollowUser) {
      if (
        unfollowUser.user.username === profile.username ||
        sessionUser.username === profile.username
      ) {
        dispatch(loadUserProfile(profile.id));
      }
    }
    setUserIsFollowing(false);
  };

  return (
    <div className="buttonContainer">
      {userIsFollowing ? (
        <button className="unfollowButton" onClick={unfollowProfile}>
          Unfollow <RiUserUnfollowFill />
        </button>
      ) : (
        <button className="followButton" onClick={followProfile}>
          Follow
        </button>
      )}
    </div>
  );
};

export default ToggleFollow;

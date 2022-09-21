import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUserProfile } from "../../store/profile";

import ToggleFollow from "../FollowButton";

//modal
// import ViewPostModal from "../ViewPostModal";
import SinglePostModal from "../SinglePostModal";

import "./ProfilePage.css";
import { getPostsOtherUserId, loadCurrUserPosts } from "../../store/posts";

const UserProfilePage = () => {
  const history = useHistory();
  let { userId } = useParams();
  userId = Number(userId);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const userPosts = useSelector((state) => state.profile.posts);
  const profile = useSelector((state) => state.profile.profile);
  const [findAProfileStatus, setFindAProfileStatus] = useState(200);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    dispatch(loadUserProfile(userId))
    dispatch(getPostsOtherUserId(userId))
      .then(() => {
        setIsLoaded(true);
      })
      .catch(async (res) => {
        setFindAProfileStatus(res.status);
      });


  }, [dispatch, userId, userPosts]);

  const handleEditProfile = (e, userId) => {
    e.preventDefault();
    let path = `/profile/edit/${userId}`;
    history.push(path);
  };

  const hideButton = {
    display: "none",
  };

  if (isLoaded) {
    if (findAProfileStatus === 200) {
      return (
        <div className="profile-page-outer-most-wrapper">
          <div className="mainProfileContainer">
            <div className="innerProfileContainer">
              {profile ? (
                profile.map((profile) => {
                  return (
                    <div className="profileInfoContainer" key={profile.id}>
                      <div className="profilePic">
                        <img src={profile.profile_img}></img>
                      </div>
                      <div className="profileDetails">
                        <div className="profileDetailHeader">
                          <h2 className="profileUserName">{profile.name}</h2>
                          {sessionUser && profile.id === sessionUser.id ? (
                            <button
                              className="editProfile"
                              onClick={(e) => handleEditProfile(e, profile.id)}
                            >
                              Edit profile
                            </button>
                          ) : (
                            (
                              <button
                                style={hideButton}
                                className="editProfileButton"
                                onClick={(e) =>
                                  handleEditProfile(e, profile.id)
                                }
                              >
                                edit profile
                              </button>
                            ) && <ToggleFollow profile={profile} />
                          )}
                        </div>
                        <div className="profileDetailSpan">
                          <span className="postSpan"><b>{userPosts.length}</b> posts</span>
                          <span className="followerSpan"> <b>{profile.followers.length}</b> followers</span>
                          <span className="followingSpan"> <b>{profile.following.length}</b> following </span>
                        </div>
                        <div className="profileBio">{profile.bio}</div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>Profile not found</div>
              )}
            </div>

            <div className="userPostContainer">
            {userPosts && userPosts.length ? (
                userPosts.map((post) => {
                  return (
                    <div className="profile-post">
                      <SinglePostModal post={ post }/>
                    </div>
                  )
                })
              ) : (
                <div>no posts</div>
              )}
            </div>
          </div>
        </div>
      );
    } else if (findAProfileStatus === 404) {
      return (
        <div className="notFound">
          <span className="notFoundError">404: not found</span>
        </div>
      );
    }
  } else {
    return <div>Loading... </div>;
  }
};

export default UserProfilePage;

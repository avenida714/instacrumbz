import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUserProfile } from "../../store/profile";
import { getPostsOtherUserId, loadCurrUserPosts } from "../../store/posts";
import ToggleFollow from "../FollowButton";
import Followers from "./FollowersModal/index";
import Following from "./FollowingModal";
import SinglePostModal from "../SinglePostModal";
import "./ProfilePage.css";
import { BsGrid3X3 } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";

const UserProfilePage = () => {
  const history = useHistory();
  let { userId } = useParams();
  userId = Number(userId);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const userPostsObj = useSelector((state) => state.posts);

  const profile = useSelector((state) => state.profile.profile);
  const [findAProfileStatus, setFindAProfileStatus] = useState(200);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);

  const helper = async () => {
    const userProfile = await dispatch(loadUserProfile(userId));
    const res = await dispatch(getPostsOtherUserId(userId))
      .then(() => {
        setIsLoaded(true);
      })
      .catch(async (res) => {
        setFindAProfileStatus(res.status);
      });
  };

  useEffect(() => {
    helper();
  }, [dispatch, userId]); //userPosts causes infinity loop

  let userPosts = [];
  if (userPostsObj) userPosts = Object.values(userPostsObj);

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
                              Edit profile <BiEditAlt />
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
                          <span className="postSpan">
                            <b>{userPosts.length}</b> posts
                          </span>
                          <span
                            className="followerSpan"
                            onClick={() => setShowFollowersModal(true)}
                          >
                            {" "}
                            <b>{profile.followers.length}</b> followers
                          </span>
                          <span
                            className="followingSpan"
                            onClick={() => setShowFollowingModal(true)}
                          >
                            {" "}
                            <b>{profile.following.length}</b> following{" "}
                          </span>
                        </div>
                        <div className="profileBio">{profile.bio}</div>
                        <Followers
                          profile={profile} //test
                          isOpen={showFollowersModal}
                          onClose={() => setShowFollowersModal(false)}
                        />
                        <Following
                          profile={profile}
                          isOpen={showFollowingModal}
                          onClose={() => setShowFollowingModal(false)}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="profileNotFound">Profile not found!</div>
              )}
            </div>

            <div className="userPostContainer">
              <span className="postsLabel">
                {" "}
                <BsGrid3X3 /> POSTS
              </span>
              <div className="innerPostContainer">
                {userPosts && userPosts.length ? (
                  userPosts.map((post) => {
                    return (
                      <div className="profile-post">
                        <SinglePostModal
                          className="profile-postImage"
                          post={post}
                        />
                      </div>
                    );
                  })
                ) : (
                  <div>no posts</div>
                )}
              </div>
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

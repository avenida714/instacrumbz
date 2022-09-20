import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUserProfile } from "../../store/profile";
import "./ProfilePage.css";

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
  console.log("here=====", profile);

  useEffect(() => {
    dispatch(loadUserProfile(userId))
      .then(() => {
        setIsLoaded(true);
      })
      .catch(async (res) => {
        setFindAProfileStatus(res.status);
      });
  }, [dispatch]);

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
        <div className="workingonthis">
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
                            <button className='editProfile' onClick={(e) => handleEditProfile(e, profile.id)}>Edit profile</button>
                          ) : (
                            <button style={hideButton} className='editProfileButton' onClick={(e) => handleEditProfile(e, profile.id)}>edit profile</button>
                          )}
                        </div>
                        <span>{userPosts.length}</span> posts
                        <span> {profile.followers.length}</span> followers
                        <span> {profile.following.length} </span> following
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
                userPosts.map((posts) => {
                  return (
                    <div className="eachUserPost" key={posts.id}>
                      <img className='profileimg' src={posts.image_url}></img>
                    </div>
                  );
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

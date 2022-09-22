import React from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "../../../context/Modal";
import './FollowersModal.css'

const Followers = ({ profile, isOpen, onClose }) => {
  const history = useHistory();
  const userFollowers = profile.followers;
  console.log("here------", userFollowers)

  const clickFollowingProfile = (followingId) => {
    let path = `/profile/${followingId}`;
    history.push(path);
  };

  return (
    <>
      {isOpen && (
        <Modal onClose={onClose}>
          <div className='followerModalContainer'>
            <div>
              <h1>Followers</h1>
            </div>
            {userFollowers && userFollowers.length ? (
              userFollowers.map((follower) => {
                let followerName = follower.name;
                let followerPic= follower.profile_img
                return (
                <div className='followerModalInnerContainer' key={follower.id}>
                  <div
                    className="eachUserProfile"
                    onClick={() => {
                      clickFollowingProfile(follower.id);
                      onClose();
                    }}
                  >
                    <img className='followerPic' src={followerPic}></img>
                    <span className="followerName">{followerName}</span>
                  </div>
                </div>
                )
              })
            ) : (
              <div>No followers yet</div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default Followers;

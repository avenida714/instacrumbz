import React from "react";
import { Modal } from "../../../context/Modal";
import './FollowersModal.css'

const Followers = ({ profile, isOpen, onClose }) => {
  const userFollowers = profile.followers;
  console.log("here------", userFollowers)


  return (
    <>
      {isOpen && (
        <Modal onClose={onClose}>
          <div className='followerModalContainer'>
            <div>
              <h1>Following</h1>
            </div>
            {userFollowers ? (
              userFollowers.map((follower, index) => {
                let followerName = follower.name;
                let followerPic= follower.profile_img
                return (
                <div className='followerModalInnerContainer' key={index}>
                  <div className="eachUserProfile">
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

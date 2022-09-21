import React from "react";
import { Modal } from "../../../context/Modal";
import './FollowersModal.css'

const Followers = ({ profile, isOpen, onClose }) => {
  const userFollowers = profile.followers;


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
                let followerName = follower[1];
                return (
                <div className='followerModalInnerContainer' key={index}>
                  <div>
                    {followerName}
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

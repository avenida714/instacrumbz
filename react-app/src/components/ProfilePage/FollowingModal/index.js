import React  from "react";
import { Modal } from "../../../context/Modal";
import './FollowingModal.css'


const Following = ({ profile, isOpen, onClose }) => {
  const userFollowing = profile.following;
  console.log("here-------", userFollowing);
  return (
    <>
      {isOpen && (
        <Modal onClose={onClose}>
          <div className='followingModalContainer'>
            <div>
              <h1>Following</h1>
            </div>
            {userFollowing ? (
              userFollowing.map((following, index) => {
                let followingName = following[1];
                return (
                <div className='followingModalInnerContainer' key={index}>
                   <div>
                    <span>{followingName}</span>
                   </div>
                </div>
                )
              })
            ) : (
              <div>Not following anyone</div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default Following;

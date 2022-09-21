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
                let followingName = following.name;
                let followingPic = following.profile_img;
                return (
                <div className='followingModalInnerContainer' key={index}>
                   <div className="eachUserProfile">
                     <img className='followingPic' src={followingPic} ></img>
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

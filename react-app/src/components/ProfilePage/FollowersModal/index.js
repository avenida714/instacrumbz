import React, { useEffect, useState } from "react";
import { Modal } from "../../../context/Modal";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
// import { loadUserProfile } from "../../store/profile";
// import { userFollow, userUnfollow } from "../../store/session";
import { RiUserUnfollowFill } from "react-icons/ri";

const Followers = ({ profile, isOpen, onClose }) => {
  const userFollowers = profile.followers;
  console.log("here-------", userFollowers);
  return (
    <>
      {isOpen && (
        <Modal onClose={onClose}>
          <div>
            {userFollowers ? (
              userFollowers.map((follower) => {
                let followerName = follower[1];
                return <div>{followerName}</div>;
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

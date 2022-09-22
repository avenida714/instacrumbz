import React from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "../../../context/Modal";
import "./FollowingModal.css";

const Following = ({ profile, isOpen, onClose }) => {
  const history = useHistory();
  const userFollowing = profile.following;
  console.log("here-------", userFollowing);

  const clickFollowingProfile = (followingId) => {
    let path = `/profile/${followingId}`;
    history.push(path);
  };

  return (
    <>
      {isOpen && (
        <Modal onClose={onClose}>
          <div className="followingModalContainer">
            <div>
              <h1>Following</h1>
            </div>
            {userFollowing && userFollowing.length ? (
              userFollowing.map((following) => {
                let followingName = following.name;
                let followingPic = following.profile_img;
                return (
                  <div className="followingModalInnerContainer" key={following.id}>
                    <div
                      className="eachUserProfile"
                      onClick={() => {
                        clickFollowingProfile(following.id);
                        onClose();
                      }}
                    >
                      <img className="followingPic" src={followingPic}></img>
                      <span className="followingName">{followingName}</span>
                    </div>
                  </div>
                );
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

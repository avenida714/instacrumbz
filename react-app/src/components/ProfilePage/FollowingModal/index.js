import React  from "react";
import { Modal } from "../../../context/Modal";


const Following = ({ profile, isOpen, onClose }) => {
  const userFollowing = profile.following;
  console.log("here-------", userFollowing);
  return (
    <>
      {isOpen && (
        <Modal onClose={onClose}>
          <div>
            {userFollowing ? (
              userFollowing.map((following) => {
                let followingName = following[1];
                return <div>{followingName}</div>;
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

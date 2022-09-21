import React from "react";
import { Modal } from "../../../context/Modal";

const Followers = ({ profile, isOpen, onClose }) => {
  const userFollowers = profile.followers;
 

  return (
    <>
      {isOpen && (
        <Modal onClose={onClose}>
          <div>
            {userFollowers ? (
              userFollowers.map((follower) => {
                let followerName = follower[1];
                return (
                <div>
                  {followerName}
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

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { loadUserRequest } from "../../store/session";
import "../ProfilePage/FollowingModal/FollowingModal.css";

const FollowingPCModal = ({ following, isOpen, onClose }) => {
  const dispatch = useDispatch()
  const history = useHistory();
  //   const userFollowing = profile.following;
  console.log("here-------", following);
  const userLoggedIn = useSelector(state => state.session.user);

  const clickFollowingProfile = (followingId) => {
    let path = `/profile/${followingId}`;
    history.push(path);
  };

  useEffect(() => {
    dispatch(loadUserRequest(userLoggedIn.id));
  }, [dispatch]);

  return (
    <>
      {isOpen && (
        <Modal onClose={onClose}>
          <div className="followingModalContainer">
            <div>
              <h1>Following</h1>
            </div>
            {userLoggedIn.following && userLoggedIn.following.length ? (
              following.map((each) => {
                let followingName = each.name;
                let followingPic = each.profile_img;
                return (
                  <div className="followingModalInnerContainer" key={each.id}>
                    <div
                      className="eachUserProfile"
                      onClick={() => {
                        clickFollowingProfile(each.id);
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

export default FollowingPCModal;

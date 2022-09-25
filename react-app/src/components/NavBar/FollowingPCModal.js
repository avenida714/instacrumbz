import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { loadUserProfile } from "../../store/profile";
import { loadUserRequest } from "../../store/session";
import "../ProfilePage/FollowingModal/FollowingModal.css";


const FollowingPCModal = ({ following, isOpen, onClose }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  //   const userFollowing = profile.following;
  // console.log("following from pros-------", following);
  const sessionUser = useSelector((state) => state.session.user);
  console.log("sessionUser.following", sessionUser.following)

  const clickFollowingProfile = (followingId) => {
    let path = `/profile/${followingId}`;
    history.push(path);
  };

  useEffect(() => {
  dispatch(loadUserRequest(sessionUser.id))
  }, [dispatch]);


  return (
    <>
      {isOpen && (
        <Modal onClose={onClose}>
          <div className="followingModalContainer">
            <div>
              <h1>Following</h1>
            </div>
            {sessionUser.following && sessionUser.following.length ? (
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

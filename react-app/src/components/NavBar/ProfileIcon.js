import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import "./ProfileIcon.css";
import "../../index.css";
import Following from "../ProfilePage/FollowingModal";
import FollowingPCModal from "./FollowingPCModal";
import { AiOutlineCloseCircle } from "react-icons/ai";

function ProfileIcon({ userLoggedIn }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  console.log("-------", userLoggedIn)

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  // useEffect(() => {
  //   if (!showMenu) return;

  //   const closeMenu = () => {
  //     setShowMenu(false);
  //   };
  //   document.addEventListener('click', closeMenu);

  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showMenu]);

  const onLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    history.push("/login");
  };

  return (
    <div className="profile-icon" onClick={openMenu}>
      <img className="img circle" src={userLoggedIn?.profile_img} />
      {showMenu && (
        <div className="profile-dropdown">
          <div className="dropdown-content">
            <AiOutlineCloseCircle onClick={() => setShowMenu(false)} />
            <div className="welcome-dropdown">
              {" "}
              Welcome, {userLoggedIn.name}
            </div>
            <div className="linkhighlight-dropdown">
              <NavLink
                className="your-text-dropdown"
                to={`/profile/${sessionUser.id}`}
                onClick={() => setShowMenu(false)}
              >
                Profile
              </NavLink>
            </div>
            <div className="linkhighlight-dropdown">
              <span
                className="your-text-dropdown"
                onClick={() => setShowFollowingModal(true)}
              >
                Following
              </span>
              <FollowingPCModal
                following={userLoggedIn.following}
                isOpen={showFollowingModal}
                onClose={() => {
                  setShowFollowingModal(false);
                  setShowMenu(false);
                }}
              />
            </div>
            <div className="logout-dropdown" onClick={onLogout}>
              Log Out
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileIcon;

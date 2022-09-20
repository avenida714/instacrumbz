import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink, useHistory} from "react-router-dom";
import { logout } from "../../store/session";
import "./ProfileIcon.css"
import "../../index.css"

function ProfileIcon ({ userLoggedIn }) {

  const dispatch = useDispatch();
  const history = useHistory();

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const onLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    history.push("/login");
  };

  return (
      <div className="profile-icon" onClick={openMenu}>
            <img className="img circle" src={ userLoggedIn?.profile_img } />


      {showMenu && (
        <div className="profile-dropdown">
          <div className="dropdown-content">
              <div className="welcome-dropdown"> Welcome, { userLoggedIn.name }</div>
            <div className="linkhighlight-dropdown">
              <NavLink className="your-text-dropdown" to="">
                Profile
              </NavLink>
            </div>
            <div className="linkhighlight-dropdown">
              <NavLink className="your-text-dropdown" to="">
                Settings
              </NavLink>
            </div>
          <div className="logout-dropdown" onClick={onLogout}>Log Out</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileIcon;

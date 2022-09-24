import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MdHomeFilled } from "react-icons/md";
import { TbSquarePlus } from "react-icons/tb";
import { FaRegCompass, FaRegPaperPlane } from "react-icons/fa";
import { TiHeartOutline } from "react-icons/ti";
import logo from "./instacrumbz-logo.png";
import compass from "./svgexport-20.jpg";
import { useDispatch, useSelector } from "react-redux";
import ProfileIcon from "./ProfileIcon";
import { loadUserProfile } from "../../store/profile";

import CreatePostModal from "../CreatePostModal";
import "./NavBar.css";
import "../../index.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const userLoggedIn = useSelector((state) => {
    // console.log("STATE USERLOGGEDIN");
    // console.log(state.profile.profile && state.profile.profile[0].id);
    // console.log(state.session.user.id);
    // if (
    //   state.profile.profile &&
    //   state.profile.profile[0].id === state.session.user.id
    // ) {
    //   return state.profile.profile[0];
    // }
    return state.session.user;
  });
  console.log("USERLOGGEDIN");
  console.log(userLoggedIn);

  useEffect(() => {
    dispatch(loadUserProfile(userLoggedIn.id));
  }, [dispatch]);

  return (
    <div className="navbar-wrapper">
      <div className="navbar-inner">
        <div className="logo-container">
          {/* <img src={logo} alt="logo" className="logo"></img> */}
          <Link to="/" exact={true} className="text-logo">
            {" "}
            Instacrumbz{" "}
          </Link>
        </div>

        <div className="icon-div">
          <NavLink
            to="/"
            exact={true}
            activeClassName="active"
            className="icon"
          >
            <MdHomeFilled />
          </NavLink>

          {/* <NavLink to="/" exact={true} activeClassName="active" className="icon">
            <FaRegPaperPlane />
          </NavLink> */}

          {/* <NavLink to="/" exact={true} activeClassName="active" className="icon">
            <TbSquarePlus />
          </NavLink> */}
          <span className="createPostIcon">
            {" "}
            <CreatePostModal />{" "}
          </span>

          <div className="center">
            <ProfileIcon userLoggedIn={userLoggedIn} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

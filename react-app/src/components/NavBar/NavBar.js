import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MdHomeFilled } from "react-icons/md";
import { TbSquarePlus } from "react-icons/tb";
import { FaRegCompass, FaRegPaperPlane } from "react-icons/fa";
import { TiHeartOutline } from "react-icons/ti";
import logo from "./instacrumbz-logo.png";
import compass from "./svgexport-20.jpg";
import { useSelector } from "react-redux";
import ProfileIcon from "./ProfileIcon";

import CreatePostModal from "../CreatePostModal";
import "./NavBar.css";
import "../../index.css";

const NavBar = () => {
  const userLoggedIn = useSelector((state) => state.session.user);

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

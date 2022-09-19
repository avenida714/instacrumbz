import React from "react";
import { NavLink } from "react-router-dom";

import LogoutButton from "../auth/LogoutButton";

import "./NavBar.css";

import { MdHomeFilled } from "react-icons/md";
import { TbSquarePlus } from "react-icons/tb";
import { FaRegCompass, FaRegPaperPlane } from "react-icons/fa";
import { TiHeartOutline } from "react-icons/ti";
import logo from "./instacrumbz-logo.png";
import compass from './svgexport-20.jpg'

const NavBar = () => {
  return (
    <div className="NavBar-Div">
      <nav className="NavBar-Outermost">
        <div></div>

        <NavLink to="/" exact={true} activeClassName="active">
          <img src={logo} alt="logo" className="logo"></img>
        </NavLink>

        <div className="Search-Bar">
          SEARCH BAR
        </div>

        <div className="icon-div">
          <NavLink to="/" exact={true} activeClassName="active" className="icon">
            <MdHomeFilled />
          </NavLink>

          <NavLink to="/" exact={true} activeClassName="active" className="icon">
            <FaRegPaperPlane />
          </NavLink>

          <NavLink to="/" exact={true} activeClassName="active" className="icon">
            <TbSquarePlus />
          </NavLink>

          <NavLink to="/" exact={true} activeClassName="active" className="icon">
            {/* <img src={compass} alt='compass'></img> */}
            <FaRegCompass />
          </NavLink>

          <NavLink to="/" exact={true} activeClassName="active" className="icon">
            <TiHeartOutline />
          </NavLink>
        </div>

        <div className="photo-div-outer">
          <div className="photo-div-inner">
            <img src={compass} alt="profile" className="Profile-Photo"></img>
          </div>
        </div>


        {/* <NavLink to="/login" exact={true} activeClassName="active">
          Login
        </NavLink>

        <NavLink to="/sign-up" exact={true} activeClassName="active">
          Sign Up
        </NavLink>

        <NavLink to="/users" exact={true} activeClassName="active">
          Users
        </NavLink> */}

        <LogoutButton />
      </nav>
    </div>
  );
};

export default NavBar;
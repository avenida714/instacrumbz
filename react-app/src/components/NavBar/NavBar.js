import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import LogoutButton from "../auth/LogoutButton";

import "./NavBar.css";
import "../../index.css"

import { MdHomeFilled } from "react-icons/md";
import { TbSquarePlus } from "react-icons/tb";
import { FaRegCompass, FaRegPaperPlane } from "react-icons/fa";
import { TiHeartOutline } from "react-icons/ti";
import logo from "./instacrumbz-logo.png";
import compass from './svgexport-20.jpg'
import { useSelector } from "react-redux";
import ProfileIcon from "./ProfileIcon";

import CreatePostModal from "../CreatePostModal";

const NavBar = () => {



  const userLoggedIn = useSelector(state => state.session.user);

  const urlLocation = useLocation()
  const pathName = urlLocation.pathname

  // console.log('this is the pathname *************',pathName)

  // const [homeButtonActive, setHomeButtonActive] = useState();
  // const [plusButtonActive, setPlusButtonActive] = useState();
  // const [compassButtonActive, setCompassButtonActive] = useState();
  // const [heartButtonActive, setHeartButtonActive] = useState();




  // useEffect(() => {
  //   if urlLocation

  //   return () => {
  //     second
  //   }
  // }, [homeButtonActive, plusButtonActive, compassButtonActive, heartButtonActive])



  return (
    <div className="navbar-wrapper">

      <div className="navbar-inner">

        <div className="logo-container">
          <NavLink to="/" exact={true} activeClassName="active">
            <img src={logo} alt="logo" className="logo"></img>
          </NavLink>
        </div>

        <div className="icon-div">
          <NavLink to="/" exact={true} activeClassName="active" className="icon">
            <MdHomeFilled />
          </NavLink>

          {/* <NavLink to="/" exact={true} activeClassName="active" className="icon">
            <FaRegPaperPlane />
          </NavLink> */}

          {/* <NavLink to="/" exact={true} activeClassName="active" className="icon">
            <TbSquarePlus />
          </NavLink> */}
          <CreatePostModal />

          <NavLink to="/" exact={true} activeClassName="active" className="icon">
            <TiHeartOutline />
          </NavLink>
          <div className="center">
            <ProfileIcon userLoggedIn={ userLoggedIn }/>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NavBar;

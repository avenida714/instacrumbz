
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

import {MdHomeFilled} from 'react-icons/md'
import {  } from "react-icons/io";

import {TbSquarePlus} from 'react-icons/tb'
import {FaRegCompass,FaRegPaperPlane } from 'react-icons/fa'
import {TiHeartOutline} from 'react-icons/ti'



const NavBar = () => {
  return (
    <nav className="NavBar-Outermost">
      <div className="NavBar-Div">


          <NavLink to='/' exact={true} activeClassName='active'>
            <MdHomeFilled />
          </NavLink>

          <NavLink to='/' exact={true} activeClassName='active'>
            <FaRegPaperPlane />
          </NavLink>

          <NavLink to='/' exact={true} activeClassName='active'>
            <TbSquarePlus/>
          </NavLink>

          <NavLink to='/' exact={true} activeClassName='active'>
            <FaRegCompass/>
          </NavLink>

          <NavLink to='/' exact={true} activeClassName='active'>
            <TiHeartOutline/>
          </NavLink>


          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>


          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>

          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>

          <LogoutButton />


      </div>

    </nav>
  );
}

export default NavBar;

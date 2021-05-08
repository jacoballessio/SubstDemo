// Import React essentials
import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
// Import icon assets
import searchIcon from "./assets/img/search_white_24dp.svg";
import homeIcon from "./assets/img/home_white_24dp.svg";
import settingsIcon from "./assets/img/settings_white_24dp.svg";
import loginIcon from "./assets/img/login.svg";
// Import component dependencies
import AddButton from "./assets/react_components/AddButton.jsx";
import firebase from "firebase";
import styled from "styled-components";

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  background-color: black;
`;

export const NavLink = styled(Link)`
  width: 100%;
  text-decoration: none;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  color: white;
  & :hover {
    color: gray;
  }
`;

export default function Navbar() {
  let [isAuthorized, setAuthorized] = useState(false);
  useEffect(
    function () {
      if (isAuthorized) {
      }
    },
    [isAuthorized]
  );

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  });
  return (
    <Nav onClick={() => window.navigator.vibrate(100)}>
      <NavLink to="/">
        <img src={homeIcon} className="home-icon nav-icon" />
      </NavLink>
      <AddButton></AddButton>
      <NavLink to="/settings">
        <img src={settingsIcon} className="settings-icon nav-icon" />
      </NavLink>
      {/* {isAuthorized ? (
        <NavLink to="/settings">
          <img src={settingsIcon} className="settings-icon nav-icon" />
        </NavLink>
      ) : (
        <>
          <NavLink to="/signup">Signup</NavLink>
          <NavLink to="/login">
            <img src={loginIcon} className="nav-icon"/>
          </NavLink>
        </>
      )} */}
    </Nav>
  );
}

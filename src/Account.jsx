import React, { useState, useRef, useEffect } from "react"
import { Link, useHistory } from 'react-router-dom'
import firebase from 'firebase';

export default function Account() {
    let userName = useRef();
    let history = useHistory();
    firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
        console.error("not signed in anymore!");
        history.push('/login');
      } else {
          userName.current.innerHTML = firebase.auth().currentUser.email
      }
    });
  
  return (
    <>
    <h2>My Account</h2>
    <span ref={userName}></span>
    </>
  );
}

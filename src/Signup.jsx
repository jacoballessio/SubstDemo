import React, { useState, useRef, useEffect } from "react"
import { Link, useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import emailIcon from "./assets/email.svg"
import lockIcon from "./assets/lock.svg"
import firebase from "firebase";

export default function Signup() {
    const emailEntry = useRef();
    const passwordEntry = useRef();
    let history = useHistory();
    function trySignup(e) {
        let email = emailEntry.current.value;
        let password = passwordEntry.current.value;

        firebase.auth().createUserWithEmailAndPassword(email,password).then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            console.log(`${user.email} has successfully signed up.`);
            initializeUser();
            history.push('/');
            // ...
          })
          .catch((error) => {
              console.error("User is already signed up!");
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
          });
        console.log(email, password); 
        

    }
    function initializeUser() {
        const db = firebase.firestore();
        db.collection("users").add({
            email: firebase.auth().currentUser.email,
            userID: uuidv4()
          })
    }
    return (
<main>
        <header>
            <h1>Create your</h1>
            <h1>account</h1>
        </header>

        <section id="authSection">
            <div id="authForm">
                <div class="authItem">
                    <label for="email" class="inputLabel">Email</label>
                    <div class="inputGrid">
                        <img src={emailIcon} alt="email_icon" />
                        <input type="email" id="emailInput" ref={emailEntry} placeholder="name@email.com" />
                    </div>
                </div>
                <div class="authItem">
                    <label for="password" class="inputLabel">Password</label>
                    <div class="inputGrid">
                        <img src={lockIcon} alt="lock_icon" />
                        <input type="password" id="passInput" ref={passwordEntry} placeholder="●●●●●●●●" />
                    </div>
                </div>

            </div>
            <div id="actionContainer">
                <button id="actionButton" onClick={trySignup}>Next</button>
            </div>
        </section>
    </main>
  );
}

import React, { useState, useRef, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import emailIcon from "./assets/email.svg"
import lockIcon from "./assets/lock.svg"
import "./Login.css"
import firebaseApp from "firebase";

export default function Login() {
    const emailEntry = useRef();
    const passwordEntry = useRef();
    let history = useHistory();
    function tryLogin() {
        const email = emailEntry.current.value;
        const password = passwordEntry.current.value;
        console.log(email, password);
        firebaseApp.auth().signInWithEmailAndPassword(email,password).then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            console.log(`${user.email} has signed in successfully.`)
            history.push('/')
          })
          .catch((error) => {
            console.error(error);
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
          });
        // Clear input fields
        emailEntry.current.value = "";
        passwordEntry.current.value = "";

        // const attemptResponse = fetch('http://192.168.0.26:3000/auth/tryLogin', {
        //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //     mode: 'cors', // no-cors, *cors, same-origin
        //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //     credentials: 'same-origin', // include, *same-origin, omit
        //     headers: {
        //       'Content-Type': 'application/json'
        //       // 'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        //     redirect: 'follow', // manual, *follow, error
        //     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //     body: JSON.stringify({email: email, password: password}) // body data type must match "Content-Type" header
        //   }).then(unauthorized => unauthorized.json()).then(unauthorized => {
        //       console.log("unauthorized = " + unauthorized);
        //       if (unauthorized) {
        //           firebaseApp.auth().signInWithEmailAndPassword(email,password);
        //           localStorage.setItem('account', unauthorized)
        //       }
        //   });

    }
  return (
    <main>
         <header>
            <h1>Welcome</h1>
            <h1>back.</h1>
        </header>
        
        <section id="authSection">
            <div id="authForm">
                <div class="authItem">
                    <label for="email" class="inputLabel">Email</label>
                    <div class="inputGrid">
                        <img src={emailIcon} alt="email_icon" />
                        <input type="email" ref={emailEntry} placeholder="name@email.com" />
                    </div>
                </div>
                <div class="authItem">
                    <label for="password" class="inputLabel">Password</label>
                    <div class="inputGrid">
                        <img src={lockIcon} alt="lock_icon"/>
                        <input type="password" ref={passwordEntry} placeholder="●●●●●●●●" />
                    </div>
                </div>
                
                <div id="passwordOptions">
                    <div id="rememberOption">
                        <input id="rememberToggle" name="rememberToggle" type="checkbox" />
                        <label for="rememberToggle">Remember Password?</label>
                    </div>
                    <a id="forgotPassword" href="#forgotPassword">Forgot Password?</a>
                </div>
                
            </div>
            <div id="actionContainer">
                <button id="actionButton" onClick={tryLogin}>Next</button>
            </div>
        </section>
    </main>
  );
}

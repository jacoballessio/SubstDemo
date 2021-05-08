import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import firebase from "firebase";
import styled from "styled-components";
import './Home.css';

import { DrugChart } from "./assets/react_components/ChartComponents.jsx"

import {DoseCardDisplay} from './assets/react_components/DoseCard.jsx';
// import { AddOrb } from "./assets/react_components/AddOrb";
export default function Home(match) {
    let [userEmail, setEmail] = useState("");
    let [isAuthorized, setAuthorized] = useState(false);
    useEffect(
      function () {
        if (isAuthorized) {
          setEmail(firebase.auth().currentUser.email);
        } else {
          setEmail("");
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
    <main>
    {isAuthorized && <> 
    <span style={{"color": "white"}}>{userEmail}</span>
    <button onClick={() => firebase.auth().signOut()}>Sign out</button>
    </>}
    
    
        <div class="card">
            <span class="card-title">Today</span>
            <span class="card-subtitle">Today's doses</span>
            <DoseCardDisplay></DoseCardDisplay>
            <a href="add_dose"><button>Add Dose</button></a>
        </div>

        <div class="card">
            <span class="card-title">Your Progress</span>
            <DrugChart></DrugChart>
        </div>
    </main>
  );
}

import { Component } from "react";
import arrow_back from "./assets/img/arrow_back-24px.svg";
import smilecheems from "./assets/img/smilecheems.png";
import add_a_photo from "./assets/img/add_a_photo-24px.svg";
import person from "./assets/img/person.svg";
import security from "./assets/img/security-24px.svg";
import view_agenda from "./assets/img/view_agenda-24px.svg";
import palette from "./assets/img/palette-24px.svg";
import notifications from "./assets/img/notifications-24px.svg";
import help_outline from "./assets/img/help_outline-24px.svg";
import policy from "./assets/img/policy-24px.svg";
import gavel from "./assets/img/gavel-24px.svg";
import bug_report from "./assets/img/bug_report-24px.svg" ;
export default function DrugInfo(match) {
  return (
    <div style={{backgroundColor: "white"}}>
      <header>
        <img src={arrow_back} alt="back" />
        <h1>Settings</h1>
      </header>
      <div id="settingsContent">
        <div id="profileBlock">
          <img
            src={smilecheems}
            id="profilePicture"
            alt="profile picture"
          />
          <div id="addProfilePictureContainer">
            <img
              src={add_a_photo}
              id="addProfilePicture"
              alt="new profile picture"
            />
          </div>
        </div>
        <div class="categoryBlock">
          <h2>ACCOUNT</h2>
          <a href="#" class="settingBlock">
            <img src={person} alt="person" />
            <p>Account Settings</p>
          </a>
          <a href="#" class="settingBlock">
            <img src={security} alt="security" />
            <p>Security</p>
          </a>
          <a href="#" class="settingBlock">
            <img src={view_agenda} alt="paths" />
            <p>Starter Paths</p>
          </a>
        </div>
        <div class="categoryBlock">
          <h2>GENERAL</h2>
          <a href="#" class="settingBlock">
            <img src={palette} alt="palette" />
            <p>Appearance</p>
          </a>
          <a href="#" class="settingBlock">
            <img src={notifications} alt="bell" />
            <p>Notifications</p>
          </a>
          <a href="#" class="settingBlock">
            <img
              src={help_outline}
              alt="question mark"
            />
            <p>Help</p>
          </a>
        </div>
        <div class="categoryBlock">
          <h2>OTHER</h2>
          <a href="#" class="settingBlock">
            <img src={policy} alt="policy" />
            <p>Privacy Policy</p>
          </a>
          <a href="#" class="settingBlock">
            <img src={gavel} alt="gavel" />
            <p>Terms of Service</p>
          </a>
          <a href="#" class="settingBlock">
            <img src={bug_report}alt="bug" />
            <p>Report a Bug</p>
          </a>
        </div>
        <footer>
          <button>Sign Out</button>
        </footer>
      </div>
    </div>
  );
}

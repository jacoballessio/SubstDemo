import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AddButtonOptionsDisplay } from "./AddButtonOptionsDisplay";
import styled from "styled-components";
import { NavLink } from "../../Navbar";
import addBoxIcon from "../img/add_box_white_24dp.svg";
import scheduleIcon from "../img/edit_calendar_white_24dp.svg";
import doseIcon from "../img/medication_white_24dp.svg";

export default function AddButton() {
  let addBtn = useRef();
  let optionsBlock = useRef();
  let [openStatus, setOpenStatus] = useState(false);

  useEffect(() => {
    // console.log("button intialized or pressed");
    // openStatus ? openOptionsMenu() : closeOptionsMenu();
  }, [openStatus]);

  function AddMenu() {
    const OptionList = styled.div`
      overflow: hidden;
      height: 100px;
      width: 100%;
      bottom: 70px;
      display: flex;
      position: absolute;
      background-color: black;
      animation: revealAddMenu 0.35s;
    `;

    const Option = styled(NavLink)`
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 1rem;
        & :hover {
            background-color: darkgrey;
            color: black;
        }
        & img {
            height: 30px;
        }
    `;

    useEffect(function () {
      console.log("initialized, or just opened");
    });
    return (
      <OptionList ref={optionsBlock}>
        <Option to="/create_schedule">
          <img src={scheduleIcon} />
          <span>Create Schedule</span>
        </Option>
        <Option  to="/add_dose">
          <img src={doseIcon} />
          <span>Add Dose</span>
        </Option>
      </OptionList>
    );
  }
  return (
    <>
      {
          openStatus ? 
          <AddMenu />
           : 
          null
          }
      <div className="nav-item">
        {/* <button className={"add-button "+(this.state.opened?"opened" : "closed")} onBlur={()=>{this.setState({opened:false})}} onClick={()=>{this.setState({opened:!this.state.opened})}} >
                <img src={addBoxIcon} className="add-box-icon nav-icon"/>
            </button> */}

        <button ref={addBtn} onClick={() => setOpenStatus(!openStatus)}>
          <img src={addBoxIcon} className="add-box-icon nav-icon" />
        </button>
        {/* <AddButtonOptionsDisplay opened={this.state.opened}></AddButtonOptionsDisplay> */}
      </div>
    </>
  );
}

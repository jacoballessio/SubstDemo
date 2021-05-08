import React from "react";
import { Link } from 'react-router-dom'
import './DrugInfo.css';
import {DoseCardDisplay} from './assets/react_components/DoseCard.jsx';
import {Units} from './assets/js/Units.js';
import {SearchSelect, UnitSelect, DrugSelect} from './assets/js/SearchSelect.js';
import { Doses } from "./assets/js/Doses";
import { Schedules } from "./assets/js/Schedules";
//import WeekdayPicker from "react-weekday-picker";

let drugSelect = React.createRef();
let startDose = React.createRef();
let endDose = React.createRef();
let unitSelect = React.createRef();
let startDate = React.createRef();
let endDate = React.createRef();
let time = React.createRef();
let dayOfWeekSelect = React.createRef();
export default function AddDosePage(match) {
    let drugId = -1;
    let unitId = -1;
    console.log(match); 
    var modifiers = {
        'weekend': function(weekday) {
          return weekday == 0 || weekday == 6;
        }
      };
    
  return (
      
    <main>
        <form className="d-flex flex-column align-items-center">
            <label>Drug Name</label>
            <DrugSelect hasAddButton={true} ref={drugSelect} onChange={(option)=>{drugId=option.optionId}}></DrugSelect>;
            <label className="d-flex justify-content-center">Start Dose</label>
            <input className="form-control" type="number" id="start-dose" ref={startDose}></input>
            <label className="d-flex justify-content-center">End Dose</label>
            <input className="form-control" type="number" id="end-dose" ref={endDose}></input>
            <label id="units">Units</label>
            <UnitSelect hasAddButton={true} ref={unitSelect} onChange={(option)=>{unitId=option.optionId}}></UnitSelect>
            <div className="d-flex flex-row justify-content-center" id="date-range">
                <input type="date" className="form-control" id="start-date" ref={startDate}></input>
                <input type="date" className="form-control" id="end-date" ref={endDate}></input>
            </div><label>Time</label>
            <DayOfWeekSelector ref={dayOfWeekSelect}></DayOfWeekSelector>
            <input type="time" className="form-control" id="time" ref={time}></input>
            <button className="btn btn-primary" id="submit" type="button" onClick={submitSchedule}>Submit</button>
        </form>
    </main>
  );
  function submitSchedule() {
    //DayOfWeekSelect
    
    Schedules.Store(Schedules.FormatSchedule(drugId, startDose.current.value, endDose.current.value, unitId, startDate.current.value, endDate.current.value, new Date(time.current.value).getTime(), dayOfWeekSelect.current.getChecked().map(day=>day.Value), -1));
  }
}

export class DayOfWeekSelector extends React.Component {
  state = {
    days: [
      {
        Name: 'Su',
        Value: 0,
        Checked: false
      },
      {
        Name: 'Mo',
        Value: 1,
        Checked: false
      },
      {
        Name: 'Tu',
        Value: 2,
        Checked: false
      },
      {
        Name: 'We',
        Value: 3,
        Checked: false
      },
      {
        Name: 'Th',
        Value: 4,
        Checked: false
      },
      {
        Name: 'Fr',
        Value: 5,
        Checked: false
      },
      {
        Name: 'Sa',
        Value: 6,
        Checked: false
      }
    ]
  }
  render() {
    return (
    <div className="day-of-week-selector">
      <div>
        {this.state.days.map(day => <a className={day.Checked?"day-select checked" : "day-select unchecked"} onClick={()=>{day.Checked=!day.Checked; this.setState({days:this.state.days}); console.log(this.state.days)}}>{day.Name}</a>)}
      </div>
    </div>);
  }

  getChecked() {
    return this.state.days.filter(day=>day.Checked);
  }
}
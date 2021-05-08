import React from "react";
import { Link } from 'react-router-dom'
import './DrugInfo.css';
import {DoseCardDisplay} from './assets/react_components/DoseCard.jsx';
import { EditText, EditTextarea } from 'react-edit-text';
import { Drugs } from "./assets/js/Drugs";
import { Doses } from "./assets/js/Doses";
import { Schedules } from "./assets/js/Schedules";

export default function ScheduleInfo(match) {
    let scheduleId = match.match.params.id;
    let schedule = Schedules.FindScheduleWithId(scheduleId);
    console.log(schedule.drugID);
  return (
    <main id="shedule-info-page">
        <h1 id="drug-name">Schedule for {Drugs.FindDrugWithID(schedule.drugID).drugName}</h1>
        <div className="card">
            <h1>Description</h1>
            <EditTextarea className="edit-text-area"placeholder={schedule.description==''?'Add a description' : schedule.description} onSave={(evt)=>{Schedules.ChangeDescription(scheduleId, evt.value)}}/>
        </div>
        <section className="dose-cards-section">
            <div className="card">
                <h1>Recent Doses</h1>
                <DoseCardDisplay doses={Doses.GetDosesCategorizedBySchedule().get(scheduleId)}></DoseCardDisplay>
            </div>
            <div className="card">
                <h1>Missed Doses</h1>
                <p></p>
            </div>
        </section>
    </main>
  );
}

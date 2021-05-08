import React from "react";
import { Link } from 'react-router-dom'
import './DrugInfo.css';
import {DoseCardDisplay} from './assets/react_components/DoseCard.jsx';
import {Units} from './assets/js/Units.js';
import {SearchSelect, UnitSelect, DrugSelect} from './assets/js/SearchSelect.js';
import { Doses } from "./assets/js/Doses";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import MultiStepForm from "./MultiStepForm";
import styled from 'styled-components';
import { checkPropTypes } from "prop-types";
import doseIcon from './assets/img/medication_white_24dp.svg';
/*
let drugSelect = React.createRef();
let amount = React.createRef();
let unitSelect = React.createRef();
let time = React.createRef();
*/
export default function AddDosePage(match) {
    console.log(match);
    let drugId = -1;
    let amount = -1;
    let unitId = -1;
    let time = -1;
  return (
    <div>
        <div style={{position: "fixed", display: "flex", flexDirection: "column", alignContent: "center"}}>
            <h1 style={{paddingLeft: "50px", marginBottom:"0px"}}>Add</h1>
            <h2 style={{paddingLeft: "50px"}}>Dose</h2>
            <img src={doseIcon} height="400vw" style={{position:"absolute", top:"150px"}}/>
        </div>
        <MultiStepForm onSubmit={submitDose}>
            <FormDrugSelect onChange={(value)=>{drugId = value}}></FormDrugSelect>
            <FormUnitSelect onChange={(value)=>{unitId = value}}></FormUnitSelect>
            <FormDoseAmount onChange={(value)=>{amount = value}}></FormDoseAmount>
            <FormTimeSelect onChange={(value)=>{time = value}}></FormTimeSelect>
        </MultiStepForm>
    </div>
  );
  function submitDose() {
    window.location.pathname = '/'
    Doses.Store(Doses.FormatDose(drugId, amount, unitId, -1, new Date(time).getTime()));
  }
}

function FormDrugSelect(props) {
    return (
        <div>
            <h2>Drug Name</h2>
            <DrugSelect hasAddButton={true} onChange={(option)=>{props.onChange(option.optionId)}}></DrugSelect>
        </div>
    );
}

function FormUnitSelect(props) {
    return (
        <div>
            <label id="units">Units</label>
            <UnitSelect hasAddButton={true} onChange={(option)=>{props.onChange(option.optionId)}}></UnitSelect>
        </div>
    );
}

function FormDoseAmount(props) {
    return (
        <div>
            <label className="d-flex justify-content-center">Amount</label>
            <input className="form-control" type="number" id="dose-amount" onInput={(evt)=>{props.onChange(evt.target.value)}}></input>
        </div>
    );
}

function FormTimeSelect(props) {
    return(
        <div>
            <label>Time</label>
            <input type="datetime-local" className="form-control" id="time" onInput={(evt)=>{props.onChange(evt.target.value)}}></input>
        </div>
    );
}
 
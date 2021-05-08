
import { Component } from 'react';
import {Drugs} from './Drugs.js'
import {Units} from './Units.js'
import React, { useState, useRef, useEffect } from "react"

export default function FunctionalSearchSelect(props) {
    const [inputValue, setInputValue] = useState("");
    const [selectedId, setSelectedId] = useState(0);
    const [opened, setOpened] = useState(0);
    const [selectedOption, setSelectedOption] = useState(0);
    const [addButton, setAddButton] = useState(props.hasAddButton ? <button onClick={()=>{props.addClickFunction(inputValue)}}></button> : <div></div>);
    let changeSelected = (option)=> {
        setSelectedId(option.optionId); 
        setSelectedOption(option);
        props.onChange(option);
    }
    let optionNameIncludes = (option)=> {
        let title = option.title || "";
        return title.toLowerCase().includes(inputValue.toLowerCase())
    }
    return(
    <div className="search-select" onClick={()=>{window.navigator.vibrate(5)}} 
 >
        <TwoStepSearchInput type="text" 
            onInput={(evt)=>{
                let searchInput = evt.target.value;
                let lowerCaseList = props.list.map(value=>value.title.toLowerCase());
                setInputValue(searchInput);
                if(lowerCaseList.includes(inputValue.toLowerCase())||inputValue=="") {
                    setAddButton(<button type="button" onClick={()=>{props.addClickFunction(searchInput)}}> Add {searchInput} to list</button>);
                } else {

                    setAddButton(<div></div>);
            }}} 
            onOpen={()=>{
                setOpened(true)
            }}
            value={inputValue} 
            placeholder={selectedOption==null?"Select Option":selectedOption.title}
            title={selectedOption==null?"Select Option":selectedOption.title} 
            setOpened={setOpened}
            opened={opened}
        ></TwoStepSearchInput>
        <div id="options" className={"search-select-option-container " + (opened?"opened":"closed")} onClick={()=>{setOpened(false)}}>
        {
            props.list.filter(optionNameIncludes).map(option => <button className={selectedId==option.optionId ? "search-select-option checked" : "search-select-option unchecked"} type="button" onClick={()=>{changeSelected(option);}}>{option.title}</button>)
        }
        {addButton}
        </div>
    </div>)
}

function TwoStepSearchInput(props) {
    const [opened, setOpened] = useState(props.opened);
    const [title, setTitle] = useState(props.title);
    const [currValue, setCurrValue] = useState(props.value);
    useEffect(()=>{
        setOpened(props.opened);
        setTitle(props.title);
        setCurrValue(props.value);
    });
    let textBox = opened?
    (<input {...props} value={currValue} ></input>):
    (<button 
        style={{backgroundColor:"white", color: "black", textAlign:"left"}} 
        onClick={()=>{props.onOpen()}}
    >{title}</button>);
    return(textBox);
}
export class FormattedOption {
    optionId;
    title;
    constructor(optionId, title) {
        this.optionId = optionId;
        this.title = title;
    }
}


export class DrugSelect extends Component {
    state = {
        list:[],
        searchSelect: React.createRef()
    }
    
    constructor(props) {
        super(props);
        Drugs.AddDefault();
        function GetDrugOptions() {
            let drugs = Drugs.GetDrugs();
            let drugOptions = [];
            drugs.forEach(drug => {
                let option = new FormattedOption(drug.id, drug.drugName);
                drugOptions.push(option);
            });
            return drugOptions;
        }
        this.state.list = GetDrugOptions();
    }

    render() {
        return <FunctionalSearchSelect onChange={this.props.onChange} hasAddButton={true} ref={this.state.searchSelect} list={this.state.list} addClickFunction={function(inputValue){Drugs.Store(Drugs.FormatDrug(inputValue))}}></FunctionalSearchSelect>
    }
    GetSelectedId() {
        return this.state.searchSelect.current.GetSelectedId();
    }

}


export class UnitSelect extends Component{
    state = {
        list:[],
        searchSelect: React.createRef()
    }
    constructor(props) {
        super(props);
        Units.AddDefault();
        function GetUnitOptions() {
            let units = Units.GetUnits();
            let unitOptions = [];
            units.forEach(unit => {
                let option = new FormattedOption(unit.id, unit.unitName);
                unitOptions.push(option);
            });
            return unitOptions;
        }
        this.state.list = GetUnitOptions();
    }

    render() {
        
        return <FunctionalSearchSelect onChange={this.props.onChange} hasAddButton={true} ref={this.state.searchSelect} list={this.state.list} addClickFunction={function(inputValue){Units.Store(inputValue)}} selectedId></FunctionalSearchSelect>
    }

    GetSelectedId() {
        return this.state.searchSelect.current.GetSelectedId();
    }
}


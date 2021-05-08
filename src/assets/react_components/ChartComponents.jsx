
import React, {useState, useRef, useEffect} from "react";
import { Link, useHistory } from 'react-router-dom'
import { Line } from 'react-chartjs-2';
import {DoseCardDisplay} from '../../assets/react_components/DoseCard.jsx';
import { AddOrb } from "../../assets/react_components/AddOrb";
import {Units} from '../../assets/js/Units.js';
import {SearchSelect, UnitSelect, DrugSelect} from '../../assets/js/SearchSelect.js';
import { Doses } from "../../assets/js/Doses";
import { Schedules } from "../../assets/js/Schedules";
export function DrugChart(match) {
    const [drugId, setDrugId] = useState(0);
    const drugSelectRef = useRef();
    const [data, setData] = useState(0);
    const [graphRegion, setGraphRegion] = useState(<p className="error">No data for this drug.</p>);
    let options = {
        elements: {
            line: {
                borderColor: 'white'
            }
        }
    }
    let updateData = (option)=>{
        if(Doses.GetDosesCategorizedByDrug().get(option.optionId)!=null) {
            setData({
                labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
                    datasets: [
                    {
                        label: "Population (millions)",
                        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                        data: Doses.GetDosesCategorizedByDrug().get(option.optionId).map(dose => dose.doseAmount)
                    }
                    ]
            })
        }
    }
    function ChartContainer(props) {
        if(Doses.GetDosesCategorizedByDrug().get(drugId)!=null) {

            return <Line data={data} options={options}></Line>;
        } else {
            return <p className="error">No data for this drug.</p>;
        }
    }


  return (
    <div>
        <DrugSelect ref={drugSelectRef} onChange={(option)=>{setDrugId(option.optionId); updateData(option)}}>
        </DrugSelect>
        <ChartContainer></ChartContainer>
    </div>
  );
}
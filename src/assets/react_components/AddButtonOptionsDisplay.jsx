
import React from "react";
import scheduleIcon from '../img/edit_calendar_white_24dp.svg';
import doseIcon from '../img/medication_white_24dp.svg';

import { Link, useHistory } from 'react-router-dom'
export class AddButtonOptionsDisplay extends React.Component {
    state = {
        opened: false
    }
    render() {
        return <div className={"add-button-options-display " + (this.state.opened?"opened":"closed")}>
            <Link to="/create_schedule" onClick={()=>{this.setState({opened: false});}} style={{display: "flex", flexDirection: "column"}} ><img src={scheduleIcon} /><h2>Create Schedule</h2></Link>
            <Link to="/add_dose" onClick={()=>{this.setState({opened: false})}} style={{display: "flex", flexDirection: "column"}}><img src={doseIcon} /><h2>Add Single Dose</h2></Link>
        </div>
    }
    componentWillReceiveProps(props) {
        this.setState({opened: props.opened});
    }
}
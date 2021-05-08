
import React from "react";
import { AddButtonOptionsDisplay } from "./AddButtonOptionsDisplay";
export class AddOrb extends React.Component {
    state = {
        opened: false
    }
    render() {
        return <div>
            <button className={"button-orb "+(this.state.opened?"opened" : "closed")} onClick={()=>{this.setState({opened:!this.state.opened})}} onBlur={()=>{this.setState({opened:false})}}>
                <p className="button-orb-text">+</p>
            </button>
            <AddButtonOptionsDisplay opened={this.state.opened}></AddButtonOptionsDisplay>
        </div>
    }
}
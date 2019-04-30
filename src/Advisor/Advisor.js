import React, { Component } from 'react';
import axios from '../ConfigAxios';
//import {Route, Link} from 'react-router-dom';
import AdvisorBar from "./AdvisorBar";
import AdvisorTabs from "./AdvisorTabs";

// Test

class Advisor extends Component{
    constructor(props) {
        super(props);

        this.state = {
            selectedDate: new Date()
        };

        this.dateSelect = this.dateSelect.bind(this);
    }

    componentDidMount() {
        axios.get('advisor/003456791').then(result => {
            console.log(result.data);
            this.setState({
                advisor_data: result.data,
            })
        });
    }

    dateSelect(date) {
        console.log("New Date Selected: ", date);
        let newDate = date - 1;
        this.setState({
            selectedDate: newDate
        });
    }


    render() {
    return (
        <div className="Adviser">
          <AdvisorBar logout={this.props.logout}/>
          <AdvisorTabs dateSelect={this.dateSelect} selectedDate={this.state.selectedDate}/>
        </div>
    )
  }
}

export default Advisor;
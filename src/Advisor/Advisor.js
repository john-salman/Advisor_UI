import React, { Component } from 'react';
import axios from '../ConfigAxios';
//import {Route, Link} from 'react-router-dom';
import AdvisorBar from "./AdvisorBar";
import AdvisorTabs from "./AdvisorTabs";

// Test

class Advisor extends Component{

        state = {
            selectedDate: new Date()
        };

        constructor() {
            super();
            this.dateSelect = this.dateSelect.bind(this);
        }

    componentDidMount() {
        axios.get('advisor/003456791').then(result => {
            console.log(result.data);
            this.setState({
                student_data: result.data,
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
          <AdvisorTabs
              submit_add={this.props.submit_add}
              dateSelect={this.dateSelect}
              selectedDate={this.state.selectedDate}
              student_data={this.state.student_data}/>
        </div>
    )
  }
}

export default Advisor;
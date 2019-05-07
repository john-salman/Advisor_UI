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

        constructor(props) {
            super(props);
            this.dateSelect = this.dateSelect.bind(this);
        }

    componentDidMount() {
        axios.get('advisor/' + this.props.user_data.login_id).then(result => {
            console.log("This one fired: ", result.data);
            this.setState({
                student_data: result.data,
            })
        });
        axios.get('meeting/advisor/' + this.props.user_data.login_id).then(result => {
            console.log("Meeting Data: ", result.data);
            let data = JSON.parse(JSON.stringify(result.data));
            this.setState({
                meeting_data: data,
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
        <div className="Advisor">
          <AdvisorBar fName={this.props.user_data.user_fName} lName={this.props.user_data.user_lName} logout={this.props.logout}/>
          <AdvisorTabs
              submit_add={this.props.submit_add}
              dateSelect={this.dateSelect}
              selectedDate={this.state.selectedDate}
              student_data={this.state.student_data}
              meeting_data={this.state.meeting_data}
          />
        </div>
    )
  }
}

export default Advisor;
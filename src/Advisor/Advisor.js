import React, { Component } from 'react';
import axios from '../ConfigAxios';
//import {Route, Link} from 'react-router-dom';
import AdvisorBar from "./AdvisorBar";
import AdvisorTabs from "./AdvisorTabs";

// Test

class Advisor extends Component{

        state = {
            selectedDate: new Date(),
            student_data: "",
        };

        constructor(props) {
            super(props);
            this.submit_add = this.submit_add.bind(this);
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

    submit_add(_student_fName, _student_lName, _advisingTime) {
        console.log("This is the state:", this.state);
        let advisee_id = -1;
        this.state.student_data.forEach( student => {
            if (student.student_fName === _student_fName && student.student_lName === _student_lName) {
                advisee_id = student.student_id;
            }
        });
        if (advisee_id !== -1) {
            axios.post('meeting/postAdvisor/' + this.props.user_data.login_id + '/' + advisee_id + '/' + _advisingTime)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            console.log("Error: user not found")
        }
    }


    render() {
    return (
        <div className="Advisor">
          <AdvisorBar fName={this.props.user_data.user_fName} lName={this.props.user_data.user_lName} logout={this.props.logout}/>
          <AdvisorTabs
              submit_add={this.submit_add}
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
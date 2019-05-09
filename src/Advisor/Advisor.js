import React, { Component } from 'react';
import axios from '../ConfigAxios';
import moment from 'moment'
//import {Route, Link} from 'react-router-dom';
import AdvisorBar from "./AdvisorBar";
import AdvisorTabs from "./AdvisorTabs";

// Test

class Advisor extends Component{

    constructor(props) {
        super(props);

        this.state = {
            selectedDate: new Date(),
            student_data: "",
        };

        this.updateMeetingData = this.updateMeetingData.bind(this);
        this.submit_add = this.submit_add.bind(this);
        this.dateSelect = this.dateSelect.bind(this);
    }

    getStudentData() {
        return axios.get('advisor/' + this.props.user_data.login_id);
    }

    getMeetingData() {
        return axios.get('meeting/advisor/' + this.props.user_data.login_id);
    }

    updateMeetingData() {
        axios.get('meeting/advisor/' + this.props.user_data.login_id).then(response => {
            console.log("Updating the meeting data: ", response.data);
            this.setState({
                meeting_data: response.data,
            })
        });
    }

    componentDidMount() {
        axios.all([this.getStudentData(), this.getMeetingData()])
            .then(axios.spread((_stu_response, _meet_response) => {
                this.setState({
                    student_data: _stu_response.data,
                    meeting_data: _meet_response.data,
                })
            }));
    }

    dateSelect(date) {
        console.log("New Date Selected: ", date);
        let newDate = date - 1;
        this.setState({
            selectedDate: newDate
        });
    }

    submit_add(_student_fName, _student_lName, _advisingTime, _user_id) {
        console.log("This is the state:", this.state);
        let advisee_id = -1;
        this.state.student_data.forEach( student => {
            if (student.student_fName === _student_fName && student.student_lName === _student_lName) {
                advisee_id = student.student_id;
            }
        });
        if (advisee_id !== -1) {
            let _advising_time_formatted = _advisingTime.getTimestamp();
            let update_pointer = this.updateMeetingData;
            axios.post('meeting/postAdvisor/' + _user_id + '/' + advisee_id + '/' + _advising_time_formatted)
                .then(function (response) {
                    console.log(response);
                    update_pointer();
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
              user_id={this.props.user_data.login_id}
              selectedDate={this.state.selectedDate}
              student_data={this.state.student_data}
              meeting_data={this.state.meeting_data}
              updateMeetingData={this.updateMeetingData}
          />
        </div>
    )
  }
}

Date.prototype.getTimestamp = function() {
    var year = this.getFullYear(),
    month = this.getMonth() + 1,
    day = this.getDate(),
    hours = this.getHours(),
    minutes = this.getMinutes(),
    seconds = this.getSeconds();

    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
};

export default Advisor;
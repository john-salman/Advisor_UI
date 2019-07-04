import React, { Component } from 'react';
import axios from '../ConfigAxios';
//import {Route, Link} from 'react-router-dom';
import StudentBar from "./StudentBar";
import StudentTabs from "./StudentTabs";

// Test

class Student extends Component{

    state = {
        selectedDate: new Date()
    };

    constructor(props) {
        super(props);
        this.getMeeting = this.getMeeting.bind(this);
        this.submit_add_student = this.submit_add_student.bind(this);
        // console.log("initial props:");
        // console.log(this.props);
    }


    // componentDidMount() {
    //     axios.get('advisee/' + this.props.user_data.login_id).then(result => {
    //         console.log("This one fired: ", result.data);
    //         this.setState({
    //             advisor_data: result.data,
    //         })
    //     });
    //     axios.get('meeting/advisee/' + this.props.user_data.login_id).then(result => {
    //         console.log("Meeting Data: ", result.data);
    //         let data = JSON.parse(JSON.stringify(result.data));
    //         this.setState({
    //             meeting_data: data,
    //         })
    //     });
    // }

    getAdvisorData() {
       return axios.get('advisee/' + this.props.user_data.login_id);
    }

    getMeetingData() {
       return axios.get('meeting/advisee/' + this.props.user_data.login_id);
    }


    componentDidMount() {
       axios.all([this.getAdvisorData(), this.getMeetingData()])
           .then(axios.spread((_stu_response, _meet_response) => {
               // console.log("advisorData:");
               // console.log(_stu_response);
               // console.log("meeting response:");
               // console.log(_meet_response);
               axios.get('advisee/lock/' + _stu_response.data[0].advisor_id).then(result => {
                   // console.log("lock info: ", result.data);
                   this.setState({
                     lock_data: result.data
                   })
               });
               axios.get('advisee/preference/' + _stu_response.data[0].advisor_id ).then(result => {
                   // console.log("lock info: ", result.data);
                   console.log("preferences");
                   console.log(result.data);
                   this.setState({
                     preference_data: result.data
                   })
               });
               this.setState({
                   advisor_data: _stu_response.data,
                   meeting_data: _meet_response.data,
               });
           }));
    }

    getMeeting(){
      axios.get('meeting/advisee/' + this.props.user_data.login_id).then(result => {
          let data = JSON.parse(JSON.stringify(result.data));
          this.setState({
              meeting_data: data,
          })
      });
    }

    submit_add_student(  _advisor_id, _user_id, _advisingTime) {

        let _advising_time_formatted = _advisingTime.getTimestamp();
        let get_pointer = this.getMeeting();
        axios.post('meeting/postAdvisor/' + _advisor_id + '/' + _user_id + '/' + _advising_time_formatted)
            .then(function (response) {
                console.log(response);
                get_pointer();
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {
        return (
            <div className="Student">
                <StudentBar
                    fName={this.props.user_data.user_fName}
                    lName={this.props.user_data.user_lName}
                    logout={this.props.logout}
                />
                <StudentTabs
                    getMeeting={this.getMeeting}
                    student_fName={this.props.user_data.user_fName}
                    student_lName={this.props.user_data.user_lName}
                    user_id={this.props.user_data.login_id}
                    submit_add_student={this.submit_add_student}
                    lock_data={this.state.lock_data}
                    advisor_data={this.state.advisor_data}
                    meeting_data={this.state.meeting_data}
                    preference_data={this.state.preference_data}
                />
            </div>
        )
    }
}

export default Student;

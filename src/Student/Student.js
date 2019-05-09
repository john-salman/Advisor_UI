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
        console.log("initial props:");
        console.log(this.props);
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
               console.log("advisorData:");
               console.log(_stu_response);
               console.log("meeting response:");
               console.log(_meet_response);
                   axios.get('advisee/lock/' + _stu_response.data[0].advisor_id).then(result => {
                       console.log("lock info: ", result.data);
                       this.setState({
                         lock_data: result.data
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
          console.log("Meeting Data: ", result.data);
          let data = JSON.parse(JSON.stringify(result.data));
          this.setState({
              meeting_data: data,
          })
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
                    submit_add={this.props.submit_add}
                    lock_data={this.state.lock_data}
                    advisor_data={this.state.advisor_data}
                    meeting_data={this.state.meeting_data}
                />
            </div>
        )
    }
}

export default Student;

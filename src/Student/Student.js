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
    }

    componentDidMount() {
        axios.get('advisee/' + this.props.user_data.login_id).then(result => {
            console.log("This one fired: ", result.data);
            this.setState({
                advisor_data: result.data,
            })
        });
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
                    student_fName={this.props.user_data.user_fName}
                    student_lName={this.props.user_data.user_lName}
                    submit_add={this.props.submit_add}
                    advisor_data={this.state.advisor_data}
                    meeting_data={this.state.meeting_data}
                />
            </div>
        )
    }
}

export default Student;
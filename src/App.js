import React, { Component } from 'react';

import LogIn from './LogIn/LogIn';
import Advisor from "./Advisor/Advisor";


class App extends Component {
   state = {
        user_data: "",
        successful_login: false,
    };

    constructor(props) {
        super(props);
        console.log("App constructor called");

        this.submit_SignIn = this.submit_SignIn.bind(this);
        this.submit_add = this.submit_add.bind(this);
        this.logout = this.logout.bind(this);
    }


    logout() {
        let reset_data = "";
        let reset_login = false;
        this.setState(
            {
                user_data: reset_data,
                successful_login: reset_login
            }
        );
    }

    submit_add(student_fName, student_lName, advisingTime) {
        console.log("Added Student Appointment with: ", student_fName, " ", student_lName, "at time: ", advisingTime)
    }

    submit_SignIn(user) {
        console.log("Signing In");
        this.setState({
            successful_login: true,
            user_data: JSON.parse(JSON.stringify(user))
            //user_data: user //json.parse(json.stringify(user)) ??????
        });
    }

    render () {
        console.log("App render called with values: ", this.state);
        if (this.state.successful_login && this.state.user_data.role === "advisor") {
            console.log("User found, logging in");
            return (
                <div className="App">
                    <Advisor user_data={this.state.user_data} submit_add={this.submit_add} logout={this.logout}/>
                </div>
            );
        } else
        /*
            here we should have an if case for if the sign in was successful and role === "student"
        */
        {
            return (
                <div className="App">
                    <LogIn submit_SignIn={this.submit_SignIn}/>
                </div>
            );
        }
    }
}

export default App;
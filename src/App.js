import React, { Component } from 'react';

import LogIn from './LogIn/LogIn';
import Advisor from "./Advisor/Advisor";

class App extends Component {
    constructor(props) {
        super(props);
        console.log("App constructor called")
        this.state = {
            successful_login: false,
            role: "",
        };
        this.submit_form = this.submit_form.bind(this);
        this.logout = this.logout.bind(this);
    }

    logout() {
        let reset_success = false;
        let reset_role = false;
        this.setState(
            {
                successful_login: reset_success,
                role: reset_role,
            }
        );
    }

    submit_form(email, password, role) {
        let success = false;
        let new_role = "";
        console.log("Submit form entered with values: ", email, password, role);
        if (email === "test@test.com" && password === "hardpassword" && role === "advisor") {
            success = true;
            new_role = role;
        }
        this.setState(
            {
                successful_login: success,
                role: new_role,
            }
            );
    }

    render () {
        console.log("App render called with values: ", this.state.successful_login, this.state.role);
        if (this.state.successful_login && this.state.role === "advisor") {
            return (
                <div className="App">
                    <Advisor logout={this.logout}/>
                </div>
            );
        } else
        /*
            here we should have an if case for if the sign in was successful and role === "student"
        */
        {
            return (
                <div className="App">
                    <LogIn submit_form={this.submit_form}/>
                </div>
            );
        }
    }
}

export default App;
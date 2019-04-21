import React, { Component } from 'react';

import LogIn from './LogIn/LogIn';
import Adviser from "./Adviser/Adviser";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            successful_login: false,
            role: "",
        }
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
        if (email === "test@test.com" && password === "hardpassword" && role === "adviser") {
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
        if (this.state.successful_login && this.state.role === "adviser") {
            return (
                <div className="App">
                    <Adviser logout={this.logout}/>
                </div>
            );
        } else {
            return (
                <div className="App">
                    <LogIn submit_form={this.submit_form}/>
                </div>
            );
        }
    }
}

export default App;
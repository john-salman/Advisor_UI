import React, { Component } from 'react';

import LogIn from './LogIn/LogIn';
import Advisor from './Advisor/Advisor';
import Student from './Student/Student';


class App extends Component {
   state = {
        user_data: "",
        successful_login: false,
    };

    constructor(props) {
        super(props);
        console.log("App constructor called");

        this.submit_SignIn = this.submit_SignIn.bind(this);
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


    submit_SignIn(user) {
        this.setState({
            successful_login: true,
            user_data: JSON.parse(JSON.stringify(user))
            //user_data: user //json.parse(json.stringify(user)) ??????
        });
    }



    render () {
        if (this.state.successful_login && this.state.user_data.role === "advisor") {
            return (
                <div className="App">
                    <Advisor user_data={this.state.user_data} logout={this.logout}/>
                </div>
            );
        } else if (this.state.successful_login && this.state.user_data.role === "student"){
            return (
                <div className="App">
                    <Student user_data={this.state.user_data} logout={this.logout}/>
                </div>
            );
        } else {
            return (
                <div className="App">
                    <LogIn submit_SignIn={this.submit_SignIn}/>
                </div>
            );
        }
    }
}

export default App;
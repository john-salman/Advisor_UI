import React, { Component } from 'react';

import SignIn from './SignIn';

class LogIn extends Component {
    render() {
        return (
            <div className="LogIn">
                <SignIn submit_SignIn={this.props.submit_SignIn}/>
            </div>
        )
    }
}

export default LogIn;
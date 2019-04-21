import React, { Component } from 'react';

import SignIn from './SignIn';

class LogIn extends Component {
    render() {
        return (
            <div className="LogIn">
                <SignIn submit_form={this.props.submit_form}/>
            </div>
        )
    }
}

export default LogIn;
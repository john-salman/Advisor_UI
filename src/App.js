import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';

import LogIn from './LogIn/LogIn';

class App extends Component {
    render () {
        return (
            <div className="App">
                <LogIn/>
            </div>
        );
    }
}

export default App;
import React, { Component } from 'react';
import logo from './logo.svg';

//import axios from './ConfigAxios';
//import {Route, Link} from 'react-router-dom';
import SimpleTabs from "./SimpleTab";
import TemporaryDrawers from "./UserDrawer"

// Test

class App extends Component{
  render() {
    return (
        <div className="App">
          <TemporaryDrawers/>
          <SimpleTabs/>
        </div>
    )
  }
}

export default App;
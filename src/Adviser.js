import React, { Component } from 'react';

//import axios from './ConfigAxios';
//import {Route, Link} from 'react-router-dom';
import AdviserBar from "./AdviserBar";
import AdviserTabs from "./AdviserTabs";

// Test

class Adviser extends Component{
  render() {
    return (
        <div className="Adviser">
          <AdviserBar/>
          <AdviserTabs/>
        </div>
    )
  }
}

export default Adviser;
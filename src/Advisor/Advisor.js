import React, { Component } from 'react';
import axios from '../ConfigAxios';
//import {Route, Link} from 'react-router-dom';
import AdvisorBar from "./AdvisorBar";
import AdvisorTabs from "./AdvisorTabs";

// Test

class Advisor extends Component{
    componentDidMount() {
        axios.get('advisor/003456791').then(result => {
            console.log(result.data);
            this.setState({
                advisor_data: result.data,
            })
        });
    }


    render() {
    return (
        <div className="Adviser">
          <AdvisorBar logout={this.props.logout}/>
          <AdvisorTabs/>
        </div>
    )
  }
}

export default Advisor;
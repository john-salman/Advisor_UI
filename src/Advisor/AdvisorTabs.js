import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import AppBar from '@material-ui/core/AppBar/index';
import Tabs from '@material-ui/core/Tabs/index';
import Tab from '@material-ui/core/Tab/index';
import Typography from '@material-ui/core/Typography/index';
import axios from '../ConfigAxios';

import AdvisorStuDate from './AdvisorStuDate';
import AdvisorStuSched from './AdvisorStuSched';
import AdvisorStuTable from './AdvisorStuTable';
import AdvisorApptAdd from "./AdvisorApptAdd";
import AdvisorApptTable from './AdvisorApptTable';
import AdvisorCurrentEditor from './AdvisorCurrentEditor';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class AdvisorTabs extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            value: 0,
        };
        this.deleteAppointment = this.deleteAppointment.bind(this);
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };


    deleteAppointment(_id) {
        console.log("Deleting appointment: ", _id);
        axios.post('meeting/advisor/delete/' + _id)
            .then( response => {
                console.log(response)
            })
            .catch( error => {
                console.log(error);
            });
    }

    declineAppointment(_id) {
        console.log("Declining appointment: ", _id);
        axios.post('meeting/decline/' + _id)
            .then( response => {
                console.log(response)
            })
            .catch( error => {
                console.log(error);
            });


    }

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs style={{background: "#5566c3"}} value={value} onChange={this.handleChange}>
                        <Tab label="Schedule" />
                        <Tab label="Current" />
                        <Tab label="Appointments" />
                        <Tab label="Advisee's" />
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer><AdvisorStuDate dateSelect={this.props.dateSelect}/><AdvisorStuSched meeting_data={this.props.meeting_data} selectedDate={this.props.selectedDate}/></TabContainer>}
                {value === 1 && <TabContainer><AdvisorCurrentEditor/></TabContainer>}
                {value === 2 && <TabContainer><AdvisorApptAdd submit_add={this.props.submit_add} user_id={this.props.user_id}/><AdvisorApptTable deleteAppointment={this.deleteAppointment} declineAppointment={this.declineAppointment} meeting_data={this.props.meeting_data}/></TabContainer>}
                {value === 3 && <TabContainer><AdvisorStuTable student_data={this.props.student_data}/></TabContainer>}
            </div>
        );
    }
}

AdvisorTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdvisorTabs);
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';


import AdvisorApptAddPicker from './AdvisorApptAddPicker';
import axios from "../ConfigAxios";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class AdvisorApptAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            student_fName: "",
            student_lName: "",
            advisingTime: new Date(),
            advisingDate: new Date(),
        };
        this.addTime = this.addTime.bind(this);
        this.addDate = this.addDate.bind(this);

    }



    addFname = event => {
        this.setState({ student_fName: event.target.value })
    };

    addLname = event => {
        this.setState({ student_lName: event.target.value })
    };

    addTime = (time:Date) => {
        this.setState({ advisingTime: time });
    };

    addDate = (date:Date) => {
        this.setState({ advisingDate: date });
    };

    onSubmit(_user_id) { // need to rewrite logic to combine advisingTime with advisingDate
        let year = this.state.advisingDate.getFullYear();
        let month = this.state.advisingDate.getMonth();
        let date = this.state.advisingDate.getDate();
        let newTime = this.state.advisingTime;
        newTime.setFullYear(year);
        newTime.setMonth(month);
        newTime.setDate(date);
        //newTime = newTime.toISOString().split('T')[0]+' '+ newTime.toTimeString().split(' ')[0];
        //newTime = newTime.toLocaleString();
        console.log("The old Time is: ", newTime);
        //newTime = newTime.toISOString().slice(0, 19).replace('T', ' ');
        //console.log("The new Time is: ", newTime);
        this.props.submit_add(this.state.student_fName, this.state.student_lName, newTime, _user_id);
    }

    render() {
        console.log("Just curious", this.props);
        return (
            <div >
                <TextField
                    required
                    id="standard-required"
                    label="Required"
                    defaultValue="First Name"
                    className={this.props.classes.textField}
                    margin="normal"
                    onChange={this.addFname}
                />
                <TextField
                    required
                    id="standard-required"
                    label="Required"
                    defaultValue="Last Name"
                    className={this.props.classes.textField}
                    margin="normal"
                    onChange={this.addLname}
                />
                <AdvisorApptAddPicker
                    date={this.state.advisingDate}
                    time={this.state.advisingTime}
                    addTime={this.addTime}
                    addDate={this.addDate}
                />
                <div>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={this.props.classes.submit}
                        onClick={() => this.onSubmit(this.props.user_id)}
                    >
                        Add
                    </Button>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(AdvisorApptAdd);
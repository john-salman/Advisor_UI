import React, { Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import StudentApptAddPicker from './StudentApptAddPicker';
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

class StudentApptAdd extends Component {
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

    addTime = (time:Date) => {
        this.setState({ advisingTime: time });
    };

    addDate = (date:Date) => {
        this.setState({ advisingDate: date });
    };

    onSubmit() {
        this.props.submit_add(this.props.student_fName, this.props.student_lName, this.state.advisingTime, this.state.advisingDate);
    }


    render() {
        let advisor_fName = "Loading";
        let advisor_lName = "Loading";
        if (this.props.advisor_data) {
            advisor_fName = this.props.advisor_data[0].advisor_fName;
            advisor_lName = this.props.advisor_data[0].advisor_lName;
        }
        return (
            <div  style={{direction: 'flex', flexDirection: 'row' }}>
                <p><strong>Advisor:  </strong>{advisor_fName + " " + advisor_lName}</p>
                <StudentApptAddPicker
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
                        onClick={() => this.onSubmit()}
                    >
                        Add
                    </Button>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(StudentApptAdd);
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import moment from 'moment';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit - 10,
        marginRight: theme.spacing.unit,
        marginBottom: 5,
        marginTop: 5,
        width: '100%',
        height: '80%',
        maxHeight: '80%',
        maxWidth: '100%',
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
});


class AdvisorCurrentEditor extends React.Component {
    state = {
        text: ""
    };

    handleChange = event => {
        console.log("TextArea:",event.target.value, event.target.value.length);
        this.setState({
            text: event.target.value,
        });
    };

    onEndAppt( _id) {
        if (_id !== -1) {
            this.props.submit_appt(this.state.text, _id);
        } else {
            alert("You currently don't have an appointment")
        }
    };


    render() {
        const { classes, meeting_data } = this.props;
        let right_now = new Date();
        let current_advisee = "";
        let current_appt_id = "";
        let end_appt = "";
        let current_time = "";
        meeting_data.forEach(current => {
            const d = new Date(current.advisingTime);
            end_appt = new Date(moment(d, 'YYYY-MM-DD H:mm:ss').add(30,'m').format('YYYY-MM-DD H:mm:ss'));
            let start_appt =new Date(moment(d, 'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD H:mm:ss'));
            if (start_appt < right_now && right_now < end_appt) {
                current_advisee = current.student_fName + " " + current.student_lName;
                current_appt_id = current.id;
                current_time = d;
            }
        });

        return (
            <div>
                <h3>Current Advisee:</h3>
                <p>{current_advisee}</p>
                <h4>Appointment End:</h4>
                <p>{current_time ? moment(current_time, 'MMMM Do YYYY, hh:mm a').add(30, 'm').format('MMMM Do YYYY, hh:mm a') : current_time}</p>
                <TextField
                    id="filled-textarea"
                    label="Appointment Notes"
                    placeholder="This is an expanding area that can hold up to 256 characters of notes."
                    multiline
                    className={classes.textField}
                    margin="normal"
                    variant="filled"
                    onChange={this.handleChange}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={this.props.classes.submit}
                    onClick={() => this.onEndAppt(current_appt_id ? current_appt_id : -1)}
                >
                    End Appointment
                </Button>
            </div>
        );
    }
}

AdvisorCurrentEditor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdvisorCurrentEditor);
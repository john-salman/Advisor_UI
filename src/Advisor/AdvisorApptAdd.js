import React, { Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';


import AdvisorApptAddPicker from './AdvisorApptAddPicker';

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
            addTime: new Date(),
        };
        this.addTime = this.addTime.bind(this)
    }

    addFname = event => {
        this.setState({ student_fName: event.target.value })
    };

    addLname = event => {
        this.setState({ student_lName: event.target.value })
    };

    addTime = event => {
        this.setState({ student_lName: event.target.value })
    };

    onSubmit() {
        this.props.submit_add(this.state.student_fName, this.state.student_lName, this.state.advisingTime);
    }

    render() {
        return (
            <form className={this.props.classes.container} noValidate autoComplete="off">
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
                <AdvisorApptAddPicker addTime={this.addTime}/>
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
            </form>

        );
    }
}

export default withStyles(styles)(AdvisorApptAdd);
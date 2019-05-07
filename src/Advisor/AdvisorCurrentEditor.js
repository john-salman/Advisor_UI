import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

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

    onEndAppt() {
        this.props.submit_appt(this.state.text);
    };


    render() {
        const { classes } = this.props;

        return (
            <div>
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
                    onClick={() => this.onSubmit()}
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
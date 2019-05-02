import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: 16,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

function AdvisorApptAddPicker(props) {
    const { classes, addTime } = props;
    console.log("askjdnf;aownerg", props);
    return (
        <form className={classes.container} noValidate>
            <TextField
                id="datetime-local"
                label="Set appointment"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={() => addTime}
            />
        </form>
    );
}

AdvisorApptAddPicker.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdvisorApptAddPicker);
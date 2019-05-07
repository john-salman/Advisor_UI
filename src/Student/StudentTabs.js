import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import AppBar from '@material-ui/core/AppBar/index';
import Tabs from '@material-ui/core/Tabs/index';
import Tab from '@material-ui/core/Tab/index';
import Typography from '@material-ui/core/Typography/index';

import StudentApptAdd from './StudentApptAdd';

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

class StudentTabs extends React.Component {

    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        console.log("It made it this far at least:", this.props.advisor_data);
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs style={{background: "#5566c3"}} value={value} onChange={this.handleChange}>
                        <Tab label="Advisor" />
                        <Tab label="Appointments" />
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer>
                                    <StudentApptAdd
                                        student_fName={this.props.student_fName}
                                        student_lName={this.props.student_lName}
                                        submit_add={this.props.submit_add}
                                        advisor_data={this.props.advisor_data}
                                    />
                                </TabContainer>}
                {value === 1 && <TabContainer>{JSON.stringify(this.props.meeting_data)}</TabContainer>}
            </div>
        );
    }
}

StudentTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentTabs);
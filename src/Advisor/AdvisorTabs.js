import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import AppBar from '@material-ui/core/AppBar/index';
import Tabs from '@material-ui/core/Tabs/index';
import Tab from '@material-ui/core/Tab/index';
import Typography from '@material-ui/core/Typography/index';

import AdvisorStuDate from './AdvisorStuDate';
import AdvisorStuSched from './AdvisorStuSched';
import AdvisorStuCard from './AdvisorStuCard';
import AdvisorStuTable from './AdvisorStuTable';

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
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs style={{background: "#5566c3"}} value={value} onChange={this.handleChange}>
                        <Tab label="Schedule" />
                        <Tab label="Today" />
                        <Tab label="Current" />
                        <Tab label="Advisee's" />
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer><AdvisorStuDate dateSelect={this.props.dateSelect}/><AdvisorStuSched selectedDate={this.props.selectedDate}/></TabContainer>}
                {value === 1 && <TabContainer>ONE</TabContainer>}
                {value === 2 && <TabContainer><AdvisorStuCard/></TabContainer>}
                {value === 3 && <TabContainer><AdvisorStuTable student_data={this.props.student_data}/></TabContainer>}
            </div>
        );
    }
}

AdvisorTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdvisorTabs);
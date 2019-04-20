import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

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

class AdviserTabs extends React.Component {
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
                        <Tab label="Summary" />
                        <Tab label="Upcoming" />
                        <Tab label="Current" />
                        <Tab label="Advisee's" />
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer>THFEREE</TabContainer>}
                {value === 1 && <TabContainer>ONE</TabContainer>}
                {value === 2 && <TabContainer>TWOW?</TabContainer>}
                {value === 3 && <TabContainer>FLARMP</TabContainer>}
                {value === 4 && <TabContainer>Shmeep</TabContainer>}
            </div>
        );
    }
}

AdviserTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdviserTabs);
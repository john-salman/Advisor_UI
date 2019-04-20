import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PermIdentityTwoTone from '@material-ui/icons/PermIdentityTwoTone';
import Settings from '@material-ui/icons/Settings';
import PanToolTwoTone from'@material-ui/icons/PanToolTwoTone';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
};

class AdviserBar extends React.Component {
    state = {
        left: false,
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };


    render() {
        const { classes } = this.props;

        const sideList = (
            <div className={classes.list}>
                <List>
                    <ListItem button key={"Profile"}>
                        <ListItemIcon><PermIdentityTwoTone/></ListItemIcon>
                        <ListItemText primary={"Profile"} />
                    </ListItem>
                    <ListItem button key={"Settings"}>
                        <ListItemIcon><Settings/></ListItemIcon>
                        <ListItemText primary={"Settings"} />
                    </ListItem>
                    <ListItem button key={"Help"}>
                        <ListItemIcon><PanToolTwoTone/></ListItemIcon>
                        <ListItemText primary={"Help"} />
                    </ListItem>
                </List>
            </div>
        );

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton onClick={this.toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon/>
                            <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)} >
                                <div
                                    tabIndex={0}
                                    role="button"
                                    onClick={this.toggleDrawer('left', false)}
                                    onKeyDown={this.toggleDrawer('left', false)}
                                    onMouseLeave={this.toggleDrawer('left', false)}
                                >
                                    {sideList}
                                </div>
                            </Drawer>
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Dr. Doofenshmirtz
                        </Typography>
                        <Button color="inherit">Logout</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

AdviserBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdviserBar);
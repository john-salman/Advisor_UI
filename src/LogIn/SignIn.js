import React from 'react';
import {Route, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Advisor from '../Advisor/Advisor'
import axios from "../ConfigAxios";


const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LogIn: "",
        }
    }

    addLogIn = event => {
        console.log(event.target.value);
        this.setState({ LogIn: event.target.value })
    };

    onSubmit() {/*
        axios.get('login/' + this.state.LogIn).then(res => {
            let user = res.data.user;
            if (user) {
                this.props.submit_SignIn(user);
            }
        }).catch(error => { */
        console.log("We're here")
            if (this.state.LogIn === "003456791") {
                this.props.submit_SignIn({user_fName: "Daniel", user_lName: "Stanley", login_id: "003456791", role: "advisor"})
            } else {
                alert("Try id: 003456791")
            }
       /* );*/

    }

    render() {
        return (
            <main className={this.props.classes.main}>
                <CssBaseline/>
                <Paper className={this.props.classes.paper}>
                    <Avatar className={this.props.classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <div>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="loginId">Log-In ID</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.addLogIn}/>
                        </FormControl>
                        <div>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={this.props.classes.submit}
                                onClick={() => this.onSubmit()}
                            >
                                Sign in
                            </Button>
                        </div>
                    </div>
                </Paper>
            </main>
        )
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);


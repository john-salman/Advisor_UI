import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import moment from 'moment';

import DeleteIcon from '@material-ui/icons/Delete';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
    rowDeclined: {
        backgroundColor : '#ff6666',
    },
});

let id = 0;
function createData(lName, fName, stu_id) {
    id += 1;
    return { id, lName, fName, stu_id};
}

const rows = [
    createData('Goober', 'Phineas', 937291),
    createData('Goober', 'Candace', 48605),
    createData('Platypus', 'Perry', 324241234),
];

const fake_data = [
    {
        advisor_id : "003456791",
        id : "003504589",
        advisingTime : "2019-07-05T09:00:00.000Z",
        student_fName : "Barbara",
        student_lName : "Ramos",
        declined: {
            "type": "Buffer",
            "data": [
                1
            ]
        },
    },
    {
        advisor_id : "003456791",
        id : "003504589",
        advisingTime : "2019-07-05T15:00:00.000Z",
        student_fName : "John",
        student_lName : "Smith",
        declined: {
            "type": "Buffer",
            "data": [
                0
            ]
        },
    },
    {
        advisor_id : "003456791",
        id : "003504589",
        advisingTime : "2019-07-06T11:00:00.000Z",
        student_fName : "Bob",
        student_lName : "Robert",
        declined: {
            "type": "Buffer",
            "data": [
                0
            ]
        },
    },
];


function AdvisorApptTable(props) {
    const { classes, deleteAppointment, declineAppointment} = props;
    let meeting_data = props.meeting_data ? props.meeting_data : fake_data;
    if (meeting_data) {
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow >
                            <CustomTableCell><h2>First Name</h2></CustomTableCell>
                            <CustomTableCell align="left"><h2>Last Name</h2></CustomTableCell>
                            <CustomTableCell align="left"><h2>Student ID</h2></CustomTableCell>
                            <CustomTableCell align="left"><p> </p></CustomTableCell>
                            <CustomTableCell align="left"><p> </p></CustomTableCell>
                            <CustomTableCell align="left"><p> </p></CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {meeting_data.map(student => (
                            <TableRow className={student.declined.data[0] === 1 ? classes.rowDeclined : classes.row} key={student.id}>
                                <CustomTableCell component="th" scope="row">
                                    {student.student_fName}
                                </CustomTableCell>
                                <CustomTableCell align="left">{student.student_lName}</CustomTableCell>
                                <CustomTableCell align="left">{student.advisee_id}</CustomTableCell>
                                <CustomTableCell align="left">{moment(new Date(student.advisingTime), 'MMMM Do YYYY, hh:mm a').format('MMMM Do YYYY, hh:mm a')}</CustomTableCell>
                                <CustomTableCell align="left">
                                    <Button variant="contained" color="default" className={classes.button} onClick={() => declineAppointment(student.id)}>
                                        Decline
                                    <NotInterestedIcon className={classes.rightIcon} />
                                </Button></CustomTableCell>
                                <CustomTableCell align="left">
                                    <Button variant="contained" color="secondary" className={classes.button} onClick={() => deleteAppointment(student.id)}>
                                        Delete
                                        <DeleteIcon className={classes.rightIcon} />
                                    </Button>
                                </CustomTableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <p>*Red lines indicate a declined appointment</p>
            </Paper>
        );

    } else {
        console.log("API call missed, rendering with hardcoded values...");
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>Last Name</CustomTableCell>
                            <CustomTableCell align="left">First Name</CustomTableCell>
                            <CustomTableCell align="left">Student ID</CustomTableCell>
                            <CustomTableCell align="left"></CustomTableCell>
                            <CustomTableCell align="left"></CustomTableCell>
                            <CustomTableCell align="left"></CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow className={classes.row} key={row.id}>
                                <CustomTableCell component="th" scope="row">
                                    {row.lName}
                                </CustomTableCell>
                                <CustomTableCell align="left">{row.fName}</CustomTableCell>
                                <CustomTableCell align="left">{row.stu_id}</CustomTableCell>
                                <CustomTableCell align="left">Modify</CustomTableCell>
                                <CustomTableCell align="left">Decline</CustomTableCell>
                                <CustomTableCell align="left">Delete</CustomTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

AdvisorApptTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdvisorApptTable);
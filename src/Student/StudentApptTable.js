import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import moment from 'moment'

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

function lockChecker(lock_data, id, advisingTime, deleteAppointment){
  const now = new Date();
  const d = new Date(advisingTime);
  let endDate = new Date(moment(d, 'YYYY-MM-DD H:mm:ss').add(-lock_data[0].lockDays,'d').format('YYYY-MM-DD H:mm:ss'));
  if (now < d && now > endDate){ //event is in the past
      alert("event is within the lock period set by professor");
  }else{
    deleteAppointment(id);
  }
}


function StudentApptTable(props) {
    const { classes, meeting_data, lock_data, deleteAppointment } = props;
    if (meeting_data) {
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow >
                            <CustomTableCell><h2>First Name</h2></CustomTableCell>
                            <CustomTableCell align="left"><h2>Last Name</h2></CustomTableCell>
                            <CustomTableCell align="left"><h2>Advisor ID</h2></CustomTableCell>
                            <CustomTableCell align="left"><h2>Appointment Time</h2></CustomTableCell>
                            <CustomTableCell align="left"><p> </p></CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {meeting_data.map(student => (
                            <TableRow className={classes.row} key={student.id}>
                                <CustomTableCell component="th" scope="row">
                                    {student.advisor_fName}
                                </CustomTableCell>
                                <CustomTableCell align="left">{student.advisor_lName}</CustomTableCell>
                                <CustomTableCell align="left">{student.advisor_id}</CustomTableCell>
                                <CustomTableCell align="left">{moment(new Date(student.advisingTime), 'MMMM Do YYYY, h:mm a').format('MMMM Do YYYY, h:mm a')}</CustomTableCell>
                                <CustomTableCell align="left">
                                   <Button variant="contained" color="secondary" className={classes.button} onClick={() => lockChecker(lock_data, student.id, student.advisingTime, deleteAppointment)}>
                                       Delete
                                       <DeleteIcon className={classes.rightIcon} />
                                   </Button>
                                </CustomTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
//moment(student.advisingTime, 'MMMM Do YYYY, h:mm:ss a').format('MMMM Do YYYY, h:mm:ss a')
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

StudentApptTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentApptTable);

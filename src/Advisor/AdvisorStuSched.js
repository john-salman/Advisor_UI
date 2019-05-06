import React from "react";
import { render } from "react-dom";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
    Scheduler,
    WeekView,
    Appointments
} from "@devexpress/dx-react-scheduler-material-ui";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import { appointments } from "./testData";
import moment from 'moment';
import axios from "../ConfigAxios";

const theme = createMuiTheme({ palette: { type: "light", primary: blue } });

const schedStyle = {
    width: '65%',
    height: '80%',
};

function format_data(data){
    let formatted_data = data.map( advisee => {
        let startDate = moment(advisee.advising_time);
        let endDate = moment(advisee.advising_time).add(30, 'minute');
        let obj = {};
        obj.title = "Advising Appointment with " + advisee.student_fName + " " + advisee.student_lName;
        obj.startDate = startDate;
        obj.endDate = endDate;
        obj.id = advisee.id;
        return obj;
    });
    return formatted_data;
}

function AdvisorStuSched(props) {
    /*
    componentDidMount() {
        axios.get('meeting/`advisor_id`').then(result => {
            console.log(result.data);
            this.setState({
                student_data: result.data,
            })
        });
    }
    */
    /*
    {
        title: "Book Flights to San Fran for Sales Trip",
        startDate: new Date(2019, 3, 30, 10, 30),
        endDate: new Date(2019, 3, 30, 11, 0),
        id: 1,
        location: "Room 1"
    },
{
    "id": 2,
    "declined": {
    "type": "Buffer",
        "data": [
        1
    ]
},
    "advisor_id": "003456791",
    "advisee_id": "003504589",
    "advisingTime": "2019-05-02T09:00:00.000Z",
    "student_fName": "Barbara",
    "student_lName": "Ramos"
},
*/
/*

*/
    const {meeting_data, selectedDate} = props;

    console.log("It should be here: ", meeting_data);
    let data = meeting_data ? format_data(meeting_data) : [];//this.format_data(this.props.meeting_data);
    console.log("Data now exists: ", data);
    return (
        <MuiThemeProvider theme={theme}>
            <Paper>
                <Scheduler style={schedStyle} data={data}>
                    <ViewState currentDate={selectedDate} />
                    <WeekView startDayHour={9} endDayHour={19} />
                    <Appointments />
                </Scheduler>
            </Paper>
        </MuiThemeProvider>
    );

}

export default AdvisorStuSched

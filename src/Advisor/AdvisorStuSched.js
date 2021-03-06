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
    maxWidth: '65%',
    height: '80%',
    maxHeight: '80%',
    overflow: 'hidden',
};

const fake_data = [
    {
        advisor_id : "003456791",
        advisee_id : "003504589",
        advisingTime : "2019-07-05T02:00:00.000Z",
        student_fName : "Barbara",
        student_lName : "Ramos"
    },
    {
        advisor_id : "003456791",
        advisee_id : "003504589",
        advisingTime : "2019-07-05T15:00:00.000Z",
        student_fName : "John",
        student_lName : "Smith"
    },
    {
        advisor_id : "003456791",
        advisee_id : "003504589",
        advisingTime : "2019-07-06T11:00:00.000Z",
        student_fName : "Barbara",
        student_lName : "Ramos"
    },
];

function format_data(data){
    let formatted_data = data.map( advisee => {
        const d = new Date(advisee.advisingTime);

        let obj = {};
        obj.title = "Advising Appointment with " + advisee.student_fName + " " + advisee.student_lName;
        obj.startDate = new Date(moment(d, 'YYYY-MM-DD H:mm:ss ').format( 'YYYY-MM-DD H:mm:ss'));
        // So in the add() method is where we place the instructor preference for advising meeting length
        obj.endDate = new Date(moment(d, 'YYYY-MM-DD H:mm:ss').add(30,'m').format('YYYY-MM-DD H:mm:ss'));
        obj.id = advisee.id;
        return obj;
    });
    console.log(formatted_data);
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

    const {meeting_data, selectedDate} = props;

    let data = meeting_data ? format_data(meeting_data) : [];

    return (
        <div style={{maxHeight: '80 vh'}}>
        <MuiThemeProvider theme={theme}>
            <Paper>
                <Scheduler style={schedStyle} data={data}>
                    <ViewState currentDate={selectedDate} />
                    <WeekView startDayHour={9} endDayHour={19} />
                    <Appointments />
                </Scheduler>
            </Paper>
        </MuiThemeProvider>
        </div>
    );

}

export default AdvisorStuSched

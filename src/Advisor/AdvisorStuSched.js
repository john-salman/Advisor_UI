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

const theme = createMuiTheme({ palette: { type: "light", primary: blue } });

const schedStyle = {
    width: '65%',
    height: '80%',
};

class AdvisorStuSched extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: appointments
        };
    }

    render() {
        const { data } = this.state;
        console.log(data);
        return (
            <MuiThemeProvider theme={theme}>
                <Paper>
                    <Scheduler style={schedStyle} data={data}>
                        <ViewState currentDate={this.props.selectedDate} />
                        <WeekView startDayHour={9} endDayHour={19} />
                        <Appointments />
                    </Scheduler>
                </Paper>
            </MuiThemeProvider>
        );
    }
}

export default AdvisorStuSched

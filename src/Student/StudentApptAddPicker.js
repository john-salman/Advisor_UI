import React from 'react';
import { DateFormatInput } from 'material-ui-next-pickers'
import TimeFormatInput from "material-ui-next-pickers/dist/timepicker";

function StudentApptAddPicker(props){

    const { date, time, addDate, addTime } = props;
    return (
        <div>
            <DateFormatInput name='date-input' value={date} onChange={addDate}/>
            <TimeFormatInput name='time-input' value={time} onChange={addTime}/>
        </div>
    )
}

export default StudentApptAddPicker;

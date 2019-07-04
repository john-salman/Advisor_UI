import React from 'react';
import { DateFormatInput } from 'material-ui-next-pickers'

class AdvisorStuDate extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
        }
    }

    onChangeDate = event => {
       let date = new Date(event);
        this.setState({date});
        this.props.dateSelect(date);
    };

    render() {
        const { date } = this.state;
        return (
            <div>
                <DateFormatInput name='date-input' value={date} onChange={this.onChangeDate}/>
            </div>
        )
    }
}

export default AdvisorStuDate;

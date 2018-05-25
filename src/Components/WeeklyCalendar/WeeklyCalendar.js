import React, {Component} from 'react';
import DayRow from './DayRow';

class WeeklyCalendar extends Component {

	render() {
		return (
			<div className="weeklyCalendar">
				<DayRow day="Monday" id="Whatever" tasks={this.props.tasks}/>
			</div>
		);
	}
}

export default WeeklyCalendar
import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { SingleDatePicker } from 'react-dates';
import 'rc-time-picker/assets/index.css'; // IDK why this needs to be explicitly imported.
import TimePicker from 'rc-time-picker';
import moment from 'moment';

import './TaskEditForm.css';

// A Component that renders a task creation interface and returns the new task to its
// parent in a callback.
class TaskEditForm extends Component {
	constructor(props){
		super(props);

		this.state = {
			dueDate: null,
			focused: false,
		}

		this.newTitle = '';
		this.newDesc = '';
		// These exist also -- nothing to init them with.
		// this.startTime;
		// this.endTime;

		this.onSubmitClicked = this.onSubmitClicked.bind(this);
	}

	// Called when the submit button is clicked. Combines some properties to create the newTask object and return it in a callback.
	onSubmitClicked(){
		this.props.onCreate && this.props.onCreate({
			title: this.newTitle,
			description: this.newDesc,
			due: this.state.dueDate.format(),
			startTime: this.startTime.format(),
			endTime: this.endTime.format(),
		});
		this.setState({dueDate: null});
		this.newTitle = this.newDesc = "";
	}

	render() {
		const buttonGroup = (
			<div className={'buttonGroup' + (this.state.focused ? ' hidden' : '')}>
				<RaisedButton className="buttons">Cancel</RaisedButton>
				<RaisedButton className="buttons" primary={true} onTouchTap={this.onSubmitClicked}>Submit</RaisedButton>
			</div>
		);
		return(
			<div>
				<div className="fields">
					<div>
						<label className="fieldLabel">Title:</label>
						<TextField
							hintText={'Title'}
							defaultValue={this.props.defaultTitle}
							onChange={(e, val)=>{
								this.newTitle = val;
							}
						}/>
					</div>
					<div>
						<label className="fieldLabel">Description:</label>
						<TextField
							hintText={'Description'}
							defaultValue={this.props.defaultDescription}
							onChange={(e, val)=>{
								this.newDesc = val;
							}
						}/>
					</div>
					<div className="datePicker">
						<label className="fieldLabel">Due Date:</label>
						<SingleDatePicker
							date={this.state.date}
							onDateChange={date => {
								this.setState({dueDate: date});
								console.log(date.format());
							}}
							focused={this.state.focused}
							onFocusChange={({ focused }) => this.setState({ focused })}
							numberOfMonths={1}
						/>
					</div>
					<div>
						<label className="fieldLabel">Start Time:</label>
						<TimePicker
							showSecond={false}
							defaultValue={moment().hour(0).minute(0)}
							onChange={(val)=>{
								this.endTime = val;
							}}
							use12Hours
						/>
					</div>
					<div>
						<label className="fieldLabel">End Time:</label>
						<TimePicker
							showSecond={false}
							defaultValue={moment().hour(0).minute(0)}
							onChange={(val)=>{
								this.startTime = val;
							}}
							use12Hours
						/>
					</div>
				</div>
				{this.state.focused ? null : buttonGroup}
			</div>
		);
	}
}

export default TaskEditForm;
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
			focused: false,
		}

		if(props.task){
			this.startTime = props.task.startTime;
			this.endTime = props.task.endTime;
			this.due = props.task.due;
			this.id = props.task.id;
		}

		this.id;
		this.newTitle = '';
		this.newDesc = '';
		// These exist also -- nothing to init them with.
		this.startTime;
		this.endTime;
		this.due;

		this.onSubmitClicked = this.onSubmitClicked.bind(this);
	}

	componentWillRecieveProps(nextProps){
		if(nextProps.task){
			this.startTime = nextProps.task.startTime;
			this.endTime = nextProps.task.endTime;
			this.due = nextProps.task.due;
			this.id = nextProps.task.id;
		}
	}
	// Called when the submit button is clicked. Combines some properties to create the newTask object and return it in a callback.
	onSubmitClicked(){
 		this.props.onSave && this.props.onSave({
			title: this.newTitle,
			description: this.newDesc,
			id: this.id,
			//due: this.due.format(),
			//startTime: this.startTime.format(),
			//endTime: this.endTime.format(),
		});
		this.setState({due: null});
		this.newTitle = this.newDesc = "";
	}

	render() {
		const buttonGroup = (
			<div className={'buttonGroup' + (this.state.focused ? ' hidden' : '')}>
				<RaisedButton className="buttons" onClick={this.props.onCancel}>Cancel</RaisedButton>
				<RaisedButton className="buttons" primary={true} onClick={this.onSubmitClicked}>Submit</RaisedButton>
				<RaisedButton className="buttons" backgroundColor={'red'} onClick={this.props.onDelete}>Delete</RaisedButton>

			</div>
		);

		if(this.props.task){
			this.newTitle = this.props.task.title;
			this.newDescription = this.props.task.description
		}
		return(
			<div style={{textAlign: 'left'}}>
				<div className="fields">
					<div>
						<label className="fieldLabel">Title:</label>
						<TextField
							hintText={'Title'}
							defaultValue={this.newTitle}
							onChange={((e, val)=>{
								this.newTitle = val;
							}).bind(this)
						}/>
					</div>
					<div>
						<label className="fieldLabel">Description:</label>
						<TextField
							hintText={'Description'}
							value={this.newDescription}
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
								this.setState({due: date});
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
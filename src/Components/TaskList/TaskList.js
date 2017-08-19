import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper'
import Edit from 'material-ui/svg-icons/image/edit'
import moment from 'moment';
import Dialog from 'material-ui/Dialog';
import TaskEditForm from '../TaskEditForm/TaskEditForm';

import './TaskList.css';
/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class TaskList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
		};

		this.editObject = {};

		this.handleEditOpen = this.handleEditOpen.bind(this);
		this.handleEditClose = this.handleEditClose.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}
	handleEditOpen(taskObject){
		this.setState({open: true});
		this.editObject = taskObject;
	}
	handleEditClose(){
		this.setState({open: false});
	}
	handleSubmit(){
		this.handleEditClose();
		this.props.onTaskEdit(this.editObject.id, this.editObject);
	}
	render() {
		let tasks = this.props.tasks.map((object, index)=>{
			let divider = index < this.props.tasks.length - 1 ? <div className="divider"/> : null;
			let scheduleButton = !object.event ? <RaisedButton className="scheduleButton" label={'schedule'} primary={true}/> : null;
			let date = moment(object.due).format('dddd');
			return(
				<div key={index}>
					<div className="taskContainer">
						<label className="title">{object.title}</label>
						<div className="right Section">
							<label className="due">{date}</label>
							{scheduleButton}
							<RaisedButton icon={<Edit/>} onTouchTap={()=>{
								this.handleEditOpen(object);
							}}/>
						</div>
					</div>
					{divider}
				</div>
			);
		});

		const editActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleEditClose}
      />,
      <FlatButton
        label="Apply"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit}
      />
    ];

		return (
			<Paper className="taskListContainer">
				{tasks}
				<Dialog 
					Title="Edit Task"
					modal={false}
					open={this.state.open}
					actions={editActions}
					onRequestClose={this.handleEditClose}
				>
					<TaskEditForm />
				</Dialog>
			</Paper>

		);
	}
}
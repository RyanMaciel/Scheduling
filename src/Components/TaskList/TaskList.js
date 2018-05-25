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
			editObject: undefined,
		};


		this.handleEditOpen = this.handleEditOpen.bind(this);
		this.handleEditClose = this.handleEditClose.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}
	handleEditOpen(taskObject){
		//If the edit object is the same, close the dialog.
		if(this.state.editObject === taskObject){
			this.handleEditClose();
		}else{
			//Otherwise update the edit object so that a rerender will happen that displays it.
			this.setState({
				editObject: taskObject,
			});
		}
	}
	handleEditClose(){
		this.setState({editObject: undefined});
	}
	handleSubmit(){
		this.handleEditClose();
		this.props.onTaskEdit(this.state.editObject.id, this.state.editObject);
	}

	render() {
		
		// Create list items for every task.
		let tasks = this.props.tasks.map((object, index)=>{
			let divider = index < this.props.tasks.length - 1 ? <div className="divider"/> : null;

			// If this object === the edit object, create an edit dialog.
			let edit;
			if(this.state.editObject === object){
				 edit = (
				 	<div style = {{padding: '15px 40px'}}>
					 	<TaskEditForm task={this.state.editObject} onCancel={this.handleEditClose} onSave={(task)=>{
							this.props.onTaskEdit(task.id, task)
						}}/>
					</div>)
			}

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
						{edit}
					{divider}
				</div>
			);
		});
		return (
			<Paper className="taskListContainer">
				{tasks}
			</Paper>

		);
	}
}
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper'
import Edit from 'material-ui/svg-icons/image/edit'
import Dialog from 'material-ui/Dialog';
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
		this.props.onTaskEdit(this.editObject.id, this.editObject);
	}
	render() {
		let taskData = [
			{
				title: 'Do Section 1',
				due: '12/12/12',
			},
			{
				title: 'Do Section 2',
				due: '12/12/12',
			},
			{
				title: 'Do Section 3',
				due: '12/12/12',
			}
		];

		let tasks = this.props.tasks.map((object, index)=>{
			let divider = index < this.props.tasks.length - 1 ? <div className="divider"/> : null;
			let scheduleButton = !object.event ? <RaisedButton className="scheduleButton" label={'schedule'} primary={true}/> : null;
			return(
				<div key={index}>
					<div className="taskContainer">
						<label className="title">{object.title}</label>
						<div className="right Section">
							<label className="due">{object.due}</label>
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
        onTouchTap={()=>{this.setState({open: false});}}
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
					<label>Title</label>
					<TextField defaultValue={this.editObject.title}
					onChange={(e, newVal)=>{
						this.editObject.title = newVal;
					}} />
					<label>Due Date</label>
					<TextField defaultValue={this.editObject.due}
					onChange={(e, newVal)=>{
						this.editObject.due = newVal;
					}} />
				</Dialog>
			</Paper>

		);
	}
}
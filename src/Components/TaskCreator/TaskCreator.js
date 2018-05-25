import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import TaskEditForm from '../TaskEditForm/TaskEditForm';
import './TaskCreator.css';


// A Component that renders a task creation interface and returns the new task to its
// parent in a callback.
class TaskCreator extends Component {
	render() {
		return(
			<Paper className="taskCreator">
				<h3>Create New Task</h3>
				<TaskEditForm onCreate={this.props.onSave} />
			</Paper>
		);
	}
}

export default TaskCreator;
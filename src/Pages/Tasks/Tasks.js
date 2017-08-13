import React, {Component} from 'react';
import {connect} from 'react-redux';
import {taskEdited} from '../../Helpers/Actions';
import TaskList from '../../Components/TaskList';
import './Tasks.css'
class Tasks extends Component {

	render() {

		//Sort through the task prop and sort between scheduled and unscheduled.
		let scheduled = [];
		let unscheduled = [];

		console.log(this.props.tasks);
		Object.keys(this.props.tasks).forEach((key)=>{
			let object = this.props.tasks[key];
			if(object.event){
				scheduled.push(object);
			}else{
				unscheduled.push(object);
			}
		});

		return (
			<div className="tasks">
				<label className="titleLabel">Unscheduled</label>
				<div className="unscheduled">
					<TaskList tasks={unscheduled} onTaskEdit={this.props.taskEdited}/>
				</div>
				<label className="titleLabel">Scheduled</label>
				<div className="scheduled">
					<TaskList tasks={scheduled} onTaskEdit={this.props.taskEdited}/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks
  }
}

const mapDispatchToProps = dispatch => {
  return {
  	taskEdited: (id, updatedTask) => {
  		dispatch(taskEdited(id, updatedTask))
  	}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);

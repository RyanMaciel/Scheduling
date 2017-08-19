import React, {Component} from 'react';
import {connect} from 'react-redux';
import {taskEdited, taskCreated} from '../../Helpers/Actions';

class Weekly extends Component {

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
  	},
  	taskCreated: (newTask) => {
  		dispatch(taskCreated(newTask));
  	}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Weekly);

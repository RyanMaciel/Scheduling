import React, {Component} from 'react';
import './Sidebar.css';

export default class DialogModal extends Component {
	render() {
		return (
			<div className="sidebar">
				<div className="cell" onTouchTap={()=>{
						this.props.onButtonPress('Weekly');
					}}
				>
					<label>Weekly</label>
				</div>
				<div className="divider"/>
				<div className="cell" onTouchTap={()=>{
						this.props.onButtonPress('Tasks');
					}}
				>					<label>Tasks</label>
				</div>
				<div className="divider"/>
				<div className="cell" onTouchTap={()=>{
						this.props.onButtonPress('Projects');
					}}
				>
					<label>Projects</label>
				</div>
			</div>
		);
	}
}
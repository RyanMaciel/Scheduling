import React, {Component} from 'react';
import './Sidebar.css';

export default class DialogModal extends Component {
	render() {
		return (
			<div className="sidebar">
				<div className="cell">
					<label>Weekly</label>
				</div>
				<div className="divider"/>
				<div className="cell">
					<label>Tasks</label>
				</div>
				<div className="divider"/>
				<div className="cell">
					<label>Projects</label>
				</div>
			</div>
		);
	}
}
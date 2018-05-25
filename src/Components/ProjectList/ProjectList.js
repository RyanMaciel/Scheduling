import React, {Component} from 'react';

export default class ProjectList extends Component {
	
	render() {
		let projects = [
			"This is a project",
			{
				name: 'this is also a project',
				children: [
					'sub1',
					'sub2'
				]
			},
			'nNOPE',
			{
				name: 'this is also a project',
				children: [
					'sub1',
					'sub2'
				]
			}
		];

		let projectDom = projects.map((object)=>{
			if(typeof object === 'string'){
				return (<div><label className="project">{object}</label></div>)
			}else{
				let subObjectNames = object.children.map((subProj)=>{
					return (<div><label className="project">{'    ' + subProj}</label></div>)
				});
				return (
					<div>
						<div>
							<label className="project">{object.name}</label>
						</div>
						<div>
							{subObjectNames}
						</div>
					</div>
				)
			}
		});
		return (
			<div>
				{projectDom}
			</div>
		);
	}
}
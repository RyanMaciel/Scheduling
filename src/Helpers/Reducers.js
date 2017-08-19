function mainReducer(state, action){
	if(!state){
		state = {userData: {}, events: [], tasks: {}, Categories: []}
	}
	state = {
		tasks: tasksReducers(state.tasks, action),
	}

	if(action.type === 'Tasks_Populated' ||  action.type === 'Task_Edit' || action.type === 'Task_Created'){
		window.localStorage.setItem('tasks', JSON.stringify(state.tasks));
	}

	return state;
}
function tasksReducers(state, action){
	switch(action.type){
		case 'Tasks_Populated':
			return action.payload;
		case 'Task_Edit':
			let newTaskObject = {};
			newTaskObject[action.payload.id] = action.payload.updatedTask;
			return Object.assign({}, state, newTaskObject);
		case 'Task_Created':
			let newEntry = {};
			newEntry[parseInt(Math.random()*1000000000, 10)] = action.payload;
			return Object.assign({}, state, newEntry);
		default:
			return state;
	}
}
export default mainReducer;

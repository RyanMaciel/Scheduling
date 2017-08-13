function mainReducer(state, action){
	if(!state){
		state = {userData: {}, events: [], tasks: {}, Categories: []}
	}
	state = {
		tasks: tasksReducers(state.tasks, action),
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
	}
}
export default mainReducer;

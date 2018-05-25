export function thisIsAnAction(stuff){
	return {type: 'This_Is_An_Action', payload: stuff};
}

export function tasksPopulated(tasks){
	return {type: 'Tasks_Populated', payload: tasks};
}

export function taskEdited(id, updatedTask){
	return {type: 'Task_Edited', payload: {id, updatedTask}}
}

export function taskDeleted(id){
	return {type: 'Task_Deleted', payload: {id}}
}
export function taskCreated(taskObject){
	return {type: 'Task_Created', payload: taskObject};  
}
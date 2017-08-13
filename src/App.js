import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './App.css';

import Tasks from './Pages/Tasks/Tasks';
import Sidebar from './Components/Sidebar/Sidebar';
import {Provider} from 'react-redux';
import reducer from './Helpers/Reducers';
import { createStore } from 'redux';
import {tasksPopulated} from './Helpers/Actions';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

let store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

//Populate from localStorage.
if(window.localStorage.tasks){
	store.dispatch(tasksPopulated(JSON.parse(window.localStorage.tasks)));
}

class App extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<Provider store={store}>
				<MuiThemeProvider>
					<div className="App">
						<Sidebar />
						<div className="pageContents">
							<Tasks />
						</div>
					</div>
				</MuiThemeProvider>
			</Provider>
		);  
	}
}

export default App;

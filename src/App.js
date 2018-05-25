import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './App.css';
import 'react-dates/lib/css/_datepicker.css';

import Tasks from './Pages/Tasks/Tasks';
import Projects from './Pages/Projects/Projects';
import Weekly from './Pages/Weekly/Weekly';
import Sidebar from './Components/Sidebar/Sidebar';
import {Provider} from 'react-redux';
import reducer from './Helpers/Reducers';
import { createStore } from 'redux';
import {tasksPopulated} from './Helpers/Actions';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

//Connect store to redux devtools extention.
let store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

//Populate from localStorage.
if(window.localStorage.tasks){
	store.dispatch(tasksPopulated(JSON.parse(window.localStorage.tasks)));
}

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			currentPage: 'Weekly',
		};
	}
	render() {
		let currentPage;
		switch(this.state.currentPage){
			case 'Tasks':
				currentPage = <Tasks />;
				break;
			case 'Projects': 
				currentPage = <Projects />;
				break;
			default: 
				currentPage = <Weekly />;
		}
		return (
			<Provider store={store}>
				<MuiThemeProvider>
					<div className="App">
						<Sidebar onButtonPress={(buttonName)=>{
							this.setState({currentPage: buttonName});
						}}/>
						<div className="pageContents">
							{currentPage}
						</div>
					</div>
				</MuiThemeProvider>
			</Provider>
		);  
	}
}

export default App;

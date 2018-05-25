import React, {Component} from 'react';
import SVG from 'svg.js';
class DayRow extends Component {

	constructor(props){
		super(props);
		this.cellWidth = 150;
		this.cellHeight = 100;
		this.chartOffset = 30; // The offset of the actual grid from the top of the canvas subelement to give room for date labels.
		this.mouseClicked = false;
		this.intitialDragPosition;
		this.initialOffset;
	}

	//Get the display width of the given text with font.
	getTextWidth(text, font){

		if(font === undefined){
			font = '12pt sans-serif';
		}
    // if given, use cached canvas for better performance
    // PERFORMANCE: is this actually happening?
    var canvas = this.getTextWidth.canvas || (this.getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    console.log()

    //I hate myself but I can't fix this right now.
    return metrics.width * 0.8;
	}

	//Adds appropriate newlines and ellipsi to fit text into a size with svg. Not equipped to deal with svg transformations.
	formatTextForSize(text, fitHeight, fitWidth){
		console.log(text);
		let width = this.getTextWidth(text);
		if(width < fitWidth) return text;

		//Number of characters that should be in a line
		let lineCharacterCount = parseInt(text.length * (fitWidth / width));

		var remainingCharacters = text.length;
		var lastSplitIndex = 0;
		var linefragments = [];

		//these kinds of loops are scary...
		var iterations = 0;
		while (remainingCharacters > lineCharacterCount && iterations < 50){
			iterations++;

			//Search through string to find whitespace between words
			var wordSplitIndice = lastSplitIndex + lineCharacterCount

			//decrementing will be much faster than incrementing.
			for(var i = wordSplitIndice - 1; i > 0; i--){
				// possibly change to the whitespace regex in the future?
				if(text[i] === ' '){
					wordSplitIndice = i; 
					break;  // faster than checking every time
				}
			}
			remainingCharacters -= (wordSplitIndice - lastSplitIndex);
			linefragments.push(text.slice(lastSplitIndex, wordSplitIndice + 1))
			lastSplitIndex = wordSplitIndice;

		}
		 linefragments.push(text.slice(wordSplitIndice));
		return linefragments.join('\n');

	}

	//Get coordinates of the top left corner of an event starting at the time.
	getPositionOfTime(date){
		let y = (date.getDay()) * this.cellHeight + this.chartOffset;
		let x = (date.getHours()-1) * this.cellWidth;
		return {x: x, y: y};
	}

	createEvent(canvas, title, description, startDate, endDate){

		let startPos = this.getPositionOfTime(startDate);
		let endPos = this.getPositionOfTime(endDate);
		let nested = canvas.nested();
		nested.rect(startPos.x - endPos.x, 100)
			.attr({fill: '#AD2831'})
			.radius(10);

		nested.text(title)
			.font({anchor: 'left', fill: '#fff'})
			.move(10, 10);

		nested.text(this.formatTextForSize(description, 60, 180))
			.font({anchor: 'left', fill: '#fff', family: 'Helvetica', size: 12})
			.move(10, 30);

		nested.move(startPos.x, startPos.y);
		return nested;
	}

	createScheduleGrid(element){

		//Add time labels.
		for(let i = 0; i < 24; i++){
			let text = element.text((i+1) + ':00')
				.font({anchor: 'middle'})
				.move(i*this.cellWidth, 10);
		}

		//Creates the grid
		for(var j = 0; j < 7; j++){
			for(var i = 0; i < 24; i++){
				let rect = element.rect(this.cellWidth, this.cellHeight).attr({ fill: ((i % 2) === 0 ? '#f4f4f4' : '#fff')}).move(i*this.cellWidth, j*this.cellHeight + this.chartOffset);
			
				// vertical border -- only draw one for each column for efficiency, but do it on the last j so that it doesnt get drawn over.
				if(j==6)element.rect(1, 7*this.cellHeight).attr({fill: '#aaa'}).move(i*this.cellWidth, this.chartOffset);
			}
			// horizontal border
			element.rect(24*this.cellWidth, 1).attr({fill: '#aaa'}).move(0, j*this.cellHeight + this.chartOffset);
		}

		//Add Borders on the right and bottom edges.
		element.rect(1, 7*this.cellHeight).attr({fill: '#aaa'}).move(24*this.cellWidth, this.chartOffset);
		element.rect(24*this.cellWidth, 1).attr({fill: '#aaa'}).move(0, 7*this.cellHeight + this.chartOffset);

	}

	dayColumn(canvas){

		//background then right border.
		canvas.rect(100, 700 + this.chartOffset).attr({fill: '#fff'})
		canvas.rect(1, 700 + this.chartOffset).attr({fill: '#aaa'}).move(100, 0);

		let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		days.forEach((dayTitle, index)=>{

			canvas.text(dayTitle).font({anchor: 'middle'}).move(50, (this.cellHeight*index) + this.chartOffset + 50);


			//Add Separator
			canvas.rect(100, 1).attr({fill: '#aaa'}).move(0, (this.cellHeight*(index+1)) + this.chartOffset);

		});
	}
	// After dom.
	componentDidMount(){
		let width = 1400;
		let height = 1000;
		let canvas = SVG(this.props.id).size(width, height);
		

		
		let grid = canvas.nested();

		//mutates grid, adding a grid to it.
		this.createScheduleGrid(grid);
		grid.move(100, 0);

		this.dayColumn(canvas);

		//Add all events
		Object.keys(this.props.tasks).forEach((key)=>{
			let object = this.props.tasks[key];
			this.createEvent(grid, object.title, object.description, new Date(object.startTime), new Date(object.endTime));
		});


		document.querySelector('#' + this.props.id).addEventListener('mousedown', ((e)=>{
			this.mouseClicked = true;			
		}).bind(this));
		document.querySelector('#' + this.props.id).addEventListener('mouseup', ((e)=>{
			this.intitialDragPosition = this.initialOffset = undefined;
			this.mouseClicked = false;
		}).bind(this));

		document.querySelector('#' + this.props.id).addEventListener('mousemove', ((e)=>{
			let x = e.clientX
			if(this.mouseClicked === true){
				if(this.intitialDragPosition === undefined)this.intitialDragPosition = x;
				if(this.initialOffset === undefined)this.initialOffset = grid.x();
				let newPosition = this.initialOffset + (x - this.intitialDragPosition)
				if(newPosition < 100)grid.attr({x:newPosition});
			}
		}).bind(this));
	}

	render() {
		let containerStyle = {
			height: '100px',
			textAlign: 'left',
			display: 'flex',
		}
		let leftStyle = {
			height: '100px',
			width: '100px',
		}
		return (
			<div style={containerStyle}>
				<div id={this.props.id} />
			</div>
		);
	}
}

export default DayRow

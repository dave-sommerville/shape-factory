'use strict';
/*---------------------------------------------->
Utility Functions 
<-----------------------------------------------*/

function select(selector, scope = document) {
	return scope.querySelector(selector);
}

function listen(event, element, callback) {
	return element.addEventListener(event, callback);
}

/*---------------------------------------------->
Declarations 
<-----------------------------------------------*/

const newBtn = select('.new');
const divWrapper = select('.element-wrapper');
const shapeTypeDropdown = select('.shape-type');
const shapeColorDropdown = select('.shape-color');
const detailsDisplay = select('.details-display');

const shapeIDs = [];
const MAX_SHAPES = 50;

/*---------------------------------------------->
Class Prototype
<-----------------------------------------------*/

class Shape {
	constructor(type, color, id) {
		this.type = type;
		this.color = color;
		this.id = id;
	}
	set type(type) {
		this._type = type;
	}
	set color(color) {
		this._color = color;
	}
	set id(id) {
		this._id = id;
	}
		// Andre, I feel like I should be utilizing these getter functions more, but
		// this was the only way I could make it work 
	get type() {
			return this._type;
	}
	get color() {
			return this._color;
	}
	get id() {
			return this._id;
	}

	createDiv() {
			const shapeDiv = document.createElement('div');
			shapeDiv.style.backgroundColor = this._color;
			shapeDiv.classList.add(this._type);
			shapeDiv.id = this._id;

			listen('click', shapeDiv, () => {
				detailsDisplay.textContent = `Shape Type: ${this.type}\nColor: ${this.color}\nID: ${this.id}`;
			});

			return shapeDiv;
	}
}

/*---------------------------------------------->
Button Listener 
<-----------------------------------------------*/


listen('click', newBtn, () => {
	const selectedShape = shapeTypeDropdown.value;
	const selectedColor = shapeColorDropdown.value;

if (shapeIDs.length >= MAX_SHAPES) {
	detailsDisplay.textContent = (`Maximum of ${MAX_SHAPES} shapes can be created.`);
	return; 
}
	const newID = shapeIDs.length;
	shapeIDs.push(newID); 

	const newShape = new Shape(selectedShape, selectedColor, newID);
	divWrapper.appendChild(newShape.createDiv());
});

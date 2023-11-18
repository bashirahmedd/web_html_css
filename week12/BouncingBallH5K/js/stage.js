/**
 * http://www.kineticjs.com/ Customized according the Bouncing Ball game
 */
Game.Stage = function(rootId, width, height) {
	/* container */

	this.rootNode = document.getElementById(rootId);
	this.container = document.createElement('div');

	this.width = width;
	this.height = height;
	this.listen();

	// ms
	// desktop flags
	this.mousePos = null;
	this.mouseDown = false;
	this.mouseUp = false;

	// mobile flags
	this.touchPos = null;
	this.touchStart = false;
	this.touchEnd = false;

	/* show measurement in pixels */
	this.frameWidth = 50;
	/*
	 * must be in odd number, so that the stroke width could distribute evenly 
	 * on either side of the drawing location
	 */
	this.frameLine = 3;

	/* main game animation canvas */
	this.canvas = document.createElement('canvas');
	this.context = this.canvas.getContext('2d');
	this.canvas.id='cnsMain';
	this.canvas.width = width;
	this.canvas.height = height;
	this.canvas.style.position = 'absolute';
	this.canvas.style.zIndex = '11000';
	
	/*Alphabet background for the playarea*/
	this.cnsAlphabetBG = document.createElement('canvas');
	this.ctxtAlphabetBG = this.cnsAlphabetBG.getContext('2d');
	this.cnsAlphabetBG.id='cnsAlphabet';
	this.cnsAlphabetBG.width = width;
	this.cnsAlphabetBG.height = height;
	this.cnsAlphabetBG.style.position = 'absolute';
	this.cnsAlphabetBG.style.zIndex = '10000';
	
		
	/* border frame canvas for the playing area */
	this.cnsPlayingArea = document.createElement('canvas');
	this.ctxtPlayingArea = this.cnsPlayingArea.getContext('2d');
	this.cnsPlayingArea.id='cnsPlayingAreaFrame';
	this.cnsPlayingArea.width = width + 2 * this.frameWidth + 2 * this.frameLine;
	this.cnsPlayingArea.height = height + this.frameWidth + 2 * this.frameLine;
	this.cnsPlayingArea.style.position = 'absolute';
	this.cnsPlayingArea.style.zIndex = '9000';
		
	/* Score Board canvas */
	this.cnsScoreBoard = document.createElement('canvas');	
	this.ctxtScoreBoard = this.cnsScoreBoard.getContext('2d');
	this.cnsScoreBoard.id='cnsScoreBoard';
	this.cnsScoreBoard.width = width + 2 * this.frameWidth + 2 * this.frameLine;
	this.cnsScoreBoard.height = height + this.frameWidth + 2 * this.frameLine;
	this.cnsScoreBoard.style.position = 'absolute';
	this.cnsScoreBoard.style.zIndex = '8000';
	
	this.container.appendChild(this.cnsAlphabetBG);
	this.container.appendChild(this.cnsScoreBoard);
	this.container.appendChild(this.cnsPlayingArea);
	this.container.appendChild(this.canvas);
	this.rootNode.appendChild(this.container);

	/* styles work after appending */
	this.container.style.height = height + this.frameWidth + 2 * this.frameLine + 'px';
	this.container.style.width = '100%';	
	/* use chrome element selection to adjust */
	this.canvas.style.left = (this.frameWidth + this.frameLine) + 'px'; 
	this.cnsAlphabetBG.style.left = (this.frameWidth + this.frameLine) + 'px'; 
};

/*
 * get mouse position for desktop apps
 */
Game.Stage.prototype.getMousePos = function(evt) {
	return this.mousePos;
};

Game.Stage.prototype.listen = function() {
	var that = this;

	// desktop events
	this.container.addEventListener("mousedown", function(evt) {
		that.mouseDown = true;
		that.handleEvent(evt);
	}, false);

	this.container.addEventListener("mousemove", function(evt) {
		that.mouseUp = false;
		that.mouseDown = false;
		that.handleEvent(evt);
	}, false);

	this.container.addEventListener("mouseup", function(evt) {
		that.mouseUp = true;
		that.mouseDown = false;
		that.handleEvent(evt);
	}, false);

	this.container.addEventListener("mouseover", function(evt) {
		that.handleEvent(evt);
	}, false);

	this.container.addEventListener("mouseout", function(evt) {
		that.mousePos = null;
	}, false);
	// mobile events
	this.container.addEventListener("touchstart", function(evt) {
		evt.preventDefault();
		that.touchStart = true;
		that.handleEvent(evt);
	}, false);

	this.container.addEventListener("touchmove", function(evt) {
		evt.preventDefault();
		that.handleEvent(evt);
	}, false);

	this.container.addEventListener("touchend", function(evt) {
		evt.preventDefault();
		that.touchEnd = true;
		that.handleEvent(evt);
	}, false);
};

Game.Stage.prototype.handleEvent = function(evt) {
	if (!evt) {
		evt = window.event;
	}

	this.setMousePosition(evt);
	// this.setTouchPosition(evt);
};

Game.Stage.prototype.setMousePosition = function(evt) {
	var mouseX = evt.clientX - this.getContainerPos().left + window.pageXOffset;
	var mouseY = evt.clientY - this.getContainerPos().top + window.pageYOffset;
	mouseX -= this.canvas.offsetLeft;
	mouseY -= this.canvas.offsetTop;
	this.mousePos = {
		x : mouseX,
		y : mouseY
	};
};

/*
 * get container position
 */
Game.Stage.prototype.getContainerPos = function() {
	var obj = this.container;
	var top = 0;
	var left = 0;
	while (obj.tagName != "BODY") {
		top += obj.offsetTop;
		left += obj.offsetLeft;
		obj = obj.offsetParent;
	}
	return {
		top : top,
		left : left
	};
};

/**
 * All getter for the stage object
 */
Game.Stage.prototype.getCanvas = function() {
	return this.canvas;
};

Game.Stage.prototype.getPlayingAreaCanvas = function() {
	return this.cnsPlayingArea;
};

Game.Stage.prototype.getScoreBoardCanvas = function() {
	return this.cnsScoreBoard;
};

Game.Stage.prototype.getAlphabetBGCanvas = function() {
	return this.cnsAlphabetBG;
};

Game.Stage.prototype.getContainer = function() {
	return this.container;
};

Game.Stage.prototype.getContext = function() {
	return this.context;
};

Game.Stage.prototype.getPlayingAreaContext = function() {
	return this.ctxtPlayingArea;
};

Game.Stage.prototype.getScoreBoardContext = function() {
	return this.ctxtScoreBoard;
};

Game.Stage.prototype.getAlphabetBGContext = function() {
	return this.ctxtAlphabetBG;
};

console.log("loaded script file: stage.js");
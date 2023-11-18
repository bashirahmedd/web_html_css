
/*************************************************************************************************************
 * Main Canvas Text Painter
 */

Game.TextPaintController = function(stage) {
	this.stage = stage;
	this.canvas = this.stage.getCanvas();
	this.context = this.stage.getContext();

	this.canvasText = new CanvasText();
	this.canvasText.setCanvas(this.canvas);
	this.canvasText.config({
		canvasId : "null", // inject from the framework
		fontFamily : "monospace",
		fontSize : "14px",
		fontWeight : "normal",
		fontColor : "#000000",
		lineHeight : "12"
	});

	this.canvasText.defineClass("heading1", {
		fontSize : "35px",
		fontWeight : "bold"
	});

	this.canvasText.defineClass("heading2", {
		fontSize : "20px",
		fontWeight : "bold"
	});
};

/**
 * method to paint text of the main game canvas
 */
Game.TextPaintController.prototype.paintPrompt = function(prompt, clearCanvas) {
	var that = this;
	if (clearCanvas) {
		gs.game.paintConroller.clearAll();
	}
	for ( var i = 0; i < prompt.length; ++i) {
		this.canvasText.drawText({
			text : prompt[i].text,
			x : that.canvas.width * 0.03,
			y : prompt[i].y
		});
	}
};

/*************************************************************************************************************
 * ScoreBoard Canvas Text Painter
 */

Game.ScoreBoardTextPaintController = function(stage) {
	this.stage = stage;
	this.canvas = this.stage.getScoreBoardCanvas();
	this.context = this.stage.getScoreBoardContext();

	this.canvasText = new CanvasText();
	this.canvasText.setCanvas(this.canvas);
	this.canvasText.config({
		canvasId : "null", // inject from the framework
		fontFamily : "monospace",
		fontSize : "14px",
		fontWeight : "normal",
		fontColor : "#000000",
		lineHeight : "12"
	});

	this.canvasText.defineClass("heading1", {
		fontSize : "35px",
		fontWeight : "bold"
	});

	this.canvasText.defineClass("heading2", {
		fontSize : "20px",
		fontWeight : "bold"
	});
};
/**
 * method to paint text of the ScoreBoard canvas
 */
Game.ScoreBoardTextPaintController.prototype.paintPrompt = function(prompt, clearCanvas) {
	var that = this;
	if (clearCanvas) {
		//gs.game.paintConroller.clearAll();
	}
	for ( var i = 0; i < prompt.length; ++i) {
		this.canvasText.drawText({
			text : prompt[i].text,
			x : that.canvas.width * 0.03,
			y : prompt[i].y
		});
	}
};
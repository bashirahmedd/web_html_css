/*************************************************************************************************************
 * Main Painter for game objects
 */

Game.PaintController = function(stage) {
	this.stage = stage;
	this.canvas = this.stage.getCanvas();
	this.context = this.stage.getContext();

	// playArea
	this.cnsPlayingArea = this.stage.getPlayingAreaCanvas();
	this.ctxtPlayingArea = this.stage.getPlayingAreaContext();
};

Game.PaintController.prototype.drawGameFrame = function() {
	this.context.beginPath();
	this.ctxtPlayingArea.lineWidth = this.stage.frameLine;
	this.ctxtPlayingArea.strokeStyle = "#000000";
	this.context.shadowColor = "black";
	this.context.shadowBlur = 4;
	/* use chrome element selection to adjust */
	this.ctxtPlayingArea.strokeRect(this.stage.frameWidth - this.stage.frameLine, (this.stage.frameLine - 1) / 2, gs.screen.width, gs.screen.height);
	this.context.shadowBlur = 0;
};

Game.PaintController.prototype.drawBall = function(ball) {
	this.context.beginPath();
	this.context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
	this.context.fillStyle = ball.color;
	this.context.fill();
};
/**
 * publice method to draw defender tile
 * 
 * @param tile
 */
Game.PaintController.prototype.drawTile = function(tile) {
	//console.log(tile.toString());
	//if (tile.x > 0 && tile.gradientPostion >=0 && tile.gradientPostion <=1) { /*x must be +ve and skip min and max boundaries*/
	if (tile.x > 0) { /*x must be +ve and skip min and max boundaries*/
		this.context.beginPath();
		this.context.rect(tile.x, tile.y, tile.width, tile.height);
		var grd = this.context.createLinearGradient(tile.x, 0, tile.x + tile.width, 0);
		grd.addColorStop(tile.gradientPostion, tile.weekcolor);
		grd.addColorStop(tile.gradientPostion, tile.color);
		this.context.fillStyle = grd;
		this.context.fill();
	}
};

Game.PaintController.prototype.drawBrick = function(brick) {
	this.context.beginPath();
	this.context.rect(brick.x, brick.y, brick.width, brick.height);
	this.context.fillStyle = brick.fillStyle;
	this.context.fill();
	this.context.lineWidth = brick.borderLineW;
	this.context.strokeStyle = brick.strokeStyle;
	this.context.stroke();
};

Game.PaintController.prototype.drawBrickWithLinearGradient = function(brick) {
	this.context.beginPath();
	this.context.rect(brick.x, brick.y, brick.width, brick.height);
	var grd = this.context.createLinearGradient(brick.x, 0, brick.x + brick.width, 0);
	grd.addColorStop(0.3, brick.fillStyle);
	grd.addColorStop(0.5, "#FFFFFF");
	grd.addColorStop(0.7, brick.fillStyle);
	this.context.fillStyle = grd;
	this.context.fill();
	this.context.lineWidth = brick.borderLineW;
	this.context.strokeStyle = brick.strokeStyle;
	this.context.stroke();
};

/**
 * 
 * @param line
 */
Game.PaintController.prototype.drawLine = function(line) {
	this.context.beginPath();
	this.context.strokeStyle = line.strokeStyle;
	this.context.moveTo(line.x1, line.y1);
	this.context.lineTo(line.x2, line.y2);
	this.context.stroke();
};

Game.PaintController.prototype.clearAll = function() {
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.PaintController.prototype.clear = function(rect) {
	this.context.clearRect(rect.x, rect.y, rect.width, rect.height);
};

/*************************************************************************************************************
 * ScoreBoard painter
 */

Game.ScoreBoardPaintController = function(stage) {
	this.stage = stage;
	this.cnsScoreBoard = this.stage.getScoreBoardCanvas();
	this.ctxtScoreBoard = this.stage.getScoreBoardContext();

	/* images for player life on scoreboard canvas */
	// this.lifeImage = new Image();
	this.lifeImage = "scoreBoardLife";
	this.lifeH = 48;
	this.lifeW = 44;
	this.lifeCount = 10;
	this.lifeDeltaX = gs.screen.width + this.stage.frameWidth + this.stage.frameLine;

	/* levels complete bar on the scoreboard canvas */
	this.levelH = gs.screen.height / gs.game.levelController.levels.length;
	this.levelH /= 3;
	this.levelW = (this.stage.frameWidth - this.stage.frameLine) / 3;
	this.levelVerticalPadding = gs.screen.height / gs.game.levelController.levels.length;
	this.levelClearW = this.stage.frameWidth - this.stage.frameLine;

	/* scoring on the scroreboard canvas */
	this.scoreDeltaY = 515;

};

Game.ScoreBoardPaintController.prototype.paintPlayerLife = function(availBall) {
	if (gs.game.images[this.lifeImage]!==null) {
		/* (totalImageInSprite - availball) * SingleImageHeigth */
		var yLocLifeImage = (this.lifeCount - availBall) * this.lifeH;
		var imageH = availBall * this.lifeH;
		if (yLocLifeImage < 0) { // -ve is not valid and min value is 0
			yLocLifeImage = 0;
		}
		this.ctxtScoreBoard.clearRect(this.lifeDeltaX, 0, this.lifeW, gs.screen.height);
		this.ctxtScoreBoard.drawImage(gs.game.images[this.lifeImage], 0, yLocLifeImage, this.lifeW, imageH, this.lifeDeltaX, yLocLifeImage, this.lifeW, imageH);
	}
};

Game.ScoreBoardPaintController.prototype.paintScore = function(score, miniScoreCard) {
	this.ctxtScoreBoard.clearRect(0, this.scoreDeltaY - 30, this.cnsScoreBoard.width, 60);

	var prompt = new Array();
	prompt.push({
		text : '<class="heading1"> ' + score + '</class>',
		y : this.scoreDeltaY
	});
	gs.game.scoreBoardTextPaintController.paintPrompt(prompt, false);

	miniScoreCard[0].y = this.cnsScoreBoard.height - 5;
	gs.game.scoreBoardTextPaintController.paintPrompt(miniScoreCard, false);
};

Game.ScoreBoardPaintController.prototype.paintStageCompletionBar = function() {

	this.ctxtScoreBoard.clearRect(0, 0, this.levelClearW, gs.screen.height);
	for ( var i = 0; i < gs.game.levelController.levels.length; ++i) {
		this.ctxtScoreBoard.beginPath();
		this.ctxtScoreBoard.rect(15, (gs.game.levelController.levels.length - i - 1) * 32 + this.levelH, this.levelW, this.levelH);
		if (i < gs.game.levelController.currentLevelIndex || gs.currentGameState === gs.gameState.allLevelCompleted) { // completed
																														// stage
			this.ctxtScoreBoard.fillStyle = "#FF0000";
		} else if (i === gs.game.levelController.currentLevelIndex) {
			this.ctxtScoreBoard.fillStyle = "green";
		} else {
			this.ctxtScoreBoard.fillStyle = "#D8BFD8";
		}
		this.ctxtScoreBoard.fill();
		this.ctxtScoreBoard.lineWidth = 1;
		this.ctxtScoreBoard.strokeStyle = "#000000";
		this.ctxtScoreBoard.stroke();
	}
};



/*************************************************************************************************************
 * ScoreBoard painter
 */

Game.AlphabetBGPaintController = function(stage) {
	this.stage = stage;
	this.cnsAlphabetBG = this.stage.getAlphabetBGCanvas();
	this.ctxtAlphabetBG = this.stage.getAlphabetBGContext();
};

Game.AlphabetBGPaintController.prototype.clear=function(){
	this.ctxtAlphabetBG.clearRect(0, 0, this.cnsAlphabetBG.width, this.cnsAlphabetBG.height);
};

Game.AlphabetBGPaintController.prototype.drawPartialFrame=function(topHeight, imageHandle, frameW, frameH){
	this.clear();
	this.ctxtAlphabetBG.drawImage(gs.game.images[imageHandle], 0, 0, frameW, topHeight, 0, 0,	frameW, topHeight);
};

Game.AlphabetBGPaintController.prototype.drawBGFrame=function(imgHandle, spriteX, frameW, frameH ){
	this.clear();
	this.ctxtAlphabetBG.drawImage(gs.game.images[imgHandle], spriteX, 0, frameW, frameH, 0, 0,	frameW, frameH);
};


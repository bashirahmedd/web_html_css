/*************************************************************************************************************
 * This file is used to implement the score-board used in the games
 */

/**
 * Constructor method for ScoreBoard
 */
Game.ScoreBoard = function(stage) {
	this.stage = stage;
	this.canvas = this.stage.getCanvas();
	this.context = this.stage.getContext();
	//this.container = this.stage.getContainer();
	/**
	 * select the first sequentially with awarded false to compare with the current score to give one extra
	 * ball and then set the awarded status to true of the selected level
	 */
	this.awardBonus = [ {
		bonusOn : 300,
		awarded : false
	}, {
		bonusOn : 600,
		awarded : false
	}, {
		bonusOn : 900,
		awarded : false
	}, {
		bonusOn : 2700,
		awarded : false
	}, {
		bonusOn : 8100,
		awarded : false
	}, {
		bonusOn : 18300,
		awarded : false
	}, {
		bonusOn : 54900,
		awarded : false
	}, {
		bonusOn : 166700,
		awarded : false
	} ];
};




/**
 * public method to initialize/reset the score-board
 */
Game.ScoreBoard.prototype.init = function() {
	this.availBall = 2;
	this.currentScore = 0;

	/* reset bonus point structure */
	for ( var i = 0; i < this.awardBonus.length; ++i) {
		this.awardBonus[i].awarded = false;
	}
};

/**
 * public method to get available ball
 */
Game.ScoreBoard.prototype.getBall = function(score) {
	return this.availBall;
};


/**
 * public method to get the avail due bonus score object
 */
Game.ScoreBoard.prototype.getBonusScore = function() {
	for ( var i = 0; i < this.awardBonus.length; ++i) {
		if (this.awardBonus[i].awarded === false) {
			return this.awardBonus[i];
		}
	}
};

/**
 * public method to increment score on different game events
 */
Game.ScoreBoard.prototype.incrementScore = function(score) {
	this.currentScore +=score;
	this.triggerScoreChange();
};

/**
 * public method used to count lose of ball
 */
Game.ScoreBoard.prototype.decreaseBall = function() {
	--this.availBall;
	this.triggerBallChange();
};

/**
 * public method used to award a ball
 */
Game.ScoreBoard.prototype.increaseBall = function() {
	++this.availBall;
	this.triggerBallChange();
};

Game.ScoreBoard.prototype.triggerBallChange = function() {
	gs.game.scoreBoardPaintController.paintPlayerLife(this.availBall);
	this.triggerScoreChange();
};

Game.ScoreBoard.prototype.triggerLevelChange = function() {
	gs.game.scoreBoardPaintController.paintStageCompletionBar();
};

Game.ScoreBoard.prototype.triggerScoreChange = function() {
	var prompt = new Array();
	prompt.push({
		text : '[' + this.availBall + '] [' + (gs.game.levelController.currentLevelIndex + 1) + '/' + gs.game.levelController.levels.length + ']',
		y : 0
	});
	gs.game.scoreBoardPaintController.paintScore(this.currentScore, prompt);
};

/************************************************************************************************************
 * public method to handle the scoreboard life cycle to handle the prospective changes when required
 * like awarding new ball on acquiring certain score level.
 */
Game.ScoreBoard.prototype.singalStateChange = function() {
	//check for new ball bonus
	var awardBonusObj = this.getBonusScore();
	if(this.currentScore >= awardBonusObj.bonusOn){
		awardBonusObj.awarded=true;
		this.increaseBall();
	}
};

/**
 * public method used to get current ball count
 */

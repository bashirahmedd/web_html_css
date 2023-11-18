/**
 * This file is used to implement the logical functions that used in the HTML files.
 */

Game.Material = function() {
};

/*************************************************************************************************************
 * Ball material for brick breaking
 */
Game.Material.Ball = function(stage) {
	this.stage = stage;
	this.DEFAULTRADIUS = 6;
	this.DEFAULTSPEED = 0.5;
};

/**
 * public method init
 */
Game.Material.Ball.prototype.init = function() {
	this.radius = this.DEFAULTRADIUS;
	this.color = "blue";
	this.vx = 1; // shows direction along x-axis
	this.vy = -1; // shows direction along y-axis
	this.bouncingAngle = Math.PI / 2;
	this.x = 0;
	this.y = 0;
	this.speed = this.DEFAULTSPEED;
};

/*************************************************************************************************************
 * Defender Tile material
 */
Game.Material.Tile = function(stage) {
	this.stage = stage;
	this.DEFAULTWIDTH = 100;
	this.MINWIDTH=this.DEFAULTWIDTH/5;

	/**
	 * tile mapping of initial power and size reduction factors of each level factors should not be zero, that
	 * will result in infinity larger factors means fast loss of strength and reduction tile size as well.
	 */
	this.tileStrengthFactorForLevel = new Array();
	this.tileStrengthFactorForLevel.push({
		initialTotalPowerF : 1,
		sizeReductionF : 1
	}); // Level 0
	this.tileStrengthFactorForLevel.push({
		initialTotalPowerF : 1.25,
		sizeReductionF : 1.25
	}); // Level 1
	this.tileStrengthFactorForLevel.push({
		initialTotalPowerF : 1.25,
		sizeReductionF : 1.25
	}); // Level 2
	this.tileStrengthFactorForLevel.push({
		initialTotalPowerF : 1.5,
		sizeReductionF : 1.5
	}); // Level 3
	this.tileStrengthFactorForLevel.push({
		initialTotalPowerF : 1.5,
		sizeReductionF : 1.5
	}); // Level 4
	this.tileStrengthFactorForLevel.push({
		initialTotalPowerF : 1.5,
		sizeReductionF : 1.5
	}); // Level 5
	this.tileStrengthFactorForLevel.push({
		initialTotalPowerF : 1.75,
		sizeReductionF : 1.75
	}); // Level 6
	this.tileStrengthFactorForLevel.push({
		initialTotalPowerF : 1.75,
		sizeReductionF : 1.75
	}); // Level 7
	this.tileStrengthFactorForLevel.push({
		initialTotalPowerF : 1.75,
		sizeReductionF : 1.75
	}); // Level 8
	this.tileStrengthFactorForLevel.push({
		initialTotalPowerF : 1.75,
		sizeReductionF : 1.75
	}); // Level 9
	this.tileStrengthFactorForLevel.push({
		initialTotalPowerF : 2,
		sizeReductionF : 2
	}); // Level 10
	this.tileStrengthFactorForLevel.push({
		initialTotalPowerF : 2,
		sizeReductionF : 2
	}); // Level 11
	this.tileStrengthFactorForLevel.push({
		initialTotalPowerF : 2,
		sizeReductionF : 2
	}); // Level 12
	this.tileStrengthFactorForLevel.push({
		initialTotalPowerF : 2,
		sizeReductionF : 2
	}); // Level 13
	this.tileStrengthFactorForLevel.push({
		initialTotalPowerF : 2,
		sizeReductionF : 2
	}); // Level 14
	this.tileStrengthFactorForLevel.push({
		initialTotalPowerF : 2.25,
		sizeReductionF : 2.25
	}); // Level 15
	this.tileStrengthFactorForLevel.push({
		initialTotalPowerF : 2.25,
		sizeReductionF : 2.25
	}); // Level 16
	this.tileStrengthFactorForLevel.push({
		initialTotalPowerF : 2.25,
		sizeReductionF : 2.25
	}); // Level 17
	this.tileStrengthFactorForLevel.push({
		initialTotalPowerF : 2.25,
		sizeReductionF : 2.25
	}); // Level 18
	this.tileStrengthFactorForLevel.push({
		initialTotalPowerF : 2.25,
		sizeReductionF : 2.25
	}); // Level 19
	this.tileStrengthFactorForLevel.push({
		initialTotalPowerF : 2.25,
		sizeReductionF : 2.25
	}); // Level 20
};

Game.Material.Tile.prototype.init = function(brickCount) {
	
	this.color = "green";
	this.weekcolor = "#99CC99";
	this.height = 11; // 15
	this.width = this.DEFAULTWIDTH;
	this.y = 0;
	this.x = 0;

	/* equal to number of brick in the level */
	this.TOTALPOWER = brickCount / this.tileStrengthFactorForLevel[gs.game.levelController.currentLevelIndex].initialTotalPowerF;

	this.currentPower = this.TOTALPOWER; // initially equal to the TotalPower

	this.gradientPostion = 0; // used to show tile strength
};

/**
 * public method to increase the tile width
 * 
 * @param byPercent
 *            (.01 to .99)
 */
Game.Material.Tile.prototype.increaseWidth = function(byPercent) {

};
/**
 * public method
 */
Game.Material.Tile.prototype.resetWidth = function() {
	this.width = this.DEFAULTWIDTH;
};
/**
 * public method
 * 
 * @param byPercent
 *            (.01 to .99)
 */
Game.Material.Tile.prototype.decreaseWidth = function(byPercent) {
	--this.width;
};

Game.Material.Tile.prototype.decreasePower = function() {
	--this.currentPower;
};

/**
 * 
 */
Game.Material.Tile.prototype.increasePowerForAnimationHit = function(animationCount) {
	this.currentPower += (1 / animationCount) * (this.TOTALPOWER / 2);
};

/**
 * 
 */
Game.Material.Tile.prototype.increaseWidthForAnimationHit = function(animationCount) {
// if (this.width < this.DEFAULTWIDTH) {
// this.width += (1 / animationCount) * this.DEFAULTWIDTH;
// }
};

Game.Material.Tile.prototype.toString = function() {
	console.log("x:" + this.x + ", y:" + this.y + ", gradientPostion:" + this.gradientPostion);
};

/*************************************************************************************************************
 * Brick material
 */
Game.Material.Brick = function(x, y, height, width, borderLineW, fillColor, hitCount, scorePoint) {
	this.isVisible = true;
	this.x = x;
	this.y = y;
	this.height = height;
	this.fillStyle = fillColor; // default
	this.strokeStyle = "#000000"; // default
	this.borderLineW = borderLineW;
	this.width = width;
	this.hitCount = hitCount; // also shows the brick strength/hit count
	this.scorePoint = scorePoint;

	// associate animation
	this.animation = new Array();
};

/**
 * public method to handle the brick life cycle to handle the prospective changes when required it is generic
 * and can called when needed to observe the brick state
 */
Game.Material.Brick.prototype.singalStateChange = function() {
	if (!this.isVisible) {
		this._handleScoreBoard();
		this._handleAnimation();
	}
};

Game.Material.Brick.prototype._handleScoreBoard = function() {
	gs.game.scoreBoardController.incrementScore(this.scorePoint);
	gs.game.scoreBoardController.singalStateChange();
};

/**
 * private method to play the if-added animations
 */
Game.Material.Brick.prototype._handleAnimation = function() {
	if (this.animation.length > 0) {
		for ( var i = 0; i < this.animation.length; ++i) {
			this.animation[i].setEnabled(true);
		}
	}
};
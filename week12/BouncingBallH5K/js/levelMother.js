/**
 * create static method on the Mother object later to integrate to the prototype of level instance Mother
 * object provides private methods for the levels Mother object does not contain life cycle methods
 */

Level.Mother = function() {
};

/*************************************************************************************************************
 * private method
 */
Level.Mother._updateTile = function() {
	var tileX = gs.game.defenderTile.x;
	var tileXAdjust = gs.game.defenderTile.width / 2; // used to control the tile from the middle
	var mousePos = this.stage.getMousePos();
	if (mousePos !== null) {
		/*
		 * stop to move beyond the right boundary startpoint && endingpoint
		 */
		if (mousePos.x > tileXAdjust && mousePos.x + tileXAdjust < this.stage.width) {
			tileX = mousePos.x - tileXAdjust;
		}

	}
	gs.game.defenderTile.x = tileX;
};

/*************************************************************************************************************
 * private method draw objects
 */
Level.Mother._draw = function() {
	gs.game.paintConroller.clearAll();

	gs.game.paintConroller.drawBall(gs.game.breakerBall);
	gs.game.paintConroller.drawTile(gs.game.defenderTile);
	this._drawBrick();

	/**
	 * draw animation is called at the end of all drawing done for the level
	 */
	this._drawAnimatation();

	/**
	 * draw score-board for the game
	 */
	// this._drawScoreBoard();
};

/*************************************************************************************************************
 * private method detect brick ball collision
 */
Level.Mother._handleBallBrickCollision = function() {
	for ( var i = 0; i < this.brickContainer.length; ++i) {
		var brick = this.brickContainer[i];
		/* ball hits the brick */
		if (brick.isVisible
				&& gs.game.calculationConroller.isBallInRegion(brick.x, brick.y, brick.x + brick.width, brick.y + brick.height, gs.game.breakerBall)) {
			
			this._updateBackground();
			//console.log("broken brick count:" + this.deadBrickCount);
			
			/*
			 * check ball direction along x-axis for reflecting back from the brick
			 */
			if (gs.game.breakerBall.vy < 0) { // going up
				if (gs.game.breakerBall.vx > 0) { // coming from left
					gs.game.breakerBall.vy = Math.abs(gs.game.breakerBall.vy); // go down
					gs.game.breakerBall.vx = Math.abs(gs.game.breakerBall.vx); // go right
				} else { // coming from right
					gs.game.breakerBall.vx = Math.abs(gs.game.breakerBall.vx) * -1; // goLeft
					gs.game.breakerBall.vy = Math.abs(gs.game.breakerBall.vy); // go down
				}
				this._clearBrickOnCollision(i);
			} else { // going down
				if (gs.game.breakerBall.vx > 0) { // coming from left
					gs.game.breakerBall.vy = Math.abs(gs.game.breakerBall.vy) * -1; // go up
					gs.game.breakerBall.vx = Math.abs(gs.game.breakerBall.vx); // go right
				} else { // coming from right
					gs.game.breakerBall.vx = Math.abs(gs.game.breakerBall.vx) * -1; // go
					// left
					gs.game.breakerBall.vy = Math.abs(gs.game.breakerBall.vy) * -1; // go up
				}
				this._clearBrickOnCollision(i);
			}
		}
	}
};

/*************************************************************************************************************
 * private method
 */
Level.Mother._clearBrickOnCollision = function(brickIndex) {
	if (this.brickContainer[brickIndex].hitCount == 0) { // brick hit strenght is not yet 0
		++this.deadBrickCount;    //increase dead brick count
		this.brickContainer[brickIndex].isVisible = false;
		this.brickContainer[brickIndex].singalStateChange();

	} else {
		--this.brickContainer[brickIndex].hitCount;
		this._multiCollistionCorrection(brickIndex);
	}
};

/*************************************************************************************************************
 * private method
 */
Level.Mother._handleBallTileCollision = function() {
	// ball hits the tile
	if (gs.game.calculationConroller.isBallInRegion(gs.game.defenderTile.x, gs.game.defenderTile.y, gs.game.defenderTile.x + gs.game.defenderTile.width,
			gs.game.defenderTile.y + gs.game.defenderTile.height, gs.game.breakerBall)) {		
		this._handleTileStrength();
		// tile Medians
		var tileMedianX = gs.game.defenderTile.x + (gs.game.defenderTile.width / 2);
		// var tileUpperMedianY = this.canvas.height - gs.game.defenderTile.height;
		var collisionPointX = gs.game.breakerBall.x; // collision point
		// var collistionSection = 0;
		var base = 0; // base of right-angled triangle
		if (collisionPointX < tileMedianX) { // tile first half
			gs.game.breakerBall.vx = Math.abs(gs.game.breakerBall.vx) * -1; // go left
			gs.game.breakerBall.vy = Math.abs(gs.game.breakerBall.vy) * -1; // go up
			base = tileMedianX - collisionPointX;
		} else if (collisionPointX == tileMedianX) { // tile middle
			gs.game.breakerBall.vy = Math.abs(gs.game.breakerBall.vy) * -1; // go up
			gs.game.breakerBall.vx = Math.abs(gs.game.breakerBall.vx); // test this ?
		} else { // tile second half
			gs.game.breakerBall.vy = Math.abs(gs.game.breakerBall.vy) * -1; // go up
			gs.game.breakerBall.vx = Math.abs(gs.game.breakerBall.vx); // go right
			base = collisionPointX - tileMedianX;
		}
		gs.game.breakerBall.bouncingAngle = Math.atan(gs.game.defenderTile.height / base);

	} else { // ball hits the floor if no tile
		if (gs.game.breakerBall.y > (this.canvas.height - gs.game.breakerBall.radius)) {
			this.nextFunc = "lost";
			this._handleBallLoss();
		}
	}
};

/*************************************************************************************************************
 * private method
 */
Level.Mother._handleBoundaryBallCollision = function(timeDiff) {
	var ballX = gs.game.breakerBall.x;
	var ballY = gs.game.breakerBall.y;
	var speed = gs.game.breakerBall.speed * timeDiff;
	var speedVectorX = speed * Math.cos(gs.game.breakerBall.bouncingAngle);
	var speedVectorY = speed * Math.sin(gs.game.breakerBall.bouncingAngle);

	ballX += gs.game.breakerBall.vx * speedVectorX;
	ballY += gs.game.breakerBall.vy * speedVectorY;

	// check ceiling boundary condition
	if (ballY < gs.game.breakerBall.radius) {
		ballY = gs.game.breakerBall.radius;
		if (gs.game.breakerBall.vx > 0) { // coming from left
			gs.game.breakerBall.vy = Math.abs(gs.game.breakerBall.vy); // go down
			gs.game.breakerBall.vx = Math.abs(gs.game.breakerBall.vx); // go right
		} else { // coming from right
			gs.game.breakerBall.vx = Math.abs(gs.game.breakerBall.vx) * -1; // go left
			gs.game.breakerBall.vy = Math.abs(gs.game.breakerBall.vy); // go down
		}
	}

	// check right wall boundary condition
	if (ballX > (this.canvas.width - gs.game.breakerBall.radius)) {
		ballX = this.canvas.width - gs.game.breakerBall.radius;
		if (gs.game.breakerBall.vy < 0) { // moving up
			gs.game.breakerBall.vx = Math.abs(gs.game.breakerBall.vx) * -1; // go left
			gs.game.breakerBall.vy = Math.abs(gs.game.breakerBall.vy) * -1; // go up
		} else { // moving down
			gs.game.breakerBall.vx = Math.abs(gs.game.breakerBall.vx) * -1; // go left
			gs.game.breakerBall.vy = Math.abs(gs.game.breakerBall.vy); // go down
		}
	}

	// check left wall boundary condition
	if (ballX < (gs.game.breakerBall.radius)) {
		ballX = gs.game.breakerBall.radius;
		if (gs.game.breakerBall.vy < 0) { // moving up
			gs.game.breakerBall.vy = Math.abs(gs.game.breakerBall.vy) * -1; // go up
			gs.game.breakerBall.vx = Math.abs(gs.game.breakerBall.vx); // go right
		} else { // moving down
			gs.game.breakerBall.vy = Math.abs(gs.game.breakerBall.vy); // go down
			gs.game.breakerBall.vx = Math.abs(gs.game.breakerBall.vx); // go right
		}
	}

	gs.game.breakerBall.x = ballX;
	gs.game.breakerBall.y = ballY;
};

/*************************************************************************************************************
 * private method used to bind the defined animations randomly to the bricks Caution: don't bind animation to
 * the bottom most row of bricks
 */

Level.Mother._bindBrickAnimation = function() {
	var listRandNum = Util.getUniqueRandomNum(this.brickContainer.length, this.anmContainer.length);
	for ( var i = 0; i < this.anmContainer.length; ++i) {
		if (this.anmContainer[i].anmType === gs.animationType.main) {
			this.anmContainer[i].x = this.brickContainer[listRandNum[i]].x;
			this.anmContainer[i].y = this.brickContainer[listRandNum[i]].y;
			this.brickContainer[listRandNum[i]].animation.push(this.anmContainer[i]);

			// bonus point animation
			var scoreAnimation = new this.anmContainer[i].childAnimation(this.stage);
			scoreAnimation.init();
			scoreAnimation.x = this.brickContainer[listRandNum[i]].x;
			scoreAnimation.y = this.brickContainer[listRandNum[i]].y;
			this.brickContainer[listRandNum[i]].animation.push(scoreAnimation);
			this.anmContainer.push(scoreAnimation);
		}
	}
};

/*************************************************************************************************************
 * private method to adjust the strength level of the defender tile after collision with ball and to reduce
 * the size of the tile if the strength has reduced to zero
 */

Level.Mother._handleTileStrength = function() {
	var tile = gs.game.defenderTile;

	tile.decreasePower(); // reduce defender tile power
	tile.gradientPostion = (tile.TOTALPOWER - tile.currentPower) / tile.TOTALPOWER;

	if (tile.currentPower < 1) { // reduce the tile width when current power is 0 or -ve
		tile.gradientPostion = 1.0;
		if (tile.width > tile.MINWIDTH) {
			tile.width += tile.currentPower * tile.tileStrengthFactorForLevel[gs.game.levelController.currentLevelIndex].sizeReductionF;
		}
		// if (tile.width < 1) { // min defender width is one
		// tile.width = 1;
		// }
	}

	/* tile gradient correction for max and min value */
	if (tile.gradientPostion < 0) {
		tile.gradientPostion = 0;
	} else if (tile.gradientPostion > 1) {
		tile.gradientPostion = 1;
	}
};

/**
 * update background image
 */
Level.Mother._updateBackground=function(){
	gs.game.animationLevelBG.updateBGFrame(gs.game.levelController.currentLevelIndex, this.brickContainer.length, this.deadBrickCount);	
};

/**
 * returns animation associated with the level
 */
Level.Mother.getAnimationCount = function() {
	return this.anmContainer.length;
};

/*************************************************************************************************************
 * private method draw bricks to canvas
 */
Level.Mother._drawBrick = function() {
	var allBroken = true;
	for ( var indx = 0; indx < this.brickContainer.length; ++indx) {
		if (this.brickContainer[indx].isVisible) {
			allBroken = false;
			if (this.brickContainer[indx].animation.length === 0) {
				gs.game.paintConroller.drawBrick(this.brickContainer[indx]);
			} else {
				gs.game.paintConroller.drawBrickWithLinearGradient(this.brickContainer[indx]);
			}
		}
	}

	if (allBroken) { // all brick broken change to won status
		this.nextFunc = "won";
		Game.AnimateEventLoop.animateBGOnLCompletion(this);
		this._checkGameCompletion();
	}
};

/***************************************************************************************************************
 * private method
 */
Level.Mother._checkGameCompletion = function() {
	if (gs.game.levelController.isGameCompleted()) {
		gs.currentGameState = gs.gameState.allLevelCompleted;
		this.nextFunc = "gameCompleted";
	}
};


/**
 * This file is used to implement the logical functions that used in the HTML files.
 */

Level.Two = function(stage) {
	this.stage = stage;
	this.canvas = this.stage.getCanvas();
	this.context = this.stage.getContext();
	this.container = this.stage.getContainer();
	this.nextFunc = "init";
	this.levelName = "Level 2";
	this.className="Level.Two";
	
	// Level bricks
	this.brickContainer = new Array();
	this._brickTemplate = new Array();

	// current animation queue
	this.anmContainer = new Array(); // add animation randomly to specific number of bricks after defining
};

/*************************************************************************************************************
 * public method load resources if needed like images, model, sound files
 */
Level.Two.prototype.load = function() {
	this.nextFunc = "play";
};

/*************************************************************************************************************
 * private method, Initialize the level object's initial states
 * 
 */
Level.Two.prototype.init = function() {
	gs.game.paintConroller.clearAll();

	/* load Brick Template once */
	if (this._brickTemplate.length === 0) {
		this._loadBrickTemplate();
	}

	/**
	 * nextLevel gives reference to the next level, played after this level nextFunc implements LevelTwo
	 * object life cycle to return the name of next function to be called
	 */
	this.nextLevel = null;
	this.nextFunc = "load";
	this.deadBrickCount = 0;

	/**
	 * add tile to protect ball
	 */
	gs.game.defenderTile.init(this._brickTemplate.length);
	gs.game.defenderTile.y = this.canvas.height - gs.game.defenderTile.height - 2;
	gs.game.defenderTile.x = this.canvas.width / 2 - gs.game.defenderTile.width / 2;
	gs.game.paintConroller.drawTile(gs.game.defenderTile);

	/**
	 * add bouncing ball to stage
	 */
	gs.game.breakerBall.init();
	gs.game.breakerBall.color = "blue";
	gs.game.breakerBall.vx = 1;
	gs.game.breakerBall.vy = -1;
	/**
	 * ball initially placed in the middle of tile, and goes vertically up after collision detection
	 */
	gs.game.breakerBall.bouncingAngle = Math.PI / 2;
	gs.game.breakerBall.x = this.canvas.width / 2;
	/**
	 * to overlap the ball with one pixel on the tile to create initial collision
	 */
	gs.game.breakerBall.y = this.canvas.height - gs.screen.scoreBoardHeight - gs.game.breakerBall.radius * 3 + 1;
	gs.game.paintConroller.drawBall(gs.game.breakerBall);

	this._generateBrick();
	this._generateAnimation();
	this._bindBrickAnimation();
};

Level.Two.prototype.play = function(timeDiff) {
	// console.log("Level.Two.prototype.play" + timeDiff);
	this._handleBoundaryBallCollision(timeDiff);
	this._updateTile();
	this._handleBallTileCollision();
	this._handleBallBrickCollision();
	this._draw();
};

/*************************************************************************************************************
 * private method generate initialized bricks clone the brickTemplt at to the queue at the tail
 */
Level.Two.prototype._generateBrick = function() {
	for ( var indx = 0; indx < this._brickTemplate.length; ++indx) {
		var brickTemplt = this._brickTemplate[indx];
		brickTemplt.isVisible = true;
		this.brickContainer.push(cloneObject(brickTemplt));

		/* paint the brick from the container array */
		gs.game.paintConroller.drawBrick(this.brickContainer[indx]);
	}
};

/*************************************************************************************************************
 * private method generate Animations for the level load animation choose a brick randomly and associate the
 * specific animation with that add the animation to the level animation container to animate when animation
 * is enabled on the brick breaking
 */
Level.Two.prototype._generateAnimation = function() {
	// console.log("Level.Two.prototype._generateAnimation");
	var anm = null;
	anm = new Game.Animation.Two(this.stage);
	anm.init();
	this.anmContainer.push(anm);

	anm = new Game.Animation.Two(this.stage);
	anm.init();
	this.anmContainer.push(anm);
};

///*************************************************************************************************************
// * private method draw bricks to canvas
// */
//Level.Two.prototype._drawBrick = function() {
//
//	var allBroken = true;
//	for ( var indx = 0; indx < this.brickContainer.length; ++indx) {
//		if (this.brickContainer[indx].isVisible) {
//			allBroken = false;
//			if (this.brickContainer[indx].animation.length === 0) {
//				gs.game.paintConroller.drawBrick(this.brickContainer[indx]);
//			} else {
//				gs.game.paintConroller.drawBrickWithLinearGradient(this.brickContainer[indx]);
//			}
//		}
//	}
//	//debugger;
//	if (allBroken) { // all brick broken change to won status
//		//debugger;
//		this.nextFunc = "won";
//		this._checkGameCompletion();
//	}
//};
///**
// * private method
// */
//Level.Two.prototype._checkGameCompletion = function() {
//	if (gs.game.levelController.isGameCompleted()) {
//		gs.currentGameState = gs.gameState.allLevelCompleted;
//		this.nextFunc = "gameCompleted";
//	}
//};

///*************************************************************************************************************
// * private method enable all the animations associated with the brick on collision
// */
//Level.Two.prototype._clearBrickOnCollision = function(brickIndex) {
//	if (this.brickContainer[brickIndex].hitCount == 0) { // brick hit strenght is not yet 0
//		this.brickContainer[brickIndex].isVisible = false;
//		this.brickContainer[brickIndex].singalStateChange();
//
//	} else {
//		--this.brickContainer[brickIndex].hitCount;
//		this._multiCollistionCorrection(brickIndex);
//	}
//};

/*************************************************************************************************************
 * private method Fixes multiple immediate collision with the same brick while going in and coming out of
 * brick area push the ball out the brick area for proper animation and to keep single collision at a time
 * with a brick
 */
Level.Two.prototype._multiCollistionCorrection = function(brickIndex) {
	var ballY = gs.game.breakerBall.y;
	ballY += (gs.game.breakerBall.radius * 3 * gs.game.breakerBall.vy);
	if (ballY < 0) { /* ball crosses the ceiling */
		ballY = Math.abs(gs.game.breakerBall.radius * 3 * gs.game.breakerBall.vy);
	}
	gs.game.breakerBall.y = ballY;
};

/*************************************************************************************************************
 * public method ball die, continue to reply the levelTwo or exit/reset the game
 */

Level.Two.prototype.lost = function() {
	this._destroyLevelObjects(); // destroy the previous level objects
	this.init();
	this.nextFunc = "play";
	gs.game.levelController.initializeLevel();
};

/**
 * private method to handle scoreboard
 */
Level.Two.prototype._handleBallLoss = function() {
	gs.game.scoreBoardController.decreaseBall();
	if (gs.game.scoreBoardController.getBall() === 0) {
		gs.currentGameState = gs.gameState.allBallConsumed;
		this.nextFunc = "gameOver";
	}
};

/*************************************************************************************************************
 * public method all the bricks destroyed, congratulate the player continue to level two or exit/reset the
 * gameball die, continue to reply the levelTwo or exit/reset the game
 */
Level.Two.prototype.won = function() {
	this._destroyLevelObjects(); // destroy the previous level objects
	//this.nextFunc = "init"; // resetToPlayTheLevelAgain
	// gs.game.scoreBoardController.init();
};

/*************************************************************************************************************
 * public method
 */
Level.Two.prototype.gameOver = function() {
	this._destroyLevelObjects(); // destroy the previous level objects
	gs.currentGameState = gs.gameState.playLevel;
	gs.game.levelController.currentLevelIndex = 0;
	var level = gs.game.levelController.getLevel(gs.game.levelController.currentLevelIndex);
	level.nextFunc = "init";
	gs.game.scoreBoardController.init();
	gs.game.levelController.initializeLevel();
};

/*************************************************************************************************************
 * public method
 */
Level.Two.prototype.gameCompleted = function() {
	this._destroyLevelObjects(); // destroy the previous level objects
	gs.currentGameState = gs.gameState.playLevel;
	gs.game.levelController.currentLevelIndex = 0;
	var level = gs.game.levelController.getLevel(gs.game.levelController.currentLevelIndex);
	level.nextFunc = "init";
	gs.game.scoreBoardController.init();
	gs.game.levelController.initializeLevel();
};

/*************************************************************************************************************
 * private method for loading template
 */
Level.Two.prototype._loadBrickTemplate = function() {
	var wallXoffset = 36;
	var brickTotalWidth = 62; // border and filled area
	var brickHeight = gs.game.breakerBall.DEFAULTRADIUS * 2;
	/* row 0 */
	this._brickTemplate.push(new Game.Material.Brick(wallXoffset + brickTotalWidth * 0, brickHeight * 1, brickHeight, 60, 1, "#FF0000", 0, 10));
	this._brickTemplate.push(new Game.Material.Brick(wallXoffset + brickTotalWidth * 1, brickHeight * 1, brickHeight, 60, 1, "#FF0000", 0, 10));
	this._brickTemplate.push(new Game.Material.Brick(wallXoffset + brickTotalWidth * 2, brickHeight * 1, brickHeight, 60, 1, "#FF0000", 0, 10));
	this._brickTemplate.push(new Game.Material.Brick(wallXoffset + brickTotalWidth * 3, brickHeight * 1, brickHeight, 60, 1, "#FF0000", 0, 10));
	/* row 1 */
	this._brickTemplate.push(new Game.Material.Brick(wallXoffset + brickTotalWidth * 0, brickHeight * 2, brickHeight, 60, 1, "#FF0000", 0, 10));
	this._brickTemplate.push(new Game.Material.Brick(wallXoffset + brickTotalWidth * 1, brickHeight * 2, brickHeight, 60, 1, "#FF0000", 0, 10));
	this._brickTemplate.push(new Game.Material.Brick(wallXoffset + brickTotalWidth * 2, brickHeight * 2, brickHeight, 60, 1, "#FF0000", 0, 10));
	this._brickTemplate.push(new Game.Material.Brick(wallXoffset + brickTotalWidth * 3, brickHeight * 2, brickHeight, 60, 1, "#FF0000", 0, 10));
	/* row 2 */
	this._brickTemplate.push(new Game.Material.Brick(wallXoffset + brickTotalWidth * 0, brickHeight * 5, brickHeight, 60, 1, "#FF0000", 0, 10));
	this._brickTemplate.push(new Game.Material.Brick(wallXoffset + brickTotalWidth * 1, brickHeight * 5, brickHeight, 60, 1, "#FF0000", 0, 10));
	this._brickTemplate.push(new Game.Material.Brick(wallXoffset + brickTotalWidth * 2, brickHeight * 5, brickHeight, 60, 1, "#FF0000", 0, 10));
	this._brickTemplate.push(new Game.Material.Brick(wallXoffset + brickTotalWidth * 3, brickHeight * 5, brickHeight, 60, 1, "#FF0000", 0, 10));
	/* row 3 */
	this._brickTemplate.push(new Game.Material.Brick(wallXoffset + brickTotalWidth * 0, brickHeight * 6, brickHeight, 60, 1, "#FF0000", 0, 10));
	this._brickTemplate.push(new Game.Material.Brick(wallXoffset + brickTotalWidth * 1, brickHeight * 6, brickHeight, 60, 1, "#FF0000", 0, 10));
	this._brickTemplate.push(new Game.Material.Brick(wallXoffset + brickTotalWidth * 2, brickHeight * 6, brickHeight, 60, 1, "#FF0000", 0, 10));
	this._brickTemplate.push(new Game.Material.Brick(wallXoffset + brickTotalWidth * 3, brickHeight * 6, brickHeight, 60, 1, "#FF0000", 0, 10));
	/* row 2 */
	this._brickTemplate.push(new Game.Material.Brick(wallXoffset + brickTotalWidth * 0, brickHeight * 9, brickHeight, 60, 1, "#FF0000", 0, 10));
	this._brickTemplate.push(new Game.Material.Brick(wallXoffset + brickTotalWidth * 1, brickHeight * 9, brickHeight, 60, 1, "#FF0000", 0, 10));
	this._brickTemplate.push(new Game.Material.Brick(wallXoffset + brickTotalWidth * 2, brickHeight * 9, brickHeight, 60, 1, "#FF0000", 0, 10));
	this._brickTemplate.push(new Game.Material.Brick(wallXoffset + brickTotalWidth * 3, brickHeight * 9, brickHeight, 60, 1, "#FF0000", 0, 10));
	/* row 3 */
	this._brickTemplate.push(new Game.Material.Brick(wallXoffset + brickTotalWidth * 0, brickHeight * 10, brickHeight, 60, 1, "#FF0000", 0, 10));
	this._brickTemplate.push(new Game.Material.Brick(wallXoffset + brickTotalWidth * 1, brickHeight * 10, brickHeight, 60, 1, "#FF0000", 0, 10));
	this._brickTemplate.push(new Game.Material.Brick(wallXoffset + brickTotalWidth * 2, brickHeight * 10, brickHeight, 60, 1, "#FF0000", 0, 10));
	this._brickTemplate.push(new Game.Material.Brick(wallXoffset + brickTotalWidth * 3, brickHeight * 10, brickHeight, 60, 1, "#FF0000", 0, 10));
};

/*************************************************************************************************************
 * public method destroys object like bricks array after lost and won state of the level
 */
Level.Two.prototype._destroyLevelObjects = function() {
	//reset the object state for next execution
	this.nextFunc = "init";
		
	// remove bricks
	for ( var i = this.brickContainer.length - 1; i >= 0; --i) {
		for ( var prop in this.brickContainer[i]) {

			// remove animations from the brick
			for ( var bi = this.brickContainer[i].animation.length - 1; bi >= 0; --bi) {
				for ( var anmProp in this.brickContainer[i].animation[bi]) {
					delete this.brickContainer[i].animation[bi][anmProp];
				}
				this.brickContainer[i].animation[bi] = null;
			}
			this.brickContainer[i].animation.splice(0, this.brickContainer[i].animation.length);
			this.brickContainer[i].animation.length = 0;

			delete this.brickContainer[i][prop]; // delete each property of the brick object
		}
		this.brickContainer[i] = null; // release object reference for GC

	}
	this.brickContainer.splice(0, this.brickContainer.length); // remove all array elements
	this.brickContainer.length = 0;

	// remove animations
	for ( var j = this.anmContainer.length - 1; j >= 0; --j) {
		for ( var prop in this.anmContainer[j]) {
			delete this.anmContainer[j][prop]; // delete each property of the brick object
		}
		this.anmContainer[i] = null;
	}
	this.anmContainer.splice(0, this.anmContainer.length); // remove all array elements
	this.anmContainer.length = 0;
};

/*************************************************************************************************************
 * public method pause
 */
Level.Two.prototype.pause = function() {
	// console.log("from running level pause"+this.levelName);
};

/*************************************************************************************************************
 * private plays only those animation which are enable if enabled then calls the animations animate() function
 * otherwise skipe the animation
 */
Level.Two.prototype._drawAnimatation = function() {
	for ( var i = 0; i < this.anmContainer.length; ++i) {
		if (this.anmContainer[i].enabled) {
			this.anmContainer[i].animate();
		}
	}
};

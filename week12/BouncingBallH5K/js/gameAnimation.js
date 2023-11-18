/*************************************************************************************************************
 * This file is used to implement the animations used in the games
 */

Game.Animation = function() {
};

/*************************************************************************************************************
 * Animation One
 */
Game.Animation.Mother = function() {
};

Game.Animation.One = function(stage) {
	this.anmType = gs.animationType.main;
	this.name = "sunnysmile";
	this.childAnimation = Game.Animation.Score.Three;
	this.stage = stage;
	this.canvas = this.stage.getCanvas();
	this.context = this.stage.getContext();
	this.container = this.stage.getContainer();

	this.ySpeed = 1;
	this.xSpeed = 0;
	this.frameW = 62;
	this.frameH = 62;

	this.anmTileHitPoint = 30 * this.ySpeed; // catching speedy animation will give more points
	this.REPEATCOUNT = 7; // used to slow down sprite animation
	this.spriteStateRepeatCount = this.REPEATCOUNT;

	/**
	 * public used initialize the animation animateYRow is used when all the sprite images compressed into
	 * single file of sprites with each row representing one animation
	 */
	this.init = function() {
		this.animateXCol = [ 0, 62, 124 ]; // frames
		this.animateYRow = 0;
		this.animateIndex = 0;
		this.x = 0;
		this.y = 0;
		this.enabled = false;
	};

	/**
	 * public used to enable and disable the animation
	 * 
	 * @param enabled
	 */
	this.setEnabled = function(enabled) {
		this.enabled = enabled;
	};
	/**
	 * public method called by implementing level to execute animation
	 */
	this.animate = function() {
		if (gs.game.images[this.name] !== null) {
			this.context.drawImage(gs.game.images[this.name], this.animateXCol[this.animateIndex], this.animateYRow, this.frameW, this.frameH, this.x, this.y,
					this.frameW, this.frameH);
			this._cycleThroughAnimateIndex();
			this.y = this.y + this.ySpeed; // animate along y-axis
			--this.spriteStateRepeatCount; // decrement repeat count

			this._checkAnmTileHitPoint(this.x, this.y, this.x + this.frameW, this.y + this.frameH); // tile
			// dimensions
			this._validateAnimateStatus();
		}
	};

	/**
	 * private method checks defender tile collision with the animation
	 */
	this._checkAnmTileHitPoint = function(x1, y1, x2, y2) {
		var tileX1 = gs.game.defenderTile.x, tileY = gs.game.defenderTile.y; // top left corner
		var tileX2 = gs.game.defenderTile.x + gs.game.defenderTile.width / 2; // top mid-point
		var tileX3 = gs.game.defenderTile.x + gs.game.defenderTile.width; // top right corner

		if (gs.game.calculationConroller.isPointInPath(x1, y1, x2, y2, tileX1, tileY)
				|| gs.game.calculationConroller.isPointInPath(x1, y1, x2, y2, tileX2, tileY)
				|| gs.game.calculationConroller.isPointInPath(x1, y1, x2, y2, tileX3, tileY)) {
			this.enabled = false;
			gs.game.scoreBoardController.incrementScore(this.anmTileHitPoint);
			gs.game.scoreBoardController.singalStateChange();

			var currentLvlAnimationCount = gs.game.levelController.getCurrentLevel().getAnimationCount();
			gs.game.defenderTile.increasePowerForAnimationHit(currentLvlAnimationCount);
			// gs.game.defenderTile.increaseWidthForAnimationHit(currentLvlAnimationCount);
		}
	};

	/**
	 * priavate method cycles through the available animation point
	 */
	this._cycleThroughAnimateIndex = function() {
		if (this.spriteStateRepeatCount <= 0) {
			++this.animateIndex;
			if (this.animateIndex >= this.animateXCol.length) {
				this.animateIndex = this.animateIndex % this.animateXCol.length;
			}
			this.spriteStateRepeatCount = this.REPEATCOUNT; // reset value
		}
	};

	/**
	 * private checks if it is needed to animate any further check:if animation goes beyond the canvas
	 * boundary limits
	 */
	this._validateAnimateStatus = function() {

		/* max min boundary */
		if (this.y > this.canvas.height || this.x >= this.canvas.width || this.y < 0 || this.x < 0) {
			this.enabled = false;
		}
	};
};

/*************************************************************************************************************
 * Animation Two
 */
Game.Animation.Two = function(stage) {
	this.anmType = gs.animationType.main;
	this.name = "smile";
	this.childAnimation = Game.Animation.Score.Three;
	this.stage = stage;
	this.canvas = this.stage.getCanvas();
	this.context = this.stage.getContext();
	this.container = this.stage.getContainer();

	this.ySpeed = 1;
	this.xSpeed = 0;
	this.frameW = 50;
	this.frameH = 46;

	this.anmTileHitPoint = 30 * this.ySpeed; // catching speedy animation will give more points
	this.REPEATCOUNT = 7; // used to slow down sprite animation
	this.spriteStateRepeatCount = this.REPEATCOUNT;

	/**
	 * public used initialize the animation animateYRow is used when all the sprite images compressed into
	 * single file of sprites with each row representing one animation
	 */
	this.init = function() {
		this.animateXCol = [ 0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850 ];
		this.animateYRow = 0;
		this.animateIndex = 0;
		this.x = 0;
		this.y = 0;
		this.enabled = false;
	};

	/**
	 * public used to enable and disable the animation
	 * 
	 * @param enabled
	 */
	this.setEnabled = function(enabled) {
		this.enabled = enabled;
	};

	this.animate = function() {
		if (gs.game.images[this.name] !== null) {
			this.context.drawImage(gs.game.images[this.name], this.animateXCol[this.animateIndex], this.animateYRow, this.frameW, this.frameH, this.x, this.y,
					this.frameW, this.frameH);
			this._cycleThroughAnimateIndex();
			this.y = this.y + this.ySpeed; // animate along y-axis
			--this.spriteStateRepeatCount; // decrement repeat count

			this._checkAnmTileHitPoint(this.x, this.y, this.x + this.frameW, this.y + this.frameH); // tile
			// dimensions
			this._validateAnimateStatus();
		}
	};

	/**
	 * private method checks defender tile collision with the animation
	 */
	this._checkAnmTileHitPoint = function(x1, y1, x2, y2) {
		var tileX1 = gs.game.defenderTile.x, tileY = gs.game.defenderTile.y; // top left corner
		var tileX2 = gs.game.defenderTile.x + gs.game.defenderTile.width / 2; // top mid-point
		var tileX3 = gs.game.defenderTile.x + gs.game.defenderTile.width; // top right corner

		if (gs.game.calculationConroller.isPointInPath(x1, y1, x2, y2, tileX1, tileY)
				|| gs.game.calculationConroller.isPointInPath(x1, y1, x2, y2, tileX2, tileY)
				|| gs.game.calculationConroller.isPointInPath(x1, y1, x2, y2, tileX3, tileY)) {
			this.enabled = false;
			gs.game.scoreBoardController.incrementScore(this.anmTileHitPoint);
			gs.game.scoreBoardController.singalStateChange();

			var currentLvlAnimationCount = gs.game.levelController.getCurrentLevel().getAnimationCount();
			gs.game.defenderTile.increasePowerForAnimationHit(currentLvlAnimationCount);
			// gs.game.defenderTile.increaseWidthForAnimationHit(currentLvlAnimationCount);

		}
	};

	/**
	 * cycles through the available animation point
	 */
	this._cycleThroughAnimateIndex = function() {
		if (this.spriteStateRepeatCount <= 0) {
			++this.animateIndex;
			if (this.animateIndex >= this.animateXCol.length) {
				this.animateIndex = this.animateIndex % this.animateXCol.length;
			}
			this.spriteStateRepeatCount = this.REPEATCOUNT; // reset value
		}
	};

	/**
	 * private checks if it is needed to animate any further check:if animation goes beyond the canvas
	 * boundary limits
	 */
	this._validateAnimateStatus = function() {

		/* max min boundary */
		if (this.y > this.canvas.height || this.x >= this.canvas.width || this.y < 0 || this.x < 0) {
			this.enabled = false;
		}

	};
};

/*************************************************************************************************************
 * Animation Three
 */
Game.Animation.Three = function(stage) {
	this.anmType = gs.animationType.main;
	this.name = "hund";
	this.childAnimation = Game.Animation.Score.Three;
	this.stage = stage;
	this.canvas = this.stage.getCanvas();
	this.context = this.stage.getContext();
	this.container = this.stage.getContainer();

	this.ySpeed = 1;
	this.xSpeed = 0;
	this.frameW = 62;
	this.frameH = 62;

	this.anmTileHitPoint = 30 * this.ySpeed; // catching speedy animation will give more points
	this.REPEATCOUNT = 10; // used to slow down sprite animation
	this.spriteStateRepeatCount = this.REPEATCOUNT;

	/**
	 * public used initialize the animation animateYRow is used when all the sprite images compressed into
	 * single file of sprites with each row representing one animation
	 */
	this.init = function() {
		this.animateXCol = [ 0, 62, 124, 186, 248, 310, 372, 434 ]; // 8 frames
		this.animateYRow = 0;
		this.animateIndex = 0;
		this.x = 0;
		this.y = 0;
		this.enabled = false;
	};

	/**
	 * public used to enable and disable the animation
	 * 
	 * @param enabled
	 */
	this.setEnabled = function(enabled) {
		this.enabled = enabled;
	};

	this.animate = function() {
		if (gs.game.images[this.name] !== null) {
			this.context.drawImage(gs.game.images[this.name], this.animateXCol[this.animateIndex], this.animateYRow, this.frameW, this.frameH, this.x, this.y,
					this.frameW, this.frameH);
			this._cycleThroughAnimateIndex();
			this.y = this.y + this.ySpeed; // animate along y-axis
			--this.spriteStateRepeatCount; // decrement repeat count

			this._checkAnmTileHitPoint(this.x, this.y, this.x + this.frameW, this.y + this.frameH); // tile
			// dimensions
			this._validateAnimateStatus();
		}
	};

	/**
	 * private method checks defender tile collision with the animation
	 */
	this._checkAnmTileHitPoint = function(x1, y1, x2, y2) {
		var tileX1 = gs.game.defenderTile.x, tileY = gs.game.defenderTile.y; // top left corner
		var tileX2 = gs.game.defenderTile.x + gs.game.defenderTile.width / 2; // top mid-point
		var tileX3 = gs.game.defenderTile.x + gs.game.defenderTile.width; // top right corner

		if (gs.game.calculationConroller.isPointInPath(x1, y1, x2, y2, tileX1, tileY)
				|| gs.game.calculationConroller.isPointInPath(x1, y1, x2, y2, tileX2, tileY)
				|| gs.game.calculationConroller.isPointInPath(x1, y1, x2, y2, tileX3, tileY)) {
			this.enabled = false;
			gs.game.scoreBoardController.incrementScore(this.anmTileHitPoint);
			gs.game.scoreBoardController.singalStateChange();

			var currentLvlAnimationCount = gs.game.levelController.getCurrentLevel().getAnimationCount();
			gs.game.defenderTile.increasePowerForAnimationHit(currentLvlAnimationCount);
			// gs.game.defenderTile.increaseWidthForAnimationHit(currentLvlAnimationCount);
		}
	};

	/**
	 * cycles through the available animation point
	 */
	this._cycleThroughAnimateIndex = function() {
		if (this.spriteStateRepeatCount <= 0) {
			++this.animateIndex;
			if (this.animateIndex >= this.animateXCol.length) {
				this.animateIndex = this.animateIndex % this.animateXCol.length;
			}
			this.spriteStateRepeatCount = this.REPEATCOUNT; // reset value
		}
	};

	/**
	 * private checks if it is needed to animate any further check:if animation goes beyond the canvas
	 * boundary limits
	 */
	this._validateAnimateStatus = function() {

		/* max min boundary */
		if (this.y > this.canvas.height || this.x >= this.canvas.width || this.y < 0 || this.x < 0) {
			this.enabled = false;
		}
	};
};

/*************************************************************************************************************
 * Animation Four
 */
Game.Animation.Four = function(stage) {
	this.anmType = gs.animationType.main;
	this.name = "elg";
	this.childAnimation = Game.Animation.Score.Three;
	this.stage = stage;
	this.canvas = this.stage.getCanvas();
	this.context = this.stage.getContext();
	this.container = this.stage.getContainer();

	this.ySpeed = 1;
	this.xSpeed = 0;
	this.frameW = 60;
	this.frameH = 82;

	this.anmTileHitPoint = 30 * this.ySpeed; // catching speedy animation will give more points
	this.REPEATCOUNT = 6; // used to slow down sprite animation
	this.spriteStateRepeatCount = this.REPEATCOUNT;

	/**
	 * public used initialize the animation animateYRow is used when all the sprite images compressed into
	 * single file of sprites with each row representing one animation
	 */
	this.init = function() {
		this.animateXCol = [ 0, 60, 120, 180, 240, 300, 360, 420, 480, 540 ]; // 8 frames
		this.animateYRow = 0;
		this.animateIndex = 0;
		this.x = 0;
		this.y = 0;
		this.enabled = false;
	};

	/**
	 * public used to enable and disable the animation
	 * 
	 * @param enabled
	 */
	this.setEnabled = function(enabled) {
		this.enabled = enabled;
	};

	this.animate = function() {
		if (gs.game.images[this.name] !== null) {
			this.context.drawImage(gs.game.images[this.name], this.animateXCol[this.animateIndex], this.animateYRow, this.frameW, this.frameH, this.x, this.y,
					this.frameW, this.frameH);
			this._cycleThroughAnimateIndex();
			this.y = this.y + this.ySpeed; // animate along y-axis
			--this.spriteStateRepeatCount; // decrement repeat count

			this._checkAnmTileHitPoint(this.x, this.y, this.x + this.frameW, this.y + this.frameH); // tile
			// dimensions
			this._validateAnimateStatus();

		}
	};

	/**
	 * private method checks defender tile collision with the animation
	 */
	this._checkAnmTileHitPoint = function(x1, y1, x2, y2) {
		var tileX1 = gs.game.defenderTile.x, tileY = gs.game.defenderTile.y; // top left corner
		var tileX2 = gs.game.defenderTile.x + gs.game.defenderTile.width / 2; // top mid-point
		var tileX3 = gs.game.defenderTile.x + gs.game.defenderTile.width; // top right corner

		if (gs.game.calculationConroller.isPointInPath(x1, y1, x2, y2, tileX1, tileY)
				|| gs.game.calculationConroller.isPointInPath(x1, y1, x2, y2, tileX2, tileY)
				|| gs.game.calculationConroller.isPointInPath(x1, y1, x2, y2, tileX3, tileY)) {
			this.enabled = false;
			gs.game.scoreBoardController.incrementScore(this.anmTileHitPoint);
			gs.game.scoreBoardController.singalStateChange();

			var currentLvlAnimationCount = gs.game.levelController.getCurrentLevel().getAnimationCount();
			gs.game.defenderTile.increasePowerForAnimationHit(currentLvlAnimationCount);
			// gs.game.defenderTile.increaseWidthForAnimationHit(currentLvlAnimationCount);
		}
	};

	/**
	 * cycles through the available animation point
	 */
	this._cycleThroughAnimateIndex = function() {
		if (this.spriteStateRepeatCount <= 0) {
			++this.animateIndex;
			if (this.animateIndex >= this.animateXCol.length) {
				this.animateIndex = this.animateIndex % this.animateXCol.length;
			}
			this.spriteStateRepeatCount = this.REPEATCOUNT; // reset value
		}
	};

	/**
	 * private checks if it is needed to animate any further check:if animation goes beyond the canvas
	 * boundary limits
	 */
	this._validateAnimateStatus = function() {

		/* max min boundary */
		if (this.y > this.canvas.height || this.x >= this.canvas.width || this.y < 0 || this.x < 0) {
			this.enabled = false;
		}
	};
};

/*************************************************************************************************************
 * Animation Five
 */
Game.Animation.Five = function(stage) {
	this.anmType = gs.animationType.main;
	this.name = "flipper";
	this.childAnimation = Game.Animation.Score.Three;
	this.stage = stage;
	this.canvas = this.stage.getCanvas();
	this.context = this.stage.getContext();
	this.container = this.stage.getContainer();

	this.sprite = new Image();
	this.spriteLoaded = false;
	this.ySpeed = 1;
	this.xSpeed = 0;
	this.frameW = 100;
	this.frameH = 40;

	this.anmTileHitPoint = 30 * this.ySpeed; // catching speedy animation will give more points
	this.REPEATCOUNT = 5; // used to slow down sprite animation
	this.spriteStateRepeatCount = this.REPEATCOUNT;

	/**
	 * public used initialize the animation animateYRow is used when all the sprite images compressed into
	 * single file of sprites with each row representing one animation
	 */
	this.init = function() {
		this.animateXCol = [ 0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300 ]; // 8
		this.animateYRow = 0;
		this.animateIndex = 0;
		this.x = 0;
		this.y = 0;
		this.enabled = false;
	};

	/**
	 * public used to enable and disable the animation
	 * 
	 * @param enabled
	 */
	this.setEnabled = function(enabled) {
		this.enabled = enabled;
	};
	/**
	 * public method called by implementing level to execute animation
	 */
	this.animate = function() {
		if (gs.game.images[this.name] !== null) {
			this.context.drawImage(gs.game.images[this.name], this.animateXCol[this.animateIndex], this.animateYRow, this.frameW, this.frameH, this.x, this.y,
					this.frameW, this.frameH);
			this._cycleThroughAnimateIndex();
			this.y = this.y + this.ySpeed; // animate along y-axis
			--this.spriteStateRepeatCount; // decrement repeat count

			this._checkAnmTileHitPoint(this.x, this.y, this.x + this.frameW, this.y + this.frameH); // tile
			// dimensions
			this._validateAnimateStatus();
		}
	};

	/**
	 * private method checks defender tile collision with the animation
	 */
	this._checkAnmTileHitPoint = function(x1, y1, x2, y2) {
		var tileX1 = gs.game.defenderTile.x, tileY = gs.game.defenderTile.y; // top left corner
		var tileX2 = gs.game.defenderTile.x + gs.game.defenderTile.width / 2; // top mid-point
		var tileX3 = gs.game.defenderTile.x + gs.game.defenderTile.width; // top right corner

		if (gs.game.calculationConroller.isPointInPath(x1, y1, x2, y2, tileX1, tileY)
				|| gs.game.calculationConroller.isPointInPath(x1, y1, x2, y2, tileX2, tileY)
				|| gs.game.calculationConroller.isPointInPath(x1, y1, x2, y2, tileX3, tileY)) {
			this.enabled = false;
			gs.game.scoreBoardController.incrementScore(this.anmTileHitPoint);
			gs.game.scoreBoardController.singalStateChange();

			var currentLvlAnimationCount = gs.game.levelController.getCurrentLevel().getAnimationCount();
			gs.game.defenderTile.increasePowerForAnimationHit(currentLvlAnimationCount);
			// gs.game.defenderTile.increaseWidthForAnimationHit(currentLvlAnimationCount);
		}
	};

	/**
	 * cycles through the available animation point
	 */
	this._cycleThroughAnimateIndex = function() {
		if (this.spriteStateRepeatCount <= 0) {
			++this.animateIndex;
			if (this.animateIndex >= this.animateXCol.length) {
				this.animateIndex = this.animateIndex % this.animateXCol.length;
			}
			this.spriteStateRepeatCount = this.REPEATCOUNT; // reset value
		}
	};

	/**
	 * private checks if it is needed to animate any further check:if animation goes beyond the canvas
	 * boundary limits
	 */
	this._validateAnimateStatus = function() {

		/* max min boundary */
		if (this.y > this.canvas.height || this.x >= this.canvas.width || this.y < 0 || this.x < 0) {
			this.enabled = false;
		}
	};
};

/*************************************************************************************************************
 * Animation Six
 */
Game.Animation.Six = function(stage) {
	this.anmType = gs.animationType.main;
	this.name = "icehockey";
	this.childAnimation = Game.Animation.Score.Three;
	this.stage = stage;
	this.canvas = this.stage.getCanvas();
	this.context = this.stage.getContext();
	this.container = this.stage.getContainer();

	this.sprite = new Image();
	this.spriteLoaded = false;
	this.ySpeed = 1;
	this.xSpeed = 0;
	this.frameW = 68;
	this.frameH = 72;

	this.anmTileHitPoint = 30 * this.ySpeed; // catching speedy animation will give more points
	this.REPEATCOUNT = 5; // used to slow down sprite animation
	this.spriteStateRepeatCount = this.REPEATCOUNT;

	/**
	 * public used initialize the animation animateYRow is used when all the sprite images compressed into
	 * single file of sprites with each row representing one animation
	 */
	this.init = function() {
		this.animateXCol = [ 0, 68, 136, 204, 272, 340, 408, 476, 544, 612, 680, 748 ]; // 12
		this.animateYRow = 0;
		this.animateIndex = 0;
		this.x = 0;
		this.y = 0;
		this.enabled = false;
	};

	/**
	 * public used to enable and disable the animation
	 * 
	 * @param enabled
	 */
	this.setEnabled = function(enabled) {
		this.enabled = enabled;
	};

	/**
	 * public method called by implementing level to execute animation
	 */
	this.animate = function() {
		if (gs.game.images[this.name] !== null) {
			this.context.drawImage(gs.game.images[this.name], this.animateXCol[this.animateIndex], this.animateYRow, this.frameW, this.frameH, this.x, this.y,
					this.frameW, this.frameH);
			this._cycleThroughAnimateIndex();
			this.y = this.y + this.ySpeed; // animate along y-axis
			--this.spriteStateRepeatCount; // decrement repeat count

			this._checkAnmTileHitPoint(this.x, this.y, this.x + this.frameW, this.y + this.frameH); // tile
			// dimensions
			this._validateAnimateStatus();
		}
	};

	/**
	 * private method checks defender tile collision with the animation
	 */
	this._checkAnmTileHitPoint = function(x1, y1, x2, y2) {
		var tileX1 = gs.game.defenderTile.x, tileY = gs.game.defenderTile.y; // top left corner
		var tileX2 = gs.game.defenderTile.x + gs.game.defenderTile.width / 2; // top mid-point
		var tileX3 = gs.game.defenderTile.x + gs.game.defenderTile.width; // top right corner

		if (gs.game.calculationConroller.isPointInPath(x1, y1, x2, y2, tileX1, tileY)
				|| gs.game.calculationConroller.isPointInPath(x1, y1, x2, y2, tileX2, tileY)
				|| gs.game.calculationConroller.isPointInPath(x1, y1, x2, y2, tileX3, tileY)) {
			this.enabled = false;
			gs.game.scoreBoardController.incrementScore(this.anmTileHitPoint);
			gs.game.scoreBoardController.singalStateChange();

			var currentLvlAnimationCount = gs.game.levelController.getCurrentLevel().getAnimationCount();
			gs.game.defenderTile.increasePowerForAnimationHit(currentLvlAnimationCount);
			// gs.game.defenderTile.increaseWidthForAnimationHit(currentLvlAnimationCount);
		}
	};

	/**
	 * cycles through the available animation point
	 */
	this._cycleThroughAnimateIndex = function() {
		if (this.spriteStateRepeatCount <= 0) {
			++this.animateIndex;
			if (this.animateIndex >= this.animateXCol.length) {
				this.animateIndex = this.animateIndex % this.animateXCol.length;
			}
			this.spriteStateRepeatCount = this.REPEATCOUNT; // reset value
		}
	};

	/**
	 * private checks if it is needed to animate any further check:if animation goes beyond the canvas
	 * boundary limits
	 */
	this._validateAnimateStatus = function() {

		/* max min boundary */
		if (this.y > this.canvas.height || this.x >= this.canvas.width || this.y < 0 || this.x < 0) {
			this.enabled = false;
		}
	};
};

/*************************************************************************************************************
 * used to implement the score awarded animations on brick collision in the games it is animating the score
 * statically without any movement in any direction. it is animating the available frames once only.
 */

Game.Animation.Score = function() {
};

/*************************************************************************************************************
 * Animation for winning score one
 */
Game.Animation.Score.One = function(stage) {
	// place holders you it first
};

/*************************************************************************************************************
 * Animation for winning score Two
 */
Game.Animation.Score.Two = function(stage) {
	// place holders you it first
};

/*************************************************************************************************************
 * Animation for winning score Three with fireblast
 */
Game.Animation.Score.Three = function(stage) {
	this.anmType = gs.animationType.bonusPoint;
	this.name = "fireBlast";
	this.className = "Game.Animation.Score.Three";
	this.bonusPoints = 1000;
	this.stage = stage;
	this.canvas = this.stage.getCanvas();
	this.context = this.stage.getContext();
	this.container = this.stage.getContainer();

	this.sprite = new Image();
	this.spriteLoaded = false;
	this.ySpeed = 0;
	this.xSpeed = 0;
	this.frameW = 63;
	this.frameH = 83;

	this.REPEATCOUNT = 5; // used to slow down sprite animation
	this.spriteStateRepeatCount = this.REPEATCOUNT;

	/**
	 * public used initialize the animation animateYRow is used when all the sprite images compressed into
	 * single file of sprites with each row representing one animation
	 */
	this.init = function() {
		this.animateXCol = [ 0, 63, 126, 189, 252, 315, 378, 441, 504, 567, 630, 693, 756 ]; // 13 frames
		this.animateYRow = 0;
		this.animateIndex = 0;
		this.x = 0;
		this.y = 0;
		this.enabled = false;
	};

	/**
	 * public used to enable and disable the animation
	 * 
	 * @param enabled
	 */
	this.setEnabled = function(enabled) {
		this.enabled = enabled;
	};

	this.animate = function() {
		if (gs.game.images[this.name] !== null) {
			this.context.drawImage(gs.game.images[this.name], this.animateXCol[this.animateIndex], this.animateYRow, this.frameW, this.frameH, this.x, this.y,
					this.frameW, this.frameH);
			this._cycleThroughAnimateIndex();
			// this.y = this.y + this.ySpeed; // animate along y-axis
			--this.spriteStateRepeatCount; // decrement repeat count
		}
		this._validateAnimateStatus();
	};

	/**
	 * cycles through the available animation point
	 */
	this._cycleThroughAnimateIndex = function() {
		if (this.spriteStateRepeatCount <= 0) {
			++this.animateIndex;
			this.spriteStateRepeatCount = this.REPEATCOUNT; // reset value
		}
	};

	/**
	 * private checks if it is needed to animate any further check:if all the frames have been animated
	 */
	this._validateAnimateStatus = function() {
		if (this.animateIndex >= this.animateXCol.length) {
			this.enabled = false;
		}
	};
};

/*************************************************************************************************************
 * used to implement animating background for each level
 */
Game.Animation.LevelBG = function() {
	this.className = "Game.Animation.LevelBG";
	this.visibleHeight = 0;
	this.bgContainer = new Array();

	this.init = function(currenLevelIndex) {
		gs.game.alphabetBGPaintController.clear();
		this.bgContainer[currenLevelIndex].spriteStateRepeatCount = this.bgContainer[currenLevelIndex].REPEATCOUNT;
		this.bgContainer[currenLevelIndex].x = 0;
		this.bgContainer[currenLevelIndex].y = 0;
	};

	this.updateBGFrame = function(levelIndex, totalBricks, brickBrokenCount) {
		if (brickBrokenCount <= totalBricks) {  // must be
			this.visibleHeight = this.bgContainer[levelIndex].frameH * brickBrokenCount / totalBricks;
		}
		gs.game.alphabetBGPaintController.drawPartialFrame(this.visibleHeight, this.bgContainer[levelIndex].bgImage, this.bgContainer[levelIndex].frameW,
				this.bgContainer[levelIndex].frameH); // (topHeight, imageHandle, frameW, frameH){
	};

	this.animateBackground = function(levelIndex) {
		gs.game.alphabetBGPaintController.drawBGFrame(this.bgContainer[levelIndex].bgImage, this.bgContainer[levelIndex].x,
				this.bgContainer[levelIndex].frameW, this.bgContainer[levelIndex].frameH);
		--this.bgContainer[levelIndex].spriteStateRepeatCount; // decrement repeat count
		this._cycleThroughAnimateIndex(levelIndex);

	};

	/**
	 * cycles through the available animation point
	 */
	this._cycleThroughAnimateIndex = function(levelIndex) {
		if (this.bgContainer[levelIndex].spriteStateRepeatCount <= 0) {
			this.bgContainer[levelIndex].x = (this.bgContainer[levelIndex].x + this.bgContainer[levelIndex].frameW) % this.bgContainer[levelIndex].imageW;
			this.bgContainer[levelIndex].spriteStateRepeatCount = this.bgContainer[levelIndex].REPEATCOUNT; // reset
			// value
		}
	};

	this.load = function() {
		// equal to the number of active levels count

		this.bgContainer.push({
			bgImage : "bgAForApple",
			frameW : 320,
			frameH : 480,
			imageW : 960,
			x : 0,
			y : 0,
			REPEATCOUNT : 45,
			spriteStateRepeatCount : 45
		});
		this.bgContainer.push({
			bgImage : "bgAForApple",
			frameW : 320,
			frameH : 480,
			imageW : 960,
			x : 0,
			y : 0,
			REPEATCOUNT : 45,
			spriteStateRepeatCount : 45
		});
		this.bgContainer.push({
			bgImage : "bgAForApple",
			frameW : 320,
			frameH : 480,
			imageW : 960,
			x : 0,
			y : 0,
			REPEATCOUNT : 45,
			spriteStateRepeatCount : 45
		});
		this.bgContainer.push({
			bgImage : "bgAForApple",
			frameW : 320,
			frameH : 480,
			imageW : 960,
			x : 0,
			y : 0,
			REPEATCOUNT : 45,
			spriteStateRepeatCount : 45
		});
		this.bgContainer.push({
			bgImage : "bgAForApple",
			frameW : 320,
			frameH : 480,
			imageW : 960,
			x : 0,
			y : 0,
			REPEATCOUNT : 45,
			spriteStateRepeatCount : 45
		});
		this.bgContainer.push({
			bgImage : "bgAForApple",
			frameW : 320,
			frameH : 480,
			imageW : 960,
			x : 0,
			y : 0,
			REPEATCOUNT : 45,
			spriteStateRepeatCount : 45
		});
		this.bgContainer.push({
			bgImage : "bgAForApple",
			frameW : 320,
			frameH : 480,
			imageW : 960,
			x : 0,
			y : 0,
			REPEATCOUNT : 45,
			spriteStateRepeatCount : 45
		});
		this.bgContainer.push({
			bgImage : "bgAForApple",
			frameW : 320,
			frameH : 480,
			imageW : 960,
			x : 0,
			y : 0,
			REPEATCOUNT : 45,
			spriteStateRepeatCount : 45
		});
		this.bgContainer.push({
			bgImage : "bgAForApple",
			frameW : 320,
			frameH : 480,
			imageW : 960,
			x : 0,
			y : 0,
			REPEATCOUNT : 45,
			spriteStateRepeatCount : 45
		});
		this.bgContainer.push({
			bgImage : "bgAForApple",
			frameW : 320,
			frameH : 480,
			imageW : 960,
			x : 0,
			y : 0,
			REPEATCOUNT : 45,
			spriteStateRepeatCount : 45
		});
		this.bgContainer.push({
			bgImage : "bgAForApple",
			frameW : 320,
			frameH : 480,
			imageW : 960,
			x : 0,
			y : 0,
			REPEATCOUNT : 45,
			spriteStateRepeatCount : 45
		});
		this.bgContainer.push({
			bgImage : "bgAForApple",
			frameW : 320,
			frameH : 480,
			imageW : 960,
			x : 0,
			y : 0,
			REPEATCOUNT : 45,
			spriteStateRepeatCount : 45
		});
		this.bgContainer.push({
			bgImage : "bgAForApple",
			frameW : 320,
			frameH : 480,
			imageW : 960,
			x : 0,
			y : 0,
			REPEATCOUNT : 45,
			spriteStateRepeatCount : 45
		});
		this.bgContainer.push({
			bgImage : "bgAForApple",
			frameW : 320,
			frameH : 480,
			imageW : 960,
			x : 0,
			y : 0,
			REPEATCOUNT : 45,
			spriteStateRepeatCount : 45
		});
		this.bgContainer.push({
			bgImage : "bgAForApple",
			frameW : 320,
			frameH : 480,
			imageW : 960,
			x : 0,
			y : 0,
			REPEATCOUNT : 45,
			spriteStateRepeatCount : 45
		});

		// validate if bgContainer is having background equal to the levels count
		if (this.bgContainer.length < gs.game.levelController.levelCount) {
			console.log(this.className + ".load()" + "BackContainer length is not equal to the LevelContainer.");
		}
	};
};
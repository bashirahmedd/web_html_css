
/*******************************************************************************
 * Game GameLeveLController Class Construction
 */
Game.LevelController = function(stage) {
	this.stage = stage;
	this.canvas = this.stage.getCanvas();
	this.context = this.stage.getContext();
	this.container = this.stage.getContainer();

	this.levels = new Array();
	this.currentLevelIndex = 0; 
	this.totalLevel = 1;   //default, updated in initializeLevel
};


/*******************************************************************************
 * public method isGameCompleted
 */
Game.LevelController.prototype.levelCount = function() {
	return this.levels.length; 
};

/*******************************************************************************
 * public method isGameCompleted
 */
Game.LevelController.prototype.isGameCompleted = function() {
	return this.currentLevelIndex === (this.totalLevel -1); 
};


/*******************************************************************************
 * Get next level index in cyclic format using modulus operatation and
 * totalLevel count
 */
Game.LevelController.prototype.nextLevelIndex = function() {
	return (this.currentLevelIndex + 1) % this.totalLevel;
};

/*******************************************************************************
 * Get level for the given index
 * 
 */
Game.LevelController.prototype.getLevel = function(index) {
	return this.levels[index];
};

/*******************************************************************************
 * public method Get current level
 * 
 */
Game.LevelController.prototype.getCurrentLevel=function(){
	return this.levels[this.currentLevelIndex];
};

/*******************************************************************************
 * setRequiredEvent
 */
Game.LevelController.prototype.setRequiredEvent = function() {
	/* Container click event */
	this.container.addEventListener("click", Game.LevelController._cbGameClickEventHandler, false);
};

/*******************************************************************************
 * Static function to create callback for game state controller
 * relies on game state and the level's state to active called nextFunc
 * very crucial callback, puts the game into play event loop depending upon 
 * the previous state to the game 
 */
Game.LevelController._cbGameClickEventHandler = function() {
	//debugger;
	var level = gs.game.levelController.levels[gs.game.levelController.currentLevelIndex];
	switch (gs.currentGameState) {
	case gs.gameState.splashScreen: {
		gs.game.levelController.initializeLevel();
		break;
	}
	case gs.gameState.playLevel: {
		if (level.nextFunc === "lost") { // if lost
			level[level.nextFunc]();
		} else if (level.nextFunc === "won") {
			/* call to the completed to wind up */
			level[level.nextFunc]();
			/* set environment to play next level */
			gs.game.levelController.currentLevelIndex = gs.game.levelController.nextLevelIndex(); // setNextLevelAsCurrent
			gs.game.levelController.initializeLevel();
		} else if(level.nextFunc === "pause"){
			level.nextFunc = "play";
			gs.game.levelController.initializeLevel();
		}else {			
			level.nextFunc = "pause";
		}
		break;
	}
	case gs.gameState.allLevelCompleted: {
		level[level.nextFunc]();
		break;
	}
	case gs.gameState.allBallConsumed: {  //level will be reset to the first one.
		level[level.nextFunc]();
		break;
	}
	default:
		;
	}
};

/*******************************************************************************
 * intialize all the game level handlers
 */
Game.LevelController.prototype.initializeGameLevels = function(stage) {

	this.levels.push(new Level.One(this.stage));
	this.levels.push(new Level.Six(this.stage));
	this.levels.push(new Level.Two(this.stage));
	this.levels.push(new Level.Three(this.stage));
	this.levels.push(new Level.ThreeDotOne(this.stage));
	this.levels.push(new Level.Four(this.stage));
	this.levels.push(new Level.FourDotOne(this.stage));
	this.levels.push(new Level.Five(this.stage));
	this.levels.push(new Level.FiveDotOne(this.stage));
	this.levels.push(new Level.FourDotTwo(this.stage));
	this.levels.push(new Level.FourDotThree(this.stage));
	this.levels.push(new Level.OneDotOne(this.stage));
	this.levels.push(new Level.OneDotTwo(this.stage));
	this.levels.push(new Level.OneDotThree(this.stage));
	this.levels.push(new Level.FiveDotTwo(this.stage));
	
	//extend all with Mother static functions
	for(var i=0; i < this.levels.length; ++i){
		_.extend(this.levels[i], Level.Mother);	
	}
	
		
	this.totalLevel=this.levels.length;
};

/*******************************************************************************
 * initializeLevel step through initial phases of ("init" and "load") make call
 * to animate with current phase "play"
 */
Game.LevelController.prototype.initializeLevel = function() {
	/*paint the scoreboard*/
	gs.game.scoreBoardController.triggerLevelChange();
	gs.game.scoreBoardController.triggerBallChange();
	
	/* Execute the initial step to prepare level for execution */
	var level = this.levels[this.currentLevelIndex];
	while (true) {
		if (level.nextFunc !== "play") {
			level[level.nextFunc]();
		} else {
			break;
		}
	}
	
	gs.currentGameState = gs.gameState.playLevel; // set game status to play
	var date = new Date();
	var time = date.getTime();
	//animate(time, level);
	Game.AnimateEventLoop.animate(time, level);
};

/*******************************************************************************
 * Get next level index in cyclic format using modulus operatation and
 * totalLevel count
 */
Game.LevelController.prototype.pause = function() {
	var level = this.levels[this.currentLevelIndex];
	level[level.nextFunc]();
	
	var levelName = parseInt(this.currentLevelIndex) + 1; 
	var prompt=new Array();
	prompt.push({text: '<class="heading1"> Level ' + levelName + '</class> <br/>is paused.', y:150 });
	prompt.push({text: '<class="heading2"> Please click again </class> <br/>to continue...', y:200 });
	gs.game.textPaintConroller.paintPrompt(prompt, false);
};

/*******************************************************************************
 * replayLevel
 */
Game.LevelController.prototype.replayLevel = function() {	
	var levelName = parseInt(this.currentLevelIndex) + 1; 
	var prompt=new Array();
	prompt.push({text: '<class="heading1"> Level ' + levelName + '</class> <br/>   cannot be completed!', y:100 });
	prompt.push({text: '<class="heading2">Please</class> click to try again...', y:150 });
	gs.game.textPaintConroller.paintPrompt(prompt, true);
};

/*******************************************************************************
 * playNextLevel
 */
Game.LevelController.prototype.playNextLevel = function() {
	var levelName = parseInt(this.currentLevelIndex) + 1; 
	var prompt=new Array();
	prompt.push({text: '<class="heading1"> Level ' + levelName + '</class> <br/>  is completed successfully!', y:100 });
	prompt.push({text: '<class="heading2">Please</class> click to continue ...', y:150 });
	gs.game.textPaintConroller.paintPrompt(prompt, true);
};

/*******************************************************************************
 * gameCompleted
 */
Game.LevelController.prototype.gameCompleted = function() {
	gs.game.scoreBoardController.triggerLevelChange();
	var prompt=new Array();
	prompt.push({text: '<class="heading1"> Congratulat!on </class> <br/>  Game is completed successfully', y:100 });
	prompt.push({text: '<class="heading2">Please</class> click to begin ...', y:150 });
	gs.game.textPaintConroller.paintPrompt(prompt, true);
};

/*******************************************************************************
 * gameOver with all balls consumed
 */
Game.LevelController.prototype.gameOver = function() {
	var prompt=new Array();
	prompt.push({text: '<class="heading1"> Unfortunately </class> <br/> Game is over.', y:100 });
	prompt.push({text: '<class="heading2">Please</class> click to restart ...', y:150 });
	gs.game.textPaintConroller.paintPrompt(prompt, true);
};
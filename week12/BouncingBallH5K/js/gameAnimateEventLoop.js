window.requestAnimFrame = (function(callback) {
	if (window.requestAnimationFrame) {
		console.log("requestAnimationFrame found");
		return window.requestAnimationFrame;
	} else if (window.webkitRequestAnimationFrame) {
		console.log("webkitRequestAnimationFrame found");
		return window.webkitRequestAnimationFrame;
	} else if (window.mozRequestAnimationFrame) {
		console.log("mozRequestAnimationFrame found");
		return window.mozRequestAnimationFrame;
	} else if (window.oRequestAnimationFrame) {
		console.log("oRequestAnimationFrame found");
		return window.oRequestAnimationFrame;
	} else if (window.msRequestAnimationFrame) {
		console.log("msRequestAnimationFrame found");
		return window.msRequestAnimationFrame;
	} else {
		console.log("requestAnimationFrame not found, setTimeout returned");
		return function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
	}
	// return window.requestAnimationFrame || window.webkitRequestAnimationFrame
	// || window.mozRequestAnimationFrame || window.oRequestAnimationFrame
	// || window.msRequestAnimationFrame || function(callback) {
	// window.setTimeout(callback, 1000 / 60);
	// };
})();

/**
 * Container for all the static animate methods of the game
 */
Game.AnimateEventLoop = function() {
};

/**
 * global function relies on the currently playing level's state called nextFunc according to that either
 * continues the play loop of the game or show prompt for non-playing state along-with the termination of the
 * event play loop.
 * 
 * @param lastTime
 * @param level
 */
Game.AnimateEventLoop.animate = function(lastTime, level) {
	var date = new Date();
	var time = date.getTime();
	var timeDiff = time - lastTime;
	/*
	 * correct time differ to start with smooth animation if it is less than 60fps to avoid surprises in the
	 * startup if greater than 30 fps then set 1000 / 60 = 16.6 msec
	 */
	if (timeDiff > 1000 / 30) {
		timeDiff = 1000 / 60;
	}
	/*
	 * use this in case the lower one is not working eval("obj."+funcName + "("+timeDiff+")");
	 */
	if (level.nextFunc === "play") {
		level[level.nextFunc](timeDiff);
		requestAnimFrame(function() {
			Game.AnimateEventLoop.animate(time, level);
		});
	} else {
		if (level.nextFunc === "lost") {
			gs.game.levelController.replayLevel();
		} else if (level.nextFunc === "won") { // won
			gs.game.levelController.playNextLevel();
		} else if (level.nextFunc === "pause") {
			gs.game.levelController.pause();
		} else if (level.nextFunc === "gameOver") {
			gs.game.levelController.gameOver();
		} else if (level.nextFunc === "gameCompleted") {
			gs.game.levelController.gameCompleted();
		}
	}
};

/**
 * Animate the Level background on its completion
 */
Game.AnimateEventLoop.animateBGOnLCompletion = function(level) {
	gs.game.animationLevelBG.animateBackground(gs.game.levelController.currentLevelIndex);

	if (level.nextFunc === "won" || level.nextFunc === "gameCompleted") {
		requestAnimFrame(function() {
			Game.AnimateEventLoop.animateBGOnLCompletion(level);
		});
	}else{		
		gs.game.animationLevelBG.init(gs.game.levelController.currentLevelIndex);
	}
};

console.log("loaded script file: animate.js");

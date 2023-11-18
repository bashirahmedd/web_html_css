/*************************************************************************************************************
 * GameLeveLController Class Construction this is used to do mathematical calculations for the game
 */
Game.CalculationController = function(stage) {
	this.stage = stage;
};

/**
 * calculates a point (x,y) exists in the region bounded by points (x1, y1) and (x2, y2)
 */
Game.CalculationController.prototype.isPointInPath = function(x1, y1, x2, y2, x, y) {
	if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
		return true;
	}
	return false;
};

/**
 * calculates a ball presence in the region bounded by points (x1, y1) and (x2, y2) 
 * depending upon the moving ball direction for the performance reason
 */

Game.CalculationController.prototype.isBallInRegion = function(x1, y1, x2, y2, ball) {
	/* inner displacement within for the points on the circumference */
	var deltaDisplacement = ball.radius / 3;

	if (ball.vy > 0) { // moving down (lower right-side point && upper left-side point)
		return this.isPointInPath(x1, y1, x2, y2, ball.x + deltaDisplacement, ball.y + ball.radius - deltaDisplacement)
				|| this.isPointInPath(x1, y1, x2, y2, ball.x - deltaDisplacement, ball.y - ball.radius + deltaDisplacement);
	} else { // moving up ( upper left-side && point lower right-side point)
		return this.isPointInPath(x1, y1, x2, y2, ball.x - deltaDisplacement, ball.y - ball.radius + deltaDisplacement)
				|| this.isPointInPath(x1, y1, x2, y2, ball.x + deltaDisplacement, ball.y + ball.radius - deltaDisplacement);
	}
};
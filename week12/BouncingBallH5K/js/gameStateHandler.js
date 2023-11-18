/*******************************************************************************
 * Game GameLeveLController Class Construction
 */
Game.StateHandler = function (stage) {
	this.stage = stage;
	this.canvas = this.stage.getCanvas();
	this.context = this.stage.getContext();
	this.container = this.stage.getContainer();
};
Game.StateHandler.prototype.showSplashScreen = function () {
	gs.currentGameState = gs.gameState.splashScreen;

	var prompt = new Array();
	prompt.push({ text: '<class="heading2">Welcome to </class>', y: 100 });
	prompt.push({ text: '<class="heading1">Bouncing Ball</class>', y: 130 });
	prompt.push({ text: '<class="heading2">Click </class>to start...', y: 160 });
	prompt.push({ text: '<class="heading2">HTML5 Game Demo</class>', y: 370 });
	//prompt.push({ text: '<class="heading1">TBC</class> <br/> Ontario, Canada', y: 400 });
	prompt.push({ text: 'Ontario, Canada', y: 400 });
	gs.game.textPaintConroller.paintPrompt(prompt, true);

	var line = function () { };
	line.strokeStyle = "#FF0000";
	line.x1 = 10;
	line.y1 = 340;
	line.x2 = 300;
	line.y2 = 340;
	gs.game.paintConroller.drawLine(line);  //upper line
	line.x1 = 10;
	line.y1 = 420;
	line.x2 = 300;
	line.y2 = 420;
	gs.game.paintConroller.drawLine(line);  //lower line

};
console.log("loaded script file: gameStateHandler.js");
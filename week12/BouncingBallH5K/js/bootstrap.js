window.onload = function() {
	/*create a game stage*/
	var stage = new Game.Stage("divContent", gs.screen.width, gs.screen.height);
	Game.ResourceController.loadImages();
	gs.game.levelController = new Game.LevelController(stage);
		
	gs.game.stateHandler = new Game.StateHandler(stage);
	gs.game.scoreBoardController = new Game.ScoreBoard(stage);
	gs.game.calculationConroller = new Game.CalculationController(stage);
	gs.game.scoreBoardController.init();   //initialize
	gs.game.animationLevelBG= new Game.Animation.LevelBG();
	gs.game.animationLevelBG.load();
	
	gs.game.defenderTile = new Game.Material.Tile(stage);
	gs.game.breakerBall = new Game.Material.Ball(stage);
	
	/*game level initializer*/
	gs.game.levelController.initializeGameLevels();
	gs.game.levelController.setRequiredEvent();

	/*paint controller*/
	gs.game.textPaintConroller = new Game.TextPaintController(stage);
	gs.game.paintConroller =new Game.PaintController(stage);
	
	gs.game.scoreBoardTextPaintController = new  Game.ScoreBoardTextPaintController(stage);
	gs.game.scoreBoardPaintController = new Game.ScoreBoardPaintController(stage);
	
	gs.game.alphabetBGPaintController= new Game.AlphabetBGPaintController(stage);
			
	/*show splash screen*/
	gs.game.paintConroller.drawGameFrame();
	gs.game.stateHandler.showSplashScreen();
	
	
};
console.log("loaded script file: bootstrap.js");
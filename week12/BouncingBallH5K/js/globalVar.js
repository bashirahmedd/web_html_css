/*******************************************************************************
 * Global Game's top container namespaces for Level and Game
 */

var Level = function(){};
var Game = function(){};
var Util = function(){};

/*******************************************************************************
 * Global Scope 
 * 1. share variables are prefixed with g<VariableName>
 */
var gs = function(){};

/**
 * global objects for the game 
 * use undefined instead of null to initialize
 */
gs.game = function(){};
gs.game.levelController = null;
gs.game.stateHandler = null;

gs.game.paintConroller = null;
gs.game.textPaintConroller = null;

gs.game.scoreBoardPaintController = null;
gs.game.scoreBoardTextPaintController = null;
gs.game.alphabetBGPaintController = undefined;



gs.game.calculationConroller = null;
gs.game.scoreBoardController = null;
gs.game.defenderTile = null;
gs.game.breakerBall = null;


gs.game.animationLevelBG=undefined;

/**
 * screen dimensions for the game
 */
gs.screen=function(){};
gs.screen.height = 480;
gs.screen.width = 320;
gs.screen.scoreBoardHeight = 21;
gs.screen.scoreBoardY = 470;

/**
 * over all game state used in the call back for click event
 * to proceed to next state of the game
 * use undefined instead of null to initialize
 */
gs.gameState = function(){};
gs.gameState.splashScreen=0;
gs.gameState.playLevel = 1;
gs.gameState.allLevelCompleted = 2;
gs.gameState.allBallConsumed = 3;
gs.gameState.pausePlay=4;
gs.gameState.unpausePlay=5;
gs.currentGameState=null;

/**
 * animation types played on brick breaking 
 */
gs.animationType = function(){};
gs.animationType.main=0;
gs.animationType.bonusPoint=1;

/**
 * Resources
 */
gs.game.images = function(){};







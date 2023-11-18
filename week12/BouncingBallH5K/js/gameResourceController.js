Game.ResourceController = function(stage) {
};

Game.ResourceController.loadImages = function(cbSuccess, cbFailure) {
	var loadedImages = 0;
	var numImages = 0;
	var imageMap = {
		/* score board related */
		scoreBoardLife : "image/scoreBoardLife_44_48.png",
		
		/* animations */
		sunnysmile : "image/bonusAnimation/sunnysmile_62_62.png",
		smile : "image/bonusAnimation/smile_50_46.png",
		hund : "image/bonusAnimation/hund_62_62.png",
		elg : "image/bonusAnimation/elg_60_82.png",
		flipper : "image/bonusAnimation/flipper_100_40.png",
		icehockey : "image/bonusAnimation/icehockey_68_72.png",
		
		/* child animation */
		fireBlast : "image/bonusAnimation/fireBlast_63_83.png",
		
		/*backgrounds for each alphabet*/
		bgAForApple : "image/kindergartenAlphabets/apple_320_480.png"
			
	};

	for ( var src in imageMap) {
		numImages++;
	}

	for ( var src in imageMap) {
		gs.game.images[src] = new Image();
		gs.game.images[src].onload = function() {
			if (++loadedImages >= numImages) {
				// cbSuccess(showViewCall);
				console.log("All the images are loaded successfully.");
			}
		};
		gs.game.images[src].onerror = function() {
			// cbFailure(showViewCall);
			console.log("Images could not be loaded.");
		};
		gs.game.images[src].src = imageMap[src];
	}
};

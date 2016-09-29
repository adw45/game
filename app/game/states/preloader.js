var TextConfigurer = require("../util/text_configurer");


var Preloader = function(_game) {
	var game = _game;
	function preload() {
		displayLoader(game);
		game.load.tilemap("map", "assets/map/Levels/Multi-1/Multi-1-map.json", null, Phaser.Tilemap.TILED_JSON);
		game.load.image("tiles", "assets/tiles/volcano-tileset.png");
		game.load.spritesheet("granny", "assets/textures/granny.png");
		game.load.spritesheet("zombie", "assets/textures/zombie.png", 157, 102);
		game.gamestate = {
			zombies: [],
			checkpoints: [],
			grannies: [],
			grannyPointer: 0
		}

		cursors = game.input.keyboard.createCursorKeys();
		mouse = game.input.mouse;
	}
	
	function displayLoader() {
		var text = game.add.text(game.camera.width / 2, 250, "Loading... ");
		text.anchor.setTo(.5, .5);
		TextConfigurer.configureText(text, "white", 32);

		game.load.onFileComplete.add(function(progress) {
			text.setText("Loading... " + progress + "%");
		}, this);

		game.load.onLoadComplete.add(function() {
			game.state.start("GameState");
		});
	}

	return { 
		preload: preload 
	};
};

module.exports = Preloader;

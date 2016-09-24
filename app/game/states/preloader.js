var TextConfigurer = require("../util/text_configurer");
var loadedSprites = require("json!../../../assets/map/Levels/Multi-1/multi-1.json");

var Preloader = function() {};

module.exports = Preloader;

Preloader.prototype = {
	preload: function() {
		this.displayLoader();
		this.load.tilemap("map", "assets/map/Levels/Multi-1/Multi-1-map.json", null, Phaser.Tilemap.TILED_JSON);
		this.load.image("tiles", "assets/tiles/volcano-tileset.png");
		this.load.spritesheet("granny", "assets/textures/granny.png");
		this.load.spritesheet("enemy", "assets/textures/zombie.png", 157, 102);
		game.loadSprites = loadedSprites;

		cursors = game.input.keyboard.createCursorKeys();
		mouse = game.input.mouse;
	},

	displayLoader: function() {
		this.text = game.add.text(game.camera.width / 2, 250, "Loading... ");
    	this.text.anchor.setTo(.5, .5);
		TextConfigurer.configureText(this.text, "white", 32);

    	this.load.onFileComplete.add(function(progress) {
	        this.text.setText("Loading... " + progress + "%");
	    }, this);

    	this.load.onLoadComplete.add(function() {
			game.state.start("Level");
	    });
	}
}

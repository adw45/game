var Player = require("../entities/player");
var TextConfigurer = require("../util/text_configurer");

var Level = function () {};

module.exports = Level;

Level.prototype.create = function() { 
	// initialize things
	level = this;
	this.initializeMap();
	game.physics.startSystem(Phaser.Physics.ARCADE);
	this.player = this.initializePlayer();
	this.initializeGameCamera();

	// setup keyboard input
	this.cursors = game.input.keyboard.createCursorKeys();
	game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.wasd = {
		'up' : game.input.keyboard.addKey(Phaser.Keyboard.W),
		'down' : game.input.keyboard.addKey(Phaser.Keyboard.S),
		'left' : game.input.keyboard.addKey(Phaser.Keyboard.A),
		'right' :game.input.keyboard.addKey(Phaser.Keyboard.D)
	}
	//on keyboard input toggle camera
	game.input.keyboard.onDownCallback = this.toggleCamera;
	// add player to keyboard context
	game.input.keyboard.player = this.player;
	
};

Level.prototype.toggleCamera = function() {
	//if spacebar was hit, toggle camera
	if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
		if (game.camera.following === true) {
			//unfollow
			game.camera.following = false;
			game.camera.unfollow();
		} else {
			//follow player
			game.camera.following = true;
			game.camera.follow(level.player);
		}	
	}	
};

Level.prototype.update = function() {
	//game camera updates
	this.moveGameCamera();
};

Level.prototype.render = function() {
	//Show game stats - fps, camera location, sprite location
	//game.debug.cameraInfo(game.camera, 32, 32);
};

Level.prototype.initializeGameCamera = function () {
	//set camaera to follow character
	game.camera.following = true;
	game.camera.follow(this.player);
};

Level.prototype.initializeMap = function() {
	//read from tilemap "map"
	this.map = game.add.tilemap("map");
	//tileset = volcano-set (inside Lava-1.json, tiles is from preloaded image
	this.map.addTilesetImage("volcano-tileset", "tiles", 16, 16);

	//Create Ground Layer
	this.groundLayer = new Phaser.TilemapLayer(game, this.map, this.map.getLayerIndex("Ground"), game.width, game.height);
	game.world.addAt(this.groundLayer, 0);
	this.groundLayer.resizeWorld();		
	
	//Create Wall Layer, add collision tiles, eneable physics. 
	this.blockLayer = new Phaser.TilemapLayer(game, this.map, this.map.getLayerIndex("Wall"), game.width, game.height);
    game.world.addAt(this.blockLayer, 1);
    this.map.setCollision([160, 161, 189, 190, 191, 192, 220, 221, 222], true, "Wall");
	this.blockLayer.resizeWorld(); 
	game.physics.arcade.enable(this.blockLayer);

	//Create Death Layer, add collision tiles, enable physics.
	this.deathLayer = new Phaser.TilemapLayer(game, this.map, this.map.getLayerIndex("Lava"), game.width, game.height);
    game.world.addAt(this.deathLayer, 2);
    this.map.setCollision([121, 124, 152, 154, 184, 211, 213, 214, 400, 401, 402, 430, 431, 432, 460, 461, 462], true, "Lava");		
    this.deathLayer.resizeWorld();
    game.physics.arcade.enable(this.deathLayer);
};

Level.prototype.initializePlayer = function() {
	// create a new player at that spawn location.
	return new Player(10, 100);
};

Level.prototype.moveGameCamera = function() {
	//check if camera is set to follow character
	if (game.camera.following == false) {
		// move camera
		if (this.wasd.up.isDown) {
			game.camera.y -= 4;
		}
		if (this.wasd.down.isDown) {
			game.camera.y += 4;
		}
		if (this.wasd.left.isDown) {
			game.camera.x -= 4;
		}
		if (this.wasd.right.isDown) {
			game.camera.x += 4;
		}
	}
};
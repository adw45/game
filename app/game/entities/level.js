var Player = require("../entities/player");
var Enemy = require("../entities/zombie");
var Checkpoint = require("../entities/checkpoint");
var TextConfigurer = require("../util/text_configurer");

var Level = function () {
	function createMap(game) {
		// read from tilemap "map"
		map = game.add.tilemap("map");
		//tileset = volcano-set (inside Lava-1.json, tiles is from preloaded image
		map.addTilesetImage("volcano-tileset", "tiles", 16, 16);

		// Create Ground Layer
		groundLayer = new Phaser.TilemapLayer(game, map, map.getLayerIndex("Ground"), game.width, game.height);
		game.world.addAt(groundLayer, 0);
		groundLayer.resizeWorld();

		// Create Wall Layer, add collision tiles, eneable physics.
		blockLayer = new Phaser.TilemapLayer(game, map, map.getLayerIndex("Wall"), game.width, game.height);
		game.world.addAt(blockLayer, 1);
		map.setCollision([160, 161, 189, 190, 191, 192, 220, 221, 222], true, "Wall");
		blockLayer.resizeWorld();
		game.physics.arcade.enable(blockLayer);

		// Create Death Layer, add collision tiles, enable physics.
		deathLayer = new Phaser.TilemapLayer(game, map, map.getLayerIndex("Lava"), game.width, game.height);
		game.world.addAt(deathLayer, 2);
		map.setCollision([121, 124, 152, 154, 184, 211, 213, 214, 400, 401, 402, 430, 431, 432, 460, 461, 462], true, "Lava");
		deathLayer.resizeWorld();
		game.physics.arcade.enable(deathLayer);
	}

	return {
		createMap: createMap
	}
};

module.exports = Level();

//game.grannyPointer = 0;

/*Level.prototype.create = function() {
	game.grannyCounter = 0;
	// initialize things
	level = this;
	this.lives = 10;
	this.enemies = [];
	this.players = [];
	game.physics.startSystem(Phaser.Physics.ARCADE);

	this.initializeCheckpoints();
	this.initializeEnemies();
	this.initializePlayer();
	this.setupGrannyController();

	this.initializeGameCamera();

	// initialize the "onclick" function
	game.input.onDown.add(this.moveGranny, this);

	// setup keyboard input
	spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	this.wasd = {
		'up' : game.input.keyboard.addKey(Phaser.Keyboard.W),
		'down' : game.input.keyboard.addKey(Phaser.Keyboard.S),
		'left' : game.input.keyboard.addKey(Phaser.Keyboard.A),
		'right' :game.input.keyboard.addKey(Phaser.Keyboard.D)
	};

	// on keyboard input toggle camera
	game.input.keyboard.onDownCallback = this.toggleCamera;
};

Level.prototype.moveGranny = function(point) {
	this.players[game.grannyPointer].move(point);
}

Level.prototype.killGranny = function(granny) {
	try {
		do {
			game.grannyPointer++;
		} while(this.players[game.grannyPointer].isDead)
	} catch(ex) {
		console.log("the end");
	}
	 
	granny.kill();
}

Level.prototype.update = function() {
	// game camera updates
	this.moveGameCamera();

	// disply checkpoints squares
	for (i = 0; i < this.checkpoints.length; i++) {
		this.checkpoints[i].update();
	}
};

Level.prototype.render = function() {
	// Show game stats - fps, camera location, sprite location
	//game.debug.cameraInfo(game.camera, 32, 32);
};


Level.prototype.initializePlayer = function() {
	var i = 0;
	game.loadSprites.checkpoints[0].spawnpoints.forEach(function(spawnpoint) {
		level.players[i++] = new Player(spawnpoint.x, spawnpoint.y);
	});
};

Level.prototype.initializeEnemies = function() {
	game.loadSprites.zombies.forEach(function(zombie) {
		level.enemies.push(new Enemy(zombie.position, zombie.speed));
	});
};

Level.prototype.initializeCheckpoints = function() {
	this.checkpoints =
	[
		new Checkpoint(0, 80, 64, 80, true, 1),
		new Checkpoint(336, 542, 80, 64, false, 2),
		new Checkpoint(750, 96, 80, 48, false, 3),
		new Checkpoint(1506, 338, 92, 80, false, 4, true)
	];
};

Level.prototype.setupGrannyController = function() {
	game.input.keyboard.addKey(Phaser.Keyboard.ONE).processKeyDown = function() {
		if (!level.players[0].isDead) {
			game.grannyPointer = 0;
			game.camera.follow(level.players[game.grannyPointer]);
		}
	}
	game.input.keyboard.addKey(Phaser.Keyboard.TWO).processKeyDown = function() {
		if (!level.players[1].isDead) {
			game.grannyPointer = 1;
			game.camera.follow(level.players[game.grannyPointer]);
		}
	}
	game.input.keyboard.addKey(Phaser.Keyboard.THREE).processKeyDown = function() {
		if (!level.players[2].isDead) {
			game.grannyPointer = 2;
			game.camera.follow(level.players[game.grannyPointer]);
		}
	}
	game.input.keyboard.addKey(Phaser.Keyboard.FOUR).processKeyDown = function() {
		if (!level.players[3].isDead) {
			game.grannyPointer = 3;
			game.camera.follow(level.players[game.grannyPointer]);
		}
	}
}

*/

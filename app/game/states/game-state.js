/*
var Player = require("../entites/player");

var Checkpoint = require("../entites/checkpoint");
var TextConfigurer = require("../util/text_configurer");
*/
var Zombie = require("../entities/zombie");
var Level = require("../entities/level");
var mapData = require("json!../../../assets/map/Levels/Multi-1/multi-1.json");

var GameState = function (_game) {
	var grannyCounter, players, zombies;
	var game = _game;


	function create() {
		grannyCounter = 0;
		players = [];
		zombies = [];

		Level.createMap(game);
		createZombies();	
	}

	function createZombies() {
		for (i = 0; i < mapData.zombies.length; i++) {
			zombies.push(
				Zombie.create(game, mapData.zombies[i].position, mapData.zombies[i].speed)
			);
		}
	}

	function update() {
		for(i = 0; i < zombies.length; i++) {
			console.log(zombies[i])
			zombies[i].update(game, zombies[i].sprite);
		}
	}

	return {
		create: create,
		update: update
	}
};

module.exports = GameState;

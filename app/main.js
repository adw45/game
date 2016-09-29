var game = new Phaser.Game(800, 384, Phaser.AUTO, '', { create: create });

var boot = require("./game/states/boot"),
    preloader = require("./game/states/preloader"),
    gameState = require("./game/states/game-state");

function create() {
    //initialize all the game states.
    game.state.add("Boot", boot(game));
    game.state.add("Preloader", preloader(game));
	game.state.add("GameState", gameState(game));
    game.state.start("Boot");
};

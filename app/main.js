window.game = new Phaser.Game(608, 608, Phaser.AUTO, '', { create: create });

var boot = require("./game/states/boot"),
    preloader = require("./game/states/preloader"),
    level = require("./game/states/level");

function create() {
    //initialize all the game states.
    game.state.add("Boot", boot);
    game.state.add("Preloader", preloader);
	game.state.add("Level", level);
    game.state.start("Boot");
};

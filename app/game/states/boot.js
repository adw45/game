var Boot = function(_game) {
	var game = _game;
	function create() {
		game.stage.disableVisibilityChange = true;
		if (game.device.desktop) {
			game.stage.scale.pageAlignHorizontally = true;
		}
		else {
			alert("Desktop game only")
		}
		game.state.start("Preloader");
	}

	return {
		create: create
	}
};

module.exports = Boot;

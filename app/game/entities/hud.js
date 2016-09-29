function createHud() {
	if (this.livesText != null) {
		this.livesText.destroy();
	}

	this.livesText = game.add.text(10, 10, "Lives: " + this.lives);
	TextConfigurer.configureText(this.livesText, "white", 32);
	this.livesText.fixedToCamera = true;

	if (this.cameraText != null) {
		this.cameraText.destroy();
	}
	this.cameraText = game.add.text(10, 48, "Camera: Locked")
	TextConfigurer.configureText(this.cameraText, "white", 16);
	this.cameraText .fixedToCamera = true;
}

Level.prototype.initializeGameCamera = function () {
	// set camaera to follow character
	game.camera.following = true;
	game.camera.follow(this.players[game.grannyPointer]);
};

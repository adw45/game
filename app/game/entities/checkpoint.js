var Checkpoint = function (x, y, width, height, activated, order, finalCheckpoint) {
    Phaser.Sprite.call(this, game, x, y, null);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.setSize(width, height, 0, 0);

	this.finalCheckpoint = finalCheckpoint;
    this.order = order;
    this.activated = activated;
    //add sprite to game
    game.debug.geom(this ,'rbga(0, 0, 255, 1)', false);
}

module.exports = Checkpoint;

Checkpoint.prototype = Object.create(Phaser.Sprite.prototype);

Checkpoint.prototype.update = function() {
    //game.debug.body(this, "rbga(0, 0, 255, 1)", false);
}

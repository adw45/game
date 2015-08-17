var MAX_VELOCITY = 150;
var TextConfigurer = require("../util/text_configurer")


var Player = function (x, y) {
    Phaser.Sprite.call(this, game, x, y, "dude");
    game.physics.arcade.enable(this);

    //set bounding box
    this.body.collideWorldBounds = true;
    this.body.sourceHeight = 80;
    this.body.sourceWidth = 80;
    
    //initialize the "onclick" function
    game.input.onDown.add(this.move, this);

    //shrink character
    this.scale.set(.3,.3);

    //set the players position to the center of the sprite
    this.anchor.x = .5;
    this.anchor.y = .5;
    //turn character the other direction
    this.rotation = Math.PI ;

    //create this value for some null check
    this.destination;

    //add sprite to game
    game.add.existing(this);
}

module.exports = Player;

Player.prototype = Object.create(Phaser.Sprite.prototype);

Player.prototype.update = function() {
    //display bounding box
    //game.debug.body(this, "rgba(0,255,0,100)", false);

    //if player is moving this will tell it when to stop
    this.checkLocation();    
};

Player.prototype.move = function(pointer) {
    //players destination is written according to world view. (not camera)
    this.destination = new Phaser.Point(game.camera.x + pointer.x, game.camera.y + pointer.y);

    //rotate sprite to face the direction it will be moving
    this.rotation = game.physics.arcade.angleToXY(this.body, this.destination.x, this.destination.y) + Math.PI;

    //move character to the point (player doesnt stop once it hits that point with this method - see checkLocation()) 
    game.physics.arcade.moveToXY(this, game.camera.x + pointer.x, game.camera.y + pointer.y, MAX_VELOCITY);
};

Player.prototype.checkLocation = function() {
    //check contact with rock walls
    game.physics.arcade.overlap(this, level.blockLayer);

    //check contact with lava - add "die" callback if contact is made
    game.physics.arcade.overlap(this, level.deathLayer, level.killGranny);

    //if there is no contact, stop the character from moving after they've reached their destination
    //made it approximate destination because its unlikely it will end on that exact location
    if (this.destination != null) {
        //once it gets close enough to the x destination lower x velocity
        if (Math.abs(this.position.x - this.destination.x) < MAX_VELOCITY/100) {
            this.body.velocity.x = -(this.position.x - this.destination.x);
            
        }
        //once it gets close enough to the y destination lower y velocity
        if (Math.abs(this.position.y - this.destination.y) < MAX_VELOCITY/100) {
            this.body.velocity.y = -(this.position.y - this.destination.y);
        }
        //stop movement completely - destination has been reached.
        if (this.position.x == this.destination.x && this.position.y == this.destination.y) {
            this.destination == null;
        }
    }
}
var Enemy = function (_positions, _velocity) {
    this.positions = _positions;
    this.counter = 0;

    Phaser.Sprite.call(this, game, this.positions[0].x, this.positions[0].y, "enemy");
    game.physics.arcade.enable(this);

    this.body.collideWorldBounds = true;
    this.body.sourceHeight = 100;
    this.body.sourceWidth = 100;

    this.max_velocity = _velocity;
    this.destination = null;    
    
    this.scale.set(.3,.3);
    this.anchor.x = .5;
    this.anchor.y = .5;
    this.rotation = Math.PI / 2;

    this.animations.add("walk");
    this.animations.play("walk", 6, true);

    //set bounding box
    this.body.collideWorldBounds = true;
    
    game.add.existing(this);
}

module.exports = Enemy;

Enemy.prototype = Object.create(Phaser.Sprite.prototype);

Enemy.prototype.update = function() {
    //game.debug.body(this, "rgba(255,0,0,2)", false);
    this.move();
}

Enemy.prototype.move = function () {
    if (this.destination == null) {
        //console.log(this.positions[this.counter%this.positions.size].x);
        this.destination = new Phaser.Point(this.positions[this.counter%this.positions.length].x, this.positions[this.counter%this.positions.length].y);
    
        //rotate sprite to face the direction it will be moving
        this.rotation = game.physics.arcade.angleToXY(this.body, this.destination.x, this.destination.y);

        //move character to the point (player doesnt stop once it hits that point with this method - see checkLocation()) 
        game.physics.arcade.moveToXY(this, this.positions[this.counter%this.positions.length].x, this.positions[this.counter%this.positions.length].y, this.max_velocity);

        this.counter ++;
    } 
    this.checkLocation();
}

Enemy.prototype.checkLocation = function() {
    //if there is no contact, stop the character from moving after they've reached their destination
    //made it approximate destination because its unlikely it will end on that exact location
    if (this.destination != null) {
        //once it gets close enough to the x destination lower x velocity
        if (Math.abs(this.position.x - this.destination.x) < this.max_velocity/100) {
            this.body.velocity.x = -(this.position.x - this.destination.x);    
        }
        //once it gets close enough to the y destination lower y velocity
        if (Math.abs(this.position.y - this.destination.y) < this.max_velocity/100) {
            this.body.velocity.y = -(this.position.y - this.destination.y);
        }
        //stop movement completely - destination has been reached.
        if (Math.abs(this.position.x - this.destination.x) < 5 && Math.abs(this.position.y - this.destination.y) < 5) {
            this.destination = null;
        }
    }
}

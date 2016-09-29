_ = require("lodash");

var Zombie = function () {     
    function create(game, _positions, _speed) {
        sprite = game.add.sprite(_positions[0].x, _positions[0].y, "zombie");
        sprite.max_speed = _speed;
        sprite.positions = _positions;
        sprite.positionCounter = 0;
        
        game.physics.arcade.enable(sprite);

        sprite.body.collideWorldBounds = true;
        sprite.body.sourceHeight = 100;
        sprite.body.sourceWidth = 100;

        sprite.destination = null;    
        
        sprite.scale.set(.3,.3);
        sprite.anchor.x = .5;
        sprite.anchor.y = .5;
        sprite.rotation = Math.PI / 2;

        sprite.animations.add("walk");
        sprite.animations.play("walk", 6, true);

        //set bounding box
        sprite.body.collideWorldBounds = true;
        
        //game.add.existing(this);
        return {
            sprite: sprite,
            update: update
        };
    }

    function update(game, sprite) {
        //game.debug.body(this, "rgba(255,0,0,2)", false);
        move(game);
    }

    function move(game, sprite) {
        if (!_.has(sprite.destination) ||_.isNil(sprite.destination)) {
            //console.log(this.positions[this.counter%this.positions.size].x);
            sprite.destination = new Phaser.Point(sprite.positions[sprite.positionCounter%sprite.positions.length].x, 
                                                  sprite.positions[sprite.positionCounter%sprite.positions.length].y);
        
            //rotate sprite to face the direction it will be moving
            sprite.rotation = game.physics.arcade.angleToXY(sprite.body, sprite.destination.x, sprite.destination.y);

            //move character to the point (player doesnt stop once it hits that point with this method - see checkLocation()) 
            game.physics.arcade.moveToXY(sprite, sprite.positions[sprite.positionCounter%sprite.positions.length].x, 
                                        sprite.positions[sprite.positionCounter%sprite.positions.length].y, sprite.max_speed);
            sprite.positionCounter++;
        } 
        checkLocation(sprite);
    }

     function checkLocation(sprite) {
        //if there is no contact, stop the character from moving after they've reached their destination
        //made it approximate destination because its unlikely it will end on that exact location
        if (sprite.destination != null) {
            //once it gets close enough to the x destination lower x velocity
            if (Math.abs(sprite.position.x - sprite.destination.x) < sprite.max_speed/100) {
                sprite.body.velocity.x = -(sprite.position.x - sprite.destination.x);    
            }
            //once it gets close enough to the y destination lower y velocity
            if (Math.abs(sprite.position.y - sprite.destination.y) < sprite.max_speed/100) {
                sprite.body.velocity.y = -(sprite.position.y - sprite.destination.y);
            }
            //stop movement completely - destination has been reached.
            if (Math.abs(sprite.position.x - sprite.destination.x) < 5 && Math.abs(sprite.position.y - sprite.destination.y) < 5) {
                sprite.destination = null;
            }
        }
    }

    return {
        create: create
    }
}

module.exports = Zombie();

/*Enemy.prototype = Object.create(Phaser.Sprite.prototype);

Enemy.prototype.

Enemy.prototype.

Enemy.prototype.
}*/
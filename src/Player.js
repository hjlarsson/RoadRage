var ACCLERATION = 100;
var DRAG = 600;
var MAXSPEED = 300;
var BASE_TEXTURE_ROTATION = 90 * (Math.PI / 180);

function Player(game, x, y) {
    this.game = game;
    Phaser.Sprite.call(this, this.game, x, y, 'tanks', 'tankGreen.png');

    this.anchor.setTo(0.5, 0.5);
    this.scale.x = 0.2;
    this.scale.y = 0.2;

    this.game.physics.arcade.enable(this);
    this.body.maxVelocity.setTo(MAXSPEED, MAXSPEED);
    this.body.drag.setTo(DRAG, DRAG);
    this.body.collideWorldBounds = true;
    this.body.width += 15;
    this.body.height += 15;

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.currentSpeed = 0;
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.constructor = Player;

Player.prototype.render = function () {
    //this.game.debug.body(this);
};


Player.prototype.create = function () {
};


Player.prototype.update = function () {
    if (this.cursors.left.isDown) {
        this.angle -= 2;
    }
    else if (this.cursors.right.isDown) {
        this.angle += 2;
    }

    if (this.cursors.up.isDown) {
        //  The speed we'll travel at
        //this.game.physics.arcade.accelerationFromRotation(this.rotation - BASE_TEXTURE_ROTATION, ACCLERATION, this.body.acceleration);
        this.currentSpeed = 200;
    }
    else {
        if (this.currentSpeed > 0) {
            this.currentSpeed -= 4;
        }
    }

    if (this.currentSpeed > 0) {
        this.game.physics.arcade.velocityFromRotation(this.rotation - BASE_TEXTURE_ROTATION, this.currentSpeed, this.body.velocity);
    }
};

module.exports = Player;

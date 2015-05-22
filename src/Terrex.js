
function Terrex(game, player, x, y) {
    this.game = game;
    Phaser.Sprite.call(this, this.game, x, y, 'terrex');

    this.anchor.setTo(0.5, 0.5);
    this.scale.x = 0.5;
    this.scale.y = 0.5;

    this.game.physics.arcade.enable(this);

    this.animations.add('idle', [0,1], 4);
    this.animations.add('attack', [9, 10, 11, 12, 13, 14, 15, 16], 12);
    this.animations.add('roar', [18, 19, 20, 21, 22, 23, 24, 25, 26], 10);
    this.animations.play('roar', null, true);
}



Terrex.prototype = Object.create(Phaser.Sprite.prototype);
Terrex.constructor = Terrex;

module.exports = Terrex;
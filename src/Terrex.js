
function Terrex(game, player, x, y) {
    this.game = game;
    this.player = player;
    Phaser.Sprite.call(this, this.game, x, y, 'terrex');

    this.anchor.setTo(0.5, 0.5);
    this.scale.x = 0.7;
    this.scale.y = 0.7;

    this.game.physics.arcade.enable(this);

    this.animations.add('idle', [0,1], 4);
    this.animations.add('attack', [9, 10, 11, 12, 13, 14, 15, 16], 12);
    this.animations.add('roar', [18, 19, 20, 21, 22, 23, 24, 25, 26], 10);
    this.animations.play('attack', null, true);

    this.spawnTime = 3000;
    this.spawnTimer = this.game.time.events.add(this.game.rnd.integerInRange(this.spawnTime, this.spawnTime + 5000), this.spawnEgg.bind(this));
}

Terrex.prototype = Object.create(Phaser.Sprite.prototype);
Terrex.constructor = Terrex;

Terrex.prototype.spawnEgg = function () {
    console.log("Spawning egg");
    this.spawnTimer = this.game.time.events.add(this.game.rnd.integerInRange(this.spawnTime, this.spawnTime + 5000), this.spawnEgg.bind(this));
};

Terrex.prototype.update = function () {

    //this.rotation = this.game.physics.arcade.angleToPointer(this.player);
    //console.log("Setting orations to ", this.rotation);
};

module.exports = Terrex;
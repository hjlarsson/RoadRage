var Preload = function (game) {
  this.game = game;
};

Preload.prototype.preload = function () {
    this.load.tilemap('level', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('roadTiles', 'assets/spritesheet/roadtiles.png');
    this.load.image('player', 'assets/sprites/tankRed_outline.png');
    this.load.image('checkpoint', 'assets/sprites/pill_red.png');

    this.game.load.bitmapFont('spacefont', 'assets/fonts/paddington.png', 'assets/fonts/paddington.fnt');
    this.game.load.spritesheet('creatures', 'assets/spritesheet/creature_sprites_1.png', 64, 64, 8);
    this.game.load.spritesheet('terrex', 'assets/spritesheet/terrex_0.png', 94, 77, 27);
};

Preload.prototype.create = function () {
    this.game.state.start("Game");
};

module.exports = Preload;
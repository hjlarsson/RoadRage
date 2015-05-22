var Preload = function (game) {
  this.game = game;
};

Preload.prototype.loadingLabel = function () {
    //Here we add a label to let the user know we are loading everything
    //This is the "Loading" phrase in pixel art
    //You can just as easily change it for your own art :)
    this.loading = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 20, 'loading');
    this.loading.anchor.setTo(0.5, 0.5);
    //This is the bright blue bar that is hidden by the dark bar
    this.barBg = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 40, 'load_progress_bar');
    this.barBg.anchor.setTo(0.5, 0.5);
    //This bar will get cropped by the setPreloadSprite function as the game loads!
    this.bar = this.game.add.sprite(this.game.world.centerX - 192, this.game.world.centerY + 40, 'load_progress_bar_dark');
    this.bar.anchor.setTo(0, 0.5);
    this.game.load.setPreloadSprite(this.bar);
};

Preload.prototype.preload = function () {
    this.loadingLabel();

    this.load.tilemap('level', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('roadTiles', 'assets/spritesheet/roadtiles.png');

    this.load.image('player', 'assets/sprites/tankRed_outline.png');
    this.game.load.atlasXML('tanks', 'assets/spritesheet/sheet_tanks.png', 'assets/spritesheet/sheet_tanks.xml');

    this.load.image('checkpoint', 'assets/sprites/pill_red.png');

    this.game.load.bitmapFont('spacefont', 'assets/fonts/paddington.png', 'assets/fonts/paddington.fnt');
    this.game.load.bitmapFont('dinofont', 'assets/fonts/dinofont.png', 'assets/fonts/dinofont.fnt');
    this.game.load.spritesheet('creatures', 'assets/spritesheet/creature_sprites_1.png', 64, 64, 8);
    this.game.load.spritesheet('terrex', 'assets/spritesheet/terrex_0.png', 94, 77, 27);
};

Preload.prototype.create = function () {
    this.game.state.start("MainMenu");
};

module.exports = Preload;
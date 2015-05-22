var Boot = function (game) {
  this.game = game;
};

Boot.prototype.preload = function () {
    this.game.load.image('loading', 'assets/sprites/loading.png');
    this.game.load.image('load_progress_bar', 'assets/sprites/progress_bar_bg.png');
    this.game.load.image('load_progress_bar_dark', 'assets/sprites/progress_bar_fg.png');
};

Boot.prototype.create = function () {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    //this.scale.pageAlignVertically = true;
    this.scale.setScreenSize();
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.state.start("Preload");


};

module.exports = Boot;
var ARROW_TWEEN_DELAY = 100;

var MainMenu = function (game) {
    this.game = game;
    this.creature = null;

    this.menuIndex = 0;
    this.menuSettings = [
        {
            text: "play",
            offset: -70,
            state: "Game"
        },
        {
            text: "highscore",
            offset: 0,
            state: "Game"
        },
        {
            text: "credits",
            offset: 70,
            state: "Game"
        }
    ];
    this.menuOptions = [];

    this.menuMoveTimer = 0;

};

MainMenu.prototype.preload = function () {

};

MainMenu.prototype.createMenuOptions = function () {
    var self = this;

    this.menuSettings.forEach(function (element, index, array) {
        var option = self.game.add.bitmapText(self.game.world.centerX - 100, self.game.world.centerY + element.offset, 'dinofont', element.text, 40);
        option.invocationState = element.state;
        option.anchor.setTo(0, 0.5);
        self.menuOptions.push(option);
    });
};

MainMenu.prototype.getCurrentMenuOption = function () {
    return this.menuOptions[this.menuIndex % this.menuOptions.length];
};

MainMenu.prototype.moveArrow = function (value) {

    this.menuIndex += value;

    // Lazy fulhack 22.36..
    if (this.menuIndex < 0) {
        this.menuIndex = 0;
    }

    var menuOption = this.getCurrentMenuOption();

    this.arrow.y = menuOption.y;
};

MainMenu.prototype.create = function () {

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.createMenuOptions();

    var gameTitle = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY - 200, 'dinofont', 'road rage!', 90);
    gameTitle.anchor.setTo(0.5, 0.5);


    this.arrow = this.add.sprite(this.game.world.centerX - 200, this.game.world.centerY + this.menuSettings[0].offset, "creatures");
    this.arrow.anchor.setTo(0.5, 0.5);
    this.arrow.animations.add('blink', [2, 3], 4);

    var self = this;
    self.arrow.animations.play('blink', null, false);
    this.game.time.events.loop(Phaser.Timer.SECOND * 3, function () {
        self.arrow.animations.play('blink', null, false);
    }, this);

    this.enterButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.game.input.onTap.addOnce(this.invokeOption, this);
    this.enterButton.onDown.addOnce(this.invokeOption, this);
};

MainMenu.prototype.invokeOption = function () {
    var menuOption = this.getCurrentMenuOption();
    this.game.state.start(menuOption.invocationState);
};

MainMenu.prototype.update = function () {
    if (this.game.time.now > this.menuMoveTimer) {

        if (this.cursors.up.isDown) {
            this.moveArrow(-1);
        }

        if (this.cursors.down.isDown) {
            this.moveArrow(1);
        }

        this.menuMoveTimer = this.game.time.now + ARROW_TWEEN_DELAY;
    }
};

MainMenu.prototype.startGame = function () {
    this.game.state.start("Game");
};

module.exports = MainMenu;

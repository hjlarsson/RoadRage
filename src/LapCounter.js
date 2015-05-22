var superagent = require('superagent');

function LapCounter(game, player, x, y, size, checkpointLocations) {
    this.game = game;
    this.player = player;

    this.laps = 0;
    this.lapsGoal = 1;
    this.startTime = new Date().getTime() / 1000;
    this.gameTime = this.getElapsedTime();

    Phaser.BitmapText.call(this, this.game, x, y, 'spacefont', "", size);
    this.fixedToCamera = true;


    this.checkpointLocations = checkpointLocations;

    this.checkpointLocations.sort(function (a, b) {
        return a.properties.index > b.properties.index;
    });

    // DEBUG
    this.checkpointLocations = [this.checkpointLocations[0]];

    // The next checkpoint to take is index 1
    this.checkpointIndex = 0;


    //  Our star group
    this.checkpoints = this.game.add.group();
    this.checkpoints.enableBody = true;
    this.checkpoints.enableBodyDebug = true;
    this.checkpoints.physicsBodyType = Phaser.Physics.ARCADE;
    //this.checkpoints.createMultiple(1, 'checkpoint');
    //this.checkpoints.setAll('anchor.x', 0.5);
    //this.checkpoints.setAll('anchor.y', 0.5);
    //this.checkpoints.setAll('scale.x', 4);
    //this.checkpoints.setAll('scale.y', 4);

    for (i = 0; i < 1; i++) {
        var rect = this.game.add.sprite(0, 0, null);
        this.game.physics.enable(rect, Phaser.Physics.ARCADE);
        rect.body.setSize(128, 128, 0, 0);
        rect.anchor.setTo(0.5, 0.5);
        this.checkpoints.add(rect)
    }

    this.checkpoints.callAll('kill');
    this.spawnCheckpoint();



    //  Victory
    this.victoryText = this.game.add.bitmapText(this.game.width / 2, this.game.height / 2, 'spacefont', 'Soon (TM)', 70);
    this.victoryText.x = this.victoryText.x - this.victoryText.textWidth / 2;
    this.victoryText.y = this.victoryText.y - this.victoryText.textHeight / 3;
    //this.victoryText.visible = false;
    this.victoryText.alpha = 0;

    this.victoryText.fixedToCamera = true;
    this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

LapCounter.prototype = Object.create(Phaser.BitmapText.prototype);
LapCounter.constructor = LapCounter;

LapCounter.prototype.spawnCheckpoint = function () {
    var checkpoint = this.checkpoints.getFirstExists(false);
    var location = this.checkpointLocations[this.checkpointIndex % this.checkpointLocations.length];
    checkpoint.reset(location.x, location.y);
};

LapCounter.prototype.collide = function (player, checkpoint) {
    checkpoint.kill();

    // Increment the index where to spawn the next checkpoint at
    this.checkpointIndex += 1;

    if (this.checkpointIndex % this.checkpointLocations.length == 0) {
        this.laps += 1;
    }

    this.spawnCheckpoint();

    if (this.laps == this.lapsGoal) {
        this.victory();
    }
};

LapCounter.prototype.getElapsedTime = function () {
    return ((new Date().getTime() / 1000) - this.startTime).toFixed(2);
};

LapCounter.prototype.render = function () {
    this.checkpoints.forEach(function (child) {
        this.game.debug.body(child);
    }, this, true);

    this.text = "Laps: " + this.laps + " / " + this.lapsGoal + "\nTime: " + this.gameTime;
};

LapCounter.prototype.update = function () {
    if (this.player.alive) {
        this.gameTime = this.getElapsedTime();
    }
};

LapCounter.prototype.victory = function () {
    this.player.kill();

    // We do this to keep the scores in sync
    this.render();
    this.victoryText.text = " Victory!\nTime: " + this.gameTime;

    var fadeInGameOver = this.game.add.tween(this.victoryText);
    fadeInGameOver.to({alpha: 1}, 1000, Phaser.Easing.Quintic.Out);
    fadeInGameOver.onComplete.add(setResetHandlers);
    fadeInGameOver.start();
    //this.submitScore(this.gameTime);

    var self = this;
    function setResetHandlers() {
        //  The "click to restart" handler
        var tapRestart = self.game.input.onTap.addOnce(_restart, this);
        var spaceRestart = self.fireButton.onDown.addOnce(_restart, this);

        function _restart() {

            tapRestart.detach();
            spaceRestart.detach();
            console.log("Restarting game");
            //self.bgMusic.stop();
            self.game.state.start("Game");
        }
    }
};

LapCounter.prototype.submitScore = function (score) {
    var data = {
        username: "Tarkan",
        dinokey: "c9525b50-00b0-11e5-a5b9-57d35350c5fb",
        score: score
    };

    superagent
        .post("http://upr-jstenninge1:3000/api/score/")
        .send(data)
        .timeout(2000)
        .end(function (err, response) {
            if (err) {
                console.error("Unable to send score due to ", err, response);
            } else {
                console.log("Sent high score ", score, response);
            }

        });
};

module.exports = LapCounter;
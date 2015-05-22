function LapCounter(game, x, y, size, checkpointLocations) {
    this.game = game;
    Phaser.BitmapText.call(this, this.game, x, y, 'spacefont', "Lap: 0/2", size);
    this.fixedToCamera = true;

    console.log("Locations are", checkpointLocations);
    this.checkpointLocations = checkpointLocations;

    // The next checkpoint to take is index 1
    this.checkpointIndex = 1;

    //var shields = this.game.add.bitmapText(this.game.width - 200, 10, 'spacefont', 'Lap: 0/2', 20);
    ////shields.render = function () {
    ////    shields.text = 'Stars: ' + Math.max(player.score, 0);
    ////};
    ////shields.render();
    //console.log("What am im", shields);
    //shields.fixedToCamera = true;


    this.laps = 0;

    //  Our star group
    this.checkpoints = this.game.add.group();
    this.checkpoints.enableBody = true;
    this.checkpoints.enableBodyDebug = true;
    this.checkpoints.physicsBodyType = Phaser.Physics.ARCADE;
    this.checkpoints.createMultiple(1, 'checkpoint');
    this.checkpoints.setAll('anchor.x', 0.5);
    this.checkpoints.setAll('anchor.y', 0.5);
    this.checkpoints.callAll('kill');

    this.spawnCheckpoint();

}

LapCounter.prototype = Object.create(Phaser.BitmapText.prototype);
LapCounter.constructor = LapCounter;

LapCounter.prototype.spawnCheckpoint = function () {
    var checkpoint = this.checkpoints.getFirstExists(false);
    var location = this.checkpointLocations[this.checkpointIndex % this.checkpointLocations.length];
    checkpoint.reset(location.x, location.y);
};

LapCounter.prototype.render = function () {
    this.text = "Lap: " + this.laps + " /2";
};

LapCounter.prototype.collide = function (player, checkpoint) {
    console.log("Collided with checkpoint");
    checkpoint.kill();

    // Increment the index where to spawn the next checkpoint at
    this.checkpointIndex += 1;

    if (this.checkpointIndex % this.checkpointLocations.length == 0) {
        this.laps += 1;
    }

    this.spawnCheckpoint();

};

module.exports = LapCounter;
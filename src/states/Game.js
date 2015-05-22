var Player = require("../Player");
var Terrex = require("../Terrex");
var LapCounter = require("../LapCounter");

var Game = function (game) {
    this.game = game;
    this.map = null;

    this.player = null;
    this.lapCounter = null;
    this.gameOver = null;

};

Game.prototype.preload = function () {
};

Game.prototype.create = function () {
    this.map = this.game.add.tilemap('level');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('Road', 'roadTiles');

    //create layer
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.blockedLayer = this.map.createLayer('blockedLayer');
    //this.dinoBlockedLayer = this.map.createLayer('dinoBlockedLayer');

    //collision on blockedLayer
    this.map.setCollisionBetween(1, 100000, true, 'blockedLayer');

    //create player
    var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer');

    this.player = new Player(this.game, result[0].x, result[0].y);
    this.game.world.add(this.player);

    result = this.findObjectsByType('dinoStart', this.map, 'objectsLayer');
    this.terrex = new Terrex(this.game, this.player, result[0].x, result[0].y);
    this.game.world.add(this.terrex);

    var checkpointLocations = this.findObjectsByType('checkpoint', this.map, 'objectsLayer');
    this.lapCounter = new LapCounter(this.game, this.player, this.game.width - 350, 10, 25, checkpointLocations);
    this.game.world.add(this.lapCounter);

    //resizes the game world to match the layer dimensions
    this.backgroundlayer.resizeWorld();
    //this.backgroundlayer.debug = true;


    //  Game over text
    this.gameOver = this.game.add.bitmapText(this.game.width / 2, this.game.height / 2, 'spacefont', 'GAME OVER!', 110);
    this.gameOver.x = this.gameOver.x - this.gameOver.textWidth / 2;
    this.gameOver.y = this.gameOver.y - this.gameOver.textHeight / 3;
    this.gameOver.visible = false;
    this.gameOver.fixedToCamera = true;



};

Game.prototype.update = function () {
    this.game.physics.arcade.collide(this.player, this.blockedLayer);
    //this.game.physics.arcade.overlap(this.player, this.lapCounter.checkpoints, this.lapCounter.collide.bind(this.lapCounter), null, null);

    var onOverlap = this.lapCounter.collide.bind(this.lapCounter);
    this.game.physics.arcade.overlap(this.player, this.lapCounter.checkpoints, onOverlap, null, null);
    //this.game.physics.arcade.overlap(this.player, this.checkpoints, function (a,b) {
    //    console.log("Collided", a, b);
    //}, null, null);


    this.player.update();
    this.terrex.update();
    //this.lapCounter.update();

};

//find objects in a Tiled layer that containt a property called "type" equal to a certain value
Game.prototype.findObjectsByType = function (type, map, layer) {
    var result = [];
    map.objects[layer].forEach(function (element) {
        if (element.properties.type === type) {
            //Phaser uses top left, Tiled bottom left so we have to adjust the y position
            //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
            //so they might not be placed in the exact pixel position as in Tiled
            element.y -= map.tileHeight;
            result.push(element);
        }
    });
    return result;
};

Game.prototype.render = function () {
  this.lapCounter.render();
    this.player.render();
};

module.exports = Game;

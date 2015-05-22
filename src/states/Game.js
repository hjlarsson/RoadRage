var Player = require("../Player");
var Terrex = require("../Terrex");
var LapCounter = require("../LapCounter");

var Game = function (game) {
    this.game = game;
    this.map = null;

    this.player = null;
    this.lapCounter = null;
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
    this.lapCounter = new LapCounter(this.game, this.game.width - 200, 10, 20, checkpointLocations);
    this.game.world.add(this.lapCounter);

    //resizes the game world to match the layer dimensions
    this.backgroundlayer.resizeWorld();
    //this.backgroundlayer.debug = true;

    //var mummy = this.game.add.sprite(300, 200, 'creatures');
    //mummy.animations.add('walk', [2,3]);
    //mummy.animations.play('walk', 2, false);

    //var mummy = this.game.add.sprite(300, 200, 'terrex');
    //mummy.scale.x = -0.5;
    //mummy.scale.y = 0.5;
    //mummy.anchor.setTo(0.5, 0.5);
    //mummy.animations.add('idle', [0,1], 4);
    //mummy.animations.add('attack', [9, 10, 11, 12, 13, 14, 15, 16], 12);
    //mummy.animations.add('roar', [18, 19, 20, 21, 22, 23, 24, 25, 26]);
    //mummy.animations.play('idle', null, true);
};

Game.prototype.update = function () {
    this.game.physics.arcade.collide(this.player, this.blockedLayer);
    this.game.physics.arcade.overlap(this.player, this.lapCounter, this.lapCounter.collide, null, null);


    this.player.update();

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

module.exports = Game;

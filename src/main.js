var Boot = require("./states/Boot");
var Preload = require("./states/Preload");
var MainMenu = require("./states/MainMenu");
var Game = require("./states/Game");


//var game = new Phaser.Game(window.innerWidth , window.innerHeight, Phaser.AUTO, 'RoadRage');
var game = new Phaser.Game(960, 600, Phaser.AUTO, 'RoadRage');

//game.renderer.resize(window.innerWidth, window.innerHeight);

game.state.add("Boot", Boot);
game.state.add("Preload", Preload);
game.state.add("MainMenu", MainMenu);
game.state.add("Game", Game);

game.state.start("Boot");




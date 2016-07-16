"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Intro = undefined;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * JS for adding an intro screen (and removing it) to the game
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * * * * */

var _blocks = require("./blocks.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var blocks = [];
var clock;
var elapsed = 0;

var title;
var menu;
var menuStart;
var menuHow;
var menuCredits;

var scene;
var world;
var stop = false;

var Intro = exports.Intro = (function () {
  function Intro(s, w) {
    _classCallCheck(this, Intro);

    scene = s;
    world = w;

    // Go ahead and add a single block to the block array.  We'll add more.
    var block = new _blocks.Block();
    block.setPos(Math.random() * 50 - 25, 50, Math.random() * 50 - 25);
    scene.add(block);
    world.addBody(block.body);
    blocks.push(block);

    // Start the block
    clock = new THREE.Clock(true);

    // Add a nifty title
    title = $("<div class='title'><h1>TetraTower</h1></div>");
    $("body").append(title);

    // And the menu
    menu = $("<div class='menu'></div>");
    $("body").append(menu);

    menuStart = $("<a href='#start' class='h2' autofocus>Start Game</a>");
    $(menu).append(menuStart);
    $(menuStart).click(this.startGame);

    menuHow = $("<a href='#how' class='h2'>How to Play</a>");
    $(menu).append(menuHow);

    menuCredits = $("<a href='#credits' class='h2'>Credits</a>");
    $(menu).append(menuCredits);
  }

  _createClass(Intro, [{
    key: "update",
    value: function update() {

      if (stop) {
        return true;
      }

      // We add new blocks every now and then.
      elapsed += clock.getDelta();
      if (elapsed > 0.5 && blocks.length < 10) {
        var block = new _blocks.Block();
        block.setPos(Math.random() * 50 - 25, 50, Math.random() * 50 - 25);
        scene.add(block);
        world.addBody(block.body);
        blocks.push(block);

        elapsed = 0;
      }

      for (var i = 0; i < blocks.length; i++) {
        blocks[i].update();
      }

      return false;
    }

    // Cleans up all the intro stuff, tells game to start new game

  }, {
    key: "startGame",
    value: function startGame() {

      // Remove all the text stuff
      $(".title").remove();
      $(".menu").remove();

      // Remove the blocks
      for (var i = 0; i < blocks.length; i++) {
        scene.remove(blocks[i]);
        world.remove(blocks[i].body);
      }

      stop = true;
    }
  }]);

  return Intro;
})();
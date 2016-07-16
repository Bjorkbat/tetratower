'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = undefined;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * JS for game proper.  Adds player character, starts the block falling process,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * all that stuff
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * * * * */

var _player = require('./player');

var _blocks = require('./blocks');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var player;

var scene;
var world;
var blocks = [];

var Game = exports.Game = (function () {
  function Game(s, w) {
    _classCallCheck(this, Game);

    scene = s;
    world = w;

    // Plop down the player character
    player = new _player.Player();
    scene.add(player);

    // Add a block
    var block = new _blocks.Block();
    block.setPos(Math.random() * 50 - 25, 50, Math.random() * 50 - 25);
    scene.add(block);
    world.addBody(block.body);
    blocks.push(block);
  }

  _createClass(Game, [{
    key: 'update',
    value: function update() {

      // Handle player movement
      if (player.moveForward) {

        switch (player.orientation) {
          case "forward":
            break;
          case "backward":
            player.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
            break;
          case "left":
            player.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2);
            break;
          case "right":
            player.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
        }
        player.orientation = "forward";
        player.translateZ(1);
      } else if (player.moveBackward) {

        switch (player.orientation) {
          case "forward":
            player.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
            break;
          case "backward":
            break;
          case "left":
            player.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
            break;
          case "right":
            player.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2);
        }
        player.orientation = "backward";
        player.translateZ(1);
      } else if (player.moveLeft) {

        switch (player.orientation) {
          case "forward":
            player.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
            break;
          case "backward":
            player.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2);
            break;
          case "left":
            break;
          case "right":
            player.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
            break;
        }
        player.orientation = "left";
        player.translateZ(1);
      } else if (player.moveRight) {

        switch (player.orientation) {
          case "forward":
            player.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2);
            break;
          case "backward":
            player.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
            break;
          case "left":
            player.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
            break;
          case "right":
            break;
        }
        player.orientation = "right";
        player.translateZ(1);
      }

      // Update blocks
      for (var i = 0; i < blocks.length; i++) {
        blocks[i].update();
      }

      return false;
    }
  }]);

  return Game;
})();
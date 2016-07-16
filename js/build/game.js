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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var player;

var scene;
var world;

var Game = exports.Game = (function () {
  function Game(s, w) {
    _classCallCheck(this, Game);

    scene = s;
    world = w;

    // Plop down the player character
    player = new _player.Player();
    scene.add(player);
    player.position.y = 12;
  }

  _createClass(Game, [{
    key: 'update',
    value: function update() {
      return false;
    }
  }]);

  return Game;
})();
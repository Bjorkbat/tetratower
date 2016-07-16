'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.setupIntro = undefined;

var _blocks = require('./blocks.js');

var blocks = []; /**
                  * JS for adding an intro screen (and removing it) to the game
                  * * * * */

var clock;
var elapsed = 0;

var setupIntro = exports.setupIntro = function setupIntro(scene, world) {

  // Go ahead and add a single block to the block array.  We'll add more.
  var block = new _blocks.Block();
  block.setPos(Math.random() * 50 - 25, 50, Math.random() * 50 - 25);
  scene.add(block);
  world.addBody(block.body);
  blocks.push(block);

  clock = new THREE.Clock(true);
};

var update = exports.update = function update(scene, world) {

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
};
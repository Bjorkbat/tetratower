/**
 * JS for adding an intro screen (and removing it) to the game
 * * * * */

import {Block} from './blocks.js';

var blocks = [];
var clock;
var elapsed = 0;

export var setupIntro = function(scene, world) {

  // Go ahead and add a single block to the block array.  We'll add more.
  var block = new Block();
  block.setPos((Math.random() * 50) - 25, 50, (Math.random() * 50) - 25);
  scene.add(block);
  world.addBody(block.body);
  blocks.push(block);

  clock = new THREE.Clock(true)
}

export var update = function(scene, world) {

  // We add new blocks every now and then.
  elapsed += clock.getDelta();
  if (elapsed > 0.5 && blocks.length < 10) {
    var block = new Block();
    block.setPos((Math.random() * 50) - 25, 50, (Math.random() * 50) - 25);
    scene.add(block);
    world.addBody(block.body);
    blocks.push(block);

    elapsed = 0;
  }

  for(var i = 0; i < blocks.length; i ++) {
    blocks[i].update();
  }

}

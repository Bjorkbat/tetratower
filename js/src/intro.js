/**
 * JS for adding an intro screen (and removing it) to the game
 * * * * */

import {Block} from './blocks.js';

var blocks = [];
var clock;
var elapsed = 0;

var title;
var menu;
var menuStart;
var menuHow;
var menuCredits;

export var setupIntro = function(scene, world) {

  // Go ahead and add a single block to the block array.  We'll add more.
  var block = new Block();
  block.setPos((Math.random() * 50) - 25, 50, (Math.random() * 50) - 25);
  scene.add(block);
  world.addBody(block.body);
  blocks.push(block);

  // Start the block
  clock = new THREE.Clock(true)

  // Add a nifty title
  title = $("<div class='title'><h1>TetraTower</h1></div>")
  $("body").append(title);

  // And the menu
  menu = $("<div class='menu'></div>");
  $("body").append(menu);

  menuStart = $("<a href='#start' class='h2' autofocus>Start Game</a>");
  $(menu).append(menuStart);

  menuHow = $("<a href='#how' class='h2'>How to Play</a>");
  $(menu).append(menuHow);

  menuCredits = $("<a href='#credits' class='h2'>Credits</a>");
  $(menu).append(menuCredits);
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

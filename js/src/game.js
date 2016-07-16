/**
 * JS for game proper.  Adds player character, starts the block falling process,
 * all that stuff
 * * * * */

import {Player} from './player';
import {Block} from './blocks';

var player;

var scene;
var world;
var blocks = [];

export class Game {
  constructor(s, w) {

    scene = s;
    world = w;

    // Plop down the player character
    player = new Player();
    scene.add(player);

    // Add a block
    var block = new Block();
    block.setPos((Math.random() * 50) - 25, 50, (Math.random() * 50) - 25);
    scene.add(block);
    world.addBody(block.body);
    blocks.push(block);
  }

  update() {

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
    for (var i = 0; i < blocks.length; i ++) {
      blocks[i].update()
    }

    return false;
  }
}

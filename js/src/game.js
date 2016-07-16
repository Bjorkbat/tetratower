/**
 * JS for game proper.  Adds player character, starts the block falling process,
 * all that stuff
 * * * * */

import {Player} from './player';

var player;

var scene;
var world;

export class Game {
  constructor(s, w) {

    scene = s;
    world = w;

    // Plop down the player character
    player = new Player();
    scene.add(player);
    player.position.y = 12;
  }

  update() {
    return false;
  }
}

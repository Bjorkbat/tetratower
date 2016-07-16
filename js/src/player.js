/**
 * JS for the player character.
 * * * * */

import * as Consts from './consts';

var leftLeg;
var rightLeg;

var leftArm;
var rightArm;

const BODY_HEIGHT = 5;
const LEG_HEIGHT = 5;
const HEAD_HEIGHT = Consts.BLOCK_WIDTH * (3/5);
const SKIN_COLORS = [0xFADCAB, 0x9E7245, 0x4F3F2F];

const BASE_MAT = new THREE.MeshLambertMaterial({color: 0xFF0000});

export var Player = function() {
  THREE.Object3D.call(this);

  this.position.y += BODY_HEIGHT / 2 + LEG_HEIGHT / 2 + HEAD_HEIGHT / 2 + HEAD_HEIGHT;

  this.moveLeft = false;
  this.moveRight = false;
  this.moveUp = false;
  this.moveDown = false;
  this.orientation = "backward";

  var scope = this;

  var legGeo = new THREE.BoxGeometry(Consts.BLOCK_WIDTH / 2, LEG_HEIGHT, Consts.BLOCK_WIDTH / 2);
  var armGeo = new THREE.BoxGeometry(Consts.BLOCK_WIDTH / 2, BODY_HEIGHT, Consts.BLOCK_WIDTH / 2);

  // Base mat(s)
  var redMaterial = new THREE.MeshLambertMaterial({color: 0xFF2E00});
  var blueMaterial = new THREE.MeshLambertMaterial({color: 0x23A8FC});
  var yellowMaterial = new THREE.MeshLambertMaterial({color: 0xFFD000});

  // Skin color mat, only used for head
  var skinColor = SKIN_COLORS[Math.floor(Math.random() * SKIN_COLORS.length)]
  var skinMat = new THREE.MeshLambertMaterial({color: skinColor});

  // Body material
  var bodyFrontMat = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
  var bodyFrontTexture = new THREE.TextureLoader().load("img/tetratowerbodyfront.png", function(texture) {

    bodyFrontMat.map = texture;
    bodyFrontMat.needsUpdate = true;
  })
  var bodyMat = new THREE.MultiMaterial([
    redMaterial,
    redMaterial,
    redMaterial,
    redMaterial,
    bodyFrontMat,
    bodyFrontMat
  ]);

  var armSideMat = new THREE.MeshLambertMaterial({color: 0xFFFFFF})
  var armTopMat = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
  var armMat = new THREE.MultiMaterial([
    armSideMat,
    armSideMat,
    armTopMat,
    armTopMat,
    armSideMat,
    armSideMat
  ]);

  // Leg material
  var legSideMat = new THREE.MeshLambertMaterial({color: 0xFFFFFF})
  var legMat = new THREE.MultiMaterial([
    legSideMat,
    legSideMat,
    blueMaterial,
    blueMaterial,
    legSideMat,
    legSideMat
  ]);
  var legTexture = new THREE.TextureLoader().load("/img/tetratowerleg.png", function (texture) {
    legSideMat.map = texture;
    legSideMat.needsUpdate = true;
  });

  var textureURL;
  switch (skinColor) {
    case SKIN_COLORS[0]:
      textureURL = "/img/tetratowerarm_white.png";
      break;
    case SKIN_COLORS[1]:
      textureURL = "/img/tetratowerarm_brown.png";
      break;
    case SKIN_COLORS[2]:
      textureURL = "/img/tetratowerarm_black.png";
      break;
    default:
      textureURL = "/img/tetratowerarm.png";
      break;
  }

  var armTexture = new THREE.TextureLoader().load(textureURL, function(texture) {

    armSideMat.map = texture;
    armSideMat.needsUpdate = true;

  });

  var armTopTexture = new THREE.TextureLoader().load("img/tetratowerarmtop.png", function(texture) {

    armTopMat.map = texture;
    armTopMat.needsUpdate = true;
  })

  // Create a body
  var bodyGeo = new THREE.BoxGeometry(Consts.BLOCK_WIDTH, BODY_HEIGHT, Consts.BLOCK_WIDTH / 2);
  var body = new THREE.Mesh(bodyGeo, bodyMat);
  this.add(body);

  // Create some leggy legs
  leftLeg = new THREE.Mesh(legGeo, legMat);
  this.add(leftLeg)
  leftLeg.translateX(-Consts.BLOCK_WIDTH / 4);
  leftLeg.translateY(-(LEG_HEIGHT + BODY_HEIGHT) / 2);

  rightLeg = new THREE.Mesh(legGeo, legMat);
  this.add(rightLeg);
  rightLeg.translateX(Consts.BLOCK_WIDTH / 4);
  rightLeg.translateY(-(LEG_HEIGHT + BODY_HEIGHT) / 2);

  // Create the arms
  leftArm = new THREE.Mesh(armGeo, armMat);
  this.add(leftArm);
  leftArm.translateX(-(Consts.BLOCK_WIDTH / 4 + Consts.BLOCK_WIDTH / 2));

  rightArm = new THREE.Mesh(armGeo, armMat);
  this.add(rightArm);
  rightArm.translateX((Consts.BLOCK_WIDTH / 4 + Consts.BLOCK_WIDTH / 2));

  // Now add a head
  var headGeo = new THREE.BoxGeometry(Consts.BLOCK_WIDTH * (3/5), Consts.BLOCK_WIDTH * (3/5), Consts.BLOCK_WIDTH * (3/5));
  var head = new THREE.Mesh(headGeo, skinMat);
  this.add(head);
  head.translateY((BODY_HEIGHT + HEAD_HEIGHT) / 2);

  // And a fashionable hat
  var hatBodyGeo = new THREE.BoxGeometry(HEAD_HEIGHT * 1.05, HEAD_HEIGHT * (4/5), HEAD_HEIGHT * 1.05);
  var hatBody = new THREE.Mesh(hatBodyGeo, yellowMaterial);
  head.add(hatBody);
  hatBody.translateY(HEAD_HEIGHT * (4/5));

  var hatBrimGeo = new THREE.BoxGeometry(HEAD_HEIGHT * 1.05, HEAD_HEIGHT / 5, HEAD_HEIGHT * 0.525);
  var hatBrim = new THREE.Mesh(hatBrimGeo, yellowMaterial);
  head.add(hatBrim);
  hatBrim.translateZ((HEAD_HEIGHT * 1.05) / 2 + (HEAD_HEIGHT * 0.525 / 2));
  hatBrim.translateY(HEAD_HEIGHT / 2);

  // Add some listeners
  var onKeyDown = function(event) {

    switch(event.keyCode) {
      case 38: // up
      case 87: // w
        scope.moveForward = true;
        break;

      case 40: // down
      case 83: // s
        scope.moveBackward = true;
        break;

      case 37: // left
      case 65: // a
        scope.moveLeft = true;
        break;

      case 39: // right
      case 68: // d
        scope.moveRight = true;
        break;
    }
  }

  var onKeyUp = function(event) {

    switch(event.keyCode) {
      case 38: // up
      case 87: // w
        scope.moveForward = false;
        break;

      case 40: // down
      case 83: // s
        scope.moveBackward = false;
        break;

      case 37: // left
      case 65: // a
        scope.moveLeft = false;
        break;

      case 39: // right
      case 68: // d
        scope.moveRight = false;
        break;
    }
  }

  document.addEventListener('keydown', onKeyDown, false);
  document.addEventListener('keyup', onKeyUp, false);
}

Player.prototype = new THREE.Object3D();
Player.prototype.constructor = Player;

THREE.Object3D.prototype.worldToLocal = function ( vector ) {
    if ( !this.__inverseMatrixWorld ) this.__inverseMatrixWorld = new THREE.Matrix4();
    return  vector.applyMatrix4( this.__inverseMatrixWorld.getInverse( this.matrixWorld ));
};

THREE.Object3D.prototype.lookAtWorld = function( vector ) {
   vector = vector.clone();
   this.parent.worldToLocal( vector );
   this.lookAt( vector );
};

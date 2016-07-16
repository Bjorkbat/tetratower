"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Block = undefined;

var _physics = require("./physics");

var RED = 0xFF2E00; /**
                     * JS for defining tetris blocks
                     * * * * */

;
var BLUE = 0x23A8FC;
var YELLOW = 0xFFD000;

var PURPLE = 0xA600D9;
var GREEN = 0x0FD64C;
var ORANGE = 0xFA7E00;

var COLORS = [RED, BLUE, YELLOW, PURPLE, GREEN, ORANGE];
var SHAPES = ["i", "o", "t", "j", "l", "s", "z"];

var BLOCK_WIDTH = 2.5;
var MASS = 10;

var Block = exports.Block = function Block() {
  THREE.Object3D.call(this);

  this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
  this.shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];

  switch (this.shape) {
    case "i":
      this.add(makeI(this.color));
      this.body = makeBody(this.shape);
      break;
    case "o":
      this.add(makeO(this.color));
      this.body = makeBody(this.shape);
      break;
    case "t":
      this.add(makeT(this.color));
      this.body = makeBody(this.shape);
      break;
    case "j":
      this.add(makeJ(this.color));
      this.body = makeBody(this.shape);
      break;
    case "l":
      this.add(makeL(this.color));
      this.body = makeBody(this.shape);
      break;
    case "s":
      this.add(makeS(this.color));
      this.body = makeBody(this.shape);
      break;
    case "z":
      this.add(makeZ(this.color));
      this.body = makeBody(this.shape);
      break;
    default:
      console.log("Lol, shape was: " + this.shape);
      break;
  }

  // Sets not only the position of the Object3D, but also the position of its
  // RigidBody from cannon.js
  this.setPos = function (x, y, z) {

    this.position.x, this.body.position.x = x;
    this.position.y, this.body.position.y = y;
    this.position.z, this.body.position.z = z;
  };

  // Updates position to rigid body position;
  this.update = function () {
    this.position.x = this.body.position.x;
    this.position.y = this.body.position.y;
    this.position.z = this.body.position.z;

    this.quaternion.set(this.body.quaternion.x, this.body.quaternion.y, this.body.quaternion.z, this.body.quaternion.w);
  };
};
Block.prototype = new THREE.Object3D();
Block.prototype.constructor = Block;

// Creates an i-shaped 3D object
var makeI = function makeI(color) {

  var material = new THREE.MeshPhongMaterial({ color: color });
  var geo = new THREE.BoxGeometry(BLOCK_WIDTH, BLOCK_WIDTH * 4, BLOCK_WIDTH);
  return new THREE.Mesh(geo, material);
};

// Creates an o-shaped 3D object.
var makeO = function makeO(color) {

  var material = new THREE.MeshPhongMaterial({ color: color });
  var geo = new THREE.BoxGeometry(BLOCK_WIDTH * 2, BLOCK_WIDTH * 2, BLOCK_WIDTH);
  return new THREE.Mesh(geo, material);
};

// Creates a t-shaped 3D object, and also makes a nice cup.
var makeT = function makeT(color) {

  var material = new THREE.MeshPhongMaterial({ color: color });
  var topGeo = new THREE.BoxGeometry(BLOCK_WIDTH, BLOCK_WIDTH, BLOCK_WIDTH);
  var bottomGeo = new THREE.BoxGeometry(BLOCK_WIDTH * 3, BLOCK_WIDTH, BLOCK_WIDTH);

  var object = new THREE.Object3D();

  var top = new THREE.Mesh(topGeo, material);
  object.add(top);
  top.translateY(BLOCK_WIDTH);

  var bottom = new THREE.Mesh(bottomGeo, material);
  object.add(bottom);

  return object;
};

// Creates a j-shaped 3D object
var makeJ = function makeJ(color) {

  var material = new THREE.MeshPhongMaterial({ color: color });
  var topGeo = new THREE.BoxGeometry(BLOCK_WIDTH * 3, BLOCK_WIDTH, BLOCK_WIDTH);
  var bottomGeo = new THREE.BoxGeometry(BLOCK_WIDTH, BLOCK_WIDTH, BLOCK_WIDTH);

  var object = new THREE.Object3D();

  var top = new THREE.Mesh(topGeo, material);
  object.add(top);
  top.translateY(BLOCK_WIDTH);

  var bottom = new THREE.Mesh(bottomGeo, material);
  object.add(bottom);
  bottom.translateX(BLOCK_WIDTH);
  return object;
};

// Creates an l-shaped 3D object
var makeL = function makeL(color) {

  var material = new THREE.MeshPhongMaterial({ color: color });
  var topGeo = new THREE.BoxGeometry(BLOCK_WIDTH * 3, BLOCK_WIDTH, BLOCK_WIDTH);
  var bottomGeo = new THREE.BoxGeometry(BLOCK_WIDTH, BLOCK_WIDTH, BLOCK_WIDTH);

  var object = new THREE.Object3D();

  var top = new THREE.Mesh(topGeo, material);
  object.add(top);
  top.translateY(BLOCK_WIDTH);

  var bottom = new THREE.Mesh(bottomGeo, material);
  object.add(bottom);
  bottom.translateX(-BLOCK_WIDTH);
  return object;
};

var makeS = function makeS(color) {

  var material = new THREE.MeshPhongMaterial({ color: color });
  var geo = new THREE.BoxGeometry(BLOCK_WIDTH * 2, BLOCK_WIDTH, BLOCK_WIDTH);

  var object = new THREE.Object3D();

  var top = new THREE.Mesh(geo, material);
  object.add(top);
  top.translateX(BLOCK_WIDTH / 2);
  top.translateY(BLOCK_WIDTH);

  var bottom = new THREE.Mesh(geo, material);
  object.add(bottom);
  bottom.translateX(-BLOCK_WIDTH / 2);

  return object;
};

// Creates a z-shaped 3D object
var makeZ = function makeZ(color) {

  var zTop;
  var zTopGeo;

  var zBottom;
  var zBottomGeo;

  var material = new THREE.MeshPhongMaterial({ color: color });
  var object = new THREE.Object3D();

  zTopGeo = new THREE.BoxGeometry(BLOCK_WIDTH * 2, BLOCK_WIDTH, BLOCK_WIDTH);
  zTop = new THREE.Mesh(zTopGeo, material);
  object.add(zTop);
  zTop.translateY(BLOCK_WIDTH);
  zTop.translateX(-BLOCK_WIDTH / 2);

  zBottomGeo = new THREE.BoxGeometry(BLOCK_WIDTH * 2, BLOCK_WIDTH, BLOCK_WIDTH);
  zBottom = new THREE.Mesh(zBottomGeo, material);
  object.add(zBottom);
  zBottom.translateX(BLOCK_WIDTH / 2);

  return object;
};

// Makes a rigidbody for us, depending on the string arg
var makeBody = function makeBody(block) {

  var body;

  switch (block) {

    // Define physics for i-shaped body
    case "i":
      var shape = new CANNON.Box(new CANNON.Vec3(BLOCK_WIDTH, BLOCK_WIDTH * 4, BLOCK_WIDTH));
      body = new CANNON.Body({
        mass: MASS,
        shape: shape,
        material: _physics.roughMaterial
      });
      break;

    // Define physics for o-shaped body
    case "o":
      var shape = new CANNON.Box(new CANNON.Vec3(BLOCK_WIDTH * 2, BLOCK_WIDTH * 2, BLOCK_WIDTH));
      body = new CANNON.Body({
        mass: MASS,
        shape: shape,
        material: _physics.roughMaterial
      });
      break;

    // Define physics for t-shaped body
    case "t":
      var bottom = new CANNON.Box(new CANNON.Vec3(BLOCK_WIDTH * 3, BLOCK_WIDTH, BLOCK_WIDTH));
      var top = new CANNON.Box(new CANNON.Vec3(BLOCK_WIDTH, BLOCK_WIDTH, BLOCK_WIDTH));
      body = new CANNON.Body({
        mass: MASS,
        material: _physics.roughMaterial
      });
      body.addShape(top, new CANNON.Vec3(0, BLOCK_WIDTH, 0));
      body.addShape(bottom);
      break;

    // Define physics for "j"-shaped block
    case "j":
      var top = new CANNON.Box(new CANNON.Vec3(BLOCK_WIDTH * 3, BLOCK_WIDTH, BLOCK_WIDTH));
      var bottom = new CANNON.Box(new CANNON.Vec3(BLOCK_WIDTH, BLOCK_WIDTH, BLOCK_WIDTH));
      body = new CANNON.Body({
        mass: MASS,
        material: _physics.roughMaterial
      });
      body.addShape(top, new CANNON.Vec3(0, BLOCK_WIDTH, 0));
      body.addShape(bottom, new CANNON.Vec3(BLOCK_WIDTH, 0, 0));
      break;

    case "l":
      var top = new CANNON.Box(new CANNON.Vec3(BLOCK_WIDTH * 3, BLOCK_WIDTH, BLOCK_WIDTH));
      var bottom = new CANNON.Box(new CANNON.Vec3(BLOCK_WIDTH, BLOCK_WIDTH, BLOCK_WIDTH));
      body = new CANNON.Body({
        mass: MASS,
        material: _physics.roughMaterial
      });
      body.addShape(top, new CANNON.Vec3(0, BLOCK_WIDTH, 0));
      body.addShape(bottom, new CANNON.Vec3(-BLOCK_WIDTH, 0, 0));
      break;

    // Define physics for s-shaped body
    case "s":
      var topBottom = new CANNON.Box(new CANNON.Vec3(BLOCK_WIDTH * 2, BLOCK_WIDTH, BLOCK_WIDTH));
      body = new CANNON.Body({
        mass: MASS,
        material: _physics.roughMaterial
      });
      body.addShape(topBottom, new CANNON.Vec3(BLOCK_WIDTH / 2, BLOCK_WIDTH, 0));
      body.addShape(topBottom, new CANNON.Vec3(-BLOCK_WIDTH / 2, 0, 0));
      break;

    // Define physics for z-shaped body
    case "z":

      var shape = new CANNON.Box(new CANNON.Vec3(BLOCK_WIDTH * 2, BLOCK_WIDTH, BLOCK_WIDTH));
      body = new CANNON.Body({
        mass: MASS,
        material: _physics.roughMaterial
      });
      body.addShape(shape, new CANNON.Vec3(-BLOCK_WIDTH / 2, BLOCK_WIDTH, 0));
      body.addShape(shape, new CANNON.Vec3(BLOCK_WIDTH / 2, 0, 0));
      break;

    default:
      var shape = new CANNON.Sphere(BLOCK_WIDTH);
      body = new CANNON.Body({
        mass: MASS,
        shape: shape,
        material: _physics.roughMaterial
      });
      console.log("Lol, this block has sphere physics: " + block);
  }

  body.linearDamping = 0.2;
  return body;
};
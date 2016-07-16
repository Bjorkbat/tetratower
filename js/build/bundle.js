/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _blocks = __webpack_require__(1);

	var _grid = __webpack_require__(3);

	var _physics = __webpack_require__(2);

	var Physics = _interopRequireWildcard(_physics);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var scene; /**
	            * Main file.  Handles game state transitions and the like.
	            * * * * */

	var renderer;
	var aspect;
	var d;
	var camera;

	var ambientLight;
	var directLight;

	var groundPlane;
	var grid;

	/** PHYSICS **/
	var world;

	var GROUND_WIDTH = 50;
	var clock;

	var sphereBody;
	var blocks = [];

	// Sets up the camera, scene, and a simple intro screen
	var init = function init() {

	  // Init scene and camera
	  scene = new THREE.Scene();
	  aspect = window.innerWidth / window.innerHeight;
	  d = 20;
	  camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, -500, 1000);

	  renderer = new THREE.WebGLRenderer({ alpha: true });
	  renderer.setSize(window.innerWidth, window.innerHeight);
	  renderer.setClearColor(0xFFFFFF, 0);
	  document.body.appendChild(renderer.domElement);

	  // Position camera.  Let's try 200, 200, 200
	  camera.position.x = 200;
	  camera.position.y = 200;
	  camera.position.z = 200;
	  camera.zoom = 0.75;
	  camera.updateProjectionMatrix();
	  camera.lookAt(new THREE.Vector3(0, 0, 0));

	  scene.add(camera);

	  // Add some light
	  ambientLight = new THREE.AmbientLight(0x888888);
	  scene.add(ambientLight);

	  directLight = new THREE.DirectionalLight(0xffffff, 0.5);
	  directLight.position.set(0, 1, 0);
	  scene.add(directLight);

	  // Add a ground plane.  Make it white
	  var groundPlaneGeo = new THREE.PlaneGeometry(GROUND_WIDTH, GROUND_WIDTH);
	  var groundPlaneMat = new THREE.MeshBasicMaterial({ color: 0xFEFEFE });
	  groundPlane = new THREE.Mesh(groundPlaneGeo, groundPlaneMat);
	  groundPlane.rotation.x = -Math.PI / 2;
	  scene.add(groundPlane);

	  // Add a grid
	  grid = new _grid.Grid();
	  scene.add(grid);

	  // Now define our physics world
	  world = new CANNON.World();
	  world.gravity.set(0, -9.82, 0);
	  world.addContactMaterial(Physics.roughCM);
	  world.broadphase = new CANNON.NaiveBroadphase();

	  // And define a ground plane
	  var groundShape = new CANNON.Plane();
	  var groundBody = new CANNON.Body({ mass: 0, shape: groundShape, material: Physics.roughMaterial });
	  groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
	  world.add(groundBody);

	  // Add a test block;
	  var redBlock = new _blocks.Block();
	  redBlock.setPos(0, 50, 0);
	  scene.add(redBlock);
	  world.addBody(redBlock.body);
	  blocks.push(redBlock);

	  console.log(world);
	  render();
	};

	var render = function render() {
	  requestAnimationFrame(render);

	  // Step the world
	  world.step(1 / 20);

	  // Update everything
	  blocks[0].update();

	  renderer.render(scene, camera);
	};

	init();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Block = undefined;

	var _physics = __webpack_require__(2);

	var RED = 0xFF2E00; /**
	                     * JS for defining tetris blocks
	                     * * * * */

	;
	var BLUE = 0x23A8FC;
	var YELLOW = 0xFFD000;

	var PURPLE = 0x000000;
	var GREEN = 0x000000;
	var ORANGE = 0x000000;

	var COLORS = [RED, BLUE, YELLOW];
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
	  bottom.translateY(BLOCK_WIDTH);

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

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	   value: true
	});
	/**
	 * JS for the game physics, especially friction
	 * * * * */

	// Materials
	var roughMaterial = exports.roughMaterial = new CANNON.Material("roughMaterial");
	// Adjust constraint equation parameters for ground/ground contact
	var roughCM = exports.roughCM = new CANNON.ContactMaterial(roughMaterial, roughMaterial, {
	   friction: 1,
	   restitution: 0.3,
	   contactEquationStiffness: 1e8,
	   contactEquationRelaxation: 3,
	   frictionEquationStiffness: 1e8,
	   frictionEquationRegularizationTime: 3
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * A rather boring bit of js responsible for defining the grid.  Better than
	 * having it in the game file
	 * * * * */

	var GROUND_WIDTH = 50;
	var GRID_SPACING = 2.5;

	var Grid = exports.Grid = function Grid() {
	  THREE.Object3D.call(this);

	  var lineMaterial = new THREE.LineBasicMaterial({ color: 0x00A0F9 });
	  var lineGeo;
	  var line;

	  // Draw vertical lines first
	  for (var i = -(GROUND_WIDTH / 2); i < GROUND_WIDTH / 2; i += GRID_SPACING) {

	    lineGeo = new THREE.Geometry();
	    lineGeo.vertices.push(new THREE.Vector3(i, 0, GROUND_WIDTH / 2), new THREE.Vector3(i, 0, -(GROUND_WIDTH / 2)));

	    line = new THREE.Line(lineGeo, lineMaterial);
	    this.add(line);
	  }

	  // Now add the horizontal ones
	  for (var i = -(GROUND_WIDTH / 2); i < GROUND_WIDTH / 2; i += GRID_SPACING) {

	    lineGeo = new THREE.Geometry();
	    lineGeo.vertices.push(new THREE.Vector3(-(GROUND_WIDTH / 2), 0, i), new THREE.Vector3(GROUND_WIDTH / 2, 0, i));
	    line = new THREE.Line(lineGeo, lineMaterial);
	    this.add(line);
	  }
	};
	Grid.prototype = new THREE.Object3D();
	Grid.prototype.constructor = Grid;

/***/ }
/******/ ]);
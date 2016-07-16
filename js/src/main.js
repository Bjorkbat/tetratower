/**
 * Main file.  Handles game state transitions and the like.
 * * * * */

import {Block} from './blocks';
import {Grid} from './grid';
import {Intro} from './intro';
import {Game} from './game.js';
import * as Physics from './physics';

var scene;
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

var state;

const GROUND_WIDTH = 60;

// Sets up the camera, scene, and a simple intro screen
var init = function() {

  // Init scene and camera
  scene = new THREE.Scene();
  aspect = window.innerWidth / window.innerHeight;
  d = 20;
  camera = new THREE.OrthographicCamera(
    -d * aspect,
    d * aspect,
    d,
    -d,
    -500,
    1000
  );

  renderer = new THREE.WebGLRenderer({alpha: true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor(0xFFFFFF, 0);
  document.body.appendChild( renderer.domElement );

  // Position camera.  Let's try 200, 200, 200
  camera.position.x = 200;
  camera.position.y = 200;
  camera.position.z = 200;
  camera.zoom = 0.75;
  camera.updateProjectionMatrix();
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  scene.add(camera);

  // Add some light
  ambientLight = new THREE.AmbientLight(0xCCCCCC);
  scene.add(ambientLight);

  directLight = new THREE.DirectionalLight(0xffffff, 0.75);
  directLight.position.set(0, 1, 0);
  scene.add(directLight);

  // Add a ground plane.  Make it white
  var groundPlaneGeo = new THREE.PlaneGeometry(GROUND_WIDTH, GROUND_WIDTH);
  var groundPlaneMat = new THREE.MeshBasicMaterial({color: 0xFEFEFE});
  groundPlane = new THREE.Mesh(groundPlaneGeo, groundPlaneMat);
  groundPlane.rotation.x = -Math.PI / 2;
  groundPlane.position.y -= 1;
  scene.add(groundPlane);

  // Add a grid
  grid = new Grid();
  scene.add(grid);

  // Now define our physics world
  world = new CANNON.World();
  world.gravity.set(0, -9.82, 0);
  world.addContactMaterial(Physics.roughCM);
  world.broadphase = new CANNON.NaiveBroadphase();

  // And define a ground plane
  var groundShape = new CANNON.Plane();
  var groundBody = new CANNON.Body({mass: 0, shape: groundShape, material: Physics.roughMaterial});
  groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
  world.add(groundBody);

  // Setup the intro screen
  state = new Intro(scene, world);

  render();
}

var render = function() {
  requestAnimationFrame(render);

  // Step the world
  world.step(1/20);

  // Update everything
  var newState = state.update();
  if (newState) {

    state = new Game(scene, world);
  }

  renderer.render(scene, camera);
}

init();

/**
 * A rather boring bit of js responsible for defining the grid.  Better than
 * having it in the game file
 * * * * */

const GROUND_WIDTH = 60;
const GRID_SPACING = 5;

export var Grid = function() {
  THREE.Object3D.call(this);

  var lineMaterial = new THREE.LineBasicMaterial({color: 0x00A0F9});
  var lineGeo;
  var line;

  // Draw vertical lines first
  for(var i = -(GROUND_WIDTH / 2); i < (GROUND_WIDTH / 2); i += GRID_SPACING) {

    lineGeo = new THREE.Geometry();
    lineGeo.vertices.push(
      new THREE.Vector3(i, 0, GROUND_WIDTH / 2),
      new THREE.Vector3(i, 0, -(GROUND_WIDTH / 2))
    );

    line = new THREE.Line(lineGeo, lineMaterial);
    this.add(line);

  }

  // Now add the horizontal ones
  for(var i = -(GROUND_WIDTH / 2); i < (GROUND_WIDTH / 2); i += GRID_SPACING) {

    lineGeo = new THREE.Geometry();
    lineGeo.vertices.push(
      new THREE.Vector3(-(GROUND_WIDTH / 2), 0, i),
      new THREE.Vector3((GROUND_WIDTH / 2), 0, i)
    );
    line = new THREE.Line(lineGeo, lineMaterial);
    this.add(line);

  }
}
Grid.prototype = new THREE.Object3D();
Grid.prototype.constructor = Grid;

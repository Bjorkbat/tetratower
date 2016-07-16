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
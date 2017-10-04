'use strict'

const DUBLIN_OFFICE = {lat: 53.3393, lon: -6.2576841};
const MAX_DISTANCE = 100; // KM
const EARTH_RADIUS = 6371; // KM - from https://en.wikipedia.org/wiki/Earth_radius

/*
  This will contain the main funcion to read the JSON and output customers within 100km of the Dublin office
*/
const customerDistance = () => {

}

/**
 * Returns the radian value of the provided degrees.
 * @param {number} degrees Degrees to be conveted
 */
const degreesToRadians = (degrees) => {
  return degrees * Math.PI / 180;
}

module.exports = customerDistance

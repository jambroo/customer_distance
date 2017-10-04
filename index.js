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
 * Returns the distance in kilometers to the Dublin office (53.3393,-6.2576841)
 * from the provided latitude and longitude coordinates.
 * @param {number} lat Latitude degrees of customer
 * @param {number} lon longitude degrees of customer
 */
const distanceToOffice = (lat, lon) => {
  // Convert provided latitude and longitude degrees into radians
  let fromRadians = latLonRadians(DUBLIN_OFFICE.lat, DUBLIN_OFFICE.lon);
  let toRadians = latLonRadians(lat, lon);

  // Calculate longitude delta
  let lonDelta = fromRadians.lon - toRadians.lon;

  // As per wikipedia article: https://en.wikipedia.org/wiki/Great-circle_distance#Formulas
  // The numerator here is made of 2 parts. Part 1: (cos(toLat)*sin(lonDelta))^2
  //   Part 2: (cos(fromLat)*sin(toLat)-sin(fromLat)*cos(toLat)*cos(lonDelta))^2
  let numerator0 = Math.pow(Math.cos(toRadians.lat) * Math.sin(lonDelta), 2);
  let numerator1 = Math.pow(Math.cos(fromRadians.lat) * Math.sin(toRadians.lat) -
      Math.sin(fromRadians.lat) * Math.cos(toRadians.lat) *
      Math.cos(lonDelta), 2);
  // The denominator here is sin(fromLat)*sin(toLat) + cos(fromLat)*cos(toLat)*cos(fromDelta)
  var denominator = Math.sin(fromRadians.lat) * Math.sin(toRadians.lat) +
    Math.cos(fromRadians.lat) * Math.cos(toRadians.lat) * Math.cos(lonDelta);

  // Canculate central angle. Using atan2 as per wikipedia article mentioned above:
  //   "When programming a computer, one should use the atan2() function rather than the ordinary arctangent function (atan())..."
  let centralAngle = Math.atan2(Math.sqrt(numerator0 + numerator1), denominator);

  return centralAngle * EARTH_RADIUS;
}

/**
 * Returns the radian value of the provided degrees.
 * @param {number} degrees Degrees to be conveted
 */
const degreesToRadians = (degrees) => {
  return degrees * Math.PI / 180;
}

/**
 * Returns a latitude radians and longitude radians object.
 * @param lat Latitude degrees
 * @param lon Longitude degrees
 **/
 const latLonRadians = (lat, lon) => {
   return {
     lat: degreesToRadians(lat),
     lon: degreesToRadians(lon)
   };
 }

module.exports = customerDistance

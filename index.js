'use strict'

const fs = require('fs');

const DUBLIN_OFFICE = {lat: 53.3393, lon: -6.2576841};
const MAX_DISTANCE = 100; // KM
const EARTH_RADIUS = 6371; // KM - from https://en.wikipedia.org/wiki/Earth_radius
const CUSTOMER_DB = './customers.json';

/*
  Read database file and calculate distances. Filter these by distances < 100,
  sort by user ID and output to console a list of names and user IDs of these users.
*/
const customerDistance = () => {
  // The customers.json file is not a valid JSON list so it will need to be read line by line
  // If it was a json list we could have used the require function here.
  let db = [];
  try {
    const dbRaw = fs.readFileSync(CUSTOMER_DB, 'utf8');
    db = dbRaw.trim().split("\n").map((line) => {
      return JSON.parse(line);
    })
  } catch (e) {
    throw new Error("Can't read customers.json file.");
  }

  // Calculate distance to office for each customer
  db.map((customer) => {
    customer.distance = distanceToOffice(customer.latitude, customer.longitude);

    return customer;
  })

  // Filter customers over 100km away from office
  db.filter((customer) => {
    return customer.distance < 100;
  });

  // Making assumption here user ID is unique.
  // The following sort array return < 0 if a should be in index before b,
  // return > 0 if a should be in a index after b and return 0 when they do
  // not need to be changed.
  let result = db.sort((a, b) => {
    return a.user_id - b.user_id
  })

  // Pepare result for output. Each line should have user ID and name.
  result = result.map(a => {
    return a.user_id + " " + a.name
  }).join("\n");

  console.log(result);

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

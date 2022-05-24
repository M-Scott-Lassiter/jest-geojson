// This file exports all matchers grouped within an object named after their categories.
// Any new matchers must get added to their individual files.

/* eslint-disable global-require */

// Bounding Boxes

// Coordinates
exports.coordinates = {
    isValid2DCoordinate: require('./matchers/coordinates/isValid2DCoordinate').isValid2DCoordinate,
    isValid3DCoordinate: require('./matchers/coordinates/isValid3DCoordinate').isValid3DCoordinate,
    isValidCoordinate: require('./matchers/coordinates/isValidCoordinate').isValidCoordinate
}

// Features

// Geometries

// Properties

// Winding

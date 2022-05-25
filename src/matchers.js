// This file exports all matchers grouped within an object named after their categories.
// Any new matchers must get added to their individual files.

/* eslint-disable global-require */

// Bounding Boxes
exports.boundingBoxes = {
    isValid2DBoundingBox: require('./matchers/boundingBoxes/isValid2DBoundingBox')
        .isValid2DBoundingBox,
    isValid3DBoundingBox: require('./matchers/boundingBoxes/isValid3DBoundingBox')
        .isValid3DBoundingBox,
    isValidBoundingBox: require('./matchers/boundingBoxes/isValidBoundingBox').isValidBoundingBox
}
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

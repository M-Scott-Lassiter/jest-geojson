/* eslint-disable global-require */

exports.boundingBoxes = {
    valid2DBoundingBox: require('./core/boundingBoxes/valid2DBoundingBox')
}

exports.coordinates = {
    valid2DCoordinate: require('./core/coordinates/valid2DCoordinate'),
    valid3DCoordinate: require('./core/coordinates/valid3DCoordinate'),
    validCoordinate: require('./core/coordinates/validCoordinate')
}

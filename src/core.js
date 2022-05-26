/* eslint-disable global-require */

exports.boundingBoxes = {
    valid2DBoundingBox: require('./core/boundingBoxes/valid2DBoundingBox'),
    valid3DBoundingBox: require('./core/boundingBoxes/valid3DBoundingBox'),
    validBoundingBox: require('./core/boundingBoxes/validBoundingBox')
}

exports.coordinates = {
    valid2DCoordinate: require('./core/coordinates/valid2DCoordinate'),
    valid3DCoordinate: require('./core/coordinates/valid3DCoordinate'),
    validCoordinate: require('./core/coordinates/validCoordinate')
}

exports.geometries = {
    pointGeometry: require('./core/geometries/pointGeometry'),
    multiPointGeometry: require('./core/geometries/multiPointGeometry')
}

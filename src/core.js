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
    anyGeometry: require('./core/geometries/anyGeometry'),
    lineStringGeometry: require('./core/geometries/lineStringGeometry'),
    multiLineStringGeometry: require('./core/geometries/multiLineStringGeometry'),
    multiPointGeometry: require('./core/geometries/multiPointGeometry'),
    multiPolygonGeometry: require('./core/geometries/multiPolygonGeometry'),
    pointGeometry: require('./core/geometries/pointGeometry'),
    polygonGeometry: require('./core/geometries/polygonGeometry')
}

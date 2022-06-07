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

exports.featureCollections = {
    featureCollection: require('./core/featureCollections/featureCollection')
}

exports.features = {
    feature: require('./core/features/feature'),
    hasID: require('./core/features/hasID')
}

exports.geometries = {
    anyGeometry: require('./core/geometries/anyGeometry'),
    geometryCollection: require('./core/geometries/geometryCollection'),
    lineStringGeometry: require('./core/geometries/lineStringGeometry'),
    multiLineStringGeometry: require('./core/geometries/multiLineStringGeometry'),
    multiPointGeometry: require('./core/geometries/multiPointGeometry'),
    multiPolygonGeometry: require('./core/geometries/multiPolygonGeometry'),
    pointGeometry: require('./core/geometries/pointGeometry'),
    polygonGeometry: require('./core/geometries/polygonGeometry')
}

exports.utilities = {
    commonGeometryValidation: require('./core/utilities/commonGeometryValidation')
        .commonGeometryValidation,
    validGeoJSON: require('./core/utilities/validGeoJSON').validGeoJSON
}

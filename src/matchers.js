// This file exports all matchers grouped within an object named after their categories.
// Any new matchers must get added to their individual files.

/* eslint-disable global-require */

exports.boundingBoxes = {
    isValid2DBoundingBox: require('./matchers/boundingBoxes/isValid2DBoundingBox')
        .isValid2DBoundingBox,
    isValid3DBoundingBox: require('./matchers/boundingBoxes/isValid3DBoundingBox')
        .isValid3DBoundingBox,
    isValidBoundingBox: require('./matchers/boundingBoxes/isValidBoundingBox').isValidBoundingBox
}

exports.coordinates = {
    isValid2DCoordinate: require('./matchers/coordinates/isValid2DCoordinate').isValid2DCoordinate,
    isValid3DCoordinate: require('./matchers/coordinates/isValid3DCoordinate').isValid3DCoordinate,
    isValidCoordinate: require('./matchers/coordinates/isValidCoordinate').isValidCoordinate
}

exports.featureCollections = {
    toBeFeatureCollection: require('./matchers/featureCollections/toBeFeatureCollection')
        .toBeFeatureCollection
}

exports.features = {
    toBeFeature: require('./matchers/features/toBeFeature').toBeFeature,
    toHaveID: require('./matchers/features/toHaveID').toHaveID,
    toHaveStringID: require('./matchers/features/toHaveStringID').toHaveStringID,
    toHaveNumericID: require('./matchers/features/toHaveNumericID').toHaveNumericID
}

exports.functional = {
    toBeValidGeoJSON: require('./matchers/functional/toBeValidGeoJSON').toBeValidGeoJSON
}

exports.geometries = {
    toBeAnyGeometry: require('./matchers/geometries/toBeAnyGeometry').toBeAnyGeometry,
    toBeGeometryCollection: require('./matchers/geometries/toBeGeometryCollection')
        .toBeGeometryCollection,
    toBeLineStringGeometry: require('./matchers/geometries/toBeLineStringGeometry')
        .toBeLineStringGeometry,
    toBeMultiLineStringGeometry: require('./matchers/geometries/toBeMultiLineStringGeometry')
        .toBeMultiLineStringGeometry,
    toBeMultiPointGeometry: require('./matchers/geometries/toBeMultiPointGeometry')
        .toBeMultiPointGeometry,
    toBeMultiPolygonGeometry: require('./matchers/geometries/toBeMultiPolygonGeometry')
        .toBeMultiPolygonGeometry,
    toBePointGeometry: require('./matchers/geometries/toBePointGeometry').toBePointGeometry,
    toBePolygonGeometry: require('./matchers/geometries/toBePolygonGeometry').toBePolygonGeometry
}

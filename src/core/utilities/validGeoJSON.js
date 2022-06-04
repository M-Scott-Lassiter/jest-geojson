const { anyGeometry } = require('../geometries/anyGeometry')
const { feature } = require('../features/feature')
const { featureCollection } = require('../featureCollections/featureCollection')

/**
 * This tests an object to see if it meets validation criteria for any of the seven GeoJSON
 * Geometry types, Features, or FeatureCollections.
 *
 * @memberof Core.Utilities
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/26
 * @param {object} geoObject Any GeoJSON Geometry, Feature, or FeatureCollection object
 * @returns {boolean} True if a valid GeoJSON object. Will throw a specific error if it encounters a problem.
 * @throws {Error} Argument must be a GeoJSON Geometry, Feature, or FeatureCollection object.
 * @example
 * point = {
 *     "type": "Point",
 *     "coordinates": [100.0, 0.0]
 * }
 * lineString = {
 *     "type": "LineString",
 *     "coordinates": [
 *         [
 *             [180.0, 40.0],
 *             [180.0, 50.0],
 *             [170.0, 50.0],
 *             [170.0, 40.0],
 *             [180.0, 40.0]
 *         ]
 *     ]
 * }
 * polygon = {
 *     "type": "Polygon",
 *     "coordinates": [
 *         [
 *             [100.0, 0.0],
 *             [101.0, 0.0],
 *             [101.0, 1.0],
 *             [100.0, 1.0],
 *             [100.0, 0.0]
 *         ]
 *     ]
 * }
 * feature = {
 *     "type": "Feature",
 *     "geometry": {
 *         "type": "Point",
 *         "coordinates": [102.0, 0.5]
 *     }
 * }
 * geometryCollection = {
 *     "type": "GeometryCollection",
 *     "geometries": [{
 *         "type": "Point",
 *         "coordinates": [100.0, 0.0]
 *     }, {
 *         "type": "LineString",
 *         "coordinates": [
 *             [101.0, 0.0],
 *             [102.0, 1.0]
 *         ]
 *     }, {
 *         "type": "Polygon",
 *         "coordinates": [
 *             [
 *                 [102.0, 2.0],
 *                 [103.0, 2.0],
 *                 [103.0, 3.0],
 *                 [102.0, 3.0],
 *                 [102.0, 2.0]
 *             ]
 *         ]
 *     }, {
 *         "type": "Point",
 *         "coordinates": [150.0, 73.0]
 *     }]
 * }
 *
 * // All of these will return true:
 *
 * validGeoJSON(point)
 * validGeoJSON(lineString)
 * validGeoJSON(polygon)
 * validGeoJSON(feature)
 * validGeoJSON(feature.geometry)
 * validGeoJSON(geometryCollection)
 * validGeoJSON(geometryCollection.geometries[1])
 * @example
 * // All of these throw errors:
 *
 * validGeoJSON(polygon.coordinates)
 * validGeoJSON(geometryCollection.geometries)
 * validGeoJSON([322, -34.549, 0])
 * validGeoJSON({coordinates: [22, -34.549, 22]})
 */
function validGeoJSON(geoObject) {
    if (typeof geoObject !== 'object' || geoObject === null || Array.isArray(geoObject)) {
        throw new Error(
            'Argument must be a GeoJSON Geometry, Feature, or FeatureCollection object.'
        )
    }

    if (geoObject.type === 'Feature') {
        try {
            feature(geoObject)
            return true
        } catch (err) {
            throw new Error(err)
        }
    }

    if (geoObject.type === 'FeatureCollection') {
        try {
            featureCollection(geoObject)
            return true
        } catch (err) {
            throw new Error(err)
        }
    }

    try {
        anyGeometry(geoObject)
        return true
    } catch (err) {
        throw new Error(err)
    }
}

exports.validGeoJSON = validGeoJSON

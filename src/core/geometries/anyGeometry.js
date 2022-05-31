const { pointGeometry } = require('./pointGeometry')
const { multiPointGeometry } = require('./multiPointGeometry')
const { lineStringGeometry } = require('./lineStringGeometry')
const { multiLineStringGeometry } = require('./multiLineStringGeometry')
const { polygonGeometry } = require('./polygonGeometry')
const { multiPolygonGeometry } = require('./multiPolygonGeometry')
const { validBoundingBox } = require('../boundingBoxes/validBoundingBox')

/**
 * Verifies an object meets validity requirements for one of the six basic GeoJSON geometry types:
 * Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon, GeometryCollection
 *
 * @memberof Core.Geometries
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/15
 * @param {object} geometryObject A WGS-84 array of [longitude, latitude] or [longitude, latitude, alititude]
 * @returns {boolean} True if a valid GeoJSON geometry object. If invalid, it will throw an error.
 * @throws {Error} Input must be either a valid Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon, or GeometryCollection
 * @example
 * point = {
 *     type: 'Point',
 *     coordinates: [100.0, 0.0]
 * }
 * lineString = {
 *     type: 'LineString',
 *     coordinates: [
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
 *     type: 'Polygon',
 *     coordinates: [
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
 *     type: 'Feature',
 *     geometry: {
 *         type: 'Point',
 *         coordinates: [102.0, 0.5]
 *     }
 * }
 *
 * const goodExample1 = anyGeometry(point)) // true
 * const goodExample2 = anyGeometry(lineString)) // true
 * const goodExample3 = anyGeometry(polygon)) // true
 *
 * const badExample = anyGeometry(feature)) // throws error
 */
function anyGeometry(geometryObject) {
    // The bbox and three prohibited properties below account for nested GeometryCollection objects. All other geometry
    // core functions include these within them, including geometryCollection.js.
    // Note: This might be a good set of checks to abstract away in a utility function later...
    if ('geometry' in geometryObject) {
        throw new Error(`GeoJSON Geometry objects are forbidden from having a property 'geometry'.`)
    }

    if ('properties' in geometryObject) {
        throw new Error(
            `GeoJSON Geometry objects are forbidden from having a property 'properties'.`
        )
    }

    if ('features' in geometryObject) {
        throw new Error(`GeoJSON Geometry objects are forbidden from having a property 'features'.`)
    }

    if ('bbox' in geometryObject) {
        validBoundingBox(geometryObject.bbox)
    }

    if (geometryObject?.type === 'Point') {
        pointGeometry(geometryObject)
        return true
    }

    if (geometryObject?.type === 'MultiPoint') {
        multiPointGeometry(geometryObject)
        return true
    }

    if (geometryObject?.type === 'LineString') {
        lineStringGeometry(geometryObject)
        return true
    }

    if (geometryObject?.type === 'MultiLineString') {
        multiLineStringGeometry(geometryObject)
        return true
    }

    if (geometryObject?.type === 'Polygon') {
        polygonGeometry(geometryObject)
        return true
    }

    if (geometryObject?.type === 'MultiPolygon') {
        multiPolygonGeometry(geometryObject)
        return true
    }

    if (geometryObject?.type === 'GeometryCollection') {
        geometryObject.geometries.forEach((geometry) => {
            anyGeometry(geometry)
        })
        return true
    }

    throw new Error(
        'Object must be either a valid Point, MultiPoint, LineString, MultiLineString, Polygon, or MultiPolygon'
    )
}

exports.anyGeometry = anyGeometry

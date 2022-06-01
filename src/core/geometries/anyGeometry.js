const { pointGeometry } = require('./pointGeometry')
const { multiPointGeometry } = require('./multiPointGeometry')
const { lineStringGeometry } = require('./lineStringGeometry')
const { multiLineStringGeometry } = require('./multiLineStringGeometry')
const { polygonGeometry } = require('./polygonGeometry')
const { multiPolygonGeometry } = require('./multiPolygonGeometry')
const { commonGeometryValidation } = require('../utilities')

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
    commonGeometryValidation(geometryObject)

    if (geometryObject.type === 'Point') {
        pointGeometry(geometryObject)
        return true
    }

    if (geometryObject.type === 'MultiPoint') {
        multiPointGeometry(geometryObject)
        return true
    }

    if (geometryObject.type === 'LineString') {
        lineStringGeometry(geometryObject)
        return true
    }

    if (geometryObject.type === 'MultiLineString') {
        multiLineStringGeometry(geometryObject)
        return true
    }

    if (geometryObject.type === 'Polygon') {
        polygonGeometry(geometryObject)
        return true
    }

    if (geometryObject.type === 'MultiPolygon') {
        multiPolygonGeometry(geometryObject)
        return true
    }

    // By this point, it can only be a GeometryCollection
    geometryObject.geometries.forEach((geometry) => {
        commonGeometryValidation(geometryObject) // Repeated here for useful error messages
        anyGeometry(geometry)
    })

    return true
}

exports.anyGeometry = anyGeometry

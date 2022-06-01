const { anyGeometry } = require('../geometries/anyGeometry')
const { pointGeometry } = require('../geometries/pointGeometry')
const { multiPointGeometry } = require('../geometries/multiPointGeometry')
const { lineStringGeometry } = require('../geometries/lineStringGeometry')
const { multiLineStringGeometry } = require('../geometries/multiLineStringGeometry')
const { polygonGeometry } = require('../geometries/polygonGeometry')
const { multiPolygonGeometry } = require('../geometries/multiPolygonGeometry')
const { validBoundingBox } = require('../boundingBoxes/validBoundingBox')

/**
 * Verifies an object is a valid GeoJSON Feature. This object requires a "type" member that must
 * equal 'Feature',  a "geometry" member that contains either one of the seven valid GeoJSON
 * geometry objects or an empty array, and a "properties" member that is either an object of any
 * composition or null.
 *
 * Foreign members are allowed with the exceptions thrown below.
 * If present, bounding boxes must be valid.
 *
 * @memberof Core.Features
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/24
 * @param {object} featureObject a GeoJSON LineString Geometry object
 * @param {string} [geometryType] Specific type of geometry to search for
 * @returns {boolean} True if a valid GeoJSON Feature. If invalid, it will throw an error.
 * @throws {Error} Argument not an object
 * @throws {Error} Must have a type property with value 'Feature'
 * @throws {Error} Forbidden from having a property 'coordinates', 'geometries', 'properties', or 'features'
 * @throws {Error} Bounding box must be valid (if present)
 * @throws {Error} ID must be either a number or string (if present)
 * @example
 * const testFeature = {
 *     "type": "Feature",
 *     "bbox": [-10.0, -10.0, 10.0, 10.0],
 *     "geometry": {
 *         "type": "Polygon",
 *         "coordinates": [
 *             [
 *                 [-10.0, -10.0],
 *                 [10.0, -10.0],
 *                 [10.0, 10.0],
 *                 [-10.0, -10.0]
 *             ]
 *         ]
 *     },
 *     "properties": {
 *         "prop0": "value0",
 *         "prop1": {
 *             "this": "that"
 *         }
 *     }
 * }
 * const multiPoint = {
 *     type: "MultiPoint",
 *     coordinates: [
 *         [101.0, 0.0],
 *         [102.0, 1.0]
 *     ]
 * }
 *
 * const goodExample1 = feature(testFeature)) // true
 * const goodExample2 = feature(testFeature, 'Polygon')) // true
 *
 * const badExample1 = feature(multiPoint)) // throws error
 * const badExample2 = feature(testFeature, 'LineString')) // throws error
 * const badExample3 = feature(testFeature.geometry, 'Polygon')) // throws error
 */
function feature(featureObject, geometryType) {
    if (featureObject.type !== 'Feature') {
        throw new Error(`Must have a type property with value 'Feature'`)
    }

    if ('coordinates' in featureObject) {
        throw new Error(
            `GeoJSON Feature objects are forbidden from having a property 'coordinates'.`
        )
    }

    if ('geometries' in featureObject) {
        throw new Error(
            `GeoJSON Feature objects are forbidden from having a property 'geometries'.`
        )
    }

    if ('features' in featureObject) {
        throw new Error(`GeoJSON Feature objects are forbidden from having a property 'features'.`)
    }

    if (!('properties' in featureObject)) {
        throw new Error(`GeoJSON Feature objects must have a property 'properties'.`)
    }

    if (typeof featureObject.properties !== 'object' || Array.isArray(featureObject.properties)) {
        throw new Error(`GeoJSON Feature properties must be either null or an object.`)
    }

    if (!('geometry' in featureObject)) {
        throw new Error(`GeoJSON Feature objects must have a property 'geometry'.`)
    }

    if (typeof featureObject.geometry !== 'object' || Array.isArray(featureObject.geometry)) {
        throw new Error(`GeoJSON Feature 'geometry' must be a valid GeoJSON geometry object.`)
    }

    if ('bbox' in featureObject) {
        validBoundingBox(featureObject.bbox)
    }

    if ('id' in featureObject) {
        if (
            !(typeof featureObject.id === 'number' || typeof featureObject.id === 'string') ||
            Number.isNaN(featureObject.id)
        ) {
            throw new Error(`If present, ID must be either a number or string.`)
        }
    }

    // Guard clause; features are allowed to have null geometry. However, if the matcher explicitly calls
    // for a particular geometry type, null isn't an option. We have to check for that.
    if (featureObject.geometry === null && geometryType === undefined) {
        return true
    }

    // At this point, we have guaranteed there is a geometry here. Validate it with the core functions.
    if (geometryType === undefined) {
        anyGeometry(featureObject.geometry)
    }

    if (geometryType === 'Point') {
        pointGeometry(featureObject.geometry)
    }

    if (geometryType === 'MultiPoint') {
        multiPointGeometry(featureObject.geometry)
    }

    if (geometryType === 'LineString') {
        lineStringGeometry(featureObject.geometry)
    }

    if (geometryType === 'MultiLineString') {
        multiLineStringGeometry(featureObject.geometry)
    }

    if (geometryType === 'Polygon') {
        polygonGeometry(featureObject.geometry)
    }

    if (geometryType === 'MultiPolygon') {
        multiPolygonGeometry(featureObject.geometry)
    }

    return true
}

exports.feature = feature

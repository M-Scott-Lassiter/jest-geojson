const { anyGeometry } = require('./anyGeometry')
const { validBoundingBox } = require('../boundingBoxes/validBoundingBox')

/**
 * Verifies an object is a valid GeoJSON GeometryCollection. This object requires a
 * 'type' property that must equal "GeometryCollection", and a 'geometries' property that contains
 * an array of GeoJSON Geometry objects (Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon)
 *
 * The geometries may be an empty array, but may not be an array of empty arrays or objects.
 *
 * Foreign members are allowed with the exceptions thrown below.
 * If present, bounding boxes must be valid.
 *
 * @memberof Core.Geometries
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/16
 * @param {object} geometryObject a GeoJSON Geometry object
 * @returns {boolean} True if a valid GeoJSON GeometryCollection Geometry. If invalid, it will throw an error.
 * @throws {Error} Argument not an object
 * @throws {Error} Must have a type property with value 'GeometryCollection'
 * @throws {Error} Forbidden from having a property 'geometry', 'properties', or 'features'
 * @example
 * const collection = {
 *     type: 'GeometryCollection',
 *     geometries: [{
 *         "type": 'Point',
 *         "coordinates": [100.0, 0.0]
 *     }, {
 *         type: 'LineString',
 *         coordinates: [
 *             [101.0, 0.0],
 *             [102.0, 1.0]
 *         ]
 *     }, {
 *         type: 'Polygon',
 *         coordinates: [
 *             [
 *                 [102.0, 2.0],
 *                 [103.0, 2.0],
 *                 [103.0, 3.0],
 *                 [102.0, 3.0],
 *                 [102.0, 2.0]
 *             ]
 *         ]
 *     }, {
 *         type: 'Point',
 *         coordinates: [150.0, 73.0]
 *     }]
 * }
 *
 * const goodExample = geometryCollection(collection) // true
 *
 * const badExample1 = geometryCollection(collection.geometries) // throws error
 * const badExample2 = geometryCollection(collection.geometries[1]) // throws error
 */
function geometryCollection(geometryObject) {
    if (
        typeof geometryObject !== 'object' ||
        Array.isArray(geometryObject) ||
        geometryObject === null
    ) {
        throw new Error('Argument must be a GeoJSON GeometryCollection object.')
    }

    if (!('geometries' in geometryObject)) {
        throw new Error(
            `GeoJSON GeometryCollection must contain a 'geometries' with an array of GeoJSON geometries.`
        )
    }

    if (geometryObject.type !== 'GeometryCollection') {
        throw new Error(`Must have a type property with value 'GeometryCollection'.`)
    }

    if ('geometry' in geometryObject) {
        throw new Error(
            `GeoJSON GeometryCollection objects are forbidden from having a property 'geometry'.`
        )
    }

    if ('properties' in geometryObject) {
        throw new Error(
            `GeoJSON GeometryCollection objects are forbidden from having a property 'properties'.`
        )
    }

    if ('features' in geometryObject) {
        throw new Error(
            `GeoJSON GeometryCollection objects are forbidden from having a property 'features'.`
        )
    }

    if ('bbox' in geometryObject) {
        validBoundingBox(geometryObject.bbox)
    }

    if (!Array.isArray(geometryObject.geometries)) {
        throw new Error('Geometries property must be an array of valid GeoJSON geometry objects.')
    }

    geometryObject.geometries.forEach((geometry) => {
        if (geometry?.type === 'GeometryCollection') {
            geometryCollection(geometry)
        } else {
            anyGeometry(geometry)
        }
    })

    return true
}

exports.geometryCollection = geometryCollection

const { validCoordinate } = require('../coordinates/validCoordinate')
const { validBoundingBox } = require('../boundingBoxes/validBoundingBox')

/**
 * Verifies an object is a valid GeoJSON MultiLineString Geometry. This geometry requires a
 * 'type' property that must equal "MultiLineString", and a 'coordinates' property that contains
 * an array of linestring arrays (i.e. each linestring array containing at least two or more valid
 * WGS-84 GeoJSON coordinates).
 *
 * The coordinates may be an empty array, but may not be an array of empty arrays.
 *
 * Foreign members are allowed with the exceptions thrown below.
 * If present, bounding boxes must be valid.
 *
 * @memberof Core.Geometries
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/12
 * @param {object} geometryObject a GeoJSON MultiLineString Geometry object
 * @returns {boolean} True if a valid GeoJSON MultiLineString Geometry. If invalid, it will throw an error.
 * @throws {Error} Argument not an object
 * @throws {Error} Must have a type property with value 'MultiLineString'
 * @throws {Error} Coordinates array must contain two or more valid GeoJSON coordinates
 * @throws {Error} Forbidden from having a property 'geometry', 'properties', or 'features'
 * @example
 * const multiLineString = {
 *     type: 'MultiLineString',
 *     coordinates: [
 *         [
 *             [100.0, 0.0],
 *             [101.0, 1.0]
 *         ],
 *         [
 *             [102.0, 2.0],
 *             [103.0, 3.0]
 *         ]
 *     ]
 * }
 * const multiLineStringOneCoordinate = {
 *     type: 'MultiLineString',
 *     coordinates: [
 *         [
 *             [100.0, 0.0]
 *         ]
 *     ]
 * }
 * const point = {
 *     type: 'Point',
 *     coordinates: [100.0, 0.0]
 * }
 *
 * const goodExample = multiLineStringGeometry(multiLineString) // true
 *
 * const badExample1 = multiLineStringGeometry(point) // throws error
 * const badExample2 = multiLineStringGeometry(multiLineStringOneCoordinate) // throws error
 */
function multiLineStringGeometry(geometryObject) {
    if (
        typeof geometryObject !== 'object' ||
        Array.isArray(geometryObject) ||
        geometryObject === null
    ) {
        throw new Error('Argument must be a GeoJSON MultiLineString Geometry object.')
    }

    if (!('coordinates' in geometryObject)) {
        throw new Error(`GeoJSON MultiLineString Geometry must contain a 'coordinates' property.`)
    }

    if (geometryObject.type !== 'MultiLineString') {
        throw new Error(`Must have a type property with value 'MultiLineString'`)
    }

    if ('geometry' in geometryObject) {
        throw new Error(
            `GeoJSON MultiLineString Geometry objects are forbidden from having a property 'geometry'.`
        )
    }

    if ('properties' in geometryObject) {
        throw new Error(
            `GeoJSON MultiLineString Geometry objects are forbidden from having a property 'properties'.`
        )
    }

    if ('features' in geometryObject) {
        throw new Error(
            `GeoJSON MultiLineString Geometry objects are forbidden from having a property 'features'.`
        )
    }

    if ('bbox' in geometryObject) {
        validBoundingBox(geometryObject.bbox)
    }

    // Geometry objects are allowed to have empty arrays as coordinates, however validCoordinate may not.
    // If coordinates is an empty array, we're done. Otherwise, check for coordinate validity.
    if (!Array.isArray(geometryObject.coordinates) && geometryObject.coordinates.length !== 1) {
        throw new Error('Coordinates property must be an array of valid GeoJSON coordinates')
    }

    for (let i = 0; i < geometryObject.coordinates.length; i++) {
        if (geometryObject.coordinates[i].length === 1) {
            throw new Error('Coordinates array must contain two or more valid GeoJSON coordinates')
        }
        for (let j = 0; j < geometryObject.coordinates[i].length; j++) {
            validCoordinate(geometryObject.coordinates[i][j])
        }
    }

    return true
}

exports.multiLineStringGeometry = multiLineStringGeometry

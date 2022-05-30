const { validCoordinate } = require('../coordinates/validCoordinate')

/**
 * Verifies an object is a valid GeoJSON LineString Geometry. This geometry requires a
 * 'type' property that must equal "LineString", and a 'coordinates' property that contains
 * an array of two or more valid WGS-84 GeoJSON coordinates. The coordinates may be an empty array,
 * but may not be an array of empty arrays.
 *
 * Foreign members are allowed with the exceptions thrown below.
 *
 * @memberof Core.Geometries
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/11
 * @param {object} geometryObject a GeoJSON LineString Geometry object
 * @returns {boolean} True if a valid GeoJSON LineString Geometry. If invalid, it will throw an error.
 * @throws {Error} Argument not an object
 * @throws {Error} Must have a type property with value 'LineString'
 * @throws {Error} forbidden from having a property 'geometry', 'properties', or 'features'
 * @example
 * const linestring = {
 *     type: 'LineString',
 *     coordinates: [
 *         [
 *             [180.0, 40.0], [180.0, 50.0], [170.0, 50.0],
 *             [170.0, 40.0], [180.0, 40.0]
 *         ]
 *     ]
 * }
 * const point = {
 *     type: 'Point',
 *     coordinates: [100.0, 0.0]
 * }
 *
 * const goodExample = lineStringGeometry(linestring) // true
 *
 * const badExample = lineStringGeometry(point)) / throws error
 */
function lineStringGeometry(geometryObject) {
    if (
        typeof geometryObject !== 'object' ||
        Array.isArray(geometryObject) ||
        geometryObject === null
    ) {
        throw new Error('Argument must be a GeoJSON LineString Geometry object.')
    }

    if (!('coordinates' in geometryObject)) {
        throw new Error(`GeoJSON LineString Geometry must contain a 'coordinates' property.`)
    }

    if (geometryObject.type !== 'LineString') {
        throw new Error(`Must have a type property with value 'LineString'`)
    }

    if ('geometry' in geometryObject) {
        throw new Error(
            `GeoJSON LineString Geometry objects are forbidden from having a property 'geometry'.`
        )
    }

    if ('properties' in geometryObject) {
        throw new Error(
            `GeoJSON LineString Geometry objects are forbidden from having a property 'properties'.`
        )
    }

    if ('features' in geometryObject) {
        throw new Error(
            `GeoJSON LineString Geometry objects are forbidden from having a property 'features'.`
        )
    }

    // // Geometry objects are allowed to have empty arrays as coordinates, however validCoordinate may not.
    // If coordinates is an empty array, we're done. Otherwise, check for coordinate validity.
    if (!Array.isArray(geometryObject.coordinates) && geometryObject.coordinates.length !== 1) {
        throw new Error('Coordinates property must be an array of valid GeoJSON coordinates')
    }
    if (geometryObject.coordinates.length === 1) {
        throw new Error('Coordinates array must contain two or more valid GeoJSON coordinates')
    }
    for (let i = 0; i < geometryObject.coordinates.length; i++) {
        validCoordinate(geometryObject.coordinates[i])
    }

    return true
}

exports.lineStringGeometry = lineStringGeometry

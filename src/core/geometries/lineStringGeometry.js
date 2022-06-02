const { validCoordinate } = require('../coordinates/validCoordinate')
const { commonGeometryValidation } = require('../utilities')

/**
 * Verifies an object is a valid GeoJSON LineString Geometry. This geometry requires a
 * 'type' property that must equal "LineString", and a 'coordinates' property that contains
 * an array of two or more valid WGS-84 GeoJSON coordinates. The coordinates may be an empty array,
 * but may not be an array of empty arrays.
 *
 * Foreign members are allowed with the exceptions thrown below.
 * If present, bounding boxes must be valid.
 *
 * @memberof Core.Geometries
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/11
 * @param {object} geometryObject a GeoJSON LineString Geometry object
 * @returns {boolean} True if a valid GeoJSON LineString Geometry. If invalid, it will throw an error.
 * @throws {Error} Argument not an object
 * @throws {Error} Must have a type property with value 'LineString'
 * @throws {Error} Forbidden from having a property 'geometry', 'properties', or 'features'
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
    if (geometryObject.type !== 'LineString') {
        throw new Error(`Must have a type property with value 'LineString'`)
    }

    commonGeometryValidation(geometryObject)

    if (geometryObject.coordinates.length === 1) {
        throw new Error('Coordinates array must contain two or more valid GeoJSON coordinates')
    }
    for (let i = 0; i < geometryObject.coordinates.length; i++) {
        validCoordinate(geometryObject.coordinates[i])
    }

    return true
}

exports.lineStringGeometry = lineStringGeometry

const { validCoordinate } = require('../coordinates/validCoordinate')
const { commonGeometryValidation } = require('../utilities')

/**
 * Verifies an object is a valid GeoJSON MultiPoint Geometry. This geometry requires a
 * 'type' property that must equal "MultiPoint", and a 'coordinates' property that contains
 * a single coordinate or an array of valid WGS-84 GeoJSON coordinates.
 * The coordinates may be an empty array.
 *
 * Foreign members are allowed with the exceptions thrown below.
 * If present, bounding boxes must be valid.
 *
 * @memberof Core.Geometries
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/10
 * @param {object} geometryObject a GeoJSON MultiPoint Geometry object
 * @returns {boolean} True if a valid GeoJSON MultiPoint Geometry. If invalid, it will throw an error.
 * @throws {Error} Argument not an object
 * @throws {Error} Must have a type property with value 'MultiPoint'
 * @throws {Error} Forbidden from having a property 'geometry', 'properties', or 'features'
 * @example
 * const testMultiPoint1 = {
 *     type: 'MultiPoint',
 *     id: null,
 *     coordinates: [[25, 90], [-180, 0]]
 * }
 *
 * const testMultiPoint2 = {
 *     type: 'Point',
 *     coordinates: [25, 90]
 * }
 *
 * const goodExample = console.log(multiPointGeometry(testMultiPoint1) // true
 *
 * const badExample = console.log(multiPointGeometry(testMultiPoint2) // throws error
 */
function multiPointGeometry(geometryObject) {
    if (geometryObject.type !== 'MultiPoint') {
        throw new Error(`Must have a type property with value 'MultiPoint'`)
    }

    commonGeometryValidation(geometryObject)

    for (let i = 0; i < geometryObject.coordinates.length; i++) {
        validCoordinate(geometryObject.coordinates[i])
    }

    return true
}

exports.multiPointGeometry = multiPointGeometry

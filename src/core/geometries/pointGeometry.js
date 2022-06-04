const { validCoordinate } = require('../coordinates/validCoordinate')
const { commonGeometryValidation } = require('../utilities/commonGeometryValidation')

/**
 * Verifies an object is a valid GeoJSON Point Geometry. This geometry requires a
 * 'type' property that must equal "Point", and a 'coordinates' property that contains
 * a single valid WGS-84 GeoJSON coordinate. The coordinates may be an empty array.
 *
 * Foreign members are allowed with the exceptions thrown below.
 * If present, bounding boxes must be valid.
 *
 * @memberof Core.Geometries
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/9
 * @param {object} geometryObject a GeoJSON Point Geometry object
 * @returns {boolean} True if a valid GeoJSON Point Geometry. If invalid, it will throw an error.
 * @throws {Error} Argument not an object
 * @throws {Error} Must have a type property with value 'Point'
 * @throws {Error} Forbidden from having a property 'geometry', 'properties', or 'features'
 * @example
 * const testPoint = {
 *     type: 'Point',
 *     coordinates: [25, 10.2]
 * }
 * const testPoint1 = {
 *     coordinates: [25, 10.2]
 * }
 * const testPoint2 = {
 *     type: 'MultiPoint',
 *     coordinates: [[25, 10.2], [120, 45]}
 * }
 *
 * const goodExample = pointGeometry(testPoint) // true
 *
 * const badExample1 = pointGeometry(testPoint1) // throws error for missing type
 * const badExample2 = pointGeometry(testPoint2) // throws error for being MultiPoint
 */
function pointGeometry(geometryObject) {
    if (geometryObject.type !== 'Point') {
        throw new Error(`Must have a type property with value 'Point'`)
    }

    commonGeometryValidation(geometryObject)

    // Geometry objects are allowed to have empty arrays as coordinates, however validCoordinate may not.
    // If coordinates is an empty array, we're done. Otherwise, check for coordinate validity.
    if (geometryObject.coordinates.length === 0) {
        return true
    }
    validCoordinate(geometryObject.coordinates)

    return true
}

exports.pointGeometry = pointGeometry

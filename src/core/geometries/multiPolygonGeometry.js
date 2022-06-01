const { validCoordinate } = require('../coordinates/validCoordinate')
const { commonGeometryValidation } = require('../utilities')

/**
 * Verifies an object is a valid GeoJSON MultiPolygon Geometry. This geometry requires a
 * 'type' property that must equal "MultiPolygon", and a 'coordinates' property that contains
 * an array of polygon coordinate arrays. Each coordinate array must contain at least four valid
 * WGS-84 GeoJSON coordinates, and the final coordinate must equal the first.
 *
 * The coordinates may be an empty array, but may not be an array of empty arrays.
 *
 * Foreign members are allowed with the exceptions thrown below.
 * If present, bounding boxes must be valid.
 *
 * @memberof Core.Geometries
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/14
 * @param {object} geometryObject a GeoJSON Polygon Geometry object
 * @returns {boolean} True if a valid GeoJSON MultiPolygon Geometry. If invalid, it will throw an error.
 * @throws {Error} Argument not an object
 * @throws {Error} Must have a type property with value 'MultiPolygon'
 * @throws {Error} Coordinates array must contain four or more valid GeoJSON coordinates
 * @throws {Error} Final coordinate must match first coordinate
 * @throws {Error} Forbidden from having a property 'geometry', 'properties', or 'features'
 * @example
 * const multiPolygon = {
 *     type: 'MultiPolygon',
 *     coordinates: [
 *         [
 *             [
 *                 [102.0, 2.0],
 *                 [103.0, 2.0],
 *                 [103.0, 3.0],
 *                 [102.0, 3.0],
 *                 [102.0, 2.0]
 *             ]
 *         ],
 *         [
 *             [
 *                 [100.0, 0.0],
 *                 [101.0, 0.0],
 *                 [101.0, 1.0],
 *                 [100.0, 1.0],
 *                 [100.0, 0.0]
 *             ],
 *             [
 *                 [100.2, 0.2],
 *                 [100.2, 0.8],
 *                 [100.8, 0.8],
 *                 [100.8, 0.2],
 *                 [100.2, 0.2]
 *             ]
 *         ]
 *     ]
 * }
 * const multiPolygonWithSingleElement = {
 *     type: 'MultiPolygon',
 *     coordinates: [
 *         [
 *             [
 *                 [102.0, 2.0],
 *                 [103.0, 2.0],
 *                 [103.0, 3.0],
 *                 [102.0, 3.0],
 *                 [102.0, 2.0]
 *             ]
 *         ]
 *     ]
 * }
 * const point = {
 *     type: 'Point',
 *     coordinates: [100.0, 0.0]
 * }
 *
 * const goodExample1 = multiPolygonGeometry(multiPolygon) // true
 * const goodExample2 = multiPolygonGeometry(multiPolygonWithSingleElement) // true
 *
 * const badExample = multiPolygonGeometry(point) // throws error
 */
function multiPolygonGeometry(geometryObject) {
    if (geometryObject.type !== 'MultiPolygon') {
        throw new Error(`Must have a type property with value 'MultiPolygon'.`)
    }

    commonGeometryValidation(geometryObject)

    geometryObject.coordinates.forEach((polygonCoordinateArray) => {
        if (!Array.isArray(polygonCoordinateArray)) {
            throw new Error(
                'polygon coordinate array must be an array of valid GeoJSON linear rings.'
            )
        }
        polygonCoordinateArray.forEach((linearRing) => {
            if (!Array.isArray(linearRing)) {
                throw new Error(
                    'Polygon linear ring must be an array of valid GeoJSON coordinates.'
                )
            }
            if (linearRing.length < 4) {
                throw new Error(
                    'Coordinates array must contain four or more valid GeoJSON coordinates.'
                )
            }

            // Can't directly compare the arrays, so turn them to strings. The orders in GeoJSON applications
            // will always be known, therefore this is an acceptable way to test equality.
            // See https://stackoverflow.com/questions/30820611/why-doesnt-equality-check-work-with-arrays
            const finalIndex = linearRing.length - 1
            const firstCoord = JSON.stringify(linearRing[0])
            const finalCoord = JSON.stringify(linearRing[finalIndex])
            if (firstCoord !== finalCoord) {
                throw new Error(
                    'The final coordinate in a polygon linear ring must match first coordinate.'
                )
            }

            linearRing.forEach((coordinate) => {
                validCoordinate(coordinate)
            })
        })
    })

    return true
}

exports.multiPolygonGeometry = multiPolygonGeometry

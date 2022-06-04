const { validCoordinate } = require('../coordinates/validCoordinate')
const { commonGeometryValidation } = require('../utilities/commonGeometryValidation')

/**
 * Verifies an object is a valid GeoJSON Polygon Geometry. This geometry requires a
 * 'type' property that must equal "Polygon", and a 'coordinates' property that contains
 * an array of linestring arrays. Each point array must contain at least four valid
 * WGS-84 GeoJSON coordinates, and the final coordinate must equal the first.
 *
 * The coordinates may be an empty array, but may not be an array of empty arrays.
 *
 * Foreign members are allowed with the exceptions thrown below.
 * If present, bounding boxes must be valid.
 *
 * @memberof Core.Geometries
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/13
 * @param {object} geometryObject a GeoJSON Polygon Geometry object
 * @returns {boolean} True if a valid GeoJSON Polygon Geometry. If invalid, it will throw an error.
 * @throws {Error} Argument not an object
 * @throws {Error} Must have a type property with value 'Polygon'
 * @throws {Error} Coordinates array must contain four or more valid GeoJSON coordinates
 * @throws {Error} Final coordinate must match first coordinate
 * @throws {Error} Forbidden from having a property 'geometry', 'properties', or 'features'
 * @example
 *  const polygon = {
 *      type: 'Polygon',
 *      coordinates: [
 *          [
 *              [100.0, 0.0],
 *              [101.0, 0.0],
 *              [101.0, 1.0],
 *              [100.0, 1.0],
 *              [100.0, 0.0]
 *          ]
 *      ]
 *  }
 *  const polygonEndDoesNotEqualStart = {
 *      type: 'Polygon',
 *      coordinates: [
 *          [
 *              [100.0, 0.0],
 *              [101.0, 0.0],
 *              [101.0, 1.0],
 *              [100.0, 1.0]
 *          ]
 *      ]
 *  }
 *  const point = {
 *      type: 'Point',
 *      coordinates: [100.0, 0.0]
 *  }
 *
 *  const goodExample = polygonGeometry(polygon) // true
 *
 *  const badExample1 = console.log(polygonGeometry(point) // throws error
 *  const badExample2 = console.log(polygonGeometry(polygonEndDoesNotEqualStart) // throws error
 */
function polygonGeometry(geometryObject) {
    if (geometryObject.type !== 'Polygon') {
        throw new Error(`Must have a type property with value 'Polygon'.`)
    }

    commonGeometryValidation(geometryObject)

    geometryObject.coordinates.forEach((linearRing) => {
        if (!Array.isArray(linearRing)) {
            throw new Error('Polygon linear ring must be an array of valid GeoJSON coordinates.')
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

    return true
}

exports.polygonGeometry = polygonGeometry

const { polygonGeometry } = require('../../core/geometries/polygonGeometry')

// eslint-disable-next-line jsdoc/require-returns
/**
 * Verifies an object is a valid GeoJSON Polygon Geometry. This geometry requires a
 * 'type' property that must equal "Polygon", and a 'coordinates' property that contains
 * an array of linestring arrays. Each point array must contain at least four valid
 * WGS-84 GeoJSON coordinates, and the final coordinate must equal the first.
 *
 * The coordinates may be an empty array, but may not be an array of empty arrays.
 *
 * Foreign members are allowed with the exception of 'geometry', 'properties', or 'features'.
 * If present, bounding boxes must be valid.
 *
 * @memberof Matchers.Geometries
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/13
 * @param {object} geometryObject a GeoJSON Polygon Geometry object
 * @example
 * const polygon = {
 *     "type": "Polygon",
 *     "coordinates": [
 *         [
 *             [100.0, 0.0],
 *             [101.0, 0.0],
 *             [101.0, 1.0],
 *             [100.0, 1.0],
 *             [100.0, 0.0]
 *         ]
 *     ]
 * }
 *
 * test('Object is valid GeoJSON', () => {
 *     expect(polygon).toBePolygonGeometry()
 * })
 * @example
 * const point = {
 *     type: "Point",
 *     coordinates: [100.0, 0.0]
 * }
 * const polygonEndDoesNotEqualStart = {
 *     "type": "Polygon",
 *     "coordinates": [
 *         [
 *             [100.0, 0.0],
 *             [101.0, 0.0],
 *             [101.0, 1.0],
 *             [100.0, 1.0]
 *         ]
 *     ]
 * }
 *
 * test('Object is valid GeoJSON', () => {
 *     expect(point).not.toBePolygonGeometry()
 *     expect(polygonEndDoesNotEqualStart).not.toBePolygonGeometry()
 * })
 */
function toBePolygonGeometry(geometryObject) {
    const { printReceived, matcherHint } = this.utils
    const passMessage =
        // eslint-disable-next-line prefer-template
        matcherHint('.not.toBePolygonGeometry', 'GeometryObject', '') +
        '\n\n' +
        `Expected input to not be a valid GeoJSON Polygon geometry.\n\n` +
        `Received:  ${printReceived(geometryObject)}`

    /**
     * Combines a custom error message with built in Jest tools to provide a more descriptive error
     * meessage to the end user.
     *
     * @param {string} errorMessage Error message text to return to the user
     * @returns {string} Concatenated Jest test result string
     */
    function failMessage(errorMessage) {
        return (
            // eslint-disable-next-line prefer-template, no-unused-expressions
            matcherHint('.toBePolygonGeometry', 'GeometryObject', '') +
            '\n\n' +
            `${errorMessage}\n\n` +
            `Received:  ${printReceived(geometryObject)}`
        )
    }

    try {
        polygonGeometry(geometryObject)
    } catch (err) {
        return { pass: false, message: () => failMessage(err.message) }
    }
    return { pass: true, message: () => passMessage }
}

exports.toBePolygonGeometry = toBePolygonGeometry

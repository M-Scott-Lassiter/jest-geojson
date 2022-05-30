const { multiPolygonGeometry } = require('../../core/geometries/multiPolygonGeometry')

// eslint-disable-next-line jsdoc/require-returns
/**
 * Verifies an object is a valid GeoJSON MultiPolygon Geometry. This geometry requires a
 * 'type' property that must equal "MultiPolygon", and a 'coordinates' property that contains
 * an array of polygon coordinate arrays. Each coordinate array must contain at least four valid
 * WGS-84 GeoJSON coordinates, and the final coordinate must equal the first.
 *
 * The coordinates may be an empty array, but may not be an array of empty arrays.
 *
 * Foreign members are allowed with the exception of 'geometry', 'properties', or 'features'.
 *
 * @memberof Matchers.Geometries
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/14
 * @param {object} geometryObject a GeoJSON Polygon Geometry object
 * @example
 * const multiPolygon = {
 *     "type": "MultiPolygon",
 *     "coordinates": [
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
 *     "type": "MultiPolygon",
 *     "coordinates": [
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
 *
 * test('Object is valid GeoJSON MultiPolygon Geometry', () => {
 *     expect(multiPolygon).toBeMultiPolygonGeometry()
 *     expect(multiPolygonWithSingleElement).toBeMultiPolygonGeometry()
 * })
 * @example
 * const point = {
 *     type: "Point",
 *     coordinates: [100.0, 0.0]
 * }
 *
 * test('Object is NOT valid GeoJSON MultiPolygon Geometry', () => {
 *     expect(point).not.toBeMultiPolygonGeometry()
 * })
 */
function toBeMultiPolygonGeometry(geometryObject) {
    const { printReceived, matcherHint } = this.utils
    const passMessage =
        // eslint-disable-next-line prefer-template
        matcherHint('.not.toBeMultiPolygonGeometry', 'GeometryObject', '') +
        '\n\n' +
        `Expected input to not be a valid GeoJSON MultiPolygon geometry.\n\n` +
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
            matcherHint('.toBeMultiPolygonGeometry', 'GeometryObject', '') +
            '\n\n' +
            `${errorMessage}\n\n` +
            `Received:  ${printReceived(geometryObject)}`
        )
    }

    try {
        multiPolygonGeometry(geometryObject)
    } catch (err) {
        return { pass: false, message: () => failMessage(err.message) }
    }
    return { pass: true, message: () => passMessage }
}

exports.toBeMultiPolygonGeometry = toBeMultiPolygonGeometry

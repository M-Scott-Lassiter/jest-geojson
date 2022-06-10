const { multiPolygonGeometry } = require('../../core/geometries/multiPolygonGeometry')

// eslint-disable-next-line jsdoc/require-returns
/**
 * Verifies an object is a valid GeoJSON MultiPolygon Geometry with at least one polygon having a hole.
 *
 * @memberof Matchers.Geometries
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/44
 * @param {object} geometryObject a GeoJSON Polygon Geometry object
 * @example
 * const multiPolygon1 = {
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
 *
 * test('Object is valid MultiPolygon With Hole', () => {
 *     expect(multiPolygon1).toBeMultiPolygonWithHole()
 * })
 * @example
 * const multiPolygon2 = {
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
 * const polygon = {
 *     type: 'Polygon',
 *     coordinates: [
 *         [
 *             [100.0, 0.0],
 *             [101.0, 0.0],
 *             [101.0, 1.0],
 *             [100.0, 1.0],
 *             [100.0, 0.0]
 *         ],
 *         [
 *             [100.2, 0.2],
 *             [100.2, 0.8],
 *             [100.8, 0.8],
 *             [100.8, 0.2],
 *             [100.2, 0.2]
 *         ]
 *     ]
 * }
 *
 * test('Not a MultiPolygon, or does not have a hole', () => {
 *     expect(multiPolygon2).not.toBeMultiPolygonWithHole()
 *     expect(multiPolygon1.coordinates[2][1]).not.toBeMultiPolygonWithHole()
 *     expect(polygon).not.toBeMultiPolygonWithHole()
 * })
 */
function toBeMultiPolygonWithHole(geometryObject) {
    const { printReceived, matcherHint } = this.utils
    const passMessage =
        // eslint-disable-next-line prefer-template
        matcherHint('.not.toBeMultiPolygonWithHole', 'GeometryObject', '') +
        '\n\n' +
        `Expected input to not be a valid GeoJSON MultiPolygon geometry with at least one hole.\n\n` +
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
            matcherHint('.toBeMultiPolygonWithHole', 'GeometryObject', '') +
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

    let foundHole = false
    geometryObject.coordinates.forEach((polygon) => {
        if (polygon.length > 1) {
            foundHole = true
        }
    })
    if (foundHole) {
        return { pass: true, message: () => passMessage }
    }

    return {
        pass: false,
        message: () =>
            failMessage('MultiPolygon has no polygons with holes, expected at least one.')
    }
}

exports.toBeMultiPolygonWithHole = toBeMultiPolygonWithHole

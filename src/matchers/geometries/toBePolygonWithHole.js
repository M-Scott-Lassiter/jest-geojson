const { polygonGeometry } = require('../../core/geometries/polygonGeometry')

// eslint-disable-next-line jsdoc/require-returns
/**
 * Verifies an object is a valid GeoJSON Polygon Geometry with a hole.
 *
 * @memberof Matchers.Geometries
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/43
 * @param {object} geometryObject a GeoJSON Polygon Geometry object
 * @example
 * const polygon1 = {
 *     "type": "Polygon",
 *     "coordinates": [
 *         [
 *             [100.0, 0.0],
 *             [101.0, 0.0],
 *             [101.0, 1.0],
 *             [100.0, 1.0],
 *             [100.0, 0.0]
 *         ],
 *         [
 *             [100.8, 0.8],
 *             [100.8, 0.2],
 *             [100.2, 0.2],
 *             [100.2, 0.8],
 *             [100.8, 0.8]
 *         ]
 *     ]
 * }
 *
 * test('Object is valid Polygon With Hole', () => {
 *     expect(polygon1).toBePolygonWithHole()
 * })
 * @example
 * const polygon2 = {
 *     type: 'Polygon',
 *     coordinates: [
 *         [
 *             [120.0, 0.0],
 *             [121.0, 0.0],
 *             [121.0, 1.0],
 *             [120.0, 1.0],
 *             [120.0, 0.0]
 *         ]
 *     ]
 * }
 * const point = {
 *     type: 'Polygon',
 *     coordinates: [
 *         [
 *             [120.0, 0.0],
 *             [121.0, 0.0],
 *             [121.0, 1.0],
 *             [120.0, 1.0],
 *             [120.0, 0.0]
 *         ]
 *     ]
 * }
 *
 * test('Not a Polygon, or does not have a hole', () => {
 *     expect(polygon2).not.toBePolygonWithHole()
 *     expect(polygon1.coordinates[1]).not.toBePolygonWithHole()
 *     expect(point).not.toBePolygonWithHole()
 * })
 */
function toBePolygonWithHole(geometryObject) {
    const { printReceived, matcherHint } = this.utils
    const passMessage =
        // eslint-disable-next-line prefer-template
        matcherHint('.not.toBePolygonWithHole', 'GeometryObject', '') +
        '\n\n' +
        `Expected input to not be a valid GeoJSON Polygon geometry with at least one hole.\n\n` +
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
            matcherHint('.toBePolygonWithHole', 'GeometryObject', '') +
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

    if (geometryObject.coordinates.length === 1) {
        return {
            pass: false,
            message: () => failMessage('Polygon has no holes, expected at least one.')
        }
    }

    return { pass: true, message: () => passMessage }
}

exports.toBePolygonWithHole = toBePolygonWithHole

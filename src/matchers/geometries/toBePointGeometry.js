const { pointGeometry } = require('../../core/geometries/pointGeometry')

// eslint-disable-next-line jsdoc/require-returns
/**
 * Verifies an object is a valid GeoJSON Point Geometry. This geometry requires a
 * 'type' property that must equal "Point", and a 'coordinates' property that contains
 * a single valid WGS-84 GeoJSON coordinate. The coordinates may be an empty array.
 *
 * Foreign members are allowed with the exception of 'geometry', 'properties', or 'features'.
 *
 * @memberof Matchers.Geometries
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/9
 * @param {object} geometryObject a GeoJSON Point Geometry object
 * @example
 * const testPoint = {
 *     type: 'Point',
 *     coordinates: [25, 10.2]
 * }
 *
 * test('Object is valid GeoJSON Point Geometry', () => {
 *     expect(testPoint).toBePointGeometry()
 * })
 * @example
 * const multiPoint = {
 *     type: 'MultiPoint',
 *     coordinates: [
 *         [25, 10.2],
 *         [120, 45]
 *     ]
 * }
 *
 * test('Object is NOT valid GeoJSON Point Geometry', () => {
 *     expect(multiPoint).not.toBePointGeometry()
 * })
 */
function toBePointGeometry(geometryObject) {
    const { printReceived, matcherHint } = this.utils
    const passMessage =
        // eslint-disable-next-line prefer-template
        matcherHint('.not.toBePointGeometry', 'GeometryObject', '') +
        '\n\n' +
        `Expected input to not be a valid GeoJSON Point geometry.\n\n` +
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
            matcherHint('.toBePointGeometry', 'GeometryObject', '') +
            '\n\n' +
            `${errorMessage}\n\n` +
            `Received:  ${printReceived(geometryObject)}`
        )
    }

    try {
        pointGeometry(geometryObject)
    } catch (err) {
        return { pass: false, message: () => failMessage(err.message) }
    }
    return { pass: true, message: () => passMessage }
}

exports.toBePointGeometry = toBePointGeometry

const { lineStringGeometry } = require('../../core/geometries/lineStringGeometry')

// eslint-disable-next-line jsdoc/require-returns
/**
 * Verifies an object is a valid GeoJSON LineString Geometry. This geometry requires a
 * 'type' property that must equal "LineString", and a 'coordinates' property that contains
 * an array of two or more valid WGS-84 GeoJSON coordinate(s). The coordinates may be an empty array,
 * but may not be an array of empty arrays.
 *
 * Foreign members are allowed with the exception of 'geometry', 'properties', or 'features'.
 *
 * @memberof Matchers.Geometries
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/11
 * @param {object} geometryObject a GeoJSON LineString Geometry object
 * @example
 * const linestring = {
 *     "type": "LineString",
 *     "coordinates": [
 *         [
 *             [180.0, 40.0], [180.0, 50.0], [170.0, 50.0],
 *             [170.0, 40.0], [180.0, 40.0]
 *         ]
 *     ]
 * }
 *
 * test('Object is valid GeoJSON LineString Object', () => {
 *     expect(linestring).toBeLineStringGeometry()
 * })
 * @example
 * const point = {
 *     type: "Point",
 *     coordinates: [100.0, 0.0]
 * }
 *
 * test('Object is NOT valid GeoJSON LineString Object', () => {
 *     expect(point).not.toBeLineStringGeometry()
 * })
 */
function toBeLineStringGeometry(geometryObject) {
    const { printReceived, matcherHint } = this.utils
    const passMessage =
        // eslint-disable-next-line prefer-template
        matcherHint('.not.toBeLineStringGeometry', 'GeometryObject', '') +
        '\n\n' +
        `Expected input to not be a valid GeoJSON LineString geometry.\n\n` +
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
            matcherHint('.toBeLineStringGeometry', 'GeometryObject', '') +
            '\n\n' +
            `${errorMessage}\n\n` +
            `Received:  ${printReceived(geometryObject)}`
        )
    }

    try {
        lineStringGeometry(geometryObject)
    } catch (err) {
        return { pass: false, message: () => failMessage(err.message) }
    }
    return { pass: true, message: () => passMessage }
}

exports.toBeLineStringGeometry = toBeLineStringGeometry

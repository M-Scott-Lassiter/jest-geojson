const { geometryCollection } = require('../../core/geometries/geometryCollection')

// eslint-disable-next-line jsdoc/require-returns
/**
 * Verifies an object is a valid GeoJSON GeometryCollection. This object requires a
 * 'type' property that must equal "GeometryCollection", and a 'geometries' property that contains
 * an array of GeoJSON Geometry objects (Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon).
 *
 * The geometries may be an empty array, but may not be an array of empty arrays or objects.
 *
 * Foreign members are allowed with the exception of 'geometry', 'properties', or 'features'.
 * If present, bounding boxes must be valid.
 *
 * @memberof Matchers.Geometries
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/16
 * @param {object} geometryObject any GeoJSON Geometry object
 * @example
 * const collection = {
 *     type: 'GeometryCollection',
 *     geometries: [{
 *         "type": 'Point',
 *         "coordinates": [100.0, 0.0]
 *     }, {
 *         type: 'LineString',
 *         coordinates: [
 *             [101.0, 0.0],
 *             [102.0, 1.0]
 *         ]
 *     }, {
 *         type: 'Polygon',
 *         coordinates: [
 *             [
 *                 [102.0, 2.0],
 *                 [103.0, 2.0],
 *                 [103.0, 3.0],
 *                 [102.0, 3.0],
 *                 [102.0, 2.0]
 *             ]
 *         ]
 *     }, {
 *         type: 'Point',
 *         coordinates: [150.0, 73.0]
 *     }]
 * }
 *
 *  test('Object is valid GeoJSON GeometryCollection Object', () => {
 *     expect(collection).toBeGeometryCollection()
 * })
 * @example
 * const lineString = {
 *     type: 'LineString',
 *     coordinates: [
 *         [101.0, 0.0],
 *         [102.0, 1.0]
 *     ]
 * }
 * test('Object is NOT valid GeoJSON GeometryCollection Object', () => {
 *     expect(collection.geometries).not.toBeGeometryCollection()
 *     expect(lineString).not.toBeGeometryCollection()
 * })
 */
function toBeGeometryCollection(geometryObject) {
    const { printReceived, matcherHint } = this.utils
    const passMessage =
        // eslint-disable-next-line prefer-template
        matcherHint('.not.toBeGeometryCollection', 'GeometryObject', '') +
        '\n\n' +
        `Expected input to not be a valid GeoJSON GeometryCollection object.\n\n` +
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
            matcherHint('.toBeGeometryCollection', 'GeometryObject', '') +
            '\n\n' +
            `${errorMessage}\n\n` +
            `Received:  ${printReceived(geometryObject)}`
        )
    }

    try {
        geometryCollection(geometryObject)
    } catch (err) {
        return { pass: false, message: () => failMessage(err.message) }
    }
    return { pass: true, message: () => passMessage }
}

exports.toBeGeometryCollection = toBeGeometryCollection

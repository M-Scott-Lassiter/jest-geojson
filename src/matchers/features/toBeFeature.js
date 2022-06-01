const { feature } = require('../../core/features/feature')

// eslint-disable-next-line jsdoc/require-returns
/**
 * Verifies an object is a valid GeoJSON Feature. This object requires a "type" member that must
 * equal 'Feature',  a "geometry" member that contains either one of the seven valid GeoJSON
 * geometry objects or an empty array, and a "properties" member that is either an object of any
 * composition or null.
 *
 * Foreign members are allowed with the exception of 'coordinates', 'geometries', 'properties', or 'features'.
 * If present, bounding boxes must be valid.
 *
 * @memberof Matchers.Features
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/24
 * @param {object} featureObject any GeoJSON Feature object
 * @param {string} geometryType Optional string representing one of the seven GeoJSON geometry types
 * @example
 * const testFeature = {
 *     "type": "Feature",
 *     "bbox": [-10.0, -10.0, 10.0, 10.0],
 *     "geometry": {
 *         "type": "Polygon",
 *         "coordinates": [
 *             [
 *                 [-10.0, -10.0],
 *                 [10.0, -10.0],
 *                 [10.0, 10.0],
 *                 [-10.0, -10.0]
 *             ]
 *         ]
 *     },
 *     "properties": {
 *         "prop0": "value0",
 *         "prop1": {
 *             "this": "that"
 *         }
 *     }
 * }
 *
 *  test('Object is valid GeoJSON Feature', () => {
 *     expect(testFeature).toBeFeature()
 *     expect(testFeature).toBeFeature('Polygon')
 * })
 * @example
 * const multiPoint = {
 *     type: "MultiPoint",
 *     coordinates: [
 *         [101.0, 0.0],
 *         [102.0, 1.0]
 *     ]
 * }
 *
 * test('Object is NOT valid GeoJSON Geometry Object', () => {
 *     expect(multiPoint).not.toBeFeature()
 *     expect(testFeature).not.toBeFeature('LineString')
 *     expect(testFeature.geometry).not.toBeFeature('Polygon')
 * })
 */
function toBeFeature(featureObject, geometryType) {
    const { printReceived, matcherHint } = this.utils
    const optionalTypeMessage = () => {
        if (geometryType !== undefined) {
            return ` with ${geometryType} geometry`
        }
        return ''
    }
    const passMessage =
        // eslint-disable-next-line prefer-template
        matcherHint('.not.toBeFeature', 'FeatureObject', 'GeometryType') +
        '\n\n' +
        `Expected input to not be a valid GeoJSON feature object` +
        optionalTypeMessage() +
        `.\n\n` +
        `Received:  ${printReceived(featureObject)}`

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
            matcherHint('.toBeFeature', 'FeatureObject', 'GeometryType') +
            '\n\n' +
            `${errorMessage}\n\n` +
            `Received:  ${printReceived(featureObject)}`
        )
    }

    try {
        feature(featureObject, geometryType)
    } catch (err) {
        return { pass: false, message: () => failMessage(err.message) }
    }
    return { pass: true, message: () => passMessage }
}

exports.toBeFeature = toBeFeature

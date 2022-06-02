const { featureCollection } = require('../../core/featureCollections/featureCollection')

// eslint-disable-next-line jsdoc/require-returns
/**
 * Verifies an object is a valid GeoJSON FeatureCollection. This object requires a "type" member that must
 * equal 'FeatureCollection', and a "features" member that contains either a valid GeoJSON Feature
 * or an empty array.
 *
 * Foreign members are allowed with the exception of 'coordinates', 'geometries', 'geometry', or 'properties'.
 * If present, bounding boxes must be valid.
 *
 * @memberof Matchers.FeatureCollections
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/25
 * @param {object} featureCollectionObject any GeoJSON Feature object
 * @example
 * const testFeatureCollection = {
 *     "type": "FeatureCollection",
 *     "features": [{
 *         "type": "Feature",
 *         "geometry": {
 *             "type": "Point",
 *             "coordinates": [102.0, 0.5]
 *         }
 *     },
 *     ...
 *     ]
 * }
 *  test('Object is valid GeoJSON Feature', () => {
 *     expect(testFeatureCollection).toBeFeatureCollection()
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
 *     expect(multiPoint).not.toBeFeatureCollection()
 *     expect(testFeatureCollection.features).not.toBeFeatureCollection()
 * })
 */
function toBeFeatureCollection(featureCollectionObject) {
    const { printReceived, matcherHint } = this.utils
    const passMessage =
        // eslint-disable-next-line prefer-template
        matcherHint('.not.toBeFeatureCollection', 'FeatureCollectionObject', '') +
        '\n\n' +
        `Expected input to not be a valid GeoJSON FeatureCollection object.\n\n` +
        `Received:  ${printReceived(featureCollectionObject)}`

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
            matcherHint('.toBeFeatureCollection', 'FeatureObject', 'GeometryType') +
            '\n\n' +
            `${errorMessage}\n\n` +
            `Received:  ${printReceived(featureCollectionObject)}`
        )
    }

    try {
        featureCollection(featureCollectionObject)
    } catch (err) {
        return { pass: false, message: () => failMessage(err.message) }
    }
    return { pass: true, message: () => passMessage }
}

exports.toBeFeatureCollection = toBeFeatureCollection

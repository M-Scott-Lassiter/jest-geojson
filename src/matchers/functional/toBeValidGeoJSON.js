const { validGeoJSON } = require('../../core/utilities/validGeoJSON')

// eslint-disable-next-line jsdoc/require-returns
/**
 * This tests an object to see if it meets validation criteria for any of the seven GeoJSON
 * Geometry types, Features, or FeatureCollections.
 *
 *
 * @memberof Matchers.Functional
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/26
 * @param {object} geoObject Any GeoJSON Geometry, Feature, or FeatureCollection object
 * @example
 * point = {
 *     "type": "Point",
 *     "coordinates": [100.0, 0.0]
 * }
 * lineString = {
 *     "type": "LineString",
 *     "coordinates": [
 *         [
 *             [180.0, 40.0],
 *             [180.0, 50.0],
 *             [170.0, 50.0],
 *             [170.0, 40.0],
 *             [180.0, 40.0]
 *         ]
 *     ]
 * }
 * polygon = {
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
 * feature = {
 *     "type": "Feature",
 *     "geometry": {
 *         "type": "Point",
 *         "coordinates": [102.0, 0.5]
 *     }
 * }
 * geometryCollection = {
 *     "type": "GeometryCollection",
 *     "geometries": [{
 *         "type": "Point",
 *         "coordinates": [100.0, 0.0]
 *     }, {
 *         "type": "LineString",
 *         "coordinates": [
 *             [101.0, 0.0],
 *             [102.0, 1.0]
 *         ]
 *     }, {
 *         "type": "Polygon",
 *         "coordinates": [
 *             [
 *                 [102.0, 2.0],
 *                 [103.0, 2.0],
 *                 [103.0, 3.0],
 *                 [102.0, 3.0],
 *                 [102.0, 2.0]
 *             ]
 *         ]
 *     }, {
 *         "type": "Point",
 *         "coordinates": [150.0, 73.0]
 *     }]
 * }
 *
 * test('Object is valid GeoJSON Feature', () => {
 *      expect(point).toBeValidGeoJSON()
 *      expect(lineString).toBeValidGeoJSON()
 *      expect(polygon).toBeValidGeoJSON()
 *      expect(feature).toBeValidGeoJSON()
 *      expect(feature.geometry).toBeValidGeoJSON()
 *      expect(geometryCollection).toBeValidGeoJSON()
 *      expect(geometryCollection.geometries[1]).toBeValidGeoJSON()
 * })
 * @example
 * test('Object is NOT valid GeoJSON Geometry Object', () => {
 *      expect(polygon.coordinates).not.toBeValidGeoJSON()
 *      expect(geometryCollection.geometries).toBeValidGeoJSON()
 *      expect([322, -34.549, 0]).not.toBeValidGeoJSON()
 *      expect({coordinates: [22, -34.549, 22]}).not.toBeValidGeoJSON()
 * })
 */
function toBeValidGeoJSON(geoObject) {
    const { printReceived, matcherHint } = this.utils
    const passMessage =
        // eslint-disable-next-line prefer-template
        matcherHint('.not.toBeValidGeoJSON', 'GeoJSONObject', '') +
        '\n\n' +
        `Expected input to not be a valid GeoJSON Geometry, Feature, or FeatureCollection object.\n\n` +
        `Received:  ${printReceived(geoObject)}`

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
            matcherHint('.toBeValidGeoJSON', 'GeoJSONObject', '') +
            '\n\n' +
            `${errorMessage}\n\n` +
            `Received:  ${printReceived(geoObject)}`
        )
    }

    try {
        validGeoJSON(geoObject)
    } catch (err) {
        return { pass: false, message: () => failMessage(err.message) }
    }
    return { pass: true, message: () => passMessage }
}

exports.toBeValidGeoJSON = toBeValidGeoJSON

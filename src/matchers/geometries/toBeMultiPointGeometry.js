const { multiPointGeometry } = require('../../core/geometries/multiPointGeometry')

// eslint-disable-next-line jsdoc/require-returns
/**
 * Verifies an object is a valid GeoJSON MultiPoint Geometry. This geometry requires a
 * 'type' property that must equal "MultiPoint", and a 'coordinates' property that contains
 * an array of valid WGS-84 GeoJSON coordinate(s). The coordinates may be an empty array.
 *
 * Foreign members are allowed with the exception of 'geometry', 'properties', or 'features'.
 *
 * @memberof Matchers.Geometries
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/10
 * @param {object} geometryObject a GeoJSON MultiPoint Geometry object
 * @example
 *  const point1 = {
    type: "Point",
    coordinates: [100.0, 0.0]
    }
    const point2 = {
        type: "Point",
        coordinates: [100.0, 0.0, 2000]
    }
    const point3 = {
        type: "LineString",
        coordinates: [
            [101.0, 0.0],
            [102.0, 1.0]
        ]
    }
 
    expect(point1).toBePointGeometry()
    expect(point2).toBePointGeometry()
 
    expect(point3).not.toBePointGeometry()
    expect([22, -34.549, 22]).not.toBePointGeometry()
    expect({coordinates: [100.0, 0.0]}).not.toBePointGeometry()
 */
function toBeMultiPointGeometry(geometryObject) {
    const { printReceived, matcherHint } = this.utils
    const passMessage =
        // eslint-disable-next-line prefer-template
        matcherHint('.not.toBeMultiPointGeometry', 'GeometryObject', '') +
        '\n\n' +
        `Expected input to not be a valid GeoJSON MultiPoint geometry.\n\n` +
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
            matcherHint('.toBeMultiPointGeometry', 'GeometryObject', '') +
            '\n\n' +
            `${errorMessage}\n\n` +
            `Received:  ${printReceived(geometryObject)}`
        )
    }

    try {
        multiPointGeometry(geometryObject)
    } catch (err) {
        return { pass: false, message: () => failMessage(err.message) }
    }
    return { pass: true, message: () => passMessage }
}

exports.toBeMultiPointGeometry = toBeMultiPointGeometry

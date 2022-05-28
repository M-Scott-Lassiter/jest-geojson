const { multiLineStringGeometry } = require('../../core/geometries/multiLineStringGeometry')

// eslint-disable-next-line jsdoc/require-returns
/**
 * Verifies an object is a valid GeoJSON MultiLineString Geometry. This geometry requires a
 * 'type' property that must equal "MultiLineString", and a 'coordinates' property that contains
 * an array of linestring arrays (i.e. each linestring array containing at least two or more valid
 * WGS-84 GeoJSON coordinates). 
 * 
 * The coordinates may be an empty array, but may not be an array of empty arrays.
 *
 * Foreign members are allowed with the exception of 'geometry', 'properties', or 'features'.
 *
 * @memberof Matchers.Geometries
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/12
 * @param {object} geometryObject a GeoJSON MultiLineString Geometry object
 * @example
    const multiLineString = {
        "type": "MultiLineString",
        "coordinates": [
            [
                [100.0, 0.0],
                [101.0, 1.0]
            ],
            [
                [102.0, 2.0],
                [103.0, 3.0]
            ]
        ]
    }
    const multiLineStringOneCoordinate = {
        "type": "MultiLineString",
        "coordinates": [
            [
                [100.0, 0.0]
            ]
        ]
    }
    const point = {
        type: "Point",
        coordinates: [100.0, 0.0]
    }
 
    expect(multiLineString).toBeMultiLineStringGeometry()
 
    expect(point).not.toBeMultiLineStringGeometry()
    expect(multiLineStringOneCoordinate).not.toBeMultiLineStringGeometry()
 */
function toBeMultiLineStringGeometry(geometryObject) {
    const { printReceived, matcherHint } = this.utils
    const passMessage =
        // eslint-disable-next-line prefer-template
        matcherHint('.not.toBeMultiLineStringGeometry', 'GeometryObject', '') +
        '\n\n' +
        `Expected input to not be a valid GeoJSON MultiLineString geometry.\n\n` +
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
            matcherHint('.toBeMultiLineStringGeometry', 'GeometryObject', '') +
            '\n\n' +
            `${errorMessage}\n\n` +
            `Received:  ${printReceived(geometryObject)}`
        )
    }

    try {
        multiLineStringGeometry(geometryObject)
    } catch (err) {
        return { pass: false, message: () => failMessage(err.message) }
    }
    return { pass: true, message: () => passMessage }
}

exports.toBeMultiLineStringGeometry = toBeMultiLineStringGeometry

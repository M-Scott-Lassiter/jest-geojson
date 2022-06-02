const { valid2DCoordinate } = require('../../core/coordinates/valid2DCoordinate')

// eslint-disable-next-line jsdoc/require-returns
/**
 * Verifies a two element coordinate meets WGS-84 and GeoJSON validity requirements.
 *
 * @memberof Matchers.Coordinates
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/1
 * @param {number[]} coordinateArray A two element array of numbers in format [longitude, latitude].
 * Longitude must be between -180 to 180.
 * Latitude must be between -90 to 90.
 * @example
 * test('Object is valid GeoJSON', () => {
 *      expect([22, 45.733]).isValid2DCoordinate()
 *      expect([180, 90]).isValid2DCoordinate()
 *  })
 * @example
 * test('Object is NOT valid GeoJSON', () => {
 *      expect([22, 100.56]).not.isValid2DCoordinate() // Latitude out of range
 *      expect([22, 45.733, 0]).not.isValid2DCoordinate() //3D coordinate
 *      // Nested Arrays
 *      expect([[22, 45.733, 0]]).not.isValid2DCoordinate()
 *      expect([[22, 45.733], [180, 90]]).not.isValid2DCoordinate()
 *  })
 */
function isValid2DCoordinate(coordinateArray) {
    const { printReceived, matcherHint } = this.utils
    const passMessage =
        // eslint-disable-next-line prefer-template
        matcherHint('.not.isValid2DCoordinate', '[longitude, latitude]', '') +
        '\n\n' +
        `Expected input to not be a two element array with longitude between (-90 to 90),
        and latitude between (-180 to 180).\n\n` +
        `Received:  ${printReceived(coordinateArray)}`

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
            matcherHint('.isValid2DCoordinate', '[longitude, latitude]', '') +
            '\n\n' +
            `${errorMessage}\n\n` +
            `Received:  ${printReceived(coordinateArray)}`
        )
    }

    try {
        valid2DCoordinate(coordinateArray)
    } catch (err) {
        return { pass: false, message: () => failMessage(err.message) }
    }
    return { pass: true, message: () => passMessage }
}

exports.isValid2DCoordinate = isValid2DCoordinate

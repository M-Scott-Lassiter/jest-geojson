const { valid3DCoordinate } = require('../../core/coordinates/valid3DCoordinate')

// eslint-disable-next-line jsdoc/require-returns
/**
 * Verifies a three element coordinate meets WGS-84 and GeoJSON validity requirements.
 *
 * @memberof Matchers.Coordinates
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/2
 * @param {number[]} coordinateArray A three element array of numbers in format [longitude, latitude, altitude].
 * Longitude must be between -180 to 180.
 * Latitude must be between -90 to 90.
 * Altitude must be a number between -Infinity to Infinity.
 * The standard does not specify units altitude represents (i.e. meters, feet, etc.).
 * @example
 * test('Object is valid GeoJSON', () => {
 *      expect([22, 45.733, 20]).isValid3DCoordinate()
 *      expect([180, 90, -10000]).isValid3DCoordinate()
 *  })
 * @example
 * test('Object is NOT valid GeoJSON', () => {
 *      expect([22, 100.56, 0]).not.isValid3DCoordinate() // Latitude out of range
 *      expect([22, 45.733]).isValid3DCoordinate() // 2D coordinate
 *      expect([22, 45.733, '0']).not.isValid3DCoordinate() // Non-numeric altitude
 *      // Nested Arrays
 *      expect([[22, 45.733, 0]]).not.isValid3DCoordinate()
 *      expect([[22, 45.733, 0], [180, 90, 0]]).not.isValid3DCoordinate()
 *  })
 */
function isValid3DCoordinate(coordinateArray) {
    const { printReceived, matcherHint } = this.utils
    const passMessage =
        // eslint-disable-next-line prefer-template
        matcherHint('.not.isValid3DCoordinate', '[longitude, latitude, altitude]', '') +
        '\n\n' +
        `Expected input to not be a three element array with longitude between (-90 to 90), 
        latitude between (-180 to 180), and numeric altitude.\n\n` +
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
            matcherHint('.isValid3DCoordinate', '[longitude, latitude, altitude]', '') +
            '\n\n' +
            `${errorMessage}\n\n` +
            `Received:  ${printReceived(coordinateArray)}`
        )
    }

    try {
        valid3DCoordinate(coordinateArray)
    } catch (err) {
        return { pass: false, message: () => failMessage(err.message) }
    }
    return { pass: true, message: () => passMessage }
}

exports.isValid3DCoordinate = isValid3DCoordinate

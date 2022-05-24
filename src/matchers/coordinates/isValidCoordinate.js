const { validCoordinate } = require('../../core/coordinates/validCoordinate')

// eslint-disable-next-line jsdoc/require-returns
/**
 * Verifies a two or three element coordinate meets WGS-84 and GeoJSON validity requirements.
 *
 * @memberof Coordinates
 * @param {number[]} coordinateArray A two or three element array of numbers in format
 * [longitude, latitude] or [longitude, latitude, altitude].
 *
 * Longitude must be between -180 to 180.
 * Latitude must be between -90 to 90.
 * Altitude must be a number between -Infinity to Infinity.
 * The standard does not specify units altitude represents (i.e. meters, feet, etc.).
 * @example
 * expect([22, 45.733]).isValidCoordinate()
 * expect([180, 90]).isValidCoordinate()
 * expect([22, 45.733, 20]).isValidCoordinate()
 * expect([180, 90, -10000]).isValidCoordinate()
 * @example
 * expect([220, 56]).not.isValidCoordinate() // Longitude out of range
 * expect([22, 45.733, '0']).not.isValidCoordinate()
 * // Nested Arrays
 * expect([[22, 45.733, 0]]).not.isValidCoordinate()
 * expect([[22, 45.733, 0], [180, 90, 0]]).not.isValidCoordinate()
 */
function isValidCoordinate(coordinateArray) {
    const { printReceived, matcherHint } = this.utils
    const passMessage =
        // eslint-disable-next-line prefer-template
        matcherHint('.not.isValidCoordinate', '[longitude, latitude, (altitude)]', '') +
        '\n\n' +
        `Expected input to not be a two or three element array with longitude between (-90 to 90), 
        latitude between (-180 to 180), and (if a 3D coordinate) numeric altitude.\n\n` +
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
            matcherHint('.isValidCoordinate', '[longitude, latitude, (altitude)]', '') +
            '\n\n' +
            `${errorMessage}\n\n` +
            `Received:  ${printReceived(coordinateArray)}`
        )
    }

    try {
        validCoordinate(coordinateArray)
    } catch (err) {
        return { pass: false, message: () => failMessage(err.message) }
    }
    return { pass: true, message: () => passMessage }
}

exports.isValidCoordinate = isValidCoordinate

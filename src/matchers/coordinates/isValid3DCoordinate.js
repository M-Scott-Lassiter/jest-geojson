const { valid2D } = require('./isValid2DCoordinate')
/**
 * A helper function used to verify a coordinate has appropriate longitude, latitude, and altitude values.
 *
 * @memberof Core.Coordinates
 * @param {GeoJSON-Coordinate} coordinate A WGS-84 array of [longitude, latitude, alititude]
 * @returns {boolean} True if a valid 3D GeoJSON coordinate. If invalid, it will throw an error.
 * @throws {Error} Input must be an array of only three elments
 * @throws {Error} Altitude value must be numeric
 */
function valid3D(coordinate) {
    if (!Array.isArray(coordinate) || coordinate.length !== 3) {
        throw new Error('Input must be an array of only three elments.')
    }

    // The first two elements have to match the same validity requirements as a 2D coordinate.
    // Reuse the logic from that function.
    valid2D([coordinate[0], coordinate[1]])

    // eslint-disable-next-line no-self-compare
    if (typeof coordinate[2] !== 'number' || coordinate[2] !== coordinate[2]) {
        // Self compare accounts for NaN
        throw new Error('Altitude value must be numeric.')
    }

    return true
}

// eslint-disable-next-line jsdoc/require-returns
/**
 * Verifies a three element coordinate meets WGS-84 and GeoJSON validity requirements.
 *
 * @memberof Coordinates
 * @param {number[]} coordinateArray A three element array of numbers in format [longitude, latitude, altitude].
 *
 * Longitude must be between -180 to 180.
 * Latitude must be between -90 to 90.
 * Altitude must be a number between -Infinity to Infinity.
 * The standard does not specify units altitude represents (i.e. meters, feet, etc.).
 * @example
 * expect([22, 45.733, 20]).isValid3DCoordinate()
 * expect([180, 90, -10000]).isValid3DCoordinate()
 * @example
 * expect([22, 100.56]).not.isValid3DCoordinate()
 * expect([22, 45.733, '0']).not.isValid3DCoordinate()
 * expect([[22, 45.733, 0]]).not.isValid3DCoordinate()
 * expect([[22, 45.733, 0], [180, 90, 0]]).not.isValid3DCoordinate()
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
        valid3D(coordinateArray)
    } catch (err) {
        return { pass: false, message: () => failMessage(err.message) }
    }
    return { pass: true, message: () => passMessage }
}

exports.valid3D = valid3D
exports.isValid3DCoordinate = isValid3DCoordinate

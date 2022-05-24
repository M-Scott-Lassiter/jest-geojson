/**
 * A helper function used to verify a coordinate has appropriate longitude and latitude values.
 *
 * @memberof Core.Coordinates
 * @param {GeoJSON-Coordinate} coordinate A WGS-84 array of [longitude, latitude]
 * @returns {boolean} True if a valid 2D GeoJSON coordinate. If invalid, it will throw an error.
 * @throws {Error} Input must be an array of only two elments
 * @throws {RangeError} Longitude must be a number between -180 and 180
 * @throws {RangeError} Latitude must be a number between -90 and 90
 */
function valid2D(coordinate) {
    if (!Array.isArray(coordinate) || coordinate.length !== 2) {
        throw new Error('Input must be an array of only two elments.')
    }

    if (
        typeof coordinate[0] !== 'number' ||
        coordinate[0] < -180 ||
        coordinate[0] > 180 ||
        // eslint-disable-next-line no-self-compare
        coordinate[0] !== coordinate[0] // Accounts for NaN
    ) {
        throw new Error('Longitude must be a number between -180 and 180.')
    }

    if (
        typeof coordinate[1] !== 'number' ||
        coordinate[1] < -90 ||
        coordinate[1] > 90 ||
        // eslint-disable-next-line no-self-compare
        coordinate[1] !== coordinate[1] // Accounts for NaN
    ) {
        throw new Error('Latitude must be a number between -90 and 90.')
    }

    return true
}

// eslint-disable-next-line jsdoc/require-returns
/**
 * Verifies a two element coordinate meets WGS-84 and GeoJSON validity requirements.
 *
 * @memberof Coordinates
 * @param {number[]} coordinateArray A two element array of numbers in format [longitude, latitude].
 * Longitude must be between -180 to 180.
 * Latitude must be between -90 to 90.
 * @example
 * expect([22, 45.733]).isValid2DCoordinate()
 * expect([180, 90]).isValid2DCoordinate()
 * @example
 * expect([22, 100.56]).not.isValid2DCoordinate()
 * expect([22, 45.733, 0]).not.isValid2DCoordinate()
 * expect([[22, 45.733, 0]]).not.isValid2DCoordinate()
 * expect([[22, 45.733], [180, 90]]).not.isValid2DCoordinate()
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
        valid2D(coordinateArray)
    } catch (err) {
        return { pass: false, message: () => failMessage(err.message) }
    }
    return { pass: true, message: () => passMessage }
}

exports.valid2D = valid2D
exports.isValid2DCoordinate = isValid2DCoordinate

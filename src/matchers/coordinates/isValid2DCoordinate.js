/**
 * A helper function used to verify a coordinate has appropriate longitude and latitude values.
 *
 * @memberof Helpers
 * @private
 * @ignore
 * @param {GeoJSON-Coordinate} coordinate A WGS-84 array of [longitude, latitude]
 * @returns {boolean} True if a valid 2D GeoJSON coordinate, false otherwise
 */
function valid2D(coordinate) {
    if (!Array.isArray(coordinate) || coordinate.length !== 2) {
        return false
    }

    if (typeof coordinate[0] !== 'number' || typeof coordinate[1] !== 'number') {
        return false
    }

    // eslint-disable-next-line no-self-compare
    if (coordinate[0] !== coordinate[0] || coordinate[1] !== coordinate[1]) {
        // Accounts for NaN
        return false
    }

    if (coordinate[0] < -180 || coordinate[0] > 180 || coordinate[1] < -90 || coordinate[1] > 90) {
        return false
    }
    return true
}

/**
 * Verifies a two element coordinate meets WGS-84 and GeoJSON validity requirements.
 *
 * @memberof Coordinates
 * @param {number[]} coordinateArray A two element array of numbers in format [longitude, latitude].
 * Longitude must be between -180 to 180.
 * Latitude must be between -90 to 90.
 * @returns {JestMatchingObject} Test passed or failed
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
        `Expected input to not be a two element array with longitude between (-90 to 90) and latitude between (-180 to 180).\n\n` +
        `Received:  ${printReceived(coordinateArray)}`

    const failMessage =
        // eslint-disable-next-line prefer-template
        matcherHint('.isValid2DCoordinate', '[longitude, latitude]', '') +
        '\n\n' +
        `Expected a two element array with longitude between (-90 to 90) and latitude between (-180 to 180).\n\n` +
        `Received:  ${printReceived(coordinateArray)}`

    if (valid2D(coordinateArray)) {
        return { pass: true, message: () => passMessage }
    }
    return { pass: false, message: () => failMessage }
}

exports.valid2D = valid2D
exports.isValid2DCoordinate = isValid2DCoordinate

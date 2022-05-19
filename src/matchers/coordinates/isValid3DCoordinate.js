const { valid2D } = require('./isValid2DCoordinate')
/**
 * A helper function used to verify a coordinate has appropriate longitude, latitude, and altitude values.
 *
 * @memberof Helpers
 * @private
 * @ignore
 * @param {GeoJSON-Coordinate} coordinate A WGS-84 array of [longitude, latitude, alititude]
 * @returns {boolean} True if a valid 3D GeoJSON coordinate, false otherwise
 */
function valid3D(coordinate) {
    if (!Array.isArray(coordinate) || coordinate.length !== 3) {
        return false
    }

    // The first two elements have to match the same validity requirements as a 2D coordinate.
    // Reuse the logic from that function.
    if (!valid2D([coordinate[0], coordinate[1]])) {
        return false
    }

    if (typeof coordinate[2] !== 'number') {
        return false
    }

    // eslint-disable-next-line no-self-compare
    if (coordinate[2] !== coordinate[2]) {
        // Accounts for NaN
        return false
    }
    return true
}

/**
 * Verifies a three element coordinate meets WGS-84 and GeoJSON validity requirements.
 *
 * @memberof Coordinates
 * @param {number[]} coordinateArray A three element array of numbers in format [longitude, latitude, altitude].
 *
 * Longitude must be between -180 to 180.
 * Latitude must be between -90 to 90.
 * Altitude must be a number between -Infinity to Infinity. The standard does not specify units it represents (i.e. meters, feet, etc.).
 * @returns {JestMatchingObject} Test passed or failed
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
        matcherHint('.not.isValid3DCoordinate', '[longitude, latitude]', '') +
        '\n\n' +
        `Expected input to not be a three element array with longitude between (-90 to 90) and latitude between (-180 to 180) and numeric altitude.\n\n` +
        `Received:  ${printReceived(coordinateArray)}`

    const failMessage =
        // eslint-disable-next-line prefer-template
        matcherHint('.isValid3DCoordinate', '[longitude, latitude]', '') +
        '\n\n' +
        `Expected a three element array with longitude between (-90 to 90) and latitude between (-180 to 180) and numeric altitude.\n\n` +
        `Received:  ${printReceived(coordinateArray)}`

    if (valid3D(coordinateArray)) {
        return { pass: true, message: () => passMessage }
    }
    return { pass: false, message: () => failMessage }
}

exports.valid3D = valid3D
exports.isValid3DCoordinate = isValid3DCoordinate

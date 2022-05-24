const { valid2DCoordinate } = require('./valid2DCoordinate')

/**
 * A helper function used to verify a coordinate has appropriate longitude, latitude, and altitude values.
 *
 * @memberof Core.Coordinates
 * @param {GeoJSON-Coordinate} coordinate A WGS-84 array of [longitude, latitude, alititude]
 * @returns {boolean} True if a valid 3D GeoJSON coordinate. If invalid, it will throw an error.
 * @throws {Error} Input must be an array of only three elments
 * @throws {Error} Altitude value must be numeric
 */
function valid3DCoordinate(coordinate) {
    if (!Array.isArray(coordinate) || coordinate.length !== 3) {
        throw new Error('Input must be an array of only three elments.')
    }

    // The first two elements have to match the same validity requirements as a 2D coordinate.
    // Reuse the logic from that function.
    valid2DCoordinate([coordinate[0], coordinate[1]])

    // eslint-disable-next-line no-self-compare
    if (typeof coordinate[2] !== 'number' || coordinate[2] !== coordinate[2]) {
        // Self compare accounts for NaN
        throw new Error('Altitude value must be numeric.')
    }

    return true
}

exports.valid3DCoordinate = valid3DCoordinate

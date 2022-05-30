const { valid2DCoordinate } = require('./valid2DCoordinate')

/**
 * Verifies a three element coordinate meets WGS-84 and GeoJSON validity requirements.
 *
 * @memberof Core.Coordinates
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/2
 * @param {number[]} coordinate A WGS-84 array of [longitude, latitude, alititude]
 * @returns {boolean} True if a valid 3D GeoJSON coordinate. If invalid, it will throw an error.
 * @throws {Error} Input must be an array of only three elments
 * @throws {Error} Altitude value must be numeric
 * @example
 * const goodCoord = valid3DCoordinate([10, 20, 0]) // true
 *
 * const badExample1 = valid3DBoundingBox([10, -200, 0]) // throws error for latitude being out of range
 * const badExample2 = valid3DBoundingBox([10, 20, '0']) // throws error for altitude being a string instead of number
 * const badExample3 = valid3DBoundingBox([10, 0]) // throws error for 2D Coordinate
 */
function valid3DCoordinate(coordinate) {
    if (!Array.isArray(coordinate) || coordinate.length !== 3) {
        throw new Error('Coordinate must be an array of only three elments.')
    }

    // The first two elements have to match the same validity requirements as a 2D coordinate.
    // Reuse the logic from that function.
    valid2DCoordinate([coordinate[0], coordinate[1]])

    // eslint-disable-next-line no-self-compare
    if (typeof coordinate[2] !== 'number' || coordinate[2] !== coordinate[2]) {
        // Self compare accounts for NaN
        throw new Error('Coordinate altitude value must be numeric.')
    }

    return true
}

exports.valid3DCoordinate = valid3DCoordinate

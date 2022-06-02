const { valid2DCoordinate } = require('./valid2DCoordinate')
const { valid3DCoordinate } = require('./valid3DCoordinate')

/**
 * Verifies a two or three element coordinate meets WGS-84 and GeoJSON validity requirements.
 *
 * @memberof Core.Coordinates
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/4
 * @param {number[]} coordinate A WGS-84 array of [longitude, latitude] or [longitude, latitude, alititude]
 * @returns {boolean} True if a valid 2D or 3D GeoJSON coordinate. If invalid, it will throw an error.
 * @throws {Error} Input must be an array of only two or three elments
 * @example
 * const goodCoord1 = validCoordinate([10, 20]) // true
 * const goodCoord2 = validCoordinate([10, 20, 0]) // true
 *
 * const badExample1 = validCoordinate([10, -200]) // throws error for latitude being out of range
 * const badExample2 = validCoordinate([10, 20, '0']) // throws error for altitude being a string instead of number
 */
function validCoordinate(coordinate) {
    if (!Array.isArray(coordinate) || coordinate.length < 2 || coordinate.length > 3) {
        throw new Error('Coordinate must be an array of either two or three elments.')
    }

    if (coordinate.length === 2) {
        valid2DCoordinate(coordinate)
    }

    if (coordinate.length === 3) {
        valid3DCoordinate(coordinate)
    }

    return true
}

exports.validCoordinate = validCoordinate

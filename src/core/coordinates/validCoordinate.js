const { valid2DCoordinate } = require('./valid2DCoordinate')
const { valid3DCoordinate } = require('./valid3DCoordinate')

/**
 * A helper function used to verify a coordinate has appropriate longitude, latitude, and altitude values.
 *
 * @memberof Core.Coordinates
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/4
 * @param {GeoJSON2DCoordinate|GeoJSON3DCoordinate} coordinate A WGS-84 array of [longitude, latitude] or [longitude, latitude, alititude]
 * @returns {boolean} True if a valid 3D GeoJSON coordinate. If invalid, it will throw an error.
//  * @throws {Error} Input must be an array of only three elments
//  * @throws {Error} Altitude value must be numeric
 */
function validCoordinate(coordinate) {
    if (!Array.isArray(coordinate) || coordinate.length < 2 || coordinate.length > 3) {
        throw new Error('Input must be an array of either two or three elments.')
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

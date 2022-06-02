/**
 * Verifies a two element coordinate meets WGS-84 and GeoJSON validity requirements.
 *
 * @memberof Core.Coordinates
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/1
 * @param {number[]} coordinate A WGS-84 array of [longitude, latitude]
 * @returns {boolean} True if a valid 2D GeoJSON coordinate. If invalid, it will throw an error.
 * @throws {Error} Input must be an array of only two elments
 * @throws {RangeError} Longitude must be a number between -180 and 180
 * @throws {RangeError} Latitude must be a number between -90 and 90
 * @example
 * const goodCoord = valid2DCoordinate([10, 20]) // true
 *
 * const badExample1 = valid2DBoundingBox([10, -200]) // throws error for latitude being out of range
 * const badExample2 = valid2DBoundingBox([10, 20, 0]) // throws error for 3D Coordinate
 */
function valid2DCoordinate(coordinate) {
    if (!Array.isArray(coordinate) || coordinate.length !== 2) {
        throw new Error('Coordinate must be an array of only two elments.')
    }

    if (
        typeof coordinate[0] !== 'number' ||
        coordinate[0] < -180 ||
        coordinate[0] > 180 ||
        // eslint-disable-next-line no-self-compare
        coordinate[0] !== coordinate[0] // Accounts for NaN
    ) {
        throw new Error('Coordinate longitude must be a number between -180 and 180.')
    }

    if (
        typeof coordinate[1] !== 'number' ||
        coordinate[1] < -90 ||
        coordinate[1] > 90 ||
        // eslint-disable-next-line no-self-compare
        coordinate[1] !== coordinate[1] // Accounts for NaN
    ) {
        throw new Error('Coordinate latitude must be a number between -90 and 90.')
    }

    return true
}

exports.valid2DCoordinate = valid2DCoordinate

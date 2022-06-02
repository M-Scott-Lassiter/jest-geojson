const { valid2DBoundingBox } = require('./valid2DBoundingBox')
const { valid3DBoundingBox } = require('./valid3DBoundingBox')

/**
 * Verifies either a two or three dimensional bounding box meets WGS-84 and GeoJSON validity requirements.
 *
 * @memberof Core.BoundingBoxes
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/8
 * @param {number[]} bboxArray A WGS-84 array of [west, south, east, north] or [west, south, depth, east, north, altitude].
 *
 * Longitude must be between -180 to 180.
 * Latitude must be between -90 to 90.
 * If present, depth and altitude must be a number between -Infinity to Infinity.
 * The standard does not specify units altitude represents (i.e. meters, feet, etc.).
 * @returns {boolean} True if a valid 2D or 3D GeoJSON bounding box. If invalid, it will throw an error.
 * @throws {Error} Input must be an array of only four or six elments
 * @example
 * const good2DBBox = validBoundingBox([-10, -20, 20, -10]) // true
 * const good3DBBox = validBoundingBox([-10, -20, -100, 20, 10, 0]) // true
 *
 * const badExample1 = validBoundingBox([-10, -91, 10, 20]) // throws error for south being out of range
 * const badExample2 = validBoundingBox([-10, -10, "0", 10, 20, 0]) // throws error for non-numeric value
 */
function validBoundingBox(bboxArray) {
    if (!Array.isArray(bboxArray)) {
        throw new Error('Bounding box must be an array.')
    }

    if (!(bboxArray.length === 4 || bboxArray.length === 6)) {
        throw new Error('Bounding box must be an array of either four or six elments.')
    }

    if (bboxArray.length === 4) {
        valid2DBoundingBox(bboxArray)
    }

    if (bboxArray.length === 6) {
        valid3DBoundingBox(bboxArray)
    }

    return true
}

exports.validBoundingBox = validBoundingBox

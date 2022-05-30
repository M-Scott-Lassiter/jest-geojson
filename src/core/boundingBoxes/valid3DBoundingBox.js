const { valid2DBoundingBox } = require('./valid2DBoundingBox')
/**
 * Verifies a three dimensional bounding box meets WGS-84 and GeoJSON validity requirements.
 *
 * @memberof Core.BoundingBoxes
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/7
 * @param {number[]} bboxArray A six element WGS-84 array of numbers in format [west, south, depth, east, north, altitude].
 * @returns {boolean} True if a valid 3D GeoJSON coordinate. If invalid, it will throw an error.
 * @throws {Error} Input must be an array of only four elements of type number
 * @throws {Error} Depth and altitude must be numeric.
 * @throws {RangeError} Longitude must be a number between -180 and 180
 * @throws {RangeError} Latitude must be a number between -90 and 90
 * @throws {RangeError} North must be greater than or equal to south
 * @throws {RangeError} Altitude must be greater than or equal to depth
 * @example
 * const goodBBox = valid3DBoundingBox([-10, -20, -100, 20, 10, 0]) // true
 * const crossesAntimeridian = valid3DBoundingBox([170, -20, -22.5, 20, -170, 12345.678]) // true
 *
 * const badExample1 = valid3DBoundingBox([-10, -91, 0, 10, 20, 0]) // throws error for south being out of range
 * const badExample2 = valid3DBoundingBox([-10, -10, "0", 10, 20, 0]) // throws error for non-numeric value
 */
function valid3DBoundingBox(bboxArray) {
    if (!Array.isArray(bboxArray) || bboxArray.length !== 6) {
        throw new Error('Bounding box must be an array of only six elments.')
    }

    // Reuse functionality from 2D bounding box. The lat/lon values must satisfy the same criteria
    valid2DBoundingBox([bboxArray[0], bboxArray[1], bboxArray[3], bboxArray[4]])

    if (
        typeof bboxArray[2] !== 'number' ||
        typeof bboxArray[5] !== 'number' ||
        // eslint-disable-next-line no-self-compare
        bboxArray[2] !== bboxArray[2] || // Accounts for NaN
        // eslint-disable-next-line no-self-compare
        bboxArray[5] !== bboxArray[5] // Accounts for NaN
    ) {
        throw new Error('Bounding box northern value must be a number between -90 and 90.')
    }

    if (bboxArray[5] < bboxArray[2]) {
        throw new Error('Bounding box altitude value must be greater than depth.')
    }

    return true
}

exports.valid3DBoundingBox = valid3DBoundingBox

/**
 * Verifies a two dimensional bounding box meets WGS-84 and GeoJSON validity requirements.
 *
 * @memberof Core.BoundingBoxes
 * @param {GeoJSON-bbox} bboxArray A WGS-84 array of in format [west, south, east, north].
 * @returns {boolean} True if a valid 2D GeoJSON coordinate. If invalid, it will throw an error.
 * @throws {Error} Input must be an array of only four elements of type number
 * @throws {RangeError} Longitude must be a number between -180 and 180
 * @throws {RangeError} Latitude must be a number between -90 and 90
 * @throws {RangeError} North must be greater than or equal to south
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/6
 * @example
 * const goodBBox = valid2DBoundingBox([-10, -20, 20, -10]) // true
 *
 * const crossesAntimeridian = valid2DBoundingBox([170, -20, -170, 20]) // true
 * @example
 * const badExample1 valid2DBoundingBox([-10, -200, 20, -10]) // throws error for south being out of range
 *
 * const badExample2 valid2DBoundingBox([-10, -20, '20', -10]) // throws error for non-numeric value
 */
function valid2DBoundingBox(bboxArray) {
    if (!Array.isArray(bboxArray) || bboxArray.length !== 4) {
        throw new Error('Bounding box must be an array of only four elments.')
    }

    if (
        typeof bboxArray[0] !== 'number' ||
        bboxArray[0] < -180 ||
        bboxArray[0] > 180 ||
        // eslint-disable-next-line no-self-compare
        bboxArray[0] !== bboxArray[0] // Accounts for NaN
    ) {
        throw new Error('Eastern value must be a number between -180 and 180.')
    }

    if (
        typeof bboxArray[2] !== 'number' ||
        bboxArray[2] < -180 ||
        bboxArray[2] > 180 ||
        // eslint-disable-next-line no-self-compare
        bboxArray[2] !== bboxArray[2] // Accounts for NaN
    ) {
        throw new Error('Western value must be a number between -180 and 180.')
    }

    if (
        typeof bboxArray[1] !== 'number' ||
        bboxArray[1] < -90 ||
        bboxArray[1] > 90 ||
        // eslint-disable-next-line no-self-compare
        bboxArray[1] !== bboxArray[1] // Accounts for NaN
    ) {
        throw new Error('Southern value must be a number between -90 and 90.')
    }

    if (
        typeof bboxArray[3] !== 'number' ||
        bboxArray[3] < -90 ||
        bboxArray[3] > 90 ||
        // eslint-disable-next-line no-self-compare
        bboxArray[3] !== bboxArray[3] // Accounts for NaN
    ) {
        throw new Error('Northern value must be a number between -90 and 90.')
    }

    if (bboxArray[3] < bboxArray[1]) {
        throw new Error('Northern value must be greater than southern.')
    }

    return true
}

exports.valid2DBoundingBox = valid2DBoundingBox

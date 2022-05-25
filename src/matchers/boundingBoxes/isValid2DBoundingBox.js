const { valid2DBoundingBox } = require('../../core/boundingBoxes/valid2DBoundingBox')

// eslint-disable-next-line jsdoc/require-returns
/**
 * Verifies a two dimensional bounding box meets WGS-84 and GeoJSON validity requirements.
 *
 * @memberof BoundingBoxes
 * @param {number[]} bboxArray A four element array of numbers in format [west, south, east, north].
 * Longitude must be between -180 to 180.
 * Latitude must be between -90 to 90.
 * North must be greater than or equal to south.
 * Bounding boxes that cross the antimeridian will have an eastern value less than the western value.
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/6
 * @example
 * expect([-20, 10, -10, 20]).isValid2DBoundingBox()
 * expect([170, -20, -170, 20]).isValid2DBoundingBox() // Crosses antimeridian
 * @example
 * expect([-180.01, -10, -160, 10]).not.isValid2DBoundingBox() // Longitude out of range
 * expect([-20, 10, 0, -10, 20, 0]).not.isValid2DBoundingBox() //3D bounding box
 * expect([-20, 10, -10, false]).not.isValid2DBoundingBox() // Non-numeric value
 */
function isValid2DBoundingBox(bboxArray) {
    const { printReceived, matcherHint } = this.utils
    const passMessage =
        // eslint-disable-next-line prefer-template
        matcherHint('.not.isValid2DBoundingBox', '[east, south, west, north]', '') +
        '\n\n' +
        `Expected input to not be a four element array of numbers with longitude between (-90 to 90),
        latitude between (-180 to 180), and northern boundary greater than southern boundary.\n\n` +
        `Received:  ${printReceived(bboxArray)}`

    /**
     * Combines a custom error message with built in Jest tools to provide a more descriptive error
     * meessage to the end user.
     *
     * @param {string} errorMessage Error message text to return to the user
     * @returns {string} Concatenated Jest test result string
     */
    function failMessage(errorMessage) {
        return (
            // eslint-disable-next-line prefer-template, no-unused-expressions
            matcherHint('.isValid2DBoundingBox', '[east, south, west, north]', '') +
            '\n\n' +
            `${errorMessage}\n\n` +
            `Received:  ${printReceived(bboxArray)}`
        )
    }

    try {
        valid2DBoundingBox(bboxArray)
    } catch (err) {
        return { pass: false, message: () => failMessage(err.message) }
    }
    return { pass: true, message: () => passMessage }
}

exports.isValid2DBoundingBox = isValid2DBoundingBox

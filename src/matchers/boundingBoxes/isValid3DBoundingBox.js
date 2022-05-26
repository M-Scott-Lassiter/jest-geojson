const { valid3DBoundingBox } = require('../../core/boundingBoxes/valid3DBoundingBox')

// eslint-disable-next-line jsdoc/require-returns
/**
 * Verifies a three dimensional bounding box meets WGS-84 and GeoJSON validity requirements.
 *
 * @memberof Matchers.BoundingBoxes
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/7
 * @param {number[]} bboxArray A six element WGS-84 array of numbers in format [west, south, depth, east, north, altitude].
 * Longitude must be between -180 to 180.
 * Latitude must be between -90 to 90.
 * North must be greater than or equal to south.
 * Altitude must be greater than or equal to depth.
 * Bounding boxes that cross the antimeridian will have an eastern value less than the western value.
 * @example
 * expect([-10, -20, -100, 20, 10, 0]).isValid3DBoundingBox()
 * expect([170, -20, -22.5, 20, -170, 12345.678]).isValid3DBoundingBox() // Crosses antimeridian
 * @example
 * expect([-10, -91, 0, 10, 20, 0]).not.isValid3DBoundingBox() // south out of range
 * expect([-20, 10, -10, 20]).not.isValid3DBoundingBox() //2D bounding box
 * expect([-10, -10, "0", 10, 20, 0]).not.isValid2DBoundingBox() // Non-numeric value
 */
function isValid3DBoundingBox(bboxArray) {
    const { printReceived, matcherHint } = this.utils
    const passMessage =
        // eslint-disable-next-line prefer-template
        matcherHint(
            '.not.isValid2DBoundingBox',
            '[west, south, depth, east, north, altitude]',
            ''
        ) +
        '\n\n' +
        `Expected input to not be a six element array of numbers with longitude between (-90 to 90),
        latitude between (-180 to 180), northern boundary greater than southern boundary,
        and altitude greater than depth.\n\n` +
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
            matcherHint(
                '.isValid2DBoundingBox',
                '[west, south, depth, east, north, altitude]',
                ''
            ) +
            '\n\n' +
            `${errorMessage}\n\n` +
            `Received:  ${printReceived(bboxArray)}`
        )
    }

    try {
        valid3DBoundingBox(bboxArray)
    } catch (err) {
        return { pass: false, message: () => failMessage(err.message) }
    }
    return { pass: true, message: () => passMessage }
}

exports.isValid3DBoundingBox = isValid3DBoundingBox

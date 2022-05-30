const { validBoundingBox } = require('../../core/boundingBoxes/validBoundingBox')

// eslint-disable-next-line jsdoc/require-returns
/**
 * Verifies a two or three dimensional bounding box meets WGS-84 and GeoJSON validity requirements.
 *
 * @memberof Matchers.BoundingBoxes
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/8
 * @param {number[]} coordinateArray A WGS-84 array of [west, south, east, north] or
 * [west, south, depth, east, north, altitude].
 *
 * Longitude must be between -180 to 180.
 * Latitude must be between -90 to 90.
 * If present, depth and altitude must be a number between -Infinity to Infinity.
 * The standard does not specify units altitude represents (i.e. meters, feet, etc.).
 * @example
 * test('Object is valid GeoJSON', () => {
 *      expect([220, 56]).not.isValidCoordinate() // Longitude out of range
 *      expect([22, 45.733, '0']).not.isValidCoordinate()
 *      // Nested Arrays
 *      expect([[22, 45.733, 0]]).not.isValidCoordinate()
 *      expect([[22, 45.733, 0], [180, 90, 0]]).not.isValidCoordinate()
 *      expect([-20, 10, -10, 20]).isValidBoundingBox()
 *      expect([170, -20, -170, 20]).isValidBoundingBox()
 *      expect([-10, -20, -100, 20, 10, 0]).isValidBoundingBox()
 *      expect([170, -20, -22.5, 20, -170, 12345.678]).isValidBoundingBox()
 *  })
 * @example
 * test('Object is NOT valid GeoJSON', () => {
 *      expect([-180.01, -10, -160, 10]).not.isValidBoundingBox() // Longitude out of range
 *      expect([-10, -10, "0", 10, 20, 0]).not.isValidBoundingBox() // Non-numeric value
 *  })
 */
function isValidBoundingBox(coordinateArray) {
    const { printReceived, matcherHint } = this.utils
    const passMessage =
        // eslint-disable-next-line prefer-template
        matcherHint(
            '.not.isValidBoundingBox',
            '[west, south, (depth), east, north, (altitude)]',
            ''
        ) +
        '\n\n' +
        `Expected input to not be a four or six element bounding box array.\n\n` +
        `Received:  ${printReceived(coordinateArray)}`

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
                '.isValidBoundingBox',
                '[west, south, (depth), east, north, (altitude)]',
                ''
            ) +
            '\n\n' +
            `${errorMessage}\n\n` +
            `Received:  ${printReceived(coordinateArray)}`
        )
    }

    try {
        validBoundingBox(coordinateArray)
    } catch (err) {
        return { pass: false, message: () => failMessage(err.message) }
    }
    return { pass: true, message: () => passMessage }
}

exports.isValidBoundingBox = isValidBoundingBox

const { geometryCollection } = require('../../core/geometries/geometryCollection')

// eslint-disable-next-line jsdoc/require-returns
/**
 * Verifies a valid GeoJSON GeometryCollection has a specific number of geometries.
 *
 * If omitting both `Range1` and `Range2`, it passes if at least one geometry object is contained in "geometries".
 * If only Range1 is specified, it checks that there are exactly that number of geometries.
 * If Range1 and Range2 are specified, it checks that the geometry count is between those values.
 * Decimals get truncated on both Range1 and Range2.
 *
 * Will fail if Range1 or Range2 are not numbers or less than 0, Range2 less than Range1, or Range2 is defined and Range1 is not.
 *
 * Nested GeometryCollections are only counted as a single geometry object.
 *
 * @memberof Matchers.Geometries
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/48
 * @param {object} geometryObject A GeoJSON GeometryCollection object
 * @param {number} [Range1] Minimum geometry object count, or exact count if omitting Range2
 * @param {number} [Range2] Maximum geometry object count
 * @example
 * const testCollection = {
 *     "type": "GeometryCollection",
 *     "geometries": [{
 *         "type": "Point",
 *         "coordinates": [100.0, 0.0]
 *     }, {
 *         "type": "LineString",
 *         "coordinates": [
 *             [101.0, 0.0],
 *             [102.0, 1.0]
 *         ]
 *     }, {
 *         "type": "Polygon",
 *         "coordinates": [
 *             [
 *                 [102.0, 2.0],
 *                 [103.0, 2.0],
 *                 [103.0, 3.0],
 *                 [102.0, 3.0],
 *                 [102.0, 2.0]
 *             ]
 *         ]
 *     }, {
 *         "type": "Point",
 *         "coordinates": [150.0, 73.0]
 *     }]
 * }
 *
 *  test('GeometryCollection has specified geometry count', () => {
 *     expect(testCollection).toHaveGeometryCount(1, 8)
 *     expect(testCollection).toHaveGeometryCount(4)
 *     expect(testCollection).toHaveGeometryCount()
 * })
 * @example
 * const emptyCollection = {
 *     "type": "GeometryCollection",
 *     "geometries": []
 * }
 * const polygon = {
 *     type: 'Polygon',
 *     coordinates: [
 *         [
 *             [100.0, 0.0],
 *             [101.0, 0.0],
 *             [101.0, 1.0],
 *             [100.0, 1.0],
 *             [100.0, 0.0]
 *         ]
 *     ]
 * }
 *
 * test('Object is not a GeometryCollection or does not have specified geometry count', () => {
 *     expect(testCollection).not.toHaveGeometryCount(5, 15)
 *     expect(testCollection).not.toHaveGeometryCount(2, 3.99)
 *     expect(emptyCollection).not.toHaveGeometryCount()
 *     expect(polygon).not.toHaveGeometryCount(1)
 * })
 */
function toHaveGeometryCount(geometryObject, Range1, Range2) {
    const { printReceived, printExpected, matcherHint } = this.utils
    const passMessage =
        // eslint-disable-next-line prefer-template
        matcherHint('.not.toHaveGeometryCount', 'GeometryObject', 'Range1, Range2') +
        '\n\n' +
        `Expected input to not be a valid GeoJSON GeometryCollection object.\n\n` +
        `Received:  ${printReceived(geometryObject)}`

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
            matcherHint('.toHaveGeometryCount', 'GeometryObject', 'Range1, Range2') +
            '\n\n' +
            `${errorMessage}\n\n` +
            `Received:  ${printReceived(geometryObject)}`
        )
    }

    if (!(typeof Range1 === 'number' || Range1 === undefined) || Number.isNaN(Range1)) {
        return { pass: false, message: () => failMessage('Range1 must be a number.') }
    }

    if (!(typeof Range2 === 'number' || Range2 === undefined) || Number.isNaN(Range2)) {
        return { pass: false, message: () => failMessage('Range2 must be a number or undefined.') }
    }

    if (Range1 < 0) {
        return {
            pass: false,
            message: () =>
                failMessage(`Range1 must be greater than 0. Provided: ${printExpected(Range1)}`)
        }
    }

    if (Range2 < 0) {
        return {
            pass: false,
            message: () =>
                failMessage(`Range2 must be greater than 0. Provided: ${printExpected(Range2)}`)
        }
    }

    if (Range2 < Range1) {
        return {
            pass: false,
            message: () =>
                failMessage(
                    `Range2 (${printExpected(
                        Range2
                    )}) must be greater than or equal to Range1 (${printExpected(Range1)}).`
                )
        }
    }

    if (Range2 && Range1 === undefined) {
        return {
            pass: false,
            message: () => failMessage('Cannot use Range2 if Range1 is undefined.')
        }
    }

    try {
        geometryCollection(geometryObject)
    } catch (err) {
        return { pass: false, message: () => failMessage(err.message) }
    }

    // Check a range of values between Range1 and Range2
    if (Range2) {
        const min = Math.floor(Range1)
        const max = Math.floor(Range2)

        if (geometryObject.geometries.length >= min && geometryObject.geometries.length <= max) {
            return { pass: true, message: () => passMessage }
        }
        return {
            pass: false,
            message: () =>
                failMessage(
                    `Geometries has has count of ${printReceived(
                        geometryObject.geometries.length
                    )}, expected between ${printExpected(Range1)} and ${printExpected(Range2)}.`
                )
        }
    }

    // Check that there is at least one object
    if (Range1 === undefined) {
        if (geometryObject.geometries.length >= 1) {
            return { pass: true, message: () => passMessage }
        }
        return {
            pass: false,
            message: () => failMessage('Expected no objects in the "geometries" property.')
        }
    }

    // Check for an exact value
    if (geometryObject.geometries.length !== Math.floor(Range1)) {
        return {
            pass: false,
            message: () => {
                return (
                    // eslint-disable-next-line prefer-template, no-unused-expressions
                    matcherHint('.toHaveGeometryCount', 'GeometryObject', 'Range1') +
                    '\n\n' +
                    'Geometries has count of ' +
                    printReceived(geometryObject.geometries.length) +
                    ', expected ' +
                    printExpected(Range1) +
                    '.\n\n' +
                    `Received:  ${printReceived(geometryObject)}`
                )
            }
        }
    }

    return { pass: true, message: () => passMessage }
}

exports.toHaveGeometryCount = toHaveGeometryCount

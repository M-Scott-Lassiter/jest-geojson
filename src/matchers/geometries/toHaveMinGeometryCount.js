const { geometryCollection } = require('../../core/geometries/geometryCollection')

// eslint-disable-next-line jsdoc/require-returns
/**
 * Verifies a valid GeoJSON GeometryCollection has more than or equal to a specified number of geometries.
 *
 * If omitting MinCount, it passes if at least one geometry object is contained in "geometries".
 *
 * Will fail if MinCount is not a number or less than zero.
 *
 * Nested GeometryCollections are only counted as a single geometry object.
 *
 * @memberof Matchers.Geometries
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/45
 * @param {object} geometryObject A GeoJSON GeometryCollection object
 * @param {number} [MinCount] Minimum geometry object count to check for. Omit to assume 1.
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
 *  test('GeometryCollection has minimum geometry count', () => {
 *     expect(testCollection).toHaveMinGeometryCount()
 *     expect(testCollection).toHaveMinGeometryCount(4)
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
 * test('Object is not a GeometryCollection or does not have minimum geometry count', () => {
 *     expect(testCollection).not.toHaveMinGeometryCount(5)
 *     expect(emptyCollection).not.toHaveMinGeometryCount()
 *     expect(polygon).not.toHaveMinGeometryCount(1)
 * })
 */
function toHaveMinGeometryCount(geometryObject, MinCount) {
    const { printReceived, printExpected, matcherHint } = this.utils
    const countMessage = () => {
        if (MinCount) {
            return `with at least ${printExpected(MinCount)} geometry objects.`
        }
        return 'with at least 1 geometry object.'
    }
    const passMessage =
        // eslint-disable-next-line prefer-template
        matcherHint('.not.toHaveMinGeometryCount', 'GeometryObject', 'MinCount') +
        '\n\n' +
        `Expected input to not be a valid GeoJSON GeometryCollection object ` +
        countMessage() +
        `\n\nReceived:  ${printReceived(geometryObject)}`

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
            matcherHint('.toHaveMinGeometryCount', 'GeometryObject', 'MinCount') +
            '\n\n' +
            `${errorMessage}\n\n` +
            `Received:  ${printReceived(geometryObject)}`
        )
    }

    if (!(typeof MinCount === 'number' || MinCount === undefined) || Number.isNaN(MinCount)) {
        return { pass: false, message: () => failMessage('MinCount must be a number.') }
    }

    // if (!(typeof Range2 === 'number' || Range2 === undefined) || Number.isNaN(Range2)) {
    //     return { pass: false, message: () => failMessage('Range2 must be a number or undefined.') }
    // }

    if (MinCount < 0) {
        return {
            pass: false,
            message: () =>
                failMessage(`MinCount must be greater than 0. Provided: ${printExpected(MinCount)}`)
        }
    }

    try {
        geometryCollection(geometryObject)
    } catch (err) {
        return { pass: false, message: () => failMessage(err.message) }
    }

    if (MinCount === undefined) {
        if (geometryObject.geometries.length >= 1) {
            return { pass: true, message: () => passMessage }
        }
        return {
            pass: false,
            message: () => failMessage('Expected at least one object in the "geometries" property.')
        }
    }

    if (geometryObject.geometries.length < Math.floor(MinCount)) {
        return {
            pass: false,
            message: () => {
                return (
                    // eslint-disable-next-line prefer-template, no-unused-expressions
                    matcherHint('.toHaveMinGeometryCount', 'GeometryObject', 'MinCount') +
                    '\n\n' +
                    'Geometries has count of ' +
                    printReceived(geometryObject.geometries.length) +
                    ', expected at least ' +
                    printExpected(MinCount) +
                    '.\n\n' +
                    `Received:  ${printReceived(geometryObject)}`
                )
            }
        }
    }

    return { pass: true, message: () => passMessage }
}

exports.toHaveMinGeometryCount = toHaveMinGeometryCount

const { geometryCollection } = require('../../core/geometries/geometryCollection')

// eslint-disable-next-line jsdoc/require-returns
/**
 * Verifies a valid GeoJSON GeometryCollection has less than or equal to a specified number of geometries.
 *
 * If omitting MaxCount, it passes if "geometries" contains no more than one object.
 *
 * Will fail if MaxCount is not a number or less than zero.
 *
 * Nested GeometryCollections are only counted as a single geometry object.
 *
 * @memberof Matchers.Geometries
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/47
 * @param {object} geometryObject A GeoJSON GeometryCollection object
 * @param {number} [MaxCount] Maximum geometry object count to check for. Omit to assume 1.
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
 * const emptyCollection = {
 *     "type": "GeometryCollection",
 *     "geometries": []
 * }
 *
 *  test('GeometryCollection has maximum geometry count', () => {
 *     expect(testCollection).toHaveMaxGeometryCount(4)
 *     expect(testCollection).toHaveMaxGeometryCount(22)
 *     expect(emptyCollection).toHaveMaxGeometryCount()
 *     expect(emptyCollection).toHaveMaxGeometryCount(0)
 * })
 * @example
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
 * test('Object is not a GeometryCollection or does not have maximum geometry count', () => {
 *     expect(testCollection).not.toHaveMaxGeometryCount(2)
 *     expect(testCollection).not.toHaveMaxGeometryCount(3.99)
 *     expect(polygon).not.toHaveMaxGeometryCount(1)
 * })
 */
function toHaveMaxGeometryCount(geometryObject, MaxCount) {
    const { printReceived, printExpected, matcherHint } = this.utils
    const countMessage = () => {
        if (MaxCount) {
            return `with no more than ${printExpected(MaxCount)} geometry objects.`
        }
        return 'with no more than 1 geometry object.'
    }
    const passMessage =
        // eslint-disable-next-line prefer-template
        matcherHint('.not.toHaveMaxGeometryCount', 'GeometryObject', 'MaxCount') +
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
            matcherHint('.toHaveMaxGeometryCount', 'GeometryObject', 'MaxCount') +
            '\n\n' +
            `${errorMessage}\n\n` +
            `Received:  ${printReceived(geometryObject)}`
        )
    }

    if (!(typeof MaxCount === 'number' || MaxCount === undefined) || Number.isNaN(MaxCount)) {
        return { pass: false, message: () => failMessage('MaxCount must be a number.') }
    }

    if (MaxCount < 0) {
        return {
            pass: false,
            message: () =>
                failMessage(`MaxCount must be greater than 0. Provided: ${printExpected(MaxCount)}`)
        }
    }

    try {
        geometryCollection(geometryObject)
    } catch (err) {
        return { pass: false, message: () => failMessage(err.message) }
    }

    if (MaxCount === undefined) {
        if (geometryObject.geometries.length <= 1) {
            return { pass: true, message: () => passMessage }
        }
        return {
            pass: false,
            message: () =>
                failMessage('Expected no more than one object in the "geometries" property.')
        }
    }

    if (geometryObject.geometries.length > Math.floor(MaxCount)) {
        return {
            pass: false,
            message: () => {
                return (
                    // eslint-disable-next-line prefer-template, no-unused-expressions
                    matcherHint('.toHaveMaxGeometryCount', 'GeometryObject', 'MaxCount') +
                    '\n\n' +
                    'Geometries has count of ' +
                    printReceived(geometryObject.geometries.length) +
                    ', expected no more than ' +
                    printExpected(MaxCount) +
                    '.\n\n' +
                    `Received:  ${printReceived(geometryObject)}`
                )
            }
        }
    }

    return { pass: true, message: () => passMessage }
}

exports.toHaveMaxGeometryCount = toHaveMaxGeometryCount

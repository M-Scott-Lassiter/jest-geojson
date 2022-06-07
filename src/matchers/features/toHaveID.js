const { hasID } = require('../../core/features/hasID')

// eslint-disable-next-line jsdoc/require-returns
/**
 * Checks if a GeoJSON Feature has an ID. Passes if the Feature object has any ID (no argument provided), or
 * if the ID exactly matches the optional argument (single string, number, or RegExp provided), or any value
 * within an array of any combination of strings, numbers, or RegExp.
 *
 * The test fails if the object does not have an ID, or if it has an ID that does not match the searchID.
 *
 * @memberof Matchers.Features
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/36
 * @param {object} featureObject any GeoJSON Feature object
 * @param {string|number|RegExp|string[]|number[]|RegExp[]} [SearchID] Specific value or array of possible values
 * to search for.
 * @example
 * const testFeature1 = {
 *     type: 'Feature',
 *     id: 'f1',
 *     geometry: {...},
 *     properties: {...}
 * }
 *
 * test('Feature Has an ID', () => {
 *     expect(testFeature1).toHaveID()
 *     expect(testFeature1).toHaveID([])
 *     expect(testFeature1).toHaveID('f1')
 *     expect(testFeature1).toHaveID([1, 'F', 'F12', /[a-z]+[0-9]+/])
 *
 *     expect(testFeature1).not.toHaveID('f2')
 *     expect(testFeature1).not.toHaveID([1, 'F', 'F12', /SomeID/])
 * })
 * @example
 * const testFeature2 = {
 *     type: 'Feature',
 *     geometry: {...},
 *     properties: {...}
 * }
 *
 * test('Feature Does not Have an ID', () => {
 *     expect(testFeature2).not.toHaveID()
 *     expect(testFeature2).not.toHaveID(2)
 * })
 */
function toHaveID(featureObject, SearchID) {
    const { printReceived, matcherHint } = this.utils
    const optionalIDMessage = () => {
        if (SearchID !== undefined && SearchID?.length !== 0) {
            return ` of ${SearchID}`
        }
        return ''
    }
    const passMessage =
        // eslint-disable-next-line prefer-template
        matcherHint('.not.toHaveID', 'FeatureObject', 'SearchID') +
        '\n\n' +
        `Expected input to not be a valid GeoJSON Feature object with ID` +
        optionalIDMessage() +
        `.\n\n` +
        `Received:  ${printReceived(featureObject)}`

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
            matcherHint('.toHaveID', 'FeatureObject', 'SearchID') +
            '\n\n' +
            `${errorMessage}\n\n` +
            `Received:  ${printReceived(featureObject)}`
        )
    }

    let idIsPresent
    // Provide error handling in case of invalid inputs to the matcher
    try {
        idIsPresent = hasID(featureObject, SearchID)
    } catch (err) {
        return { pass: false, message: () => failMessage(err.message) }
    }

    // Input was valid, now return either pass or fail
    if (idIsPresent) {
        return { pass: true, message: () => passMessage }
    }
    return { pass: false, message: () => failMessage(`Did not find the ID ${SearchID}.`) }
}

exports.toHaveID = toHaveID

const { hasID } = require('../../core/features/hasID')

// eslint-disable-next-line jsdoc/require-returns
/**
 * Checks if a GeoJSON Feature has a string ID. Passes if the Feature object has any string ID (no argument provided), or
 * if the ID exactly matches the optional argument (single string or RegExp provided), or any value
 * within an array of any combination of strings or RegExp.
 *
 * The test fails if the object does not have an ID, or if it has an ID that does not match the SearchID.
 *
 * Passing a number type to SearchID will not pass the test, even if the ID exactly matches.
 *
 * @memberof Matchers.Features
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/37
 * @param {object} featureObject any GeoJSON Feature object
 * @param {string|RegExp|string[]|RegExp[]} [SearchID] Specific value or array of possible values
 * to search for.
 * @example
 * const testFeature = {
 *     type: 'Feature',
 *     id: 'f1',
 *     geometry: {...},
 *     properties: {...}
 * }
 *
 * test('Feature Has an ID', () => {
 *     expect(testFeature).toHaveStringID()
 *     expect(testFeature).toHaveStringID([])
 *     expect(testFeature).toHaveStringID('f1')
 *     expect(testFeature).toHaveStringID(['1', 'F', 'F12', /[a-z]+[0-9]+/])
 *
 *     expect(testFeature).not.toHaveStringID('f2')
 *     expect(testFeature).not.toHaveStringID([1, 'F', 'F12', /SomeID/])
 * })
 * @example
 * const testFeatureNoID = {
 *     type: 'Feature',
 *     geometry: {...},
 *     properties: {...}
 * }
 * const testFeatureNumID = {
 *     type: 'Feature',
 *     id: 2,
 *     geometry: {...},
 *     properties: {...}
 * }
 *
 * test('Feature Does not Have an ID', () => {
 *     expect(testFeature).not.toHaveStringID('f2')
 *     expect(testFeature).not.toHaveStringID([1, 'F', 'F12', /SomeID/])
 *
 *     expect(testFeatureNoID).not.toHaveStringID()
 *     expect(testFeatureNumID).not.toHaveStringID()
 *     expect(testFeatureNumID).not.toHaveStringID(2)
 * })
 */
function toHaveStringID(featureObject, SearchID) {
    const { printReceived, matcherHint } = this.utils
    const optionalIDMessage = () => {
        if (SearchID !== undefined && SearchID?.length !== 0) {
            return ` of ${SearchID}`
        }
        return ''
    }
    const passMessage =
        // eslint-disable-next-line prefer-template
        matcherHint('.not.toHaveStringID', 'FeatureObject', 'SearchID') +
        '\n\n' +
        `Expected input to not be a valid GeoJSON Feature object with string type ID` +
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
            matcherHint('.toHaveStringID', 'FeatureObject', 'SearchID') +
            '\n\n' +
            `${errorMessage}\n\n` +
            `Received:  ${printReceived(featureObject)}`
        )
    }

    let idIsPresent
    // Provide error handling in case of invalid inputs to the matcher
    try {
        idIsPresent = hasID(featureObject, SearchID)

        if (typeof featureObject.id === 'number') {
            throw new Error('ID is a number, expected a string.')
        }
    } catch (err) {
        return { pass: false, message: () => failMessage(err.message) }
    }

    // Input was valid, now return either pass or fail
    if (idIsPresent) {
        return { pass: true, message: () => passMessage }
    }
    return { pass: false, message: () => failMessage(`Did not find the ID ${SearchID}.`) }
}

exports.toHaveStringID = toHaveStringID

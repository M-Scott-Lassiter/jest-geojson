const { feature } = require('./feature')

/**
 * Checks if a GeoJSON Feature has an ID. Providing an optional SearchID argument will check for that exact ID
 * or array of possible ID values.
 *
 * @memberof Core.Features
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/36
 * @param {object} featureObject a GeoJSON Feature object
 * @param {string|number|RegExp|string[]|number[]|RegExp[]} [SearchID] Specific value or array of possible values
 * to search for.
 * @returns {boolean} True if the Feature object has any ID (no argument provided), or if the ID exactly matches
 * the optional argument (single string, number, or RegExp provided), or any value within an array of any
 * combination of strings, numbers, or RegExp. If the object has an ID that does not match SearchID, it returns false.
 * @throws {Error} Argument must be a GeoJSON Feature object
 * @throws {Error} Feature object must have an "id" member
 * @throws {Error} Optional SearchID must be either a number, string, RegExp, or array of any of these values
 * @example
 * const testFeature = {
 *     type: 'Feature',
 *     id: 'f1',
 *     geometry: {...},
 *     properties: {...}
 * }
 *
 * // All of these return true
 * const goodExample1 = hasID(testFeature)
 * const goodExample2 = hasID(testFeature, 'f1')
 * const goodExample3 = hasID(testFeature, [1, 'F', 'F12', /[a-z]+[0-9]+/])
 *
 * // Both of these return false
 * const badExample1 = hasID(testFeature, 'f12')
 * const badExample2 = hasID(testFeature, [1, 'F', 'F12', /SomeID/])
 * @example
 * const testFeature = {
 *     type: 'Feature',
 *     geometry: {...},
 *     properties: {...}
 * }
 *
 * const example = hasID(testFeature) // false
 */
function hasID(featureObject, SearchID) {
    feature(featureObject) // All validation handled here. Let it throw errors if needed.

    if (!('id' in featureObject)) {
        throw new Error('Feature does not have an "id" member.')
    }

    // After guard, ID exists, no SearchID provided. Pass.
    if (SearchID === undefined || (Array.isArray(SearchID) && SearchID.length === 0)) {
        return true
    }

    // Parse the SearchID into a safe array for further use
    let safeArray = []
    if (Array.isArray(SearchID)) {
        safeArray = [...SearchID]
    } else if (
        typeof SearchID === 'string' ||
        (typeof SearchID === 'number' && !Number.isNaN(SearchID))
    ) {
        safeArray = [SearchID]
    } else if (SearchID instanceof RegExp) {
        safeArray = [new RegExp(SearchID)]
    } else {
        throw new Error('SearchID must be a number, string, RegExp, or array of any of these.')
    }

    let idFound = false
    safeArray.forEach((id) => {
        if (idFound) {
            return
        }
        if (featureObject.id === id) {
            idFound = true
        }
        if (id instanceof RegExp) {
            if (featureObject.id.toString().match(id)) {
                idFound = true
            }
        }
    })

    return idFound
}

exports.hasID = hasID

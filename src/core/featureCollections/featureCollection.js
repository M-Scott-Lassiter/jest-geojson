const { validBoundingBox } = require('../boundingBoxes/validBoundingBox')
const { feature } = require('../features/feature')

/**
 * Verifies an object is a valid GeoJSON FeatureCollection. This object requires a "type" member that must
 * equal 'FeatureCollection', and a "features" member that contains either a valid GeoJSON Feature
 * or an empty array.
 *
 * Foreign members are allowed with the exceptions thrown below.
 * If present, bounding boxes must be valid.
 *
 * @memberof Core.FeatureCollections
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/25
 * @param {object} featureCollectionObject a GeoJSON LineString Geometry object
 * @returns {boolean} True if a valid GeoJSON FeatureCollection. If invalid, it will throw an error.
 * @throws {Error} Argument not an object
 * @throws {Error} Must have a type property with value 'FeatureCollection'
 * @throws {Error} Forbidden from having a property 'coordinates', 'geometries', 'geometry', or 'properties'
 * @throws {Error} Bounding box must be valid (if present)
 * @example
 * const testFeatureCollection = {
 *     "type": "FeatureCollection",
 *     "features": [{
 *         "type": "Feature",
 *         "geometry": {
 *             "type": "Point",
 *             "coordinates": [102.0, 0.5]
 *         }
 *     },
 *     ...
 *     ]
 * }
 * const multiPoint = {
 *     type: "MultiPoint",
 *     coordinates: [
 *         [101.0, 0.0],
 *         [102.0, 1.0]
 *     ]
 * }
 *
 * const goodExample1 = featureCollection(testFeatureCollection)) // true
 *
 * const badExample1 = featureCollection(multiPoint)) // throws error
 * const badExample2 = featureCollection(testFeatureCollection.features)) // throws error
 */
function featureCollection(featureCollectionObject) {
    if (typeof featureCollectionObject !== 'object') {
        throw new Error(`Argument must be a FeatureCollection object.`)
    }

    if (featureCollectionObject.type !== 'FeatureCollection') {
        throw new Error(`Must have a type property with value 'FeatureCollection'.`)
    }

    if ('coordinates' in featureCollectionObject) {
        throw new Error(
            `GeoJSON FeatureCollection objects are forbidden from having a property 'coordinates'.`
        )
    }

    if ('geometries' in featureCollectionObject) {
        throw new Error(
            `GeoJSON FeatureCollection objects are forbidden from having a property 'geometries'.`
        )
    }

    if ('geometry' in featureCollectionObject) {
        throw new Error(
            `GeoJSON FeatureCollection objects are forbidden from having a property 'geometry'.`
        )
    }

    if ('properties' in featureCollectionObject) {
        throw new Error(
            `GeoJSON FeatureCollection objects are forbidden from having a property 'properties'.`
        )
    }

    if (!('features' in featureCollectionObject)) {
        throw new Error(`GeoJSON FeatureCollection objects must have a property 'features'.`)
    }

    if (!Array.isArray(featureCollectionObject.features)) {
        throw new Error(
            `GeoJSON FeatureCollection features must be either an array of valid Feature objects or an empty array.`
        )
    }

    // if (typeof featureCollectionObject.geometry !== 'object' || Array.isArray(featureCollectionObject.geometry)) {
    //     throw new Error(`GeoJSON Feature 'geometry' must be a valid GeoJSON geometry object.`)
    // }

    if ('bbox' in featureCollectionObject) {
        validBoundingBox(featureCollectionObject.bbox)
    }

    // if ('id' in featureCollectionObject) {
    //     if (
    //         !(typeof featureCollectionObject.id === 'number' || typeof featureCollectionObject.id === 'string') ||
    //         Number.isNaN(featureCollectionObject.id)
    //     ) {
    //         throw new Error(`If present, ID must be either a number or string.`)
    //     }
    // }

    // // Guard clause; features are allowed to have null geometry. However, if the matcher explicitly calls
    // // for a particular geometry type, null isn't an option. We have to check for that.
    // if (featureCollectionObject.geometry === null && geometryType === undefined) {
    //     return true
    // }

    // // At this point, we have guaranteed there is a features array here. Validate each element with the core functions.
    featureCollectionObject.features.forEach((featureObject) => {
        feature(featureObject)
    })

    return true
}

exports.featureCollection = featureCollection

const { validCoordinate } = require('../coordinates/validCoordinate')

/**
 * Verifies an object is a valid GeoJSON MultiPoint Geometry. This geometry requires a
 * 'type' property that must equal "MultiPoint", and a 'coordinates' property that contains
 * a single coordinate or an array of valid WGS-84 GeoJSON coordinates.
 * The coordinates may be an empty array.
 *
 * Foreign members are allowed with the exceptions thrown below.
 *
 * @memberof Core.Geometries
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/10
 * @param {object} geometryObject a GeoJSON MultiPoint Geometry object
 * @returns {boolean} True if a valid GeoJSON MultiPoint Geometry. If invalid, it will throw an error.
 * @throws {Error} Argument not an object
 * @throws {Error} Must have a type property with value 'MultiPoint'
 * @throws {Error} forbidden from having a property 'geometry', 'properties', or 'features'
 * @example
 * const testMultiPoint1 = {
        type: "MultiPoint",
        id: null,
        coordinates: [[25, 90], [-180, 0]]
    }
 
    const testMultiPoint2 = {
        type: "Point",
        coordinates: [25, 90]
    }
 
    console.log(multiPointGeometry(testMultiPoint1)) // true
    console.log(multiPointGeometry(testMultiPoint2)) // throws error
 */
function multiPointGeometry(geometryObject) {
    if (
        typeof geometryObject !== 'object' ||
        Array.isArray(geometryObject) ||
        geometryObject === null
    ) {
        throw new Error('Argument must be a GeoJSON MultiPoint Geometry object.')
    }

    if (!('coordinates' in geometryObject)) {
        throw new Error(`GeoJSON MultiPoint Geometry must contain a 'coordinates' property.`)
    }

    if (geometryObject.type !== 'MultiPoint') {
        throw new Error(`Must have a type property with value 'MultiPoint'`)
    }

    if ('geometry' in geometryObject) {
        throw new Error(
            `GeoJSON MultiPoint Geometry objects are forbidden from having a property 'geometry'.`
        )
    }

    if ('properties' in geometryObject) {
        throw new Error(
            `GeoJSON MultiPoint Geometry objects are forbidden from having a property 'properties'.`
        )
    }

    if ('features' in geometryObject) {
        throw new Error(
            `GeoJSON MultiPoint Geometry objects are forbidden from having a property 'features'.`
        )
    }

    // Geometry objects are allowed to have empty arrays as coordinates, however validCoordinate may not.
    // If coordinates is an empty array, we're done. Otherwise, check for coordinate validity.
    if (!Array.isArray(geometryObject.coordinates) && geometryObject.coordinates.length !== 1) {
        throw new Error('Coordinates property must be an array of valid GeoJSON coordinates')
    }
    for (let i = 0; i < geometryObject.coordinates.length; i++) {
        validCoordinate(geometryObject.coordinates[i])
    }

    return true
}

exports.multiPointGeometry = multiPointGeometry

const { validBoundingBox } = require('../boundingBoxes/validBoundingBox')

/**
 * This tests an object to see if it meets common required criteria between all GeoJSON
 * geometry objects.
 *
 * @memberof Core.Utilities
 * @param {object} geometryObject A GeoJSON geometry object to test for common validity requirements
 * @returns {boolean} True if all common validations passed. Will throw a specific error if it encounters a problem.
 * @throws {Error} Argument must be a GeoJSON Geometry object.
 * @throws {Error} Must have a type property with value 'Point', 'MultiPoint', 'LineString', 'MultiLineString', 'Polygon', 'MultiPolygon', or 'GeometryCollection'.
 * @throws {Error} GeoJSON Geometry objects are forbidden from having a property 'geometry'.
 * @throws {Error} GeoJSON Geometry objects are forbidden from having a property 'properties'.
 * @throws {Error} GeoJSON Geometry objects are forbidden from having a property 'features'.
 * @throws {Error} GeoJSON Geometry objects (except GeometryCollection) must contain a 'coordinates' property.
 * @throws {Error} Coordinates property must be an array (appropriately structured by geometry type) with valid GeoJSON coordinates.
 */
function commonGeometryValidation(geometryObject) {
    if (typeof geometryObject !== 'object') {
        throw new Error('Argument must be a GeoJSON Geometry object.')
    }

    if (
        // This statement might seem redundant, but it is used for 'anyGeometry' to pass a useful error message back from the start if it cannot figure
        // out what kind of geometry it is supposed to be dealing with.
        !(
            geometryObject.type === 'Point' ||
            geometryObject.type === 'MultiPoint' ||
            geometryObject.type === 'LineString' ||
            geometryObject.type === 'MultiLineString' ||
            geometryObject.type === 'Polygon' ||
            geometryObject.type === 'MultiPolygon' ||
            geometryObject.type === 'GeometryCollection'
        )
    ) {
        throw new Error(
            `Must have a type property with value 'Point', 'MultiPoint', 'LineString', 'MultiLineString', 'Polygon', 'MultiPolygon', or 'GeometryCollection'.`
        )
    }

    if ('geometry' in geometryObject) {
        throw new Error(`GeoJSON Geometry objects are forbidden from having a property 'geometry'.`)
    }

    if ('properties' in geometryObject) {
        throw new Error(
            `GeoJSON Geometry objects are forbidden from having a property 'properties'.`
        )
    }

    if ('features' in geometryObject) {
        throw new Error(`GeoJSON Geometry objects are forbidden from having a property 'features'.`)
    }

    if ('bbox' in geometryObject) {
        validBoundingBox(geometryObject.bbox)
    }

    // Geometry objects are allowed to have empty arrays as coordinates, however validCoordinate may not.
    // If coordinates is an empty array, we're done. Otherwise, check for coordinate validity.
    if (geometryObject.type !== 'GeometryCollection') {
        if (!('coordinates' in geometryObject)) {
            throw new Error(
                `GeoJSON Geometry objects (except GeometryCollection) must contain a 'coordinates' property.`
            )
        }
        if (!Array.isArray(geometryObject.coordinates)) {
            throw new Error(
                'Coordinates property must be an array (appropriately structured by geometry type) with valid GeoJSON coordinates.'
            )
        }
    }
    return true
}

exports.commonGeometryValidation = commonGeometryValidation

const { anyGeometry } = require('../../core/geometries/anyGeometry')

// eslint-disable-next-line jsdoc/require-returns
/**
 * Verifies an object meets validity requirements for one of the six basic GeoJSON geometry types:
 * Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon
 *
 * @memberof Matchers.Geometries
 * @see https://github.com/M-Scott-Lassiter/jest-geojson/issues/15
 * @param {object} geometryObject any GeoJSON Geometry object
 * @example
point = {
    "type": "Point",
    "coordinates": [100.0, 0.0]
}
lineString = {
    "type": "LineString",
    "coordinates": [
        [
            [180.0, 40.0],
            [180.0, 50.0],
            [170.0, 50.0],
            [170.0, 40.0],
            [180.0, 40.0]
        ]
    ]
}
polygon = {
    "type": "Polygon",
    "coordinates": [
        [
            [100.0, 0.0],
            [101.0, 0.0],
            [101.0, 1.0],
            [100.0, 1.0],
            [100.0, 0.0]
        ]
    ]
}
feature = {
    "type": "Feature",
    "geometry": {
        "type": "Point",
        "coordinates": [102.0, 0.5]
    }
}
 
expect(point).toBeAnyGeometry()
expect(lineString).toBeAnyGeometry()
expect(polygon).toBeAnyGeometry()
 
expect(feature).not.toBeAnyGeometry()
expect([322, -34.549, 0]).not.toBeAnyGeometry()
expect({coordinates: [22, -34.549, 22]}).not.toBeAnyGeometry()
 */
function toBeAnyGeometry(geometryObject) {
    const { printReceived, matcherHint } = this.utils
    const passMessage =
        // eslint-disable-next-line prefer-template
        matcherHint('.not.toBeAnyGeometry', 'GeometryObject', '') +
        '\n\n' +
        `Expected input to not be a valid GeoJSON geometry object.\n\n` +
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
            matcherHint('.toBeAnyGeometry', 'GeometryObject', '') +
            '\n\n' +
            `${errorMessage}\n\n` +
            `Received:  ${printReceived(geometryObject)}`
        )
    }

    try {
        anyGeometry(geometryObject)
    } catch (err) {
        return { pass: false, message: () => failMessage(err.message) }
    }
    return { pass: true, message: () => passMessage }
}

exports.toBeAnyGeometry = toBeAnyGeometry

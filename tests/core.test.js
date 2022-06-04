// These tests do nothing but verify that the exported objects have all expected functions.

const core = require('../src/core')

describe('Bounding Box Functions Exported', () => {
    test('valid2DBoundingBox', () => {
        expect('valid2DBoundingBox' in core.boundingBoxes).toBeTruthy()
    })

    test('valid3DBoundingBox', () => {
        expect('valid3DBoundingBox' in core.boundingBoxes).toBeTruthy()
    })

    test('validBoundingBox', () => {
        expect('validBoundingBox' in core.boundingBoxes).toBeTruthy()
    })
})

describe('Coordinate Functions Exported', () => {
    test('valid2DCoordinate', () => {
        expect('valid2DCoordinate' in core.coordinates).toBeTruthy()
    })

    test('valid3DCoordinate', () => {
        expect('valid3DCoordinate' in core.coordinates).toBeTruthy()
    })

    test('validCoordinate', () => {
        expect('validCoordinate' in core.coordinates).toBeTruthy()
    })
})

describe('FeatureCollection Functions Exported', () => {
    test('featureCollection', () => {
        expect('featureCollection' in core.featureCollections).toBeTruthy()
    })
})

describe('Feature Functions Exported', () => {
    test('feature', () => {
        expect('feature' in core.features).toBeTruthy()
    })
})

describe('Geometry Functions Exported', () => {
    test('anyGeometry', () => {
        expect('anyGeometry' in core.geometries).toBeTruthy()
    })

    test('geometryCollection', () => {
        expect('geometryCollection' in core.geometries).toBeTruthy()
    })

    test('lineStringGeometry', () => {
        expect('lineStringGeometry' in core.geometries).toBeTruthy()
    })

    test('multiLineStringGeometry', () => {
        expect('multiLineStringGeometry' in core.geometries).toBeTruthy()
    })

    test('multiPointGeometry', () => {
        expect('multiPointGeometry' in core.geometries).toBeTruthy()
    })

    test('multiPolygonGeometry', () => {
        expect('multiPolygonGeometry' in core.geometries).toBeTruthy()
    })

    test('pointGeometry', () => {
        expect('pointGeometry' in core.geometries).toBeTruthy()
    })

    test('polygonGeometry', () => {
        expect('polygonGeometry' in core.geometries).toBeTruthy()
    })
})

describe('Utility Functions Exported', () => {
    test('commonGeometryValidation', () => {
        expect('commonGeometryValidation' in core.utilities).toBeTruthy()
    })

    test('validGeoJSON', () => {
        expect('validGeoJSON' in core.utilities).toBeTruthy()
    })
})

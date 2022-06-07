// These tests do nothing but verify that the exported objects have all expected functions.

const matchers = require('../src/matchers')

describe('Bounding Box Matchers Exported', () => {
    test('isValid2DBoundingBox', () => {
        expect('isValid2DBoundingBox' in matchers.boundingBoxes).toBeTruthy()
    })

    test('isValid3DBoundingBox', () => {
        expect('isValid2DBoundingBox' in matchers.boundingBoxes).toBeTruthy()
    })

    test('isValidBoundingBox', () => {
        expect('isValidBoundingBox' in matchers.boundingBoxes).toBeTruthy()
    })
})

describe('Coordinate Matchers Exported', () => {
    test('isValid2DCoordinate', () => {
        expect('isValid2DCoordinate' in matchers.coordinates).toBeTruthy()
    })

    test('isValid3DCoordinate', () => {
        expect('isValid3DCoordinate' in matchers.coordinates).toBeTruthy()
    })

    test('isValidCoordinate', () => {
        expect('isValidCoordinate' in matchers.coordinates).toBeTruthy()
    })
})

describe('FeatureCollection Matchers Exported', () => {
    test('toBeFeatureCollection', () => {
        expect('toBeFeatureCollection' in matchers.featureCollections).toBeTruthy()
    })
})

describe('Feature Matchers Exported', () => {
    test('toBeFeature', () => {
        expect('toBeFeature' in matchers.features).toBeTruthy()
    })

    test('toHaveID', () => {
        expect('toHaveID' in matchers.features).toBeTruthy()
    })
})

describe('Functional Matchers Exported', () => {
    test('toBeValidGeoJSON', () => {
        expect('toBeValidGeoJSON' in matchers.functional).toBeTruthy()
    })
})

describe('Geometry Matchers Exported', () => {
    test('toBeAnyGeometry', () => {
        expect('toBeAnyGeometry' in matchers.geometries).toBeTruthy()
    })

    test('toBeGeometryCollection', () => {
        expect('toBeGeometryCollection' in matchers.geometries).toBeTruthy()
    })

    test('toBeLineStringGeometry', () => {
        expect('toBeLineStringGeometry' in matchers.geometries).toBeTruthy()
    })

    test('toBeMultiLineStringGeometry', () => {
        expect('toBeMultiLineStringGeometry' in matchers.geometries).toBeTruthy()
    })

    test('toBeMultiPointGeometry', () => {
        expect('toBeMultiPointGeometry' in matchers.geometries).toBeTruthy()
    })

    test('toBeMultiPolygonGeometry', () => {
        expect('toBeMultiPolygonGeometry' in matchers.geometries).toBeTruthy()
    })

    test('toBePointGeometry', () => {
        expect('toBePointGeometry' in matchers.geometries).toBeTruthy()
    })

    test('toBePolygonGeometry', () => {
        expect('toBePolygonGeometry' in matchers.geometries).toBeTruthy()
    })
})

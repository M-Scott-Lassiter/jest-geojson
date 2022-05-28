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

describe('Geometry Functions Exported', () => {
    test('lineStringGeometry', () => {
        expect('lineStringGeometry' in core.geometries).toBeTruthy()
    })

    test('multiLineStringGeometry', () => {
        expect('multiLineStringGeometry' in core.geometries).toBeTruthy()
    })

    test('multiPointGeometry', () => {
        expect('multiPointGeometry' in core.geometries).toBeTruthy()
    })

    test('pointGeometry', () => {
        expect('pointGeometry' in core.geometries).toBeTruthy()
    })
})

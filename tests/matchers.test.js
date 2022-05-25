// These tests do nothing but verify that the exported objects have all expected functions.

const matchers = require('../src/matchers')

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

describe('Bounding Box Matchers Exported', () => {
    test('isValid2DBoundingBox', () => {
        expect('isValid2DBoundingBox' in matchers.boundingBoxes).toBeTruthy()
    })

    test('isValid3DBoundingBox', () => {
        expect('isValid2DBoundingBox' in matchers.boundingBoxes).toBeTruthy()
    })
})
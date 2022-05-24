// These tests do nothing but verify that the exported objects have all expected functions.

const core = require('../src/core')

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

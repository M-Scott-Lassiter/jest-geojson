const goodCoordinates = [
    [[0, 0, 0]],
    [[102.0, 0.5, 1000]],
    [[172.0, -15, -1000]],
    [[-10.9, 77, 5000]],
    [[-152.0, -33.33333, -5000]]
]
const goodBoundaryCoordinates = [
    [[180, 0, Infinity]],
    [[-180, 0, Infinity]],
    [[0, 90, Infinity]],
    [[0, -90, Infinity]],
    [[180, 90, -Infinity]],
    [[180, -90, -Infinity]],
    [[-180, 90, -Infinity]],
    [[-180, -90, -Infinity]]
]
const coordinatesOutOfRange = [
    [[0, 90.0000001, 0]],
    [[0, -90.0000001, 0]],
    [[0, 900000, 0]],
    [[0, -900000, 0]],
    [[180.0000001, 0, 0]],
    [[-180.0000001, 0, 0]],
    [[1800000, 0, 0]],
    [[-1800000, 0, 0]],
    [[181, 91, 0]],
    [[181, -91, 0]],
    [[-181, 91, 0]],
    [[-181, -91, 0]]
]
const invalidInputValues = [
    undefined,
    null,
    true,
    false,
    200,
    -200,
    Infinity,
    -Infinity,
    NaN,
    { coordinates: [0, 0, 0] },
    '',
    'Random Coordinate',
    '[0, 0, 0]',
    '[[0, 0, 0], [0, 0, 0]]'
]
const invalidAltitudeValues = [
    undefined,
    null,
    true,
    false,
    NaN,
    { coordinates: [0, 0, 0] },
    '',
    'Random Coordinate',
    '[0, 0, 0]',
    '[[0, 0, 0], [0, 0, 0]]'
]

describe('Valid Use Cases', () => {
    describe('Expect to pass with good coordinates:', () => {
        test.each([...goodCoordinates])('expect(%p)', (coordinate) => {
            expect(coordinate).isValid3DCoordinate()
            expect(coordinate).isValidCoordinate()
        })
    })

    describe('Expect to pass with good boundary coordinates:', () => {
        test.each([...goodBoundaryCoordinates])('expect([%p])', (coordinate) => {
            expect(coordinate).isValid3DCoordinate()
            expect(coordinate).isValidCoordinate()
        })
    })
})

describe('Invalid Use Cases', () => {
    describe('Expect to fail with bad inputs:', () => {
        test.each([...invalidInputValues])('expect(%p)', (badInput) => {
            expect(badInput).not.isValid3DCoordinate()
            expect(badInput).not.isValidCoordinate()
        })
    })

    describe('Expect to fail with incorrect number of array elements:', () => {
        test.each([[[]], [[20]], [[20, 30]], [[20, 30, 0, 20, 30, 0, 20, 30, 0]]])(
            'expect(%p)',
            (badInput) => {
                expect(badInput).not.isValid3DCoordinate()
            }
        )
    })

    describe('Expect to fail with out of range lon/lat coordinates:', () => {
        test.each([...coordinatesOutOfRange])('expect(%p)', (coordinate) => {
            expect(coordinate).not.isValid3DCoordinate()
            expect(coordinate).not.isValidCoordinate()
        })
    })

    describe('Passing Bad Individual Coordinate Values', () => {
        describe('Expect to fail with bad longitude value:', () => {
            test.each([...invalidInputValues])('expect([%p, 0, 0])', (longitude) => {
                expect([longitude, 0, 0]).not.isValid3DCoordinate()
                expect([longitude, 0, 0]).not.isValidCoordinate()
            })
        })

        describe('Expect to fail with bad latitude value:', () => {
            test.each([...invalidInputValues])('expect([0, %p, 0])', (latitude) => {
                expect([0, latitude, 0]).not.isValid3DCoordinate()
                expect([0, latitude, 0]).not.isValidCoordinate()
            })
        })

        describe('Expect to fail with bad altitude value:', () => {
            test.each([...invalidAltitudeValues])('expect([0, 0, %p])', (altitude) => {
                expect([0, 0, altitude]).not.isValid3DCoordinate()
                expect([0, 0, altitude]).not.isValidCoordinate()
            })
        })

        describe('Expect to fail with bad values for all three: ', () => {
            test.each([...invalidInputValues])(
                'expect(<val>, <val>, <val>), <val> = %p',
                (input) => {
                    expect([input, input, input]).not.isValid3DCoordinate()
                    expect([input, input, input]).not.isValidCoordinate()
                }
            )
        })
    })

    describe('Expect to fail when arrays are nested too deeply:', () => {
        const testArray = [
            [10, 20, 0],
            [2, 90, 0],
            [95, 5, 0]
        ]
        test.each([[testArray], [[testArray]], [[[testArray]]]])('expect(%p)', (badInput) => {
            expect([badInput]).not.isValid2DCoordinate()
            expect([badInput]).not.isValidCoordinate()
        })
    })
})

describe('Error Snapshot Testing. Throws error:', () => {
    test('Valid use case passes', () => {
        expect(() => expect([0, 0, 0]).not.isValid3DCoordinate()).toThrowErrorMatchingSnapshot()
    })

    test('Invalid input to matcher', () => {
        expect(() => expect([0, 0]).isValid3DCoordinate()).toThrowErrorMatchingSnapshot()
    })

    test('Coordinate must be an array of only three elments', () => {
        expect(() => expect([0, 0]).isValid3DCoordinate()).toThrowErrorMatchingSnapshot()
    })

    test('Coordinate altitude value must be numeric', () => {
        expect(() => expect([0, 0, true]).isValid3DCoordinate()).toThrowErrorMatchingSnapshot()
    })
})

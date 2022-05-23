const goodCoordinates = [
    [0, 0, 0],
    [102.0, 0.5, 1000],
    [172.0, -15, -1000],
    [-10.9, 77, 5000],
    [-152.0, -33.33333, -5000]
]
const goodBoundaryCoordinates = [
    [180, 0, Infinity],
    [-180, 0, Infinity],
    [0, 90, Infinity],
    [0, -90, Infinity],
    [180, 90, -Infinity],
    [180, -90, -Infinity],
    [-180, 90, -Infinity],
    [-180, -90, -Infinity]
]
const coordinatesOutOfRange = [
    [0, 90.0000001, 0],
    [0, -90.0000001, 0],
    [0, 900000, 0],
    [0, -900000, 0],
    [180.0000001, 0, 0],
    [-180.0000001, 0, 0],
    [1800000, 0, 0],
    [-1800000, 0, 0],
    [181, 91, 0],
    [181, -91, 0],
    [-181, 91, 0],
    [-181, -91, 0]
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
const InvalidAltitudeValues = [
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
        test.each([...goodCoordinates])('expect([%p, %p, %p])', (longitude, latitude, altitude) => {
            expect([longitude, latitude, altitude]).isValid3DCoordinate()
        })
    })

    describe('Expect to pass with good boundary coordinates:', () => {
        test.each([...goodBoundaryCoordinates])(
            'expect([%p, %p, %p])',
            (longitude, latitude, altitude) => {
                expect([longitude, latitude, altitude]).isValid3DCoordinate()
            }
        )
    })
})

describe('Invalid Use Cases', () => {
    describe('Expect to fail with bad inputs:', () => {
        test.each([...invalidInputValues])('expect(%p)', (badInput) => {
            expect(badInput).not.isValid3DCoordinate()
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
        test.each([...coordinatesOutOfRange])(
            'expect([%p, %p, %p])',
            (longitude, latitude, altitude) => {
                expect([longitude, latitude, altitude]).not.isValid3DCoordinate()
            }
        )
    })

    describe('Passing Bad Individual Coordinate Values', () => {
        describe('Expect to fail with bad longitude value:', () => {
            test.each([...invalidInputValues])('expect([%p, 0, 0])', (longitude) => {
                expect([longitude, 0, 0]).not.isValid3DCoordinate()
            })
        })

        describe('Expect to fail with bad latitude value:', () => {
            test.each([...invalidInputValues])('expect([0, %p, 0])', (latitude) => {
                expect([0, latitude, 0]).not.isValid3DCoordinate()
            })
        })

        describe('Expect to fail with bad altitude value:', () => {
            test.each([...InvalidAltitudeValues])('expect([0, 0, %p])', (altitude) => {
                expect([0, 0, altitude]).not.isValid3DCoordinate()
            })
        })

        describe('Expect to fail with bad values for all three: ', () => {
            test.each([...invalidInputValues])(
                'expect(<val>, <val>, <val>), <val> = %p',
                (input) => {
                    expect([input, input, input]).not.isValid3DCoordinate()
                }
            )
        })
    })

    describe('Expect to fail when arrays are nested too deeply:', () => {
        const testArray = [
            [10, 20],
            [2, 90],
            [95, 5]
        ]
        test.each([[testArray], [[testArray]], [[[testArray]]]])('expect(%p)', (badInput) => {
            expect([badInput]).not.isValid2DCoordinate()
        })
    })
})

describe('Error Snapshot Testing. Throws error:', () => {
    test('expect([0, 0, 0]).not.isValid3DCoordinate', () => {
        expect(() => expect([0, 0, 0]).not.isValid3DCoordinate()).toThrowErrorMatchingSnapshot()
    })

    test('expect([0, 0]).isValid3DCoordinate', () => {
        expect(() => expect([0, 0]).isValid3DCoordinate()).toThrowErrorMatchingSnapshot()
    })
})
const goodCoordinates = [
    [0, 0],
    [102.0, 0.5],
    [172.0, -15],
    [-10.9, 77],
    [-152.0, -33.33333]
]
const goodBoundaryCoordinates = [
    [180, 0],
    [-180, 0],
    [0, 90],
    [0, -90],
    [180, 90],
    [180, -90],
    [-180, 90],
    [-180, -90]
]
const coordinatesOutOfRange = [
    [0, 90.0000001],
    [0, -90.0000001],
    [0, 900000],
    [0, -900000],
    [180.0000001, 0],
    [-180.0000001, 0],
    [1800000, 0],
    [-1800000, 0],
    [181, 91],
    [181, -91],
    [-181, 91],
    [-181, -91]
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
    { coordinates: [0, 0] },
    '',
    'Random Coordinate',
    '[0, 0]',
    '[[0, 0], [0, 0]]'
]

describe('Passing Good Coordinates to Expect', () => {
    test.each([...goodCoordinates])(
        'Expect to pass with good coordinate: expect([%p, %p])',
        (longitude, latitude) => {
            expect([longitude, latitude]).isValid2DCoordinate()
        }
    )

    test.each([...goodBoundaryCoordinates])(
        'Expect to pass with good boundary coordinate: expect([%p, %p])',
        (longitude, latitude) => {
            expect([longitude, latitude]).isValid2DCoordinate()
        }
    )
})

describe('Error Snapshot Testing', () => {
    test('.not.isValid2DCoordinate', () => {
        expect(() => expect([0, 0]).not.isValid2DCoordinate()).toThrowErrorMatchingSnapshot()
    })

    test('.isValid2DCoordinate', () => {
        expect(() => expect(false).isValid2DCoordinate()).toThrowErrorMatchingSnapshot()
    })
})

describe('Passing Bad Inputs to Expect', () => {
    test.each([...invalidInputValues])('Expect to fail with bad input: expect(%p)', (badInput) => {
        expect(badInput).not.isValid2DCoordinate()
    })
})

describe('Passing Incorrect Number of Arguments to Expect', () => {
    test.each([[[]], [[20]], [[20, 30, 0]], [[20, 30, 0, 20, 30, 0, 20, 30, 0]]])(
        'Expect to fail with bad input: expect(%p)',
        (badInput) => {
            expect(badInput).not.isValid2DCoordinate()
        }
    )
})

describe('Passing Coordinates out of Range to Expect', () => {
    test.each([...coordinatesOutOfRange])(
        'Expect to fail with out of range coordinate: expect([%p, %p])',
        (longitude, latitude) => {
            expect([longitude, latitude]).not.isValid2DCoordinate()
        }
    )
})

describe('Passing Bad Individual Coordinate Values to Expect', () => {
    test.each([...invalidInputValues])(
        'Expect to fail with bad longitude value: expect([%p, 0])',
        (longitude) => {
            expect([longitude, 0]).not.isValid2DCoordinate()
        }
    )

    test.each([...invalidInputValues])(
        'Expect to fail with bad latitude value: expect([0, %p])',
        (latitude) => {
            expect([0, latitude]).not.isValid2DCoordinate()
        }
    )

    test.each([...invalidInputValues])('Expect to fail with bad values for both: %p', (input) => {
        expect([input, input]).not.isValid2DCoordinate()
    })
})

describe('Arrays Nested Too Deeply', () => {
    const testArray = [
        [10, 20],
        [2, 90],
        [95, 5]
    ]
    test.each([[testArray], [[testArray]], [[[testArray]]]])(
        'Expect to fail with bad input: expect(%p)',
        (badInput) => {
            expect([badInput]).not.isValid2DCoordinate()
        }
    )
})

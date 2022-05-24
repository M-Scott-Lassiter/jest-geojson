const goodCoordinates = [
    [[0, 0]],
    [[102.0, 0.5]],
    [[172.0, -15]],
    [[-10.9, 77]],
    [[-152.0, -33.33333]]
]
const goodBoundaryCoordinates = [
    [[180, 0]],
    [[-180, 0]],
    [[0, 90]],
    [[0, -90]],
    [[180, 90]],
    [[180, -90]],
    [[-180, 90]],
    [[-180, -90]]
]
const coordinatesOutOfRange = [
    [[0, 90.0000001]],
    [[0, -90.0000001]],
    [[0, 900000]],
    [[0, -900000]],
    [[180.0000001, 0]],
    [[-180.0000001, 0]],
    [[1800000, 0]],
    [[-1800000, 0]],
    [[181, 91]],
    [[181, -91]],
    [[-181, 91]],
    [[-181, -91]]
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
describe('Valid Use Cases', () => {
    describe('Expect to pass with good coordinates:', () => {
        test.each([...goodCoordinates])('expect(%p)', (coordinate) => {
            expect(coordinate).isValid2DCoordinate()
            expect(coordinate).isValidCoordinate()
        })
    })

    describe('Expect to pass with good boundary coordinates:', () => {
        test.each([...goodBoundaryCoordinates])('expect(%p)', (coordinate) => {
            expect(coordinate).isValid2DCoordinate()
            expect(coordinate).isValidCoordinate()
        })
    })
})

describe('Inalid Use Cases', () => {
    describe('Expect to fail with bad inputs:', () => {
        test.each([...invalidInputValues])('expect(%p)', (badInput) => {
            expect(badInput).not.isValid2DCoordinate()
            expect(badInput).not.isValidCoordinate()
        })
    })

    describe('Expect to fail with incorrect number of array elements:', () => {
        test.each([[[]], [[20]], [[20, 30, 0]], [[20, 30, 0, 20, 30, 0, 20, 30, 0]]])(
            'expect(%p)',
            (badInput) => {
                expect(badInput).not.isValid2DCoordinate()
            }
        )
    })

    describe('Expect to fail with out of range coordinate:', () => {
        test.each([...coordinatesOutOfRange])('expect(%p)', (coordinate) => {
            expect(coordinate).not.isValid2DCoordinate()
            expect(coordinate).not.isValidCoordinate()
        })
    })

    describe('Passing Bad Individual Coordinate Values', () => {
        describe('Expect to fail with bad longitude value:', () => {
            test.each([...invalidInputValues])('expect([%p, 0])', (longitude) => {
                expect([longitude, 0]).not.isValid2DCoordinate()
                expect([longitude, 0]).not.isValidCoordinate()
            })
        })

        describe('Expect to fail with bad latitude value:', () => {
            test.each([...invalidInputValues])('expect([0, %p])', (latitude) => {
                expect([0, latitude]).not.isValid2DCoordinate()
                expect([0, latitude]).not.isValidCoordinate()
            })
        })

        describe('Expect to fail with bad values for both:', () => {
            test.each([...invalidInputValues])('expect(<val>, <val>), <val> = %p', (input) => {
                expect([input, input]).not.isValid2DCoordinate()
                expect([input, input]).not.isValidCoordinate()
            })
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
            expect([badInput]).not.isValidCoordinate()
        })
    })
})

describe('Error Snapshot Testing. Throws error:', () => {
    test('expect([0, 0]).not.isValid3DCoordinate', () => {
        expect(() => expect([0, 0]).not.isValid2DCoordinate()).toThrowErrorMatchingSnapshot()
    })

    test('expect(false).isValid2DCoordinate()', () => {
        expect(() => expect(false).isValid2DCoordinate()).toThrowErrorMatchingSnapshot()
    })
})

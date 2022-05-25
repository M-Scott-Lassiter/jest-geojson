const goodBBoxes = [
    [[-20, 10, -10, 20]],
    [[10, 10, 20, 20]],
    [[-20, -20, -10, -10]],
    [[10, -20, 20, -10]],
    [[-10, -20, 20, -10]],
    [[-10, -20, 20, 10]],
    [[170, -20, -170, 20]]
]
const goodBoundaryCoordinates = [
    [[-180, 10, 20, 20]],
    [[10, 10, 180, 20]],
    [[-180, 80, 180, 90]],
    [[-180, -90, 180, -80]],
    [[10, 80, 20, 90]],
    [[-45, -90, -80, -80]],
    [[-180, 10, 180, 20]],
    [[-10, -90, 10, 90]],
    [[-180, -90, 180, 90]],
    [[-10, -20, 10, -20]],
    [[-10, 20, 10, 20]],
    [[-10, -20, -10, 20]],
    [[10, -20, 10, 20]],
    [[0, 0, 0, 0]]
]
const coordinatesOutOfRange = [
    [[-10, -90.0000001, 10, 0]],
    [[-10, 0, 10, 90.0000001]],
    [[-10, -90000, 10, 0]],
    [[-10, 0, 10, 90000]],
    [[-180.0000001, -10, -160, 10]],
    [[160, -10, 180.0000001, 10]],
    [[-1800000, -10, -160, 10]],
    [[160, -10, 1800000, 10]],
    [[-181, -10, 181, 10]],
    [[-10, -91, 10, 91]],
    [[-181, -91, 10, 10]],
    [[-10, -10, 181, 91]],
    [[-181, -91, 181, 91]]
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
        test.each([...goodBBoxes])('expect(%p)', (bboxArray) => {
            expect(bboxArray).isValid2DBoundingBox()
        })
    })

    describe('Expect to pass with good boundary coordinates:', () => {
        test.each([...goodBoundaryCoordinates])('expect(%p)', (bboxArray) => {
            expect(bboxArray).isValid2DBoundingBox()
        })
    })
})

describe('Inalid Use Cases', () => {
    describe('Expect to fail with bad inputs:', () => {
        test.each([...invalidInputValues])('expect(%p)', (badInput) => {
            expect(badInput).not.isValid2DBoundingBox()
        })
    })

    describe('Expect to fail with incorrect number of array elements:', () => {
        test.each([
            [[]],
            [[20]],
            [[20, 10]],
            [[20, 30, 0]],
            [[20, 30, 0, 0, 10]],
            [[20, 30, 0, 20, 30, 0]],
            [[20, 30, 0, 20, 30, 0, 20, 30, 0]]
        ])('expect(%p)', (badInput) => {
            expect(badInput).not.isValid2DBoundingBox()
        })
    })

    describe('Expect to fail with out of range coordinate:', () => {
        test.each([...coordinatesOutOfRange])('expect(%p)', (coordinate) => {
            expect(coordinate).not.isValid2DBoundingBox()
        })
    })

    describe('Expect to fail with illogical BBox:', () => {
        test('Northern boundary less than southern: expect([-10, 20, 10, -20])', () => {
            expect([-10, 20, 10, -20]).not.isValid2DBoundingBox()
        })
    })

    describe('Passing Bad Individual Coordinate Values', () => {
        describe('Expect to fail with bad western value:', () => {
            test.each([...invalidInputValues])('expect([%p, -10, 10, 10])', (input) => {
                expect([input, -10, 10, 10]).not.isValid2DBoundingBox()
            })
        })

        describe('Expect to fail with bad southern value:', () => {
            test.each([...invalidInputValues])('expect([%p, -10, 10, 10])', (input) => {
                expect([-10, input, 10, 10]).not.isValid2DBoundingBox()
            })
        })

        describe('Expect to fail with bad eastern value:', () => {
            test.each([...invalidInputValues])('expect([%p, -10, 10, 10])', (input) => {
                expect([-10, -10, input, 10]).not.isValid2DBoundingBox()
            })
        })

        describe('Expect to fail with bad northern value:', () => {
            test.each([...invalidInputValues])('expect([%p, -10, 10, 10])', (input) => {
                expect([-10, -10, 10, input]).not.isValid2DBoundingBox()
            })
        })

        describe('Expect to fail with bad inputs for all values:', () => {
            test.each([...invalidInputValues])('expect([%p, -10, 10, 10])', (input) => {
                expect([input, input, input, input]).not.isValid2DBoundingBox()
            })
        })
    })

    describe('Expect to fail when BBox values are arrays of otherwise valid numbers:', () => {
        test('expect([[-20], [10], [-10], [20]])', () => {
            expect([[-20], [10], [-10], [20]]).not.isValid2DBoundingBox()
        })
    })
})

describe('Error Snapshot Testing. Throws error:', () => {
    test('expect([0, 0]).not.isValid2DBoundingBox', () => {
        expect(() =>
            expect([10, 10, 20, 20]).not.isValid2DBoundingBox()
        ).toThrowErrorMatchingSnapshot()
    })

    test('expect(false).isValid2DBoundingBox()', () => {
        expect(() => expect(false).isValid2DBoundingBox()).toThrowErrorMatchingSnapshot()
    })
})

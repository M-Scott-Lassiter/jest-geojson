const goodBBoxes = [
    [[-20, 10, 0, -10, 20, 0]],
    [[10, 10, 0, 20, 20, 0]],
    [[-20, -20, 0, -10, -10, 0]],
    [[10, -20, 0, 20, -10, 0]],
    [[-10, -20, 0, 20, -10, 0]],
    [[-10, -20, 0, 20, 10, 0]],
    [[170, -20, 0, -170, 20, 0]],
    [[-10, -20, -100, 20, 10, 0]],
    [[-10, -20, -500, 20, 10, -50]],
    [[170, -20, 0, -170, 20, 100]],
    [[-10, -20, 50, 20, 10, 500]],
    [[-10, -20, -22.5, 20, 10, 12345.678]]
]
const goodBoundaryCoordinates = [
    [[-180, 10, 0, 20, 20, 0]],
    [[10, 10, 0, 180, 20, 0]],
    [[-180, 80, 0, 180, 90, 0]],
    [[-180, -90, 0, 180, -80, 0]],
    [[10, 80, 0, 20, 90, 0]],
    [[-45, -90, 0, -80, -80, 0]],
    [[-180, 10, 0, 180, 20, 0]],
    [[-10, -90, 0, 10, 90, 0]],
    [[-180, -90, 0, 180, 90, 0]],
    [[-180, -90, -100000, 180, 90, 100000]],
    [[-10, -20, 0, 10, -20, 0]],
    [[-10, 20, 0, 10, 20, 0]],
    [[-10, -20, 0, -10, 20, 0]],
    [[10, -20, 0, 10, 20, 0]],
    [[-10, -20, -220, -10, 20, -220]],
    [[-10, -20, 330, -10, 20, 330]],
    [[0, 0, 0, 0, 0, 0]]
]
const coordinatesOutOfRange = [
    [[-10, -90.0000001, 0, 10, 0, 0]],
    [[-10, 0, 0, 10, 90.0000001, 0]],
    [[-10, -90000, 0, 10, 0, 0]],
    [[-10, 0, 0, 10, 90000, 0]],
    [[-180.0000001, -10, 0, -160, 10, 0]],
    [[160, -10, 0, 180.0000001, 10, 0]],
    [[-1800000, -10, 0, -160, 10, 0]],
    [[160, -10, 0, 1800000, 10, 0]],
    [[-181, -10, 0, 181, 10, 0]],
    [[-10, -91, 0, 10, 91, 0]],
    [[-181, -91, 0, 10, 10, 0]],
    [[-10, -10, 0, 181, 91, 0]],
    [[-181, -91, 0, 181, 91, 0]]
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
    '[10, 10, 0, 20, 20, 0]'
]
const invalidAltitudeValues = [
    undefined,
    null,
    true,
    false,
    NaN,
    { coordinates: [0, 0] },
    '',
    'Random Coordinate',
    '[10, 10, 0, 20, 20, 0]'
]

describe('Valid Use Cases', () => {
    describe('Expect to pass with good coordinates:', () => {
        test.each([...goodBBoxes])('expect(%p)', (bboxArray) => {
            expect(bboxArray).isValid3DBoundingBox()
            expect(bboxArray).isValidBoundingBox()
        })
    })

    describe('Expect to pass with good boundary coordinates:', () => {
        test.each([...goodBoundaryCoordinates])('expect(%p)', (bboxArray) => {
            expect(bboxArray).isValid3DBoundingBox()
            expect(bboxArray).isValidBoundingBox()
        })
    })
})

describe('Inalid Use Cases', () => {
    describe('Expect to fail with bad inputs:', () => {
        test.each([...invalidInputValues])('expect(%p)', (badInput) => {
            expect(badInput).not.isValid3DBoundingBox()
            expect(badInput).not.isValidBoundingBox()
        })
    })

    describe('Expect to fail with incorrect number of array elements:', () => {
        test.each([
            [[]],
            [[20]],
            [[20, 10]],
            [[20, 30, 0]],
            [[-10, 30, -5, 40]],
            [[20, 30, 0, 20, 30]],
            [[20, 30, 0, 20, 30, 0, 2]],
            [[20, 30, 0, 20, 30, 0, 20, 30, 0]]
        ])('expect(%p)', (badInput) => {
            expect(badInput).not.isValid3DBoundingBox()
        })
    })

    describe('Expect to fail with out of range coordinate:', () => {
        test.each([...coordinatesOutOfRange])('expect(%p)', (coordinate) => {
            expect(coordinate).not.isValid3DBoundingBox()
            expect(coordinate).not.isValidBoundingBox()
        })
    })

    describe('Expect to fail with illogical BBox:', () => {
        test('Northern boundary less than southern: expect([-10, 20, 0, 10, -20, 0])', () => {
            const illogicalBBox = [-10, 20, 0, 10, -20, 0]
            expect(illogicalBBox).not.isValid3DBoundingBox()
            expect(illogicalBBox).not.isValidBoundingBox()
        })

        test('Altitude less than depth: expect([-10, -20, 200, 20, 10, 150])', () => {
            const illogicalBBox = [-10, -20, 200, 20, 10, 150]
            expect(illogicalBBox).not.isValid3DBoundingBox()
            expect(illogicalBBox).not.isValidBoundingBox()
        })
    })

    describe('Passing Bad Individual Coordinate Values', () => {
        describe('Expect to fail with bad western value:', () => {
            test.each([...invalidInputValues])('expect([%p, -10, 0, 10, 10, 0])', (input) => {
                expect([input, -10, 0, 10, 10, 0]).not.isValid3DBoundingBox()
                expect([input, -10, 0, 10, 10, 0]).not.isValidBoundingBox()
            })
        })

        describe('Expect to fail with bad southern value:', () => {
            test.each([...invalidInputValues])('expect([-10, %p, 0, 10, 10, 0])', (input) => {
                expect([-10, input, 0, 10, 10, 0]).not.isValid3DBoundingBox()
                expect([-10, input, 0, 10, 10, 0]).not.isValidBoundingBox()
            })
        })

        describe('Expect to fail with bad depth value:', () => {
            test.each([...invalidAltitudeValues])('expect([-10, -10, %p, 10, 10, 0])', (input) => {
                expect([-10, -10, input, 10, 10, 0]).not.isValid3DBoundingBox()
                expect([-10, -10, input, 10, 10, 0]).not.isValidBoundingBox()
            })
        })

        describe('Expect to fail with bad eastern value:', () => {
            test.each([...invalidInputValues])('expect([-10, -10, 0, %p, 10, 0])', (input) => {
                expect([-10, -10, 0, input, 10, 0]).not.isValid3DBoundingBox()
                expect([-10, -10, 0, input, 10, 0]).not.isValidBoundingBox()
            })
        })

        describe('Expect to fail with bad northern value:', () => {
            test.each([...invalidInputValues])('expect([-10, -10, 0, 10, %p, 0])', (input) => {
                expect([-10, -10, 0, 10, input, 0]).not.isValid3DBoundingBox()
                expect([-10, -10, 0, 10, input, 0]).not.isValidBoundingBox()
            })
        })

        describe('Expect to fail with bad altitude value:', () => {
            test.each([...invalidAltitudeValues])('expect([-10, -10, 0, 10, 10, %p])', (input) => {
                expect([-10, -10, 0, 10, 10, input]).not.isValid3DBoundingBox()
                expect([-10, -10, 0, 10, 10, input]).not.isValidBoundingBox()
            })
        })

        describe('Expect to fail with bad inputs for all values:', () => {
            test.each([...invalidInputValues])('expect([%p, %p, %p, %p, %p, %p])', (input) => {
                expect([input, input, input, input, input, input]).not.isValid3DBoundingBox()
                expect([input, input, input, input, input, input]).not.isValidBoundingBox()
            })
        })
    })

    describe('Expect to fail when BBox values are arrays of otherwise valid numbers:', () => {
        test('expect([[-20], [10], [0], [-10], [20], [0]])', () => {
            const nestedArrays = [[-20], [10], [0], [-10], [20], [0]]
            expect(nestedArrays).not.isValid3DBoundingBox()
            expect(nestedArrays).not.isValidBoundingBox()
        })
    })
})

describe('Error Snapshot Testing. Throws error:', () => {
    test('expect([10, 10, 0, 20, 20, 0]).not.isValid3DBoundingBox', () => {
        expect(() =>
            expect([10, 10, 0, 20, 20, 0]).not.isValid3DBoundingBox()
        ).toThrowErrorMatchingSnapshot()
    })

    test('expect(false).isValid3DBoundingBox()', () => {
        expect(() => expect(false).isValid3DBoundingBox()).toThrowErrorMatchingSnapshot()
    })
})

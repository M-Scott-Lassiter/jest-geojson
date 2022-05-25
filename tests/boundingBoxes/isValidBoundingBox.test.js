// This matcher works on all the same valid2DBoundingBox and valid3DBoundingBox cases.
// Accordingly, those specific tests check that both functions work.
// This test suite checks the array elements sizing because 2D and 3D have different acceptance criteria.
// Finally, it tests the unique snapshots.

describe('Invalid Use Cases', () => {
    describe('Expect to fail with incorrect number of array elements:', () => {
        test.each([
            [[]],
            [[20]],
            [[20, 30]],
            [[20, 30, 0]],
            [[20, 30, 0, 4, 0]],
            [[20, 30, 0, 20, 30, 0, 20]],
            [[20, 30, 0, 20, 30, 0, 20, 30, 0]]
        ])('expect(%p)', (badInput) => {
            expect(badInput).not.isValidBoundingBox()
        })
    })
})

describe('Error Snapshot Testing. Throws error:', () => {
    test('expect([0, 0, 0, 0]).not.isValidBoundingBox', () => {
        expect(() =>
            expect([-20, 10, -10, 20]).not.isValidBoundingBox()
        ).toThrowErrorMatchingSnapshot()
    })

    test('expect([0, 0, 0, 0, 0, 0]).not.isValidBoundingBox', () => {
        expect(() =>
            expect([0, 0, 0, 0, 0, 0]).not.isValidBoundingBox()
        ).toThrowErrorMatchingSnapshot()
    })

    test('expect([0, 0, 95, 0]).isValidBoundingBox', () => {
        expect(() => expect([0, 0, 0, 95]).isValidBoundingBox()).toThrowErrorMatchingSnapshot()
    })

    test('expect([0, -95, 0, 0, 0, 0]).isValidBoundingBox', () => {
        expect(() =>
            expect([0, -95, 0, 0, 0, 0]).isValidBoundingBox()
        ).toThrowErrorMatchingSnapshot()
    })
})

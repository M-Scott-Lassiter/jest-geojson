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
    test('Valid use case passes', () => {
        expect(() =>
            expect([-20, 10, -10, 20]).not.isValidBoundingBox()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Invalid input to matcher', () => {
        expect(() => expect(false).isValidBoundingBox()).toThrowErrorMatchingSnapshot()
    })

    test('Bounding box must be an array of either four or six elments', () => {
        expect(() => expect([0, 1, 2, 3, 4]).isValidBoundingBox()).toThrowErrorMatchingSnapshot()
    })
})

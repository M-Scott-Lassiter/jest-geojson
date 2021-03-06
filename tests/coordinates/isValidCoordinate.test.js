// This matcher works on all the same valid2DCoordinate and valid3DCoordinate cases.
// Accordingly, those specific tests check that both functions work.
// This test suite checks the array elements sizing because 2D and 3D have different acceptance criteria.
// Finally, it tests the unique snapshots.

describe('Invalid Use Cases', () => {
    describe('Expect to fail with incorrect number of array elements:', () => {
        test.each([[[]], [[20]], [[20, 30, 0, 4]], [[20, 30, 0, 20, 30, 0, 20, 30, 0]]])(
            'expect(%p)',
            (badInput) => {
                expect(badInput).not.isValidCoordinate()
            }
        )
    })
})

describe('Error Snapshot Testing. Throws error:', () => {
    test('Valid use case passes', () => {
        expect(() => expect([0, 0]).not.isValidCoordinate()).toThrowErrorMatchingSnapshot()
    })

    test('Invalid input to matcher', () => {
        expect(() => expect(false).isValidCoordinate()).toThrowErrorMatchingSnapshot()
    })

    test('Array does not have either two or three elements', () => {
        expect(() => expect([0, 0, 0, 0]).isValidCoordinate()).toThrowErrorMatchingSnapshot()
    })
})

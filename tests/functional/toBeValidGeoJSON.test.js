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
    [[25, 35, 45000]],
    [
        [
            [0, 0],
            [1, 1]
        ]
    ],
    [[]],
    '',
    'Random Geometry',
    JSON.stringify({
        type: 'LineString',
        coordinates: [
            [25, 90],
            [2, 2]
        ]
    }),
    [[-10, -10, 10, 10]],

    [[-10, -10, 0, 10, 10, 0]],
    [
        [
            {
                type: 'Point',
                coordinates: [100.0, 0.0]
            },
            {
                type: 'LineString',
                coordinates: [
                    [
                        [180.0, 40.0],
                        [180.0, 50.0],
                        [170.0, 50.0],
                        [170.0, 40.0],
                        [180.0, 40.0]
                    ]
                ]
            }
        ]
    ],
    {}
]

// All valid use cases contained within the Geometry, Feature, and FeatureCollection tests.

describe('Invalid Use Cases', () => {
    describe('Expect to fail with bad inputs:', () => {
        test.each(invalidInputValues)('expect(%p).not.toBeValidGeoJSON()', (badInput) => {
            expect(badInput).not.toBeValidGeoJSON()
        })
    })
})

describe('Error Snapshot Testing. Throws error:', () => {
    test(`Valid use case passes`, () => {
        expect(() =>
            expect({ type: 'Point', coordinates: [0, 0] }).not.toBeValidGeoJSON()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Invalid input to matcher', () => {
        expect(() => expect(false).toBeValidGeoJSON()).toThrowErrorMatchingSnapshot()
    })
})

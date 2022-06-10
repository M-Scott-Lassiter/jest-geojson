const { goodGeometry, badGeometry, nestedGeometryCollection } = require('./data')

const invalidInputValues = [
    goodGeometry.lineString,
    goodGeometry.multiLineString,
    goodGeometry.multiPoint,
    goodGeometry.polygon,
    goodGeometry.point,
    nestedGeometryCollection,
    badGeometry.lineString,
    badGeometry.multiLineString,
    badGeometry.multiPoint,
    badGeometry.multiPolygon,
    badGeometry.point,
    badGeometry.geometryCollection,
    badGeometry.unrecognized,
    badGeometry.polygon,
    undefined,
    null,
    true,
    false,
    0,
    NaN,
    [
        [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 0],
            [0, 0]
        ]
    ],
    [[1, 1]],
    { someProp: 'I am not GeoJSON', id: 4 },
    {},
    '',
    'Random Feature',
    JSON.stringify({
        type: 'Polygon',
        coordinates: [
            [
                [
                    [102.0, 2.0],
                    [103.0, 2.0],
                    [103.0, 3.0],
                    [102.0, 3.0],
                    [102.0, 2.0]
                ]
            ],
            [
                [
                    [100.0, 0.0],
                    [101.0, 0.0],
                    [101.0, 1.0],
                    [100.0, 1.0],
                    [100.0, 0.0]
                ],
                [
                    [100.2, 0.2],
                    [100.2, 0.8],
                    [100.8, 0.8],
                    [100.8, 0.2],
                    [100.2, 0.2]
                ]
            ]
        ]
    })
]

describe('Valid Use Cases', () => {
    test('Good MultiPolygon With a Single Hole', () => {
        const testMultiPolygon = {
            type: 'MultiPolygon',
            coordinates: [
                [
                    [
                        [100.0, 0.0],
                        [101.0, 0.0],
                        [101.0, 1.0],
                        [100.0, 1.0],
                        [100.0, 0.0]
                    ],
                    [
                        [100.8, 0.8],
                        [100.8, 0.2],
                        [100.2, 0.2],
                        [100.2, 0.8],
                        [100.8, 0.8]
                    ]
                ]
            ]
        }
        expect(testMultiPolygon).toBeMultiPolygonWithHole()
    })

    test('Good Polygon With Two Holes', () => {
        const testMultiPolygon = {
            type: 'MultiPolygon',
            coordinates: [
                [
                    [
                        [100.0, 0.0],
                        [101.0, 0.0],
                        [101.0, 1.0],
                        [100.0, 1.0],
                        [100.0, 0.0]
                    ],
                    [
                        [100.3, 0.3],
                        [100.3, 0.2],
                        [100.2, 0.2],
                        [100.2, 0.3],
                        [100.3, 0.3]
                    ],
                    [
                        [100.7, 0.7],
                        [100.7, 0.5],
                        [100.5, 0.5],
                        [100.5, 0.7],
                        [100.7, 0.7]
                    ]
                ]
            ]
        }
        expect(testMultiPolygon).toBeMultiPolygonWithHole()
    })

    test('Good MultiPolygon With 30 Polygons, Each With 30 Holes', () => {
        const testMultiPolygon = {
            type: 'MultiPolygon',
            coordinates: []
        }
        for (let i = 0; i < 30; i++) {
            testMultiPolygon.coordinates.push([
                [
                    [0, 0],
                    [170, 0],
                    [170, 80],
                    [0, 80],
                    [0, 0]
                ]
            ])
            testMultiPolygon.coordinates[i].push([
                [i, 1],
                [i, 2],
                [i + 0.5, 2],
                [i + 0.5, 1],
                [i, 1]
            ])
        }
        expect(testMultiPolygon).toBeMultiPolygonWithHole()
    })

    test('Hole Has 0 Area', () => {
        const testMultiPolygon = {
            type: 'MultiPolygon',
            coordinates: [
                [
                    [
                        [-10, -10],
                        [10, -10],
                        [10, 10],
                        [-10, 10],
                        [-10, -10]
                    ],
                    [
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0]
                    ]
                ]
            ]
        }
        expect(testMultiPolygon).toBeMultiPolygonWithHole()
    })

    test('Hole is Outside Geometry', () => {
        const testMultiPolygon = {
            type: 'MultiPolygon',
            coordinates: [
                [
                    [
                        [-10, -10],
                        [10, -10],
                        [10, 10],
                        [-10, 10],
                        [-10, -10]
                    ],
                    [
                        [-50, 25],
                        [-50, 35],
                        [-45, 30],
                        [-50, 25]
                    ]
                ]
            ]
        }
        expect(testMultiPolygon).toBeMultiPolygonWithHole()
    })

    test('Hole is Wound CounterClockwise', () => {
        const testMultiPolygon = {
            type: 'MultiPolygon',
            coordinates: [
                [
                    [
                        [-10, -10],
                        [10, -10],
                        [10, 10],
                        [-10, 10],
                        [-10, -10]
                    ],
                    [
                        [1, 2],
                        [1, 1],
                        [2, 1],
                        [1, 2]
                    ]
                ]
            ]
        }
        expect(testMultiPolygon).toBeMultiPolygonWithHole()
    })
})

describe('Inalid Use Cases', () => {
    describe('Expect to fail with bad inputs:', () => {
        test.each([...invalidInputValues])(
            'expect(%p).not.toBeMultiPolygonWithHole()',
            (badInput) => {
                expect(badInput).not.toBeMultiPolygonWithHole()
            }
        )
    })

    test('MultiPolygon with no hole', () => {
        const multiPolygon = {
            type: 'Polygon',
            coordinates: [
                [
                    [
                        [100.0, 0.0],
                        [101.0, 0.0],
                        [101.0, 1.0],
                        [100.0, 1.0],
                        [100.0, 0.0]
                    ]
                ]
            ]
        }
        expect(multiPolygon).not.toBeMultiPolygonWithHole()
    })
})

describe('Error Snapshot Testing. Throws error:', () => {
    test('Valid use case passes', () => {
        expect(() =>
            expect({
                type: 'MultiPolygon',
                coordinates: [
                    [
                        [
                            [100.0, 0.0],
                            [101.0, 0.0],
                            [101.0, 1.0],
                            [100.0, 1.0],
                            [100.0, 0.0]
                        ],
                        [
                            [100.8, 0.8],
                            [100.8, 0.2],
                            [100.2, 0.2],
                            [100.2, 0.8],
                            [100.8, 0.8]
                        ]
                    ]
                ]
            }).not.toBeMultiPolygonWithHole()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Invalid input to matcher', () => {
        expect(() => expect(false).toBeMultiPolygonWithHole()).toThrowErrorMatchingSnapshot()
    })

    test('MultiPolygon has no holes, expected at least one', () => {
        const testMultiPolygon = {
            type: 'MultiPolygon',
            coordinates: [
                [
                    [
                        [100.0, 0.0],
                        [101.0, 0.0],
                        [101.0, 1.0],
                        [100.0, 1.0],
                        [100.0, 0.0]
                    ]
                ]
            ]
        }
        expect(() =>
            expect(testMultiPolygon).toBeMultiPolygonWithHole()
        ).toThrowErrorMatchingSnapshot()
    })
})

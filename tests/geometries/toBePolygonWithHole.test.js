const { goodGeometry, badGeometry, nestedGeometryCollection } = require('./data')

const invalidInputValues = [
    goodGeometry.lineString,
    goodGeometry.multiLineString,
    goodGeometry.multiPoint,
    goodGeometry.multiPolygon,
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
    })
]

describe('Valid Use Cases', () => {
    test('Good Polygon With a Single Hole', () => {
        const testPolygon = {
            type: 'Polygon',
            coordinates: [
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
        }
        expect(testPolygon).toBePolygonWithHole()
    })

    test('Good Polygon With Two Holes', () => {
        const testPolygon = {
            type: 'Polygon',
            coordinates: [
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
        }
        expect(testPolygon).toBePolygonWithHole()
    })

    test('Good Polygon With 30 Holes', () => {
        const testPolygon = {
            type: 'Polygon',
            coordinates: [
                [
                    [0, 0],
                    [170, 0],
                    [170, 80],
                    [0, 80],
                    [0, 0]
                ]
            ]
        }
        for (let i = 0; i < 30; i++) {
            testPolygon.coordinates.push([
                [i, 1],
                [i, 2],
                [i + 0.5, 2],
                [i + 0.5, 1],
                [i, 1]
            ])
        }
        expect(testPolygon).toBePolygonWithHole()
    })

    test('Hole Has 0 Area', () => {
        const testPolygon = {
            type: 'Polygon',
            coordinates: [
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
        }
        expect(testPolygon).toBePolygonWithHole()
    })

    test('Hole is Outside Geometry', () => {
        const testPolygon = {
            type: 'Polygon',
            coordinates: [
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
        }
        expect(testPolygon).toBePolygonWithHole()
    })

    test('Hole is Wound CounterClockwise', () => {
        const testPolygon = {
            type: 'Polygon',
            coordinates: [
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
        }
        expect(testPolygon).toBePolygonWithHole()
    })
})

describe('Inalid Use Cases', () => {
    describe('Expect to fail with bad inputs:', () => {
        test.each([...invalidInputValues])('expect(%p).not.toBePolygonWithHole()', (badInput) => {
            expect(badInput).not.toBePolygonWithHole()
        })
    })

    test('Polygon with no hole', () => {
        const polygon = {
            type: 'Polygon',
            coordinates: [
                [
                    [100.0, 0.0],
                    [101.0, 0.0],
                    [101.0, 1.0],
                    [100.0, 1.0],
                    [100.0, 0.0]
                ]
            ]
        }
        expect(polygon).not.toBePolygonWithHole()
    })
})

describe('Error Snapshot Testing. Throws error:', () => {
    test('Valid use case passes', () => {
        expect(() =>
            expect({
                type: 'Polygon',
                coordinates: [
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
            }).not.toBePolygonWithHole()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Invalid input to matcher', () => {
        expect(() => expect(false).toBePolygonWithHole()).toThrowErrorMatchingSnapshot()
    })

    test('Polygon has no holes, expected at least one', () => {
        const testPolygon = {
            type: 'Polygon',
            coordinates: [
                [
                    [100.0, 0.0],
                    [101.0, 0.0],
                    [101.0, 1.0],
                    [100.0, 1.0],
                    [100.0, 0.0]
                ]
            ]
        }
        expect(() => expect(testPolygon).toBePolygonWithHole()).toThrowErrorMatchingSnapshot()
    })
})

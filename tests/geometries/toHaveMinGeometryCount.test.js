const { goodGeometry, badGeometry, nestedGeometryCollection } = require('./data')

const testCollectionFourObjects = {
    type: 'GeometryCollection',
    geometries: [
        {
            type: 'Point',
            coordinates: [100.0, 0.0]
        },
        {
            type: 'LineString',
            coordinates: [
                [101.0, 0.0],
                [102.0, 1.0]
            ]
        },
        {
            type: 'Polygon',
            coordinates: [
                [
                    [102.0, 2.0],
                    [103.0, 2.0],
                    [103.0, 3.0],
                    [102.0, 3.0],
                    [102.0, 2.0]
                ]
            ]
        },
        {
            type: 'Point',
            coordinates: [150.0, 73.0]
        }
    ]
}
const testCollection100Objects = {
    type: 'GeometryCollection',
    geometries: []
}
for (let i = 0; i < 100; i++) {
    testCollection100Objects.geometries.push(goodGeometry.point)
}

const emptyCollection = { type: 'GeometryCollection', geometries: [] }

const invalidInputValues = [
    goodGeometry.lineString,
    goodGeometry.multiLineString,
    goodGeometry.multiPoint,
    goodGeometry.multiPolygon,
    goodGeometry.point,
    goodGeometry.polygon,
    badGeometry.lineString,
    badGeometry.multiLineString,
    badGeometry.multiPoint,
    badGeometry.multiPolygon,
    badGeometry.point,
    badGeometry.geometryCollection,
    badGeometry.unrecognized,
    badGeometry.polygon,
    {
        type: 'Feature',
        geometry: null,
        properties: null
    },
    {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: {},
                geometry: goodGeometry.multiPoint
            }
        ]
    },
    undefined,
    null,
    true,
    false,
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
        type: 'GeometryCollection',
        geometries: [
            {
                type: 'Point',
                coordinates: [100.0, 0.0]
            },
            {
                type: 'LineString',
                coordinates: [
                    [101.0, 0.0],
                    [102.0, 1.0]
                ]
            },
            {
                type: 'Polygon',
                coordinates: [
                    [
                        [102.0, 2.0],
                        [103.0, 2.0],
                        [103.0, 3.0],
                        [102.0, 3.0],
                        [102.0, 2.0]
                    ]
                ]
            },
            {
                type: 'Point',
                coordinates: [150.0, 73.0]
            }
        ]
    })
]

describe('Valid Use Cases', () => {
    test('Known good GeometryCollection with a single geometry', () => {
        const testCollection = {
            type: 'GeometryCollection',
            geometries: [
                {
                    type: 'Point',
                    coordinates: [100.0, 0.0]
                }
            ]
        }

        expect(testCollection).toHaveMinGeometryCount()
        expect(testCollection).toHaveMinGeometryCount(undefined)
        expect(testCollection).toHaveMinGeometryCount(0.9)
        expect(testCollection).toHaveMinGeometryCount(1)
        expect(testCollection).toHaveMinGeometryCount(1.2)
    })

    test('Known good GeometryCollection with 4 geometries', () => {
        expect(testCollectionFourObjects).toHaveMinGeometryCount()
        expect(testCollectionFourObjects).toHaveMinGeometryCount(undefined)
        expect(testCollectionFourObjects).toHaveMinGeometryCount(3)
        expect(testCollectionFourObjects).toHaveMinGeometryCount(4)
        expect(testCollectionFourObjects).toHaveMinGeometryCount(4.999)
        expect(testCollectionFourObjects).toHaveMinGeometryCount(4, 4)
    })

    test('Known good GeometryCollection with 100 geometries', () => {
        expect(testCollection100Objects).toHaveMinGeometryCount()
        expect(testCollection100Objects).toHaveMinGeometryCount(undefined)
        expect(testCollection100Objects).toHaveMinGeometryCount(1)
        expect(testCollection100Objects).toHaveMinGeometryCount(50)
        expect(testCollection100Objects).toHaveMinGeometryCount(100)
    })

    test('Empty Collection', () => {
        expect(emptyCollection).toHaveMinGeometryCount(0)
        expect(emptyCollection).toHaveMinGeometryCount(0.1)
        expect(emptyCollection).toHaveMinGeometryCount(0.9)
    })

    test('Nested Collection Tests Only 1 Level Deep', () => {
        expect(nestedGeometryCollection).toHaveMinGeometryCount()
        expect(nestedGeometryCollection).toHaveMinGeometryCount(2)
        expect(nestedGeometryCollection).not.toHaveMinGeometryCount(3)
    })
})

describe('Inalid Use Cases', () => {
    describe('Expect to fail with bad inputs:', () => {
        test.each([...invalidInputValues, 0])(
            'expect(%p).not.toHaveMinGeometryCount()',
            (badInput) => {
                expect(badInput).not.toHaveMinGeometryCount()
            }
        )
    })

    describe('Valid GeometryCollection With Bad MinCount:', () => {
        test.each([...invalidInputValues])('MinCount: %p', (badInput) => {
            expect(emptyCollection).not.toHaveMinGeometryCount(badInput)
        })
    })

    describe('Valid GeometryCollection With Negative Range1 or Range2:', () => {
        test('Known good GeometryCollection with a single geometry', () => {
            const testCollection = {
                type: 'GeometryCollection',
                geometries: [
                    {
                        type: 'Point',
                        coordinates: [100.0, 0.0]
                    }
                ]
            }

            expect(testCollection).not.toHaveMinGeometryCount(-1)
        })

        test('Known good GeometryCollection with 4 geometries', () => {
            expect(testCollectionFourObjects).not.toHaveMinGeometryCount(-10)
            expect(testCollectionFourObjects).not.toHaveMinGeometryCount(-0.001)
        })

        test('Known good GeometryCollection with 100 geometries', () => {
            expect(testCollection100Objects).not.toHaveMinGeometryCount(-Infinity)
        })

        test('Empty Geometry', () => {
            expect(emptyCollection).not.toHaveMinGeometryCount(-1)
        })
    })

    describe('Valid GeometryCollection With Out of Range MinCount:', () => {
        test('Known good GeometryCollection with a single geometry', () => {
            const testCollection = {
                type: 'GeometryCollection',
                geometries: [
                    {
                        type: 'Point',
                        coordinates: [100.0, 0.0]
                    }
                ]
            }

            expect(testCollection).not.toHaveMinGeometryCount(2)
        })

        test('Known good GeometryCollection with 4 geometries', () => {
            expect(testCollectionFourObjects).not.toHaveMinGeometryCount(5)
            expect(testCollectionFourObjects).not.toHaveMinGeometryCount(20)
        })

        test('Known good GeometryCollection with 100 geometries', () => {
            expect(testCollection100Objects).not.toHaveMinGeometryCount(101)
            expect(testCollection100Objects).not.toHaveMinGeometryCount(Infinity)
        })

        test('Empty Geometry', () => {
            expect(emptyCollection).not.toHaveMinGeometryCount(1)
            expect(emptyCollection).not.toHaveMinGeometryCount()
        })
    })
})

describe('Error Snapshot Testing. Throws error:', () => {
    test('Valid use case passes', () => {
        expect(() =>
            expect(testCollectionFourObjects).not.toHaveMinGeometryCount(2)
        ).toThrowErrorMatchingSnapshot()
    })

    test('Invalid input to matcher', () => {
        expect(() => expect(false).toHaveMinGeometryCount()).toThrowErrorMatchingSnapshot()
    })

    test('MinCount must be a number', () => {
        expect(() =>
            expect(testCollectionFourObjects).toHaveMinGeometryCount('Some String')
        ).toThrowErrorMatchingSnapshot()
    })

    test('MinCount is negative', () => {
        expect(() =>
            expect(testCollectionFourObjects).toHaveMinGeometryCount(-1)
        ).toThrowErrorMatchingSnapshot()
    })

    test('Searching for wrong number of geometries', () => {
        expect(() =>
            expect(testCollectionFourObjects).toHaveMinGeometryCount(6)
        ).toThrowErrorMatchingSnapshot()
    })

    test('No objects in geometries', () => {
        expect(() =>
            expect(emptyCollection).toHaveMinGeometryCount()
        ).toThrowErrorMatchingSnapshot()
    })

    test('At least one geometry when no argument provided to MinCount', () => {
        expect(() =>
            expect(testCollectionFourObjects).not.toHaveMinGeometryCount()
        ).toThrowErrorMatchingSnapshot()
    })
})

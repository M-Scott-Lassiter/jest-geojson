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

        expect(testCollection).toHaveMaxGeometryCount()
        expect(testCollection).toHaveMaxGeometryCount(undefined)
        expect(testCollection).toHaveMaxGeometryCount(1)
        expect(testCollection).toHaveMaxGeometryCount(1.2)
    })

    test('Known good GeometryCollection with 4 geometries', () => {
        expect(testCollectionFourObjects).toHaveMaxGeometryCount(4)
        expect(testCollectionFourObjects).toHaveMaxGeometryCount(4.999)
        expect(testCollectionFourObjects).toHaveMaxGeometryCount(6)
        expect(testCollectionFourObjects).toHaveMaxGeometryCount(15)
    })

    test('Known good GeometryCollection with 100 geometries', () => {
        expect(testCollection100Objects).toHaveMaxGeometryCount(100)
        expect(testCollection100Objects).toHaveMaxGeometryCount(100000)
        expect(testCollection100Objects).toHaveMaxGeometryCount(Infinity)
    })

    test('Empty Collection', () => {
        expect(emptyCollection).toHaveMaxGeometryCount()
        expect(emptyCollection).toHaveMaxGeometryCount(0)
        expect(emptyCollection).toHaveMaxGeometryCount(1)
        expect(emptyCollection).toHaveMaxGeometryCount(0.1)
        expect(emptyCollection).toHaveMaxGeometryCount(0.9)
    })

    test('Nested Collection Tests Only 1 Level Deep', () => {
        expect(nestedGeometryCollection).toHaveMaxGeometryCount(2)
        expect(nestedGeometryCollection).toHaveMaxGeometryCount(3)
    })
})

describe('Inalid Use Cases', () => {
    describe('Expect to fail with bad inputs:', () => {
        test.each([...invalidInputValues, 0])(
            'expect(%p).not.toHaveMaxGeometryCount()',
            (badInput) => {
                expect(badInput).not.toHaveMaxGeometryCount()
            }
        )
    })

    describe('Valid GeometryCollection With Bad MaxCount:', () => {
        test.each([...invalidInputValues])('MaxCount: %p', (badInput) => {
            expect(testCollectionFourObjects).not.toHaveMaxGeometryCount(badInput)
        })
    })

    describe('Valid GeometryCollection With Negative MaxCount:', () => {
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

            expect(testCollection).not.toHaveMaxGeometryCount(-1)
        })

        test('Known good GeometryCollection with 4 geometries', () => {
            expect(testCollectionFourObjects).not.toHaveMaxGeometryCount(-10)
            expect(testCollectionFourObjects).not.toHaveMaxGeometryCount(-0.001)
        })

        test('Known good GeometryCollection with 100 geometries', () => {
            expect(testCollection100Objects).not.toHaveMaxGeometryCount(-Infinity)
        })

        test('Empty Geometry', () => {
            expect(emptyCollection).not.toHaveMaxGeometryCount(-1)
        })
    })

    describe('Valid GeometryCollection With Out of Range MaxCount:', () => {
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

            expect(testCollection).not.toHaveMaxGeometryCount(0)
        })

        test('Known good GeometryCollection with 4 geometries', () => {
            expect(testCollectionFourObjects).not.toHaveMaxGeometryCount()
            expect(testCollectionFourObjects).not.toHaveMaxGeometryCount(2)
            expect(testCollectionFourObjects).not.toHaveMaxGeometryCount(3.9999)
        })

        test('Known good GeometryCollection with 100 geometries', () => {
            expect(testCollection100Objects).not.toHaveMaxGeometryCount(50)
            expect(testCollection100Objects).not.toHaveMaxGeometryCount(99.5)
        })

        test('Nested Collection Tests Only 1 Level Deep', () => {
            expect(nestedGeometryCollection).not.toHaveMaxGeometryCount()
            expect(nestedGeometryCollection).not.toHaveMaxGeometryCount(1)
        })
    })
})

describe('Error Snapshot Testing. Throws error:', () => {
    test('Valid use case passes', () => {
        expect(() =>
            expect(testCollectionFourObjects).not.toHaveMaxGeometryCount(5)
        ).toThrowErrorMatchingSnapshot()
    })

    test('Invalid input to matcher', () => {
        expect(() => expect(false).toHaveMaxGeometryCount()).toThrowErrorMatchingSnapshot()
    })

    test('MaxCount must be a number', () => {
        expect(() =>
            expect(testCollectionFourObjects).toHaveMaxGeometryCount('Some String')
        ).toThrowErrorMatchingSnapshot()
    })

    test('MaxCount is negative', () => {
        expect(() =>
            expect(testCollectionFourObjects).toHaveMaxGeometryCount(-1)
        ).toThrowErrorMatchingSnapshot()
    })

    test('Searching for wrong number of geometries', () => {
        expect(() =>
            expect(testCollectionFourObjects).toHaveMaxGeometryCount(3)
        ).toThrowErrorMatchingSnapshot()
    })

    test('No max count defined', () => {
        expect(() =>
            expect(testCollectionFourObjects).toHaveMaxGeometryCount()
        ).toThrowErrorMatchingSnapshot()
    })

    test('At least one geometry when no argument provided to MaxCount', () => {
        expect(() =>
            expect(emptyCollection).not.toHaveMaxGeometryCount()
        ).toThrowErrorMatchingSnapshot()
    })
})

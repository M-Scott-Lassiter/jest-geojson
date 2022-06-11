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

        expect(testCollection).toHaveGeometryCount()
        expect(testCollection).toHaveGeometryCount(1)
        expect(testCollection).toHaveGeometryCount(1, undefined)
        expect(testCollection).toHaveGeometryCount(undefined)
        expect(testCollection).toHaveGeometryCount(undefined, undefined)
        expect(testCollection).toHaveGeometryCount(1, 1)
        expect(testCollection).toHaveGeometryCount(1.2)
        expect(testCollection).toHaveGeometryCount(1.2, 2)
        expect(testCollection).toHaveGeometryCount(1, 2)
        expect(testCollection).toHaveGeometryCount(0, 20)
    })

    test('Known good GeometryCollection with 4 geometries', () => {
        expect(testCollectionFourObjects).toHaveGeometryCount()
        expect(testCollectionFourObjects).toHaveGeometryCount(4)
        expect(testCollectionFourObjects).toHaveGeometryCount(4, 4)
        expect(testCollectionFourObjects).toHaveGeometryCount(4, undefined)
        expect(testCollectionFourObjects).toHaveGeometryCount(3.999, 4)
        expect(testCollectionFourObjects).toHaveGeometryCount(4.999, 8)
        expect(testCollectionFourObjects).toHaveGeometryCount(2, 4)
        expect(testCollectionFourObjects).toHaveGeometryCount(2, 15)
        expect(testCollectionFourObjects).toHaveGeometryCount(0, 20)
    })

    test('Known good GeometryCollection with 100 geometries', () => {
        expect(testCollection100Objects).toHaveGeometryCount()
        expect(testCollection100Objects).toHaveGeometryCount(100)
        expect(testCollection100Objects).toHaveGeometryCount(100, 100)
        expect(testCollection100Objects).toHaveGeometryCount(49, 100000)
        expect(testCollection100Objects).toHaveGeometryCount(0, Infinity)
    })

    test('Empty Collection', () => {
        expect(emptyCollection).toHaveGeometryCount(0)
        expect(testCollection100Objects).toHaveGeometryCount(100)
        expect(testCollection100Objects).toHaveGeometryCount(100, 100)
        expect(testCollection100Objects).toHaveGeometryCount(49, 100000)
        expect(testCollection100Objects).toHaveGeometryCount(0, Infinity)
    })

    test('Nested Collection Has Only 1 Geometry', () => {
        expect(nestedGeometryCollection).toHaveGeometryCount()
        expect(nestedGeometryCollection).toHaveGeometryCount(2)
        expect(nestedGeometryCollection).not.toHaveGeometryCount(3, 100)
    })
})

describe('Inalid Use Cases', () => {
    describe('Expect to fail with bad inputs:', () => {
        test.each([...invalidInputValues, 0])(
            'expect(%p).not.toHaveGeometryCount()',
            (badInput) => {
                expect(badInput).not.toHaveGeometryCount()
            }
        )
    })

    describe('Valid GeometryCollection With Range1 and Range2 Problems:', () => {
        test('Valid Range2 less than valid Range1', () => {
            expect(testCollectionFourObjects).not.toHaveGeometryCount(2, 1)
        })

        test('Valid Range1 undefined and valid Range2', () => {
            expect(testCollectionFourObjects).not.toHaveGeometryCount(undefined, 5)
        })

        describe('Invalid Inputs to Range1 and Range2:', () => {
            test.each([...invalidInputValues])('Range1: %p', (badInput) => {
                expect(testCollectionFourObjects).not.toHaveGeometryCount(badInput, 10)
            })

            test.each([...invalidInputValues])('Range2: %p', (badInput) => {
                expect(testCollectionFourObjects).not.toHaveGeometryCount(5, badInput)
            })

            test.each([...invalidInputValues])('Range1 and Range2: %p', (badInput) => {
                // Checking for undefined looks for at least one geometry, so ignore that option
                if (badInput !== undefined) {
                    expect(testCollectionFourObjects).not.toHaveGeometryCount(badInput, badInput)
                }
            })
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

            expect(testCollection).not.toHaveGeometryCount(-1)
            expect(testCollection).not.toHaveGeometryCount(-1, undefined)
            expect(testCollection).not.toHaveGeometryCount(-10)
            expect(testCollection).not.toHaveGeometryCount(-Infinity)
        })

        test('Known good GeometryCollection with 4 geometries', () => {
            expect(testCollectionFourObjects).not.toHaveGeometryCount(-4)
            expect(testCollectionFourObjects).not.toHaveGeometryCount(-4, undefined)
            expect(testCollectionFourObjects).not.toHaveGeometryCount(-1, 5)
            expect(testCollectionFourObjects).not.toHaveGeometryCount(-2, -1)
            expect(testCollectionFourObjects).not.toHaveGeometryCount(-5, -1)
            expect(testCollectionFourObjects).not.toHaveGeometryCount(3, -1)
        })

        test('Empty Geometry', () => {
            expect(emptyCollection).not.toHaveGeometryCount(-1)
            expect(emptyCollection).not.toHaveGeometryCount(-1, 0)
            expect(emptyCollection).not.toHaveGeometryCount(-1, undefined)
            expect(emptyCollection).not.toHaveGeometryCount(-1, 2)
            expect(emptyCollection).not.toHaveGeometryCount(-2, -1)
            expect(emptyCollection).not.toHaveGeometryCount(-1, -2)
        })
    })

    describe('Valid GeometryCollection With Out of Range Range1 and Range2:', () => {
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

            expect(testCollection).not.toHaveGeometryCount(0)
            expect(testCollection).not.toHaveGeometryCount(2)
            expect(testCollection).not.toHaveGeometryCount(5, 10)
        })

        test('Known good GeometryCollection with 4 geometries', () => {
            expect(testCollectionFourObjects).not.toHaveGeometryCount(0)
            expect(testCollectionFourObjects).not.toHaveGeometryCount(2)
            expect(testCollectionFourObjects).not.toHaveGeometryCount(3.9999)
            expect(testCollectionFourObjects).not.toHaveGeometryCount(0, 3)
            expect(testCollectionFourObjects).not.toHaveGeometryCount(5, 10)
            expect(testCollectionFourObjects).not.toHaveGeometryCount(0, undefined)
        })

        test('Known good GeometryCollection with 100 geometries', () => {
            expect(testCollection100Objects).not.toHaveGeometryCount(0)
            expect(testCollection100Objects).not.toHaveGeometryCount(50)
            expect(testCollection100Objects).not.toHaveGeometryCount(99.5)
            expect(testCollection100Objects).not.toHaveGeometryCount(5, 10)
            expect(testCollection100Objects).not.toHaveGeometryCount(90, 99.999)
            expect(testCollection100Objects).not.toHaveGeometryCount(101, 1000)
            expect(testCollection100Objects).not.toHaveGeometryCount(0, undefined)
            expect(testCollection100Objects).not.toHaveGeometryCount(87, undefined)
        })

        test('Empty Geometry', () => {
            expect(emptyCollection).not.toHaveGeometryCount(1)
            expect(emptyCollection).not.toHaveGeometryCount(1, undefined)
            expect(emptyCollection).not.toHaveGeometryCount()
            expect(emptyCollection).not.toHaveGeometryCount(undefined)
            expect(emptyCollection).not.toHaveGeometryCount(1, 5)
        })
    })
})

describe('Error Snapshot Testing. Throws error:', () => {
    test('Valid use case passes', () => {
        expect(() =>
            expect(testCollectionFourObjects).not.toHaveGeometryCount(3, 5)
        ).toThrowErrorMatchingSnapshot()
    })

    test('Invalid input to matcher', () => {
        expect(() => expect(false).toHaveGeometryCount()).toThrowErrorMatchingSnapshot()
    })

    test('Valid Range2 less than valid Range1', () => {
        expect(() =>
            expect(testCollectionFourObjects).toHaveGeometryCount(2, 1)
        ).toThrowErrorMatchingSnapshot()
    })

    test('Valid Range1 undefined and valid Range2', () => {
        expect(() =>
            expect(testCollectionFourObjects).toHaveGeometryCount(undefined, 5)
        ).toThrowErrorMatchingSnapshot()
    })

    test('Range1 must be a number', () => {
        expect(() =>
            expect(testCollectionFourObjects).toHaveGeometryCount('Some String')
        ).toThrowErrorMatchingSnapshot()
    })

    test('Range2 must be a number', () => {
        expect(() =>
            expect(testCollectionFourObjects).toHaveGeometryCount(0, 'Some String')
        ).toThrowErrorMatchingSnapshot()
    })

    test('Range1 is negative', () => {
        expect(() =>
            expect(testCollectionFourObjects).toHaveGeometryCount(-1)
        ).toThrowErrorMatchingSnapshot()
    })

    test('Range2 is negative', () => {
        expect(() =>
            expect(testCollectionFourObjects).toHaveGeometryCount(1, -1)
        ).toThrowErrorMatchingSnapshot()
    })

    test('Out of range', () => {
        expect(() =>
            expect(testCollectionFourObjects).toHaveGeometryCount(5, 20)
        ).toThrowErrorMatchingSnapshot()
    })

    test('No objects in geometries', () => {
        expect(() => expect(emptyCollection).toHaveGeometryCount()).toThrowErrorMatchingSnapshot()
    })

    test('Searching for wrong number of geometries', () => {
        expect(() =>
            expect(testCollectionFourObjects).toHaveGeometryCount(3)
        ).toThrowErrorMatchingSnapshot()
    })

    test('At least one geometry when no argument provided to Range1', () => {
        expect(() =>
            expect(testCollectionFourObjects).not.toHaveGeometryCount()
        ).toThrowErrorMatchingSnapshot()
    })
})

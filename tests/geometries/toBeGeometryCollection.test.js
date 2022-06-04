const { goodGeometry, badGeometry, nestedGeometryCollection } = require('./data')

const goodGeometryCollection = {
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
    '',
    'Random Geometry',
    '[0, 0]',
    JSON.stringify({
        type: 'GeometryCollection',
        geometries: [
            {
                type: 'Point',
                coordinates: [100.0, 0.0]
            }
        ]
    })
]
const emptyArrays = [[[[]]], [[[], []]], [[{}, {}]], [{}]]
const incorrectTypeValues = [
    ...invalidInputValues,
    'Point',
    'MultiPoint',
    'LineString',
    'MultiLineString',
    'Polygon',
    'MultiPolygon',
    'Feature',
    'FeatureCollection',
    'GEOMETRYCOLLECTION',
    'geometrycollection'
]

describe('Valid Use Cases', () => {
    describe('Expect to pass with good geometries:', () => {
        test('Known Good Collection', () => {
            expect(goodGeometryCollection).toBeGeometryCollection()
            expect(goodGeometryCollection).toBeAnyGeometry()
            expect(goodGeometryCollection).toBeValidGeoJSON()
        })

        test('Point', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [goodGeometry.point]
            }
            expect(testGeometryCollection).toBeGeometryCollection()
            expect(testGeometryCollection).toBeAnyGeometry()
            expect(goodGeometryCollection).toBeValidGeoJSON()
        })

        test('MultiPoint', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [goodGeometry.multiPoint]
            }
            expect(testGeometryCollection).toBeGeometryCollection()
            expect(testGeometryCollection).toBeAnyGeometry()
            expect(goodGeometryCollection).toBeValidGeoJSON()
        })

        test('LineString', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [goodGeometry.lineString]
            }
            expect(testGeometryCollection).toBeGeometryCollection()
            expect(testGeometryCollection).toBeAnyGeometry()
            expect(goodGeometryCollection).toBeValidGeoJSON()
        })

        test('MultiLineString', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [goodGeometry.multiLineString]
            }
            expect(testGeometryCollection).toBeGeometryCollection()
            expect(testGeometryCollection).toBeAnyGeometry()
            expect(goodGeometryCollection).toBeValidGeoJSON()
        })

        test('Polygon', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [goodGeometry.polygon]
            }
            expect(testGeometryCollection).toBeGeometryCollection()
            expect(testGeometryCollection).toBeAnyGeometry()
            expect(goodGeometryCollection).toBeValidGeoJSON()
        })

        test('MultiPolygon', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [goodGeometry.multiPolygon]
            }
            expect(testGeometryCollection).toBeGeometryCollection()
            expect(testGeometryCollection).toBeAnyGeometry()
            expect(goodGeometryCollection).toBeValidGeoJSON()
        })

        test('All', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [
                    goodGeometry.point,
                    goodGeometry.multiPoint,
                    goodGeometry.lineString,
                    goodGeometry.multiLineString,
                    goodGeometry.polygon,
                    goodGeometry.multiPolygon
                ]
            }
            expect(testGeometryCollection).toBeGeometryCollection()
            expect(testGeometryCollection).toBeAnyGeometry()
            expect(goodGeometryCollection).toBeValidGeoJSON()
        })

        test('Nested GeometryCollections', () => {
            expect(nestedGeometryCollection).toBeGeometryCollection()
            expect(goodGeometryCollection).toBeAnyGeometry()
            expect(goodGeometryCollection).toBeValidGeoJSON()
        })

        test('Stress Test', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [goodGeometry.multiPolygon]
            }
            for (let i = 0; i < 10; i++) {
                testGeometryCollection.geometries.push(
                    goodGeometry.point,
                    goodGeometry.multiPoint,
                    goodGeometry.lineString,
                    goodGeometry.multiLineString,
                    goodGeometry.polygon,
                    goodGeometry.multiPolygon,
                    nestedGeometryCollection
                )
            }
            expect(testGeometryCollection).toBeGeometryCollection()
            expect(testGeometryCollection).toBeAnyGeometry()
            expect(goodGeometryCollection).toBeValidGeoJSON()
        })
    })

    describe('Foreign Properties', () => {
        test.each(['Test 1', 1, null])('ID: %p', (input) => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                id: input,
                geometries: [goodGeometry.point]
            }
            expect(testGeometryCollection).toBeGeometryCollection()
            expect(testGeometryCollection).toBeAnyGeometry()
            expect(goodGeometryCollection).toBeValidGeoJSON()
        })

        test('Multiple Foreign Properties', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                someRandomProp: true,
                geometries: [
                    {
                        type: 'Point',
                        coordinates: [5, 15]
                    }
                ],
                otherProp: [5, 15]
            }
            expect(testGeometryCollection).toBeGeometryCollection()
            expect(testGeometryCollection).toBeAnyGeometry()
            expect(goodGeometryCollection).toBeValidGeoJSON()
        })
    })

    test('Empty geometries', () => {
        const testGeometryCollection = {
            type: 'GeometryCollection',
            geometries: []
        }
        expect(testGeometryCollection).toBeGeometryCollection()
        expect(testGeometryCollection).toBeAnyGeometry()
        expect(goodGeometryCollection).toBeValidGeoJSON()
    })

    describe('Bounding Boxes Allowed, Must be Valid:', () => {
        test('2D Bounding Box', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [
                    {
                        type: 'Point',
                        coordinates: [0, 0]
                    }
                ],
                bbox: [-10.0, -10.0, 10.0, 10.0]
            }
            expect(testGeometryCollection).toBeGeometryCollection()
            expect(testGeometryCollection).toBeAnyGeometry()
            expect(goodGeometryCollection).toBeValidGeoJSON()
        })

        test('3D Bounding Box', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [
                    {
                        type: 'Point',
                        coordinates: [0, 0]
                    }
                ],
                bbox: [-10.0, -10.0, 10.0, 10.0]
            }
            expect(testGeometryCollection).toBeGeometryCollection()
            expect(testGeometryCollection).toBeAnyGeometry()
            expect(goodGeometryCollection).toBeValidGeoJSON()
        })

        test('Illogical Bounding Box', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [
                    {
                        type: 'Point',
                        coordinates: [0, 0]
                    }
                ],
                bbox: [-30.0, -30.0, -20.0, -20.0]
            }
            expect(testGeometryCollection).toBeGeometryCollection()
            expect(testGeometryCollection).toBeAnyGeometry()
            expect(goodGeometryCollection).toBeValidGeoJSON()
        })

        test('Redundant Bounding Box', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [
                    {
                        type: 'Point',
                        coordinates: [0, 0]
                    }
                ],
                bbox: [0, 0, 0, 0]
            }
            expect(testGeometryCollection).toBeGeometryCollection()
            expect(testGeometryCollection).toBeAnyGeometry()
            expect(goodGeometryCollection).toBeValidGeoJSON()
        })
    })

    describe('Coordinates Treated as Foreign Member:', () => {
        test.each([[0, 0], false, {}, 2, 'Coordinate String'])('coordinates: %p', (input) => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [
                    {
                        type: 'Point',
                        coordinates: [0, 0]
                    }
                ],
                coordinates: input
            }
            expect(testGeometryCollection).toBeGeometryCollection()
            expect(testGeometryCollection).toBeAnyGeometry()
            expect(goodGeometryCollection).toBeValidGeoJSON()
        })
    })
})

describe('Invalid Use Cases', () => {
    describe('Expect to fail with bad inputs:', () => {
        test.each([...invalidInputValues])(
            'expect(%p).not.toBeGeometryCollection()',
            (badInput) => {
                expect(badInput).not.toBeGeometryCollection()
                expect(badInput).not.toBeAnyGeometry()
                expect(badInput).not.toBeValidGeoJSON()
            }
        )
    })

    describe('Expect to fail with invalid geometries:', () => {
        test('Point', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [badGeometry.point]
            }
            expect(testGeometryCollection).not.toBeGeometryCollection()
            expect(testGeometryCollection).not.toBeAnyGeometry()
            expect(testGeometryCollection).not.toBeValidGeoJSON()
        })

        test('MultiPoint', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [badGeometry.multiPoint]
            }
            expect(testGeometryCollection).not.toBeGeometryCollection()
            expect(testGeometryCollection).not.toBeAnyGeometry()
            expect(testGeometryCollection).not.toBeValidGeoJSON()
        })

        test('LineString', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [badGeometry.lineString]
            }
            expect(testGeometryCollection).not.toBeGeometryCollection()
            expect(testGeometryCollection).not.toBeAnyGeometry()
            expect(testGeometryCollection).not.toBeValidGeoJSON()
        })

        test('MultiLineString', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [badGeometry.multiLineString]
            }
            expect(testGeometryCollection).not.toBeGeometryCollection()
            expect(testGeometryCollection).not.toBeAnyGeometry()
            expect(testGeometryCollection).not.toBeValidGeoJSON()
        })

        test('Polygon', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [badGeometry.polygon]
            }
            expect(testGeometryCollection).not.toBeGeometryCollection()
            expect(testGeometryCollection).not.toBeAnyGeometry()
            expect(testGeometryCollection).not.toBeValidGeoJSON()
        })

        test('MultiPolygon', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [badGeometry.multiPolygon]
            }
            expect(testGeometryCollection).not.toBeGeometryCollection()
            expect(testGeometryCollection).not.toBeAnyGeometry()
            expect(testGeometryCollection).not.toBeValidGeoJSON()
        })

        test('Unrecognized', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [badGeometry.unrecognized]
            }
            expect(testGeometryCollection).not.toBeGeometryCollection()
            expect(testGeometryCollection).not.toBeAnyGeometry()
            expect(testGeometryCollection).not.toBeValidGeoJSON()
        })

        test('All Bad', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [
                    badGeometry.point,
                    badGeometry.multiPoint,
                    badGeometry.lineString,
                    badGeometry.multiLineString,
                    badGeometry.polygon,
                    badGeometry.multiPolygon
                ]
            }
            expect(testGeometryCollection).not.toBeGeometryCollection()
            expect(testGeometryCollection).not.toBeAnyGeometry()
            expect(testGeometryCollection).not.toBeValidGeoJSON()
        })

        test('All Good With One Bad', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [
                    goodGeometry.point,
                    goodGeometry.multiPoint,
                    goodGeometry.lineString,
                    goodGeometry.multiLineString,
                    goodGeometry.polygon,
                    goodGeometry.multiPolygon,
                    badGeometry.point
                ]
            }
            expect(testGeometryCollection).not.toBeGeometryCollection()
            expect(testGeometryCollection).not.toBeAnyGeometry()
            expect(testGeometryCollection).not.toBeValidGeoJSON()
        })
    })

    describe('Expect to fail with geometries array of empty arrays:', () => {
        test.each([...emptyArrays])('coordinates: [%p]', (input) => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: input
            }
            expect(testGeometryCollection).not.toBeGeometryCollection()
            expect(testGeometryCollection).not.toBeAnyGeometry()
            expect(testGeometryCollection).not.toBeValidGeoJSON()
        })
    })

    describe('Expect to fail with bad type value:', () => {
        test.each([...incorrectTypeValues, ...invalidInputValues])('type: %p', (input) => {
            const testGeometryCollection = {
                type: input,
                geometries: [goodGeometry.point]
            }
            expect(testGeometryCollection).not.toBeGeometryCollection()
            expect(testGeometryCollection).not.toBeAnyGeometry()
            expect(testGeometryCollection).not.toBeValidGeoJSON()
        })
    })

    describe('Expect to fail when contains prohibited properties:', () => {
        test(`Contains: 'geometry'`, () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [
                    {
                        type: 'Point',
                        coordinates: [180, -90, 2000]
                    }
                ],
                geometry: {
                    type: 'Point',
                    coordinates: [102.0, 0.5]
                }
            }
            expect(testGeometryCollection).not.toBeGeometryCollection()
            expect(testGeometryCollection).not.toBeAnyGeometry()
            expect(testGeometryCollection).not.toBeValidGeoJSON()
        })

        test(`Contains: 'properties'`, () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [
                    {
                        type: 'Point',
                        coordinates: [0, 0, -2000]
                    }
                ],
                properties: {
                    prop1: true
                }
            }
            expect(testGeometryCollection).not.toBeGeometryCollection()
            expect(testGeometryCollection).not.toBeAnyGeometry()
            expect(testGeometryCollection).not.toBeValidGeoJSON()
        })

        test(`Contains: 'features'`, () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [
                    {
                        type: 'Point',
                        coordinates: [0, 0]
                    }
                ],
                features: [
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [102.0, 0.5]
                        },
                        properties: {
                            prop0: 'value0'
                        }
                    }
                ]
            }
            expect(testGeometryCollection).not.toBeGeometryCollection()
            expect(testGeometryCollection).not.toBeAnyGeometry()
            expect(testGeometryCollection).not.toBeValidGeoJSON()
        })
    })

    describe('Expect to fail when missing required properties:', () => {
        test(`Missing: 'type'`, () => {
            const testGeometryCollection = {
                geometries: [goodGeometry.point]
            }
            expect(testGeometryCollection).not.toBeGeometryCollection()
            expect(testGeometryCollection).not.toBeAnyGeometry()
            expect(testGeometryCollection).not.toBeValidGeoJSON()
        })

        test(`Missing: 'geometries'`, () => {
            const testGeometryCollection = {
                type: 'GeometryCollection'
            }
            expect(testGeometryCollection).not.toBeGeometryCollection()
            expect(testGeometryCollection).not.toBeAnyGeometry()
            expect(testGeometryCollection).not.toBeValidGeoJSON()
        })
    })

    describe('Invalid Bounding Boxes Not Allowed:', () => {
        const invalidBBoxes = [
            [null],
            [undefined],
            [[]],
            [[-10.0, -10.0, 10.0]],
            [[-10.0, -10.0, 190.0, 10.0]],
            [[-10.0, 10.0, 10.0, -10]],
            [[-10.0, -10.0, 0, 10, 10.0, '200']]
        ]
        test.each(invalidBBoxes)('bbox: %p', (input) => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [
                    {
                        type: 'Point',
                        coordinates: [180, -90, 2000]
                    }
                ],
                bbox: input
            }
            expect(testGeometryCollection).not.toBeGeometryCollection()
            expect(testGeometryCollection).not.toBeAnyGeometry()
            expect(testGeometryCollection).not.toBeValidGeoJSON()
        })
    })
})

describe('Error Snapshot Testing. Throws error:', () => {
    test('Valid use case passes', () => {
        expect(() =>
            expect({ type: 'GeometryCollection', geometries: [] }).not.toBeGeometryCollection()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Invalid input to matcher', () => {
        expect(() => expect(false).toBeGeometryCollection()).toThrowErrorMatchingSnapshot()
    })

    test('Has forbidden property: geometry', () => {
        const testGeometryCollection = {
            type: 'GeometryCollection',
            geometries: [],
            geometry: null
        }
        expect(() =>
            expect(testGeometryCollection).toBeGeometryCollection()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Has forbidden property: properties', () => {
        const testGeometryCollection = {
            type: 'GeometryCollection',
            geometries: [],
            properties: null
        }
        expect(() =>
            expect(testGeometryCollection).toBeGeometryCollection()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Has forbidden property: features', () => {
        const testGeometryCollection = {
            type: 'GeometryCollection',
            geometries: [],
            features: null
        }
        expect(() =>
            expect(testGeometryCollection).toBeGeometryCollection()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Bounding box must be valid', () => {
        const testGeometryCollection = {
            type: 'GeometryCollection',
            geometries: [],
            bbox: [0]
        }
        expect(() =>
            expect(testGeometryCollection).toBeGeometryCollection()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Missing geometries property', () => {
        const testGeometryCollection = {
            type: 'GeometryCollection'
        }
        expect(() =>
            expect(testGeometryCollection).toBeGeometryCollection()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Geometries not an array', () => {
        const testGeometryCollection = {
            type: 'GeometryCollection',
            geometries: false
        }
        expect(() =>
            expect(testGeometryCollection).toBeGeometryCollection()
        ).toThrowErrorMatchingSnapshot()
    })
})

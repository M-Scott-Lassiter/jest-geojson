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

const nestedGeometryCollection = {
    type: 'GeometryCollection',
    geometries: [
        {
            type: 'GeometryCollection',
            geometries: [
                {
                    type: 'GeometryCollection',
                    geometries: [
                        {
                            type: 'Point',
                            coordinates: [5, 15]
                        }
                    ]
                },
                {
                    type: 'Point',
                    coordinates: [10, 20]
                }
            ]
        },
        {
            type: 'Point',
            coordinates: [20, 25]
        }
    ]
}

const good = {
    point: {
        type: 'Point',
        coordinates: [100.0, 0.0]
    },
    multiPoint: {
        type: 'MultiPoint',
        coordinates: [
            [101.0, 0.0],
            [102.0, 1.0]
        ]
    },
    lineString: {
        type: 'LineString',
        coordinates: [
            [101.0, 0.0],
            [102.0, 1.0]
        ]
    },
    multiLineString: {
        type: 'MultiLineString',
        coordinates: [
            [
                [100.0, 0.0, 0],
                [101.0, 1.0, 0]
            ],
            [
                [102.0, 2.0, 0],
                [103.0, 3.0, 0]
            ]
        ]
    },
    polygon: {
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
    },
    multiPolygon: {
        type: 'MultiPolygon',
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
    }
}

const bad = {
    point: {
        type: 'Point',
        coordinates: [100.0, 0.0, 1, 1] // Too many values in coordinates
    },
    multiPoint: {
        type: 'MultiPoint',
        coordinates: [
            [101.0, 91], // Out of range latitude
            [102.0, 1.0]
        ]
    },
    lineString: {
        type: 'LineString',
        coordinates: [
            [101.0, '0.0'], // Non-numeric latitude
            [102.0, 1.0]
        ]
    },
    multiLineString: {
        type: 'MultiLineString',
        coordinates: [
            // Nested too deeply
            [
                [
                    [100.0, 0.0, 0],
                    [101.0, 1.0, 0]
                ],
                [
                    [102.0, 2.0, 0],
                    [103.0, 3.0, 0]
                ]
            ]
        ]
    },
    polygon: {
        type: 'Polygon',
        coordinates: [
            [
                [100.0, 0.0],
                [101.0, 0.0],
                [101.0, 1.0],
                [100.0, 1.0] // Last point doesn't match first
            ]
        ]
    },
    multiPolygon: {
        type: 'MultiPolygon',
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
                    [100.8, 0.2] // Last point doesn't match first
                ]
            ]
        ]
    },
    unrecognized: {
        type: 'UnrecognizedPoint', // Not a valid GeoJSON type
        coordinates: [100.0, 0.0]
    }
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
    'GEOMETRYCOLLECTION',
    'geometrycollection'
]

describe('Valid Use Cases', () => {
    describe('Expect to pass with good geometries:', () => {
        test('Known Good Collection', () => {
            expect(goodGeometryCollection).toBeGeometryCollection()
            expect(goodGeometryCollection).toBeAnyGeometry()
        })

        test('Point', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [good.point]
            }
            expect(testGeometryCollection).toBeGeometryCollection()
            expect(testGeometryCollection).toBeAnyGeometry()
        })

        test('MultiPoint', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [good.multiPoint]
            }
            expect(testGeometryCollection).toBeGeometryCollection()
            expect(testGeometryCollection).toBeAnyGeometry()
        })

        test('LineString', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [good.lineString]
            }
            expect(testGeometryCollection).toBeGeometryCollection()
            expect(testGeometryCollection).toBeAnyGeometry()
        })

        test('MultiLineString', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [good.multiLineString]
            }
            expect(testGeometryCollection).toBeGeometryCollection()
            expect(testGeometryCollection).toBeAnyGeometry()
        })

        test('Polygon', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [good.polygon]
            }
            expect(testGeometryCollection).toBeGeometryCollection()
            expect(testGeometryCollection).toBeAnyGeometry()
        })

        test('MultiPolygon', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [good.multiPolygon]
            }
            expect(testGeometryCollection).toBeGeometryCollection()
            expect(testGeometryCollection).toBeAnyGeometry()
        })

        test('All', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [
                    good.point,
                    good.multiPoint,
                    good.lineString,
                    good.multiLineString,
                    good.polygon,
                    good.multiPolygon
                ]
            }
            expect(testGeometryCollection).toBeGeometryCollection()
            expect(testGeometryCollection).toBeAnyGeometry()
        })

        test('Nested GeometryCollections', () => {
            expect(nestedGeometryCollection).toBeGeometryCollection()
            expect(goodGeometryCollection).toBeAnyGeometry()
        })

        test('Stress Test', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [good.multiPolygon]
            }
            for (let i = 0; i < 10; i++) {
                testGeometryCollection.geometries.push(
                    good.point,
                    good.multiPoint,
                    good.lineString,
                    good.multiLineString,
                    good.polygon,
                    good.multiPolygon,
                    nestedGeometryCollection
                )
            }
            expect(testGeometryCollection).toBeGeometryCollection()
            expect(testGeometryCollection).toBeAnyGeometry()
        })
    })

    describe('Foreign Properties', () => {
        test.each(['Test 1', 1, null])('ID: %p', (input) => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                id: input,
                geometries: [good.point]
            }
            expect(testGeometryCollection).toBeGeometryCollection()
            expect(testGeometryCollection).toBeAnyGeometry()
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
        })
    })

    test('Empty geometries', () => {
        const testGeometryCollection = {
            type: 'GeometryCollection',
            geometries: []
        }
        expect(testGeometryCollection).toBeGeometryCollection()
        expect(testGeometryCollection).toBeAnyGeometry()
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
        })
    })
})

describe('Inalid Use Cases', () => {
    describe('Expect to fail with bad inputs:', () => {
        test.each([...invalidInputValues])(
            'expect(%p).not.toBeGeometryCollection()',
            (badInput) => {
                expect(badInput).not.toBeGeometryCollection()
                expect(badInput).not.toBeAnyGeometry()
            }
        )
    })

    describe('Expect to fail with invalid geometries:', () => {
        test('Point', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [bad.point]
            }
            expect(testGeometryCollection).not.toBeGeometryCollection()
            expect(testGeometryCollection).not.toBeAnyGeometry()
        })

        test('MultiPoint', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [bad.multiPoint]
            }
            expect(testGeometryCollection).not.toBeGeometryCollection()
            expect(testGeometryCollection).not.toBeAnyGeometry()
        })

        test('LineString', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [bad.lineString]
            }
            expect(testGeometryCollection).not.toBeGeometryCollection()
            expect(testGeometryCollection).not.toBeAnyGeometry()
        })

        test('MultiLineString', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [bad.multiLineString]
            }
            expect(testGeometryCollection).not.toBeGeometryCollection()
            expect(testGeometryCollection).not.toBeAnyGeometry()
        })

        test('Polygon', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [bad.polygon]
            }
            expect(testGeometryCollection).not.toBeGeometryCollection()
            expect(testGeometryCollection).not.toBeAnyGeometry()
        })

        test('MultiPolygon', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [bad.multiPolygon]
            }
            expect(testGeometryCollection).not.toBeGeometryCollection()
            expect(testGeometryCollection).not.toBeAnyGeometry()
        })

        test('Unrecognized', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [bad.unrecognized]
            }
            expect(testGeometryCollection).not.toBeGeometryCollection()
            expect(testGeometryCollection).not.toBeAnyGeometry()
        })

        test('All Bad', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [
                    bad.point,
                    bad.multiPoint,
                    bad.lineString,
                    bad.multiLineString,
                    bad.polygon,
                    bad.multiPolygon
                ]
            }
            expect(testGeometryCollection).not.toBeGeometryCollection()
            expect(testGeometryCollection).not.toBeAnyGeometry()
        })

        test('All Good With One Bad', () => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: [
                    good.point,
                    good.multiPoint,
                    good.lineString,
                    good.multiLineString,
                    good.polygon,
                    good.multiPolygon,
                    bad.point
                ]
            }
            expect(testGeometryCollection).not.toBeGeometryCollection()
            expect(testGeometryCollection).not.toBeAnyGeometry()
        })
    })

    describe('Expect to fail with coordinates array of empty arrays:', () => {
        test.each([...emptyArrays])('coordinates: [%p]', (input) => {
            const testGeometryCollection = {
                type: 'GeometryCollection',
                geometries: input
            }
            expect(testGeometryCollection).not.toBeGeometryCollection()
            expect(testGeometryCollection).not.toBeAnyGeometry()
        })
    })

    describe('Expect to fail with bad type value:', () => {
        test.each([...incorrectTypeValues, ...invalidInputValues])('type: %p', (input) => {
            const testGeometryCollection = {
                type: input,
                geometries: [good.point]
            }
            expect(testGeometryCollection).not.toBeGeometryCollection()
            expect(testGeometryCollection).not.toBeAnyGeometry()
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
        })
    })

    describe('Expect to fail when missing required properties:', () => {
        test(`Missing: 'type'`, () => {
            const testGeometryCollection = {
                geometries: [good.point]
            }
            expect(testGeometryCollection).not.toBeGeometryCollection()
            expect(testGeometryCollection).not.toBeAnyGeometry()
        })

        test(`Missing: 'geometries'`, () => {
            const testGeometryCollection = {
                type: 'GeometryCollection'
            }
            expect(testGeometryCollection).not.toBeGeometryCollection()
            expect(testGeometryCollection).not.toBeAnyGeometry()
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
        })
    })
})

describe('Error Snapshot Testing. Throws error:', () => {
    test(`expect({type: 'GeometryCollection', geometries: []}).not.toBeGeometryCollection`, () => {
        expect(() =>
            expect({ type: 'GeometryCollection', geometries: [] }).not.toBeGeometryCollection()
        ).toThrowErrorMatchingSnapshot()
    })

    test('expect(false).toBeGeometryCollection()', () => {
        expect(() => expect(false).toBeGeometryCollection()).toThrowErrorMatchingSnapshot()
    })
})

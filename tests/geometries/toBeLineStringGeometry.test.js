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
        {
            coordinates: [
                [0, 0],
                [1, 1]
            ]
        }
    ],
    '',
    'Random Geometry',
    '[0, 0]',
    '[[0, 0], [0, 0]]',
    JSON.stringify({
        type: 'LineString',
        coordinates: [
            [25, 90],
            [2, 2]
        ]
    })
]
const coordinatesInRange = [
    [
        [
            [0, 1],
            [0, 2]
        ]
    ],
    [
        [
            [1, 0],
            [2, 0],
            [3, 0]
        ]
    ],
    [
        [
            [2, 20, 0],
            [4, 10, 0]
        ]
    ],
    [
        [
            [3, 0.0, 0],
            [6, -10, 0],
            [9, -20, 0]
        ]
    ],
    [
        [
            [100.0, 0.0],
            [90, 0.0, 0]
        ]
    ],
    [
        [
            [100.0, 0.0, 0],
            [110, 5],
            [100.0, 11.33, 259]
        ]
    ],
    [
        [
            [180.0, 40.0],
            [180.0, 50.0],
            [170.0, 50.0],
            [170.0, 40.0],
            [180.0, 40.0]
        ]
    ],
    [
        [
            [175, 0],
            [-175, 0]
        ]
    ],
    [
        [
            [-175, 0],
            [175, 0]
        ]
    ],
    [
        [
            [0, 0],
            [0, 0],
            [0, 0]
        ]
    ]
]
const coordinatesOutOfRange = [
    [
        [
            [0, 0],
            [181, 91]
        ]
    ],
    [
        [
            [0, 0],
            [181, -91]
        ]
    ],
    [
        [
            [0, 0],
            [-181, 91, 0]
        ]
    ],
    [
        [
            [0, 0],
            [-181, -91, 200]
        ]
    ],
    [[[0, 0, 0, 0]]]
]
const emptyArrays = [[[[]]], [[[], []]], [[[], [], []]]]
const incorrectTypeValues = [
    ...invalidInputValues,
    'Point',
    'MultiPoint',
    'MultiLineString',
    'Polygon',
    'MultiPolygon',
    'GeometryCollection',
    'Feature',
    'FeatureCollection',
    'LINESTRING',
    'linestring'
]

describe('Valid Use Cases', () => {
    describe('Basic Formatting, Values in Range:', () => {
        test.each([...coordinatesInRange])('Good in range coordinates: %p', (coordinateArray) => {
            const testLineString = {
                type: 'LineString',
                coordinates: coordinateArray
            }
            expect(testLineString).toBeLineStringGeometry()
            expect(testLineString).toBeAnyGeometry()
            expect(testLineString).toBeValidGeoJSON()
        })

        test('Empty coordinate', () => {
            const testLineString = {
                type: 'LineString',
                coordinates: []
            }
            expect(testLineString).toBeLineStringGeometry()
            expect(testLineString).toBeAnyGeometry()
            expect(testLineString).toBeValidGeoJSON()
        })

        test('Stress test with many points', () => {
            const testLineString = {
                type: 'LineString',
                coordinates: []
            }
            for (let i = 0; i < 30; i++) {
                testLineString.coordinates.push([i, i])
            }
            expect(testLineString).toBeLineStringGeometry()
            expect(testLineString).toBeAnyGeometry()
            expect(testLineString).toBeValidGeoJSON()
        })
    })

    describe('Foreign Properties Allowed:', () => {
        const testLineString1 = {
            type: 'LineString',
            id: null,
            coordinates: [
                [25, 90],
                [-180, 0]
            ]
        }
        const testLineString2 = {
            type: 'LineString',
            geometries: testLineString1,
            coordinates: [
                [-100.0, -15.0, 2000],
                [0, 0]
            ]
        }
        const testLineString3 = {
            type: 'LineString',
            someRandomProp: true,
            geometries: testLineString2,
            coordinates: [
                [180, 10.2, -125],
                [-180, -90]
            ]
        }

        test.each(['Test 1', 1])('ID: %p', (input) => {
            const testLineString = {
                type: 'LineString',
                id: input,
                coordinates: [
                    [25, 90],
                    [-180, 0]
                ]
            }
            expect(testLineString).toBeLineStringGeometry()
            expect(testLineString).toBeAnyGeometry()
            expect(testLineString).toBeValidGeoJSON()
        })

        test.each([testLineString1, testLineString2, testLineString3])(
            'Non-alphanumeric ID',
            (testLineString) => {
                expect(testLineString).toBeLineStringGeometry()
                expect(testLineString).toBeAnyGeometry()
                expect(testLineString).toBeValidGeoJSON()
            }
        )
    })

    describe('Bounding Boxes Allowed, Must be Valid:', () => {
        test('2D Bounding Box', () => {
            const testLineString = {
                type: 'LineString',
                coordinates: [
                    [0, 0],
                    [-5, -5]
                ],
                bbox: [-10.0, -10.0, 10.0, 10.0]
            }
            expect(testLineString).toBeLineStringGeometry()
            expect(testLineString).toBeAnyGeometry()
            expect(testLineString).toBeValidGeoJSON()
        })

        test('3D Bounding Box', () => {
            const testLineString = {
                type: 'LineString',
                coordinates: [
                    [0, 0],
                    [-5, -5]
                ],
                bbox: [-10.0, -10.0, 0, 10.0, 10.0, 200]
            }
            expect(testLineString).toBeLineStringGeometry()
            expect(testLineString).toBeAnyGeometry()
            expect(testLineString).toBeValidGeoJSON()
        })

        test('Illogical Bounding Box', () => {
            const testLineString = {
                type: 'LineString',
                coordinates: [
                    [0, 0],
                    [-5, -5]
                ],
                bbox: [-30.0, -30.0, -20.0, -20.0]
            }
            expect(testLineString).toBeLineStringGeometry()
            expect(testLineString).toBeAnyGeometry()
            expect(testLineString).toBeValidGeoJSON()
        })

        test('Redundant Bounding Box', () => {
            const testLineString = {
                type: 'LineString',
                coordinates: [
                    [0, 0],
                    [-5, -5]
                ],
                bbox: [0, 0, 0, 0]
            }
            expect(testLineString).toBeLineStringGeometry()
            expect(testLineString).toBeAnyGeometry()
            expect(testLineString).toBeValidGeoJSON()
        })
    })
})

describe('Inalid Use Cases', () => {
    describe('Expect to fail with bad inputs:', () => {
        test.each([...invalidInputValues])(
            'expect(%p).not.toBeLineStringGeometry()',
            (badInput) => {
                expect(badInput).not.toBeLineStringGeometry()
                expect(badInput).not.toBeAnyGeometry()
                expect(badInput).not.toBeValidGeoJSON()
            }
        )
    })

    describe('Expect to fail with out of range or bad coordinate:', () => {
        test.each([...coordinatesOutOfRange, ...invalidInputValues])(
            'coordinates: %p',
            (coordinate) => {
                const testLineString = {
                    type: 'LineString',
                    coordinates: coordinate
                }
                expect(testLineString).not.toBeLineStringGeometry()
                expect(testLineString).not.toBeAnyGeometry()
                expect(testLineString).not.toBeValidGeoJSON()
            }
        )
    })

    describe('Expect to fail with one bad coordinate:', () => {
        // Add the extra empty array here. "coordinates" can be an empty array, but individual elements within cannot.
        test.each([...invalidInputValues, []])('coordinates: [[0, 0], %p]', (coordinate) => {
            const testLineString = {
                type: 'LineString',
                coordinates: [[0, 0], coordinate]
            }
            expect(testLineString).not.toBeLineStringGeometry()
            expect(testLineString).not.toBeAnyGeometry()
            expect(testLineString).not.toBeValidGeoJSON()
        })
    })

    describe('Expect to fail with only a single coordinate:', () => {
        test('coordinates: [[0, 0]]', () => {
            const testLineString = {
                type: 'LineString',
                coordinates: [[0, 0]]
            }
            expect(testLineString).not.toBeLineStringGeometry()
            expect(testLineString).not.toBeAnyGeometry()
            expect(testLineString).not.toBeValidGeoJSON()
        })
    })

    describe('Expect to fail with coordinates array of empty arrays:', () => {
        test.each([...emptyArrays])('coordinates: %p', (coordinate) => {
            const testLineString = {
                type: 'LineString',
                coordinates: coordinate
            }
            expect(testLineString).not.toBeLineStringGeometry()
            expect(testLineString).not.toBeAnyGeometry()
            expect(testLineString).not.toBeValidGeoJSON()
        })
    })

    describe('Expect to fail with bad type value:', () => {
        test.each([...incorrectTypeValues, ...invalidInputValues])('type: %p', (input) => {
            const testLineString = {
                type: input,
                coordinates: [
                    [0, 0],
                    [1, 1, 0]
                ]
            }
            expect(testLineString).not.toBeLineStringGeometry()
            // No anyGeometry here because some of these match the same formats
        })
    })

    describe('Expect to fail when contains prohibited properties:', () => {
        test(`Contains: 'geometry'`, () => {
            const testLineString = {
                type: 'LineString',
                coordinates: [
                    [0, 0],
                    [1, 1, 0]
                ],
                geometry: {
                    type: 'Point',
                    coordinates: [102.0, 0.5]
                }
            }

            expect(testLineString).not.toBeLineStringGeometry()
            expect(testLineString).not.toBeAnyGeometry()
            expect(testLineString).not.toBeValidGeoJSON()
        })

        test(`Contains: 'properties'`, () => {
            const testLineString = {
                type: 'LineString',
                coordinates: [
                    [0, 0],
                    [1, 1, 0]
                ],
                properties: {
                    prop1: true
                }
            }

            expect(testLineString).not.toBeLineStringGeometry()
            expect(testLineString).not.toBeAnyGeometry()
            expect(testLineString).not.toBeValidGeoJSON()
        })

        test(`Contains: 'features'`, () => {
            const testLineString = {
                type: 'LineString',
                coordinates: [
                    [0, 0],
                    [1, 1, 0]
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
            expect(testLineString).not.toBeLineStringGeometry()
            expect(testLineString).not.toBeAnyGeometry()
            expect(testLineString).not.toBeValidGeoJSON()
        })
    })

    describe('Expect to fail when missing required properties:', () => {
        test(`Missing: 'type'`, () => {
            const testLineString = {
                coordinates: [
                    [0, 0],
                    [1, 1, 0]
                ]
            }
            expect(testLineString).not.toBeLineStringGeometry()
            expect(testLineString).not.toBeAnyGeometry()
            expect(testLineString).not.toBeValidGeoJSON()
        })
        test(`Missing: 'coordinates'`, () => {
            const testLineString = {
                type: 'LineString'
            }
            expect(testLineString).not.toBeLineStringGeometry()
            expect(testLineString).not.toBeAnyGeometry()
            expect(testLineString).not.toBeValidGeoJSON()
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
            const testLineString = {
                type: 'LineString',
                coordinates: [
                    [0, 0],
                    [1, 1, 0]
                ],
                bbox: input
            }
            expect(testLineString).not.toBeLineStringGeometry()
            expect(testLineString).not.toBeAnyGeometry()
            expect(testLineString).not.toBeValidGeoJSON()
        })
    })
})

describe('Error Snapshot Testing. Throws error:', () => {
    test('Valid use case passes', () => {
        expect(() =>
            expect({
                type: 'LineString',
                coordinates: [
                    [0, 0],
                    [1, 1]
                ]
            }).not.toBeLineStringGeometry()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Invalid input to matcher', () => {
        expect(() => expect(false).toBeLineStringGeometry()).toThrowErrorMatchingSnapshot()
    })

    test('Has forbidden property: geometry', () => {
        const testLineString = {
            type: 'LineString',
            coordinates: [
                [0, 0],
                [1, 1]
            ],
            geometry: null
        }
        expect(() => expect(testLineString).toBeLineStringGeometry()).toThrowErrorMatchingSnapshot()
    })

    test('Has forbidden property: properties', () => {
        const testLineString = {
            type: 'LineString',
            coordinates: [
                [0, 0],
                [1, 1]
            ],
            properties: null
        }
        expect(() => expect(testLineString).toBeLineStringGeometry()).toThrowErrorMatchingSnapshot()
    })

    test('Has forbidden property: features', () => {
        const testLineString = {
            type: 'LineString',
            coordinates: [
                [0, 0],
                [1, 1]
            ],
            features: null
        }
        expect(() => expect(testLineString).toBeLineStringGeometry()).toThrowErrorMatchingSnapshot()
    })

    test('Bounding box must be valid', () => {
        const testLineString = {
            type: 'LineString',
            coordinates: [
                [0, 0],
                [1, 1]
            ],
            bbox: [0]
        }
        expect(() => expect(testLineString).toBeLineStringGeometry()).toThrowErrorMatchingSnapshot()
    })

    test('Missing coordinates property', () => {
        const testLineString = {
            type: 'LineString'
        }
        expect(() => expect(testLineString).toBeLineStringGeometry()).toThrowErrorMatchingSnapshot()
    })

    test('Coordinates not an array', () => {
        const testLineString = {
            type: 'LineString',
            coordinates: false
        }
        expect(() => expect(testLineString).toBeLineStringGeometry()).toThrowErrorMatchingSnapshot()
    })
})

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
        type: 'Point',
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
    'LINESTRING',
    'linestring'
]

describe('Valid Use Cases', () => {
    describe('Basic Formatting, Values in Range:', () => {
        test.each([...coordinatesInRange])('Good in range coordinates: %p', (coordinateArray) => {
            const testMultiPoint = {
                type: 'LineString',
                coordinates: coordinateArray
            }
            expect(testMultiPoint).toBeLineStringGeometry()
        })

        test('Empty coordinate', () => {
            const testMultiPoint = {
                type: 'LineString',
                coordinates: []
            }
            expect(testMultiPoint).toBeLineStringGeometry()
        })

        test('Stress test with many points', () => {
            const testMultiPoint = {
                type: 'LineString',
                coordinates: []
            }
            for (let i = 0; i < 30; i++) {
                testMultiPoint.coordinates.push([i, i])
            }
            expect(testMultiPoint).toBeLineStringGeometry()
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
        })

        test.each([testLineString1, testLineString2, testLineString3])(
            'Non-alphanumeric ID',
            (testLineString) => {
                expect(testLineString).toBeLineStringGeometry()
            }
        )
    })
})

describe('Inalid Use Cases', () => {
    describe('Expect to fail with bad inputs:', () => {
        test.each([...invalidInputValues])(
            'expect(%p).not.toBeLineStringGeometry()',
            (badInput) => {
                expect(badInput).not.toBeLineStringGeometry()
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
        })
    })

    describe('Expect to fail with only a single coordinate:', () => {
        test('coordinates: [[0, 0]]', () => {
            const testLineString = {
                type: 'LineString',
                coordinates: [[0, 0]]
            }
            expect(testLineString).not.toBeLineStringGeometry()
        })
    })

    describe('Expect to fail with coordinates array of empty arrays:', () => {
        test.each([...emptyArrays])('coordinates: %p', (coordinate) => {
            const testLineString = {
                type: 'LineString',
                coordinates: coordinate
            }
            expect(testLineString).not.toBeLineStringGeometry()
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
        })
        test(`Missing: 'coordinates'`, () => {
            const testLineString = {
                type: 'LineString'
            }
            expect(testLineString).not.toBeLineStringGeometry()
        })
    })
})

describe('Error Snapshot Testing. Throws error:', () => {
    test(`expect({type: 'LineString', coordinates: [[0, 0], [1, 1]]}).not.toBeLineStringGeometry`, () => {
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
    test('expect(false).toBeLineStringGeometry()', () => {
        expect(() => expect(false).toBeLineStringGeometry()).toThrowErrorMatchingSnapshot()
    })
})

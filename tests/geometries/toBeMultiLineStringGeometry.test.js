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
            [
                [0, 0],
                [1, 1]
            ]
        ]
    ],
    '',
    'Random Geometry',
    '[0, 0]',
    '[[[0, 0], [0, 0]]]',
    JSON.stringify({
        type: 'MultiLineString',
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
        ],
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
        ],
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
        ],
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
        ],
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
        ],
        [
            [0, 0],
            [181, -91]
        ]
    ],
    [
        [
            [0, 0],
            [-181, 91, 0]
        ],
        [
            [0, 0],
            [-181, -91, 200]
        ]
    ],
    [[[0, 0, 0, 0]]]
]
const emptyArrays = [[[[[]]]], [[[[], []]]], [[[[], [], []]]]]
const incorrectTypeValues = [
    ...invalidInputValues,
    'Point',
    'MultiPoint',
    'LineString',
    'Polygon',
    'MultiPolygon',
    'GeometryCollection',
    'Feature',
    'FeatureCollection',
    'MULTILINESTRING',
    'multilinestring'
]

describe('Valid Use Cases', () => {
    describe('Basic Formatting, Values in Range:', () => {
        test.each([...coordinatesInRange])('Good in range coordinates: %p', (coordinateArray) => {
            const testMultiLineString = {
                type: 'MultiLineString',
                coordinates: [coordinateArray]
            }
            expect(testMultiLineString).toBeMultiLineStringGeometry()
            expect(testMultiLineString).toBeAnyGeometry()
        })

        test('Empty coordinate', () => {
            const testMultiLineString = {
                type: 'MultiLineString',
                coordinates: []
            }
            expect(testMultiLineString).toBeMultiLineStringGeometry()
            expect(testMultiLineString).toBeAnyGeometry()
        })

        test('Stress test with many points in many linestrings', () => {
            const testMultiLineString = {
                type: 'MultiLineString',
                coordinates: []
            }
            for (let i = 0; i < 30; i++) {
                testMultiLineString.coordinates.push([])
                for (let j = 0; j < 30; j++) {
                    testMultiLineString.coordinates[i].push([j, j])
                }
            }
            expect(testMultiLineString).toBeMultiLineStringGeometry()
            expect(testMultiLineString).toBeAnyGeometry()
        })
    })

    describe('Foreign Properties Allowed:', () => {
        const testMultiLineString1 = {
            type: 'MultiLineString',
            id: null,
            coordinates: [
                [
                    [25, 90],
                    [-180, 0]
                ]
            ]
        }
        const testMultiLineString2 = {
            type: 'MultiLineString',
            geometries: testMultiLineString1,
            coordinates: [
                [
                    [-100.0, -15.0, 2000],
                    [0, 0]
                ]
            ]
        }
        const testMultiLineString3 = {
            type: 'MultiLineString',
            someRandomProp: true,
            geometries: testMultiLineString2,
            coordinates: [
                [
                    [180, 10.2, -125],
                    [-180, -90]
                ]
            ]
        }

        test.each(['Test 1', 1])('ID: %p', (input) => {
            const testMultiLineString = {
                type: 'MultiLineString',
                id: input,
                coordinates: [
                    [
                        [25, 90],
                        [-180, 0]
                    ]
                ]
            }
            expect(testMultiLineString).toBeMultiLineStringGeometry()
            expect(testMultiLineString).toBeAnyGeometry()
        })

        test.each([testMultiLineString1, testMultiLineString2, testMultiLineString3])(
            'Non-alphanumeric ID',
            (testMultiLineString) => {
                expect(testMultiLineString).toBeMultiLineStringGeometry()
                expect(testMultiLineString).toBeAnyGeometry()
            }
        )
    })

    describe('Bounding Boxes Allowed, Must be Valid:', () => {
        test('2D Bounding Box', () => {
            const testMultiLineString = {
                type: 'MultiLineString',
                coordinates: [
                    [
                        [0, 0],
                        [-5, -5]
                    ]
                ],
                bbox: [-10.0, -10.0, 10.0, 10.0]
            }
            expect(testMultiLineString).toBeMultiLineStringGeometry()
            expect(testMultiLineString).toBeAnyGeometry()
        })

        test('3D Bounding Box', () => {
            const testMultiLineString = {
                type: 'MultiLineString',
                coordinates: [
                    [
                        [0, 0],
                        [-5, -5]
                    ]
                ],
                bbox: [-10.0, -10.0, 0, 10.0, 10.0, 200]
            }
            expect(testMultiLineString).toBeMultiLineStringGeometry()
            expect(testMultiLineString).toBeAnyGeometry()
        })

        test('Illogical Bounding Box', () => {
            const testMultiLineString = {
                type: 'MultiLineString',
                coordinates: [
                    [
                        [0, 0],
                        [-5, -5]
                    ]
                ],
                bbox: [-30.0, -30.0, -20.0, -20.0]
            }
            expect(testMultiLineString).toBeMultiLineStringGeometry()
            expect(testMultiLineString).toBeAnyGeometry()
        })

        test('Redundant Bounding Box', () => {
            const testMultiLineString = {
                type: 'MultiLineString',
                coordinates: [
                    [
                        [0, 0],
                        [-5, -5]
                    ]
                ],
                bbox: [0, 0, 0, 0]
            }
            expect(testMultiLineString).toBeMultiLineStringGeometry()
            expect(testMultiLineString).toBeAnyGeometry()
        })
    })
})

describe('Inalid Use Cases', () => {
    describe('Expect to fail with bad inputs:', () => {
        test.each([...invalidInputValues])(
            'expect(%p).not.toBeMultiLineStringGeometry()',
            (badInput) => {
                expect(badInput).not.toBeMultiLineStringGeometry()
                expect(badInput).not.toBeAnyGeometry()
            }
        )
    })

    describe('Expect to fail with out of range or bad coordinate:', () => {
        test.each([...coordinatesOutOfRange, ...invalidInputValues])(
            'coordinates: %p',
            (coordinate) => {
                const testMultiLineString = {
                    type: 'MultiLineString',
                    coordinates: coordinate
                }
                expect(testMultiLineString).not.toBeMultiLineStringGeometry()
                expect(testMultiLineString).not.toBeAnyGeometry()
            }
        )
    })

    describe('Expect to fail with one bad coordinate:', () => {
        // Add the extra empty array here. "coordinates" can be an empty array, but individual elements within cannot.
        test.each([...invalidInputValues, []])('coordinates: [[[0, 0], %p]]]', (coordinate) => {
            const testMultiLineString = {
                type: 'MultiLineString',
                coordinates: [[[0, 0], coordinate]]
            }
            expect(testMultiLineString).not.toBeMultiLineStringGeometry()
            expect(testMultiLineString).not.toBeAnyGeometry()
        })
    })

    describe('Expect to fail with only a single coordinate:', () => {
        test('coordinates: [[0, 0]]', () => {
            const testMultiLineString = {
                type: 'MultiLineString',
                coordinates: [[[0, 0]]]
            }
            expect(testMultiLineString).not.toBeMultiLineStringGeometry()
            expect(testMultiLineString).not.toBeAnyGeometry()
        })
    })

    describe('Expect to fail with coordinates array of empty arrays:', () => {
        test.each([...emptyArrays])('coordinates: %p', (coordinate) => {
            const testMultiLineString = {
                type: 'MultiLineString',
                coordinates: [coordinate]
            }
            expect(testMultiLineString).not.toBeMultiLineStringGeometry()
            expect(testMultiLineString).not.toBeAnyGeometry()
        })
    })

    describe('Expect to fail with bad type value:', () => {
        test.each([...incorrectTypeValues, ...invalidInputValues])('type: %p', (input) => {
            const testMultiLineString = {
                type: input,
                coordinates: [
                    [
                        [0, 0],
                        [1, 1, 0]
                    ]
                ]
            }
            expect(testMultiLineString).not.toBeMultiLineStringGeometry()
            // No anyGeometry here because some of these match the same formats
        })
    })

    describe('Expect to fail when contains prohibited properties:', () => {
        test(`Contains: 'geometry'`, () => {
            const testMultiLineString = {
                type: 'MultiLineString',
                coordinates: [
                    [
                        [0, 0],
                        [1, 1, 0]
                    ]
                ],
                geometry: {
                    type: 'Point',
                    coordinates: [102.0, 0.5]
                }
            }
            expect(testMultiLineString).not.toBeMultiLineStringGeometry()
            expect(testMultiLineString).not.toBeAnyGeometry()
        })

        test(`Contains: 'properties'`, () => {
            const testMultiLineString = {
                type: 'MultiLineString',
                coordinates: [
                    [
                        [0, 0],
                        [1, 1, 0]
                    ]
                ],
                properties: {
                    prop1: true
                }
            }
            expect(testMultiLineString).not.toBeMultiLineStringGeometry()
            expect(testMultiLineString).not.toBeAnyGeometry()
        })

        test(`Contains: 'features'`, () => {
            const testMultiLineString = {
                type: 'MultiLineString',
                coordinates: [
                    [
                        [0, 0],
                        [1, 1, 0]
                    ]
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
            expect(testMultiLineString).not.toBeMultiLineStringGeometry()
            expect(testMultiLineString).not.toBeAnyGeometry()
        })
    })

    describe('Expect to fail when missing required properties:', () => {
        test(`Missing: 'type'`, () => {
            const testMultiLineString = {
                coordinates: [
                    [
                        [0, 0],
                        [1, 1, 0]
                    ]
                ]
            }
            expect(testMultiLineString).not.toBeMultiLineStringGeometry()
            expect(testMultiLineString).not.toBeAnyGeometry()
        })

        test(`Missing: 'coordinates'`, () => {
            const testMultiLineString = {
                type: 'MultiLineString'
            }
            expect(testMultiLineString).not.toBeMultiLineStringGeometry()
            expect(testMultiLineString).not.toBeAnyGeometry()
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
            const testMultiLineString = {
                type: 'MultiLineString',
                coordinates: [
                    [
                        [0, 0],
                        [-5, -5]
                    ]
                ],
                bbox: input
            }
            expect(testMultiLineString).not.toBePointGeometry()
            expect(testMultiLineString).not.toBeAnyGeometry()
        })
    })
})

describe('Error Snapshot Testing. Throws error:', () => {
    test('Valid use case passes', () => {
        expect(() =>
            expect({
                type: 'MultiLineString',
                coordinates: [
                    [
                        [0, 0],
                        [1, 1]
                    ]
                ]
            }).not.toBeMultiLineStringGeometry()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Invalid input to matcher', () => {
        expect(() => expect(false).toBeMultiLineStringGeometry()).toThrowErrorMatchingSnapshot()
    })

    test('Has forbidden property: geometry', () => {
        const testMultiLineString = {
            type: 'MultiLineString',
            coordinates: [
                [
                    [0, 0],
                    [1, 1]
                ]
            ],
            geometry: null
        }
        expect(() =>
            expect(testMultiLineString).toBeMultiLineStringGeometry()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Has forbidden property: properties', () => {
        const testMultiLineString = {
            type: 'MultiLineString',
            coordinates: [
                [
                    [0, 0],
                    [1, 1]
                ]
            ],
            properties: null
        }
        expect(() =>
            expect(testMultiLineString).toBeMultiLineStringGeometry()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Has forbidden property: features', () => {
        const testMultiLineString = {
            type: 'MultiLineString',
            coordinates: [
                [
                    [0, 0],
                    [1, 1]
                ]
            ],
            features: null
        }
        expect(() =>
            expect(testMultiLineString).toBeMultiLineStringGeometry()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Bounding box must be valid', () => {
        const testMultiLineString = {
            type: 'MultiLineString',
            coordinates: [
                [
                    [0, 0],
                    [1, 1]
                ]
            ],
            bbox: [0]
        }
        expect(() =>
            expect(testMultiLineString).toBeMultiLineStringGeometry()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Missing coordinates property', () => {
        const testMultiLineString = {
            type: 'MultiLineString'
        }
        expect(() =>
            expect(testMultiLineString).toBeMultiLineStringGeometry()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Coordinates not an array', () => {
        const testMultiLineString = {
            type: 'MultiLineString',
            coordinates: false
        }
        expect(() =>
            expect(testMultiLineString).toBeMultiLineStringGeometry()
        ).toThrowErrorMatchingSnapshot()
    })
})

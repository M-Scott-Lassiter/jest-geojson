const genericMultiPolygonExample = {
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

const clockwiseBox = [
    [0, 0],
    [0, 1],
    [1, 1, 0],
    [1, 0, 0],
    [0, 0]
]
const counterClockwiseBox = [
    [0, 0],
    [1, 0, 0],
    [1, 1, 0],
    [0, 1],
    [0, 0]
]
const clockwiseHole = [
    [0.2, 0.2, 0],
    [0.2, 0.8],
    [0.8, 0.8],
    [0.8, 0.2, 0],
    [0.2, 0.2, 0]
]
const counterClockwiseHole = [
    [0.2, 0.2],
    [0.8, 0.2, 0],
    [0.8, 0.8, 0],
    [0.2, 0.8],
    [0.2, 0.2]
]

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
            coordinates: [clockwiseBox]
        }
    ],
    [[1, 1]],
    '',
    'Random Geometry',
    '[0, 0]',
    '[[[[0, 0], [0, 0]]]]',
    JSON.stringify({
        type: 'MultiPolygon',
        coordinates: [[clockwiseBox]]
    })
]

const coordinatesOutOfRange = [
    [
        [
            [181, 0],
            [0, 1],
            [1, 1],
            [1, 0],
            [181, 0]
        ]
    ],
    [
        [
            [0, 0],
            [0, 91],
            [1, 1],
            [1, 0],
            [0, 0]
        ]
    ],
    [
        [
            [0, 0],
            [0, 1],
            [-181, 1],
            [1, 0],
            [0, 0]
        ]
    ],
    [
        [
            [0, -181],
            [0, 1],
            [1, 1],
            [1, 0],
            [0, -181]
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
    'MultiLineString',
    'Polygon',
    'GeometryCollection',
    'Feature',
    'FeatureCollection',
    'MULTIPOLYGON',
    'multipolygon'
]

describe('Valid Use Cases', () => {
    describe('Basic Formatting, Values in Range:', () => {
        test('Complex generic example works', () => {
            expect(genericMultiPolygonExample).toBeMultiPolygonGeometry()
            expect(genericMultiPolygonExample).toBeAnyGeometry()
        })

        test('Good in range counterclockwise coordinates: %p', () => {
            const testMultiPolygon = {
                type: 'MultiPolygon',
                coordinates: [[counterClockwiseBox]]
            }
            expect(testMultiPolygon).toBeMultiPolygonGeometry()
            expect(testMultiPolygon).toBeAnyGeometry()
        })

        test('Good in range clockwise coordinates: %p', () => {
            const testMultiPolygon = {
                type: 'MultiPolygon',
                coordinates: [[clockwiseBox]]
            }
            expect(testMultiPolygon).toBeMultiPolygonGeometry()
            expect(testMultiPolygon).toBeAnyGeometry()
        })

        test('Good in range counterclockwise exterior with clockwise hole: %p', () => {
            const testMultiPolygon = {
                type: 'MultiPolygon',
                coordinates: [[[...counterClockwiseBox], [...clockwiseHole]]]
            }
            expect(testMultiPolygon).toBeMultiPolygonGeometry()
            expect(testMultiPolygon).toBeAnyGeometry()
        })

        test('Good in range counterclockwise exterior with counterclockwise hole: %p', () => {
            const testMultiPolygon = {
                type: 'MultiPolygon',
                coordinates: [[[...counterClockwiseBox], [...counterClockwiseHole]]]
            }
            expect(testMultiPolygon).toBeMultiPolygonGeometry()
            expect(testMultiPolygon).toBeAnyGeometry()
        })

        test('Good in range clockwise exterior with clockwise hole: %p', () => {
            const testMultiPolygon = {
                type: 'MultiPolygon',
                coordinates: [[[...clockwiseBox], [...clockwiseHole]]]
            }
            expect(testMultiPolygon).toBeMultiPolygonGeometry()
            expect(testMultiPolygon).toBeAnyGeometry()
        })

        test('Good in range clockwise exterior with counterclockwise hole: %p', () => {
            const testMultiPolygon = {
                type: 'MultiPolygon',
                coordinates: [[[...clockwiseBox], [...counterClockwiseHole]]]
            }
            expect(testMultiPolygon).toBeMultiPolygonGeometry()
            expect(testMultiPolygon).toBeAnyGeometry()
        })

        test('Empty coordinate', () => {
            const testMultiPolygon = {
                type: 'MultiPolygon',
                coordinates: []
            }
            expect(testMultiPolygon).toBeMultiPolygonGeometry()
            expect(testMultiPolygon).toBeAnyGeometry()
        })

        test('Cutting the antimeridian', () => {
            const testMultiPolygon = {
                type: 'MultiPolygon',
                coordinates: [
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
                            [-170.0, 40.0],
                            [-170.0, 50.0],
                            [-180.0, 50.0],
                            [-180.0, 40.0],
                            [-170.0, 40.0]
                        ]
                    ]
                ]
            }
            expect(testMultiPolygon).toBeMultiPolygonGeometry()
            expect(testMultiPolygon).toBeAnyGeometry()
        })

        test('Spanning the antimeridian', () => {
            // Note that this is just an assumed span. Without a bounding box, there
            // is no way for GeoJSON to know that this would span the antimeridian
            // and not 340 degrees of longitude.
            const points = [
                [170, 40],
                [-170, 40],
                [-170, 50],
                [170, 50],
                [170, 40]
            ]
            const testMultiPolygon = {
                type: 'MultiPolygon',
                coordinates: [[points]]
            }
            expect(testMultiPolygon).toBeMultiPolygonGeometry()
            expect(testMultiPolygon).toBeAnyGeometry()
        })

        test('Stress test with many points in many holes', () => {
            const testMultiPolygon = {
                type: 'MultiPolygon',
                coordinates: []
            }
            for (let i = 0; i < 30; i++) {
                testMultiPolygon.coordinates.push([])
                for (let j = 0; j < 30; j++) {
                    testMultiPolygon.coordinates[i].push([])
                    for (let k = 0; k < 30; k++) {
                        testMultiPolygon.coordinates[i][j].push([k, k])
                    }
                    testMultiPolygon.coordinates[i][j].push([0, 0])
                }
            }
            expect(testMultiPolygon).toBeMultiPolygonGeometry()
            expect(testMultiPolygon).toBeAnyGeometry()
        })
    })

    describe('Foreign Properties Allowed:', () => {
        const testMultiPolygon1 = {
            type: 'MultiPolygon',
            id: null,
            coordinates: [[counterClockwiseBox]]
        }
        const testMultiPolygon2 = {
            type: 'MultiPolygon',
            geometries: testMultiPolygon1,
            coordinates: [[counterClockwiseBox]]
        }
        const testMultiPolygon3 = {
            type: 'MultiPolygon',
            someRandomProp: true,
            geometries: testMultiPolygon2,
            coordinates: [[counterClockwiseBox]]
        }

        test.each(['Test 1', 1])('ID: %p', (input) => {
            const testMultiPolygon = {
                type: 'MultiPolygon',
                id: input,
                coordinates: [[counterClockwiseBox]]
            }
            expect(testMultiPolygon).toBeMultiPolygonGeometry()
            expect(testMultiPolygon).toBeAnyGeometry()
        })

        test.each([testMultiPolygon1, testMultiPolygon2, testMultiPolygon3])(
            'Non-alphanumeric ID',
            (testMultiPolygon) => {
                expect(testMultiPolygon).toBeMultiPolygonGeometry()
                expect(testMultiPolygon).toBeAnyGeometry()
            }
        )
    })

    describe('Illogical values acceptable:', () => {
        const samePoint1 = [
            [0.5, 0.5],
            [0.5, 0.5],
            [0.5, 0.5],
            [0.5, 0.5],
            [0.5, 0.5]
        ]
        const samePoint2 = [
            [2, 2],
            [2, 2],
            [2, 2],
            [2, 2],
            [2, 2]
        ]

        test('Exterior ring all the same point', () => {
            const points = [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0]
            ]
            const testMultiPolygon = {
                type: 'MultiPolygon',
                coordinates: [[points]]
            }
            expect(testMultiPolygon).toBeMultiPolygonGeometry()
            expect(testMultiPolygon).toBeAnyGeometry()
        })

        test('Redundant Interior ring all the same point', () => {
            const testMultiPolygon = {
                type: 'MultiPolygon',
                coordinates: [[counterClockwiseBox, samePoint1]]
            }
            expect(testMultiPolygon).toBeMultiPolygonGeometry()
            expect(testMultiPolygon).toBeAnyGeometry()
        })

        test('Interior rings outside exterior rings', () => {
            const testMultiPolygon = {
                type: 'MultiPolygon',
                coordinates: [[counterClockwiseBox, samePoint2]]
            }
            expect(testMultiPolygon).toBeMultiPolygonGeometry()
            expect(testMultiPolygon).toBeAnyGeometry()
        })

        test('Multiple polygons Interior rings outside exterior rings', () => {
            const testMultiPolygon = {
                type: 'MultiPolygon',
                coordinates: [
                    [counterClockwiseBox, samePoint2],
                    [counterClockwiseBox, samePoint2]
                ]
            }
            expect(testMultiPolygon).toBeMultiPolygonGeometry()
            expect(testMultiPolygon).toBeAnyGeometry()
        })
    })

    describe('Bounding Boxes Allowed, Must be Valid:', () => {
        test('2D Bounding Box', () => {
            const testMultiPolygon = {
                type: 'MultiPolygon',
                coordinates: [
                    [
                        [
                            [0, 0],
                            [0, 1],
                            [1, 1],
                            [1, 0],
                            [0, 0]
                        ]
                    ]
                ],
                bbox: [-10.0, -10.0, 10.0, 10.0]
            }
            expect(testMultiPolygon).toBeMultiPolygonGeometry()
            expect(testMultiPolygon).toBeAnyGeometry()
        })

        test('3D Bounding Box', () => {
            const testMultiPolygon = {
                type: 'MultiPolygon',
                coordinates: [
                    [
                        [
                            [0, 0],
                            [0, 1],
                            [1, 1],
                            [1, 0],
                            [0, 0]
                        ]
                    ]
                ],
                bbox: [-10.0, -10.0, 0, 10.0, 10.0, 200]
            }
            expect(testMultiPolygon).toBeMultiPolygonGeometry()
            expect(testMultiPolygon).toBeAnyGeometry()
        })

        test('Illogical Bounding Box', () => {
            const testMultiPolygon = {
                type: 'MultiPolygon',
                coordinates: [
                    [
                        [
                            [0, 0],
                            [0, 1],
                            [1, 1],
                            [1, 0],
                            [0, 0]
                        ]
                    ]
                ],
                bbox: [-30.0, -30.0, -20.0, -20.0]
            }
            expect(testMultiPolygon).toBeMultiPolygonGeometry()
            expect(testMultiPolygon).toBeAnyGeometry()
        })

        test('Redundant Bounding Box', () => {
            const testMultiPolygon = {
                type: 'MultiPolygon',
                coordinates: [
                    [
                        [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, 0]
                        ]
                    ]
                ],
                bbox: [0, 0, 0, 0]
            }
            expect(testMultiPolygon).toBeMultiPolygonGeometry()
            expect(testMultiPolygon).toBeAnyGeometry()
        })
    })
})

describe('Inalid Use Cases', () => {
    describe('Expect to fail with bad inputs:', () => {
        test.each([...invalidInputValues])(
            'expect(%p).not.toBeMultiPolygonGeometry()',
            (badInput) => {
                expect(badInput).not.toBeMultiPolygonGeometry()
                expect(badInput).not.toBeAnyGeometry()
            }
        )
    })

    describe('Expect to fail with out of range or bad coordinate:', () => {
        test.each([...coordinatesOutOfRange, ...invalidInputValues])(
            'coordinates: [%p]',
            (coordinate) => {
                const testMultiPolygon = {
                    type: 'MultiPolygon',
                    coordinates: [coordinate]
                }
                expect(testMultiPolygon).not.toBeMultiPolygonGeometry()
                expect(testMultiPolygon).not.toBeAnyGeometry()
            }
        )

        // Same as above, but minus one level in the coordinates array
        test.each([...coordinatesOutOfRange, ...invalidInputValues])(
            'coordinates: %p',
            (coordinate) => {
                const testMultiPolygon = {
                    type: 'MultiPolygon',
                    coordinates: coordinate
                }
                expect(testMultiPolygon).not.toBeMultiPolygonGeometry()
                expect(testMultiPolygon).not.toBeAnyGeometry()
            }
        )
    })

    describe('Expect to fail with one bad coordinate:', () => {
        // Add the extra empty array here. "coordinates" can be an empty array, but individual elements within cannot.
        test.each([...invalidInputValues, []])(
            'coordinates: [[[0, 0], [0, 1], [1, 1], %p, [0, 0]]]',
            (coordinate) => {
                const testMultiPolygon = {
                    type: 'MultiPolygon',
                    coordinates: [[[[0, 0], [0, 1], [1, 1], coordinate, [0, 0]]]]
                }
                expect(testMultiPolygon).not.toBeMultiPolygonGeometry()
                expect(testMultiPolygon).not.toBeAnyGeometry()
            }
        )
    })

    describe('Expect to fail with not enough coordinates:', () => {
        test('coordinates: [[[0, 0]]]', () => {
            const testMultiPolygon = {
                type: 'MultiPolygon',
                coordinates: [[[[0, 0]]]]
            }
            expect(testMultiPolygon).not.toBeMultiPolygonGeometry()
            expect(testMultiPolygon).not.toBeAnyGeometry()
        })

        test('coordinates: [[[0, 0], [1, 1]]]', () => {
            const testMultiPolygon = {
                type: 'MultiPolygon',
                coordinates: [
                    [
                        [
                            [0, 0],
                            [1, 1]
                        ]
                    ]
                ]
            }
            expect(testMultiPolygon).not.toBeMultiPolygonGeometry()
            expect(testMultiPolygon).not.toBeAnyGeometry()
        })

        test('coordinates: [[[0, 0], [1, 1]], [[1, 0]]]', () => {
            const testMultiPolygon = {
                type: 'MultiPolygon',
                coordinates: [
                    [
                        [
                            [0, 0],
                            [1, 1]
                        ],
                        [[1, 0]]
                    ]
                ]
            }
            expect(testMultiPolygon).not.toBeMultiPolygonGeometry()
            expect(testMultiPolygon).not.toBeAnyGeometry()
        })

        test('coordinates: [[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]], [[[0, 0], [1, 1]], [[1, 0]]]]', () => {
            const testMultiPolygon = {
                type: 'MultiPolygon',
                coordinates: [
                    [
                        [
                            [0, 0],
                            [0, 1],
                            [1, 1],
                            [1, 0],
                            [0, 0]
                        ]
                    ],
                    [
                        [
                            [0, 0],
                            [1, 1]
                        ],
                        [[1, 0]]
                    ]
                ]
            }
            expect(testMultiPolygon).not.toBeMultiPolygonGeometry()
            expect(testMultiPolygon).not.toBeAnyGeometry()
        })
    })

    describe('Final coordinate does not match first coordinate:', () => {
        const incompletePolygon = [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 0]
        ]

        test('Single Polygon Ring', () => {
            const testMultiPolygon = {
                type: 'MultiPolygon',
                coordinates: [[[...incompletePolygon]]]
            }
            expect(testMultiPolygon).not.toBeMultiPolygonGeometry()
            expect(testMultiPolygon).not.toBeAnyGeometry()
        })

        test('Good exterior, bad hole', () => {
            const testMultiPolygon = {
                type: 'MultiPolygon',
                coordinates: [[[...counterClockwiseBox], [...incompletePolygon]]]
            }
            expect(testMultiPolygon).not.toBeMultiPolygonGeometry()
            expect(testMultiPolygon).not.toBeAnyGeometry()
        })

        test('Good exterior, two bad holes', () => {
            const testMultiPolygon = {
                type: 'MultiPolygon',
                coordinates: [
                    [[...counterClockwiseBox], [...incompletePolygon], [...incompletePolygon]]
                ]
            }
            expect(testMultiPolygon).not.toBeMultiPolygonGeometry()
            expect(testMultiPolygon).not.toBeAnyGeometry()
        })

        test('Bad exterior, good hole', () => {
            const testMultiPolygon = {
                type: 'MultiPolygon',
                coordinates: [[[...incompletePolygon], [...counterClockwiseHole]]]
            }
            expect(testMultiPolygon).not.toBeMultiPolygonGeometry()
            expect(testMultiPolygon).not.toBeAnyGeometry()
        })

        test('Bad exterior, two good holes', () => {
            const testMultiPolygon = {
                type: 'MultiPolygon',
                coordinates: [
                    [[...incompletePolygon], [...counterClockwiseHole], [...clockwiseHole]]
                ]
            }
            expect(testMultiPolygon).not.toBeMultiPolygonGeometry()
            expect(testMultiPolygon).not.toBeAnyGeometry()
        })
    })

    describe('Expect to fail with coordinates array of empty arrays:', () => {
        test.each([...emptyArrays])('coordinates: [%p]', (coordinate) => {
            const testMultiPolygon = {
                type: 'MultiPolygon',
                coordinates: [coordinate]
            }
            expect(testMultiPolygon).not.toBeMultiPolygonGeometry()
            expect(testMultiPolygon).not.toBeAnyGeometry()
        })
    })

    describe('Expect to fail with bad type value:', () => {
        test.each([...incorrectTypeValues, ...invalidInputValues])('type: %p', (input) => {
            const testMultiPolygon = {
                type: input,
                coordinates: [[counterClockwiseBox]]
            }
            expect(testMultiPolygon).not.toBeMultiPolygonGeometry()
            expect(testMultiPolygon).not.toBeAnyGeometry()
        })
    })

    describe('Expect to fail when contains prohibited properties:', () => {
        test(`Contains: 'geometry'`, () => {
            const testMultiPolygon = {
                type: 'MultiPolygon',
                coordinates: [[counterClockwiseBox]],
                geometry: {
                    type: 'Point',
                    coordinates: [102.0, 0.5]
                }
            }
            expect(testMultiPolygon).not.toBeMultiPolygonGeometry()
            expect(testMultiPolygon).not.toBeAnyGeometry()
        })

        test(`Contains: 'properties'`, () => {
            const testMultiPolygon = {
                type: 'MultiPolygon',
                coordinates: [[counterClockwiseBox]],
                properties: {
                    prop1: true
                }
            }
            expect(testMultiPolygon).not.toBeMultiPolygonGeometry()
            expect(testMultiPolygon).not.toBeAnyGeometry()
        })

        test(`Contains: 'features'`, () => {
            const testMultiPolygon = {
                type: 'MultiPolygon',
                coordinates: [[counterClockwiseBox]],
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
            expect(testMultiPolygon).not.toBeMultiPolygonGeometry()
            expect(testMultiPolygon).not.toBeAnyGeometry()
        })
    })

    describe('Expect to fail when missing required properties:', () => {
        test(`Missing: 'type'`, () => {
            const testMultiPolygon = {
                coordinates: [[counterClockwiseBox]]
            }
            expect(testMultiPolygon).not.toBeMultiPolygonGeometry()
            expect(testMultiPolygon).not.toBeAnyGeometry()
        })

        test(`Missing: 'coordinates'`, () => {
            const testMultiPolygon = {
                type: 'MultiPolygon'
            }
            expect(testMultiPolygon).not.toBeMultiPolygonGeometry()
            expect(testMultiPolygon).not.toBeAnyGeometry()
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
            const testMultiPolygon = {
                type: 'MultiPolygon',
                coordinates: [
                    [
                        [
                            [0, 0],
                            [0, 1],
                            [1, 1],
                            [1, 0],
                            [0, 0]
                        ]
                    ]
                ],
                bbox: input
            }
            expect(testMultiPolygon).not.toBeMultiPolygonGeometry()
            expect(testMultiPolygon).not.toBeAnyGeometry()
        })
    })
})

describe('Error Snapshot Testing. Throws error:', () => {
    test('Valid use case passes', () => {
        expect(() =>
            expect({
                type: 'MultiPolygon',
                coordinates: [[counterClockwiseBox]]
            }).not.toBeMultiPolygonGeometry()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Invalid input to matcher', () => {
        expect(() => expect(false).toBeMultiPolygonGeometry()).toThrowErrorMatchingSnapshot()
    })

    test('Has forbidden property: geometry', () => {
        const testMultiPolygon = {
            type: 'MultiPolygon',
            coordinates: [[counterClockwiseBox]],
            geometry: null
        }
        expect(() =>
            expect(testMultiPolygon).toBeMultiPolygonGeometry()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Has forbidden property: properties', () => {
        const testMultiPolygon = {
            type: 'MultiPolygon',
            coordinates: [[counterClockwiseBox]],
            properties: null
        }
        expect(() =>
            expect(testMultiPolygon).toBeMultiPolygonGeometry()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Has forbidden property: features', () => {
        const testMultiPolygon = {
            type: 'MultiPolygon',
            coordinates: [[counterClockwiseBox]],
            features: null
        }
        expect(() =>
            expect(testMultiPolygon).toBeMultiPolygonGeometry()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Bounding box must be valid', () => {
        const testMultiPolygon = {
            type: 'MultiPolygon',
            coordinates: [[counterClockwiseBox]],
            bbox: [0]
        }
        expect(() =>
            expect(testMultiPolygon).toBeMultiPolygonGeometry()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Missing coordinates property', () => {
        const testMultiPolygon = {
            type: 'MultiPolygon'
        }
        expect(() =>
            expect(testMultiPolygon).toBeMultiPolygonGeometry()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Coordinates not an array', () => {
        const testMultiPolygon = {
            type: 'MultiPolygon',
            coordinates: false
        }
        expect(() =>
            expect(testMultiPolygon).toBeMultiPolygonGeometry()
        ).toThrowErrorMatchingSnapshot()
    })
})

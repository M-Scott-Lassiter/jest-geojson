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
            coordinates: clockwiseBox
        }
    ],
    [[1, 1]],
    '',
    'Random Geometry',
    '[0, 0]',
    '[[[0, 0], [0, 0]]]',
    JSON.stringify({
        type: 'Polygon',
        coordinates: clockwiseBox
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
    'MultiPolygon',
    'GeometryCollection',
    'POLYGON',
    'polygon'
]

describe('Valid Use Cases', () => {
    describe('Basic Formatting, Values in Range:', () => {
        test('Good in range counterclockwise coordinates: %p', () => {
            const testPolygon = {
                type: 'Polygon',
                coordinates: [counterClockwiseBox]
            }
            expect(testPolygon).toBePolygonGeometry()
        })

        test('Good in range clockwise coordinates: %p', () => {
            const testPolygon = {
                type: 'Polygon',
                coordinates: [clockwiseBox]
            }
            expect(testPolygon).toBePolygonGeometry()
        })

        test('Good in range counterclockwise exterior with clockwise hole: %p', () => {
            const testPolygon = {
                type: 'Polygon',
                coordinates: [[...counterClockwiseBox], [...clockwiseHole]]
            }
            expect(testPolygon).toBePolygonGeometry()
        })

        test('Good in range counterclockwise exterior with counterclockwise hole: %p', () => {
            const testPolygon = {
                type: 'Polygon',
                coordinates: [[...counterClockwiseBox], [...counterClockwiseHole]]
            }
            expect(testPolygon).toBePolygonGeometry()
        })

        test('Good in range clockwise exterior with clockwise hole: %p', () => {
            const testPolygon = {
                type: 'Polygon',
                coordinates: [[...clockwiseBox], [...clockwiseHole]]
            }
            expect(testPolygon).toBePolygonGeometry()
        })

        test('Good in range clockwise exterior with counterclockwise hole: %p', () => {
            const testPolygon = {
                type: 'Polygon',
                coordinates: [[...clockwiseBox], [...counterClockwiseHole]]
            }
            expect(testPolygon).toBePolygonGeometry()
        })

        test('Empty coordinate', () => {
            const testPolygon = {
                type: 'Polygon',
                coordinates: []
            }
            expect(testPolygon).toBePolygonGeometry()
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
            const testPolygon = {
                type: 'Polygon',
                coordinates: [points]
            }
            expect(testPolygon).toBePolygonGeometry()
        })

        test('Stress test with many points in many holes', () => {
            const testPolygon = {
                type: 'Polygon',
                coordinates: []
            }
            for (let i = 0; i < 30; i++) {
                testPolygon.coordinates.push([])
                for (let j = 0; j < 30; j++) {
                    testPolygon.coordinates[i].push([j, j])
                }
                testPolygon.coordinates[i].push([0, 0])
            }
            expect(testPolygon).toBePolygonGeometry()
        })
    })

    describe('Foreign Properties Allowed:', () => {
        const testPolygon1 = {
            type: 'Polygon',
            id: null,
            coordinates: [counterClockwiseBox]
        }
        const testPolygon2 = {
            type: 'Polygon',
            geometries: testPolygon1,
            coordinates: [counterClockwiseBox]
        }
        const testPolygon3 = {
            type: 'Polygon',
            someRandomProp: true,
            geometries: testPolygon2,
            coordinates: [counterClockwiseBox]
        }

        test.each(['Test 1', 1])('ID: %p', (input) => {
            const testPolygon = {
                type: 'Polygon',
                id: input,
                coordinates: [counterClockwiseBox]
            }
            expect(testPolygon).toBePolygonGeometry()
        })

        test.each([testPolygon1, testPolygon2, testPolygon3])(
            'Non-alphanumeric ID',
            (testPolygon) => {
                expect(testPolygon).toBePolygonGeometry()
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
            const testPolygon = {
                type: 'Polygon',
                coordinates: [points]
            }
            expect(testPolygon).toBePolygonGeometry()
        })

        test('Redundant Interior ring all the same point', () => {
            const testPolygon = {
                type: 'Polygon',
                coordinates: [counterClockwiseBox, samePoint1]
            }
            expect(testPolygon).toBePolygonGeometry()
        })

        test('Interior rings outside exterior rings', () => {
            const testPolygon = {
                type: 'Polygon',
                coordinates: [counterClockwiseBox, samePoint2]
            }
            expect(testPolygon).toBePolygonGeometry()
        })
    })
})

describe('Inalid Use Cases', () => {
    describe('Expect to fail with bad inputs:', () => {
        test.each([...invalidInputValues])('expect(%p).not.toBePolygonGeometry()', (badInput) => {
            expect(badInput).not.toBePolygonGeometry()
        })
    })

    describe('Expect to fail with out of range or bad coordinate:', () => {
        test.each([...coordinatesOutOfRange, ...invalidInputValues])(
            'coordinates: %p',
            (coordinate) => {
                const testPolygon = {
                    type: 'Polygon',
                    coordinates: coordinate
                }
                expect(testPolygon).not.toBePolygonGeometry()
            }
        )
    })

    describe('Expect to fail with one bad coordinate:', () => {
        // Add the extra empty array here. "coordinates" can be an empty array, but individual elements within cannot.
        test.each([...invalidInputValues, []])(
            'coordinates: [[[0, 0], [0, 1], [1, 1], %p, [0, 0]]]',
            (coordinate) => {
                const testPolygon = {
                    type: 'Polygon',
                    coordinates: [[[0, 0], [0, 1], [1, 1], coordinate, [0, 0]]]
                }
                expect(testPolygon).not.toBePolygonGeometry()
            }
        )
    })

    describe('Expect to fail with not enough coordinates:', () => {
        test('coordinates: [[[0, 0]]]', () => {
            const testPolygon = {
                type: 'Polygon',
                coordinates: [[[0, 0]]]
            }
            expect(testPolygon).not.toBePolygonGeometry()
        })

        test('coordinates: [[[0, 0], [1, 1]]]', () => {
            const testPolygon = {
                type: 'Polygon',
                coordinates: [
                    [
                        [0, 0],
                        [1, 1]
                    ]
                ]
            }
            expect(testPolygon).not.toBePolygonGeometry()
        })

        test('coordinates: [[[0, 0], [1, 1]], [[1, 0]]]', () => {
            const testPolygon = {
                type: 'Polygon',
                coordinates: [
                    [
                        [0, 0],
                        [1, 1]
                    ],
                    [[1, 0]]
                ]
            }
            expect(testPolygon).not.toBePolygonGeometry()
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
            const testPolygon = {
                type: 'Polygon',
                coordinates: [[...incompletePolygon]]
            }
            expect(testPolygon).not.toBePolygonGeometry()
        })

        test('Good exterior, bad hole', () => {
            const testPolygon = {
                type: 'Polygon',
                coordinates: [[...counterClockwiseBox], [...incompletePolygon]]
            }
            expect(testPolygon).not.toBePolygonGeometry()
        })

        test('Good exterior, two bad holes', () => {
            const testPolygon = {
                type: 'Polygon',
                coordinates: [
                    [...counterClockwiseBox],
                    [...incompletePolygon],
                    [...incompletePolygon]
                ]
            }
            expect(testPolygon).not.toBePolygonGeometry()
        })

        test('Bad exterior, good hole', () => {
            const testPolygon = {
                type: 'Polygon',
                coordinates: [[...incompletePolygon], [...counterClockwiseHole]]
            }
            expect(testPolygon).not.toBePolygonGeometry()
        })

        test('Bad exterior, two good holes', () => {
            const testPolygon = {
                type: 'Polygon',
                coordinates: [[...incompletePolygon], [...counterClockwiseHole], [...clockwiseHole]]
            }
            expect(testPolygon).not.toBePolygonGeometry()
        })
    })

    describe('Expect to fail with coordinates array of empty arrays:', () => {
        test.each([...emptyArrays])('coordinates: %p', (coordinate) => {
            const testPolygon = {
                type: 'Polygon',
                coordinates: [coordinate]
            }
            expect(testPolygon).not.toBePolygonGeometry()
        })
    })

    describe('Expect to fail with bad type value:', () => {
        test.each([...incorrectTypeValues, ...invalidInputValues])('type: %p', (input) => {
            const testPolygon = {
                type: input,
                coordinates: counterClockwiseBox
            }
            expect(testPolygon).not.toBePolygonGeometry()
        })
    })

    describe('Expect to fail when contains prohibited properties:', () => {
        test(`Contains: 'geometry'`, () => {
            const testPolygon = {
                type: 'Polygon',
                coordinates: counterClockwiseBox,
                geometry: {
                    type: 'Point',
                    coordinates: [102.0, 0.5]
                }
            }
            expect(testPolygon).not.toBePolygonGeometry()
        })

        test(`Contains: 'properties'`, () => {
            const testPolygon = {
                type: 'Polygon',
                coordinates: counterClockwiseBox,
                properties: {
                    prop1: true
                }
            }
            expect(testPolygon).not.toBePolygonGeometry()
        })

        test(`Contains: 'features'`, () => {
            const testPolygon = {
                type: 'Polygon',
                coordinates: counterClockwiseBox,
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
            expect(testPolygon).not.toBePolygonGeometry()
        })
    })

    describe('Expect to fail when missing required properties:', () => {
        test(`Missing: 'type'`, () => {
            const testPolygon = {
                coordinates: counterClockwiseBox
            }
            expect(testPolygon).not.toBePolygonGeometry()
        })

        test(`Missing: 'coordinates'`, () => {
            const testPolygon = {
                type: 'Polygon'
            }
            expect(testPolygon).not.toBePolygonGeometry()
        })
    })
})

describe('Error Snapshot Testing. Throws error:', () => {
    test(`expect({type: 'Polygon', coordinates: ${counterClockwiseBox}}).not.toBePolygonGeometry`, () => {
        expect(() =>
            expect({
                type: 'Polygon',
                coordinates: [counterClockwiseBox]
            }).not.toBePolygonGeometry()
        ).toThrowErrorMatchingSnapshot()
    })

    test('expect(false).toBePolygonGeometry()', () => {
        expect(() => expect(false).toBePolygonGeometry()).toThrowErrorMatchingSnapshot()
    })
})

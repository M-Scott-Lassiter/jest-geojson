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
    [[[100.0, 0.0]]],
    [
        [
            [100.0, 0.0],
            [100.0, 0.0]
        ]
    ],
    [
        [
            [100.0, 0.0],
            [100.0, 0.0],
            [100.0, 0.0]
        ]
    ],
    [[[100.0, 0.0, 0]]],
    [
        [
            [100.0, 0.0, 0],
            [100.0, 0.0, 0]
        ]
    ],
    [
        [
            [100.0, 0.0, 0],
            [100.0, 0.0, 0],
            [100.0, 0.0, 0]
        ]
    ],
    [[[100.0, 0.0, 0]]],
    [
        [
            [100.0, 0.0],
            [100.0, 0.0, 0]
        ]
    ],
    [
        [
            [100.0, 0.0, 0],
            [100.0, 0.0],
            [100.0, 0.0, 0]
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
const incorrectTypeValues = [
    ...invalidInputValues,
    'Point',
    'LineString',
    'MultiLineString',
    'Polygon',
    'MultiPolygon',
    'GeometryCollection',
    'MULTIPOINT',
    'multipoint'
]

describe('Valid Use Cases', () => {
    describe('Basic Formatting, Values in Range:', () => {
        test.each([...coordinatesInRange])('Good in range coordinates: %p', (coordinateArray) => {
            const testMultiPoint = {
                type: 'MultiPoint',
                coordinates: coordinateArray
            }
            expect(testMultiPoint).toBeMultiPointGeometry()
        })

        test('Empty coordinate', () => {
            const testMultiPoint = {
                type: 'MultiPoint',
                coordinates: []
            }
            expect(testMultiPoint).toBeMultiPointGeometry()
        })
    })

    describe('Foreign Properties Allowed:', () => {
        const testMultiPoint1 = {
            type: 'MultiPoint',
            id: null,
            coordinates: [
                [25, 90],
                [-180, 0]
            ]
        }
        const testMultiPoint2 = {
            type: 'MultiPoint',
            geometries: testMultiPoint1,
            coordinates: [
                [-100.0, -15.0, 2000],
                [0, 0]
            ]
        }
        const testMultiPoint3 = {
            type: 'MultiPoint',
            someRandomProp: true,
            geometries: testMultiPoint2,
            coordinates: [[180, 10.2, -125]]
        }

        test.each(['Test 1', 1])('ID: %p', (input) => {
            const testMultiPoint = {
                type: 'MultiPoint',
                id: input,
                coordinates: [
                    [25, 90],
                    [-180, 0]
                ]
            }
            expect(testMultiPoint).toBeMultiPointGeometry()
        })

        test.each([testMultiPoint1, testMultiPoint2, testMultiPoint3])(
            'Non-alphanumeric ID',
            (testPoint) => {
                expect(testPoint).toBeMultiPointGeometry()
            }
        )
    })
})

describe('Inalid Use Cases', () => {
    describe('Expect to fail with bad inputs:', () => {
        test.each([...invalidInputValues])(
            'expect(%p).not.toBeMultiPointGeometry()',
            (badInput) => {
                expect(badInput).not.toBeMultiPointGeometry()
            }
        )
    })

    describe('Expect to fail with out of range or bad coordinate:', () => {
        test.each([...coordinatesOutOfRange, ...invalidInputValues])(
            'coordinates: %p',
            (coordinate) => {
                const testPoint = {
                    type: 'MultiPoint',
                    coordinates: coordinate
                }
                expect(testPoint).not.toBeMultiPointGeometry()
            }
        )
    })

    describe('Expect to fail with bad type value:', () => {
        test.each([...incorrectTypeValues, ...invalidInputValues])('type: %p', (input) => {
            const testPoint = {
                type: input,
                coordinates: [
                    [0, 0],
                    [1, 1, 0]
                ]
            }
            expect(testPoint).not.toBeMultiPointGeometry()
        })
    })

    describe('Expect to fail when contains prohibited properties:', () => {
        test(`Contains: 'geometry'`, () => {
            const testMultiPoint = {
                type: 'MultiPoint',
                coordinates: [
                    [0, 0],
                    [1, 1, 0]
                ],
                geometry: {
                    type: 'Point',
                    coordinates: [102.0, 0.5]
                }
            }

            expect(testMultiPoint).not.toBeMultiPointGeometry()
        })

        test(`Contains: 'properties'`, () => {
            const testMultiPoint = {
                type: 'MultiPoint',
                coordinates: [
                    [0, 0],
                    [1, 1, 0]
                ],
                properties: {
                    prop1: true
                }
            }

            expect(testMultiPoint).not.toBeMultiPointGeometry()
        })

        test(`Contains: 'features'`, () => {
            const testMultiPoint = {
                type: 'MultiPoint',
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
            expect(testMultiPoint).not.toBeMultiPointGeometry()
        })
    })

    describe('Expect to fail when missing required properties:', () => {
        test(`Missing: 'type'`, () => {
            const testPoint = {
                coordinates: [
                    [0, 0],
                    [1, 1, 0]
                ]
            }
            expect(testPoint).not.toBeMultiPointGeometry()
        })
        test(`Missing: 'coordinates'`, () => {
            const testPoint = {
                type: 'MultiPoint'
            }
            expect(testPoint).not.toBeMultiPointGeometry()
        })
    })
})

describe('Error Snapshot Testing. Throws error:', () => {
    test(`expect({type: 'MultiPoint', coordinates: [[0, 0]]}).not.toBeMultiPointGeometry`, () => {
        expect(() =>
            expect({ type: 'MultiPoint', coordinates: [[0, 0]] }).not.toBeMultiPointGeometry()
        ).toThrowErrorMatchingSnapshot()
    })
    test('expect(false).toBeMultiPointGeometry()', () => {
        expect(() => expect(false).toBeMultiPointGeometry()).toThrowErrorMatchingSnapshot()
    })
})

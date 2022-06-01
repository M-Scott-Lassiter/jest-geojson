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
            expect(testMultiPoint).toBeAnyGeometry()
        })

        test('Empty coordinate', () => {
            const testMultiPoint = {
                type: 'MultiPoint',
                coordinates: []
            }
            expect(testMultiPoint).toBeMultiPointGeometry()
            expect(testMultiPoint).toBeAnyGeometry()
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
            expect(testMultiPoint).toBeAnyGeometry()
        })

        test.each([testMultiPoint1, testMultiPoint2, testMultiPoint3])(
            'Non-alphanumeric ID',
            (testMultiPoint) => {
                expect(testMultiPoint).toBeMultiPointGeometry()
                expect(testMultiPoint).toBeAnyGeometry()
            }
        )
    })

    describe('Bounding Boxes Allowed, Must be Valid:', () => {
        test('2D Bounding Box', () => {
            const testMultiPoint = {
                type: 'MultiPoint',
                coordinates: [[0, 0, 0]],
                bbox: [-10.0, -10.0, 10.0, 10.0]
            }
            expect(testMultiPoint).toBeMultiPointGeometry()
            expect(testMultiPoint).toBeAnyGeometry()
        })

        test('3D Bounding Box', () => {
            const testMultiPoint = {
                type: 'MultiPoint',
                bbox: [-10.0, -10.0, 0, 10.0, 10.0, 200],
                coordinates: [[0, 0, 0]]
            }
            expect(testMultiPoint).toBeMultiPointGeometry()
            expect(testMultiPoint).toBeAnyGeometry()
        })

        test('Illogical Bounding Box', () => {
            const testMultiPoint = {
                type: 'MultiPoint',
                bbox: [-30.0, -30.0, -20.0, -20.0],
                coordinates: [[0, 0, 0]]
            }
            expect(testMultiPoint).toBeMultiPointGeometry()
            expect(testMultiPoint).toBeAnyGeometry()
        })

        test('Redundant Bounding Box', () => {
            const testMultiPoint = {
                type: 'MultiPoint',
                bbox: [0, 0, 0, 0],
                coordinates: [[0, 0]]
            }
            expect(testMultiPoint).toBeMultiPointGeometry()
            expect(testMultiPoint).toBeAnyGeometry()
        })
    })
})

describe('Inalid Use Cases', () => {
    describe('Expect to fail with bad inputs:', () => {
        test.each([...invalidInputValues])(
            'expect(%p).not.toBeMultiPointGeometry()',
            (badInput) => {
                expect(badInput).not.toBeMultiPointGeometry()
                expect(badInput).not.toBeAnyGeometry()
            }
        )
    })

    describe('Expect to fail with out of range or bad coordinate:', () => {
        test.each([...coordinatesOutOfRange, ...invalidInputValues])(
            'coordinates: %p',
            (coordinate) => {
                const testMultiPoint = {
                    type: 'MultiPoint',
                    coordinates: coordinate
                }
                expect(testMultiPoint).not.toBeMultiPointGeometry()
                expect(testMultiPoint).not.toBeAnyGeometry()
            }
        )
    })

    describe('Expect to fail with bad type value:', () => {
        test.each([...incorrectTypeValues, ...invalidInputValues])('type: %p', (input) => {
            const testMultiPoint = {
                type: input,
                coordinates: [
                    [0, 0],
                    [1, 1, 0]
                ]
            }
            expect(testMultiPoint).not.toBeMultiPointGeometry()
            // No anyGeometry here because some of these match the same formats
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
            expect(testMultiPoint).not.toBeAnyGeometry()
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
            expect(testMultiPoint).not.toBeAnyGeometry()
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
            expect(testMultiPoint).not.toBeAnyGeometry()
        })
    })

    describe('Expect to fail when missing required properties:', () => {
        test(`Missing: 'type'`, () => {
            const testMultiPoint = {
                coordinates: [
                    [0, 0],
                    [1, 1, 0]
                ]
            }
            expect(testMultiPoint).not.toBeMultiPointGeometry()
            expect(testMultiPoint).not.toBeAnyGeometry()
        })
        test(`Missing: 'coordinates'`, () => {
            const testMultiPoint = {
                type: 'MultiPoint'
            }
            expect(testMultiPoint).not.toBeMultiPointGeometry()
            expect(testMultiPoint).not.toBeAnyGeometry()
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
            const testMultiPoint = {
                type: 'MultiPoint',
                coordinates: [[0, 0]],
                bbox: input
            }
            expect(testMultiPoint).not.toBeMultiPointGeometry()
            expect(testMultiPoint).not.toBeAnyGeometry()
        })
    })
})

describe('Error Snapshot Testing. Throws error:', () => {
    test(`Valid use case passes`, () => {
        expect(() =>
            expect({ type: 'MultiPoint', coordinates: [[0, 0]] }).not.toBeMultiPointGeometry()
        ).toThrowErrorMatchingSnapshot()
    })
    test('Invalid input to matcher', () => {
        expect(() => expect(false).toBeMultiPointGeometry()).toThrowErrorMatchingSnapshot()
    })

    test('Has forbidden property: geometry', () => {
        const testPoint = {
            type: 'MultiPoint',
            coordinates: [[0, 0]],
            geometry: null
        }
        expect(() => expect(testPoint).toBeMultiPointGeometry()).toThrowErrorMatchingSnapshot()
    })

    test('Has forbidden property: properties', () => {
        const testPoint = {
            type: 'MultiPoint',
            coordinates: [[0, 0]],
            properties: null
        }
        expect(() => expect(testPoint).toBeMultiPointGeometry()).toThrowErrorMatchingSnapshot()
    })

    test('Has forbidden property: features', () => {
        const testPoint = {
            type: 'MultiPoint',
            coordinates: [[0, 0]],
            features: null
        }
        expect(() => expect(testPoint).toBeMultiPointGeometry()).toThrowErrorMatchingSnapshot()
    })

    test('Bounding box must be valid', () => {
        const testPoint = {
            type: 'MultiPoint',
            coordinates: [[0, 0]],
            bbox: [0]
        }
        expect(() => expect(testPoint).toBeMultiPointGeometry()).toThrowErrorMatchingSnapshot()
    })

    test('Missing coordinates property', () => {
        const testPoint = {
            type: 'MultiPoint'
        }
        expect(() => expect(testPoint).toBeMultiPointGeometry()).toThrowErrorMatchingSnapshot()
    })

    test('Coordinates not an array', () => {
        const testPoint = {
            type: 'MultiPoint',
            coordinates: false
        }
        expect(() => expect(testPoint).toBeMultiPointGeometry()).toThrowErrorMatchingSnapshot()
    })
})

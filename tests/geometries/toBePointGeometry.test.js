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
    [{ coordinates: [0, 0] }],
    '',
    'Random Geometry',
    '[0, 0]',
    '[[0, 0], [0, 0]]',
    JSON.stringify({
        type: 'Point',
        coordinates: [25, 90]
    })
]
const coordinatesOutOfRange = [[[181, 91]], [[-181, -91, 0]], [[-181, -91, 200]], [[0, 0, 0, 0]]]
const incorrectTypeValues = [
    ...invalidInputValues,
    'MultiPoint',
    'LineString',
    'MultiLineString',
    'Polygon',
    'MultiPolygon',
    'GeometryCollection',
    'Feature',
    'FeatureCollection',
    'POINT',
    'point'
]

describe('Valid Use Cases', () => {
    describe('Basic Formatting, Values in Range:', () => {
        test('Good 2D coordinate', () => {
            const testPoint = {
                type: 'Point',
                coordinates: [25, 10.2]
            }
            expect(testPoint).toBePointGeometry()
            expect(testPoint).toBeAnyGeometry()
        })

        test('Good 3D coordinate', () => {
            const testPoint = {
                type: 'Point',
                coordinates: [-100.0, -15.0, 2000]
            }
            expect(testPoint).toBePointGeometry()
            expect(testPoint).toBeAnyGeometry()
        })

        test('Empty coordinate', () => {
            const testPoint = {
                type: 'Point',
                coordinates: []
            }
            expect(testPoint).toBePointGeometry()
            expect(testPoint).toBeAnyGeometry()
        })
    })

    describe('Foreign Properties Allowed:', () => {
        const testPoint1 = {
            type: 'Point',
            id: null,
            coordinates: [25, 90]
        }
        const testPoint2 = {
            type: 'Point',
            geometries: testPoint1,
            coordinates: [-100.0, -15.0, 2000]
        }
        const testPoint3 = {
            type: 'Point',
            someRandomProp: true,
            geometries: testPoint2,
            coordinates: [180, 10.2, -125]
        }

        test.each(['Test 1', 1])('ID: %p', (input) => {
            const testPoint = {
                type: 'Point',
                id: input,
                coordinates: [25, 90]
            }
            expect(testPoint).toBePointGeometry()
            expect(testPoint).toBeAnyGeometry()
        })

        test.each([testPoint1, testPoint2, testPoint3])('Non-alphanumeric ID', (testPoint) => {
            expect(testPoint).toBePointGeometry()
            expect(testPoint).toBeAnyGeometry()
        })
    })

    describe('Bounding Boxes Allowed, Must be Valid:', () => {
        test('2D Bounding Box', () => {
            const testPoint = {
                type: 'Point',
                coordinates: [0, 0],
                bbox: [-10.0, -10.0, 10.0, 10.0]
            }
            expect(testPoint).toBePointGeometry()
            expect(testPoint).toBeAnyGeometry()
        })

        test('3D Bounding Box', () => {
            const testPoint = {
                type: 'Point',
                coordinates: [0, 0],
                bbox: [-10.0, -10.0, 0, 10.0, 10.0, 200]
            }
            expect(testPoint).toBePointGeometry()
            expect(testPoint).toBeAnyGeometry()
        })

        test('Illogical Bounding Box', () => {
            const testPoint = {
                type: 'Point',
                bbox: [-30.0, -30.0, -20.0, -20.0],
                coordinates: [0, 0]
            }
            expect(testPoint).toBePointGeometry()
            expect(testPoint).toBeAnyGeometry()
        })

        test('Redundant Bounding Box', () => {
            const testPoint = {
                type: 'Point',
                bbox: [0, 0, 0, 0],
                coordinates: [0, 0]
            }
            expect(testPoint).toBePointGeometry()
            expect(testPoint).toBeAnyGeometry()
        })
    })
})

describe('Inalid Use Cases', () => {
    describe('Expect to fail with bad inputs:', () => {
        test.each([...invalidInputValues])('expect(%p).not.toBePointGeometry()', (badInput) => {
            expect(badInput).not.toBePointGeometry()
            expect(badInput).not.toBeAnyGeometry()
        })
    })

    describe('Expect to fail with out of range or bad coordinate:', () => {
        test.each([...coordinatesOutOfRange, ...invalidInputValues])(
            'coordinates: %p',
            (coordinate) => {
                const testPoint = {
                    type: 'Point',
                    coordinates: coordinate
                }
                expect(testPoint).not.toBePointGeometry()
                expect(testPoint).not.toBeAnyGeometry()
            }
        )
    })

    describe('Expect to fail with bad type value:', () => {
        test.each([...incorrectTypeValues, ...invalidInputValues])('type: %p', (input) => {
            const testPoint = {
                type: input,
                coordinates: [0, 0]
            }
            expect(testPoint).not.toBePointGeometry()
            // No anyGeometry here because some of these match the same formats
        })
    })

    describe('Expect to fail when contains prohibited properties:', () => {
        test(`Contains: 'geometry'`, () => {
            const testPoint = {
                type: 'Point',
                coordinates: [0, 0],
                geometry: {
                    type: 'Point',
                    coordinates: [102.0, 0.5]
                }
            }
            expect(testPoint).not.toBePointGeometry()
            expect(testPoint).not.toBeAnyGeometry()
        })

        test(`Contains: 'properties'`, () => {
            const testPoint = {
                type: 'Point',
                coordinates: [0, 0],
                properties: {
                    prop1: true
                }
            }
            expect(testPoint).not.toBePointGeometry()
            expect(testPoint).not.toBeAnyGeometry()
        })

        test(`Contains: 'features'`, () => {
            const testPoint = {
                type: 'Point',
                coordinates: [0, 0],
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
            expect(testPoint).not.toBePointGeometry()
            expect(testPoint).not.toBeAnyGeometry()
        })
    })

    describe('Expect to fail when missing required properties:', () => {
        test(`Missing: 'type'`, () => {
            const testPoint = {
                coordinates: [0, 0]
            }
            expect(testPoint).not.toBePointGeometry()
            expect(testPoint).not.toBeAnyGeometry()
        })

        test(`Missing: 'coordinates'`, () => {
            const testPoint = {
                type: 'Point'
            }
            expect(testPoint).not.toBePointGeometry()
            expect(testPoint).not.toBeAnyGeometry()
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
            const testPoint = {
                type: 'Point',
                coordinates: [0, 0],
                bbox: input
            }
            expect(testPoint).not.toBePointGeometry()
            expect(testPoint).not.toBeAnyGeometry()
        })
    })
})

describe('Error Snapshot Testing. Throws error:', () => {
    test(`Valid use case passes`, () => {
        expect(() =>
            expect({ type: 'Point', coordinates: [0, 0] }).not.toBePointGeometry()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Invalid input to matcher', () => {
        expect(() => expect(false).toBePointGeometry()).toThrowErrorMatchingSnapshot()
    })

    test('Has forbidden property: geometry', () => {
        const testPoint = {
            type: 'Point',
            coordinates: [0, 0],
            geometry: null
        }
        expect(() => expect(testPoint).toBePointGeometry()).toThrowErrorMatchingSnapshot()
    })

    test('Has forbidden property: properties', () => {
        const testPoint = {
            type: 'Point',
            coordinates: [0, 0],
            properties: null
        }
        expect(() => expect(testPoint).toBePointGeometry()).toThrowErrorMatchingSnapshot()
    })

    test('Has forbidden property: features', () => {
        const testPoint = {
            type: 'Point',
            coordinates: [0, 0],
            features: null
        }
        expect(() => expect(testPoint).toBePointGeometry()).toThrowErrorMatchingSnapshot()
    })

    test('Bounding box must be valid', () => {
        const testPoint = {
            type: 'Point',
            coordinates: [0, 0],
            bbox: [0]
        }
        expect(() => expect(testPoint).toBePointGeometry()).toThrowErrorMatchingSnapshot()
    })

    test('Missing coordinates property', () => {
        const testPoint = {
            type: 'Point'
        }
        expect(() => expect(testPoint).toBePointGeometry()).toThrowErrorMatchingSnapshot()
    })

    test('Coordinates not an array', () => {
        const testPoint = {
            type: 'Point',
            coordinates: false
        }
        expect(() => expect(testPoint).toBePointGeometry()).toThrowErrorMatchingSnapshot()
    })
})

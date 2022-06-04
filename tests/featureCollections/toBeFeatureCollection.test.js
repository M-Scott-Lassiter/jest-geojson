const { goodGeometry, badGeometry, nestedGeometryCollection } = require('../geometries/data')

const goodFeatureCollection = {
    type: 'FeatureCollection',
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
        },
        {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: [
                    [102.0, 0.0],
                    [103.0, 1.0],
                    [104.0, 0.0],
                    [105.0, 1.0]
                ]
            },
            properties: {
                prop0: 'value0',
                prop1: 0.0
            }
        },
        {
            type: 'Feature',
            geometry: {
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
            properties: {
                prop0: 'value0',
                prop1: {
                    this: 'that'
                }
            }
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
    [[25, 35, 45000]],
    '',
    'Random FeatureCollection',
    JSON.stringify({
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'MultiPoint',
                    coordinates: [
                        [0, 0],
                        [1, 1, 100]
                    ]
                }
            }
        ]
    })
]
const incorrectTypeValues = [
    ...invalidInputValues,
    'Point',
    'MultiPoint',
    'LineString',
    'MultiLineString',
    'Polygon',
    'MultiPolygon',
    'GeometryCollection',
    'Feature',
    'FEATURECOLLECTION',
    'featurecollection'
]

describe('Valid Use Cases', () => {
    describe('Expect to pass with good features:', () => {
        const testFeatureCollection = {
            type: 'FeatureCollection',
            features: null
        }
        beforeEach(() => {
            testFeatureCollection.features = [{ type: 'Feature', properties: {} }]
        })

        test('Known good FeatureCollection', () => {
            expect(goodFeatureCollection).toBeFeatureCollection()
            expect(goodFeatureCollection).toBeValidGeoJSON()
        })

        test('Point', () => {
            testFeatureCollection.features[0].geometry = goodGeometry.point
            expect(testFeatureCollection).toBeFeatureCollection()
            expect(testFeatureCollection).toBeValidGeoJSON()
        })

        test('MultiPoint', () => {
            testFeatureCollection.features[0].geometry = goodGeometry.multiPoint
            expect(testFeatureCollection).toBeFeatureCollection()
            expect(testFeatureCollection).toBeValidGeoJSON()
        })

        test('LineString', () => {
            testFeatureCollection.features[0].geometry = goodGeometry.lineString
            expect(testFeatureCollection).toBeFeatureCollection()
            expect(testFeatureCollection).toBeValidGeoJSON()
        })

        test('MultiLineString', () => {
            testFeatureCollection.features[0].geometry = goodGeometry.multiLineString
            expect(testFeatureCollection).toBeFeatureCollection()
            expect(testFeatureCollection).toBeValidGeoJSON()
        })

        test('Polygon', () => {
            testFeatureCollection.features[0].geometry = goodGeometry.polygon
            expect(testFeatureCollection).toBeFeatureCollection()
            expect(testFeatureCollection).toBeValidGeoJSON()
        })

        test('MultiPolygon', () => {
            testFeatureCollection.features[0].geometry = goodGeometry.multiPolygon
            expect(testFeatureCollection).toBeFeatureCollection()
            expect(testFeatureCollection).toBeValidGeoJSON()
        })

        test('Geometry Collection', () => {
            testFeatureCollection.features[0].geometry = nestedGeometryCollection
            expect(testFeatureCollection).toBeFeatureCollection()
            expect(testFeatureCollection).toBeValidGeoJSON()
        })

        test('All', () => {
            testFeatureCollection.features = [
                { type: 'Feature', properties: {}, geometry: goodGeometry.point },
                { type: 'Feature', properties: {}, geometry: goodGeometry.multiPoint },
                { type: 'Feature', properties: {}, geometry: goodGeometry.lineString },
                { type: 'Feature', properties: {}, geometry: goodGeometry.multiLineString },
                { type: 'Feature', properties: {}, geometry: goodGeometry.polygon },
                { type: 'Feature', properties: {}, geometry: goodGeometry.multiPolygon },
                { type: 'Feature', properties: {}, geometry: nestedGeometryCollection }
            ]
            expect(testFeatureCollection).toBeFeatureCollection()
            expect(testFeatureCollection).toBeValidGeoJSON()
        })

        test('Stress Test', () => {
            testFeatureCollection.features = []
            for (let i = 0; i < 10; i++) {
                testFeatureCollection.features.push({
                    type: 'Feature',
                    properties: {},
                    geometry: goodGeometry.point
                })
                testFeatureCollection.features.push({
                    type: 'Feature',
                    properties: {},
                    geometry: goodGeometry.multiPoint
                })
                testFeatureCollection.features.push({
                    type: 'Feature',
                    properties: {},
                    geometry: goodGeometry.lineString
                })
                testFeatureCollection.features.push({
                    type: 'Feature',
                    properties: {},
                    geometry: goodGeometry.multiLineString
                })
                testFeatureCollection.features.push({
                    type: 'Feature',
                    properties: {},
                    geometry: goodGeometry.polygon
                })
                testFeatureCollection.features.push({
                    type: 'Feature',
                    properties: {},
                    geometry: goodGeometry.multiPolygon
                })
                testFeatureCollection.features.push({
                    type: 'Feature',
                    properties: {},
                    geometry: nestedGeometryCollection
                })
            }
            expect(testFeatureCollection).toBeFeatureCollection()
            expect(testFeatureCollection).toBeValidGeoJSON()
        })

        test('Empty Array', () => {
            testFeatureCollection.features = []
            expect(testFeatureCollection).toBeFeatureCollection()
            expect(testFeatureCollection).toBeValidGeoJSON()
        })
    })

    describe('Optional ID Must Be String or Number', () => {
        const validIDs = [
            ...invalidInputValues,
            'ABCD',
            'Test 1',
            '1',
            '',
            '[[[180, 10.2, -125], [-180, 90, 35000]]], [{}]',
            [[]],
            [[1]],
            [{}],
            [{ id: 1 }]
        ]
        test.each(validIDs)('ID: %p', (input) => {
            const testFeatureCollection = {
                type: 'FeatureCollection',
                id: input,
                features: []
            }

            expect(testFeatureCollection).toBeFeatureCollection()
            expect(testFeatureCollection).toBeValidGeoJSON()
        })
    })

    describe('Foreign Properties Allowed', () => {
        test('Single Foreign Property', () => {
            const testFeatureCollection = {
                type: 'FeatureCollection',
                features: [],
                foreign: true
            }
            expect(testFeatureCollection).toBeFeatureCollection()
            expect(testFeatureCollection).toBeValidGeoJSON()
        })

        test('Multiple Foreign Properties', () => {
            const testFeatureCollection = {
                type: 'FeatureCollection',
                features: [],
                id: '#1',
                foreign1: true,
                foreign2: 33
            }
            expect(testFeatureCollection).toBeFeatureCollection()
            expect(testFeatureCollection).toBeValidGeoJSON()
        })

        test('Foreign Property That Would Normally be a Valid GeoJSON Object', () => {
            const multiPoint = {
                type: 'MultiPoint',
                coordinates: [
                    [101.0, 0.0],
                    [102.0, 1.0]
                ]
            }
            const testFeatureCollection = {
                type: 'FeatureCollection',
                features: [],
                foreignGeometry: multiPoint,
                Geometry: multiPoint // Note captitalized 'G'
            }
            expect(testFeatureCollection).toBeFeatureCollection()
            expect(testFeatureCollection).toBeValidGeoJSON()
        })
    })

    describe('Bounding Boxes Allowed, Must be Valid:', () => {
        const feature = {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'MultiPoint',
                coordinates: [
                    [0, 0],
                    [1, 1, 100]
                ]
            }
        }
        test('2D Bounding Box', () => {
            const testFeatureCollection = {
                type: 'FeatureCollection',
                features: [feature],
                bbox: [-10.0, -10.0, 10.0, 10.0]
            }

            expect(testFeatureCollection).toBeFeatureCollection()
            expect(testFeatureCollection).toBeValidGeoJSON()
        })

        test('3D Bounding Box', () => {
            const testFeatureCollection = {
                type: 'FeatureCollection',
                features: [feature],

                bbox: [-10.0, -10.0, 0, 10.0, 10.0, 200]
            }

            expect(testFeatureCollection).toBeFeatureCollection()
            expect(testFeatureCollection).toBeValidGeoJSON()
        })

        test('Illogical Bounding Box', () => {
            const testFeatureCollection = {
                type: 'FeatureCollection',
                features: [feature],

                bbox: [-30.0, -30.0, -20.0, -20.0]
            }

            expect(testFeatureCollection).toBeFeatureCollection()
            expect(testFeatureCollection).toBeValidGeoJSON()
        })

        test('Redundant Bounding Box', () => {
            feature.geometry.coordinates = [
                [0, 0],
                [0, 0]
            ]
            const testFeatureCollection = {
                type: 'FeatureCollection',
                features: [feature]
            }

            expect(testFeatureCollection).toBeFeatureCollection()
            expect(testFeatureCollection).toBeValidGeoJSON()
        })
    })
})

describe('Invalid Use Cases', () => {
    describe('Expect to fail with bad inputs:', () => {
        test.each([...invalidInputValues, null])(
            'expect(%p).not.toBeFeatureCollection()',
            (badInput) => {
                expect(badInput).not.toBeFeatureCollection()
                expect(badInput).not.toBeValidGeoJSON()
            }
        )
    })

    describe('Expect to fail with invalid features:', () => {
        const testFeatureCollection = {
            type: 'FeatureCollection',
            features: null
        }
        beforeEach(() => {
            testFeatureCollection.features = [{ type: 'Feature', properties: {} }]
        })

        test.each(invalidInputValues)('Invalid Features: %p', (input) => {
            testFeatureCollection.features = input
            expect(testFeatureCollection).not.toBeFeatureCollection()
            expect(testFeatureCollection).not.toBeValidGeoJSON()
        })

        test.each(invalidInputValues)('Invalid Features: [%p]', (input) => {
            testFeatureCollection.features = [input]
            expect(testFeatureCollection).not.toBeFeatureCollection()
            expect(testFeatureCollection).not.toBeValidGeoJSON()
        })

        test('Point', () => {
            testFeatureCollection.features[0].geometry = badGeometry.point
            expect(testFeatureCollection).not.toBeFeatureCollection()
            expect(testFeatureCollection).not.toBeValidGeoJSON()
        })

        test('MultiPoint', () => {
            testFeatureCollection.features[0].geometry = badGeometry.multiPoint
            expect(testFeatureCollection).not.toBeFeatureCollection()
            expect(testFeatureCollection).not.toBeValidGeoJSON()
        })

        test('LineString', () => {
            testFeatureCollection.features[0].geometry = badGeometry.lineString
            expect(testFeatureCollection).not.toBeFeatureCollection()
            expect(testFeatureCollection).not.toBeValidGeoJSON()
        })

        test('MultiLineString', () => {
            testFeatureCollection.features[0].geometry = badGeometry.multiLineString
            expect(testFeatureCollection).not.toBeFeatureCollection()
        })

        test('Polygon', () => {
            testFeatureCollection.features[0].geometry = badGeometry.polygon
            expect(testFeatureCollection).not.toBeFeatureCollection()
            expect(testFeatureCollection).not.toBeValidGeoJSON()
        })

        test('MultiPolygon', () => {
            testFeatureCollection.features[0].geometry = badGeometry.multiPolygon
            expect(testFeatureCollection).not.toBeFeatureCollection()
            expect(testFeatureCollection).not.toBeValidGeoJSON()
        })

        test('Unrecognized', () => {
            testFeatureCollection.features[0].geometry = badGeometry.unrecognized
            expect(testFeatureCollection).not.toBeFeatureCollection()
            expect(testFeatureCollection).not.toBeValidGeoJSON()
        })

        test('All', () => {
            testFeatureCollection.features = [
                { type: 'Feature', properties: {}, geometry: goodGeometry.point },
                { type: 'Feature', properties: {}, geometry: goodGeometry.multiPoint },
                { type: 'Feature', properties: {}, geometry: goodGeometry.lineString },
                { type: 'Feature', properties: {}, geometry: goodGeometry.multiLineString },
                { type: 'Feature', properties: {}, geometry: goodGeometry.polygon },
                { type: 'Feature', properties: {}, geometry: goodGeometry.multiPolygon },
                { type: 'Feature', properties: {}, geometry: nestedGeometryCollection },
                { type: 'Feature', properties: {}, geometry: badGeometry.point }
            ]
            expect(testFeatureCollection).not.toBeFeatureCollection()
            expect(testFeatureCollection).not.toBeValidGeoJSON()
        })
    })

    describe('Expect to fail with bad type value:', () => {
        test.each([...incorrectTypeValues])('type: %p', (input) => {
            const testFeatureCollection = {
                type: input,
                features: []
            }
            expect(testFeatureCollection).not.toBeFeatureCollection()
            expect(testFeatureCollection).not.toBeValidGeoJSON()
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
            const testFeatureCollection = {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'MultiPoint',
                        coordinates: [
                            [0, 0],
                            [1, 1]
                        ]
                    }
                ],
                bbox: input
            }
            expect(testFeatureCollection).not.toBeFeatureCollection()
            expect(testFeatureCollection).not.toBeValidGeoJSON()
        })
    })

    describe('Expect to fail when contains prohibited properties:', () => {
        test(`Contains: 'coordinates'`, () => {
            const testFeatureCollection = {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [0, 0]
                        },
                        properties: {
                            prop0: 'value0'
                        }
                    }
                ],
                coordinates: [
                    [0, 0],
                    [1, 1]
                ]
            }
            expect(testFeatureCollection).not.toBeFeatureCollection()
            expect(testFeatureCollection).not.toBeValidGeoJSON()
        })

        test(`Contains: 'geometries'`, () => {
            const testFeatureCollection = {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [0, 0]
                        },
                        properties: {
                            prop0: 'value0'
                        }
                    }
                ],
                geometries: [
                    {
                        type: 'Point',
                        coordinates: [102.0, 0.5]
                    },
                    {
                        type: 'Point',
                        coordinates: [122.0, -10.25]
                    }
                ]
            }

            expect(testFeatureCollection).not.toBeFeatureCollection()
            expect(testFeatureCollection).not.toBeValidGeoJSON()
        })

        test(`Contains: 'geometry'`, () => {
            const testFeatureCollection = {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [0, 0]
                        },
                        properties: {
                            prop0: 'value0'
                        }
                    }
                ],
                geometry: {
                    type: 'Point',
                    coordinates: [102.0, 0.5]
                },
                id: 33
            }

            expect(testFeatureCollection).not.toBeFeatureCollection()
            expect(testFeatureCollection).not.toBeValidGeoJSON()
        })

        test(`Contains: 'properties'`, () => {
            const testFeatureCollection = {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [0, 0]
                        },
                        properties: {
                            prop0: 'value0'
                        }
                    }
                ],
                properties: {
                    someProp: true
                }
            }

            expect(testFeatureCollection).not.toBeFeatureCollection()
            expect(testFeatureCollection).not.toBeValidGeoJSON()
        })
    })

    describe('Expect to fail when missing required properties:', () => {
        test(`Missing: 'type'`, () => {
            const testFeatureCollection = {
                features: []
            }
            expect(testFeatureCollection).not.toBeFeatureCollection()
            expect(testFeatureCollection).not.toBeValidGeoJSON()
        })

        test(`Missing: 'geometry'`, () => {
            const testFeatureCollection = {
                type: 'FeatureCollection'
            }
            expect(testFeatureCollection).not.toBeFeatureCollection()
            expect(testFeatureCollection).not.toBeValidGeoJSON()
        })
    })
})

describe('Error Snapshot Testing. Throws error:', () => {
    test('Valid use case passes', () => {
        expect(() =>
            expect({ type: 'FeatureCollection', features: [] }).not.toBeFeatureCollection()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Invalid input to matcher', () => {
        expect(() => expect(false).toBeFeatureCollection()).toThrowErrorMatchingSnapshot()
    })

    test('Invalid Type Value', () => {
        expect(() =>
            expect({ type: 'FeatureCollections', features: [] }).toBeFeatureCollection()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Has forbidden property: coordinates', () => {
        const testFeatureCollection = {
            type: 'FeatureCollection',
            features: [],
            coordinates: [0, 0]
        }
        expect(() =>
            expect(testFeatureCollection).toBeFeatureCollection()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Has forbidden property: geometries', () => {
        const testFeatureCollection = {
            type: 'FeatureCollection',
            features: [],
            geometries: []
        }
        expect(() =>
            expect(testFeatureCollection).toBeFeatureCollection()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Has forbidden property: geometry', () => {
        const testFeatureCollection = {
            type: 'FeatureCollection',
            features: [],
            geometry: null
        }
        expect(() =>
            expect(testFeatureCollection).toBeFeatureCollection()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Has forbidden property: properties', () => {
        const testFeatureCollection = {
            type: 'FeatureCollection',
            features: [],
            properties: null
        }
        expect(() =>
            expect(testFeatureCollection).toBeFeatureCollection()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Missing features', () => {
        const testFeatureCollection = {
            type: 'FeatureCollection'
        }
        expect(() =>
            expect(testFeatureCollection).toBeFeatureCollection()
        ).toThrowErrorMatchingSnapshot()
    })

    test('GeoJSON FeatureCollection features must be either an array of valid Feature objects', () => {
        const testFeatureCollection = {
            type: 'FeatureCollection',
            features: false
        }
        expect(() =>
            expect(testFeatureCollection).toBeFeatureCollection()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Invalid Bounding Box', () => {
        const testFeatureCollection = {
            type: 'FeatureCollection',
            features: [],
            bbox: [0]
        }
        expect(() =>
            expect(testFeatureCollection).toBeFeatureCollection()
        ).toThrowErrorMatchingSnapshot()
    })
})

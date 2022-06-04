const { goodGeometry, badGeometry, nestedGeometryCollection } = require('../geometries/data')

const invalidInputValues = [
    undefined,
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
    [[25, 35, 45000]],
    [[]],
    '',
    'Random Feature',
    '[0, 0]',
    JSON.stringify({
        type: 'Feature',
        geometry: null,
        properties: null
    })
]
const incorrectTypeValues = [
    ...invalidInputValues,
    null,
    'Point',
    'MultiPoint',
    'LineString',
    'MultiLineString',
    'Polygon',
    'MultiPolygon',
    'GeometryCollection',
    'FeatureCollection',
    'FEATURE',
    'feature'
]

describe('Valid Use Cases', () => {
    describe('Expect to pass with good geometries either with or without type argument:', () => {
        const testFeature = {
            type: 'Feature',
            geometry: null,
            properties: {
                prop1: 'Some Prop'
            }
        }

        test('Point', () => {
            testFeature.geometry = goodGeometry.point
            expect(testFeature).toBeFeature()
            expect(testFeature).toBeFeature('Point')
            expect(testFeature).not.toBeFeature('MultiPoint')
            expect(testFeature).toBeValidGeoJSON()
        })

        test('MultiPoint', () => {
            testFeature.geometry = goodGeometry.multiPoint
            expect(testFeature).toBeFeature()
            expect(testFeature).toBeFeature('MultiPoint')
            expect(testFeature).not.toBeFeature('Point')
            expect(testFeature).toBeValidGeoJSON()
        })

        test('LineString', () => {
            testFeature.geometry = goodGeometry.lineString
            expect(testFeature).toBeFeature()
            expect(testFeature).toBeFeature('LineString')
            expect(testFeature).not.toBeFeature('MultiLineString')
            expect(testFeature).toBeValidGeoJSON()
        })

        test('MultiLineString', () => {
            testFeature.geometry = goodGeometry.multiLineString
            expect(testFeature).toBeFeature()
            expect(testFeature).toBeFeature('MultiLineString')
            expect(testFeature).not.toBeFeature('LineString')
            expect(testFeature).toBeValidGeoJSON()
        })

        test('Polygon', () => {
            testFeature.geometry = goodGeometry.polygon
            expect(testFeature).toBeFeature()
            expect(testFeature).toBeFeature('Polygon')
            expect(testFeature).not.toBeFeature('MultiPolygon')
            expect(testFeature).toBeValidGeoJSON()
        })

        test('MultiPolygon', () => {
            testFeature.geometry = goodGeometry.multiPolygon
            expect(testFeature).toBeFeature()
            expect(testFeature).toBeFeature('MultiPolygon')
            expect(testFeature).not.toBeFeature('Polygon')
            expect(testFeature).toBeValidGeoJSON()
        })

        test('Nested GeometryCollections', () => {
            testFeature.geometry = nestedGeometryCollection
            expect(testFeature).toBeFeature()
            expect(testFeature).toBeFeature('GeometryCollection')
            expect(testFeature).not.toBeFeature('Polygon')
            expect(testFeature).toBeValidGeoJSON()
        })

        test('Geometry May be a Null Value', () => {
            testFeature.geometry = null
            testFeature.properties.prop2 = true
            expect(testFeature).toBeFeature()
            expect(testFeature).not.toBeFeature('Polygon')
            expect(testFeature).toBeValidGeoJSON()
        })
    })

    describe('Properties May be a Null or Empty Object:', () => {
        test('properties: null', () => {
            const testFeature = {
                type: 'Feature',
                geometry: null,
                properties: null
            }
            expect(testFeature).toBeFeature()
            expect(testFeature).not.toBeFeature('MultiPoint')
            expect(testFeature).toBeValidGeoJSON()
        })

        test('properties: {}', () => {
            const testFeature = {
                type: 'Feature',
                geometry: null,
                properties: {}
            }
            expect(testFeature).toBeFeature()
            expect(testFeature).not.toBeFeature('Point')
            expect(testFeature).toBeValidGeoJSON()
        })
    })

    describe('Optional ID Must Be String or Number', () => {
        const validIDs = [
            'ABCD',
            'Test 1',
            '1',
            '',
            '[[[180, 10.2, -125], [-180, 90, 35000]]], [{}]',
            0,
            200,
            -200,
            Infinity,
            -Infinity
        ]
        test.each(validIDs)('ID: %p', (input) => {
            const testFeature = {
                type: 'Feature',
                id: input,
                geometry: null,
                properties: null
            }
            expect(testFeature).toBeFeature()
            expect(testFeature).toBeValidGeoJSON()
        })
    })

    describe('Foreign Properties Allowed', () => {
        test('Single Foreign Property', () => {
            const testFeature = {
                type: 'Feature',
                geometry: null,
                properties: null,
                foreign: true
            }
            expect(testFeature).toBeFeature()
            expect(testFeature).toBeValidGeoJSON()
        })

        test('Multiple Foreign Properties', () => {
            const testFeature = {
                type: 'Feature',
                id: '#1',
                geometry: null,
                properties: null,
                foreign1: true,
                foreign2: 33
            }
            expect(testFeature).toBeFeature()
            expect(testFeature).toBeValidGeoJSON()
        })

        test('Foreign Property That Would Normally be a Valid GeoJSON Object', () => {
            const multiPoint = {
                type: 'MultiPoint',
                coordinates: [
                    [101.0, 0.0],
                    [102.0, 1.0]
                ]
            }
            const testFeature = {
                type: 'Feature',
                geometry: multiPoint,
                properties: null,
                geometryDuplicate: multiPoint,
                Geometry: [] // Note captitalized 'G'
            }

            expect(testFeature).toBeFeature()
            expect(testFeature).toBeValidGeoJSON()
        })
    })

    describe('Bounding Boxes Allowed, Must be Valid:', () => {
        test('2D Bounding Box', () => {
            const testFeature = {
                type: 'Feature',
                bbox: [-10.0, -10.0, 10.0, 10.0],
                geometry: {
                    type: 'Polygon',
                    coordinates: [
                        [
                            [-10.0, -10.0],
                            [10.0, -10.0],
                            [10.0, 10.0],
                            [-10.0, -10.0]
                        ]
                    ]
                },
                properties: null
            }

            expect(testFeature).toBeFeature()
            expect(testFeature).toBeValidGeoJSON()
        })

        test('3D Bounding Box', () => {
            const testFeature = {
                type: 'Feature',
                bbox: [-10.0, -10.0, 0, 10.0, 10.0, 200],
                geometry: {
                    type: 'Polygon',
                    coordinates: [
                        [
                            [-10.0, -10.0],
                            [10.0, -10.0],
                            [10.0, 10.0],
                            [-10.0, -10.0]
                        ]
                    ]
                },
                properties: null
            }

            expect(testFeature).toBeFeature()
            expect(testFeature).toBeValidGeoJSON()
        })

        test('Illogical Bounding Box', () => {
            const testFeature = {
                type: 'Feature',
                bbox: [-30.0, -30.0, -20.0, -20.0],
                geometry: {
                    type: 'Polygon',
                    coordinates: [
                        [
                            [-10.0, -10.0],
                            [10.0, -10.0],
                            [10.0, 10.0],
                            [-10.0, -10.0]
                        ]
                    ]
                },
                properties: null
            }

            expect(testFeature).toBeFeature()
            expect(testFeature).toBeValidGeoJSON()
        })

        test('Redundant Bounding Box', () => {
            const testFeature = {
                type: 'Feature',
                bbox: [0, 0, 0, 0],
                geometry: null,
                properties: null
            }

            expect(testFeature).toBeFeature()
            expect(testFeature).toBeValidGeoJSON()
        })
    })
})

describe('Invalid Use Cases', () => {
    describe('Expect to fail with bad inputs:', () => {
        test.each([...invalidInputValues, null])('expect(%p).not.toBeFeature()', (badInput) => {
            expect(badInput).not.toBeFeature()
            expect(badInput).not.toBeValidGeoJSON()
        })
    })

    describe('Expect to fail with invalid geometries:', () => {
        const testFeature = {
            type: 'Feature',
            geometry: null,
            properties: {
                prop1: 'Some Prop'
            }
        }

        test('Point', () => {
            testFeature.geometry = badGeometry.point
            expect(testFeature).not.toBeFeature()
            expect(testFeature).not.toBeFeature('MultiPoint')
            expect(testFeature).not.toBeValidGeoJSON()
        })

        test('MultiPoint', () => {
            testFeature.geometry = badGeometry.multiPoint
            expect(testFeature).not.toBeFeature()
            expect(testFeature).not.toBeFeature('Point')
            expect(testFeature).not.toBeValidGeoJSON()
        })

        test('LineString', () => {
            testFeature.geometry = badGeometry.lineString
            expect(testFeature).not.toBeFeature()
            expect(testFeature).not.toBeFeature('MultiLineString')
            expect(testFeature).not.toBeValidGeoJSON()
        })

        test('MultiLineString', () => {
            testFeature.geometry = badGeometry.multiLineString
            expect(testFeature).not.toBeFeature()
            expect(testFeature).not.toBeFeature('LineString')
            expect(testFeature).not.toBeValidGeoJSON()
        })

        test('Polygon', () => {
            testFeature.geometry = badGeometry.polygon
            expect(testFeature).not.toBeFeature()
            expect(testFeature).not.toBeFeature('MultiPolygon')
            expect(testFeature).not.toBeValidGeoJSON()
        })

        test('MultiPolygon', () => {
            testFeature.geometry = badGeometry.multiPolygon
            expect(testFeature).not.toBeFeature()
            expect(testFeature).not.toBeFeature('Polygon')
            expect(testFeature).not.toBeValidGeoJSON()
        })

        test('Unrecognized', () => {
            testFeature.geometry = badGeometry.unrecognized
            expect(testFeature).not.toBeFeature()
            expect(testFeature).not.toBeFeature('Polygon')
            expect(testFeature).not.toBeValidGeoJSON()
        })

        test('All', () => {
            testFeature.geometry = [
                goodGeometry.point,
                goodGeometry.multiPoint,
                goodGeometry.lineString,
                goodGeometry.multiLineString,
                goodGeometry.polygon,
                goodGeometry.multiPolygon
            ]
            expect(testFeature).not.toBeFeature()
            expect(testFeature).not.toBeFeature('Polygon')
            expect(testFeature).not.toBeValidGeoJSON()
        })
    })

    describe('Expect to fail with bad type value:', () => {
        test.each([...incorrectTypeValues, ...invalidInputValues, null])('type: %p', (input) => {
            const testFeature = {
                type: input,
                geometry: null,
                properties: null
            }
            expect(testFeature).not.toBeFeature()
            expect(testFeature).not.toBeValidGeoJSON()
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
            const testFeature = {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [102.0, 0.5]
                },
                properties: null,
                bbox: input
            }
            expect(testFeature).not.toBeFeature()
            expect(testFeature).not.toBeValidGeoJSON()
        })
    })

    describe('If present, ID must be alphanumeric. Not Allowed:', () => {
        const invalidBBoxes = [
            [null],
            [undefined],
            [true],
            [false],
            [NaN],
            [[]],
            [[25, 35, 45000]],
            [{ prop: 1 }],
            [{}]
        ]
        test.each(invalidBBoxes)('id: %p', (input) => {
            const testFeature = {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [102.0, 0.5]
                },
                properties: null,
                id: input
            }
            expect(testFeature).not.toBeFeature()
            expect(testFeature).not.toBeValidGeoJSON()
        })
    })

    describe('Expect to fail when contains prohibited properties:', () => {
        test(`Contains: 'coordinates'`, () => {
            const testFeature = {
                type: 'Feature',
                coordinates: [
                    [0, 0],
                    [1, 1, 0]
                ],
                geometry: {
                    type: 'Point',
                    coordinates: [102.0, 0.5]
                },
                properties: null
            }
            expect(testFeature).not.toBeFeature()
            expect(testFeature).not.toBeValidGeoJSON()
        })

        test(`Contains: 'geometries'`, () => {
            const testFeature = {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [102.0, 0.5]
                },
                properties: null,
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

            expect(testFeature).not.toBeFeature()
            expect(testFeature).not.toBeValidGeoJSON()
        })

        test(`Contains: 'features'`, () => {
            const testFeature = {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [102.0, 0.5]
                },
                properties: null,
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
                id: 33
            }

            expect(testFeature).not.toBeFeature()
            expect(testFeature).not.toBeValidGeoJSON()
        })

        describe('Expect to fail when missing required properties:', () => {
            test(`Missing: 'type'`, () => {
                const testFeature = {
                    properties: null,
                    geometry: {
                        type: 'Point',
                        coordinates: [102.0, 0.5]
                    }
                }
                expect(testFeature).not.toBeFeature()
                expect(testFeature).not.toBeValidGeoJSON()
            })

            test(`Missing: 'geometry'`, () => {
                const testFeature = {
                    type: 'Feature',
                    properties: null
                }
                expect(testFeature).not.toBeFeature()
                expect(testFeature).not.toBeValidGeoJSON()
            })

            test(`Missing: 'properties'`, () => {
                const testFeature = {
                    type: 'Feature',
                    geometry: null
                }
                expect(testFeature).not.toBeFeature()
                expect(testFeature).not.toBeValidGeoJSON()
            })
        })

        describe('Geometry Not an Object:', () => {
            test.each(invalidInputValues)(`geometry: %p`, (input) => {
                const testFeature = {
                    type: 'Feature',
                    properties: null,
                    geometry: input
                }

                expect(testFeature).not.toBeFeature()
                expect(testFeature).not.toBeValidGeoJSON()
            })

            test(`Single Element Array`, () => {
                const testFeature = {
                    type: 'Feature',
                    properties: null,
                    geometry: [
                        {
                            type: 'Point',
                            coordinates: [102.0, 0.5]
                        }
                    ]
                }

                expect(testFeature).not.toBeFeature()
                expect(testFeature).not.toBeValidGeoJSON()
            })

            test(`Multiple Elements Array`, () => {
                const testFeature = {
                    type: 'Feature',
                    properties: null,
                    geometry: [
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
                expect(testFeature).not.toBeFeature()
                expect(testFeature).not.toBeValidGeoJSON()
            })
        })

        describe('If Not Null, Properties Must be an Object:', () => {
            test.each(invalidInputValues)(`properties: %p`, (input) => {
                const testFeature = {
                    type: 'Feature',
                    properties: input,
                    geometry: null
                }

                expect(testFeature).not.toBeFeature()
                expect(testFeature).not.toBeValidGeoJSON()
            })
        })
    })
})

describe('Error Snapshot Testing. Throws error:', () => {
    test('Valid use case passes', () => {
        expect(() =>
            expect({ type: 'Feature', geometry: null, properties: null }).not.toBeFeature()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Invalid input to matcher', () => {
        expect(() => expect(false).toBeFeature()).toThrowErrorMatchingSnapshot()
    })

    test('Has forbidden property: coordinates', () => {
        const testFeature = {
            type: 'Feature',
            geometry: null,
            properties: null,
            coordinates: []
        }
        expect(() => expect(testFeature).toBeFeature()).toThrowErrorMatchingSnapshot()
    })

    test('Has forbidden property: geometries', () => {
        const testFeature = {
            type: 'Feature',
            geometry: null,
            properties: null,
            geometries: []
        }
        expect(() => expect(testFeature).toBeFeature()).toThrowErrorMatchingSnapshot()
    })

    test('Has forbidden property: features', () => {
        const testFeature = {
            type: 'Feature',
            geometry: null,
            properties: null,
            features: []
        }
        expect(() => expect(testFeature).toBeFeature()).toThrowErrorMatchingSnapshot()
    })

    test('Properties not an object', () => {
        const testFeature = {
            type: 'Feature',
            geometry: null,
            properties: true
        }
        expect(() => expect(testFeature).toBeFeature()).toThrowErrorMatchingSnapshot()
    })

    test('Missing geometry', () => {
        const testFeature = {
            type: 'Feature',
            properties: null
        }
        expect(() => expect(testFeature).toBeFeature()).toThrowErrorMatchingSnapshot()
    })

    test('Geometry not a valid GeoJSON object', () => {
        const testFeature = {
            type: 'Feature',
            geometry: false,
            properties: null
        }
        expect(() => expect(testFeature).toBeFeature()).toThrowErrorMatchingSnapshot()
    })

    test('Invalid Bounding Box', () => {
        const testFeature = {
            type: 'Feature',
            geometry: null,
            properties: null,
            bbox: [0]
        }
        expect(() => expect(testFeature).toBeFeature()).toThrowErrorMatchingSnapshot()
    })

    test('ID not alphanumeric', () => {
        const testFeature = {
            type: 'Feature',
            geometry: null,
            properties: null,
            id: [0]
        }
        expect(() => expect(testFeature).toBeFeature()).toThrowErrorMatchingSnapshot()
    })
})

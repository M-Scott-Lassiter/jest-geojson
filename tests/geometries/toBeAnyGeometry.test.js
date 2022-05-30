// This matcher works on all the same geometry cases.
// Accordingly, those specific tests check that this function also work.
// This test suite also checks it fails with types Feature or FeatureCollection.
// Finally, it tests the unique snapshots.

describe('Valid Use Cases', () => {
    test('Expect to pass with GeometryCollection', () => {
        const geometryCollection = {
            type: 'GeometryCollection',
            geometries: [
                {
                    type: 'Point',
                    coordinates: [100.0, 0.0]
                },
                {
                    type: 'LineString',
                    coordinates: [
                        [101.0, 0.0],
                        [102.0, 1.0]
                    ]
                }
            ]
        }
        expect(geometryCollection).toBeAnyGeometry()
    })
})

describe('Invalid Use Cases', () => {
    test('Expect to fail with Feature', () => {
        const feature = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [102.0, 0.5]
            }
        }
        expect(feature).not.toBeAnyGeometry()
    })

    test('Expect to fail with FeatureCollection', () => {
        const featureCollection = {
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
        expect(featureCollection).not.toBeAnyGeometry()
    })
})

describe('Error Snapshot Testing. Throws error:', () => {
    test(`expect({type: 'Point', coordinates: [0, 0]}).not.toBeAnyGeometry`, () => {
        expect(() =>
            expect({ type: 'Point', coordinates: [0, 0] }).not.toBeAnyGeometry()
        ).toThrowErrorMatchingSnapshot()
    })
    test('expect(false).toBeAnyGeometry', () => {
        expect(() => expect(false).toBeAnyGeometry()).toThrowErrorMatchingSnapshot()
    })
})

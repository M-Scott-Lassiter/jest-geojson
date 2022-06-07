const goodGeometry = {
    point: {
        type: 'Point',
        coordinates: [100.0, 0.0]
    },
    multiPoint: {
        type: 'MultiPoint',
        coordinates: [
            [101.0, 0.0],
            [102.0, 1.0]
        ]
    },
    lineString: {
        type: 'LineString',
        coordinates: [
            [101.0, 0.0],
            [102.0, 1.0]
        ]
    },
    multiLineString: {
        type: 'MultiLineString',
        coordinates: [
            [
                [100.0, 0.0, 0],
                [101.0, 1.0, 0]
            ],
            [
                [102.0, 2.0, 0],
                [103.0, 3.0, 0]
            ]
        ]
    },
    polygon: {
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
    multiPolygon: {
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
}

const badGeometry = {
    point: {
        type: 'Point',
        coordinates: [100.0, 0.0, 1, 1] // Too many values in coordinates
    },
    multiPoint: {
        type: 'MultiPoint',
        coordinates: [
            [101.0, 91], // Out of range latitude
            [102.0, 1.0]
        ]
    },
    lineString: {
        type: 'LineString',
        coordinates: [
            [101.0, '0.0'], // Non-numeric latitude
            [102.0, 1.0]
        ]
    },
    multiLineString: {
        type: 'MultiLineString',
        coordinates: [
            // Nested too deeply
            [
                [
                    [100.0, 0.0, 0],
                    [101.0, 1.0, 0]
                ],
                [
                    [102.0, 2.0, 0],
                    [103.0, 3.0, 0]
                ]
            ]
        ]
    },
    polygon: {
        type: 'Polygon',
        coordinates: [
            [
                [100.0, 0.0],
                [101.0, 0.0],
                [101.0, 1.0],
                [100.0, 1.0] // Last point doesn't match first
            ]
        ]
    },
    multiPolygon: {
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
                    [100.8, 0.2] // Last point doesn't match first
                ]
            ]
        ]
    },
    geometryCollection: {
        type: 'GeometryCollection',
        geometries: false
    },
    unrecognized: {
        type: 'UnrecognizedPoint', // Not a valid GeoJSON type
        coordinates: [100.0, 0.0]
    }
}

const nestedGeometryCollection = {
    type: 'GeometryCollection',
    geometries: [
        {
            type: 'GeometryCollection',
            geometries: [
                {
                    type: 'GeometryCollection',
                    geometries: [
                        {
                            type: 'Point',
                            coordinates: [5, 15]
                        }
                    ]
                },
                {
                    type: 'Point',
                    coordinates: [10, 20]
                }
            ]
        },
        {
            type: 'Point',
            coordinates: [20, 25]
        }
    ]
}

exports.goodGeometry = goodGeometry
exports.badGeometry = badGeometry
exports.nestedGeometryCollection = nestedGeometryCollection

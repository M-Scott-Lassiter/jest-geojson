const { goodGeometry, badGeometry, nestedGeometryCollection } = require('../geometries/data')

const validIDs = [0, -200, 200, Infinity, -Infinity]
const invalidSearchIDs = [
    '1',
    'Test 123',
    'Random ID String',
    '',
    NaN,
    null,
    true,
    false,
    { someProp: 'I am not GeoJSON', id: 4 },
    {},
    goodGeometry.lineString,
    goodGeometry.multiLineString,
    goodGeometry.multiPoint,
    goodGeometry.multiPolygon,
    goodGeometry.point,
    goodGeometry.polygon,
    nestedGeometryCollection,
    badGeometry.lineString,
    badGeometry.multiLineString,
    badGeometry.multiPoint,
    badGeometry.multiPolygon,
    badGeometry.point,
    badGeometry.polygon,
    badGeometry.geometryCollection,
    badGeometry.unrecognized
]
const invalidInputValues = [
    ...invalidSearchIDs,
    undefined,
    '',
    'Random Feature',
    JSON.stringify({
        type: 'Feature',
        geometry: null,
        properties: null
    })
]

describe('Valid Use Cases', () => {
    describe('Expect to pass with good features and IDs', () => {
        const testFeature = {
            type: 'Feature',
            geometry: goodGeometry.polygon,
            properties: null,
            id: null
        }

        describe('No Specific Callout: expect(testFeature).toHaveNumericID()', () => {
            test.each(validIDs)('ID: %p', (input) => {
                testFeature.id = input
                expect(testFeature).toHaveNumericID()
            })
        })

        describe('Specific Callout', () => {
            test.each(validIDs)('expect(testFeature).toHaveNumericID(%p)', (input) => {
                testFeature.id = input
                expect(testFeature).toHaveNumericID(input)
            })
        })

        describe('Specific Callout in Single Array Element', () => {
            test.each(validIDs)('expect(testFeature).toHaveNumericID([%p])', (input) => {
                testFeature.id = input
                expect(testFeature).toHaveNumericID([input])
            })
        })

        describe('Specific Callout RegExp', () => {
            test.each(validIDs)('expect(testFeature).toHaveNumericID(/%p/)', (input) => {
                testFeature.id = input
                expect(testFeature).toHaveNumericID(new RegExp(input))
            })
        })

        describe('Specific Callout RegExp in Single Array Element', () => {
            test.each(validIDs)('expect(testFeature).toHaveNumericID([/%p/])', (input) => {
                testFeature.id = input
                expect(testFeature).toHaveNumericID([new RegExp(input)])
            })
        })
    })

    describe('Expect to pass Multiple Array Value Checking for Numeric ID', () => {
        const searchArray = [
            [[1, 719, 0, 123]],
            [[-5, /7/, 15]],
            [[/719/, /123/, /\bString\b/]],
            [[/72[0-9]/, /\bString\b/, /71[0-9]/, 719]]
        ]

        test.each(searchArray)('ID Search Array: %p', (input) => {
            const testFeature = {
                type: 'Feature',
                geometry: goodGeometry.polygon,
                properties: null,
                id: 719
            }
            expect(testFeature).toHaveNumericID(input)
        })

        test('Empty Array for Optional Argument. ID: %p', () => {
            const testFeature = {
                type: 'Feature',
                geometry: null,
                properties: null,
                id: 719
            }
            expect(testFeature).toHaveNumericID([])
        })
    })
})

describe('Invalid Use Cases', () => {
    describe('Expect to fail with bad inputs:', () => {
        test.each(invalidInputValues)('expect(%p).not.toHaveNumericID()', (badInput) => {
            expect(badInput).not.toHaveNumericID()
        })
    })

    test('Fails when provided invalid feature', () => {
        const testFeature = {
            type: 'Feature',
            properties: null
        }
        expect(testFeature).not.toHaveNumericID()
    })

    test('Missing ID, searchID is empty array.', () => {
        const testFeature = {
            type: 'Feature',
            geometry: null,
            properties: null
        }
        expect(testFeature).not.toHaveNumericID([])
    })

    describe('Known good Feature with ID That Does Not Match:', () => {
        test.each([0, -500, 2000])('ID: %p', (input) => {
            const testFeature = {
                type: 'Feature',
                geometry: goodGeometry.polygon,
                properties: null,
                id: input
            }
            const badID = input + 1

            expect(testFeature).not.toHaveNumericID(badID)
            expect(testFeature).not.toHaveNumericID([badID])
            expect(testFeature).not.toHaveNumericID(new RegExp(badID))
            expect(testFeature).not.toHaveNumericID([new RegExp(badID)])
        })
    })

    describe('Expect to fail with non-numeric ID:', () => {
        test.each(invalidSearchIDs)('expect(testFeature).not.toHaveNumericID(%p)', (badInput) => {
            const testFeature = {
                type: 'Feature',
                geometry: goodGeometry.polygon,
                properties: null,
                id: badInput
            }

            expect(testFeature).not.toHaveNumericID(badInput)
            expect(testFeature).not.toHaveNumericID([badInput])
            expect(testFeature).not.toHaveNumericID(new RegExp(badInput))
            expect(testFeature).not.toHaveNumericID([new RegExp(badInput)])
        })
    })

    test('Fails when no ID provided to valid feature', () => {
        const testFeature = {
            type: 'Feature',
            geometry: null,
            properties: null
        }
        expect(testFeature).not.toHaveNumericID()
    })
})

describe('Error Snapshot Testing. Throws error:', () => {
    test('Valid use case passes', () => {
        const testFeature = {
            type: 'Feature',
            geometry: goodGeometry.polygon,
            properties: null,
            id: 755
        }
        expect(() => expect(testFeature).not.toHaveNumericID()).toThrowErrorMatchingSnapshot()
    })

    test('Invalid input to matcher', () => {
        expect(() =>
            expect(goodGeometry.lineString).toHaveNumericID()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Non-numeric search ID', () => {
        const testFeature = {
            type: 'Feature',
            geometry: goodGeometry.polygon,
            properties: null,
            id: 1
        }
        expect(() => expect(testFeature).toHaveNumericID('1')).toThrowErrorMatchingSnapshot()
    })

    test('No ID Is Present', () => {
        const testFeature = {
            type: 'Feature',
            geometry: null,
            properties: null
        }
        expect(() => expect(testFeature).toHaveNumericID()).toThrowErrorMatchingSnapshot()
        expect(() => expect(testFeature).toHaveNumericID([])).toThrowErrorMatchingSnapshot()
    })

    test('ID Present, Empty Array Search', () => {
        const testFeature = {
            type: 'Feature',
            geometry: null,
            properties: null,
            id: 22
        }
        expect(() => expect(testFeature).not.toHaveNumericID([])).toThrowErrorMatchingSnapshot()
    })

    test('ID Present, Search for Wrong ID', () => {
        const testFeature = {
            type: 'Feature',
            geometry: null,
            properties: null,
            id: 22
        }
        expect(() => expect(testFeature).toHaveNumericID(21)).toThrowErrorMatchingSnapshot()
        expect(() => expect(testFeature).toHaveNumericID([23])).toThrowErrorMatchingSnapshot()
    })

    test('String ID', () => {
        const testFeature = {
            type: 'Feature',
            geometry: null,
            properties: null,
            id: '22'
        }
        expect(() => expect(testFeature).toHaveNumericID('22')).toThrowErrorMatchingSnapshot()
    })
})

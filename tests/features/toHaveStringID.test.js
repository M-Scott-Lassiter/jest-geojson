const { goodGeometry, badGeometry, nestedGeometryCollection } = require('../geometries/data')

const validIDs = ['1', 'Test 123', 'Random ID String', '']
const invalidSearchIDs = [
    0,
    -200,
    200,
    Infinity,
    -Infinity,
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

        describe('No Specific Callout: expect(testFeature).toHaveStringID()', () => {
            test.each(validIDs)('ID: %p', (input) => {
                testFeature.id = input
                expect(testFeature).toHaveStringID()
            })
        })

        describe('Specific Callout', () => {
            test.each(validIDs)('expect(testFeature).toHaveStringID(%p)', (input) => {
                testFeature.id = input
                expect(testFeature).toHaveStringID(input)
            })
        })

        describe('Specific Callout in Single Array Element', () => {
            test.each(validIDs)('expect(testFeature).toHaveStringID([%p])', (input) => {
                testFeature.id = input
                expect(testFeature).toHaveStringID([input])
            })
        })

        describe('Specific Callout RegExp', () => {
            test.each(validIDs)('expect(testFeature).toHaveStringID(/%p/)', (input) => {
                testFeature.id = input
                expect(testFeature).toHaveStringID(new RegExp(input))
            })
        })

        describe('Specific Callout RegExp in Single Array Element', () => {
            test.each(validIDs)('expect(testFeature).toHaveStringID([/%p/])', (input) => {
                testFeature.id = input
                expect(testFeature).toHaveStringID([new RegExp(input)])
            })
        })
    })

    describe('Expect to pass Multiple Array Value Checking for Numeric ID', () => {
        const searchArray = [
            [['1', '#719', 'TestID', 'Some String']],
            [['A String ID', /Some/, '2']],
            [[/SomeString/, /123/, /\bString\b/]],
            [[/72[0-9]/, /\bString\b/, /71[0-9]/, /Some/, 'Some String']]
        ]

        test.each(searchArray)('ID Search Array: %p', (input) => {
            const testFeature = {
                type: 'Feature',
                geometry: goodGeometry.polygon,
                properties: null,
                id: 'Some String'
            }
            expect(testFeature).toHaveStringID(input)
        })

        test('Empty Array for Optional Argument. ID: %p', () => {
            const testFeature = {
                type: 'Feature',
                geometry: null,
                properties: null,
                id: 'Test ID'
            }
            expect(testFeature).toHaveStringID([])
        })
    })
})

describe('Invalid Use Cases', () => {
    describe('Expect to fail with bad inputs:', () => {
        test.each(invalidInputValues)('expect(%p).not.toHaveStringID()', (badInput) => {
            expect(badInput).not.toHaveStringID()
        })
    })

    test('Fails when provided invalid feature', () => {
        const testFeature = {
            type: 'Feature',
            properties: null
        }
        expect(testFeature).not.toHaveStringID()
    })

    test('Missing ID, searchID is empty array.', () => {
        const testFeature = {
            type: 'Feature',
            geometry: null,
            properties: null
        }
        expect(testFeature).not.toHaveStringID([])
    })

    describe('Known good Feature with ID That Does Not Match:', () => {
        test.each(validIDs)('ID: %p', (input) => {
            const testFeature = {
                type: 'Feature',
                geometry: goodGeometry.polygon,
                properties: null,
                id: input
            }
            const badID = `${input}ExtraString`

            expect(testFeature).not.toHaveStringID(badID)
            expect(testFeature).not.toHaveStringID([badID])
            expect(testFeature).not.toHaveStringID(new RegExp(badID))
            expect(testFeature).not.toHaveStringID([new RegExp(badID)])
        })
    })

    describe('Expect to fail with non-string ID:', () => {
        test.each(invalidSearchIDs)('expect(testFeature).not.toHaveStringID(%p)', (badInput) => {
            const testFeature = {
                type: 'Feature',
                geometry: goodGeometry.polygon,
                properties: null,
                id: badInput
            }

            expect(testFeature).not.toHaveStringID(badInput)
            expect(testFeature).not.toHaveStringID([badInput])
            expect(testFeature).not.toHaveStringID(new RegExp(badInput))
            expect(testFeature).not.toHaveStringID([new RegExp(badInput)])
        })
    })

    test('Fails when no ID provided to valid feature', () => {
        const testFeature = {
            type: 'Feature',
            geometry: null,
            properties: null
        }
        expect(testFeature).not.toHaveStringID()
    })
})

describe('Error Snapshot Testing. Throws error:', () => {
    test('Valid use case passes', () => {
        const testFeature = {
            type: 'Feature',
            geometry: goodGeometry.polygon,
            properties: null,
            id: '#1 Test'
        }
        expect(() => expect(testFeature).not.toHaveStringID()).toThrowErrorMatchingSnapshot()
    })

    test('Invalid input to matcher', () => {
        expect(() =>
            expect(goodGeometry.lineString).toHaveStringID()
        ).toThrowErrorMatchingSnapshot()
    })

    test('Non-string search ID', () => {
        const testFeature = {
            type: 'Feature',
            geometry: goodGeometry.polygon,
            properties: null,
            id: 'Test'
        }
        expect(() => expect(testFeature).toHaveStringID(1)).toThrowErrorMatchingSnapshot()
    })

    test('No ID Is Present', () => {
        const testFeature = {
            type: 'Feature',
            geometry: null,
            properties: null
        }
        expect(() => expect(testFeature).toHaveStringID()).toThrowErrorMatchingSnapshot()
    })

    test('ID Present, Empty Array Search', () => {
        const testFeature = {
            type: 'Feature',
            geometry: null,
            properties: null,
            id: '22'
        }
        expect(() => expect(testFeature).not.toHaveStringID([])).toThrowErrorMatchingSnapshot()
    })

    test('ID Present, Search for Wrong ID', () => {
        const testFeature = {
            type: 'Feature',
            geometry: null,
            properties: null,
            id: '22'
        }
        expect(() => expect(testFeature).toHaveStringID(['21'])).toThrowErrorMatchingSnapshot()
    })

    test('Numeric ID', () => {
        const testFeature = {
            type: 'Feature',
            geometry: null,
            properties: null,
            id: 22
        }
        expect(() => expect(testFeature).toHaveStringID(22)).toThrowErrorMatchingSnapshot()
    })
})

const { goodGeometry, badGeometry, nestedGeometryCollection } = require('../geometries/data')

const validIDs = [0, -200, 200, Infinity, -Infinity, '1', 'Test 123', 'Random ID String', '']
const invalidSearchIDs = [
    null,
    true,
    false,
    { someProp: 'I am not GeoJSON', id: 4 },
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
    0,
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

        describe('No Specific Callout: expect(testFeature).toHaveID()', () => {
            test.each(validIDs)('ID: %p', (input) => {
                testFeature.id = input
                expect(testFeature).toHaveID()
            })
        })

        describe('Specific Callout', () => {
            test.each(validIDs)('expect(testFeature).toHaveID(%p)', (input) => {
                testFeature.id = input
                expect(testFeature).toHaveID(input)
            })
        })

        describe('Specific Callout in Single Array Element', () => {
            test.each(validIDs)('expect(testFeature).toHaveID([%p])', (input) => {
                testFeature.id = input
                expect(testFeature).toHaveID([input])
            })
        })

        describe('Specific Callout RegExp', () => {
            test.each(validIDs)('expect(testFeature).toHaveID(/%p/)', (input) => {
                testFeature.id = input
                expect(testFeature).toHaveID(new RegExp(input))
            })
        })

        describe('Specific Callout RegExp in Single Array Element', () => {
            test.each(validIDs)('expect(testFeature).toHaveID([/%p/])', (input) => {
                testFeature.id = input
                expect(testFeature).toHaveID([new RegExp(input)])
            })
        })
    })

    describe('Expect to pass Multiple Array Value Checking for Numeric ID', () => {
        const searchArray = [
            [[1, 2, 3, 719]],
            [['1', 719, '2', '3']],
            [[/[0-9]+/, 2, 3, 'F1']],
            [[755, /71[0-9]/]],
            [[/72[0-9]/, /81[0-9]/, /71[0-9]/, /[0-9]+/]]
        ]

        test.each(searchArray)('ID Search Array: %p', (input) => {
            const testFeature = {
                type: 'Feature',
                geometry: goodGeometry.polygon,
                properties: null,
                id: 719
            }
            expect(testFeature).toHaveID(input)
        })

        test.each(['Test ID', 3])('Empty Array for Optional Argument. ID: %p', (input) => {
            const testFeature = {
                type: 'Feature',
                geometry: null,
                properties: null,
                id: input
            }
            expect(testFeature).toHaveID([])
        })
    })

    describe('Expect to pass Multiple Array Value Checking for String ID', () => {
        const testFeature = {
            type: 'Feature',
            geometry: goodGeometry.polygon,
            properties: null,
            id: 'Some String'
        }
        const searchArray = [
            [['1', 719, '2', 3, 'Some String']],
            [['A String ID', /Some/, 2]],
            [[/SomeString/, /123/, /\bString\b/]],
            [[/72[0-9]/, /\bString\b/, /71[0-9]/, /Some/]]
        ]

        test.each(searchArray)('ID Search Array: %p', (input) => {
            expect(testFeature).toHaveID(input)
        })
    })
})

describe('Invalid Use Cases', () => {
    describe('Expect to fail with bad inputs:', () => {
        test.each(invalidInputValues)('expect(%p).not.toHaveID()', (badInput) => {
            expect(badInput).not.toHaveID()
        })
    })

    test('Fails when provided invalid feature', () => {
        const testFeature = {
            type: 'Feature',
            properties: null
        }
        expect(testFeature).not.toHaveID()
    })

    test('Missing ID, searchID is empty array.', () => {
        const testFeature = {
            type: 'Feature',
            geometry: null,
            properties: null
        }
        expect(testFeature).not.toHaveID([])
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

            expect(testFeature).not.toHaveID(badID)
            expect(testFeature).not.toHaveID([badID])
            expect(testFeature).not.toHaveID(new RegExp(badID))
            expect(testFeature).not.toHaveID([new RegExp(badID)])
        })
    })

    describe('Expect to fail with non-alphanumeric search ID:', () => {
        test.each(invalidSearchIDs)('expect(testFeature).not.toHaveID(%p)', (badInput) => {
            const testFeature = {
                type: 'Feature',
                geometry: goodGeometry.polygon,
                properties: null,
                id: 1
            }
            expect(testFeature).not.toHaveID(badInput)
        })
    })

    test('Fails when no ID provided to valid feature', () => {
        const testFeature = {
            type: 'Feature',
            geometry: null,
            properties: null
        }
        expect(testFeature).not.toHaveID()
    })
})

describe('Error Snapshot Testing. Throws error:', () => {
    test('Valid use case passes', () => {
        const testFeature = {
            type: 'Feature',
            geometry: goodGeometry.polygon,
            properties: null,
            id: 1
        }
        expect(() => expect(testFeature).not.toHaveID(1)).toThrowErrorMatchingSnapshot()
    })

    test('Invalid input to matcher', () => {
        expect(() => expect(goodGeometry.lineString).toHaveID()).toThrowErrorMatchingSnapshot()
    })

    test('Non-alphanumeric search ID', () => {
        const testFeature = {
            type: 'Feature',
            geometry: goodGeometry.polygon,
            properties: null,
            id: 1
        }
        expect(() => expect(testFeature).toHaveID(NaN)).toThrowErrorMatchingSnapshot()
    })

    test('No ID Is Present', () => {
        const testFeature = {
            type: 'Feature',
            geometry: null,
            properties: null
        }
        expect(() => expect(testFeature).toHaveID()).toThrowErrorMatchingSnapshot()
    })

    test('ID Present, Empty Array Search', () => {
        const testFeature = {
            type: 'Feature',
            geometry: null,
            properties: null,
            id: 22
        }
        expect(() => expect(testFeature).not.toHaveID([])).toThrowErrorMatchingSnapshot()
    })

    test('ID Present, Search for Wrong ID', () => {
        const testFeature = {
            type: 'Feature',
            geometry: null,
            properties: null,
            id: 22
        }
        expect(() => expect(testFeature).toHaveID([21])).toThrowErrorMatchingSnapshot()
    })
})

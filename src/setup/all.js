const matchers = require('../matchers')

exports.throwJestRuntimeError = () => {
    throw new Error(
        "Unable to find Jest's global expect.\n\n" +
            'Please check you have added jest-geojson correctly to your jest configuration.\n\n' +
            'For help, see https://github.com/M-Scott-Lassiter/jest-geojson/tree/beta#configure-jest\n\n'
    )
}

const jestExpect = global.expect

if (jestExpect !== undefined) {
    expect.extend(matchers.coordinates)
    // expect.extend(matchers.boundingBoxes)
} else {
    exports.throwJestRuntimeError()
}

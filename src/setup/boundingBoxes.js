const matchers = require('../matchers')
const { throwJestRuntimeError } = require('./all')

const jestExpect = global.expect

if (jestExpect !== undefined) {
    expect.extend(matchers.boundingBoxes)
} else {
    throwJestRuntimeError()
}

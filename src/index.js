/* This is the entry point the jest-geojson package. Example usage in other projects:

       import * as matchers from 'jest-extended'
       expect.extend(matchers)

    The top half of this file contains the project's namespace and type definitions.
    The bottom half contains the exported matcher functions. Adding any other type
    of function to these exports will cause a Jest runtime error.

    Add new exports to this file in alphabetical order by folder structure to
    make it easier to find and maintain.
*/

/**
 * A set of matchers related to validating coordinates and coordinate properties.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc7946#section-4
 * @namespace Coordinates
 */

/**
 * Core functionality used internal to jest-geojson.
 *
 * @private
 * @namespace Core
 */

/**
 * Coordinate functions used within Core.
 *
 * @private
 * @namespace Core.Coordinates
 */

/**
 * This is the object that Jest matchers return to the <code>expect()</code> function.
 * All custom matchers should return this type of object.
 *
 * @typedef JestMatchingObject
 * @type {object}
 * @property {boolean} pass Whether the test passed or not
 * @property {Function} message An arrow function that returns the message from the test
 * @see https://jestjs.io/docs/expect#expectextendmatchers
 * @example
 * { pass: false, message: () => 'This test failed' }
 * @example
 * { pass: true, message: () => 'This test passed' }
 */

// //////////////////// Module Exports Begin Here //////////////////// //

// Bounding Boxes

// Coordinates
exports.isValid2DCoordinate =
    require('./matchers/coordinates/isValid2DCoordinate').isValid2DCoordinate
exports.isValid3DCoordinate =
    require('./matchers/coordinates/isValid3DCoordinate').isValid3DCoordinate
exports.isValidCoordinate = require('./matchers/coordinates/isValidCoordinate').isValidCoordinate
// Features

// Geometries

// Properties

// Winding

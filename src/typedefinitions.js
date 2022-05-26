/* eslint-disable global-require */
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
 * GeoJSON tailored matchers used to extend the Jest testing framework.
 *
 * @private
 * @namespace Matchers
 */

/**
 * A set of matchers related to validating coordinates and coordinate properties.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc7946#section-5
 * @namespace Matchers.BoundingBoxes
 */

/**
 * A set of matchers related to validating coordinates and coordinate properties.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc7946#section-4
 * @namespace Matchers.Coordinates
 */

/**
 * A set of matchers related to validating coordinates and coordinate properties.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc7946#section-3.1
 * @namespace Matchers.Geometries
 */

/**
 * Core functionality used internal to jest-geojson.
 *
 * @private
 * @namespace Core
 */

/**
 * Coordinate validation functions used within Core.
 *
 * @private
 * @namespace Core.Coordinates
 */

/**
 * Bounding Box validation functions used within Core.
 *
 * @private
 * @namespace Core.BoundingBoxes
 */

/**
 * Geometry object validation functions used within Core.
 *
 * @private
 * @namespace Core.Geometries
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

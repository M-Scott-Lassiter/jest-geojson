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
 * All matchers should return an object like the examples below.
 *
 * @private
 * @namespace Matchers
 * @see https://jestjs.io/docs/expect#expectextendmatchers
 * @example
 * // Passing
 * { pass: true, message: () => 'This test passed' }
 * @example
 * // Failing
 * { pass: false, message: () => 'This test failed' }
 */

/**
 * A set of matchers related to validating bounding boxes.
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
 * A set of matchers related to validating FeatureCollection objects.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc7946#section-3.3
 * @namespace Matchers.FeatureCollections
 */

/**
 * A set of matchers related to validating feature objects.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc7946#section-3.2
 * @namespace Matchers.Features
 */

/**
 * Functional matchers assess more generic attributes and qualities and many accept multiple input types.
 *
 * @namespace Matchers.Functional
 */

/**
 * A set of matchers related to validating the seven geometry objects.
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
 * FeatureCollection object validation functions used within Core.
 *
 * @private
 * @namespace Core.FeatureCollections
 */

/**
 * Feature object validation functions used within Core.
 *
 * @private
 * @namespace Core.Features
 */

/**
 * Geometry object validation functions used within Core.
 *
 * @private
 * @namespace Core.Geometries
 */

/**
 * Various helper functions used within Core.
 *
 * @private
 * @namespace Core.Utilities
 */

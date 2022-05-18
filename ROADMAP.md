# Discussion

This library aims to provide a comprehensive set of GeoJSON matchers to extend the Jest unit testing framework.

# Matchers

This document divides the intended matchers into categories and lists them in priority development order.

## Coordiantes

-   [ ] areValid2DCoordinates
-   [ ] areValid3DCoordinates
-   [ ] areValidCoordinates
-   [ ] toHaveExactPrecision (num decimal places)
-   [ ] toHaveMaxPrecision (num decimal places)
-   [ ] toHaveMinPrecision (num decimal places)
-   [ ] toHavePrecisionBetween (min decimal places, max decimal places)
-   [ ] hasPointCountOf (# of points)
-   [ ] hasMinPointCountOf
-   [ ] hasMaxPointCountOf
-   [ ] hasPointCountBetween (min, max)
-   [ ] containsAnyCoordinatesIn ([unordered array of points])
-   [ ] containsAllCoordinatesIn ([unordered array of points])
-   [ ] containsPointsInOrder ([array of ordered points])

## Geometries

-   [ ] toBePointGeometry
-   [ ] toBeMultiPointGeometry
-   [ ] toBeLineStringGeometry
-   [ ] toBeMultiLineStringGeometry
-   [ ] toBePolygonGeometry
-   [ ] toBeMultiPolygonGeometry
-   [ ] toBeGeometryCollection
-   [ ] toBeAnyGeometry

## Features

-   [ ] toBePointFeature
-   [ ] toBeMultiPointFeature
-   [ ] toBeLineStringFeature
-   [ ] toBeMultiLineStringFeature
-   [ ] toBePolygonFeature
-   [ ] toBeMultiPolygonFeature
-   [ ] toBeGeometryCollectionFeature
-   [ ] toBeAnyFeature
-   [ ] toBeFeatureCollection
-   [ ] toContainFeatureTypes (array of feature type strings, optional min count, optional max count)
-   [ ] toBeValidGeoJSON

## Bounding Boxes

-   [ ] toHave2DBoundingBox
-   [ ] toHave3DBoundingBox
-   [ ] toHaveBoundingBox
-   [ ] toCrossAntimeridian
-   [ ] toIncludeNorthPole
-   [ ] toIncludeSouthPole
-   [ ] toIncludeEitherPole
-   [ ] toBeContainedWithinBBox

## Properties and Foreign Members

-   [ ] toHaveStringIDs
-   [ ] toHaveNumericIDs
-   [ ] toHaveIDs
-   [ ] toContainOnlyUniqueIDs
-   [ ] toContainSpecificIDs ([unordered array of IDs])
-   [ ] toContainOnlyIDs ([unordered array of IDs])
-   [ ] toHaveProperties (boolean)
-   [ ] toHaveSpecificProperty (string or object to compare)
-   [ ] toHaveForeignMembers (boolean)
-   [ ] toHaveSpecificForeignMember (string or object to compare)

## Winding and Other

-   [ ] isCounterClockwiseWound
-   [ ] isClockwiseWound
-   [ ] isMultiPolygonWithHole
-   [ ] isKinked

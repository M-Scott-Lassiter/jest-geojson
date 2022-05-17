# Discussion

This project aims to provide a comprehensive set of matchers for the Jest framework. The data below lists the intended matchers it will ultimately contain.

# Matching Modules

## Coordiantes

-   [ ] isValidCoordinate
-   [ ] isValid2DCoordinate
-   [ ] isValid3DCoordinate
-   [ ] hasExactPrecision(decimal places)
-   [ ] hasPrecisionBetween(min decimal places, max decimal places)
-   [ ] hasMaxPrecision(decimal places)
-   [ ] hasMinPrecision(decimal places)

## Geometries

-   [ ] toHaveAnyGeometry(optional min count, optional max count)
-   [ ] toHavePointGeometry(optional min count, optional max count)
-   [ ] toHaveMultiPointGeometry(optional min count, optional max count)
-   [ ] toHaveLineStringGeometry(optional min count, optional max count)
-   [ ] toHaveMultiLineStringGeometry(optional min count, optional max count)
-   [ ] toHavePolygonGeometry(optional min count, optional max count)
-   [ ] toHaveMultiPolygonGeometry(optional min count, optional max count)
-   [ ] toHaveGeometryCollection(optional min count, optional max count)

## Features

-   [ ] toBeValidGeoJSON
-   [ ] toBeFeatureCollection
-   [ ] toBeFeatureCollectionOf(array<types>)
-   [ ] toBeAnyFeature
-   [ ] toBePointFeature
-   [ ] toBeMultiPointFeature
-   [ ] toBeLineStringFeature
-   [ ] toBeMultiLineStringFeature
-   [ ] toBePolygonFeature
-   [ ] toBeMultiPolygonFeature
-   [ ] toBeGeometryCollectionFeature
-   [ ] toContainFeatures[feature type, optional min count, optional max count]

## Bounding Boxes

-   [ ] toHaveBoundingBox
-   [ ] toHave2DBoundingBox
-   [ ] toHave3DBoundingBox
-   [ ] crossesAntimeridian
-   [ ] includesNorthPole
-   [ ] includesSouthPole
-   [ ] includesEitherPole

## Points

-   [ ] hasPointCountOf(# of points)
-   [ ] hasMinPointCountOf
-   [ ] hasMaxPointCountOf
-   [ ] hasPointCountOfRange(min, max)
-   [ ] containsAnyPoints([array of points])
-   [ ] containsSpecificPoints([array of points])
-   [ ] containsPointsInOrder([array of ordered points])

## Properties and Foreign Members

-   [ ] hasID
-   [ ] hasStringID
-   [ ] hasNumericID
-   [ ] hasOnlyUniqueIDs
-   [ ] containsSpecificIDs
-   [ ] containsOnlyIDs
-   [ ] hasProperties
-   [ ] hasSpecificProperty
-   [ ] hasForeignMembers
-   [ ] hasSpecificForeignMember

## Winding

-   [ ] isCounterClockwiseWound
-   [ ] isClockwiseWound
-   [ ] isMultiPolygonWithHole
-   [ ] isKinked

<div align="center">

# jest-geojson

[![NPM Version](https://img.shields.io/npm/v/jest-geojson)](https://www.npmjs.com/package/jest-geojson)
[![NPM Package Size](https://img.shields.io/bundlephobia/min/jest-geojson)](https://www.npmjs.com/package/jest-geojson)
[![License](https://img.shields.io/github/license/M-Scott-Lassiter/jest-geojson?color=blue)](https://github.com/M-Scott-Lassiter/jest-geojson/blob/main/LICENSE)

---

[![Tests](https://github.com/M-Scott-Lassiter/jest-geojson/actions/workflows/test.yml/badge.svg)](https://github.com/M-Scott-Lassiter/jest-geojson/actions/workflows/test.yml)
[![Build](https://github.com/M-Scott-Lassiter/jest-geojson/actions/workflows/publish.yml/badge.svg)](https://github.com/M-Scott-Lassiter/jest-geojson/actions/workflows/publish.yml)
[![codecov](https://codecov.io/github/M-Scott-Lassiter/jest-geojson/branch/main/graph/badge.svg?token=MLCXIHQJGA)](https://codecov.io/github/M-Scott-Lassiter/jest-geojson)
[![Dependency status](https://img.shields.io/librariesio/release/npm/jest-geojson)](https://www.npmjs.com/package/jest-geojson?activeTab=dependencies)
![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/jest-geojson)
[![Open Issues](https://img.shields.io/github/issues/m-scott-lassiter/jest-geojson/bug)](https://github.com/M-Scott-Lassiter/jest-geojson/labels/bug)

[![Maintained](https://img.shields.io/badge/Maintained%3F-yes-brightgreen.svg)](#envelope-contact)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](/../../blob/main/CONTRIBUTING.md)

## Note: This project is still in beta

</div>

<details open="open">
    <summary><b>Table of Contents</b></summary>

<!-- Note: The toc tags mark autogenerated content. Do not manually modify the content here -->

<!-- toc -->

-   [Purpose](#purpose)
    -   [What This Library Does](#what-this-library-does)
    -   [What This Library Does Not Do](#what-this-library-does-not-do)
-   [Getting Started](#getting-started)
    -   [Install as a Dev Dependency](#install-as-a-dev-dependency)
    -   [Configure Jest](#configure-jest)
    -   [Import the Core Engine](#import-the-core-engine)
-   [Matchers](#matchers)
    -   [Coordiante Matchers](#coordiante-matchers)
    -   [Bounding Box Matchers](#bounding-box-matchers)
    -   [Geometry Matchers](#geometry-matchers)
    -   [Geometry Collection Matchers](#geometry-collection-matchers)
    -   [Feature Matchers](#feature-matchers)
    -   [Feature Collection Matchers](#feature-collection-matchers)
    -   [Functional Matchers](#functional-matchers)
-   [License and Development](#license-and-development)
-   [Contact](#contact)

<!-- tocstop -->

</details>

---

# Purpose

## What This Library Does

`jest-geojson` extends the [Jest](https://github.com/facebook/jest) unit testing framework with a comprehensive set of matchers tailored to checking [GeoJSON object](https://geojson.org/) validity and other typical geodesy attributes. For example:

```javascript
test('Object is valid GeoJSON', () => {
    expect(myGeoJSONObject).toBeValidGeoJSON()
})
```

Additionally, you can use the underlying engine outside of the Jest context so you can directly use the validation functions within your own code.

## What This Library Does Not Do

This library does not create or manipulate GeoJSON.

Other projects have done that (and better), such as the venerable [Turf.js](https://github.com/Turfjs/turf). This library complements, not competes with, those tools.

# Getting Started

## Install as a Dev Dependency

```javascript
npm install --save-dev jest jest-geojson
```

## Configure Jest

< Under Construction >

---

## Import the Core Engine

```javascript
const jest-geojson = require(jest-geojson).core
```

# Matchers

`jest-geojson` organizes matchers by categories that correspond to the input type passed to `expect()`.

Functional matchers assess for more generic attributes or qualities and accept multiple input types.

Release version 1.0.0 will contain the minimum matchers (listed in priority development order) needed to validate GeoJSON elements.

## Coordiante Matchers

_1.0.0_

-   [x] isValid2DCoordinate
-   [x] isValid3DCoordinate
-   [ ] isValidCoordinate

## Bounding Box Matchers

_1.0.0_

-   [ ] isValid2DBoundingBox
-   [ ] isValid3DBoundingBox
-   [ ] isValidBoundingBox

## Geometry Matchers

_1.0.0_

-   [ ] toBePointGeometry
-   [ ] toBeMultiPointGeometry
-   [ ] toBeLineStringGeometry
-   [ ] toBeMultiLineStringGeometry
-   [ ] toBePolygonGeometry
-   [ ] toBeMultiPolygonGeometry
-   [ ] toBeAnyGeometry

---

_Future_

-   [ ] isMultiPolygonWithHole

## Geometry Collection Matchers

_1.0.0_

-   [ ] toBeGeometryCollection

---

_Future_

-   [ ] toHaveMinGeometryCount
-   [ ] toHaveMaxGeometeyCount
-   [ ] toHaveGeometeyCount (equal/min, max)
-   [ ] toContainGeometryTypes (array of Geometry type strings, optional min count, optional max count)

## Feature Matchers

_1.0.0_

-   [ ] toBePointFeature
-   [ ] toBeMultiPointFeature
-   [ ] toBeLineStringFeature
-   [ ] toBeMultiLineStringFeature
-   [ ] toBePolygonFeature
-   [ ] toBeMultiPolygonFeature
-   [ ] toBeGeometryCollectionFeature
-   [ ] toBeAnyFeature

---

_Future_

-   [ ] toHaveID
-   [ ] toHaveStringID
-   [ ] toHaveNumericID
-   [ ] toHave2DBoundingBox
-   [ ] toHave3DBoundingBox
-   [ ] toHaveBoundingBox
-   [ ] toHaveProperties
-   [ ] toHaveForeignMembers

## Feature Collection Matchers

_1.0.0_

-   [ ] toBeFeatureCollection

---

_Future_

-   [ ] toContainFeatureTypes (array of feature type strings, optional min count, optional max count)
-   [ ] toContainIDs ([optional unordered array of IDs])
-   [ ] toContainStringIDs
-   [ ] toContainNumericIDs
-   [ ] toContainUniqueIDs
-   [ ] toContainAnyIDs
-   [ ] toContainOnlyIDs ([unordered array of IDs])

## Functional Matchers

_1.0.0_

-   [ ] toBeValidGeoJSON

---

_Future_

-   [ ] toHaveMinPointCountOf
-   [ ] toHaveMaxPointCountOf
-   [ ] toHavePointCount (equal/min, optional max)
-   [ ] toHaveMaxPrecision (num decimal places)
-   [ ] toHaveMinPrecision (num decimal places)
-   [ ] toHavePrecision (equal to/min decimal places, optional max decimal places)
-   [ ] toCrossAntimeridian
-   [ ] toIncludeNorthPole
-   [ ] toIncludeSouthPole
-   [ ] toIncludeEitherPole
-   [ ] toContainGeometryTypes
-   [ ] toContainAnyCoordinates ([unordered array of points])
-   [ ] toContainAllCoordinates ([unordered array of points])
-   [ ] toContainOnlyCoordinates
-   [ ] toContainOrderedCoordinates ([array of ordered points])
-   [ ] isCounterClockwiseWound
-   [ ] isClockwiseWound
-   [ ] isKinked
-   [ ] toBeContainedWithinBBox
-   [ ] isInNorthernHemisphere
-   [ ] isInSouthernHemisphere
-   [ ] isInEasternernHemisphere
-   [ ] isInWesternHemisphere

---

# License and Development

`jest-geojson` and all other files in this repository are distributed as free and open-source software under the [MIT License](/../../blob/main/LICENSE), © 2022.

Both [contributions](/../../blob/main/CONTRIBUTING.md) and [bug reports](https://github.com/M-Scott-Lassiter/jest-geojson/issues/new/choose) welcome.

Leave a :star2: if you find this project useful!

# Contact

Maintained by M. Scott Lassiter.

[![GitHub Badge Profile](https://img.shields.io/badge/GitHub-100000?style=plastic&logo=github&logoColor=white)](https://github.com/M-Scott-Lassiter)
[![Twitter Badge Profile](https://img.shields.io/badge/Twitter-1DA1F2?style=plastic&logo=twitter&logoColor=white)](https://twitter.com/MScottLassiter)
[![LinkedIn Badge Profile](https://img.shields.io/badge/LinkedIn-0077B5?style=plastic&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mscottlassiter)
[![Stackoverflow Badge Profile](https://img.shields.io/badge/stackoverflow-orange.svg?longCache=true&style=plastic&logo=stackoverflow&logoColor=white)](https://stackoverflow.com/users/6186333/sandpiper)
README.md
Displaying README.md.

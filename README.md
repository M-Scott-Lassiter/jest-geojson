<div align="center">

# jest-geojson

[![NPM Version](https://img.shields.io/npm/v/jest-geojson/beta)](https://www.npmjs.com/package/jest-geojson/v/beta)
[![NPM Package Size](https://shields.shivering-isles.com:/bundlephobia/min/jest-geojson?label=size)](https://www.npmjs.com/package/jest-geojson/v/beta)
[![License](https://img.shields.io/github/license/M-Scott-Lassiter/jest-geojson?color=blue)](https://github.com/M-Scott-Lassiter/jest-geojson/blob/main/LICENSE)

[![Powered by Jest](https://img.shields.io/badge/Powered%20by-Jest-99424f?logo=jest&labelColor=white&logoColor=99424f)](https://github.com/facebook/jest)
[![Completed and deployed matchers](https://img.shields.io/github/issues-search/m-scott-lassiter/jest-geojson?color=brightgreen&label=matchers&query=is%3Aissue%20is%3Aclosed%20label%3A%22matchers%2Fboundingbox%22%2C%22matchers%2Fcoordinates%22%2C%22matchers%2Fgeometries%22%2C%22matchers%2Fgeometrycollections%22%2C%22matchers%2Ffeatures%22%2C%22matchers%2Ffeaturecollections%22%2C%22matchers%2Ffunctional%22)](#matchers)
[![Proposed new matchers](https://img.shields.io/github/issues-search/m-scott-lassiter/jest-geojson?color=important&label=proposed&query=is%3Aissue%20is%3Aopen%20label%3A%22new%20matcher%20proposal%22)](https://github.com/M-Scott-Lassiter/jest-geojson/issues?q=is%3Aissue+is%3Aopen+label%3A%22new+matcher+proposal%22)

[![This project is still in beta](https://img.shields.io/github/milestones/progress-percent/m-scott-lassiter/jest-geojson/1)](https://github.com/M-Scott-Lassiter/jest-geojson/milestone/1)

---

[![Tests](https://github.com/M-Scott-Lassiter/jest-geojson/actions/workflows/test.yml/badge.svg)](https://github.com/M-Scott-Lassiter/jest-geojson/actions/workflows/test.yml)
[![Build](https://github.com/M-Scott-Lassiter/jest-geojson/actions/workflows/publish.yml/badge.svg)](https://github.com/M-Scott-Lassiter/jest-geojson/actions/workflows/publish.yml)
[![codecov](https://codecov.io/gh/M-Scott-Lassiter/jest-geojson/branch/beta/graph/badge.svg?token=vdb7uefciA)](https://codecov.io/gh/M-Scott-Lassiter/jest-geojson)
[![Dependency status](https://img.shields.io/librariesio/release/npm/jest-geojson)](https://www.npmjs.com/package/jest-geojson/v/beta?activeTab=dependencies)
![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/jest-geojson)
[![Open Issues](https://img.shields.io/github/issues/m-scott-lassiter/jest-geojson/bug)](https://github.com/M-Scott-Lassiter/jest-geojson/labels/bug)

[![Maintained](https://img.shields.io/badge/Maintained%3F-yes-brightgreen.svg)](#envelope-contact)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](/../../blob/main/CONTRIBUTING.md#contributing-guide)

</div>

<details open="open">
    <summary><b>Table of Contents</b></summary>

<!-- Note: The toc tags mark autogenerated content. Do not manually modify the content here -->

<!-- toc -->

-   [Purpose](#purpose)
-   [Getting Started](#getting-started)
    -   [Install as a Dependency](#install-as-a-dependency)
    -   [Configure Jest](#configure-jest)
-   [Import the Core Engine](#import-the-core-engine)
-   [Matchers](#matchers)
    -   [Coordiantes](#coordiantes)
    -   [Bounding Boxes](#bounding-boxes)
    -   [Geometries](#geometries)
    -   [Geometry Collections](#geometry-collections)
    -   [Features](#features)
    -   [Feature Collections](#feature-collections)
    -   [Functional](#functional)
-   [License and Development](#license-and-development)
-   [Contact](#contact)

<!-- tocstop -->

</details>

---

# Purpose

`jest-geojson` extends the [Jest](https://github.com/facebook/jest) unit testing framework with a comprehensive set of matchers tailored to checking [GeoJSON object](https://geojson.org/) validity and other geodesy attributes. For example:

```javascript
test('Object is valid GeoJSON', () => {
    expect(myGeoJSONObject).toBeValidGeoJSON()
})
```

This library **does not** create or manipulate GeoJSON.

Other projects have done that (and better), such as the venerable [Turf.js](https://github.com/Turfjs/turf). This library complements, not competes with, those tools.

# Getting Started

## Install as a Dependency

```javascript
npm install --save-dev jest jest-geojson
```

<!-- Future expansion: Add instructions for yarn -->

## Configure Jest

Jest [allows you to run scripts](https://jestjs.io/docs/configuration#setupfilesafterenv-array) after its environment loads. You can take advantage of that to load all `jest-geojson` matchers automatically.

To do so, either create a `jest.config.js` file:

```javascript
module.exports = {
    setupFilesAfterEnv: ['jest-geojson/setup/all']
}
```

or add a key to your `package.json`:

```json
{
    "name": "myPackageName",
    ...
    "jest": {
        "setupFilesAfterEnv": ["jest-geojson/setup/all"]
    }
}
```

<!-- Eventually, add a tutorial for doing custom matcher loading -->

You can also import the matcher functions without automatically loading them.

```javascript
const matchers = require('jest-geojson')
```

The matchers object contains each matcher grouped by category.

<!-- add link to documentation when online -->

# Import the Core Engine

You can import the functions that drive the test matchers.

```javascript
const core = require('jest-geojson/core')
```

The core object contains the functions grouped by category. You can then use these functions elsewhere in your code, or even port `jest-geojson` into another testing framework.

<!-- add link to documentation when online -->

# Matchers

`jest-geojson` organizes matchers by categories that correspond to the input type passed to `expect()`.

Functional matchers assess more generic attributes and qualities and accept multiple input types.

[Release version 1.0.0](https://github.com/M-Scott-Lassiter/jest-geojson/milestone/1) will contain the minimum matchers (listed in priority development order) needed to validate GeoJSON elements.

## Coordiantes

_1.0.0_

-   [x] isValid2DCoordinate
-   [x] isValid3DCoordinate
-   [x] isValidCoordinate

## Bounding Boxes

_1.0.0_

-   [x] isValid2DBoundingBox
-   [x] isValid3DBoundingBox
-   [x] isValidBoundingBox

## Geometries

_1.0.0_

-   [x] toBePointGeometry
-   [x] toBeMultiPointGeometry
-   [x] toBeLineStringGeometry
-   [ ] toBeMultiLineStringGeometry
-   [ ] toBePolygonGeometry
-   [ ] toBeMultiPolygonGeometry
-   [ ] toBeAnyGeometry

---

_Future_

-   [ ] isMultiPolygonWithHole

## Geometry Collections

_1.0.0_

-   [ ] toBeGeometryCollection

---

_Future_

-   [ ] toHaveMinGeometryCount
-   [ ] toHaveMaxGeometeyCount
-   [ ] toHaveGeometeyCount (equal/min, max)
-   [ ] toContainGeometryTypes (array of Geometry type strings, optional min count, optional max count)

## Features

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

## Feature Collections

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

## Functional

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

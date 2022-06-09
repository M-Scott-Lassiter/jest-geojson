<div align="center">

[<img src="https://raw.githubusercontent.com/M-Scott-Lassiter/jest-geojson/main/images/banner.svg" alt="Jest-GeoJSON - GeoJSON Validation Matchers for Jest" width=500>](https://www.npmjs.com/package/jest-geojson)

---

[![NPM Version](https://img.shields.io/npm/v/jest-geojson)](https://www.npmjs.com/package/jest-geojson)
[![Completed and deployed matchers](https://img.shields.io/github/issues-search/m-scott-lassiter/jest-geojson?color=brightgreen&label=matchers&query=is%3Aissue%20is%3Aclosed%20label%3A%22matchers%2Fboundingbox%22%2C%22matchers%2Fcoordinates%22%2C%22matchers%2Fgeometries%22%2C%22matchers%2Fgeometrycollections%22%2C%22matchers%2Ffeatures%22%2C%22matchers%2Ffeaturecollections%22%2C%22matchers%2Ffunctional%22)](#matchers)
[![Proposed new matchers](https://img.shields.io/github/issues-search/m-scott-lassiter/jest-geojson?color=important&label=proposed&query=is%3Aissue%20is%3Aopen%20label%3A%22new%20matcher%20proposal%22)](https://github.com/M-Scott-Lassiter/jest-geojson/issues?q=is%3Aissue+is%3Aopen+label%3A%22new+matcher+proposal%22)

[![Powered by Jest](https://img.shields.io/badge/Powered%20by-Jest-99424f?logo=jest&labelColor=white&logoColor=99424f)](https://github.com/facebook/jest)
[![License](https://img.shields.io/github/license/M-Scott-Lassiter/jest-geojson?color=blue)](https://github.com/M-Scott-Lassiter/jest-geojson/blob/main/LICENSE)

[![This project has reached initial release!](https://img.shields.io/github/milestones/progress-percent/m-scott-lassiter/jest-geojson/1)](https://github.com/M-Scott-Lassiter/jest-geojson/milestone/1)

---

[![Tests](https://github.com/M-Scott-Lassiter/jest-geojson/actions/workflows/test.yml/badge.svg)](https://github.com/M-Scott-Lassiter/jest-geojson/actions/workflows/test.yml)
[![Build](https://github.com/M-Scott-Lassiter/jest-geojson/actions/workflows/publish.yml/badge.svg)](https://github.com/M-Scott-Lassiter/jest-geojson/actions/workflows/publish.yml)
[![codecov](https://codecov.io/gh/M-Scott-Lassiter/jest-geojson/branch/main/graph/badge.svg?token=vdb7uefciA)](https://codecov.io/gh/M-Scott-Lassiter/jest-geojson)
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
    -   [Configure Typescript](#configure-typescript)
-   [Matchers](#matchers)
    -   [Coordiantes](#coordiantes)
    -   [Bounding Boxes](#bounding-boxes)
    -   [Geometries](#geometries)
    -   [Features](#features)
    -   [Feature Collections](#feature-collections)
    -   [Functional](#functional)
-   [Advanced Configuration](#advanced-configuration)
    -   [Load Matchers by Category](#load-matchers-by-category)
    -   [Load Specific Matchers](#load-specific-matchers)
    -   [Import the Core Engine](#import-the-core-engine)
-   [Support Policy](#support-policy)
    -   [Minimum Supported Jest Version](#minimum-supported-jest-version)
    -   [Node and Operating System](#node-and-operating-system)
-   [License and Development](#license-and-development)
-   [Contact](#contact)

<!-- tocstop -->

</details>

---

# Purpose

`Jest-GeoJSON` extends the [Jest](https://github.com/facebook/jest) unit testing framework with a comprehensive set of matchers tailored to checking [GeoJSON object](https://geojson.org/) validity and other geodesy attributes. For example:

```javascript
const testPoint = {
    type: 'Point',
    coordinates: [25, 10.2]
}

test('Object is valid GeoJSON Point Geometry', () => {
    expect(testPoint).toBePointGeometry()
})
```

This library **DOES NOT** create or manipulate GeoJSON. Other tools have done that (and better), such as the venerable [Turf.js](https://github.com/Turfjs/turf).

This project complements, not competes with, those tools.

# Getting Started

## Install as a Dependency

After installing Jest, run:

```bash
npm install --save-dev jest-geojson
```

## Configure Jest

Jest [will run custom scripts](https://jestjs.io/docs/configuration#setupfilesafterenv-array) after its environment loads. You can take advantage of that to load all `Jest-GeoJSON` matchers automatically.

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

## Configure Typescript

If your editor does not recognize the custom `Jest-GeoJSON` matchers, add a `global.d.ts` file to your project with:

```typescript
import 'jest-geojson'
```

Then add a `files` key in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    ...
  },
  ...
  "files": ["global.d.ts"]
}
```

# Matchers

`Jest-GeoJSON` organizes matchers by categories. Most correspond to the expected input type passed to `expect()`. For example, the Coordinates matchers expect a coordinate array, and geometry matchers expect a GeoJSON geometry object.

Functional matchers assess more generic attributes and qualities and many accept multiple input types.

## Coordiantes

-   [isValid2DCoordinate](https://m-scott-lassiter.github.io/jest-geojson/Matchers.Coordinates.html#.isValid2DCoordinate)
-   [isValid3DCoordinate](https://m-scott-lassiter.github.io/jest-geojson/Matchers.Coordinates.html#.isValid3DCoordinate)
-   [isValidCoordinate](https://m-scott-lassiter.github.io/jest-geojson/Matchers.Coordinates.html#.isValidCoordinate)

## Bounding Boxes

-   [isValid2DBoundingBox](https://m-scott-lassiter.github.io/jest-geojson/Matchers.BoundingBoxes.html#.isValid2DBoundingBox)
-   [isValid3DBoundingBox](https://m-scott-lassiter.github.io/jest-geojson/Matchers.BoundingBoxes.html#.isValid3DBoundingBox)
-   [isValidBoundingBox](https://m-scott-lassiter.github.io/jest-geojson/Matchers.BoundingBoxes.html#.isValidBoundingBox)

## Geometries

-   [toBePointGeometry](https://m-scott-lassiter.github.io/jest-geojson/Core.Geometries.html#.pointGeometry)
-   [toBeMultiPointGeometry](https://m-scott-lassiter.github.io/jest-geojson/Matchers.Geometries.html#.toBeMultiPointGeometry)
-   [toBeLineStringGeometry](https://m-scott-lassiter.github.io/jest-geojson/Matchers.Geometries.html#.toBeLineStringGeometry)
-   [toBeMultiLineStringGeometry](https://m-scott-lassiter.github.io/jest-geojson/Matchers.Geometries.html#.toBeMultiLineStringGeometry)
-   [toBePolygonGeometry](https://m-scott-lassiter.github.io/jest-geojson/Matchers.Geometries.html#.toBePolygonGeometry)
-   [toBeMultiPolygonGeometry](https://m-scott-lassiter.github.io/jest-geojson/Matchers.Geometries.html#.toBeMultiPolygonGeometry)
-   [toBeGeometryCollection](https://m-scott-lassiter.github.io/jest-geojson/Matchers.Geometries.html#.toBeGeometryCollection)
-   [toBeAnyGeometry](https://m-scott-lassiter.github.io/jest-geojson/Matchers.Geometries.html#.toBeAnyGeometry)

---

_Future_

-   [ ] isPolygonWithHole
-   [ ] isMultiPolygonWithHole
-   [ ] toHaveMinGeometryCount
-   [ ] toHaveMaxGeometeyCount
-   [ ] toHaveGeometeyCount (equal/min, max)

## Features

-   [toBeFeature](https://m-scott-lassiter.github.io/jest-geojson/Matchers.Features.html#.toBeFeature)
-   [toHaveID](https://m-scott-lassiter.github.io/jest-geojson/Matchers.Features.html#.toHaveID)
-   [toHaveNumericID](https://m-scott-lassiter.github.io/jest-geojson/Matchers.Features.html#.toHaveNumericID)
-   [toHaveStringID](https://m-scott-lassiter.github.io/jest-geojson/Matchers.Features.html#.toHaveStringID)

---

_Future_

-   [ ] toHaveProperties (array of [property, optional values])

## Feature Collections

-   [toBeFeatureCollection](https://m-scott-lassiter.github.io/jest-geojson/Matchers.FeatureCollections.html#.toBeFeatureCollection)

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

-   [toBeValidGeoJSON](https://m-scott-lassiter.github.io/jest-geojson/Matchers.Functional.html#.toBeValidGeoJSON)

---

_Future_

-   [ ] toHave2DBoundingBox
-   [ ] toHave3DBoundingBox
-   [ ] toHaveBoundingBox
-   [ ] toCrossAntimeridian
-   [ ] toIncludePole (Optional 'North' or 'South')
-   [ ] isInHemisphere('North', 'South', 'East', 'West')
-   [ ] toHaveMinPointCount
-   [ ] toHaveMaxPointCount
-   [ ] toHavePointCount (equal/min, optional max)
-   [ ] toHaveMaxPrecision (num decimal places)
-   [ ] toHaveMinPrecision (num decimal places)
-   [ ] toHavePrecision (equal to/min decimal places, optional max decimal places)
-   [ ] toIncludeGeometryTypes (optional array of [Geometry type strings, optional min count, optional max count])
-   [ ] toIncludeForeignMembers (optional array of [members, optional values])
-   [ ] toIncludeAnyCoordinates ([unordered array of points])
-   [ ] toIncludeAllCoordinates ([unordered array of points])
-   [ ] toIncludeOnlyCoordinates
-   [ ] toIncludeOrderedCoordinates (array of [ordered points])
-   [ ] toContain (array of geometry: [single or multi point/line/polygon whose boundaries are all within argument polygon/multipolygon])
-   [ ] isCounterClockwiseWound
-   [ ] isClockwiseWound
-   [ ] isKinked
-   [ ] toBeContainedWithinBBox
-   [ ] toBeContainedWithinPolygon

# Advanced Configuration

## Load Matchers by Category

You can load matcher subsets if you only need a limited set. Available scipts are:

-   `jest-geojson/setup/all`
-   `jest-geojson/setup/boundingBoxes`
-   `jest-geojson/setup/coordinates`
-   `jest-geojson/setup/featureCollections`
-   `jest-geojson/setup/features`
-   `jest-geojson/setup/geometries`

For example:

```javascript
module.exports = {
    setupFilesAfterEnv: ['jest-geojson/setup/coordinates']
}
```

To load more than one matcher set, pass a comma separated list to the `setupFilesAfterEnv` array:

```javascript
module.exports = {
    setupFilesAfterEnv: [
        'jest-geojson/setup/featureCollections',
        'jest-geojson/setup/geometries',
        'jest-geojson/setup/features'
    ]
}
```

## Load Specific Matchers

To load only specific matchers, create a new script and import them either one by one or by group. The [matcher object](https://m-scott-lassiter.github.io/jest-geojson/Matchers.html) contains each matcher grouped by category.

```javascript
// ./my-custom-load-script.js

const matchers = require('jest-geojson')

expect.extend({ matchers.coordinates.isValidCoordinate }) // Loads single matcher
expect.extend({ matchers.boundingBoxes.isValidBoundingBox }) // Loads single matcher
expect.extend(matchers.geometries) // Loads all matchers in the geometries category
```

For another example, see the [setup script](https://github.com/M-Scott-Lassiter/jest-geojson/blob/beta/src/setup/all.js).

## Import the Core Engine

The [core object](https://m-scott-lassiter.github.io/jest-geojson/Core.html) contains the functions grouped by category. You can then use these functions elsewhere in your code, or even port `Jest-GeoJSON` into another testing framework. To import the functions that drive the test matchers:

```javascript
const core = require('jest-geojson/core')
```

# Support Policy

## Minimum Supported Jest Version

This project requires Jest v24.0.0 or newer.

## Node and Operating System

The test suite has successfully run on all combinations of:

-   [![Node Versions Supported](https://img.shields.io/node/v/jest-geojson)](https://github.com/nodejs/Release)
-   ![Windows Supported](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge=flat&logo=windows&logoColor=white)
    ![Mac Supported](https://img.shields.io/badge/Mac-000000?style=for-the-badge=flat&logo=apple&logoColor=white)
    ![Linux Supported](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge=flat&logo=linux&logoColor=black)

This project supports [Long-Term Support, Current, and Maintenance](https://github.com/nodejs/Release) versions of node. Once a version reaches end of life, the CI scripts will no longer support them. Odd Node versions will only receive support while in a current status.

Other Node versions and operating systems might support the library, but the tests have not verified other combinations.

# License and Development

`Jest-GeoJSON` and all other files in this repository are distributed as free and open-source software under the [MIT License](/../../blob/main/LICENSE), © 2022.

Both [contributions](/../../blob/main/CONTRIBUTING.md) and [bug reports](https://github.com/M-Scott-Lassiter/jest-geojson/issues/new/choose) welcome.

Leave a :star2: if you find this project useful!

# Contact

Maintained by M. Scott Lassiter.

[![GitHub Badge Profile](https://img.shields.io/badge/GitHub-100000?style=plastic&logo=github&logoColor=white)](https://github.com/M-Scott-Lassiter)
[![Twitter Badge Profile](https://img.shields.io/badge/Twitter-1DA1F2?style=plastic&logo=twitter&logoColor=white)](https://twitter.com/MScottLassiter)
[![LinkedIn Badge Profile](https://img.shields.io/badge/LinkedIn-0077B5?style=plastic&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mscottlassiter)
[![Stackoverflow Badge Profile](https://img.shields.io/badge/stackoverflow-orange.svg?longCache=true&style=plastic&logo=stackoverflow&logoColor=white)](https://stackoverflow.com/users/6186333/sandpiper)

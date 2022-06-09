---
name: New Matcher Request
about: Suggest a new matcher for this project
title: 'newMatcherName'
labels: 'new matcher proposal'
assignees: m-scott-lassiter
---

## Description

A discussion on what this matcher does and why it is needed.

Include links to any relevant sources, especially from the [GeoJSON Standards](https://datatracker.ietf.org/doc/html/rfc7946).

## Example Matcher Usage

<!-- Include both a valid passing test and a .not passing test -->

```javascript
const testFeature = {
    type: 'Feature',
    geometry: {
        type: 'Point',
        coordinates: [102.0, 0.5]
    },
    properties: {
        prop0: 'value0'
    }
}

expect([22, -34.549]).isValid2DCoordinate()
expect(testFeature.geometry.coordinates).isValid2DCoordinate()

expect([22, -34.549, 22]).not.isValid2DCoordinate()
expect({ coordinates: [22, -34.549, 22] }).not.isValid2DCoordinate()
```

## Passing Tests

### First Category

### Second Category

## Failing Tests

### First Category

### Second Category

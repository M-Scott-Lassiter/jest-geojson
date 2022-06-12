/// <reference types="jest" />

declare global {
    namespace jest {
        interface Matchers<R> {
            // Bounding Boxes

            /**
             * Verifies a two dimensional bounding box meets WGS-84 and GeoJSON validity requirements.
             */
            isValid2DBoundingBox<E = number[]>(): R

            /**
             * Verifies a three dimensional bounding box meets WGS-84 and GeoJSON validity requirements.
             */
            isValid3DBoundingBox<E = number[]>(): R

            /**
             * Verifies a two or three dimensional bounding box meets WGS-84 and GeoJSON validity requirements.
             */
            isValidBoundingBox<E = number[]>(): R

            // Coordinates

            /**
             * Verifies a two element coordinate meets WGS-84 and GeoJSON validity requirements.
             */
            isValid2DCoordinate<E = number[]>(): R

            /**
             * Verifies a three element coordinate meets WGS-84 and GeoJSON validity requirements.
             */
            isValid3DCoordinate<E = number[]>(): R

            /**
             * Verifies a two or three element coordinate meets WGS-84 and GeoJSON validity requirements.
             */
            isValidCoordinate<E = number[]>(): R

            // Feature Collections

            /**
             * Verifies an object is a valid GeoJSON FeatureCollection. This object requires a "type" member that must
             * equal 'FeatureCollection', and a "features" member that contains either a valid GeoJSON Feature
             * or an empty array.
             *
             * Foreign members are allowed with the exception of 'coordinates', 'geometries', 'geometry', or 'properties'.
             * If present, bounding boxes must be valid.
             */
            toBeFeatureCollection<E = Object>(): R

            // Features

            /**
             * Verifies an object is a valid GeoJSON Feature. This object requires a "type" member that must
             * equal 'Feature',  a "geometry" member that contains either one of the seven valid GeoJSON
             * geometry objects or an empty array, and a "properties" member that is either an object of any
             * composition or null.
             *
             * Foreign members are allowed with the exception of 'coordinates', 'geometries', 'properties', or 'features'.
             * If present, bounding boxes must be valid.
             */
            toBeFeature<E = Object>(): R

            /**
             * Checks if a GeoJSON Feature has an ID. Passes if the Feature object has any ID (no argument provided), or
             * if the ID exactly matches the optional argument (single string, number, or RegExp provided), or any value
             * within an array of any combination of strings, numbers, or RegExp.
             *
             * The test fails if the object does not have an ID, or if it has an ID that does not match the SearchID.
             */
            toHaveID<E = Object>(
                SearchID: string | number | RegExp | (string | number | RegExp)[]
            ): R

            /**
             * Checks if a GeoJSON Feature has a numeric ID. Passes if the Feature object has any numeric ID (no argument provided), or
             * if the ID exactly matches the optional argument (single number or RegExp provided), or any value
             * within an array of any combination of numbers or RegExp.
             *
             * The test fails if the object does not have an ID, or if it has an ID that does not match the SearchID.
             *
             * Passing a string type to SearchID will not pass the test, even if the ID exactly matches.
             */
            toHaveNumericID<E = Object>(SearchID: number | RegExp | (number | RegExp)[]): R

            /**
             * Checks if a GeoJSON Feature has a string ID. Passes if the Feature object has any string ID (no argument provided), or
             * if the ID exactly matches the optional argument (single string or RegExp provided), or any value
             * within an array of any combination of strings or RegExp.
             *
             * The test fails if the object does not have an ID, or if it has an ID that does not match the SearchID.
             *
             * Passing a number type to SearchID will not pass the test, even if the ID exactly matches.
             */
            toHaveStringID<E = Object>(SearchID: string | RegExp | (string | RegExp)[]): R

            // Functional

            /**
             * This tests an object to see if it meets validation criteria for any of the seven GeoJSON
             * Geometry types, Features, or FeatureCollections.
             */
            toBeValidGeoJSON<E = Object>(): R

            // Geometries

            /**
             * Verifies an object meets validity requirements for one of the six basic GeoJSON geometry types:
             * Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon, GeometryCollection.
             */
            toBeAnyGeometry<E = Object>(): R

            /**
             * Verifies an object is a valid GeoJSON GeometryCollection. This object requires a
             * 'type' property that must equal "GeometryCollection", and a 'geometries' property that contains
             * an array of GeoJSON Geometry objects (Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon).
             *
             * The geometries may be an empty array, but may not be an array of empty arrays or objects.
             *
             * Foreign members are allowed with the exception of 'geometry', 'properties', or 'features'.
             * If present, bounding boxes must be valid.
             */
            toBeGeometryCollection<E = Object>(): R

            /**
             * Verifies an object is a valid GeoJSON LineString Geometry. This geometry requires a
             * 'type' property that must equal "LineString", and a 'coordinates' property that contains
             * an array of two or more valid WGS-84 GeoJSON coordinate(s). The coordinates may be an empty array,
             * but may not be an array of empty arrays.
             *
             * Foreign members are allowed with the exception of 'geometry', 'properties', or 'features'.
             * If present, bounding boxes must be valid.
             */
            toBeLineStringGeometry<E = Object>(): R

            /**
             * Verifies an object is a valid GeoJSON MultiLineString Geometry. This geometry requires a
             * 'type' property that must equal "MultiLineString", and a 'coordinates' property that contains
             * an array of linestring arrays (i.e. each linestring array containing at least two or more valid
             * WGS-84 GeoJSON coordinates).
             *
             * The coordinates may be an empty array, but may not be an array of empty arrays.
             *
             * Foreign members are allowed with the exception of 'geometry', 'properties', or 'features'.
             * If present, bounding boxes must be valid.
             */
            toBeMultiLineStringGeometry<E = Object>(): R

            /**
             * Verifies an object is a valid GeoJSON MultiPoint Geometry. This geometry requires a
             * 'type' property that must equal "MultiPoint", and a 'coordinates' property that contains
             * an array of valid WGS-84 GeoJSON coordinate(s). The coordinates may be an empty array.
             *
             * Foreign members are allowed with the exception of 'geometry', 'properties', or 'features'.
             * If present, bounding boxes must be valid.
             */
            toBeMultiPointGeometry<E = Object>(): R

            /**
             * Verifies an object is a valid GeoJSON MultiPolygon Geometry. This geometry requires a
             * 'type' property that must equal "MultiPolygon", and a 'coordinates' property that contains
             * an array of polygon coordinate arrays. Each coordinate array must contain at least four valid
             * WGS-84 GeoJSON coordinates, and the final coordinate must equal the first.
             *
             * The coordinates may be an empty array, but may not be an array of empty arrays.
             *
             * Foreign members are allowed with the exception of 'geometry', 'properties', or 'features'.
             * If present, bounding boxes must be valid.
             */
            toBeMultiPolygonGeometry<E = Object>(): R

            /**
             * Verifies an object is a valid GeoJSON MultiPolygon Geometry with at least one polygon having a hole.
             */
            toBeMultiPolygonWithHole<E = Object>(): R

            /**
             * Verifies an object is a valid GeoJSON Point Geometry. This geometry requires a
             * 'type' property that must equal "Point", and a 'coordinates' property that contains
             * a single valid WGS-84 GeoJSON coordinate. The coordinates may be an empty array.
             *
             * Foreign members are allowed with the exception of 'geometry', 'properties', or 'features'.
             * If present, bounding boxes must be valid.
             */
            toBePointGeometry<E = Object>(): R

            /**
             * Verifies an object is a valid GeoJSON Polygon Geometry. This geometry requires a
             * 'type' property that must equal "Polygon", and a 'coordinates' property that contains
             * an array of linestring arrays. Each point array must contain at least four valid
             * WGS-84 GeoJSON coordinates, and the final coordinate must equal the first.
             *
             * The coordinates may be an empty array, but may not be an array of empty arrays.
             *
             * Foreign members are allowed with the exception of 'geometry', 'properties', or 'features'.
             * If present, bounding boxes must be valid.
             */
            toBePolygonGeometry<E = Object>(): R

            /**
             * Verifies an object is a valid GeoJSON Polygon Geometry with a hole.
             */
            toBePolygonWithHole<E = Object>(): R

            /**
             * Verifies a valid GeoJSON GeometryCollection has a specific number of geometries.
             *
             * If omitting both `Range1` and `Range2`, it passes if at least one geometry object is contained in "geometries".
             * If only Range1 is specified, it checks that there are exactly that number of geometries.
             * If Range1 and Range2 are specified, it checks that the geometry count is between those values.
             * Decimals get truncated on both Range1 and Range2.
             *
             * Will fail if Range1 or Range2 are not numbers or less than 0, Range2 less than Range1, or Range2 is defined and Range1 is not.
             *
             * Nested GeometryCollections are only counted as a single geometry object.
             */
            toHaveGeometryCount<E = Object>(Range1: Number, Range2: Number): R

            /**
             * Verifies a valid GeoJSON GeometryCollection has less than or equal to a specified number of geometries.
             *
             * If omitting MaxCount, it passes if "geometries" contains no more than one object.
             *
             * Will fail if MaxCount is not a number or less than zero.
             *
             * Nested GeometryCollections are only counted as a single geometry object.
             */
            toHaveMaxGeometryCount<E = Object>(MaxCount: Number): R

            /**
             * Verifies a valid GeoJSON GeometryCollection has more than or equal to a specified number of geometries.
             *
             * If omitting MinCount, it passes if at least one geometry object is contained in "geometries".
             *
             * Will fail if MinCount is not a number or less than zero.
             *
             * Nested GeometryCollections are only counted as a single geometry object.
             */
            toHaveMinGeometryCount<E = Object>(MinCount: Number): R
        }
    }
}

export {}

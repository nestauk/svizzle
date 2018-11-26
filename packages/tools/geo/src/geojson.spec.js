import {strict as assert} from "assert";

import * as _ from "lamb";

import {
    getOrMakeBBox,
    makeCentroids,
    makeToGeoPoints,
    makeToPointFeature,
    setGeometryPrecision
} from "./geojson";

describe("geojson", function() {
    describe("getOrMakeBBox()", function() {
        const type = "FeatureCollection";
        const features = [{
            type: "Feature",
            geometry: {
                type: "Polygon",
                coordinates: [
                    [[1, -1], [1, 1], [-1, 1], [-1, -1], [1, -1]]
                ]
            }
        }, {
            type: "Feature",
            geometry: {
                type: "Polygon",
                coordinates: [
                    [[2, -1], [2, 1], [0, 1], [0, -1], [2, -1]]
                ]
            }
        }];
        const bbox = [-1, -1, 2, 1]; // [w, s, e, n]
        const collectionWithBBox = {type, features, bbox};
        const collectionWithoutBBox = {type, features};

        it("should return the bbox value of a collection with bbox", function() {
            assert.deepStrictEqual(getOrMakeBBox(collectionWithBBox), bbox);
        });
        it("should calculate the bbox of a collection without bbox", function() {
            assert.deepStrictEqual(getOrMakeBBox(collectionWithoutBBox), bbox);
        });
    });

    describe("makeCentroids()", function() {
        it("should return the a collection of centroids of the provided features, each having the correspondent feature properties",
            function() {
                const features = [{
                    type: "Feature",
                    properties: {foo: "a"},
                    geometry: {
                        type: "Polygon",
                        coordinates: [
                            [[1, -1], [1, 1], [-1, 1], [-1, -1], [1, -1]]
                        ]
                    }
                }, {
                    type: "Feature",
                    properties: {foo: "b"},
                    geometry: {
                        type: "Polygon",
                        coordinates: [
                            [[2, -1], [2, 1], [0, 1], [0, -1], [2, -1]]
                        ]
                    }
                }];
                const expectedCentroids = {
                    type: "FeatureCollection",
                    features: [{
                        type: "Feature",
                        geometry: {type: "Point", coordinates: [0.2, -0.2]},
                        properties: {foo: "a"}
                    }, {
                        type: "Feature",
                        geometry: {type: "Point", coordinates: [1.2, -0.2]},
                        properties: {foo: "b"}
                    }]
                };

                assert.deepStrictEqual(makeCentroids(features), expectedCentroids);
            }
        );
        // TODO test more subtle cases (item without appropriate lat/lng, ...)
    });
    describe("makeToPointFeature()", function() {
        it("should return a function expecting an object and returning it as a Point feature",
            function() {
                const coordPicker = _.collect([_.getKey("lng"), _.getKey("lat")]);
                const toPointFeature = makeToPointFeature(coordPicker);
                const item = {foo: "a", lng: 0.1, lat: 0.1};
                const expectedFeature = {
                    type: "Feature",
                    geometry: {type: "Point", coordinates: [0.1, 0.1]},
                    properties: {foo: "a", lng: 0.1, lat: 0.1}
                };
                assert.deepStrictEqual(toPointFeature(item), expectedFeature);
            }
        );
        // TODO test more subtle cases (item without appropriate lat/lng, ...)
    });
    describe("makeToGeoPoints()", function() {
        it("should return a function expecting an array of objects and returning them as a FeatureCollection of Point features",
            function() {
                const coordPicker = _.collect([_.getKey("lng"), _.getKey("lat")]);
                const toGeoPoints = makeToGeoPoints(coordPicker);
                const items = [
                    {foo: "a", lng: 0.1, lat: 0.1},
                    {foo: "b", lng: 0.2, lat: 0.2}
                ];
                const expectedCollection = {
                    type: "FeatureCollection",
                    features: [{
                        type: "Feature",
                        geometry: {type: "Point", coordinates: [0.1, 0.1]},
                        properties: {foo: "a", lng: 0.1, lat: 0.1}
                    }, {
                        type: "Feature",
                        geometry: {type: "Point", coordinates: [0.2, 0.2]},
                        properties: {foo: "b", lng: 0.2, lat: 0.2}
                    }]
                };

                assert.deepStrictEqual(toGeoPoints(items), expectedCollection);
            }
        );
        // TODO test more subtle cases (empty array, items without appropriate lat/lng, ...)
    });
    describe("setGeometryPrecision()", function() {
        it("should return a function returning a copy of the provided geojson having the geometry coordinates truncated (not rounded) to the given precision",
            function() {
                const shortenGeometry = setGeometryPrecision(4);
                const point = {
                    "type": "Feature",
                    "geometry": {"type": "Point", "coordinates": [0.12344, 2.92345]},
                    "properties": {}
                };
                const shortenedPoint = {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            0.1234, // 44 rounded to 4
                            2.9235  // 45 rounded to 5
                        ]
                    },
                    "properties": {}
                };
                assert.deepStrictEqual(shortenGeometry(point), shortenedPoint);
            }
        );
        it("should turn coordinates to integers if the precision is 0",
            function() {
                const coordsToIntegers = setGeometryPrecision(0);
                const point = {
                    "type": "Feature",
                    "geometry": {"type": "Point", "coordinates": [0.12344, 2.92345]},
                    "properties": {}
                };
                const integerCoordsPoint = {
                    "type": "Feature",
                    "geometry": {"type": "Point", "coordinates": [0, 3]},
                    "properties": {}
                };
                assert.deepStrictEqual(coordsToIntegers(point), integerCoordsPoint);
            }
        );
    });
});

/**
* @module @svizzle/geo/geojson
*/

import * as _ from "lamb";
import bbox from "@turf/bbox";
import centroid from "@turf/centroid";
import {featureCollection} from "@turf/helpers";
import truncate from "@turf/truncate";

/**
 * Return or create the {@link https://tools.ietf.org/html/rfc7946#section-5|bbox} of the provided geojson
 *
 * @function
 * @arg {object} - Geojson object
 * @return {array}
 *
 * @example

getOrMakeBBox({
    type: "FeatureCollection",
    features: [{
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
    }]
})
// [-1, -1, 2, 1]

getOrMakeBBox({
    type: "FeatureCollection",
    bbox: [-10.0, -10.0, 10.0, 10.0],
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-10.0, -10.0],
          [10.0, -10.0],
          [10.0, 10.0],
          [-10.0, -10.0]
        ]
      ]
    }
})
// [-10.0, -10.0, 10.0, 10.0]
// no calculation involved here

 * @version 0.1.0
 */
export const getOrMakeBBox = json => json.bbox ? json.bbox : bbox(json);

/**
 * Return the a collection of centroids of the provided features, each having the correspondent feature properties.
 *
 * @function
 * @arg {array} - Array of features
 * @return {object} FeatureCollection of Point features
 *
 * @example

makeCentroids([
  {type: "Feature",
   properties: {"foo": "a"},
   geometry: {type: "LineString", coordinates: [
     [[1, -1], [1, 1], [-1, 1], [-1, -1], [1, -1]]
   ]}
  },
  {type: "Feature",
   properties: {"foo": "b"},
   geometry: {type: "LineString", coordinates: [
     [[2, -1], [2, 1], [0, 1], [0, -1], [2, -1]]
   ]}
  }
])
// => {
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
}

 * @version 0.1.0
 */
export const makeCentroids = _.pipe([
    _.mapWith(feature => centroid(feature, {properties: feature.properties})),
    featureCollection
]);

/**
 * Return a function expecting an object and returning it as a Point feature.
 * You can define a coordPicker using {@link makeKeysGetter}:
 * const getCoordinates = makeKeysGetter(["lng", "lat"])
 *
 * @function
 * @arg {function} coordPicker - The function to create the point coordinates ([longitude, latitude]) from the provided feature
 * @arg {function} propsTransformer - The function to create the properties of the resulting point from the provided feature
 * @return {object} - Geojson Point feature.
 *
 * @example
const coordPicker = _.collect([_.getKey("lng"), _.getKey("lat")]);

const toPointFeature = makeToPointFeature(coordPicker);
toPointFeature({foo: "a", lng: 0.1, lat: 0.1})
// => {
 "type": "Feature",
 "geometry": {"type": "Point", "coordinates": [0.1, 0.1]},
 "properties": {foo: "a", lng: 0.1, lat: 0.1}
}

const propsTransformer = applyFnMap({name: _.getKey("foo")});
const toPointFeature = makeToPointFeature(coordPicker, propsTransformer);
toPointFeature({foo: "a", lng: 0.1, lat: 0.1})
// => {
 "type": "Feature",
 "geometry": {"type": "Point", "coordinates": [0.1, 0.1]},
 "properties": {name: "a"}
}
 * @version 0.1.0
 */
export const makeToPointFeature = (coordPicker, propsTransformer = null) =>
    object => ({
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: coordPicker(object)
        },
        properties: propsTransformer ? propsTransformer(object) : object
    });

/**
 * Return a function expecting an array of objects and returning them as a FeatureCollection of Point features.
 * You can define a coordPicker using {@link makeKeysGetter}:
 * const getCoordinates = makeKeysGetter(["lng", "lat"])
 *
 * @function
 * @arg {function} coordPicker - The function to create the point coordinates ([longitude, latitude]) from the provided features
 * @arg {function} propsTransformer - The function to create the properties of the resulting points from the provided features
 * @return {object} - FeatureCollection of Point features
 *
 * @example
const coordPicker = _.collect([_.getKey("lng"), _.getKey("lat")]);

const toGeoPoints = makeToGeoPoints(coordPicker);
toGeoPoints([
  {foo: "a", lng: 0.1, lat: 0.1},
  {foo: "b", lng: 0.2, lat: 0.2}
]);
// => {
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "geometry": {"type": "Point", "coordinates": [0.1, 0.1]},
    "properties": {foo: "a", lng: 0.1, lat: 0.1}
  }, {
    "type": "Feature",
    "geometry": {"type": "Point", "coordinates": [0.2, 0.2]},
    "properties": {foo: "b", lng: 0.2, lat: 0.2}
  }]
}

const propsTransformer = applyFnMap({name: _.getKey("foo")});
const toGeoPoints = makeToGeoPoints(coordPicker, propsTransformer);
toGeoPoints([
  {foo: "a", lng: 0.1, lat: 0.1},
  {foo: "b", lng: 0.2, lat: 0.2}
]);
// => {
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "geometry": {"type": "Point", "coordinates": [0.1, 0.1]},
    "properties": {"name": "a"}
  }, {
    "type": "Feature",
    "geometry": {"type": "Point", "coordinates": [0.2, 0.2]},
    "properties": {"name": "b"}
  }]
}
 * @version 0.1.0
 */
export const makeToGeoPoints = (coordPicker, propsTransformer) => _.pipe([
    _.mapWith(makeToPointFeature(coordPicker, propsTransformer)),
    featureCollection
]);

// TODO use a reduce to include only items with lat/lng as defined by coordPicker

/**
 * Return a function returning a copy of the provided geojson having the geometry coordinates rounded to the given precision.
 *
 * @function
 * @arg {number} precision - coordinate decimal precision
 * @return {function}
 *
 * @example
const truncateGeometry = setGeometryPrecision(4);
const point = {
  "type": "Feature",
  "geometry": {"type": "Point", "coordinates": [0.1234567, 0.12341]},
  "properties": {"name": "a"}
};
truncateGeometry(point)
// => {
  "type": "Feature",
  "geometry": {"type": "Point", "coordinates": [0.1234, 0.1234]},
  "properties": {"name": "a"}
}
 * @version 0.1.0
 */
export const setGeometryPrecision = precision =>
    geojson => truncate(geojson, {precision, mutate: false});

// TODO DOC: define FeatureCollection type

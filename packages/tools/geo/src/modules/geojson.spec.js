import {strict as assert} from 'assert';

import * as _ from 'lamb';
import {applyFnMap} from '@svizzle/utils';

import {
	getOrMakeBBox,
	makeUpdateFeaturesProperty,
	makeCentroids,
	makeToGeoPoints,
	makeToPointFeature,
	setGeometryPrecision
} from './geojson';

describe('geo/geojson', function() {
	describe('getOrMakeBBox', function() {
		const type = 'FeatureCollection';
		const features = [{
			type: 'Feature',
			geometry: {
				type: 'Polygon',
				coordinates: [
					[[1, -1], [1, 1], [-1, 1], [-1, -1], [1, -1]]
				]
			}
		}, {
			type: 'Feature',
			geometry: {
				type: 'Polygon',
				coordinates: [
					[[2, -1], [2, 1], [0, 1], [0, -1], [2, -1]]
				]
			}
		}];
		const bbox = [-1, -1, 2, 1]; // [w, s, e, n]
		const collectionWithBBox = {type, features, bbox};
		const collectionWithoutBBox = {type, features};

		it('should return the bbox value of a collection with bbox', function() {
			assert.deepStrictEqual(getOrMakeBBox(collectionWithBBox), bbox);
		});
		it('should calculate the bbox of a collection without bbox', function() {
			assert.deepStrictEqual(getOrMakeBBox(collectionWithoutBBox), bbox);
		});
	});

	describe('makeUpdateFeaturesProperty', function() {
		const geojson = {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					geometry: {
						type: 'Polygon',
						coordinates: [
							[[1, -1], [1, 1], [-1, 1], [-1, -1], [1, -1]]
						]
					},
					properties: {iso_a2: 'BF'}
				},
				{
					type: 'Feature',
					geometry: {
						type: 'Polygon',
						coordinates: [
							[[2, -1], [2, 1], [0, 1], [0, -1], [2, -1]]
						]
					},
					properties: {name: 'Kosovo'}
				},
				{
					type: 'Feature',
					geometry: {
						type: 'Polygon',
						coordinates: [
							[[4, -1], [2, 7], [0, 5], [0, -4], [4, -1]]
						]
					},
					properties: {iso_a2: 'FR'}
				}
			]
		};
		const expectedGeojson = {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					geometry: {
						type: 'Polygon',
						coordinates: [
							[[1, -1], [1, 1], [-1, 1], [-1, -1], [1, -1]]
						]
					},
					properties: {iso_a2: 'BF', color: 'red'}
				},
				{
					type: 'Feature',
					geometry: {
						type: 'Polygon',
						coordinates: [
							[[2, -1], [2, 1], [0, 1], [0, -1], [2, -1]]
						]
					},
					properties: {name: 'Kosovo', color: 'yellow'}
				},
				{
					type: 'Feature',
					geometry: {
						type: 'Polygon',
						coordinates: [
							[[4, -1], [2, 7], [0, 5], [0, -4], [4, -1]]
						]
					},
					properties: {iso_a2: 'FR', color: undefined}
				}
			]
		};
		it('should return a function expecting a geojson and creating or updating the provided property of all features using the provided map.',
			function() {
				const keyToColor = {BF: 'red', Kosovo: 'yellow'};
				const addColor = makeUpdateFeaturesProperty({
					propName: 'color',
					map: keyToColor,
					key: 'iso_a2',
					key_alt: 'name'
				});
				assert.deepStrictEqual(addColor(geojson), expectedGeojson);
			}
		);
		it('should return a function expecting a geojson and creating or updating the provided property of all features using the provided mapping function.',
			function() {
				const keyToColor = {BF: 'red', Kosovo: 'yellow'};
				const keyToColorFn = key => keyToColor[key]; // silly func just for testing

				const addColor = makeUpdateFeaturesProperty({
					propName: 'color',
					mapFn: keyToColorFn,
					key: 'iso_a2',
					key_alt: 'name'
				});
				assert.deepStrictEqual(addColor(geojson), expectedGeojson);
			}
		);
	});
	describe('makeCentroids', function() {
		it('should return the a collection of centroids of the provided features, each having the correspondent feature properties',
			function() {
				const features = [{
					type: 'Feature',
					properties: {foo: 'a'},
					geometry: {
						type: 'Polygon',
						coordinates: [
							[[1, -1], [1, 1], [-1, 1], [-1, -1], [1, -1]]
						]
					}
				}, {
					type: 'Feature',
					properties: {foo: 'b'},
					geometry: {
						type: 'Polygon',
						coordinates: [
							[[2, -1], [2, 1], [0, 1], [0, -1], [2, -1]]
						]
					}
				}];
				const expectedCentroids = {
					type: 'FeatureCollection',
					features: [{
						type: 'Feature',
						geometry: {type: 'Point', coordinates: [0, 0]},
						properties: {foo: 'a'}
					}, {
						type: 'Feature',
						geometry: {type: 'Point', coordinates: [1, 0]},
						properties: {foo: 'b'}
					}]
				};
				assert.deepStrictEqual(makeCentroids(features), expectedCentroids);
			}
		);
		// TODO test more subtle cases (item without appropriate lat/lng, ...)
	});
	describe('makeToPointFeature', function() {
		it('should return a function expecting an object and returning it as a Point feature with the passed object as properties',
			function() {
				const coordPicker = _.collect([_.getKey('lng'), _.getKey('lat')]);
				const toPointFeature = makeToPointFeature(coordPicker);
				const item = {foo: 'a', lng: 0.1, lat: 0.1};
				const expectedFeature = {
					type: 'Feature',
					geometry: {type: 'Point', coordinates: [0.1, 0.1]},
					properties: {foo: 'a', lng: 0.1, lat: 0.1}
				};
				assert.deepStrictEqual(toPointFeature(item), expectedFeature);
			}
		);
		it('should return a function expecting an object and returning it as a Point feature with the passed object, transformed, as properties',
			function() {
				const coordPicker = _.collect([_.getKey('lng'), _.getKey('lat')]);
				const propsTransformer = applyFnMap({name: _.getKey('foo')});
				const toPointFeature = makeToPointFeature(coordPicker, propsTransformer);
				const item = {foo: 'a', lng: 0.1, lat: 0.1};
				const expectedFeature = {
					type: 'Feature',
					geometry: {type: 'Point', coordinates: [0.1, 0.1]},
					properties: {name: 'a'}
				};
				assert.deepStrictEqual(toPointFeature(item), expectedFeature);
			}
		);
		// TODO test more subtle cases (item without appropriate lat/lng, ...)
	});
	describe('makeToGeoPoints', function() {
		it('should return a function expecting an array of objects and returning them as a FeatureCollection of Point features with the passed objects as properties',
			function() {
				const coordPicker = _.collect([_.getKey('lng'), _.getKey('lat')]);
				const toGeoPoints = makeToGeoPoints(coordPicker);
				const items = [
					{foo: 'a', lng: 0.1, lat: 0.1},
					{foo: 'b', lng: 0.2, lat: 0.2}
				];
				const expectedCollection = {
					type: 'FeatureCollection',
					features: [{
						type: 'Feature',
						geometry: {type: 'Point', coordinates: [0.1, 0.1]},
						properties: {foo: 'a', lng: 0.1, lat: 0.1}
					}, {
						type: 'Feature',
						geometry: {type: 'Point', coordinates: [0.2, 0.2]},
						properties: {foo: 'b', lng: 0.2, lat: 0.2}
					}]
				};

				assert.deepStrictEqual(toGeoPoints(items), expectedCollection);
			}
		);
		it('should return a function expecting an array of objects and returning them as a FeatureCollection of Point features with the passed objects, transformed, as properties',
			function() {
				const coordPicker = _.collect([_.getKey('lng'), _.getKey('lat')]);
				const propsTransformer = applyFnMap({name: _.getKey('foo')});
				const toGeoPoints = makeToGeoPoints(coordPicker, propsTransformer);
				const items = [
					{foo: 'a', lng: 0.1, lat: 0.1},
					{foo: 'b', lng: 0.2, lat: 0.2}
				];
				const expectedCollection = {
					type: 'FeatureCollection',
					features: [{
						type: 'Feature',
						geometry: {type: 'Point', coordinates: [0.1, 0.1]},
						properties: {name: 'a'}
					}, {
						type: 'Feature',
						geometry: {type: 'Point', coordinates: [0.2, 0.2]},
						properties: {name: 'b'}
					}]
				};

				assert.deepStrictEqual(toGeoPoints(items), expectedCollection);
			}
		);
		// TODO test more subtle cases (empty array, items without appropriate lat/lng, ...)
	});
	describe('setGeometryPrecision', function() {
		it('should return a function returning a copy of the provided geojson having the geometry coordinates truncated (not rounded) to the given precision',
			function() {
				const shortenGeometry = setGeometryPrecision(4);
				const point = {
					'type': 'Feature',
					'geometry': {'type': 'Point', 'coordinates': [0.12344, 2.92345]},
					'properties': {}
				};
				const shortenedPoint = {
					'type': 'Feature',
					'geometry': {
						'type': 'Point',
						'coordinates': [
							0.1234, // 44 rounded to 4
							2.9235  // 45 rounded to 5
						]
					},
					'properties': {}
				};
				assert.deepStrictEqual(shortenGeometry(point), shortenedPoint);
			}
		);
		it('should turn coordinates to integers if the precision is 0',
			function() {
				const coordsToIntegers = setGeometryPrecision(0);
				const point = {
					'type': 'Feature',
					'geometry': {'type': 'Point', 'coordinates': [0.12344, 2.92345]},
					'properties': {}
				};
				const integerCoordsPoint = {
					'type': 'Feature',
					'geometry': {'type': 'Point', 'coordinates': [0, 3]},
					'properties': {}
				};
				assert.deepStrictEqual(coordsToIntegers(point), integerCoordsPoint);
			}
		);
	});
});

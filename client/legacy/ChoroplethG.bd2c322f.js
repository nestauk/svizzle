import { Z as pipe, bF as isNotNull, bG as updateKey, U as mapWith, br as has, S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, N as createEventDispatcher, bH as makeMergeAppliedFnMap, bI as toPx, bJ as beforeUpdate, bK as afterUpdate, bL as collectionCompare, K as makeStyleVars, bM as isIterableEmpty, bN as always, bO as index, bP as isIn, bQ as sortWith, bR as when, e as element, a as space, f as claim_element, g as children, c as claim_space, b as detach_dev, k as attr_dev, H as toggle_class, m as add_location, n as insert_hydration_dev, o as append_hydration_dev, w as group_outros, B as transition_out, x as check_outros, u as transition_in, ay as binding_callbacks, t as text, j as claim_text, a5 as set_data_dev, q as validate_each_argument, bS as validate_each_keys, I as svg_element, J as claim_svg_element, bm as add_render_callback, bn as add_iframe_resize_listener, M as listen_dev, bT as update_keyed_each, p as noop$1, D as create_component, E as claim_component, F as mount_component, G as destroy_component, C as destroy_each, at as empty, bw as is_function, ao as run_all, bU as destroy_block, ah as getPath, bV as not, bW as set_style } from './client.fb549d0a.js';
import { _ as _taggedTemplateLiteral, M as MessageView } from './ColorBinsDiv.baf4e5e3.js';
import { a as arrayMaxWith, b as arrayMinWith, s as sliceString, l as linear } from './linear.40bcd16d.js';
import { c as getKey, g as getValue } from './defaultLocale.b5125660.js';
import { A as Adder, q as noop, e as abs, i as sqrt, u as tau, v as identity, w as geoStream, x as boundsStream, g as atan2, b as asin, s as sin, c as cos, y as projection, z as acos, f as epsilon, o as projectionFn, B as mercator } from './equalEarth.ffb2f4e1.js';
import { p as point, f as featureCollection } from './index.421d9617.js';
import { t as topoToGeo } from './topojson.897abdc6.js';

/**
* @module @svizzle/utils/[any-any]-[any-boolean]
*/

/**
 * Return a function returning true if the accessed value is not null
 *
 * @function
 * @arg {function} accessor
 * @return {function} - Any -> Boolean
 *
 * @example
> isNotNullWith(getValue)({key: 'a', value: 1})
true
 *
 * @since 0.5.0
 */
const isNotNullWith = accessor => pipe([accessor, isNotNull]);

/**
 * Callback for coordEach
 *
 * @callback coordEachCallback
 * @param {Array<number>} currentCoord The current coordinate being processed.
 * @param {number} coordIndex The current index of the coordinate being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 */

/**
 * Iterate over coordinates in any GeoJSON object, similar to Array.forEach()
 *
 * @name coordEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentCoord, coordIndex, featureIndex, multiFeatureIndex)
 * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.coordEach(features, function (currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=currentCoord
 *   //=coordIndex
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 * });
 */
function coordEach(geojson, callback, excludeWrapCoord) {
  // Handles null Geometry -- Skips this GeoJSON
  if (geojson === null) return;
  var j,
    k,
    l,
    geometry,
    stopG,
    coords,
    geometryMaybeCollection,
    wrapShrink = 0,
    coordIndex = 0,
    isGeometryCollection,
    type = geojson.type,
    isFeatureCollection = type === "FeatureCollection",
    isFeature = type === "Feature",
    stop = isFeatureCollection ? geojson.features.length : 1;

  // This logic may look a little weird. The reason why it is that way
  // is because it's trying to be fast. GeoJSON supports multiple kinds
  // of objects at its root: FeatureCollection, Features, Geometries.
  // This function has the responsibility of handling all of them, and that
  // means that some of the `for` loops you see below actually just don't apply
  // to certain inputs. For instance, if you give this just a
  // Point geometry, then both loops are short-circuited and all we do
  // is gradually rename the input until it's called 'geometry'.
  //
  // This also aims to allocate as few resources as possible: just a
  // few numbers and booleans, rather than any temporary arrays as would
  // be required with the normalization approach.
  for (var featureIndex = 0; featureIndex < stop; featureIndex++) {
    geometryMaybeCollection = isFeatureCollection ? geojson.features[featureIndex].geometry : isFeature ? geojson.geometry : geojson;
    isGeometryCollection = geometryMaybeCollection ? geometryMaybeCollection.type === "GeometryCollection" : false;
    stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;
    for (var geomIndex = 0; geomIndex < stopG; geomIndex++) {
      var multiFeatureIndex = 0;
      var geometryIndex = 0;
      geometry = isGeometryCollection ? geometryMaybeCollection.geometries[geomIndex] : geometryMaybeCollection;

      // Handles null Geometry -- Skips this geometry
      if (geometry === null) continue;
      coords = geometry.coordinates;
      var geomType = geometry.type;
      wrapShrink = excludeWrapCoord && (geomType === "Polygon" || geomType === "MultiPolygon") ? 1 : 0;
      switch (geomType) {
        case null:
          break;
        case "Point":
          if (callback(coords, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
          coordIndex++;
          multiFeatureIndex++;
          break;
        case "LineString":
        case "MultiPoint":
          for (j = 0; j < coords.length; j++) {
            if (callback(coords[j], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
            coordIndex++;
            if (geomType === "MultiPoint") multiFeatureIndex++;
          }
          if (geomType === "LineString") multiFeatureIndex++;
          break;
        case "Polygon":
        case "MultiLineString":
          for (j = 0; j < coords.length; j++) {
            for (k = 0; k < coords[j].length - wrapShrink; k++) {
              if (callback(coords[j][k], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
              coordIndex++;
            }
            if (geomType === "MultiLineString") multiFeatureIndex++;
            if (geomType === "Polygon") geometryIndex++;
          }
          if (geomType === "Polygon") multiFeatureIndex++;
          break;
        case "MultiPolygon":
          for (j = 0; j < coords.length; j++) {
            geometryIndex = 0;
            for (k = 0; k < coords[j].length; k++) {
              for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
                if (callback(coords[j][k][l], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
                coordIndex++;
              }
              geometryIndex++;
            }
            multiFeatureIndex++;
          }
          break;
        case "GeometryCollection":
          for (j = 0; j < geometry.geometries.length; j++) if (coordEach(geometry.geometries[j], callback, excludeWrapCoord) === false) return false;
          break;
        default:
          throw new Error("Unknown Geometry Type");
      }
    }
  }
}

/**
 * Takes one or more features and calculates the centroid using the mean of all vertices.
 * This lessens the effect of small islands and artifacts when calculating the centroid of a set of polygons.
 *
 * @name centroid
 * @param {GeoJSON} geojson GeoJSON to be centered
 * @param {Object} [options={}] Optional Parameters
 * @param {Object} [options.properties={}] an Object that is used as the {@link Feature}'s properties
 * @returns {Feature<Point>} the centroid of the input features
 * @example
 * var polygon = turf.polygon([[[-81, 41], [-88, 36], [-84, 31], [-80, 33], [-77, 39], [-81, 41]]]);
 *
 * var centroid = turf.centroid(polygon);
 *
 * //addToMap
 * var addToMap = [polygon, centroid]
 */
function centroid(geojson, options) {
  if (options === void 0) {
    options = {};
  }
  var xSum = 0;
  var ySum = 0;
  var len = 0;
  coordEach(geojson, function (coord) {
    xSum += coord[0];
    ySum += coord[1];
    len++;
  }, true);
  return point([xSum / len, ySum / len], options.properties);
}

/**
* @module @svizzle/geo/geojson
*/

/**
 * Return a function expecting a geojson and creating or updating the provided property of all features using the provided map.
 * Note that you can pass a `key or an alternative key `key_alt` e.g. when you use ISO Alpha 2 codes and you need to identify unrecognized territories with another key.
 *
 * @function
 * @arg {object} args - Geojson object
 * @arg {string} args.key_alt - Alternative key to be found in properties in `key` is not found.
 * @arg {string} args.key - Key to be found in properties
 * @arg {object} args.map - Mapping key (string) -> string
 * @arg {function} args.mapFn - Function key (string) -> string
 * @arg {string} args.propName - Name of the property to be added to `properties`
 * @return {function} - Object -> Object
 *
 * @example
> geojson = {
	type: 'FeatureCollection',
	features: [{
		type: 'Feature',
		geometry: {
			type: 'Polygon',
			coordinates: [
				[[1, -1], [1, 1], [-1, 1], [-1, -1], [1, -1]]
			]
		},
		properties: {iso_a2: 'BF'}
	}, {
		type: 'Feature',
		geometry: {
			type: 'Polygon',
			coordinates: [
				[[2, -1], [2, 1], [0, 1], [0, -1], [2, -1]]
			]
		},
		properties: {name: 'Kosovo'}
	}, {
		type: 'Feature',
		geometry: {
			type: 'Polygon',
			coordinates: [
				[[4, -1], [2, 7], [0, 5], [0, -4], [4, -1]]
			]
		},
		properties: {iso_a2: 'FR'}
	}]
}
> keyToColor = {BF: 'red', Kosovo: 'yellow'}
> addColor = makeAddFeaturesProperty({
	propName: 'color',
	map: keyToColor,
	key: 'iso_a2',
	key_alt: 'name'
})
> coloredFeatures = addColor(geojson)
{
	type: 'FeatureCollection',
	features: [{
		type: 'Feature',
		geometry: {
			type: 'Polygon',
			coordinates: [
				[[1, -1], [1, 1], [-1, 1], [-1, -1], [1, -1]]
			]
		},
		properties: {iso_a2: 'BF', color: 'red'}
	}, {
		type: 'Feature',
		geometry: {
			type: 'Polygon',
			coordinates: [
				[[2, -1], [2, 1], [0, 1], [0, -1], [2, -1]]
			]
		},
		properties: {name: 'Kosovo', color: 'yellow'}
	}, {
		type: 'Feature',
		geometry: {
			type: 'Polygon',
			coordinates: [
				[[4, -1], [2, 7], [0, 5], [0, -4], [4, -1]]
			]
		},
		properties: {iso_a2: 'FR', color: undefined}
	}]
}
 * @since 0.5.0
 */
const makeUpdateFeaturesProperty = _ref => {
  let {
    key_alt,
    key,
    map,
    mapFn,
    propName
  } = _ref;
  return updateKey('features', mapWith(updateKey('properties', properties => {
    let propValue;
    if (map) {
      propValue = has(map, properties[key]) ? map[properties[key]] : has(map, properties[key_alt]) ? map[properties[key_alt]] : undefined;
    } else if (mapFn) {
      propValue = properties[key] ? mapFn(properties[key]) : properties[key_alt] ? mapFn(properties[key_alt]) : undefined;
    }
    return {
      ...properties,
      [propName]: propValue
    };
  })));
};

/**
 * Return the a collection of centroids of the provided features, each having the correspondent feature properties.
 *
 * @function
 * @arg {array} features - Array of features
 * @return {object} collection - FeatureCollection of Point features
 *
 * @example
> makeCentroids([
	{
		type: 'Feature',
		properties: {foo: 'a'},
		geometry: {type: 'LineString', coordinates: [
			[[1, -1], [1, 1], [-1, 1], [-1, -1], [1, -1]]
		]}
	},
	{
		type: 'Feature',
		properties: {foo: 'b'},
		geometry: {type: 'LineString', coordinates: [
			[[2, -1], [2, 1], [0, 1], [0, -1], [2, -1]]
		]}
	}
])
{
	type: 'FeatureCollection',
	features: [{
		type: 'Feature',
		geometry: {type: 'Point', coordinates: [0.2, -0.2]},
		properties: {foo: 'a'}
	}, {
		type: 'Feature',
		geometry: {type: 'Point', coordinates: [1.2, -0.2]},
		properties: {foo: 'b'}
	}]
}
 * @since 0.1.0
 */
pipe([mapWith(feature => centroid(feature, {
  properties: feature.properties
})), featureCollection]);

// TODO DOC: define FeatureCollection type

var areaSum = new Adder(),
  areaRingSum = new Adder(),
  x00$2,
  y00$2,
  x0$2,
  y0$2;
var areaStream = {
  point: noop,
  lineStart: noop,
  lineEnd: noop,
  polygonStart: function () {
    areaStream.lineStart = areaRingStart;
    areaStream.lineEnd = areaRingEnd;
  },
  polygonEnd: function () {
    areaStream.lineStart = areaStream.lineEnd = areaStream.point = noop;
    areaSum.add(abs(areaRingSum));
    areaRingSum = new Adder();
  },
  result: function () {
    var area = areaSum / 2;
    areaSum = new Adder();
    return area;
  }
};
function areaRingStart() {
  areaStream.point = areaPointFirst;
}
function areaPointFirst(x, y) {
  areaStream.point = areaPoint;
  x00$2 = x0$2 = x, y00$2 = y0$2 = y;
}
function areaPoint(x, y) {
  areaRingSum.add(y0$2 * x - x0$2 * y);
  x0$2 = x, y0$2 = y;
}
function areaRingEnd() {
  areaPoint(x00$2, y00$2);
}
var pathArea = areaStream;

// TODO Enforce positive area for exterior, negative area for interior?

var X0 = 0,
  Y0 = 0,
  Z0 = 0,
  X1 = 0,
  Y1 = 0,
  Z1 = 0,
  X2 = 0,
  Y2 = 0,
  Z2 = 0,
  x00$1,
  y00$1,
  x0$1,
  y0$1;
var centroidStream = {
  point: centroidPoint,
  lineStart: centroidLineStart,
  lineEnd: centroidLineEnd,
  polygonStart: function () {
    centroidStream.lineStart = centroidRingStart;
    centroidStream.lineEnd = centroidRingEnd;
  },
  polygonEnd: function () {
    centroidStream.point = centroidPoint;
    centroidStream.lineStart = centroidLineStart;
    centroidStream.lineEnd = centroidLineEnd;
  },
  result: function () {
    var centroid = Z2 ? [X2 / Z2, Y2 / Z2] : Z1 ? [X1 / Z1, Y1 / Z1] : Z0 ? [X0 / Z0, Y0 / Z0] : [NaN, NaN];
    X0 = Y0 = Z0 = X1 = Y1 = Z1 = X2 = Y2 = Z2 = 0;
    return centroid;
  }
};
function centroidPoint(x, y) {
  X0 += x;
  Y0 += y;
  ++Z0;
}
function centroidLineStart() {
  centroidStream.point = centroidPointFirstLine;
}
function centroidPointFirstLine(x, y) {
  centroidStream.point = centroidPointLine;
  centroidPoint(x0$1 = x, y0$1 = y);
}
function centroidPointLine(x, y) {
  var dx = x - x0$1,
    dy = y - y0$1,
    z = sqrt(dx * dx + dy * dy);
  X1 += z * (x0$1 + x) / 2;
  Y1 += z * (y0$1 + y) / 2;
  Z1 += z;
  centroidPoint(x0$1 = x, y0$1 = y);
}
function centroidLineEnd() {
  centroidStream.point = centroidPoint;
}
function centroidRingStart() {
  centroidStream.point = centroidPointFirstRing;
}
function centroidRingEnd() {
  centroidPointRing(x00$1, y00$1);
}
function centroidPointFirstRing(x, y) {
  centroidStream.point = centroidPointRing;
  centroidPoint(x00$1 = x0$1 = x, y00$1 = y0$1 = y);
}
function centroidPointRing(x, y) {
  var dx = x - x0$1,
    dy = y - y0$1,
    z = sqrt(dx * dx + dy * dy);
  X1 += z * (x0$1 + x) / 2;
  Y1 += z * (y0$1 + y) / 2;
  Z1 += z;
  z = y0$1 * x - x0$1 * y;
  X2 += z * (x0$1 + x);
  Y2 += z * (y0$1 + y);
  Z2 += z * 3;
  centroidPoint(x0$1 = x, y0$1 = y);
}
var pathCentroid = centroidStream;

function PathContext(context) {
  this._context = context;
}
PathContext.prototype = {
  _radius: 4.5,
  pointRadius: function (_) {
    return this._radius = _, this;
  },
  polygonStart: function () {
    this._line = 0;
  },
  polygonEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._point = 0;
  },
  lineEnd: function () {
    if (this._line === 0) this._context.closePath();
    this._point = NaN;
  },
  point: function (x, y) {
    switch (this._point) {
      case 0:
        {
          this._context.moveTo(x, y);
          this._point = 1;
          break;
        }
      case 1:
        {
          this._context.lineTo(x, y);
          break;
        }
      default:
        {
          this._context.moveTo(x + this._radius, y);
          this._context.arc(x, y, this._radius, 0, tau);
          break;
        }
    }
  },
  result: noop
};

var lengthSum = new Adder(),
  lengthRing,
  x00,
  y00,
  x0,
  y0;
var lengthStream = {
  point: noop,
  lineStart: function () {
    lengthStream.point = lengthPointFirst;
  },
  lineEnd: function () {
    if (lengthRing) lengthPoint(x00, y00);
    lengthStream.point = noop;
  },
  polygonStart: function () {
    lengthRing = true;
  },
  polygonEnd: function () {
    lengthRing = null;
  },
  result: function () {
    var length = +lengthSum;
    lengthSum = new Adder();
    return length;
  }
};
function lengthPointFirst(x, y) {
  lengthStream.point = lengthPoint;
  x00 = x0 = x, y00 = y0 = y;
}
function lengthPoint(x, y) {
  x0 -= x, y0 -= y;
  lengthSum.add(sqrt(x0 * x0 + y0 * y0));
  x0 = x, y0 = y;
}
var pathMeasure = lengthStream;

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
// Simple caching for constant-radius points.
let cacheDigits, cacheAppend, cacheRadius, cacheCircle;
class PathString {
  constructor(digits) {
    this._append = digits == null ? append : appendRound(digits);
    this._radius = 4.5;
    this._ = "";
  }
  pointRadius(_) {
    this._radius = +_;
    return this;
  }
  polygonStart() {
    this._line = 0;
  }
  polygonEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    if (this._line === 0) this._ += "Z";
    this._point = NaN;
  }
  point(x, y) {
    switch (this._point) {
      case 0:
        {
          this._append(_templateObject || (_templateObject = _taggedTemplateLiteral(["M", ",", ""])), x, y);
          this._point = 1;
          break;
        }
      case 1:
        {
          this._append(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["L", ",", ""])), x, y);
          break;
        }
      default:
        {
          this._append(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["M", ",", ""])), x, y);
          if (this._radius !== cacheRadius || this._append !== cacheAppend) {
            const r = this._radius;
            const s = this._;
            this._ = ""; // stash the old string so we can cache the circle path fragment
            this._append(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["m0,", "a", ",", " 0 1,1 0,", "a", ",", " 0 1,1 0,", "z"])), r, r, r, -2 * r, r, r, 2 * r);
            cacheRadius = r;
            cacheAppend = this._append;
            cacheCircle = this._;
            this._ = s;
          }
          this._ += cacheCircle;
          break;
        }
    }
  }
  result() {
    const result = this._;
    this._ = "";
    return result.length ? result : null;
  }
}
function append(strings) {
  let i = 1;
  this._ += strings[0];
  for (const j = strings.length; i < j; ++i) {
    this._ += arguments[i] + strings[i];
  }
}
function appendRound(digits) {
  const d = Math.floor(digits);
  if (!(d >= 0)) throw new RangeError("invalid digits: ".concat(digits));
  if (d > 15) return append;
  if (d !== cacheDigits) {
    const k = 10 ** d;
    cacheDigits = d;
    cacheAppend = function append(strings) {
      let i = 1;
      this._ += strings[0];
      for (const j = strings.length; i < j; ++i) {
        this._ += Math.round(arguments[i] * k) / k + strings[i];
      }
    };
  }
  return cacheAppend;
}

function geoPath (projection, context) {
  let digits = 3,
    pointRadius = 4.5,
    projectionStream,
    contextStream;
  function path(object) {
    if (object) {
      if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
      geoStream(object, projectionStream(contextStream));
    }
    return contextStream.result();
  }
  path.area = function (object) {
    geoStream(object, projectionStream(pathArea));
    return pathArea.result();
  };
  path.measure = function (object) {
    geoStream(object, projectionStream(pathMeasure));
    return pathMeasure.result();
  };
  path.bounds = function (object) {
    geoStream(object, projectionStream(boundsStream));
    return boundsStream.result();
  };
  path.centroid = function (object) {
    geoStream(object, projectionStream(pathCentroid));
    return pathCentroid.result();
  };
  path.projection = function (_) {
    if (!arguments.length) return projection;
    projectionStream = _ == null ? (projection = null, identity) : (projection = _).stream;
    return path;
  };
  path.context = function (_) {
    if (!arguments.length) return context;
    contextStream = _ == null ? (context = null, new PathString(digits)) : new PathContext(context = _);
    if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
    return path;
  };
  path.pointRadius = function (_) {
    if (!arguments.length) return pointRadius;
    pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
    return path;
  };
  path.digits = function (_) {
    if (!arguments.length) return digits;
    if (_ == null) digits = null;else {
      const d = Math.floor(_);
      if (!(d >= 0)) throw new RangeError("invalid digits: ".concat(_));
      digits = d;
    }
    if (context === null) contextStream = new PathString(digits);
    return path;
  };
  return path.projection(projection).digits(digits).context(context);
}

function azimuthalRaw(scale) {
  return function (x, y) {
    var cx = cos(x),
      cy = cos(y),
      k = scale(cx * cy);
    if (k === Infinity) return [2, 0];
    return [k * cy * sin(x), k * sin(y)];
  };
}
function azimuthalInvert(angle) {
  return function (x, y) {
    var z = sqrt(x * x + y * y),
      c = angle(z),
      sc = sin(c),
      cc = cos(c);
    return [atan2(x * sc, z * cc), asin(z && y * sc / z)];
  };
}

var azimuthalEqualAreaRaw = azimuthalRaw(function (cxcy) {
  return sqrt(2 / (1 + cxcy));
});
azimuthalEqualAreaRaw.invert = azimuthalInvert(function (z) {
  return 2 * asin(z / 2);
});
function azimuthalEqualArea () {
  return projection(azimuthalEqualAreaRaw).scale(124.75).clipAngle(180 - 1e-3);
}

var azimuthalEquidistantRaw = azimuthalRaw(function (c) {
  return (c = acos(c)) && c / sin(c);
});
azimuthalEquidistantRaw.invert = azimuthalInvert(function (z) {
  return z;
});
function azimuthalEquidistant () {
  return projection(azimuthalEquidistantRaw).scale(79.4188).clipAngle(180 - 1e-3);
}

function equirectangularRaw(lambda, phi) {
  return [lambda, phi];
}
equirectangularRaw.invert = equirectangularRaw;
function equirectangular () {
  return projection(equirectangularRaw).scale(152.63);
}

function naturalEarth1Raw(lambda, phi) {
  var phi2 = phi * phi,
    phi4 = phi2 * phi2;
  return [lambda * (0.8707 - 0.131979 * phi2 + phi4 * (-0.013791 + phi4 * (0.003971 * phi2 - 0.001529 * phi4))), phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 0.005916 * phi4)))];
}
naturalEarth1Raw.invert = function (x, y) {
  var phi = y,
    i = 25,
    delta;
  do {
    var phi2 = phi * phi,
      phi4 = phi2 * phi2;
    phi -= delta = (phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 0.005916 * phi4))) - y) / (1.007226 + phi2 * (0.015085 * 3 + phi4 * (-0.044475 * 7 + 0.028874 * 9 * phi2 - 0.005916 * 11 * phi4)));
  } while (abs(delta) > epsilon && --i > 0);
  return [x / (0.8707 + (phi2 = phi * phi) * (-0.131979 + phi2 * (-0.013791 + phi2 * phi2 * phi2 * (0.003971 - 0.001529 * phi2)))), phi];
};
function naturalEarth1 () {
  return projection(naturalEarth1Raw).scale(175.295);
}

/* ../../components/barchart/src/BarchartVDiv.svelte generated by Svelte v3.59.2 */
const file$1 = "../../components/barchart/src/BarchartVDiv.svelte";
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[66] = list[i].barBackgroundColor;
  child_ctx[67] = list[i].barColor;
  child_ctx[68] = list[i].barWidth;
  child_ctx[69] = list[i].barX;
  child_ctx[70] = list[i].displayValue;
  child_ctx[71] = list[i].isLabelAlignedRight;
  child_ctx[72] = list[i].isValueAlignedRight;
  child_ctx[73] = list[i].key;
  child_ctx[74] = list[i].label;
  child_ctx[75] = list[i].labelX;
  child_ctx[76] = list[i].textColor;
  child_ctx[77] = list[i].valueX;
  child_ctx[79] = i;
  return child_ctx;
}
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[80] = list[i].color;
  child_ctx[81] = list[i].dasharray;
  child_ctx[82] = list[i].linewidth;
  child_ctx[83] = list[i].valueX;
  return child_ctx;
}
function get_each_context_2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[80] = list[i].color;
  child_ctx[81] = list[i].dasharray;
  child_ctx[86] = list[i].isAlignedRight;
  child_ctx[74] = list[i].label;
  child_ctx[82] = list[i].linewidth;
  child_ctx[87] = list[i].rectWidth;
  child_ctx[88] = list[i].textLength;
  child_ctx[89] = list[i].textX;
  child_ctx[77] = list[i].valueX;
  child_ctx[83] = list[i].x;
  child_ctx[90] = list[i].y;
  return child_ctx;
}

// (386:1) {#if title}
function create_if_block_4(ctx) {
  let header;
  let h2;
  let t;
  const block = {
    c: function create() {
      header = element("header");
      h2 = element("h2");
      t = text( /*title*/ctx[6]);
      this.h();
    },
    l: function claim(nodes) {
      header = claim_element(nodes, "HEADER", {
        class: true
      });
      var header_nodes = children(header);
      h2 = claim_element(header_nodes, "H2", {
        class: true
      });
      var h2_nodes = children(h2);
      t = claim_text(h2_nodes, /*title*/ctx[6]);
      h2_nodes.forEach(detach_dev);
      header_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h2, "class", "svelte-1q76l8c");
      add_location(h2, file$1, 387, 3, 9907);
      attr_dev(header, "class", "svelte-1q76l8c");
      add_location(header, file$1, 386, 2, 9895);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, header, anchor);
      append_hydration_dev(header, h2);
      append_hydration_dev(h2, t);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] & /*title*/64) set_data_dev(t, /*title*/ctx[6]);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(header);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_4.name,
    type: "if",
    source: "(386:1) {#if title}",
    ctx
  });
  return block;
}

// (401:2) {:else}
function create_else_block$1(ctx) {
  let t;
  let div;
  let svg;
  let rect;
  let g;
  let each_blocks = [];
  let each_1_lookup = new Map();
  let div_resize_listener;
  let mounted;
  let dispose;
  let if_block0 = /*refs*/ctx[4].length && create_if_block_3(ctx);
  let if_block1 = /*refsLayout*/ctx[17] && create_if_block_2$1(ctx);
  let each_value = /*barsLayout*/ctx[14];
  validate_each_argument(each_value);
  const get_key = ctx => /*key*/ctx[73];
  validate_each_keys(ctx, each_value, get_each_context$1, get_key);
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context$1(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block$1(key, child_ctx));
  }
  let if_block2 = /*crossesZero*/ctx[15] && create_if_block_1$1(ctx);
  const block = {
    c: function create() {
      if (if_block0) if_block0.c();
      t = space();
      div = element("div");
      svg = svg_element("svg");
      rect = svg_element("rect");
      if (if_block1) if_block1.c();
      g = svg_element("g");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      if (if_block2) if_block2.c();
      this.h();
    },
    l: function claim(nodes) {
      if (if_block0) if_block0.l(nodes);
      t = claim_space(nodes);
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      svg = claim_svg_element(div_nodes, "svg", {
        width: true,
        height: true
      });
      var svg_nodes = children(svg);
      rect = claim_svg_element(svg_nodes, "rect", {
        class: true,
        width: true,
        height: true
      });
      children(rect).forEach(detach_dev);
      if (if_block1) if_block1.l(svg_nodes);
      g = claim_svg_element(svg_nodes, "g", {});
      var g_nodes = children(g);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(g_nodes);
      }
      g_nodes.forEach(detach_dev);
      if (if_block2) if_block2.l(svg_nodes);
      svg_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect, "class", "bkg svelte-1q76l8c");
      attr_dev(rect, "width", /*width*/ctx[9]);
      attr_dev(rect, "height", /*svgHeight*/ctx[18]);
      add_location(rect, file$1, 458, 5, 11380);
      add_location(g, file$1, 481, 5, 11879);
      attr_dev(svg, "width", /*width*/ctx[9]);
      attr_dev(svg, "height", /*svgHeight*/ctx[18]);
      add_location(svg, file$1, 457, 4, 11342);
      attr_dev(div, "class", "scrollable svelte-1q76l8c");
      add_render_callback(() => /*div_elementresize_handler*/ctx[57].call(div));
      toggle_class(div, "withrefs", /*refs*/ctx[4] && /*refs*/ctx[4].length);
      add_location(div, file$1, 449, 3, 11131);
    },
    m: function mount(target, anchor) {
      if (if_block0) if_block0.m(target, anchor);
      insert_hydration_dev(target, t, anchor);
      insert_hydration_dev(target, div, anchor);
      append_hydration_dev(div, svg);
      append_hydration_dev(svg, rect);
      if (if_block1) if_block1.m(svg, null);
      append_hydration_dev(svg, g);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(g, null);
        }
      }
      if (if_block2) if_block2.m(svg, null);
      div_resize_listener = add_iframe_resize_listener(div, /*div_elementresize_handler*/ctx[57].bind(div));
      /*div_binding*/
      ctx[58](div);
      if (!mounted) {
        dispose = listen_dev(div, "mouseleave", /*mouseleave_handler*/ctx[59], false, false, false, false);
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if ( /*refs*/ctx[4].length) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_3(ctx);
          if_block0.c();
          if_block0.m(t.parentNode, t);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (dirty[0] & /*width*/512) {
        attr_dev(rect, "width", /*width*/ctx[9]);
      }
      if (dirty[0] & /*svgHeight*/262144) {
        attr_dev(rect, "height", /*svgHeight*/ctx[18]);
      }
      if ( /*refsLayout*/ctx[17]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_2$1(ctx);
          if_block1.c();
          if_block1.m(svg, g);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (dirty[0] & /*isInteractive, itemHeight, barsLayout, onClick, onMouseenter, onMouseleave, onKeyDown, textY, barHeight, barY, width*/64506371) {
        each_value = /*barsLayout*/ctx[14];
        validate_each_argument(each_value);
        validate_each_keys(ctx, each_value, get_each_context$1, get_key);
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, g, destroy_block, create_each_block$1, null, get_each_context$1);
      }
      if ( /*crossesZero*/ctx[15]) {
        if (if_block2) {
          if_block2.p(ctx, dirty);
        } else {
          if_block2 = create_if_block_1$1(ctx);
          if_block2.c();
          if_block2.m(svg, null);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }
      if (dirty[0] & /*width*/512) {
        attr_dev(svg, "width", /*width*/ctx[9]);
      }
      if (dirty[0] & /*svgHeight*/262144) {
        attr_dev(svg, "height", /*svgHeight*/ctx[18]);
      }
      if (dirty[0] & /*refs*/16) {
        toggle_class(div, "withrefs", /*refs*/ctx[4] && /*refs*/ctx[4].length);
      }
    },
    i: noop$1,
    o: noop$1,
    d: function destroy(detaching) {
      if (if_block0) if_block0.d(detaching);
      if (detaching) detach_dev(t);
      if (detaching) detach_dev(div);
      if (if_block1) if_block1.d();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d();
      }
      if (if_block2) if_block2.d();
      div_resize_listener();
      /*div_binding*/
      ctx[58](null);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_else_block$1.name,
    type: "else",
    source: "(401:2) {:else}",
    ctx
  });
  return block;
}

// (392:2) {#if !items || items.length === 0}
function create_if_block$1(ctx) {
  let messageview;
  let current;
  messageview = new MessageView({
    props: {
      color: /*theme*/ctx[5].messageColor,
      fontSize: /*theme*/ctx[5].messageFontSize,
      textAlign: "center",
      text: /*message*/ctx[3]
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(messageview.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(messageview.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(messageview, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      const messageview_changes = {};
      if (dirty[0] & /*theme*/32) messageview_changes.color = /*theme*/ctx[5].messageColor;
      if (dirty[0] & /*theme*/32) messageview_changes.fontSize = /*theme*/ctx[5].messageFontSize;
      if (dirty[0] & /*message*/8) messageview_changes.text = /*message*/ctx[3];
      messageview.$set(messageview_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(messageview.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(messageview.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(messageview, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block$1.name,
    type: "if",
    source: "(392:2) {#if !items || items.length === 0}",
    ctx
  });
  return block;
}

// (404:3) {#if refs.length}
function create_if_block_3(ctx) {
  let div;
  let svg;
  let each_value_2 = /*refsLayout*/ctx[17];
  validate_each_argument(each_value_2);
  let each_blocks = [];
  for (let i = 0; i < each_value_2.length; i += 1) {
    each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
  }
  const block = {
    c: function create() {
      div = element("div");
      svg = svg_element("svg");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      svg = claim_svg_element(div_nodes, "svg", {
        width: true,
        height: true
      });
      var svg_nodes = children(svg);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(svg_nodes);
      }
      svg_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(svg, "width", /*width*/ctx[9]);
      attr_dev(svg, "height", /*refsHeight*/ctx[13]);
      add_location(svg, file$1, 405, 5, 10227);
      attr_dev(div, "class", "refs svelte-1q76l8c");
      add_location(div, file$1, 404, 4, 10203);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div, anchor);
      append_hydration_dev(div, svg);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(svg, null);
        }
      }
    },
    p: function update(ctx, dirty) {
      if (dirty[0] & /*refsLayout, theme, refHeight, refsHeight*/143392) {
        each_value_2 = /*refsLayout*/ctx[17];
        validate_each_argument(each_value_2);
        let i;
        for (i = 0; i < each_value_2.length; i += 1) {
          const child_ctx = get_each_context_2(ctx, each_value_2, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_2(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(svg, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value_2.length;
      }
      if (dirty[0] & /*width*/512) {
        attr_dev(svg, "width", /*width*/ctx[9]);
      }
      if (dirty[0] & /*refsHeight*/8192) {
        attr_dev(svg, "height", /*refsHeight*/ctx[13]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_3.name,
    type: "if",
    source: "(404:3) {#if refs.length}",
    ctx
  });
  return block;
}

// (407:6) {#each refsLayout as {        color,        dasharray,        isAlignedRight,        label,        linewidth,        rectWidth,        textLength,        textX,        valueX,        x,        y,       }}
function create_each_block_2(ctx) {
  let g;
  let rect;
  let rect_x_value;
  let rect_width_value;
  let text_1;
  let t_value = /*label*/ctx[74] + "";
  let t;
  let text_1_x_value;
  let text_1_y_value;
  let text_1_textLength_value;
  let line;
  let line_stroke_value;
  let line_stroke_dasharray_value;
  let line_stroke_width_value;
  let line_y__value;
  let g_transform_value;
  const block = {
    c: function create() {
      g = svg_element("g");
      rect = svg_element("rect");
      text_1 = svg_element("text");
      t = text(t_value);
      line = svg_element("line");
      this.h();
    },
    l: function claim(nodes) {
      g = claim_svg_element(nodes, "g", {
        class: true,
        transform: true
      });
      var g_nodes = children(g);
      rect = claim_svg_element(g_nodes, "rect", {
        x: true,
        width: true,
        height: true,
        class: true
      });
      children(rect).forEach(detach_dev);
      text_1 = claim_svg_element(g_nodes, "text", {
        x: true,
        y: true,
        textLength: true,
        class: true
      });
      var text_1_nodes = children(text_1);
      t = claim_text(text_1_nodes, t_value);
      text_1_nodes.forEach(detach_dev);
      line = claim_svg_element(g_nodes, "line", {
        class: true,
        stroke: true,
        "stroke-dasharray": true,
        "stroke-width": true,
        y1: true,
        y2: true
      });
      children(line).forEach(detach_dev);
      g_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect, "x", rect_x_value = /*x*/ctx[83]);
      attr_dev(rect, "width", rect_width_value = /*rectWidth*/ctx[87]);
      attr_dev(rect, "height", /*refHeight*/ctx[12]);
      attr_dev(rect, "class", "svelte-1q76l8c");
      add_location(rect, file$1, 423, 8, 10564);
      attr_dev(text_1, "x", text_1_x_value = /*textX*/ctx[89]);
      attr_dev(text_1, "y", text_1_y_value = /*refHeight*/ctx[12] / 2);
      attr_dev(text_1, "textLength", text_1_textLength_value = /*textLength*/ctx[88]);
      attr_dev(text_1, "class", "svelte-1q76l8c");
      toggle_class(text_1, "right", /*isAlignedRight*/ctx[86]);
      add_location(text_1, file$1, 428, 8, 10657);
      attr_dev(line, "class", "ref");
      attr_dev(line, "stroke", line_stroke_value = /*color*/ctx[80] || /*theme*/ctx[5].refColor);
      attr_dev(line, "stroke-dasharray", line_stroke_dasharray_value = /*dasharray*/ctx[81] || /*theme*/ctx[5].refDasharray);
      attr_dev(line, "stroke-width", line_stroke_width_value = /*linewidth*/ctx[82] || /*theme*/ctx[5].refWidth);
      attr_dev(line, "y1", /*refHeight*/ctx[12]);
      attr_dev(line, "y2", line_y__value = /*refsHeight*/ctx[13] - /*y*/ctx[90]);
      add_location(line, file$1, 434, 8, 10801);
      attr_dev(g, "class", "ref svelte-1q76l8c");
      attr_dev(g, "transform", g_transform_value = "translate(" + /*valueX*/ctx[77] + ", " + /*y*/ctx[90] + ")");
      add_location(g, file$1, 419, 7, 10479);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, g, anchor);
      append_hydration_dev(g, rect);
      append_hydration_dev(g, text_1);
      append_hydration_dev(text_1, t);
      append_hydration_dev(g, line);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] & /*refsLayout*/131072 && rect_x_value !== (rect_x_value = /*x*/ctx[83])) {
        attr_dev(rect, "x", rect_x_value);
      }
      if (dirty[0] & /*refsLayout*/131072 && rect_width_value !== (rect_width_value = /*rectWidth*/ctx[87])) {
        attr_dev(rect, "width", rect_width_value);
      }
      if (dirty[0] & /*refHeight*/4096) {
        attr_dev(rect, "height", /*refHeight*/ctx[12]);
      }
      if (dirty[0] & /*refsLayout*/131072 && t_value !== (t_value = /*label*/ctx[74] + "")) set_data_dev(t, t_value);
      if (dirty[0] & /*refsLayout*/131072 && text_1_x_value !== (text_1_x_value = /*textX*/ctx[89])) {
        attr_dev(text_1, "x", text_1_x_value);
      }
      if (dirty[0] & /*refHeight*/4096 && text_1_y_value !== (text_1_y_value = /*refHeight*/ctx[12] / 2)) {
        attr_dev(text_1, "y", text_1_y_value);
      }
      if (dirty[0] & /*refsLayout*/131072 && text_1_textLength_value !== (text_1_textLength_value = /*textLength*/ctx[88])) {
        attr_dev(text_1, "textLength", text_1_textLength_value);
      }
      if (dirty[0] & /*refsLayout*/131072) {
        toggle_class(text_1, "right", /*isAlignedRight*/ctx[86]);
      }
      if (dirty[0] & /*refsLayout, theme*/131104 && line_stroke_value !== (line_stroke_value = /*color*/ctx[80] || /*theme*/ctx[5].refColor)) {
        attr_dev(line, "stroke", line_stroke_value);
      }
      if (dirty[0] & /*refsLayout, theme*/131104 && line_stroke_dasharray_value !== (line_stroke_dasharray_value = /*dasharray*/ctx[81] || /*theme*/ctx[5].refDasharray)) {
        attr_dev(line, "stroke-dasharray", line_stroke_dasharray_value);
      }
      if (dirty[0] & /*refsLayout, theme*/131104 && line_stroke_width_value !== (line_stroke_width_value = /*linewidth*/ctx[82] || /*theme*/ctx[5].refWidth)) {
        attr_dev(line, "stroke-width", line_stroke_width_value);
      }
      if (dirty[0] & /*refHeight*/4096) {
        attr_dev(line, "y1", /*refHeight*/ctx[12]);
      }
      if (dirty[0] & /*refsHeight, refsLayout*/139264 && line_y__value !== (line_y__value = /*refsHeight*/ctx[13] - /*y*/ctx[90])) {
        attr_dev(line, "y2", line_y__value);
      }
      if (dirty[0] & /*refsLayout*/131072 && g_transform_value !== (g_transform_value = "translate(" + /*valueX*/ctx[77] + ", " + /*y*/ctx[90] + ")")) {
        attr_dev(g, "transform", g_transform_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(g);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_each_block_2.name,
    type: "each",
    source: "(407:6) {#each refsLayout as {        color,        dasharray,        isAlignedRight,        label,        linewidth,        rectWidth,        textLength,        textX,        valueX,        x,        y,       }}",
    ctx
  });
  return block;
}

// (462:5) {#if refsLayout}
function create_if_block_2$1(ctx) {
  let each_1_anchor;
  let each_value_1 = /*refsLayout*/ctx[17];
  validate_each_argument(each_value_1);
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }
  const block = {
    c: function create() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    l: function claim(nodes) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(nodes);
      }
      each_1_anchor = empty();
    },
    m: function mount(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(target, anchor);
        }
      }
      insert_hydration_dev(target, each_1_anchor, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] & /*refsLayout, theme, svgHeight*/393248) {
        each_value_1 = /*refsLayout*/ctx[17];
        validate_each_argument(each_value_1);
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1(ctx, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_1(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value_1.length;
      }
    },
    d: function destroy(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching) detach_dev(each_1_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_2$1.name,
    type: "if",
    source: "(462:5) {#if refsLayout}",
    ctx
  });
  return block;
}

// (463:6) {#each refsLayout as {        color,        dasharray,        linewidth,        valueX: x,       }}
function create_each_block_1(ctx) {
  let line;
  let line_stroke_value;
  let line_stroke_dasharray_value;
  let line_stroke_width_value;
  let line_x__value;
  let line_x__value_1;
  const block = {
    c: function create() {
      line = svg_element("line");
      this.h();
    },
    l: function claim(nodes) {
      line = claim_svg_element(nodes, "line", {
        class: true,
        stroke: true,
        "stroke-dasharray": true,
        "stroke-width": true,
        x1: true,
        x2: true,
        y2: true
      });
      children(line).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(line, "class", "ref");
      attr_dev(line, "stroke", line_stroke_value = /*color*/ctx[80] || /*theme*/ctx[5].refColor);
      attr_dev(line, "stroke-dasharray", line_stroke_dasharray_value = /*dasharray*/ctx[81] || /*theme*/ctx[5].refDasharray);
      attr_dev(line, "stroke-width", line_stroke_width_value = /*linewidth*/ctx[82] || /*theme*/ctx[5].refWidth);
      attr_dev(line, "x1", line_x__value = /*x*/ctx[83]);
      attr_dev(line, "x2", line_x__value_1 = /*x*/ctx[83]);
      attr_dev(line, "y2", /*svgHeight*/ctx[18]);
      add_location(line, file$1, 468, 7, 11589);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, line, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] & /*refsLayout, theme*/131104 && line_stroke_value !== (line_stroke_value = /*color*/ctx[80] || /*theme*/ctx[5].refColor)) {
        attr_dev(line, "stroke", line_stroke_value);
      }
      if (dirty[0] & /*refsLayout, theme*/131104 && line_stroke_dasharray_value !== (line_stroke_dasharray_value = /*dasharray*/ctx[81] || /*theme*/ctx[5].refDasharray)) {
        attr_dev(line, "stroke-dasharray", line_stroke_dasharray_value);
      }
      if (dirty[0] & /*refsLayout, theme*/131104 && line_stroke_width_value !== (line_stroke_width_value = /*linewidth*/ctx[82] || /*theme*/ctx[5].refWidth)) {
        attr_dev(line, "stroke-width", line_stroke_width_value);
      }
      if (dirty[0] & /*refsLayout*/131072 && line_x__value !== (line_x__value = /*x*/ctx[83])) {
        attr_dev(line, "x1", line_x__value);
      }
      if (dirty[0] & /*refsLayout*/131072 && line_x__value_1 !== (line_x__value_1 = /*x*/ctx[83])) {
        attr_dev(line, "x2", line_x__value_1);
      }
      if (dirty[0] & /*svgHeight*/262144) {
        attr_dev(line, "y2", /*svgHeight*/ctx[18]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(line);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_each_block_1.name,
    type: "each",
    source: "(463:6) {#each refsLayout as {        color,        dasharray,        linewidth,        valueX: x,       }}",
    ctx
  });
  return block;
}

// (483:6) {#each barsLayout as {        barBackgroundColor,        barColor,        barWidth,        barX,        displayValue,        isLabelAlignedRight,        isValueAlignedRight,        key,        label,        labelX,        textColor,        valueX,       }
function create_each_block$1(key_1, ctx) {
  let g;
  let rect0;
  let rect0_fill_value;
  let rect1;
  let rect1_fill_value;
  let rect1_x_value;
  let rect1_width_value;
  let text0;
  let t0_value = /*label*/ctx[74] + "";
  let t0;
  let text0_fill_value;
  let text0_x_value;
  let text1;
  let t1_value = /*displayValue*/ctx[70] + "";
  let t1;
  let text1_fill_value;
  let text1_x_value;
  let g_tabindex_value;
  let g_transform_value;
  let mounted;
  let dispose;
  function keydown_handler() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return (/*keydown_handler*/ctx[56]( /*key*/ctx[73], ...args)
    );
  }
  const block = {
    key: key_1,
    first: null,
    c: function create() {
      g = svg_element("g");
      rect0 = svg_element("rect");
      rect1 = svg_element("rect");
      text0 = svg_element("text");
      t0 = text(t0_value);
      text1 = svg_element("text");
      t1 = text(t1_value);
      this.h();
    },
    l: function claim(nodes) {
      g = claim_svg_element(nodes, "g", {
        class: true,
        tabindex: true,
        transform: true
      });
      var g_nodes = children(g);
      rect0 = claim_svg_element(g_nodes, "rect", {
        width: true,
        fill: true,
        height: true
      });
      children(rect0).forEach(detach_dev);
      rect1 = claim_svg_element(g_nodes, "rect", {
        fill: true,
        height: true,
        x: true,
        y: true,
        width: true
      });
      children(rect1).forEach(detach_dev);
      text0 = claim_svg_element(g_nodes, "text", {
        class: true,
        fill: true,
        stroke: true,
        x: true,
        y: true
      });
      var text0_nodes = children(text0);
      t0 = claim_text(text0_nodes, t0_value);
      text0_nodes.forEach(detach_dev);
      text1 = claim_svg_element(g_nodes, "text", {
        class: true,
        fill: true,
        x: true,
        y: true
      });
      var text1_nodes = children(text1);
      t1 = claim_text(text1_nodes, t1_value);
      text1_nodes.forEach(detach_dev);
      g_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect0, "width", /*width*/ctx[9]);
      attr_dev(rect0, "fill", rect0_fill_value = /*barBackgroundColor*/ctx[66]);
      attr_dev(rect0, "height", /*itemHeight*/ctx[11]);
      add_location(rect0, file$1, 508, 8, 12687);
      attr_dev(rect1, "fill", rect1_fill_value = /*barColor*/ctx[67]);
      attr_dev(rect1, "height", /*barHeight*/ctx[0]);
      attr_dev(rect1, "x", rect1_x_value = /*barX*/ctx[69]);
      attr_dev(rect1, "y", /*barY*/ctx[20]);
      attr_dev(rect1, "width", rect1_width_value = /*barWidth*/ctx[68]);
      add_location(rect1, file$1, 513, 8, 12793);
      attr_dev(text0, "class", "label svelte-1q76l8c");
      attr_dev(text0, "fill", text0_fill_value = /*textColor*/ctx[76]);
      attr_dev(text0, "stroke", "none");
      attr_dev(text0, "x", text0_x_value = /*labelX*/ctx[75]);
      attr_dev(text0, "y", /*textY*/ctx[19]);
      toggle_class(text0, "right", /*isLabelAlignedRight*/ctx[71]);
      add_location(text0, file$1, 520, 8, 12933);
      attr_dev(text1, "class", "value svelte-1q76l8c");
      attr_dev(text1, "fill", text1_fill_value = /*textColor*/ctx[76]);
      attr_dev(text1, "x", text1_x_value = /*valueX*/ctx[77] - 2);
      attr_dev(text1, "y", /*textY*/ctx[19]);
      toggle_class(text1, "right", /*isValueAlignedRight*/ctx[72]);
      add_location(text1, file$1, 528, 8, 13125);
      attr_dev(g, "class", "item svelte-1q76l8c");
      attr_dev(g, "tabindex", g_tabindex_value = /*isInteractive*/ctx[1] ? 0 : -1);
      attr_dev(g, "transform", g_transform_value = "translate(0, " + /*itemHeight*/ctx[11] * /*index*/ctx[79] + ")");
      toggle_class(g, "clickable", /*isInteractive*/ctx[1]);
      add_location(g, file$1, 498, 7, 12296);
      this.first = g;
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, g, anchor);
      append_hydration_dev(g, rect0);
      append_hydration_dev(g, rect1);
      append_hydration_dev(g, text0);
      append_hydration_dev(text0, t0);
      append_hydration_dev(g, text1);
      append_hydration_dev(text1, t1);
      if (!mounted) {
        dispose = [listen_dev(g, "click", function () {
          if (is_function( /*isInteractive*/ctx[1] && /*onClick*/ctx[22]( /*key*/ctx[73]))) ( /*isInteractive*/ctx[1] && /*onClick*/ctx[22]( /*key*/ctx[73])).apply(this, arguments);
        }, false, false, false, false), listen_dev(g, "mouseenter", function () {
          if (is_function( /*onMouseenter*/ctx[24]( /*key*/ctx[73]))) /*onMouseenter*/ctx[24]( /*key*/ctx[73]).apply(this, arguments);
        }, false, false, false, false), listen_dev(g, "mouseleave", function () {
          if (is_function( /*isInteractive*/ctx[1] && /*onMouseleave*/ctx[25]( /*key*/ctx[73]))) ( /*isInteractive*/ctx[1] && /*onMouseleave*/ctx[25]( /*key*/ctx[73])).apply(this, arguments);
        }, false, false, false, false), listen_dev(g, "keydown", function () {
          if (is_function( /*isInteractive*/ctx[1] && keydown_handler)) ( /*isInteractive*/ctx[1] && keydown_handler).apply(this, arguments);
        }, false, false, false, false)];
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty[0] & /*width*/512) {
        attr_dev(rect0, "width", /*width*/ctx[9]);
      }
      if (dirty[0] & /*barsLayout*/16384 && rect0_fill_value !== (rect0_fill_value = /*barBackgroundColor*/ctx[66])) {
        attr_dev(rect0, "fill", rect0_fill_value);
      }
      if (dirty[0] & /*itemHeight*/2048) {
        attr_dev(rect0, "height", /*itemHeight*/ctx[11]);
      }
      if (dirty[0] & /*barsLayout*/16384 && rect1_fill_value !== (rect1_fill_value = /*barColor*/ctx[67])) {
        attr_dev(rect1, "fill", rect1_fill_value);
      }
      if (dirty[0] & /*barHeight*/1) {
        attr_dev(rect1, "height", /*barHeight*/ctx[0]);
      }
      if (dirty[0] & /*barsLayout*/16384 && rect1_x_value !== (rect1_x_value = /*barX*/ctx[69])) {
        attr_dev(rect1, "x", rect1_x_value);
      }
      if (dirty[0] & /*barY*/1048576) {
        attr_dev(rect1, "y", /*barY*/ctx[20]);
      }
      if (dirty[0] & /*barsLayout*/16384 && rect1_width_value !== (rect1_width_value = /*barWidth*/ctx[68])) {
        attr_dev(rect1, "width", rect1_width_value);
      }
      if (dirty[0] & /*barsLayout*/16384 && t0_value !== (t0_value = /*label*/ctx[74] + "")) set_data_dev(t0, t0_value);
      if (dirty[0] & /*barsLayout*/16384 && text0_fill_value !== (text0_fill_value = /*textColor*/ctx[76])) {
        attr_dev(text0, "fill", text0_fill_value);
      }
      if (dirty[0] & /*barsLayout*/16384 && text0_x_value !== (text0_x_value = /*labelX*/ctx[75])) {
        attr_dev(text0, "x", text0_x_value);
      }
      if (dirty[0] & /*textY*/524288) {
        attr_dev(text0, "y", /*textY*/ctx[19]);
      }
      if (dirty[0] & /*barsLayout*/16384) {
        toggle_class(text0, "right", /*isLabelAlignedRight*/ctx[71]);
      }
      if (dirty[0] & /*barsLayout*/16384 && t1_value !== (t1_value = /*displayValue*/ctx[70] + "")) set_data_dev(t1, t1_value);
      if (dirty[0] & /*barsLayout*/16384 && text1_fill_value !== (text1_fill_value = /*textColor*/ctx[76])) {
        attr_dev(text1, "fill", text1_fill_value);
      }
      if (dirty[0] & /*barsLayout*/16384 && text1_x_value !== (text1_x_value = /*valueX*/ctx[77] - 2)) {
        attr_dev(text1, "x", text1_x_value);
      }
      if (dirty[0] & /*textY*/524288) {
        attr_dev(text1, "y", /*textY*/ctx[19]);
      }
      if (dirty[0] & /*barsLayout*/16384) {
        toggle_class(text1, "right", /*isValueAlignedRight*/ctx[72]);
      }
      if (dirty[0] & /*isInteractive*/2 && g_tabindex_value !== (g_tabindex_value = /*isInteractive*/ctx[1] ? 0 : -1)) {
        attr_dev(g, "tabindex", g_tabindex_value);
      }
      if (dirty[0] & /*itemHeight, barsLayout*/18432 && g_transform_value !== (g_transform_value = "translate(0, " + /*itemHeight*/ctx[11] * /*index*/ctx[79] + ")")) {
        attr_dev(g, "transform", g_transform_value);
      }
      if (dirty[0] & /*isInteractive*/2) {
        toggle_class(g, "clickable", /*isInteractive*/ctx[1]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(g);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_each_block$1.name,
    type: "each",
    source: "(483:6) {#each barsLayout as {        barBackgroundColor,        barColor,        barWidth,        barX,        displayValue,        isLabelAlignedRight,        isValueAlignedRight,        key,        label,        labelX,        textColor,        valueX,       }",
    ctx
  });
  return block;
}

// (541:5) {#if crossesZero}
function create_if_block_1$1(ctx) {
  let line;
  let line_stroke_value;
  const block = {
    c: function create() {
      line = svg_element("line");
      this.h();
    },
    l: function claim(nodes) {
      line = claim_svg_element(nodes, "line", {
        stroke: true,
        x1: true,
        x2: true,
        y2: true
      });
      children(line).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(line, "stroke", line_stroke_value = /*theme*/ctx[5].axisColor);
      attr_dev(line, "x1", /*x0*/ctx[16]);
      attr_dev(line, "x2", /*x0*/ctx[16]);
      attr_dev(line, "y2", /*svgHeight*/ctx[18]);
      add_location(line, file$1, 541, 6, 13380);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, line, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] & /*theme*/32 && line_stroke_value !== (line_stroke_value = /*theme*/ctx[5].axisColor)) {
        attr_dev(line, "stroke", line_stroke_value);
      }
      if (dirty[0] & /*x0*/65536) {
        attr_dev(line, "x1", /*x0*/ctx[16]);
      }
      if (dirty[0] & /*x0*/65536) {
        attr_dev(line, "x2", /*x0*/ctx[16]);
      }
      if (dirty[0] & /*svgHeight*/262144) {
        attr_dev(line, "y2", /*svgHeight*/ctx[18]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(line);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_1$1.name,
    type: "if",
    source: "(541:5) {#if crossesZero}",
    ctx
  });
  return block;
}
function create_fragment$1(ctx) {
  let div;
  let t;
  let main;
  let current_block_type_index;
  let if_block1;
  let current;
  let if_block0 = /*title*/ctx[6] && create_if_block_4(ctx);
  const if_block_creators = [create_if_block$1, create_else_block$1];
  const if_blocks = [];
  function select_block_type(ctx, dirty) {
    if (! /*items*/ctx[2] || /*items*/ctx[2].length === 0) return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  const block = {
    c: function create() {
      div = element("div");
      if (if_block0) if_block0.c();
      t = space();
      main = element("main");
      if_block1.c();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        style: true,
        class: true
      });
      var div_nodes = children(div);
      if (if_block0) if_block0.l(div_nodes);
      t = claim_space(div_nodes);
      main = claim_element(div_nodes, "MAIN", {
        class: true
      });
      var main_nodes = children(main);
      if_block1.l(main_nodes);
      main_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(main, "class", "svelte-1q76l8c");
      toggle_class(main, "titled", /*title*/ctx[6]);
      add_location(main, file$1, 390, 1, 9944);
      attr_dev(div, "style", /*style*/ctx[21]);
      attr_dev(div, "class", "BarchartVDiv svelte-1q76l8c");
      add_location(div, file$1, 381, 0, 9842);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div, anchor);
      if (if_block0) if_block0.m(div, null);
      append_hydration_dev(div, t);
      append_hydration_dev(div, main);
      if_blocks[current_block_type_index].m(main, null);
      current = true;
    },
    p: function update(ctx, dirty) {
      if ( /*title*/ctx[6]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_4(ctx);
          if_block0.c();
          if_block0.m(div, t);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block1 = if_blocks[current_block_type_index];
        if (!if_block1) {
          if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block1.c();
        } else {
          if_block1.p(ctx, dirty);
        }
        transition_in(if_block1, 1);
        if_block1.m(main, null);
      }
      if (!current || dirty[0] & /*title*/64) {
        toggle_class(main, "titled", /*title*/ctx[6]);
      }
      if (!current || dirty[0] & /*style*/2097152) {
        attr_dev(div, "style", /*style*/ctx[21]);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block1);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block1);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      if (if_block0) if_block0.d();
      if_blocks[current_block_type_index].d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment$1.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
const transparentColor = 'rgba(0,0,0,0)';
function instance$1($$self, $$props, $$invalidate) {
  let style;
  let averageCharWidth;
  let barPadding;
  let labelValueDistance;
  let itemHeight;
  let barY;
  let textY;
  let svgHeight;
  let getMin;
  let getMax;
  let refsValues;
  let min;
  let max;
  let crossesZero;
  let allNegatives;
  let domain;
  let getX;
  let x0;
  let columnsWidth;
  let bars;
  let labelsMaxLengths;
  let labelsRoom;
  let barsLayout;
  let barsByKey;
  let makeRefsLayout;
  let refsLayout;
  let refHeight;
  let refsHeight;
  let heroY;
  let {
    $$slots: slots = {},
    $$scope
  } = $$props;
  validate_slots('BarchartVDiv', slots, []);
  const dispatch = createEventDispatcher();
  const sortByValue = sortWith([getValue]);
  const augmentTheme = makeMergeAppliedFnMap({
    paddingPx: pipe([x => x.padding, toPx])
  });
  const defaultTheme = {
    axisColor: 'lightgrey',
    backgroundColor: transparentColor,
    backgroundOpacity: 1,
    // undocumented
    fontSize: 14,
    headerHeight: '2em',
    itemBackgroundColorHero: 'yellow',
    itemBackgroundColorHover: 'lightgrey',
    itemBackgroundColorSelected: 'cyan',
    itemBarColorDefault: 'black',
    itemBarColorHero: null,
    itemBarColorHover: null,
    itemBarColorSelected: null,
    itemTextColorDefault: '#333',
    itemTextColorHero: 'black',
    itemTextColorHover: '#333',
    itemTextColorSelected: 'black',
    messageColor: 'black',
    messageFontSize: '1rem',
    outlineColor: 'black',
    outlineStyle: 'solid',
    outlineWidth: '1px',
    padding: 10,
    refColor: 'grey',
    refDasharray: '4 4',
    refRectColor: 'black',
    refRectStrokeColor: 'white',
    refTextFill: 'black',
    refWidth: 0.5,
    titleFontSize: '1.5em'
  };
  const zeroIfNaN = when(isNaN, always(0));
  let {
    barHeight = 4
  } = $$props;
  let {
    heroKey = null
  } = $$props;
  let {
    formatFn = null
  } = $$props;
  let {
    isInteractive = false
  } = $$props;
  let {
    items = []
  } = $$props;
  let {
    keyToColor = null
  } = $$props;
  let {
    keyToColorFn = null
  } = $$props;
  let {
    keyToLabel = null
  } = $$props;
  let {
    keyToLabelFn = null
  } = $$props;
  let {
    message = null
  } = $$props;
  let {
    refs = []
  } = $$props;
  let {
    selectedKeys = []
  } = $$props;
  let {
    shouldResetScroll = false
  } = $$props;
  let {
    shouldScrollToHeroKey = false
  } = $$props;
  let {
    theme = null
  } = $$props;
  let {
    title = null
  } = $$props;
  let {
    valueAccessor = null
  } = $$props;
  let {
    valueToColorFn = null
  } = $$props;
  let height;
  let hoveredKey;
  let width;

  /* scroll */
  let previousItems;
  let scrollable;
  let wasNotResettingScroll;
  beforeUpdate(() => {
    $$invalidate(37, wasNotResettingScroll = !shouldResetScroll);
  });
  afterUpdate(() => {
    if (shouldResetScroll && items && items.length && !collectionCompare(previousItems, items) && scrollable) {
      $$invalidate(10, scrollable.scrollTop = 0, scrollable);
      previousItems = items;
    }
  });

  /* events */
  const onClick = key => () => {
    dispatch('clicked', {
      id: key
    });
  };
  const onKeyDown = (event, key) => {
    if (['Enter', ' '].includes(event.key)) {
      event.preventDefault();
      dispatch('clicked', {
        id: key
      });
    }
  };
  const onMouseenter = key => () => {
    $$invalidate(8, hoveredKey = key);
    isInteractive && dispatch('entered', {
      id: key
    });
  };
  const onMouseleave = key => () => {
    dispatch('exited', {
      id: key
    });
  };
  const writable_props = ['barHeight', 'heroKey', 'formatFn', 'isInteractive', 'items', 'keyToColor', 'keyToColorFn', 'keyToLabel', 'keyToLabelFn', 'message', 'refs', 'selectedKeys', 'shouldResetScroll', 'shouldScrollToHeroKey', 'theme', 'title', 'valueAccessor', 'valueToColorFn'];
  Object.keys($$props).forEach(key => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<BarchartVDiv> was created with unknown prop '".concat(key, "'"));
  });
  const keydown_handler = (key, e) => onKeyDown(e, key);
  function div_elementresize_handler() {
    height = this.clientHeight;
    width = this.clientWidth;
    $$invalidate(7, height);
    $$invalidate(9, width);
  }
  function div_binding($$value) {
    binding_callbacks[$$value ? 'unshift' : 'push'](() => {
      scrollable = $$value;
      ($$invalidate(10, scrollable), $$invalidate(37, wasNotResettingScroll)), $$invalidate(27, shouldResetScroll);
    });
  }
  const mouseleave_handler = () => {
    $$invalidate(8, hoveredKey = null);
  };
  $$self.$$set = $$props => {
    if ('barHeight' in $$props) $$invalidate(0, barHeight = $$props.barHeight);
    if ('heroKey' in $$props) $$invalidate(29, heroKey = $$props.heroKey);
    if ('formatFn' in $$props) $$invalidate(30, formatFn = $$props.formatFn);
    if ('isInteractive' in $$props) $$invalidate(1, isInteractive = $$props.isInteractive);
    if ('items' in $$props) $$invalidate(2, items = $$props.items);
    if ('keyToColor' in $$props) $$invalidate(31, keyToColor = $$props.keyToColor);
    if ('keyToColorFn' in $$props) $$invalidate(32, keyToColorFn = $$props.keyToColorFn);
    if ('keyToLabel' in $$props) $$invalidate(33, keyToLabel = $$props.keyToLabel);
    if ('keyToLabelFn' in $$props) $$invalidate(34, keyToLabelFn = $$props.keyToLabelFn);
    if ('message' in $$props) $$invalidate(3, message = $$props.message);
    if ('refs' in $$props) $$invalidate(4, refs = $$props.refs);
    if ('selectedKeys' in $$props) $$invalidate(26, selectedKeys = $$props.selectedKeys);
    if ('shouldResetScroll' in $$props) $$invalidate(27, shouldResetScroll = $$props.shouldResetScroll);
    if ('shouldScrollToHeroKey' in $$props) $$invalidate(35, shouldScrollToHeroKey = $$props.shouldScrollToHeroKey);
    if ('theme' in $$props) $$invalidate(5, theme = $$props.theme);
    if ('title' in $$props) $$invalidate(6, title = $$props.title);
    if ('valueAccessor' in $$props) $$invalidate(28, valueAccessor = $$props.valueAccessor);
    if ('valueToColorFn' in $$props) $$invalidate(36, valueToColorFn = $$props.valueToColorFn);
  };
  $$self.$capture_state = () => ({
    makeStyleVars,
    toPx,
    MessageView,
    arrayMaxWith,
    arrayMinWith,
    getKey,
    getValue,
    isIterableEmpty,
    makeMergeAppliedFnMap,
    sliceString,
    isEqual: collectionCompare,
    always,
    index,
    isIn,
    mapWith,
    pipe,
    sortWith,
    when,
    afterUpdate,
    beforeUpdate,
    createEventDispatcher,
    linearScale: linear,
    dispatch,
    sortByValue,
    transparentColor,
    augmentTheme,
    defaultTheme,
    zeroIfNaN,
    barHeight,
    heroKey,
    formatFn,
    isInteractive,
    items,
    keyToColor,
    keyToColorFn,
    keyToLabel,
    keyToLabelFn,
    message,
    refs,
    selectedKeys,
    shouldResetScroll,
    shouldScrollToHeroKey,
    theme,
    title,
    valueAccessor,
    valueToColorFn,
    height,
    hoveredKey,
    width,
    previousItems,
    scrollable,
    wasNotResettingScroll,
    onClick,
    onKeyDown,
    onMouseenter,
    onMouseleave,
    itemHeight,
    heroY,
    barsByKey,
    refHeight,
    refsHeight,
    makeRefsLayout,
    refsLayout,
    averageCharWidth,
    getX,
    barsLayout,
    allNegatives,
    crossesZero,
    labelValueDistance,
    labelsMaxLengths,
    barPadding,
    x0,
    labelsRoom,
    bars,
    columnsWidth,
    domain,
    min,
    max,
    refsValues,
    getMax,
    getMin,
    svgHeight,
    textY,
    barY,
    style
  });
  $$self.$inject_state = $$props => {
    if ('barHeight' in $$props) $$invalidate(0, barHeight = $$props.barHeight);
    if ('heroKey' in $$props) $$invalidate(29, heroKey = $$props.heroKey);
    if ('formatFn' in $$props) $$invalidate(30, formatFn = $$props.formatFn);
    if ('isInteractive' in $$props) $$invalidate(1, isInteractive = $$props.isInteractive);
    if ('items' in $$props) $$invalidate(2, items = $$props.items);
    if ('keyToColor' in $$props) $$invalidate(31, keyToColor = $$props.keyToColor);
    if ('keyToColorFn' in $$props) $$invalidate(32, keyToColorFn = $$props.keyToColorFn);
    if ('keyToLabel' in $$props) $$invalidate(33, keyToLabel = $$props.keyToLabel);
    if ('keyToLabelFn' in $$props) $$invalidate(34, keyToLabelFn = $$props.keyToLabelFn);
    if ('message' in $$props) $$invalidate(3, message = $$props.message);
    if ('refs' in $$props) $$invalidate(4, refs = $$props.refs);
    if ('selectedKeys' in $$props) $$invalidate(26, selectedKeys = $$props.selectedKeys);
    if ('shouldResetScroll' in $$props) $$invalidate(27, shouldResetScroll = $$props.shouldResetScroll);
    if ('shouldScrollToHeroKey' in $$props) $$invalidate(35, shouldScrollToHeroKey = $$props.shouldScrollToHeroKey);
    if ('theme' in $$props) $$invalidate(5, theme = $$props.theme);
    if ('title' in $$props) $$invalidate(6, title = $$props.title);
    if ('valueAccessor' in $$props) $$invalidate(28, valueAccessor = $$props.valueAccessor);
    if ('valueToColorFn' in $$props) $$invalidate(36, valueToColorFn = $$props.valueToColorFn);
    if ('height' in $$props) $$invalidate(7, height = $$props.height);
    if ('hoveredKey' in $$props) $$invalidate(8, hoveredKey = $$props.hoveredKey);
    if ('width' in $$props) $$invalidate(9, width = $$props.width);
    if ('previousItems' in $$props) previousItems = $$props.previousItems;
    if ('scrollable' in $$props) $$invalidate(10, scrollable = $$props.scrollable);
    if ('wasNotResettingScroll' in $$props) $$invalidate(37, wasNotResettingScroll = $$props.wasNotResettingScroll);
    if ('itemHeight' in $$props) $$invalidate(11, itemHeight = $$props.itemHeight);
    if ('heroY' in $$props) $$invalidate(38, heroY = $$props.heroY);
    if ('barsByKey' in $$props) $$invalidate(39, barsByKey = $$props.barsByKey);
    if ('refHeight' in $$props) $$invalidate(12, refHeight = $$props.refHeight);
    if ('refsHeight' in $$props) $$invalidate(13, refsHeight = $$props.refsHeight);
    if ('makeRefsLayout' in $$props) $$invalidate(40, makeRefsLayout = $$props.makeRefsLayout);
    if ('refsLayout' in $$props) $$invalidate(17, refsLayout = $$props.refsLayout);
    if ('averageCharWidth' in $$props) $$invalidate(41, averageCharWidth = $$props.averageCharWidth);
    if ('getX' in $$props) $$invalidate(42, getX = $$props.getX);
    if ('barsLayout' in $$props) $$invalidate(14, barsLayout = $$props.barsLayout);
    if ('allNegatives' in $$props) $$invalidate(43, allNegatives = $$props.allNegatives);
    if ('crossesZero' in $$props) $$invalidate(15, crossesZero = $$props.crossesZero);
    if ('labelValueDistance' in $$props) $$invalidate(44, labelValueDistance = $$props.labelValueDistance);
    if ('labelsMaxLengths' in $$props) $$invalidate(45, labelsMaxLengths = $$props.labelsMaxLengths);
    if ('barPadding' in $$props) $$invalidate(46, barPadding = $$props.barPadding);
    if ('x0' in $$props) $$invalidate(16, x0 = $$props.x0);
    if ('labelsRoom' in $$props) $$invalidate(47, labelsRoom = $$props.labelsRoom);
    if ('bars' in $$props) $$invalidate(48, bars = $$props.bars);
    if ('columnsWidth' in $$props) $$invalidate(49, columnsWidth = $$props.columnsWidth);
    if ('domain' in $$props) $$invalidate(50, domain = $$props.domain);
    if ('min' in $$props) $$invalidate(51, min = $$props.min);
    if ('max' in $$props) $$invalidate(52, max = $$props.max);
    if ('refsValues' in $$props) $$invalidate(53, refsValues = $$props.refsValues);
    if ('getMax' in $$props) $$invalidate(54, getMax = $$props.getMax);
    if ('getMin' in $$props) $$invalidate(55, getMin = $$props.getMin);
    if ('svgHeight' in $$props) $$invalidate(18, svgHeight = $$props.svgHeight);
    if ('textY' in $$props) $$invalidate(19, textY = $$props.textY);
    if ('barY' in $$props) $$invalidate(20, barY = $$props.barY);
    if ('style' in $$props) $$invalidate(21, style = $$props.style);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*barHeight*/1) {
      // FIXME https://github.com/sveltejs/svelte/issues/4442
      $$invalidate(0, barHeight = barHeight || 4);
    }
    if ($$self.$$.dirty[0] & /*isInteractive*/2) {
      $$invalidate(1, isInteractive = isInteractive || false);
    }
    if ($$self.$$.dirty[0] & /*items*/4) {
      $$invalidate(2, items = items || []);
    }
    if ($$self.$$.dirty[0] & /*message*/8) {
      $$invalidate(3, message = message || 'No data');
    }
    if ($$self.$$.dirty[0] & /*refs*/16) {
      $$invalidate(4, refs = refs || []);
    }
    if ($$self.$$.dirty[0] & /*selectedKeys*/67108864) {
      $$invalidate(26, selectedKeys = selectedKeys || []);
    }
    if ($$self.$$.dirty[0] & /*shouldResetScroll*/134217728) {
      $$invalidate(27, shouldResetScroll = shouldResetScroll || false);
    }
    if ($$self.$$.dirty[0] & /*theme*/32) {
      $$invalidate(5, theme = theme ? {
        ...defaultTheme,
        ...theme
      } : defaultTheme);
    }
    if ($$self.$$.dirty[0] & /*valueAccessor*/268435456) {
      $$invalidate(28, valueAccessor = valueAccessor || getValue);
    }
    if ($$self.$$.dirty[0] & /*theme*/32) {
      $$invalidate(12, refHeight = theme.padding + theme.fontSize);
    }
    if ($$self.$$.dirty[0] & /*refs, theme, refHeight*/4144) {
      $$invalidate(13, refsHeight = refs && refs.length * (theme.padding + refHeight) + theme.padding || 0);
    }
    if ($$self.$$.dirty[0] & /*theme, refsHeight*/8224) {
      $$invalidate(21, style = makeStyleVars({
        ...augmentTheme(theme),
        refsHeightPx: toPx(refsHeight)
      }));
    }
    if ($$self.$$.dirty[0] & /*theme*/32) {
      $$invalidate(41, averageCharWidth = theme.fontSize * 0.5);
    }
    if ($$self.$$.dirty[0] & /*theme*/32) {
      $$invalidate(46, barPadding = theme.fontSize / 2);
    }
    if ($$self.$$.dirty[1] & /*barPadding*/32768) {
      $$invalidate(44, labelValueDistance = 3 * barPadding);
    }
    if ($$self.$$.dirty[0] & /*theme, barHeight*/33 | $$self.$$.dirty[1] & /*barPadding*/32768) {
      $$invalidate(11, itemHeight = theme.fontSize + barHeight + 3 * barPadding);
    }
    if ($$self.$$.dirty[0] & /*itemHeight, barHeight*/2049 | $$self.$$.dirty[1] & /*barPadding*/32768) {
      $$invalidate(20, barY = itemHeight - barPadding - barHeight / 2);
    }
    if ($$self.$$.dirty[0] & /*itemHeight, barHeight*/2049 | $$self.$$.dirty[1] & /*barPadding*/32768) {
      $$invalidate(19, textY = itemHeight - barHeight - 2 * barPadding);
    }
    if ($$self.$$.dirty[0] & /*itemHeight, items*/2052) {
      $$invalidate(18, svgHeight = itemHeight * items.length);
    }
    if ($$self.$$.dirty[0] & /*valueAccessor*/268435456) {
      $$invalidate(55, getMin = arrayMinWith(valueAccessor));
    }
    if ($$self.$$.dirty[0] & /*valueAccessor*/268435456) {
      $$invalidate(54, getMax = arrayMaxWith(valueAccessor));
    }
    if ($$self.$$.dirty[0] & /*refs*/16) {
      $$invalidate(53, refsValues = refs.map(getValue));
    }
    if ($$self.$$.dirty[0] & /*items*/4 | $$self.$$.dirty[1] & /*getMin, refsValues*/20971520) {
      $$invalidate(51, min = Math.min(getMin(items), ...refsValues));
    }
    if ($$self.$$.dirty[0] & /*items*/4 | $$self.$$.dirty[1] & /*getMax, refsValues*/12582912) {
      $$invalidate(52, max = Math.max(getMax(items), ...refsValues));
    }
    if ($$self.$$.dirty[1] & /*min, max*/3145728) {
      $$invalidate(15, crossesZero = Math.sign(min) === -Math.sign(max));
    }
    if ($$self.$$.dirty[0] & /*crossesZero*/32768 | $$self.$$.dirty[1] & /*min*/1048576) {
      $$invalidate(43, allNegatives = !crossesZero && Math.sign(min) < 0);
    }
    if ($$self.$$.dirty[0] & /*crossesZero*/32768 | $$self.$$.dirty[1] & /*min, max*/3145728) {
      $$invalidate(50, domain = crossesZero ? [min, max] : max > 0 ? [0, max] : [min, 0]);
    }
    if ($$self.$$.dirty[0] & /*width*/512 | $$self.$$.dirty[1] & /*domain*/524288) {
      $$invalidate(42, getX = pipe([linear(domain, [0, width]), zeroIfNaN]));
    }
    if ($$self.$$.dirty[1] & /*getX*/2048) {
      $$invalidate(16, x0 = getX(0));
    }
    if ($$self.$$.dirty[0] & /*x0, width*/66048) {
      $$invalidate(49, columnsWidth = {
        neg: x0,
        pos: width - x0
      });
    }
    if ($$self.$$.dirty[0] & /*items, valueAccessor, formatFn, selectedKeys, hoveredKey, theme, heroKey*/1946157348 | $$self.$$.dirty[1] & /*keyToLabel, keyToLabelFn, averageCharWidth, keyToColor, keyToColorFn, valueToColorFn*/1071) {
      /* layout */
      // eslint-disable-next-line complexity
      $$invalidate(48, bars = items.map(item => {
        const {
          key
        } = item;

        /* label */
        const label = keyToLabel && keyToLabel[key] ? keyToLabel[key] : keyToLabelFn ? keyToLabelFn(key) : key;
        const labelLength = label.length * averageCharWidth;

        /* value */
        const value = valueAccessor(item);
        const isNeg = value < 0;
        const displayValue = formatFn ? formatFn(value) : value;

        /* colors */
        const isItemDeselected = isIterableEmpty(selectedKeys) ? true : !isIn(selectedKeys, key);

        // bkg color: hoveredKey || heroKey || selectedKeys || transparentColor
        const barBackgroundColor = key === hoveredKey ? theme.itemBackgroundColorHover : key === heroKey ? theme.itemBackgroundColorHero : isItemDeselected ? transparentColor : theme.itemBackgroundColorSelected;

        // bar color: hoveredKey || heroKey || selectedKeys || key color || default
        const barBaseColor = keyToColor ? keyToColor[key] || theme.itemBarColorDefault : keyToColorFn ? keyToColorFn(key) : valueToColorFn ? valueToColorFn(value) : theme.itemBarColorDefault;
        const barColor = key === hoveredKey ? theme.itemBarColorHover || barBaseColor : key === heroKey ? theme.itemBarColorHero || barBaseColor : isItemDeselected ? barBaseColor : theme.itemBarColorSelected || barBaseColor;

        // text: hoveredKey || heroKey || selectedKeys || default
        const textColor = key === hoveredKey ? theme.itemTextColorHover : key === heroKey ? theme.itemTextColorHero : isItemDeselected ? theme.itemTextColorDefault : theme.itemTextColorSelected;
        return {
          ...item,
          ...{
            barBackgroundColor,
            barColor,
            displayValue,
            isNeg,
            label,
            labelLength,
            textColor,
            value
          }
        };
      }));
    }
    if ($$self.$$.dirty[1] & /*bars, averageCharWidth*/132096) {
      $$invalidate(45, labelsMaxLengths = bars.reduce((acc, _ref) => {
        let {
          displayValue,
          isNeg,
          labelLength
        } = _ref;
        const signKey = isNeg ? 'neg' : 'pos';
        const displayValueLength = String(displayValue).length * averageCharWidth;
        acc[signKey].label = Math.max(acc[signKey].label, labelLength);
        acc[signKey].value = Math.max(acc[signKey].value, displayValueLength);
        return acc;
      }, {
        neg: {
          label: 0,
          value: 0
        },
        pos: {
          label: 0,
          value: 0
        }
      }));
    }
    if ($$self.$$.dirty[1] & /*columnsWidth, labelsMaxLengths, labelValueDistance*/286720) {
      $$invalidate(47, labelsRoom = {
        neg: Math.max(0, columnsWidth.neg - labelsMaxLengths.neg.value - labelValueDistance),
        pos: Math.max(0, columnsWidth.pos - labelsMaxLengths.pos.value - labelValueDistance)
      });
    }
    if ($$self.$$.dirty[0] & /*x0, crossesZero, width, itemHeight*/100864 | $$self.$$.dirty[1] & /*bars, getX, labelsRoom, averageCharWidth, labelsMaxLengths, allNegatives, barPadding, labelValueDistance*/261120) {
      $$invalidate(14, barsLayout = bars.map((bar, idx) => {
        let {
          isNeg,
          label,
          labelLength,
          value
        } = bar;
        const x = getX(value);
        const barWidth = Math.abs(x - x0);
        const barX = x >= x0 ? x0 : x;
        const room = labelsRoom.neg + labelsRoom.pos;
        const overflowRatio = labelLength / room;
        if (overflowRatio > 1) {
          const cutIndex = Math.floor(room / averageCharWidth) - 1;
          label = "".concat(sliceString(label, 0, cutIndex), "\u2026");
          labelLength = label.length;
        }
        return {
          ...bar,
          ...{
            barWidth,
            barX,
            isLabelAlignedRight: crossesZero ? isNeg ? labelsMaxLengths.neg.label < labelsRoom.neg : labelsMaxLengths.pos.label > labelsRoom.pos : allNegatives,
            isValueAlignedRight: crossesZero ? !isNeg : !allNegatives,
            label,
            labelLength,
            labelX: crossesZero ? isNeg ? labelsMaxLengths.neg.label <= labelsRoom.neg ? x0 - barPadding : labelsMaxLengths.neg.value + labelValueDistance : labelsMaxLengths.pos.label <= labelsRoom.pos ? x0 + barPadding : width - labelsMaxLengths.pos.value - labelValueDistance : allNegatives ? width : 0,
            valueX: crossesZero ? isNeg ? 0 : width : allNegatives ? 0 : width,
            x,
            y: idx * itemHeight
          }
        };
      }));
    }
    if ($$self.$$.dirty[0] & /*barsLayout*/16384) {
      $$invalidate(39, barsByKey = index(barsLayout, getKey));
    }
    if ($$self.$$.dirty[0] & /*theme, width, refHeight*/4640 | $$self.$$.dirty[1] & /*getX, averageCharWidth*/3072) {
      /* refs */
      $$invalidate(40, makeRefsLayout = pipe([sortByValue, mapWith((ref, idx) => {
        const valueX = getX(ref.value);
        let formattedValue = ref.formatFn ? ref.formatFn(ref.value) : ref.value;
        let label = "".concat(ref.key, " (").concat(formattedValue, ")");
        let textLength = label.length * averageCharWidth;
        let rectWidth = textLength + 2 * theme.padding;
        let goesOff = valueX + rectWidth > width;
        let isAlignedRight = goesOff && valueX > width / 2;
        if (goesOff && ref.keyAbbr) {
          label = "".concat(ref.keyAbbr, " (").concat(formattedValue, ")");
          textLength = label.length * averageCharWidth;
          rectWidth = textLength + 2 * theme.padding;
          isAlignedRight = valueX + rectWidth > width && valueX > width / 2;
        }
        return {
          ...ref,
          isAlignedRight,
          label,
          rectWidth,
          textLength,
          textX: isAlignedRight ? -theme.padding : theme.padding,
          valueX,
          x: isAlignedRight ? -rectWidth : 0,
          y: theme.padding + idx * (theme.padding + refHeight)
        };
      })]));
    }
    if ($$self.$$.dirty[0] & /*refs*/16 | $$self.$$.dirty[1] & /*makeRefsLayout*/512) {
      $$invalidate(17, refsLayout = refs && refs.length && makeRefsLayout(refs));
    }
    if ($$self.$$.dirty[0] & /*shouldResetScroll, scrollable*/134218752 | $$self.$$.dirty[1] & /*wasNotResettingScroll*/64) {
      if (wasNotResettingScroll && shouldResetScroll && scrollable) {
        $$invalidate(10, scrollable.scrollTop = 0, scrollable);
      }
    }
    if ($$self.$$.dirty[0] & /*heroKey*/536870912 | $$self.$$.dirty[1] & /*shouldScrollToHeroKey, barsByKey*/272) {
      $$invalidate(38, heroY = shouldScrollToHeroKey && heroKey && barsByKey[heroKey] && barsByKey[heroKey].y);
    }
    if ($$self.$$.dirty[0] & /*heroKey, scrollable, itemHeight, height*/536874112 | $$self.$$.dirty[1] & /*shouldScrollToHeroKey, heroY*/144) {
      if (shouldScrollToHeroKey && heroKey && scrollable) {
        const yAbs = -scrollable.scrollTop + heroY;
        if (yAbs < 0) {
          scrollable.scroll({
            top: heroY,
            behavior: 'smooth'
          });
        } else if (yAbs + itemHeight > height) {
          scrollable.scroll({
            top: heroY - height + itemHeight,
            behavior: 'smooth'
          });
        }
      }
    }
  };
  return [barHeight, isInteractive, items, message, refs, theme, title, height, hoveredKey, width, scrollable, itemHeight, refHeight, refsHeight, barsLayout, crossesZero, x0, refsLayout, svgHeight, textY, barY, style, onClick, onKeyDown, onMouseenter, onMouseleave, selectedKeys, shouldResetScroll, valueAccessor, heroKey, formatFn, keyToColor, keyToColorFn, keyToLabel, keyToLabelFn, shouldScrollToHeroKey, valueToColorFn, wasNotResettingScroll, heroY, barsByKey, makeRefsLayout, averageCharWidth, getX, allNegatives, labelValueDistance, labelsMaxLengths, barPadding, labelsRoom, bars, columnsWidth, domain, min, max, refsValues, getMax, getMin, keydown_handler, div_elementresize_handler, div_binding, mouseleave_handler];
}
class BarchartVDiv extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {
      barHeight: 0,
      heroKey: 29,
      formatFn: 30,
      isInteractive: 1,
      items: 2,
      keyToColor: 31,
      keyToColorFn: 32,
      keyToLabel: 33,
      keyToLabelFn: 34,
      message: 3,
      refs: 4,
      selectedKeys: 26,
      shouldResetScroll: 27,
      shouldScrollToHeroKey: 35,
      theme: 5,
      title: 6,
      valueAccessor: 28,
      valueToColorFn: 36
    }, null, [-1, -1, -1]);
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "BarchartVDiv",
      options,
      id: create_fragment$1.name
    });
  }
  get barHeight() {
    throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set barHeight(value) {
    throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get heroKey() {
    throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set heroKey(value) {
    throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get formatFn() {
    throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set formatFn(value) {
    throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get isInteractive() {
    throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set isInteractive(value) {
    throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get items() {
    throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set items(value) {
    throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get keyToColor() {
    throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set keyToColor(value) {
    throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get keyToColorFn() {
    throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set keyToColorFn(value) {
    throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get keyToLabel() {
    throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set keyToLabel(value) {
    throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get keyToLabelFn() {
    throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set keyToLabelFn(value) {
    throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get message() {
    throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set message(value) {
    throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get refs() {
    throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set refs(value) {
    throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get selectedKeys() {
    throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set selectedKeys(value) {
    throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get shouldResetScroll() {
    throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set shouldResetScroll(value) {
    throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get shouldScrollToHeroKey() {
    throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set shouldScrollToHeroKey(value) {
    throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get theme() {
    throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set theme(value) {
    throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get title() {
    throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set title(value) {
    throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get valueAccessor() {
    throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set valueAccessor(value) {
    throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get valueToColorFn() {
    throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set valueToColorFn(value) {
    throw new Error("<BarchartVDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
}
var BarchartVDiv$1 = BarchartVDiv;

var projections = /*#__PURE__*/Object.freeze({
	__proto__: null,
	geoAzimuthalEqualArea: azimuthalEqualArea,
	geoAzimuthalEquidistant: azimuthalEquidistant,
	geoEqualEarth: projectionFn,
	geoEquirectangular: equirectangular,
	geoMercator: mercator,
	geoNaturalEarth1: naturalEarth1
});

const defaultGeometry = {
  bottom: 10,
  left: 10,
  right: 10,
  top: 10
};

/* ../../components/choropleth/src/ChoroplethG.svelte generated by Svelte v3.59.2 */
const file = "../../components/choropleth/src/ChoroplethG.svelte";
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[39] = list[i];
  return child_ctx;
}

// (110:0) {#if height && width}
function create_if_block(ctx) {
  let g;
  function select_block_type(ctx, dirty) {
    if (! /*geojson*/ctx[0] || ! /*currentProjection*/ctx[11]) return create_if_block_1;
    return create_else_block;
  }
  let current_block_type = select_block_type(ctx);
  let if_block = current_block_type(ctx);
  const block = {
    c: function create() {
      g = svg_element("g");
      if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      g = claim_svg_element(nodes, "g", {
        style: true,
        class: true
      });
      var g_nodes = children(g);
      if_block.l(g_nodes);
      g_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(g, "style", /*style*/ctx[17]);
      attr_dev(g, "class", "ChoroplethG svelte-54gkh3");
      toggle_class(g, "interactive", /*isInteractive*/ctx[3]);
      add_location(g, file, 110, 1, 3459);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, g, anchor);
      if_block.m(g, null);
    },
    p: function update(ctx, dirty) {
      if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
        if_block.p(ctx, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx);
        if (if_block) {
          if_block.c();
          if_block.m(g, null);
        }
      }
      if (dirty[0] & /*style*/131072) {
        attr_dev(g, "style", /*style*/ctx[17]);
      }
      if (dirty[0] & /*isInteractive*/8) {
        toggle_class(g, "interactive", /*isInteractive*/ctx[3]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(g);
      if_block.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block.name,
    type: "if",
    source: "(110:0) {#if height && width}",
    ctx
  });
  return block;
}

// (124:2) {:else}
function create_else_block(ctx) {
  let rect;
  let g;
  let g_transform_value;
  let if_block = /*coloredGeojson*/ctx[16] && create_if_block_2(ctx);
  const block = {
    c: function create() {
      rect = svg_element("rect");
      g = svg_element("g");
      if (if_block) if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      rect = claim_svg_element(nodes, "rect", {
        height: true,
        width: true,
        class: true
      });
      children(rect).forEach(detach_dev);
      g = claim_svg_element(nodes, "g", {
        transform: true
      });
      var g_nodes = children(g);
      if (if_block) if_block.l(g_nodes);
      g_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect, "height", /*height*/ctx[5]);
      attr_dev(rect, "width", /*width*/ctx[6]);
      attr_dev(rect, "class", "bkg svelte-54gkh3");
      add_location(rect, file, 125, 3, 3671);
      attr_dev(g, "transform", g_transform_value = "translate(" + /*geometry*/ctx[2].left + "," + /*geometry*/ctx[2].top + ")");
      add_location(g, file, 130, 3, 3727);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, rect, anchor);
      insert_hydration_dev(target, g, anchor);
      if (if_block) if_block.m(g, null);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] & /*height*/32) {
        attr_dev(rect, "height", /*height*/ctx[5]);
      }
      if (dirty[0] & /*width*/64) {
        attr_dev(rect, "width", /*width*/ctx[6]);
      }
      if ( /*coloredGeojson*/ctx[16]) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block_2(ctx);
          if_block.c();
          if_block.m(g, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (dirty[0] & /*geometry*/4 && g_transform_value !== (g_transform_value = "translate(" + /*geometry*/ctx[2].left + "," + /*geometry*/ctx[2].top + ")")) {
        attr_dev(g, "transform", g_transform_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(rect);
      if (detaching) detach_dev(g);
      if (if_block) if_block.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_else_block.name,
    type: "else",
    source: "(124:2) {:else}",
    ctx
  });
  return block;
}

// (116:2) {#if !geojson || !currentProjection}
function create_if_block_1(ctx) {
  let text_1;
  let t;
  let text_1_x_value;
  let text_1_y_value;
  const block = {
    c: function create() {
      text_1 = svg_element("text");
      t = text( /*message*/ctx[4]);
      this.h();
    },
    l: function claim(nodes) {
      text_1 = claim_svg_element(nodes, "text", {
        class: true,
        x: true,
        y: true
      });
      var text_1_nodes = children(text_1);
      t = claim_text(text_1_nodes, /*message*/ctx[4]);
      text_1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(text_1, "class", "message svelte-54gkh3");
      attr_dev(text_1, "x", text_1_x_value = /*width*/ctx[6] / 2);
      attr_dev(text_1, "y", text_1_y_value = /*height*/ctx[5] / 2);
      add_location(text_1, file, 117, 3, 3576);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, text_1, anchor);
      append_hydration_dev(text_1, t);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] & /*message*/16) set_data_dev(t, /*message*/ctx[4]);
      if (dirty[0] & /*width*/64 && text_1_x_value !== (text_1_x_value = /*width*/ctx[6] / 2)) {
        attr_dev(text_1, "x", text_1_x_value);
      }
      if (dirty[0] & /*height*/32 && text_1_y_value !== (text_1_y_value = /*height*/ctx[5] / 2)) {
        attr_dev(text_1, "y", text_1_y_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(text_1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_1.name,
    type: "if",
    source: "(116:2) {#if !geojson || !currentProjection}",
    ctx
  });
  return block;
}

// (132:4) {#if coloredGeojson}
function create_if_block_2(ctx) {
  let each_1_anchor;
  let each_value = /*coloredGeojson*/ctx[16].features;
  validate_each_argument(each_value);
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  const block = {
    c: function create() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    l: function claim(nodes) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(nodes);
      }
      each_1_anchor = empty();
    },
    m: function mount(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(target, anchor);
        }
      }
      insert_hydration_dev(target, each_1_anchor, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] & /*coloredGeojson, key, key_alt, isDeselected, isSelected, focusedKey, isFocused, geopath, isClickable, dispatch, getFeatureKey, isInteractive, onKeyDown*/915338) {
        each_value = /*coloredGeojson*/ctx[16].features;
        validate_each_argument(each_value);
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    d: function destroy(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching) detach_dev(each_1_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_2.name,
    type: "if",
    source: "(132:4) {#if coloredGeojson}",
    ctx
  });
  return block;
}

// (133:5) {#each coloredGeojson.features as feature}
function create_each_block(ctx) {
  let g;
  let path;
  let path_d_value;
  let g_id_value;
  let mounted;
  let dispose;
  function click_handler() {
    return (/*click_handler*/ctx[33]( /*feature*/ctx[39])
    );
  }
  function mouseenter_handler() {
    return (/*mouseenter_handler*/ctx[34]( /*feature*/ctx[39])
    );
  }
  function mouseleave_handler() {
    return (/*mouseleave_handler*/ctx[35]( /*feature*/ctx[39])
    );
  }
  function keydown_handler() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return (/*keydown_handler*/ctx[36]( /*feature*/ctx[39], ...args)
    );
  }
  const block = {
    c: function create() {
      g = svg_element("g");
      path = svg_element("path");
      this.h();
    },
    l: function claim(nodes) {
      g = claim_svg_element(nodes, "g", {
        class: true,
        id: true
      });
      var g_nodes = children(g);
      path = claim_svg_element(g_nodes, "path", {
        d: true,
        style: true,
        class: true
      });
      children(path).forEach(detach_dev);
      g_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(path, "d", path_d_value = /*geopath*/ctx[15]( /*feature*/ctx[39]));
      set_style(path, "fill", /*feature*/ctx[39].properties.color || null);
      attr_dev(path, "class", "svelte-54gkh3");
      toggle_class(path, "clickable", /*isClickable*/ctx[12]( /*feature*/ctx[39]));
      add_location(path, file, 140, 7, 4120);
      attr_dev(g, "class", "feature svelte-54gkh3");
      attr_dev(g, "id", g_id_value = /*feature*/ctx[39].properties[/*key*/ctx[7]] || /*feature*/ctx[39].properties[/*key_alt*/ctx[1]]);
      toggle_class(g, "deselected", /*isDeselected*/ctx[13]( /*feature*/ctx[39]));
      toggle_class(g, "selected", /*isSelected*/ctx[9]( /*feature*/ctx[39]));
      toggle_class(g, "focused", /*focusedKey*/ctx[8] && /*isFocused*/ctx[14]( /*feature*/ctx[39]));
      add_location(g, file, 133, 6, 3864);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, g, anchor);
      append_hydration_dev(g, path);
      if (!mounted) {
        dispose = [listen_dev(path, "click", click_handler, false, false, false, false), listen_dev(path, "mouseenter", mouseenter_handler, false, false, false, false), listen_dev(path, "mouseleave", mouseleave_handler, false, false, false, false), listen_dev(path, "keydown", function () {
          if (is_function( /*isInteractive*/ctx[3] && keydown_handler)) ( /*isInteractive*/ctx[3] && keydown_handler).apply(this, arguments);
        }, false, false, false, false)];
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty[0] & /*geopath, coloredGeojson*/98304 && path_d_value !== (path_d_value = /*geopath*/ctx[15]( /*feature*/ctx[39]))) {
        attr_dev(path, "d", path_d_value);
      }
      if (dirty[0] & /*coloredGeojson*/65536) {
        set_style(path, "fill", /*feature*/ctx[39].properties.color || null);
      }
      if (dirty[0] & /*isClickable, coloredGeojson*/69632) {
        toggle_class(path, "clickable", /*isClickable*/ctx[12]( /*feature*/ctx[39]));
      }
      if (dirty[0] & /*coloredGeojson, key, key_alt*/65666 && g_id_value !== (g_id_value = /*feature*/ctx[39].properties[/*key*/ctx[7]] || /*feature*/ctx[39].properties[/*key_alt*/ctx[1]])) {
        attr_dev(g, "id", g_id_value);
      }
      if (dirty[0] & /*isDeselected, coloredGeojson*/73728) {
        toggle_class(g, "deselected", /*isDeselected*/ctx[13]( /*feature*/ctx[39]));
      }
      if (dirty[0] & /*isSelected, coloredGeojson*/66048) {
        toggle_class(g, "selected", /*isSelected*/ctx[9]( /*feature*/ctx[39]));
      }
      if (dirty[0] & /*focusedKey, isFocused, coloredGeojson*/82176) {
        toggle_class(g, "focused", /*focusedKey*/ctx[8] && /*isFocused*/ctx[14]( /*feature*/ctx[39]));
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(g);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_each_block.name,
    type: "each",
    source: "(133:5) {#each coloredGeojson.features as feature}",
    ctx
  });
  return block;
}
function create_fragment(ctx) {
  let if_block_anchor;
  let if_block = /*height*/ctx[5] && /*width*/ctx[6] && create_if_block(ctx);
  const block = {
    c: function create() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if (if_block) if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert_hydration_dev(target, if_block_anchor, anchor);
    },
    p: function update(ctx, dirty) {
      if ( /*height*/ctx[5] && /*width*/ctx[6]) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block(ctx);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop$1,
    o: noop$1,
    d: function destroy(detaching) {
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance($$self, $$props, $$invalidate) {
  let projectionFunc;
  let style;
  let innerHeight;
  let innerWidth;
  let createColoredGeojson;
  let coloredGeojson;
  let currentProjection;
  let geopath;
  let getFeatureKey;
  let isFocused;
  let isSelected;
  let isDeselected;
  let isClickable;
  let {
    $$slots: slots = {},
    $$scope
  } = $$props;
  validate_slots('ChoroplethG', slots, []);
  const dispatch = createEventDispatcher();
  const hasColor = isNotNullWith(getPath('properties.color'));
  const defaultTheme = {
    backgroundColor: 'white',
    defaultFill: 'white',
    defaultStroke: 'grey',
    defaultStrokeWidth: 0.5,
    deselectedOpacity: 0.25,
    focusedStroke: 'red',
    focusedStrokeWidth: 2,
    focusedDasharray: '',
    hoverFill: '#f6f6f6',
    hoverStroke: 'black',
    hoverStrokedasharray: '',
    hoverStrokeWidth: 1.5,
    messageColor: 'black',
    messageFontSize: '1rem',
    selectedStroke: 'black',
    selectedStrokeWidth: 1
  };
  let {
    height = null
  } = $$props;
  let {
    geojson = null
  } = $$props;
  let {
    topojson = null
  } = $$props;
  let {
    topojsonId = null
  } = $$props;
  let {
    width = null
  } = $$props;
  let {
    key = null
  } = $$props;
  let {
    key_alt = 'name'
  } = $$props;
  let {
    focusedKey = null
  } = $$props;
  let {
    geometry = null
  } = $$props;
  let {
    isInteractive = false
  } = $$props;
  let {
    keyToColor = null
  } = $$props;
  let {
    keyToColorFn = null
  } = $$props;
  let {
    message = 'No data'
  } = $$props;
  let {
    projection = null
  } = $$props;
  let {
    projectionFn = null
  } = $$props;
  let {
    projectionId = null
  } = $$props;
  let {
    selectedKeys = []
  } = $$props;
  let {
    theme = null
  } = $$props;
  const onKeyDown = (event, key_) => {
    if (['Enter', ' '].includes(event.key)) {
      event.preventDefault();
      dispatch('clicked', key_);
    }
  };
  const writable_props = ['height', 'geojson', 'topojson', 'topojsonId', 'width', 'key', 'key_alt', 'focusedKey', 'geometry', 'isInteractive', 'keyToColor', 'keyToColorFn', 'message', 'projection', 'projectionFn', 'projectionId', 'selectedKeys', 'theme'];
  Object.keys($$props).forEach(key => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<ChoroplethG> was created with unknown prop '".concat(key, "'"));
  });
  const click_handler = feature => isClickable(feature) && dispatch('clicked', getFeatureKey(feature));
  const mouseenter_handler = feature => isInteractive && dispatch('entered', getFeatureKey(feature));
  const mouseleave_handler = feature => isInteractive && dispatch('exited', getFeatureKey(feature));
  const keydown_handler = (feature, e) => onKeyDown(e, getFeatureKey(feature));
  $$self.$$set = $$props => {
    if ('height' in $$props) $$invalidate(5, height = $$props.height);
    if ('geojson' in $$props) $$invalidate(0, geojson = $$props.geojson);
    if ('topojson' in $$props) $$invalidate(25, topojson = $$props.topojson);
    if ('topojsonId' in $$props) $$invalidate(26, topojsonId = $$props.topojsonId);
    if ('width' in $$props) $$invalidate(6, width = $$props.width);
    if ('key' in $$props) $$invalidate(7, key = $$props.key);
    if ('key_alt' in $$props) $$invalidate(1, key_alt = $$props.key_alt);
    if ('focusedKey' in $$props) $$invalidate(8, focusedKey = $$props.focusedKey);
    if ('geometry' in $$props) $$invalidate(2, geometry = $$props.geometry);
    if ('isInteractive' in $$props) $$invalidate(3, isInteractive = $$props.isInteractive);
    if ('keyToColor' in $$props) $$invalidate(27, keyToColor = $$props.keyToColor);
    if ('keyToColorFn' in $$props) $$invalidate(28, keyToColorFn = $$props.keyToColorFn);
    if ('message' in $$props) $$invalidate(4, message = $$props.message);
    if ('projection' in $$props) $$invalidate(20, projection = $$props.projection);
    if ('projectionFn' in $$props) $$invalidate(21, projectionFn = $$props.projectionFn);
    if ('projectionId' in $$props) $$invalidate(22, projectionId = $$props.projectionId);
    if ('selectedKeys' in $$props) $$invalidate(23, selectedKeys = $$props.selectedKeys);
    if ('theme' in $$props) $$invalidate(24, theme = $$props.theme);
  };
  $$self.$capture_state = () => ({
    createEventDispatcher,
    geoPath,
    getPath,
    not,
    makeStyleVars,
    makeUpdateFeaturesProperty,
    topoToGeo,
    isNotNullWith,
    defaultGeometry,
    projections,
    dispatch,
    hasColor,
    defaultTheme,
    height,
    geojson,
    topojson,
    topojsonId,
    width,
    key,
    key_alt,
    focusedKey,
    geometry,
    isInteractive,
    keyToColor,
    keyToColorFn,
    message,
    projection,
    projectionFn,
    projectionId,
    selectedKeys,
    theme,
    onKeyDown,
    isClickable,
    isSelected,
    isDeselected,
    getFeatureKey,
    isFocused,
    currentProjection,
    geopath,
    innerHeight,
    innerWidth,
    projectionFunc,
    createColoredGeojson,
    coloredGeojson,
    style
  });
  $$self.$inject_state = $$props => {
    if ('height' in $$props) $$invalidate(5, height = $$props.height);
    if ('geojson' in $$props) $$invalidate(0, geojson = $$props.geojson);
    if ('topojson' in $$props) $$invalidate(25, topojson = $$props.topojson);
    if ('topojsonId' in $$props) $$invalidate(26, topojsonId = $$props.topojsonId);
    if ('width' in $$props) $$invalidate(6, width = $$props.width);
    if ('key' in $$props) $$invalidate(7, key = $$props.key);
    if ('key_alt' in $$props) $$invalidate(1, key_alt = $$props.key_alt);
    if ('focusedKey' in $$props) $$invalidate(8, focusedKey = $$props.focusedKey);
    if ('geometry' in $$props) $$invalidate(2, geometry = $$props.geometry);
    if ('isInteractive' in $$props) $$invalidate(3, isInteractive = $$props.isInteractive);
    if ('keyToColor' in $$props) $$invalidate(27, keyToColor = $$props.keyToColor);
    if ('keyToColorFn' in $$props) $$invalidate(28, keyToColorFn = $$props.keyToColorFn);
    if ('message' in $$props) $$invalidate(4, message = $$props.message);
    if ('projection' in $$props) $$invalidate(20, projection = $$props.projection);
    if ('projectionFn' in $$props) $$invalidate(21, projectionFn = $$props.projectionFn);
    if ('projectionId' in $$props) $$invalidate(22, projectionId = $$props.projectionId);
    if ('selectedKeys' in $$props) $$invalidate(23, selectedKeys = $$props.selectedKeys);
    if ('theme' in $$props) $$invalidate(24, theme = $$props.theme);
    if ('isClickable' in $$props) $$invalidate(12, isClickable = $$props.isClickable);
    if ('isSelected' in $$props) $$invalidate(9, isSelected = $$props.isSelected);
    if ('isDeselected' in $$props) $$invalidate(13, isDeselected = $$props.isDeselected);
    if ('getFeatureKey' in $$props) $$invalidate(10, getFeatureKey = $$props.getFeatureKey);
    if ('isFocused' in $$props) $$invalidate(14, isFocused = $$props.isFocused);
    if ('currentProjection' in $$props) $$invalidate(11, currentProjection = $$props.currentProjection);
    if ('geopath' in $$props) $$invalidate(15, geopath = $$props.geopath);
    if ('innerHeight' in $$props) $$invalidate(29, innerHeight = $$props.innerHeight);
    if ('innerWidth' in $$props) $$invalidate(30, innerWidth = $$props.innerWidth);
    if ('projectionFunc' in $$props) $$invalidate(31, projectionFunc = $$props.projectionFunc);
    if ('createColoredGeojson' in $$props) $$invalidate(32, createColoredGeojson = $$props.createColoredGeojson);
    if ('coloredGeojson' in $$props) $$invalidate(16, coloredGeojson = $$props.coloredGeojson);
    if ('style' in $$props) $$invalidate(17, style = $$props.style);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*geometry*/4) {
      // FIXME https://github.com/sveltejs/svelte/issues/4442
      $$invalidate(2, geometry = geometry ? {
        ...defaultGeometry,
        ...geometry
      } : defaultGeometry);
    }
    if ($$self.$$.dirty[0] & /*isInteractive*/8) {
      $$invalidate(3, isInteractive = isInteractive || false);
    }
    if ($$self.$$.dirty[0] & /*message*/16) {
      $$invalidate(4, message = message || 'No data');
    }
    if ($$self.$$.dirty[0] & /*projection*/1048576) {
      $$invalidate(20, projection = projection || null);
    }
    if ($$self.$$.dirty[0] & /*projectionFn*/2097152) {
      $$invalidate(21, projectionFn = projectionFn || null);
    }
    if ($$self.$$.dirty[0] & /*projectionId*/4194304) {
      $$invalidate(22, projectionId = projectionId || null);
    }
    if ($$self.$$.dirty[0] & /*key_alt*/2) {
      $$invalidate(1, key_alt = key_alt || 'name');
    }
    if ($$self.$$.dirty[0] & /*projectionFn, projectionId*/6291456) {
      $$invalidate(31, projectionFunc = projectionFn || projectionId && projections[projectionId] || equirectangular);
    }
    if ($$self.$$.dirty[0] & /*selectedKeys*/8388608) {
      $$invalidate(23, selectedKeys = selectedKeys || []);
    }
    if ($$self.$$.dirty[0] & /*theme*/16777216) {
      $$invalidate(24, theme = theme ? {
        ...defaultTheme,
        ...theme
      } : defaultTheme);
    }
    if ($$self.$$.dirty[0] & /*theme*/16777216) {
      $$invalidate(17, style = makeStyleVars(theme));
    }
    if ($$self.$$.dirty[0] & /*height, geometry*/36) {
      $$invalidate(29, innerHeight = Math.max(0, height - geometry.top - geometry.bottom));
    }
    if ($$self.$$.dirty[0] & /*width, geometry*/68) {
      $$invalidate(30, innerWidth = Math.max(0, width - geometry.left - geometry.right));
    }
    if ($$self.$$.dirty[0] & /*key_alt, key, keyToColor, keyToColorFn*/402653314) {
      $$invalidate(32, createColoredGeojson = makeUpdateFeaturesProperty({
        key_alt,
        key,
        map: keyToColor,
        mapFn: keyToColorFn,
        propName: 'color'
      }));
    }
    if ($$self.$$.dirty[0] & /*geojson, topojson, topojsonId*/100663297) {
      $$invalidate(0, geojson = geojson || topojson && topoToGeo(topojson, topojsonId));
    }
    if ($$self.$$.dirty[0] & /*geojson*/1 | $$self.$$.dirty[1] & /*createColoredGeojson*/2) {
      $$invalidate(16, coloredGeojson = geojson && createColoredGeojson(geojson));
    }
    if ($$self.$$.dirty[0] & /*projection, geojson, innerWidth, innerHeight*/1611661313 | $$self.$$.dirty[1] & /*projectionFunc*/1) {
      $$invalidate(11, currentProjection = projection || geojson && geojson.features.length && projectionFunc().fitSize([innerWidth, innerHeight], geojson));
    }
    if ($$self.$$.dirty[0] & /*currentProjection*/2048) {
      $$invalidate(15, geopath = currentProjection && geoPath(currentProjection));
    }
    if ($$self.$$.dirty[0] & /*key, key_alt*/130) {
      $$invalidate(10, getFeatureKey = feature => feature.properties[key] || feature.properties[key_alt]);
    }
    if ($$self.$$.dirty[0] & /*focusedKey, getFeatureKey*/1280) {
      $$invalidate(14, isFocused = feature => focusedKey === getFeatureKey(feature));
    }
    if ($$self.$$.dirty[0] & /*selectedKeys, getFeatureKey*/8389632) {
      $$invalidate(9, isSelected = feature => selectedKeys.length && selectedKeys.includes(getFeatureKey(feature)));
    }
    if ($$self.$$.dirty[0] & /*isSelected*/512) {
      $$invalidate(13, isDeselected = not(isSelected));
    }
    if ($$self.$$.dirty[0] & /*isInteractive*/8) {
      $$invalidate(12, isClickable = feature => isInteractive && hasColor(feature));
    }
  };
  return [geojson, key_alt, geometry, isInteractive, message, height, width, key, focusedKey, isSelected, getFeatureKey, currentProjection, isClickable, isDeselected, isFocused, geopath, coloredGeojson, style, dispatch, onKeyDown, projection, projectionFn, projectionId, selectedKeys, theme, topojson, topojsonId, keyToColor, keyToColorFn, innerHeight, innerWidth, projectionFunc, createColoredGeojson, click_handler, mouseenter_handler, mouseleave_handler, keydown_handler];
}
class ChoroplethG extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance, create_fragment, safe_not_equal, {
      height: 5,
      geojson: 0,
      topojson: 25,
      topojsonId: 26,
      width: 6,
      key: 7,
      key_alt: 1,
      focusedKey: 8,
      geometry: 2,
      isInteractive: 3,
      keyToColor: 27,
      keyToColorFn: 28,
      message: 4,
      projection: 20,
      projectionFn: 21,
      projectionId: 22,
      selectedKeys: 23,
      theme: 24
    }, null, [-1, -1]);
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "ChoroplethG",
      options,
      id: create_fragment.name
    });
  }
  get height() {
    throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set height(value) {
    throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get geojson() {
    throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set geojson(value) {
    throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get topojson() {
    throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set topojson(value) {
    throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get topojsonId() {
    throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set topojsonId(value) {
    throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get width() {
    throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set width(value) {
    throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get key() {
    throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set key(value) {
    throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get key_alt() {
    throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set key_alt(value) {
    throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get focusedKey() {
    throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set focusedKey(value) {
    throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get geometry() {
    throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set geometry(value) {
    throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get isInteractive() {
    throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set isInteractive(value) {
    throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get keyToColor() {
    throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set keyToColor(value) {
    throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get keyToColorFn() {
    throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set keyToColorFn(value) {
    throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get message() {
    throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set message(value) {
    throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get projection() {
    throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set projection(value) {
    throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get projectionFn() {
    throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set projectionFn(value) {
    throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get projectionId() {
    throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set projectionId(value) {
    throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get selectedKeys() {
    throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set selectedKeys(value) {
    throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get theme() {
    throw new Error("<ChoroplethG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set theme(value) {
    throw new Error("<ChoroplethG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
}
var ChoroplethG$1 = ChoroplethG;

export { BarchartVDiv$1 as B, ChoroplethG$1 as C, defaultGeometry as d, projections as p };

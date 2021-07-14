import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, R as validate_store, T as component_subscribe, v as validate_slots, a6 as subscribe, a7 as onMount, U as writable, e as element, z as create_component, a as space, f as claim_element, g as children, A as claim_component, c as claim_space, b as detach_dev, j as attr_dev, E as toggle_class, k as add_location, l as insert_dev, B as mount_component, m as append_dev, D as group_outros, u as transition_out, w as check_outros, r as transition_in, C as destroy_component, n as noop$1, ac as set_store_value, J as empty, O as add_render_callback, P as add_resize_listener, H as listen_dev, o as validate_each_argument, F as svg_element, x as destroy_each, t as text, h as claim_text, G as set_data_dev } from './client.0cc30d5f.js';
import { d as _isSmallScreen, A as _navFlags, B as _POIs, f as _screenClasses, g as _viewsClasses, C as keyValueArrayAverage, t as setRoute, q as showView, k as _availableYears, l as _selectedYear, x as makeGetIndicatorFormatOf, D as makeGetRefFormatOf, y as lookup, z as _lookup } from './stores.68a2efce.js';
import { H as Header, t as toggleInfoModal, _ as _doFilterRegions, a as _geoModal, b as _infoModal, G as GeoFilterModal, I as InfoModal, c as InfoView, S as SettingsRow, d as SettingsView, h as hideGeoModal, e as hideInfoModal, f as toggleGeoModal, i as config, g as getNutsId, y as yearlyKeyToLabel, p as parseCSV, j as data } from './types.6beba065.js';
import { G as _, w as getKey, k as pipe, o as indexBy, m as mapValuesWith, u as mapWith, L as sortWith, M as sorterDesc, aC as filter, $ as isIn, A as has, Z as index, s as setPathIn, r as reduce, a7 as map$1, ag as filterWith } from './defaultLocale.3cc8e503.js';
import { o as topoToGeo, q as projectionFn, E as defaultGeometry } from './equalEarth.85fb5a78.js';
import { B as BarchartVDiv, C as ChoroplethG } from './ChoroplethG.1d59f56f.js';
import { w as extent, p as ColorBinsDiv, C as ColorBinsG, M as MessageView } from './Switch.03778282.js';
import { L as LoadingView } from './LoadingView.68767ebc.js';
import { b as _selectedNUT2Ids, d as _preselectedNUTS2Ids, e as _makeColorScale, f as _makeColorBins, o as _regionSettings, p as _hasValidKey, q as _getFeatureKey, _ as _theme, g as _someUnselectedRegions } from './regionSelection.4c62497e.js';
import { a as isClientSide } from './env.21c1c15f.js';
import { a as makeStyle, t as toPx } from './Info.7faabc1a.js';
import { g as getValue, k as keyValueArrayToObject } from './ScreenGauge.12bb7888.js';
import { j as applyFnMap, m as mergeObj, k as transformPaths } from './linear.9671b245.js';
import './Download.5b461729.js';

function prune(topology) {
  var oldObjects = topology.objects,
      newObjects = {},
      oldArcs = topology.arcs,
      oldArcsLength = oldArcs.length,
      oldIndex = -1,
      newIndexByOldIndex = new Array(oldArcsLength),
      newArcsLength = 0,
      newArcs,
      newIndex = -1,
      key;

  function scanGeometry(input) {
    switch (input.type) {
      case "GeometryCollection": input.geometries.forEach(scanGeometry); break;
      case "LineString": scanArcs(input.arcs); break;
      case "MultiLineString": input.arcs.forEach(scanArcs); break;
      case "Polygon": input.arcs.forEach(scanArcs); break;
      case "MultiPolygon": input.arcs.forEach(scanMultiArcs); break;
    }
  }

  function scanArc(index) {
    if (index < 0) index = ~index;
    if (!newIndexByOldIndex[index]) newIndexByOldIndex[index] = 1, ++newArcsLength;
  }

  function scanArcs(arcs) {
    arcs.forEach(scanArc);
  }

  function scanMultiArcs(arcs) {
    arcs.forEach(scanArcs);
  }

  function reindexGeometry(input) {
    var output;
    switch (input.type) {
      case "GeometryCollection": output = {type: "GeometryCollection", geometries: input.geometries.map(reindexGeometry)}; break;
      case "LineString": output = {type: "LineString", arcs: reindexArcs(input.arcs)}; break;
      case "MultiLineString": output = {type: "MultiLineString", arcs: input.arcs.map(reindexArcs)}; break;
      case "Polygon": output = {type: "Polygon", arcs: input.arcs.map(reindexArcs)}; break;
      case "MultiPolygon": output = {type: "MultiPolygon", arcs: input.arcs.map(reindexMultiArcs)}; break;
      default: return input;
    }
    if (input.id != null) output.id = input.id;
    if (input.bbox != null) output.bbox = input.bbox;
    if (input.properties != null) output.properties = input.properties;
    return output;
  }

  function reindexArc(oldIndex) {
    return oldIndex < 0 ? ~newIndexByOldIndex[~oldIndex] : newIndexByOldIndex[oldIndex];
  }

  function reindexArcs(arcs) {
    return arcs.map(reindexArc);
  }

  function reindexMultiArcs(arcs) {
    return arcs.map(reindexArcs);
  }

  for (key in oldObjects) {
    scanGeometry(oldObjects[key]);
  }

  newArcs = new Array(newArcsLength);

  while (++oldIndex < oldArcsLength) {
    if (newIndexByOldIndex[oldIndex]) {
      newIndexByOldIndex[oldIndex] = ++newIndex;
      newArcs[newIndex] = oldArcs[oldIndex];
    }
  }

  for (key in oldObjects) {
    newObjects[key] = reindexGeometry(oldObjects[key]);
  }

  return {
    type: "Topology",
    bbox: topology.bbox,
    transform: topology.transform,
    objects: newObjects,
    arcs: newArcs
  };
}

var version = "0.5.0";

const makeTopoId = ({
	level = undefined,
	level0 = undefined,
	resolution = undefined,
	type,
	year,
}) => {
	let id;

	if (type === 'NUTS') {
		id = `NUTS_RG_${resolution}_${year}_4326_LEVL_${level}`;

		if (level0) {
			id = `${id}_${level0}`;
		}
	} else if (type === 'world') {
		id = `World_${resolution}_iso_a2_topo`;
	}

	return id;
};

const atlasBase = `https://unpkg.com/@svizzle/atlas@${version}/data/dist`;
const makeTopoURL =
	(id, type, base = atlasBase) => `${base}/${type}/topojson/${id}.json`;

function responseJson(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  if (response.status === 204 || response.status === 205) return;
  return response.json();
}

function json(input, init) {
  return fetch(input, init).then(responseJson);
}

var prefix = "$";

function Map() {}

Map.prototype = map.prototype = {
  constructor: Map,
  has: function(key) {
    return (prefix + key) in this;
  },
  get: function(key) {
    return this[prefix + key];
  },
  set: function(key, value) {
    this[prefix + key] = value;
    return this;
  },
  remove: function(key) {
    var property = prefix + key;
    return property in this && delete this[property];
  },
  clear: function() {
    for (var property in this) if (property[0] === prefix) delete this[property];
  },
  keys: function() {
    var keys = [];
    for (var property in this) if (property[0] === prefix) keys.push(property.slice(1));
    return keys;
  },
  values: function() {
    var values = [];
    for (var property in this) if (property[0] === prefix) values.push(this[property]);
    return values;
  },
  entries: function() {
    var entries = [];
    for (var property in this) if (property[0] === prefix) entries.push({key: property.slice(1), value: this[property]});
    return entries;
  },
  size: function() {
    var size = 0;
    for (var property in this) if (property[0] === prefix) ++size;
    return size;
  },
  empty: function() {
    for (var property in this) if (property[0] === prefix) return false;
    return true;
  },
  each: function(f) {
    for (var property in this) if (property[0] === prefix) f(this[property], property.slice(1), this);
  }
};

function map(object, f) {
  var map = new Map;

  // Copy constructor.
  if (object instanceof Map) object.each(function(value, key) { map.set(key, value); });

  // Index array by numeric index or specified key function.
  else if (Array.isArray(object)) {
    var i = -1,
        n = object.length,
        o;

    if (f == null) while (++i < n) map.set(i, object[i]);
    else while (++i < n) map.set(f(o = object[i], i, object), o);
  }

  // Convert object to map.
  else if (object) for (var key in object) map.set(key, object[key]);

  return map;
}

function Set() {}

var proto = map.prototype;

Set.prototype = {
  constructor: Set,
  has: proto.has,
  add: function(value) {
    value += "";
    this[prefix + value] = value;
    return this;
  },
  remove: proto.remove,
  clear: proto.clear,
  values: proto.keys,
  size: proto.size,
  empty: proto.empty,
  each: proto.each
};

var noop = {value: function() {}};

function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}

function Dispatch(_) {
  this._ = _;
}

function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return {type: t, name: name};
  });
}

Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._,
        T = parseTypenames(typename + "", _),
        t,
        i = -1,
        n = T.length;

    // If no callback was specified, return the callback of the given type and name.
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
      return;
    }

    // If a type was specified, set the callback for the given type and name.
    // Otherwise, if a null callback was specified, remove callbacks of the given name.
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
    }

    return this;
  },
  copy: function() {
    var copy = {}, _ = this._;
    for (var t in _) copy[t] = _[t].slice();
    return new Dispatch(copy);
  },
  call: function(type, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type, that, args) {
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};

function get(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}

function set(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null) type.push({name: name, value: callback});
  return type;
}

function request(url, callback) {
  var request,
      event = dispatch("beforesend", "progress", "load", "error"),
      mimeType,
      headers = map(),
      xhr = new XMLHttpRequest,
      user = null,
      password = null,
      response,
      responseType,
      timeout = 0;

  // If IE does not support CORS, use XDomainRequest.
  if (typeof XDomainRequest !== "undefined"
      && !("withCredentials" in xhr)
      && /^(http(s)?:)?\/\//.test(url)) xhr = new XDomainRequest;

  "onload" in xhr
      ? xhr.onload = xhr.onerror = xhr.ontimeout = respond
      : xhr.onreadystatechange = function(o) { xhr.readyState > 3 && respond(o); };

  function respond(o) {
    var status = xhr.status, result;
    if (!status && hasResponse(xhr)
        || status >= 200 && status < 300
        || status === 304) {
      if (response) {
        try {
          result = response.call(request, xhr);
        } catch (e) {
          event.call("error", request, e);
          return;
        }
      } else {
        result = xhr;
      }
      event.call("load", request, result);
    } else {
      event.call("error", request, o);
    }
  }

  xhr.onprogress = function(e) {
    event.call("progress", request, e);
  };

  request = {
    header: function(name, value) {
      name = (name + "").toLowerCase();
      if (arguments.length < 2) return headers.get(name);
      if (value == null) headers.remove(name);
      else headers.set(name, value + "");
      return request;
    },

    // If mimeType is non-null and no Accept header is set, a default is used.
    mimeType: function(value) {
      if (!arguments.length) return mimeType;
      mimeType = value == null ? null : value + "";
      return request;
    },

    // Specifies what type the response value should take;
    // for instance, arraybuffer, blob, document, or text.
    responseType: function(value) {
      if (!arguments.length) return responseType;
      responseType = value;
      return request;
    },

    timeout: function(value) {
      if (!arguments.length) return timeout;
      timeout = +value;
      return request;
    },

    user: function(value) {
      return arguments.length < 1 ? user : (user = value == null ? null : value + "", request);
    },

    password: function(value) {
      return arguments.length < 1 ? password : (password = value == null ? null : value + "", request);
    },

    // Specify how to convert the response content to a specific type;
    // changes the callback value on "load" events.
    response: function(value) {
      response = value;
      return request;
    },

    // Alias for send("GET", …).
    get: function(data, callback) {
      return request.send("GET", data, callback);
    },

    // Alias for send("POST", …).
    post: function(data, callback) {
      return request.send("POST", data, callback);
    },

    // If callback is non-null, it will be used for error and load events.
    send: function(method, data, callback) {
      xhr.open(method, url, true, user, password);
      if (mimeType != null && !headers.has("accept")) headers.set("accept", mimeType + ",*/*");
      if (xhr.setRequestHeader) headers.each(function(value, name) { xhr.setRequestHeader(name, value); });
      if (mimeType != null && xhr.overrideMimeType) xhr.overrideMimeType(mimeType);
      if (responseType != null) xhr.responseType = responseType;
      if (timeout > 0) xhr.timeout = timeout;
      if (callback == null && typeof data === "function") callback = data, data = null;
      if (callback != null && callback.length === 1) callback = fixCallback(callback);
      if (callback != null) request.on("error", callback).on("load", function(xhr) { callback(null, xhr); });
      event.call("beforesend", request, xhr);
      xhr.send(data == null ? null : data);
      return request;
    },

    abort: function() {
      xhr.abort();
      return request;
    },

    on: function() {
      var value = event.on.apply(event, arguments);
      return value === event ? request : value;
    }
  };

  if (callback != null) {
    if (typeof callback !== "function") throw new Error("invalid callback: " + callback);
    return request.get(callback);
  }

  return request;
}

function fixCallback(callback) {
  return function(error, xhr) {
    callback(error == null ? xhr : null);
  };
}

function hasResponse(xhr) {
  var type = xhr.responseType;
  return type && type !== "text"
      ? xhr.response // null on error
      : xhr.responseText; // "" on error
}

function type(defaultMimeType, response) {
  return function(url, callback) {
    var r = request(url).mimeType(defaultMimeType).response(response);
    if (callback != null) {
      if (typeof callback !== "function") throw new Error("invalid callback: " + callback);
      return r.get(callback);
    }
    return r;
  };
}

var jsonRequest = type("application/json", function(xhr) {
  return JSON.parse(xhr.responseText);
});

/**
* @module @svizzle/request/json
*/

/* json */

/**
 * Return a request to a JSON file as a promise.
 * Depending on `useFetch` uses the Fetch API or the XMLHttpRequest API.
 *
 * @function
 * @arg {string} url - The URL for the request (GET).
 * @arg {boolean} [useFetch=true] -
 *      Use the Fetch API? (default = `true`).
 *      Useful to pass `Modernizr.fetch` to disable the Fetch API if not available.
 * @return {promise} - @sideEffects: fetch
 *
 * @example
requestJson('json/url')
	.then(x => console.log(x))
	.catch(err => console.error(err));

async function foo() {
	const x = await requestJson('json/url');
	// ...;
}
 *
 * @since 0.1.0
 */
const requestJson = (url, useFetch = true) => useFetch
	? json(url)
	: new Promise((resolve, reject) => {
		jsonRequest(url, (error, response) => {
			if (error) {
				reject(error);
			}
			resolve(response);
		});
	});

const topoCache = {};
const getTopojson = async regionId => {
	let topo = topoCache[regionId];

	if (!topo) {
		const topoURL = makeTopoURL(regionId, 'NUTS');
		topo = await requestJson(topoURL);
		topoCache[regionId] = topo;
	}

	return topo;
};

const geoCache = {};
const makeGeojson = ({objectId, regionId, topojson}) => {
	let geojson = geoCache[regionId];

	if (!geojson) {
		geojson = topoToGeo(topojson, objectId);
		geoCache[regionId] = geojson;
	}

	return geojson;
};

/* ../../components/time_region_value/src/routes/[id]/[year].svelte generated by Svelte v3.38.3 */

const file = "../../components/time_region_value/src/routes/[id]/[year].svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[100] = list[i].isLeft;
	child_ctx[101] = list[i].name;
	child_ctx[102] = list[i].X;
	child_ctx[103] = list[i].Y;
	child_ctx[104] = list[i].dx;
	child_ctx[105] = list[i].dy;
	return child_ctx;
}

// (551:2) {:else}
function create_else_block_3(ctx) {
	let div0;
	let settingsrow;
	let t0;
	let div1;
	let current_block_type_index;
	let if_block0;
	let t1;
	let current_block_type_index_1;
	let if_block1;
	let if_block1_anchor;
	let current;

	settingsrow = new SettingsRow({
			props: {
				flags: {
					doFilter: /*$_doFilterRegions*/ ctx[8],
					isGeoModalVisible: /*$_geoModal*/ ctx[45].isVisible,
					showRankingControl: false,
					someUnselectedRegions: /*$_someUnselectedRegions*/ ctx[46]
				},
				handlers: {
					toggledFiltering: /*toggledFiltering*/ ctx[54],
					toggledGeoModal: toggleGeoModal
				}
			},
			$$inline: true
		});

	const if_block_creators = [create_if_block_6, create_else_block_4];
	const if_blocks = [];

	function select_block_type_4(ctx, dirty) {
		if (/*noData*/ ctx[32]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type_4(ctx);
	if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	const if_block_creators_1 = [create_if_block_4, create_if_block_5];
	const if_blocks_1 = [];

	function select_block_type_6(ctx, dirty) {
		if (/*$_geoModal*/ ctx[45].isVisible) return 0;
		if (/*$_infoModal*/ ctx[47].isVisible) return 1;
		return -1;
	}

	if (~(current_block_type_index_1 = select_block_type_6(ctx))) {
		if_block1 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx);
	}

	const block = {
		c: function create() {
			div0 = element("div");
			create_component(settingsrow.$$.fragment);
			t0 = space();
			div1 = element("div");
			if_block0.c();
			t1 = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
			this.h();
		},
		l: function claim(nodes) {
			div0 = claim_element(nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			claim_component(settingsrow.$$.fragment, div0_nodes);
			div0_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			if_block0.l(div1_nodes);
			div1_nodes.forEach(detach_dev);
			t1 = claim_space(nodes);
			if (if_block1) if_block1.l(nodes);
			if_block1_anchor = empty();
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", "topbox svelte-lbyyak");
			add_location(div0, file, 554, 3, 13620);
			attr_dev(div1, "class", "content svelte-lbyyak");
			toggle_class(div1, "noData", /*noData*/ ctx[32]);
			add_location(div1, file, 569, 3, 13958);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div0, anchor);
			mount_component(settingsrow, div0, null);
			insert_dev(target, t0, anchor);
			insert_dev(target, div1, anchor);
			if_blocks[current_block_type_index].m(div1, null);
			insert_dev(target, t1, anchor);

			if (~current_block_type_index_1) {
				if_blocks_1[current_block_type_index_1].m(target, anchor);
			}

			insert_dev(target, if_block1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const settingsrow_changes = {};

			if (dirty[0] & /*$_doFilterRegions*/ 256 | dirty[1] & /*$_geoModal, $_someUnselectedRegions*/ 49152) settingsrow_changes.flags = {
				doFilter: /*$_doFilterRegions*/ ctx[8],
				isGeoModalVisible: /*$_geoModal*/ ctx[45].isVisible,
				showRankingControl: false,
				someUnselectedRegions: /*$_someUnselectedRegions*/ ctx[46]
			};

			settingsrow.$set(settingsrow_changes);
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_4(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block0 = if_blocks[current_block_type_index];

				if (!if_block0) {
					if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block0.c();
				} else {
					if_block0.p(ctx, dirty);
				}

				transition_in(if_block0, 1);
				if_block0.m(div1, null);
			}

			if (dirty[1] & /*noData*/ 2) {
				toggle_class(div1, "noData", /*noData*/ ctx[32]);
			}

			let previous_block_index_1 = current_block_type_index_1;
			current_block_type_index_1 = select_block_type_6(ctx);

			if (current_block_type_index_1 === previous_block_index_1) {
				if (~current_block_type_index_1) {
					if_blocks_1[current_block_type_index_1].p(ctx, dirty);
				}
			} else {
				if (if_block1) {
					group_outros();

					transition_out(if_blocks_1[previous_block_index_1], 1, 1, () => {
						if_blocks_1[previous_block_index_1] = null;
					});

					check_outros();
				}

				if (~current_block_type_index_1) {
					if_block1 = if_blocks_1[current_block_type_index_1];

					if (!if_block1) {
						if_block1 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx);
						if_block1.c();
					} else {
						if_block1.p(ctx, dirty);
					}

					transition_in(if_block1, 1);
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				} else {
					if_block1 = null;
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(settingsrow.$$.fragment, local);
			transition_in(if_block0);
			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(settingsrow.$$.fragment, local);
			transition_out(if_block0);
			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div0);
			destroy_component(settingsrow);
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(div1);
			if_blocks[current_block_type_index].d();
			if (detaching) detach_dev(t1);

			if (~current_block_type_index_1) {
				if_blocks_1[current_block_type_index_1].d(detaching);
			}

			if (detaching) detach_dev(if_block1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_3.name,
		type: "else",
		source: "(551:2) {:else}",
		ctx
	});

	return block;
}

// (382:2) {#if $_isSmallScreen}
function create_if_block(ctx) {
	let div0;
	let current_block_type_index;
	let if_block0;
	let t0;
	let div1;
	let current_block_type_index_1;
	let if_block1;
	let t1;
	let div2;
	let infoview;
	let t2;
	let div3;
	let settingsview;
	let current;
	const if_block_creators = [create_if_block_2, create_else_block_1];
	const if_blocks = [];

	function select_block_type_1(ctx, dirty) {
		if (/*noData*/ ctx[32]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type_1(ctx);
	if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	const if_block_creators_1 = [create_if_block_1, create_else_block];
	const if_blocks_1 = [];

	function select_block_type_3(ctx, dirty) {
		if (/*noData*/ ctx[32]) return 0;
		return 1;
	}

	current_block_type_index_1 = select_block_type_3(ctx);
	if_block1 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx);

	infoview = new InfoView({
			props: {
				api_doc_url: /*api_doc_url*/ ctx[13],
				api_type: /*api_type*/ ctx[14],
				auth_provider: /*auth_provider*/ ctx[15],
				data_date: /*data_date*/ ctx[16],
				description: /*description*/ ctx[17],
				endpoint_url: /*endpoint_url*/ ctx[18],
				is_experimental: /*is_experimental*/ ctx[19],
				is_public: /*is_public*/ ctx[20],
				query: /*query*/ ctx[21],
				region: /*region*/ ctx[22],
				source_name: /*source_name*/ ctx[23],
				source_url: /*source_url*/ ctx[24],
				url: /*url*/ ctx[27],
				warning: /*warning*/ ctx[28],
				year_extent: /*year_extent*/ ctx[29]
			},
			$$inline: true
		});

	settingsview = new SettingsView({
			props: {
				flags: {
					doFilter: /*$_doFilterRegions*/ ctx[8],
					showRankingControl: false
				},
				handlers: {
					toggledFiltering: /*toggledFiltering*/ ctx[54]
				}
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			div0 = element("div");
			if_block0.c();
			t0 = space();
			div1 = element("div");
			if_block1.c();
			t1 = space();
			div2 = element("div");
			create_component(infoview.$$.fragment);
			t2 = space();
			div3 = element("div");
			create_component(settingsview.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div0 = claim_element(nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			if_block0.l(div0_nodes);
			div0_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			if_block1.l(div1_nodes);
			div1_nodes.forEach(detach_dev);
			t1 = claim_space(nodes);
			div2 = claim_element(nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			claim_component(infoview.$$.fragment, div2_nodes);
			div2_nodes.forEach(detach_dev);
			t2 = claim_space(nodes);
			div3 = claim_element(nodes, "DIV", { class: true });
			var div3_nodes = children(div3);
			claim_component(settingsview.$$.fragment, div3_nodes);
			div3_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", "view map svelte-lbyyak");
			toggle_class(div0, "noData", /*noData*/ ctx[32]);
			add_location(div0, file, 387, 3, 10059);
			attr_dev(div1, "class", "view barchart svelte-lbyyak");
			toggle_class(div1, "noData", /*noData*/ ctx[32]);
			add_location(div1, file, 465, 3, 11869);
			attr_dev(div2, "class", "view info svelte-lbyyak");
			add_location(div2, file, 518, 3, 13053);
			attr_dev(div3, "class", "view settings svelte-lbyyak");
			add_location(div3, file, 540, 3, 13395);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div0, anchor);
			if_blocks[current_block_type_index].m(div0, null);
			insert_dev(target, t0, anchor);
			insert_dev(target, div1, anchor);
			if_blocks_1[current_block_type_index_1].m(div1, null);
			insert_dev(target, t1, anchor);
			insert_dev(target, div2, anchor);
			mount_component(infoview, div2, null);
			insert_dev(target, t2, anchor);
			insert_dev(target, div3, anchor);
			mount_component(settingsview, div3, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_1(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block0 = if_blocks[current_block_type_index];

				if (!if_block0) {
					if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block0.c();
				} else {
					if_block0.p(ctx, dirty);
				}

				transition_in(if_block0, 1);
				if_block0.m(div0, null);
			}

			if (dirty[1] & /*noData*/ 2) {
				toggle_class(div0, "noData", /*noData*/ ctx[32]);
			}

			let previous_block_index_1 = current_block_type_index_1;
			current_block_type_index_1 = select_block_type_3(ctx);

			if (current_block_type_index_1 === previous_block_index_1) {
				if_blocks_1[current_block_type_index_1].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks_1[previous_block_index_1], 1, 1, () => {
					if_blocks_1[previous_block_index_1] = null;
				});

				check_outros();
				if_block1 = if_blocks_1[current_block_type_index_1];

				if (!if_block1) {
					if_block1 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx);
					if_block1.c();
				} else {
					if_block1.p(ctx, dirty);
				}

				transition_in(if_block1, 1);
				if_block1.m(div1, null);
			}

			if (dirty[1] & /*noData*/ 2) {
				toggle_class(div1, "noData", /*noData*/ ctx[32]);
			}

			const infoview_changes = {};
			if (dirty[0] & /*api_doc_url*/ 8192) infoview_changes.api_doc_url = /*api_doc_url*/ ctx[13];
			if (dirty[0] & /*api_type*/ 16384) infoview_changes.api_type = /*api_type*/ ctx[14];
			if (dirty[0] & /*auth_provider*/ 32768) infoview_changes.auth_provider = /*auth_provider*/ ctx[15];
			if (dirty[0] & /*data_date*/ 65536) infoview_changes.data_date = /*data_date*/ ctx[16];
			if (dirty[0] & /*description*/ 131072) infoview_changes.description = /*description*/ ctx[17];
			if (dirty[0] & /*endpoint_url*/ 262144) infoview_changes.endpoint_url = /*endpoint_url*/ ctx[18];
			if (dirty[0] & /*is_experimental*/ 524288) infoview_changes.is_experimental = /*is_experimental*/ ctx[19];
			if (dirty[0] & /*is_public*/ 1048576) infoview_changes.is_public = /*is_public*/ ctx[20];
			if (dirty[0] & /*query*/ 2097152) infoview_changes.query = /*query*/ ctx[21];
			if (dirty[0] & /*region*/ 4194304) infoview_changes.region = /*region*/ ctx[22];
			if (dirty[0] & /*source_name*/ 8388608) infoview_changes.source_name = /*source_name*/ ctx[23];
			if (dirty[0] & /*source_url*/ 16777216) infoview_changes.source_url = /*source_url*/ ctx[24];
			if (dirty[0] & /*url*/ 134217728) infoview_changes.url = /*url*/ ctx[27];
			if (dirty[0] & /*warning*/ 268435456) infoview_changes.warning = /*warning*/ ctx[28];
			if (dirty[0] & /*year_extent*/ 536870912) infoview_changes.year_extent = /*year_extent*/ ctx[29];
			infoview.$set(infoview_changes);
			const settingsview_changes = {};

			if (dirty[0] & /*$_doFilterRegions*/ 256) settingsview_changes.flags = {
				doFilter: /*$_doFilterRegions*/ ctx[8],
				showRankingControl: false
			};

			settingsview.$set(settingsview_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(if_block1);
			transition_in(infoview.$$.fragment, local);
			transition_in(settingsview.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block0);
			transition_out(if_block1);
			transition_out(infoview.$$.fragment, local);
			transition_out(settingsview.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div0);
			if_blocks[current_block_type_index].d();
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(div1);
			if_blocks_1[current_block_type_index_1].d();
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(div2);
			destroy_component(infoview);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(div3);
			destroy_component(settingsview);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(382:2) {#if $_isSmallScreen}",
		ctx
	});

	return block;
}

// (576:4) {:else}
function create_else_block_4(ctx) {
	let div0;
	let current_block_type_index;
	let if_block;
	let div0_resize_listener;
	let t;
	let div1;
	let barchartvdiv;
	let current;
	let mounted;
	let dispose;
	const if_block_creators = [create_if_block_7, create_else_block_5];
	const if_blocks = [];

	function select_block_type_5(ctx, dirty) {
		if (/*showMap*/ ctx[39]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type_5(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	barchartvdiv = new BarchartVDiv({
			props: {
				focusedKey: /*focusedKey*/ ctx[40],
				formatFn: /*formatFn*/ ctx[30],
				keyToLabel: /*keyToLabel*/ ctx[38],
				selectedKeys: /*selectedKeys*/ ctx[3],
				isInteractive: true,
				items: /*$_doFilterRegions*/ ctx[8]
				? /*filteredItems*/ ctx[7]
				: /*items*/ ctx[6],
				keyToColor: /*keyToColorAll*/ ctx[34],
				refs: /*barchartRefs*/ ctx[37],
				shouldResetScroll: true,
				shouldScrollToFocusedKey: true,
				theme: {
					barDefaultColor: defaultGray,
					focusedKeyColor: "rgb(211, 238, 253)",
					titleFontSize: "1.2rem"
				},
				title: /*barchartTitle*/ ctx[36]
			},
			$$inline: true
		});

	barchartvdiv.$on("entered", /*onEnteredBar*/ ctx[52]);
	barchartvdiv.$on("exited", /*onExitedBar*/ ctx[53]);

	const block = {
		c: function create() {
			div0 = element("div");
			if_block.c();
			t = space();
			div1 = element("div");
			create_component(barchartvdiv.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div0 = claim_element(nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			if_block.l(div0_nodes);
			div0_nodes.forEach(detach_dev);
			t = claim_space(nodes);
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			claim_component(barchartvdiv.$$.fragment, div1_nodes);
			div1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", "map svelte-lbyyak");
			add_render_callback(() => /*div0_elementresize_handler*/ ctx[95].call(div0));
			add_location(div0, file, 579, 5, 14095);
			attr_dev(div1, "class", "barchart svelte-lbyyak");
			add_location(div1, file, 695, 5, 16857);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div0, anchor);
			if_blocks[current_block_type_index].m(div0, null);
			div0_resize_listener = add_resize_listener(div0, /*div0_elementresize_handler*/ ctx[95].bind(div0));
			insert_dev(target, t, anchor);
			insert_dev(target, div1, anchor);
			mount_component(barchartvdiv, div1, null);
			current = true;

			if (!mounted) {
				dispose = listen_dev(div0, "mousemove", /*onMousemoved*/ ctx[51], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_5(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(div0, null);
			}

			const barchartvdiv_changes = {};
			if (dirty[1] & /*focusedKey*/ 512) barchartvdiv_changes.focusedKey = /*focusedKey*/ ctx[40];
			if (dirty[0] & /*formatFn*/ 1073741824) barchartvdiv_changes.formatFn = /*formatFn*/ ctx[30];
			if (dirty[1] & /*keyToLabel*/ 128) barchartvdiv_changes.keyToLabel = /*keyToLabel*/ ctx[38];
			if (dirty[0] & /*selectedKeys*/ 8) barchartvdiv_changes.selectedKeys = /*selectedKeys*/ ctx[3];

			if (dirty[0] & /*$_doFilterRegions, filteredItems, items*/ 448) barchartvdiv_changes.items = /*$_doFilterRegions*/ ctx[8]
			? /*filteredItems*/ ctx[7]
			: /*items*/ ctx[6];

			if (dirty[1] & /*keyToColorAll*/ 8) barchartvdiv_changes.keyToColor = /*keyToColorAll*/ ctx[34];
			if (dirty[1] & /*barchartRefs*/ 64) barchartvdiv_changes.refs = /*barchartRefs*/ ctx[37];
			if (dirty[1] & /*barchartTitle*/ 32) barchartvdiv_changes.title = /*barchartTitle*/ ctx[36];
			barchartvdiv.$set(barchartvdiv_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			transition_in(barchartvdiv.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			transition_out(barchartvdiv.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div0);
			if_blocks[current_block_type_index].d();
			div0_resize_listener();
			if (detaching) detach_dev(t);
			if (detaching) detach_dev(div1);
			destroy_component(barchartvdiv);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_4.name,
		type: "else",
		source: "(576:4) {:else}",
		ctx
	});

	return block;
}

// (574:4) {#if noData}
function create_if_block_6(ctx) {
	let messageview;
	let current;

	messageview = new MessageView({
			props: { text: "No data" },
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
		p: noop$1,
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
		id: create_if_block_6.name,
		type: "if",
		source: "(574:4) {#if noData}",
		ctx
	});

	return block;
}

// (686:6) {:else}
function create_else_block_5(ctx) {
	let loadingview;
	let current;

	loadingview = new LoadingView({
			props: {
				message: fetchingMessage,
				stroke: /*$_theme*/ ctx[44].colorMain
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(loadingview.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(loadingview.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(loadingview, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const loadingview_changes = {};
			if (dirty[1] & /*$_theme*/ 8192) loadingview_changes.stroke = /*$_theme*/ ctx[44].colorMain;
			loadingview.$set(loadingview_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(loadingview.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(loadingview.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(loadingview, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_5.name,
		type: "else",
		source: "(686:6) {:else}",
		ctx
	});

	return block;
}

// (586:6) {#if showMap}
function create_if_block_7(ctx) {
	let svg;
	let choroplethg;
	let g;
	let colorbinsg;
	let g_transform_value;
	let t;
	let if_block1_anchor;
	let current;

	choroplethg = new ChoroplethG({
			props: {
				focusedKey: /*focusedKey*/ ctx[40],
				projection: /*projection*/ ctx[11],
				selectedKeys: /*selectedKeys*/ ctx[3],
				topojson: /*topojson*/ ctx[10],
				geometry: { left: /*choroplethSafety*/ ctx[5].left },
				height: /*mapHeight*/ ctx[1],
				isInteractive: true,
				key: /*$_regionSettings*/ ctx[9].key,
				keyToColor: /*$_doFilterRegions*/ ctx[8]
				? /*keyToColorFiltered*/ ctx[35]
				: /*keyToColorAll*/ ctx[34],
				theme: {
					defaultFill: defaultGray,
					defaultStroke: "gray",
					defaultStrokeWidth: 0.25,
					focusedStroke: /*$_theme*/ ctx[44].colorBlack,
					focusedStrokeWidth: 1.5,
					selectedStroke: /*$_theme*/ ctx[44].colorBlack,
					selectedStrokeWidth: 0.5
				},
				topojsonId: /*$_regionSettings*/ ctx[9].objectId,
				width: /*mapWidth*/ ctx[2]
			},
			$$inline: true
		});

	choroplethg.$on("entered", /*onEnteredArea*/ ctx[49]);
	choroplethg.$on("exited", /*onExitedArea*/ ctx[50]);
	let if_block0 = /*POIsLayout*/ ctx[41] && create_if_block_10(ctx);

	colorbinsg = new ColorBinsG({
			props: {
				width: legendBarThickness,
				height: /*legendHeight*/ ctx[31],
				bins: /*colorBins*/ ctx[33],
				flags: { isVertical: true, withBackground: true },
				theme: {
					backgroundColor: /*$_theme*/ ctx[44].colorWhite,
					backgroundOpacity: 0.5
				},
				ticksFormatFn: /*formatFn*/ ctx[30]
			},
			$$inline: true
		});

	let if_block1 = /*$_tooltip*/ ctx[12].isVisible && create_if_block_8(ctx);

	const block = {
		c: function create() {
			svg = svg_element("svg");
			create_component(choroplethg.$$.fragment);
			if (if_block0) if_block0.c();
			g = svg_element("g");
			create_component(colorbinsg.$$.fragment);
			t = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
			this.h();
		},
		l: function claim(nodes) {
			svg = claim_element(nodes, "svg", { height: true, width: true }, 1);
			var svg_nodes = children(svg);
			claim_component(choroplethg.$$.fragment, svg_nodes);
			if (if_block0) if_block0.l(svg_nodes);
			g = claim_element(svg_nodes, "g", { transform: true }, 1);
			var g_nodes = children(g);
			claim_component(colorbinsg.$$.fragment, g_nodes);
			g_nodes.forEach(detach_dev);
			svg_nodes.forEach(detach_dev);
			t = claim_space(nodes);
			if (if_block1) if_block1.l(nodes);
			if_block1_anchor = empty();
			this.h();
		},
		h: function hydrate() {
			attr_dev(g, "transform", g_transform_value = "translate(0," + /*legendHeight*/ ctx[31] + ")");
			add_location(g, file, 647, 8, 15806);
			attr_dev(svg, "height", /*mapHeight*/ ctx[1]);
			attr_dev(svg, "width", /*mapWidth*/ ctx[2]);
			add_location(svg, file, 586, 7, 14256);
		},
		m: function mount(target, anchor) {
			insert_dev(target, svg, anchor);
			mount_component(choroplethg, svg, null);
			if (if_block0) if_block0.m(svg, null);
			append_dev(svg, g);
			mount_component(colorbinsg, g, null);
			insert_dev(target, t, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert_dev(target, if_block1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const choroplethg_changes = {};
			if (dirty[1] & /*focusedKey*/ 512) choroplethg_changes.focusedKey = /*focusedKey*/ ctx[40];
			if (dirty[0] & /*projection*/ 2048) choroplethg_changes.projection = /*projection*/ ctx[11];
			if (dirty[0] & /*selectedKeys*/ 8) choroplethg_changes.selectedKeys = /*selectedKeys*/ ctx[3];
			if (dirty[0] & /*topojson*/ 1024) choroplethg_changes.topojson = /*topojson*/ ctx[10];
			if (dirty[0] & /*choroplethSafety*/ 32) choroplethg_changes.geometry = { left: /*choroplethSafety*/ ctx[5].left };
			if (dirty[0] & /*mapHeight*/ 2) choroplethg_changes.height = /*mapHeight*/ ctx[1];
			if (dirty[0] & /*$_regionSettings*/ 512) choroplethg_changes.key = /*$_regionSettings*/ ctx[9].key;

			if (dirty[0] & /*$_doFilterRegions*/ 256 | dirty[1] & /*keyToColorFiltered, keyToColorAll*/ 24) choroplethg_changes.keyToColor = /*$_doFilterRegions*/ ctx[8]
			? /*keyToColorFiltered*/ ctx[35]
			: /*keyToColorAll*/ ctx[34];

			if (dirty[1] & /*$_theme*/ 8192) choroplethg_changes.theme = {
				defaultFill: defaultGray,
				defaultStroke: "gray",
				defaultStrokeWidth: 0.25,
				focusedStroke: /*$_theme*/ ctx[44].colorBlack,
				focusedStrokeWidth: 1.5,
				selectedStroke: /*$_theme*/ ctx[44].colorBlack,
				selectedStrokeWidth: 0.5
			};

			if (dirty[0] & /*$_regionSettings*/ 512) choroplethg_changes.topojsonId = /*$_regionSettings*/ ctx[9].objectId;
			if (dirty[0] & /*mapWidth*/ 4) choroplethg_changes.width = /*mapWidth*/ ctx[2];
			choroplethg.$set(choroplethg_changes);

			if (/*POIsLayout*/ ctx[41]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_10(ctx);
					if_block0.c();
					if_block0.m(svg, g);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			const colorbinsg_changes = {};
			if (dirty[1] & /*legendHeight*/ 1) colorbinsg_changes.height = /*legendHeight*/ ctx[31];
			if (dirty[1] & /*colorBins*/ 4) colorbinsg_changes.bins = /*colorBins*/ ctx[33];

			if (dirty[1] & /*$_theme*/ 8192) colorbinsg_changes.theme = {
				backgroundColor: /*$_theme*/ ctx[44].colorWhite,
				backgroundOpacity: 0.5
			};

			if (dirty[0] & /*formatFn*/ 1073741824) colorbinsg_changes.ticksFormatFn = /*formatFn*/ ctx[30];
			colorbinsg.$set(colorbinsg_changes);

			if (!current || dirty[1] & /*legendHeight*/ 1 && g_transform_value !== (g_transform_value = "translate(0," + /*legendHeight*/ ctx[31] + ")")) {
				attr_dev(g, "transform", g_transform_value);
			}

			if (!current || dirty[0] & /*mapHeight*/ 2) {
				attr_dev(svg, "height", /*mapHeight*/ ctx[1]);
			}

			if (!current || dirty[0] & /*mapWidth*/ 4) {
				attr_dev(svg, "width", /*mapWidth*/ ctx[2]);
			}

			if (/*$_tooltip*/ ctx[12].isVisible) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_8(ctx);
					if_block1.c();
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(choroplethg.$$.fragment, local);
			transition_in(colorbinsg.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(choroplethg.$$.fragment, local);
			transition_out(colorbinsg.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(svg);
			destroy_component(choroplethg);
			if (if_block0) if_block0.d();
			destroy_component(colorbinsg);
			if (detaching) detach_dev(t);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach_dev(if_block1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_7.name,
		type: "if",
		source: "(586:6) {#if showMap}",
		ctx
	});

	return block;
}

// (623:8) {#if POIsLayout}
function create_if_block_10(ctx) {
	let g;
	let each_value = /*POIsLayout*/ ctx[41];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			g = svg_element("g");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			g = claim_element(nodes, "g", { class: true }, 1);
			var g_nodes = children(g);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(g_nodes);
			}

			g_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(g, "class", "POIs svelte-lbyyak");
			add_location(g, file, 623, 9, 15221);
		},
		m: function mount(target, anchor) {
			insert_dev(target, g, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(g, null);
			}
		},
		p: function update(ctx, dirty) {
			if (dirty[1] & /*POIsLayout*/ 1024) {
				each_value = /*POIsLayout*/ ctx[41];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(g, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(g);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_10.name,
		type: "if",
		source: "(623:8) {#if POIsLayout}",
		ctx
	});

	return block;
}

// (625:10) {#each POIsLayout as {isLeft, name, X, Y, dx, dy}}
function create_each_block(ctx) {
	let g;
	let circle;
	let text0;
	let t0_value = /*name*/ ctx[101] + "";
	let t0;
	let text0_dx_value;
	let text0_dy_value;
	let text1;
	let t1_value = /*name*/ ctx[101] + "";
	let t1;
	let text1_dx_value;
	let text1_dy_value;
	let g_transform_value;

	const block = {
		c: function create() {
			g = svg_element("g");
			circle = svg_element("circle");
			text0 = svg_element("text");
			t0 = text(t0_value);
			text1 = svg_element("text");
			t1 = text(t1_value);
			this.h();
		},
		l: function claim(nodes) {
			g = claim_element(nodes, "g", { transform: true }, 1);
			var g_nodes = children(g);
			circle = claim_element(g_nodes, "circle", { r: true, class: true }, 1);
			children(circle).forEach(detach_dev);

			text0 = claim_element(
				g_nodes,
				"text",
				{
					dx: true,
					dy: true,
					class: true,
					"font-size": true
				},
				1
			);

			var text0_nodes = children(text0);
			t0 = claim_text(text0_nodes, t0_value);
			text0_nodes.forEach(detach_dev);

			text1 = claim_element(
				g_nodes,
				"text",
				{
					dx: true,
					dy: true,
					"font-size": true,
					class: true
				},
				1
			);

			var text1_nodes = children(text1);
			t1 = claim_text(text1_nodes, t1_value);
			text1_nodes.forEach(detach_dev);
			g_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "r", markerRadius);
			attr_dev(circle, "class", "svelte-lbyyak");
			add_location(circle, file, 626, 12, 15357);
			attr_dev(text0, "dx", text0_dx_value = /*dx*/ ctx[104]);
			attr_dev(text0, "dy", text0_dy_value = /*dy*/ ctx[105]);
			attr_dev(text0, "class", "background svelte-lbyyak");
			attr_dev(text0, "font-size", labelsFontSize);
			toggle_class(text0, "isLeft", /*isLeft*/ ctx[100]);
			add_location(text0, file, 627, 12, 15396);
			attr_dev(text1, "dx", text1_dx_value = /*dx*/ ctx[104]);
			attr_dev(text1, "dy", text1_dy_value = /*dy*/ ctx[105]);
			attr_dev(text1, "font-size", labelsFontSize);
			attr_dev(text1, "class", "svelte-lbyyak");
			toggle_class(text1, "isLeft", /*isLeft*/ ctx[100]);
			add_location(text1, file, 634, 12, 15575);
			attr_dev(g, "transform", g_transform_value = "translate(" + /*X*/ ctx[102] + "," + /*Y*/ ctx[103] + ")");
			add_location(g, file, 625, 11, 15310);
		},
		m: function mount(target, anchor) {
			insert_dev(target, g, anchor);
			append_dev(g, circle);
			append_dev(g, text0);
			append_dev(text0, t0);
			append_dev(g, text1);
			append_dev(text1, t1);
		},
		p: function update(ctx, dirty) {
			if (dirty[1] & /*POIsLayout*/ 1024 && t0_value !== (t0_value = /*name*/ ctx[101] + "")) set_data_dev(t0, t0_value);

			if (dirty[1] & /*POIsLayout*/ 1024 && text0_dx_value !== (text0_dx_value = /*dx*/ ctx[104])) {
				attr_dev(text0, "dx", text0_dx_value);
			}

			if (dirty[1] & /*POIsLayout*/ 1024 && text0_dy_value !== (text0_dy_value = /*dy*/ ctx[105])) {
				attr_dev(text0, "dy", text0_dy_value);
			}

			if (dirty[1] & /*POIsLayout*/ 1024) {
				toggle_class(text0, "isLeft", /*isLeft*/ ctx[100]);
			}

			if (dirty[1] & /*POIsLayout*/ 1024 && t1_value !== (t1_value = /*name*/ ctx[101] + "")) set_data_dev(t1, t1_value);

			if (dirty[1] & /*POIsLayout*/ 1024 && text1_dx_value !== (text1_dx_value = /*dx*/ ctx[104])) {
				attr_dev(text1, "dx", text1_dx_value);
			}

			if (dirty[1] & /*POIsLayout*/ 1024 && text1_dy_value !== (text1_dy_value = /*dy*/ ctx[105])) {
				attr_dev(text1, "dy", text1_dy_value);
			}

			if (dirty[1] & /*POIsLayout*/ 1024) {
				toggle_class(text1, "isLeft", /*isLeft*/ ctx[100]);
			}

			if (dirty[1] & /*POIsLayout*/ 1024 && g_transform_value !== (g_transform_value = "translate(" + /*X*/ ctx[102] + "," + /*Y*/ ctx[103] + ")")) {
				attr_dev(g, "transform", g_transform_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(g);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(625:10) {#each POIsLayout as {isLeft, name, X, Y, dx, dy}}",
		ctx
	});

	return block;
}

// (669:7) {#if $_tooltip.isVisible}
function create_if_block_8(ctx) {
	let div1;
	let header;
	let span0;
	let t0_value = /*$_tooltip*/ ctx[12].areaId + "";
	let t0;
	let t1;
	let t2;
	let div0;
	let span1;
	let t3_value = /*$_tooltip*/ ctx[12].regionLabel + "";
	let t3;
	let div1_style_value;
	let if_block = /*$_tooltip*/ ctx[12].value && create_if_block_9(ctx);

	const block = {
		c: function create() {
			div1 = element("div");
			header = element("header");
			span0 = element("span");
			t0 = text(t0_value);
			t1 = space();
			if (if_block) if_block.c();
			t2 = space();
			div0 = element("div");
			span1 = element("span");
			t3 = text(t3_value);
			this.h();
		},
		l: function claim(nodes) {
			div1 = claim_element(nodes, "DIV", { class: true, style: true });
			var div1_nodes = children(div1);
			header = claim_element(div1_nodes, "HEADER", { class: true });
			var header_nodes = children(header);
			span0 = claim_element(header_nodes, "SPAN", { class: true });
			var span0_nodes = children(span0);
			t0 = claim_text(span0_nodes, t0_value);
			span0_nodes.forEach(detach_dev);
			t1 = claim_space(header_nodes);
			if (if_block) if_block.l(header_nodes);
			header_nodes.forEach(detach_dev);
			t2 = claim_space(div1_nodes);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			span1 = claim_element(div0_nodes, "SPAN", { class: true });
			var span1_nodes = children(span1);
			t3 = claim_text(span1_nodes, t3_value);
			span1_nodes.forEach(detach_dev);
			div0_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(span0, "class", "svelte-lbyyak");
			add_location(span0, file, 674, 10, 16419);
			attr_dev(header, "class", "svelte-lbyyak");
			add_location(header, file, 673, 9, 16400);
			attr_dev(span1, "class", "svelte-lbyyak");
			add_location(span1, file, 680, 10, 16585);
			attr_dev(div0, "class", "svelte-lbyyak");
			add_location(div0, file, 679, 9, 16569);
			attr_dev(div1, "class", "tooltip svelte-lbyyak");
			attr_dev(div1, "style", div1_style_value = /*$_tooltip*/ ctx[12].style);
			add_location(div1, file, 669, 8, 16318);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, header);
			append_dev(header, span0);
			append_dev(span0, t0);
			append_dev(header, t1);
			if (if_block) if_block.m(header, null);
			append_dev(div1, t2);
			append_dev(div1, div0);
			append_dev(div0, span1);
			append_dev(span1, t3);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*$_tooltip*/ 4096 && t0_value !== (t0_value = /*$_tooltip*/ ctx[12].areaId + "")) set_data_dev(t0, t0_value);

			if (/*$_tooltip*/ ctx[12].value) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_9(ctx);
					if_block.c();
					if_block.m(header, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty[0] & /*$_tooltip*/ 4096 && t3_value !== (t3_value = /*$_tooltip*/ ctx[12].regionLabel + "")) set_data_dev(t3, t3_value);

			if (dirty[0] & /*$_tooltip*/ 4096 && div1_style_value !== (div1_style_value = /*$_tooltip*/ ctx[12].style)) {
				attr_dev(div1, "style", div1_style_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			if (if_block) if_block.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_8.name,
		type: "if",
		source: "(669:7) {#if $_tooltip.isVisible}",
		ctx
	});

	return block;
}

// (676:10) {#if $_tooltip.value}
function create_if_block_9(ctx) {
	let span;
	let t_value = /*$_tooltip*/ ctx[12].value + "";
	let t;

	const block = {
		c: function create() {
			span = element("span");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			span = claim_element(nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			t = claim_text(span_nodes, t_value);
			span_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(span, "class", "svelte-lbyyak");
			add_location(span, file, 676, 11, 16494);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
			append_dev(span, t);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*$_tooltip*/ 4096 && t_value !== (t_value = /*$_tooltip*/ ctx[12].value + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_9.name,
		type: "if",
		source: "(676:10) {#if $_tooltip.value}",
		ctx
	});

	return block;
}

// (727:35) 
function create_if_block_5(ctx) {
	let infomodal;
	let current;

	infomodal = new InfoModal({
			props: {
				api_doc_url: /*api_doc_url*/ ctx[13],
				api_type: /*api_type*/ ctx[14],
				auth_provider: /*auth_provider*/ ctx[15],
				data_date: /*data_date*/ ctx[16],
				description: /*description*/ ctx[17],
				endpoint_url: /*endpoint_url*/ ctx[18],
				is_experimental: /*is_experimental*/ ctx[19],
				is_public: /*is_public*/ ctx[20],
				query: /*query*/ ctx[21],
				region: /*region*/ ctx[22],
				source_name: /*source_name*/ ctx[23],
				source_url: /*source_url*/ ctx[24],
				url: /*url*/ ctx[27],
				year_extent: /*year_extent*/ ctx[29],
				warning: /*warning*/ ctx[28]
			},
			$$inline: true
		});

	infomodal.$on("click", toggleInfoModal);

	const block = {
		c: function create() {
			create_component(infomodal.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(infomodal.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(infomodal, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const infomodal_changes = {};
			if (dirty[0] & /*api_doc_url*/ 8192) infomodal_changes.api_doc_url = /*api_doc_url*/ ctx[13];
			if (dirty[0] & /*api_type*/ 16384) infomodal_changes.api_type = /*api_type*/ ctx[14];
			if (dirty[0] & /*auth_provider*/ 32768) infomodal_changes.auth_provider = /*auth_provider*/ ctx[15];
			if (dirty[0] & /*data_date*/ 65536) infomodal_changes.data_date = /*data_date*/ ctx[16];
			if (dirty[0] & /*description*/ 131072) infomodal_changes.description = /*description*/ ctx[17];
			if (dirty[0] & /*endpoint_url*/ 262144) infomodal_changes.endpoint_url = /*endpoint_url*/ ctx[18];
			if (dirty[0] & /*is_experimental*/ 524288) infomodal_changes.is_experimental = /*is_experimental*/ ctx[19];
			if (dirty[0] & /*is_public*/ 1048576) infomodal_changes.is_public = /*is_public*/ ctx[20];
			if (dirty[0] & /*query*/ 2097152) infomodal_changes.query = /*query*/ ctx[21];
			if (dirty[0] & /*region*/ 4194304) infomodal_changes.region = /*region*/ ctx[22];
			if (dirty[0] & /*source_name*/ 8388608) infomodal_changes.source_name = /*source_name*/ ctx[23];
			if (dirty[0] & /*source_url*/ 16777216) infomodal_changes.source_url = /*source_url*/ ctx[24];
			if (dirty[0] & /*url*/ 134217728) infomodal_changes.url = /*url*/ ctx[27];
			if (dirty[0] & /*year_extent*/ 536870912) infomodal_changes.year_extent = /*year_extent*/ ctx[29];
			if (dirty[0] & /*warning*/ 268435456) infomodal_changes.warning = /*warning*/ ctx[28];
			infomodal.$set(infomodal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(infomodal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(infomodal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(infomodal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_5.name,
		type: "if",
		source: "(727:35) ",
		ctx
	});

	return block;
}

// (725:3) {#if $_geoModal.isVisible}
function create_if_block_4(ctx) {
	let geofiltermodal;
	let current;
	geofiltermodal = new GeoFilterModal({ $$inline: true });
	geofiltermodal.$on("click", toggleGeoModal);

	const block = {
		c: function create() {
			create_component(geofiltermodal.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(geofiltermodal.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(geofiltermodal, target, anchor);
			current = true;
		},
		p: noop$1,
		i: function intro(local) {
			if (current) return;
			transition_in(geofiltermodal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(geofiltermodal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(geofiltermodal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_4.name,
		type: "if",
		source: "(725:3) {#if $_geoModal.isVisible}",
		ctx
	});

	return block;
}

// (394:4) {:else}
function create_else_block_1(ctx) {
	let div0;
	let colorbinsdiv;
	let t;
	let div2;
	let div1;
	let current_block_type_index;
	let if_block;
	let div1_resize_listener;
	let current;
	let mounted;
	let dispose;

	colorbinsdiv = new ColorBinsDiv({
			props: {
				bins: /*colorBins*/ ctx[33],
				geometry: { barThickness: 15, left: 30, right: 30 },
				flags: {
					withBackground: true,
					showTicksExtentOnly: true
				},
				theme: {
					backgroundColor: /*$_theme*/ ctx[44].colorWhite,
					backgroundOpacity: 0.5
				},
				ticksFormatFn: /*formatFn*/ ctx[30]
			},
			$$inline: true
		});

	const if_block_creators = [create_if_block_3, create_else_block_2];
	const if_blocks = [];

	function select_block_type_2(ctx, dirty) {
		if (/*showMap*/ ctx[39]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type_2(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			div0 = element("div");
			create_component(colorbinsdiv.$$.fragment);
			t = space();
			div2 = element("div");
			div1 = element("div");
			if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			div0 = claim_element(nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			claim_component(colorbinsdiv.$$.fragment, div0_nodes);
			div0_nodes.forEach(detach_dev);
			t = claim_space(nodes);
			div2 = claim_element(nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			div1 = claim_element(div2_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			if_block.l(div1_nodes);
			div1_nodes.forEach(detach_dev);
			div2_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", "topbox svelte-lbyyak");
			add_location(div0, file, 394, 5, 10190);
			attr_dev(div1, "class", "map svelte-lbyyak");
			add_render_callback(() => /*div1_elementresize_handler*/ ctx[94].call(div1));
			add_location(div1, file, 414, 6, 10627);
			attr_dev(div2, "class", "content svelte-lbyyak");
			add_location(div2, file, 413, 5, 10599);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div0, anchor);
			mount_component(colorbinsdiv, div0, null);
			insert_dev(target, t, anchor);
			insert_dev(target, div2, anchor);
			append_dev(div2, div1);
			if_blocks[current_block_type_index].m(div1, null);
			div1_resize_listener = add_resize_listener(div1, /*div1_elementresize_handler*/ ctx[94].bind(div1));
			current = true;

			if (!mounted) {
				dispose = listen_dev(div1, "mousemove", /*onMousemoved*/ ctx[51], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			const colorbinsdiv_changes = {};
			if (dirty[1] & /*colorBins*/ 4) colorbinsdiv_changes.bins = /*colorBins*/ ctx[33];

			if (dirty[1] & /*$_theme*/ 8192) colorbinsdiv_changes.theme = {
				backgroundColor: /*$_theme*/ ctx[44].colorWhite,
				backgroundOpacity: 0.5
			};

			if (dirty[0] & /*formatFn*/ 1073741824) colorbinsdiv_changes.ticksFormatFn = /*formatFn*/ ctx[30];
			colorbinsdiv.$set(colorbinsdiv_changes);
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_2(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(div1, null);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(colorbinsdiv.$$.fragment, local);
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(colorbinsdiv.$$.fragment, local);
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div0);
			destroy_component(colorbinsdiv);
			if (detaching) detach_dev(t);
			if (detaching) detach_dev(div2);
			if_blocks[current_block_type_index].d();
			div1_resize_listener();
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_1.name,
		type: "else",
		source: "(394:4) {:else}",
		ctx
	});

	return block;
}

// (392:4) {#if noData}
function create_if_block_2(ctx) {
	let messageview;
	let current;

	messageview = new MessageView({
			props: { text: config.noDataMessage },
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
		p: noop$1,
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
		id: create_if_block_2.name,
		type: "if",
		source: "(392:4) {#if noData}",
		ctx
	});

	return block;
}

// (453:7) {:else}
function create_else_block_2(ctx) {
	let loadingview;
	let current;

	loadingview = new LoadingView({
			props: {
				message: fetchingMessage,
				stroke: /*$_theme*/ ctx[44].colorMain
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(loadingview.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(loadingview.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(loadingview, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const loadingview_changes = {};
			if (dirty[1] & /*$_theme*/ 8192) loadingview_changes.stroke = /*$_theme*/ ctx[44].colorMain;
			loadingview.$set(loadingview_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(loadingview.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(loadingview.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(loadingview, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_2.name,
		type: "else",
		source: "(453:7) {:else}",
		ctx
	});

	return block;
}

// (421:7) {#if showMap}
function create_if_block_3(ctx) {
	let svg;
	let choroplethg;
	let current;

	choroplethg = new ChoroplethG({
			props: {
				focusedKey: /*focusedKey*/ ctx[40],
				projection: /*projection*/ ctx[11],
				selectedKeys: /*selectedKeys*/ ctx[3],
				topojson: /*topojson*/ ctx[10],
				height: /*mapHeight*/ ctx[1],
				isInteractive: true,
				key: /*$_regionSettings*/ ctx[9].key,
				keyToColor: /*$_doFilterRegions*/ ctx[8]
				? /*keyToColorFiltered*/ ctx[35]
				: /*keyToColorAll*/ ctx[34],
				theme: {
					defaultFill: defaultGray,
					defaultStroke: "gray",
					defaultStrokeWidth: 0.25,
					focusedStroke: /*$_theme*/ ctx[44].colorBlack,
					focusedStrokeWidth: 1.5,
					selectedStroke: /*$_theme*/ ctx[44].colorBlack,
					selectedStrokeWidth: 0.5
				},
				topojsonId: /*$_regionSettings*/ ctx[9].objectId,
				width: /*mapWidth*/ ctx[2]
			},
			$$inline: true
		});

	choroplethg.$on("entered", /*onEnteredArea*/ ctx[49]);
	choroplethg.$on("exited", /*onExitedArea*/ ctx[50]);

	const block = {
		c: function create() {
			svg = svg_element("svg");
			create_component(choroplethg.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			svg = claim_element(nodes, "svg", { height: true, width: true }, 1);
			var svg_nodes = children(svg);
			claim_component(choroplethg.$$.fragment, svg_nodes);
			svg_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(svg, "height", /*mapHeight*/ ctx[1]);
			attr_dev(svg, "width", /*mapWidth*/ ctx[2]);
			add_location(svg, file, 421, 8, 10795);
		},
		m: function mount(target, anchor) {
			insert_dev(target, svg, anchor);
			mount_component(choroplethg, svg, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			const choroplethg_changes = {};
			if (dirty[1] & /*focusedKey*/ 512) choroplethg_changes.focusedKey = /*focusedKey*/ ctx[40];
			if (dirty[0] & /*projection*/ 2048) choroplethg_changes.projection = /*projection*/ ctx[11];
			if (dirty[0] & /*selectedKeys*/ 8) choroplethg_changes.selectedKeys = /*selectedKeys*/ ctx[3];
			if (dirty[0] & /*topojson*/ 1024) choroplethg_changes.topojson = /*topojson*/ ctx[10];
			if (dirty[0] & /*mapHeight*/ 2) choroplethg_changes.height = /*mapHeight*/ ctx[1];
			if (dirty[0] & /*$_regionSettings*/ 512) choroplethg_changes.key = /*$_regionSettings*/ ctx[9].key;

			if (dirty[0] & /*$_doFilterRegions*/ 256 | dirty[1] & /*keyToColorFiltered, keyToColorAll*/ 24) choroplethg_changes.keyToColor = /*$_doFilterRegions*/ ctx[8]
			? /*keyToColorFiltered*/ ctx[35]
			: /*keyToColorAll*/ ctx[34];

			if (dirty[1] & /*$_theme*/ 8192) choroplethg_changes.theme = {
				defaultFill: defaultGray,
				defaultStroke: "gray",
				defaultStrokeWidth: 0.25,
				focusedStroke: /*$_theme*/ ctx[44].colorBlack,
				focusedStrokeWidth: 1.5,
				selectedStroke: /*$_theme*/ ctx[44].colorBlack,
				selectedStrokeWidth: 0.5
			};

			if (dirty[0] & /*$_regionSettings*/ 512) choroplethg_changes.topojsonId = /*$_regionSettings*/ ctx[9].objectId;
			if (dirty[0] & /*mapWidth*/ 4) choroplethg_changes.width = /*mapWidth*/ ctx[2];
			choroplethg.$set(choroplethg_changes);

			if (!current || dirty[0] & /*mapHeight*/ 2) {
				attr_dev(svg, "height", /*mapHeight*/ ctx[1]);
			}

			if (!current || dirty[0] & /*mapWidth*/ 4) {
				attr_dev(svg, "width", /*mapWidth*/ ctx[2]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(choroplethg.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(choroplethg.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(svg);
			destroy_component(choroplethg);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(421:7) {#if showMap}",
		ctx
	});

	return block;
}

// (472:4) {:else}
function create_else_block(ctx) {
	let div0;
	let colorbinsdiv;
	let t;
	let div1;
	let barchartvdiv;
	let current;

	colorbinsdiv = new ColorBinsDiv({
			props: {
				bins: /*colorBins*/ ctx[33],
				geometry: { barThickness: 15, left: 30, right: 30 },
				flags: {
					withBackground: true,
					showTicksExtentOnly: true
				},
				theme: {
					backgroundColor: /*$_theme*/ ctx[44].colorWhite,
					backgroundOpacity: 0.5
				},
				ticksFormatFn: /*formatFn*/ ctx[30]
			},
			$$inline: true
		});

	barchartvdiv = new BarchartVDiv({
			props: {
				focusedKey: /*focusedKey*/ ctx[40],
				formatFn: /*formatFn*/ ctx[30],
				keyToLabel: /*keyToLabel*/ ctx[38],
				selectedKeys: /*selectedKeys*/ ctx[3],
				isInteractive: true,
				items: /*$_doFilterRegions*/ ctx[8]
				? /*filteredItems*/ ctx[7]
				: /*items*/ ctx[6],
				keyToColor: /*keyToColorAll*/ ctx[34],
				refs: /*barchartRefs*/ ctx[37],
				shouldResetScroll: true,
				shouldScrollToFocusedKey: true,
				theme: {
					barDefaultColor: defaultGray,
					focusedKeyColor: "rgb(211, 238, 253)",
					titleFontSize: "1.2rem"
				},
				title: /*barchartTitle*/ ctx[36]
			},
			$$inline: true
		});

	barchartvdiv.$on("entered", /*onEnteredBar*/ ctx[52]);
	barchartvdiv.$on("exited", /*onExitedBar*/ ctx[53]);

	const block = {
		c: function create() {
			div0 = element("div");
			create_component(colorbinsdiv.$$.fragment);
			t = space();
			div1 = element("div");
			create_component(barchartvdiv.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div0 = claim_element(nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			claim_component(colorbinsdiv.$$.fragment, div0_nodes);
			div0_nodes.forEach(detach_dev);
			t = claim_space(nodes);
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			claim_component(barchartvdiv.$$.fragment, div1_nodes);
			div1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", "topbox svelte-lbyyak");
			add_location(div0, file, 472, 5, 12005);
			attr_dev(div1, "class", "content svelte-lbyyak");
			add_location(div1, file, 491, 5, 12414);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div0, anchor);
			mount_component(colorbinsdiv, div0, null);
			insert_dev(target, t, anchor);
			insert_dev(target, div1, anchor);
			mount_component(barchartvdiv, div1, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			const colorbinsdiv_changes = {};
			if (dirty[1] & /*colorBins*/ 4) colorbinsdiv_changes.bins = /*colorBins*/ ctx[33];

			if (dirty[1] & /*$_theme*/ 8192) colorbinsdiv_changes.theme = {
				backgroundColor: /*$_theme*/ ctx[44].colorWhite,
				backgroundOpacity: 0.5
			};

			if (dirty[0] & /*formatFn*/ 1073741824) colorbinsdiv_changes.ticksFormatFn = /*formatFn*/ ctx[30];
			colorbinsdiv.$set(colorbinsdiv_changes);
			const barchartvdiv_changes = {};
			if (dirty[1] & /*focusedKey*/ 512) barchartvdiv_changes.focusedKey = /*focusedKey*/ ctx[40];
			if (dirty[0] & /*formatFn*/ 1073741824) barchartvdiv_changes.formatFn = /*formatFn*/ ctx[30];
			if (dirty[1] & /*keyToLabel*/ 128) barchartvdiv_changes.keyToLabel = /*keyToLabel*/ ctx[38];
			if (dirty[0] & /*selectedKeys*/ 8) barchartvdiv_changes.selectedKeys = /*selectedKeys*/ ctx[3];

			if (dirty[0] & /*$_doFilterRegions, filteredItems, items*/ 448) barchartvdiv_changes.items = /*$_doFilterRegions*/ ctx[8]
			? /*filteredItems*/ ctx[7]
			: /*items*/ ctx[6];

			if (dirty[1] & /*keyToColorAll*/ 8) barchartvdiv_changes.keyToColor = /*keyToColorAll*/ ctx[34];
			if (dirty[1] & /*barchartRefs*/ 64) barchartvdiv_changes.refs = /*barchartRefs*/ ctx[37];
			if (dirty[1] & /*barchartTitle*/ 32) barchartvdiv_changes.title = /*barchartTitle*/ ctx[36];
			barchartvdiv.$set(barchartvdiv_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(colorbinsdiv.$$.fragment, local);
			transition_in(barchartvdiv.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(colorbinsdiv.$$.fragment, local);
			transition_out(barchartvdiv.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div0);
			destroy_component(colorbinsdiv);
			if (detaching) detach_dev(t);
			if (detaching) detach_dev(div1);
			destroy_component(barchartvdiv);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(472:4) {:else}",
		ctx
	});

	return block;
}

// (470:4) {#if noData}
function create_if_block_1(ctx) {
	let messageview;
	let current;

	messageview = new MessageView({
			props: { text: config.noDataMessage },
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
		p: noop$1,
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
		id: create_if_block_1.name,
		type: "if",
		source: "(470:4) {#if noData}",
		ctx
	});

	return block;
}

function create_fragment$1(ctx) {
	let div1;
	let header;
	let t;
	let div0;
	let current_block_type_index;
	let if_block;
	let div0_class_value;
	let div1_class_value;
	let current;

	header = new Header({
			props: {
				subtitle: /*subtitle*/ ctx[25],
				title: /*title*/ ctx[26]
			},
			$$inline: true
		});

	header.$on("click", toggleInfoModal);
	const if_block_creators = [create_if_block, create_else_block_3];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*$_isSmallScreen*/ ctx[4]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			div1 = element("div");
			create_component(header.$$.fragment);
			t = space();
			div0 = element("div");
			if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			claim_component(header.$$.fragment, div1_nodes);
			t = claim_space(div1_nodes);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			if_block.l(div0_nodes);
			div0_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", div0_class_value = "viewport " + /*$_viewsClasses*/ ctx[43] + " svelte-lbyyak");
			toggle_class(div0, "noData", /*noData*/ ctx[32]);
			add_location(div0, file, 377, 1, 9936);
			attr_dev(div1, "class", div1_class_value = "time_region_value_IdYear " + /*$_screenClasses*/ ctx[42] + " svelte-lbyyak");
			add_location(div1, file, 370, 0, 9812);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			mount_component(header, div1, null);
			append_dev(div1, t);
			append_dev(div1, div0);
			if_blocks[current_block_type_index].m(div0, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			const header_changes = {};
			if (dirty[0] & /*subtitle*/ 33554432) header_changes.subtitle = /*subtitle*/ ctx[25];
			if (dirty[0] & /*title*/ 67108864) header_changes.title = /*title*/ ctx[26];
			header.$set(header_changes);
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
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(div0, null);
			}

			if (!current || dirty[1] & /*$_viewsClasses*/ 4096 && div0_class_value !== (div0_class_value = "viewport " + /*$_viewsClasses*/ ctx[43] + " svelte-lbyyak")) {
				attr_dev(div0, "class", div0_class_value);
			}

			if (dirty[1] & /*$_viewsClasses, noData*/ 4098) {
				toggle_class(div0, "noData", /*noData*/ ctx[32]);
			}

			if (!current || dirty[1] & /*$_screenClasses*/ 2048 && div1_class_value !== (div1_class_value = "time_region_value_IdYear " + /*$_screenClasses*/ ctx[42] + " svelte-lbyyak")) {
				attr_dev(div1, "class", div1_class_value);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(header.$$.fragment, local);
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(header.$$.fragment, local);
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			destroy_component(header);
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

const defaultGray = "#f3f3f3";
const fetchingMessage = "Fetching boundaries...";
const legendBarThickness = 40;
const markerRadius = 4;
const labelsFontSize = 13;

function instance$1($$self, $$props, $$invalidate) {
	let api_doc_url;
	let api_type;
	let auth_provider;
	let availableYears;
	let data_date;
	let description;
	let endpoint_url;
	let is_experimental;
	let is_public;
	let query;
	let region;
	let schema;
	let source_name;
	let source_url;
	let subtitle;
	let title;
	let url;
	let warning;
	let year_extent;
	let getIndicatorFormat;
	let formatFn;
	let getRefFormatFn;
	let refFormatFn;
	let getIndicatorValue;
	let makeKeyToValue;
	let keyToValue;
	let makeItems;
	let legendHeight;
	let choroplethSafety;
	let yearData;
	let items;
	let filteredItems;
	let filteredData;
	let noData;
	let valueExtext;
	let colorScale;
	let colorBins;
	let makeKeyToColor;
	let keyToColorAll;
	let keyToColorFiltered;
	let labelUnit;
	let barchartTitle;
	let barchartRefs;
	let regionYearSpec;
	let keyToLabel;
	let regionId;
	let geometriesPath;
	let filterTopojson;
	let topojson;
	let geojson;
	let featuresIndex;
	let filteredGeojson;
	let choroplethInnerHeight;
	let choroplethInnerWidth;
	let baseProjection;
	let filterProjection;
	let projection;
	let showMap;
	let focusedKey;
	let POIsLayout;
	let $_isSmallScreen;

	let $_lookup,
		$$unsubscribe__lookup = noop$1,
		$$subscribe__lookup = () => ($$unsubscribe__lookup(), $$unsubscribe__lookup = subscribe(_lookup, $$value => $$invalidate(62, $_lookup = $$value)), _lookup);

	let $_selectedNUT2Ids;
	let $_preselectedNUTS2Ids;
	let $_doFilterRegions;
	let $_makeColorScale;
	let $_makeColorBins;
	let $_regionSettings;
	let $_hasValidKey;
	let $_getFeatureKey;
	let $_tooltip;
	let $_navFlags;
	let $_POIs;
	let $_screenClasses;
	let $_viewsClasses;
	let $_theme;
	let $_geoModal;
	let $_someUnselectedRegions;
	let $_infoModal;
	validate_store(_isSmallScreen, "_isSmallScreen");
	component_subscribe($$self, _isSmallScreen, $$value => $$invalidate(4, $_isSmallScreen = $$value));
	validate_store(_selectedNUT2Ids, "_selectedNUT2Ids");
	component_subscribe($$self, _selectedNUT2Ids, $$value => $$invalidate(70, $_selectedNUT2Ids = $$value));
	validate_store(_preselectedNUTS2Ids, "_preselectedNUTS2Ids");
	component_subscribe($$self, _preselectedNUTS2Ids, $$value => $$invalidate(71, $_preselectedNUTS2Ids = $$value));
	validate_store(_doFilterRegions, "_doFilterRegions");
	component_subscribe($$self, _doFilterRegions, $$value => $$invalidate(8, $_doFilterRegions = $$value));
	validate_store(_makeColorScale, "_makeColorScale");
	component_subscribe($$self, _makeColorScale, $$value => $$invalidate(75, $_makeColorScale = $$value));
	validate_store(_makeColorBins, "_makeColorBins");
	component_subscribe($$self, _makeColorBins, $$value => $$invalidate(76, $_makeColorBins = $$value));
	validate_store(_regionSettings, "_regionSettings");
	component_subscribe($$self, _regionSettings, $$value => $$invalidate(9, $_regionSettings = $$value));
	validate_store(_hasValidKey, "_hasValidKey");
	component_subscribe($$self, _hasValidKey, $$value => $$invalidate(83, $_hasValidKey = $$value));
	validate_store(_getFeatureKey, "_getFeatureKey");
	component_subscribe($$self, _getFeatureKey, $$value => $$invalidate(86, $_getFeatureKey = $$value));
	validate_store(_navFlags, "_navFlags");
	component_subscribe($$self, _navFlags, $$value => $$invalidate(92, $_navFlags = $$value));
	validate_store(_POIs, "_POIs");
	component_subscribe($$self, _POIs, $$value => $$invalidate(93, $_POIs = $$value));
	validate_store(_screenClasses, "_screenClasses");
	component_subscribe($$self, _screenClasses, $$value => $$invalidate(42, $_screenClasses = $$value));
	validate_store(_viewsClasses, "_viewsClasses");
	component_subscribe($$self, _viewsClasses, $$value => $$invalidate(43, $_viewsClasses = $$value));
	validate_store(_theme, "_theme");
	component_subscribe($$self, _theme, $$value => $$invalidate(44, $_theme = $$value));
	validate_store(_geoModal, "_geoModal");
	component_subscribe($$self, _geoModal, $$value => $$invalidate(45, $_geoModal = $$value));
	validate_store(_someUnselectedRegions, "_someUnselectedRegions");
	component_subscribe($$self, _someUnselectedRegions, $$value => $$invalidate(46, $_someUnselectedRegions = $$value));
	validate_store(_infoModal, "_infoModal");
	component_subscribe($$self, _infoModal, $$value => $$invalidate(47, $_infoModal = $$value));
	$$self.$$.on_destroy.push(() => $$unsubscribe__lookup());
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("U5Byearu5D", slots, []);
	const labelPadding = labelsFontSize / 2;
	const labelDx = markerRadius + labelPadding;
	let { _lookup = null } = $$props;
	validate_store(_lookup, "_lookup");
	$$subscribe__lookup();
	let { data = null } = $$props;
	let { id = null } = $$props;
	let { types = null } = $$props;
	let { year = null } = $$props;

	/* init */
	onMount(() => {
		setRoute("IdYear");
	});

	/* local vars */
	// bound
	let mapHeight;

	let mapWidth;

	// rest
	let fetchedTopojson;

	let selectedKeys = [];

	/* map tooltip */
	const _tooltip = writable({ isVisible: false });

	validate_store(_tooltip, "_tooltip");
	component_subscribe($$self, _tooltip, value => $$invalidate(12, $_tooltip = value));

	const makeTooltipStyle = event => {
		const { layerX: X, layerY: Y } = event;

		const x = X < mapWidth / 2
		? { key: "left", value: X + 20 }
		: { key: "right", value: mapWidth - X + 10 };

		const y = Y < mapHeight / 2
		? { key: "top", value: Y + 20 }
		: { key: "bottom", value: mapHeight - Y + 10 };

		return makeStyle({
			[x.key]: toPx(x.value),
			[y.key]: toPx(y.value),
			visibility: "visible"
		});
	};

	const onEnteredArea = ({ detail: areaId }) => {
		const hasValue = has(keyToValue, areaId);
		const shouldShowValue = $_doFilterRegions ? isIn(selectedKeys, areaId) : true;

		const value = shouldShowValue && hasValue
		? formatFn(keyToValue[areaId]) + (labelUnit ? ` ${labelUnit}` : "")
		: undefined;

		_tooltip.update(mergeObj({
			areaId,
			isVisible: true,
			regionLabel: keyToLabel[areaId],
			style: makeTooltipStyle(event),
			value
		}));
	};

	const onExitedArea = () => {
		_tooltip.update(mergeObj({
			isVisible: false,
			style: "visibility: hidden"
		}));
	};

	const onMousemoved = event => {
		$_tooltip.isVisible && _tooltip.update(mergeObj({ style: makeTooltipStyle(event) }));
	};

	/* barchart hovering */
	const onEnteredBar = ({ detail: { id: focusedBarKey } }) => {
		$$invalidate(40, focusedKey = focusedBarKey);
	};

	const onExitedBar = () => {
		$$invalidate(40, focusedKey = null);
	};

	/* settings handlers */
	const toggledFiltering = ({ detail }) => {
		set_store_value(_doFilterRegions, $_doFilterRegions = detail === "Filter", $_doFilterRegions);
	};

	const writable_props = ["_lookup", "data", "id", "types", "year"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<U5Byearu5D> was created with unknown prop '${key}'`);
	});

	function div1_elementresize_handler() {
		mapHeight = this.clientHeight;
		mapWidth = this.clientWidth;
		$$invalidate(1, mapHeight);
		$$invalidate(2, mapWidth);
	}

	function div0_elementresize_handler() {
		mapHeight = this.clientHeight;
		mapWidth = this.clientWidth;
		$$invalidate(1, mapHeight);
		$$invalidate(2, mapWidth);
	}

	$$self.$$set = $$props => {
		if ("_lookup" in $$props) $$subscribe__lookup($$invalidate(0, _lookup = $$props._lookup));
		if ("data" in $$props) $$invalidate(55, data = $$props.data);
		if ("id" in $$props) $$invalidate(56, id = $$props.id);
		if ("types" in $$props) $$invalidate(57, types = $$props.types);
		if ("year" in $$props) $$invalidate(58, year = $$props.year);
	};

	$$self.$capture_state = () => ({
		prune,
		makeTopoId,
		makeStyle,
		toPx,
		applyFnMap,
		getValue,
		keyValueArrayAverage,
		keyValueArrayToObject,
		mergeObj,
		transformPaths,
		extent,
		projectionFn,
		_,
		onMount,
		writable,
		defaultGeometry,
		BarchartVDiv,
		ChoroplethG,
		ColorBinsDiv,
		ColorBinsG,
		LoadingView,
		MessageView,
		GeoFilterModal,
		Header,
		InfoModal,
		InfoView,
		SettingsRow,
		SettingsView,
		_POIs,
		_isSmallScreen,
		_screenClasses,
		_doFilterRegions,
		_geoModal,
		_infoModal,
		hideGeoModal,
		hideInfoModal,
		toggleGeoModal,
		toggleInfoModal,
		_navFlags,
		_viewsClasses,
		setRoute,
		showView,
		_getFeatureKey,
		_hasValidKey,
		_preselectedNUTS2Ids,
		_regionSettings,
		_selectedNUT2Ids,
		_someUnselectedRegions,
		_availableYears,
		_selectedYear,
		_makeColorBins,
		_makeColorScale,
		_theme,
		config,
		getTopojson,
		makeGeojson,
		topoCache,
		getNutsId,
		isClientSide,
		makeGetIndicatorFormatOf,
		makeGetRefFormatOf,
		yearlyKeyToLabel,
		defaultGray,
		fetchingMessage,
		legendBarThickness,
		markerRadius,
		labelsFontSize,
		labelPadding,
		labelDx,
		_lookup,
		data,
		id,
		types,
		year,
		mapHeight,
		mapWidth,
		fetchedTopojson,
		selectedKeys,
		_tooltip,
		makeTooltipStyle,
		onEnteredArea,
		onExitedArea,
		onMousemoved,
		onEnteredBar,
		onExitedBar,
		toggledFiltering,
		$_isSmallScreen,
		api_doc_url,
		api_type,
		auth_provider,
		availableYears,
		data_date,
		description,
		endpoint_url,
		is_experimental,
		is_public,
		query,
		region,
		schema,
		source_name,
		source_url,
		subtitle,
		title,
		url,
		warning,
		year_extent,
		$_lookup,
		getIndicatorFormat,
		formatFn,
		getRefFormatFn,
		refFormatFn,
		getIndicatorValue,
		makeKeyToValue,
		keyToValue,
		yearData,
		makeItems,
		legendHeight,
		choroplethSafety,
		items,
		filteredItems,
		$_selectedNUT2Ids,
		$_preselectedNUTS2Ids,
		filteredData,
		$_doFilterRegions,
		noData,
		valueExtext,
		colorScale,
		$_makeColorScale,
		colorBins,
		$_makeColorBins,
		makeKeyToColor,
		keyToColorAll,
		keyToColorFiltered,
		labelUnit,
		barchartTitle,
		barchartRefs,
		regionYearSpec,
		keyToLabel,
		regionId,
		$_regionSettings,
		geometriesPath,
		filterTopojson,
		$_hasValidKey,
		topojson,
		geojson,
		featuresIndex,
		$_getFeatureKey,
		filteredGeojson,
		choroplethInnerHeight,
		choroplethInnerWidth,
		baseProjection,
		filterProjection,
		projection,
		showMap,
		focusedKey,
		$_tooltip,
		POIsLayout,
		$_navFlags,
		$_POIs,
		$_screenClasses,
		$_viewsClasses,
		$_theme,
		$_geoModal,
		$_someUnselectedRegions,
		$_infoModal
	});

	$$self.$inject_state = $$props => {
		if ("_lookup" in $$props) $$subscribe__lookup($$invalidate(0, _lookup = $$props._lookup));
		if ("data" in $$props) $$invalidate(55, data = $$props.data);
		if ("id" in $$props) $$invalidate(56, id = $$props.id);
		if ("types" in $$props) $$invalidate(57, types = $$props.types);
		if ("year" in $$props) $$invalidate(58, year = $$props.year);
		if ("mapHeight" in $$props) $$invalidate(1, mapHeight = $$props.mapHeight);
		if ("mapWidth" in $$props) $$invalidate(2, mapWidth = $$props.mapWidth);
		if ("fetchedTopojson" in $$props) $$invalidate(59, fetchedTopojson = $$props.fetchedTopojson);
		if ("selectedKeys" in $$props) $$invalidate(3, selectedKeys = $$props.selectedKeys);
		if ("api_doc_url" in $$props) $$invalidate(13, api_doc_url = $$props.api_doc_url);
		if ("api_type" in $$props) $$invalidate(14, api_type = $$props.api_type);
		if ("auth_provider" in $$props) $$invalidate(15, auth_provider = $$props.auth_provider);
		if ("availableYears" in $$props) $$invalidate(60, availableYears = $$props.availableYears);
		if ("data_date" in $$props) $$invalidate(16, data_date = $$props.data_date);
		if ("description" in $$props) $$invalidate(17, description = $$props.description);
		if ("endpoint_url" in $$props) $$invalidate(18, endpoint_url = $$props.endpoint_url);
		if ("is_experimental" in $$props) $$invalidate(19, is_experimental = $$props.is_experimental);
		if ("is_public" in $$props) $$invalidate(20, is_public = $$props.is_public);
		if ("query" in $$props) $$invalidate(21, query = $$props.query);
		if ("region" in $$props) $$invalidate(22, region = $$props.region);
		if ("schema" in $$props) $$invalidate(61, schema = $$props.schema);
		if ("source_name" in $$props) $$invalidate(23, source_name = $$props.source_name);
		if ("source_url" in $$props) $$invalidate(24, source_url = $$props.source_url);
		if ("subtitle" in $$props) $$invalidate(25, subtitle = $$props.subtitle);
		if ("title" in $$props) $$invalidate(26, title = $$props.title);
		if ("url" in $$props) $$invalidate(27, url = $$props.url);
		if ("warning" in $$props) $$invalidate(28, warning = $$props.warning);
		if ("year_extent" in $$props) $$invalidate(29, year_extent = $$props.year_extent);
		if ("getIndicatorFormat" in $$props) $$invalidate(63, getIndicatorFormat = $$props.getIndicatorFormat);
		if ("formatFn" in $$props) $$invalidate(30, formatFn = $$props.formatFn);
		if ("getRefFormatFn" in $$props) $$invalidate(64, getRefFormatFn = $$props.getRefFormatFn);
		if ("refFormatFn" in $$props) $$invalidate(65, refFormatFn = $$props.refFormatFn);
		if ("getIndicatorValue" in $$props) $$invalidate(66, getIndicatorValue = $$props.getIndicatorValue);
		if ("makeKeyToValue" in $$props) $$invalidate(67, makeKeyToValue = $$props.makeKeyToValue);
		if ("keyToValue" in $$props) keyToValue = $$props.keyToValue;
		if ("yearData" in $$props) $$invalidate(68, yearData = $$props.yearData);
		if ("makeItems" in $$props) $$invalidate(69, makeItems = $$props.makeItems);
		if ("legendHeight" in $$props) $$invalidate(31, legendHeight = $$props.legendHeight);
		if ("choroplethSafety" in $$props) $$invalidate(5, choroplethSafety = $$props.choroplethSafety);
		if ("items" in $$props) $$invalidate(6, items = $$props.items);
		if ("filteredItems" in $$props) $$invalidate(7, filteredItems = $$props.filteredItems);
		if ("filteredData" in $$props) $$invalidate(72, filteredData = $$props.filteredData);
		if ("noData" in $$props) $$invalidate(32, noData = $$props.noData);
		if ("valueExtext" in $$props) $$invalidate(73, valueExtext = $$props.valueExtext);
		if ("colorScale" in $$props) $$invalidate(74, colorScale = $$props.colorScale);
		if ("colorBins" in $$props) $$invalidate(33, colorBins = $$props.colorBins);
		if ("makeKeyToColor" in $$props) $$invalidate(77, makeKeyToColor = $$props.makeKeyToColor);
		if ("keyToColorAll" in $$props) $$invalidate(34, keyToColorAll = $$props.keyToColorAll);
		if ("keyToColorFiltered" in $$props) $$invalidate(35, keyToColorFiltered = $$props.keyToColorFiltered);
		if ("labelUnit" in $$props) $$invalidate(78, labelUnit = $$props.labelUnit);
		if ("barchartTitle" in $$props) $$invalidate(36, barchartTitle = $$props.barchartTitle);
		if ("barchartRefs" in $$props) $$invalidate(37, barchartRefs = $$props.barchartRefs);
		if ("regionYearSpec" in $$props) $$invalidate(79, regionYearSpec = $$props.regionYearSpec);
		if ("keyToLabel" in $$props) $$invalidate(38, keyToLabel = $$props.keyToLabel);
		if ("regionId" in $$props) $$invalidate(80, regionId = $$props.regionId);
		if ("geometriesPath" in $$props) $$invalidate(81, geometriesPath = $$props.geometriesPath);
		if ("filterTopojson" in $$props) $$invalidate(82, filterTopojson = $$props.filterTopojson);
		if ("topojson" in $$props) $$invalidate(10, topojson = $$props.topojson);
		if ("geojson" in $$props) $$invalidate(84, geojson = $$props.geojson);
		if ("featuresIndex" in $$props) $$invalidate(85, featuresIndex = $$props.featuresIndex);
		if ("filteredGeojson" in $$props) $$invalidate(87, filteredGeojson = $$props.filteredGeojson);
		if ("choroplethInnerHeight" in $$props) $$invalidate(88, choroplethInnerHeight = $$props.choroplethInnerHeight);
		if ("choroplethInnerWidth" in $$props) $$invalidate(89, choroplethInnerWidth = $$props.choroplethInnerWidth);
		if ("baseProjection" in $$props) $$invalidate(90, baseProjection = $$props.baseProjection);
		if ("filterProjection" in $$props) $$invalidate(91, filterProjection = $$props.filterProjection);
		if ("projection" in $$props) $$invalidate(11, projection = $$props.projection);
		if ("showMap" in $$props) $$invalidate(39, showMap = $$props.showMap);
		if ("focusedKey" in $$props) $$invalidate(40, focusedKey = $$props.focusedKey);
		if ("POIsLayout" in $$props) $$invalidate(41, POIsLayout = $$props.POIsLayout);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*$_isSmallScreen*/ 16) {
			/* reactive vars */
			// navigation
			$_isSmallScreen && hideGeoModal();
		}

		if ($$self.$$.dirty[0] & /*$_isSmallScreen*/ 16) {
			$_isSmallScreen && hideInfoModal();
		}

		if ($$self.$$.dirty[1] & /*id*/ 33554432) {
			id && showView("map");
		}

		if ($$self.$$.dirty[1] & /*id, year*/ 167772160) {
			id && year && hideInfoModal();
		}

		if ($$self.$$.dirty[1] & /*year*/ 134217728) {
			_selectedYear.set(Number(year));
		}

		if ($$self.$$.dirty[1] & /*id*/ 33554432 | $$self.$$.dirty[2] & /*$_lookup*/ 1) {
			$$invalidate(13, { api_doc_url, api_type, auth_provider, availableYears, data_date, description, endpoint_url, is_experimental, is_public, query, region, schema, source_name, source_url, subtitle, title, url, warning, year_extent } = $_lookup[id] || {}, api_doc_url, (($$invalidate(14, api_type), $$invalidate(62, $_lookup)), $$invalidate(56, id)), (($$invalidate(15, auth_provider), $$invalidate(62, $_lookup)), $$invalidate(56, id)), (($$invalidate(60, availableYears), $$invalidate(62, $_lookup)), $$invalidate(56, id)), (($$invalidate(16, data_date), $$invalidate(62, $_lookup)), $$invalidate(56, id)), (($$invalidate(17, description), $$invalidate(62, $_lookup)), $$invalidate(56, id)), (($$invalidate(18, endpoint_url), $$invalidate(62, $_lookup)), $$invalidate(56, id)), (($$invalidate(19, is_experimental), $$invalidate(62, $_lookup)), $$invalidate(56, id)), (($$invalidate(20, is_public), $$invalidate(62, $_lookup)), $$invalidate(56, id)), (($$invalidate(21, query), $$invalidate(62, $_lookup)), $$invalidate(56, id)), (($$invalidate(22, region), $$invalidate(62, $_lookup)), $$invalidate(56, id)), (($$invalidate(61, schema), $$invalidate(62, $_lookup)), $$invalidate(56, id)), (($$invalidate(23, source_name), $$invalidate(62, $_lookup)), $$invalidate(56, id)), (($$invalidate(24, source_url), $$invalidate(62, $_lookup)), $$invalidate(56, id)), (($$invalidate(25, subtitle), $$invalidate(62, $_lookup)), $$invalidate(56, id)), (($$invalidate(26, title), $$invalidate(62, $_lookup)), $$invalidate(56, id)), (($$invalidate(27, url), $$invalidate(62, $_lookup)), $$invalidate(56, id)), (($$invalidate(28, warning), $$invalidate(62, $_lookup)), $$invalidate(56, id)), (($$invalidate(29, year_extent), $$invalidate(62, $_lookup)), $$invalidate(56, id)));
		}

		if ($$self.$$.dirty[1] & /*availableYears*/ 536870912) {
			// can't as `_lookup` is a derived
			// $: data && _lookup.update(_.setPath(`${id}.data`, data));
			// update stores
			_availableYears.set(availableYears);
		}

		if ($$self.$$.dirty[1] & /*id*/ 33554432) {
			// utils
			$$invalidate(63, getIndicatorFormat = makeGetIndicatorFormatOf(id));
		}

		if ($$self.$$.dirty[2] & /*getIndicatorFormat, $_lookup*/ 3) {
			$$invalidate(30, formatFn = getIndicatorFormat($_lookup));
		}

		if ($$self.$$.dirty[1] & /*id*/ 33554432) {
			$$invalidate(64, getRefFormatFn = makeGetRefFormatOf(id));
		}

		if ($$self.$$.dirty[2] & /*getRefFormatFn, $_lookup*/ 5) {
			$$invalidate(65, refFormatFn = getRefFormatFn($_lookup));
		}

		if ($$self.$$.dirty[1] & /*id*/ 33554432) {
			$$invalidate(66, getIndicatorValue = getKey(id));
		}

		if ($$self.$$.dirty[2] & /*getIndicatorValue*/ 16) {
			$$invalidate(67, makeKeyToValue = pipe([indexBy(getNutsId), mapValuesWith(getIndicatorValue)]));
		}

		if ($$self.$$.dirty[1] & /*data, year*/ 150994944) {
			// selection
			// $: indicatorData = $_lookup[id].data; // FIXME
			$$invalidate(68, yearData = data && data.filter(obj => obj.year === year));
		}

		if ($$self.$$.dirty[2] & /*yearData, makeKeyToValue*/ 96) {
			keyToValue = yearData && makeKeyToValue(yearData);
		}

		if ($$self.$$.dirty[2] & /*getIndicatorValue*/ 16) {
			$$invalidate(69, makeItems = pipe([
				mapWith(applyFnMap({ key: getNutsId, value: getIndicatorValue })),
				sortWith([sorterDesc(getValue)])
			]));
		}

		if ($$self.$$.dirty[0] & /*mapHeight*/ 2) {
			// layout
			$$invalidate(31, legendHeight = mapHeight / 3);
		}

		if ($$self.$$.dirty[0] & /*$_isSmallScreen*/ 16) {
			$$invalidate(5, choroplethSafety = $_isSmallScreen
			? defaultGeometry
			: {
					...defaultGeometry,
					left: legendBarThickness * 2
				});
		}

		if ($$self.$$.dirty[2] & /*yearData, makeItems*/ 192) {
			$$invalidate(6, items = yearData && makeItems(yearData));
		}

		if ($$self.$$.dirty[0] & /*items*/ 64 | $$self.$$.dirty[2] & /*$_selectedNUT2Ids, $_preselectedNUTS2Ids*/ 768) {
			$$invalidate(7, filteredItems = filter(items, ({ key }) => isIn($_selectedNUT2Ids, key) || isIn($_preselectedNUTS2Ids, key)));
		}

		if ($$self.$$.dirty[0] & /*$_doFilterRegions*/ 256 | $$self.$$.dirty[2] & /*yearData, $_selectedNUT2Ids, $_preselectedNUTS2Ids*/ 832) {
			$$invalidate(72, filteredData = $_doFilterRegions
			? filter(yearData, ({ nuts_id }) => $_selectedNUT2Ids.includes(nuts_id) || $_preselectedNUTS2Ids.includes(nuts_id))
			: yearData);
		}

		if ($$self.$$.dirty[2] & /*filteredData*/ 1024) {
			$$invalidate(32, noData = filteredData.length === 0);
		}

		if ($$self.$$.dirty[2] & /*filteredData, getIndicatorValue*/ 1040) {
			// colors
			$$invalidate(73, valueExtext = filteredData.length && extent(filteredData, getIndicatorValue));
		}

		if ($$self.$$.dirty[2] & /*filteredData, $_makeColorScale, valueExtext*/ 11264) {
			$$invalidate(74, colorScale = filteredData.length && $_makeColorScale(valueExtext));
		}

		if ($$self.$$.dirty[2] & /*filteredData, $_makeColorBins, colorScale*/ 21504) {
			$$invalidate(33, colorBins = filteredData.length && $_makeColorBins(colorScale));
		}

		if ($$self.$$.dirty[2] & /*colorScale*/ 4096) {
			$$invalidate(77, makeKeyToColor = pipe([keyValueArrayToObject, mapValuesWith(colorScale)]));
		}

		if ($$self.$$.dirty[0] & /*items*/ 64 | $$self.$$.dirty[2] & /*filteredData, makeKeyToColor*/ 33792) {
			$$invalidate(34, keyToColorAll = filteredData.length && makeKeyToColor(items));
		}

		if ($$self.$$.dirty[0] & /*filteredItems*/ 128 | $$self.$$.dirty[2] & /*filteredData, makeKeyToColor*/ 33792) {
			$$invalidate(35, keyToColorFiltered = filteredData.length && makeKeyToColor(filteredItems));
		}

		if ($$self.$$.dirty[1] & /*schema, types*/ 1140850688) {
			// labels
			$$invalidate(78, labelUnit = schema.value.unit_string || schema.value.type && has(types, schema.value.type) && has(types[schema.value.type], "unit_string") && types[schema.value.type].unit_string);
		}

		if ($$self.$$.dirty[1] & /*schema*/ 1073741824 | $$self.$$.dirty[2] & /*labelUnit*/ 65536) {
			$$invalidate(36, barchartTitle = schema.value.label + (labelUnit ? ` [${labelUnit}]` : ""));
		}

		if ($$self.$$.dirty[0] & /*items*/ 64 | $$self.$$.dirty[2] & /*refFormatFn*/ 8) {
			$$invalidate(37, barchartRefs = [
				{
					key: "National average",
					keyAbbr: "Nat. avg.",
					value: keyValueArrayAverage(items),
					formatFn: refFormatFn
				}
			]);
		}

		if ($$self.$$.dirty[2] & /*yearData*/ 64) {
			// map
			$$invalidate(79, regionYearSpec = yearData && yearData[0].nuts_year_spec);
		}

		if ($$self.$$.dirty[2] & /*regionYearSpec*/ 131072) {
			$$invalidate(38, keyToLabel = regionYearSpec && yearlyKeyToLabel[regionYearSpec]);
		}

		if ($$self.$$.dirty[0] & /*$_regionSettings*/ 512 | $$self.$$.dirty[2] & /*regionYearSpec*/ 131072) {
			$$invalidate(80, regionId = regionYearSpec && makeTopoId({
				level: $_regionSettings.level,
				level0: $_regionSettings.level0,
				resolution: $_regionSettings.resolution,
				type: $_regionSettings.type,
				year: regionYearSpec
			}));
		}

		if ($$self.$$.dirty[0] & /*$_regionSettings*/ 512) {
			$$invalidate(81, geometriesPath = `objects.${$_regionSettings.objectId}.geometries`);
		}

		if ($$self.$$.dirty[2] & /*geometriesPath, $_hasValidKey*/ 2621440) {
			$$invalidate(82, filterTopojson = pipe([
				transformPaths({
					[geometriesPath]: filterWith($_hasValidKey)
				}),
				prune
			]));
		}

		if ($$self.$$.dirty[2] & /*regionId*/ 262144) {
			isClientSide && (async () => {
				$$invalidate(59, fetchedTopojson = await getTopojson(regionId));
			})();
		}

		if ($$self.$$.dirty[1] & /*fetchedTopojson*/ 268435456 | $$self.$$.dirty[2] & /*filterTopojson*/ 1048576) {
			$$invalidate(10, topojson = fetchedTopojson && filterTopojson(fetchedTopojson));
		}

		if ($$self.$$.dirty[0] & /*topojson, $_regionSettings*/ 1536 | $$self.$$.dirty[2] & /*regionId*/ 262144) {
			$$invalidate(84, geojson = topojson && makeGeojson({
				objectId: $_regionSettings.objectId,
				regionId,
				topojson
			}));
		}

		if ($$self.$$.dirty[2] & /*geojson, $_getFeatureKey*/ 20971520) {
			$$invalidate(85, featuresIndex = geojson && index(geojson.features, $_getFeatureKey));
		}

		if ($$self.$$.dirty[2] & /*$_preselectedNUTS2Ids, $_selectedNUT2Ids*/ 768) {
			// focus
			$$invalidate(3, selectedKeys = $_preselectedNUTS2Ids.concat($_selectedNUT2Ids));
		}

		if ($$self.$$.dirty[0] & /*selectedKeys*/ 8 | $$self.$$.dirty[2] & /*geojson, featuresIndex*/ 12582912) {
			$$invalidate(87, filteredGeojson = geojson && setPathIn(geojson, "features", reduce(
				selectedKeys,
				(acc, key) => {
					featuresIndex[key] && acc.push(featuresIndex[key]);
					return acc;
				},
				[]
			)));
		}

		if ($$self.$$.dirty[0] & /*mapHeight, choroplethSafety*/ 34) {
			$$invalidate(88, choroplethInnerHeight = mapHeight - choroplethSafety.top - choroplethSafety.bottom);
		}

		if ($$self.$$.dirty[0] & /*mapWidth, choroplethSafety*/ 36) {
			$$invalidate(89, choroplethInnerWidth = mapWidth - choroplethSafety.left - choroplethSafety.right);
		}

		if ($$self.$$.dirty[2] & /*geojson, choroplethInnerWidth, choroplethInnerHeight*/ 205520896) {
			$$invalidate(90, baseProjection = geojson && projectionFn().fitSize([choroplethInnerWidth, choroplethInnerHeight], geojson));
		}

		if ($$self.$$.dirty[2] & /*filteredGeojson, choroplethInnerWidth, choroplethInnerHeight*/ 234881024) {
			$$invalidate(91, filterProjection = filteredGeojson && filteredGeojson.features.length && projectionFn().fitSize([choroplethInnerWidth, choroplethInnerHeight], filteredGeojson));
		}

		if ($$self.$$.dirty[0] & /*$_doFilterRegions*/ 256 | $$self.$$.dirty[2] & /*filterProjection, baseProjection*/ 805306368) {
			$$invalidate(11, projection = $_doFilterRegions ? filterProjection : baseProjection);
		}

		if ($$self.$$.dirty[0] & /*mapHeight, mapWidth, topojson*/ 1030 | $$self.$$.dirty[2] & /*regionId*/ 262144) {
			// flags
			$$invalidate(39, showMap = mapHeight && mapWidth && topoCache[regionId] && topojson);
		}

		if ($$self.$$.dirty[0] & /*$_tooltip*/ 4096) {
			$$invalidate(40, focusedKey = $_tooltip.isVisible ? $_tooltip.areaId : undefined);
		}

		if ($$self.$$.dirty[0] & /*projection, choroplethSafety, mapWidth*/ 2084 | $$self.$$.dirty[2] & /*$_navFlags*/ 1073741824 | $$self.$$.dirty[3] & /*$_POIs*/ 1) {
			// POIs
			$$invalidate(41, POIsLayout = $_navFlags.showPOIs && projection && map$1($_POIs, obj => {
				const [x, y] = projection([obj.lng, obj.lat]);
				const X = x + choroplethSafety.left;
				const length = obj.name.length * labelsFontSize * 0.6;

				const isLeft = obj.isLeft && X - labelDx - length < choroplethSafety.left
				? false
				: X + labelDx + length > mapWidth - choroplethSafety.right
					? true
					: obj.isLeft;

				const dx = isLeft ? -labelDx : labelDx;

				const dy = obj.isBottom
				? 2 * markerRadius
				: obj.isTop ? -2 * markerRadius : 0;

				return {
					...obj,
					dx,
					dy,
					isLeft,
					X,
					Y: y + choroplethSafety.top
				};
			}));
		}
	};

	return [
		_lookup,
		mapHeight,
		mapWidth,
		selectedKeys,
		$_isSmallScreen,
		choroplethSafety,
		items,
		filteredItems,
		$_doFilterRegions,
		$_regionSettings,
		topojson,
		projection,
		$_tooltip,
		api_doc_url,
		api_type,
		auth_provider,
		data_date,
		description,
		endpoint_url,
		is_experimental,
		is_public,
		query,
		region,
		source_name,
		source_url,
		subtitle,
		title,
		url,
		warning,
		year_extent,
		formatFn,
		legendHeight,
		noData,
		colorBins,
		keyToColorAll,
		keyToColorFiltered,
		barchartTitle,
		barchartRefs,
		keyToLabel,
		showMap,
		focusedKey,
		POIsLayout,
		$_screenClasses,
		$_viewsClasses,
		$_theme,
		$_geoModal,
		$_someUnselectedRegions,
		$_infoModal,
		_tooltip,
		onEnteredArea,
		onExitedArea,
		onMousemoved,
		onEnteredBar,
		onExitedBar,
		toggledFiltering,
		data,
		id,
		types,
		year,
		fetchedTopojson,
		availableYears,
		schema,
		$_lookup,
		getIndicatorFormat,
		getRefFormatFn,
		refFormatFn,
		getIndicatorValue,
		makeKeyToValue,
		yearData,
		makeItems,
		$_selectedNUT2Ids,
		$_preselectedNUTS2Ids,
		filteredData,
		valueExtext,
		colorScale,
		$_makeColorScale,
		$_makeColorBins,
		makeKeyToColor,
		labelUnit,
		regionYearSpec,
		regionId,
		geometriesPath,
		filterTopojson,
		$_hasValidKey,
		geojson,
		featuresIndex,
		$_getFeatureKey,
		filteredGeojson,
		choroplethInnerHeight,
		choroplethInnerWidth,
		baseProjection,
		filterProjection,
		$_navFlags,
		$_POIs,
		div1_elementresize_handler,
		div0_elementresize_handler
	];
}

class U5Byearu5D$1 extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(
			this,
			options,
			instance$1,
			create_fragment$1,
			safe_not_equal,
			{
				_lookup: 0,
				data: 55,
				id: 56,
				types: 57,
				year: 58
			},
			[-1, -1, -1, -1]
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "U5Byearu5D",
			options,
			id: create_fragment$1.name
		});
	}

	get _lookup() {
		throw new Error("<U5Byearu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set _lookup(value) {
		throw new Error("<U5Byearu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get data() {
		throw new Error("<U5Byearu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set data(value) {
		throw new Error("<U5Byearu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get id() {
		throw new Error("<U5Byearu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set id(value) {
		throw new Error("<U5Byearu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get types() {
		throw new Error("<U5Byearu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set types(value) {
		throw new Error("<U5Byearu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get year() {
		throw new Error("<U5Byearu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set year(value) {
		throw new Error("<U5Byearu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/routes/compounds/time_region_value/[id]/[year].svelte generated by Svelte v3.38.3 */

function create_fragment(ctx) {
	let idyear;
	let current;

	idyear = new U5Byearu5D$1({
			props: {
				_lookup,
				data: /*data*/ ctx[0],
				id: /*id*/ ctx[1],
				types: data,
				year: /*year*/ ctx[2]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(idyear.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(idyear.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(idyear, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const idyear_changes = {};
			if (dirty & /*data*/ 1) idyear_changes.data = /*data*/ ctx[0];
			if (dirty & /*id*/ 2) idyear_changes.id = /*id*/ ctx[1];
			if (dirty & /*year*/ 4) idyear_changes.year = /*year*/ ctx[2];
			idyear.$set(idyear_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(idyear.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(idyear.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(idyear, detaching);
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

function preload({ params: { id, year } }) {
	return this.fetch(lookup[id].url).then(r => r.text()).then(parseCSV(id)).then(data => ({ data, id, year }));
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("U5Byearu5D", slots, []);
	let { data: data$1 } = $$props;
	let { id } = $$props;
	let { year } = $$props;
	const writable_props = ["data", "id", "year"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<U5Byearu5D> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("data" in $$props) $$invalidate(0, data$1 = $$props.data);
		if ("id" in $$props) $$invalidate(1, id = $$props.id);
		if ("year" in $$props) $$invalidate(2, year = $$props.year);
	};

	$$self.$capture_state = () => ({
		parseCSV,
		lookup,
		preload,
		IdYear: U5Byearu5D$1,
		types: data,
		_lookup,
		data: data$1,
		id,
		year
	});

	$$self.$inject_state = $$props => {
		if ("data" in $$props) $$invalidate(0, data$1 = $$props.data);
		if ("id" in $$props) $$invalidate(1, id = $$props.id);
		if ("year" in $$props) $$invalidate(2, year = $$props.year);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [data$1, id, year];
}

class U5Byearu5D extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { data: 0, id: 1, year: 2 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "U5Byearu5D",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*data*/ ctx[0] === undefined && !("data" in props)) {
			console.warn("<U5Byearu5D> was created without expected prop 'data'");
		}

		if (/*id*/ ctx[1] === undefined && !("id" in props)) {
			console.warn("<U5Byearu5D> was created without expected prop 'id'");
		}

		if (/*year*/ ctx[2] === undefined && !("year" in props)) {
			console.warn("<U5Byearu5D> was created without expected prop 'year'");
		}
	}

	get data() {
		throw new Error("<U5Byearu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set data(value) {
		throw new Error("<U5Byearu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get id() {
		throw new Error("<U5Byearu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set id(value) {
		throw new Error("<U5Byearu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get year() {
		throw new Error("<U5Byearu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set year(value) {
		throw new Error("<U5Byearu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export default U5Byearu5D;
export { preload };

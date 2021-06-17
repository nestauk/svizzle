import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, Q as createEventDispatcher, a0 as beforeUpdate, a1 as afterUpdate, e as element, t as text, f as claim_element, g as children, h as claim_text, b as detach_dev, j as attr_dev, k as add_location, l as insert_dev, m as append_dev, A as set_data_dev, a as space, c as claim_space, y as toggle_class, n as noop$1, Y as binding_callbacks, o as validate_each_argument, a2 as validate_each_keys, z as svg_element, r as destroy_each, D as empty, B as listen_dev, V as is_function, W as run_all, O as add_render_callback, P as add_resize_listener, a3 as update_keyed_each, a4 as destroy_block, a5 as set_style } from './client.ed49fe48.js';
import { p as pipe, W as isNotNull, X as index, Y as isIn, m as mapWith, I as sortWith, Z as getPath } from './defaultLocale.f3c5fc93.js';
import { l as linear, a as getKey, g as getValue, s as sliceString } from './ScreenGauge.8c0d1ef1.js';
import { d as makeMergeAppliedFnMap } from './linear.86b0ac46.js';
import { t as toPx, m as makeStyleVars } from './Info.aabe6ce3.js';
import { a as arrayMaxWith, w as arrayMinWith } from './Switch.c8812232.js';
import { u as adder, v as noop, e as abs, g as sqrt, w as tau, x as geoStream, y as boundsStream, z as identity, s as sin, h as atan2, b as asin, c as cos, A as projection, B as acos, f as epsilon, q as projectionFn, C as mercator, D as makeUpdateFeaturesProperty, o as topoToGeo, E as defaultGeometry } from './equalEarth.e33f330b.js';

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

var justCompare = compare;

/*
  primitives: value1 === value2
  functions: value1.toString == value2.toString
  arrays: if length, sequence and values of properties are identical
  objects: if length, names and values of properties are identical
  compare([[1, [2, 3]], [[1, [2, 3]]); // true
  compare([[1, [2, 3], 4], [[1, [2, 3]]); // false
  compare({a: 2, b: 3}, {a: 2, b: 3}); // true
  compare({a: 2, b: 3}, {b: 3, a: 2}); // true
  compare({a: 2, b: 3, c: 4}, {a: 2, b: 3}); // false
  compare({a: 2, b: 3}, {a: 2, b: 3, c: 4}); // false
  compare([[1, [2, {a: 4}], 4], [[1, [2, {a: 4}]]); // true
*/

function compare(value1, value2) {
  if (value1 === value2) {
    return true;
  }
  /* eslint-disable no-self-compare */
  // if both values are NaNs return true
  if (value1 !== value1 && value2 !== value2) {
    return true;
  }
  if ({}.toString.call(value1) != {}.toString.call(value2)) {
    return false;
  }
  if (value1 !== Object(value1)) {
    // non equal primitives
    return false;
  }
  if (!value1) {
    return false;
  }
  if (Array.isArray(value1)) {
    return compareArrays(value1, value2);
  }
  if ({}.toString.call(value1) == '[object Set]') {
    return compareArrays(Array.from(value1), Array.from(value2));
  }
  if ({}.toString.call(value1) == '[object Object]') {
    return compareObjects(value1, value2);
  } else {
    return compareNativeSubtypes(value1, value2);
  }
}

function compareNativeSubtypes(value1, value2) {
  // e.g. Function, RegExp, Date
  return value1.toString() === value2.toString();
}

function compareArrays(value1, value2) {
  var len = value1.length;
  if (len != value2.length) {
    return false;
  }
  var alike = true;
  for (var i = 0; i < len; i++) {
    if (!compare(value1[i], value2[i])) {
      alike = false;
      break;
    }
  }
  return alike;
}

function compareObjects(value1, value2) {
  var keys1 = Object.keys(value1).sort();
  var keys2 = Object.keys(value2).sort();
  var len = keys1.length;
  if (len != keys2.length) {
    return false;
  }
  for (var i = 0; i < len; i++) {
    var key1 = keys1[i];
    var key2 = keys2[i];
    if (!(key1 == key2 && compare(value1[key1], value2[key2]))) {
      return false;
    }
  }
  return true;
}

var areaSum = adder(),
    areaRingSum = adder(),
    x00$2,
    y00$2,
    x0$2,
    y0$2;

var areaStream = {
  point: noop,
  lineStart: noop,
  lineEnd: noop,
  polygonStart: function() {
    areaStream.lineStart = areaRingStart;
    areaStream.lineEnd = areaRingEnd;
  },
  polygonEnd: function() {
    areaStream.lineStart = areaStream.lineEnd = areaStream.point = noop;
    areaSum.add(abs(areaRingSum));
    areaRingSum.reset();
  },
  result: function() {
    var area = areaSum / 2;
    areaSum.reset();
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
  polygonStart: function() {
    centroidStream.lineStart = centroidRingStart;
    centroidStream.lineEnd = centroidRingEnd;
  },
  polygonEnd: function() {
    centroidStream.point = centroidPoint;
    centroidStream.lineStart = centroidLineStart;
    centroidStream.lineEnd = centroidLineEnd;
  },
  result: function() {
    var centroid = Z2 ? [X2 / Z2, Y2 / Z2]
        : Z1 ? [X1 / Z1, Y1 / Z1]
        : Z0 ? [X0 / Z0, Y0 / Z0]
        : [NaN, NaN];
    X0 = Y0 = Z0 =
    X1 = Y1 = Z1 =
    X2 = Y2 = Z2 = 0;
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
  var dx = x - x0$1, dy = y - y0$1, z = sqrt(dx * dx + dy * dy);
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

function PathContext(context) {
  this._context = context;
}

PathContext.prototype = {
  _radius: 4.5,
  pointRadius: function(_) {
    return this._radius = _, this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0) this._context.closePath();
    this._point = NaN;
  },
  point: function(x, y) {
    switch (this._point) {
      case 0: {
        this._context.moveTo(x, y);
        this._point = 1;
        break;
      }
      case 1: {
        this._context.lineTo(x, y);
        break;
      }
      default: {
        this._context.moveTo(x + this._radius, y);
        this._context.arc(x, y, this._radius, 0, tau);
        break;
      }
    }
  },
  result: noop
};

var lengthSum = adder(),
    lengthRing,
    x00,
    y00,
    x0,
    y0;

var lengthStream = {
  point: noop,
  lineStart: function() {
    lengthStream.point = lengthPointFirst;
  },
  lineEnd: function() {
    if (lengthRing) lengthPoint(x00, y00);
    lengthStream.point = noop;
  },
  polygonStart: function() {
    lengthRing = true;
  },
  polygonEnd: function() {
    lengthRing = null;
  },
  result: function() {
    var length = +lengthSum;
    lengthSum.reset();
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

function PathString() {
  this._string = [];
}

PathString.prototype = {
  _radius: 4.5,
  _circle: circle(4.5),
  pointRadius: function(_) {
    if ((_ = +_) !== this._radius) this._radius = _, this._circle = null;
    return this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0) this._string.push("Z");
    this._point = NaN;
  },
  point: function(x, y) {
    switch (this._point) {
      case 0: {
        this._string.push("M", x, ",", y);
        this._point = 1;
        break;
      }
      case 1: {
        this._string.push("L", x, ",", y);
        break;
      }
      default: {
        if (this._circle == null) this._circle = circle(this._radius);
        this._string.push("M", x, ",", y, this._circle);
        break;
      }
    }
  },
  result: function() {
    if (this._string.length) {
      var result = this._string.join("");
      this._string = [];
      return result;
    } else {
      return null;
    }
  }
};

function circle(radius) {
  return "m0," + radius
      + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius
      + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius
      + "z";
}

function geoPath(projection, context) {
  var pointRadius = 4.5,
      projectionStream,
      contextStream;

  function path(object) {
    if (object) {
      if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
      geoStream(object, projectionStream(contextStream));
    }
    return contextStream.result();
  }

  path.area = function(object) {
    geoStream(object, projectionStream(areaStream));
    return areaStream.result();
  };

  path.measure = function(object) {
    geoStream(object, projectionStream(lengthStream));
    return lengthStream.result();
  };

  path.bounds = function(object) {
    geoStream(object, projectionStream(boundsStream));
    return boundsStream.result();
  };

  path.centroid = function(object) {
    geoStream(object, projectionStream(centroidStream));
    return centroidStream.result();
  };

  path.projection = function(_) {
    return arguments.length ? (projectionStream = _ == null ? (projection = null, identity) : (projection = _).stream, path) : projection;
  };

  path.context = function(_) {
    if (!arguments.length) return context;
    contextStream = _ == null ? (context = null, new PathString) : new PathContext(context = _);
    if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
    return path;
  };

  path.pointRadius = function(_) {
    if (!arguments.length) return pointRadius;
    pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
    return path;
  };

  return path.projection(projection).context(context);
}

function azimuthalRaw(scale) {
  return function(x, y) {
    var cx = cos(x),
        cy = cos(y),
        k = scale(cx * cy);
    return [
      k * cy * sin(x),
      k * sin(y)
    ];
  }
}

function azimuthalInvert(angle) {
  return function(x, y) {
    var z = sqrt(x * x + y * y),
        c = angle(z),
        sc = sin(c),
        cc = cos(c);
    return [
      atan2(x * sc, z * cc),
      asin(z && y * sc / z)
    ];
  }
}

var azimuthalEqualAreaRaw = azimuthalRaw(function(cxcy) {
  return sqrt(2 / (1 + cxcy));
});

azimuthalEqualAreaRaw.invert = azimuthalInvert(function(z) {
  return 2 * asin(z / 2);
});

function azimuthalEqualArea() {
  return projection(azimuthalEqualAreaRaw)
      .scale(124.75)
      .clipAngle(180 - 1e-3);
}

var azimuthalEquidistantRaw = azimuthalRaw(function(c) {
  return (c = acos(c)) && c / sin(c);
});

azimuthalEquidistantRaw.invert = azimuthalInvert(function(z) {
  return z;
});

function azimuthalEquidistant() {
  return projection(azimuthalEquidistantRaw)
      .scale(79.4188)
      .clipAngle(180 - 1e-3);
}

function equirectangularRaw(lambda, phi) {
  return [lambda, phi];
}

equirectangularRaw.invert = equirectangularRaw;

function equirectangular() {
  return projection(equirectangularRaw)
      .scale(152.63);
}

function naturalEarth1Raw(lambda, phi) {
  var phi2 = phi * phi, phi4 = phi2 * phi2;
  return [
    lambda * (0.8707 - 0.131979 * phi2 + phi4 * (-0.013791 + phi4 * (0.003971 * phi2 - 0.001529 * phi4))),
    phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 0.005916 * phi4)))
  ];
}

naturalEarth1Raw.invert = function(x, y) {
  var phi = y, i = 25, delta;
  do {
    var phi2 = phi * phi, phi4 = phi2 * phi2;
    phi -= delta = (phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 0.005916 * phi4))) - y) /
        (1.007226 + phi2 * (0.015085 * 3 + phi4 * (-0.044475 * 7 + 0.028874 * 9 * phi2 - 0.005916 * 11 * phi4)));
  } while (abs(delta) > epsilon && --i > 0);
  return [
    x / (0.8707 + (phi2 = phi * phi) * (-0.131979 + phi2 * (-0.013791 + phi2 * phi2 * phi2 * (0.003971 - 0.001529 * phi2)))),
    phi
  ];
};

function naturalEarth1() {
  return projection(naturalEarth1Raw)
      .scale(175.295);
}

/* ../../components/barchart/src/BarchartVDiv.svelte generated by Svelte v3.38.2 */

const file$1 = "../../components/barchart/src/BarchartVDiv.svelte";

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[62] = list[i].barColor;
	child_ctx[63] = list[i].displayValue;
	child_ctx[64] = list[i].isLabelAlignedRight;
	child_ctx[65] = list[i].isValueAlignedRight;
	child_ctx[66] = list[i].key;
	child_ctx[67] = list[i].label;
	child_ctx[68] = list[i].labelX;
	child_ctx[69] = list[i].valueX;
	child_ctx[70] = list[i].x;
	child_ctx[71] = list[i].y;
	child_ctx[73] = i;
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[74] = list[i].color;
	child_ctx[75] = list[i].dasharray;
	child_ctx[76] = list[i].linewidth;
	child_ctx[70] = list[i].valueX;
	return child_ctx;
}

function get_each_context_2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[74] = list[i].color;
	child_ctx[75] = list[i].dasharray;
	child_ctx[79] = list[i].isAlignedRight;
	child_ctx[67] = list[i].label;
	child_ctx[76] = list[i].linewidth;
	child_ctx[80] = list[i].rectWidth;
	child_ctx[81] = list[i].textLength;
	child_ctx[82] = list[i].textX;
	child_ctx[69] = list[i].valueX;
	child_ctx[70] = list[i].x;
	child_ctx[71] = list[i].y;
	return child_ctx;
}

// (302:1) {#if title}
function create_if_block_4(ctx) {
	let header;
	let h2;
	let t;

	const block = {
		c: function create() {
			header = element("header");
			h2 = element("h2");
			t = text(/*title*/ ctx[8]);
			this.h();
		},
		l: function claim(nodes) {
			header = claim_element(nodes, "HEADER", { class: true });
			var header_nodes = children(header);
			h2 = claim_element(header_nodes, "H2", { class: true });
			var h2_nodes = children(h2);
			t = claim_text(h2_nodes, /*title*/ ctx[8]);
			h2_nodes.forEach(detach_dev);
			header_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(h2, "class", "svelte-s141rk");
			add_location(h2, file$1, 303, 3, 7930);
			attr_dev(header, "class", "svelte-s141rk");
			add_location(header, file$1, 302, 2, 7918);
		},
		m: function mount(target, anchor) {
			insert_dev(target, header, anchor);
			append_dev(header, h2);
			append_dev(h2, t);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*title*/ 256) set_data_dev(t, /*title*/ ctx[8]);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(header);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_4.name,
		type: "if",
		source: "(302:1) {#if title}",
		ctx
	});

	return block;
}

// (314:2) {:else}
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
	let if_block0 = /*refs*/ ctx[4].length && create_if_block_3(ctx);
	let if_block1 = /*refsLayout*/ ctx[23] && create_if_block_2$1(ctx);
	let each_value = /*barsLayout*/ ctx[16];
	validate_each_argument(each_value);
	const get_key = ctx => /*key*/ ctx[66];
	validate_each_keys(ctx, each_value, get_each_context$1, get_key);

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context$1(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block$1(key, child_ctx));
	}

	let if_block2 = /*crossesZero*/ ctx[14] && create_if_block_1$1(ctx);

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
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			svg = claim_element(div_nodes, "svg", { width: true, height: true }, 1);
			var svg_nodes = children(svg);
			rect = claim_element(svg_nodes, "rect", { class: true, width: true, height: true }, 1);
			children(rect).forEach(detach_dev);
			if (if_block1) if_block1.l(svg_nodes);
			g = claim_element(svg_nodes, "g", {}, 1);
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
			attr_dev(rect, "class", "bkg svelte-s141rk");
			attr_dev(rect, "width", /*width*/ ctx[10]);
			attr_dev(rect, "height", /*svgHeight*/ ctx[22]);
			add_location(rect, file$1, 371, 5, 9333);
			add_location(g, file$1, 394, 5, 9832);
			attr_dev(svg, "width", /*width*/ ctx[10]);
			attr_dev(svg, "height", /*svgHeight*/ ctx[22]);
			add_location(svg, file$1, 370, 4, 9295);
			attr_dev(div, "class", "scrollable svelte-s141rk");
			add_render_callback(() => /*div_elementresize_handler*/ ctx[54].call(div));
			toggle_class(div, "withrefs", /*refs*/ ctx[4] && /*refs*/ ctx[4].length);
			add_location(div, file$1, 362, 3, 9084);
		},
		m: function mount(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert_dev(target, t, anchor);
			insert_dev(target, div, anchor);
			append_dev(div, svg);
			append_dev(svg, rect);
			if (if_block1) if_block1.m(svg, null);
			append_dev(svg, g);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(g, null);
			}

			if (if_block2) if_block2.m(svg, null);
			div_resize_listener = add_resize_listener(div, /*div_elementresize_handler*/ ctx[54].bind(div));
			/*div_binding*/ ctx[55](div);

			if (!mounted) {
				dispose = listen_dev(div, "mouseleave", /*mouseleave_handler*/ ctx[56], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (/*refs*/ ctx[4].length) {
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

			if (dirty[0] & /*width*/ 1024) {
				attr_dev(rect, "width", /*width*/ ctx[10]);
			}

			if (dirty[0] & /*svgHeight*/ 4194304) {
				attr_dev(rect, "height", /*svgHeight*/ ctx[22]);
			}

			if (/*refsLayout*/ ctx[23]) {
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

			if (dirty[0] & /*itemHeight, barsLayout, isInteractive, selectedKeys, onClick, onMouseenter, onMouseleave, textY, barHeight, x0, barY, width, focusedKey, theme, hoveredKey*/ 120956131) {
				each_value = /*barsLayout*/ ctx[16];
				validate_each_argument(each_value);
				validate_each_keys(ctx, each_value, get_each_context$1, get_key);
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, g, destroy_block, create_each_block$1, null, get_each_context$1);
			}

			if (/*crossesZero*/ ctx[14]) {
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

			if (dirty[0] & /*width*/ 1024) {
				attr_dev(svg, "width", /*width*/ ctx[10]);
			}

			if (dirty[0] & /*svgHeight*/ 4194304) {
				attr_dev(svg, "height", /*svgHeight*/ ctx[22]);
			}

			if (dirty[0] & /*refs*/ 16) {
				toggle_class(div, "withrefs", /*refs*/ ctx[4] && /*refs*/ ctx[4].length);
			}
		},
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
			/*div_binding*/ ctx[55](null);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$1.name,
		type: "else",
		source: "(314:2) {:else}",
		ctx
	});

	return block;
}

// (308:2) {#if !items || items.length === 0}
function create_if_block$1(ctx) {
	let div;
	let span;
	let t;

	const block = {
		c: function create() {
			div = element("div");
			span = element("span");
			t = text(/*message*/ ctx[3]);
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			span = claim_element(div_nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			t = claim_text(span_nodes, /*message*/ ctx[3]);
			span_nodes.forEach(detach_dev);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(span, "class", "svelte-s141rk");
			add_location(span, file$1, 310, 4, 8063);
			attr_dev(div, "class", "message svelte-s141rk");
			add_location(div, file$1, 309, 3, 8037);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, span);
			append_dev(span, t);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*message*/ 8) set_data_dev(t, /*message*/ ctx[3]);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$1.name,
		type: "if",
		source: "(308:2) {#if !items || items.length === 0}",
		ctx
	});

	return block;
}

// (317:3) {#if refs.length}
function create_if_block_3(ctx) {
	let div;
	let svg;
	let each_value_2 = /*refsLayout*/ ctx[23];
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
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			svg = claim_element(div_nodes, "svg", { width: true, height: true }, 1);
			var svg_nodes = children(svg);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(svg_nodes);
			}

			svg_nodes.forEach(detach_dev);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(svg, "width", /*width*/ ctx[10]);
			attr_dev(svg, "height", /*refsHeight*/ ctx[12]);
			add_location(svg, file$1, 318, 5, 8180);
			attr_dev(div, "class", "refs svelte-s141rk");
			add_location(div, file$1, 317, 4, 8156);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, svg);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(svg, null);
			}
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*refsLayout, theme, refHeight, refsHeight*/ 8523840) {
				each_value_2 = /*refsLayout*/ ctx[23];
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

			if (dirty[0] & /*width*/ 1024) {
				attr_dev(svg, "width", /*width*/ ctx[10]);
			}

			if (dirty[0] & /*refsHeight*/ 4096) {
				attr_dev(svg, "height", /*refsHeight*/ ctx[12]);
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
		source: "(317:3) {#if refs.length}",
		ctx
	});

	return block;
}

// (320:6) {#each refsLayout as {        color,        dasharray,        isAlignedRight,        label,        linewidth,        rectWidth,        textLength,        textX,        valueX,        x,        y,       }}
function create_each_block_2(ctx) {
	let g;
	let rect;
	let rect_x_value;
	let rect_width_value;
	let text_1;
	let t_value = /*label*/ ctx[67] + "";
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
			g = claim_element(nodes, "g", { class: true, transform: true }, 1);
			var g_nodes = children(g);

			rect = claim_element(
				g_nodes,
				"rect",
				{
					x: true,
					width: true,
					height: true,
					class: true
				},
				1
			);

			children(rect).forEach(detach_dev);

			text_1 = claim_element(
				g_nodes,
				"text",
				{
					x: true,
					y: true,
					textLength: true,
					class: true
				},
				1
			);

			var text_1_nodes = children(text_1);
			t = claim_text(text_1_nodes, t_value);
			text_1_nodes.forEach(detach_dev);

			line = claim_element(
				g_nodes,
				"line",
				{
					class: true,
					stroke: true,
					"stroke-dasharray": true,
					"stroke-width": true,
					y1: true,
					y2: true
				},
				1
			);

			children(line).forEach(detach_dev);
			g_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "x", rect_x_value = /*x*/ ctx[70]);
			attr_dev(rect, "width", rect_width_value = /*rectWidth*/ ctx[80]);
			attr_dev(rect, "height", /*refHeight*/ ctx[17]);
			attr_dev(rect, "class", "svelte-s141rk");
			add_location(rect, file$1, 336, 8, 8517);
			attr_dev(text_1, "x", text_1_x_value = /*textX*/ ctx[82]);
			attr_dev(text_1, "y", text_1_y_value = /*refHeight*/ ctx[17] / 2);
			attr_dev(text_1, "textLength", text_1_textLength_value = /*textLength*/ ctx[81]);
			attr_dev(text_1, "class", "svelte-s141rk");
			toggle_class(text_1, "right", /*isAlignedRight*/ ctx[79]);
			add_location(text_1, file$1, 341, 8, 8610);
			attr_dev(line, "class", "ref");
			attr_dev(line, "stroke", line_stroke_value = /*color*/ ctx[74] || /*theme*/ ctx[6].refColor);
			attr_dev(line, "stroke-dasharray", line_stroke_dasharray_value = /*dasharray*/ ctx[75] || /*theme*/ ctx[6].refDasharray);
			attr_dev(line, "stroke-width", line_stroke_width_value = /*linewidth*/ ctx[76] || /*theme*/ ctx[6].refWidth);
			attr_dev(line, "y1", /*refHeight*/ ctx[17]);
			attr_dev(line, "y2", line_y__value = /*refsHeight*/ ctx[12] - /*y*/ ctx[71]);
			add_location(line, file$1, 347, 8, 8754);
			attr_dev(g, "class", "ref svelte-s141rk");
			attr_dev(g, "transform", g_transform_value = "translate(" + /*valueX*/ ctx[69] + ", " + /*y*/ ctx[71] + ")");
			add_location(g, file$1, 332, 7, 8432);
		},
		m: function mount(target, anchor) {
			insert_dev(target, g, anchor);
			append_dev(g, rect);
			append_dev(g, text_1);
			append_dev(text_1, t);
			append_dev(g, line);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*refsLayout*/ 8388608 && rect_x_value !== (rect_x_value = /*x*/ ctx[70])) {
				attr_dev(rect, "x", rect_x_value);
			}

			if (dirty[0] & /*refsLayout*/ 8388608 && rect_width_value !== (rect_width_value = /*rectWidth*/ ctx[80])) {
				attr_dev(rect, "width", rect_width_value);
			}

			if (dirty[0] & /*refHeight*/ 131072) {
				attr_dev(rect, "height", /*refHeight*/ ctx[17]);
			}

			if (dirty[0] & /*refsLayout*/ 8388608 && t_value !== (t_value = /*label*/ ctx[67] + "")) set_data_dev(t, t_value);

			if (dirty[0] & /*refsLayout*/ 8388608 && text_1_x_value !== (text_1_x_value = /*textX*/ ctx[82])) {
				attr_dev(text_1, "x", text_1_x_value);
			}

			if (dirty[0] & /*refHeight*/ 131072 && text_1_y_value !== (text_1_y_value = /*refHeight*/ ctx[17] / 2)) {
				attr_dev(text_1, "y", text_1_y_value);
			}

			if (dirty[0] & /*refsLayout*/ 8388608 && text_1_textLength_value !== (text_1_textLength_value = /*textLength*/ ctx[81])) {
				attr_dev(text_1, "textLength", text_1_textLength_value);
			}

			if (dirty[0] & /*refsLayout*/ 8388608) {
				toggle_class(text_1, "right", /*isAlignedRight*/ ctx[79]);
			}

			if (dirty[0] & /*refsLayout, theme*/ 8388672 && line_stroke_value !== (line_stroke_value = /*color*/ ctx[74] || /*theme*/ ctx[6].refColor)) {
				attr_dev(line, "stroke", line_stroke_value);
			}

			if (dirty[0] & /*refsLayout, theme*/ 8388672 && line_stroke_dasharray_value !== (line_stroke_dasharray_value = /*dasharray*/ ctx[75] || /*theme*/ ctx[6].refDasharray)) {
				attr_dev(line, "stroke-dasharray", line_stroke_dasharray_value);
			}

			if (dirty[0] & /*refsLayout, theme*/ 8388672 && line_stroke_width_value !== (line_stroke_width_value = /*linewidth*/ ctx[76] || /*theme*/ ctx[6].refWidth)) {
				attr_dev(line, "stroke-width", line_stroke_width_value);
			}

			if (dirty[0] & /*refHeight*/ 131072) {
				attr_dev(line, "y1", /*refHeight*/ ctx[17]);
			}

			if (dirty[0] & /*refsHeight, refsLayout*/ 8392704 && line_y__value !== (line_y__value = /*refsHeight*/ ctx[12] - /*y*/ ctx[71])) {
				attr_dev(line, "y2", line_y__value);
			}

			if (dirty[0] & /*refsLayout*/ 8388608 && g_transform_value !== (g_transform_value = "translate(" + /*valueX*/ ctx[69] + ", " + /*y*/ ctx[71] + ")")) {
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
		source: "(320:6) {#each refsLayout as {        color,        dasharray,        isAlignedRight,        label,        linewidth,        rectWidth,        textLength,        textX,        valueX,        x,        y,       }}",
		ctx
	});

	return block;
}

// (375:5) {#if refsLayout}
function create_if_block_2$1(ctx) {
	let each_1_anchor;
	let each_value_1 = /*refsLayout*/ ctx[23];
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
				each_blocks[i].m(target, anchor);
			}

			insert_dev(target, each_1_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*refsLayout, theme, svgHeight*/ 12582976) {
				each_value_1 = /*refsLayout*/ ctx[23];
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
		source: "(375:5) {#if refsLayout}",
		ctx
	});

	return block;
}

// (376:6) {#each refsLayout as {        color,        dasharray,        linewidth,        valueX: x,       }}
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
			line = claim_element(
				nodes,
				"line",
				{
					class: true,
					stroke: true,
					"stroke-dasharray": true,
					"stroke-width": true,
					x1: true,
					x2: true,
					y2: true
				},
				1
			);

			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line, "class", "ref");
			attr_dev(line, "stroke", line_stroke_value = /*color*/ ctx[74] || /*theme*/ ctx[6].refColor);
			attr_dev(line, "stroke-dasharray", line_stroke_dasharray_value = /*dasharray*/ ctx[75] || /*theme*/ ctx[6].refDasharray);
			attr_dev(line, "stroke-width", line_stroke_width_value = /*linewidth*/ ctx[76] || /*theme*/ ctx[6].refWidth);
			attr_dev(line, "x1", line_x__value = /*x*/ ctx[70]);
			attr_dev(line, "x2", line_x__value_1 = /*x*/ ctx[70]);
			attr_dev(line, "y2", /*svgHeight*/ ctx[22]);
			add_location(line, file$1, 381, 7, 9542);
		},
		m: function mount(target, anchor) {
			insert_dev(target, line, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*refsLayout, theme*/ 8388672 && line_stroke_value !== (line_stroke_value = /*color*/ ctx[74] || /*theme*/ ctx[6].refColor)) {
				attr_dev(line, "stroke", line_stroke_value);
			}

			if (dirty[0] & /*refsLayout, theme*/ 8388672 && line_stroke_dasharray_value !== (line_stroke_dasharray_value = /*dasharray*/ ctx[75] || /*theme*/ ctx[6].refDasharray)) {
				attr_dev(line, "stroke-dasharray", line_stroke_dasharray_value);
			}

			if (dirty[0] & /*refsLayout, theme*/ 8388672 && line_stroke_width_value !== (line_stroke_width_value = /*linewidth*/ ctx[76] || /*theme*/ ctx[6].refWidth)) {
				attr_dev(line, "stroke-width", line_stroke_width_value);
			}

			if (dirty[0] & /*refsLayout*/ 8388608 && line_x__value !== (line_x__value = /*x*/ ctx[70])) {
				attr_dev(line, "x1", line_x__value);
			}

			if (dirty[0] & /*refsLayout*/ 8388608 && line_x__value_1 !== (line_x__value_1 = /*x*/ ctx[70])) {
				attr_dev(line, "x2", line_x__value_1);
			}

			if (dirty[0] & /*svgHeight*/ 4194304) {
				attr_dev(line, "y2", /*svgHeight*/ ctx[22]);
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
		source: "(376:6) {#each refsLayout as {        color,        dasharray,        linewidth,        valueX: x,       }}",
		ctx
	});

	return block;
}

// (396:6) {#each barsLayout as {        barColor,        displayValue,        isLabelAlignedRight,        isValueAlignedRight,        key,        label,        labelX,        valueX,        x,        y       }
function create_each_block$1(key_1, ctx) {
	let g;
	let rect;
	let rect_fill_value;
	let line;
	let line_stroke_value;
	let line_x__value;
	let text0;
	let t0_value = /*label*/ ctx[67] + "";
	let t0;
	let text0_x_value;
	let text1;
	let t1_value = /*displayValue*/ ctx[63] + "";
	let t1;
	let text1_x_value;
	let g_transform_value;
	let mounted;
	let dispose;

	const block = {
		key: key_1,
		first: null,
		c: function create() {
			g = svg_element("g");
			rect = svg_element("rect");
			line = svg_element("line");
			text0 = svg_element("text");
			t0 = text(t0_value);
			text1 = svg_element("text");
			t1 = text(t1_value);
			this.h();
		},
		l: function claim(nodes) {
			g = claim_element(nodes, "g", { class: true, transform: true }, 1);
			var g_nodes = children(g);
			rect = claim_element(g_nodes, "rect", { width: true, fill: true, height: true }, 1);
			children(rect).forEach(detach_dev);

			line = claim_element(
				g_nodes,
				"line",
				{
					stroke: true,
					"stroke-width": true,
					x1: true,
					x2: true,
					y1: true,
					y2: true,
					class: true
				},
				1
			);

			children(line).forEach(detach_dev);
			text0 = claim_element(g_nodes, "text", { class: true, x: true, y: true }, 1);
			var text0_nodes = children(text0);
			t0 = claim_text(text0_nodes, t0_value);
			text0_nodes.forEach(detach_dev);
			text1 = claim_element(g_nodes, "text", { class: true, x: true, y: true }, 1);
			var text1_nodes = children(text1);
			t1 = claim_text(text1_nodes, t1_value);
			text1_nodes.forEach(detach_dev);
			g_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "width", /*width*/ ctx[10]);

			attr_dev(rect, "fill", rect_fill_value = /*key*/ ctx[66] === /*focusedKey*/ ctx[7]
			? /*theme*/ ctx[6].focusedKeyColor
			: /*key*/ ctx[66] === /*hoveredKey*/ ctx[18]
				? /*theme*/ ctx[6].hoverColor
				: transparentColor);

			attr_dev(rect, "height", /*itemHeight*/ ctx[13]);
			add_location(rect, file$1, 416, 8, 10424);
			attr_dev(line, "stroke", line_stroke_value = /*barColor*/ ctx[62]);
			attr_dev(line, "stroke-width", /*barHeight*/ ctx[0]);
			attr_dev(line, "x1", /*x0*/ ctx[15]);
			attr_dev(line, "x2", line_x__value = /*x*/ ctx[70]);
			attr_dev(line, "y1", /*barY*/ ctx[20]);
			attr_dev(line, "y2", /*barY*/ ctx[20]);
			attr_dev(line, "class", "svelte-s141rk");
			add_location(line, file$1, 426, 8, 10665);
			attr_dev(text0, "class", "label svelte-s141rk");
			attr_dev(text0, "x", text0_x_value = /*labelX*/ ctx[68]);
			attr_dev(text0, "y", /*textY*/ ctx[21]);
			toggle_class(text0, "right", /*isLabelAlignedRight*/ ctx[64]);
			add_location(text0, file$1, 434, 8, 10822);
			attr_dev(text1, "class", "value svelte-s141rk");
			attr_dev(text1, "x", text1_x_value = /*valueX*/ ctx[69]);
			attr_dev(text1, "y", /*textY*/ ctx[21]);
			toggle_class(text1, "right", /*isValueAlignedRight*/ ctx[65]);
			add_location(text1, file$1, 440, 8, 10965);
			attr_dev(g, "class", "item svelte-s141rk");
			attr_dev(g, "transform", g_transform_value = "translate(0, " + /*itemHeight*/ ctx[13] * /*index*/ ctx[73] + ")");
			toggle_class(g, "clickable", /*isInteractive*/ ctx[1]);
			toggle_class(g, "deselected", /*selectedKeys*/ ctx[5].length && !isIn(/*selectedKeys*/ ctx[5], /*key*/ ctx[66]));
			add_location(g, file$1, 407, 7, 10063);
			this.first = g;
		},
		m: function mount(target, anchor) {
			insert_dev(target, g, anchor);
			append_dev(g, rect);
			append_dev(g, line);
			append_dev(g, text0);
			append_dev(text0, t0);
			append_dev(g, text1);
			append_dev(text1, t1);

			if (!mounted) {
				dispose = [
					listen_dev(
						g,
						"click",
						function () {
							if (is_function(/*isInteractive*/ ctx[1] && /*onClick*/ ctx[24](/*key*/ ctx[66]))) (/*isInteractive*/ ctx[1] && /*onClick*/ ctx[24](/*key*/ ctx[66])).apply(this, arguments);
						},
						false,
						false,
						false
					),
					listen_dev(
						g,
						"mouseenter",
						function () {
							if (is_function(/*onMouseenter*/ ctx[25](/*key*/ ctx[66]))) /*onMouseenter*/ ctx[25](/*key*/ ctx[66]).apply(this, arguments);
						},
						false,
						false,
						false
					),
					listen_dev(
						g,
						"mouseleave",
						function () {
							if (is_function(/*isInteractive*/ ctx[1] && /*onMouseleave*/ ctx[26](/*key*/ ctx[66]))) (/*isInteractive*/ ctx[1] && /*onMouseleave*/ ctx[26](/*key*/ ctx[66])).apply(this, arguments);
						},
						false,
						false,
						false
					)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty[0] & /*width*/ 1024) {
				attr_dev(rect, "width", /*width*/ ctx[10]);
			}

			if (dirty[0] & /*barsLayout, focusedKey, theme, hoveredKey*/ 327872 && rect_fill_value !== (rect_fill_value = /*key*/ ctx[66] === /*focusedKey*/ ctx[7]
			? /*theme*/ ctx[6].focusedKeyColor
			: /*key*/ ctx[66] === /*hoveredKey*/ ctx[18]
				? /*theme*/ ctx[6].hoverColor
				: transparentColor)) {
				attr_dev(rect, "fill", rect_fill_value);
			}

			if (dirty[0] & /*itemHeight*/ 8192) {
				attr_dev(rect, "height", /*itemHeight*/ ctx[13]);
			}

			if (dirty[0] & /*barsLayout*/ 65536 && line_stroke_value !== (line_stroke_value = /*barColor*/ ctx[62])) {
				attr_dev(line, "stroke", line_stroke_value);
			}

			if (dirty[0] & /*barHeight*/ 1) {
				attr_dev(line, "stroke-width", /*barHeight*/ ctx[0]);
			}

			if (dirty[0] & /*x0*/ 32768) {
				attr_dev(line, "x1", /*x0*/ ctx[15]);
			}

			if (dirty[0] & /*barsLayout*/ 65536 && line_x__value !== (line_x__value = /*x*/ ctx[70])) {
				attr_dev(line, "x2", line_x__value);
			}

			if (dirty[0] & /*barY*/ 1048576) {
				attr_dev(line, "y1", /*barY*/ ctx[20]);
			}

			if (dirty[0] & /*barY*/ 1048576) {
				attr_dev(line, "y2", /*barY*/ ctx[20]);
			}

			if (dirty[0] & /*barsLayout*/ 65536 && t0_value !== (t0_value = /*label*/ ctx[67] + "")) set_data_dev(t0, t0_value);

			if (dirty[0] & /*barsLayout*/ 65536 && text0_x_value !== (text0_x_value = /*labelX*/ ctx[68])) {
				attr_dev(text0, "x", text0_x_value);
			}

			if (dirty[0] & /*textY*/ 2097152) {
				attr_dev(text0, "y", /*textY*/ ctx[21]);
			}

			if (dirty[0] & /*barsLayout*/ 65536) {
				toggle_class(text0, "right", /*isLabelAlignedRight*/ ctx[64]);
			}

			if (dirty[0] & /*barsLayout*/ 65536 && t1_value !== (t1_value = /*displayValue*/ ctx[63] + "")) set_data_dev(t1, t1_value);

			if (dirty[0] & /*barsLayout*/ 65536 && text1_x_value !== (text1_x_value = /*valueX*/ ctx[69])) {
				attr_dev(text1, "x", text1_x_value);
			}

			if (dirty[0] & /*textY*/ 2097152) {
				attr_dev(text1, "y", /*textY*/ ctx[21]);
			}

			if (dirty[0] & /*barsLayout*/ 65536) {
				toggle_class(text1, "right", /*isValueAlignedRight*/ ctx[65]);
			}

			if (dirty[0] & /*itemHeight, barsLayout*/ 73728 && g_transform_value !== (g_transform_value = "translate(0, " + /*itemHeight*/ ctx[13] * /*index*/ ctx[73] + ")")) {
				attr_dev(g, "transform", g_transform_value);
			}

			if (dirty[0] & /*isInteractive*/ 2) {
				toggle_class(g, "clickable", /*isInteractive*/ ctx[1]);
			}

			if (dirty[0] & /*selectedKeys, barsLayout*/ 65568) {
				toggle_class(g, "deselected", /*selectedKeys*/ ctx[5].length && !isIn(/*selectedKeys*/ ctx[5], /*key*/ ctx[66]));
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
		source: "(396:6) {#each barsLayout as {        barColor,        displayValue,        isLabelAlignedRight,        isValueAlignedRight,        key,        label,        labelX,        valueX,        x,        y       }",
		ctx
	});

	return block;
}

// (452:5) {#if crossesZero}
function create_if_block_1$1(ctx) {
	let line;
	let line_stroke_value;

	const block = {
		c: function create() {
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			line = claim_element(
				nodes,
				"line",
				{
					stroke: true,
					x1: true,
					x2: true,
					y2: true
				},
				1
			);

			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line, "stroke", line_stroke_value = /*theme*/ ctx[6].axisColor);
			attr_dev(line, "x1", /*x0*/ ctx[15]);
			attr_dev(line, "x2", /*x0*/ ctx[15]);
			attr_dev(line, "y2", /*svgHeight*/ ctx[22]);
			add_location(line, file$1, 452, 6, 11192);
		},
		m: function mount(target, anchor) {
			insert_dev(target, line, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*theme*/ 64 && line_stroke_value !== (line_stroke_value = /*theme*/ ctx[6].axisColor)) {
				attr_dev(line, "stroke", line_stroke_value);
			}

			if (dirty[0] & /*x0*/ 32768) {
				attr_dev(line, "x1", /*x0*/ ctx[15]);
			}

			if (dirty[0] & /*x0*/ 32768) {
				attr_dev(line, "x2", /*x0*/ ctx[15]);
			}

			if (dirty[0] & /*svgHeight*/ 4194304) {
				attr_dev(line, "y2", /*svgHeight*/ ctx[22]);
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
		source: "(452:5) {#if crossesZero}",
		ctx
	});

	return block;
}

function create_fragment$1(ctx) {
	let div;
	let t;
	let main;
	let if_block0 = /*title*/ ctx[8] && create_if_block_4(ctx);

	function select_block_type(ctx, dirty) {
		if (!/*items*/ ctx[2] || /*items*/ ctx[2].length === 0) return create_if_block$1;
		return create_else_block$1;
	}

	let current_block_type = select_block_type(ctx);
	let if_block1 = current_block_type(ctx);

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
			div = claim_element(nodes, "DIV", { style: true, class: true });
			var div_nodes = children(div);
			if (if_block0) if_block0.l(div_nodes);
			t = claim_space(div_nodes);
			main = claim_element(div_nodes, "MAIN", { class: true });
			var main_nodes = children(main);
			if_block1.l(main_nodes);
			main_nodes.forEach(detach_dev);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(main, "class", "svelte-s141rk");
			toggle_class(main, "titled", /*title*/ ctx[8]);
			add_location(main, file$1, 306, 1, 7967);
			attr_dev(div, "style", /*style*/ ctx[19]);
			attr_dev(div, "class", "BarchartVDiv svelte-s141rk");
			add_location(div, file$1, 297, 0, 7865);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			if (if_block0) if_block0.m(div, null);
			append_dev(div, t);
			append_dev(div, main);
			if_block1.m(main, null);
		},
		p: function update(ctx, dirty) {
			if (/*title*/ ctx[8]) {
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

			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block1) {
				if_block1.p(ctx, dirty);
			} else {
				if_block1.d(1);
				if_block1 = current_block_type(ctx);

				if (if_block1) {
					if_block1.c();
					if_block1.m(main, null);
				}
			}

			if (dirty[0] & /*title*/ 256) {
				toggle_class(main, "titled", /*title*/ ctx[8]);
			}

			if (dirty[0] & /*style*/ 524288) {
				attr_dev(div, "style", /*style*/ ctx[19]);
			}
		},
		i: noop$1,
		o: noop$1,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (if_block0) if_block0.d();
			if_block1.d();
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

const transparentColor = "rgba(0,0,0,0)";

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
	let focusedY;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("BarchartVDiv", slots, []);
	const dispatch = createEventDispatcher();
	const sortByValue = sortWith([getValue]);
	const augmentTheme = makeMergeAppliedFnMap({ paddingPx: pipe([x => x.padding, toPx]) });

	const defaultTheme = {
		// exposed but undocumented
		backgroundOpacity: 1,
		// exposed and documented
		axisColor: "lightgrey",
		backgroundColor: transparentColor,
		barDefaultColor: "black",
		deselectedOpacity: 0.25,
		focusedKeyColor: "rgba(0, 0, 0, 0.1)",
		fontSize: 14,
		headerHeight: "2em",
		hoverColor: "rgba(0, 0, 0, 0.05)",
		messageColor: "black",
		messageFontSize: "1rem",
		padding: 10,
		refColor: "grey",
		refDasharray: "4 4",
		refWidth: 0.5,
		textColor: "grey",
		titleFontSize: "1.5em"
	};

	let { barHeight = 4 } = $$props;
	let { focusedKey = null } = $$props;
	let { formatFn = null } = $$props;
	let { isInteractive = false } = $$props;
	let { items = [] } = $$props; // {key, value}[]
	let { keyToColor = null } = $$props;
	let { keyToColorFn = null } = $$props;
	let { keyToLabel = null } = $$props;
	let { keyToLabelFn = null } = $$props;
	let { message = null } = $$props;
	let { refs = [] } = $$props;
	let { selectedKeys = [] } = $$props;
	let { shouldResetScroll = false } = $$props;
	let { shouldScrollToFocusedKey = false } = $$props;
	let { theme = null } = $$props;
	let { title = null } = $$props;
	let { valueAccessor = null } = $$props;
	let height;
	let hoveredKey;
	let width;

	/* scroll */
	let previousItems;

	let scrollable;
	let wasNotResettingScroll;

	beforeUpdate(() => {
		$$invalidate(35, wasNotResettingScroll = !shouldResetScroll);
	});

	afterUpdate(() => {
		if (shouldResetScroll && items && items.length && !justCompare(previousItems, items) && scrollable) {
			$$invalidate(11, scrollable.scrollTop = 0, scrollable);
			previousItems = items;
		}
	});

	/* events */
	const onClick = key => () => {
		dispatch("clicked", { id: key });
	};

	const onMouseenter = key => () => {
		$$invalidate(18, hoveredKey = key);
		isInteractive && dispatch("entered", { id: key });
	};

	const onMouseleave = key => () => {
		dispatch("exited", { id: key });
	};

	const writable_props = [
		"barHeight",
		"focusedKey",
		"formatFn",
		"isInteractive",
		"items",
		"keyToColor",
		"keyToColorFn",
		"keyToLabel",
		"keyToLabelFn",
		"message",
		"refs",
		"selectedKeys",
		"shouldResetScroll",
		"shouldScrollToFocusedKey",
		"theme",
		"title",
		"valueAccessor"
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<BarchartVDiv> was created with unknown prop '${key}'`);
	});

	function div_elementresize_handler() {
		height = this.clientHeight;
		width = this.clientWidth;
		$$invalidate(9, height);
		$$invalidate(10, width);
	}

	function div_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			scrollable = $$value;
			(($$invalidate(11, scrollable), $$invalidate(35, wasNotResettingScroll)), $$invalidate(27, shouldResetScroll));
		});
	}

	const mouseleave_handler = () => {
		$$invalidate(18, hoveredKey = null);
	};

	$$self.$$set = $$props => {
		if ("barHeight" in $$props) $$invalidate(0, barHeight = $$props.barHeight);
		if ("focusedKey" in $$props) $$invalidate(7, focusedKey = $$props.focusedKey);
		if ("formatFn" in $$props) $$invalidate(29, formatFn = $$props.formatFn);
		if ("isInteractive" in $$props) $$invalidate(1, isInteractive = $$props.isInteractive);
		if ("items" in $$props) $$invalidate(2, items = $$props.items);
		if ("keyToColor" in $$props) $$invalidate(30, keyToColor = $$props.keyToColor);
		if ("keyToColorFn" in $$props) $$invalidate(31, keyToColorFn = $$props.keyToColorFn);
		if ("keyToLabel" in $$props) $$invalidate(32, keyToLabel = $$props.keyToLabel);
		if ("keyToLabelFn" in $$props) $$invalidate(33, keyToLabelFn = $$props.keyToLabelFn);
		if ("message" in $$props) $$invalidate(3, message = $$props.message);
		if ("refs" in $$props) $$invalidate(4, refs = $$props.refs);
		if ("selectedKeys" in $$props) $$invalidate(5, selectedKeys = $$props.selectedKeys);
		if ("shouldResetScroll" in $$props) $$invalidate(27, shouldResetScroll = $$props.shouldResetScroll);
		if ("shouldScrollToFocusedKey" in $$props) $$invalidate(34, shouldScrollToFocusedKey = $$props.shouldScrollToFocusedKey);
		if ("theme" in $$props) $$invalidate(6, theme = $$props.theme);
		if ("title" in $$props) $$invalidate(8, title = $$props.title);
		if ("valueAccessor" in $$props) $$invalidate(28, valueAccessor = $$props.valueAccessor);
	};

	$$self.$capture_state = () => ({
		isEqual: justCompare,
		index,
		isIn,
		mapWith,
		pipe,
		sortWith,
		afterUpdate,
		beforeUpdate,
		createEventDispatcher,
		linearScale: linear,
		makeStyleVars,
		toPx,
		arrayMaxWith,
		arrayMinWith,
		getKey,
		getValue,
		makeMergeAppliedFnMap,
		sliceString,
		dispatch,
		sortByValue,
		transparentColor,
		augmentTheme,
		defaultTheme,
		barHeight,
		focusedKey,
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
		shouldScrollToFocusedKey,
		theme,
		title,
		valueAccessor,
		height,
		hoveredKey,
		width,
		previousItems,
		scrollable,
		wasNotResettingScroll,
		onClick,
		onMouseenter,
		onMouseleave,
		style,
		refsHeight,
		averageCharWidth,
		barPadding,
		labelValueDistance,
		itemHeight,
		barY,
		textY,
		svgHeight,
		getMin,
		getMax,
		refsValues,
		min,
		max,
		crossesZero,
		allNegatives,
		domain,
		getX,
		x0,
		columnsWidth,
		bars,
		labelsMaxLengths,
		labelsRoom,
		barsLayout,
		barsByKey,
		makeRefsLayout,
		refHeight,
		refsLayout,
		focusedY
	});

	$$self.$inject_state = $$props => {
		if ("barHeight" in $$props) $$invalidate(0, barHeight = $$props.barHeight);
		if ("focusedKey" in $$props) $$invalidate(7, focusedKey = $$props.focusedKey);
		if ("formatFn" in $$props) $$invalidate(29, formatFn = $$props.formatFn);
		if ("isInteractive" in $$props) $$invalidate(1, isInteractive = $$props.isInteractive);
		if ("items" in $$props) $$invalidate(2, items = $$props.items);
		if ("keyToColor" in $$props) $$invalidate(30, keyToColor = $$props.keyToColor);
		if ("keyToColorFn" in $$props) $$invalidate(31, keyToColorFn = $$props.keyToColorFn);
		if ("keyToLabel" in $$props) $$invalidate(32, keyToLabel = $$props.keyToLabel);
		if ("keyToLabelFn" in $$props) $$invalidate(33, keyToLabelFn = $$props.keyToLabelFn);
		if ("message" in $$props) $$invalidate(3, message = $$props.message);
		if ("refs" in $$props) $$invalidate(4, refs = $$props.refs);
		if ("selectedKeys" in $$props) $$invalidate(5, selectedKeys = $$props.selectedKeys);
		if ("shouldResetScroll" in $$props) $$invalidate(27, shouldResetScroll = $$props.shouldResetScroll);
		if ("shouldScrollToFocusedKey" in $$props) $$invalidate(34, shouldScrollToFocusedKey = $$props.shouldScrollToFocusedKey);
		if ("theme" in $$props) $$invalidate(6, theme = $$props.theme);
		if ("title" in $$props) $$invalidate(8, title = $$props.title);
		if ("valueAccessor" in $$props) $$invalidate(28, valueAccessor = $$props.valueAccessor);
		if ("height" in $$props) $$invalidate(9, height = $$props.height);
		if ("hoveredKey" in $$props) $$invalidate(18, hoveredKey = $$props.hoveredKey);
		if ("width" in $$props) $$invalidate(10, width = $$props.width);
		if ("previousItems" in $$props) previousItems = $$props.previousItems;
		if ("scrollable" in $$props) $$invalidate(11, scrollable = $$props.scrollable);
		if ("wasNotResettingScroll" in $$props) $$invalidate(35, wasNotResettingScroll = $$props.wasNotResettingScroll);
		if ("style" in $$props) $$invalidate(19, style = $$props.style);
		if ("refsHeight" in $$props) $$invalidate(12, refsHeight = $$props.refsHeight);
		if ("averageCharWidth" in $$props) $$invalidate(36, averageCharWidth = $$props.averageCharWidth);
		if ("barPadding" in $$props) $$invalidate(37, barPadding = $$props.barPadding);
		if ("labelValueDistance" in $$props) $$invalidate(38, labelValueDistance = $$props.labelValueDistance);
		if ("itemHeight" in $$props) $$invalidate(13, itemHeight = $$props.itemHeight);
		if ("barY" in $$props) $$invalidate(20, barY = $$props.barY);
		if ("textY" in $$props) $$invalidate(21, textY = $$props.textY);
		if ("svgHeight" in $$props) $$invalidate(22, svgHeight = $$props.svgHeight);
		if ("getMin" in $$props) $$invalidate(39, getMin = $$props.getMin);
		if ("getMax" in $$props) $$invalidate(40, getMax = $$props.getMax);
		if ("refsValues" in $$props) $$invalidate(41, refsValues = $$props.refsValues);
		if ("min" in $$props) $$invalidate(42, min = $$props.min);
		if ("max" in $$props) $$invalidate(43, max = $$props.max);
		if ("crossesZero" in $$props) $$invalidate(14, crossesZero = $$props.crossesZero);
		if ("allNegatives" in $$props) $$invalidate(44, allNegatives = $$props.allNegatives);
		if ("domain" in $$props) $$invalidate(45, domain = $$props.domain);
		if ("getX" in $$props) $$invalidate(46, getX = $$props.getX);
		if ("x0" in $$props) $$invalidate(15, x0 = $$props.x0);
		if ("columnsWidth" in $$props) $$invalidate(47, columnsWidth = $$props.columnsWidth);
		if ("bars" in $$props) $$invalidate(48, bars = $$props.bars);
		if ("labelsMaxLengths" in $$props) $$invalidate(49, labelsMaxLengths = $$props.labelsMaxLengths);
		if ("labelsRoom" in $$props) $$invalidate(50, labelsRoom = $$props.labelsRoom);
		if ("barsLayout" in $$props) $$invalidate(16, barsLayout = $$props.barsLayout);
		if ("barsByKey" in $$props) $$invalidate(51, barsByKey = $$props.barsByKey);
		if ("makeRefsLayout" in $$props) $$invalidate(52, makeRefsLayout = $$props.makeRefsLayout);
		if ("refHeight" in $$props) $$invalidate(17, refHeight = $$props.refHeight);
		if ("refsLayout" in $$props) $$invalidate(23, refsLayout = $$props.refsLayout);
		if ("focusedY" in $$props) $$invalidate(53, focusedY = $$props.focusedY);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*barHeight*/ 1) {
			// FIXME https://github.com/sveltejs/svelte/issues/4442
			$$invalidate(0, barHeight = barHeight || 4);
		}

		if ($$self.$$.dirty[0] & /*isInteractive*/ 2) {
			$$invalidate(1, isInteractive = isInteractive || false);
		}

		if ($$self.$$.dirty[0] & /*items*/ 4) {
			$$invalidate(2, items = items || []);
		}

		if ($$self.$$.dirty[0] & /*message*/ 8) {
			$$invalidate(3, message = message || "No data");
		}

		if ($$self.$$.dirty[0] & /*refs*/ 16) {
			$$invalidate(4, refs = refs || []);
		}

		if ($$self.$$.dirty[0] & /*selectedKeys*/ 32) {
			$$invalidate(5, selectedKeys = selectedKeys || []);
		}

		if ($$self.$$.dirty[0] & /*shouldResetScroll*/ 134217728) {
			$$invalidate(27, shouldResetScroll = shouldResetScroll || false);
		}

		if ($$self.$$.dirty[0] & /*theme*/ 64) {
			$$invalidate(6, theme = theme ? { ...defaultTheme, ...theme } : defaultTheme);
		}

		if ($$self.$$.dirty[0] & /*theme*/ 64) {
			$$invalidate(17, refHeight = theme.padding + theme.fontSize);
		}

		if ($$self.$$.dirty[0] & /*refs, theme, refHeight*/ 131152) {
			$$invalidate(12, refsHeight = refs && refs.length * (theme.padding + refHeight) + theme.padding || 0);
		}

		if ($$self.$$.dirty[0] & /*theme, refsHeight*/ 4160) {
			$$invalidate(19, style = makeStyleVars({
				...augmentTheme(theme),
				refsHeightPx: toPx(refsHeight)
			}));
		}

		if ($$self.$$.dirty[0] & /*valueAccessor*/ 268435456) {
			$$invalidate(28, valueAccessor = valueAccessor || getValue);
		}

		if ($$self.$$.dirty[0] & /*theme*/ 64) {
			$$invalidate(36, averageCharWidth = theme.fontSize * 0.5);
		}

		if ($$self.$$.dirty[0] & /*theme*/ 64) {
			$$invalidate(37, barPadding = theme.fontSize / 2);
		}

		if ($$self.$$.dirty[1] & /*barPadding*/ 64) {
			$$invalidate(38, labelValueDistance = 3 * barPadding);
		}

		if ($$self.$$.dirty[0] & /*theme, barHeight*/ 65 | $$self.$$.dirty[1] & /*barPadding*/ 64) {
			$$invalidate(13, itemHeight = theme.fontSize + barHeight + 3 * barPadding);
		}

		if ($$self.$$.dirty[0] & /*itemHeight, barHeight*/ 8193 | $$self.$$.dirty[1] & /*barPadding*/ 64) {
			$$invalidate(20, barY = itemHeight - barPadding - barHeight / 2);
		}

		if ($$self.$$.dirty[0] & /*itemHeight, barHeight*/ 8193 | $$self.$$.dirty[1] & /*barPadding*/ 64) {
			$$invalidate(21, textY = itemHeight - barHeight - 2 * barPadding);
		}

		if ($$self.$$.dirty[0] & /*itemHeight, items*/ 8196) {
			$$invalidate(22, svgHeight = itemHeight * items.length);
		}

		if ($$self.$$.dirty[0] & /*valueAccessor*/ 268435456) {
			$$invalidate(39, getMin = arrayMinWith(valueAccessor));
		}

		if ($$self.$$.dirty[0] & /*valueAccessor*/ 268435456) {
			$$invalidate(40, getMax = arrayMaxWith(valueAccessor));
		}

		if ($$self.$$.dirty[0] & /*refs*/ 16) {
			$$invalidate(41, refsValues = refs.map(getValue));
		}

		if ($$self.$$.dirty[0] & /*items*/ 4 | $$self.$$.dirty[1] & /*getMin, refsValues*/ 1280) {
			$$invalidate(42, min = Math.min(getMin(items), ...refsValues));
		}

		if ($$self.$$.dirty[0] & /*items*/ 4 | $$self.$$.dirty[1] & /*getMax, refsValues*/ 1536) {
			$$invalidate(43, max = Math.max(getMax(items), ...refsValues));
		}

		if ($$self.$$.dirty[1] & /*min, max*/ 6144) {
			$$invalidate(14, crossesZero = Math.sign(min) === -Math.sign(max));
		}

		if ($$self.$$.dirty[0] & /*crossesZero*/ 16384 | $$self.$$.dirty[1] & /*min*/ 2048) {
			$$invalidate(44, allNegatives = !crossesZero && Math.sign(min) < 0);
		}

		if ($$self.$$.dirty[0] & /*crossesZero*/ 16384 | $$self.$$.dirty[1] & /*min, max*/ 6144) {
			$$invalidate(45, domain = crossesZero ? [min, max] : max > 0 ? [0, max] : [min, 0]);
		}

		if ($$self.$$.dirty[0] & /*width*/ 1024 | $$self.$$.dirty[1] & /*domain*/ 16384) {
			$$invalidate(46, getX = linear(domain, [0, width]));
		}

		if ($$self.$$.dirty[1] & /*getX*/ 32768) {
			$$invalidate(15, x0 = getX(0));
		}

		if ($$self.$$.dirty[0] & /*x0, width*/ 33792) {
			$$invalidate(47, columnsWidth = { neg: x0, pos: width - x0 });
		}

		if ($$self.$$.dirty[0] & /*items, valueAccessor, keyToColor, theme, formatFn*/ 1879048260 | $$self.$$.dirty[1] & /*keyToLabel, keyToLabelFn, averageCharWidth, keyToColorFn*/ 39) {
			/* layout */
			$$invalidate(48, bars = items.map(item => {
				const value = valueAccessor(item);
				const isNeg = value < 0;

				const label = keyToLabel && keyToLabel[item.key]
				? keyToLabel[item.key]
				: keyToLabelFn ? keyToLabelFn(item.key) : item.key;

				const labelLength = label.length * averageCharWidth;

				return {
					...item,
					...{
						barColor: keyToColor
						? keyToColor[item.key] || theme.barDefaultColor
						: keyToColorFn
							? keyToColorFn(item.key)
							: theme.barDefaultColor,
						displayValue: formatFn ? formatFn(value) : value,
						isNeg,
						label,
						labelLength,
						value
					}
				};
			}));
		}

		if ($$self.$$.dirty[1] & /*bars, averageCharWidth*/ 131104) {
			$$invalidate(49, labelsMaxLengths = bars.reduce(
				(acc, { displayValue, isNeg, labelLength }) => {
					const signKey = isNeg ? "neg" : "pos";
					const displayValueLength = String(displayValue).length * averageCharWidth;
					acc[signKey].label = Math.max(acc[signKey].label, labelLength);
					acc[signKey].value = Math.max(acc[signKey].value, displayValueLength);
					return acc;
				},
				{
					neg: { label: 0, value: 0 },
					pos: { label: 0, value: 0 }
				}
			));
		}

		if ($$self.$$.dirty[1] & /*columnsWidth, labelsMaxLengths, labelValueDistance*/ 327808) {
			$$invalidate(50, labelsRoom = {
				neg: Math.max(0, columnsWidth.neg - labelsMaxLengths.neg.value - labelValueDistance),
				pos: Math.max(0, columnsWidth.pos - labelsMaxLengths.pos.value - labelValueDistance)
			});
		}

		if ($$self.$$.dirty[0] & /*crossesZero, x0, width, itemHeight*/ 58368 | $$self.$$.dirty[1] & /*bars, labelsRoom, averageCharWidth, labelsMaxLengths, allNegatives, barPadding, labelValueDistance, getX*/ 958688) {
			$$invalidate(16, barsLayout = bars.map((bar, idx) => {
				let { isNeg, label, labelLength, value } = bar;
				const room = labelsRoom.neg + labelsRoom.pos;
				const overflowRatio = labelLength / room;

				if (overflowRatio > 1) {
					const cutIndex = Math.floor(room / averageCharWidth) - 1;
					label = `${sliceString(label, 0, cutIndex)}…`;
					labelLength = label.length;
				}

				return {
					...bar,
					...{
						isLabelAlignedRight: crossesZero
						? isNeg
							? labelsMaxLengths.neg.label < labelsRoom.neg
							: labelsMaxLengths.pos.label > labelsRoom.pos
						: allNegatives,
						isValueAlignedRight: crossesZero ? !isNeg : !allNegatives,
						label,
						labelLength,
						labelX: crossesZero
						? isNeg
							? labelsMaxLengths.neg.label <= labelsRoom.neg
								? x0 - barPadding
								: labelsMaxLengths.neg.value + labelValueDistance
							: labelsMaxLengths.pos.label <= labelsRoom.pos
								? x0 + barPadding
								: width - labelsMaxLengths.pos.value - labelValueDistance
						: allNegatives ? width : 0,
						x: getX(value),
						valueX: crossesZero
						? isNeg ? 0 : width
						: allNegatives ? 0 : width,
						y: idx * itemHeight
					}
				};
			}));
		}

		if ($$self.$$.dirty[0] & /*barsLayout*/ 65536) {
			$$invalidate(51, barsByKey = index(barsLayout, getKey));
		}

		if ($$self.$$.dirty[0] & /*theme, width, refHeight*/ 132160 | $$self.$$.dirty[1] & /*getX, averageCharWidth*/ 32800) {
			/* refs */
			$$invalidate(52, makeRefsLayout = pipe([
				sortByValue,
				mapWith((ref, idx) => {
					const valueX = getX(ref.value);
					let formattedValue = ref.formatFn ? ref.formatFn(ref.value) : ref.value;
					let label = `${ref.key} (${formattedValue})`;
					let textLength = label.length * averageCharWidth;
					let rectWidth = textLength + 2 * theme.padding;
					let goesOff = valueX + rectWidth > width;
					let isAlignedRight = goesOff && valueX > width / 2;

					if (goesOff && ref.keyAbbr) {
						label = `${ref.keyAbbr} (${formattedValue})`;
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
				})
			]));
		}

		if ($$self.$$.dirty[0] & /*refs*/ 16 | $$self.$$.dirty[1] & /*makeRefsLayout*/ 2097152) {
			$$invalidate(23, refsLayout = refs && refs.length && makeRefsLayout(refs));
		}

		if ($$self.$$.dirty[0] & /*shouldResetScroll, scrollable*/ 134219776 | $$self.$$.dirty[1] & /*wasNotResettingScroll*/ 16) {
			if (wasNotResettingScroll && shouldResetScroll && scrollable) {
				$$invalidate(11, scrollable.scrollTop = 0, scrollable);
			}
		}

		if ($$self.$$.dirty[0] & /*focusedKey*/ 128 | $$self.$$.dirty[1] & /*shouldScrollToFocusedKey, barsByKey*/ 1048584) {
			$$invalidate(53, focusedY = shouldScrollToFocusedKey && focusedKey && barsByKey[focusedKey] && barsByKey[focusedKey].y);
		}

		if ($$self.$$.dirty[0] & /*focusedKey, scrollable, itemHeight, height*/ 10880 | $$self.$$.dirty[1] & /*shouldScrollToFocusedKey, focusedY*/ 4194312) {
			if (shouldScrollToFocusedKey && focusedKey && scrollable) {
				const yAbs = -scrollable.scrollTop + focusedY;

				if (yAbs < 0) {
					scrollable.scroll({ top: focusedY, behavior: "smooth" });
				} else if (yAbs + itemHeight > height) {
					scrollable.scroll({
						top: focusedY - height + itemHeight,
						behavior: "smooth"
					});
				}
			}
		}
	};

	return [
		barHeight,
		isInteractive,
		items,
		message,
		refs,
		selectedKeys,
		theme,
		focusedKey,
		title,
		height,
		width,
		scrollable,
		refsHeight,
		itemHeight,
		crossesZero,
		x0,
		barsLayout,
		refHeight,
		hoveredKey,
		style,
		barY,
		textY,
		svgHeight,
		refsLayout,
		onClick,
		onMouseenter,
		onMouseleave,
		shouldResetScroll,
		valueAccessor,
		formatFn,
		keyToColor,
		keyToColorFn,
		keyToLabel,
		keyToLabelFn,
		shouldScrollToFocusedKey,
		wasNotResettingScroll,
		averageCharWidth,
		barPadding,
		labelValueDistance,
		getMin,
		getMax,
		refsValues,
		min,
		max,
		allNegatives,
		domain,
		getX,
		columnsWidth,
		bars,
		labelsMaxLengths,
		labelsRoom,
		barsByKey,
		makeRefsLayout,
		focusedY,
		div_elementresize_handler,
		div_binding,
		mouseleave_handler
	];
}

class BarchartVDiv extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(
			this,
			options,
			instance$1,
			create_fragment$1,
			safe_not_equal,
			{
				barHeight: 0,
				focusedKey: 7,
				formatFn: 29,
				isInteractive: 1,
				items: 2,
				keyToColor: 30,
				keyToColorFn: 31,
				keyToLabel: 32,
				keyToLabelFn: 33,
				message: 3,
				refs: 4,
				selectedKeys: 5,
				shouldResetScroll: 27,
				shouldScrollToFocusedKey: 34,
				theme: 6,
				title: 8,
				valueAccessor: 28
			},
			[-1, -1, -1]
		);

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

	get focusedKey() {
		throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set focusedKey(value) {
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

	get shouldScrollToFocusedKey() {
		throw new Error("<BarchartVDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set shouldScrollToFocusedKey(value) {
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
}

var projections = /*#__PURE__*/Object.freeze({
	__proto__: null,
	geoAzimuthalEqualArea: azimuthalEqualArea,
	geoAzimuthalEquidistant: azimuthalEquidistant,
	geoEqualEarth: projectionFn,
	geoEquirectangular: equirectangular,
	geoMercator: mercator,
	geoNaturalEarth1: naturalEarth1
});

/* ../../components/choropleth/src/ChoroplethG.svelte generated by Svelte v3.38.2 */
const file = "../../components/choropleth/src/ChoroplethG.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[37] = list[i];
	return child_ctx;
}

// (103:0) {#if height && width}
function create_if_block(ctx) {
	let g;

	function select_block_type(ctx, dirty) {
		if (!/*topojson*/ ctx[5] || !/*currentProjection*/ ctx[9]) return create_if_block_1;
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
			g = claim_element(nodes, "g", { style: true, class: true }, 1);
			var g_nodes = children(g);
			if_block.l(g_nodes);
			g_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(g, "style", /*style*/ ctx[11]);
			attr_dev(g, "class", "ChoroplethG svelte-54gkh3");
			toggle_class(g, "interactive", /*isInteractive*/ ctx[2]);
			add_location(g, file, 103, 1, 3214);
		},
		m: function mount(target, anchor) {
			insert_dev(target, g, anchor);
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

			if (dirty[0] & /*style*/ 2048) {
				attr_dev(g, "style", /*style*/ ctx[11]);
			}

			if (dirty[0] & /*isInteractive*/ 4) {
				toggle_class(g, "interactive", /*isInteractive*/ ctx[2]);
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
		source: "(103:0) {#if height && width}",
		ctx
	});

	return block;
}

// (117:2) {:else}
function create_else_block(ctx) {
	let rect;
	let g;
	let g_transform_value;
	let if_block = /*coloredGeojson*/ ctx[12] && create_if_block_2(ctx);

	const block = {
		c: function create() {
			rect = svg_element("rect");
			g = svg_element("g");
			if (if_block) if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_element(nodes, "rect", { height: true, width: true, class: true }, 1);
			children(rect).forEach(detach_dev);
			g = claim_element(nodes, "g", { transform: true }, 1);
			var g_nodes = children(g);
			if (if_block) if_block.l(g_nodes);
			g_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "height", /*height*/ ctx[4]);
			attr_dev(rect, "width", /*width*/ ctx[6]);
			attr_dev(rect, "class", "bkg svelte-54gkh3");
			add_location(rect, file, 118, 3, 3427);
			attr_dev(g, "transform", g_transform_value = "translate(" + /*geometry*/ ctx[1].left + "," + /*geometry*/ ctx[1].top + ")");
			add_location(g, file, 123, 3, 3483);
		},
		m: function mount(target, anchor) {
			insert_dev(target, rect, anchor);
			insert_dev(target, g, anchor);
			if (if_block) if_block.m(g, null);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*height*/ 16) {
				attr_dev(rect, "height", /*height*/ ctx[4]);
			}

			if (dirty[0] & /*width*/ 64) {
				attr_dev(rect, "width", /*width*/ ctx[6]);
			}

			if (/*coloredGeojson*/ ctx[12]) {
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

			if (dirty[0] & /*geometry*/ 2 && g_transform_value !== (g_transform_value = "translate(" + /*geometry*/ ctx[1].left + "," + /*geometry*/ ctx[1].top + ")")) {
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
		source: "(117:2) {:else}",
		ctx
	});

	return block;
}

// (109:2) {#if !topojson || !currentProjection}
function create_if_block_1(ctx) {
	let text_1;
	let t;
	let text_1_x_value;
	let text_1_y_value;

	const block = {
		c: function create() {
			text_1 = svg_element("text");
			t = text(/*message*/ ctx[3]);
			this.h();
		},
		l: function claim(nodes) {
			text_1 = claim_element(nodes, "text", { class: true, x: true, y: true }, 1);
			var text_1_nodes = children(text_1);
			t = claim_text(text_1_nodes, /*message*/ ctx[3]);
			text_1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(text_1, "class", "message svelte-54gkh3");
			attr_dev(text_1, "x", text_1_x_value = /*width*/ ctx[6] / 2);
			attr_dev(text_1, "y", text_1_y_value = /*height*/ ctx[4] / 2);
			add_location(text_1, file, 110, 3, 3332);
		},
		m: function mount(target, anchor) {
			insert_dev(target, text_1, anchor);
			append_dev(text_1, t);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*message*/ 8) set_data_dev(t, /*message*/ ctx[3]);

			if (dirty[0] & /*width*/ 64 && text_1_x_value !== (text_1_x_value = /*width*/ ctx[6] / 2)) {
				attr_dev(text_1, "x", text_1_x_value);
			}

			if (dirty[0] & /*height*/ 16 && text_1_y_value !== (text_1_y_value = /*height*/ ctx[4] / 2)) {
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
		source: "(109:2) {#if !topojson || !currentProjection}",
		ctx
	});

	return block;
}

// (125:4) {#if coloredGeojson}
function create_if_block_2(ctx) {
	let each_1_anchor;
	let each_value = /*coloredGeojson*/ ctx[12].features;
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
				each_blocks[i].m(target, anchor);
			}

			insert_dev(target, each_1_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*coloredGeojson, key, key_alt, isDeselected, isSelected, focusedKey, isFocused, geopath, isClickable, dispatch, getPayload, isInteractive*/ 521605) {
				each_value = /*coloredGeojson*/ ctx[12].features;
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
		source: "(125:4) {#if coloredGeojson}",
		ctx
	});

	return block;
}

// (126:5) {#each coloredGeojson.features as feature}
function create_each_block(ctx) {
	let g;
	let path;
	let path_d_value;
	let g_id_value;
	let mounted;
	let dispose;

	function click_handler() {
		return /*click_handler*/ ctx[32](/*feature*/ ctx[37]);
	}

	function mouseenter_handler() {
		return /*mouseenter_handler*/ ctx[33](/*feature*/ ctx[37]);
	}

	function mouseleave_handler() {
		return /*mouseleave_handler*/ ctx[34](/*feature*/ ctx[37]);
	}

	const block = {
		c: function create() {
			g = svg_element("g");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			g = claim_element(nodes, "g", { class: true, id: true }, 1);
			var g_nodes = children(g);
			path = claim_element(g_nodes, "path", { d: true, style: true, class: true }, 1);
			children(path).forEach(detach_dev);
			g_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", path_d_value = /*geopath*/ ctx[13](/*feature*/ ctx[37]));
			set_style(path, "fill", /*feature*/ ctx[37].properties.color || null);
			attr_dev(path, "class", "svelte-54gkh3");
			toggle_class(path, "clickable", /*isClickable*/ ctx[17](/*feature*/ ctx[37]));
			add_location(path, file, 133, 7, 3876);
			attr_dev(g, "class", "feature svelte-54gkh3");
			attr_dev(g, "id", g_id_value = /*feature*/ ctx[37].properties[/*key*/ ctx[7]] || /*feature*/ ctx[37].properties[/*key_alt*/ ctx[0]]);
			toggle_class(g, "deselected", /*isDeselected*/ ctx[16](/*feature*/ ctx[37]));
			toggle_class(g, "selected", /*isSelected*/ ctx[15](/*feature*/ ctx[37]));
			toggle_class(g, "focused", /*focusedKey*/ ctx[8] && /*isFocused*/ ctx[14](/*feature*/ ctx[37]));
			add_location(g, file, 126, 6, 3620);
		},
		m: function mount(target, anchor) {
			insert_dev(target, g, anchor);
			append_dev(g, path);

			if (!mounted) {
				dispose = [
					listen_dev(path, "click", click_handler, false, false, false),
					listen_dev(path, "mouseenter", mouseenter_handler, false, false, false),
					listen_dev(path, "mouseleave", mouseleave_handler, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty[0] & /*geopath, coloredGeojson*/ 12288 && path_d_value !== (path_d_value = /*geopath*/ ctx[13](/*feature*/ ctx[37]))) {
				attr_dev(path, "d", path_d_value);
			}

			if (dirty[0] & /*coloredGeojson*/ 4096) {
				set_style(path, "fill", /*feature*/ ctx[37].properties.color || null);
			}

			if (dirty[0] & /*isClickable, coloredGeojson*/ 135168) {
				toggle_class(path, "clickable", /*isClickable*/ ctx[17](/*feature*/ ctx[37]));
			}

			if (dirty[0] & /*coloredGeojson, key, key_alt*/ 4225 && g_id_value !== (g_id_value = /*feature*/ ctx[37].properties[/*key*/ ctx[7]] || /*feature*/ ctx[37].properties[/*key_alt*/ ctx[0]])) {
				attr_dev(g, "id", g_id_value);
			}

			if (dirty[0] & /*isDeselected, coloredGeojson*/ 69632) {
				toggle_class(g, "deselected", /*isDeselected*/ ctx[16](/*feature*/ ctx[37]));
			}

			if (dirty[0] & /*isSelected, coloredGeojson*/ 36864) {
				toggle_class(g, "selected", /*isSelected*/ ctx[15](/*feature*/ ctx[37]));
			}

			if (dirty[0] & /*focusedKey, isFocused, coloredGeojson*/ 20736) {
				toggle_class(g, "focused", /*focusedKey*/ ctx[8] && /*isFocused*/ ctx[14](/*feature*/ ctx[37]));
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
		source: "(126:5) {#each coloredGeojson.features as feature}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let if_block_anchor;
	let if_block = /*height*/ ctx[4] && /*width*/ ctx[6] && create_if_block(ctx);

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
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (/*height*/ ctx[4] && /*width*/ ctx[6]) {
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
	let geojson;
	let coloredGeojson;
	let currentProjection;
	let geopath;
	let getPayload;
	let isFocused;
	let isSelected;
	let isDeselected;
	let isClickable;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("ChoroplethG", slots, []);
	const dispatch = createEventDispatcher();
	const hasColor = isNotNullWith(getPath("properties.color"));

	const defaultTheme = {
		backgroundColor: "white",
		defaultFill: "white",
		defaultStroke: "grey",
		defaultStrokeWidth: 0.5,
		deselectedOpacity: 0.25,
		focusedStroke: "red",
		focusedStrokeWidth: 2,
		focusedDasharray: "",
		hoverFill: "#f6f6f6",
		hoverStroke: "black",
		hoverStrokedasharray: "",
		hoverStrokeWidth: 1.5,
		messageColor: "black",
		messageFontSize: "1rem",
		selectedStroke: "black",
		selectedStrokeWidth: 1
	};

	let { height = null } = $$props;
	let { topojson = null } = $$props;
	let { topojsonId = null } = $$props;
	let { width = null } = $$props;
	let { key = null } = $$props;
	let { key_alt = "name" } = $$props;
	let { focusedKey = null } = $$props;
	let { geometry = null } = $$props;
	let { isInteractive = false } = $$props;
	let { keyToColor = null } = $$props;
	let { keyToColorFn = null } = $$props;
	let { message = "No data" } = $$props;
	let { projection = null } = $$props;
	let { projectionFn = null } = $$props;
	let { projectionId = null } = $$props;
	let { selectedKeys = [] } = $$props;
	let { theme = null } = $$props;

	const writable_props = [
		"height",
		"topojson",
		"topojsonId",
		"width",
		"key",
		"key_alt",
		"focusedKey",
		"geometry",
		"isInteractive",
		"keyToColor",
		"keyToColorFn",
		"message",
		"projection",
		"projectionFn",
		"projectionId",
		"selectedKeys",
		"theme"
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ChoroplethG> was created with unknown prop '${key}'`);
	});

	const click_handler = feature => isClickable(feature) && dispatch("clicked", getPayload(feature));
	const mouseenter_handler = feature => isInteractive && dispatch("entered", getPayload(feature));
	const mouseleave_handler = feature => isInteractive && dispatch("exited", getPayload(feature));

	$$self.$$set = $$props => {
		if ("height" in $$props) $$invalidate(4, height = $$props.height);
		if ("topojson" in $$props) $$invalidate(5, topojson = $$props.topojson);
		if ("topojsonId" in $$props) $$invalidate(24, topojsonId = $$props.topojsonId);
		if ("width" in $$props) $$invalidate(6, width = $$props.width);
		if ("key" in $$props) $$invalidate(7, key = $$props.key);
		if ("key_alt" in $$props) $$invalidate(0, key_alt = $$props.key_alt);
		if ("focusedKey" in $$props) $$invalidate(8, focusedKey = $$props.focusedKey);
		if ("geometry" in $$props) $$invalidate(1, geometry = $$props.geometry);
		if ("isInteractive" in $$props) $$invalidate(2, isInteractive = $$props.isInteractive);
		if ("keyToColor" in $$props) $$invalidate(25, keyToColor = $$props.keyToColor);
		if ("keyToColorFn" in $$props) $$invalidate(26, keyToColorFn = $$props.keyToColorFn);
		if ("message" in $$props) $$invalidate(3, message = $$props.message);
		if ("projection" in $$props) $$invalidate(19, projection = $$props.projection);
		if ("projectionFn" in $$props) $$invalidate(20, projectionFn = $$props.projectionFn);
		if ("projectionId" in $$props) $$invalidate(21, projectionId = $$props.projectionId);
		if ("selectedKeys" in $$props) $$invalidate(22, selectedKeys = $$props.selectedKeys);
		if ("theme" in $$props) $$invalidate(23, theme = $$props.theme);
	};

	$$self.$capture_state = () => ({
		createEventDispatcher,
		geoPath,
		getPath,
		makeStyleVars,
		makeUpdateFeaturesProperty,
		isNotNullWith,
		projections,
		topoToGeo,
		defaultGeometry,
		dispatch,
		hasColor,
		defaultTheme,
		height,
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
		projectionFunc,
		style,
		innerHeight,
		innerWidth,
		createColoredGeojson,
		geojson,
		coloredGeojson,
		currentProjection,
		geopath,
		getPayload,
		isFocused,
		isSelected,
		isDeselected,
		isClickable
	});

	$$self.$inject_state = $$props => {
		if ("height" in $$props) $$invalidate(4, height = $$props.height);
		if ("topojson" in $$props) $$invalidate(5, topojson = $$props.topojson);
		if ("topojsonId" in $$props) $$invalidate(24, topojsonId = $$props.topojsonId);
		if ("width" in $$props) $$invalidate(6, width = $$props.width);
		if ("key" in $$props) $$invalidate(7, key = $$props.key);
		if ("key_alt" in $$props) $$invalidate(0, key_alt = $$props.key_alt);
		if ("focusedKey" in $$props) $$invalidate(8, focusedKey = $$props.focusedKey);
		if ("geometry" in $$props) $$invalidate(1, geometry = $$props.geometry);
		if ("isInteractive" in $$props) $$invalidate(2, isInteractive = $$props.isInteractive);
		if ("keyToColor" in $$props) $$invalidate(25, keyToColor = $$props.keyToColor);
		if ("keyToColorFn" in $$props) $$invalidate(26, keyToColorFn = $$props.keyToColorFn);
		if ("message" in $$props) $$invalidate(3, message = $$props.message);
		if ("projection" in $$props) $$invalidate(19, projection = $$props.projection);
		if ("projectionFn" in $$props) $$invalidate(20, projectionFn = $$props.projectionFn);
		if ("projectionId" in $$props) $$invalidate(21, projectionId = $$props.projectionId);
		if ("selectedKeys" in $$props) $$invalidate(22, selectedKeys = $$props.selectedKeys);
		if ("theme" in $$props) $$invalidate(23, theme = $$props.theme);
		if ("projectionFunc" in $$props) $$invalidate(27, projectionFunc = $$props.projectionFunc);
		if ("style" in $$props) $$invalidate(11, style = $$props.style);
		if ("innerHeight" in $$props) $$invalidate(28, innerHeight = $$props.innerHeight);
		if ("innerWidth" in $$props) $$invalidate(29, innerWidth = $$props.innerWidth);
		if ("createColoredGeojson" in $$props) $$invalidate(30, createColoredGeojson = $$props.createColoredGeojson);
		if ("geojson" in $$props) $$invalidate(31, geojson = $$props.geojson);
		if ("coloredGeojson" in $$props) $$invalidate(12, coloredGeojson = $$props.coloredGeojson);
		if ("currentProjection" in $$props) $$invalidate(9, currentProjection = $$props.currentProjection);
		if ("geopath" in $$props) $$invalidate(13, geopath = $$props.geopath);
		if ("getPayload" in $$props) $$invalidate(10, getPayload = $$props.getPayload);
		if ("isFocused" in $$props) $$invalidate(14, isFocused = $$props.isFocused);
		if ("isSelected" in $$props) $$invalidate(15, isSelected = $$props.isSelected);
		if ("isDeselected" in $$props) $$invalidate(16, isDeselected = $$props.isDeselected);
		if ("isClickable" in $$props) $$invalidate(17, isClickable = $$props.isClickable);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*geometry*/ 2) {
			// FIXME https://github.com/sveltejs/svelte/issues/4442
			$$invalidate(1, geometry = geometry
			? { ...defaultGeometry, ...geometry }
			: defaultGeometry);
		}

		if ($$self.$$.dirty[0] & /*isInteractive*/ 4) {
			$$invalidate(2, isInteractive = isInteractive || false);
		}

		if ($$self.$$.dirty[0] & /*message*/ 8) {
			$$invalidate(3, message = message || "No data");
		}

		if ($$self.$$.dirty[0] & /*projection*/ 524288) {
			$$invalidate(19, projection = projection || null);
		}

		if ($$self.$$.dirty[0] & /*projectionFn*/ 1048576) {
			$$invalidate(20, projectionFn = projectionFn || null);
		}

		if ($$self.$$.dirty[0] & /*projectionId*/ 2097152) {
			$$invalidate(21, projectionId = projectionId || null);
		}

		if ($$self.$$.dirty[0] & /*key_alt*/ 1) {
			$$invalidate(0, key_alt = key_alt || "name");
		}

		if ($$self.$$.dirty[0] & /*projectionFn, projectionId*/ 3145728) {
			$$invalidate(27, projectionFunc = projectionFn || projectionId && projections[projectionId] || equirectangular);
		}

		if ($$self.$$.dirty[0] & /*selectedKeys*/ 4194304) {
			$$invalidate(22, selectedKeys = selectedKeys || []);
		}

		if ($$self.$$.dirty[0] & /*theme*/ 8388608) {
			$$invalidate(23, theme = theme ? { ...defaultTheme, ...theme } : defaultTheme);
		}

		if ($$self.$$.dirty[0] & /*theme*/ 8388608) {
			$$invalidate(11, style = makeStyleVars(theme));
		}

		if ($$self.$$.dirty[0] & /*height, geometry*/ 18) {
			$$invalidate(28, innerHeight = Math.max(0, height - geometry.top - geometry.bottom));
		}

		if ($$self.$$.dirty[0] & /*width, geometry*/ 66) {
			$$invalidate(29, innerWidth = Math.max(0, width - geometry.left - geometry.right));
		}

		if ($$self.$$.dirty[0] & /*key_alt, key, keyToColor, keyToColorFn*/ 100663425) {
			$$invalidate(30, createColoredGeojson = makeUpdateFeaturesProperty({
				key_alt,
				key,
				map: keyToColor,
				mapFn: keyToColorFn,
				propName: "color"
			}));
		}

		if ($$self.$$.dirty[0] & /*topojson, topojsonId*/ 16777248) {
			$$invalidate(31, geojson = topojson && topoToGeo(topojson, topojsonId));
		}

		if ($$self.$$.dirty[0] & /*createColoredGeojson*/ 1073741824 | $$self.$$.dirty[1] & /*geojson*/ 1) {
			$$invalidate(12, coloredGeojson = geojson && createColoredGeojson(geojson));
		}

		if ($$self.$$.dirty[0] & /*projection, projectionFunc, innerWidth, innerHeight*/ 940048384 | $$self.$$.dirty[1] & /*geojson*/ 1) {
			$$invalidate(9, currentProjection = projection || geojson && geojson.features.length && projectionFunc().fitSize([innerWidth, innerHeight], geojson));
		}

		if ($$self.$$.dirty[0] & /*currentProjection*/ 512) {
			$$invalidate(13, geopath = currentProjection && geoPath(currentProjection));
		}

		if ($$self.$$.dirty[0] & /*key, key_alt*/ 129) {
			$$invalidate(10, getPayload = feature => feature.properties[key] || feature.properties[key_alt]);
		}

		if ($$self.$$.dirty[0] & /*focusedKey, getPayload*/ 1280) {
			$$invalidate(14, isFocused = feature => focusedKey === getPayload(feature));
		}

		if ($$self.$$.dirty[0] & /*selectedKeys, getPayload*/ 4195328) {
			$$invalidate(15, isSelected = feature => selectedKeys.length && selectedKeys.includes(getPayload(feature)));
		}

		if ($$self.$$.dirty[0] & /*selectedKeys, getPayload*/ 4195328) {
			$$invalidate(16, isDeselected = feature => selectedKeys.length && !selectedKeys.includes(getPayload(feature)));
		}

		if ($$self.$$.dirty[0] & /*isInteractive*/ 4) {
			$$invalidate(17, isClickable = feature => isInteractive && hasColor(feature));
		}
	};

	return [
		key_alt,
		geometry,
		isInteractive,
		message,
		height,
		topojson,
		width,
		key,
		focusedKey,
		currentProjection,
		getPayload,
		style,
		coloredGeojson,
		geopath,
		isFocused,
		isSelected,
		isDeselected,
		isClickable,
		dispatch,
		projection,
		projectionFn,
		projectionId,
		selectedKeys,
		theme,
		topojsonId,
		keyToColor,
		keyToColorFn,
		projectionFunc,
		innerHeight,
		innerWidth,
		createColoredGeojson,
		geojson,
		click_handler,
		mouseenter_handler,
		mouseleave_handler
	];
}

class ChoroplethG extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(
			this,
			options,
			instance,
			create_fragment,
			safe_not_equal,
			{
				height: 4,
				topojson: 5,
				topojsonId: 24,
				width: 6,
				key: 7,
				key_alt: 0,
				focusedKey: 8,
				geometry: 1,
				isInteractive: 2,
				keyToColor: 25,
				keyToColorFn: 26,
				message: 3,
				projection: 19,
				projectionFn: 20,
				projectionId: 21,
				selectedKeys: 22,
				theme: 23
			},
			[-1, -1]
		);

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

export { BarchartVDiv as B, ChoroplethG as C };

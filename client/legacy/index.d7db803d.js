import { T as _typeof, a0 as pipe, bY as groupBy, b6 as getPath, a1 as mapValuesWith, a2 as objectToKeyValueArray, bJ as derived, _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, s as safe_not_equal, d as _assertThisInitialized, e as dispatch_dev, x as _createClass, S as SvelteComponentDev, ak as validate_store, al as component_subscribe, w as validate_slots, aM as _, c3 as applyFnMap, bh as isIterableNotEmpty, ao as mergeObj, X as transformValues, am as writable, aq as has, be as map, W as mapWith, O as svg_element, P as claim_svg_element, l as children, h as detach_dev, n as attr_dev, p as add_location, r as insert_hydration_dev, u as append_hydration_dev, a9 as listen_dev, v as noop, aw as run_all, R as _defineProperty, y as validate_each_argument, D as destroy_each, t as text, m as claim_text, a8 as set_data_dev, N as toggle_class, ab as empty, f as space, j as claim_space, I as create_component, J as claim_component, K as mount_component, A as transition_in, B as transition_out, L as destroy_component, g as element, k as claim_element, ah as add_render_callback, ai as add_resize_listener, E as _slicedToArray, M as group_outros, C as check_outros, bx as onMount, c4 as set_store_value } from './client.50a99e71.js';
import { a as _timelineLayout, p as _lookup, e as _isSmallScreen, f as _screenClasses, g as _viewsClasses, r as setRoute, n as showView, t as resetSelectedYear, v as lookup } from './stores.8e11225e.js';
import { s as sortAscByYear, e as _selectedData, b as _availableYears, g as getOrder, f as _doFilterRegions, h as _valueExtext, i as _rankedData, j as _noData, k as _colorBins, _ as _theme, l as _formatFn, m as _colorScale, n as _getIndicatorValue, o as _isRegionsSelectionDirty, p as _indicator, q as setCurrentLevel, r as parseCSV } from './indicator.6db11939.js';
import { C as ColorBinsG, p as ColorBinsDiv, M as MessageView } from './MessageView.8cc24322.js';
import { H as Header, t as toggleInfoModal, _ as _geoModal, a as _infoModal, G as GeoFilterModal, I as InfoModal, b as InfoView, S as SettingsRow, c as SettingsView, h as hideGeoModal, d as hideInfoModal, e as toggleGeoModal, f as config, g as types } from './types.a9299c27.js';
import { l as linear } from './linear.0c4bf1cb.js';
import './yootils.es.ac6ee4e8.js';
import './defaultLocale.3f1280a0.js';
import './Info.9508c99c.js';
import './Download.2e4719b7.js';

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function max(values, valueof) {
  var max;

  if (valueof === undefined) {
    var _iterator = _createForOfIteratorHelper(values),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var value = _step.value;

        if (value != null && (max < value || max === undefined && value >= value)) {
          max = value;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } else {
    var index = -1;

    var _iterator2 = _createForOfIteratorHelper(values),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _value = _step2.value;

        if ((_value = valueof(_value, ++index, values)) != null && (max < _value || max === undefined && _value >= _value)) {
          max = _value;
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }

  return max;
}

function tree_add (d) {
  var x = +this._x.call(null, d),
      y = +this._y.call(null, d);
  return add(this.cover(x, y), x, y, d);
}

function add(tree, x, y, d) {
  if (isNaN(x) || isNaN(y)) return tree; // ignore invalid points

  var parent,
      node = tree._root,
      leaf = {
    data: d
  },
      x0 = tree._x0,
      y0 = tree._y0,
      x1 = tree._x1,
      y1 = tree._y1,
      xm,
      ym,
      xp,
      yp,
      right,
      bottom,
      i,
      j; // If the tree is empty, initialize the root as a leaf.

  if (!node) return tree._root = leaf, tree; // Find the existing leaf for the new point, or add it.

  while (node.length) {
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm;else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym;else y1 = ym;
    if (parent = node, !(node = node[i = bottom << 1 | right])) return parent[i] = leaf, tree;
  } // Is the new point is exactly coincident with the existing point?


  xp = +tree._x.call(null, node.data);
  yp = +tree._y.call(null, node.data);
  if (x === xp && y === yp) return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree; // Otherwise, split the leaf node until the old and new point are separated.

  do {
    parent = parent ? parent[i] = new Array(4) : tree._root = new Array(4);
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm;else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym;else y1 = ym;
  } while ((i = bottom << 1 | right) === (j = (yp >= ym) << 1 | xp >= xm));

  return parent[j] = node, parent[i] = leaf, tree;
}

function addAll(data) {
  var d,
      i,
      n = data.length,
      x,
      y,
      xz = new Array(n),
      yz = new Array(n),
      x0 = Infinity,
      y0 = Infinity,
      x1 = -Infinity,
      y1 = -Infinity; // Compute the points and their extent.

  for (i = 0; i < n; ++i) {
    if (isNaN(x = +this._x.call(null, d = data[i])) || isNaN(y = +this._y.call(null, d))) continue;
    xz[i] = x;
    yz[i] = y;
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (y < y0) y0 = y;
    if (y > y1) y1 = y;
  } // If there were no (valid) points, abort.


  if (x0 > x1 || y0 > y1) return this; // Expand the tree to cover the new points.

  this.cover(x0, y0).cover(x1, y1); // Add the new points.

  for (i = 0; i < n; ++i) {
    add(this, xz[i], yz[i], data[i]);
  }

  return this;
}

function tree_cover (x, y) {
  if (isNaN(x = +x) || isNaN(y = +y)) return this; // ignore invalid points

  var x0 = this._x0,
      y0 = this._y0,
      x1 = this._x1,
      y1 = this._y1; // If the quadtree has no extent, initialize them.
  // Integer extent are necessary so that if we later double the extent,
  // the existing quadrant boundaries don’t change due to floating point error!

  if (isNaN(x0)) {
    x1 = (x0 = Math.floor(x)) + 1;
    y1 = (y0 = Math.floor(y)) + 1;
  } // Otherwise, double repeatedly to cover.
  else {
    var z = x1 - x0 || 1,
        node = this._root,
        parent,
        i;

    while (x0 > x || x >= x1 || y0 > y || y >= y1) {
      i = (y < y0) << 1 | x < x0;
      parent = new Array(4), parent[i] = node, node = parent, z *= 2;

      switch (i) {
        case 0:
          x1 = x0 + z, y1 = y0 + z;
          break;

        case 1:
          x0 = x1 - z, y1 = y0 + z;
          break;

        case 2:
          x1 = x0 + z, y0 = y1 - z;
          break;

        case 3:
          x0 = x1 - z, y0 = y1 - z;
          break;
      }
    }

    if (this._root && this._root.length) this._root = node;
  }

  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  return this;
}

function tree_data () {
  var data = [];
  this.visit(function (node) {
    if (!node.length) do {
      data.push(node.data);
    } while (node = node.next);
  });
  return data;
}

function tree_extent (_) {
  return arguments.length ? this.cover(+_[0][0], +_[0][1]).cover(+_[1][0], +_[1][1]) : isNaN(this._x0) ? undefined : [[this._x0, this._y0], [this._x1, this._y1]];
}

function Quad (node, x0, y0, x1, y1) {
  this.node = node;
  this.x0 = x0;
  this.y0 = y0;
  this.x1 = x1;
  this.y1 = y1;
}

function tree_find (x, y, radius) {
  var data,
      x0 = this._x0,
      y0 = this._y0,
      x1,
      y1,
      x2,
      y2,
      x3 = this._x1,
      y3 = this._y1,
      quads = [],
      node = this._root,
      q,
      i;
  if (node) quads.push(new Quad(node, x0, y0, x3, y3));
  if (radius == null) radius = Infinity;else {
    x0 = x - radius, y0 = y - radius;
    x3 = x + radius, y3 = y + radius;
    radius *= radius;
  }

  while (q = quads.pop()) {
    // Stop searching if this quadrant can’t contain a closer node.
    if (!(node = q.node) || (x1 = q.x0) > x3 || (y1 = q.y0) > y3 || (x2 = q.x1) < x0 || (y2 = q.y1) < y0) continue; // Bisect the current quadrant.

    if (node.length) {
      var xm = (x1 + x2) / 2,
          ym = (y1 + y2) / 2;
      quads.push(new Quad(node[3], xm, ym, x2, y2), new Quad(node[2], x1, ym, xm, y2), new Quad(node[1], xm, y1, x2, ym), new Quad(node[0], x1, y1, xm, ym)); // Visit the closest quadrant first.

      if (i = (y >= ym) << 1 | x >= xm) {
        q = quads[quads.length - 1];
        quads[quads.length - 1] = quads[quads.length - 1 - i];
        quads[quads.length - 1 - i] = q;
      }
    } // Visit this point. (Visiting coincident points isn’t necessary!)
    else {
      var dx = x - +this._x.call(null, node.data),
          dy = y - +this._y.call(null, node.data),
          d2 = dx * dx + dy * dy;

      if (d2 < radius) {
        var d = Math.sqrt(radius = d2);
        x0 = x - d, y0 = y - d;
        x3 = x + d, y3 = y + d;
        data = node.data;
      }
    }
  }

  return data;
}

function tree_remove (d) {
  if (isNaN(x = +this._x.call(null, d)) || isNaN(y = +this._y.call(null, d))) return this; // ignore invalid points

  var parent,
      node = this._root,
      retainer,
      previous,
      next,
      x0 = this._x0,
      y0 = this._y0,
      x1 = this._x1,
      y1 = this._y1,
      x,
      y,
      xm,
      ym,
      right,
      bottom,
      i,
      j; // If the tree is empty, initialize the root as a leaf.

  if (!node) return this; // Find the leaf node for the point.
  // While descending, also retain the deepest parent with a non-removed sibling.

  if (node.length) while (true) {
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm;else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym;else y1 = ym;
    if (!(parent = node, node = node[i = bottom << 1 | right])) return this;
    if (!node.length) break;
    if (parent[i + 1 & 3] || parent[i + 2 & 3] || parent[i + 3 & 3]) retainer = parent, j = i;
  } // Find the point to remove.

  while (node.data !== d) {
    if (!(previous = node, node = node.next)) return this;
  }

  if (next = node.next) delete node.next; // If there are multiple coincident points, remove just the point.

  if (previous) return next ? previous.next = next : delete previous.next, this; // If this is the root point, remove it.

  if (!parent) return this._root = next, this; // Remove this leaf.

  next ? parent[i] = next : delete parent[i]; // If the parent now contains exactly one leaf, collapse superfluous parents.

  if ((node = parent[0] || parent[1] || parent[2] || parent[3]) && node === (parent[3] || parent[2] || parent[1] || parent[0]) && !node.length) {
    if (retainer) retainer[j] = node;else this._root = node;
  }

  return this;
}
function removeAll(data) {
  for (var i = 0, n = data.length; i < n; ++i) {
    this.remove(data[i]);
  }

  return this;
}

function tree_root () {
  return this._root;
}

function tree_size () {
  var size = 0;
  this.visit(function (node) {
    if (!node.length) do {
      ++size;
    } while (node = node.next);
  });
  return size;
}

function tree_visit (callback) {
  var quads = [],
      q,
      node = this._root,
      child,
      x0,
      y0,
      x1,
      y1;
  if (node) quads.push(new Quad(node, this._x0, this._y0, this._x1, this._y1));

  while (q = quads.pop()) {
    if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1) && node.length) {
      var xm = (x0 + x1) / 2,
          ym = (y0 + y1) / 2;
      if (child = node[3]) quads.push(new Quad(child, xm, ym, x1, y1));
      if (child = node[2]) quads.push(new Quad(child, x0, ym, xm, y1));
      if (child = node[1]) quads.push(new Quad(child, xm, y0, x1, ym));
      if (child = node[0]) quads.push(new Quad(child, x0, y0, xm, ym));
    }
  }

  return this;
}

function tree_visitAfter (callback) {
  var quads = [],
      next = [],
      q;
  if (this._root) quads.push(new Quad(this._root, this._x0, this._y0, this._x1, this._y1));

  while (q = quads.pop()) {
    var node = q.node;

    if (node.length) {
      var child,
          x0 = q.x0,
          y0 = q.y0,
          x1 = q.x1,
          y1 = q.y1,
          xm = (x0 + x1) / 2,
          ym = (y0 + y1) / 2;
      if (child = node[0]) quads.push(new Quad(child, x0, y0, xm, ym));
      if (child = node[1]) quads.push(new Quad(child, xm, y0, x1, ym));
      if (child = node[2]) quads.push(new Quad(child, x0, ym, xm, y1));
      if (child = node[3]) quads.push(new Quad(child, xm, ym, x1, y1));
    }

    next.push(q);
  }

  while (q = next.pop()) {
    callback(q.node, q.x0, q.y0, q.x1, q.y1);
  }

  return this;
}

function defaultX(d) {
  return d[0];
}
function tree_x (_) {
  return arguments.length ? (this._x = _, this) : this._x;
}

function defaultY(d) {
  return d[1];
}
function tree_y (_) {
  return arguments.length ? (this._y = _, this) : this._y;
}

function quadtree(nodes, x, y) {
  var tree = new Quadtree(x == null ? defaultX : x, y == null ? defaultY : y, NaN, NaN, NaN, NaN);
  return nodes == null ? tree : tree.addAll(nodes);
}

function Quadtree(x, y, x0, y0, x1, y1) {
  this._x = x;
  this._y = y;
  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  this._root = undefined;
}

function leaf_copy(leaf) {
  var copy = {
    data: leaf.data
  },
      next = copy;

  while (leaf = leaf.next) {
    next = next.next = {
      data: leaf.data
    };
  }

  return copy;
}

var treeProto = quadtree.prototype = Quadtree.prototype;

treeProto.copy = function () {
  var copy = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
      node = this._root,
      nodes,
      child;
  if (!node) return copy;
  if (!node.length) return copy._root = leaf_copy(node), copy;
  nodes = [{
    source: node,
    target: copy._root = new Array(4)
  }];

  while (node = nodes.pop()) {
    for (var i = 0; i < 4; ++i) {
      if (child = node.source[i]) {
        if (child.length) nodes.push({
          source: child,
          target: node.target[i] = new Array(4)
        });else node.target[i] = leaf_copy(child);
      }
    }
  }

  return copy;
};

treeProto.add = tree_add;
treeProto.addAll = addAll;
treeProto.cover = tree_cover;
treeProto.data = tree_data;
treeProto.extent = tree_extent;
treeProto.find = tree_find;
treeProto.remove = tree_remove;
treeProto.removeAll = removeAll;
treeProto.root = tree_root;
treeProto.size = tree_size;
treeProto.visit = tree_visit;
treeProto.visitAfter = tree_visitAfter;
treeProto.x = tree_x;
treeProto.y = tree_y;

var pi = Math.PI,
    tau = 2 * pi,
    epsilon = 1e-6,
    tauEpsilon = tau - epsilon;

function Path() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null; // end of current subpath

  this._ = "";
}

function path() {
  return new Path();
}

Path.prototype = path.prototype = {
  constructor: Path,
  moveTo: function moveTo(x, y) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
  },
  closePath: function closePath() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function lineTo(x, y) {
    this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  quadraticCurveTo: function quadraticCurveTo(x1, y1, x, y) {
    this._ += "Q" + +x1 + "," + +y1 + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  bezierCurveTo: function bezierCurveTo(x1, y1, x2, y2, x, y) {
    this._ += "C" + +x1 + "," + +y1 + "," + +x2 + "," + +y2 + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  arcTo: function arcTo(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    var x0 = this._x1,
        y0 = this._y1,
        x21 = x2 - x1,
        y21 = y2 - y1,
        x01 = x0 - x1,
        y01 = y0 - y1,
        l01_2 = x01 * x01 + y01 * y01; // Is the radius negative? Error.

    if (r < 0) throw new Error("negative radius: " + r); // Is this path empty? Move to (x1,y1).

    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    } // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
    else if (!(l01_2 > epsilon)) ; // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
    // Equivalently, is (x1,y1) coincident with (x2,y2)?
    // Or, is the radius zero? Line to (x1,y1).
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
    } // Otherwise, draw an arc!
    else {
      var x20 = x2 - x0,
          y20 = y2 - y0,
          l21_2 = x21 * x21 + y21 * y21,
          l20_2 = x20 * x20 + y20 * y20,
          l21 = Math.sqrt(l21_2),
          l01 = Math.sqrt(l01_2),
          l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
          t01 = l / l01,
          t21 = l / l21; // If the start tangent is not coincident with (x0,y0), line to.

      if (Math.abs(t01 - 1) > epsilon) {
        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
      }

      this._ += "A" + r + "," + r + ",0,0," + +(y01 * x20 > x01 * y20) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
    }
  },
  arc: function arc(x, y, r, a0, a1, ccw) {
    x = +x, y = +y, r = +r, ccw = !!ccw;
    var dx = r * Math.cos(a0),
        dy = r * Math.sin(a0),
        x0 = x + dx,
        y0 = y + dy,
        cw = 1 ^ ccw,
        da = ccw ? a0 - a1 : a1 - a0; // Is the radius negative? Error.

    if (r < 0) throw new Error("negative radius: " + r); // Is this path empty? Move to (x0,y0).

    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    } // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._ += "L" + x0 + "," + y0;
    } // Is this arc empty? We’re done.


    if (!r) return; // Does the angle go the wrong way? Flip the direction.

    if (da < 0) da = da % tau + tau; // Is this a complete circle? Draw two arcs to complete the circle.

    if (da > tauEpsilon) {
      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    } // Is this arc non-empty? Draw an arc!
    else if (da > epsilon) {
      this._ += "A" + r + "," + r + ",0," + +(da >= pi) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
    }
  },
  rect: function rect(x, y, w, h) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + +w + "v" + +h + "h" + -w + "Z";
  },
  toString: function toString() {
    return this._;
  }
};

function constant (x) {
  return function constant() {
    return x;
  };
}

function array (x) {
  return _typeof(x) === "object" && "length" in x ? x // Array, TypedArray, NodeList, array-like
  : Array.from(x); // Map, Set, iterable, string, or anything else
}

function Linear(context) {
  this._context = context;
}

Linear.prototype = {
  areaStart: function areaStart() {
    this._line = 0;
  },
  areaEnd: function areaEnd() {
    this._line = NaN;
  },
  lineStart: function lineStart() {
    this._point = 0;
  },
  lineEnd: function lineEnd() {
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function point(x, y) {
    x = +x, y = +y;

    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
        break;

      case 1:
        this._point = 2;
      // proceed

      default:
        this._context.lineTo(x, y);

        break;
    }
  }
};
function curveLinear (context) {
  return new Linear(context);
}

function x(p) {
  return p[0];
}
function y(p) {
  return p[1];
}

function line (x$1, y$1) {
  var defined = constant(true),
      context = null,
      curve = curveLinear,
      output = null;
  x$1 = typeof x$1 === "function" ? x$1 : x$1 === undefined ? x : constant(x$1);
  y$1 = typeof y$1 === "function" ? y$1 : y$1 === undefined ? y : constant(y$1);

  function line(data) {
    var i,
        n = (data = array(data)).length,
        d,
        defined0 = false,
        buffer;
    if (context == null) output = curve(buffer = path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();else output.lineEnd();
      }

      if (defined0) output.point(+x$1(d, i, data), +y$1(d, i, data));
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  line.x = function (_) {
    return arguments.length ? (x$1 = typeof _ === "function" ? _ : constant(+_), line) : x$1;
  };

  line.y = function (_) {
    return arguments.length ? (y$1 = typeof _ === "function" ? _ : constant(+_), line) : y$1;
  };

  line.defined = function (_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), line) : defined;
  };

  line.curve = function (_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };

  line.context = function (_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };

  return line;
}

function sign(x) {
  return x < 0 ? -1 : 1;
} // Calculate the slopes of the tangents (Hermite-type interpolation) based on
// the following paper: Steffen, M. 1990. A Simple Method for Monotonic
// Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
// NOV(II), P. 443, 1990.


function slope3(that, x2, y2) {
  var h0 = that._x1 - that._x0,
      h1 = x2 - that._x1,
      s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0),
      s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0),
      p = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
} // Calculate a one-sided slope.


function slope2(that, t) {
  var h = that._x1 - that._x0;
  return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
} // According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
// "you can express cubic Hermite interpolation in terms of cubic Bézier curves
// with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".


function _point(that, t0, t1) {
  var x0 = that._x0,
      y0 = that._y0,
      x1 = that._x1,
      y1 = that._y1,
      dx = (x1 - x0) / 3;

  that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
}

function MonotoneX(context) {
  this._context = context;
}

MonotoneX.prototype = {
  areaStart: function areaStart() {
    this._line = 0;
  },
  areaEnd: function areaEnd() {
    this._line = NaN;
  },
  lineStart: function lineStart() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN;
    this._point = 0;
  },
  lineEnd: function lineEnd() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);

        break;

      case 3:
        _point(this, this._t0, slope2(this, this._t0));

        break;
    }

    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function point(x, y) {
    var t1 = NaN;
    x = +x, y = +y;
    if (x === this._x1 && y === this._y1) return; // Ignore coincident points.

    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
        break;

      case 1:
        this._point = 2;
        break;

      case 2:
        this._point = 3;

        _point(this, slope2(this, t1 = slope3(this, x, y)), t1);

        break;

      default:
        _point(this, this._t0, t1 = slope3(this, x, y));

        break;
    }

    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
    this._t0 = t1;
  }
};

(Object.create(MonotoneX.prototype)).point = function (x, y) {
  MonotoneX.prototype.point.call(this, y, x);
};
function monotoneX(context) {
  return new MonotoneX(context);
}

var makeTrends = pipe([groupBy(getPath('region.id')), mapValuesWith(sortAscByYear), objectToKeyValueArray]);

var _trends = derived(_selectedData, makeTrends);

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var file$2 = "../../components/time_region_value/src/node_modules/components/TrendsG.svelte";

function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[39] = list[i].value;
  return child_ctx;
}

function get_each_context_1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[42] = list[i];
  return child_ctx;
}

function get_each_context_2(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[45] = list[i].key;
  child_ctx[46] = list[i].value.path;
  child_ctx[47] = list[i].value.isSelected;
  return child_ctx;
}

function get_each_context_3(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[50] = list[i].label;
  child_ctx[51] = list[i].y;
  return child_ctx;
}

function get_each_context_4(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[50] = list[i].label;
  child_ctx[51] = list[i].y;
  return child_ctx;
}

function get_each_context_5(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[56] = list[i];
  return child_ctx;
}

function get_each_context_6(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[45] = list[i].key;
  child_ctx[39] = list[i].value;
  return child_ctx;
}

function get_each_context_7(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[61] = list[i].offset;
  child_ctx[62] = list[i].stopColor;
  return child_ctx;
} // (276:1) {:else}


function create_else_block$1(ctx) {
  var text_1;
  var t;
  var text_1_x_value;
  var text_1_y_value;
  var block = {
    c: function create() {
      text_1 = svg_element("text");
      t = text("No data");
      this.h();
    },
    l: function claim(nodes) {
      text_1 = claim_svg_element(nodes, "text", {
        class: true,
        x: true,
        y: true
      });
      var text_1_nodes = children(text_1);
      t = claim_text(text_1_nodes, "No data");
      text_1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(text_1, "class", "message svelte-1qm22pe");
      attr_dev(text_1, "x", text_1_x_value =
      /*width*/
      ctx[1] / 2);
      attr_dev(text_1, "y", text_1_y_value =
      /*height*/
      ctx[0] / 2);
      add_location(text_1, file$2, 276, 2, 6440);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, text_1, anchor);
      append_hydration_dev(text_1, t);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*width*/
      2 && text_1_x_value !== (text_1_x_value =
      /*width*/
      ctx[1] / 2)) {
        attr_dev(text_1, "x", text_1_x_value);
      }

      if (dirty[0] &
      /*height*/
      1 && text_1_y_value !== (text_1_y_value =
      /*height*/
      ctx[0] / 2)) {
        attr_dev(text_1, "y", text_1_y_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(text_1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$1.name,
    type: "else",
    source: "(276:1) {:else}",
    ctx: ctx
  });
  return block;
} // (168:1) {#if $_trends.length}


function create_if_block$2(ctx) {
  var defs;
  var g3;
  var text_1;
  var tspan;
  var t0;
  var t1;
  var g0;
  var g1;
  var g1_transform_value;
  var g2;
  var g2_transform_value;
  var g4;
  var if_block1_anchor;
  var if_block2_anchor;
  var each_value_6 =
  /*gradients*/
  ctx[12];
  validate_each_argument(each_value_6);
  var each_blocks_4 = [];

  for (var i = 0; i < each_value_6.length; i += 1) {
    each_blocks_4[i] = create_each_block_6(get_each_context_6(ctx, each_value_6, i));
  }

  var if_block0 =
  /*labelUnit*/
  ctx[15] && create_if_block_3$1(ctx);
  var each_value_5 =
  /*$_availableYears*/
  ctx[18];
  validate_each_argument(each_value_5);
  var each_blocks_3 = [];

  for (var _i = 0; _i < each_value_5.length; _i += 1) {
    each_blocks_3[_i] = create_each_block_5(get_each_context_5(ctx, each_value_5, _i));
  }

  var each_value_4 =
  /*ticks*/
  ctx[14];
  validate_each_argument(each_value_4);
  var each_blocks_2 = [];

  for (var _i2 = 0; _i2 < each_value_4.length; _i2 += 1) {
    each_blocks_2[_i2] = create_each_block_4(get_each_context_4(ctx, each_value_4, _i2));
  }

  var each_value_3 =
  /*ticks*/
  ctx[14];
  validate_each_argument(each_value_3);
  var each_blocks_1 = [];

  for (var _i3 = 0; _i3 < each_value_3.length; _i3 += 1) {
    each_blocks_1[_i3] = create_each_block_3(get_each_context_3(ctx, each_value_3, _i3));
  }

  var each_value_2 =
  /*trendLines*/
  ctx[13];
  validate_each_argument(each_value_2);
  var each_blocks = [];

  for (var _i4 = 0; _i4 < each_value_2.length; _i4 += 1) {
    each_blocks[_i4] = create_each_block_2(get_each_context_2(ctx, each_value_2, _i4));
  }

  var if_block1 =
  /*$_availableYears*/
  ctx[18].length === 1 && create_if_block_2$1(ctx);
  var if_block2 =
  /*$_tooltip*/
  ctx[19].isVisible && create_if_block_1$1(ctx);
  var block = {
    c: function create() {
      defs = svg_element("defs");

      for (var _i5 = 0; _i5 < each_blocks_4.length; _i5 += 1) {
        each_blocks_4[_i5].c();
      }

      g3 = svg_element("g");
      text_1 = svg_element("text");
      tspan = svg_element("tspan");
      t0 = text(
      /*chartTitle*/
      ctx[11]);
      t1 = space();
      if (if_block0) if_block0.c();
      g0 = svg_element("g");

      for (var _i6 = 0; _i6 < each_blocks_3.length; _i6 += 1) {
        each_blocks_3[_i6].c();
      }

      g1 = svg_element("g");

      for (var _i7 = 0; _i7 < each_blocks_2.length; _i7 += 1) {
        each_blocks_2[_i7].c();
      }

      g2 = svg_element("g");

      for (var _i8 = 0; _i8 < each_blocks_1.length; _i8 += 1) {
        each_blocks_1[_i8].c();
      }

      g4 = svg_element("g");

      for (var _i9 = 0; _i9 < each_blocks.length; _i9 += 1) {
        each_blocks[_i9].c();
      }

      if (if_block1) if_block1.c();
      if_block1_anchor = empty();
      if (if_block2) if_block2.c();
      if_block2_anchor = empty();
      this.h();
    },
    l: function claim(nodes) {
      defs = claim_svg_element(nodes, "defs", {});
      var defs_nodes = children(defs);

      for (var _i10 = 0; _i10 < each_blocks_4.length; _i10 += 1) {
        each_blocks_4[_i10].l(defs_nodes);
      }

      defs_nodes.forEach(detach_dev);
      g3 = claim_svg_element(nodes, "g", {
        class: true
      });
      var g3_nodes = children(g3);
      text_1 = claim_svg_element(g3_nodes, "text", {
        class: true,
        x: true,
        y: true,
        "font-size": true
      });
      var text_1_nodes = children(text_1);
      tspan = claim_svg_element(text_1_nodes, "tspan", {
        class: true
      });
      var tspan_nodes = children(tspan);
      t0 = claim_text(tspan_nodes,
      /*chartTitle*/
      ctx[11]);
      tspan_nodes.forEach(detach_dev);
      t1 = claim_space(text_1_nodes);
      if (if_block0) if_block0.l(text_1_nodes);
      text_1_nodes.forEach(detach_dev);
      g0 = claim_svg_element(g3_nodes, "g", {
        class: true
      });
      var g0_nodes = children(g0);

      for (var _i11 = 0; _i11 < each_blocks_3.length; _i11 += 1) {
        each_blocks_3[_i11].l(g0_nodes);
      }

      g0_nodes.forEach(detach_dev);
      g1 = claim_svg_element(g3_nodes, "g", {
        class: true,
        transform: true
      });
      var g1_nodes = children(g1);

      for (var _i12 = 0; _i12 < each_blocks_2.length; _i12 += 1) {
        each_blocks_2[_i12].l(g1_nodes);
      }

      g1_nodes.forEach(detach_dev);
      g2 = claim_svg_element(g3_nodes, "g", {
        class: true,
        transform: true
      });
      var g2_nodes = children(g2);

      for (var _i13 = 0; _i13 < each_blocks_1.length; _i13 += 1) {
        each_blocks_1[_i13].l(g2_nodes);
      }

      g2_nodes.forEach(detach_dev);
      g3_nodes.forEach(detach_dev);
      g4 = claim_svg_element(nodes, "g", {
        class: true
      });
      var g4_nodes = children(g4);

      for (var _i14 = 0; _i14 < each_blocks.length; _i14 += 1) {
        each_blocks[_i14].l(g4_nodes);
      }

      g4_nodes.forEach(detach_dev);
      if (if_block1) if_block1.l(nodes);
      if_block1_anchor = empty();
      if (if_block2) if_block2.l(nodes);
      if_block2_anchor = empty();
      this.h();
    },
    h: function hydrate() {
      add_location(defs, file$2, 168, 2, 4116);
      attr_dev(tspan, "class", "svelte-1qm22pe");
      add_location(tspan, file$2, 190, 4, 4514);
      attr_dev(text_1, "class", "label svelte-1qm22pe");
      attr_dev(text_1, "x",
      /*xMed*/
      ctx[17]);
      attr_dev(text_1, "y",
      /*yLabel*/
      ctx[16]);
      attr_dev(text_1, "font-size", labelFontSize);
      add_location(text_1, file$2, 184, 3, 4421);
      attr_dev(g0, "class", "ref x svelte-1qm22pe");
      add_location(g0, file$2, 195, 3, 4620);
      attr_dev(g1, "class", "ref left svelte-1qm22pe");
      attr_dev(g1, "transform", g1_transform_value = "translate(" +
      /*x1*/
      ctx[7] + ",0)");
      add_location(g1, file$2, 205, 3, 4815);
      attr_dev(g2, "class", "ref right svelte-1qm22pe");
      attr_dev(g2, "transform", g2_transform_value = "translate(" +
      /*x2*/
      ctx[6] + ",0)");
      add_location(g2, file$2, 214, 3, 5037);
      attr_dev(g3, "class", "axes");
      add_location(g3, file$2, 183, 2, 4401);
      attr_dev(g4, "class", "curves");
      add_location(g4, file$2, 227, 2, 5284);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, defs, anchor);

      for (var _i15 = 0; _i15 < each_blocks_4.length; _i15 += 1) {
        each_blocks_4[_i15].m(defs, null);
      }

      insert_hydration_dev(target, g3, anchor);
      append_hydration_dev(g3, text_1);
      append_hydration_dev(text_1, tspan);
      append_hydration_dev(tspan, t0);
      append_hydration_dev(text_1, t1);
      if (if_block0) if_block0.m(text_1, null);
      append_hydration_dev(g3, g0);

      for (var _i16 = 0; _i16 < each_blocks_3.length; _i16 += 1) {
        each_blocks_3[_i16].m(g0, null);
      }

      append_hydration_dev(g3, g1);

      for (var _i17 = 0; _i17 < each_blocks_2.length; _i17 += 1) {
        each_blocks_2[_i17].m(g1, null);
      }

      append_hydration_dev(g3, g2);

      for (var _i18 = 0; _i18 < each_blocks_1.length; _i18 += 1) {
        each_blocks_1[_i18].m(g2, null);
      }

      insert_hydration_dev(target, g4, anchor);

      for (var _i19 = 0; _i19 < each_blocks.length; _i19 += 1) {
        each_blocks[_i19].m(g4, null);
      }

      if (if_block1) if_block1.m(target, anchor);
      insert_hydration_dev(target, if_block1_anchor, anchor);
      if (if_block2) if_block2.m(target, anchor);
      insert_hydration_dev(target, if_block2_anchor, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*gradients*/
      4096) {
        each_value_6 =
        /*gradients*/
        ctx[12];
        validate_each_argument(each_value_6);

        var _i20;

        for (_i20 = 0; _i20 < each_value_6.length; _i20 += 1) {
          var child_ctx = get_each_context_6(ctx, each_value_6, _i20);

          if (each_blocks_4[_i20]) {
            each_blocks_4[_i20].p(child_ctx, dirty);
          } else {
            each_blocks_4[_i20] = create_each_block_6(child_ctx);

            each_blocks_4[_i20].c();

            each_blocks_4[_i20].m(defs, null);
          }
        }

        for (; _i20 < each_blocks_4.length; _i20 += 1) {
          each_blocks_4[_i20].d(1);
        }

        each_blocks_4.length = each_value_6.length;
      }

      if (dirty[0] &
      /*chartTitle*/
      2048) set_data_dev(t0,
      /*chartTitle*/
      ctx[11]);

      if (
      /*labelUnit*/
      ctx[15]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_3$1(ctx);
          if_block0.c();
          if_block0.m(text_1, null);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }

      if (dirty[0] &
      /*xMed*/
      131072) {
        attr_dev(text_1, "x",
        /*xMed*/
        ctx[17]);
      }

      if (dirty[0] &
      /*yLabel*/
      65536) {
        attr_dev(text_1, "y",
        /*yLabel*/
        ctx[16]);
      }

      if (dirty[0] &
      /*$_layout, $_availableYears, yMin, yMax*/
      262668) {
        each_value_5 =
        /*$_availableYears*/
        ctx[18];
        validate_each_argument(each_value_5);

        var _i21;

        for (_i21 = 0; _i21 < each_value_5.length; _i21 += 1) {
          var _child_ctx = get_each_context_5(ctx, each_value_5, _i21);

          if (each_blocks_3[_i21]) {
            each_blocks_3[_i21].p(_child_ctx, dirty);
          } else {
            each_blocks_3[_i21] = create_each_block_5(_child_ctx);

            each_blocks_3[_i21].c();

            each_blocks_3[_i21].m(g0, null);
          }
        }

        for (; _i21 < each_blocks_3.length; _i21 += 1) {
          each_blocks_3[_i21].d(1);
        }

        each_blocks_3.length = each_value_5.length;
      }

      if (dirty[0] &
      /*ticks*/
      16384) {
        each_value_4 =
        /*ticks*/
        ctx[14];
        validate_each_argument(each_value_4);

        var _i22;

        for (_i22 = 0; _i22 < each_value_4.length; _i22 += 1) {
          var _child_ctx2 = get_each_context_4(ctx, each_value_4, _i22);

          if (each_blocks_2[_i22]) {
            each_blocks_2[_i22].p(_child_ctx2, dirty);
          } else {
            each_blocks_2[_i22] = create_each_block_4(_child_ctx2);

            each_blocks_2[_i22].c();

            each_blocks_2[_i22].m(g1, null);
          }
        }

        for (; _i22 < each_blocks_2.length; _i22 += 1) {
          each_blocks_2[_i22].d(1);
        }

        each_blocks_2.length = each_value_4.length;
      }

      if (dirty[0] &
      /*x1*/
      128 && g1_transform_value !== (g1_transform_value = "translate(" +
      /*x1*/
      ctx[7] + ",0)")) {
        attr_dev(g1, "transform", g1_transform_value);
      }

      if (dirty[0] &
      /*ticks*/
      16384) {
        each_value_3 =
        /*ticks*/
        ctx[14];
        validate_each_argument(each_value_3);

        var _i23;

        for (_i23 = 0; _i23 < each_value_3.length; _i23 += 1) {
          var _child_ctx3 = get_each_context_3(ctx, each_value_3, _i23);

          if (each_blocks_1[_i23]) {
            each_blocks_1[_i23].p(_child_ctx3, dirty);
          } else {
            each_blocks_1[_i23] = create_each_block_3(_child_ctx3);

            each_blocks_1[_i23].c();

            each_blocks_1[_i23].m(g2, null);
          }
        }

        for (; _i23 < each_blocks_1.length; _i23 += 1) {
          each_blocks_1[_i23].d(1);
        }

        each_blocks_1.length = each_value_3.length;
      }

      if (dirty[0] &
      /*x2*/
      64 && g2_transform_value !== (g2_transform_value = "translate(" +
      /*x2*/
      ctx[6] + ",0)")) {
        attr_dev(g2, "transform", g2_transform_value);
      }

      if (dirty[0] &
      /*trendLines, $_tooltip, highlightedId*/
      533504) {
        each_value_2 =
        /*trendLines*/
        ctx[13];
        validate_each_argument(each_value_2);

        var _i24;

        for (_i24 = 0; _i24 < each_value_2.length; _i24 += 1) {
          var _child_ctx4 = get_each_context_2(ctx, each_value_2, _i24);

          if (each_blocks[_i24]) {
            each_blocks[_i24].p(_child_ctx4, dirty);
          } else {
            each_blocks[_i24] = create_each_block_2(_child_ctx4);

            each_blocks[_i24].c();

            each_blocks[_i24].m(g4, null);
          }
        }

        for (; _i24 < each_blocks.length; _i24 += 1) {
          each_blocks[_i24].d(1);
        }

        each_blocks.length = each_value_2.length;
      }

      if (
      /*$_availableYears*/
      ctx[18].length === 1) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_2$1(ctx);
          if_block1.c();
          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }

      if (
      /*$_tooltip*/
      ctx[19].isVisible) {
        if (if_block2) {
          if_block2.p(ctx, dirty);
        } else {
          if_block2 = create_if_block_1$1(ctx);
          if_block2.c();
          if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(defs);
      destroy_each(each_blocks_4, detaching);
      if (detaching) detach_dev(g3);
      if (if_block0) if_block0.d();
      destroy_each(each_blocks_3, detaching);
      destroy_each(each_blocks_2, detaching);
      destroy_each(each_blocks_1, detaching);
      if (detaching) detach_dev(g4);
      destroy_each(each_blocks, detaching);
      if (if_block1) if_block1.d(detaching);
      if (detaching) detach_dev(if_block1_anchor);
      if (if_block2) if_block2.d(detaching);
      if (detaching) detach_dev(if_block2_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$2.name,
    type: "if",
    source: "(168:1) {#if $_trends.length}",
    ctx: ctx
  });
  return block;
} // (175:5) {#each value as {offset, stopColor}}


function create_each_block_7(ctx) {
  var stop;
  var stop_offset_value;
  var stop_stop_color_value;
  var block = {
    c: function create() {
      stop = svg_element("stop");
      this.h();
    },
    l: function claim(nodes) {
      stop = claim_svg_element(nodes, "stop", {
        offset: true,
        "stop-color": true
      });
      children(stop).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(stop, "offset", stop_offset_value =
      /*offset*/
      ctx[61]);
      attr_dev(stop, "stop-color", stop_stop_color_value =
      /*stopColor*/
      ctx[62]);
      add_location(stop, file$2, 175, 6, 4284);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, stop, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*gradients*/
      4096 && stop_offset_value !== (stop_offset_value =
      /*offset*/
      ctx[61])) {
        attr_dev(stop, "offset", stop_offset_value);
      }

      if (dirty[0] &
      /*gradients*/
      4096 && stop_stop_color_value !== (stop_stop_color_value =
      /*stopColor*/
      ctx[62])) {
        attr_dev(stop, "stop-color", stop_stop_color_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(stop);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_7.name,
    type: "each",
    source: "(175:5) {#each value as {offset, stopColor}}",
    ctx: ctx
  });
  return block;
} // (170:3) {#each gradients as {key, value}}


function create_each_block_6(ctx) {
  var linearGradient;
  var linearGradient_id_value;
  var each_value_7 =
  /*value*/
  ctx[39];
  validate_each_argument(each_value_7);
  var each_blocks = [];

  for (var i = 0; i < each_value_7.length; i += 1) {
    each_blocks[i] = create_each_block_7(get_each_context_7(ctx, each_value_7, i));
  }

  var block = {
    c: function create() {
      linearGradient = svg_element("linearGradient");

      for (var _i25 = 0; _i25 < each_blocks.length; _i25 += 1) {
        each_blocks[_i25].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      linearGradient = claim_svg_element(nodes, "linearGradient", {
        id: true,
        gradientUnits: true
      });
      var linearGradient_nodes = children(linearGradient);

      for (var _i26 = 0; _i26 < each_blocks.length; _i26 += 1) {
        each_blocks[_i26].l(linearGradient_nodes);
      }

      linearGradient_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(linearGradient, "id", linearGradient_id_value =
      /*key*/
      ctx[45]);
      attr_dev(linearGradient, "gradientUnits", "userSpaceOnUse");
      add_location(linearGradient, file$2, 170, 4, 4164);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, linearGradient, anchor);

      for (var _i27 = 0; _i27 < each_blocks.length; _i27 += 1) {
        each_blocks[_i27].m(linearGradient, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*gradients*/
      4096) {
        each_value_7 =
        /*value*/
        ctx[39];
        validate_each_argument(each_value_7);

        var _i28;

        for (_i28 = 0; _i28 < each_value_7.length; _i28 += 1) {
          var child_ctx = get_each_context_7(ctx, each_value_7, _i28);

          if (each_blocks[_i28]) {
            each_blocks[_i28].p(child_ctx, dirty);
          } else {
            each_blocks[_i28] = create_each_block_7(child_ctx);

            each_blocks[_i28].c();

            each_blocks[_i28].m(linearGradient, null);
          }
        }

        for (; _i28 < each_blocks.length; _i28 += 1) {
          each_blocks[_i28].d(1);
        }

        each_blocks.length = each_value_7.length;
      }

      if (dirty[0] &
      /*gradients*/
      4096 && linearGradient_id_value !== (linearGradient_id_value =
      /*key*/
      ctx[45])) {
        attr_dev(linearGradient, "id", linearGradient_id_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(linearGradient);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_6.name,
    type: "each",
    source: "(170:3) {#each gradients as {key, value}}",
    ctx: ctx
  });
  return block;
} // (192:4) {#if labelUnit}


function create_if_block_3$1(ctx) {
  var tspan;
  var t0;
  var t1;
  var t2;
  var block = {
    c: function create() {
      tspan = svg_element("tspan");
      t0 = text("[");
      t1 = text(
      /*labelUnit*/
      ctx[15]);
      t2 = text("]");
      this.h();
    },
    l: function claim(nodes) {
      tspan = claim_svg_element(nodes, "tspan", {
        class: true
      });
      var tspan_nodes = children(tspan);
      t0 = claim_text(tspan_nodes, "[");
      t1 = claim_text(tspan_nodes,
      /*labelUnit*/
      ctx[15]);
      t2 = claim_text(tspan_nodes, "]");
      tspan_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(tspan, "class", "svelte-1qm22pe");
      add_location(tspan, file$2, 192, 5, 4567);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, tspan, anchor);
      append_hydration_dev(tspan, t0);
      append_hydration_dev(tspan, t1);
      append_hydration_dev(tspan, t2);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*labelUnit*/
      32768) set_data_dev(t1,
      /*labelUnit*/
      ctx[15]);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(tspan);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_3$1.name,
    type: "if",
    source: "(192:4) {#if labelUnit}",
    ctx: ctx
  });
  return block;
} // (197:4) {#each $_availableYears as year}


function create_each_block_5(ctx) {
  var line_1;
  var line_1_x__value;
  var line_1_x__value_1;
  var block = {
    c: function create() {
      line_1 = svg_element("line");
      this.h();
    },
    l: function claim(nodes) {
      line_1 = claim_svg_element(nodes, "line", {
        x1: true,
        x2: true,
        y1: true,
        y2: true,
        class: true
      });
      children(line_1).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(line_1, "x1", line_1_x__value =
      /*$_layout*/
      ctx[9].scaleX(
      /*year*/
      ctx[56]));
      attr_dev(line_1, "x2", line_1_x__value_1 =
      /*$_layout*/
      ctx[9].scaleX(
      /*year*/
      ctx[56]));
      attr_dev(line_1, "y1",
      /*yMin*/
      ctx[3]);
      attr_dev(line_1, "y2",
      /*yMax*/
      ctx[2]);
      attr_dev(line_1, "class", "svelte-1qm22pe");
      add_location(line_1, file$2, 197, 5, 4680);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, line_1, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*$_layout, $_availableYears*/
      262656 && line_1_x__value !== (line_1_x__value =
      /*$_layout*/
      ctx[9].scaleX(
      /*year*/
      ctx[56]))) {
        attr_dev(line_1, "x1", line_1_x__value);
      }

      if (dirty[0] &
      /*$_layout, $_availableYears*/
      262656 && line_1_x__value_1 !== (line_1_x__value_1 =
      /*$_layout*/
      ctx[9].scaleX(
      /*year*/
      ctx[56]))) {
        attr_dev(line_1, "x2", line_1_x__value_1);
      }

      if (dirty[0] &
      /*yMin*/
      8) {
        attr_dev(line_1, "y1",
        /*yMin*/
        ctx[3]);
      }

      if (dirty[0] &
      /*yMax*/
      4) {
        attr_dev(line_1, "y2",
        /*yMax*/
        ctx[2]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(line_1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_5.name,
    type: "each",
    source: "(197:4) {#each $_availableYears as year}",
    ctx: ctx
  });
  return block;
} // (210:4) {#each ticks as {label, y}}


function create_each_block_4(ctx) {
  var line_1;
  var line_1_y__value;
  var line_1_y__value_1;
  var text_1;
  var t_value =
  /*label*/
  ctx[50] + "";
  var t;
  var text_1_dy_value;
  var block = {
    c: function create() {
      line_1 = svg_element("line");
      text_1 = svg_element("text");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      line_1 = claim_svg_element(nodes, "line", {
        x2: true,
        y1: true,
        y2: true,
        class: true
      });
      children(line_1).forEach(detach_dev);
      text_1 = claim_svg_element(nodes, "text", {
        dx: true,
        dy: true,
        "font-size": true,
        class: true
      });
      var text_1_nodes = children(text_1);
      t = claim_text(text_1_nodes, t_value);
      text_1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(line_1, "x2", "-10");
      attr_dev(line_1, "y1", line_1_y__value =
      /*y*/
      ctx[51]);
      attr_dev(line_1, "y2", line_1_y__value_1 =
      /*y*/
      ctx[51]);
      attr_dev(line_1, "class", "svelte-1qm22pe");
      add_location(line_1, file$2, 210, 5, 4915);
      attr_dev(text_1, "dx", "-15");
      attr_dev(text_1, "dy", text_1_dy_value =
      /*y*/
      ctx[51]);
      attr_dev(text_1, "font-size", axisFontSize);
      attr_dev(text_1, "class", "svelte-1qm22pe");
      add_location(text_1, file$2, 211, 5, 4952);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, line_1, anchor);
      insert_hydration_dev(target, text_1, anchor);
      append_hydration_dev(text_1, t);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*ticks*/
      16384 && line_1_y__value !== (line_1_y__value =
      /*y*/
      ctx[51])) {
        attr_dev(line_1, "y1", line_1_y__value);
      }

      if (dirty[0] &
      /*ticks*/
      16384 && line_1_y__value_1 !== (line_1_y__value_1 =
      /*y*/
      ctx[51])) {
        attr_dev(line_1, "y2", line_1_y__value_1);
      }

      if (dirty[0] &
      /*ticks*/
      16384 && t_value !== (t_value =
      /*label*/
      ctx[50] + "")) set_data_dev(t, t_value);

      if (dirty[0] &
      /*ticks*/
      16384 && text_1_dy_value !== (text_1_dy_value =
      /*y*/
      ctx[51])) {
        attr_dev(text_1, "dy", text_1_dy_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(line_1);
      if (detaching) detach_dev(text_1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_4.name,
    type: "each",
    source: "(210:4) {#each ticks as {label, y}}",
    ctx: ctx
  });
  return block;
} // (219:4) {#each ticks as {label, y}}


function create_each_block_3(ctx) {
  var line_1;
  var line_1_y__value;
  var line_1_y__value_1;
  var text_1;
  var t_value =
  /*label*/
  ctx[50] + "";
  var t;
  var text_1_dy_value;
  var block = {
    c: function create() {
      line_1 = svg_element("line");
      text_1 = svg_element("text");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      line_1 = claim_svg_element(nodes, "line", {
        x2: true,
        y1: true,
        y2: true,
        class: true
      });
      children(line_1).forEach(detach_dev);
      text_1 = claim_svg_element(nodes, "text", {
        dx: true,
        dy: true,
        "font-size": true,
        class: true
      });
      var text_1_nodes = children(text_1);
      t = claim_text(text_1_nodes, t_value);
      text_1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(line_1, "x2", "10");
      attr_dev(line_1, "y1", line_1_y__value =
      /*y*/
      ctx[51]);
      attr_dev(line_1, "y2", line_1_y__value_1 =
      /*y*/
      ctx[51]);
      attr_dev(line_1, "class", "svelte-1qm22pe");
      add_location(line_1, file$2, 219, 5, 5138);
      attr_dev(text_1, "dx", "15");
      attr_dev(text_1, "dy", text_1_dy_value =
      /*y*/
      ctx[51]);
      attr_dev(text_1, "font-size", axisFontSize);
      attr_dev(text_1, "class", "svelte-1qm22pe");
      add_location(text_1, file$2, 220, 5, 5174);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, line_1, anchor);
      insert_hydration_dev(target, text_1, anchor);
      append_hydration_dev(text_1, t);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*ticks*/
      16384 && line_1_y__value !== (line_1_y__value =
      /*y*/
      ctx[51])) {
        attr_dev(line_1, "y1", line_1_y__value);
      }

      if (dirty[0] &
      /*ticks*/
      16384 && line_1_y__value_1 !== (line_1_y__value_1 =
      /*y*/
      ctx[51])) {
        attr_dev(line_1, "y2", line_1_y__value_1);
      }

      if (dirty[0] &
      /*ticks*/
      16384 && t_value !== (t_value =
      /*label*/
      ctx[50] + "")) set_data_dev(t, t_value);

      if (dirty[0] &
      /*ticks*/
      16384 && text_1_dy_value !== (text_1_dy_value =
      /*y*/
      ctx[51])) {
        attr_dev(text_1, "dy", text_1_dy_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(line_1);
      if (detaching) detach_dev(text_1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_3.name,
    type: "each",
    source: "(219:4) {#each ticks as {label, y}}",
    ctx: ctx
  });
  return block;
} // (229:3) {#each trendLines as {key, value: {path, isSelected}}}


function create_each_block_2(ctx) {
  var path;
  var path_d_value;
  var path_stroke_value;
  var block = {
    c: function create() {
      path = svg_element("path");
      this.h();
    },
    l: function claim(nodes) {
      path = claim_svg_element(nodes, "path", {
        d: true,
        stroke: true,
        class: true
      });
      children(path).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(path, "d", path_d_value =
      /*path*/
      ctx[46]);
      attr_dev(path, "stroke", path_stroke_value = "url(#" +
      /*key*/
      ctx[45] + ")");
      attr_dev(path, "class", "svelte-1qm22pe");
      toggle_class(path, "deselected", !
      /*isSelected*/
      ctx[47]);
      toggle_class(path, "dimmed",
      /*$_tooltip*/
      ctx[19].isVisible &&
      /*highlightedId*/
      ctx[10] !==
      /*key*/
      ctx[45]);
      toggle_class(path, "focused",
      /*$_tooltip*/
      ctx[19].isVisible &&
      /*highlightedId*/
      ctx[10] ===
      /*key*/
      ctx[45]);
      add_location(path, file$2, 229, 4, 5365);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, path, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*trendLines*/
      8192 && path_d_value !== (path_d_value =
      /*path*/
      ctx[46])) {
        attr_dev(path, "d", path_d_value);
      }

      if (dirty[0] &
      /*trendLines*/
      8192 && path_stroke_value !== (path_stroke_value = "url(#" +
      /*key*/
      ctx[45] + ")")) {
        attr_dev(path, "stroke", path_stroke_value);
      }

      if (dirty[0] &
      /*trendLines*/
      8192) {
        toggle_class(path, "deselected", !
        /*isSelected*/
        ctx[47]);
      }

      if (dirty[0] &
      /*$_tooltip, highlightedId, trendLines*/
      533504) {
        toggle_class(path, "dimmed",
        /*$_tooltip*/
        ctx[19].isVisible &&
        /*highlightedId*/
        ctx[10] !==
        /*key*/
        ctx[45]);
      }

      if (dirty[0] &
      /*$_tooltip, highlightedId, trendLines*/
      533504) {
        toggle_class(path, "focused",
        /*$_tooltip*/
        ctx[19].isVisible &&
        /*highlightedId*/
        ctx[10] ===
        /*key*/
        ctx[45]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(path);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_2.name,
    type: "each",
    source: "(229:3) {#each trendLines as {key, value: {path, isSelected}}}",
    ctx: ctx
  });
  return block;
} // (242:2) {#if $_availableYears.length === 1}


function create_if_block_2$1(ctx) {
  var g;
  var each_value =
  /*$_trends*/
  ctx[8];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }

  var block = {
    c: function create() {
      g = svg_element("g");

      for (var _i29 = 0; _i29 < each_blocks.length; _i29 += 1) {
        each_blocks[_i29].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      g = claim_svg_element(nodes, "g", {});
      var g_nodes = children(g);

      for (var _i30 = 0; _i30 < each_blocks.length; _i30 += 1) {
        each_blocks[_i30].l(g_nodes);
      }

      g_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(g, file$2, 242, 3, 5679);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, g, anchor);

      for (var _i31 = 0; _i31 < each_blocks.length; _i31 += 1) {
        each_blocks[_i31].m(g, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*$_trends, getX, getY, $_layout*/
      816) {
        each_value =
        /*$_trends*/
        ctx[8];
        validate_each_argument(each_value);

        var _i32;

        for (_i32 = 0; _i32 < each_value.length; _i32 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i32);

          if (each_blocks[_i32]) {
            each_blocks[_i32].p(child_ctx, dirty);
          } else {
            each_blocks[_i32] = create_each_block(child_ctx);

            each_blocks[_i32].c();

            each_blocks[_i32].m(g, null);
          }
        }

        for (; _i32 < each_blocks.length; _i32 += 1) {
          each_blocks[_i32].d(1);
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
    block: block,
    id: create_if_block_2$1.name,
    type: "if",
    source: "(242:2) {#if $_availableYears.length === 1}",
    ctx: ctx
  });
  return block;
} // (245:5) {#each value as d}


function create_each_block_1(ctx) {
  var circle;
  var circle_cx_value;
  var circle_cy_value;
  var circle_r_value;
  var block = {
    c: function create() {
      circle = svg_element("circle");
      this.h();
    },
    l: function claim(nodes) {
      circle = claim_svg_element(nodes, "circle", {
        cx: true,
        cy: true,
        r: true,
        class: true
      });
      children(circle).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(circle, "cx", circle_cx_value =
      /*getX*/
      ctx[5](
      /*d*/
      ctx[42]));
      attr_dev(circle, "cy", circle_cy_value =
      /*getY*/
      ctx[4](
      /*d*/
      ctx[42]));
      attr_dev(circle, "r", circle_r_value =
      /*$_layout*/
      ctx[9].radius);
      attr_dev(circle, "class", "svelte-1qm22pe");
      add_location(circle, file$2, 245, 6, 5745);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, circle, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*getX, $_trends*/
      288 && circle_cx_value !== (circle_cx_value =
      /*getX*/
      ctx[5](
      /*d*/
      ctx[42]))) {
        attr_dev(circle, "cx", circle_cx_value);
      }

      if (dirty[0] &
      /*getY, $_trends*/
      272 && circle_cy_value !== (circle_cy_value =
      /*getY*/
      ctx[4](
      /*d*/
      ctx[42]))) {
        attr_dev(circle, "cy", circle_cy_value);
      }

      if (dirty[0] &
      /*$_layout*/
      512 && circle_r_value !== (circle_r_value =
      /*$_layout*/
      ctx[9].radius)) {
        attr_dev(circle, "r", circle_r_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(circle);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_1.name,
    type: "each",
    source: "(245:5) {#each value as d}",
    ctx: ctx
  });
  return block;
} // (244:4) {#each $_trends as {value}}


function create_each_block(ctx) {
  var each_1_anchor;
  var each_value_1 =
  /*value*/
  ctx[39];
  validate_each_argument(each_value_1);
  var each_blocks = [];

  for (var i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }

  var block = {
    c: function create() {
      for (var _i33 = 0; _i33 < each_blocks.length; _i33 += 1) {
        each_blocks[_i33].c();
      }

      each_1_anchor = empty();
    },
    l: function claim(nodes) {
      for (var _i34 = 0; _i34 < each_blocks.length; _i34 += 1) {
        each_blocks[_i34].l(nodes);
      }

      each_1_anchor = empty();
    },
    m: function mount(target, anchor) {
      for (var _i35 = 0; _i35 < each_blocks.length; _i35 += 1) {
        each_blocks[_i35].m(target, anchor);
      }

      insert_hydration_dev(target, each_1_anchor, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*getX, $_trends, getY, $_layout*/
      816) {
        each_value_1 =
        /*value*/
        ctx[39];
        validate_each_argument(each_value_1);

        var _i36;

        for (_i36 = 0; _i36 < each_value_1.length; _i36 += 1) {
          var child_ctx = get_each_context_1(ctx, each_value_1, _i36);

          if (each_blocks[_i36]) {
            each_blocks[_i36].p(child_ctx, dirty);
          } else {
            each_blocks[_i36] = create_each_block_1(child_ctx);

            each_blocks[_i36].c();

            each_blocks[_i36].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }

        for (; _i36 < each_blocks.length; _i36 += 1) {
          each_blocks[_i36].d(1);
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
    block: block,
    id: create_each_block.name,
    type: "each",
    source: "(244:4) {#each $_trends as {value}}",
    ctx: ctx
  });
  return block;
} // (258:2) {#if $_tooltip.isVisible}


function create_if_block_1$1(ctx) {
  var g1;
  var circle;
  var circle_r_value;
  var g0;
  var text0;
  var t0_value =
  /*$_tooltip*/
  ctx[19].value + "";
  var t0;
  var text1;
  var t1_value =
  /*$_tooltip*/
  ctx[19].value + "";
  var t1;
  var text2;
  var t2_value =
  /*$_tooltip*/
  ctx[19].label + "";
  var t2;
  var text3;
  var t3_value =
  /*$_tooltip*/
  ctx[19].label + "";
  var t3;
  var g0_transform_value;
  var g1_transform_value;
  var block = {
    c: function create() {
      g1 = svg_element("g");
      circle = svg_element("circle");
      g0 = svg_element("g");
      text0 = svg_element("text");
      t0 = text(t0_value);
      text1 = svg_element("text");
      t1 = text(t1_value);
      text2 = svg_element("text");
      t2 = text(t2_value);
      text3 = svg_element("text");
      t3 = text(t3_value);
      this.h();
    },
    l: function claim(nodes) {
      g1 = claim_svg_element(nodes, "g", {
        class: true,
        transform: true
      });
      var g1_nodes = children(g1);
      circle = claim_svg_element(g1_nodes, "circle", {
        r: true,
        class: true
      });
      children(circle).forEach(detach_dev);
      g0 = claim_svg_element(g1_nodes, "g", {
        transform: true,
        class: true
      });
      var g0_nodes = children(g0);
      text0 = claim_svg_element(g0_nodes, "text", {
        dy: true,
        class: true
      });
      var text0_nodes = children(text0);
      t0 = claim_text(text0_nodes, t0_value);
      text0_nodes.forEach(detach_dev);
      text1 = claim_svg_element(g0_nodes, "text", {
        dy: true,
        class: true
      });
      var text1_nodes = children(text1);
      t1 = claim_text(text1_nodes, t1_value);
      text1_nodes.forEach(detach_dev);
      text2 = claim_svg_element(g0_nodes, "text", {
        dy: true,
        class: true
      });
      var text2_nodes = children(text2);
      t2 = claim_text(text2_nodes, t2_value);
      text2_nodes.forEach(detach_dev);
      text3 = claim_svg_element(g0_nodes, "text", {
        dy: true,
        class: true
      });
      var text3_nodes = children(text3);
      t3 = claim_text(text3_nodes, t3_value);
      text3_nodes.forEach(detach_dev);
      g0_nodes.forEach(detach_dev);
      g1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(circle, "r", circle_r_value =
      /*$_layout*/
      ctx[9].radius);
      attr_dev(circle, "class", "svelte-1qm22pe");
      add_location(circle, file$2, 262, 4, 6014);
      attr_dev(text0, "dy", -
      /*tooltipShift*/
      ctx[20]);
      attr_dev(text0, "class", "bkg svelte-1qm22pe");
      add_location(text0, file$2, 267, 5, 6166);
      attr_dev(text1, "dy", -
      /*tooltipShift*/
      ctx[20]);
      attr_dev(text1, "class", "svelte-1qm22pe");
      add_location(text1, file$2, 268, 5, 6233);
      attr_dev(text2, "dy",
      /*tooltipShift*/
      ctx[20]);
      attr_dev(text2, "class", "bkg svelte-1qm22pe");
      add_location(text2, file$2, 269, 5, 6288);
      attr_dev(text3, "dy",
      /*tooltipShift*/
      ctx[20]);
      attr_dev(text3, "class", "svelte-1qm22pe");
      add_location(text3, file$2, 270, 5, 6354);
      attr_dev(g0, "transform", g0_transform_value = "translate(" +
      /*$_tooltip*/
      ctx[19].shiftX + "," +
      /*$_tooltip*/
      ctx[19].shiftY + ")");
      attr_dev(g0, "class", "svelte-1qm22pe");
      toggle_class(g0, "right",
      /*$_tooltip*/
      ctx[19].isRight);
      add_location(g0, file$2, 263, 4, 6049);
      attr_dev(g1, "class", "marker svelte-1qm22pe");
      attr_dev(g1, "transform", g1_transform_value = "translate(" +
      /*$_tooltip*/
      ctx[19].dotX + "," +
      /*$_tooltip*/
      ctx[19].dotY + ")");
      add_location(g1, file$2, 258, 3, 5922);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, g1, anchor);
      append_hydration_dev(g1, circle);
      append_hydration_dev(g1, g0);
      append_hydration_dev(g0, text0);
      append_hydration_dev(text0, t0);
      append_hydration_dev(g0, text1);
      append_hydration_dev(text1, t1);
      append_hydration_dev(g0, text2);
      append_hydration_dev(text2, t2);
      append_hydration_dev(g0, text3);
      append_hydration_dev(text3, t3);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*$_layout*/
      512 && circle_r_value !== (circle_r_value =
      /*$_layout*/
      ctx[9].radius)) {
        attr_dev(circle, "r", circle_r_value);
      }

      if (dirty[0] &
      /*$_tooltip*/
      524288 && t0_value !== (t0_value =
      /*$_tooltip*/
      ctx[19].value + "")) set_data_dev(t0, t0_value);
      if (dirty[0] &
      /*$_tooltip*/
      524288 && t1_value !== (t1_value =
      /*$_tooltip*/
      ctx[19].value + "")) set_data_dev(t1, t1_value);
      if (dirty[0] &
      /*$_tooltip*/
      524288 && t2_value !== (t2_value =
      /*$_tooltip*/
      ctx[19].label + "")) set_data_dev(t2, t2_value);
      if (dirty[0] &
      /*$_tooltip*/
      524288 && t3_value !== (t3_value =
      /*$_tooltip*/
      ctx[19].label + "")) set_data_dev(t3, t3_value);

      if (dirty[0] &
      /*$_tooltip*/
      524288 && g0_transform_value !== (g0_transform_value = "translate(" +
      /*$_tooltip*/
      ctx[19].shiftX + "," +
      /*$_tooltip*/
      ctx[19].shiftY + ")")) {
        attr_dev(g0, "transform", g0_transform_value);
      }

      if (dirty[0] &
      /*$_tooltip*/
      524288) {
        toggle_class(g0, "right",
        /*$_tooltip*/
        ctx[19].isRight);
      }

      if (dirty[0] &
      /*$_tooltip*/
      524288 && g1_transform_value !== (g1_transform_value = "translate(" +
      /*$_tooltip*/
      ctx[19].dotX + "," +
      /*$_tooltip*/
      ctx[19].dotY + ")")) {
        attr_dev(g1, "transform", g1_transform_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(g1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$1.name,
    type: "if",
    source: "(258:2) {#if $_tooltip.isVisible}",
    ctx: ctx
  });
  return block;
}

function create_fragment$3(ctx) {
  var g;
  var rect;
  var mounted;
  var dispose;

  function select_block_type(ctx, dirty) {
    if (
    /*$_trends*/
    ctx[8].length) return create_if_block$2;
    return create_else_block$1;
  }

  var current_block_type = select_block_type(ctx);
  var if_block = current_block_type(ctx);
  var block = {
    c: function create() {
      g = svg_element("g");
      rect = svg_element("rect");
      if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      g = claim_svg_element(nodes, "g", {
        class: true
      });
      var g_nodes = children(g);
      rect = claim_svg_element(g_nodes, "rect", {
        height: true,
        width: true,
        class: true
      });
      children(rect).forEach(detach_dev);
      if_block.l(g_nodes);
      g_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(rect, "height",
      /*height*/
      ctx[0]);
      attr_dev(rect, "width",
      /*width*/
      ctx[1]);
      attr_dev(rect, "class", "sensor svelte-1qm22pe");
      add_location(rect, file$2, 159, 1, 3982);
      attr_dev(g, "class", "TrendsG");
      add_location(g, file$2, 158, 0, 3961);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, g, anchor);
      append_hydration_dev(g, rect);
      if_block.m(g, null);

      if (!mounted) {
        dispose = [listen_dev(rect, "mouseleave",
        /*onMouseLeave*/
        ctx[23], false, false, false), listen_dev(rect, "mousemove",
        /*onMouseMove*/
        ctx[22], false, false, false)];
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*height*/
      1) {
        attr_dev(rect, "height",
        /*height*/
        ctx[0]);
      }

      if (dirty[0] &
      /*width*/
      2) {
        attr_dev(rect, "width",
        /*width*/
        ctx[1]);
      }

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
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(g);
      if_block.d();
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$3.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

var gap = 4;
var labelFontSize = 14;
var axisFontSize = 12;
var tooltipFontSize = 10;
var tooltipPadding = 5;

function instance$3($$self, $$props, $$invalidate) {
  var maxOrder;
  var X1;
  var X2;
  var x1;
  var x2;
  var xMed;
  var yMin;
  var yMax;
  var yLabel;
  var labelUnit;
  var scaleY;
  var ticks;
  var getX;
  var getY;
  var lineGenerator;
  var trendLines;
  var getStopOffset;
  var gradients;
  var chartTitle;
  var quadTree;
  var $_trends;
  var $_layout;
  var $_availableYears;
  var $_tooltip;
  validate_store(_trends, '_trends');
  component_subscribe($$self, _trends, function ($$value) {
    return $$invalidate(8, $_trends = $$value);
  });
  validate_store(_timelineLayout, '_layout');
  component_subscribe($$self, _timelineLayout, function ($$value) {
    return $$invalidate(9, $_layout = $$value);
  });
  validate_store(_availableYears, '_availableYears');
  component_subscribe($$self, _availableYears, function ($$value) {
    return $$invalidate(18, $_availableYears = $$value);
  });
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
      $$props.$$scope;
  validate_slots('TrendsG', slots, []);
  var tooltipShift = 1.5 * tooltipPadding + 0.5 * tooltipFontSize;
  var _$$props$colorScale = $$props.colorScale,
      colorScale = _$$props$colorScale === void 0 ? null : _$$props$colorScale;
  var _$$props$data = $$props.data,
      data = _$$props$data === void 0 ? null : _$$props$data;
  var _$$props$formatFn = $$props.formatFn,
      formatFn = _$$props$formatFn === void 0 ? null : _$$props$formatFn;
  var _$$props$getIndicator = $$props.getIndicatorValue,
      getIndicatorValue = _$$props$getIndicator === void 0 ? null : _$$props$getIndicator;
  var _$$props$height = $$props.height,
      height = _$$props$height === void 0 ? null : _$$props$height;
  var _$$props$schema = $$props.schema,
      schema = _$$props$schema === void 0 ? null : _$$props$schema;
  var _$$props$types = $$props.types,
      types = _$$props$types === void 0 ? null : _$$props$types;
  var _$$props$useRankScale = $$props.useRankScale,
      useRankScale = _$$props$useRankScale === void 0 ? false : _$$props$useRankScale;
  var _$$props$width = $$props.width,
      width = _$$props$width === void 0 ? null : _$$props$width;
  /* local vars */

  var highlightedId;
  var tooltipDefault = {
    isVisible: false
  };

  var _tooltip = writable(tooltipDefault);

  validate_store(_tooltip, '_tooltip');
  component_subscribe($$self, _tooltip, function (value) {
    return $$invalidate(19, $_tooltip = value);
  });

  var onMouseMove = function onMouseMove(event) {
    var offsetX = event.offsetX,
        offsetY = event.offsetY;

    if (offsetX < x1 || offsetX > x2 || !quadTree) {
      _tooltip.set(tooltipDefault);

      return;
    }

    var datum = quadTree.find(offsetX, offsetY);
    var region_id = datum.region_id,
        _datum$region = datum.region,
        id = _datum$region.id,
        name = _datum$region.name;
    $$invalidate(10, highlightedId = id);
    var dotX = getX(datum);
    var dotY = getY(datum);
    var isRight = dotX > (X1 + X2) / 2;
    var shiftX = isRight ? -tooltipShift : tooltipShift;
    var shiftY = Math.max(yMin + tooltipShift, Math.min(dotY, yMax - tooltipShift)) - dotY;

    _tooltip.update(mergeObj(_objectSpread(_objectSpread({}, datum), {}, {
      dotX: dotX,
      dotY: dotY,
      isRight: isRight,
      isVisible: true,
      label: "".concat(name, " (").concat(region_id, ")"),
      shiftX: shiftX,
      shiftY: shiftY,
      value: formatFn(getIndicatorValue(datum))
    })));
  };

  var onMouseLeave = function onMouseLeave() {
    _tooltip.set(tooltipDefault);
  };

  var writable_props = ['colorScale', 'data', 'formatFn', 'getIndicatorValue', 'height', 'schema', 'types', 'useRankScale', 'width'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<TrendsG> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$$set = function ($$props) {
    if ('colorScale' in $$props) $$invalidate(24, colorScale = $$props.colorScale);
    if ('data' in $$props) $$invalidate(25, data = $$props.data);
    if ('formatFn' in $$props) $$invalidate(26, formatFn = $$props.formatFn);
    if ('getIndicatorValue' in $$props) $$invalidate(27, getIndicatorValue = $$props.getIndicatorValue);
    if ('height' in $$props) $$invalidate(0, height = $$props.height);
    if ('schema' in $$props) $$invalidate(28, schema = $$props.schema);
    if ('types' in $$props) $$invalidate(29, types = $$props.types);
    if ('useRankScale' in $$props) $$invalidate(30, useRankScale = $$props.useRankScale);
    if ('width' in $$props) $$invalidate(1, width = $$props.width);
  };

  $$self.$capture_state = function () {
    return {
      _: _,
      applyFnMap: applyFnMap,
      isIterableNotEmpty: isIterableNotEmpty,
      mergeObj: mergeObj,
      transformValues: transformValues,
      max: max,
      quadtree: quadtree,
      scaleLinear: linear,
      line: line,
      curveMonotoneX: monotoneX,
      writable: writable,
      _availableYears: _availableYears,
      _layout: _timelineLayout,
      _trends: _trends,
      getOrder: getOrder,
      gap: gap,
      labelFontSize: labelFontSize,
      axisFontSize: axisFontSize,
      tooltipFontSize: tooltipFontSize,
      tooltipPadding: tooltipPadding,
      tooltipShift: tooltipShift,
      colorScale: colorScale,
      data: data,
      formatFn: formatFn,
      getIndicatorValue: getIndicatorValue,
      height: height,
      schema: schema,
      types: types,
      useRankScale: useRankScale,
      width: width,
      highlightedId: highlightedId,
      tooltipDefault: tooltipDefault,
      _tooltip: _tooltip,
      onMouseMove: onMouseMove,
      onMouseLeave: onMouseLeave,
      yMax: yMax,
      yMin: yMin,
      X2: X2,
      X1: X1,
      getY: getY,
      getX: getX,
      quadTree: quadTree,
      x2: x2,
      x1: x1,
      chartTitle: chartTitle,
      getStopOffset: getStopOffset,
      gradients: gradients,
      lineGenerator: lineGenerator,
      trendLines: trendLines,
      scaleY: scaleY,
      ticks: ticks,
      maxOrder: maxOrder,
      labelUnit: labelUnit,
      yLabel: yLabel,
      xMed: xMed,
      $_trends: $_trends,
      $_layout: $_layout,
      $_availableYears: $_availableYears,
      $_tooltip: $_tooltip
    };
  };

  $$self.$inject_state = function ($$props) {
    if ('colorScale' in $$props) $$invalidate(24, colorScale = $$props.colorScale);
    if ('data' in $$props) $$invalidate(25, data = $$props.data);
    if ('formatFn' in $$props) $$invalidate(26, formatFn = $$props.formatFn);
    if ('getIndicatorValue' in $$props) $$invalidate(27, getIndicatorValue = $$props.getIndicatorValue);
    if ('height' in $$props) $$invalidate(0, height = $$props.height);
    if ('schema' in $$props) $$invalidate(28, schema = $$props.schema);
    if ('types' in $$props) $$invalidate(29, types = $$props.types);
    if ('useRankScale' in $$props) $$invalidate(30, useRankScale = $$props.useRankScale);
    if ('width' in $$props) $$invalidate(1, width = $$props.width);
    if ('highlightedId' in $$props) $$invalidate(10, highlightedId = $$props.highlightedId);
    if ('yMax' in $$props) $$invalidate(2, yMax = $$props.yMax);
    if ('yMin' in $$props) $$invalidate(3, yMin = $$props.yMin);
    if ('X2' in $$props) X2 = $$props.X2;
    if ('X1' in $$props) X1 = $$props.X1;
    if ('getY' in $$props) $$invalidate(4, getY = $$props.getY);
    if ('getX' in $$props) $$invalidate(5, getX = $$props.getX);
    if ('quadTree' in $$props) quadTree = $$props.quadTree;
    if ('x2' in $$props) $$invalidate(6, x2 = $$props.x2);
    if ('x1' in $$props) $$invalidate(7, x1 = $$props.x1);
    if ('chartTitle' in $$props) $$invalidate(11, chartTitle = $$props.chartTitle);
    if ('getStopOffset' in $$props) $$invalidate(31, getStopOffset = $$props.getStopOffset);
    if ('gradients' in $$props) $$invalidate(12, gradients = $$props.gradients);
    if ('lineGenerator' in $$props) $$invalidate(32, lineGenerator = $$props.lineGenerator);
    if ('trendLines' in $$props) $$invalidate(13, trendLines = $$props.trendLines);
    if ('scaleY' in $$props) $$invalidate(33, scaleY = $$props.scaleY);
    if ('ticks' in $$props) $$invalidate(14, ticks = $$props.ticks);
    if ('maxOrder' in $$props) $$invalidate(34, maxOrder = $$props.maxOrder);
    if ('labelUnit' in $$props) $$invalidate(15, labelUnit = $$props.labelUnit);
    if ('yLabel' in $$props) $$invalidate(16, yLabel = $$props.yLabel);
    if ('xMed' in $$props) $$invalidate(17, xMed = $$props.xMed);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty[0] &
    /*data*/
    33554432) {
      /* reactive vars */
      // data
      $$invalidate(34, maxOrder = max(data.rankedData, getOrder));
    }

    if ($$self.$$.dirty[0] &
    /*$_layout, data*/
    33554944) {
      // layout
      X1 = $_layout.fullScaleX(data.year_extent[0]);
    }

    if ($$self.$$.dirty[0] &
    /*$_layout, data*/
    33554944) {
      X2 = $_layout.fullScaleX(data.year_extent[1]);
    }

    if ($$self.$$.dirty[0] &
    /*$_layout, data*/
    33554944) {
      $$invalidate(7, x1 = $_layout.scaleX(data.year_extent[0]));
    }

    if ($$self.$$.dirty[0] &
    /*$_layout, data*/
    33554944) {
      $$invalidate(6, x2 = $_layout.scaleX(data.year_extent[1]));
    }

    if ($$self.$$.dirty[0] &
    /*x1, x2*/
    192) {
      $$invalidate(17, xMed = (x1 + x2) / 2);
    }

    if ($$self.$$.dirty[0] &
    /*$_layout*/
    512) {
      $$invalidate(3, yMin = $_layout.radius + 2 * gap + labelFontSize);
    }

    if ($$self.$$.dirty[0] &
    /*height, $_layout*/
    513) {
      $$invalidate(2, yMax = height - Math.max($_layout.radius, axisFontSize / 2) - gap);
    }

    if ($$self.$$.dirty[0] &
    /*schema, types*/
    805306368) {
      $$invalidate(15, labelUnit = schema.value.unit_string || schema.value.type && has(types, schema.value.type) && has(types[schema.value.type], 'unit_string') && types[schema.value.type].unit_string);
    }

    if ($$self.$$.dirty[0] &
    /*useRankScale, yMin, yMax, data*/
    1107296268 | $$self.$$.dirty[1] &
    /*maxOrder*/
    8) {
      $$invalidate(33, scaleY = useRankScale ? linear().domain([0, maxOrder]).range([yMin, yMax]) : linear().domain(data.valueExtext).range([yMax, yMin]));
    }

    if ($$self.$$.dirty[0] &
    /*useRankScale, formatFn*/
    1140850688 | $$self.$$.dirty[1] &
    /*scaleY*/
    4) {
      $$invalidate(14, ticks = scaleY && scaleY.ticks().map(function (value) {
        return {
          label: useRankScale ? value + 1 : formatFn(value),
          y: scaleY(value)
        };
      }));
    }

    if ($$self.$$.dirty[0] &
    /*$_layout*/
    512) {
      $$invalidate(5, getX = function getX(d) {
        return $_layout.scaleX(d.year);
      });
    }

    if ($$self.$$.dirty[0] &
    /*useRankScale, getIndicatorValue*/
    1207959552 | $$self.$$.dirty[1] &
    /*scaleY*/
    4) {
      $$invalidate(4, getY = function getY(d) {
        return useRankScale ? scaleY(d.order) : scaleY(getIndicatorValue(d));
      });
    }

    if ($$self.$$.dirty[0] &
    /*getX, getY*/
    48) {
      $$invalidate(32, lineGenerator = line().x(getX).y(getY).curve(monotoneX));
    }

    if ($$self.$$.dirty[0] &
    /*$_trends*/
    256 | $$self.$$.dirty[1] &
    /*lineGenerator*/
    2) {
      $$invalidate(13, trendLines = map($_trends, transformValues({
        key: Number,
        value: applyFnMap({
          path: lineGenerator,
          isSelected: function isSelected(points) {
            return points[0].isSelected;
          }
        }) // all points have same `id`, so same selection status

      })));
    }

    if ($$self.$$.dirty[0] &
    /*$_layout, width*/
    514) {
      // color
      $$invalidate(31, getStopOffset = function getStopOffset(d) {
        return "".concat(100 * $_layout.scaleX(d.year) / width, "%");
      });
    }

    if ($$self.$$.dirty[0] &
    /*$_trends, getIndicatorValue, colorScale*/
    150995200 | $$self.$$.dirty[1] &
    /*getStopOffset*/
    1) {
      $$invalidate(12, gradients = map($_trends, transformValues({
        value: mapWith(applyFnMap({
          offset: getStopOffset,
          stopColor: pipe([getIndicatorValue, colorScale])
        }))
      })));
    }

    if ($$self.$$.dirty[0] &
    /*useRankScale, schema*/
    1342177280) {
      $$invalidate(11, chartTitle = "".concat(useRankScale ? 'Ranking by ' : '').concat(schema.value.label));
    }

    if ($$self.$$.dirty[0] &
    /*data, getX, getY, x1, x2, height*/
    33554673) {
      // tooltip
      quadTree = isIterableNotEmpty(data.selectedData) && quadtree().x(getX).y(getY).addAll(data.selectedData).extent([[x1, 0], [x2, height]]);
    }
  };

  $$invalidate(16, yLabel = gap + labelFontSize / 2);

  return [height, width, yMax, yMin, getY, getX, x2, x1, $_trends, $_layout, highlightedId, chartTitle, gradients, trendLines, ticks, labelUnit, yLabel, xMed, $_availableYears, $_tooltip, tooltipShift, _tooltip, onMouseMove, onMouseLeave, colorScale, data, formatFn, getIndicatorValue, schema, types, useRankScale, getStopOffset, lineGenerator, scaleY, maxOrder];
}

var TrendsG = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(TrendsG, _SvelteComponentDev);

  var _super = _createSuper$3(TrendsG);

  function TrendsG(options) {
    var _this;

    _classCallCheck(this, TrendsG);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$3, create_fragment$3, safe_not_equal, {
      colorScale: 24,
      data: 25,
      formatFn: 26,
      getIndicatorValue: 27,
      height: 0,
      schema: 28,
      types: 29,
      useRankScale: 30,
      width: 1
    }, null, [-1, -1, -1]);
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "TrendsG",
      options: options,
      id: create_fragment$3.name
    });
    return _this;
  }

  _createClass(TrendsG, [{
    key: "colorScale",
    get: function get() {
      throw new Error("<TrendsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<TrendsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "data",
    get: function get() {
      throw new Error("<TrendsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<TrendsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "formatFn",
    get: function get() {
      throw new Error("<TrendsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<TrendsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "getIndicatorValue",
    get: function get() {
      throw new Error("<TrendsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<TrendsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "height",
    get: function get() {
      throw new Error("<TrendsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<TrendsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "schema",
    get: function get() {
      throw new Error("<TrendsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<TrendsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "types",
    get: function get() {
      throw new Error("<TrendsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<TrendsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "useRankScale",
    get: function get() {
      throw new Error("<TrendsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<TrendsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "width",
    get: function get() {
      throw new Error("<TrendsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<TrendsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return TrendsG;
}(SvelteComponentDev);

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$1 = "../../components/time_region_value/src/node_modules/components/TrendsDiv.svelte"; // (21:1) {#if data && width && height}

function create_if_block$1(ctx) {
  var svg;
  var trendsg;
  var current;
  trendsg = new TrendsG({
    props: {
      colorScale:
      /*colorScale*/
      ctx[0],
      data:
      /*data*/
      ctx[1],
      formatFn:
      /*formatFn*/
      ctx[2],
      getIndicatorValue:
      /*getIndicatorValue*/
      ctx[3],
      schema:
      /*schema*/
      ctx[4],
      types:
      /*types*/
      ctx[5],
      useRankScale:
      /*useRankScale*/
      ctx[6],
      height:
      /*height*/
      ctx[7],
      width:
      /*width*/
      ctx[8]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      svg = svg_element("svg");
      create_component(trendsg.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      svg = claim_svg_element(nodes, "svg", {
        height: true,
        width: true
      });
      var svg_nodes = children(svg);
      claim_component(trendsg.$$.fragment, svg_nodes);
      svg_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(svg, "height",
      /*height*/
      ctx[7]);
      attr_dev(svg, "width",
      /*width*/
      ctx[8]);
      add_location(svg, file$1, 21, 2, 420);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, svg, anchor);
      mount_component(trendsg, svg, null);
      current = true;
    },
    p: function update(ctx, dirty) {
      var trendsg_changes = {};
      if (dirty &
      /*colorScale*/
      1) trendsg_changes.colorScale =
      /*colorScale*/
      ctx[0];
      if (dirty &
      /*data*/
      2) trendsg_changes.data =
      /*data*/
      ctx[1];
      if (dirty &
      /*formatFn*/
      4) trendsg_changes.formatFn =
      /*formatFn*/
      ctx[2];
      if (dirty &
      /*getIndicatorValue*/
      8) trendsg_changes.getIndicatorValue =
      /*getIndicatorValue*/
      ctx[3];
      if (dirty &
      /*schema*/
      16) trendsg_changes.schema =
      /*schema*/
      ctx[4];
      if (dirty &
      /*types*/
      32) trendsg_changes.types =
      /*types*/
      ctx[5];
      if (dirty &
      /*useRankScale*/
      64) trendsg_changes.useRankScale =
      /*useRankScale*/
      ctx[6];
      if (dirty &
      /*height*/
      128) trendsg_changes.height =
      /*height*/
      ctx[7];
      if (dirty &
      /*width*/
      256) trendsg_changes.width =
      /*width*/
      ctx[8];
      trendsg.$set(trendsg_changes);

      if (!current || dirty &
      /*height*/
      128) {
        attr_dev(svg, "height",
        /*height*/
        ctx[7]);
      }

      if (!current || dirty &
      /*width*/
      256) {
        attr_dev(svg, "width",
        /*width*/
        ctx[8]);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(trendsg.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(trendsg.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(svg);
      destroy_component(trendsg);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$1.name,
    type: "if",
    source: "(21:1) {#if data && width && height}",
    ctx: ctx
  });
  return block;
}

function create_fragment$2(ctx) {
  var div;
  var div_resize_listener;
  var current;
  var if_block =
  /*data*/
  ctx[1] &&
  /*width*/
  ctx[8] &&
  /*height*/
  ctx[7] && create_if_block$1(ctx);
  var block = {
    c: function create() {
      div = element("div");
      if (if_block) if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      if (if_block) if_block.l(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "TrendsDiv svelte-1h0p8pj");
      add_render_callback(function () {
        return (
          /*div_elementresize_handler*/
          ctx[9].call(div)
        );
      });
      add_location(div, file$1, 15, 0, 307);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div, anchor);
      if (if_block) if_block.m(div, null);
      div_resize_listener = add_resize_listener(div,
      /*div_elementresize_handler*/
      ctx[9].bind(div));
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (
      /*data*/
      ctx[1] &&
      /*width*/
      ctx[8] &&
      /*height*/
      ctx[7]) {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty &
          /*data, width, height*/
          386) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$1(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, function () {
          if_block = null;
        });
        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      if (if_block) if_block.d();
      div_resize_listener();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$2.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$2($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
      $$props.$$scope;
  validate_slots('TrendsDiv', slots, []);
  var _$$props$colorScale = $$props.colorScale,
      colorScale = _$$props$colorScale === void 0 ? null : _$$props$colorScale;
  var _$$props$data = $$props.data,
      data = _$$props$data === void 0 ? null : _$$props$data;
  var _$$props$formatFn = $$props.formatFn,
      formatFn = _$$props$formatFn === void 0 ? null : _$$props$formatFn;
  var _$$props$getIndicator = $$props.getIndicatorValue,
      getIndicatorValue = _$$props$getIndicator === void 0 ? null : _$$props$getIndicator;
  var _$$props$schema = $$props.schema,
      schema = _$$props$schema === void 0 ? null : _$$props$schema;
  var _$$props$types = $$props.types,
      types = _$$props$types === void 0 ? null : _$$props$types;
  var _$$props$useRankScale = $$props.useRankScale,
      useRankScale = _$$props$useRankScale === void 0 ? false : _$$props$useRankScale;
  var height;
  var width;
  var writable_props = ['colorScale', 'data', 'formatFn', 'getIndicatorValue', 'schema', 'types', 'useRankScale'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<TrendsDiv> was created with unknown prop '".concat(key, "'"));
  });

  function div_elementresize_handler() {
    height = this.clientHeight;
    width = this.clientWidth;
    $$invalidate(7, height);
    $$invalidate(8, width);
  }

  $$self.$$set = function ($$props) {
    if ('colorScale' in $$props) $$invalidate(0, colorScale = $$props.colorScale);
    if ('data' in $$props) $$invalidate(1, data = $$props.data);
    if ('formatFn' in $$props) $$invalidate(2, formatFn = $$props.formatFn);
    if ('getIndicatorValue' in $$props) $$invalidate(3, getIndicatorValue = $$props.getIndicatorValue);
    if ('schema' in $$props) $$invalidate(4, schema = $$props.schema);
    if ('types' in $$props) $$invalidate(5, types = $$props.types);
    if ('useRankScale' in $$props) $$invalidate(6, useRankScale = $$props.useRankScale);
  };

  $$self.$capture_state = function () {
    return {
      TrendsG: TrendsG,
      colorScale: colorScale,
      data: data,
      formatFn: formatFn,
      getIndicatorValue: getIndicatorValue,
      schema: schema,
      types: types,
      useRankScale: useRankScale,
      height: height,
      width: width
    };
  };

  $$self.$inject_state = function ($$props) {
    if ('colorScale' in $$props) $$invalidate(0, colorScale = $$props.colorScale);
    if ('data' in $$props) $$invalidate(1, data = $$props.data);
    if ('formatFn' in $$props) $$invalidate(2, formatFn = $$props.formatFn);
    if ('getIndicatorValue' in $$props) $$invalidate(3, getIndicatorValue = $$props.getIndicatorValue);
    if ('schema' in $$props) $$invalidate(4, schema = $$props.schema);
    if ('types' in $$props) $$invalidate(5, types = $$props.types);
    if ('useRankScale' in $$props) $$invalidate(6, useRankScale = $$props.useRankScale);
    if ('height' in $$props) $$invalidate(7, height = $$props.height);
    if ('width' in $$props) $$invalidate(8, width = $$props.width);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [colorScale, data, formatFn, getIndicatorValue, schema, types, useRankScale, height, width, div_elementresize_handler];
}

var TrendsDiv = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(TrendsDiv, _SvelteComponentDev);

  var _super = _createSuper$2(TrendsDiv);

  function TrendsDiv(options) {
    var _this;

    _classCallCheck(this, TrendsDiv);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$2, create_fragment$2, safe_not_equal, {
      colorScale: 0,
      data: 1,
      formatFn: 2,
      getIndicatorValue: 3,
      schema: 4,
      types: 5,
      useRankScale: 6
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "TrendsDiv",
      options: options,
      id: create_fragment$2.name
    });
    return _this;
  }

  _createClass(TrendsDiv, [{
    key: "colorScale",
    get: function get() {
      throw new Error("<TrendsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<TrendsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "data",
    get: function get() {
      throw new Error("<TrendsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<TrendsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "formatFn",
    get: function get() {
      throw new Error("<TrendsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<TrendsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "getIndicatorValue",
    get: function get() {
      throw new Error("<TrendsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<TrendsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "schema",
    get: function get() {
      throw new Error("<TrendsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<TrendsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "types",
    get: function get() {
      throw new Error("<TrendsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<TrendsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "useRankScale",
    get: function get() {
      throw new Error("<TrendsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<TrendsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return TrendsDiv;
}(SvelteComponentDev);

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file = "../../components/time_region_value/src/routes/[id]/index.svelte"; // (237:2) {:else}

function create_else_block_1(ctx) {
  var div0;
  var settingsrow;
  var t0;
  var div1;
  var current_block_type_index;
  var if_block0;
  var t1;
  var div1_resize_listener;
  var t2;
  var if_block2_anchor;
  var current;
  settingsrow = new SettingsRow({
    props: {
      flags: {
        doFilter:
        /*$_doFilterRegions*/
        ctx[25],
        isGeoModalVisible:
        /*$_geoModal*/
        ctx[34].isVisible,
        isRegionsSelectionDirty:
        /*$_isRegionsSelectionDirty*/
        ctx[35],
        showRankingControl: true
      },
      handlers: {
        setLevel:
        /*setLevel*/
        ctx[37],
        toggledFiltering:
        /*toggledFiltering*/
        ctx[38],
        toggledRanking:
        /*toggledRanking*/
        ctx[39],
        toggledGeoModal: toggleGeoModal
      }
    },
    $$inline: true
  });
  var if_block_creators = [create_if_block_4, create_if_block_5];
  var if_blocks = [];

  function select_block_type_2(ctx, dirty) {
    if (
    /*$_noData*/
    ctx[27]) return 0;
    if (
    /*trendsData*/
    ctx[7] &&
    /*mediumTrendsWidth*/
    ctx[4] &&
    /*mediumTrendsHeight*/
    ctx[1]) return 1;
    return -1;
  }

  if (~(current_block_type_index = select_block_type_2(ctx))) {
    if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }

  var if_block1 =
  /*$_geoModal*/
  ctx[34].isVisible && create_if_block_3(ctx);
  var if_block2 =
  /*$_infoModal*/
  ctx[36].isVisible && create_if_block_2(ctx);
  var block = {
    c: function create() {
      div0 = element("div");
      create_component(settingsrow.$$.fragment);
      t0 = space();
      div1 = element("div");
      if (if_block0) if_block0.c();
      t1 = space();
      if (if_block1) if_block1.c();
      t2 = space();
      if (if_block2) if_block2.c();
      if_block2_anchor = empty();
      this.h();
    },
    l: function claim(nodes) {
      div0 = claim_element(nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      claim_component(settingsrow.$$.fragment, div0_nodes);
      div0_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      div1 = claim_element(nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      if (if_block0) if_block0.l(div1_nodes);
      t1 = claim_space(div1_nodes);
      if (if_block1) if_block1.l(div1_nodes);
      div1_nodes.forEach(detach_dev);
      t2 = claim_space(nodes);
      if (if_block2) if_block2.l(nodes);
      if_block2_anchor = empty();
      this.h();
    },
    h: function hydrate() {
      attr_dev(div0, "class", "topbox svelte-4u2au9");
      add_location(div0, file, 242, 3, 4590);
      attr_dev(div1, "class", "content svelte-4u2au9");
      add_render_callback(function () {
        return (
          /*div1_elementresize_handler*/
          ctx[46].call(div1)
        );
      });
      toggle_class(div1, "noData",
      /*$_noData*/
      ctx[27]);
      add_location(div1, file, 261, 3, 4990);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div0, anchor);
      mount_component(settingsrow, div0, null);
      insert_hydration_dev(target, t0, anchor);
      insert_hydration_dev(target, div1, anchor);

      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(div1, null);
      }

      append_hydration_dev(div1, t1);
      if (if_block1) if_block1.m(div1, null);
      div1_resize_listener = add_resize_listener(div1,
      /*div1_elementresize_handler*/
      ctx[46].bind(div1));
      insert_hydration_dev(target, t2, anchor);
      if (if_block2) if_block2.m(target, anchor);
      insert_hydration_dev(target, if_block2_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var settingsrow_changes = {};
      if (dirty[0] &
      /*$_doFilterRegions*/
      33554432 | dirty[1] &
      /*$_geoModal, $_isRegionsSelectionDirty*/
      24) settingsrow_changes.flags = {
        doFilter:
        /*$_doFilterRegions*/
        ctx[25],
        isGeoModalVisible:
        /*$_geoModal*/
        ctx[34].isVisible,
        isRegionsSelectionDirty:
        /*$_isRegionsSelectionDirty*/
        ctx[35],
        showRankingControl: true
      };
      settingsrow.$set(settingsrow_changes);
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_2(ctx);

      if (current_block_type_index === previous_block_index) {
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].p(ctx, dirty);
        }
      } else {
        if (if_block0) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, function () {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
        }

        if (~current_block_type_index) {
          if_block0 = if_blocks[current_block_type_index];

          if (!if_block0) {
            if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
            if_block0.c();
          } else {
            if_block0.p(ctx, dirty);
          }

          transition_in(if_block0, 1);
          if_block0.m(div1, t1);
        } else {
          if_block0 = null;
        }
      }

      if (
      /*$_geoModal*/
      ctx[34].isVisible) {
        if (if_block1) {
          if_block1.p(ctx, dirty);

          if (dirty[1] &
          /*$_geoModal*/
          8) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_3(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div1, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, function () {
          if_block1 = null;
        });
        check_outros();
      }

      if (dirty[0] &
      /*$_noData*/
      134217728) {
        toggle_class(div1, "noData",
        /*$_noData*/
        ctx[27]);
      }

      if (
      /*$_infoModal*/
      ctx[36].isVisible) {
        if (if_block2) {
          if_block2.p(ctx, dirty);

          if (dirty[1] &
          /*$_infoModal*/
          32) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block_2(ctx);
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
        }
      } else if (if_block2) {
        group_outros();
        transition_out(if_block2, 1, 1, function () {
          if_block2 = null;
        });
        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(settingsrow.$$.fragment, local);
      transition_in(if_block0);
      transition_in(if_block1);
      transition_in(if_block2);
      current = true;
    },
    o: function outro(local) {
      transition_out(settingsrow.$$.fragment, local);
      transition_out(if_block0);
      transition_out(if_block1);
      transition_out(if_block2);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div0);
      destroy_component(settingsrow);
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(div1);

      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d();
      }

      if (if_block1) if_block1.d();
      div1_resize_listener();
      if (detaching) detach_dev(t2);
      if (if_block2) if_block2.d(detaching);
      if (detaching) detach_dev(if_block2_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block_1.name,
    type: "else",
    source: "(237:2) {:else}",
    ctx: ctx
  });
  return block;
} // (153:2) {#if $_isSmallScreen}


function create_if_block(ctx) {
  var div0;
  var current_block_type_index;
  var if_block;
  var t0;
  var div1;
  var infoview;
  var t1;
  var div2;
  var settingsview;
  var current;
  var if_block_creators = [create_if_block_1, create_else_block];
  var if_blocks = [];

  function select_block_type_1(ctx, dirty) {
    if (
    /*$_noData*/
    ctx[27]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type_1(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  infoview = new InfoView({
    props: {
      api_doc_url:
      /*api_doc_url*/
      ctx[24],
      api_type:
      /*api_type*/
      ctx[23],
      auth_provider:
      /*auth_provider*/
      ctx[22],
      data_date:
      /*data_date*/
      ctx[21],
      description:
      /*description*/
      ctx[20],
      endpoint_url:
      /*endpoint_url*/
      ctx[19],
      is_experimental:
      /*is_experimental*/
      ctx[18],
      is_public:
      /*is_public*/
      ctx[17],
      query:
      /*query*/
      ctx[16],
      region_types:
      /*region_types*/
      ctx[15],
      source_name:
      /*source_name*/
      ctx[13],
      source_url:
      /*source_url*/
      ctx[12],
      url:
      /*url*/
      ctx[9],
      warning:
      /*warning*/
      ctx[8],
      year_extent:
      /*year_extent*/
      ctx[2]
    },
    $$inline: true
  });
  settingsview = new SettingsView({
    props: {
      flags: {
        doFilter:
        /*$_doFilterRegions*/
        ctx[25],
        showRankingControl: true
      },
      handlers: {
        setLevel:
        /*setLevel*/
        ctx[37],
        toggledFiltering:
        /*toggledFiltering*/
        ctx[38],
        toggledRanking:
        /*toggledRanking*/
        ctx[39]
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      div0 = element("div");
      if_block.c();
      t0 = space();
      div1 = element("div");
      create_component(infoview.$$.fragment);
      t1 = space();
      div2 = element("div");
      create_component(settingsview.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      div0 = claim_element(nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      if_block.l(div0_nodes);
      div0_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      div1 = claim_element(nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      claim_component(infoview.$$.fragment, div1_nodes);
      div1_nodes.forEach(detach_dev);
      t1 = claim_space(nodes);
      div2 = claim_element(nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      claim_component(settingsview.$$.fragment, div2_nodes);
      div2_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div0, "class", "view trends svelte-4u2au9");
      toggle_class(div0, "noData",
      /*$_noData*/
      ctx[27]);
      add_location(div0, file, 158, 3, 3097);
      attr_dev(div1, "class", "view info svelte-4u2au9");
      add_location(div1, file, 200, 3, 3946);
      attr_dev(div2, "class", "view settings svelte-4u2au9");
      add_location(div2, file, 222, 3, 4294);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div0, anchor);
      if_blocks[current_block_type_index].m(div0, null);
      insert_hydration_dev(target, t0, anchor);
      insert_hydration_dev(target, div1, anchor);
      mount_component(infoview, div1, null);
      insert_hydration_dev(target, t1, anchor);
      insert_hydration_dev(target, div2, anchor);
      mount_component(settingsview, div2, null);
      current = true;
    },
    p: function update(ctx, dirty) {
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_1(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
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

      if (dirty[0] &
      /*$_noData*/
      134217728) {
        toggle_class(div0, "noData",
        /*$_noData*/
        ctx[27]);
      }

      var infoview_changes = {};
      if (dirty[0] &
      /*api_doc_url*/
      16777216) infoview_changes.api_doc_url =
      /*api_doc_url*/
      ctx[24];
      if (dirty[0] &
      /*api_type*/
      8388608) infoview_changes.api_type =
      /*api_type*/
      ctx[23];
      if (dirty[0] &
      /*auth_provider*/
      4194304) infoview_changes.auth_provider =
      /*auth_provider*/
      ctx[22];
      if (dirty[0] &
      /*data_date*/
      2097152) infoview_changes.data_date =
      /*data_date*/
      ctx[21];
      if (dirty[0] &
      /*description*/
      1048576) infoview_changes.description =
      /*description*/
      ctx[20];
      if (dirty[0] &
      /*endpoint_url*/
      524288) infoview_changes.endpoint_url =
      /*endpoint_url*/
      ctx[19];
      if (dirty[0] &
      /*is_experimental*/
      262144) infoview_changes.is_experimental =
      /*is_experimental*/
      ctx[18];
      if (dirty[0] &
      /*is_public*/
      131072) infoview_changes.is_public =
      /*is_public*/
      ctx[17];
      if (dirty[0] &
      /*query*/
      65536) infoview_changes.query =
      /*query*/
      ctx[16];
      if (dirty[0] &
      /*region_types*/
      32768) infoview_changes.region_types =
      /*region_types*/
      ctx[15];
      if (dirty[0] &
      /*source_name*/
      8192) infoview_changes.source_name =
      /*source_name*/
      ctx[13];
      if (dirty[0] &
      /*source_url*/
      4096) infoview_changes.source_url =
      /*source_url*/
      ctx[12];
      if (dirty[0] &
      /*url*/
      512) infoview_changes.url =
      /*url*/
      ctx[9];
      if (dirty[0] &
      /*warning*/
      256) infoview_changes.warning =
      /*warning*/
      ctx[8];
      if (dirty[0] &
      /*year_extent*/
      4) infoview_changes.year_extent =
      /*year_extent*/
      ctx[2];
      infoview.$set(infoview_changes);
      var settingsview_changes = {};
      if (dirty[0] &
      /*$_doFilterRegions*/
      33554432) settingsview_changes.flags = {
        doFilter:
        /*$_doFilterRegions*/
        ctx[25],
        showRankingControl: true
      };
      settingsview.$set(settingsview_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      transition_in(infoview.$$.fragment, local);
      transition_in(settingsview.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      transition_out(infoview.$$.fragment, local);
      transition_out(settingsview.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div0);
      if_blocks[current_block_type_index].d();
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(div1);
      destroy_component(infoview);
      if (detaching) detach_dev(t1);
      if (detaching) detach_dev(div2);
      destroy_component(settingsview);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(153:2) {#if $_isSmallScreen}",
    ctx: ctx
  });
  return block;
} // (270:68) 


function create_if_block_5(ctx) {
  var svg;
  var trendsg;
  var g;
  var colorbinsg;
  var g_transform_value;
  var current;
  trendsg = new TrendsG({
    props: {
      schema:
      /*schema*/
      ctx[14],
      types:
      /*types*/
      ctx[0],
      useRankScale:
      /*useRankScale*/
      ctx[5],
      colorScale:
      /*$_colorScale*/
      ctx[32],
      data:
      /*trendsData*/
      ctx[7],
      formatFn:
      /*$_formatFn*/
      ctx[31],
      getIndicatorValue:
      /*$_getIndicatorValue*/
      ctx[33],
      height:
      /*mediumTrendsHeight*/
      ctx[1],
      width:
      /*mediumTrendsWidth*/
      ctx[4]
    },
    $$inline: true
  });
  colorbinsg = new ColorBinsG({
    props: {
      bins:
      /*$_colorBins*/
      ctx[29],
      flags: {
        isVertical: true,
        withBackground: true
      },
      height:
      /*mediumLegendHeight*/
      ctx[6],
      theme: {
        backgroundColor:
        /*$_theme*/
        ctx[30].colorWhite,
        backgroundOpacity: 0.5
      },
      ticksFormatFn:
      /*$_formatFn*/
      ctx[31],
      width: legendBarThickness
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      svg = svg_element("svg");
      create_component(trendsg.$$.fragment);
      g = svg_element("g");
      create_component(colorbinsg.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      svg = claim_svg_element(nodes, "svg", {
        height: true,
        width: true
      });
      var svg_nodes = children(svg);
      claim_component(trendsg.$$.fragment, svg_nodes);
      g = claim_svg_element(svg_nodes, "g", {
        transform: true
      });
      var g_nodes = children(g);
      claim_component(colorbinsg.$$.fragment, g_nodes);
      g_nodes.forEach(detach_dev);
      svg_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(g, "transform", g_transform_value = "translate(0," +
      /*mediumLegendHeight*/
      ctx[6] + ")");
      add_location(g, file, 290, 6, 5671);
      attr_dev(svg, "height",
      /*mediumTrendsHeight*/
      ctx[1]);
      attr_dev(svg, "width",
      /*mediumTrendsWidth*/
      ctx[4]);
      add_location(svg, file, 270, 5, 5261);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, svg, anchor);
      mount_component(trendsg, svg, null);
      append_hydration_dev(svg, g);
      mount_component(colorbinsg, g, null);
      current = true;
    },
    p: function update(ctx, dirty) {
      var trendsg_changes = {};
      if (dirty[0] &
      /*schema*/
      16384) trendsg_changes.schema =
      /*schema*/
      ctx[14];
      if (dirty[0] &
      /*types*/
      1) trendsg_changes.types =
      /*types*/
      ctx[0];
      if (dirty[0] &
      /*useRankScale*/
      32) trendsg_changes.useRankScale =
      /*useRankScale*/
      ctx[5];
      if (dirty[1] &
      /*$_colorScale*/
      2) trendsg_changes.colorScale =
      /*$_colorScale*/
      ctx[32];
      if (dirty[0] &
      /*trendsData*/
      128) trendsg_changes.data =
      /*trendsData*/
      ctx[7];
      if (dirty[1] &
      /*$_formatFn*/
      1) trendsg_changes.formatFn =
      /*$_formatFn*/
      ctx[31];
      if (dirty[1] &
      /*$_getIndicatorValue*/
      4) trendsg_changes.getIndicatorValue =
      /*$_getIndicatorValue*/
      ctx[33];
      if (dirty[0] &
      /*mediumTrendsHeight*/
      2) trendsg_changes.height =
      /*mediumTrendsHeight*/
      ctx[1];
      if (dirty[0] &
      /*mediumTrendsWidth*/
      16) trendsg_changes.width =
      /*mediumTrendsWidth*/
      ctx[4];
      trendsg.$set(trendsg_changes);
      var colorbinsg_changes = {};
      if (dirty[0] &
      /*$_colorBins*/
      536870912) colorbinsg_changes.bins =
      /*$_colorBins*/
      ctx[29];
      if (dirty[0] &
      /*mediumLegendHeight*/
      64) colorbinsg_changes.height =
      /*mediumLegendHeight*/
      ctx[6];
      if (dirty[0] &
      /*$_theme*/
      1073741824) colorbinsg_changes.theme = {
        backgroundColor:
        /*$_theme*/
        ctx[30].colorWhite,
        backgroundOpacity: 0.5
      };
      if (dirty[1] &
      /*$_formatFn*/
      1) colorbinsg_changes.ticksFormatFn =
      /*$_formatFn*/
      ctx[31];
      colorbinsg.$set(colorbinsg_changes);

      if (!current || dirty[0] &
      /*mediumLegendHeight*/
      64 && g_transform_value !== (g_transform_value = "translate(0," +
      /*mediumLegendHeight*/
      ctx[6] + ")")) {
        attr_dev(g, "transform", g_transform_value);
      }

      if (!current || dirty[0] &
      /*mediumTrendsHeight*/
      2) {
        attr_dev(svg, "height",
        /*mediumTrendsHeight*/
        ctx[1]);
      }

      if (!current || dirty[0] &
      /*mediumTrendsWidth*/
      16) {
        attr_dev(svg, "width",
        /*mediumTrendsWidth*/
        ctx[4]);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(trendsg.$$.fragment, local);
      transition_in(colorbinsg.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(trendsg.$$.fragment, local);
      transition_out(colorbinsg.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(svg);
      destroy_component(trendsg);
      destroy_component(colorbinsg);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_5.name,
    type: "if",
    source: "(270:68) ",
    ctx: ctx
  });
  return block;
} // (268:4) {#if $_noData}


function create_if_block_4(ctx) {
  var messageview;
  var current;
  messageview = new MessageView({
    props: {
      text: "No data"
    },
    $$inline: true
  });
  var block = {
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
    p: noop,
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
    block: block,
    id: create_if_block_4.name,
    type: "if",
    source: "(268:4) {#if $_noData}",
    ctx: ctx
  });
  return block;
} // (313:4) {#if $_geoModal.isVisible}


function create_if_block_3(ctx) {
  var geofiltermodal;
  var current;
  geofiltermodal = new GeoFilterModal({
    $$inline: true
  });
  geofiltermodal.$on("click", toggleGeoModal);
  var block = {
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
    p: noop,
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
    block: block,
    id: create_if_block_3.name,
    type: "if",
    source: "(313:4) {#if $_geoModal.isVisible}",
    ctx: ctx
  });
  return block;
} // (321:3) {#if $_infoModal.isVisible}


function create_if_block_2(ctx) {
  var infomodal;
  var current;
  infomodal = new InfoModal({
    props: {
      api_doc_url:
      /*api_doc_url*/
      ctx[24],
      api_type:
      /*api_type*/
      ctx[23],
      auth_provider:
      /*auth_provider*/
      ctx[22],
      data_date:
      /*data_date*/
      ctx[21],
      description:
      /*description*/
      ctx[20],
      endpoint_url:
      /*endpoint_url*/
      ctx[19],
      is_public:
      /*is_public*/
      ctx[17],
      is_experimental:
      /*is_experimental*/
      ctx[18],
      query:
      /*query*/
      ctx[16],
      region_types:
      /*region_types*/
      ctx[15],
      source_name:
      /*source_name*/
      ctx[13],
      source_url:
      /*source_url*/
      ctx[12],
      url:
      /*url*/
      ctx[9],
      warning:
      /*warning*/
      ctx[8],
      year_extent:
      /*year_extent*/
      ctx[2]
    },
    $$inline: true
  });
  infomodal.$on("click", toggleInfoModal);
  var block = {
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
      var infomodal_changes = {};
      if (dirty[0] &
      /*api_doc_url*/
      16777216) infomodal_changes.api_doc_url =
      /*api_doc_url*/
      ctx[24];
      if (dirty[0] &
      /*api_type*/
      8388608) infomodal_changes.api_type =
      /*api_type*/
      ctx[23];
      if (dirty[0] &
      /*auth_provider*/
      4194304) infomodal_changes.auth_provider =
      /*auth_provider*/
      ctx[22];
      if (dirty[0] &
      /*data_date*/
      2097152) infomodal_changes.data_date =
      /*data_date*/
      ctx[21];
      if (dirty[0] &
      /*description*/
      1048576) infomodal_changes.description =
      /*description*/
      ctx[20];
      if (dirty[0] &
      /*endpoint_url*/
      524288) infomodal_changes.endpoint_url =
      /*endpoint_url*/
      ctx[19];
      if (dirty[0] &
      /*is_public*/
      131072) infomodal_changes.is_public =
      /*is_public*/
      ctx[17];
      if (dirty[0] &
      /*is_experimental*/
      262144) infomodal_changes.is_experimental =
      /*is_experimental*/
      ctx[18];
      if (dirty[0] &
      /*query*/
      65536) infomodal_changes.query =
      /*query*/
      ctx[16];
      if (dirty[0] &
      /*region_types*/
      32768) infomodal_changes.region_types =
      /*region_types*/
      ctx[15];
      if (dirty[0] &
      /*source_name*/
      8192) infomodal_changes.source_name =
      /*source_name*/
      ctx[13];
      if (dirty[0] &
      /*source_url*/
      4096) infomodal_changes.source_url =
      /*source_url*/
      ctx[12];
      if (dirty[0] &
      /*url*/
      512) infomodal_changes.url =
      /*url*/
      ctx[9];
      if (dirty[0] &
      /*warning*/
      256) infomodal_changes.warning =
      /*warning*/
      ctx[8];
      if (dirty[0] &
      /*year_extent*/
      4) infomodal_changes.year_extent =
      /*year_extent*/
      ctx[2];
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
    block: block,
    id: create_if_block_2.name,
    type: "if",
    source: "(321:3) {#if $_infoModal.isVisible}",
    ctx: ctx
  });
  return block;
} // (165:4) {:else}


function create_else_block(ctx) {
  var div0;
  var colorbinsdiv;
  var t;
  var div1;
  var trendsdiv;
  var current;
  colorbinsdiv = new ColorBinsDiv({
    props: {
      bins:
      /*$_colorBins*/
      ctx[29],
      geometry: {
        barThickness: 15,
        left: 30,
        right: 30
      },
      flags: {
        withBackground: true,
        showTicksExtentOnly: true
      },
      theme: {
        backgroundColor:
        /*$_theme*/
        ctx[30].colorWhite,
        backgroundOpacity: 0.5
      },
      ticksFormatFn:
      /*$_formatFn*/
      ctx[31]
    },
    $$inline: true
  });
  trendsdiv = new TrendsDiv({
    props: {
      schema:
      /*schema*/
      ctx[14],
      types:
      /*types*/
      ctx[0],
      useRankScale:
      /*useRankScale*/
      ctx[5],
      colorScale:
      /*$_colorScale*/
      ctx[32],
      data:
      /*trendsData*/
      ctx[7],
      formatFn:
      /*$_formatFn*/
      ctx[31],
      getIndicatorValue:
      /*$_getIndicatorValue*/
      ctx[33]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      div0 = element("div");
      create_component(colorbinsdiv.$$.fragment);
      t = space();
      div1 = element("div");
      create_component(trendsdiv.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      div0 = claim_element(nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      claim_component(colorbinsdiv.$$.fragment, div0_nodes);
      div0_nodes.forEach(detach_dev);
      t = claim_space(nodes);
      div1 = claim_element(nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      claim_component(trendsdiv.$$.fragment, div1_nodes);
      div1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div0, "class", "topbox svelte-4u2au9");
      add_location(div0, file, 165, 5, 3244);
      attr_dev(div1, "class", "content svelte-4u2au9");
      add_location(div1, file, 184, 5, 3657);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div0, anchor);
      mount_component(colorbinsdiv, div0, null);
      insert_hydration_dev(target, t, anchor);
      insert_hydration_dev(target, div1, anchor);
      mount_component(trendsdiv, div1, null);
      current = true;
    },
    p: function update(ctx, dirty) {
      var colorbinsdiv_changes = {};
      if (dirty[0] &
      /*$_colorBins*/
      536870912) colorbinsdiv_changes.bins =
      /*$_colorBins*/
      ctx[29];
      if (dirty[0] &
      /*$_theme*/
      1073741824) colorbinsdiv_changes.theme = {
        backgroundColor:
        /*$_theme*/
        ctx[30].colorWhite,
        backgroundOpacity: 0.5
      };
      if (dirty[1] &
      /*$_formatFn*/
      1) colorbinsdiv_changes.ticksFormatFn =
      /*$_formatFn*/
      ctx[31];
      colorbinsdiv.$set(colorbinsdiv_changes);
      var trendsdiv_changes = {};
      if (dirty[0] &
      /*schema*/
      16384) trendsdiv_changes.schema =
      /*schema*/
      ctx[14];
      if (dirty[0] &
      /*types*/
      1) trendsdiv_changes.types =
      /*types*/
      ctx[0];
      if (dirty[0] &
      /*useRankScale*/
      32) trendsdiv_changes.useRankScale =
      /*useRankScale*/
      ctx[5];
      if (dirty[1] &
      /*$_colorScale*/
      2) trendsdiv_changes.colorScale =
      /*$_colorScale*/
      ctx[32];
      if (dirty[0] &
      /*trendsData*/
      128) trendsdiv_changes.data =
      /*trendsData*/
      ctx[7];
      if (dirty[1] &
      /*$_formatFn*/
      1) trendsdiv_changes.formatFn =
      /*$_formatFn*/
      ctx[31];
      if (dirty[1] &
      /*$_getIndicatorValue*/
      4) trendsdiv_changes.getIndicatorValue =
      /*$_getIndicatorValue*/
      ctx[33];
      trendsdiv.$set(trendsdiv_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(colorbinsdiv.$$.fragment, local);
      transition_in(trendsdiv.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(colorbinsdiv.$$.fragment, local);
      transition_out(trendsdiv.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div0);
      destroy_component(colorbinsdiv);
      if (detaching) detach_dev(t);
      if (detaching) detach_dev(div1);
      destroy_component(trendsdiv);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block.name,
    type: "else",
    source: "(165:4) {:else}",
    ctx: ctx
  });
  return block;
} // (163:4) {#if $_noData}


function create_if_block_1(ctx) {
  var messageview;
  var current;
  messageview = new MessageView({
    props: {
      text: config.noDataMessage
    },
    $$inline: true
  });
  var block = {
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
    p: noop,
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
    block: block,
    id: create_if_block_1.name,
    type: "if",
    source: "(163:4) {#if $_noData}",
    ctx: ctx
  });
  return block;
}

function create_fragment$1(ctx) {
  var div1;
  var header;
  var t;
  var div0;
  var current_block_type_index;
  var if_block;
  var div0_class_value;
  var div1_class_value;
  var current;
  header = new Header({
    props: {
      subtitle:
      /*subtitle*/
      ctx[11],
      title:
      /*title*/
      ctx[10]
    },
    $$inline: true
  });
  header.$on("click", toggleInfoModal);
  var if_block_creators = [create_if_block, create_else_block_1];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*$_isSmallScreen*/
    ctx[3]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      div1 = element("div");
      create_component(header.$$.fragment);
      t = space();
      div0 = element("div");
      if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      div1 = claim_element(nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      claim_component(header.$$.fragment, div1_nodes);
      t = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      if_block.l(div0_nodes);
      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div0, "class", div0_class_value = "viewport " +
      /*$_viewsClasses*/
      ctx[28] + " svelte-4u2au9");
      toggle_class(div0, "noData",
      /*$_noData*/
      ctx[27]);
      add_location(div0, file, 148, 1, 2960);
      attr_dev(div1, "class", div1_class_value = "time_region_value_IdIndex " +
      /*$_screenClasses*/
      ctx[26] + " svelte-4u2au9");
      add_location(div1, file, 141, 0, 2835);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div1, anchor);
      mount_component(header, div1, null);
      append_hydration_dev(div1, t);
      append_hydration_dev(div1, div0);
      if_blocks[current_block_type_index].m(div0, null);
      current = true;
    },
    p: function update(ctx, dirty) {
      var header_changes = {};
      if (dirty[0] &
      /*subtitle*/
      2048) header_changes.subtitle =
      /*subtitle*/
      ctx[11];
      if (dirty[0] &
      /*title*/
      1024) header_changes.title =
      /*title*/
      ctx[10];
      header.$set(header_changes);
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
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

      if (!current || dirty[0] &
      /*$_viewsClasses*/
      268435456 && div0_class_value !== (div0_class_value = "viewport " +
      /*$_viewsClasses*/
      ctx[28] + " svelte-4u2au9")) {
        attr_dev(div0, "class", div0_class_value);
      }

      if (dirty[0] &
      /*$_viewsClasses, $_noData*/
      402653184) {
        toggle_class(div0, "noData",
        /*$_noData*/
        ctx[27]);
      }

      if (!current || dirty[0] &
      /*$_screenClasses*/
      67108864 && div1_class_value !== (div1_class_value = "time_region_value_IdIndex " +
      /*$_screenClasses*/
      ctx[26] + " svelte-4u2au9")) {
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
    block: block,
    id: create_fragment$1.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

var legendBarThickness = 40;

function instance$1($$self, $$props, $$invalidate) {
  var api_doc_url;
  var api_type;
  var auth_provider;
  var data_date;
  var description;
  var endpoint_url;
  var is_experimental;
  var is_public;
  var query;
  var region_types;
  var schema;
  var source_name;
  var source_url;
  var subtitle;
  var title;
  var url;
  var warning;
  var year_extent;
  var trendsData;
  var mediumLegendHeight;
  var $_doFilterRegions;
  var $_valueExtext;
  var $_rankedData;
  var $_selectedData;
  var $_lookup;
  var $_isSmallScreen;
  var $_screenClasses;
  var $_noData;
  var $_viewsClasses;
  var $_colorBins;
  var $_theme;
  var $_formatFn;
  var $_colorScale;
  var $_getIndicatorValue;
  var $_geoModal;
  var $_isRegionsSelectionDirty;
  var $_infoModal;
  validate_store(_doFilterRegions, '_doFilterRegions');
  component_subscribe($$self, _doFilterRegions, function ($$value) {
    return $$invalidate(25, $_doFilterRegions = $$value);
  });
  validate_store(_valueExtext, '_valueExtext');
  component_subscribe($$self, _valueExtext, function ($$value) {
    return $$invalidate(42, $_valueExtext = $$value);
  });
  validate_store(_rankedData, '_rankedData');
  component_subscribe($$self, _rankedData, function ($$value) {
    return $$invalidate(43, $_rankedData = $$value);
  });
  validate_store(_selectedData, '_selectedData');
  component_subscribe($$self, _selectedData, function ($$value) {
    return $$invalidate(44, $_selectedData = $$value);
  });
  validate_store(_lookup, '_lookup');
  component_subscribe($$self, _lookup, function ($$value) {
    return $$invalidate(45, $_lookup = $$value);
  });
  validate_store(_isSmallScreen, '_isSmallScreen');
  component_subscribe($$self, _isSmallScreen, function ($$value) {
    return $$invalidate(3, $_isSmallScreen = $$value);
  });
  validate_store(_screenClasses, '_screenClasses');
  component_subscribe($$self, _screenClasses, function ($$value) {
    return $$invalidate(26, $_screenClasses = $$value);
  });
  validate_store(_noData, '_noData');
  component_subscribe($$self, _noData, function ($$value) {
    return $$invalidate(27, $_noData = $$value);
  });
  validate_store(_viewsClasses, '_viewsClasses');
  component_subscribe($$self, _viewsClasses, function ($$value) {
    return $$invalidate(28, $_viewsClasses = $$value);
  });
  validate_store(_colorBins, '_colorBins');
  component_subscribe($$self, _colorBins, function ($$value) {
    return $$invalidate(29, $_colorBins = $$value);
  });
  validate_store(_theme, '_theme');
  component_subscribe($$self, _theme, function ($$value) {
    return $$invalidate(30, $_theme = $$value);
  });
  validate_store(_formatFn, '_formatFn');
  component_subscribe($$self, _formatFn, function ($$value) {
    return $$invalidate(31, $_formatFn = $$value);
  });
  validate_store(_colorScale, '_colorScale');
  component_subscribe($$self, _colorScale, function ($$value) {
    return $$invalidate(32, $_colorScale = $$value);
  });
  validate_store(_getIndicatorValue, '_getIndicatorValue');
  component_subscribe($$self, _getIndicatorValue, function ($$value) {
    return $$invalidate(33, $_getIndicatorValue = $$value);
  });
  validate_store(_geoModal, '_geoModal');
  component_subscribe($$self, _geoModal, function ($$value) {
    return $$invalidate(34, $_geoModal = $$value);
  });
  validate_store(_isRegionsSelectionDirty, '_isRegionsSelectionDirty');
  component_subscribe($$self, _isRegionsSelectionDirty, function ($$value) {
    return $$invalidate(35, $_isRegionsSelectionDirty = $$value);
  });
  validate_store(_infoModal, '_infoModal');
  component_subscribe($$self, _infoModal, function ($$value) {
    return $$invalidate(36, $_infoModal = $$value);
  });
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
      $$props.$$scope;
  validate_slots('U5Bidu5D', slots, []);
  var _$$props$data = $$props.data,
      data = _$$props$data === void 0 ? null : _$$props$data;
  var _$$props$id = $$props.id,
      id = _$$props$id === void 0 ? null : _$$props$id;
  var _$$props$types = $$props.types,
      types = _$$props$types === void 0 ? null : _$$props$types;
  /* init */

  onMount(function () {
    setRoute('Id');
  });
  /* local vars */
  // bound

  var mediumTrendsHeight;
  var mediumTrendsWidth; // rest

  var useRankScale = false;
  /* event handlers */

  var setLevel = function setLevel(_ref) {
    var level = _ref.detail;
    return setCurrentLevel(level);
  };

  var toggledFiltering = function toggledFiltering(_ref2) {
    var detail = _ref2.detail;
    set_store_value(_doFilterRegions, $_doFilterRegions = detail === 'Filter', $_doFilterRegions);
  };

  var toggledRanking = function toggledRanking(_ref3) {
    var detail = _ref3.detail;
    $$invalidate(5, useRankScale = detail === 'Ranking');
  };

  var writable_props = ['data', 'id', 'types'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<U5Bidu5D> was created with unknown prop '".concat(key, "'"));
  });

  function div1_elementresize_handler() {
    mediumTrendsHeight = this.clientHeight;
    mediumTrendsWidth = this.clientWidth;
    $$invalidate(1, mediumTrendsHeight);
    $$invalidate(4, mediumTrendsWidth);
  }

  $$self.$$set = function ($$props) {
    if ('data' in $$props) $$invalidate(40, data = $$props.data);
    if ('id' in $$props) $$invalidate(41, id = $$props.id);
    if ('types' in $$props) $$invalidate(0, types = $$props.types);
  };

  $$self.$capture_state = function () {
    return {
      ColorBinsG: ColorBinsG,
      ColorBinsDiv: ColorBinsDiv,
      MessageView: MessageView,
      onMount: onMount,
      GeoFilterModal: GeoFilterModal,
      Header: Header,
      InfoModal: InfoModal,
      InfoView: InfoView,
      SettingsRow: SettingsRow,
      SettingsView: SettingsView,
      TrendsDiv: TrendsDiv,
      TrendsG: TrendsG,
      _lookup: _lookup,
      _colorBins: _colorBins,
      _colorScale: _colorScale,
      _formatFn: _formatFn,
      _getIndicatorValue: _getIndicatorValue,
      _indicator: _indicator,
      _noData: _noData,
      _rankedData: _rankedData,
      _selectedData: _selectedData,
      _valueExtext: _valueExtext,
      _isSmallScreen: _isSmallScreen,
      _screenClasses: _screenClasses,
      _geoModal: _geoModal,
      _infoModal: _infoModal,
      hideGeoModal: hideGeoModal,
      hideInfoModal: hideInfoModal,
      toggleGeoModal: toggleGeoModal,
      toggleInfoModal: toggleInfoModal,
      _viewsClasses: _viewsClasses,
      setRoute: setRoute,
      showView: showView,
      _doFilterRegions: _doFilterRegions,
      _isRegionsSelectionDirty: _isRegionsSelectionDirty,
      setCurrentLevel: setCurrentLevel,
      resetSelectedYear: resetSelectedYear,
      _theme: _theme,
      config: config,
      legendBarThickness: legendBarThickness,
      data: data,
      id: id,
      types: types,
      mediumTrendsHeight: mediumTrendsHeight,
      mediumTrendsWidth: mediumTrendsWidth,
      useRankScale: useRankScale,
      setLevel: setLevel,
      toggledFiltering: toggledFiltering,
      toggledRanking: toggledRanking,
      mediumLegendHeight: mediumLegendHeight,
      year_extent: year_extent,
      trendsData: trendsData,
      warning: warning,
      url: url,
      title: title,
      subtitle: subtitle,
      source_url: source_url,
      source_name: source_name,
      schema: schema,
      region_types: region_types,
      query: query,
      is_public: is_public,
      is_experimental: is_experimental,
      endpoint_url: endpoint_url,
      description: description,
      data_date: data_date,
      auth_provider: auth_provider,
      api_type: api_type,
      api_doc_url: api_doc_url,
      $_doFilterRegions: $_doFilterRegions,
      $_valueExtext: $_valueExtext,
      $_rankedData: $_rankedData,
      $_selectedData: $_selectedData,
      $_lookup: $_lookup,
      $_isSmallScreen: $_isSmallScreen,
      $_screenClasses: $_screenClasses,
      $_noData: $_noData,
      $_viewsClasses: $_viewsClasses,
      $_colorBins: $_colorBins,
      $_theme: $_theme,
      $_formatFn: $_formatFn,
      $_colorScale: $_colorScale,
      $_getIndicatorValue: $_getIndicatorValue,
      $_geoModal: $_geoModal,
      $_isRegionsSelectionDirty: $_isRegionsSelectionDirty,
      $_infoModal: $_infoModal
    };
  };

  $$self.$inject_state = function ($$props) {
    if ('data' in $$props) $$invalidate(40, data = $$props.data);
    if ('id' in $$props) $$invalidate(41, id = $$props.id);
    if ('types' in $$props) $$invalidate(0, types = $$props.types);
    if ('mediumTrendsHeight' in $$props) $$invalidate(1, mediumTrendsHeight = $$props.mediumTrendsHeight);
    if ('mediumTrendsWidth' in $$props) $$invalidate(4, mediumTrendsWidth = $$props.mediumTrendsWidth);
    if ('useRankScale' in $$props) $$invalidate(5, useRankScale = $$props.useRankScale);
    if ('mediumLegendHeight' in $$props) $$invalidate(6, mediumLegendHeight = $$props.mediumLegendHeight);
    if ('year_extent' in $$props) $$invalidate(2, year_extent = $$props.year_extent);
    if ('trendsData' in $$props) $$invalidate(7, trendsData = $$props.trendsData);
    if ('warning' in $$props) $$invalidate(8, warning = $$props.warning);
    if ('url' in $$props) $$invalidate(9, url = $$props.url);
    if ('title' in $$props) $$invalidate(10, title = $$props.title);
    if ('subtitle' in $$props) $$invalidate(11, subtitle = $$props.subtitle);
    if ('source_url' in $$props) $$invalidate(12, source_url = $$props.source_url);
    if ('source_name' in $$props) $$invalidate(13, source_name = $$props.source_name);
    if ('schema' in $$props) $$invalidate(14, schema = $$props.schema);
    if ('region_types' in $$props) $$invalidate(15, region_types = $$props.region_types);
    if ('query' in $$props) $$invalidate(16, query = $$props.query);
    if ('is_public' in $$props) $$invalidate(17, is_public = $$props.is_public);
    if ('is_experimental' in $$props) $$invalidate(18, is_experimental = $$props.is_experimental);
    if ('endpoint_url' in $$props) $$invalidate(19, endpoint_url = $$props.endpoint_url);
    if ('description' in $$props) $$invalidate(20, description = $$props.description);
    if ('data_date' in $$props) $$invalidate(21, data_date = $$props.data_date);
    if ('auth_provider' in $$props) $$invalidate(22, auth_provider = $$props.auth_provider);
    if ('api_type' in $$props) $$invalidate(23, api_type = $$props.api_type);
    if ('api_doc_url' in $$props) $$invalidate(24, api_doc_url = $$props.api_doc_url);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty[0] &
    /*$_isSmallScreen*/
    8) {
      /* reactive vars */
      // navigation
      $_isSmallScreen && hideGeoModal();
    }

    if ($$self.$$.dirty[0] &
    /*$_isSmallScreen*/
    8) {
      $_isSmallScreen && hideInfoModal();
    }

    if ($$self.$$.dirty[1] &
    /*id*/
    1024) {
      id && showView('trends');
    }

    if ($$self.$$.dirty[1] &
    /*id*/
    1024) {
      id && resetSelectedYear();
    }

    if ($$self.$$.dirty[1] &
    /*id, data*/
    1536) {
      id && data && _indicator.set({
        data: data,
        id: id
      });
    }

    if ($$self.$$.dirty[1] &
    /*$_lookup, id*/
    17408) {
      var _ref4;

      $$invalidate(24, (_ref4 = $_lookup[id] || {}, api_doc_url = _ref4.api_doc_url, api_type = _ref4.api_type, auth_provider = _ref4.auth_provider, data_date = _ref4.data_date, description = _ref4.description, endpoint_url = _ref4.endpoint_url, is_experimental = _ref4.is_experimental, is_public = _ref4.is_public, query = _ref4.query, region_types = _ref4.region_types, schema = _ref4.schema, source_name = _ref4.source_name, source_url = _ref4.source_url, subtitle = _ref4.subtitle, title = _ref4.title, url = _ref4.url, warning = _ref4.warning, year_extent = _ref4.year_extent, _ref4), api_doc_url, (($$invalidate(23, api_type), $$invalidate(45, $_lookup)), $$invalidate(41, id)), (($$invalidate(22, auth_provider), $$invalidate(45, $_lookup)), $$invalidate(41, id)), (($$invalidate(21, data_date), $$invalidate(45, $_lookup)), $$invalidate(41, id)), (($$invalidate(20, description), $$invalidate(45, $_lookup)), $$invalidate(41, id)), (($$invalidate(19, endpoint_url), $$invalidate(45, $_lookup)), $$invalidate(41, id)), (($$invalidate(18, is_experimental), $$invalidate(45, $_lookup)), $$invalidate(41, id)), (($$invalidate(17, is_public), $$invalidate(45, $_lookup)), $$invalidate(41, id)), (($$invalidate(16, query), $$invalidate(45, $_lookup)), $$invalidate(41, id)), (($$invalidate(15, region_types), $$invalidate(45, $_lookup)), $$invalidate(41, id)), (($$invalidate(14, schema), $$invalidate(45, $_lookup)), $$invalidate(41, id)), (($$invalidate(13, source_name), $$invalidate(45, $_lookup)), $$invalidate(41, id)), (($$invalidate(12, source_url), $$invalidate(45, $_lookup)), $$invalidate(41, id)), (($$invalidate(11, subtitle), $$invalidate(45, $_lookup)), $$invalidate(41, id)), (($$invalidate(10, title), $$invalidate(45, $_lookup)), $$invalidate(41, id)), (($$invalidate(9, url), $$invalidate(45, $_lookup)), $$invalidate(41, id)), (($$invalidate(8, warning), $$invalidate(45, $_lookup)), $$invalidate(41, id)), (($$invalidate(2, year_extent), $$invalidate(45, $_lookup)), $$invalidate(41, id)));
    }

    if ($$self.$$.dirty[0] &
    /*year_extent*/
    4 | $$self.$$.dirty[1] &
    /*$_selectedData, $_rankedData, $_valueExtext*/
    14336) {
      // selection
      $$invalidate(7, trendsData = {
        selectedData: $_selectedData,
        rankedData: $_rankedData,
        valueExtext: $_valueExtext,
        year_extent: year_extent
      });
    }

    if ($$self.$$.dirty[0] &
    /*mediumTrendsHeight*/
    2) {
      // layout
      $$invalidate(6, mediumLegendHeight = mediumTrendsHeight / 3);
    }
  };

  return [types, mediumTrendsHeight, year_extent, $_isSmallScreen, mediumTrendsWidth, useRankScale, mediumLegendHeight, trendsData, warning, url, title, subtitle, source_url, source_name, schema, region_types, query, is_public, is_experimental, endpoint_url, description, data_date, auth_provider, api_type, api_doc_url, $_doFilterRegions, $_screenClasses, $_noData, $_viewsClasses, $_colorBins, $_theme, $_formatFn, $_colorScale, $_getIndicatorValue, $_geoModal, $_isRegionsSelectionDirty, $_infoModal, setLevel, toggledFiltering, toggledRanking, data, id, $_valueExtext, $_rankedData, $_selectedData, $_lookup, div1_elementresize_handler];
}

var U5Bidu5D$1 = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(U5Bidu5D, _SvelteComponentDev);

  var _super = _createSuper$1(U5Bidu5D);

  function U5Bidu5D(options) {
    var _this;

    _classCallCheck(this, U5Bidu5D);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$1, create_fragment$1, safe_not_equal, {
      data: 40,
      id: 41,
      types: 0
    }, null, [-1, -1]);
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "U5Bidu5D",
      options: options,
      id: create_fragment$1.name
    });
    return _this;
  }

  _createClass(U5Bidu5D, [{
    key: "data",
    get: function get() {
      throw new Error("<U5Bidu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<U5Bidu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "id",
    get: function get() {
      throw new Error("<U5Bidu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<U5Bidu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "types",
    get: function get() {
      throw new Error("<U5Bidu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<U5Bidu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return U5Bidu5D;
}(SvelteComponentDev);

var IdIndex = U5Bidu5D$1;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function create_fragment(ctx) {
  var idindex;
  var current;
  idindex = new IdIndex({
    props: {
      data:
      /*data*/
      ctx[0],
      id:
      /*id*/
      ctx[1],
      types: types
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(idindex.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(idindex.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(idindex, target, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var idindex_changes = {};
      if (dirty &
      /*data*/
      1) idindex_changes.data =
      /*data*/
      ctx[0];
      if (dirty &
      /*id*/
      2) idindex_changes.id =
      /*id*/
      ctx[1];
      idindex.$set(idindex_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(idindex.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(idindex.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(idindex, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function preload(_ref3) {
  var id = _ref3.params.id;
  return this.fetch(lookup[id].url).then(function (r) {
    return r.text();
  }).then(parseCSV(id)).then(function (data) {
    return {
      data: data,
      id: id
    };
  });
}

function instance($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
      $$props.$$scope;
  validate_slots('U5Bidu5D', slots, []);
  var data = $$props.data;
  var id = $$props.id;
  var writable_props = ['data', 'id'];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<U5Bidu5D> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$$set = function ($$props) {
    if ('data' in $$props) $$invalidate(0, data = $$props.data);
    if ('id' in $$props) $$invalidate(1, id = $$props.id);
  };

  $$self.$capture_state = function () {
    return {
      parseCSV: parseCSV,
      lookup: lookup,
      preload: preload,
      IdIndex: IdIndex,
      types: types,
      data: data,
      id: id
    };
  };

  $$self.$inject_state = function ($$props) {
    if ('data' in $$props) $$invalidate(0, data = $$props.data);
    if ('id' in $$props) $$invalidate(1, id = $$props.id);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [data, id];
}

var U5Bidu5D = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(U5Bidu5D, _SvelteComponentDev);

  var _super = _createSuper(U5Bidu5D);

  function U5Bidu5D(options) {
    var _this;

    _classCallCheck(this, U5Bidu5D);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      data: 0,
      id: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "U5Bidu5D",
      options: options,
      id: create_fragment.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*data*/
    ctx[0] === undefined && !('data' in props)) {
      console.warn("<U5Bidu5D> was created without expected prop 'data'");
    }

    if (
    /*id*/
    ctx[1] === undefined && !('id' in props)) {
      console.warn("<U5Bidu5D> was created without expected prop 'id'");
    }

    return _this;
  }

  _createClass(U5Bidu5D, [{
    key: "data",
    get: function get() {
      throw new Error("<U5Bidu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<U5Bidu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "id",
    get: function get() {
      throw new Error("<U5Bidu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<U5Bidu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return U5Bidu5D;
}(SvelteComponentDev);

export { U5Bidu5D as default, preload };

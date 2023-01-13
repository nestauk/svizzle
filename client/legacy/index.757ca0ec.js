import { A as _slicedToArray, $ as _typeof, T as _defineProperty, c as _createClass, a as _classCallCheck } from './client.a726f8ff.js';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _e = function e(t, n) {
    return _e = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (e, t) {
      e.__proto__ = t;
    } || function (e, t) {
      for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    }, _e(t, n);
  },
  _t = function t() {
    return _t = Object.assign || function (e) {
      for (var t, n = 1, r = arguments.length; n < r; n++) for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
      return e;
    }, _t.apply(this, arguments);
  };
function n(e, t, n) {
  if (n || 2 === arguments.length) for (var r, o = 0, i = t.length; o < i; o++) !r && o in t || (r || (r = Array.prototype.slice.call(t, 0, o)), r[o] = t[o]);
  return e.concat(r || Array.prototype.slice.call(t));
}
var r = function (t) {
    function n() {
      return null !== t && t.apply(this, arguments) || this;
    }
    return function (t, n) {
      if ("function" != typeof n && null !== n) throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
      function r() {
        this.constructor = t;
      }
      _e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
    }(n, t), n;
  }(Error),
  o = {},
  i = new Set(),
  a = {};
function c(e, n) {
  if ("string" == typeof e || "number" == typeof e && !isNaN(e) && Math.abs(e) !== 1 / 0 || null == e || "boolean" == typeof e) return e;
  var r = n.indexOf(e);
  if (-1 !== r) return "#$@__instance__" + r;
  n.push(e);
  var o = n.length - 1;
  if (e.constructor === Array) {
    var s = e.map(function (e) {
      return c(e, n);
    });
    return s.unshift("#$@__reference__" + o), s;
  }
  if (e.constructor === Object) {
    var u = Object.fromEntries(Object.entries(e).map(function (e) {
      return [e[0], c(e[1], n)];
    }));
    return u["#$@__reference__"] = o, u;
  }
  i.add(e.constructor);
  var l = {};
  l = Object.defineProperty(l, "#$@__constructor__", {
    value: e.constructor.name,
    enumerable: !0
  }), l = Object.defineProperty(l, "#$@__reference__", {
    value: o,
    enumerable: !0
  });
  var f = function (e, t) {
    if (Object.keys(a).includes(e.constructor.name)) return a[e.constructor.name].toPlain(e, function (e) {
      return c(e, t);
    });
  }(e, n);
  return void 0 !== f ? _t(_t({}, f), l) : (Object.getOwnPropertyNames(e).forEach(function (t) {
    Object.defineProperty(l, t, {
      value: c(e[t], n),
      enumerable: !0
    });
  }), l);
}
function s(e, t, n) {
  var o;
  if ("string" == typeof e && 0 === e.indexOf("#$@__instance__")) return n[l = parseInt(e.slice("#$@__instance__".length))];
  if ("string" == typeof e || "number" == typeof e || null == e || "boolean" == typeof e) return e;
  if (e.constructor === Array) {
    if (0 === e.length) return [];
    var i = e.shift();
    if ("string" != typeof i || "#$@__reference__" !== i.substring(0, "#$@__reference__".length)) {
      if (0 === Object.keys(n).length) return e.unshift(i), e;
      throw new r();
    }
    var c = [];
    n[l = i.slice("#$@__reference__".length)] = c;
    for (var u = 0; u < e.length; u++) c[u] = s(e[u], t, n);
    return c;
  }
  if (e.constructor === Object) {
    var l;
    if (null === (l = null !== (o = e["#$@__reference__"]) && void 0 !== o ? o : null)) {
      if (0 === Object.keys(n).length) return e;
      throw new r();
    }
    if (delete e["#$@__reference__"], !Object.keys(e).includes("#$@__constructor__")) {
      for (var f in c = {}, n[l] = c, e) c[f] = s(e[f], t, n);
      return c;
    }
    var d = e["#$@__constructor__"];
    delete e["#$@__constructor__"];
    var h = function (e, t, n, r) {
      if (Object.keys(a).includes(t)) return a[t].fromPlain(e, function (e) {
        return s(e, n, r);
      });
    }(e, d, t, n);
    if (void 0 !== h) return h;
    if (!Object.keys(t).includes(d)) throw new Error("The class " + d + " is not allowed");
    var p = {};
    for (var f in n[l] = p, e) p[f] = s(e[f], t, n);
    return Object.setPrototypeOf(p, t[d].prototype), p;
  }
}
function u(e) {
  o[e.name] = e;
}
!function (e, t) {
  e("Date", function (e) {
    return {
      time: e.getTime()
    };
  }, function (e) {
    var t = new Date();
    return t.setTime(e.time), t;
  }), e("BigInt", function (e) {
    return {
      number: e.toString()
    };
  }, function (e) {
    return BigInt(e.number);
  }), e("String", function (e) {
    return {
      text: e.toString()
    };
  }, function (e) {
    return new String(e.text);
  }), e("RegExp", function (e) {
    return {
      source: e.source,
      flags: e.flags
    };
  }, function (e) {
    return new RegExp(e.source, e.flags);
  }), e("Number", function (e) {
    var t = {
      nan: !1,
      infinity: !1,
      positive: !0,
      number: null
    };
    return Math.abs(e) === 1 / 0 ? (t.infinity = !0, t.positive = Math.abs(e) === e, t) : isNaN(e) ? (t.nan = !0, t) : (t.number = e.valueOf(), t);
  }, function (e) {
    return e.nan ? NaN : e.infinity ? 1 / 0 * (e.positive ? 1 : -1) : new Number(e.number);
  }), e("Map", function (e, t) {
    return {
      data: Array.from(e.entries()).map(function (e) {
        return t(e);
      })
    };
  }, function (e, t) {
    var n = new Map();
    return e.data.map(function (e) {
      return t(e);
    }).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        e = _ref2[0],
        t = _ref2[1];
      return n.set(e, t);
    }), n;
  }), e("Set", function (e, t) {
    return {
      data: Array.from(e.values()).map(function (e) {
        return t(e);
      })
    };
  }, function (e, t) {
    var n = new Set();
    return e.data.map(function (e) {
      return t(e);
    }).forEach(function (e) {
      return n.add(e);
    }), n;
  }), e("ArrayBuffer", function (e, t) {
    return {
      data: t(new Uint8Array(e))
    };
  }, function (e, t) {
    return t(e.data).buffer;
  }), e("DataView", function (e, t) {
    return {
      buffer: t(e.buffer),
      offset: e.byteOffset,
      length: e.byteLength
    };
  }, function (e, t) {
    return new DataView(t(e.buffer), e.offset, e.length);
  }), [Error, EvalError, RangeError, AggregateError, ReferenceError, SyntaxError, TypeError, URIError, Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array].forEach(function (e) {
    return t(e);
  });
}(function (e, t, n) {
  a[e] = {
    toPlain: t,
    fromPlain: n
  };
}, u);
var l,
  f = {};
function d(e) {
  return new Promise(function (t, n) {
    e.oncomplete = e.onsuccess = function () {
      return t(e.result);
    }, e.onabort = e.onerror = function () {
      return n(e.error);
    };
  });
}
function h(e, t) {
  var n = function () {
    if (navigator.userAgentData || !/Safari\//.test(navigator.userAgent) || /Chrom(e|ium)\//.test(navigator.userAgent) || !indexedDB.databases) return Promise.resolve();
    var e;
    return new Promise(function (t) {
      var n = function n() {
        return indexedDB.databases().finally(t);
      };
      e = setInterval(n, 100), n();
    }).finally(function () {
      return clearInterval(e);
    });
  }().then(function () {
    var n = indexedDB.open(e);
    return n.onupgradeneeded = function () {
      return n.result.createObjectStore(t);
    }, d(n);
  });
  return function (e, r) {
    return n.then(function (n) {
      return r(n.transaction(t, e).objectStore(t));
    });
  };
}
var p;
function g() {
  return p || (p = h("keyval-store", "keyval")), p;
}
function m(e) {
  var t,
    n = e[0],
    r = 1;
  for (; r < e.length;) {
    var _o = e[r],
      _i = e[r + 1];
    if (r += 2, ("optionalAccess" === _o || "optionalCall" === _o) && null == n) return;
    "access" === _o || "optionalAccess" === _o ? (t = n, n = _i(n)) : "call" !== _o && "optionalCall" !== _o || (n = _i(function () {
      var _n;
      for (var _len = arguments.length, e = new Array(_len), _key = 0; _key < _len; _key++) {
        e[_key] = arguments[_key];
      }
      return (_n = n).call.apply(_n, [t].concat(e));
    }), t = void 0);
  }
  return n;
}
function y() {
  b = !0;
}
(l = f).defaults = {}, l.set = function (e, t, n) {
  var r = n || {},
    o = l.defaults,
    i = r.expires || o.expires,
    a = r.domain || o.domain,
    c = void 0 !== r.path ? r.path : void 0 !== o.path ? o.path : "/",
    s = void 0 !== r.secure ? r.secure : o.secure,
    u = void 0 !== r.httponly ? r.httponly : o.httponly,
    f = void 0 !== r.samesite ? r.samesite : o.samesite,
    d = i ? new Date("number" == typeof i ? new Date().getTime() + 864e5 * i : i) : 0;
  document.cookie = e.replace(/[^+#$&^`|]/g, encodeURIComponent).replace("(", "%28").replace(")", "%29") + "=" + t.replace(/[^+#$&/:<-\[\]-}]/g, encodeURIComponent) + (d && d.getTime() >= 0 ? ";expires=" + d.toUTCString() : "") + (a ? ";domain=" + a : "") + (c ? ";path=" + c : "") + (s ? ";secure" : "") + (u ? ";httponly" : "") + (f ? ";samesite=" + f : "");
}, l.get = function (e) {
  for (var t = document.cookie.split(";"); t.length;) {
    var n = t.pop(),
      r = n.indexOf("=");
    if (r = r < 0 ? n.length : r, decodeURIComponent(n.slice(0, r).replace(/^\s+/, "")) === e) return decodeURIComponent(n.slice(r + 1));
  }
  return null;
}, l.erase = function (e, t) {
  l.set(e, "", {
    expires: -1,
    domain: t && t.domain,
    path: t && t.path,
    secure: 0,
    httponly: 0
  });
}, l.all = function () {
  for (var e = {}, t = document.cookie.split(";"); t.length;) {
    var n = t.pop(),
      r = n.indexOf("=");
    r = r < 0 ? n.length : r, e[decodeURIComponent(n.slice(0, r).replace(/^\s+/, ""))] = decodeURIComponent(n.slice(r + 1));
  }
  return e;
};
var b = !1;
var v = [],
  _ = function _(e) {
    (function (e) {
      var t = "undefined" != typeof process && "production" === m([process, "access", function (e) {
        return e.env;
      }, "optionalAccess", function (e) {
        return e.NODE_ENV;
      }]);
      b || -1 !== v.indexOf(e) || t || ("undefined" == typeof window && (e += "\nAre you running on a server? Most of storages are not available while running on a server."), console.warn(e), v.push(e));
    })("Unable to find the ".concat(e, ". No data will be persisted."));
  },
  w = function w(e) {
    S(e);
  };
var A = function A(e) {
    return void 0 === e ? "undefined" : JSON.stringify(c(e, []));
  },
  O = function O(e, t) {
    if (void 0 === t && (t = void 0), "string" != typeof e) return e;
    if (void 0 === t && (t = {}), "undefined" !== e) {
      t = Object.fromEntries(n(n([], Object.entries(t), !0), Object.entries(o), !0));
      try {
        return s(JSON.parse(e), t, {});
      } catch (t) {
        return e;
      }
    }
  },
  S = u;
function L(e, t, n) {
  var r, o;
  A = e, O = t, o = function o() {
    return function () {};
  }, S = null != (r = n) ? r : o();
}
function E(e, t, n) {
  var r = t.getValue(n);
  return null !== r && e.set(r), t.addListener && t.addListener(n, function (t) {
    e.set(t);
  }), e.subscribe(function (e) {
    t.setValue(n, e);
  }), _objectSpread(_objectSpread({}, e), {}, {
    delete: function _delete() {
      t.deleteValue(n);
    }
  });
}
function x() {}
function V() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : x;
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
  var n = [];
  return {
    callListeners: function callListeners(e, t) {
      void 0 !== t && n.filter(function (_ref3) {
        var t = _ref3.key;
        return t === e;
      }).forEach(function (_ref4) {
        var e = _ref4.listener;
        return e(t);
      });
    },
    addListener: function addListener(t, r) {
      n.push({
        key: t,
        listener: r
      }), 1 === n.length && e();
    },
    removeListener: function removeListener(e, r) {
      var o = n.indexOf({
        key: e,
        listener: r
      });
      -1 !== o && n.splice(o, 1), 0 === n.length && t();
    }
  };
}
var C = U(),
  I = B(),
  N = M();
function j(e, t) {
  return E(e, C, t);
}
function k(e, t) {
  return E(e, N, t);
}
function P(e, t) {
  return E(e, I, t);
}
function R(e) {
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
  var n = function n(t) {
      var n = t.key;
      t.storageArea === e && o(n, O(t.newValue));
    },
    _V = V(function () {
      t && "undefined" != typeof window && m([window, "optionalAccess", function (e) {
        return e.addEventListener;
      }]) && window.addEventListener("storage", n);
    }, function () {
      t && "undefined" != typeof window && m([window, "optionalAccess", function (e) {
        return e.removeEventListener;
      }]) && window.removeEventListener("storage", n);
    }),
    r = _V.removeListener,
    o = _V.callListeners,
    i = _V.addListener;
  return {
    addListener: i,
    removeListener: r,
    getValue: function getValue(t) {
      var n = e.getItem(t);
      return O(n);
    },
    deleteValue: function deleteValue(t) {
      e.removeItem(t);
    },
    setValue: function setValue(t, n) {
      e.setItem(t, A(n));
    }
  };
}
function B() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
  return "undefined" != typeof window && m([window, "optionalAccess", function (e) {
    return e.localStorage;
  }]) ? R(window.localStorage, e) : (_("window.localStorage"), Y());
}
function M() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
  return "undefined" != typeof window && m([window, "optionalAccess", function (e) {
    return e.sessionStorage;
  }]) ? R(window.sessionStorage, e) : (_("window.sessionStorage"), Y());
}
function U() {
  return "undefined" == typeof document || "string" != typeof m([document, "optionalAccess", function (e) {
    return e.cookie;
  }]) ? (_("document.cookies"), Y()) : {
    getValue: function getValue(e) {
      var t = f.get(e);
      return O(t);
    },
    deleteValue: function deleteValue(e) {
      f.erase(e, {
        samesite: "Strict"
      });
    },
    setValue: function setValue(e, t) {
      f.set(e, A(t), {
        samesite: "Strict"
      });
    }
  };
}
function $() {
  if ("object" != (typeof indexedDB === "undefined" ? "undefined" : _typeof(indexedDB)) || "undefined" == typeof window || "object" != _typeof(m([window, "optionalAccess", function (e) {
    return e.indexedDB;
  }]))) return _("IndexedDB"), G();
  var _V2 = V(),
    e = _V2.removeListener,
    t = _V2.callListeners,
    n = _V2.addListener,
    r = h("svelte-persist", "persist");
  return {
    addListener: n,
    removeListener: e,
    getValue: function getValue(e) {
      return function (e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : g();
        return t("readonly", function (t) {
          return d(t.get(e));
        });
      }(e, r).then(function (n) {
        return t(e, O(n));
      }), null;
    },
    setValue: function setValue(e, t) {
      !function (e, t) {
        var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : g();
        n("readwrite", function (n) {
          return n.put(t, e), d(n.transaction);
        });
      }(e, A(t), r);
    },
    deleteValue: function deleteValue(e) {
      !function (e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : g();
        t("readwrite", function (t) {
          return t.delete(e), d(t.transaction);
        });
      }(e, r);
    }
  };
}
var D;
function T() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : D.LOCAL;
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
  if ("object" != (typeof chrome === "undefined" ? "undefined" : _typeof(chrome)) || "object" != _typeof(chrome.storage)) return _("ChromeStorage"), G();
  var n = "local";
  switch (e) {
    case D.LOCAL:
      n = "local";
      break;
    case D.SYNC:
      n = "sync";
      break;
    case D.SESSION:
      n = "session";
  }
  function r(e, t) {
    if (t === n) for (var _i2 = 0, _Object$entries = Object.entries(e); _i2 < _Object$entries.length; _i2++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
        _t2 = _Object$entries$_i[0],
        _n2 = _Object$entries$_i[1].newValue;
      i(_t2, _n2);
    }
  }
  var _V3 = V(function () {
      t && chrome.storage.onChanged.addListener(r);
    }, function () {
      t && chrome.storage.onChanged.removeListener(r);
    }),
    o = _V3.removeListener,
    i = _V3.callListeners,
    a = _V3.addListener;
  return {
    addListener: a,
    removeListener: o,
    getValue: function getValue(e) {
      return chrome.storage[n].get([e], function (t) {
        return i(e, t.key);
      }), null;
    },
    setValue: function setValue(e, t) {
      chrome.storage[n].set(_defineProperty({}, e, t));
    },
    deleteValue: function deleteValue(e) {
      chrome.storage[n].remove(e);
    }
  };
}
function Y() {
  return {
    getValue: function getValue() {
      return null;
    },
    deleteValue: function deleteValue() {},
    setValue: function setValue() {}
  };
}
function G() {
  return {
    addListener: function addListener() {},
    removeListener: function removeListener() {},
    getValue: function getValue() {
      return null;
    },
    deleteValue: function deleteValue() {},
    setValue: function setValue() {}
  };
}
!function (e) {
  e[e.LOCAL = 0] = "LOCAL";
  e[e.SESSION = 1] = "SESSION";
  e[e.SYNC = 2] = "SYNC";
}(D || (D = {}));
var q,
  z = function z(e) {
    return Math.round(e / 1099511627776) || 32;
  },
  F = function F(e) {
    var t,
      n = e.length;
    return 0 === n ? 0 : (t = e[n - 1], 32 * (n - 1) + z(t));
  },
  J = function J(e) {
    var t,
      n = "",
      r = e.length;
    for (t = 0; t < r; t++) n += (0xf00000000000 + (0 | e[t])).toString(16).substr(4);
    return n.substr(0, F(e) / 4);
  },
  X = function X(e, t, n) {
    return 32 === e ? t : (n ? 0 | t : t << 32 - e) + 1099511627776 * e;
  },
  H = function H(e, t) {
    if (32 * e.length < t) return e;
    var n = (e = e.slice(0, Math.ceil(t / 32))).length;
    return t &= 31, n > 0 && t && (e[n - 1] = X(t, e[n - 1] & 2147483648 >> t - 1, 1)), e;
  },
  K = function K(e) {
    var t,
      n,
      r,
      o = [];
    for (r = (e = e.replace(/\s|0x/g, "")).length, n = (e += "00000000").length, t = 0; t < n; t += 8) o.push(0 ^ parseInt(e.substr(t, 8), 16));
    return H(o, 4 * r);
  },
  Q = {
    cipher: {},
    hash: {},
    keyexchange: {},
    mode: {},
    misc: {},
    codec: {},
    exception: {
      corrupt: function corrupt(e) {
        this.toString = function () {
          return "CORRUPT: " + this.message;
        }, this.message = e;
      },
      invalid: function invalid(e) {
        this.toString = function () {
          return "INVALID: " + this.message;
        }, this.message = e;
      },
      bug: function bug(e) {
        this.toString = function () {
          return "BUG: " + this.message;
        }, this.message = e;
      },
      notReady: function notReady(e) {
        this.toString = function () {
          return "NOT READY: " + this.message;
        }, this.message = e;
      }
    }
  };
function W(e) {}
Q.cipher.aes = function (e) {
  this._tables[0][0][0] || this._precompute();
  var t,
    n,
    r,
    o,
    i,
    a = this._tables[0][4],
    c = this._tables[1],
    s = e.length,
    u = 1;
  if (4 !== s && 6 !== s && 8 !== s) throw new Q.exception.invalid("invalid aes key size");
  for (this._key = [o = e.slice(0), i = []], t = s; t < 4 * s + 28; t++) r = o[t - 1], (t % s == 0 || 8 === s && t % s == 4) && (r = a[r >>> 24] << 24 ^ a[r >> 16 & 255] << 16 ^ a[r >> 8 & 255] << 8 ^ a[255 & r], t % s == 0 && (r = r << 8 ^ r >>> 24 ^ u << 24, u = u << 1 ^ 283 * (u >> 7))), o[t] = o[t - s] ^ r;
  for (n = 0; t; n++, t--) r = o[3 & n ? t : t - 4], i[n] = t <= 4 || n < 4 ? r : c[0][a[r >>> 24]] ^ c[1][a[r >> 16 & 255]] ^ c[2][a[r >> 8 & 255]] ^ c[3][a[255 & r]];
}, Q.cipher.aes.prototype = {
  encrypt: function encrypt(e) {
    return this._crypt(e, 0);
  },
  decrypt: function decrypt(e) {
    return this._crypt(e, 1);
  },
  _tables: [[[], [], [], [], []], [[], [], [], [], []]],
  _precompute: function _precompute() {
    var e,
      t,
      n,
      r,
      o,
      i,
      a,
      c,
      s = this._tables[0],
      u = this._tables[1],
      l = s[4],
      f = u[4],
      d = [],
      h = [];
    for (e = 0; e < 256; e++) h[(d[e] = e << 1 ^ 283 * (e >> 7)) ^ e] = e;
    for (t = n = 0; !l[t]; t ^= r || 1, n = h[n] || 1) for (i = (i = n ^ n << 1 ^ n << 2 ^ n << 3 ^ n << 4) >> 8 ^ 255 & i ^ 99, l[t] = i, f[i] = t, c = 16843009 * d[o = d[r = d[t]]] ^ 65537 * o ^ 257 * r ^ 16843008 * t, a = 257 * d[i] ^ 16843008 * i, e = 0; e < 4; e++) s[e][t] = a = a << 24 ^ a >>> 8, u[e][i] = c = c << 24 ^ c >>> 8;
    for (e = 0; e < 5; e++) s[e] = s[e].slice(0), u[e] = u[e].slice(0);
  },
  _crypt: function _crypt(e, t) {
    if (4 !== e.length) throw new Q.exception.invalid("invalid aes block size");
    var n,
      r,
      o,
      i,
      a = this._key[t],
      c = e[0] ^ a[0],
      s = e[t ? 3 : 1] ^ a[1],
      u = e[2] ^ a[2],
      l = e[t ? 1 : 3] ^ a[3],
      f = a.length / 4 - 2,
      d = 4,
      h = [0, 0, 0, 0],
      p = this._tables[t],
      g = p[0],
      m = p[1],
      y = p[2],
      b = p[3],
      v = p[4];
    for (i = 0; i < f; i++) n = g[c >>> 24] ^ m[s >> 16 & 255] ^ y[u >> 8 & 255] ^ b[255 & l] ^ a[d], r = g[s >>> 24] ^ m[u >> 16 & 255] ^ y[l >> 8 & 255] ^ b[255 & c] ^ a[d + 1], o = g[u >>> 24] ^ m[l >> 16 & 255] ^ y[c >> 8 & 255] ^ b[255 & s] ^ a[d + 2], l = g[l >>> 24] ^ m[c >> 16 & 255] ^ y[s >> 8 & 255] ^ b[255 & u] ^ a[d + 3], d += 4, c = n, s = r, u = o;
    for (i = 0; i < 4; i++) h[t ? 3 & -i : i] = v[c >>> 24] << 24 ^ v[s >> 16 & 255] << 16 ^ v[u >> 8 & 255] << 8 ^ v[255 & l] ^ a[d++], n = c, c = s, s = u, u = l, l = n;
    return h;
  }
}, Q.bitArray = {
  bitSlice: function bitSlice(e, t, n) {
    return e = Q.bitArray._shiftRight(e.slice(t / 32), 32 - (31 & t)).slice(1), void 0 === n ? e : Q.bitArray.clamp(e, n - t);
  },
  extract: function extract(e, t, n) {
    var r = Math.floor(-t - n & 31);
    return (-32 & (t + n - 1 ^ t) ? e[t / 32 | 0] << 32 - r ^ e[t / 32 + 1 | 0] >>> r : e[t / 32 | 0] >>> r) & (1 << n) - 1;
  },
  concat: function concat(e, t) {
    if (0 === e.length || 0 === t.length) return e.concat(t);
    var n = e[e.length - 1],
      r = Q.bitArray.getPartial(n);
    return 32 === r ? e.concat(t) : Q.bitArray._shiftRight(t, r, 0 | n, e.slice(0, e.length - 1));
  },
  bitLength: function bitLength(e) {
    var t,
      n = e.length;
    return 0 === n ? 0 : (t = e[n - 1], 32 * (n - 1) + Q.bitArray.getPartial(t));
  },
  clamp: function clamp(e, t) {
    if (32 * e.length < t) return e;
    var n = (e = e.slice(0, Math.ceil(t / 32))).length;
    return t &= 31, n > 0 && t && (e[n - 1] = Q.bitArray.partial(t, e[n - 1] & 2147483648 >> t - 1, 1)), e;
  },
  partial: function partial(e, t, n) {
    return 32 === e ? t : (n ? 0 | t : t << 32 - e) + 1099511627776 * e;
  },
  getPartial: function getPartial(e) {
    return Math.round(e / 1099511627776) || 32;
  },
  equal: function equal(e, t) {
    if (Q.bitArray.bitLength(e) !== Q.bitArray.bitLength(t)) return !1;
    var n,
      r = 0;
    for (n = 0; n < e.length; n++) r |= e[n] ^ t[n];
    return 0 === r;
  },
  _shiftRight: function _shiftRight(e, t, n, r) {
    var o, i, a;
    for (void 0 === r && (r = []); t >= 32; t -= 32) r.push(n), n = 0;
    if (0 === t) return r.concat(e);
    for (o = 0; o < e.length; o++) r.push(n | e[o] >>> t), n = e[o] << 32 - t;
    return i = e.length ? e[e.length - 1] : 0, a = Q.bitArray.getPartial(i), r.push(Q.bitArray.partial(t + a & 31, t + a > 32 ? n : r.pop(), 1)), r;
  },
  _xor4: function _xor4(e, t) {
    return [e[0] ^ t[0], e[1] ^ t[1], e[2] ^ t[2], e[3] ^ t[3]];
  },
  byteswapM: function byteswapM(e) {
    var t, n;
    for (t = 0; t < e.length; ++t) n = e[t], e[t] = n >>> 24 | n >>> 8 & 65280 | (65280 & n) << 8 | n << 24;
    return e;
  }
}, Q.codec.utf8String = {
  fromBits: function fromBits(e) {
    var t,
      n,
      r = "",
      o = Q.bitArray.bitLength(e);
    for (t = 0; t < o / 8; t++) 0 == (3 & t) && (n = e[t / 4]), r += String.fromCharCode(n >>> 8 >>> 8 >>> 8), n <<= 8;
    return decodeURIComponent(escape(r));
  },
  toBits: function toBits(e) {
    e = unescape(encodeURIComponent(e));
    var t,
      n = [],
      r = 0;
    for (t = 0; t < e.length; t++) r = r << 8 | e.charCodeAt(t), 3 == (3 & t) && (n.push(r), r = 0);
    return 3 & t && n.push(Q.bitArray.partial(8 * (3 & t), r)), n;
  }
}, Q.codec.base64 = {
  _chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  fromBits: function fromBits(e, t, n) {
    var r,
      o = "",
      i = 0,
      a = Q.codec.base64._chars,
      c = 0,
      s = Q.bitArray.bitLength(e);
    for (n && (a = a.substr(0, 62) + "-_"), r = 0; 6 * o.length < s;) o += a.charAt((c ^ e[r] >>> i) >>> 26), i < 6 ? (c = e[r] << 6 - i, i += 26, r++) : (c <<= 6, i -= 6);
    for (; 3 & o.length && !t;) o += "=";
    return o;
  },
  toBits: function toBits(e, t) {
    e = e.replace(/\s|=/g, "");
    var n,
      r,
      o = [],
      i = 0,
      a = Q.codec.base64._chars,
      c = 0;
    for (t && (a = a.substr(0, 62) + "-_"), n = 0; n < e.length; n++) {
      if ((r = a.indexOf(e.charAt(n))) < 0) throw new Q.exception.invalid("this isn't base64!");
      i > 26 ? (i -= 26, o.push(c ^ r >>> i), c = r << 32 - i) : c ^= r << 32 - (i += 6);
    }
    return 56 & i && o.push(Q.bitArray.partial(56 & i, c, 1)), o;
  }
}, Q.codec.base64url = {
  fromBits: function fromBits(e) {
    return Q.codec.base64.fromBits(e, 1, 1);
  },
  toBits: function toBits(e) {
    return Q.codec.base64.toBits(e, 1);
  }
}, Q.mode.gcm = {
  name: "gcm",
  encrypt: function encrypt(e, t, n, r, o) {
    var i,
      a = t.slice(0),
      c = Q.bitArray;
    return o = o || 128, r = r || [], i = Q.mode.gcm._ctrMode(!0, e, a, r, n, o), c.concat(i.data, i.tag);
  },
  decrypt: function decrypt(e, t, n, r, o) {
    var i,
      a,
      c = t.slice(0),
      s = Q.bitArray,
      u = s.bitLength(c);
    if (r = r || [], (o = o || 128) <= u ? (a = s.bitSlice(c, u - o), c = s.bitSlice(c, 0, u - o)) : (a = c, c = []), i = Q.mode.gcm._ctrMode(!1, e, c, r, n, o), !s.equal(i.tag, a)) throw new Q.exception.corrupt("gcm: tag doesn't match");
    return i.data;
  },
  _galoisMultiply: function _galoisMultiply(e, t) {
    var n,
      r,
      o,
      i,
      a,
      c = Q.bitArray._xor4;
    for (o = [0, 0, 0, 0], i = t.slice(0), n = 0; n < 128; n++) {
      for (0 != (e[Math.floor(n / 32)] & 1 << 31 - n % 32) && (o = c(o, i)), a = 0 != (1 & i[3]), r = 3; r > 0; r--) i[r] = i[r] >>> 1 | (1 & i[r - 1]) << 31;
      i[0] = i[0] >>> 1, a && (i[0] = i[0] ^ 225 << 24);
    }
    return o;
  },
  _ghash: function _ghash(e, t, n) {
    var r,
      o,
      i = n.length;
    for (r = t.slice(0), o = 0; o < i; o += 4) r[0] ^= 4294967295 & n[o], r[1] ^= 4294967295 & n[o + 1], r[2] ^= 4294967295 & n[o + 2], r[3] ^= 4294967295 & n[o + 3], r = Q.mode.gcm._galoisMultiply(r, e);
    return r;
  },
  _ctrMode: function _ctrMode(e, t, n, r, o, i) {
    var a,
      c,
      s,
      u,
      l,
      f,
      d,
      h,
      p,
      g,
      m,
      y,
      b = Q.bitArray;
    for (p = n.length, g = b.bitLength(n), m = b.bitLength(r), y = b.bitLength(o), a = t.encrypt([0, 0, 0, 0]), 96 === y ? (c = o.slice(0), c = b.concat(c, [1])) : (c = Q.mode.gcm._ghash(a, [0, 0, 0, 0], o), c = Q.mode.gcm._ghash(a, c, [0, 0, Math.floor(y / 4294967296), 4294967295 & y])), s = Q.mode.gcm._ghash(a, [0, 0, 0, 0], r), f = c.slice(0), d = s.slice(0), e || (d = Q.mode.gcm._ghash(a, s, n)), l = 0; l < p; l += 4) f[3]++, u = t.encrypt(f), n[l] ^= u[0], n[l + 1] ^= u[1], n[l + 2] ^= u[2], n[l + 3] ^= u[3];
    return n = b.clamp(n, g), e && (d = Q.mode.gcm._ghash(a, s, n)), h = [Math.floor(m / 4294967296), 4294967295 & m, Math.floor(g / 4294967296), 4294967295 & g], d = Q.mode.gcm._ghash(a, d, h), u = t.encrypt(c), d[0] ^= u[0], d[1] ^= u[1], d[2] ^= u[2], d[3] ^= u[3], {
      tag: b.bitSlice(d, 0, i),
      data: n
    };
  }
}, function (e) {
  e[e.EXCEPTION = 0] = "EXCEPTION";
  e[e.NO_ENCRYPTION = 1] = "NO_ENCRYPTION";
  e[e.NO_STORAGE = 2] = "NO_STORAGE";
}(q || (q = {}));
var Z = /*#__PURE__*/function () {
  function Z(e) {
    _classCallCheck(this, Z);
    this.cipher = new Q.cipher.aes(K(e));
  }
  _createClass(Z, [{
    key: "encrypt",
    value: function encrypt(e, t) {
      t || (t = "sps");
      var n = Q.codec.utf8String.toBits(t);
      return J(Q.mode.gcm.encrypt(this.cipher, Q.codec.utf8String.toBits(e), n, [], 256)) + ":" + J(n);
    }
  }, {
    key: "decrypt",
    value: function decrypt(e) {
      return Q.codec.utf8String.fromBits(Q.mode.gcm.decrypt(this.cipher, K(e.split(":")[0]), K(e.split(":")[1])));
    }
  }, {
    key: "hash",
    value: function hash(e) {
      return this.encrypt(e, "sps");
    }
  }]);
  return Z;
}();
function ee(e, t) {
  return te(e, new Z(t));
}
function te(e, t) {
  return {
    getValue: function getValue(n) {
      var r = t.hash(n),
        o = e.getValue(r);
      return null === o ? null : O(t.decrypt(o));
    },
    setValue: function setValue(n, r) {
      var o = t.hash(n),
        i = t.encrypt(A(r));
      e.setValue(o, i);
    },
    deleteValue: function deleteValue(n) {
      var r = t.hash(n);
      e.deleteValue(r);
    }
  };
}

export { w as addSerializableClass, T as createChromeStorage, U as createCookieStorage, ee as createEncryptedStorage, te as createEncryptionStorage, $ as createIndexedDBStorage, B as createLocalStorage, Y as createNoopStorage, M as createSessionStorage, y as disableWarnings, W as noEncryptionBehavior, E as persist, P as persistBrowserLocal, k as persistBrowserSession, j as persistCookie, L as setSerialization };

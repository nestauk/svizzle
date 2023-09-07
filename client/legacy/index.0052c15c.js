var e = function (t, n) {
    return e = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (e, t) {
      e.__proto__ = t;
    } || function (e, t) {
      for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    }, e(t, n);
  },
  t = function () {
    return t = Object.assign || function (e) {
      for (var t, n = 1, r = arguments.length; n < r; n++) for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
      return e;
    }, t.apply(this, arguments);
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
      e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
    }(n, t), n;
  }(Error),
  o = {},
  i = new Set(),
  c = {};
function a(e, n) {
  if ("string" == typeof e || "number" == typeof e && !isNaN(e) && Math.abs(e) !== 1 / 0 || null == e || "boolean" == typeof e) return e;
  var r = n.indexOf(e);
  if (-1 !== r) return "#$@__instance__" + r;
  n.push(e);
  var o = n.length - 1;
  if (e.constructor === Array) {
    var s = e.map(function (e) {
      return a(e, n);
    });
    return s.unshift("#$@__reference__" + o), s;
  }
  if (e.constructor === Object) {
    var u = Object.fromEntries(Object.entries(e).map(function (e) {
      return [e[0], a(e[1], n)];
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
    if (Object.keys(c).includes(e.constructor.name)) return c[e.constructor.name].toPlain(e, function (e) {
      return a(e, t);
    });
  }(e, n);
  return void 0 !== f ? t(t({}, f), l) : (Object.getOwnPropertyNames(e).forEach(function (t) {
    Object.defineProperty(l, t, {
      value: a(e[t], n),
      enumerable: !0
    });
  }), l);
}
function s(e, t, n) {
  var o;
  if ("string" == typeof e && 0 === e.indexOf("#$@__instance__")) return n[l = parseInt(e.slice(15))];
  if ("string" == typeof e || "number" == typeof e || null == e || "boolean" == typeof e) return e;
  if (e.constructor === Array) {
    if (0 === e.length) return [];
    var i = e.shift();
    if ("string" != typeof i || "#$@__reference__" !== i.substring(0, 16)) {
      if (0 === Object.keys(n).length) return e.unshift(i), e;
      throw new r();
    }
    var a = [];
    n[l = i.slice(16)] = a;
    for (var u = 0; u < e.length; u++) a[u] = s(e[u], t, n);
    return a;
  }
  if (e.constructor === Object) {
    var l;
    if (null === (l = null !== (o = e["#$@__reference__"]) && void 0 !== o ? o : null)) {
      if (0 === Object.keys(n).length) return e;
      throw new r();
    }
    if (delete e["#$@__reference__"], !Object.keys(e).includes("#$@__constructor__")) {
      for (var f in a = {}, n[l] = a, e) a[f] = s(e[f], t, n);
      return a;
    }
    var h = e["#$@__constructor__"];
    delete e["#$@__constructor__"];
    var d = function (e, t, n, r) {
      if (Object.keys(c).includes(t)) return c[t].fromPlain(e, function (e) {
        return s(e, n, r);
      });
    }(e, h, t, n);
    if (void 0 !== d) return d;
    if (!Object.keys(t).includes(h)) throw new Error("The class " + h + " is not allowed");
    var p = {};
    for (var f in n[l] = p, e) p[f] = s(e[f], t, n);
    return Object.setPrototypeOf(p, t[h].prototype), p;
  }
}
function u(e) {
  o[e.name] = e;
}
function l(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
!function (e, t) {
  e("Date", e => ({
    time: e.getTime()
  }), function (e) {
    let t = new Date();
    return t.setTime(e.time), t;
  }), e("BigInt", e => ({
    number: e.toString()
  }), e => BigInt(e.number)), e("String", e => ({
    text: e.toString()
  }), e => new String(e.text)), e("RegExp", e => ({
    source: e.source,
    flags: e.flags
  }), e => new RegExp(e.source, e.flags)), e("Number", function (e) {
    let t = {
      nan: !1,
      infinity: !1,
      positive: !0,
      number: null
    };
    return Math.abs(e) === 1 / 0 ? (t.infinity = !0, t.positive = Math.abs(e) === e, t) : isNaN(e) ? (t.nan = !0, t) : (t.number = e.valueOf(), t);
  }, function (e) {
    return e.nan ? NaN : e.infinity ? 1 / 0 * (e.positive ? 1 : -1) : new Number(e.number);
  }), e("Map", (e, t) => ({
    data: Array.from(e.entries()).map(e => t(e))
  }), function (e, t) {
    const n = new Map();
    return e.data.map(e => t(e)).forEach(_ref => {
      let [e, t] = _ref;
      return n.set(e, t);
    }), n;
  }), e("Set", (e, t) => ({
    data: Array.from(e.values()).map(e => t(e))
  }), function (e, t) {
    const n = new Set();
    return e.data.map(e => t(e)).forEach(e => n.add(e)), n;
  }), e("ArrayBuffer", (e, t) => ({
    data: t(new Uint8Array(e))
  }), (e, t) => t(e.data).buffer), e("DataView", (e, t) => ({
    buffer: t(e.buffer),
    offset: e.byteOffset,
    length: e.byteLength
  }), (e, t) => new DataView(t(e.buffer), e.offset, e.length)), [Error, EvalError, RangeError, AggregateError, ReferenceError, SyntaxError, TypeError, URIError, Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array].forEach(e => t(e));
}(function (e, t, n) {
  c[e] = {
    toPlain: t,
    fromPlain: n
  };
}, u);
var f,
  h = {};
function d(e) {
  return new Promise((t, n) => {
    e.oncomplete = e.onsuccess = () => t(e.result), e.onabort = e.onerror = () => n(e.error);
  });
}
function p(e, t) {
  const n = indexedDB.open(e);
  n.onupgradeneeded = () => n.result.createObjectStore(t);
  const r = d(n);
  return (e, n) => r.then(r => n(r.transaction(t, e).objectStore(t)));
}
let g;
function y() {
  return g || (g = p("keyval-store", "keyval")), g;
}
function m(e) {
  let t,
    n = e[0],
    r = 1;
  for (; r < e.length;) {
    const o = e[r],
      i = e[r + 1];
    if (r += 2, ("optionalAccess" === o || "optionalCall" === o) && null == n) return;
    "access" === o || "optionalAccess" === o ? (t = n, n = i(n)) : "call" !== o && "optionalCall" !== o || (n = i(function () {
      for (var _len = arguments.length, e = new Array(_len), _key = 0; _key < _len; _key++) {
        e[_key] = arguments[_key];
      }
      return n.call(t, ...e);
    }), t = void 0);
  }
  return n;
}
function b() {
  v = !0;
}
(f = h).defaults = {}, f.set = function (e, t, n) {
  var r = n || {},
    o = f.defaults,
    i = r.expires || o.expires,
    c = r.domain || o.domain,
    a = void 0 !== r.path ? r.path : void 0 !== o.path ? o.path : "/",
    s = void 0 !== r.secure ? r.secure : o.secure,
    u = void 0 !== r.httponly ? r.httponly : o.httponly,
    l = void 0 !== r.samesite ? r.samesite : o.samesite,
    h = i ? new Date("number" == typeof i ? new Date().getTime() + 864e5 * i : i) : 0;
  document.cookie = e.replace(/[^+#$&^`|]/g, encodeURIComponent).replace("(", "%28").replace(")", "%29") + "=" + t.replace(/[^+#$&/:<-\[\]-}]/g, encodeURIComponent) + (h && h.getTime() >= 0 ? ";expires=" + h.toUTCString() : "") + (c ? ";domain=" + c : "") + (a ? ";path=" + a : "") + (s ? ";secure" : "") + (u ? ";httponly" : "") + (l ? ";samesite=" + l : "");
}, f.get = function (e) {
  for (var t = document.cookie.split(";"); t.length;) {
    var n = t.pop(),
      r = n.indexOf("=");
    if (r = r < 0 ? n.length : r, decodeURIComponent(n.slice(0, r).replace(/^\s+/, "")) === e) return decodeURIComponent(n.slice(r + 1));
  }
  return null;
}, f.erase = function (e, t) {
  f.set(e, "", {
    expires: -1,
    domain: t && t.domain,
    path: t && t.path,
    secure: 0,
    httponly: 0
  });
}, f.all = function () {
  for (var e = {}, t = document.cookie.split(";"); t.length;) {
    var n = t.pop(),
      r = n.indexOf("=");
    r = r < 0 ? n.length : r, e[decodeURIComponent(n.slice(0, r).replace(/^\s+/, ""))] = decodeURIComponent(n.slice(r + 1));
  }
  return e;
};
let v = !1;
const _ = [],
  w = e => {
    (e => {
      const t = "undefined" != typeof process && "production" === m([process, "access", e => e.env, "optionalAccess", e => e.NODE_ENV]);
      v || _.includes(e) || t || ("undefined" == typeof window && (e += "\nAre you running on a server? Most of storages are not available while running on a server."), console.warn(e), _.push(e));
    })("Unable to find the ".concat(e, ". No data will be persisted."));
  };
function O(e) {
  L(e);
}
let A = function (e) {
    return void 0 === e ? "undefined" : JSON.stringify(a(e, []));
  },
  S = function (e, t) {
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
  L = u;
function E(e, t, n) {
  var r, o;
  A = e, S = t, o = () => () => {}, L = null != (r = n) ? r : o();
}
function j(e, t, n) {
  const r = t.getValue(n);
  return null !== r && e.set(r), t.addListener && t.addListener(n, t => {
    e.set(t);
  }), e.subscribe(e => {
    t.setValue(n, e);
  }), {
    ...e,
    delete() {
      t.deleteValue(n);
    }
  };
}
function x() {}
function N() {
  let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : x;
  let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
  const n = [];
  return {
    callListeners(e, t) {
      void 0 !== t && n.filter(_ref2 => {
        let {
          key: t
        } = _ref2;
        return t === e;
      }).forEach(_ref3 => {
        let {
          listener: e
        } = _ref3;
        return e(t);
      });
    },
    addListener(t, r) {
      n.push({
        key: t,
        listener: r
      }), 1 === n.length && e();
    },
    removeListener(e, r) {
      const o = n.indexOf({
        key: e,
        listener: r
      });
      -1 !== o && n.splice(o, 1), 0 === n.length && t();
    }
  };
}
function C(e) {
  let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
  const n = t => {
      const n = t.key;
      t.storageArea === e && o(n, S(t.newValue));
    },
    {
      removeListener: r,
      callListeners: o,
      addListener: i
    } = N(() => {
      t && "undefined" != typeof window && m([window, "optionalAccess", e => e.addEventListener]) && window.addEventListener("storage", n);
    }, () => {
      t && "undefined" != typeof window && m([window, "optionalAccess", e => e.removeEventListener]) && window.removeEventListener("storage", n);
    });
  return {
    addListener: i,
    removeListener: r,
    getValue(t) {
      const n = e.getItem(t);
      return S(n);
    },
    deleteValue(t) {
      e.removeItem(t);
    },
    setValue(t, n) {
      e.setItem(t, A(n));
    }
  };
}
function I(e) {
  try {
    return "object" == typeof window[e];
  } catch (e) {
    return !1;
  }
}
function V() {
  let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
  return I("localStorage") ? C(window.localStorage, e) : (w("window.localStorage"), U());
}
function k() {
  let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
  return I("sessionStorage") ? C(window.sessionStorage, e) : (w("window.sessionStorage"), U());
}
function R(e) {
  return "undefined" == typeof document || "string" != typeof m([document, "optionalAccess", e => e.cookie]) ? (w("document.cookies"), U()) : {
    getValue(e) {
      const t = h.get(e);
      return S(t);
    },
    deleteValue(t) {
      h.erase(t, {
        samesite: "Strict",
        ...e
      });
    },
    setValue(t, n) {
      h.set(t, A(n), {
        samesite: "Strict",
        ...e
      });
    }
  };
}
function P() {
  if ("object" != typeof indexedDB || !I("indexedDB")) return w("IndexedDB"), T();
  const {
      removeListener: e,
      callListeners: t,
      addListener: n
    } = N(),
    r = p("svelte-persist", "persist");
  return {
    addListener: n,
    removeListener: e,
    getValue: e => (function (e) {
      let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : y();
      return t("readonly", t => d(t.get(e)));
    }(e, r).then(n => t(e, S(n))), null),
    setValue(e, t) {
      !function (e, t) {
        let n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : y();
        n("readwrite", n => (n.put(t, e), d(n.transaction)));
      }(e, A(t), r);
    },
    deleteValue(e) {
      !function (e) {
        let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : y();
        t("readwrite", t => (t.delete(e), d(t.transaction)));
      }(e, r);
    }
  };
}
var M;
function B() {
  let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : M.LOCAL;
  let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
  if ("object" != typeof chrome || "object" != typeof chrome.storage) return w("ChromeStorage"), T();
  let n = "local";
  switch (e) {
    case M.LOCAL:
      n = "local";
      break;
    case M.SYNC:
      n = "sync";
      break;
    case M.SESSION:
      n = "session";
  }
  function r(e, t) {
    if (t === n) for (const [t, {
      newValue: n
    }] of Object.entries(e)) i(t, n);
  }
  const {
    removeListener: o,
    callListeners: i,
    addListener: c
  } = N(() => {
    t && chrome.storage.onChanged.addListener(r);
  }, () => {
    t && chrome.storage.onChanged.removeListener(r);
  });
  return {
    addListener: c,
    removeListener: o,
    getValue: e => (chrome.storage[n].get([e], t => i(e, t.key)), null),
    setValue(e, t) {
      chrome.storage[n].set({
        [e]: t
      });
    },
    deleteValue(e) {
      chrome.storage[n].remove(e);
    }
  };
}
function U() {
  return {
    getValue: () => null,
    deleteValue() {},
    setValue() {}
  };
}
function T() {
  return {
    ...U(),
    addListener() {},
    removeListener() {}
  };
}
function $() {}
!function (e) {
  e[e.LOCAL = 0] = "LOCAL";
  e[e.SESSION = 1] = "SESSION";
  e[e.SYNC = 2] = "SYNC";
}(M || (M = {}));
const D = [];
function Y(e) {
  let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : $;
  let n;
  const r = new Set();
  function o(t) {
    if (function (e, t) {
      return e != e ? t == t : e !== t || e && "object" == typeof e || "function" == typeof e;
    }(e, t) && (e = t, n)) {
      const t = !D.length;
      for (const t of r) t[1](), D.push(t, e);
      if (t) {
        for (let e = 0; e < D.length; e += 2) D[e][0](D[e + 1]);
        D.length = 0;
      }
    }
  }
  function i(t) {
    o(t(e));
  }
  return {
    set: o,
    update: i,
    subscribe: function (c) {
      let a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : $;
      const s = [c, a];
      return r.add(s), 1 === r.size && (n = t(o, i) || $), c(e), () => {
        r.delete(s), 0 === r.size && n && (n(), n = null);
      };
    }
  };
}
const z = R(),
  G = V(),
  q = k();
function F(e, t) {
  return j(e, z, t);
}
function J(e, t) {
  return j(e, q, t);
}
function X(e, t) {
  return j(e, G, t);
}
function H(e, t, n) {
  return X(Y(t, n), e);
}
function K(e, t, n) {
  return H(e, t, n);
}
function Q(e, t, n) {
  return J(Y(t, n), e);
}
function W(e, t, n) {
  return F(Y(t, n), e);
}
var Z,
  ee = function (e) {
    return Math.round(e / 1099511627776) || 32;
  },
  te = function (e) {
    var t,
      n = e.length;
    return 0 === n ? 0 : (t = e[n - 1], 32 * (n - 1) + ee(t));
  },
  ne = function (e) {
    var t,
      n = "",
      r = e.length;
    for (t = 0; t < r; t++) n += (0xf00000000000 + (0 | e[t])).toString(16).substr(4);
    return n.substr(0, te(e) / 4);
  },
  re = l(ne),
  oe = function (e, t, n) {
    return 32 === e ? t : (n ? 0 | t : t << 32 - e) + 1099511627776 * e;
  },
  ie = function (e, t) {
    if (32 * e.length < t) return e;
    var n = (e = e.slice(0, Math.ceil(t / 32))).length;
    return t &= 31, n > 0 && t && (e[n - 1] = oe(t, e[n - 1] & 2147483648 >> t - 1, 1)), e;
  },
  ce = function (e) {
    var t,
      n,
      r,
      o = [];
    for (r = (e = e.replace(/\s|0x/g, "")).length, n = (e += "00000000").length, t = 0; t < n; t += 8) o.push(0 ^ parseInt(e.substr(t, 8), 16));
    return ie(o, 4 * r);
  },
  ae = l(ce),
  se = {
    cipher: {},
    hash: {},
    keyexchange: {},
    mode: {},
    misc: {},
    codec: {},
    exception: {
      corrupt: function (e) {
        this.toString = function () {
          return "CORRUPT: " + this.message;
        }, this.message = e;
      },
      invalid: function (e) {
        this.toString = function () {
          return "INVALID: " + this.message;
        }, this.message = e;
      },
      bug: function (e) {
        this.toString = function () {
          return "BUG: " + this.message;
        }, this.message = e;
      },
      notReady: function (e) {
        this.toString = function () {
          return "NOT READY: " + this.message;
        }, this.message = e;
      }
    }
  };
function ue(e) {}
se.cipher.aes = function (e) {
  this._tables[0][0][0] || this._precompute();
  var t,
    n,
    r,
    o,
    i,
    c = this._tables[0][4],
    a = this._tables[1],
    s = e.length,
    u = 1;
  if (4 !== s && 6 !== s && 8 !== s) throw new se.exception.invalid("invalid aes key size");
  for (this._key = [o = e.slice(0), i = []], t = s; t < 4 * s + 28; t++) r = o[t - 1], (t % s == 0 || 8 === s && t % s == 4) && (r = c[r >>> 24] << 24 ^ c[r >> 16 & 255] << 16 ^ c[r >> 8 & 255] << 8 ^ c[255 & r], t % s == 0 && (r = r << 8 ^ r >>> 24 ^ u << 24, u = u << 1 ^ 283 * (u >> 7))), o[t] = o[t - s] ^ r;
  for (n = 0; t; n++, t--) r = o[3 & n ? t : t - 4], i[n] = t <= 4 || n < 4 ? r : a[0][c[r >>> 24]] ^ a[1][c[r >> 16 & 255]] ^ a[2][c[r >> 8 & 255]] ^ a[3][c[255 & r]];
}, se.cipher.aes.prototype = {
  encrypt: function (e) {
    return this._crypt(e, 0);
  },
  decrypt: function (e) {
    return this._crypt(e, 1);
  },
  _tables: [[[], [], [], [], []], [[], [], [], [], []]],
  _precompute: function () {
    var e,
      t,
      n,
      r,
      o,
      i,
      c,
      a,
      s = this._tables[0],
      u = this._tables[1],
      l = s[4],
      f = u[4],
      h = [],
      d = [];
    for (e = 0; e < 256; e++) d[(h[e] = e << 1 ^ 283 * (e >> 7)) ^ e] = e;
    for (t = n = 0; !l[t]; t ^= r || 1, n = d[n] || 1) for (i = (i = n ^ n << 1 ^ n << 2 ^ n << 3 ^ n << 4) >> 8 ^ 255 & i ^ 99, l[t] = i, f[i] = t, a = 16843009 * h[o = h[r = h[t]]] ^ 65537 * o ^ 257 * r ^ 16843008 * t, c = 257 * h[i] ^ 16843008 * i, e = 0; e < 4; e++) s[e][t] = c = c << 24 ^ c >>> 8, u[e][i] = a = a << 24 ^ a >>> 8;
    for (e = 0; e < 5; e++) s[e] = s[e].slice(0), u[e] = u[e].slice(0);
  },
  _crypt: function (e, t) {
    if (4 !== e.length) throw new se.exception.invalid("invalid aes block size");
    var n,
      r,
      o,
      i,
      c = this._key[t],
      a = e[0] ^ c[0],
      s = e[t ? 3 : 1] ^ c[1],
      u = e[2] ^ c[2],
      l = e[t ? 1 : 3] ^ c[3],
      f = c.length / 4 - 2,
      h = 4,
      d = [0, 0, 0, 0],
      p = this._tables[t],
      g = p[0],
      y = p[1],
      m = p[2],
      b = p[3],
      v = p[4];
    for (i = 0; i < f; i++) n = g[a >>> 24] ^ y[s >> 16 & 255] ^ m[u >> 8 & 255] ^ b[255 & l] ^ c[h], r = g[s >>> 24] ^ y[u >> 16 & 255] ^ m[l >> 8 & 255] ^ b[255 & a] ^ c[h + 1], o = g[u >>> 24] ^ y[l >> 16 & 255] ^ m[a >> 8 & 255] ^ b[255 & s] ^ c[h + 2], l = g[l >>> 24] ^ y[a >> 16 & 255] ^ m[s >> 8 & 255] ^ b[255 & u] ^ c[h + 3], h += 4, a = n, s = r, u = o;
    for (i = 0; i < 4; i++) d[t ? 3 & -i : i] = v[a >>> 24] << 24 ^ v[s >> 16 & 255] << 16 ^ v[u >> 8 & 255] << 8 ^ v[255 & l] ^ c[h++], n = a, a = s, s = u, u = l, l = n;
    return d;
  }
}, se.bitArray = {
  bitSlice: function (e, t, n) {
    return e = se.bitArray._shiftRight(e.slice(t / 32), 32 - (31 & t)).slice(1), void 0 === n ? e : se.bitArray.clamp(e, n - t);
  },
  extract: function (e, t, n) {
    var r = Math.floor(-t - n & 31);
    return (-32 & (t + n - 1 ^ t) ? e[t / 32 | 0] << 32 - r ^ e[t / 32 + 1 | 0] >>> r : e[t / 32 | 0] >>> r) & (1 << n) - 1;
  },
  concat: function (e, t) {
    if (0 === e.length || 0 === t.length) return e.concat(t);
    var n = e[e.length - 1],
      r = se.bitArray.getPartial(n);
    return 32 === r ? e.concat(t) : se.bitArray._shiftRight(t, r, 0 | n, e.slice(0, e.length - 1));
  },
  bitLength: function (e) {
    var t,
      n = e.length;
    return 0 === n ? 0 : (t = e[n - 1], 32 * (n - 1) + se.bitArray.getPartial(t));
  },
  clamp: function (e, t) {
    if (32 * e.length < t) return e;
    var n = (e = e.slice(0, Math.ceil(t / 32))).length;
    return t &= 31, n > 0 && t && (e[n - 1] = se.bitArray.partial(t, e[n - 1] & 2147483648 >> t - 1, 1)), e;
  },
  partial: function (e, t, n) {
    return 32 === e ? t : (n ? 0 | t : t << 32 - e) + 1099511627776 * e;
  },
  getPartial: function (e) {
    return Math.round(e / 1099511627776) || 32;
  },
  equal: function (e, t) {
    if (se.bitArray.bitLength(e) !== se.bitArray.bitLength(t)) return !1;
    var n,
      r = 0;
    for (n = 0; n < e.length; n++) r |= e[n] ^ t[n];
    return 0 === r;
  },
  _shiftRight: function (e, t, n, r) {
    var o, i, c;
    for (void 0 === r && (r = []); t >= 32; t -= 32) r.push(n), n = 0;
    if (0 === t) return r.concat(e);
    for (o = 0; o < e.length; o++) r.push(n | e[o] >>> t), n = e[o] << 32 - t;
    return i = e.length ? e[e.length - 1] : 0, c = se.bitArray.getPartial(i), r.push(se.bitArray.partial(t + c & 31, t + c > 32 ? n : r.pop(), 1)), r;
  },
  _xor4: function (e, t) {
    return [e[0] ^ t[0], e[1] ^ t[1], e[2] ^ t[2], e[3] ^ t[3]];
  },
  byteswapM: function (e) {
    var t, n;
    for (t = 0; t < e.length; ++t) n = e[t], e[t] = n >>> 24 | n >>> 8 & 65280 | (65280 & n) << 8 | n << 24;
    return e;
  }
}, se.codec.utf8String = {
  fromBits: function (e) {
    var t,
      n,
      r = "",
      o = se.bitArray.bitLength(e);
    for (t = 0; t < o / 8; t++) 0 == (3 & t) && (n = e[t / 4]), r += String.fromCharCode(n >>> 8 >>> 8 >>> 8), n <<= 8;
    return decodeURIComponent(escape(r));
  },
  toBits: function (e) {
    e = unescape(encodeURIComponent(e));
    var t,
      n = [],
      r = 0;
    for (t = 0; t < e.length; t++) r = r << 8 | e.charCodeAt(t), 3 == (3 & t) && (n.push(r), r = 0);
    return 3 & t && n.push(se.bitArray.partial(8 * (3 & t), r)), n;
  }
}, se.codec.base64 = {
  _chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  fromBits: function (e, t, n) {
    var r,
      o = "",
      i = 0,
      c = se.codec.base64._chars,
      a = 0,
      s = se.bitArray.bitLength(e);
    for (n && (c = c.substr(0, 62) + "-_"), r = 0; 6 * o.length < s;) o += c.charAt((a ^ e[r] >>> i) >>> 26), i < 6 ? (a = e[r] << 6 - i, i += 26, r++) : (a <<= 6, i -= 6);
    for (; 3 & o.length && !t;) o += "=";
    return o;
  },
  toBits: function (e, t) {
    e = e.replace(/\s|=/g, "");
    var n,
      r,
      o = [],
      i = 0,
      c = se.codec.base64._chars,
      a = 0;
    for (t && (c = c.substr(0, 62) + "-_"), n = 0; n < e.length; n++) {
      if ((r = c.indexOf(e.charAt(n))) < 0) throw new se.exception.invalid("this isn't base64!");
      i > 26 ? (i -= 26, o.push(a ^ r >>> i), a = r << 32 - i) : a ^= r << 32 - (i += 6);
    }
    return 56 & i && o.push(se.bitArray.partial(56 & i, a, 1)), o;
  }
}, se.codec.base64url = {
  fromBits: function (e) {
    return se.codec.base64.fromBits(e, 1, 1);
  },
  toBits: function (e) {
    return se.codec.base64.toBits(e, 1);
  }
}, se.mode.gcm = {
  name: "gcm",
  encrypt: function (e, t, n, r, o) {
    var i,
      c = t.slice(0),
      a = se.bitArray;
    return o = o || 128, r = r || [], i = se.mode.gcm._ctrMode(!0, e, c, r, n, o), a.concat(i.data, i.tag);
  },
  decrypt: function (e, t, n, r, o) {
    var i,
      c,
      a = t.slice(0),
      s = se.bitArray,
      u = s.bitLength(a);
    if (r = r || [], (o = o || 128) <= u ? (c = s.bitSlice(a, u - o), a = s.bitSlice(a, 0, u - o)) : (c = a, a = []), i = se.mode.gcm._ctrMode(!1, e, a, r, n, o), !s.equal(i.tag, c)) throw new se.exception.corrupt("gcm: tag doesn't match");
    return i.data;
  },
  _galoisMultiply: function (e, t) {
    var n,
      r,
      o,
      i,
      c,
      a = se.bitArray._xor4;
    for (o = [0, 0, 0, 0], i = t.slice(0), n = 0; n < 128; n++) {
      for (0 != (e[Math.floor(n / 32)] & 1 << 31 - n % 32) && (o = a(o, i)), c = 0 != (1 & i[3]), r = 3; r > 0; r--) i[r] = i[r] >>> 1 | (1 & i[r - 1]) << 31;
      i[0] = i[0] >>> 1, c && (i[0] = i[0] ^ 225 << 24);
    }
    return o;
  },
  _ghash: function (e, t, n) {
    var r,
      o,
      i = n.length;
    for (r = t.slice(0), o = 0; o < i; o += 4) r[0] ^= 4294967295 & n[o], r[1] ^= 4294967295 & n[o + 1], r[2] ^= 4294967295 & n[o + 2], r[3] ^= 4294967295 & n[o + 3], r = se.mode.gcm._galoisMultiply(r, e);
    return r;
  },
  _ctrMode: function (e, t, n, r, o, i) {
    var c,
      a,
      s,
      u,
      l,
      f,
      h,
      d,
      p,
      g,
      y,
      m,
      b = se.bitArray;
    for (p = n.length, g = b.bitLength(n), y = b.bitLength(r), m = b.bitLength(o), c = t.encrypt([0, 0, 0, 0]), 96 === m ? (a = o.slice(0), a = b.concat(a, [1])) : (a = se.mode.gcm._ghash(c, [0, 0, 0, 0], o), a = se.mode.gcm._ghash(c, a, [0, 0, Math.floor(m / 4294967296), 4294967295 & m])), s = se.mode.gcm._ghash(c, [0, 0, 0, 0], r), f = a.slice(0), h = s.slice(0), e || (h = se.mode.gcm._ghash(c, s, n)), l = 0; l < p; l += 4) f[3]++, u = t.encrypt(f), n[l] ^= u[0], n[l + 1] ^= u[1], n[l + 2] ^= u[2], n[l + 3] ^= u[3];
    return n = b.clamp(n, g), e && (h = se.mode.gcm._ghash(c, s, n)), d = [Math.floor(y / 4294967296), 4294967295 & y, Math.floor(g / 4294967296), 4294967295 & g], h = se.mode.gcm._ghash(c, h, d), u = t.encrypt(a), h[0] ^= u[0], h[1] ^= u[1], h[2] ^= u[2], h[3] ^= u[3], {
      tag: b.bitSlice(h, 0, i),
      data: n
    };
  }
}, function (e) {
  e[e.EXCEPTION = 0] = "EXCEPTION";
  e[e.NO_ENCRYPTION = 1] = "NO_ENCRYPTION";
  e[e.NO_STORAGE = 2] = "NO_STORAGE";
}(Z || (Z = {}));
class le {
  constructor(e) {
    this.cipher = new se.cipher.aes(ae(e));
  }
  encrypt(e, t) {
    t || (t = "sps");
    const n = se.codec.utf8String.toBits(t);
    return re(se.mode.gcm.encrypt(this.cipher, se.codec.utf8String.toBits(e), n, [], 256)) + ":" + re(n);
  }
  decrypt(e) {
    return se.codec.utf8String.fromBits(se.mode.gcm.decrypt(this.cipher, ae(e.split(":")[0]), ae(e.split(":")[1])));
  }
  hash(e) {
    return this.encrypt(e, "sps");
  }
}
function fe(e, t) {
  return he(e, new le(t));
}
function he(e, t) {
  return {
    getValue(n) {
      const r = t.hash(n),
        o = e.getValue(r);
      return null === o ? null : S(t.decrypt(o));
    },
    setValue(n, r) {
      const o = t.hash(n),
        i = t.encrypt(A(r));
      e.setValue(o, i);
    },
    deleteValue(n) {
      const r = t.hash(n);
      e.deleteValue(r);
    }
  };
}

export { le as GCMEncryption, O as addSerializableClass, W as cookieWritable, B as createChromeStorage, R as createCookieStorage, fe as createEncryptedStorage, he as createEncryptionStorage, P as createIndexedDBStorage, V as createLocalStorage, U as createNoopStorage, k as createSessionStorage, b as disableWarnings, H as localWritable, ue as noEncryptionBehavior, j as persist, X as persistBrowserLocal, J as persistBrowserSession, F as persistCookie, Q as sessionWritable, E as setSerialization, K as writable };

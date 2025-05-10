import Nr from "electron";
import fc from "events";
import Ot from "path";
import hc from "util";
import ks from "fs";
import eu from "crypto";
import tu from "assert";
import ru from "os";
var wt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Xv = {}, mc = {}, $n = { exports: {} }, Cs = {};
Object.defineProperty(Cs, "__esModule", { value: !0 });
const Yn = (e, t) => `${e.id}-${t}`;
class nu {
  constructor() {
    this.nextId = 0, this.storage = {}, this.owners = {}, this.electronIds = /* @__PURE__ */ new WeakMap();
  }
  // Register a new object and return its assigned ID. If the object is already
  // registered then the already assigned ID would be returned.
  add(t, r, n) {
    const s = this.saveToStorage(n), o = Yn(t, r);
    let c = this.owners[o];
    return c || (c = this.owners[o] = /* @__PURE__ */ new Map(), this.registerDeleteListener(t, r)), c.has(s) || (c.set(s, 0), this.storage[s].count++), c.set(s, c.get(s) + 1), s;
  }
  // Get an object according to its ID.
  get(t) {
    const r = this.storage[t];
    if (r != null)
      return r.object;
  }
  // Dereference an object according to its ID.
  // Note that an object may be double-freed (cleared when page is reloaded, and
  // then garbage collected in old page).
  remove(t, r, n) {
    const s = Yn(t, r), o = this.owners[s];
    if (o && o.has(n)) {
      const c = o.get(n) - 1;
      c <= 0 ? (o.delete(n), this.dereference(n)) : o.set(n, c);
    }
  }
  // Clear all references to objects refrenced by the WebContents.
  clear(t, r) {
    const n = Yn(t, r), s = this.owners[n];
    if (s) {
      for (const o of s.keys())
        this.dereference(o);
      delete this.owners[n];
    }
  }
  // Saves the object into storage and assigns an ID for it.
  saveToStorage(t) {
    let r = this.electronIds.get(t);
    return r || (r = ++this.nextId, this.storage[r] = {
      count: 0,
      object: t
    }, this.electronIds.set(t, r)), r;
  }
  // Dereference the object from store.
  dereference(t) {
    const r = this.storage[t];
    r != null && (r.count -= 1, r.count === 0 && (this.electronIds.delete(r.object), delete this.storage[t]));
  }
  // Clear the storage when renderer process is destroyed.
  registerDeleteListener(t, r) {
    const n = r.split("-")[0], s = (o, c) => {
      c && c.toString() === n && (t.removeListener("render-view-deleted", s), this.clear(t, r));
    };
    t.on("render-view-deleted", s);
  }
}
Cs.default = new nu();
var ot = {};
Object.defineProperty(ot, "__esModule", { value: !0 });
ot.deserialize = ot.serialize = ot.isSerializableObject = ot.isPromise = void 0;
const su = Nr;
function ou(e) {
  return e && e.then && e.then instanceof Function && e.constructor && e.constructor.reject && e.constructor.reject instanceof Function && e.constructor.resolve && e.constructor.resolve instanceof Function;
}
ot.isPromise = ou;
const au = [
  Boolean,
  Number,
  String,
  Date,
  Error,
  RegExp,
  ArrayBuffer
];
function Ds(e) {
  return e === null || ArrayBuffer.isView(e) || au.some((t) => e instanceof t);
}
ot.isSerializableObject = Ds;
const pc = function(e, t) {
  const n = Object.entries(e).map(([s, o]) => [s, t(o)]);
  return Object.fromEntries(n);
};
function iu(e) {
  const t = [], r = e.getScaleFactors();
  if (r.length === 1) {
    const n = r[0], s = e.getSize(n), o = e.toBitmap({ scaleFactor: n });
    t.push({ scaleFactor: n, size: s, buffer: o });
  } else
    for (const n of r) {
      const s = e.getSize(n), o = e.toDataURL({ scaleFactor: n });
      t.push({ scaleFactor: n, size: s, dataURL: o });
    }
  return { __ELECTRON_SERIALIZED_NativeImage__: !0, representations: t };
}
function cu(e) {
  const t = su.nativeImage.createEmpty();
  if (e.representations.length === 1) {
    const { buffer: r, size: n, scaleFactor: s } = e.representations[0], { width: o, height: c } = n;
    t.addRepresentation({ buffer: r, scaleFactor: s, width: o, height: c });
  } else
    for (const r of e.representations) {
      const { dataURL: n, size: s, scaleFactor: o } = r, { width: c, height: i } = s;
      t.addRepresentation({ dataURL: n, scaleFactor: o, width: c, height: i });
    }
  return t;
}
function us(e) {
  return e && e.constructor && e.constructor.name === "NativeImage" ? iu(e) : Array.isArray(e) ? e.map(us) : Ds(e) ? e : e instanceof Object ? pc(e, us) : e;
}
ot.serialize = us;
function ds(e) {
  return e && e.__ELECTRON_SERIALIZED_NativeImage__ ? cu(e) : Array.isArray(e) ? e.map(ds) : Ds(e) ? e : e instanceof Object ? pc(e, ds) : e;
}
ot.deserialize = ds;
var On = {};
Object.defineProperty(On, "__esModule", { value: !0 });
On.getElectronBinding = void 0;
const lu = (e) => process._linkedBinding ? process._linkedBinding("electron_common_" + e) : process.electronBinding ? process.electronBinding(e) : null;
On.getElectronBinding = lu;
$n.exports;
(function(e, t) {
  var r = wt && wt.__importDefault || function(O) {
    return O && O.__esModule ? O : { default: O };
  };
  Object.defineProperty(t, "__esModule", { value: !0 }), t.initialize = t.isInitialized = t.enable = t.isRemoteModuleEnabled = void 0;
  const n = fc, s = r(Cs), o = ot, c = Nr, i = On, { Promise: l } = wt, d = i.getElectronBinding("v8_util"), u = (() => {
    var O, I;
    const y = Number((I = (O = process.versions.electron) === null || O === void 0 ? void 0 : O.split(".")) === null || I === void 0 ? void 0 : I[0]);
    return Number.isNaN(y) || y < 14;
  })(), m = [
    "length",
    "name",
    "arguments",
    "caller",
    "prototype"
  ], S = /* @__PURE__ */ new Map(), _ = new FinalizationRegistry((O) => {
    const I = O.id[0] + "~" + O.id[1], y = S.get(I);
    if (y !== void 0 && y.deref() === void 0 && (S.delete(I), !O.webContents.isDestroyed()))
      try {
        O.webContents.sendToFrame(O.frameId, "REMOTE_RENDERER_RELEASE_CALLBACK", O.id[0], O.id[1]);
      } catch (h) {
        console.warn(`sendToFrame() failed: ${h}`);
      }
  });
  function b(O) {
    const I = O[0] + "~" + O[1], y = S.get(I);
    if (y !== void 0) {
      const h = y.deref();
      if (h !== void 0)
        return h;
    }
  }
  function v(O, I, y, h) {
    const E = new WeakRef(h), p = O[0] + "~" + O[1];
    return S.set(p, E), _.register(h, {
      id: O,
      webContents: I,
      frameId: y
    }), h;
  }
  const w = /* @__PURE__ */ new WeakMap(), $ = function(O) {
    let I = Object.getOwnPropertyNames(O);
    return typeof O == "function" && (I = I.filter((y) => !m.includes(y))), I.map((y) => {
      const h = Object.getOwnPropertyDescriptor(O, y);
      let E, p = !1;
      return h.get === void 0 && typeof O[y] == "function" ? E = "method" : ((h.set || h.writable) && (p = !0), E = "get"), { name: y, enumerable: h.enumerable, writable: p, type: E };
    });
  }, R = function(O) {
    const I = Object.getPrototypeOf(O);
    return I === null || I === Object.prototype ? null : {
      members: $(I),
      proto: R(I)
    };
  }, T = function(O, I, y, h = !1) {
    let E;
    switch (typeof y) {
      case "object":
        y instanceof Buffer ? E = "buffer" : y && y.constructor && y.constructor.name === "NativeImage" ? E = "nativeimage" : Array.isArray(y) ? E = "array" : y instanceof Error ? E = "error" : o.isSerializableObject(y) ? E = "value" : o.isPromise(y) ? E = "promise" : Object.prototype.hasOwnProperty.call(y, "callee") && y.length != null ? E = "array" : h && d.getHiddenValue(y, "simple") ? E = "value" : E = "object";
        break;
      case "function":
        E = "function";
        break;
      default:
        E = "value";
        break;
    }
    return E === "array" ? {
      type: E,
      members: y.map((p) => T(O, I, p, h))
    } : E === "nativeimage" ? { type: E, value: o.serialize(y) } : E === "object" || E === "function" ? {
      type: E,
      name: y.constructor ? y.constructor.name : "",
      // Reference the original value if it's an object, because when it's
      // passed to renderer we would assume the renderer keeps a reference of
      // it.
      id: s.default.add(O, I, y),
      members: $(y),
      proto: R(y)
    } : E === "buffer" ? { type: E, value: y } : E === "promise" ? (y.then(function() {
    }, function() {
    }), {
      type: E,
      then: T(O, I, function(p, a) {
        y.then(p, a);
      })
    }) : E === "error" ? {
      type: E,
      value: y,
      members: Object.keys(y).map((p) => ({
        name: p,
        value: T(O, I, y[p])
      }))
    } : {
      type: "value",
      value: y
    };
  }, A = function(O) {
    const I = new Error(O);
    throw I.code = "EBADRPC", I.errno = -72, I;
  }, C = (O, I) => {
    let h = `Attempting to call a function in a renderer window that has been closed or released.
Function provided here: ${w.get(I)}`;
    if (O instanceof n.EventEmitter) {
      const E = O.eventNames().filter((p) => O.listeners(p).includes(I));
      E.length > 0 && (h += `
Remote event names: ${E.join(", ")}`, E.forEach((p) => {
        O.removeListener(p, I);
      }));
    }
    console.warn(h);
  }, G = (O, I) => new Proxy(Object, {
    get(y, h, E) {
      return h === "name" ? I : Reflect.get(y, h, E);
    }
  }), q = function(O, I, y, h) {
    const E = function(p) {
      switch (p.type) {
        case "nativeimage":
          return o.deserialize(p.value);
        case "value":
          return p.value;
        case "remote-object":
          return s.default.get(p.id);
        case "array":
          return q(O, I, y, p.value);
        case "buffer":
          return Buffer.from(p.value.buffer, p.value.byteOffset, p.value.byteLength);
        case "promise":
          return l.resolve({
            then: E(p.then)
          });
        case "object": {
          const a = p.name !== "Object" ? /* @__PURE__ */ Object.create({
            constructor: G(Object, p.name)
          }) : {};
          for (const { name: f, value: N } of p.members)
            a[f] = E(N);
          return a;
        }
        case "function-with-return-value": {
          const a = E(p.value);
          return function() {
            return a;
          };
        }
        case "function": {
          const a = [y, p.id], f = b(a);
          if (f !== void 0)
            return f;
          const N = function(...D) {
            let M = !1;
            if (!O.isDestroyed())
              try {
                M = O.sendToFrame(I, "REMOTE_RENDERER_CALLBACK", y, p.id, T(O, y, D)) !== !1;
              } catch (Y) {
                console.warn(`sendToFrame() failed: ${Y}`);
              }
            M || C(this, N);
          };
          return w.set(N, p.location), Object.defineProperty(N, "length", { value: p.length }), v(a, O, I, N), N;
        }
        default:
          throw new TypeError(`Unknown type: ${p.type}`);
      }
    };
    return h.map(E);
  }, oe = function(O) {
    const I = O.getLastWebPreferences() || {};
    return I.enableRemoteModule != null ? !!I.enableRemoteModule : !1;
  }, K = /* @__PURE__ */ new WeakMap(), Q = function(O) {
    return u && !K.has(O) && K.set(O, oe(O)), K.get(O);
  };
  t.isRemoteModuleEnabled = Q;
  function x(O) {
    K.set(O, !0);
  }
  t.enable = x;
  const X = function(O, I) {
    c.ipcMain.on(O, (y, h, ...E) => {
      let p;
      if (!t.isRemoteModuleEnabled(y.sender)) {
        y.returnValue = {
          type: "exception",
          value: T(y.sender, h, new Error('@electron/remote is disabled for this WebContents. Call require("@electron/remote/main").enable(webContents) to enable it.'))
        };
        return;
      }
      try {
        p = I(y, h, ...E);
      } catch (a) {
        p = {
          type: "exception",
          value: T(y.sender, h, a)
        };
      }
      p !== void 0 && (y.returnValue = p);
    });
  }, Z = function(O, I, ...y) {
    const h = { sender: O, returnValue: void 0, defaultPrevented: !1 };
    return c.app.emit(I, h, O, ...y), O.emit(I, h, ...y), h;
  }, L = function(O, I, y) {
    y && console.warn(`WebContents (${O.id}): ${I}`, y);
  };
  let F = !1;
  function B() {
    return F;
  }
  t.isInitialized = B;
  function z() {
    if (F)
      throw new Error("@electron/remote has already been initialized");
    F = !0, X("REMOTE_BROWSER_WRONG_CONTEXT_ERROR", function(O, I, y, h) {
      const p = b([y, h]);
      p !== void 0 && C(O.sender, p);
    }), X("REMOTE_BROWSER_REQUIRE", function(O, I, y, h) {
      L(O.sender, `remote.require('${y}')`, h);
      const E = Z(O.sender, "remote-require", y);
      if (E.returnValue === void 0) {
        if (E.defaultPrevented)
          throw new Error(`Blocked remote.require('${y}')`);
        if (process.mainModule)
          E.returnValue = process.mainModule.require(y);
        else {
          let p = e;
          for (; p.parent; )
            p = p.parent;
          E.returnValue = p.require(y);
        }
      }
      return T(O.sender, I, E.returnValue);
    }), X("REMOTE_BROWSER_GET_BUILTIN", function(O, I, y, h) {
      L(O.sender, `remote.getBuiltin('${y}')`, h);
      const E = Z(O.sender, "remote-get-builtin", y);
      if (E.returnValue === void 0) {
        if (E.defaultPrevented)
          throw new Error(`Blocked remote.getBuiltin('${y}')`);
        E.returnValue = Nr[y];
      }
      return T(O.sender, I, E.returnValue);
    }), X("REMOTE_BROWSER_GET_GLOBAL", function(O, I, y, h) {
      L(O.sender, `remote.getGlobal('${y}')`, h);
      const E = Z(O.sender, "remote-get-global", y);
      if (E.returnValue === void 0) {
        if (E.defaultPrevented)
          throw new Error(`Blocked remote.getGlobal('${y}')`);
        E.returnValue = wt[y];
      }
      return T(O.sender, I, E.returnValue);
    }), X("REMOTE_BROWSER_GET_CURRENT_WINDOW", function(O, I, y) {
      L(O.sender, "remote.getCurrentWindow()", y);
      const h = Z(O.sender, "remote-get-current-window");
      if (h.returnValue === void 0) {
        if (h.defaultPrevented)
          throw new Error("Blocked remote.getCurrentWindow()");
        h.returnValue = O.sender.getOwnerBrowserWindow();
      }
      return T(O.sender, I, h.returnValue);
    }), X("REMOTE_BROWSER_GET_CURRENT_WEB_CONTENTS", function(O, I, y) {
      L(O.sender, "remote.getCurrentWebContents()", y);
      const h = Z(O.sender, "remote-get-current-web-contents");
      if (h.returnValue === void 0) {
        if (h.defaultPrevented)
          throw new Error("Blocked remote.getCurrentWebContents()");
        h.returnValue = O.sender;
      }
      return T(O.sender, I, h.returnValue);
    }), X("REMOTE_BROWSER_CONSTRUCTOR", function(O, I, y, h) {
      h = q(O.sender, O.frameId, I, h);
      const E = s.default.get(y);
      return E == null && A(`Cannot call constructor on missing remote object ${y}`), T(O.sender, I, new E(...h));
    }), X("REMOTE_BROWSER_FUNCTION_CALL", function(O, I, y, h) {
      h = q(O.sender, O.frameId, I, h);
      const E = s.default.get(y);
      E == null && A(`Cannot call function on missing remote object ${y}`);
      try {
        return T(O.sender, I, E(...h), !0);
      } catch (p) {
        const a = new Error(`Could not call remote function '${E.name || "anonymous"}'. Check that the function signature is correct. Underlying error: ${p}
` + (p instanceof Error ? `Underlying stack: ${p.stack}
` : ""));
        throw a.cause = p, a;
      }
    }), X("REMOTE_BROWSER_MEMBER_CONSTRUCTOR", function(O, I, y, h, E) {
      E = q(O.sender, O.frameId, I, E);
      const p = s.default.get(y);
      return p == null && A(`Cannot call constructor '${h}' on missing remote object ${y}`), T(O.sender, I, new p[h](...E));
    }), X("REMOTE_BROWSER_MEMBER_CALL", function(O, I, y, h, E) {
      E = q(O.sender, O.frameId, I, E);
      const p = s.default.get(y);
      p == null && A(`Cannot call method '${h}' on missing remote object ${y}`);
      try {
        return T(O.sender, I, p[h](...E), !0);
      } catch (a) {
        const f = new Error(`Could not call remote method '${h}'. Check that the method signature is correct. Underlying error: ${a}` + (a instanceof Error ? `Underlying stack: ${a.stack}
` : ""));
        throw f.cause = a, f;
      }
    }), X("REMOTE_BROWSER_MEMBER_SET", function(O, I, y, h, E) {
      E = q(O.sender, O.frameId, I, E);
      const p = s.default.get(y);
      return p == null && A(`Cannot set property '${h}' on missing remote object ${y}`), p[h] = E[0], null;
    }), X("REMOTE_BROWSER_MEMBER_GET", function(O, I, y, h) {
      const E = s.default.get(y);
      return E == null && A(`Cannot get property '${h}' on missing remote object ${y}`), T(O.sender, I, E[h]);
    }), X("REMOTE_BROWSER_DEREFERENCE", function(O, I, y) {
      s.default.remove(O.sender, I, y);
    }), X("REMOTE_BROWSER_CONTEXT_RELEASE", (O, I) => (s.default.clear(O.sender, I), null));
  }
  t.initialize = z;
})($n, $n.exports);
var uu = $n.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.enable = e.isInitialized = e.initialize = void 0;
  var t = uu;
  Object.defineProperty(e, "initialize", { enumerable: !0, get: function() {
    return t.initialize;
  } }), Object.defineProperty(e, "isInitialized", { enumerable: !0, get: function() {
    return t.isInitialized;
  } }), Object.defineProperty(e, "enable", { enumerable: !0, get: function() {
    return t.enable;
  } });
})(mc);
var du = mc, fs = { exports: {} }, fu = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
};
const At = fu, hu = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), mu = (e) => !e.some((t) => hu.has(t));
function Mr(e) {
  const t = e.split("."), r = [];
  for (let n = 0; n < t.length; n++) {
    let s = t[n];
    for (; s[s.length - 1] === "\\" && t[n + 1] !== void 0; )
      s = s.slice(0, -1) + ".", s += t[++n];
    r.push(s);
  }
  return mu(r) ? r : [];
}
var pu = {
  get(e, t, r) {
    if (!At(e) || typeof t != "string")
      return r === void 0 ? e : r;
    const n = Mr(t);
    if (n.length !== 0) {
      for (let s = 0; s < n.length; s++)
        if (e = e[n[s]], e == null) {
          if (s !== n.length - 1)
            return r;
          break;
        }
      return e === void 0 ? r : e;
    }
  },
  set(e, t, r) {
    if (!At(e) || typeof t != "string")
      return e;
    const n = e, s = Mr(t);
    for (let o = 0; o < s.length; o++) {
      const c = s[o];
      At(e[c]) || (e[c] = {}), o === s.length - 1 && (e[c] = r), e = e[c];
    }
    return n;
  },
  delete(e, t) {
    if (!At(e) || typeof t != "string")
      return !1;
    const r = Mr(t);
    for (let n = 0; n < r.length; n++) {
      const s = r[n];
      if (n === r.length - 1)
        return delete e[s], !0;
      if (e = e[s], !At(e))
        return !1;
    }
  },
  has(e, t) {
    if (!At(e) || typeof t != "string")
      return !1;
    const r = Mr(t);
    if (r.length === 0)
      return !1;
    for (let n = 0; n < r.length; n++)
      if (At(e)) {
        if (!(r[n] in e))
          return !1;
        e = e[r[n]];
      } else
        return !1;
    return !0;
  }
}, Ms = { exports: {} }, Ls = { exports: {} }, Vs = { exports: {} }, Fs = { exports: {} };
const $c = ks;
Fs.exports = (e) => new Promise((t) => {
  $c.access(e, (r) => {
    t(!r);
  });
});
Fs.exports.sync = (e) => {
  try {
    return $c.accessSync(e), !0;
  } catch {
    return !1;
  }
};
var $u = Fs.exports, zs = { exports: {} }, Us = { exports: {} };
const yc = (e, ...t) => new Promise((r) => {
  r(e(...t));
});
Us.exports = yc;
Us.exports.default = yc;
var yu = Us.exports;
const _u = yu, _c = (e) => {
  if (!((Number.isInteger(e) || e === 1 / 0) && e > 0))
    return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
  const t = [];
  let r = 0;
  const n = () => {
    r--, t.length > 0 && t.shift()();
  }, s = (i, l, ...d) => {
    r++;
    const u = _u(i, ...d);
    l(u), u.then(n, n);
  }, o = (i, l, ...d) => {
    r < e ? s(i, l, ...d) : t.push(s.bind(null, i, l, ...d));
  }, c = (i, ...l) => new Promise((d) => o(i, d, ...l));
  return Object.defineProperties(c, {
    activeCount: {
      get: () => r
    },
    pendingCount: {
      get: () => t.length
    },
    clearQueue: {
      value: () => {
        t.length = 0;
      }
    }
  }), c;
};
zs.exports = _c;
zs.exports.default = _c;
var gu = zs.exports;
const Ma = gu;
class gc extends Error {
  constructor(t) {
    super(), this.value = t;
  }
}
const vu = (e, t) => Promise.resolve(e).then(t), Eu = (e) => Promise.all(e).then((t) => t[1] === !0 && Promise.reject(new gc(t[0])));
var wu = (e, t, r) => {
  r = Object.assign({
    concurrency: 1 / 0,
    preserveOrder: !0
  }, r);
  const n = Ma(r.concurrency), s = [...e].map((c) => [c, n(vu, c, t)]), o = Ma(r.preserveOrder ? 1 : 1 / 0);
  return Promise.all(s.map((c) => o(Eu, c))).then(() => {
  }).catch((c) => c instanceof gc ? c.value : Promise.reject(c));
};
const vc = Ot, Ec = $u, bu = wu;
Vs.exports = (e, t) => (t = Object.assign({
  cwd: process.cwd()
}, t), bu(e, (r) => Ec(vc.resolve(t.cwd, r)), t));
Vs.exports.sync = (e, t) => {
  t = Object.assign({
    cwd: process.cwd()
  }, t);
  for (const r of e)
    if (Ec.sync(vc.resolve(t.cwd, r)))
      return r;
};
var Su = Vs.exports;
const bt = Ot, wc = Su;
Ls.exports = (e, t = {}) => {
  const r = bt.resolve(t.cwd || ""), { root: n } = bt.parse(r), s = [].concat(e);
  return new Promise((o) => {
    (function c(i) {
      wc(s, { cwd: i }).then((l) => {
        l ? o(bt.join(i, l)) : i === n ? o(null) : c(bt.dirname(i));
      });
    })(r);
  });
};
Ls.exports.sync = (e, t = {}) => {
  let r = bt.resolve(t.cwd || "");
  const { root: n } = bt.parse(r), s = [].concat(e);
  for (; ; ) {
    const o = wc.sync(s, { cwd: r });
    if (o)
      return bt.join(r, o);
    if (r === n)
      return null;
    r = bt.dirname(r);
  }
};
var Pu = Ls.exports;
const bc = Pu;
Ms.exports = async ({ cwd: e } = {}) => bc("package.json", { cwd: e });
Ms.exports.sync = ({ cwd: e } = {}) => bc.sync("package.json", { cwd: e });
var Ru = Ms.exports, qs = { exports: {} };
const Ee = Ot, Sc = ru, Et = Sc.homedir(), Ks = Sc.tmpdir(), { env: Yt } = process, Ou = (e) => {
  const t = Ee.join(Et, "Library");
  return {
    data: Ee.join(t, "Application Support", e),
    config: Ee.join(t, "Preferences", e),
    cache: Ee.join(t, "Caches", e),
    log: Ee.join(t, "Logs", e),
    temp: Ee.join(Ks, e)
  };
}, Nu = (e) => {
  const t = Yt.APPDATA || Ee.join(Et, "AppData", "Roaming"), r = Yt.LOCALAPPDATA || Ee.join(Et, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: Ee.join(r, e, "Data"),
    config: Ee.join(t, e, "Config"),
    cache: Ee.join(r, e, "Cache"),
    log: Ee.join(r, e, "Log"),
    temp: Ee.join(Ks, e)
  };
}, Tu = (e) => {
  const t = Ee.basename(Et);
  return {
    data: Ee.join(Yt.XDG_DATA_HOME || Ee.join(Et, ".local", "share"), e),
    config: Ee.join(Yt.XDG_CONFIG_HOME || Ee.join(Et, ".config"), e),
    cache: Ee.join(Yt.XDG_CACHE_HOME || Ee.join(Et, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: Ee.join(Yt.XDG_STATE_HOME || Ee.join(Et, ".local", "state"), e),
    temp: Ee.join(Ks, t, e)
  };
}, Pc = (e, t) => {
  if (typeof e != "string")
    throw new TypeError(`Expected string, got ${typeof e}`);
  return t = Object.assign({ suffix: "nodejs" }, t), t.suffix && (e += `-${t.suffix}`), process.platform === "darwin" ? Ou(e) : process.platform === "win32" ? Nu(e) : Tu(e);
};
qs.exports = Pc;
qs.exports.default = Pc;
var Iu = qs.exports, at = {}, ue = {};
Object.defineProperty(ue, "__esModule", { value: !0 });
ue.NOOP = ue.LIMIT_FILES_DESCRIPTORS = ue.LIMIT_BASENAME_LENGTH = ue.IS_USER_ROOT = ue.IS_POSIX = ue.DEFAULT_TIMEOUT_SYNC = ue.DEFAULT_TIMEOUT_ASYNC = ue.DEFAULT_WRITE_OPTIONS = ue.DEFAULT_READ_OPTIONS = ue.DEFAULT_FOLDER_MODE = ue.DEFAULT_FILE_MODE = ue.DEFAULT_ENCODING = void 0;
const ju = "utf8";
ue.DEFAULT_ENCODING = ju;
const Au = 438;
ue.DEFAULT_FILE_MODE = Au;
const ku = 511;
ue.DEFAULT_FOLDER_MODE = ku;
const Cu = {};
ue.DEFAULT_READ_OPTIONS = Cu;
const Du = {};
ue.DEFAULT_WRITE_OPTIONS = Du;
const Mu = 5e3;
ue.DEFAULT_TIMEOUT_ASYNC = Mu;
const Lu = 100;
ue.DEFAULT_TIMEOUT_SYNC = Lu;
const Vu = !!process.getuid;
ue.IS_POSIX = Vu;
const Fu = process.getuid ? !process.getuid() : !1;
ue.IS_USER_ROOT = Fu;
const zu = 128;
ue.LIMIT_BASENAME_LENGTH = zu;
const Uu = 1e4;
ue.LIMIT_FILES_DESCRIPTORS = Uu;
const qu = () => {
};
ue.NOOP = qu;
var Nn = {}, tr = {};
Object.defineProperty(tr, "__esModule", { value: !0 });
tr.attemptifySync = tr.attemptifyAsync = void 0;
const Rc = ue, Ku = (e, t = Rc.NOOP) => function() {
  return e.apply(void 0, arguments).catch(t);
};
tr.attemptifyAsync = Ku;
const Gu = (e, t = Rc.NOOP) => function() {
  try {
    return e.apply(void 0, arguments);
  } catch (r) {
    return t(r);
  }
};
tr.attemptifySync = Gu;
var Gs = {};
Object.defineProperty(Gs, "__esModule", { value: !0 });
const Bu = ue, Oc = {
  isChangeErrorOk: (e) => {
    const { code: t } = e;
    return t === "ENOSYS" || !Bu.IS_USER_ROOT && (t === "EINVAL" || t === "EPERM");
  },
  isRetriableError: (e) => {
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!Oc.isChangeErrorOk(e))
      throw e;
  }
};
Gs.default = Oc;
var rr = {}, Bs = {};
Object.defineProperty(Bs, "__esModule", { value: !0 });
const Hu = ue, $e = {
  interval: 25,
  intervalId: void 0,
  limit: Hu.LIMIT_FILES_DESCRIPTORS,
  queueActive: /* @__PURE__ */ new Set(),
  queueWaiting: /* @__PURE__ */ new Set(),
  init: () => {
    $e.intervalId || ($e.intervalId = setInterval($e.tick, $e.interval));
  },
  reset: () => {
    $e.intervalId && (clearInterval($e.intervalId), delete $e.intervalId);
  },
  add: (e) => {
    $e.queueWaiting.add(e), $e.queueActive.size < $e.limit / 2 ? $e.tick() : $e.init();
  },
  remove: (e) => {
    $e.queueWaiting.delete(e), $e.queueActive.delete(e);
  },
  schedule: () => new Promise((e) => {
    const t = () => $e.remove(r), r = () => e(t);
    $e.add(r);
  }),
  tick: () => {
    if (!($e.queueActive.size >= $e.limit)) {
      if (!$e.queueWaiting.size)
        return $e.reset();
      for (const e of $e.queueWaiting) {
        if ($e.queueActive.size >= $e.limit)
          break;
        $e.queueWaiting.delete(e), $e.queueActive.add(e), e();
      }
    }
  }
};
Bs.default = $e;
Object.defineProperty(rr, "__esModule", { value: !0 });
rr.retryifySync = rr.retryifyAsync = void 0;
const Wu = Bs, Ju = (e, t) => function(r) {
  return function n() {
    return Wu.default.schedule().then((s) => e.apply(void 0, arguments).then((o) => (s(), o), (o) => {
      if (s(), Date.now() >= r)
        throw o;
      if (t(o)) {
        const c = Math.round(100 + 400 * Math.random());
        return new Promise((l) => setTimeout(l, c)).then(() => n.apply(void 0, arguments));
      }
      throw o;
    }));
  };
};
rr.retryifyAsync = Ju;
const Xu = (e, t) => function(r) {
  return function n() {
    try {
      return e.apply(void 0, arguments);
    } catch (s) {
      if (Date.now() > r)
        throw s;
      if (t(s))
        return n.apply(void 0, arguments);
      throw s;
    }
  };
};
rr.retryifySync = Xu;
Object.defineProperty(Nn, "__esModule", { value: !0 });
const he = ks, ke = hc, Ce = tr, Re = Gs, Me = rr, Yu = {
  chmodAttempt: Ce.attemptifyAsync(ke.promisify(he.chmod), Re.default.onChangeError),
  chownAttempt: Ce.attemptifyAsync(ke.promisify(he.chown), Re.default.onChangeError),
  closeAttempt: Ce.attemptifyAsync(ke.promisify(he.close)),
  fsyncAttempt: Ce.attemptifyAsync(ke.promisify(he.fsync)),
  mkdirAttempt: Ce.attemptifyAsync(ke.promisify(he.mkdir)),
  realpathAttempt: Ce.attemptifyAsync(ke.promisify(he.realpath)),
  statAttempt: Ce.attemptifyAsync(ke.promisify(he.stat)),
  unlinkAttempt: Ce.attemptifyAsync(ke.promisify(he.unlink)),
  closeRetry: Me.retryifyAsync(ke.promisify(he.close), Re.default.isRetriableError),
  fsyncRetry: Me.retryifyAsync(ke.promisify(he.fsync), Re.default.isRetriableError),
  openRetry: Me.retryifyAsync(ke.promisify(he.open), Re.default.isRetriableError),
  readFileRetry: Me.retryifyAsync(ke.promisify(he.readFile), Re.default.isRetriableError),
  renameRetry: Me.retryifyAsync(ke.promisify(he.rename), Re.default.isRetriableError),
  statRetry: Me.retryifyAsync(ke.promisify(he.stat), Re.default.isRetriableError),
  writeRetry: Me.retryifyAsync(ke.promisify(he.write), Re.default.isRetriableError),
  chmodSyncAttempt: Ce.attemptifySync(he.chmodSync, Re.default.onChangeError),
  chownSyncAttempt: Ce.attemptifySync(he.chownSync, Re.default.onChangeError),
  closeSyncAttempt: Ce.attemptifySync(he.closeSync),
  mkdirSyncAttempt: Ce.attemptifySync(he.mkdirSync),
  realpathSyncAttempt: Ce.attemptifySync(he.realpathSync),
  statSyncAttempt: Ce.attemptifySync(he.statSync),
  unlinkSyncAttempt: Ce.attemptifySync(he.unlinkSync),
  closeSyncRetry: Me.retryifySync(he.closeSync, Re.default.isRetriableError),
  fsyncSyncRetry: Me.retryifySync(he.fsyncSync, Re.default.isRetriableError),
  openSyncRetry: Me.retryifySync(he.openSync, Re.default.isRetriableError),
  readFileSyncRetry: Me.retryifySync(he.readFileSync, Re.default.isRetriableError),
  renameSyncRetry: Me.retryifySync(he.renameSync, Re.default.isRetriableError),
  statSyncRetry: Me.retryifySync(he.statSync, Re.default.isRetriableError),
  writeSyncRetry: Me.retryifySync(he.writeSync, Re.default.isRetriableError)
};
Nn.default = Yu;
var Hs = {};
Object.defineProperty(Hs, "__esModule", { value: !0 });
const Qu = {
  isFunction: (e) => typeof e == "function",
  isString: (e) => typeof e == "string",
  isUndefined: (e) => typeof e > "u"
};
Hs.default = Qu;
var Ws = {};
Object.defineProperty(Ws, "__esModule", { value: !0 });
const Lr = {}, hs = {
  next: (e) => {
    const t = Lr[e];
    if (!t)
      return;
    t.shift();
    const r = t[0];
    r ? r(() => hs.next(e)) : delete Lr[e];
  },
  schedule: (e) => new Promise((t) => {
    let r = Lr[e];
    r || (r = Lr[e] = []), r.push(t), !(r.length > 1) && t(() => hs.next(e));
  })
};
Ws.default = hs;
var Js = {};
Object.defineProperty(Js, "__esModule", { value: !0 });
const Zu = Ot, La = ue, Va = Nn, qe = {
  store: {},
  create: (e) => {
    const t = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), r = Date.now().toString().slice(-10), n = "tmp-", s = `.${n}${r}${t}`;
    return `${e}${s}`;
  },
  get: (e, t, r = !0) => {
    const n = qe.truncate(t(e));
    return n in qe.store ? qe.get(e, t, r) : (qe.store[n] = r, [n, () => delete qe.store[n]]);
  },
  purge: (e) => {
    qe.store[e] && (delete qe.store[e], Va.default.unlinkAttempt(e));
  },
  purgeSync: (e) => {
    qe.store[e] && (delete qe.store[e], Va.default.unlinkSyncAttempt(e));
  },
  purgeSyncAll: () => {
    for (const e in qe.store)
      qe.purgeSync(e);
  },
  truncate: (e) => {
    const t = Zu.basename(e);
    if (t.length <= La.LIMIT_BASENAME_LENGTH)
      return e;
    const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!r)
      return e;
    const n = t.length - La.LIMIT_BASENAME_LENGTH;
    return `${e.slice(0, -t.length)}${r[1]}${r[2].slice(0, -n)}${r[3]}`;
  }
};
process.on("exit", qe.purgeSyncAll);
Js.default = qe;
Object.defineProperty(at, "__esModule", { value: !0 });
at.writeFileSync = at.writeFile = at.readFileSync = at.readFile = void 0;
const Nc = Ot, Te = ue, le = Nn, Ke = Hs, xu = Ws, St = Js;
function Tc(e, t = Te.DEFAULT_READ_OPTIONS) {
  var r;
  if (Ke.default.isString(t))
    return Tc(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : Te.DEFAULT_TIMEOUT_ASYNC);
  return le.default.readFileRetry(n)(e, t);
}
at.readFile = Tc;
function Ic(e, t = Te.DEFAULT_READ_OPTIONS) {
  var r;
  if (Ke.default.isString(t))
    return Ic(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : Te.DEFAULT_TIMEOUT_SYNC);
  return le.default.readFileSyncRetry(n)(e, t);
}
at.readFileSync = Ic;
const jc = (e, t, r, n) => {
  if (Ke.default.isFunction(r))
    return jc(e, t, Te.DEFAULT_WRITE_OPTIONS, r);
  const s = Ac(e, t, r);
  return n && s.then(n, n), s;
};
at.writeFile = jc;
const Ac = async (e, t, r = Te.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (Ke.default.isString(r))
    return Ac(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : Te.DEFAULT_TIMEOUT_ASYNC);
  let o = null, c = null, i = null, l = null, d = null;
  try {
    r.schedule && (o = await r.schedule(e)), c = await xu.default.schedule(e), e = await le.default.realpathAttempt(e) || e, [l, i] = St.default.get(e, r.tmpCreate || St.default.create, r.tmpPurge !== !1);
    const u = Te.IS_POSIX && Ke.default.isUndefined(r.chown), m = Ke.default.isUndefined(r.mode);
    if (u || m) {
      const _ = await le.default.statAttempt(e);
      _ && (r = { ...r }, u && (r.chown = { uid: _.uid, gid: _.gid }), m && (r.mode = _.mode));
    }
    const S = Nc.dirname(e);
    await le.default.mkdirAttempt(S, {
      mode: Te.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), d = await le.default.openRetry(s)(l, "w", r.mode || Te.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(l), Ke.default.isString(t) ? await le.default.writeRetry(s)(d, t, 0, r.encoding || Te.DEFAULT_ENCODING) : Ke.default.isUndefined(t) || await le.default.writeRetry(s)(d, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? await le.default.fsyncRetry(s)(d) : le.default.fsyncAttempt(d)), await le.default.closeRetry(s)(d), d = null, r.chown && await le.default.chownAttempt(l, r.chown.uid, r.chown.gid), r.mode && await le.default.chmodAttempt(l, r.mode);
    try {
      await le.default.renameRetry(s)(l, e);
    } catch (_) {
      if (_.code !== "ENAMETOOLONG")
        throw _;
      await le.default.renameRetry(s)(l, St.default.truncate(e));
    }
    i(), l = null;
  } finally {
    d && await le.default.closeAttempt(d), l && St.default.purge(l), o && o(), c && c();
  }
}, kc = (e, t, r = Te.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (Ke.default.isString(r))
    return kc(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : Te.DEFAULT_TIMEOUT_SYNC);
  let o = null, c = null, i = null;
  try {
    e = le.default.realpathSyncAttempt(e) || e, [c, o] = St.default.get(e, r.tmpCreate || St.default.create, r.tmpPurge !== !1);
    const l = Te.IS_POSIX && Ke.default.isUndefined(r.chown), d = Ke.default.isUndefined(r.mode);
    if (l || d) {
      const m = le.default.statSyncAttempt(e);
      m && (r = { ...r }, l && (r.chown = { uid: m.uid, gid: m.gid }), d && (r.mode = m.mode));
    }
    const u = Nc.dirname(e);
    le.default.mkdirSyncAttempt(u, {
      mode: Te.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), i = le.default.openSyncRetry(s)(c, "w", r.mode || Te.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(c), Ke.default.isString(t) ? le.default.writeSyncRetry(s)(i, t, 0, r.encoding || Te.DEFAULT_ENCODING) : Ke.default.isUndefined(t) || le.default.writeSyncRetry(s)(i, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? le.default.fsyncSyncRetry(s)(i) : le.default.fsyncAttempt(i)), le.default.closeSyncRetry(s)(i), i = null, r.chown && le.default.chownSyncAttempt(c, r.chown.uid, r.chown.gid), r.mode && le.default.chmodSyncAttempt(c, r.mode);
    try {
      le.default.renameSyncRetry(s)(c, e);
    } catch (m) {
      if (m.code !== "ENAMETOOLONG")
        throw m;
      le.default.renameSyncRetry(s)(c, St.default.truncate(e));
    }
    o(), c = null;
  } finally {
    i && le.default.closeSyncAttempt(i), c && St.default.purge(c);
  }
};
at.writeFileSync = kc;
var ms = { exports: {} }, Cc = {}, lt = {}, kt = {}, jr = {}, Qn = {}, Tr = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(R) {
      if (super(), !e.IDENTIFIER.test(R))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = R;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return !1;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  e.Name = r;
  class n extends t {
    constructor(R) {
      super(), this._items = typeof R == "string" ? [R] : R;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const R = this._items[0];
      return R === "" || R === '""';
    }
    get str() {
      var R;
      return (R = this._str) !== null && R !== void 0 ? R : this._str = this._items.reduce((T, A) => `${T}${A}`, "");
    }
    get names() {
      var R;
      return (R = this._names) !== null && R !== void 0 ? R : this._names = this._items.reduce((T, A) => (A instanceof r && (T[A.str] = (T[A.str] || 0) + 1), T), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function s($, ...R) {
    const T = [$[0]];
    let A = 0;
    for (; A < R.length; )
      i(T, R[A]), T.push($[++A]);
    return new n(T);
  }
  e._ = s;
  const o = new n("+");
  function c($, ...R) {
    const T = [_($[0])];
    let A = 0;
    for (; A < R.length; )
      T.push(o), i(T, R[A]), T.push(o, _($[++A]));
    return l(T), new n(T);
  }
  e.str = c;
  function i($, R) {
    R instanceof n ? $.push(...R._items) : R instanceof r ? $.push(R) : $.push(m(R));
  }
  e.addCodeArg = i;
  function l($) {
    let R = 1;
    for (; R < $.length - 1; ) {
      if ($[R] === o) {
        const T = d($[R - 1], $[R + 1]);
        if (T !== void 0) {
          $.splice(R - 1, 3, T);
          continue;
        }
        $[R++] = "+";
      }
      R++;
    }
  }
  function d($, R) {
    if (R === '""')
      return $;
    if ($ === '""')
      return R;
    if (typeof $ == "string")
      return R instanceof r || $[$.length - 1] !== '"' ? void 0 : typeof R != "string" ? `${$.slice(0, -1)}${R}"` : R[0] === '"' ? $.slice(0, -1) + R.slice(1) : void 0;
    if (typeof R == "string" && R[0] === '"' && !($ instanceof r))
      return `"${$}${R.slice(1)}`;
  }
  function u($, R) {
    return R.emptyStr() ? $ : $.emptyStr() ? R : c`${$}${R}`;
  }
  e.strConcat = u;
  function m($) {
    return typeof $ == "number" || typeof $ == "boolean" || $ === null ? $ : _(Array.isArray($) ? $.join(",") : $);
  }
  function S($) {
    return new n(_($));
  }
  e.stringify = S;
  function _($) {
    return JSON.stringify($).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = _;
  function b($) {
    return typeof $ == "string" && e.IDENTIFIER.test($) ? new n(`.${$}`) : s`[${$}]`;
  }
  e.getProperty = b;
  function v($) {
    if (typeof $ == "string" && e.IDENTIFIER.test($))
      return new n(`${$}`);
    throw new Error(`CodeGen: invalid export name: ${$}, use explicit $id name mapping`);
  }
  e.getEsmExportName = v;
  function w($) {
    return new n($.toString());
  }
  e.regexpCode = w;
})(Tr);
var Zn = {}, Fa;
function za() {
  return Fa || (Fa = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
    const t = Tr;
    class r extends Error {
      constructor(d) {
        super(`CodeGen: "code" for ${d} not defined`), this.value = d.value;
      }
    }
    var n;
    (function(l) {
      l[l.Started = 0] = "Started", l[l.Completed = 1] = "Completed";
    })(n || (e.UsedValueState = n = {})), e.varKinds = {
      const: new t.Name("const"),
      let: new t.Name("let"),
      var: new t.Name("var")
    };
    class s {
      constructor({ prefixes: d, parent: u } = {}) {
        this._names = {}, this._prefixes = d, this._parent = u;
      }
      toName(d) {
        return d instanceof t.Name ? d : this.name(d);
      }
      name(d) {
        return new t.Name(this._newName(d));
      }
      _newName(d) {
        const u = this._names[d] || this._nameGroup(d);
        return `${d}${u.index++}`;
      }
      _nameGroup(d) {
        var u, m;
        if (!((m = (u = this._parent) === null || u === void 0 ? void 0 : u._prefixes) === null || m === void 0) && m.has(d) || this._prefixes && !this._prefixes.has(d))
          throw new Error(`CodeGen: prefix "${d}" is not allowed in this scope`);
        return this._names[d] = { prefix: d, index: 0 };
      }
    }
    e.Scope = s;
    class o extends t.Name {
      constructor(d, u) {
        super(u), this.prefix = d;
      }
      setValue(d, { property: u, itemIndex: m }) {
        this.value = d, this.scopePath = (0, t._)`.${new t.Name(u)}[${m}]`;
      }
    }
    e.ValueScopeName = o;
    const c = (0, t._)`\n`;
    class i extends s {
      constructor(d) {
        super(d), this._values = {}, this._scope = d.scope, this.opts = { ...d, _n: d.lines ? c : t.nil };
      }
      get() {
        return this._scope;
      }
      name(d) {
        return new o(d, this._newName(d));
      }
      value(d, u) {
        var m;
        if (u.ref === void 0)
          throw new Error("CodeGen: ref must be passed in value");
        const S = this.toName(d), { prefix: _ } = S, b = (m = u.key) !== null && m !== void 0 ? m : u.ref;
        let v = this._values[_];
        if (v) {
          const R = v.get(b);
          if (R)
            return R;
        } else
          v = this._values[_] = /* @__PURE__ */ new Map();
        v.set(b, S);
        const w = this._scope[_] || (this._scope[_] = []), $ = w.length;
        return w[$] = u.ref, S.setValue(u, { property: _, itemIndex: $ }), S;
      }
      getValue(d, u) {
        const m = this._values[d];
        if (m)
          return m.get(u);
      }
      scopeRefs(d, u = this._values) {
        return this._reduceValues(u, (m) => {
          if (m.scopePath === void 0)
            throw new Error(`CodeGen: name "${m}" has no value`);
          return (0, t._)`${d}${m.scopePath}`;
        });
      }
      scopeCode(d = this._values, u, m) {
        return this._reduceValues(d, (S) => {
          if (S.value === void 0)
            throw new Error(`CodeGen: name "${S}" has no value`);
          return S.value.code;
        }, u, m);
      }
      _reduceValues(d, u, m = {}, S) {
        let _ = t.nil;
        for (const b in d) {
          const v = d[b];
          if (!v)
            continue;
          const w = m[b] = m[b] || /* @__PURE__ */ new Map();
          v.forEach(($) => {
            if (w.has($))
              return;
            w.set($, n.Started);
            let R = u($);
            if (R) {
              const T = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
              _ = (0, t._)`${_}${T} ${$} = ${R};${this.opts._n}`;
            } else if (R = S == null ? void 0 : S($))
              _ = (0, t._)`${_}${R}${this.opts._n}`;
            else
              throw new r($);
            w.set($, n.Completed);
          });
        }
        return _;
      }
    }
    e.ValueScope = i;
  }(Zn)), Zn;
}
var Ua;
function ae() {
  return Ua || (Ua = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
    const t = Tr, r = za();
    var n = Tr;
    Object.defineProperty(e, "_", { enumerable: !0, get: function() {
      return n._;
    } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
      return n.str;
    } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
      return n.strConcat;
    } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
      return n.nil;
    } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
      return n.getProperty;
    } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
      return n.stringify;
    } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
      return n.regexpCode;
    } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
      return n.Name;
    } });
    var s = za();
    Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
      return s.Scope;
    } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
      return s.ValueScope;
    } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
      return s.ValueScopeName;
    } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
      return s.varKinds;
    } }), e.operators = {
      GT: new t._Code(">"),
      GTE: new t._Code(">="),
      LT: new t._Code("<"),
      LTE: new t._Code("<="),
      EQ: new t._Code("==="),
      NEQ: new t._Code("!=="),
      NOT: new t._Code("!"),
      OR: new t._Code("||"),
      AND: new t._Code("&&"),
      ADD: new t._Code("+")
    };
    class o {
      optimizeNodes() {
        return this;
      }
      optimizeNames(a, f) {
        return this;
      }
    }
    class c extends o {
      constructor(a, f, N) {
        super(), this.varKind = a, this.name = f, this.rhs = N;
      }
      render({ es5: a, _n: f }) {
        const N = a ? r.varKinds.var : this.varKind, D = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
        return `${N} ${this.name}${D};` + f;
      }
      optimizeNames(a, f) {
        if (a[this.name.str])
          return this.rhs && (this.rhs = L(this.rhs, a, f)), this;
      }
      get names() {
        return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
      }
    }
    class i extends o {
      constructor(a, f, N) {
        super(), this.lhs = a, this.rhs = f, this.sideEffects = N;
      }
      render({ _n: a }) {
        return `${this.lhs} = ${this.rhs};` + a;
      }
      optimizeNames(a, f) {
        if (!(this.lhs instanceof t.Name && !a[this.lhs.str] && !this.sideEffects))
          return this.rhs = L(this.rhs, a, f), this;
      }
      get names() {
        const a = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
        return Z(a, this.rhs);
      }
    }
    class l extends i {
      constructor(a, f, N, D) {
        super(a, N, D), this.op = f;
      }
      render({ _n: a }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + a;
      }
    }
    class d extends o {
      constructor(a) {
        super(), this.label = a, this.names = {};
      }
      render({ _n: a }) {
        return `${this.label}:` + a;
      }
    }
    class u extends o {
      constructor(a) {
        super(), this.label = a, this.names = {};
      }
      render({ _n: a }) {
        return `break${this.label ? ` ${this.label}` : ""};` + a;
      }
    }
    class m extends o {
      constructor(a) {
        super(), this.error = a;
      }
      render({ _n: a }) {
        return `throw ${this.error};` + a;
      }
      get names() {
        return this.error.names;
      }
    }
    class S extends o {
      constructor(a) {
        super(), this.code = a;
      }
      render({ _n: a }) {
        return `${this.code};` + a;
      }
      optimizeNodes() {
        return `${this.code}` ? this : void 0;
      }
      optimizeNames(a, f) {
        return this.code = L(this.code, a, f), this;
      }
      get names() {
        return this.code instanceof t._CodeOrName ? this.code.names : {};
      }
    }
    class _ extends o {
      constructor(a = []) {
        super(), this.nodes = a;
      }
      render(a) {
        return this.nodes.reduce((f, N) => f + N.render(a), "");
      }
      optimizeNodes() {
        const { nodes: a } = this;
        let f = a.length;
        for (; f--; ) {
          const N = a[f].optimizeNodes();
          Array.isArray(N) ? a.splice(f, 1, ...N) : N ? a[f] = N : a.splice(f, 1);
        }
        return a.length > 0 ? this : void 0;
      }
      optimizeNames(a, f) {
        const { nodes: N } = this;
        let D = N.length;
        for (; D--; ) {
          const M = N[D];
          M.optimizeNames(a, f) || (F(a, M.names), N.splice(D, 1));
        }
        return N.length > 0 ? this : void 0;
      }
      get names() {
        return this.nodes.reduce((a, f) => X(a, f.names), {});
      }
    }
    class b extends _ {
      render(a) {
        return "{" + a._n + super.render(a) + "}" + a._n;
      }
    }
    class v extends _ {
    }
    class w extends b {
    }
    w.kind = "else";
    class $ extends b {
      constructor(a, f) {
        super(f), this.condition = a;
      }
      render(a) {
        let f = `if(${this.condition})` + super.render(a);
        return this.else && (f += "else " + this.else.render(a)), f;
      }
      optimizeNodes() {
        super.optimizeNodes();
        const a = this.condition;
        if (a === !0)
          return this.nodes;
        let f = this.else;
        if (f) {
          const N = f.optimizeNodes();
          f = this.else = Array.isArray(N) ? new w(N) : N;
        }
        if (f)
          return a === !1 ? f instanceof $ ? f : f.nodes : this.nodes.length ? this : new $(B(a), f instanceof $ ? [f] : f.nodes);
        if (!(a === !1 || !this.nodes.length))
          return this;
      }
      optimizeNames(a, f) {
        var N;
        if (this.else = (N = this.else) === null || N === void 0 ? void 0 : N.optimizeNames(a, f), !!(super.optimizeNames(a, f) || this.else))
          return this.condition = L(this.condition, a, f), this;
      }
      get names() {
        const a = super.names;
        return Z(a, this.condition), this.else && X(a, this.else.names), a;
      }
    }
    $.kind = "if";
    class R extends b {
    }
    R.kind = "for";
    class T extends R {
      constructor(a) {
        super(), this.iteration = a;
      }
      render(a) {
        return `for(${this.iteration})` + super.render(a);
      }
      optimizeNames(a, f) {
        if (super.optimizeNames(a, f))
          return this.iteration = L(this.iteration, a, f), this;
      }
      get names() {
        return X(super.names, this.iteration.names);
      }
    }
    class A extends R {
      constructor(a, f, N, D) {
        super(), this.varKind = a, this.name = f, this.from = N, this.to = D;
      }
      render(a) {
        const f = a.es5 ? r.varKinds.var : this.varKind, { name: N, from: D, to: M } = this;
        return `for(${f} ${N}=${D}; ${N}<${M}; ${N}++)` + super.render(a);
      }
      get names() {
        const a = Z(super.names, this.from);
        return Z(a, this.to);
      }
    }
    class C extends R {
      constructor(a, f, N, D) {
        super(), this.loop = a, this.varKind = f, this.name = N, this.iterable = D;
      }
      render(a) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(a);
      }
      optimizeNames(a, f) {
        if (super.optimizeNames(a, f))
          return this.iterable = L(this.iterable, a, f), this;
      }
      get names() {
        return X(super.names, this.iterable.names);
      }
    }
    class G extends b {
      constructor(a, f, N) {
        super(), this.name = a, this.args = f, this.async = N;
      }
      render(a) {
        return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(a);
      }
    }
    G.kind = "func";
    class q extends _ {
      render(a) {
        return "return " + super.render(a);
      }
    }
    q.kind = "return";
    class oe extends b {
      render(a) {
        let f = "try" + super.render(a);
        return this.catch && (f += this.catch.render(a)), this.finally && (f += this.finally.render(a)), f;
      }
      optimizeNodes() {
        var a, f;
        return super.optimizeNodes(), (a = this.catch) === null || a === void 0 || a.optimizeNodes(), (f = this.finally) === null || f === void 0 || f.optimizeNodes(), this;
      }
      optimizeNames(a, f) {
        var N, D;
        return super.optimizeNames(a, f), (N = this.catch) === null || N === void 0 || N.optimizeNames(a, f), (D = this.finally) === null || D === void 0 || D.optimizeNames(a, f), this;
      }
      get names() {
        const a = super.names;
        return this.catch && X(a, this.catch.names), this.finally && X(a, this.finally.names), a;
      }
    }
    class K extends b {
      constructor(a) {
        super(), this.error = a;
      }
      render(a) {
        return `catch(${this.error})` + super.render(a);
      }
    }
    K.kind = "catch";
    class Q extends b {
      render(a) {
        return "finally" + super.render(a);
      }
    }
    Q.kind = "finally";
    class x {
      constructor(a, f = {}) {
        this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...f, _n: f.lines ? `
` : "" }, this._extScope = a, this._scope = new r.Scope({ parent: a }), this._nodes = [new v()];
      }
      toString() {
        return this._root.render(this.opts);
      }
      // returns unique name in the internal scope
      name(a) {
        return this._scope.name(a);
      }
      // reserves unique name in the external scope
      scopeName(a) {
        return this._extScope.name(a);
      }
      // reserves unique name in the external scope and assigns value to it
      scopeValue(a, f) {
        const N = this._extScope.value(a, f);
        return (this._values[N.prefix] || (this._values[N.prefix] = /* @__PURE__ */ new Set())).add(N), N;
      }
      getScopeValue(a, f) {
        return this._extScope.getValue(a, f);
      }
      // return code that assigns values in the external scope to the names that are used internally
      // (same names that were returned by gen.scopeName or gen.scopeValue)
      scopeRefs(a) {
        return this._extScope.scopeRefs(a, this._values);
      }
      scopeCode() {
        return this._extScope.scopeCode(this._values);
      }
      _def(a, f, N, D) {
        const M = this._scope.toName(f);
        return N !== void 0 && D && (this._constants[M.str] = N), this._leafNode(new c(a, M, N)), M;
      }
      // `const` declaration (`var` in es5 mode)
      const(a, f, N) {
        return this._def(r.varKinds.const, a, f, N);
      }
      // `let` declaration with optional assignment (`var` in es5 mode)
      let(a, f, N) {
        return this._def(r.varKinds.let, a, f, N);
      }
      // `var` declaration with optional assignment
      var(a, f, N) {
        return this._def(r.varKinds.var, a, f, N);
      }
      // assignment code
      assign(a, f, N) {
        return this._leafNode(new i(a, f, N));
      }
      // `+=` code
      add(a, f) {
        return this._leafNode(new l(a, e.operators.ADD, f));
      }
      // appends passed SafeExpr to code or executes Block
      code(a) {
        return typeof a == "function" ? a() : a !== t.nil && this._leafNode(new S(a)), this;
      }
      // returns code for object literal for the passed argument list of key-value pairs
      object(...a) {
        const f = ["{"];
        for (const [N, D] of a)
          f.length > 1 && f.push(","), f.push(N), (N !== D || this.opts.es5) && (f.push(":"), (0, t.addCodeArg)(f, D));
        return f.push("}"), new t._Code(f);
      }
      // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
      if(a, f, N) {
        if (this._blockNode(new $(a)), f && N)
          this.code(f).else().code(N).endIf();
        else if (f)
          this.code(f).endIf();
        else if (N)
          throw new Error('CodeGen: "else" body without "then" body');
        return this;
      }
      // `else if` clause - invalid without `if` or after `else` clauses
      elseIf(a) {
        return this._elseNode(new $(a));
      }
      // `else` clause - only valid after `if` or `else if` clauses
      else() {
        return this._elseNode(new w());
      }
      // end `if` statement (needed if gen.if was used only with condition)
      endIf() {
        return this._endBlockNode($, w);
      }
      _for(a, f) {
        return this._blockNode(a), f && this.code(f).endFor(), this;
      }
      // a generic `for` clause (or statement if `forBody` is passed)
      for(a, f) {
        return this._for(new T(a), f);
      }
      // `for` statement for a range of values
      forRange(a, f, N, D, M = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
        const Y = this._scope.toName(a);
        return this._for(new A(M, Y, f, N), () => D(Y));
      }
      // `for-of` statement (in es5 mode replace with a normal for loop)
      forOf(a, f, N, D = r.varKinds.const) {
        const M = this._scope.toName(a);
        if (this.opts.es5) {
          const Y = f instanceof t.Name ? f : this.var("_arr", f);
          return this.forRange("_i", 0, (0, t._)`${Y}.length`, (H) => {
            this.var(M, (0, t._)`${Y}[${H}]`), N(M);
          });
        }
        return this._for(new C("of", D, M, f), () => N(M));
      }
      // `for-in` statement.
      // With option `ownProperties` replaced with a `for-of` loop for object keys
      forIn(a, f, N, D = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
        if (this.opts.ownProperties)
          return this.forOf(a, (0, t._)`Object.keys(${f})`, N);
        const M = this._scope.toName(a);
        return this._for(new C("in", D, M, f), () => N(M));
      }
      // end `for` loop
      endFor() {
        return this._endBlockNode(R);
      }
      // `label` statement
      label(a) {
        return this._leafNode(new d(a));
      }
      // `break` statement
      break(a) {
        return this._leafNode(new u(a));
      }
      // `return` statement
      return(a) {
        const f = new q();
        if (this._blockNode(f), this.code(a), f.nodes.length !== 1)
          throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(q);
      }
      // `try` statement
      try(a, f, N) {
        if (!f && !N)
          throw new Error('CodeGen: "try" without "catch" and "finally"');
        const D = new oe();
        if (this._blockNode(D), this.code(a), f) {
          const M = this.name("e");
          this._currNode = D.catch = new K(M), f(M);
        }
        return N && (this._currNode = D.finally = new Q(), this.code(N)), this._endBlockNode(K, Q);
      }
      // `throw` statement
      throw(a) {
        return this._leafNode(new m(a));
      }
      // start self-balancing block
      block(a, f) {
        return this._blockStarts.push(this._nodes.length), a && this.code(a).endBlock(f), this;
      }
      // end the current self-balancing block
      endBlock(a) {
        const f = this._blockStarts.pop();
        if (f === void 0)
          throw new Error("CodeGen: not in self-balancing block");
        const N = this._nodes.length - f;
        if (N < 0 || a !== void 0 && N !== a)
          throw new Error(`CodeGen: wrong number of nodes: ${N} vs ${a} expected`);
        return this._nodes.length = f, this;
      }
      // `function` heading (or definition if funcBody is passed)
      func(a, f = t.nil, N, D) {
        return this._blockNode(new G(a, f, N)), D && this.code(D).endFunc(), this;
      }
      // end function definition
      endFunc() {
        return this._endBlockNode(G);
      }
      optimize(a = 1) {
        for (; a-- > 0; )
          this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
      }
      _leafNode(a) {
        return this._currNode.nodes.push(a), this;
      }
      _blockNode(a) {
        this._currNode.nodes.push(a), this._nodes.push(a);
      }
      _endBlockNode(a, f) {
        const N = this._currNode;
        if (N instanceof a || f && N instanceof f)
          return this._nodes.pop(), this;
        throw new Error(`CodeGen: not in block "${f ? `${a.kind}/${f.kind}` : a.kind}"`);
      }
      _elseNode(a) {
        const f = this._currNode;
        if (!(f instanceof $))
          throw new Error('CodeGen: "else" without "if"');
        return this._currNode = f.else = a, this;
      }
      get _root() {
        return this._nodes[0];
      }
      get _currNode() {
        const a = this._nodes;
        return a[a.length - 1];
      }
      set _currNode(a) {
        const f = this._nodes;
        f[f.length - 1] = a;
      }
    }
    e.CodeGen = x;
    function X(p, a) {
      for (const f in a)
        p[f] = (p[f] || 0) + (a[f] || 0);
      return p;
    }
    function Z(p, a) {
      return a instanceof t._CodeOrName ? X(p, a.names) : p;
    }
    function L(p, a, f) {
      if (p instanceof t.Name)
        return N(p);
      if (!D(p))
        return p;
      return new t._Code(p._items.reduce((M, Y) => (Y instanceof t.Name && (Y = N(Y)), Y instanceof t._Code ? M.push(...Y._items) : M.push(Y), M), []));
      function N(M) {
        const Y = f[M.str];
        return Y === void 0 || a[M.str] !== 1 ? M : (delete a[M.str], Y);
      }
      function D(M) {
        return M instanceof t._Code && M._items.some((Y) => Y instanceof t.Name && a[Y.str] === 1 && f[Y.str] !== void 0);
      }
    }
    function F(p, a) {
      for (const f in a)
        p[f] = (p[f] || 0) - (a[f] || 0);
    }
    function B(p) {
      return typeof p == "boolean" || typeof p == "number" || p === null ? !p : (0, t._)`!${E(p)}`;
    }
    e.not = B;
    const z = h(e.operators.AND);
    function O(...p) {
      return p.reduce(z);
    }
    e.and = O;
    const I = h(e.operators.OR);
    function y(...p) {
      return p.reduce(I);
    }
    e.or = y;
    function h(p) {
      return (a, f) => a === t.nil ? f : f === t.nil ? a : (0, t._)`${E(a)} ${p} ${E(f)}`;
    }
    function E(p) {
      return p instanceof t.Name ? p : (0, t._)`(${p})`;
    }
  }(Qn)), Qn;
}
var W = {};
Object.defineProperty(W, "__esModule", { value: !0 });
W.checkStrictMode = W.getErrorPath = W.Type = W.useFunc = W.setEvaluated = W.evaluatedPropsToName = W.mergeEvaluated = W.eachItem = W.unescapeJsonPointer = W.escapeJsonPointer = W.escapeFragment = W.unescapeFragment = W.schemaRefOrVal = W.schemaHasRulesButRef = W.schemaHasRules = W.checkUnknownRules = W.alwaysValidSchema = W.toHash = void 0;
const me = ae(), ed = Tr;
function td(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
W.toHash = td;
function rd(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Dc(e, t), !Mc(t, e.self.RULES.all));
}
W.alwaysValidSchema = rd;
function Dc(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const o in t)
    s[o] || Fc(e, `unknown keyword: "${o}"`);
}
W.checkUnknownRules = Dc;
function Mc(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
W.schemaHasRules = Mc;
function nd(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
W.schemaHasRulesButRef = nd;
function sd({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, me._)`${r}`;
  }
  return (0, me._)`${e}${t}${(0, me.getProperty)(n)}`;
}
W.schemaRefOrVal = sd;
function od(e) {
  return Lc(decodeURIComponent(e));
}
W.unescapeFragment = od;
function ad(e) {
  return encodeURIComponent(Xs(e));
}
W.escapeFragment = ad;
function Xs(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
W.escapeJsonPointer = Xs;
function Lc(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
W.unescapeJsonPointer = Lc;
function id(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
W.eachItem = id;
function qa({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, o, c, i) => {
    const l = c === void 0 ? o : c instanceof me.Name ? (o instanceof me.Name ? e(s, o, c) : t(s, o, c), c) : o instanceof me.Name ? (t(s, c, o), o) : r(o, c);
    return i === me.Name && !(l instanceof me.Name) ? n(s, l) : l;
  };
}
W.mergeEvaluated = {
  props: qa({
    mergeNames: (e, t, r) => e.if((0, me._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, me._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, me._)`${r} || {}`).code((0, me._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, me._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, me._)`${r} || {}`), Ys(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: Vc
  }),
  items: qa({
    mergeNames: (e, t, r) => e.if((0, me._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, me._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, me._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, me._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Vc(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, me._)`{}`);
  return t !== void 0 && Ys(e, r, t), r;
}
W.evaluatedPropsToName = Vc;
function Ys(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, me._)`${t}${(0, me.getProperty)(n)}`, !0));
}
W.setEvaluated = Ys;
const Ka = {};
function cd(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: Ka[t.code] || (Ka[t.code] = new ed._Code(t.code))
  });
}
W.useFunc = cd;
var ps;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(ps || (W.Type = ps = {}));
function ld(e, t, r) {
  if (e instanceof me.Name) {
    const n = t === ps.Num;
    return r ? n ? (0, me._)`"[" + ${e} + "]"` : (0, me._)`"['" + ${e} + "']"` : n ? (0, me._)`"/" + ${e}` : (0, me._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, me.getProperty)(e).toString() : "/" + Xs(e);
}
W.getErrorPath = ld;
function Fc(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
W.checkStrictMode = Fc;
var ct = {};
Object.defineProperty(ct, "__esModule", { value: !0 });
const Ae = ae(), ud = {
  // validation function arguments
  data: new Ae.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new Ae.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new Ae.Name("instancePath"),
  parentData: new Ae.Name("parentData"),
  parentDataProperty: new Ae.Name("parentDataProperty"),
  rootData: new Ae.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new Ae.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new Ae.Name("vErrors"),
  // null or array of validation errors
  errors: new Ae.Name("errors"),
  // counter of validation errors
  this: new Ae.Name("this"),
  // "globals"
  self: new Ae.Name("self"),
  scope: new Ae.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new Ae.Name("json"),
  jsonPos: new Ae.Name("jsonPos"),
  jsonLen: new Ae.Name("jsonLen"),
  jsonPart: new Ae.Name("jsonPart")
};
ct.default = ud;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = ae(), r = W, n = ct;
  e.keywordError = {
    message: ({ keyword: w }) => (0, t.str)`must pass "${w}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: w, schemaType: $ }) => $ ? (0, t.str)`"${w}" keyword must be ${$} ($data)` : (0, t.str)`"${w}" keyword is invalid ($data)`
  };
  function s(w, $ = e.keywordError, R, T) {
    const { it: A } = w, { gen: C, compositeRule: G, allErrors: q } = A, oe = m(w, $, R);
    T ?? (G || q) ? l(C, oe) : d(A, (0, t._)`[${oe}]`);
  }
  e.reportError = s;
  function o(w, $ = e.keywordError, R) {
    const { it: T } = w, { gen: A, compositeRule: C, allErrors: G } = T, q = m(w, $, R);
    l(A, q), C || G || d(T, n.default.vErrors);
  }
  e.reportExtraError = o;
  function c(w, $) {
    w.assign(n.default.errors, $), w.if((0, t._)`${n.default.vErrors} !== null`, () => w.if($, () => w.assign((0, t._)`${n.default.vErrors}.length`, $), () => w.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = c;
  function i({ gen: w, keyword: $, schemaValue: R, data: T, errsCount: A, it: C }) {
    if (A === void 0)
      throw new Error("ajv implementation error");
    const G = w.name("err");
    w.forRange("i", A, n.default.errors, (q) => {
      w.const(G, (0, t._)`${n.default.vErrors}[${q}]`), w.if((0, t._)`${G}.instancePath === undefined`, () => w.assign((0, t._)`${G}.instancePath`, (0, t.strConcat)(n.default.instancePath, C.errorPath))), w.assign((0, t._)`${G}.schemaPath`, (0, t.str)`${C.errSchemaPath}/${$}`), C.opts.verbose && (w.assign((0, t._)`${G}.schema`, R), w.assign((0, t._)`${G}.data`, T));
    });
  }
  e.extendErrors = i;
  function l(w, $) {
    const R = w.const("err", $);
    w.if((0, t._)`${n.default.vErrors} === null`, () => w.assign(n.default.vErrors, (0, t._)`[${R}]`), (0, t._)`${n.default.vErrors}.push(${R})`), w.code((0, t._)`${n.default.errors}++`);
  }
  function d(w, $) {
    const { gen: R, validateName: T, schemaEnv: A } = w;
    A.$async ? R.throw((0, t._)`new ${w.ValidationError}(${$})`) : (R.assign((0, t._)`${T}.errors`, $), R.return(!1));
  }
  const u = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function m(w, $, R) {
    const { createErrors: T } = w.it;
    return T === !1 ? (0, t._)`{}` : S(w, $, R);
  }
  function S(w, $, R = {}) {
    const { gen: T, it: A } = w, C = [
      _(A, R),
      b(w, R)
    ];
    return v(w, $, C), T.object(...C);
  }
  function _({ errorPath: w }, { instancePath: $ }) {
    const R = $ ? (0, t.str)`${w}${(0, r.getErrorPath)($, r.Type.Str)}` : w;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, R)];
  }
  function b({ keyword: w, it: { errSchemaPath: $ } }, { schemaPath: R, parentSchema: T }) {
    let A = T ? $ : (0, t.str)`${$}/${w}`;
    return R && (A = (0, t.str)`${A}${(0, r.getErrorPath)(R, r.Type.Str)}`), [u.schemaPath, A];
  }
  function v(w, { params: $, message: R }, T) {
    const { keyword: A, data: C, schemaValue: G, it: q } = w, { opts: oe, propertyName: K, topSchemaRef: Q, schemaPath: x } = q;
    T.push([u.keyword, A], [u.params, typeof $ == "function" ? $(w) : $ || (0, t._)`{}`]), oe.messages && T.push([u.message, typeof R == "function" ? R(w) : R]), oe.verbose && T.push([u.schema, G], [u.parentSchema, (0, t._)`${Q}${x}`], [n.default.data, C]), K && T.push([u.propertyName, K]);
  }
})(jr);
var Ga;
function dd() {
  if (Ga) return kt;
  Ga = 1, Object.defineProperty(kt, "__esModule", { value: !0 }), kt.boolOrEmptySchema = kt.topBoolOrEmptySchema = void 0;
  const e = jr, t = ae(), r = ct, n = {
    message: "boolean schema is false"
  };
  function s(i) {
    const { gen: l, schema: d, validateName: u } = i;
    d === !1 ? c(i, !1) : typeof d == "object" && d.$async === !0 ? l.return(r.default.data) : (l.assign((0, t._)`${u}.errors`, null), l.return(!0));
  }
  kt.topBoolOrEmptySchema = s;
  function o(i, l) {
    const { gen: d, schema: u } = i;
    u === !1 ? (d.var(l, !1), c(i)) : d.var(l, !0);
  }
  kt.boolOrEmptySchema = o;
  function c(i, l) {
    const { gen: d, data: u } = i, m = {
      gen: d,
      keyword: "false schema",
      data: u,
      schema: !1,
      schemaCode: !1,
      schemaValue: !1,
      params: {},
      it: i
    };
    (0, e.reportError)(m, n, void 0, l);
  }
  return kt;
}
var Se = {}, Ut = {};
Object.defineProperty(Ut, "__esModule", { value: !0 });
Ut.getRules = Ut.isJSONType = void 0;
const fd = ["string", "number", "integer", "boolean", "null", "object", "array"], hd = new Set(fd);
function md(e) {
  return typeof e == "string" && hd.has(e);
}
Ut.isJSONType = md;
function pd() {
  const e = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...e, integer: !0, boolean: !0, null: !0 },
    rules: [{ rules: [] }, e.number, e.string, e.array, e.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
Ut.getRules = pd;
var ut = {}, Ba;
function zc() {
  if (Ba) return ut;
  Ba = 1, Object.defineProperty(ut, "__esModule", { value: !0 }), ut.shouldUseRule = ut.shouldUseGroup = ut.schemaHasRulesForType = void 0;
  function e({ schema: n, self: s }, o) {
    const c = s.RULES.types[o];
    return c && c !== !0 && t(n, c);
  }
  ut.schemaHasRulesForType = e;
  function t(n, s) {
    return s.rules.some((o) => r(n, o));
  }
  ut.shouldUseGroup = t;
  function r(n, s) {
    var o;
    return n[s.keyword] !== void 0 || ((o = s.definition.implements) === null || o === void 0 ? void 0 : o.some((c) => n[c] !== void 0));
  }
  return ut.shouldUseRule = r, ut;
}
Object.defineProperty(Se, "__esModule", { value: !0 });
Se.reportTypeError = Se.checkDataTypes = Se.checkDataType = Se.coerceAndCheckDataType = Se.getJSONTypes = Se.getSchemaTypes = Se.DataType = void 0;
const $d = Ut, yd = zc(), _d = jr, ee = ae(), Uc = W;
var Qt;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(Qt || (Se.DataType = Qt = {}));
function gd(e) {
  const t = qc(e.type);
  if (t.includes("null")) {
    if (e.nullable === !1)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!t.length && e.nullable !== void 0)
      throw new Error('"nullable" cannot be used without "type"');
    e.nullable === !0 && t.push("null");
  }
  return t;
}
Se.getSchemaTypes = gd;
function qc(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every($d.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
Se.getJSONTypes = qc;
function vd(e, t) {
  const { gen: r, data: n, opts: s } = e, o = Ed(t, s.coerceTypes), c = t.length > 0 && !(o.length === 0 && t.length === 1 && (0, yd.schemaHasRulesForType)(e, t[0]));
  if (c) {
    const i = Qs(t, n, s.strictNumbers, Qt.Wrong);
    r.if(i, () => {
      o.length ? wd(e, t, o) : Zs(e);
    });
  }
  return c;
}
Se.coerceAndCheckDataType = vd;
const Kc = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function Ed(e, t) {
  return t ? e.filter((r) => Kc.has(r) || t === "array" && r === "array") : [];
}
function wd(e, t, r) {
  const { gen: n, data: s, opts: o } = e, c = n.let("dataType", (0, ee._)`typeof ${s}`), i = n.let("coerced", (0, ee._)`undefined`);
  o.coerceTypes === "array" && n.if((0, ee._)`${c} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, ee._)`${s}[0]`).assign(c, (0, ee._)`typeof ${s}`).if(Qs(t, s, o.strictNumbers), () => n.assign(i, s))), n.if((0, ee._)`${i} !== undefined`);
  for (const d of r)
    (Kc.has(d) || d === "array" && o.coerceTypes === "array") && l(d);
  n.else(), Zs(e), n.endIf(), n.if((0, ee._)`${i} !== undefined`, () => {
    n.assign(s, i), bd(e, i);
  });
  function l(d) {
    switch (d) {
      case "string":
        n.elseIf((0, ee._)`${c} == "number" || ${c} == "boolean"`).assign(i, (0, ee._)`"" + ${s}`).elseIf((0, ee._)`${s} === null`).assign(i, (0, ee._)`""`);
        return;
      case "number":
        n.elseIf((0, ee._)`${c} == "boolean" || ${s} === null
              || (${c} == "string" && ${s} && ${s} == +${s})`).assign(i, (0, ee._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, ee._)`${c} === "boolean" || ${s} === null
              || (${c} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(i, (0, ee._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, ee._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(i, !1).elseIf((0, ee._)`${s} === "true" || ${s} === 1`).assign(i, !0);
        return;
      case "null":
        n.elseIf((0, ee._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(i, null);
        return;
      case "array":
        n.elseIf((0, ee._)`${c} === "string" || ${c} === "number"
              || ${c} === "boolean" || ${s} === null`).assign(i, (0, ee._)`[${s}]`);
    }
  }
}
function bd({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, ee._)`${t} !== undefined`, () => e.assign((0, ee._)`${t}[${r}]`, n));
}
function $s(e, t, r, n = Qt.Correct) {
  const s = n === Qt.Correct ? ee.operators.EQ : ee.operators.NEQ;
  let o;
  switch (e) {
    case "null":
      return (0, ee._)`${t} ${s} null`;
    case "array":
      o = (0, ee._)`Array.isArray(${t})`;
      break;
    case "object":
      o = (0, ee._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      o = c((0, ee._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      o = c();
      break;
    default:
      return (0, ee._)`typeof ${t} ${s} ${e}`;
  }
  return n === Qt.Correct ? o : (0, ee.not)(o);
  function c(i = ee.nil) {
    return (0, ee.and)((0, ee._)`typeof ${t} == "number"`, i, r ? (0, ee._)`isFinite(${t})` : ee.nil);
  }
}
Se.checkDataType = $s;
function Qs(e, t, r, n) {
  if (e.length === 1)
    return $s(e[0], t, r, n);
  let s;
  const o = (0, Uc.toHash)(e);
  if (o.array && o.object) {
    const c = (0, ee._)`typeof ${t} != "object"`;
    s = o.null ? c : (0, ee._)`!${t} || ${c}`, delete o.null, delete o.array, delete o.object;
  } else
    s = ee.nil;
  o.number && delete o.integer;
  for (const c in o)
    s = (0, ee.and)(s, $s(c, t, r, n));
  return s;
}
Se.checkDataTypes = Qs;
const Sd = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, ee._)`{type: ${e}}` : (0, ee._)`{type: ${t}}`
};
function Zs(e) {
  const t = Pd(e);
  (0, _d.reportError)(t, Sd);
}
Se.reportTypeError = Zs;
function Pd(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, Uc.schemaRefOrVal)(e, n, "type");
  return {
    gen: t,
    keyword: "type",
    data: r,
    schema: n.type,
    schemaCode: s,
    schemaValue: s,
    parentSchema: n,
    params: {},
    it: e
  };
}
var fr = {}, Ha;
function Rd() {
  if (Ha) return fr;
  Ha = 1, Object.defineProperty(fr, "__esModule", { value: !0 }), fr.assignDefaults = void 0;
  const e = ae(), t = W;
  function r(s, o) {
    const { properties: c, items: i } = s.schema;
    if (o === "object" && c)
      for (const l in c)
        n(s, l, c[l].default);
    else o === "array" && Array.isArray(i) && i.forEach((l, d) => n(s, d, l.default));
  }
  fr.assignDefaults = r;
  function n(s, o, c) {
    const { gen: i, compositeRule: l, data: d, opts: u } = s;
    if (c === void 0)
      return;
    const m = (0, e._)`${d}${(0, e.getProperty)(o)}`;
    if (l) {
      (0, t.checkStrictMode)(s, `default is ignored for: ${m}`);
      return;
    }
    let S = (0, e._)`${m} === undefined`;
    u.useDefaults === "empty" && (S = (0, e._)`${S} || ${m} === null || ${m} === ""`), i.if(S, (0, e._)`${m} = ${(0, e.stringify)(c)}`);
  }
  return fr;
}
var We = {}, ne = {};
Object.defineProperty(ne, "__esModule", { value: !0 });
ne.validateUnion = ne.validateArray = ne.usePattern = ne.callValidateCode = ne.schemaProperties = ne.allSchemaProperties = ne.noPropertyInData = ne.propertyInData = ne.isOwnProperty = ne.hasPropFunc = ne.reportMissingProp = ne.checkMissingProp = ne.checkReportMissingProp = void 0;
const _e = ae(), xs = W, yt = ct, Od = W;
function Nd(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(to(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, _e._)`${t}` }, !0), e.error();
  });
}
ne.checkReportMissingProp = Nd;
function Td({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, _e.or)(...n.map((o) => (0, _e.and)(to(e, t, o, r.ownProperties), (0, _e._)`${s} = ${o}`)));
}
ne.checkMissingProp = Td;
function Id(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
ne.reportMissingProp = Id;
function Gc(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, _e._)`Object.prototype.hasOwnProperty`
  });
}
ne.hasPropFunc = Gc;
function eo(e, t, r) {
  return (0, _e._)`${Gc(e)}.call(${t}, ${r})`;
}
ne.isOwnProperty = eo;
function jd(e, t, r, n) {
  const s = (0, _e._)`${t}${(0, _e.getProperty)(r)} !== undefined`;
  return n ? (0, _e._)`${s} && ${eo(e, t, r)}` : s;
}
ne.propertyInData = jd;
function to(e, t, r, n) {
  const s = (0, _e._)`${t}${(0, _e.getProperty)(r)} === undefined`;
  return n ? (0, _e.or)(s, (0, _e.not)(eo(e, t, r))) : s;
}
ne.noPropertyInData = to;
function Bc(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
ne.allSchemaProperties = Bc;
function Ad(e, t) {
  return Bc(t).filter((r) => !(0, xs.alwaysValidSchema)(e, t[r]));
}
ne.schemaProperties = Ad;
function kd({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: o }, it: c }, i, l, d) {
  const u = d ? (0, _e._)`${e}, ${t}, ${n}${s}` : t, m = [
    [yt.default.instancePath, (0, _e.strConcat)(yt.default.instancePath, o)],
    [yt.default.parentData, c.parentData],
    [yt.default.parentDataProperty, c.parentDataProperty],
    [yt.default.rootData, yt.default.rootData]
  ];
  c.opts.dynamicRef && m.push([yt.default.dynamicAnchors, yt.default.dynamicAnchors]);
  const S = (0, _e._)`${u}, ${r.object(...m)}`;
  return l !== _e.nil ? (0, _e._)`${i}.call(${l}, ${S})` : (0, _e._)`${i}(${S})`;
}
ne.callValidateCode = kd;
const Cd = (0, _e._)`new RegExp`;
function Dd({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, o = s(r, n);
  return e.scopeValue("pattern", {
    key: o.toString(),
    ref: o,
    code: (0, _e._)`${s.code === "new RegExp" ? Cd : (0, Od.useFunc)(e, s)}(${r}, ${n})`
  });
}
ne.usePattern = Dd;
function Md(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, o = t.name("valid");
  if (s.allErrors) {
    const i = t.let("valid", !0);
    return c(() => t.assign(i, !1)), i;
  }
  return t.var(o, !0), c(() => t.break()), o;
  function c(i) {
    const l = t.const("len", (0, _e._)`${r}.length`);
    t.forRange("i", 0, l, (d) => {
      e.subschema({
        keyword: n,
        dataProp: d,
        dataPropType: xs.Type.Num
      }, o), t.if((0, _e.not)(o), i);
    });
  }
}
ne.validateArray = Md;
function Ld(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((l) => (0, xs.alwaysValidSchema)(s, l)) && !s.opts.unevaluated)
    return;
  const c = t.let("valid", !1), i = t.name("_valid");
  t.block(() => r.forEach((l, d) => {
    const u = e.subschema({
      keyword: n,
      schemaProp: d,
      compositeRule: !0
    }, i);
    t.assign(c, (0, _e._)`${c} || ${i}`), e.mergeValidEvaluated(u, i) || t.if((0, _e.not)(c));
  })), e.result(c, () => e.reset(), () => e.error(!0));
}
ne.validateUnion = Ld;
var Wa;
function Vd() {
  if (Wa) return We;
  Wa = 1, Object.defineProperty(We, "__esModule", { value: !0 }), We.validateKeywordUsage = We.validSchemaType = We.funcKeywordCode = We.macroKeywordCode = void 0;
  const e = ae(), t = ct, r = ne, n = jr;
  function s(S, _) {
    const { gen: b, keyword: v, schema: w, parentSchema: $, it: R } = S, T = _.macro.call(R.self, w, $, R), A = d(b, v, T);
    R.opts.validateSchema !== !1 && R.self.validateSchema(T, !0);
    const C = b.name("valid");
    S.subschema({
      schema: T,
      schemaPath: e.nil,
      errSchemaPath: `${R.errSchemaPath}/${v}`,
      topSchemaRef: A,
      compositeRule: !0
    }, C), S.pass(C, () => S.error(!0));
  }
  We.macroKeywordCode = s;
  function o(S, _) {
    var b;
    const { gen: v, keyword: w, schema: $, parentSchema: R, $data: T, it: A } = S;
    l(A, _);
    const C = !T && _.compile ? _.compile.call(A.self, $, R, A) : _.validate, G = d(v, w, C), q = v.let("valid");
    S.block$data(q, oe), S.ok((b = _.valid) !== null && b !== void 0 ? b : q);
    function oe() {
      if (_.errors === !1)
        x(), _.modifying && c(S), X(() => S.error());
      else {
        const Z = _.async ? K() : Q();
        _.modifying && c(S), X(() => i(S, Z));
      }
    }
    function K() {
      const Z = v.let("ruleErrs", null);
      return v.try(() => x((0, e._)`await `), (L) => v.assign(q, !1).if((0, e._)`${L} instanceof ${A.ValidationError}`, () => v.assign(Z, (0, e._)`${L}.errors`), () => v.throw(L))), Z;
    }
    function Q() {
      const Z = (0, e._)`${G}.errors`;
      return v.assign(Z, null), x(e.nil), Z;
    }
    function x(Z = _.async ? (0, e._)`await ` : e.nil) {
      const L = A.opts.passContext ? t.default.this : t.default.self, F = !("compile" in _ && !T || _.schema === !1);
      v.assign(q, (0, e._)`${Z}${(0, r.callValidateCode)(S, G, L, F)}`, _.modifying);
    }
    function X(Z) {
      var L;
      v.if((0, e.not)((L = _.valid) !== null && L !== void 0 ? L : q), Z);
    }
  }
  We.funcKeywordCode = o;
  function c(S) {
    const { gen: _, data: b, it: v } = S;
    _.if(v.parentData, () => _.assign(b, (0, e._)`${v.parentData}[${v.parentDataProperty}]`));
  }
  function i(S, _) {
    const { gen: b } = S;
    b.if((0, e._)`Array.isArray(${_})`, () => {
      b.assign(t.default.vErrors, (0, e._)`${t.default.vErrors} === null ? ${_} : ${t.default.vErrors}.concat(${_})`).assign(t.default.errors, (0, e._)`${t.default.vErrors}.length`), (0, n.extendErrors)(S);
    }, () => S.error());
  }
  function l({ schemaEnv: S }, _) {
    if (_.async && !S.$async)
      throw new Error("async keyword in sync schema");
  }
  function d(S, _, b) {
    if (b === void 0)
      throw new Error(`keyword "${_}" failed to compile`);
    return S.scopeValue("keyword", typeof b == "function" ? { ref: b } : { ref: b, code: (0, e.stringify)(b) });
  }
  function u(S, _, b = !1) {
    return !_.length || _.some((v) => v === "array" ? Array.isArray(S) : v === "object" ? S && typeof S == "object" && !Array.isArray(S) : typeof S == v || b && typeof S > "u");
  }
  We.validSchemaType = u;
  function m({ schema: S, opts: _, self: b, errSchemaPath: v }, w, $) {
    if (Array.isArray(w.keyword) ? !w.keyword.includes($) : w.keyword !== $)
      throw new Error("ajv implementation error");
    const R = w.dependencies;
    if (R != null && R.some((T) => !Object.prototype.hasOwnProperty.call(S, T)))
      throw new Error(`parent schema must have dependencies of ${$}: ${R.join(",")}`);
    if (w.validateSchema && !w.validateSchema(S[$])) {
      const A = `keyword "${$}" value is invalid at path "${v}": ` + b.errorsText(w.validateSchema.errors);
      if (_.validateSchema === "log")
        b.logger.error(A);
      else
        throw new Error(A);
    }
  }
  return We.validateKeywordUsage = m, We;
}
var dt = {}, Ja;
function Fd() {
  if (Ja) return dt;
  Ja = 1, Object.defineProperty(dt, "__esModule", { value: !0 }), dt.extendSubschemaMode = dt.extendSubschemaData = dt.getSubschema = void 0;
  const e = ae(), t = W;
  function r(o, { keyword: c, schemaProp: i, schema: l, schemaPath: d, errSchemaPath: u, topSchemaRef: m }) {
    if (c !== void 0 && l !== void 0)
      throw new Error('both "keyword" and "schema" passed, only one allowed');
    if (c !== void 0) {
      const S = o.schema[c];
      return i === void 0 ? {
        schema: S,
        schemaPath: (0, e._)`${o.schemaPath}${(0, e.getProperty)(c)}`,
        errSchemaPath: `${o.errSchemaPath}/${c}`
      } : {
        schema: S[i],
        schemaPath: (0, e._)`${o.schemaPath}${(0, e.getProperty)(c)}${(0, e.getProperty)(i)}`,
        errSchemaPath: `${o.errSchemaPath}/${c}/${(0, t.escapeFragment)(i)}`
      };
    }
    if (l !== void 0) {
      if (d === void 0 || u === void 0 || m === void 0)
        throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
      return {
        schema: l,
        schemaPath: d,
        topSchemaRef: m,
        errSchemaPath: u
      };
    }
    throw new Error('either "keyword" or "schema" must be passed');
  }
  dt.getSubschema = r;
  function n(o, c, { dataProp: i, dataPropType: l, data: d, dataTypes: u, propertyName: m }) {
    if (d !== void 0 && i !== void 0)
      throw new Error('both "data" and "dataProp" passed, only one allowed');
    const { gen: S } = c;
    if (i !== void 0) {
      const { errorPath: b, dataPathArr: v, opts: w } = c, $ = S.let("data", (0, e._)`${c.data}${(0, e.getProperty)(i)}`, !0);
      _($), o.errorPath = (0, e.str)`${b}${(0, t.getErrorPath)(i, l, w.jsPropertySyntax)}`, o.parentDataProperty = (0, e._)`${i}`, o.dataPathArr = [...v, o.parentDataProperty];
    }
    if (d !== void 0) {
      const b = d instanceof e.Name ? d : S.let("data", d, !0);
      _(b), m !== void 0 && (o.propertyName = m);
    }
    u && (o.dataTypes = u);
    function _(b) {
      o.data = b, o.dataLevel = c.dataLevel + 1, o.dataTypes = [], c.definedProperties = /* @__PURE__ */ new Set(), o.parentData = c.data, o.dataNames = [...c.dataNames, b];
    }
  }
  dt.extendSubschemaData = n;
  function s(o, { jtdDiscriminator: c, jtdMetadata: i, compositeRule: l, createErrors: d, allErrors: u }) {
    l !== void 0 && (o.compositeRule = l), d !== void 0 && (o.createErrors = d), u !== void 0 && (o.allErrors = u), o.jtdDiscriminator = c, o.jtdMetadata = i;
  }
  return dt.extendSubschemaMode = s, dt;
}
var Ie = {}, Tn = function e(t, r) {
  if (t === r) return !0;
  if (t && r && typeof t == "object" && typeof r == "object") {
    if (t.constructor !== r.constructor) return !1;
    var n, s, o;
    if (Array.isArray(t)) {
      if (n = t.length, n != r.length) return !1;
      for (s = n; s-- !== 0; )
        if (!e(t[s], r[s])) return !1;
      return !0;
    }
    if (t.constructor === RegExp) return t.source === r.source && t.flags === r.flags;
    if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === r.valueOf();
    if (t.toString !== Object.prototype.toString) return t.toString() === r.toString();
    if (o = Object.keys(t), n = o.length, n !== Object.keys(r).length) return !1;
    for (s = n; s-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(r, o[s])) return !1;
    for (s = n; s-- !== 0; ) {
      var c = o[s];
      if (!e(t[c], r[c])) return !1;
    }
    return !0;
  }
  return t !== t && r !== r;
}, Hc = { exports: {} }, Pt = Hc.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  on(t, n, s, e, "", e);
};
Pt.keywords = {
  additionalItems: !0,
  items: !0,
  contains: !0,
  additionalProperties: !0,
  propertyNames: !0,
  not: !0,
  if: !0,
  then: !0,
  else: !0
};
Pt.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Pt.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Pt.skipKeywords = {
  default: !0,
  enum: !0,
  const: !0,
  required: !0,
  maximum: !0,
  minimum: !0,
  exclusiveMaximum: !0,
  exclusiveMinimum: !0,
  multipleOf: !0,
  maxLength: !0,
  minLength: !0,
  pattern: !0,
  format: !0,
  maxItems: !0,
  minItems: !0,
  uniqueItems: !0,
  maxProperties: !0,
  minProperties: !0
};
function on(e, t, r, n, s, o, c, i, l, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, o, c, i, l, d);
    for (var u in n) {
      var m = n[u];
      if (Array.isArray(m)) {
        if (u in Pt.arrayKeywords)
          for (var S = 0; S < m.length; S++)
            on(e, t, r, m[S], s + "/" + u + "/" + S, o, s, u, n, S);
      } else if (u in Pt.propsKeywords) {
        if (m && typeof m == "object")
          for (var _ in m)
            on(e, t, r, m[_], s + "/" + u + "/" + zd(_), o, s, u, n, _);
      } else (u in Pt.keywords || e.allKeys && !(u in Pt.skipKeywords)) && on(e, t, r, m, s + "/" + u, o, s, u, n);
    }
    r(n, s, o, c, i, l, d);
  }
}
function zd(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var Ud = Hc.exports;
Object.defineProperty(Ie, "__esModule", { value: !0 });
Ie.getSchemaRefs = Ie.resolveUrl = Ie.normalizeId = Ie._getFullPath = Ie.getFullPath = Ie.inlineRef = void 0;
const qd = W, Kd = Tn, Gd = Ud, Bd = /* @__PURE__ */ new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function Hd(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !ys(e) : t ? Wc(e) <= t : !1;
}
Ie.inlineRef = Hd;
const Wd = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function ys(e) {
  for (const t in e) {
    if (Wd.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(ys) || typeof r == "object" && ys(r))
      return !0;
  }
  return !1;
}
function Wc(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !Bd.has(r) && (typeof e[r] == "object" && (0, qd.eachItem)(e[r], (n) => t += Wc(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function Jc(e, t = "", r) {
  r !== !1 && (t = Zt(t));
  const n = e.parse(t);
  return Xc(e, n);
}
Ie.getFullPath = Jc;
function Xc(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Ie._getFullPath = Xc;
const Jd = /#\/?$/;
function Zt(e) {
  return e ? e.replace(Jd, "") : "";
}
Ie.normalizeId = Zt;
function Xd(e, t, r) {
  return r = Zt(r), e.resolve(t, r);
}
Ie.resolveUrl = Xd;
const Yd = /^[a-z_][-a-z0-9._]*$/i;
function Qd(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = Zt(e[r] || t), o = { "": s }, c = Jc(n, s, !1), i = {}, l = /* @__PURE__ */ new Set();
  return Gd(e, { allKeys: !0 }, (m, S, _, b) => {
    if (b === void 0)
      return;
    const v = c + S;
    let w = o[b];
    typeof m[r] == "string" && (w = $.call(this, m[r])), R.call(this, m.$anchor), R.call(this, m.$dynamicAnchor), o[S] = w;
    function $(T) {
      const A = this.opts.uriResolver.resolve;
      if (T = Zt(w ? A(w, T) : T), l.has(T))
        throw u(T);
      l.add(T);
      let C = this.refs[T];
      return typeof C == "string" && (C = this.refs[C]), typeof C == "object" ? d(m, C.schema, T) : T !== Zt(v) && (T[0] === "#" ? (d(m, i[T], T), i[T] = m) : this.refs[T] = v), T;
    }
    function R(T) {
      if (typeof T == "string") {
        if (!Yd.test(T))
          throw new Error(`invalid anchor "${T}"`);
        $.call(this, `#${T}`);
      }
    }
  }), i;
  function d(m, S, _) {
    if (S !== void 0 && !Kd(m, S))
      throw u(_);
  }
  function u(m) {
    return new Error(`reference "${m}" resolves to more than one schema`);
  }
}
Ie.getSchemaRefs = Qd;
var Xa;
function In() {
  if (Xa) return lt;
  Xa = 1, Object.defineProperty(lt, "__esModule", { value: !0 }), lt.getData = lt.KeywordCxt = lt.validateFunctionCode = void 0;
  const e = dd(), t = Se, r = zc(), n = Se, s = Rd(), o = Vd(), c = Fd(), i = ae(), l = ct, d = Ie, u = W, m = jr;
  function S(g) {
    if (C(g) && (q(g), A(g))) {
      w(g);
      return;
    }
    _(g, () => (0, e.topBoolOrEmptySchema)(g));
  }
  lt.validateFunctionCode = S;
  function _({ gen: g, validateName: P, schema: j, schemaEnv: k, opts: V }, U) {
    V.code.es5 ? g.func(P, (0, i._)`${l.default.data}, ${l.default.valCxt}`, k.$async, () => {
      g.code((0, i._)`"use strict"; ${R(j, V)}`), v(g, V), g.code(U);
    }) : g.func(P, (0, i._)`${l.default.data}, ${b(V)}`, k.$async, () => g.code(R(j, V)).code(U));
  }
  function b(g) {
    return (0, i._)`{${l.default.instancePath}="", ${l.default.parentData}, ${l.default.parentDataProperty}, ${l.default.rootData}=${l.default.data}${g.dynamicRef ? (0, i._)`, ${l.default.dynamicAnchors}={}` : i.nil}}={}`;
  }
  function v(g, P) {
    g.if(l.default.valCxt, () => {
      g.var(l.default.instancePath, (0, i._)`${l.default.valCxt}.${l.default.instancePath}`), g.var(l.default.parentData, (0, i._)`${l.default.valCxt}.${l.default.parentData}`), g.var(l.default.parentDataProperty, (0, i._)`${l.default.valCxt}.${l.default.parentDataProperty}`), g.var(l.default.rootData, (0, i._)`${l.default.valCxt}.${l.default.rootData}`), P.dynamicRef && g.var(l.default.dynamicAnchors, (0, i._)`${l.default.valCxt}.${l.default.dynamicAnchors}`);
    }, () => {
      g.var(l.default.instancePath, (0, i._)`""`), g.var(l.default.parentData, (0, i._)`undefined`), g.var(l.default.parentDataProperty, (0, i._)`undefined`), g.var(l.default.rootData, l.default.data), P.dynamicRef && g.var(l.default.dynamicAnchors, (0, i._)`{}`);
    });
  }
  function w(g) {
    const { schema: P, opts: j, gen: k } = g;
    _(g, () => {
      j.$comment && P.$comment && Z(g), Q(g), k.let(l.default.vErrors, null), k.let(l.default.errors, 0), j.unevaluated && $(g), oe(g), L(g);
    });
  }
  function $(g) {
    const { gen: P, validateName: j } = g;
    g.evaluated = P.const("evaluated", (0, i._)`${j}.evaluated`), P.if((0, i._)`${g.evaluated}.dynamicProps`, () => P.assign((0, i._)`${g.evaluated}.props`, (0, i._)`undefined`)), P.if((0, i._)`${g.evaluated}.dynamicItems`, () => P.assign((0, i._)`${g.evaluated}.items`, (0, i._)`undefined`));
  }
  function R(g, P) {
    const j = typeof g == "object" && g[P.schemaId];
    return j && (P.code.source || P.code.process) ? (0, i._)`/*# sourceURL=${j} */` : i.nil;
  }
  function T(g, P) {
    if (C(g) && (q(g), A(g))) {
      G(g, P);
      return;
    }
    (0, e.boolOrEmptySchema)(g, P);
  }
  function A({ schema: g, self: P }) {
    if (typeof g == "boolean")
      return !g;
    for (const j in g)
      if (P.RULES.all[j])
        return !0;
    return !1;
  }
  function C(g) {
    return typeof g.schema != "boolean";
  }
  function G(g, P) {
    const { schema: j, gen: k, opts: V } = g;
    V.$comment && j.$comment && Z(g), x(g), X(g);
    const U = k.const("_errs", l.default.errors);
    oe(g, U), k.var(P, (0, i._)`${U} === ${l.default.errors}`);
  }
  function q(g) {
    (0, u.checkUnknownRules)(g), K(g);
  }
  function oe(g, P) {
    if (g.opts.jtd)
      return B(g, [], !1, P);
    const j = (0, t.getSchemaTypes)(g.schema), k = (0, t.coerceAndCheckDataType)(g, j);
    B(g, j, !k, P);
  }
  function K(g) {
    const { schema: P, errSchemaPath: j, opts: k, self: V } = g;
    P.$ref && k.ignoreKeywordsWithRef && (0, u.schemaHasRulesButRef)(P, V.RULES) && V.logger.warn(`$ref: keywords ignored in schema at path "${j}"`);
  }
  function Q(g) {
    const { schema: P, opts: j } = g;
    P.default !== void 0 && j.useDefaults && j.strictSchema && (0, u.checkStrictMode)(g, "default is ignored in the schema root");
  }
  function x(g) {
    const P = g.schema[g.opts.schemaId];
    P && (g.baseId = (0, d.resolveUrl)(g.opts.uriResolver, g.baseId, P));
  }
  function X(g) {
    if (g.schema.$async && !g.schemaEnv.$async)
      throw new Error("async schema in sync schema");
  }
  function Z({ gen: g, schemaEnv: P, schema: j, errSchemaPath: k, opts: V }) {
    const U = j.$comment;
    if (V.$comment === !0)
      g.code((0, i._)`${l.default.self}.logger.log(${U})`);
    else if (typeof V.$comment == "function") {
      const ie = (0, i.str)`${k}/$comment`, ve = g.scopeValue("root", { ref: P.root });
      g.code((0, i._)`${l.default.self}.opts.$comment(${U}, ${ie}, ${ve}.schema)`);
    }
  }
  function L(g) {
    const { gen: P, schemaEnv: j, validateName: k, ValidationError: V, opts: U } = g;
    j.$async ? P.if((0, i._)`${l.default.errors} === 0`, () => P.return(l.default.data), () => P.throw((0, i._)`new ${V}(${l.default.vErrors})`)) : (P.assign((0, i._)`${k}.errors`, l.default.vErrors), U.unevaluated && F(g), P.return((0, i._)`${l.default.errors} === 0`));
  }
  function F({ gen: g, evaluated: P, props: j, items: k }) {
    j instanceof i.Name && g.assign((0, i._)`${P}.props`, j), k instanceof i.Name && g.assign((0, i._)`${P}.items`, k);
  }
  function B(g, P, j, k) {
    const { gen: V, schema: U, data: ie, allErrors: ve, opts: de, self: fe } = g, { RULES: ce } = fe;
    if (U.$ref && (de.ignoreKeywordsWithRef || !(0, u.schemaHasRulesButRef)(U, ce))) {
      V.block(() => D(g, "$ref", ce.all.$ref.definition));
      return;
    }
    de.jtd || O(g, P), V.block(() => {
      for (const ye of ce.rules)
        Ue(ye);
      Ue(ce.post);
    });
    function Ue(ye) {
      (0, r.shouldUseGroup)(U, ye) && (ye.type ? (V.if((0, n.checkDataType)(ye.type, ie, de.strictNumbers)), z(g, ye), P.length === 1 && P[0] === ye.type && j && (V.else(), (0, n.reportTypeError)(g)), V.endIf()) : z(g, ye), ve || V.if((0, i._)`${l.default.errors} === ${k || 0}`));
    }
  }
  function z(g, P) {
    const { gen: j, schema: k, opts: { useDefaults: V } } = g;
    V && (0, s.assignDefaults)(g, P.type), j.block(() => {
      for (const U of P.rules)
        (0, r.shouldUseRule)(k, U) && D(g, U.keyword, U.definition, P.type);
    });
  }
  function O(g, P) {
    g.schemaEnv.meta || !g.opts.strictTypes || (I(g, P), g.opts.allowUnionTypes || y(g, P), h(g, g.dataTypes));
  }
  function I(g, P) {
    if (P.length) {
      if (!g.dataTypes.length) {
        g.dataTypes = P;
        return;
      }
      P.forEach((j) => {
        p(g.dataTypes, j) || f(g, `type "${j}" not allowed by context "${g.dataTypes.join(",")}"`);
      }), a(g, P);
    }
  }
  function y(g, P) {
    P.length > 1 && !(P.length === 2 && P.includes("null")) && f(g, "use allowUnionTypes to allow union type keyword");
  }
  function h(g, P) {
    const j = g.self.RULES.all;
    for (const k in j) {
      const V = j[k];
      if (typeof V == "object" && (0, r.shouldUseRule)(g.schema, V)) {
        const { type: U } = V.definition;
        U.length && !U.some((ie) => E(P, ie)) && f(g, `missing type "${U.join(",")}" for keyword "${k}"`);
      }
    }
  }
  function E(g, P) {
    return g.includes(P) || P === "number" && g.includes("integer");
  }
  function p(g, P) {
    return g.includes(P) || P === "integer" && g.includes("number");
  }
  function a(g, P) {
    const j = [];
    for (const k of g.dataTypes)
      p(P, k) ? j.push(k) : P.includes("integer") && k === "number" && j.push("integer");
    g.dataTypes = j;
  }
  function f(g, P) {
    const j = g.schemaEnv.baseId + g.errSchemaPath;
    P += ` at "${j}" (strictTypes)`, (0, u.checkStrictMode)(g, P, g.opts.strictTypes);
  }
  class N {
    constructor(P, j, k) {
      if ((0, o.validateKeywordUsage)(P, j, k), this.gen = P.gen, this.allErrors = P.allErrors, this.keyword = k, this.data = P.data, this.schema = P.schema[k], this.$data = j.$data && P.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, u.schemaRefOrVal)(P, this.schema, k, this.$data), this.schemaType = j.schemaType, this.parentSchema = P.schema, this.params = {}, this.it = P, this.def = j, this.$data)
        this.schemaCode = P.gen.const("vSchema", H(this.$data, P));
      else if (this.schemaCode = this.schemaValue, !(0, o.validSchemaType)(this.schema, j.schemaType, j.allowUndefined))
        throw new Error(`${k} value must be ${JSON.stringify(j.schemaType)}`);
      ("code" in j ? j.trackErrors : j.errors !== !1) && (this.errsCount = P.gen.const("_errs", l.default.errors));
    }
    result(P, j, k) {
      this.failResult((0, i.not)(P), j, k);
    }
    failResult(P, j, k) {
      this.gen.if(P), k ? k() : this.error(), j ? (this.gen.else(), j(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    pass(P, j) {
      this.failResult((0, i.not)(P), void 0, j);
    }
    fail(P) {
      if (P === void 0) {
        this.error(), this.allErrors || this.gen.if(!1);
        return;
      }
      this.gen.if(P), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    fail$data(P) {
      if (!this.$data)
        return this.fail(P);
      const { schemaCode: j } = this;
      this.fail((0, i._)`${j} !== undefined && (${(0, i.or)(this.invalid$data(), P)})`);
    }
    error(P, j, k) {
      if (j) {
        this.setParams(j), this._error(P, k), this.setParams({});
        return;
      }
      this._error(P, k);
    }
    _error(P, j) {
      (P ? m.reportExtraError : m.reportError)(this, this.def.error, j);
    }
    $dataError() {
      (0, m.reportError)(this, this.def.$dataError || m.keyword$DataError);
    }
    reset() {
      if (this.errsCount === void 0)
        throw new Error('add "trackErrors" to keyword definition');
      (0, m.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(P) {
      this.allErrors || this.gen.if(P);
    }
    setParams(P, j) {
      j ? Object.assign(this.params, P) : this.params = P;
    }
    block$data(P, j, k = i.nil) {
      this.gen.block(() => {
        this.check$data(P, k), j();
      });
    }
    check$data(P = i.nil, j = i.nil) {
      if (!this.$data)
        return;
      const { gen: k, schemaCode: V, schemaType: U, def: ie } = this;
      k.if((0, i.or)((0, i._)`${V} === undefined`, j)), P !== i.nil && k.assign(P, !0), (U.length || ie.validateSchema) && (k.elseIf(this.invalid$data()), this.$dataError(), P !== i.nil && k.assign(P, !1)), k.else();
    }
    invalid$data() {
      const { gen: P, schemaCode: j, schemaType: k, def: V, it: U } = this;
      return (0, i.or)(ie(), ve());
      function ie() {
        if (k.length) {
          if (!(j instanceof i.Name))
            throw new Error("ajv implementation error");
          const de = Array.isArray(k) ? k : [k];
          return (0, i._)`${(0, n.checkDataTypes)(de, j, U.opts.strictNumbers, n.DataType.Wrong)}`;
        }
        return i.nil;
      }
      function ve() {
        if (V.validateSchema) {
          const de = P.scopeValue("validate$data", { ref: V.validateSchema });
          return (0, i._)`!${de}(${j})`;
        }
        return i.nil;
      }
    }
    subschema(P, j) {
      const k = (0, c.getSubschema)(this.it, P);
      (0, c.extendSubschemaData)(k, this.it, P), (0, c.extendSubschemaMode)(k, P);
      const V = { ...this.it, ...k, items: void 0, props: void 0 };
      return T(V, j), V;
    }
    mergeEvaluated(P, j) {
      const { it: k, gen: V } = this;
      k.opts.unevaluated && (k.props !== !0 && P.props !== void 0 && (k.props = u.mergeEvaluated.props(V, P.props, k.props, j)), k.items !== !0 && P.items !== void 0 && (k.items = u.mergeEvaluated.items(V, P.items, k.items, j)));
    }
    mergeValidEvaluated(P, j) {
      const { it: k, gen: V } = this;
      if (k.opts.unevaluated && (k.props !== !0 || k.items !== !0))
        return V.if(j, () => this.mergeEvaluated(P, i.Name)), !0;
    }
  }
  lt.KeywordCxt = N;
  function D(g, P, j, k) {
    const V = new N(g, j, P);
    "code" in j ? j.code(V, k) : V.$data && j.validate ? (0, o.funcKeywordCode)(V, j) : "macro" in j ? (0, o.macroKeywordCode)(V, j) : (j.compile || j.validate) && (0, o.funcKeywordCode)(V, j);
  }
  const M = /^\/(?:[^~]|~0|~1)*$/, Y = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function H(g, { dataLevel: P, dataNames: j, dataPathArr: k }) {
    let V, U;
    if (g === "")
      return l.default.rootData;
    if (g[0] === "/") {
      if (!M.test(g))
        throw new Error(`Invalid JSON-pointer: ${g}`);
      V = g, U = l.default.rootData;
    } else {
      const fe = Y.exec(g);
      if (!fe)
        throw new Error(`Invalid JSON-pointer: ${g}`);
      const ce = +fe[1];
      if (V = fe[2], V === "#") {
        if (ce >= P)
          throw new Error(de("property/index", ce));
        return k[P - ce];
      }
      if (ce > P)
        throw new Error(de("data", ce));
      if (U = j[P - ce], !V)
        return U;
    }
    let ie = U;
    const ve = V.split("/");
    for (const fe of ve)
      fe && (U = (0, i._)`${U}${(0, i.getProperty)((0, u.unescapeJsonPointer)(fe))}`, ie = (0, i._)`${ie} && ${U}`);
    return ie;
    function de(fe, ce) {
      return `Cannot access ${fe} ${ce} levels up, current level is ${P}`;
    }
  }
  return lt.getData = H, lt;
}
var Vr = {}, Ya;
function ro() {
  if (Ya) return Vr;
  Ya = 1, Object.defineProperty(Vr, "__esModule", { value: !0 });
  class e extends Error {
    constructor(r) {
      super("validation failed"), this.errors = r, this.ajv = this.validation = !0;
    }
  }
  return Vr.default = e, Vr;
}
var Fr = {}, Qa;
function jn() {
  if (Qa) return Fr;
  Qa = 1, Object.defineProperty(Fr, "__esModule", { value: !0 });
  const e = Ie;
  class t extends Error {
    constructor(n, s, o, c) {
      super(c || `can't resolve reference ${o} from id ${s}`), this.missingRef = (0, e.resolveUrl)(n, s, o), this.missingSchema = (0, e.normalizeId)((0, e.getFullPath)(n, this.missingRef));
    }
  }
  return Fr.default = t, Fr;
}
var Fe = {};
Object.defineProperty(Fe, "__esModule", { value: !0 });
Fe.resolveSchema = Fe.getCompilingSchema = Fe.resolveRef = Fe.compileSchema = Fe.SchemaEnv = void 0;
const Je = ae(), Zd = ro(), Ct = ct, xe = Ie, Za = W, xd = In();
let An = class {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, xe.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
};
Fe.SchemaEnv = An;
function no(e) {
  const t = Yc.call(this, e);
  if (t)
    return t;
  const r = (0, xe.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: o } = this.opts, c = new Je.CodeGen(this.scope, { es5: n, lines: s, ownProperties: o });
  let i;
  e.$async && (i = c.scopeValue("Error", {
    ref: Zd.default,
    code: (0, Je._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const l = c.scopeName("validate");
  e.validateName = l;
  const d = {
    gen: c,
    allErrors: this.opts.allErrors,
    data: Ct.default.data,
    parentData: Ct.default.parentData,
    parentDataProperty: Ct.default.parentDataProperty,
    dataNames: [Ct.default.data],
    dataPathArr: [Je.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: c.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Je.stringify)(e.schema) } : { ref: e.schema }),
    validateName: l,
    ValidationError: i,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: Je.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Je._)`""`,
    opts: this.opts,
    self: this
  };
  let u;
  try {
    this._compilations.add(e), (0, xd.validateFunctionCode)(d), c.optimize(this.opts.code.optimize);
    const m = c.toString();
    u = `${c.scopeRefs(Ct.default.scope)}return ${m}`, this.opts.code.process && (u = this.opts.code.process(u, e));
    const _ = new Function(`${Ct.default.self}`, `${Ct.default.scope}`, u)(this, this.scope.get());
    if (this.scope.value(l, { ref: _ }), _.errors = null, _.schema = e.schema, _.schemaEnv = e, e.$async && (_.$async = !0), this.opts.code.source === !0 && (_.source = { validateName: l, validateCode: m, scopeValues: c._values }), this.opts.unevaluated) {
      const { props: b, items: v } = d;
      _.evaluated = {
        props: b instanceof Je.Name ? void 0 : b,
        items: v instanceof Je.Name ? void 0 : v,
        dynamicProps: b instanceof Je.Name,
        dynamicItems: v instanceof Je.Name
      }, _.source && (_.source.evaluated = (0, Je.stringify)(_.evaluated));
    }
    return e.validate = _, e;
  } catch (m) {
    throw delete e.validate, delete e.validateName, u && this.logger.error("Error compiling schema, function code:", u), m;
  } finally {
    this._compilations.delete(e);
  }
}
Fe.compileSchema = no;
function ef(e, t, r) {
  var n;
  r = (0, xe.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let o = nf.call(this, e, r);
  if (o === void 0) {
    const c = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: i } = this.opts;
    c && (o = new An({ schema: c, schemaId: i, root: e, baseId: t }));
  }
  if (o !== void 0)
    return e.refs[r] = tf.call(this, o);
}
Fe.resolveRef = ef;
function tf(e) {
  return (0, xe.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : no.call(this, e);
}
function Yc(e) {
  for (const t of this._compilations)
    if (rf(t, e))
      return t;
}
Fe.getCompilingSchema = Yc;
function rf(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function nf(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || kn.call(this, e, t);
}
function kn(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, xe._getFullPath)(this.opts.uriResolver, r);
  let s = (0, xe.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return xn.call(this, r, e);
  const o = (0, xe.normalizeId)(n), c = this.refs[o] || this.schemas[o];
  if (typeof c == "string") {
    const i = kn.call(this, e, c);
    return typeof (i == null ? void 0 : i.schema) != "object" ? void 0 : xn.call(this, r, i);
  }
  if (typeof (c == null ? void 0 : c.schema) == "object") {
    if (c.validate || no.call(this, c), o === (0, xe.normalizeId)(t)) {
      const { schema: i } = c, { schemaId: l } = this.opts, d = i[l];
      return d && (s = (0, xe.resolveUrl)(this.opts.uriResolver, s, d)), new An({ schema: i, schemaId: l, root: e, baseId: s });
    }
    return xn.call(this, r, c);
  }
}
Fe.resolveSchema = kn;
const sf = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function xn(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const i of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const l = r[(0, Za.unescapeFragment)(i)];
    if (l === void 0)
      return;
    r = l;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !sf.has(i) && d && (t = (0, xe.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let o;
  if (typeof r != "boolean" && r.$ref && !(0, Za.schemaHasRulesButRef)(r, this.RULES)) {
    const i = (0, xe.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    o = kn.call(this, n, i);
  }
  const { schemaId: c } = this.opts;
  if (o = o || new An({ schema: r, schemaId: c, root: n, baseId: t }), o.schema !== o.root.schema)
    return o;
}
const of = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", af = "Meta-schema for $data reference (JSON AnySchema extension proposal)", cf = "object", lf = [
  "$data"
], uf = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
}, df = !1, ff = {
  $id: of,
  description: af,
  type: cf,
  required: lf,
  properties: uf,
  additionalProperties: df
};
var so = {}, Cn = { exports: {} };
const hf = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  a: 10,
  A: 10,
  b: 11,
  B: 11,
  c: 12,
  C: 12,
  d: 13,
  D: 13,
  e: 14,
  E: 14,
  f: 15,
  F: 15
};
var mf = {
  HEX: hf
};
const { HEX: pf } = mf, $f = /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u;
function Qc(e) {
  if (xc(e, ".") < 3)
    return { host: e, isIPV4: !1 };
  const t = e.match($f) || [], [r] = t;
  return r ? { host: _f(r, "."), isIPV4: !0 } : { host: e, isIPV4: !1 };
}
function _s(e, t = !1) {
  let r = "", n = !0;
  for (const s of e) {
    if (pf[s] === void 0) return;
    s !== "0" && n === !0 && (n = !1), n || (r += s);
  }
  return t && r.length === 0 && (r = "0"), r;
}
function yf(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], s = [];
  let o = !1, c = !1, i = !1;
  function l() {
    if (s.length) {
      if (o === !1) {
        const d = _s(s);
        if (d !== void 0)
          n.push(d);
        else
          return r.error = !0, !1;
      }
      s.length = 0;
    }
    return !0;
  }
  for (let d = 0; d < e.length; d++) {
    const u = e[d];
    if (!(u === "[" || u === "]"))
      if (u === ":") {
        if (c === !0 && (i = !0), !l())
          break;
        if (t++, n.push(":"), t > 7) {
          r.error = !0;
          break;
        }
        d - 1 >= 0 && e[d - 1] === ":" && (c = !0);
        continue;
      } else if (u === "%") {
        if (!l())
          break;
        o = !0;
      } else {
        s.push(u);
        continue;
      }
  }
  return s.length && (o ? r.zone = s.join("") : i ? n.push(s.join("")) : n.push(_s(s))), r.address = n.join(""), r;
}
function Zc(e) {
  if (xc(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = yf(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let r = t.address, n = t.address;
    return t.zone && (r += "%" + t.zone, n += "%25" + t.zone), { host: r, escapedHost: n, isIPV6: !0 };
  }
}
function _f(e, t) {
  let r = "", n = !0;
  const s = e.length;
  for (let o = 0; o < s; o++) {
    const c = e[o];
    c === "0" && n ? (o + 1 <= s && e[o + 1] === t || o + 1 === s) && (r += c, n = !1) : (c === t ? n = !0 : n = !1, r += c);
  }
  return r;
}
function xc(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
const xa = /^\.\.?\//u, ei = /^\/\.(?:\/|$)/u, ti = /^\/\.\.(?:\/|$)/u, gf = /^\/?(?:.|\n)*?(?=\/|$)/u;
function vf(e) {
  const t = [];
  for (; e.length; )
    if (e.match(xa))
      e = e.replace(xa, "");
    else if (e.match(ei))
      e = e.replace(ei, "/");
    else if (e.match(ti))
      e = e.replace(ti, "/"), t.pop();
    else if (e === "." || e === "..")
      e = "";
    else {
      const r = e.match(gf);
      if (r) {
        const n = r[0];
        e = e.slice(n.length), t.push(n);
      } else
        throw new Error("Unexpected dot segment condition");
    }
  return t.join("");
}
function Ef(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function wf(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    const n = Qc(r);
    if (n.isIPV4)
      r = n.host;
    else {
      const s = Zc(n.host);
      s.isIPV6 === !0 ? r = `[${s.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var bf = {
  recomposeAuthority: wf,
  normalizeComponentEncoding: Ef,
  removeDotSegments: vf,
  normalizeIPv4: Qc,
  normalizeIPv6: Zc,
  stringArrayToHexStripped: _s
};
const Sf = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu, Pf = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function el(e) {
  return typeof e.secure == "boolean" ? e.secure : String(e.scheme).toLowerCase() === "wss";
}
function tl(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function rl(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function Rf(e) {
  return e.secure = el(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function Of(e) {
  if ((e.port === (el(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function Nf(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match(Pf);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const s = `${n}:${t.nid || e.nid}`, o = oo[s];
    e.path = void 0, o && (e = o.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function Tf(e, t) {
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), s = `${r}:${t.nid || n}`, o = oo[s];
  o && (e = o.serialize(e, t));
  const c = e, i = e.nss;
  return c.path = `${n || t.nid}:${i}`, t.skipEscape = !0, c;
}
function If(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !Sf.test(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function jf(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const nl = {
  scheme: "http",
  domainHost: !0,
  parse: tl,
  serialize: rl
}, Af = {
  scheme: "https",
  domainHost: nl.domainHost,
  parse: tl,
  serialize: rl
}, an = {
  scheme: "ws",
  domainHost: !0,
  parse: Rf,
  serialize: Of
}, kf = {
  scheme: "wss",
  domainHost: an.domainHost,
  parse: an.parse,
  serialize: an.serialize
}, Cf = {
  scheme: "urn",
  parse: Nf,
  serialize: Tf,
  skipNormalize: !0
}, Df = {
  scheme: "urn:uuid",
  parse: If,
  serialize: jf,
  skipNormalize: !0
}, oo = {
  http: nl,
  https: Af,
  ws: an,
  wss: kf,
  urn: Cf,
  "urn:uuid": Df
};
var Mf = oo;
const { normalizeIPv6: Lf, normalizeIPv4: Vf, removeDotSegments: yr, recomposeAuthority: Ff, normalizeComponentEncoding: zr } = bf, ao = Mf;
function zf(e, t) {
  return typeof e == "string" ? e = it(pt(e, t), t) : typeof e == "object" && (e = pt(it(e, t), t)), e;
}
function Uf(e, t, r) {
  const n = Object.assign({ scheme: "null" }, r), s = sl(pt(e, n), pt(t, n), n, !0);
  return it(s, { ...n, skipEscape: !0 });
}
function sl(e, t, r, n) {
  const s = {};
  return n || (e = pt(it(e, r), r), t = pt(it(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (s.scheme = t.scheme, s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = yr(t.path || ""), s.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = yr(t.path || ""), s.query = t.query) : (t.path ? (t.path.charAt(0) === "/" ? s.path = yr(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? s.path = "/" + t.path : e.path ? s.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : s.path = t.path, s.path = yr(s.path)), s.query = t.query) : (s.path = e.path, t.query !== void 0 ? s.query = t.query : s.query = e.query), s.userinfo = e.userinfo, s.host = e.host, s.port = e.port), s.scheme = e.scheme), s.fragment = t.fragment, s;
}
function qf(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = it(zr(pt(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = it(zr(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = it(zr(pt(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = it(zr(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
}
function it(e, t) {
  const r = {
    host: e.host,
    scheme: e.scheme,
    userinfo: e.userinfo,
    port: e.port,
    path: e.path,
    query: e.query,
    nid: e.nid,
    nss: e.nss,
    uuid: e.uuid,
    fragment: e.fragment,
    reference: e.reference,
    resourceName: e.resourceName,
    secure: e.secure,
    error: ""
  }, n = Object.assign({}, t), s = [], o = ao[(n.scheme || r.scheme || "").toLowerCase()];
  o && o.serialize && o.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && s.push(r.scheme, ":");
  const c = Ff(r);
  if (c !== void 0 && (n.reference !== "suffix" && s.push("//"), s.push(c), r.path && r.path.charAt(0) !== "/" && s.push("/")), r.path !== void 0) {
    let i = r.path;
    !n.absolutePath && (!o || !o.absolutePath) && (i = yr(i)), c === void 0 && (i = i.replace(/^\/\//u, "/%2F")), s.push(i);
  }
  return r.query !== void 0 && s.push("?", r.query), r.fragment !== void 0 && s.push("#", r.fragment), s.join("");
}
const Kf = Array.from({ length: 127 }, (e, t) => /[^!"$&'()*+,\-.;=_`a-z{}~]/u.test(String.fromCharCode(t)));
function Gf(e) {
  let t = 0;
  for (let r = 0, n = e.length; r < n; ++r)
    if (t = e.charCodeAt(r), t > 126 || Kf[t])
      return !0;
  return !1;
}
const Bf = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function pt(e, t) {
  const r = Object.assign({}, t), n = {
    scheme: void 0,
    userinfo: void 0,
    host: "",
    port: void 0,
    path: "",
    query: void 0,
    fragment: void 0
  }, s = e.indexOf("%") !== -1;
  let o = !1;
  r.reference === "suffix" && (e = (r.scheme ? r.scheme + ":" : "") + "//" + e);
  const c = e.match(Bf);
  if (c) {
    if (n.scheme = c[1], n.userinfo = c[3], n.host = c[4], n.port = parseInt(c[5], 10), n.path = c[6] || "", n.query = c[7], n.fragment = c[8], isNaN(n.port) && (n.port = c[5]), n.host) {
      const l = Vf(n.host);
      if (l.isIPV4 === !1) {
        const d = Lf(l.host);
        n.host = d.host.toLowerCase(), o = d.isIPV6;
      } else
        n.host = l.host, o = !0;
    }
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const i = ao[(r.scheme || n.scheme || "").toLowerCase()];
    if (!r.unicodeSupport && (!i || !i.unicodeSupport) && n.host && (r.domainHost || i && i.domainHost) && o === !1 && Gf(n.host))
      try {
        n.host = URL.domainToASCII(n.host.toLowerCase());
      } catch (l) {
        n.error = n.error || "Host's domain name can not be converted to ASCII: " + l;
      }
    (!i || i && !i.skipNormalize) && (s && n.scheme !== void 0 && (n.scheme = unescape(n.scheme)), s && n.host !== void 0 && (n.host = unescape(n.host)), n.path && (n.path = escape(unescape(n.path))), n.fragment && (n.fragment = encodeURI(decodeURIComponent(n.fragment)))), i && i.parse && i.parse(n, r);
  } else
    n.error = n.error || "URI can not be parsed.";
  return n;
}
const io = {
  SCHEMES: ao,
  normalize: zf,
  resolve: Uf,
  resolveComponents: sl,
  equal: qf,
  serialize: it,
  parse: pt
};
Cn.exports = io;
Cn.exports.default = io;
Cn.exports.fastUri = io;
var ol = Cn.exports;
Object.defineProperty(so, "__esModule", { value: !0 });
const al = ol;
al.code = 'require("ajv/dist/runtime/uri").default';
so.default = al;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = In();
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = ae();
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return r._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return r.str;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return r.stringify;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return r.nil;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return r.Name;
  } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
    return r.CodeGen;
  } });
  const n = ro(), s = jn(), o = Ut, c = Fe, i = ae(), l = Ie, d = Se, u = W, m = ff, S = so, _ = (y, h) => new RegExp(y, h);
  _.code = "new RegExp";
  const b = ["removeAdditional", "useDefaults", "coerceTypes"], v = /* @__PURE__ */ new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]), w = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  }, $ = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, R = 200;
  function T(y) {
    var h, E, p, a, f, N, D, M, Y, H, g, P, j, k, V, U, ie, ve, de, fe, ce, Ue, ye, Tt, It;
    const He = y.strict, jt = (h = y.code) === null || h === void 0 ? void 0 : h.optimize, ur = jt === !0 || jt === void 0 ? 1 : jt || 0, dr = (p = (E = y.code) === null || E === void 0 ? void 0 : E.regExp) !== null && p !== void 0 ? p : _, Xn = (a = y.uriResolver) !== null && a !== void 0 ? a : S.default;
    return {
      strictSchema: (N = (f = y.strictSchema) !== null && f !== void 0 ? f : He) !== null && N !== void 0 ? N : !0,
      strictNumbers: (M = (D = y.strictNumbers) !== null && D !== void 0 ? D : He) !== null && M !== void 0 ? M : !0,
      strictTypes: (H = (Y = y.strictTypes) !== null && Y !== void 0 ? Y : He) !== null && H !== void 0 ? H : "log",
      strictTuples: (P = (g = y.strictTuples) !== null && g !== void 0 ? g : He) !== null && P !== void 0 ? P : "log",
      strictRequired: (k = (j = y.strictRequired) !== null && j !== void 0 ? j : He) !== null && k !== void 0 ? k : !1,
      code: y.code ? { ...y.code, optimize: ur, regExp: dr } : { optimize: ur, regExp: dr },
      loopRequired: (V = y.loopRequired) !== null && V !== void 0 ? V : R,
      loopEnum: (U = y.loopEnum) !== null && U !== void 0 ? U : R,
      meta: (ie = y.meta) !== null && ie !== void 0 ? ie : !0,
      messages: (ve = y.messages) !== null && ve !== void 0 ? ve : !0,
      inlineRefs: (de = y.inlineRefs) !== null && de !== void 0 ? de : !0,
      schemaId: (fe = y.schemaId) !== null && fe !== void 0 ? fe : "$id",
      addUsedSchema: (ce = y.addUsedSchema) !== null && ce !== void 0 ? ce : !0,
      validateSchema: (Ue = y.validateSchema) !== null && Ue !== void 0 ? Ue : !0,
      validateFormats: (ye = y.validateFormats) !== null && ye !== void 0 ? ye : !0,
      unicodeRegExp: (Tt = y.unicodeRegExp) !== null && Tt !== void 0 ? Tt : !0,
      int32range: (It = y.int32range) !== null && It !== void 0 ? It : !0,
      uriResolver: Xn
    };
  }
  class A {
    constructor(h = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), h = this.opts = { ...h, ...T(h) };
      const { es5: E, lines: p } = this.opts.code;
      this.scope = new i.ValueScope({ scope: {}, prefixes: v, es5: E, lines: p }), this.logger = X(h.logger);
      const a = h.validateFormats;
      h.validateFormats = !1, this.RULES = (0, o.getRules)(), C.call(this, w, h, "NOT SUPPORTED"), C.call(this, $, h, "DEPRECATED", "warn"), this._metaOpts = Q.call(this), h.formats && oe.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), h.keywords && K.call(this, h.keywords), typeof h.meta == "object" && this.addMetaSchema(h.meta), q.call(this), h.validateFormats = a;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: h, meta: E, schemaId: p } = this.opts;
      let a = m;
      p === "id" && (a = { ...m }, a.id = a.$id, delete a.$id), E && h && this.addMetaSchema(a, a[p], !1);
    }
    defaultMeta() {
      const { meta: h, schemaId: E } = this.opts;
      return this.opts.defaultMeta = typeof h == "object" ? h[E] || h : void 0;
    }
    validate(h, E) {
      let p;
      if (typeof h == "string") {
        if (p = this.getSchema(h), !p)
          throw new Error(`no schema with key or ref "${h}"`);
      } else
        p = this.compile(h);
      const a = p(E);
      return "$async" in p || (this.errors = p.errors), a;
    }
    compile(h, E) {
      const p = this._addSchema(h, E);
      return p.validate || this._compileSchemaEnv(p);
    }
    compileAsync(h, E) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: p } = this.opts;
      return a.call(this, h, E);
      async function a(H, g) {
        await f.call(this, H.$schema);
        const P = this._addSchema(H, g);
        return P.validate || N.call(this, P);
      }
      async function f(H) {
        H && !this.getSchema(H) && await a.call(this, { $ref: H }, !0);
      }
      async function N(H) {
        try {
          return this._compileSchemaEnv(H);
        } catch (g) {
          if (!(g instanceof s.default))
            throw g;
          return D.call(this, g), await M.call(this, g.missingSchema), N.call(this, H);
        }
      }
      function D({ missingSchema: H, missingRef: g }) {
        if (this.refs[H])
          throw new Error(`AnySchema ${H} is loaded but ${g} cannot be resolved`);
      }
      async function M(H) {
        const g = await Y.call(this, H);
        this.refs[H] || await f.call(this, g.$schema), this.refs[H] || this.addSchema(g, H, E);
      }
      async function Y(H) {
        const g = this._loading[H];
        if (g)
          return g;
        try {
          return await (this._loading[H] = p(H));
        } finally {
          delete this._loading[H];
        }
      }
    }
    // Adds schema to the instance
    addSchema(h, E, p, a = this.opts.validateSchema) {
      if (Array.isArray(h)) {
        for (const N of h)
          this.addSchema(N, void 0, p, a);
        return this;
      }
      let f;
      if (typeof h == "object") {
        const { schemaId: N } = this.opts;
        if (f = h[N], f !== void 0 && typeof f != "string")
          throw new Error(`schema ${N} must be string`);
      }
      return E = (0, l.normalizeId)(E || f), this._checkUnique(E), this.schemas[E] = this._addSchema(h, p, E, a, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(h, E, p = this.opts.validateSchema) {
      return this.addSchema(h, E, !0, p), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(h, E) {
      if (typeof h == "boolean")
        return !0;
      let p;
      if (p = h.$schema, p !== void 0 && typeof p != "string")
        throw new Error("$schema must be a string");
      if (p = p || this.opts.defaultMeta || this.defaultMeta(), !p)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const a = this.validate(p, h);
      if (!a && E) {
        const f = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(f);
        else
          throw new Error(f);
      }
      return a;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(h) {
      let E;
      for (; typeof (E = G.call(this, h)) == "string"; )
        h = E;
      if (E === void 0) {
        const { schemaId: p } = this.opts, a = new c.SchemaEnv({ schema: {}, schemaId: p });
        if (E = c.resolveSchema.call(this, a, h), !E)
          return;
        this.refs[h] = E;
      }
      return E.validate || this._compileSchemaEnv(E);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(h) {
      if (h instanceof RegExp)
        return this._removeAllSchemas(this.schemas, h), this._removeAllSchemas(this.refs, h), this;
      switch (typeof h) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const E = G.call(this, h);
          return typeof E == "object" && this._cache.delete(E.schema), delete this.schemas[h], delete this.refs[h], this;
        }
        case "object": {
          const E = h;
          this._cache.delete(E);
          let p = h[this.opts.schemaId];
          return p && (p = (0, l.normalizeId)(p), delete this.schemas[p], delete this.refs[p]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(h) {
      for (const E of h)
        this.addKeyword(E);
      return this;
    }
    addKeyword(h, E) {
      let p;
      if (typeof h == "string")
        p = h, typeof E == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), E.keyword = p);
      else if (typeof h == "object" && E === void 0) {
        if (E = h, p = E.keyword, Array.isArray(p) && !p.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (L.call(this, p, E), !E)
        return (0, u.eachItem)(p, (f) => F.call(this, f)), this;
      z.call(this, E);
      const a = {
        ...E,
        type: (0, d.getJSONTypes)(E.type),
        schemaType: (0, d.getJSONTypes)(E.schemaType)
      };
      return (0, u.eachItem)(p, a.type.length === 0 ? (f) => F.call(this, f, a) : (f) => a.type.forEach((N) => F.call(this, f, a, N))), this;
    }
    getKeyword(h) {
      const E = this.RULES.all[h];
      return typeof E == "object" ? E.definition : !!E;
    }
    // Remove keyword
    removeKeyword(h) {
      const { RULES: E } = this;
      delete E.keywords[h], delete E.all[h];
      for (const p of E.rules) {
        const a = p.rules.findIndex((f) => f.keyword === h);
        a >= 0 && p.rules.splice(a, 1);
      }
      return this;
    }
    // Add format
    addFormat(h, E) {
      return typeof E == "string" && (E = new RegExp(E)), this.formats[h] = E, this;
    }
    errorsText(h = this.errors, { separator: E = ", ", dataVar: p = "data" } = {}) {
      return !h || h.length === 0 ? "No errors" : h.map((a) => `${p}${a.instancePath} ${a.message}`).reduce((a, f) => a + E + f);
    }
    $dataMetaSchema(h, E) {
      const p = this.RULES.all;
      h = JSON.parse(JSON.stringify(h));
      for (const a of E) {
        const f = a.split("/").slice(1);
        let N = h;
        for (const D of f)
          N = N[D];
        for (const D in p) {
          const M = p[D];
          if (typeof M != "object")
            continue;
          const { $data: Y } = M.definition, H = N[D];
          Y && H && (N[D] = I(H));
        }
      }
      return h;
    }
    _removeAllSchemas(h, E) {
      for (const p in h) {
        const a = h[p];
        (!E || E.test(p)) && (typeof a == "string" ? delete h[p] : a && !a.meta && (this._cache.delete(a.schema), delete h[p]));
      }
    }
    _addSchema(h, E, p, a = this.opts.validateSchema, f = this.opts.addUsedSchema) {
      let N;
      const { schemaId: D } = this.opts;
      if (typeof h == "object")
        N = h[D];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof h != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let M = this._cache.get(h);
      if (M !== void 0)
        return M;
      p = (0, l.normalizeId)(N || p);
      const Y = l.getSchemaRefs.call(this, h, p);
      return M = new c.SchemaEnv({ schema: h, schemaId: D, meta: E, baseId: p, localRefs: Y }), this._cache.set(M.schema, M), f && !p.startsWith("#") && (p && this._checkUnique(p), this.refs[p] = M), a && this.validateSchema(h, !0), M;
    }
    _checkUnique(h) {
      if (this.schemas[h] || this.refs[h])
        throw new Error(`schema with key or id "${h}" already exists`);
    }
    _compileSchemaEnv(h) {
      if (h.meta ? this._compileMetaSchema(h) : c.compileSchema.call(this, h), !h.validate)
        throw new Error("ajv implementation error");
      return h.validate;
    }
    _compileMetaSchema(h) {
      const E = this.opts;
      this.opts = this._metaOpts;
      try {
        c.compileSchema.call(this, h);
      } finally {
        this.opts = E;
      }
    }
  }
  A.ValidationError = n.default, A.MissingRefError = s.default, e.default = A;
  function C(y, h, E, p = "error") {
    for (const a in y) {
      const f = a;
      f in h && this.logger[p](`${E}: option ${a}. ${y[f]}`);
    }
  }
  function G(y) {
    return y = (0, l.normalizeId)(y), this.schemas[y] || this.refs[y];
  }
  function q() {
    const y = this.opts.schemas;
    if (y)
      if (Array.isArray(y))
        this.addSchema(y);
      else
        for (const h in y)
          this.addSchema(y[h], h);
  }
  function oe() {
    for (const y in this.opts.formats) {
      const h = this.opts.formats[y];
      h && this.addFormat(y, h);
    }
  }
  function K(y) {
    if (Array.isArray(y)) {
      this.addVocabulary(y);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const h in y) {
      const E = y[h];
      E.keyword || (E.keyword = h), this.addKeyword(E);
    }
  }
  function Q() {
    const y = { ...this.opts };
    for (const h of b)
      delete y[h];
    return y;
  }
  const x = { log() {
  }, warn() {
  }, error() {
  } };
  function X(y) {
    if (y === !1)
      return x;
    if (y === void 0)
      return console;
    if (y.log && y.warn && y.error)
      return y;
    throw new Error("logger must implement log, warn and error methods");
  }
  const Z = /^[a-z_$][a-z0-9_$:-]*$/i;
  function L(y, h) {
    const { RULES: E } = this;
    if ((0, u.eachItem)(y, (p) => {
      if (E.keywords[p])
        throw new Error(`Keyword ${p} is already defined`);
      if (!Z.test(p))
        throw new Error(`Keyword ${p} has invalid name`);
    }), !!h && h.$data && !("code" in h || "validate" in h))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function F(y, h, E) {
    var p;
    const a = h == null ? void 0 : h.post;
    if (E && a)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let N = a ? f.post : f.rules.find(({ type: M }) => M === E);
    if (N || (N = { type: E, rules: [] }, f.rules.push(N)), f.keywords[y] = !0, !h)
      return;
    const D = {
      keyword: y,
      definition: {
        ...h,
        type: (0, d.getJSONTypes)(h.type),
        schemaType: (0, d.getJSONTypes)(h.schemaType)
      }
    };
    h.before ? B.call(this, N, D, h.before) : N.rules.push(D), f.all[y] = D, (p = h.implements) === null || p === void 0 || p.forEach((M) => this.addKeyword(M));
  }
  function B(y, h, E) {
    const p = y.rules.findIndex((a) => a.keyword === E);
    p >= 0 ? y.rules.splice(p, 0, h) : (y.rules.push(h), this.logger.warn(`rule ${E} is not defined`));
  }
  function z(y) {
    let { metaSchema: h } = y;
    h !== void 0 && (y.$data && this.opts.$data && (h = I(h)), y.validateSchema = this.compile(h, !0));
  }
  const O = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function I(y) {
    return { anyOf: [y, O] };
  }
})(Cc);
var co = {}, lo = {}, uo = {};
Object.defineProperty(uo, "__esModule", { value: !0 });
const Hf = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
uo.default = Hf;
var qt = {};
Object.defineProperty(qt, "__esModule", { value: !0 });
qt.callRef = qt.getValidate = void 0;
const Wf = jn(), ri = ne, Le = ae(), Bt = ct, ni = Fe, Ur = W, Jf = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: o, validateName: c, opts: i, self: l } = n, { root: d } = o;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return m();
    const u = ni.resolveRef.call(l, d, s, r);
    if (u === void 0)
      throw new Wf.default(n.opts.uriResolver, s, r);
    if (u instanceof ni.SchemaEnv)
      return S(u);
    return _(u);
    function m() {
      if (o === d)
        return cn(e, c, o, o.$async);
      const b = t.scopeValue("root", { ref: d });
      return cn(e, (0, Le._)`${b}.validate`, d, d.$async);
    }
    function S(b) {
      const v = il(e, b);
      cn(e, v, b, b.$async);
    }
    function _(b) {
      const v = t.scopeValue("schema", i.code.source === !0 ? { ref: b, code: (0, Le.stringify)(b) } : { ref: b }), w = t.name("valid"), $ = e.subschema({
        schema: b,
        dataTypes: [],
        schemaPath: Le.nil,
        topSchemaRef: v,
        errSchemaPath: r
      }, w);
      e.mergeEvaluated($), e.ok(w);
    }
  }
};
function il(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Le._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
qt.getValidate = il;
function cn(e, t, r, n) {
  const { gen: s, it: o } = e, { allErrors: c, schemaEnv: i, opts: l } = o, d = l.passContext ? Bt.default.this : Le.nil;
  n ? u() : m();
  function u() {
    if (!i.$async)
      throw new Error("async schema referenced by sync schema");
    const b = s.let("valid");
    s.try(() => {
      s.code((0, Le._)`await ${(0, ri.callValidateCode)(e, t, d)}`), _(t), c || s.assign(b, !0);
    }, (v) => {
      s.if((0, Le._)`!(${v} instanceof ${o.ValidationError})`, () => s.throw(v)), S(v), c || s.assign(b, !1);
    }), e.ok(b);
  }
  function m() {
    e.result((0, ri.callValidateCode)(e, t, d), () => _(t), () => S(t));
  }
  function S(b) {
    const v = (0, Le._)`${b}.errors`;
    s.assign(Bt.default.vErrors, (0, Le._)`${Bt.default.vErrors} === null ? ${v} : ${Bt.default.vErrors}.concat(${v})`), s.assign(Bt.default.errors, (0, Le._)`${Bt.default.vErrors}.length`);
  }
  function _(b) {
    var v;
    if (!o.opts.unevaluated)
      return;
    const w = (v = r == null ? void 0 : r.validate) === null || v === void 0 ? void 0 : v.evaluated;
    if (o.props !== !0)
      if (w && !w.dynamicProps)
        w.props !== void 0 && (o.props = Ur.mergeEvaluated.props(s, w.props, o.props));
      else {
        const $ = s.var("props", (0, Le._)`${b}.evaluated.props`);
        o.props = Ur.mergeEvaluated.props(s, $, o.props, Le.Name);
      }
    if (o.items !== !0)
      if (w && !w.dynamicItems)
        w.items !== void 0 && (o.items = Ur.mergeEvaluated.items(s, w.items, o.items));
      else {
        const $ = s.var("items", (0, Le._)`${b}.evaluated.items`);
        o.items = Ur.mergeEvaluated.items(s, $, o.items, Le.Name);
      }
  }
}
qt.callRef = cn;
qt.default = Jf;
Object.defineProperty(lo, "__esModule", { value: !0 });
const Xf = uo, Yf = qt, Qf = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  Xf.default,
  Yf.default
];
lo.default = Qf;
var fo = {}, ho = {};
Object.defineProperty(ho, "__esModule", { value: !0 });
const yn = ae(), _t = yn.operators, _n = {
  maximum: { okStr: "<=", ok: _t.LTE, fail: _t.GT },
  minimum: { okStr: ">=", ok: _t.GTE, fail: _t.LT },
  exclusiveMaximum: { okStr: "<", ok: _t.LT, fail: _t.GTE },
  exclusiveMinimum: { okStr: ">", ok: _t.GT, fail: _t.LTE }
}, Zf = {
  message: ({ keyword: e, schemaCode: t }) => (0, yn.str)`must be ${_n[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, yn._)`{comparison: ${_n[e].okStr}, limit: ${t}}`
}, xf = {
  keyword: Object.keys(_n),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Zf,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, yn._)`${r} ${_n[t].fail} ${n} || isNaN(${r})`);
  }
};
ho.default = xf;
var mo = {};
Object.defineProperty(mo, "__esModule", { value: !0 });
const vr = ae(), eh = {
  message: ({ schemaCode: e }) => (0, vr.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, vr._)`{multipleOf: ${e}}`
}, th = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: eh,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, o = s.opts.multipleOfPrecision, c = t.let("res"), i = o ? (0, vr._)`Math.abs(Math.round(${c}) - ${c}) > 1e-${o}` : (0, vr._)`${c} !== parseInt(${c})`;
    e.fail$data((0, vr._)`(${n} === 0 || (${c} = ${r}/${n}, ${i}))`);
  }
};
mo.default = th;
var po = {}, $o = {};
Object.defineProperty($o, "__esModule", { value: !0 });
function cl(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
$o.default = cl;
cl.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(po, "__esModule", { value: !0 });
const Lt = ae(), rh = W, nh = $o, sh = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Lt.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Lt._)`{limit: ${e}}`
}, oh = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: sh,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, o = t === "maxLength" ? Lt.operators.GT : Lt.operators.LT, c = s.opts.unicode === !1 ? (0, Lt._)`${r}.length` : (0, Lt._)`${(0, rh.useFunc)(e.gen, nh.default)}(${r})`;
    e.fail$data((0, Lt._)`${c} ${o} ${n}`);
  }
};
po.default = oh;
var yo = {};
Object.defineProperty(yo, "__esModule", { value: !0 });
const ah = ne, gn = ae(), ih = {
  message: ({ schemaCode: e }) => (0, gn.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, gn._)`{pattern: ${e}}`
}, ch = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: ih,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: o } = e, c = o.opts.unicodeRegExp ? "u" : "", i = r ? (0, gn._)`(new RegExp(${s}, ${c}))` : (0, ah.usePattern)(e, n);
    e.fail$data((0, gn._)`!${i}.test(${t})`);
  }
};
yo.default = ch;
var _o = {};
Object.defineProperty(_o, "__esModule", { value: !0 });
const Er = ae(), lh = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Er.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Er._)`{limit: ${e}}`
}, uh = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: lh,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? Er.operators.GT : Er.operators.LT;
    e.fail$data((0, Er._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
_o.default = uh;
var go = {};
Object.defineProperty(go, "__esModule", { value: !0 });
const hr = ne, wr = ae(), dh = W, fh = {
  message: ({ params: { missingProperty: e } }) => (0, wr.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, wr._)`{missingProperty: ${e}}`
}, hh = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: fh,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: o, it: c } = e, { opts: i } = c;
    if (!o && r.length === 0)
      return;
    const l = r.length >= i.loopRequired;
    if (c.allErrors ? d() : u(), i.strictRequired) {
      const _ = e.parentSchema.properties, { definedProperties: b } = e.it;
      for (const v of r)
        if ((_ == null ? void 0 : _[v]) === void 0 && !b.has(v)) {
          const w = c.schemaEnv.baseId + c.errSchemaPath, $ = `required property "${v}" is not defined at "${w}" (strictRequired)`;
          (0, dh.checkStrictMode)(c, $, c.opts.strictRequired);
        }
    }
    function d() {
      if (l || o)
        e.block$data(wr.nil, m);
      else
        for (const _ of r)
          (0, hr.checkReportMissingProp)(e, _);
    }
    function u() {
      const _ = t.let("missing");
      if (l || o) {
        const b = t.let("valid", !0);
        e.block$data(b, () => S(_, b)), e.ok(b);
      } else
        t.if((0, hr.checkMissingProp)(e, r, _)), (0, hr.reportMissingProp)(e, _), t.else();
    }
    function m() {
      t.forOf("prop", n, (_) => {
        e.setParams({ missingProperty: _ }), t.if((0, hr.noPropertyInData)(t, s, _, i.ownProperties), () => e.error());
      });
    }
    function S(_, b) {
      e.setParams({ missingProperty: _ }), t.forOf(_, n, () => {
        t.assign(b, (0, hr.propertyInData)(t, s, _, i.ownProperties)), t.if((0, wr.not)(b), () => {
          e.error(), t.break();
        });
      }, wr.nil);
    }
  }
};
go.default = hh;
var vo = {};
Object.defineProperty(vo, "__esModule", { value: !0 });
const br = ae(), mh = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, br.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, br._)`{limit: ${e}}`
}, ph = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: mh,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? br.operators.GT : br.operators.LT;
    e.fail$data((0, br._)`${r}.length ${s} ${n}`);
  }
};
vo.default = ph;
var Eo = {}, Ar = {};
Object.defineProperty(Ar, "__esModule", { value: !0 });
const ll = Tn;
ll.code = 'require("ajv/dist/runtime/equal").default';
Ar.default = ll;
Object.defineProperty(Eo, "__esModule", { value: !0 });
const es = Se, Oe = ae(), $h = W, yh = Ar, _h = {
  message: ({ params: { i: e, j: t } }) => (0, Oe.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Oe._)`{i: ${e}, j: ${t}}`
}, gh = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: _h,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: o, schemaCode: c, it: i } = e;
    if (!n && !s)
      return;
    const l = t.let("valid"), d = o.items ? (0, es.getSchemaTypes)(o.items) : [];
    e.block$data(l, u, (0, Oe._)`${c} === false`), e.ok(l);
    function u() {
      const b = t.let("i", (0, Oe._)`${r}.length`), v = t.let("j");
      e.setParams({ i: b, j: v }), t.assign(l, !0), t.if((0, Oe._)`${b} > 1`, () => (m() ? S : _)(b, v));
    }
    function m() {
      return d.length > 0 && !d.some((b) => b === "object" || b === "array");
    }
    function S(b, v) {
      const w = t.name("item"), $ = (0, es.checkDataTypes)(d, w, i.opts.strictNumbers, es.DataType.Wrong), R = t.const("indices", (0, Oe._)`{}`);
      t.for((0, Oe._)`;${b}--;`, () => {
        t.let(w, (0, Oe._)`${r}[${b}]`), t.if($, (0, Oe._)`continue`), d.length > 1 && t.if((0, Oe._)`typeof ${w} == "string"`, (0, Oe._)`${w} += "_"`), t.if((0, Oe._)`typeof ${R}[${w}] == "number"`, () => {
          t.assign(v, (0, Oe._)`${R}[${w}]`), e.error(), t.assign(l, !1).break();
        }).code((0, Oe._)`${R}[${w}] = ${b}`);
      });
    }
    function _(b, v) {
      const w = (0, $h.useFunc)(t, yh.default), $ = t.name("outer");
      t.label($).for((0, Oe._)`;${b}--;`, () => t.for((0, Oe._)`${v} = ${b}; ${v}--;`, () => t.if((0, Oe._)`${w}(${r}[${b}], ${r}[${v}])`, () => {
        e.error(), t.assign(l, !1).break($);
      })));
    }
  }
};
Eo.default = gh;
var wo = {};
Object.defineProperty(wo, "__esModule", { value: !0 });
const gs = ae(), vh = W, Eh = Ar, wh = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, gs._)`{allowedValue: ${e}}`
}, bh = {
  keyword: "const",
  $data: !0,
  error: wh,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: o } = e;
    n || o && typeof o == "object" ? e.fail$data((0, gs._)`!${(0, vh.useFunc)(t, Eh.default)}(${r}, ${s})`) : e.fail((0, gs._)`${o} !== ${r}`);
  }
};
wo.default = bh;
var bo = {};
Object.defineProperty(bo, "__esModule", { value: !0 });
const _r = ae(), Sh = W, Ph = Ar, Rh = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, _r._)`{allowedValues: ${e}}`
}, Oh = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: Rh,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: o, it: c } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const i = s.length >= c.opts.loopEnum;
    let l;
    const d = () => l ?? (l = (0, Sh.useFunc)(t, Ph.default));
    let u;
    if (i || n)
      u = t.let("valid"), e.block$data(u, m);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const _ = t.const("vSchema", o);
      u = (0, _r.or)(...s.map((b, v) => S(_, v)));
    }
    e.pass(u);
    function m() {
      t.assign(u, !1), t.forOf("v", o, (_) => t.if((0, _r._)`${d()}(${r}, ${_})`, () => t.assign(u, !0).break()));
    }
    function S(_, b) {
      const v = s[b];
      return typeof v == "object" && v !== null ? (0, _r._)`${d()}(${r}, ${_}[${b}])` : (0, _r._)`${r} === ${v}`;
    }
  }
};
bo.default = Oh;
Object.defineProperty(fo, "__esModule", { value: !0 });
const Nh = ho, Th = mo, Ih = po, jh = yo, Ah = _o, kh = go, Ch = vo, Dh = Eo, Mh = wo, Lh = bo, Vh = [
  // number
  Nh.default,
  Th.default,
  // string
  Ih.default,
  jh.default,
  // object
  Ah.default,
  kh.default,
  // array
  Ch.default,
  Dh.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  Mh.default,
  Lh.default
];
fo.default = Vh;
var So = {}, or = {};
Object.defineProperty(or, "__esModule", { value: !0 });
or.validateAdditionalItems = void 0;
const Vt = ae(), vs = W, Fh = {
  message: ({ params: { len: e } }) => (0, Vt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Vt._)`{limit: ${e}}`
}, zh = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: Fh,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, vs.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    ul(e, n);
  }
};
function ul(e, t) {
  const { gen: r, schema: n, data: s, keyword: o, it: c } = e;
  c.items = !0;
  const i = r.const("len", (0, Vt._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Vt._)`${i} <= ${t.length}`);
  else if (typeof n == "object" && !(0, vs.alwaysValidSchema)(c, n)) {
    const d = r.var("valid", (0, Vt._)`${i} <= ${t.length}`);
    r.if((0, Vt.not)(d), () => l(d)), e.ok(d);
  }
  function l(d) {
    r.forRange("i", t.length, i, (u) => {
      e.subschema({ keyword: o, dataProp: u, dataPropType: vs.Type.Num }, d), c.allErrors || r.if((0, Vt.not)(d), () => r.break());
    });
  }
}
or.validateAdditionalItems = ul;
or.default = zh;
var Po = {}, ar = {};
Object.defineProperty(ar, "__esModule", { value: !0 });
ar.validateTuple = void 0;
const si = ae(), ln = W, Uh = ne, qh = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return dl(e, "additionalItems", t);
    r.items = !0, !(0, ln.alwaysValidSchema)(r, t) && e.ok((0, Uh.validateArray)(e));
  }
};
function dl(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: o, keyword: c, it: i } = e;
  u(s), i.opts.unevaluated && r.length && i.items !== !0 && (i.items = ln.mergeEvaluated.items(n, r.length, i.items));
  const l = n.name("valid"), d = n.const("len", (0, si._)`${o}.length`);
  r.forEach((m, S) => {
    (0, ln.alwaysValidSchema)(i, m) || (n.if((0, si._)`${d} > ${S}`, () => e.subschema({
      keyword: c,
      schemaProp: S,
      dataProp: S
    }, l)), e.ok(l));
  });
  function u(m) {
    const { opts: S, errSchemaPath: _ } = i, b = r.length, v = b === m.minItems && (b === m.maxItems || m[t] === !1);
    if (S.strictTuples && !v) {
      const w = `"${c}" is ${b}-tuple, but minItems or maxItems/${t} are not specified or different at path "${_}"`;
      (0, ln.checkStrictMode)(i, w, S.strictTuples);
    }
  }
}
ar.validateTuple = dl;
ar.default = qh;
Object.defineProperty(Po, "__esModule", { value: !0 });
const Kh = ar, Gh = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, Kh.validateTuple)(e, "items")
};
Po.default = Gh;
var Ro = {};
Object.defineProperty(Ro, "__esModule", { value: !0 });
const oi = ae(), Bh = W, Hh = ne, Wh = or, Jh = {
  message: ({ params: { len: e } }) => (0, oi.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, oi._)`{limit: ${e}}`
}, Xh = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: Jh,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, Bh.alwaysValidSchema)(n, t) && (s ? (0, Wh.validateAdditionalItems)(e, s) : e.ok((0, Hh.validateArray)(e)));
  }
};
Ro.default = Xh;
var Oo = {};
Object.defineProperty(Oo, "__esModule", { value: !0 });
const Ge = ae(), qr = W, Yh = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ge.str)`must contain at least ${e} valid item(s)` : (0, Ge.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ge._)`{minContains: ${e}}` : (0, Ge._)`{minContains: ${e}, maxContains: ${t}}`
}, Qh = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: Yh,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: o } = e;
    let c, i;
    const { minContains: l, maxContains: d } = n;
    o.opts.next ? (c = l === void 0 ? 1 : l, i = d) : c = 1;
    const u = t.const("len", (0, Ge._)`${s}.length`);
    if (e.setParams({ min: c, max: i }), i === void 0 && c === 0) {
      (0, qr.checkStrictMode)(o, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (i !== void 0 && c > i) {
      (0, qr.checkStrictMode)(o, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, qr.alwaysValidSchema)(o, r)) {
      let v = (0, Ge._)`${u} >= ${c}`;
      i !== void 0 && (v = (0, Ge._)`${v} && ${u} <= ${i}`), e.pass(v);
      return;
    }
    o.items = !0;
    const m = t.name("valid");
    i === void 0 && c === 1 ? _(m, () => t.if(m, () => t.break())) : c === 0 ? (t.let(m, !0), i !== void 0 && t.if((0, Ge._)`${s}.length > 0`, S)) : (t.let(m, !1), S()), e.result(m, () => e.reset());
    function S() {
      const v = t.name("_valid"), w = t.let("count", 0);
      _(v, () => t.if(v, () => b(w)));
    }
    function _(v, w) {
      t.forRange("i", 0, u, ($) => {
        e.subschema({
          keyword: "contains",
          dataProp: $,
          dataPropType: qr.Type.Num,
          compositeRule: !0
        }, v), w();
      });
    }
    function b(v) {
      t.code((0, Ge._)`${v}++`), i === void 0 ? t.if((0, Ge._)`${v} >= ${c}`, () => t.assign(m, !0).break()) : (t.if((0, Ge._)`${v} > ${i}`, () => t.assign(m, !1).break()), c === 1 ? t.assign(m, !0) : t.if((0, Ge._)`${v} >= ${c}`, () => t.assign(m, !0)));
    }
  }
};
Oo.default = Qh;
var fl = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = ae(), r = W, n = ne;
  e.error = {
    message: ({ params: { property: l, depsCount: d, deps: u } }) => {
      const m = d === 1 ? "property" : "properties";
      return (0, t.str)`must have ${m} ${u} when property ${l} is present`;
    },
    params: ({ params: { property: l, depsCount: d, deps: u, missingProperty: m } }) => (0, t._)`{property: ${l},
    missingProperty: ${m},
    depsCount: ${d},
    deps: ${u}}`
    // TODO change to reference
  };
  const s = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(l) {
      const [d, u] = o(l);
      c(l, d), i(l, u);
    }
  };
  function o({ schema: l }) {
    const d = {}, u = {};
    for (const m in l) {
      if (m === "__proto__")
        continue;
      const S = Array.isArray(l[m]) ? d : u;
      S[m] = l[m];
    }
    return [d, u];
  }
  function c(l, d = l.schema) {
    const { gen: u, data: m, it: S } = l;
    if (Object.keys(d).length === 0)
      return;
    const _ = u.let("missing");
    for (const b in d) {
      const v = d[b];
      if (v.length === 0)
        continue;
      const w = (0, n.propertyInData)(u, m, b, S.opts.ownProperties);
      l.setParams({
        property: b,
        depsCount: v.length,
        deps: v.join(", ")
      }), S.allErrors ? u.if(w, () => {
        for (const $ of v)
          (0, n.checkReportMissingProp)(l, $);
      }) : (u.if((0, t._)`${w} && (${(0, n.checkMissingProp)(l, v, _)})`), (0, n.reportMissingProp)(l, _), u.else());
    }
  }
  e.validatePropertyDeps = c;
  function i(l, d = l.schema) {
    const { gen: u, data: m, keyword: S, it: _ } = l, b = u.name("valid");
    for (const v in d)
      (0, r.alwaysValidSchema)(_, d[v]) || (u.if(
        (0, n.propertyInData)(u, m, v, _.opts.ownProperties),
        () => {
          const w = l.subschema({ keyword: S, schemaProp: v }, b);
          l.mergeValidEvaluated(w, b);
        },
        () => u.var(b, !0)
        // TODO var
      ), l.ok(b));
  }
  e.validateSchemaDeps = i, e.default = s;
})(fl);
var No = {};
Object.defineProperty(No, "__esModule", { value: !0 });
const hl = ae(), Zh = W, xh = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, hl._)`{propertyName: ${e.propertyName}}`
}, em = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: xh,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, Zh.alwaysValidSchema)(s, r))
      return;
    const o = t.name("valid");
    t.forIn("key", n, (c) => {
      e.setParams({ propertyName: c }), e.subschema({
        keyword: "propertyNames",
        data: c,
        dataTypes: ["string"],
        propertyName: c,
        compositeRule: !0
      }, o), t.if((0, hl.not)(o), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(o);
  }
};
No.default = em;
var Dn = {};
Object.defineProperty(Dn, "__esModule", { value: !0 });
const Kr = ne, Qe = ae(), tm = ct, Gr = W, rm = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Qe._)`{additionalProperty: ${e.additionalProperty}}`
}, nm = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: rm,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: o, it: c } = e;
    if (!o)
      throw new Error("ajv implementation error");
    const { allErrors: i, opts: l } = c;
    if (c.props = !0, l.removeAdditional !== "all" && (0, Gr.alwaysValidSchema)(c, r))
      return;
    const d = (0, Kr.allSchemaProperties)(n.properties), u = (0, Kr.allSchemaProperties)(n.patternProperties);
    m(), e.ok((0, Qe._)`${o} === ${tm.default.errors}`);
    function m() {
      t.forIn("key", s, (w) => {
        !d.length && !u.length ? b(w) : t.if(S(w), () => b(w));
      });
    }
    function S(w) {
      let $;
      if (d.length > 8) {
        const R = (0, Gr.schemaRefOrVal)(c, n.properties, "properties");
        $ = (0, Kr.isOwnProperty)(t, R, w);
      } else d.length ? $ = (0, Qe.or)(...d.map((R) => (0, Qe._)`${w} === ${R}`)) : $ = Qe.nil;
      return u.length && ($ = (0, Qe.or)($, ...u.map((R) => (0, Qe._)`${(0, Kr.usePattern)(e, R)}.test(${w})`))), (0, Qe.not)($);
    }
    function _(w) {
      t.code((0, Qe._)`delete ${s}[${w}]`);
    }
    function b(w) {
      if (l.removeAdditional === "all" || l.removeAdditional && r === !1) {
        _(w);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: w }), e.error(), i || t.break();
        return;
      }
      if (typeof r == "object" && !(0, Gr.alwaysValidSchema)(c, r)) {
        const $ = t.name("valid");
        l.removeAdditional === "failing" ? (v(w, $, !1), t.if((0, Qe.not)($), () => {
          e.reset(), _(w);
        })) : (v(w, $), i || t.if((0, Qe.not)($), () => t.break()));
      }
    }
    function v(w, $, R) {
      const T = {
        keyword: "additionalProperties",
        dataProp: w,
        dataPropType: Gr.Type.Str
      };
      R === !1 && Object.assign(T, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(T, $);
    }
  }
};
Dn.default = nm;
var To = {};
Object.defineProperty(To, "__esModule", { value: !0 });
const sm = In(), ai = ne, ts = W, ii = Dn, om = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: o } = e;
    o.opts.removeAdditional === "all" && n.additionalProperties === void 0 && ii.default.code(new sm.KeywordCxt(o, ii.default, "additionalProperties"));
    const c = (0, ai.allSchemaProperties)(r);
    for (const m of c)
      o.definedProperties.add(m);
    o.opts.unevaluated && c.length && o.props !== !0 && (o.props = ts.mergeEvaluated.props(t, (0, ts.toHash)(c), o.props));
    const i = c.filter((m) => !(0, ts.alwaysValidSchema)(o, r[m]));
    if (i.length === 0)
      return;
    const l = t.name("valid");
    for (const m of i)
      d(m) ? u(m) : (t.if((0, ai.propertyInData)(t, s, m, o.opts.ownProperties)), u(m), o.allErrors || t.else().var(l, !0), t.endIf()), e.it.definedProperties.add(m), e.ok(l);
    function d(m) {
      return o.opts.useDefaults && !o.compositeRule && r[m].default !== void 0;
    }
    function u(m) {
      e.subschema({
        keyword: "properties",
        schemaProp: m,
        dataProp: m
      }, l);
    }
  }
};
To.default = om;
var Io = {};
Object.defineProperty(Io, "__esModule", { value: !0 });
const ci = ne, Br = ae(), li = W, ui = W, am = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: o } = e, { opts: c } = o, i = (0, ci.allSchemaProperties)(r), l = i.filter((v) => (0, li.alwaysValidSchema)(o, r[v]));
    if (i.length === 0 || l.length === i.length && (!o.opts.unevaluated || o.props === !0))
      return;
    const d = c.strictSchema && !c.allowMatchingProperties && s.properties, u = t.name("valid");
    o.props !== !0 && !(o.props instanceof Br.Name) && (o.props = (0, ui.evaluatedPropsToName)(t, o.props));
    const { props: m } = o;
    S();
    function S() {
      for (const v of i)
        d && _(v), o.allErrors ? b(v) : (t.var(u, !0), b(v), t.if(u));
    }
    function _(v) {
      for (const w in d)
        new RegExp(v).test(w) && (0, li.checkStrictMode)(o, `property ${w} matches pattern ${v} (use allowMatchingProperties)`);
    }
    function b(v) {
      t.forIn("key", n, (w) => {
        t.if((0, Br._)`${(0, ci.usePattern)(e, v)}.test(${w})`, () => {
          const $ = l.includes(v);
          $ || e.subschema({
            keyword: "patternProperties",
            schemaProp: v,
            dataProp: w,
            dataPropType: ui.Type.Str
          }, u), o.opts.unevaluated && m !== !0 ? t.assign((0, Br._)`${m}[${w}]`, !0) : !$ && !o.allErrors && t.if((0, Br.not)(u), () => t.break());
        });
      });
    }
  }
};
Io.default = am;
var jo = {};
Object.defineProperty(jo, "__esModule", { value: !0 });
const im = W, cm = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, im.alwaysValidSchema)(n, r)) {
      e.fail();
      return;
    }
    const s = t.name("valid");
    e.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, s), e.failResult(s, () => e.reset(), () => e.error());
  },
  error: { message: "must NOT be valid" }
};
jo.default = cm;
var Ao = {};
Object.defineProperty(Ao, "__esModule", { value: !0 });
const lm = ne, um = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: lm.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Ao.default = um;
var ko = {};
Object.defineProperty(ko, "__esModule", { value: !0 });
const un = ae(), dm = W, fm = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, un._)`{passingSchemas: ${e.passing}}`
}, hm = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: fm,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const o = r, c = t.let("valid", !1), i = t.let("passing", null), l = t.name("_valid");
    e.setParams({ passing: i }), t.block(d), e.result(c, () => e.reset(), () => e.error(!0));
    function d() {
      o.forEach((u, m) => {
        let S;
        (0, dm.alwaysValidSchema)(s, u) ? t.var(l, !0) : S = e.subschema({
          keyword: "oneOf",
          schemaProp: m,
          compositeRule: !0
        }, l), m > 0 && t.if((0, un._)`${l} && ${c}`).assign(c, !1).assign(i, (0, un._)`[${i}, ${m}]`).else(), t.if(l, () => {
          t.assign(c, !0), t.assign(i, m), S && e.mergeEvaluated(S, un.Name);
        });
      });
    }
  }
};
ko.default = hm;
var Co = {};
Object.defineProperty(Co, "__esModule", { value: !0 });
const mm = W, pm = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((o, c) => {
      if ((0, mm.alwaysValidSchema)(n, o))
        return;
      const i = e.subschema({ keyword: "allOf", schemaProp: c }, s);
      e.ok(s), e.mergeEvaluated(i);
    });
  }
};
Co.default = pm;
var Do = {};
Object.defineProperty(Do, "__esModule", { value: !0 });
const vn = ae(), ml = W, $m = {
  message: ({ params: e }) => (0, vn.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, vn._)`{failingKeyword: ${e.ifClause}}`
}, ym = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: $m,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, ml.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = di(n, "then"), o = di(n, "else");
    if (!s && !o)
      return;
    const c = t.let("valid", !0), i = t.name("_valid");
    if (l(), e.reset(), s && o) {
      const u = t.let("ifClause");
      e.setParams({ ifClause: u }), t.if(i, d("then", u), d("else", u));
    } else s ? t.if(i, d("then")) : t.if((0, vn.not)(i), d("else"));
    e.pass(c, () => e.error(!0));
    function l() {
      const u = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, i);
      e.mergeEvaluated(u);
    }
    function d(u, m) {
      return () => {
        const S = e.subschema({ keyword: u }, i);
        t.assign(c, i), e.mergeValidEvaluated(S, c), m ? t.assign(m, (0, vn._)`${u}`) : e.setParams({ ifClause: u });
      };
    }
  }
};
function di(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, ml.alwaysValidSchema)(e, r);
}
Do.default = ym;
var Mo = {};
Object.defineProperty(Mo, "__esModule", { value: !0 });
const _m = W, gm = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, _m.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Mo.default = gm;
Object.defineProperty(So, "__esModule", { value: !0 });
const vm = or, Em = Po, wm = ar, bm = Ro, Sm = Oo, Pm = fl, Rm = No, Om = Dn, Nm = To, Tm = Io, Im = jo, jm = Ao, Am = ko, km = Co, Cm = Do, Dm = Mo;
function Mm(e = !1) {
  const t = [
    // any
    Im.default,
    jm.default,
    Am.default,
    km.default,
    Cm.default,
    Dm.default,
    // object
    Rm.default,
    Om.default,
    Pm.default,
    Nm.default,
    Tm.default
  ];
  return e ? t.push(Em.default, bm.default) : t.push(vm.default, wm.default), t.push(Sm.default), t;
}
So.default = Mm;
var Lo = {}, Vo = {};
Object.defineProperty(Vo, "__esModule", { value: !0 });
const we = ae(), Lm = {
  message: ({ schemaCode: e }) => (0, we.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, we._)`{format: ${e}}`
}, Vm = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: Lm,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: o, schemaCode: c, it: i } = e, { opts: l, errSchemaPath: d, schemaEnv: u, self: m } = i;
    if (!l.validateFormats)
      return;
    s ? S() : _();
    function S() {
      const b = r.scopeValue("formats", {
        ref: m.formats,
        code: l.code.formats
      }), v = r.const("fDef", (0, we._)`${b}[${c}]`), w = r.let("fType"), $ = r.let("format");
      r.if((0, we._)`typeof ${v} == "object" && !(${v} instanceof RegExp)`, () => r.assign(w, (0, we._)`${v}.type || "string"`).assign($, (0, we._)`${v}.validate`), () => r.assign(w, (0, we._)`"string"`).assign($, v)), e.fail$data((0, we.or)(R(), T()));
      function R() {
        return l.strictSchema === !1 ? we.nil : (0, we._)`${c} && !${$}`;
      }
      function T() {
        const A = u.$async ? (0, we._)`(${v}.async ? await ${$}(${n}) : ${$}(${n}))` : (0, we._)`${$}(${n})`, C = (0, we._)`(typeof ${$} == "function" ? ${A} : ${$}.test(${n}))`;
        return (0, we._)`${$} && ${$} !== true && ${w} === ${t} && !${C}`;
      }
    }
    function _() {
      const b = m.formats[o];
      if (!b) {
        R();
        return;
      }
      if (b === !0)
        return;
      const [v, w, $] = T(b);
      v === t && e.pass(A());
      function R() {
        if (l.strictSchema === !1) {
          m.logger.warn(C());
          return;
        }
        throw new Error(C());
        function C() {
          return `unknown format "${o}" ignored in schema at path "${d}"`;
        }
      }
      function T(C) {
        const G = C instanceof RegExp ? (0, we.regexpCode)(C) : l.code.formats ? (0, we._)`${l.code.formats}${(0, we.getProperty)(o)}` : void 0, q = r.scopeValue("formats", { key: o, ref: C, code: G });
        return typeof C == "object" && !(C instanceof RegExp) ? [C.type || "string", C.validate, (0, we._)`${q}.validate`] : ["string", C, q];
      }
      function A() {
        if (typeof b == "object" && !(b instanceof RegExp) && b.async) {
          if (!u.$async)
            throw new Error("async format in sync schema");
          return (0, we._)`await ${$}(${n})`;
        }
        return typeof w == "function" ? (0, we._)`${$}(${n})` : (0, we._)`${$}.test(${n})`;
      }
    }
  }
};
Vo.default = Vm;
Object.defineProperty(Lo, "__esModule", { value: !0 });
const Fm = Vo, zm = [Fm.default];
Lo.default = zm;
var nr = {};
Object.defineProperty(nr, "__esModule", { value: !0 });
nr.contentVocabulary = nr.metadataVocabulary = void 0;
nr.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
nr.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(co, "__esModule", { value: !0 });
const Um = lo, qm = fo, Km = So, Gm = Lo, fi = nr, Bm = [
  Um.default,
  qm.default,
  (0, Km.default)(),
  Gm.default,
  fi.metadataVocabulary,
  fi.contentVocabulary
];
co.default = Bm;
var Fo = {}, Mn = {};
Object.defineProperty(Mn, "__esModule", { value: !0 });
Mn.DiscrError = void 0;
var hi;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(hi || (Mn.DiscrError = hi = {}));
Object.defineProperty(Fo, "__esModule", { value: !0 });
const Jt = ae(), Es = Mn, mi = Fe, Hm = jn(), Wm = W, Jm = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Es.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, Jt._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, Xm = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: Jm,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: s, it: o } = e, { oneOf: c } = s;
    if (!o.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const i = n.propertyName;
    if (typeof i != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!c)
      throw new Error("discriminator: requires oneOf keyword");
    const l = t.let("valid", !1), d = t.const("tag", (0, Jt._)`${r}${(0, Jt.getProperty)(i)}`);
    t.if((0, Jt._)`typeof ${d} == "string"`, () => u(), () => e.error(!1, { discrError: Es.DiscrError.Tag, tag: d, tagName: i })), e.ok(l);
    function u() {
      const _ = S();
      t.if(!1);
      for (const b in _)
        t.elseIf((0, Jt._)`${d} === ${b}`), t.assign(l, m(_[b]));
      t.else(), e.error(!1, { discrError: Es.DiscrError.Mapping, tag: d, tagName: i }), t.endIf();
    }
    function m(_) {
      const b = t.name("valid"), v = e.subschema({ keyword: "oneOf", schemaProp: _ }, b);
      return e.mergeEvaluated(v, Jt.Name), b;
    }
    function S() {
      var _;
      const b = {}, v = $(s);
      let w = !0;
      for (let A = 0; A < c.length; A++) {
        let C = c[A];
        if (C != null && C.$ref && !(0, Wm.schemaHasRulesButRef)(C, o.self.RULES)) {
          const q = C.$ref;
          if (C = mi.resolveRef.call(o.self, o.schemaEnv.root, o.baseId, q), C instanceof mi.SchemaEnv && (C = C.schema), C === void 0)
            throw new Hm.default(o.opts.uriResolver, o.baseId, q);
        }
        const G = (_ = C == null ? void 0 : C.properties) === null || _ === void 0 ? void 0 : _[i];
        if (typeof G != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${i}"`);
        w = w && (v || $(C)), R(G, A);
      }
      if (!w)
        throw new Error(`discriminator: "${i}" must be required`);
      return b;
      function $({ required: A }) {
        return Array.isArray(A) && A.includes(i);
      }
      function R(A, C) {
        if (A.const)
          T(A.const, C);
        else if (A.enum)
          for (const G of A.enum)
            T(G, C);
        else
          throw new Error(`discriminator: "properties/${i}" must have "const" or "enum"`);
      }
      function T(A, C) {
        if (typeof A != "string" || A in b)
          throw new Error(`discriminator: "${i}" values must be unique strings`);
        b[A] = C;
      }
    }
  }
};
Fo.default = Xm;
const Ym = "http://json-schema.org/draft-07/schema#", Qm = "http://json-schema.org/draft-07/schema#", Zm = "Core schema meta-schema", xm = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $ref: "#"
    }
  },
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    allOf: [
      {
        $ref: "#/definitions/nonNegativeInteger"
      },
      {
        default: 0
      }
    ]
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, ep = [
  "object",
  "boolean"
], tp = {
  $id: {
    type: "string",
    format: "uri-reference"
  },
  $schema: {
    type: "string",
    format: "uri"
  },
  $ref: {
    type: "string",
    format: "uri-reference"
  },
  $comment: {
    type: "string"
  },
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  readOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  additionalItems: {
    $ref: "#"
  },
  items: {
    anyOf: [
      {
        $ref: "#"
      },
      {
        $ref: "#/definitions/schemaArray"
      }
    ],
    default: !0
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  contains: {
    $ref: "#"
  },
  maxProperties: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/definitions/stringArray"
  },
  additionalProperties: {
    $ref: "#"
  },
  definitions: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependencies: {
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#"
        },
        {
          $ref: "#/definitions/stringArray"
        }
      ]
    }
  },
  propertyNames: {
    $ref: "#"
  },
  const: !0,
  enum: {
    type: "array",
    items: !0,
    minItems: 1,
    uniqueItems: !0
  },
  type: {
    anyOf: [
      {
        $ref: "#/definitions/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/definitions/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  format: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentEncoding: {
    type: "string"
  },
  if: {
    $ref: "#"
  },
  then: {
    $ref: "#"
  },
  else: {
    $ref: "#"
  },
  allOf: {
    $ref: "#/definitions/schemaArray"
  },
  anyOf: {
    $ref: "#/definitions/schemaArray"
  },
  oneOf: {
    $ref: "#/definitions/schemaArray"
  },
  not: {
    $ref: "#"
  }
}, rp = {
  $schema: Ym,
  $id: Qm,
  title: Zm,
  definitions: xm,
  type: ep,
  properties: tp,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = Cc, n = co, s = Fo, o = rp, c = ["/properties"], i = "http://json-schema.org/draft-07/schema";
  class l extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((b) => this.addVocabulary(b)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const b = this.opts.$data ? this.$dataMetaSchema(o, c) : o;
      this.addMetaSchema(b, i, !1), this.refs["http://json-schema.org/schema"] = i;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(i) ? i : void 0);
    }
  }
  t.Ajv = l, e.exports = t = l, e.exports.Ajv = l, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = l;
  var d = In();
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return d.KeywordCxt;
  } });
  var u = ae();
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return u._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return u.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return u.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return u.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return u.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return u.CodeGen;
  } });
  var m = ro();
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return m.default;
  } });
  var S = jn();
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return S.default;
  } });
})(ms, ms.exports);
var np = ms.exports, ws = { exports: {} }, pl = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(K, Q) {
    return { validate: K, compare: Q };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(o, c),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(l, d),
    "date-time": t(m, S),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri: v,
    "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
    // uri-template: https://tools.ietf.org/html/rfc6570
    "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
    // For the source: https://gist.github.com/dperini/729294
    // For test cases: https://mathiasbynens.be/demo/url-regex
    url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
    // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
    ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
    ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
    regex: oe,
    // uuid: http://tools.ietf.org/html/rfc4122
    uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
    // JSON-pointer: https://tools.ietf.org/html/rfc6901
    // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
    "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
    "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
    // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
    "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
    // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
    // byte: https://github.com/miguelmota/is-base64
    byte: $,
    // signed 32 bit integer
    int32: { type: "number", validate: A },
    // signed 64 bit integer
    int64: { type: "number", validate: C },
    // C-type float
    float: { type: "number", validate: G },
    // C-type double
    double: { type: "number", validate: G },
    // hint to the UI to hide input strings
    password: !0,
    // unchecked string payload
    binary: !0
  }, e.fastFormats = {
    ...e.fullFormats,
    date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, c),
    time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, d),
    "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, S),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
  }, e.formatNames = Object.keys(e.fullFormats);
  function r(K) {
    return K % 4 === 0 && (K % 100 !== 0 || K % 400 === 0);
  }
  const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, s = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function o(K) {
    const Q = n.exec(K);
    if (!Q)
      return !1;
    const x = +Q[1], X = +Q[2], Z = +Q[3];
    return X >= 1 && X <= 12 && Z >= 1 && Z <= (X === 2 && r(x) ? 29 : s[X]);
  }
  function c(K, Q) {
    if (K && Q)
      return K > Q ? 1 : K < Q ? -1 : 0;
  }
  const i = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
  function l(K, Q) {
    const x = i.exec(K);
    if (!x)
      return !1;
    const X = +x[1], Z = +x[2], L = +x[3], F = x[5];
    return (X <= 23 && Z <= 59 && L <= 59 || X === 23 && Z === 59 && L === 60) && (!Q || F !== "");
  }
  function d(K, Q) {
    if (!(K && Q))
      return;
    const x = i.exec(K), X = i.exec(Q);
    if (x && X)
      return K = x[1] + x[2] + x[3] + (x[4] || ""), Q = X[1] + X[2] + X[3] + (X[4] || ""), K > Q ? 1 : K < Q ? -1 : 0;
  }
  const u = /t|\s/i;
  function m(K) {
    const Q = K.split(u);
    return Q.length === 2 && o(Q[0]) && l(Q[1], !0);
  }
  function S(K, Q) {
    if (!(K && Q))
      return;
    const [x, X] = K.split(u), [Z, L] = Q.split(u), F = c(x, Z);
    if (F !== void 0)
      return F || d(X, L);
  }
  const _ = /\/|:/, b = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function v(K) {
    return _.test(K) && b.test(K);
  }
  const w = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function $(K) {
    return w.lastIndex = 0, w.test(K);
  }
  const R = -(2 ** 31), T = 2 ** 31 - 1;
  function A(K) {
    return Number.isInteger(K) && K <= T && K >= R;
  }
  function C(K) {
    return Number.isInteger(K);
  }
  function G() {
    return !0;
  }
  const q = /[^\\]\\Z/;
  function oe(K) {
    if (q.test(K))
      return !1;
    try {
      return new RegExp(K), !0;
    } catch {
      return !1;
    }
  }
})(pl);
var $l = {}, bs = { exports: {} }, yl = {}, ft = {}, Dt = {}, kr = {}, re = {}, Ir = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(R) {
      if (super(), !e.IDENTIFIER.test(R))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = R;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return !1;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  e.Name = r;
  class n extends t {
    constructor(R) {
      super(), this._items = typeof R == "string" ? [R] : R;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const R = this._items[0];
      return R === "" || R === '""';
    }
    get str() {
      var R;
      return (R = this._str) !== null && R !== void 0 ? R : this._str = this._items.reduce((T, A) => `${T}${A}`, "");
    }
    get names() {
      var R;
      return (R = this._names) !== null && R !== void 0 ? R : this._names = this._items.reduce((T, A) => (A instanceof r && (T[A.str] = (T[A.str] || 0) + 1), T), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function s($, ...R) {
    const T = [$[0]];
    let A = 0;
    for (; A < R.length; )
      i(T, R[A]), T.push($[++A]);
    return new n(T);
  }
  e._ = s;
  const o = new n("+");
  function c($, ...R) {
    const T = [_($[0])];
    let A = 0;
    for (; A < R.length; )
      T.push(o), i(T, R[A]), T.push(o, _($[++A]));
    return l(T), new n(T);
  }
  e.str = c;
  function i($, R) {
    R instanceof n ? $.push(...R._items) : R instanceof r ? $.push(R) : $.push(m(R));
  }
  e.addCodeArg = i;
  function l($) {
    let R = 1;
    for (; R < $.length - 1; ) {
      if ($[R] === o) {
        const T = d($[R - 1], $[R + 1]);
        if (T !== void 0) {
          $.splice(R - 1, 3, T);
          continue;
        }
        $[R++] = "+";
      }
      R++;
    }
  }
  function d($, R) {
    if (R === '""')
      return $;
    if ($ === '""')
      return R;
    if (typeof $ == "string")
      return R instanceof r || $[$.length - 1] !== '"' ? void 0 : typeof R != "string" ? `${$.slice(0, -1)}${R}"` : R[0] === '"' ? $.slice(0, -1) + R.slice(1) : void 0;
    if (typeof R == "string" && R[0] === '"' && !($ instanceof r))
      return `"${$}${R.slice(1)}`;
  }
  function u($, R) {
    return R.emptyStr() ? $ : $.emptyStr() ? R : c`${$}${R}`;
  }
  e.strConcat = u;
  function m($) {
    return typeof $ == "number" || typeof $ == "boolean" || $ === null ? $ : _(Array.isArray($) ? $.join(",") : $);
  }
  function S($) {
    return new n(_($));
  }
  e.stringify = S;
  function _($) {
    return JSON.stringify($).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = _;
  function b($) {
    return typeof $ == "string" && e.IDENTIFIER.test($) ? new n(`.${$}`) : s`[${$}]`;
  }
  e.getProperty = b;
  function v($) {
    if (typeof $ == "string" && e.IDENTIFIER.test($))
      return new n(`${$}`);
    throw new Error(`CodeGen: invalid export name: ${$}, use explicit $id name mapping`);
  }
  e.getEsmExportName = v;
  function w($) {
    return new n($.toString());
  }
  e.regexpCode = w;
})(Ir);
var Ss = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = Ir;
  class r extends Error {
    constructor(d) {
      super(`CodeGen: "code" for ${d} not defined`), this.value = d.value;
    }
  }
  var n;
  (function(l) {
    l[l.Started = 0] = "Started", l[l.Completed = 1] = "Completed";
  })(n || (e.UsedValueState = n = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class s {
    constructor({ prefixes: d, parent: u } = {}) {
      this._names = {}, this._prefixes = d, this._parent = u;
    }
    toName(d) {
      return d instanceof t.Name ? d : this.name(d);
    }
    name(d) {
      return new t.Name(this._newName(d));
    }
    _newName(d) {
      const u = this._names[d] || this._nameGroup(d);
      return `${d}${u.index++}`;
    }
    _nameGroup(d) {
      var u, m;
      if (!((m = (u = this._parent) === null || u === void 0 ? void 0 : u._prefixes) === null || m === void 0) && m.has(d) || this._prefixes && !this._prefixes.has(d))
        throw new Error(`CodeGen: prefix "${d}" is not allowed in this scope`);
      return this._names[d] = { prefix: d, index: 0 };
    }
  }
  e.Scope = s;
  class o extends t.Name {
    constructor(d, u) {
      super(u), this.prefix = d;
    }
    setValue(d, { property: u, itemIndex: m }) {
      this.value = d, this.scopePath = (0, t._)`.${new t.Name(u)}[${m}]`;
    }
  }
  e.ValueScopeName = o;
  const c = (0, t._)`\n`;
  class i extends s {
    constructor(d) {
      super(d), this._values = {}, this._scope = d.scope, this.opts = { ...d, _n: d.lines ? c : t.nil };
    }
    get() {
      return this._scope;
    }
    name(d) {
      return new o(d, this._newName(d));
    }
    value(d, u) {
      var m;
      if (u.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const S = this.toName(d), { prefix: _ } = S, b = (m = u.key) !== null && m !== void 0 ? m : u.ref;
      let v = this._values[_];
      if (v) {
        const R = v.get(b);
        if (R)
          return R;
      } else
        v = this._values[_] = /* @__PURE__ */ new Map();
      v.set(b, S);
      const w = this._scope[_] || (this._scope[_] = []), $ = w.length;
      return w[$] = u.ref, S.setValue(u, { property: _, itemIndex: $ }), S;
    }
    getValue(d, u) {
      const m = this._values[d];
      if (m)
        return m.get(u);
    }
    scopeRefs(d, u = this._values) {
      return this._reduceValues(u, (m) => {
        if (m.scopePath === void 0)
          throw new Error(`CodeGen: name "${m}" has no value`);
        return (0, t._)`${d}${m.scopePath}`;
      });
    }
    scopeCode(d = this._values, u, m) {
      return this._reduceValues(d, (S) => {
        if (S.value === void 0)
          throw new Error(`CodeGen: name "${S}" has no value`);
        return S.value.code;
      }, u, m);
    }
    _reduceValues(d, u, m = {}, S) {
      let _ = t.nil;
      for (const b in d) {
        const v = d[b];
        if (!v)
          continue;
        const w = m[b] = m[b] || /* @__PURE__ */ new Map();
        v.forEach(($) => {
          if (w.has($))
            return;
          w.set($, n.Started);
          let R = u($);
          if (R) {
            const T = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            _ = (0, t._)`${_}${T} ${$} = ${R};${this.opts._n}`;
          } else if (R = S == null ? void 0 : S($))
            _ = (0, t._)`${_}${R}${this.opts._n}`;
          else
            throw new r($);
          w.set($, n.Completed);
        });
      }
      return _;
    }
  }
  e.ValueScope = i;
})(Ss);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Ir, r = Ss;
  var n = Ir;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return n._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return n.str;
  } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
    return n.strConcat;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return n.nil;
  } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
    return n.getProperty;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return n.stringify;
  } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
    return n.regexpCode;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return n.Name;
  } });
  var s = Ss;
  Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
    return s.Scope;
  } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
    return s.ValueScope;
  } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
    return s.ValueScopeName;
  } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
    return s.varKinds;
  } }), e.operators = {
    GT: new t._Code(">"),
    GTE: new t._Code(">="),
    LT: new t._Code("<"),
    LTE: new t._Code("<="),
    EQ: new t._Code("==="),
    NEQ: new t._Code("!=="),
    NOT: new t._Code("!"),
    OR: new t._Code("||"),
    AND: new t._Code("&&"),
    ADD: new t._Code("+")
  };
  class o {
    optimizeNodes() {
      return this;
    }
    optimizeNames(a, f) {
      return this;
    }
  }
  class c extends o {
    constructor(a, f, N) {
      super(), this.varKind = a, this.name = f, this.rhs = N;
    }
    render({ es5: a, _n: f }) {
      const N = a ? r.varKinds.var : this.varKind, D = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${N} ${this.name}${D};` + f;
    }
    optimizeNames(a, f) {
      if (a[this.name.str])
        return this.rhs && (this.rhs = L(this.rhs, a, f)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class i extends o {
    constructor(a, f, N) {
      super(), this.lhs = a, this.rhs = f, this.sideEffects = N;
    }
    render({ _n: a }) {
      return `${this.lhs} = ${this.rhs};` + a;
    }
    optimizeNames(a, f) {
      if (!(this.lhs instanceof t.Name && !a[this.lhs.str] && !this.sideEffects))
        return this.rhs = L(this.rhs, a, f), this;
    }
    get names() {
      const a = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return Z(a, this.rhs);
    }
  }
  class l extends i {
    constructor(a, f, N, D) {
      super(a, N, D), this.op = f;
    }
    render({ _n: a }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + a;
    }
  }
  class d extends o {
    constructor(a) {
      super(), this.label = a, this.names = {};
    }
    render({ _n: a }) {
      return `${this.label}:` + a;
    }
  }
  class u extends o {
    constructor(a) {
      super(), this.label = a, this.names = {};
    }
    render({ _n: a }) {
      return `break${this.label ? ` ${this.label}` : ""};` + a;
    }
  }
  class m extends o {
    constructor(a) {
      super(), this.error = a;
    }
    render({ _n: a }) {
      return `throw ${this.error};` + a;
    }
    get names() {
      return this.error.names;
    }
  }
  class S extends o {
    constructor(a) {
      super(), this.code = a;
    }
    render({ _n: a }) {
      return `${this.code};` + a;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(a, f) {
      return this.code = L(this.code, a, f), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class _ extends o {
    constructor(a = []) {
      super(), this.nodes = a;
    }
    render(a) {
      return this.nodes.reduce((f, N) => f + N.render(a), "");
    }
    optimizeNodes() {
      const { nodes: a } = this;
      let f = a.length;
      for (; f--; ) {
        const N = a[f].optimizeNodes();
        Array.isArray(N) ? a.splice(f, 1, ...N) : N ? a[f] = N : a.splice(f, 1);
      }
      return a.length > 0 ? this : void 0;
    }
    optimizeNames(a, f) {
      const { nodes: N } = this;
      let D = N.length;
      for (; D--; ) {
        const M = N[D];
        M.optimizeNames(a, f) || (F(a, M.names), N.splice(D, 1));
      }
      return N.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((a, f) => X(a, f.names), {});
    }
  }
  class b extends _ {
    render(a) {
      return "{" + a._n + super.render(a) + "}" + a._n;
    }
  }
  class v extends _ {
  }
  class w extends b {
  }
  w.kind = "else";
  class $ extends b {
    constructor(a, f) {
      super(f), this.condition = a;
    }
    render(a) {
      let f = `if(${this.condition})` + super.render(a);
      return this.else && (f += "else " + this.else.render(a)), f;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const a = this.condition;
      if (a === !0)
        return this.nodes;
      let f = this.else;
      if (f) {
        const N = f.optimizeNodes();
        f = this.else = Array.isArray(N) ? new w(N) : N;
      }
      if (f)
        return a === !1 ? f instanceof $ ? f : f.nodes : this.nodes.length ? this : new $(B(a), f instanceof $ ? [f] : f.nodes);
      if (!(a === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(a, f) {
      var N;
      if (this.else = (N = this.else) === null || N === void 0 ? void 0 : N.optimizeNames(a, f), !!(super.optimizeNames(a, f) || this.else))
        return this.condition = L(this.condition, a, f), this;
    }
    get names() {
      const a = super.names;
      return Z(a, this.condition), this.else && X(a, this.else.names), a;
    }
  }
  $.kind = "if";
  class R extends b {
  }
  R.kind = "for";
  class T extends R {
    constructor(a) {
      super(), this.iteration = a;
    }
    render(a) {
      return `for(${this.iteration})` + super.render(a);
    }
    optimizeNames(a, f) {
      if (super.optimizeNames(a, f))
        return this.iteration = L(this.iteration, a, f), this;
    }
    get names() {
      return X(super.names, this.iteration.names);
    }
  }
  class A extends R {
    constructor(a, f, N, D) {
      super(), this.varKind = a, this.name = f, this.from = N, this.to = D;
    }
    render(a) {
      const f = a.es5 ? r.varKinds.var : this.varKind, { name: N, from: D, to: M } = this;
      return `for(${f} ${N}=${D}; ${N}<${M}; ${N}++)` + super.render(a);
    }
    get names() {
      const a = Z(super.names, this.from);
      return Z(a, this.to);
    }
  }
  class C extends R {
    constructor(a, f, N, D) {
      super(), this.loop = a, this.varKind = f, this.name = N, this.iterable = D;
    }
    render(a) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(a);
    }
    optimizeNames(a, f) {
      if (super.optimizeNames(a, f))
        return this.iterable = L(this.iterable, a, f), this;
    }
    get names() {
      return X(super.names, this.iterable.names);
    }
  }
  class G extends b {
    constructor(a, f, N) {
      super(), this.name = a, this.args = f, this.async = N;
    }
    render(a) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(a);
    }
  }
  G.kind = "func";
  class q extends _ {
    render(a) {
      return "return " + super.render(a);
    }
  }
  q.kind = "return";
  class oe extends b {
    render(a) {
      let f = "try" + super.render(a);
      return this.catch && (f += this.catch.render(a)), this.finally && (f += this.finally.render(a)), f;
    }
    optimizeNodes() {
      var a, f;
      return super.optimizeNodes(), (a = this.catch) === null || a === void 0 || a.optimizeNodes(), (f = this.finally) === null || f === void 0 || f.optimizeNodes(), this;
    }
    optimizeNames(a, f) {
      var N, D;
      return super.optimizeNames(a, f), (N = this.catch) === null || N === void 0 || N.optimizeNames(a, f), (D = this.finally) === null || D === void 0 || D.optimizeNames(a, f), this;
    }
    get names() {
      const a = super.names;
      return this.catch && X(a, this.catch.names), this.finally && X(a, this.finally.names), a;
    }
  }
  class K extends b {
    constructor(a) {
      super(), this.error = a;
    }
    render(a) {
      return `catch(${this.error})` + super.render(a);
    }
  }
  K.kind = "catch";
  class Q extends b {
    render(a) {
      return "finally" + super.render(a);
    }
  }
  Q.kind = "finally";
  class x {
    constructor(a, f = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...f, _n: f.lines ? `
` : "" }, this._extScope = a, this._scope = new r.Scope({ parent: a }), this._nodes = [new v()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(a) {
      return this._scope.name(a);
    }
    // reserves unique name in the external scope
    scopeName(a) {
      return this._extScope.name(a);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(a, f) {
      const N = this._extScope.value(a, f);
      return (this._values[N.prefix] || (this._values[N.prefix] = /* @__PURE__ */ new Set())).add(N), N;
    }
    getScopeValue(a, f) {
      return this._extScope.getValue(a, f);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(a) {
      return this._extScope.scopeRefs(a, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(a, f, N, D) {
      const M = this._scope.toName(f);
      return N !== void 0 && D && (this._constants[M.str] = N), this._leafNode(new c(a, M, N)), M;
    }
    // `const` declaration (`var` in es5 mode)
    const(a, f, N) {
      return this._def(r.varKinds.const, a, f, N);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(a, f, N) {
      return this._def(r.varKinds.let, a, f, N);
    }
    // `var` declaration with optional assignment
    var(a, f, N) {
      return this._def(r.varKinds.var, a, f, N);
    }
    // assignment code
    assign(a, f, N) {
      return this._leafNode(new i(a, f, N));
    }
    // `+=` code
    add(a, f) {
      return this._leafNode(new l(a, e.operators.ADD, f));
    }
    // appends passed SafeExpr to code or executes Block
    code(a) {
      return typeof a == "function" ? a() : a !== t.nil && this._leafNode(new S(a)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...a) {
      const f = ["{"];
      for (const [N, D] of a)
        f.length > 1 && f.push(","), f.push(N), (N !== D || this.opts.es5) && (f.push(":"), (0, t.addCodeArg)(f, D));
      return f.push("}"), new t._Code(f);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(a, f, N) {
      if (this._blockNode(new $(a)), f && N)
        this.code(f).else().code(N).endIf();
      else if (f)
        this.code(f).endIf();
      else if (N)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(a) {
      return this._elseNode(new $(a));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new w());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode($, w);
    }
    _for(a, f) {
      return this._blockNode(a), f && this.code(f).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(a, f) {
      return this._for(new T(a), f);
    }
    // `for` statement for a range of values
    forRange(a, f, N, D, M = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const Y = this._scope.toName(a);
      return this._for(new A(M, Y, f, N), () => D(Y));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(a, f, N, D = r.varKinds.const) {
      const M = this._scope.toName(a);
      if (this.opts.es5) {
        const Y = f instanceof t.Name ? f : this.var("_arr", f);
        return this.forRange("_i", 0, (0, t._)`${Y}.length`, (H) => {
          this.var(M, (0, t._)`${Y}[${H}]`), N(M);
        });
      }
      return this._for(new C("of", D, M, f), () => N(M));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(a, f, N, D = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(a, (0, t._)`Object.keys(${f})`, N);
      const M = this._scope.toName(a);
      return this._for(new C("in", D, M, f), () => N(M));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(R);
    }
    // `label` statement
    label(a) {
      return this._leafNode(new d(a));
    }
    // `break` statement
    break(a) {
      return this._leafNode(new u(a));
    }
    // `return` statement
    return(a) {
      const f = new q();
      if (this._blockNode(f), this.code(a), f.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(q);
    }
    // `try` statement
    try(a, f, N) {
      if (!f && !N)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const D = new oe();
      if (this._blockNode(D), this.code(a), f) {
        const M = this.name("e");
        this._currNode = D.catch = new K(M), f(M);
      }
      return N && (this._currNode = D.finally = new Q(), this.code(N)), this._endBlockNode(K, Q);
    }
    // `throw` statement
    throw(a) {
      return this._leafNode(new m(a));
    }
    // start self-balancing block
    block(a, f) {
      return this._blockStarts.push(this._nodes.length), a && this.code(a).endBlock(f), this;
    }
    // end the current self-balancing block
    endBlock(a) {
      const f = this._blockStarts.pop();
      if (f === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const N = this._nodes.length - f;
      if (N < 0 || a !== void 0 && N !== a)
        throw new Error(`CodeGen: wrong number of nodes: ${N} vs ${a} expected`);
      return this._nodes.length = f, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(a, f = t.nil, N, D) {
      return this._blockNode(new G(a, f, N)), D && this.code(D).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(G);
    }
    optimize(a = 1) {
      for (; a-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(a) {
      return this._currNode.nodes.push(a), this;
    }
    _blockNode(a) {
      this._currNode.nodes.push(a), this._nodes.push(a);
    }
    _endBlockNode(a, f) {
      const N = this._currNode;
      if (N instanceof a || f && N instanceof f)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${f ? `${a.kind}/${f.kind}` : a.kind}"`);
    }
    _elseNode(a) {
      const f = this._currNode;
      if (!(f instanceof $))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = f.else = a, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const a = this._nodes;
      return a[a.length - 1];
    }
    set _currNode(a) {
      const f = this._nodes;
      f[f.length - 1] = a;
    }
  }
  e.CodeGen = x;
  function X(p, a) {
    for (const f in a)
      p[f] = (p[f] || 0) + (a[f] || 0);
    return p;
  }
  function Z(p, a) {
    return a instanceof t._CodeOrName ? X(p, a.names) : p;
  }
  function L(p, a, f) {
    if (p instanceof t.Name)
      return N(p);
    if (!D(p))
      return p;
    return new t._Code(p._items.reduce((M, Y) => (Y instanceof t.Name && (Y = N(Y)), Y instanceof t._Code ? M.push(...Y._items) : M.push(Y), M), []));
    function N(M) {
      const Y = f[M.str];
      return Y === void 0 || a[M.str] !== 1 ? M : (delete a[M.str], Y);
    }
    function D(M) {
      return M instanceof t._Code && M._items.some((Y) => Y instanceof t.Name && a[Y.str] === 1 && f[Y.str] !== void 0);
    }
  }
  function F(p, a) {
    for (const f in a)
      p[f] = (p[f] || 0) - (a[f] || 0);
  }
  function B(p) {
    return typeof p == "boolean" || typeof p == "number" || p === null ? !p : (0, t._)`!${E(p)}`;
  }
  e.not = B;
  const z = h(e.operators.AND);
  function O(...p) {
    return p.reduce(z);
  }
  e.and = O;
  const I = h(e.operators.OR);
  function y(...p) {
    return p.reduce(I);
  }
  e.or = y;
  function h(p) {
    return (a, f) => a === t.nil ? f : f === t.nil ? a : (0, t._)`${E(a)} ${p} ${E(f)}`;
  }
  function E(p) {
    return p instanceof t.Name ? p : (0, t._)`(${p})`;
  }
})(re);
var J = {};
Object.defineProperty(J, "__esModule", { value: !0 });
J.checkStrictMode = J.getErrorPath = J.Type = J.useFunc = J.setEvaluated = J.evaluatedPropsToName = J.mergeEvaluated = J.eachItem = J.unescapeJsonPointer = J.escapeJsonPointer = J.escapeFragment = J.unescapeFragment = J.schemaRefOrVal = J.schemaHasRulesButRef = J.schemaHasRules = J.checkUnknownRules = J.alwaysValidSchema = J.toHash = void 0;
const pe = re, sp = Ir;
function op(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
J.toHash = op;
function ap(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (_l(e, t), !gl(t, e.self.RULES.all));
}
J.alwaysValidSchema = ap;
function _l(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const o in t)
    s[o] || wl(e, `unknown keyword: "${o}"`);
}
J.checkUnknownRules = _l;
function gl(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
J.schemaHasRules = gl;
function ip(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
J.schemaHasRulesButRef = ip;
function cp({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, pe._)`${r}`;
  }
  return (0, pe._)`${e}${t}${(0, pe.getProperty)(n)}`;
}
J.schemaRefOrVal = cp;
function lp(e) {
  return vl(decodeURIComponent(e));
}
J.unescapeFragment = lp;
function up(e) {
  return encodeURIComponent(zo(e));
}
J.escapeFragment = up;
function zo(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
J.escapeJsonPointer = zo;
function vl(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
J.unescapeJsonPointer = vl;
function dp(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
J.eachItem = dp;
function pi({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, o, c, i) => {
    const l = c === void 0 ? o : c instanceof pe.Name ? (o instanceof pe.Name ? e(s, o, c) : t(s, o, c), c) : o instanceof pe.Name ? (t(s, c, o), o) : r(o, c);
    return i === pe.Name && !(l instanceof pe.Name) ? n(s, l) : l;
  };
}
J.mergeEvaluated = {
  props: pi({
    mergeNames: (e, t, r) => e.if((0, pe._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, pe._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, pe._)`${r} || {}`).code((0, pe._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, pe._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, pe._)`${r} || {}`), Uo(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: El
  }),
  items: pi({
    mergeNames: (e, t, r) => e.if((0, pe._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, pe._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, pe._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, pe._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function El(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, pe._)`{}`);
  return t !== void 0 && Uo(e, r, t), r;
}
J.evaluatedPropsToName = El;
function Uo(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, pe._)`${t}${(0, pe.getProperty)(n)}`, !0));
}
J.setEvaluated = Uo;
const $i = {};
function fp(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: $i[t.code] || ($i[t.code] = new sp._Code(t.code))
  });
}
J.useFunc = fp;
var Ps;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Ps || (J.Type = Ps = {}));
function hp(e, t, r) {
  if (e instanceof pe.Name) {
    const n = t === Ps.Num;
    return r ? n ? (0, pe._)`"[" + ${e} + "]"` : (0, pe._)`"['" + ${e} + "']"` : n ? (0, pe._)`"/" + ${e}` : (0, pe._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, pe.getProperty)(e).toString() : "/" + zo(e);
}
J.getErrorPath = hp;
function wl(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
J.checkStrictMode = wl;
var Hr = {}, yi;
function Nt() {
  if (yi) return Hr;
  yi = 1, Object.defineProperty(Hr, "__esModule", { value: !0 });
  const e = re, t = {
    // validation function arguments
    data: new e.Name("data"),
    // data passed to validation function
    // args passed from referencing schema
    valCxt: new e.Name("valCxt"),
    // validation/data context - should not be used directly, it is destructured to the names below
    instancePath: new e.Name("instancePath"),
    parentData: new e.Name("parentData"),
    parentDataProperty: new e.Name("parentDataProperty"),
    rootData: new e.Name("rootData"),
    // root data - same as the data passed to the first/top validation function
    dynamicAnchors: new e.Name("dynamicAnchors"),
    // used to support recursiveRef and dynamicRef
    // function scoped variables
    vErrors: new e.Name("vErrors"),
    // null or array of validation errors
    errors: new e.Name("errors"),
    // counter of validation errors
    this: new e.Name("this"),
    // "globals"
    self: new e.Name("self"),
    scope: new e.Name("scope"),
    // JTD serialize/parse name for JSON string and position
    json: new e.Name("json"),
    jsonPos: new e.Name("jsonPos"),
    jsonLen: new e.Name("jsonLen"),
    jsonPart: new e.Name("jsonPart")
  };
  return Hr.default = t, Hr;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = re, r = J, n = Nt();
  e.keywordError = {
    message: ({ keyword: w }) => (0, t.str)`must pass "${w}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: w, schemaType: $ }) => $ ? (0, t.str)`"${w}" keyword must be ${$} ($data)` : (0, t.str)`"${w}" keyword is invalid ($data)`
  };
  function s(w, $ = e.keywordError, R, T) {
    const { it: A } = w, { gen: C, compositeRule: G, allErrors: q } = A, oe = m(w, $, R);
    T ?? (G || q) ? l(C, oe) : d(A, (0, t._)`[${oe}]`);
  }
  e.reportError = s;
  function o(w, $ = e.keywordError, R) {
    const { it: T } = w, { gen: A, compositeRule: C, allErrors: G } = T, q = m(w, $, R);
    l(A, q), C || G || d(T, n.default.vErrors);
  }
  e.reportExtraError = o;
  function c(w, $) {
    w.assign(n.default.errors, $), w.if((0, t._)`${n.default.vErrors} !== null`, () => w.if($, () => w.assign((0, t._)`${n.default.vErrors}.length`, $), () => w.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = c;
  function i({ gen: w, keyword: $, schemaValue: R, data: T, errsCount: A, it: C }) {
    if (A === void 0)
      throw new Error("ajv implementation error");
    const G = w.name("err");
    w.forRange("i", A, n.default.errors, (q) => {
      w.const(G, (0, t._)`${n.default.vErrors}[${q}]`), w.if((0, t._)`${G}.instancePath === undefined`, () => w.assign((0, t._)`${G}.instancePath`, (0, t.strConcat)(n.default.instancePath, C.errorPath))), w.assign((0, t._)`${G}.schemaPath`, (0, t.str)`${C.errSchemaPath}/${$}`), C.opts.verbose && (w.assign((0, t._)`${G}.schema`, R), w.assign((0, t._)`${G}.data`, T));
    });
  }
  e.extendErrors = i;
  function l(w, $) {
    const R = w.const("err", $);
    w.if((0, t._)`${n.default.vErrors} === null`, () => w.assign(n.default.vErrors, (0, t._)`[${R}]`), (0, t._)`${n.default.vErrors}.push(${R})`), w.code((0, t._)`${n.default.errors}++`);
  }
  function d(w, $) {
    const { gen: R, validateName: T, schemaEnv: A } = w;
    A.$async ? R.throw((0, t._)`new ${w.ValidationError}(${$})`) : (R.assign((0, t._)`${T}.errors`, $), R.return(!1));
  }
  const u = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function m(w, $, R) {
    const { createErrors: T } = w.it;
    return T === !1 ? (0, t._)`{}` : S(w, $, R);
  }
  function S(w, $, R = {}) {
    const { gen: T, it: A } = w, C = [
      _(A, R),
      b(w, R)
    ];
    return v(w, $, C), T.object(...C);
  }
  function _({ errorPath: w }, { instancePath: $ }) {
    const R = $ ? (0, t.str)`${w}${(0, r.getErrorPath)($, r.Type.Str)}` : w;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, R)];
  }
  function b({ keyword: w, it: { errSchemaPath: $ } }, { schemaPath: R, parentSchema: T }) {
    let A = T ? $ : (0, t.str)`${$}/${w}`;
    return R && (A = (0, t.str)`${A}${(0, r.getErrorPath)(R, r.Type.Str)}`), [u.schemaPath, A];
  }
  function v(w, { params: $, message: R }, T) {
    const { keyword: A, data: C, schemaValue: G, it: q } = w, { opts: oe, propertyName: K, topSchemaRef: Q, schemaPath: x } = q;
    T.push([u.keyword, A], [u.params, typeof $ == "function" ? $(w) : $ || (0, t._)`{}`]), oe.messages && T.push([u.message, typeof R == "function" ? R(w) : R]), oe.verbose && T.push([u.schema, G], [u.parentSchema, (0, t._)`${Q}${x}`], [n.default.data, C]), K && T.push([u.propertyName, K]);
  }
})(kr);
var _i;
function mp() {
  if (_i) return Dt;
  _i = 1, Object.defineProperty(Dt, "__esModule", { value: !0 }), Dt.boolOrEmptySchema = Dt.topBoolOrEmptySchema = void 0;
  const e = kr, t = re, r = Nt(), n = {
    message: "boolean schema is false"
  };
  function s(i) {
    const { gen: l, schema: d, validateName: u } = i;
    d === !1 ? c(i, !1) : typeof d == "object" && d.$async === !0 ? l.return(r.default.data) : (l.assign((0, t._)`${u}.errors`, null), l.return(!0));
  }
  Dt.topBoolOrEmptySchema = s;
  function o(i, l) {
    const { gen: d, schema: u } = i;
    u === !1 ? (d.var(l, !1), c(i)) : d.var(l, !0);
  }
  Dt.boolOrEmptySchema = o;
  function c(i, l) {
    const { gen: d, data: u } = i, m = {
      gen: d,
      keyword: "false schema",
      data: u,
      schema: !1,
      schemaCode: !1,
      schemaValue: !1,
      params: {},
      it: i
    };
    (0, e.reportError)(m, n, void 0, l);
  }
  return Dt;
}
var Pe = {}, Kt = {};
Object.defineProperty(Kt, "__esModule", { value: !0 });
Kt.getRules = Kt.isJSONType = void 0;
const pp = ["string", "number", "integer", "boolean", "null", "object", "array"], $p = new Set(pp);
function yp(e) {
  return typeof e == "string" && $p.has(e);
}
Kt.isJSONType = yp;
function _p() {
  const e = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...e, integer: !0, boolean: !0, null: !0 },
    rules: [{ rules: [] }, e.number, e.string, e.array, e.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
Kt.getRules = _p;
var ht = {}, gi;
function bl() {
  if (gi) return ht;
  gi = 1, Object.defineProperty(ht, "__esModule", { value: !0 }), ht.shouldUseRule = ht.shouldUseGroup = ht.schemaHasRulesForType = void 0;
  function e({ schema: n, self: s }, o) {
    const c = s.RULES.types[o];
    return c && c !== !0 && t(n, c);
  }
  ht.schemaHasRulesForType = e;
  function t(n, s) {
    return s.rules.some((o) => r(n, o));
  }
  ht.shouldUseGroup = t;
  function r(n, s) {
    var o;
    return n[s.keyword] !== void 0 || ((o = s.definition.implements) === null || o === void 0 ? void 0 : o.some((c) => n[c] !== void 0));
  }
  return ht.shouldUseRule = r, ht;
}
Object.defineProperty(Pe, "__esModule", { value: !0 });
Pe.reportTypeError = Pe.checkDataTypes = Pe.checkDataType = Pe.coerceAndCheckDataType = Pe.getJSONTypes = Pe.getSchemaTypes = Pe.DataType = void 0;
const gp = Kt, vp = bl(), Ep = kr, te = re, Sl = J;
var xt;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(xt || (Pe.DataType = xt = {}));
function wp(e) {
  const t = Pl(e.type);
  if (t.includes("null")) {
    if (e.nullable === !1)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!t.length && e.nullable !== void 0)
      throw new Error('"nullable" cannot be used without "type"');
    e.nullable === !0 && t.push("null");
  }
  return t;
}
Pe.getSchemaTypes = wp;
function Pl(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(gp.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
Pe.getJSONTypes = Pl;
function bp(e, t) {
  const { gen: r, data: n, opts: s } = e, o = Sp(t, s.coerceTypes), c = t.length > 0 && !(o.length === 0 && t.length === 1 && (0, vp.schemaHasRulesForType)(e, t[0]));
  if (c) {
    const i = qo(t, n, s.strictNumbers, xt.Wrong);
    r.if(i, () => {
      o.length ? Pp(e, t, o) : Ko(e);
    });
  }
  return c;
}
Pe.coerceAndCheckDataType = bp;
const Rl = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function Sp(e, t) {
  return t ? e.filter((r) => Rl.has(r) || t === "array" && r === "array") : [];
}
function Pp(e, t, r) {
  const { gen: n, data: s, opts: o } = e, c = n.let("dataType", (0, te._)`typeof ${s}`), i = n.let("coerced", (0, te._)`undefined`);
  o.coerceTypes === "array" && n.if((0, te._)`${c} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, te._)`${s}[0]`).assign(c, (0, te._)`typeof ${s}`).if(qo(t, s, o.strictNumbers), () => n.assign(i, s))), n.if((0, te._)`${i} !== undefined`);
  for (const d of r)
    (Rl.has(d) || d === "array" && o.coerceTypes === "array") && l(d);
  n.else(), Ko(e), n.endIf(), n.if((0, te._)`${i} !== undefined`, () => {
    n.assign(s, i), Rp(e, i);
  });
  function l(d) {
    switch (d) {
      case "string":
        n.elseIf((0, te._)`${c} == "number" || ${c} == "boolean"`).assign(i, (0, te._)`"" + ${s}`).elseIf((0, te._)`${s} === null`).assign(i, (0, te._)`""`);
        return;
      case "number":
        n.elseIf((0, te._)`${c} == "boolean" || ${s} === null
              || (${c} == "string" && ${s} && ${s} == +${s})`).assign(i, (0, te._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, te._)`${c} === "boolean" || ${s} === null
              || (${c} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(i, (0, te._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, te._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(i, !1).elseIf((0, te._)`${s} === "true" || ${s} === 1`).assign(i, !0);
        return;
      case "null":
        n.elseIf((0, te._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(i, null);
        return;
      case "array":
        n.elseIf((0, te._)`${c} === "string" || ${c} === "number"
              || ${c} === "boolean" || ${s} === null`).assign(i, (0, te._)`[${s}]`);
    }
  }
}
function Rp({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, te._)`${t} !== undefined`, () => e.assign((0, te._)`${t}[${r}]`, n));
}
function Rs(e, t, r, n = xt.Correct) {
  const s = n === xt.Correct ? te.operators.EQ : te.operators.NEQ;
  let o;
  switch (e) {
    case "null":
      return (0, te._)`${t} ${s} null`;
    case "array":
      o = (0, te._)`Array.isArray(${t})`;
      break;
    case "object":
      o = (0, te._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      o = c((0, te._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      o = c();
      break;
    default:
      return (0, te._)`typeof ${t} ${s} ${e}`;
  }
  return n === xt.Correct ? o : (0, te.not)(o);
  function c(i = te.nil) {
    return (0, te.and)((0, te._)`typeof ${t} == "number"`, i, r ? (0, te._)`isFinite(${t})` : te.nil);
  }
}
Pe.checkDataType = Rs;
function qo(e, t, r, n) {
  if (e.length === 1)
    return Rs(e[0], t, r, n);
  let s;
  const o = (0, Sl.toHash)(e);
  if (o.array && o.object) {
    const c = (0, te._)`typeof ${t} != "object"`;
    s = o.null ? c : (0, te._)`!${t} || ${c}`, delete o.null, delete o.array, delete o.object;
  } else
    s = te.nil;
  o.number && delete o.integer;
  for (const c in o)
    s = (0, te.and)(s, Rs(c, t, r, n));
  return s;
}
Pe.checkDataTypes = qo;
const Op = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, te._)`{type: ${e}}` : (0, te._)`{type: ${t}}`
};
function Ko(e) {
  const t = Np(e);
  (0, Ep.reportError)(t, Op);
}
Pe.reportTypeError = Ko;
function Np(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, Sl.schemaRefOrVal)(e, n, "type");
  return {
    gen: t,
    keyword: "type",
    data: r,
    schema: n.type,
    schemaCode: s,
    schemaValue: s,
    parentSchema: n,
    params: {},
    it: e
  };
}
var mr = {}, vi;
function Tp() {
  if (vi) return mr;
  vi = 1, Object.defineProperty(mr, "__esModule", { value: !0 }), mr.assignDefaults = void 0;
  const e = re, t = J;
  function r(s, o) {
    const { properties: c, items: i } = s.schema;
    if (o === "object" && c)
      for (const l in c)
        n(s, l, c[l].default);
    else o === "array" && Array.isArray(i) && i.forEach((l, d) => n(s, d, l.default));
  }
  mr.assignDefaults = r;
  function n(s, o, c) {
    const { gen: i, compositeRule: l, data: d, opts: u } = s;
    if (c === void 0)
      return;
    const m = (0, e._)`${d}${(0, e.getProperty)(o)}`;
    if (l) {
      (0, t.checkStrictMode)(s, `default is ignored for: ${m}`);
      return;
    }
    let S = (0, e._)`${m} === undefined`;
    u.useDefaults === "empty" && (S = (0, e._)`${S} || ${m} === null || ${m} === ""`), i.if(S, (0, e._)`${m} = ${(0, e.stringify)(c)}`);
  }
  return mr;
}
var Xe = {}, se = {};
Object.defineProperty(se, "__esModule", { value: !0 });
se.validateUnion = se.validateArray = se.usePattern = se.callValidateCode = se.schemaProperties = se.allSchemaProperties = se.noPropertyInData = se.propertyInData = se.isOwnProperty = se.hasPropFunc = se.reportMissingProp = se.checkMissingProp = se.checkReportMissingProp = void 0;
const ge = re, Go = J, gt = Nt(), Ip = J;
function jp(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(Ho(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, ge._)`${t}` }, !0), e.error();
  });
}
se.checkReportMissingProp = jp;
function Ap({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, ge.or)(...n.map((o) => (0, ge.and)(Ho(e, t, o, r.ownProperties), (0, ge._)`${s} = ${o}`)));
}
se.checkMissingProp = Ap;
function kp(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
se.reportMissingProp = kp;
function Ol(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, ge._)`Object.prototype.hasOwnProperty`
  });
}
se.hasPropFunc = Ol;
function Bo(e, t, r) {
  return (0, ge._)`${Ol(e)}.call(${t}, ${r})`;
}
se.isOwnProperty = Bo;
function Cp(e, t, r, n) {
  const s = (0, ge._)`${t}${(0, ge.getProperty)(r)} !== undefined`;
  return n ? (0, ge._)`${s} && ${Bo(e, t, r)}` : s;
}
se.propertyInData = Cp;
function Ho(e, t, r, n) {
  const s = (0, ge._)`${t}${(0, ge.getProperty)(r)} === undefined`;
  return n ? (0, ge.or)(s, (0, ge.not)(Bo(e, t, r))) : s;
}
se.noPropertyInData = Ho;
function Nl(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
se.allSchemaProperties = Nl;
function Dp(e, t) {
  return Nl(t).filter((r) => !(0, Go.alwaysValidSchema)(e, t[r]));
}
se.schemaProperties = Dp;
function Mp({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: o }, it: c }, i, l, d) {
  const u = d ? (0, ge._)`${e}, ${t}, ${n}${s}` : t, m = [
    [gt.default.instancePath, (0, ge.strConcat)(gt.default.instancePath, o)],
    [gt.default.parentData, c.parentData],
    [gt.default.parentDataProperty, c.parentDataProperty],
    [gt.default.rootData, gt.default.rootData]
  ];
  c.opts.dynamicRef && m.push([gt.default.dynamicAnchors, gt.default.dynamicAnchors]);
  const S = (0, ge._)`${u}, ${r.object(...m)}`;
  return l !== ge.nil ? (0, ge._)`${i}.call(${l}, ${S})` : (0, ge._)`${i}(${S})`;
}
se.callValidateCode = Mp;
const Lp = (0, ge._)`new RegExp`;
function Vp({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, o = s(r, n);
  return e.scopeValue("pattern", {
    key: o.toString(),
    ref: o,
    code: (0, ge._)`${s.code === "new RegExp" ? Lp : (0, Ip.useFunc)(e, s)}(${r}, ${n})`
  });
}
se.usePattern = Vp;
function Fp(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, o = t.name("valid");
  if (s.allErrors) {
    const i = t.let("valid", !0);
    return c(() => t.assign(i, !1)), i;
  }
  return t.var(o, !0), c(() => t.break()), o;
  function c(i) {
    const l = t.const("len", (0, ge._)`${r}.length`);
    t.forRange("i", 0, l, (d) => {
      e.subschema({
        keyword: n,
        dataProp: d,
        dataPropType: Go.Type.Num
      }, o), t.if((0, ge.not)(o), i);
    });
  }
}
se.validateArray = Fp;
function zp(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((l) => (0, Go.alwaysValidSchema)(s, l)) && !s.opts.unevaluated)
    return;
  const c = t.let("valid", !1), i = t.name("_valid");
  t.block(() => r.forEach((l, d) => {
    const u = e.subschema({
      keyword: n,
      schemaProp: d,
      compositeRule: !0
    }, i);
    t.assign(c, (0, ge._)`${c} || ${i}`), e.mergeValidEvaluated(u, i) || t.if((0, ge.not)(c));
  })), e.result(c, () => e.reset(), () => e.error(!0));
}
se.validateUnion = zp;
var Ei;
function Up() {
  if (Ei) return Xe;
  Ei = 1, Object.defineProperty(Xe, "__esModule", { value: !0 }), Xe.validateKeywordUsage = Xe.validSchemaType = Xe.funcKeywordCode = Xe.macroKeywordCode = void 0;
  const e = re, t = Nt(), r = se, n = kr;
  function s(S, _) {
    const { gen: b, keyword: v, schema: w, parentSchema: $, it: R } = S, T = _.macro.call(R.self, w, $, R), A = d(b, v, T);
    R.opts.validateSchema !== !1 && R.self.validateSchema(T, !0);
    const C = b.name("valid");
    S.subschema({
      schema: T,
      schemaPath: e.nil,
      errSchemaPath: `${R.errSchemaPath}/${v}`,
      topSchemaRef: A,
      compositeRule: !0
    }, C), S.pass(C, () => S.error(!0));
  }
  Xe.macroKeywordCode = s;
  function o(S, _) {
    var b;
    const { gen: v, keyword: w, schema: $, parentSchema: R, $data: T, it: A } = S;
    l(A, _);
    const C = !T && _.compile ? _.compile.call(A.self, $, R, A) : _.validate, G = d(v, w, C), q = v.let("valid");
    S.block$data(q, oe), S.ok((b = _.valid) !== null && b !== void 0 ? b : q);
    function oe() {
      if (_.errors === !1)
        x(), _.modifying && c(S), X(() => S.error());
      else {
        const Z = _.async ? K() : Q();
        _.modifying && c(S), X(() => i(S, Z));
      }
    }
    function K() {
      const Z = v.let("ruleErrs", null);
      return v.try(() => x((0, e._)`await `), (L) => v.assign(q, !1).if((0, e._)`${L} instanceof ${A.ValidationError}`, () => v.assign(Z, (0, e._)`${L}.errors`), () => v.throw(L))), Z;
    }
    function Q() {
      const Z = (0, e._)`${G}.errors`;
      return v.assign(Z, null), x(e.nil), Z;
    }
    function x(Z = _.async ? (0, e._)`await ` : e.nil) {
      const L = A.opts.passContext ? t.default.this : t.default.self, F = !("compile" in _ && !T || _.schema === !1);
      v.assign(q, (0, e._)`${Z}${(0, r.callValidateCode)(S, G, L, F)}`, _.modifying);
    }
    function X(Z) {
      var L;
      v.if((0, e.not)((L = _.valid) !== null && L !== void 0 ? L : q), Z);
    }
  }
  Xe.funcKeywordCode = o;
  function c(S) {
    const { gen: _, data: b, it: v } = S;
    _.if(v.parentData, () => _.assign(b, (0, e._)`${v.parentData}[${v.parentDataProperty}]`));
  }
  function i(S, _) {
    const { gen: b } = S;
    b.if((0, e._)`Array.isArray(${_})`, () => {
      b.assign(t.default.vErrors, (0, e._)`${t.default.vErrors} === null ? ${_} : ${t.default.vErrors}.concat(${_})`).assign(t.default.errors, (0, e._)`${t.default.vErrors}.length`), (0, n.extendErrors)(S);
    }, () => S.error());
  }
  function l({ schemaEnv: S }, _) {
    if (_.async && !S.$async)
      throw new Error("async keyword in sync schema");
  }
  function d(S, _, b) {
    if (b === void 0)
      throw new Error(`keyword "${_}" failed to compile`);
    return S.scopeValue("keyword", typeof b == "function" ? { ref: b } : { ref: b, code: (0, e.stringify)(b) });
  }
  function u(S, _, b = !1) {
    return !_.length || _.some((v) => v === "array" ? Array.isArray(S) : v === "object" ? S && typeof S == "object" && !Array.isArray(S) : typeof S == v || b && typeof S > "u");
  }
  Xe.validSchemaType = u;
  function m({ schema: S, opts: _, self: b, errSchemaPath: v }, w, $) {
    if (Array.isArray(w.keyword) ? !w.keyword.includes($) : w.keyword !== $)
      throw new Error("ajv implementation error");
    const R = w.dependencies;
    if (R != null && R.some((T) => !Object.prototype.hasOwnProperty.call(S, T)))
      throw new Error(`parent schema must have dependencies of ${$}: ${R.join(",")}`);
    if (w.validateSchema && !w.validateSchema(S[$])) {
      const A = `keyword "${$}" value is invalid at path "${v}": ` + b.errorsText(w.validateSchema.errors);
      if (_.validateSchema === "log")
        b.logger.error(A);
      else
        throw new Error(A);
    }
  }
  return Xe.validateKeywordUsage = m, Xe;
}
var mt = {}, wi;
function qp() {
  if (wi) return mt;
  wi = 1, Object.defineProperty(mt, "__esModule", { value: !0 }), mt.extendSubschemaMode = mt.extendSubschemaData = mt.getSubschema = void 0;
  const e = re, t = J;
  function r(o, { keyword: c, schemaProp: i, schema: l, schemaPath: d, errSchemaPath: u, topSchemaRef: m }) {
    if (c !== void 0 && l !== void 0)
      throw new Error('both "keyword" and "schema" passed, only one allowed');
    if (c !== void 0) {
      const S = o.schema[c];
      return i === void 0 ? {
        schema: S,
        schemaPath: (0, e._)`${o.schemaPath}${(0, e.getProperty)(c)}`,
        errSchemaPath: `${o.errSchemaPath}/${c}`
      } : {
        schema: S[i],
        schemaPath: (0, e._)`${o.schemaPath}${(0, e.getProperty)(c)}${(0, e.getProperty)(i)}`,
        errSchemaPath: `${o.errSchemaPath}/${c}/${(0, t.escapeFragment)(i)}`
      };
    }
    if (l !== void 0) {
      if (d === void 0 || u === void 0 || m === void 0)
        throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
      return {
        schema: l,
        schemaPath: d,
        topSchemaRef: m,
        errSchemaPath: u
      };
    }
    throw new Error('either "keyword" or "schema" must be passed');
  }
  mt.getSubschema = r;
  function n(o, c, { dataProp: i, dataPropType: l, data: d, dataTypes: u, propertyName: m }) {
    if (d !== void 0 && i !== void 0)
      throw new Error('both "data" and "dataProp" passed, only one allowed');
    const { gen: S } = c;
    if (i !== void 0) {
      const { errorPath: b, dataPathArr: v, opts: w } = c, $ = S.let("data", (0, e._)`${c.data}${(0, e.getProperty)(i)}`, !0);
      _($), o.errorPath = (0, e.str)`${b}${(0, t.getErrorPath)(i, l, w.jsPropertySyntax)}`, o.parentDataProperty = (0, e._)`${i}`, o.dataPathArr = [...v, o.parentDataProperty];
    }
    if (d !== void 0) {
      const b = d instanceof e.Name ? d : S.let("data", d, !0);
      _(b), m !== void 0 && (o.propertyName = m);
    }
    u && (o.dataTypes = u);
    function _(b) {
      o.data = b, o.dataLevel = c.dataLevel + 1, o.dataTypes = [], c.definedProperties = /* @__PURE__ */ new Set(), o.parentData = c.data, o.dataNames = [...c.dataNames, b];
    }
  }
  mt.extendSubschemaData = n;
  function s(o, { jtdDiscriminator: c, jtdMetadata: i, compositeRule: l, createErrors: d, allErrors: u }) {
    l !== void 0 && (o.compositeRule = l), d !== void 0 && (o.createErrors = d), u !== void 0 && (o.allErrors = u), o.jtdDiscriminator = c, o.jtdMetadata = i;
  }
  return mt.extendSubschemaMode = s, mt;
}
var je = {}, Tl = { exports: {} }, Rt = Tl.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  dn(t, n, s, e, "", e);
};
Rt.keywords = {
  additionalItems: !0,
  items: !0,
  contains: !0,
  additionalProperties: !0,
  propertyNames: !0,
  not: !0,
  if: !0,
  then: !0,
  else: !0
};
Rt.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Rt.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Rt.skipKeywords = {
  default: !0,
  enum: !0,
  const: !0,
  required: !0,
  maximum: !0,
  minimum: !0,
  exclusiveMaximum: !0,
  exclusiveMinimum: !0,
  multipleOf: !0,
  maxLength: !0,
  minLength: !0,
  pattern: !0,
  format: !0,
  maxItems: !0,
  minItems: !0,
  uniqueItems: !0,
  maxProperties: !0,
  minProperties: !0
};
function dn(e, t, r, n, s, o, c, i, l, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, o, c, i, l, d);
    for (var u in n) {
      var m = n[u];
      if (Array.isArray(m)) {
        if (u in Rt.arrayKeywords)
          for (var S = 0; S < m.length; S++)
            dn(e, t, r, m[S], s + "/" + u + "/" + S, o, s, u, n, S);
      } else if (u in Rt.propsKeywords) {
        if (m && typeof m == "object")
          for (var _ in m)
            dn(e, t, r, m[_], s + "/" + u + "/" + Kp(_), o, s, u, n, _);
      } else (u in Rt.keywords || e.allKeys && !(u in Rt.skipKeywords)) && dn(e, t, r, m, s + "/" + u, o, s, u, n);
    }
    r(n, s, o, c, i, l, d);
  }
}
function Kp(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var Gp = Tl.exports;
Object.defineProperty(je, "__esModule", { value: !0 });
je.getSchemaRefs = je.resolveUrl = je.normalizeId = je._getFullPath = je.getFullPath = je.inlineRef = void 0;
const Bp = J, Hp = Tn, Wp = Gp, Jp = /* @__PURE__ */ new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function Xp(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Os(e) : t ? Il(e) <= t : !1;
}
je.inlineRef = Xp;
const Yp = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Os(e) {
  for (const t in e) {
    if (Yp.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(Os) || typeof r == "object" && Os(r))
      return !0;
  }
  return !1;
}
function Il(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !Jp.has(r) && (typeof e[r] == "object" && (0, Bp.eachItem)(e[r], (n) => t += Il(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function jl(e, t = "", r) {
  r !== !1 && (t = er(t));
  const n = e.parse(t);
  return Al(e, n);
}
je.getFullPath = jl;
function Al(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
je._getFullPath = Al;
const Qp = /#\/?$/;
function er(e) {
  return e ? e.replace(Qp, "") : "";
}
je.normalizeId = er;
function Zp(e, t, r) {
  return r = er(r), e.resolve(t, r);
}
je.resolveUrl = Zp;
const xp = /^[a-z_][-a-z0-9._]*$/i;
function e$(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = er(e[r] || t), o = { "": s }, c = jl(n, s, !1), i = {}, l = /* @__PURE__ */ new Set();
  return Wp(e, { allKeys: !0 }, (m, S, _, b) => {
    if (b === void 0)
      return;
    const v = c + S;
    let w = o[b];
    typeof m[r] == "string" && (w = $.call(this, m[r])), R.call(this, m.$anchor), R.call(this, m.$dynamicAnchor), o[S] = w;
    function $(T) {
      const A = this.opts.uriResolver.resolve;
      if (T = er(w ? A(w, T) : T), l.has(T))
        throw u(T);
      l.add(T);
      let C = this.refs[T];
      return typeof C == "string" && (C = this.refs[C]), typeof C == "object" ? d(m, C.schema, T) : T !== er(v) && (T[0] === "#" ? (d(m, i[T], T), i[T] = m) : this.refs[T] = v), T;
    }
    function R(T) {
      if (typeof T == "string") {
        if (!xp.test(T))
          throw new Error(`invalid anchor "${T}"`);
        $.call(this, `#${T}`);
      }
    }
  }), i;
  function d(m, S, _) {
    if (S !== void 0 && !Hp(m, S))
      throw u(_);
  }
  function u(m) {
    return new Error(`reference "${m}" resolves to more than one schema`);
  }
}
je.getSchemaRefs = e$;
var bi;
function Ln() {
  if (bi) return ft;
  bi = 1, Object.defineProperty(ft, "__esModule", { value: !0 }), ft.getData = ft.KeywordCxt = ft.validateFunctionCode = void 0;
  const e = mp(), t = Pe, r = bl(), n = Pe, s = Tp(), o = Up(), c = qp(), i = re, l = Nt(), d = je, u = J, m = kr;
  function S(g) {
    if (C(g) && (q(g), A(g))) {
      w(g);
      return;
    }
    _(g, () => (0, e.topBoolOrEmptySchema)(g));
  }
  ft.validateFunctionCode = S;
  function _({ gen: g, validateName: P, schema: j, schemaEnv: k, opts: V }, U) {
    V.code.es5 ? g.func(P, (0, i._)`${l.default.data}, ${l.default.valCxt}`, k.$async, () => {
      g.code((0, i._)`"use strict"; ${R(j, V)}`), v(g, V), g.code(U);
    }) : g.func(P, (0, i._)`${l.default.data}, ${b(V)}`, k.$async, () => g.code(R(j, V)).code(U));
  }
  function b(g) {
    return (0, i._)`{${l.default.instancePath}="", ${l.default.parentData}, ${l.default.parentDataProperty}, ${l.default.rootData}=${l.default.data}${g.dynamicRef ? (0, i._)`, ${l.default.dynamicAnchors}={}` : i.nil}}={}`;
  }
  function v(g, P) {
    g.if(l.default.valCxt, () => {
      g.var(l.default.instancePath, (0, i._)`${l.default.valCxt}.${l.default.instancePath}`), g.var(l.default.parentData, (0, i._)`${l.default.valCxt}.${l.default.parentData}`), g.var(l.default.parentDataProperty, (0, i._)`${l.default.valCxt}.${l.default.parentDataProperty}`), g.var(l.default.rootData, (0, i._)`${l.default.valCxt}.${l.default.rootData}`), P.dynamicRef && g.var(l.default.dynamicAnchors, (0, i._)`${l.default.valCxt}.${l.default.dynamicAnchors}`);
    }, () => {
      g.var(l.default.instancePath, (0, i._)`""`), g.var(l.default.parentData, (0, i._)`undefined`), g.var(l.default.parentDataProperty, (0, i._)`undefined`), g.var(l.default.rootData, l.default.data), P.dynamicRef && g.var(l.default.dynamicAnchors, (0, i._)`{}`);
    });
  }
  function w(g) {
    const { schema: P, opts: j, gen: k } = g;
    _(g, () => {
      j.$comment && P.$comment && Z(g), Q(g), k.let(l.default.vErrors, null), k.let(l.default.errors, 0), j.unevaluated && $(g), oe(g), L(g);
    });
  }
  function $(g) {
    const { gen: P, validateName: j } = g;
    g.evaluated = P.const("evaluated", (0, i._)`${j}.evaluated`), P.if((0, i._)`${g.evaluated}.dynamicProps`, () => P.assign((0, i._)`${g.evaluated}.props`, (0, i._)`undefined`)), P.if((0, i._)`${g.evaluated}.dynamicItems`, () => P.assign((0, i._)`${g.evaluated}.items`, (0, i._)`undefined`));
  }
  function R(g, P) {
    const j = typeof g == "object" && g[P.schemaId];
    return j && (P.code.source || P.code.process) ? (0, i._)`/*# sourceURL=${j} */` : i.nil;
  }
  function T(g, P) {
    if (C(g) && (q(g), A(g))) {
      G(g, P);
      return;
    }
    (0, e.boolOrEmptySchema)(g, P);
  }
  function A({ schema: g, self: P }) {
    if (typeof g == "boolean")
      return !g;
    for (const j in g)
      if (P.RULES.all[j])
        return !0;
    return !1;
  }
  function C(g) {
    return typeof g.schema != "boolean";
  }
  function G(g, P) {
    const { schema: j, gen: k, opts: V } = g;
    V.$comment && j.$comment && Z(g), x(g), X(g);
    const U = k.const("_errs", l.default.errors);
    oe(g, U), k.var(P, (0, i._)`${U} === ${l.default.errors}`);
  }
  function q(g) {
    (0, u.checkUnknownRules)(g), K(g);
  }
  function oe(g, P) {
    if (g.opts.jtd)
      return B(g, [], !1, P);
    const j = (0, t.getSchemaTypes)(g.schema), k = (0, t.coerceAndCheckDataType)(g, j);
    B(g, j, !k, P);
  }
  function K(g) {
    const { schema: P, errSchemaPath: j, opts: k, self: V } = g;
    P.$ref && k.ignoreKeywordsWithRef && (0, u.schemaHasRulesButRef)(P, V.RULES) && V.logger.warn(`$ref: keywords ignored in schema at path "${j}"`);
  }
  function Q(g) {
    const { schema: P, opts: j } = g;
    P.default !== void 0 && j.useDefaults && j.strictSchema && (0, u.checkStrictMode)(g, "default is ignored in the schema root");
  }
  function x(g) {
    const P = g.schema[g.opts.schemaId];
    P && (g.baseId = (0, d.resolveUrl)(g.opts.uriResolver, g.baseId, P));
  }
  function X(g) {
    if (g.schema.$async && !g.schemaEnv.$async)
      throw new Error("async schema in sync schema");
  }
  function Z({ gen: g, schemaEnv: P, schema: j, errSchemaPath: k, opts: V }) {
    const U = j.$comment;
    if (V.$comment === !0)
      g.code((0, i._)`${l.default.self}.logger.log(${U})`);
    else if (typeof V.$comment == "function") {
      const ie = (0, i.str)`${k}/$comment`, ve = g.scopeValue("root", { ref: P.root });
      g.code((0, i._)`${l.default.self}.opts.$comment(${U}, ${ie}, ${ve}.schema)`);
    }
  }
  function L(g) {
    const { gen: P, schemaEnv: j, validateName: k, ValidationError: V, opts: U } = g;
    j.$async ? P.if((0, i._)`${l.default.errors} === 0`, () => P.return(l.default.data), () => P.throw((0, i._)`new ${V}(${l.default.vErrors})`)) : (P.assign((0, i._)`${k}.errors`, l.default.vErrors), U.unevaluated && F(g), P.return((0, i._)`${l.default.errors} === 0`));
  }
  function F({ gen: g, evaluated: P, props: j, items: k }) {
    j instanceof i.Name && g.assign((0, i._)`${P}.props`, j), k instanceof i.Name && g.assign((0, i._)`${P}.items`, k);
  }
  function B(g, P, j, k) {
    const { gen: V, schema: U, data: ie, allErrors: ve, opts: de, self: fe } = g, { RULES: ce } = fe;
    if (U.$ref && (de.ignoreKeywordsWithRef || !(0, u.schemaHasRulesButRef)(U, ce))) {
      V.block(() => D(g, "$ref", ce.all.$ref.definition));
      return;
    }
    de.jtd || O(g, P), V.block(() => {
      for (const ye of ce.rules)
        Ue(ye);
      Ue(ce.post);
    });
    function Ue(ye) {
      (0, r.shouldUseGroup)(U, ye) && (ye.type ? (V.if((0, n.checkDataType)(ye.type, ie, de.strictNumbers)), z(g, ye), P.length === 1 && P[0] === ye.type && j && (V.else(), (0, n.reportTypeError)(g)), V.endIf()) : z(g, ye), ve || V.if((0, i._)`${l.default.errors} === ${k || 0}`));
    }
  }
  function z(g, P) {
    const { gen: j, schema: k, opts: { useDefaults: V } } = g;
    V && (0, s.assignDefaults)(g, P.type), j.block(() => {
      for (const U of P.rules)
        (0, r.shouldUseRule)(k, U) && D(g, U.keyword, U.definition, P.type);
    });
  }
  function O(g, P) {
    g.schemaEnv.meta || !g.opts.strictTypes || (I(g, P), g.opts.allowUnionTypes || y(g, P), h(g, g.dataTypes));
  }
  function I(g, P) {
    if (P.length) {
      if (!g.dataTypes.length) {
        g.dataTypes = P;
        return;
      }
      P.forEach((j) => {
        p(g.dataTypes, j) || f(g, `type "${j}" not allowed by context "${g.dataTypes.join(",")}"`);
      }), a(g, P);
    }
  }
  function y(g, P) {
    P.length > 1 && !(P.length === 2 && P.includes("null")) && f(g, "use allowUnionTypes to allow union type keyword");
  }
  function h(g, P) {
    const j = g.self.RULES.all;
    for (const k in j) {
      const V = j[k];
      if (typeof V == "object" && (0, r.shouldUseRule)(g.schema, V)) {
        const { type: U } = V.definition;
        U.length && !U.some((ie) => E(P, ie)) && f(g, `missing type "${U.join(",")}" for keyword "${k}"`);
      }
    }
  }
  function E(g, P) {
    return g.includes(P) || P === "number" && g.includes("integer");
  }
  function p(g, P) {
    return g.includes(P) || P === "integer" && g.includes("number");
  }
  function a(g, P) {
    const j = [];
    for (const k of g.dataTypes)
      p(P, k) ? j.push(k) : P.includes("integer") && k === "number" && j.push("integer");
    g.dataTypes = j;
  }
  function f(g, P) {
    const j = g.schemaEnv.baseId + g.errSchemaPath;
    P += ` at "${j}" (strictTypes)`, (0, u.checkStrictMode)(g, P, g.opts.strictTypes);
  }
  class N {
    constructor(P, j, k) {
      if ((0, o.validateKeywordUsage)(P, j, k), this.gen = P.gen, this.allErrors = P.allErrors, this.keyword = k, this.data = P.data, this.schema = P.schema[k], this.$data = j.$data && P.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, u.schemaRefOrVal)(P, this.schema, k, this.$data), this.schemaType = j.schemaType, this.parentSchema = P.schema, this.params = {}, this.it = P, this.def = j, this.$data)
        this.schemaCode = P.gen.const("vSchema", H(this.$data, P));
      else if (this.schemaCode = this.schemaValue, !(0, o.validSchemaType)(this.schema, j.schemaType, j.allowUndefined))
        throw new Error(`${k} value must be ${JSON.stringify(j.schemaType)}`);
      ("code" in j ? j.trackErrors : j.errors !== !1) && (this.errsCount = P.gen.const("_errs", l.default.errors));
    }
    result(P, j, k) {
      this.failResult((0, i.not)(P), j, k);
    }
    failResult(P, j, k) {
      this.gen.if(P), k ? k() : this.error(), j ? (this.gen.else(), j(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    pass(P, j) {
      this.failResult((0, i.not)(P), void 0, j);
    }
    fail(P) {
      if (P === void 0) {
        this.error(), this.allErrors || this.gen.if(!1);
        return;
      }
      this.gen.if(P), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    fail$data(P) {
      if (!this.$data)
        return this.fail(P);
      const { schemaCode: j } = this;
      this.fail((0, i._)`${j} !== undefined && (${(0, i.or)(this.invalid$data(), P)})`);
    }
    error(P, j, k) {
      if (j) {
        this.setParams(j), this._error(P, k), this.setParams({});
        return;
      }
      this._error(P, k);
    }
    _error(P, j) {
      (P ? m.reportExtraError : m.reportError)(this, this.def.error, j);
    }
    $dataError() {
      (0, m.reportError)(this, this.def.$dataError || m.keyword$DataError);
    }
    reset() {
      if (this.errsCount === void 0)
        throw new Error('add "trackErrors" to keyword definition');
      (0, m.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(P) {
      this.allErrors || this.gen.if(P);
    }
    setParams(P, j) {
      j ? Object.assign(this.params, P) : this.params = P;
    }
    block$data(P, j, k = i.nil) {
      this.gen.block(() => {
        this.check$data(P, k), j();
      });
    }
    check$data(P = i.nil, j = i.nil) {
      if (!this.$data)
        return;
      const { gen: k, schemaCode: V, schemaType: U, def: ie } = this;
      k.if((0, i.or)((0, i._)`${V} === undefined`, j)), P !== i.nil && k.assign(P, !0), (U.length || ie.validateSchema) && (k.elseIf(this.invalid$data()), this.$dataError(), P !== i.nil && k.assign(P, !1)), k.else();
    }
    invalid$data() {
      const { gen: P, schemaCode: j, schemaType: k, def: V, it: U } = this;
      return (0, i.or)(ie(), ve());
      function ie() {
        if (k.length) {
          if (!(j instanceof i.Name))
            throw new Error("ajv implementation error");
          const de = Array.isArray(k) ? k : [k];
          return (0, i._)`${(0, n.checkDataTypes)(de, j, U.opts.strictNumbers, n.DataType.Wrong)}`;
        }
        return i.nil;
      }
      function ve() {
        if (V.validateSchema) {
          const de = P.scopeValue("validate$data", { ref: V.validateSchema });
          return (0, i._)`!${de}(${j})`;
        }
        return i.nil;
      }
    }
    subschema(P, j) {
      const k = (0, c.getSubschema)(this.it, P);
      (0, c.extendSubschemaData)(k, this.it, P), (0, c.extendSubschemaMode)(k, P);
      const V = { ...this.it, ...k, items: void 0, props: void 0 };
      return T(V, j), V;
    }
    mergeEvaluated(P, j) {
      const { it: k, gen: V } = this;
      k.opts.unevaluated && (k.props !== !0 && P.props !== void 0 && (k.props = u.mergeEvaluated.props(V, P.props, k.props, j)), k.items !== !0 && P.items !== void 0 && (k.items = u.mergeEvaluated.items(V, P.items, k.items, j)));
    }
    mergeValidEvaluated(P, j) {
      const { it: k, gen: V } = this;
      if (k.opts.unevaluated && (k.props !== !0 || k.items !== !0))
        return V.if(j, () => this.mergeEvaluated(P, i.Name)), !0;
    }
  }
  ft.KeywordCxt = N;
  function D(g, P, j, k) {
    const V = new N(g, j, P);
    "code" in j ? j.code(V, k) : V.$data && j.validate ? (0, o.funcKeywordCode)(V, j) : "macro" in j ? (0, o.macroKeywordCode)(V, j) : (j.compile || j.validate) && (0, o.funcKeywordCode)(V, j);
  }
  const M = /^\/(?:[^~]|~0|~1)*$/, Y = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function H(g, { dataLevel: P, dataNames: j, dataPathArr: k }) {
    let V, U;
    if (g === "")
      return l.default.rootData;
    if (g[0] === "/") {
      if (!M.test(g))
        throw new Error(`Invalid JSON-pointer: ${g}`);
      V = g, U = l.default.rootData;
    } else {
      const fe = Y.exec(g);
      if (!fe)
        throw new Error(`Invalid JSON-pointer: ${g}`);
      const ce = +fe[1];
      if (V = fe[2], V === "#") {
        if (ce >= P)
          throw new Error(de("property/index", ce));
        return k[P - ce];
      }
      if (ce > P)
        throw new Error(de("data", ce));
      if (U = j[P - ce], !V)
        return U;
    }
    let ie = U;
    const ve = V.split("/");
    for (const fe of ve)
      fe && (U = (0, i._)`${U}${(0, i.getProperty)((0, u.unescapeJsonPointer)(fe))}`, ie = (0, i._)`${ie} && ${U}`);
    return ie;
    function de(fe, ce) {
      return `Cannot access ${fe} ${ce} levels up, current level is ${P}`;
    }
  }
  return ft.getData = H, ft;
}
var Wr = {}, Si;
function Wo() {
  if (Si) return Wr;
  Si = 1, Object.defineProperty(Wr, "__esModule", { value: !0 });
  class e extends Error {
    constructor(r) {
      super("validation failed"), this.errors = r, this.ajv = this.validation = !0;
    }
  }
  return Wr.default = e, Wr;
}
var Jr = {}, Pi;
function Vn() {
  if (Pi) return Jr;
  Pi = 1, Object.defineProperty(Jr, "__esModule", { value: !0 });
  const e = je;
  class t extends Error {
    constructor(n, s, o, c) {
      super(c || `can't resolve reference ${o} from id ${s}`), this.missingRef = (0, e.resolveUrl)(n, s, o), this.missingSchema = (0, e.normalizeId)((0, e.getFullPath)(n, this.missingRef));
    }
  }
  return Jr.default = t, Jr;
}
var ze = {};
Object.defineProperty(ze, "__esModule", { value: !0 });
ze.resolveSchema = ze.getCompilingSchema = ze.resolveRef = ze.compileSchema = ze.SchemaEnv = void 0;
const Ye = re, t$ = Wo(), Mt = Nt(), et = je, Ri = J, r$ = Ln();
class Fn {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, et.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
ze.SchemaEnv = Fn;
function Jo(e) {
  const t = kl.call(this, e);
  if (t)
    return t;
  const r = (0, et.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: o } = this.opts, c = new Ye.CodeGen(this.scope, { es5: n, lines: s, ownProperties: o });
  let i;
  e.$async && (i = c.scopeValue("Error", {
    ref: t$.default,
    code: (0, Ye._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const l = c.scopeName("validate");
  e.validateName = l;
  const d = {
    gen: c,
    allErrors: this.opts.allErrors,
    data: Mt.default.data,
    parentData: Mt.default.parentData,
    parentDataProperty: Mt.default.parentDataProperty,
    dataNames: [Mt.default.data],
    dataPathArr: [Ye.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: c.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Ye.stringify)(e.schema) } : { ref: e.schema }),
    validateName: l,
    ValidationError: i,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: Ye.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Ye._)`""`,
    opts: this.opts,
    self: this
  };
  let u;
  try {
    this._compilations.add(e), (0, r$.validateFunctionCode)(d), c.optimize(this.opts.code.optimize);
    const m = c.toString();
    u = `${c.scopeRefs(Mt.default.scope)}return ${m}`, this.opts.code.process && (u = this.opts.code.process(u, e));
    const _ = new Function(`${Mt.default.self}`, `${Mt.default.scope}`, u)(this, this.scope.get());
    if (this.scope.value(l, { ref: _ }), _.errors = null, _.schema = e.schema, _.schemaEnv = e, e.$async && (_.$async = !0), this.opts.code.source === !0 && (_.source = { validateName: l, validateCode: m, scopeValues: c._values }), this.opts.unevaluated) {
      const { props: b, items: v } = d;
      _.evaluated = {
        props: b instanceof Ye.Name ? void 0 : b,
        items: v instanceof Ye.Name ? void 0 : v,
        dynamicProps: b instanceof Ye.Name,
        dynamicItems: v instanceof Ye.Name
      }, _.source && (_.source.evaluated = (0, Ye.stringify)(_.evaluated));
    }
    return e.validate = _, e;
  } catch (m) {
    throw delete e.validate, delete e.validateName, u && this.logger.error("Error compiling schema, function code:", u), m;
  } finally {
    this._compilations.delete(e);
  }
}
ze.compileSchema = Jo;
function n$(e, t, r) {
  var n;
  r = (0, et.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let o = a$.call(this, e, r);
  if (o === void 0) {
    const c = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: i } = this.opts;
    c && (o = new Fn({ schema: c, schemaId: i, root: e, baseId: t }));
  }
  if (o !== void 0)
    return e.refs[r] = s$.call(this, o);
}
ze.resolveRef = n$;
function s$(e) {
  return (0, et.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : Jo.call(this, e);
}
function kl(e) {
  for (const t of this._compilations)
    if (o$(t, e))
      return t;
}
ze.getCompilingSchema = kl;
function o$(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function a$(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || zn.call(this, e, t);
}
function zn(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, et._getFullPath)(this.opts.uriResolver, r);
  let s = (0, et.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return rs.call(this, r, e);
  const o = (0, et.normalizeId)(n), c = this.refs[o] || this.schemas[o];
  if (typeof c == "string") {
    const i = zn.call(this, e, c);
    return typeof (i == null ? void 0 : i.schema) != "object" ? void 0 : rs.call(this, r, i);
  }
  if (typeof (c == null ? void 0 : c.schema) == "object") {
    if (c.validate || Jo.call(this, c), o === (0, et.normalizeId)(t)) {
      const { schema: i } = c, { schemaId: l } = this.opts, d = i[l];
      return d && (s = (0, et.resolveUrl)(this.opts.uriResolver, s, d)), new Fn({ schema: i, schemaId: l, root: e, baseId: s });
    }
    return rs.call(this, r, c);
  }
}
ze.resolveSchema = zn;
const i$ = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function rs(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const i of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const l = r[(0, Ri.unescapeFragment)(i)];
    if (l === void 0)
      return;
    r = l;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !i$.has(i) && d && (t = (0, et.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let o;
  if (typeof r != "boolean" && r.$ref && !(0, Ri.schemaHasRulesButRef)(r, this.RULES)) {
    const i = (0, et.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    o = zn.call(this, n, i);
  }
  const { schemaId: c } = this.opts;
  if (o = o || new Fn({ schema: r, schemaId: c, root: n, baseId: t }), o.schema !== o.root.schema)
    return o;
}
const c$ = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", l$ = "Meta-schema for $data reference (JSON AnySchema extension proposal)", u$ = "object", d$ = [
  "$data"
], f$ = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
}, h$ = !1, m$ = {
  $id: c$,
  description: l$,
  type: u$,
  required: d$,
  properties: f$,
  additionalProperties: h$
};
var Xo = {};
Object.defineProperty(Xo, "__esModule", { value: !0 });
const Cl = ol;
Cl.code = 'require("ajv/dist/runtime/uri").default';
Xo.default = Cl;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = Ln();
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = re;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return r._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return r.str;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return r.stringify;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return r.nil;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return r.Name;
  } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
    return r.CodeGen;
  } });
  const n = Wo(), s = Vn(), o = Kt, c = ze, i = re, l = je, d = Pe, u = J, m = m$, S = Xo, _ = (y, h) => new RegExp(y, h);
  _.code = "new RegExp";
  const b = ["removeAdditional", "useDefaults", "coerceTypes"], v = /* @__PURE__ */ new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]), w = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  }, $ = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, R = 200;
  function T(y) {
    var h, E, p, a, f, N, D, M, Y, H, g, P, j, k, V, U, ie, ve, de, fe, ce, Ue, ye, Tt, It;
    const He = y.strict, jt = (h = y.code) === null || h === void 0 ? void 0 : h.optimize, ur = jt === !0 || jt === void 0 ? 1 : jt || 0, dr = (p = (E = y.code) === null || E === void 0 ? void 0 : E.regExp) !== null && p !== void 0 ? p : _, Xn = (a = y.uriResolver) !== null && a !== void 0 ? a : S.default;
    return {
      strictSchema: (N = (f = y.strictSchema) !== null && f !== void 0 ? f : He) !== null && N !== void 0 ? N : !0,
      strictNumbers: (M = (D = y.strictNumbers) !== null && D !== void 0 ? D : He) !== null && M !== void 0 ? M : !0,
      strictTypes: (H = (Y = y.strictTypes) !== null && Y !== void 0 ? Y : He) !== null && H !== void 0 ? H : "log",
      strictTuples: (P = (g = y.strictTuples) !== null && g !== void 0 ? g : He) !== null && P !== void 0 ? P : "log",
      strictRequired: (k = (j = y.strictRequired) !== null && j !== void 0 ? j : He) !== null && k !== void 0 ? k : !1,
      code: y.code ? { ...y.code, optimize: ur, regExp: dr } : { optimize: ur, regExp: dr },
      loopRequired: (V = y.loopRequired) !== null && V !== void 0 ? V : R,
      loopEnum: (U = y.loopEnum) !== null && U !== void 0 ? U : R,
      meta: (ie = y.meta) !== null && ie !== void 0 ? ie : !0,
      messages: (ve = y.messages) !== null && ve !== void 0 ? ve : !0,
      inlineRefs: (de = y.inlineRefs) !== null && de !== void 0 ? de : !0,
      schemaId: (fe = y.schemaId) !== null && fe !== void 0 ? fe : "$id",
      addUsedSchema: (ce = y.addUsedSchema) !== null && ce !== void 0 ? ce : !0,
      validateSchema: (Ue = y.validateSchema) !== null && Ue !== void 0 ? Ue : !0,
      validateFormats: (ye = y.validateFormats) !== null && ye !== void 0 ? ye : !0,
      unicodeRegExp: (Tt = y.unicodeRegExp) !== null && Tt !== void 0 ? Tt : !0,
      int32range: (It = y.int32range) !== null && It !== void 0 ? It : !0,
      uriResolver: Xn
    };
  }
  class A {
    constructor(h = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), h = this.opts = { ...h, ...T(h) };
      const { es5: E, lines: p } = this.opts.code;
      this.scope = new i.ValueScope({ scope: {}, prefixes: v, es5: E, lines: p }), this.logger = X(h.logger);
      const a = h.validateFormats;
      h.validateFormats = !1, this.RULES = (0, o.getRules)(), C.call(this, w, h, "NOT SUPPORTED"), C.call(this, $, h, "DEPRECATED", "warn"), this._metaOpts = Q.call(this), h.formats && oe.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), h.keywords && K.call(this, h.keywords), typeof h.meta == "object" && this.addMetaSchema(h.meta), q.call(this), h.validateFormats = a;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: h, meta: E, schemaId: p } = this.opts;
      let a = m;
      p === "id" && (a = { ...m }, a.id = a.$id, delete a.$id), E && h && this.addMetaSchema(a, a[p], !1);
    }
    defaultMeta() {
      const { meta: h, schemaId: E } = this.opts;
      return this.opts.defaultMeta = typeof h == "object" ? h[E] || h : void 0;
    }
    validate(h, E) {
      let p;
      if (typeof h == "string") {
        if (p = this.getSchema(h), !p)
          throw new Error(`no schema with key or ref "${h}"`);
      } else
        p = this.compile(h);
      const a = p(E);
      return "$async" in p || (this.errors = p.errors), a;
    }
    compile(h, E) {
      const p = this._addSchema(h, E);
      return p.validate || this._compileSchemaEnv(p);
    }
    compileAsync(h, E) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: p } = this.opts;
      return a.call(this, h, E);
      async function a(H, g) {
        await f.call(this, H.$schema);
        const P = this._addSchema(H, g);
        return P.validate || N.call(this, P);
      }
      async function f(H) {
        H && !this.getSchema(H) && await a.call(this, { $ref: H }, !0);
      }
      async function N(H) {
        try {
          return this._compileSchemaEnv(H);
        } catch (g) {
          if (!(g instanceof s.default))
            throw g;
          return D.call(this, g), await M.call(this, g.missingSchema), N.call(this, H);
        }
      }
      function D({ missingSchema: H, missingRef: g }) {
        if (this.refs[H])
          throw new Error(`AnySchema ${H} is loaded but ${g} cannot be resolved`);
      }
      async function M(H) {
        const g = await Y.call(this, H);
        this.refs[H] || await f.call(this, g.$schema), this.refs[H] || this.addSchema(g, H, E);
      }
      async function Y(H) {
        const g = this._loading[H];
        if (g)
          return g;
        try {
          return await (this._loading[H] = p(H));
        } finally {
          delete this._loading[H];
        }
      }
    }
    // Adds schema to the instance
    addSchema(h, E, p, a = this.opts.validateSchema) {
      if (Array.isArray(h)) {
        for (const N of h)
          this.addSchema(N, void 0, p, a);
        return this;
      }
      let f;
      if (typeof h == "object") {
        const { schemaId: N } = this.opts;
        if (f = h[N], f !== void 0 && typeof f != "string")
          throw new Error(`schema ${N} must be string`);
      }
      return E = (0, l.normalizeId)(E || f), this._checkUnique(E), this.schemas[E] = this._addSchema(h, p, E, a, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(h, E, p = this.opts.validateSchema) {
      return this.addSchema(h, E, !0, p), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(h, E) {
      if (typeof h == "boolean")
        return !0;
      let p;
      if (p = h.$schema, p !== void 0 && typeof p != "string")
        throw new Error("$schema must be a string");
      if (p = p || this.opts.defaultMeta || this.defaultMeta(), !p)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const a = this.validate(p, h);
      if (!a && E) {
        const f = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(f);
        else
          throw new Error(f);
      }
      return a;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(h) {
      let E;
      for (; typeof (E = G.call(this, h)) == "string"; )
        h = E;
      if (E === void 0) {
        const { schemaId: p } = this.opts, a = new c.SchemaEnv({ schema: {}, schemaId: p });
        if (E = c.resolveSchema.call(this, a, h), !E)
          return;
        this.refs[h] = E;
      }
      return E.validate || this._compileSchemaEnv(E);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(h) {
      if (h instanceof RegExp)
        return this._removeAllSchemas(this.schemas, h), this._removeAllSchemas(this.refs, h), this;
      switch (typeof h) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const E = G.call(this, h);
          return typeof E == "object" && this._cache.delete(E.schema), delete this.schemas[h], delete this.refs[h], this;
        }
        case "object": {
          const E = h;
          this._cache.delete(E);
          let p = h[this.opts.schemaId];
          return p && (p = (0, l.normalizeId)(p), delete this.schemas[p], delete this.refs[p]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(h) {
      for (const E of h)
        this.addKeyword(E);
      return this;
    }
    addKeyword(h, E) {
      let p;
      if (typeof h == "string")
        p = h, typeof E == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), E.keyword = p);
      else if (typeof h == "object" && E === void 0) {
        if (E = h, p = E.keyword, Array.isArray(p) && !p.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (L.call(this, p, E), !E)
        return (0, u.eachItem)(p, (f) => F.call(this, f)), this;
      z.call(this, E);
      const a = {
        ...E,
        type: (0, d.getJSONTypes)(E.type),
        schemaType: (0, d.getJSONTypes)(E.schemaType)
      };
      return (0, u.eachItem)(p, a.type.length === 0 ? (f) => F.call(this, f, a) : (f) => a.type.forEach((N) => F.call(this, f, a, N))), this;
    }
    getKeyword(h) {
      const E = this.RULES.all[h];
      return typeof E == "object" ? E.definition : !!E;
    }
    // Remove keyword
    removeKeyword(h) {
      const { RULES: E } = this;
      delete E.keywords[h], delete E.all[h];
      for (const p of E.rules) {
        const a = p.rules.findIndex((f) => f.keyword === h);
        a >= 0 && p.rules.splice(a, 1);
      }
      return this;
    }
    // Add format
    addFormat(h, E) {
      return typeof E == "string" && (E = new RegExp(E)), this.formats[h] = E, this;
    }
    errorsText(h = this.errors, { separator: E = ", ", dataVar: p = "data" } = {}) {
      return !h || h.length === 0 ? "No errors" : h.map((a) => `${p}${a.instancePath} ${a.message}`).reduce((a, f) => a + E + f);
    }
    $dataMetaSchema(h, E) {
      const p = this.RULES.all;
      h = JSON.parse(JSON.stringify(h));
      for (const a of E) {
        const f = a.split("/").slice(1);
        let N = h;
        for (const D of f)
          N = N[D];
        for (const D in p) {
          const M = p[D];
          if (typeof M != "object")
            continue;
          const { $data: Y } = M.definition, H = N[D];
          Y && H && (N[D] = I(H));
        }
      }
      return h;
    }
    _removeAllSchemas(h, E) {
      for (const p in h) {
        const a = h[p];
        (!E || E.test(p)) && (typeof a == "string" ? delete h[p] : a && !a.meta && (this._cache.delete(a.schema), delete h[p]));
      }
    }
    _addSchema(h, E, p, a = this.opts.validateSchema, f = this.opts.addUsedSchema) {
      let N;
      const { schemaId: D } = this.opts;
      if (typeof h == "object")
        N = h[D];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof h != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let M = this._cache.get(h);
      if (M !== void 0)
        return M;
      p = (0, l.normalizeId)(N || p);
      const Y = l.getSchemaRefs.call(this, h, p);
      return M = new c.SchemaEnv({ schema: h, schemaId: D, meta: E, baseId: p, localRefs: Y }), this._cache.set(M.schema, M), f && !p.startsWith("#") && (p && this._checkUnique(p), this.refs[p] = M), a && this.validateSchema(h, !0), M;
    }
    _checkUnique(h) {
      if (this.schemas[h] || this.refs[h])
        throw new Error(`schema with key or id "${h}" already exists`);
    }
    _compileSchemaEnv(h) {
      if (h.meta ? this._compileMetaSchema(h) : c.compileSchema.call(this, h), !h.validate)
        throw new Error("ajv implementation error");
      return h.validate;
    }
    _compileMetaSchema(h) {
      const E = this.opts;
      this.opts = this._metaOpts;
      try {
        c.compileSchema.call(this, h);
      } finally {
        this.opts = E;
      }
    }
  }
  A.ValidationError = n.default, A.MissingRefError = s.default, e.default = A;
  function C(y, h, E, p = "error") {
    for (const a in y) {
      const f = a;
      f in h && this.logger[p](`${E}: option ${a}. ${y[f]}`);
    }
  }
  function G(y) {
    return y = (0, l.normalizeId)(y), this.schemas[y] || this.refs[y];
  }
  function q() {
    const y = this.opts.schemas;
    if (y)
      if (Array.isArray(y))
        this.addSchema(y);
      else
        for (const h in y)
          this.addSchema(y[h], h);
  }
  function oe() {
    for (const y in this.opts.formats) {
      const h = this.opts.formats[y];
      h && this.addFormat(y, h);
    }
  }
  function K(y) {
    if (Array.isArray(y)) {
      this.addVocabulary(y);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const h in y) {
      const E = y[h];
      E.keyword || (E.keyword = h), this.addKeyword(E);
    }
  }
  function Q() {
    const y = { ...this.opts };
    for (const h of b)
      delete y[h];
    return y;
  }
  const x = { log() {
  }, warn() {
  }, error() {
  } };
  function X(y) {
    if (y === !1)
      return x;
    if (y === void 0)
      return console;
    if (y.log && y.warn && y.error)
      return y;
    throw new Error("logger must implement log, warn and error methods");
  }
  const Z = /^[a-z_$][a-z0-9_$:-]*$/i;
  function L(y, h) {
    const { RULES: E } = this;
    if ((0, u.eachItem)(y, (p) => {
      if (E.keywords[p])
        throw new Error(`Keyword ${p} is already defined`);
      if (!Z.test(p))
        throw new Error(`Keyword ${p} has invalid name`);
    }), !!h && h.$data && !("code" in h || "validate" in h))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function F(y, h, E) {
    var p;
    const a = h == null ? void 0 : h.post;
    if (E && a)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let N = a ? f.post : f.rules.find(({ type: M }) => M === E);
    if (N || (N = { type: E, rules: [] }, f.rules.push(N)), f.keywords[y] = !0, !h)
      return;
    const D = {
      keyword: y,
      definition: {
        ...h,
        type: (0, d.getJSONTypes)(h.type),
        schemaType: (0, d.getJSONTypes)(h.schemaType)
      }
    };
    h.before ? B.call(this, N, D, h.before) : N.rules.push(D), f.all[y] = D, (p = h.implements) === null || p === void 0 || p.forEach((M) => this.addKeyword(M));
  }
  function B(y, h, E) {
    const p = y.rules.findIndex((a) => a.keyword === E);
    p >= 0 ? y.rules.splice(p, 0, h) : (y.rules.push(h), this.logger.warn(`rule ${E} is not defined`));
  }
  function z(y) {
    let { metaSchema: h } = y;
    h !== void 0 && (y.$data && this.opts.$data && (h = I(h)), y.validateSchema = this.compile(h, !0));
  }
  const O = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function I(y) {
    return { anyOf: [y, O] };
  }
})(yl);
var Yo = {}, Qo = {}, Zo = {};
Object.defineProperty(Zo, "__esModule", { value: !0 });
const p$ = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
Zo.default = p$;
var Gt = {};
Object.defineProperty(Gt, "__esModule", { value: !0 });
Gt.callRef = Gt.getValidate = void 0;
const $$ = Vn(), Oi = se, Ve = re, Ht = Nt(), Ni = ze, Xr = J, y$ = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: o, validateName: c, opts: i, self: l } = n, { root: d } = o;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return m();
    const u = Ni.resolveRef.call(l, d, s, r);
    if (u === void 0)
      throw new $$.default(n.opts.uriResolver, s, r);
    if (u instanceof Ni.SchemaEnv)
      return S(u);
    return _(u);
    function m() {
      if (o === d)
        return fn(e, c, o, o.$async);
      const b = t.scopeValue("root", { ref: d });
      return fn(e, (0, Ve._)`${b}.validate`, d, d.$async);
    }
    function S(b) {
      const v = Dl(e, b);
      fn(e, v, b, b.$async);
    }
    function _(b) {
      const v = t.scopeValue("schema", i.code.source === !0 ? { ref: b, code: (0, Ve.stringify)(b) } : { ref: b }), w = t.name("valid"), $ = e.subschema({
        schema: b,
        dataTypes: [],
        schemaPath: Ve.nil,
        topSchemaRef: v,
        errSchemaPath: r
      }, w);
      e.mergeEvaluated($), e.ok(w);
    }
  }
};
function Dl(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Ve._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
Gt.getValidate = Dl;
function fn(e, t, r, n) {
  const { gen: s, it: o } = e, { allErrors: c, schemaEnv: i, opts: l } = o, d = l.passContext ? Ht.default.this : Ve.nil;
  n ? u() : m();
  function u() {
    if (!i.$async)
      throw new Error("async schema referenced by sync schema");
    const b = s.let("valid");
    s.try(() => {
      s.code((0, Ve._)`await ${(0, Oi.callValidateCode)(e, t, d)}`), _(t), c || s.assign(b, !0);
    }, (v) => {
      s.if((0, Ve._)`!(${v} instanceof ${o.ValidationError})`, () => s.throw(v)), S(v), c || s.assign(b, !1);
    }), e.ok(b);
  }
  function m() {
    e.result((0, Oi.callValidateCode)(e, t, d), () => _(t), () => S(t));
  }
  function S(b) {
    const v = (0, Ve._)`${b}.errors`;
    s.assign(Ht.default.vErrors, (0, Ve._)`${Ht.default.vErrors} === null ? ${v} : ${Ht.default.vErrors}.concat(${v})`), s.assign(Ht.default.errors, (0, Ve._)`${Ht.default.vErrors}.length`);
  }
  function _(b) {
    var v;
    if (!o.opts.unevaluated)
      return;
    const w = (v = r == null ? void 0 : r.validate) === null || v === void 0 ? void 0 : v.evaluated;
    if (o.props !== !0)
      if (w && !w.dynamicProps)
        w.props !== void 0 && (o.props = Xr.mergeEvaluated.props(s, w.props, o.props));
      else {
        const $ = s.var("props", (0, Ve._)`${b}.evaluated.props`);
        o.props = Xr.mergeEvaluated.props(s, $, o.props, Ve.Name);
      }
    if (o.items !== !0)
      if (w && !w.dynamicItems)
        w.items !== void 0 && (o.items = Xr.mergeEvaluated.items(s, w.items, o.items));
      else {
        const $ = s.var("items", (0, Ve._)`${b}.evaluated.items`);
        o.items = Xr.mergeEvaluated.items(s, $, o.items, Ve.Name);
      }
  }
}
Gt.callRef = fn;
Gt.default = y$;
Object.defineProperty(Qo, "__esModule", { value: !0 });
const _$ = Zo, g$ = Gt, v$ = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  _$.default,
  g$.default
];
Qo.default = v$;
var xo = {}, ea = {};
Object.defineProperty(ea, "__esModule", { value: !0 });
const En = re, vt = En.operators, wn = {
  maximum: { okStr: "<=", ok: vt.LTE, fail: vt.GT },
  minimum: { okStr: ">=", ok: vt.GTE, fail: vt.LT },
  exclusiveMaximum: { okStr: "<", ok: vt.LT, fail: vt.GTE },
  exclusiveMinimum: { okStr: ">", ok: vt.GT, fail: vt.LTE }
}, E$ = {
  message: ({ keyword: e, schemaCode: t }) => (0, En.str)`must be ${wn[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, En._)`{comparison: ${wn[e].okStr}, limit: ${t}}`
}, w$ = {
  keyword: Object.keys(wn),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: E$,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, En._)`${r} ${wn[t].fail} ${n} || isNaN(${r})`);
  }
};
ea.default = w$;
var ta = {};
Object.defineProperty(ta, "__esModule", { value: !0 });
const Sr = re, b$ = {
  message: ({ schemaCode: e }) => (0, Sr.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Sr._)`{multipleOf: ${e}}`
}, S$ = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: b$,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, o = s.opts.multipleOfPrecision, c = t.let("res"), i = o ? (0, Sr._)`Math.abs(Math.round(${c}) - ${c}) > 1e-${o}` : (0, Sr._)`${c} !== parseInt(${c})`;
    e.fail$data((0, Sr._)`(${n} === 0 || (${c} = ${r}/${n}, ${i}))`);
  }
};
ta.default = S$;
var ra = {}, na = {};
Object.defineProperty(na, "__esModule", { value: !0 });
function Ml(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
na.default = Ml;
Ml.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(ra, "__esModule", { value: !0 });
const Ft = re, P$ = J, R$ = na, O$ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Ft.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Ft._)`{limit: ${e}}`
}, N$ = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: O$,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, o = t === "maxLength" ? Ft.operators.GT : Ft.operators.LT, c = s.opts.unicode === !1 ? (0, Ft._)`${r}.length` : (0, Ft._)`${(0, P$.useFunc)(e.gen, R$.default)}(${r})`;
    e.fail$data((0, Ft._)`${c} ${o} ${n}`);
  }
};
ra.default = N$;
var sa = {};
Object.defineProperty(sa, "__esModule", { value: !0 });
const T$ = se, bn = re, I$ = {
  message: ({ schemaCode: e }) => (0, bn.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, bn._)`{pattern: ${e}}`
}, j$ = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: I$,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: o } = e, c = o.opts.unicodeRegExp ? "u" : "", i = r ? (0, bn._)`(new RegExp(${s}, ${c}))` : (0, T$.usePattern)(e, n);
    e.fail$data((0, bn._)`!${i}.test(${t})`);
  }
};
sa.default = j$;
var oa = {};
Object.defineProperty(oa, "__esModule", { value: !0 });
const Pr = re, A$ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Pr.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Pr._)`{limit: ${e}}`
}, k$ = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: A$,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? Pr.operators.GT : Pr.operators.LT;
    e.fail$data((0, Pr._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
oa.default = k$;
var aa = {};
Object.defineProperty(aa, "__esModule", { value: !0 });
const pr = se, Rr = re, C$ = J, D$ = {
  message: ({ params: { missingProperty: e } }) => (0, Rr.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Rr._)`{missingProperty: ${e}}`
}, M$ = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: D$,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: o, it: c } = e, { opts: i } = c;
    if (!o && r.length === 0)
      return;
    const l = r.length >= i.loopRequired;
    if (c.allErrors ? d() : u(), i.strictRequired) {
      const _ = e.parentSchema.properties, { definedProperties: b } = e.it;
      for (const v of r)
        if ((_ == null ? void 0 : _[v]) === void 0 && !b.has(v)) {
          const w = c.schemaEnv.baseId + c.errSchemaPath, $ = `required property "${v}" is not defined at "${w}" (strictRequired)`;
          (0, C$.checkStrictMode)(c, $, c.opts.strictRequired);
        }
    }
    function d() {
      if (l || o)
        e.block$data(Rr.nil, m);
      else
        for (const _ of r)
          (0, pr.checkReportMissingProp)(e, _);
    }
    function u() {
      const _ = t.let("missing");
      if (l || o) {
        const b = t.let("valid", !0);
        e.block$data(b, () => S(_, b)), e.ok(b);
      } else
        t.if((0, pr.checkMissingProp)(e, r, _)), (0, pr.reportMissingProp)(e, _), t.else();
    }
    function m() {
      t.forOf("prop", n, (_) => {
        e.setParams({ missingProperty: _ }), t.if((0, pr.noPropertyInData)(t, s, _, i.ownProperties), () => e.error());
      });
    }
    function S(_, b) {
      e.setParams({ missingProperty: _ }), t.forOf(_, n, () => {
        t.assign(b, (0, pr.propertyInData)(t, s, _, i.ownProperties)), t.if((0, Rr.not)(b), () => {
          e.error(), t.break();
        });
      }, Rr.nil);
    }
  }
};
aa.default = M$;
var ia = {};
Object.defineProperty(ia, "__esModule", { value: !0 });
const Or = re, L$ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Or.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Or._)`{limit: ${e}}`
}, V$ = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: L$,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? Or.operators.GT : Or.operators.LT;
    e.fail$data((0, Or._)`${r}.length ${s} ${n}`);
  }
};
ia.default = V$;
var ca = {}, Cr = {};
Object.defineProperty(Cr, "__esModule", { value: !0 });
const Ll = Tn;
Ll.code = 'require("ajv/dist/runtime/equal").default';
Cr.default = Ll;
Object.defineProperty(ca, "__esModule", { value: !0 });
const ns = Pe, Ne = re, F$ = J, z$ = Cr, U$ = {
  message: ({ params: { i: e, j: t } }) => (0, Ne.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Ne._)`{i: ${e}, j: ${t}}`
}, q$ = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: U$,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: o, schemaCode: c, it: i } = e;
    if (!n && !s)
      return;
    const l = t.let("valid"), d = o.items ? (0, ns.getSchemaTypes)(o.items) : [];
    e.block$data(l, u, (0, Ne._)`${c} === false`), e.ok(l);
    function u() {
      const b = t.let("i", (0, Ne._)`${r}.length`), v = t.let("j");
      e.setParams({ i: b, j: v }), t.assign(l, !0), t.if((0, Ne._)`${b} > 1`, () => (m() ? S : _)(b, v));
    }
    function m() {
      return d.length > 0 && !d.some((b) => b === "object" || b === "array");
    }
    function S(b, v) {
      const w = t.name("item"), $ = (0, ns.checkDataTypes)(d, w, i.opts.strictNumbers, ns.DataType.Wrong), R = t.const("indices", (0, Ne._)`{}`);
      t.for((0, Ne._)`;${b}--;`, () => {
        t.let(w, (0, Ne._)`${r}[${b}]`), t.if($, (0, Ne._)`continue`), d.length > 1 && t.if((0, Ne._)`typeof ${w} == "string"`, (0, Ne._)`${w} += "_"`), t.if((0, Ne._)`typeof ${R}[${w}] == "number"`, () => {
          t.assign(v, (0, Ne._)`${R}[${w}]`), e.error(), t.assign(l, !1).break();
        }).code((0, Ne._)`${R}[${w}] = ${b}`);
      });
    }
    function _(b, v) {
      const w = (0, F$.useFunc)(t, z$.default), $ = t.name("outer");
      t.label($).for((0, Ne._)`;${b}--;`, () => t.for((0, Ne._)`${v} = ${b}; ${v}--;`, () => t.if((0, Ne._)`${w}(${r}[${b}], ${r}[${v}])`, () => {
        e.error(), t.assign(l, !1).break($);
      })));
    }
  }
};
ca.default = q$;
var la = {};
Object.defineProperty(la, "__esModule", { value: !0 });
const Ns = re, K$ = J, G$ = Cr, B$ = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Ns._)`{allowedValue: ${e}}`
}, H$ = {
  keyword: "const",
  $data: !0,
  error: B$,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: o } = e;
    n || o && typeof o == "object" ? e.fail$data((0, Ns._)`!${(0, K$.useFunc)(t, G$.default)}(${r}, ${s})`) : e.fail((0, Ns._)`${o} !== ${r}`);
  }
};
la.default = H$;
var ua = {};
Object.defineProperty(ua, "__esModule", { value: !0 });
const gr = re, W$ = J, J$ = Cr, X$ = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, gr._)`{allowedValues: ${e}}`
}, Y$ = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: X$,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: o, it: c } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const i = s.length >= c.opts.loopEnum;
    let l;
    const d = () => l ?? (l = (0, W$.useFunc)(t, J$.default));
    let u;
    if (i || n)
      u = t.let("valid"), e.block$data(u, m);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const _ = t.const("vSchema", o);
      u = (0, gr.or)(...s.map((b, v) => S(_, v)));
    }
    e.pass(u);
    function m() {
      t.assign(u, !1), t.forOf("v", o, (_) => t.if((0, gr._)`${d()}(${r}, ${_})`, () => t.assign(u, !0).break()));
    }
    function S(_, b) {
      const v = s[b];
      return typeof v == "object" && v !== null ? (0, gr._)`${d()}(${r}, ${_}[${b}])` : (0, gr._)`${r} === ${v}`;
    }
  }
};
ua.default = Y$;
Object.defineProperty(xo, "__esModule", { value: !0 });
const Q$ = ea, Z$ = ta, x$ = ra, ey = sa, ty = oa, ry = aa, ny = ia, sy = ca, oy = la, ay = ua, iy = [
  // number
  Q$.default,
  Z$.default,
  // string
  x$.default,
  ey.default,
  // object
  ty.default,
  ry.default,
  // array
  ny.default,
  sy.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  oy.default,
  ay.default
];
xo.default = iy;
var da = {}, ir = {};
Object.defineProperty(ir, "__esModule", { value: !0 });
ir.validateAdditionalItems = void 0;
const zt = re, Ts = J, cy = {
  message: ({ params: { len: e } }) => (0, zt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, zt._)`{limit: ${e}}`
}, ly = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: cy,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Ts.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Vl(e, n);
  }
};
function Vl(e, t) {
  const { gen: r, schema: n, data: s, keyword: o, it: c } = e;
  c.items = !0;
  const i = r.const("len", (0, zt._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, zt._)`${i} <= ${t.length}`);
  else if (typeof n == "object" && !(0, Ts.alwaysValidSchema)(c, n)) {
    const d = r.var("valid", (0, zt._)`${i} <= ${t.length}`);
    r.if((0, zt.not)(d), () => l(d)), e.ok(d);
  }
  function l(d) {
    r.forRange("i", t.length, i, (u) => {
      e.subschema({ keyword: o, dataProp: u, dataPropType: Ts.Type.Num }, d), c.allErrors || r.if((0, zt.not)(d), () => r.break());
    });
  }
}
ir.validateAdditionalItems = Vl;
ir.default = ly;
var fa = {}, cr = {};
Object.defineProperty(cr, "__esModule", { value: !0 });
cr.validateTuple = void 0;
const Ti = re, hn = J, uy = se, dy = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Fl(e, "additionalItems", t);
    r.items = !0, !(0, hn.alwaysValidSchema)(r, t) && e.ok((0, uy.validateArray)(e));
  }
};
function Fl(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: o, keyword: c, it: i } = e;
  u(s), i.opts.unevaluated && r.length && i.items !== !0 && (i.items = hn.mergeEvaluated.items(n, r.length, i.items));
  const l = n.name("valid"), d = n.const("len", (0, Ti._)`${o}.length`);
  r.forEach((m, S) => {
    (0, hn.alwaysValidSchema)(i, m) || (n.if((0, Ti._)`${d} > ${S}`, () => e.subschema({
      keyword: c,
      schemaProp: S,
      dataProp: S
    }, l)), e.ok(l));
  });
  function u(m) {
    const { opts: S, errSchemaPath: _ } = i, b = r.length, v = b === m.minItems && (b === m.maxItems || m[t] === !1);
    if (S.strictTuples && !v) {
      const w = `"${c}" is ${b}-tuple, but minItems or maxItems/${t} are not specified or different at path "${_}"`;
      (0, hn.checkStrictMode)(i, w, S.strictTuples);
    }
  }
}
cr.validateTuple = Fl;
cr.default = dy;
Object.defineProperty(fa, "__esModule", { value: !0 });
const fy = cr, hy = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, fy.validateTuple)(e, "items")
};
fa.default = hy;
var ha = {};
Object.defineProperty(ha, "__esModule", { value: !0 });
const Ii = re, my = J, py = se, $y = ir, yy = {
  message: ({ params: { len: e } }) => (0, Ii.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Ii._)`{limit: ${e}}`
}, _y = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: yy,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, my.alwaysValidSchema)(n, t) && (s ? (0, $y.validateAdditionalItems)(e, s) : e.ok((0, py.validateArray)(e)));
  }
};
ha.default = _y;
var ma = {};
Object.defineProperty(ma, "__esModule", { value: !0 });
const Be = re, Yr = J, gy = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Be.str)`must contain at least ${e} valid item(s)` : (0, Be.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Be._)`{minContains: ${e}}` : (0, Be._)`{minContains: ${e}, maxContains: ${t}}`
}, vy = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: gy,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: o } = e;
    let c, i;
    const { minContains: l, maxContains: d } = n;
    o.opts.next ? (c = l === void 0 ? 1 : l, i = d) : c = 1;
    const u = t.const("len", (0, Be._)`${s}.length`);
    if (e.setParams({ min: c, max: i }), i === void 0 && c === 0) {
      (0, Yr.checkStrictMode)(o, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (i !== void 0 && c > i) {
      (0, Yr.checkStrictMode)(o, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, Yr.alwaysValidSchema)(o, r)) {
      let v = (0, Be._)`${u} >= ${c}`;
      i !== void 0 && (v = (0, Be._)`${v} && ${u} <= ${i}`), e.pass(v);
      return;
    }
    o.items = !0;
    const m = t.name("valid");
    i === void 0 && c === 1 ? _(m, () => t.if(m, () => t.break())) : c === 0 ? (t.let(m, !0), i !== void 0 && t.if((0, Be._)`${s}.length > 0`, S)) : (t.let(m, !1), S()), e.result(m, () => e.reset());
    function S() {
      const v = t.name("_valid"), w = t.let("count", 0);
      _(v, () => t.if(v, () => b(w)));
    }
    function _(v, w) {
      t.forRange("i", 0, u, ($) => {
        e.subschema({
          keyword: "contains",
          dataProp: $,
          dataPropType: Yr.Type.Num,
          compositeRule: !0
        }, v), w();
      });
    }
    function b(v) {
      t.code((0, Be._)`${v}++`), i === void 0 ? t.if((0, Be._)`${v} >= ${c}`, () => t.assign(m, !0).break()) : (t.if((0, Be._)`${v} > ${i}`, () => t.assign(m, !1).break()), c === 1 ? t.assign(m, !0) : t.if((0, Be._)`${v} >= ${c}`, () => t.assign(m, !0)));
    }
  }
};
ma.default = vy;
var zl = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = re, r = J, n = se;
  e.error = {
    message: ({ params: { property: l, depsCount: d, deps: u } }) => {
      const m = d === 1 ? "property" : "properties";
      return (0, t.str)`must have ${m} ${u} when property ${l} is present`;
    },
    params: ({ params: { property: l, depsCount: d, deps: u, missingProperty: m } }) => (0, t._)`{property: ${l},
    missingProperty: ${m},
    depsCount: ${d},
    deps: ${u}}`
    // TODO change to reference
  };
  const s = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(l) {
      const [d, u] = o(l);
      c(l, d), i(l, u);
    }
  };
  function o({ schema: l }) {
    const d = {}, u = {};
    for (const m in l) {
      if (m === "__proto__")
        continue;
      const S = Array.isArray(l[m]) ? d : u;
      S[m] = l[m];
    }
    return [d, u];
  }
  function c(l, d = l.schema) {
    const { gen: u, data: m, it: S } = l;
    if (Object.keys(d).length === 0)
      return;
    const _ = u.let("missing");
    for (const b in d) {
      const v = d[b];
      if (v.length === 0)
        continue;
      const w = (0, n.propertyInData)(u, m, b, S.opts.ownProperties);
      l.setParams({
        property: b,
        depsCount: v.length,
        deps: v.join(", ")
      }), S.allErrors ? u.if(w, () => {
        for (const $ of v)
          (0, n.checkReportMissingProp)(l, $);
      }) : (u.if((0, t._)`${w} && (${(0, n.checkMissingProp)(l, v, _)})`), (0, n.reportMissingProp)(l, _), u.else());
    }
  }
  e.validatePropertyDeps = c;
  function i(l, d = l.schema) {
    const { gen: u, data: m, keyword: S, it: _ } = l, b = u.name("valid");
    for (const v in d)
      (0, r.alwaysValidSchema)(_, d[v]) || (u.if(
        (0, n.propertyInData)(u, m, v, _.opts.ownProperties),
        () => {
          const w = l.subschema({ keyword: S, schemaProp: v }, b);
          l.mergeValidEvaluated(w, b);
        },
        () => u.var(b, !0)
        // TODO var
      ), l.ok(b));
  }
  e.validateSchemaDeps = i, e.default = s;
})(zl);
var pa = {};
Object.defineProperty(pa, "__esModule", { value: !0 });
const Ul = re, Ey = J, wy = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, Ul._)`{propertyName: ${e.propertyName}}`
}, by = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: wy,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, Ey.alwaysValidSchema)(s, r))
      return;
    const o = t.name("valid");
    t.forIn("key", n, (c) => {
      e.setParams({ propertyName: c }), e.subschema({
        keyword: "propertyNames",
        data: c,
        dataTypes: ["string"],
        propertyName: c,
        compositeRule: !0
      }, o), t.if((0, Ul.not)(o), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(o);
  }
};
pa.default = by;
var Un = {};
Object.defineProperty(Un, "__esModule", { value: !0 });
const Qr = se, Ze = re, Sy = Nt(), Zr = J, Py = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Ze._)`{additionalProperty: ${e.additionalProperty}}`
}, Ry = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: Py,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: o, it: c } = e;
    if (!o)
      throw new Error("ajv implementation error");
    const { allErrors: i, opts: l } = c;
    if (c.props = !0, l.removeAdditional !== "all" && (0, Zr.alwaysValidSchema)(c, r))
      return;
    const d = (0, Qr.allSchemaProperties)(n.properties), u = (0, Qr.allSchemaProperties)(n.patternProperties);
    m(), e.ok((0, Ze._)`${o} === ${Sy.default.errors}`);
    function m() {
      t.forIn("key", s, (w) => {
        !d.length && !u.length ? b(w) : t.if(S(w), () => b(w));
      });
    }
    function S(w) {
      let $;
      if (d.length > 8) {
        const R = (0, Zr.schemaRefOrVal)(c, n.properties, "properties");
        $ = (0, Qr.isOwnProperty)(t, R, w);
      } else d.length ? $ = (0, Ze.or)(...d.map((R) => (0, Ze._)`${w} === ${R}`)) : $ = Ze.nil;
      return u.length && ($ = (0, Ze.or)($, ...u.map((R) => (0, Ze._)`${(0, Qr.usePattern)(e, R)}.test(${w})`))), (0, Ze.not)($);
    }
    function _(w) {
      t.code((0, Ze._)`delete ${s}[${w}]`);
    }
    function b(w) {
      if (l.removeAdditional === "all" || l.removeAdditional && r === !1) {
        _(w);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: w }), e.error(), i || t.break();
        return;
      }
      if (typeof r == "object" && !(0, Zr.alwaysValidSchema)(c, r)) {
        const $ = t.name("valid");
        l.removeAdditional === "failing" ? (v(w, $, !1), t.if((0, Ze.not)($), () => {
          e.reset(), _(w);
        })) : (v(w, $), i || t.if((0, Ze.not)($), () => t.break()));
      }
    }
    function v(w, $, R) {
      const T = {
        keyword: "additionalProperties",
        dataProp: w,
        dataPropType: Zr.Type.Str
      };
      R === !1 && Object.assign(T, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(T, $);
    }
  }
};
Un.default = Ry;
var $a = {};
Object.defineProperty($a, "__esModule", { value: !0 });
const Oy = Ln(), ji = se, ss = J, Ai = Un, Ny = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: o } = e;
    o.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Ai.default.code(new Oy.KeywordCxt(o, Ai.default, "additionalProperties"));
    const c = (0, ji.allSchemaProperties)(r);
    for (const m of c)
      o.definedProperties.add(m);
    o.opts.unevaluated && c.length && o.props !== !0 && (o.props = ss.mergeEvaluated.props(t, (0, ss.toHash)(c), o.props));
    const i = c.filter((m) => !(0, ss.alwaysValidSchema)(o, r[m]));
    if (i.length === 0)
      return;
    const l = t.name("valid");
    for (const m of i)
      d(m) ? u(m) : (t.if((0, ji.propertyInData)(t, s, m, o.opts.ownProperties)), u(m), o.allErrors || t.else().var(l, !0), t.endIf()), e.it.definedProperties.add(m), e.ok(l);
    function d(m) {
      return o.opts.useDefaults && !o.compositeRule && r[m].default !== void 0;
    }
    function u(m) {
      e.subschema({
        keyword: "properties",
        schemaProp: m,
        dataProp: m
      }, l);
    }
  }
};
$a.default = Ny;
var ya = {};
Object.defineProperty(ya, "__esModule", { value: !0 });
const ki = se, xr = re, Ci = J, Di = J, Ty = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: o } = e, { opts: c } = o, i = (0, ki.allSchemaProperties)(r), l = i.filter((v) => (0, Ci.alwaysValidSchema)(o, r[v]));
    if (i.length === 0 || l.length === i.length && (!o.opts.unevaluated || o.props === !0))
      return;
    const d = c.strictSchema && !c.allowMatchingProperties && s.properties, u = t.name("valid");
    o.props !== !0 && !(o.props instanceof xr.Name) && (o.props = (0, Di.evaluatedPropsToName)(t, o.props));
    const { props: m } = o;
    S();
    function S() {
      for (const v of i)
        d && _(v), o.allErrors ? b(v) : (t.var(u, !0), b(v), t.if(u));
    }
    function _(v) {
      for (const w in d)
        new RegExp(v).test(w) && (0, Ci.checkStrictMode)(o, `property ${w} matches pattern ${v} (use allowMatchingProperties)`);
    }
    function b(v) {
      t.forIn("key", n, (w) => {
        t.if((0, xr._)`${(0, ki.usePattern)(e, v)}.test(${w})`, () => {
          const $ = l.includes(v);
          $ || e.subschema({
            keyword: "patternProperties",
            schemaProp: v,
            dataProp: w,
            dataPropType: Di.Type.Str
          }, u), o.opts.unevaluated && m !== !0 ? t.assign((0, xr._)`${m}[${w}]`, !0) : !$ && !o.allErrors && t.if((0, xr.not)(u), () => t.break());
        });
      });
    }
  }
};
ya.default = Ty;
var _a = {};
Object.defineProperty(_a, "__esModule", { value: !0 });
const Iy = J, jy = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, Iy.alwaysValidSchema)(n, r)) {
      e.fail();
      return;
    }
    const s = t.name("valid");
    e.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, s), e.failResult(s, () => e.reset(), () => e.error());
  },
  error: { message: "must NOT be valid" }
};
_a.default = jy;
var ga = {};
Object.defineProperty(ga, "__esModule", { value: !0 });
const Ay = se, ky = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: Ay.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
ga.default = ky;
var va = {};
Object.defineProperty(va, "__esModule", { value: !0 });
const mn = re, Cy = J, Dy = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, mn._)`{passingSchemas: ${e.passing}}`
}, My = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: Dy,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const o = r, c = t.let("valid", !1), i = t.let("passing", null), l = t.name("_valid");
    e.setParams({ passing: i }), t.block(d), e.result(c, () => e.reset(), () => e.error(!0));
    function d() {
      o.forEach((u, m) => {
        let S;
        (0, Cy.alwaysValidSchema)(s, u) ? t.var(l, !0) : S = e.subschema({
          keyword: "oneOf",
          schemaProp: m,
          compositeRule: !0
        }, l), m > 0 && t.if((0, mn._)`${l} && ${c}`).assign(c, !1).assign(i, (0, mn._)`[${i}, ${m}]`).else(), t.if(l, () => {
          t.assign(c, !0), t.assign(i, m), S && e.mergeEvaluated(S, mn.Name);
        });
      });
    }
  }
};
va.default = My;
var Ea = {};
Object.defineProperty(Ea, "__esModule", { value: !0 });
const Ly = J, Vy = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((o, c) => {
      if ((0, Ly.alwaysValidSchema)(n, o))
        return;
      const i = e.subschema({ keyword: "allOf", schemaProp: c }, s);
      e.ok(s), e.mergeEvaluated(i);
    });
  }
};
Ea.default = Vy;
var wa = {};
Object.defineProperty(wa, "__esModule", { value: !0 });
const Sn = re, ql = J, Fy = {
  message: ({ params: e }) => (0, Sn.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Sn._)`{failingKeyword: ${e.ifClause}}`
}, zy = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: Fy,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, ql.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = Mi(n, "then"), o = Mi(n, "else");
    if (!s && !o)
      return;
    const c = t.let("valid", !0), i = t.name("_valid");
    if (l(), e.reset(), s && o) {
      const u = t.let("ifClause");
      e.setParams({ ifClause: u }), t.if(i, d("then", u), d("else", u));
    } else s ? t.if(i, d("then")) : t.if((0, Sn.not)(i), d("else"));
    e.pass(c, () => e.error(!0));
    function l() {
      const u = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, i);
      e.mergeEvaluated(u);
    }
    function d(u, m) {
      return () => {
        const S = e.subschema({ keyword: u }, i);
        t.assign(c, i), e.mergeValidEvaluated(S, c), m ? t.assign(m, (0, Sn._)`${u}`) : e.setParams({ ifClause: u });
      };
    }
  }
};
function Mi(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, ql.alwaysValidSchema)(e, r);
}
wa.default = zy;
var ba = {};
Object.defineProperty(ba, "__esModule", { value: !0 });
const Uy = J, qy = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, Uy.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
ba.default = qy;
Object.defineProperty(da, "__esModule", { value: !0 });
const Ky = ir, Gy = fa, By = cr, Hy = ha, Wy = ma, Jy = zl, Xy = pa, Yy = Un, Qy = $a, Zy = ya, xy = _a, e_ = ga, t_ = va, r_ = Ea, n_ = wa, s_ = ba;
function o_(e = !1) {
  const t = [
    // any
    xy.default,
    e_.default,
    t_.default,
    r_.default,
    n_.default,
    s_.default,
    // object
    Xy.default,
    Yy.default,
    Jy.default,
    Qy.default,
    Zy.default
  ];
  return e ? t.push(Gy.default, Hy.default) : t.push(Ky.default, By.default), t.push(Wy.default), t;
}
da.default = o_;
var Sa = {}, Pa = {};
Object.defineProperty(Pa, "__esModule", { value: !0 });
const be = re, a_ = {
  message: ({ schemaCode: e }) => (0, be.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, be._)`{format: ${e}}`
}, i_ = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: a_,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: o, schemaCode: c, it: i } = e, { opts: l, errSchemaPath: d, schemaEnv: u, self: m } = i;
    if (!l.validateFormats)
      return;
    s ? S() : _();
    function S() {
      const b = r.scopeValue("formats", {
        ref: m.formats,
        code: l.code.formats
      }), v = r.const("fDef", (0, be._)`${b}[${c}]`), w = r.let("fType"), $ = r.let("format");
      r.if((0, be._)`typeof ${v} == "object" && !(${v} instanceof RegExp)`, () => r.assign(w, (0, be._)`${v}.type || "string"`).assign($, (0, be._)`${v}.validate`), () => r.assign(w, (0, be._)`"string"`).assign($, v)), e.fail$data((0, be.or)(R(), T()));
      function R() {
        return l.strictSchema === !1 ? be.nil : (0, be._)`${c} && !${$}`;
      }
      function T() {
        const A = u.$async ? (0, be._)`(${v}.async ? await ${$}(${n}) : ${$}(${n}))` : (0, be._)`${$}(${n})`, C = (0, be._)`(typeof ${$} == "function" ? ${A} : ${$}.test(${n}))`;
        return (0, be._)`${$} && ${$} !== true && ${w} === ${t} && !${C}`;
      }
    }
    function _() {
      const b = m.formats[o];
      if (!b) {
        R();
        return;
      }
      if (b === !0)
        return;
      const [v, w, $] = T(b);
      v === t && e.pass(A());
      function R() {
        if (l.strictSchema === !1) {
          m.logger.warn(C());
          return;
        }
        throw new Error(C());
        function C() {
          return `unknown format "${o}" ignored in schema at path "${d}"`;
        }
      }
      function T(C) {
        const G = C instanceof RegExp ? (0, be.regexpCode)(C) : l.code.formats ? (0, be._)`${l.code.formats}${(0, be.getProperty)(o)}` : void 0, q = r.scopeValue("formats", { key: o, ref: C, code: G });
        return typeof C == "object" && !(C instanceof RegExp) ? [C.type || "string", C.validate, (0, be._)`${q}.validate`] : ["string", C, q];
      }
      function A() {
        if (typeof b == "object" && !(b instanceof RegExp) && b.async) {
          if (!u.$async)
            throw new Error("async format in sync schema");
          return (0, be._)`await ${$}(${n})`;
        }
        return typeof w == "function" ? (0, be._)`${$}(${n})` : (0, be._)`${$}.test(${n})`;
      }
    }
  }
};
Pa.default = i_;
Object.defineProperty(Sa, "__esModule", { value: !0 });
const c_ = Pa, l_ = [c_.default];
Sa.default = l_;
var sr = {};
Object.defineProperty(sr, "__esModule", { value: !0 });
sr.contentVocabulary = sr.metadataVocabulary = void 0;
sr.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
sr.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(Yo, "__esModule", { value: !0 });
const u_ = Qo, d_ = xo, f_ = da, h_ = Sa, Li = sr, m_ = [
  u_.default,
  d_.default,
  (0, f_.default)(),
  h_.default,
  Li.metadataVocabulary,
  Li.contentVocabulary
];
Yo.default = m_;
var Ra = {}, qn = {};
Object.defineProperty(qn, "__esModule", { value: !0 });
qn.DiscrError = void 0;
var Vi;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Vi || (qn.DiscrError = Vi = {}));
Object.defineProperty(Ra, "__esModule", { value: !0 });
const Xt = re, Is = qn, Fi = ze, p_ = Vn(), $_ = J, y_ = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Is.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, Xt._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, __ = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: y_,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: s, it: o } = e, { oneOf: c } = s;
    if (!o.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const i = n.propertyName;
    if (typeof i != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!c)
      throw new Error("discriminator: requires oneOf keyword");
    const l = t.let("valid", !1), d = t.const("tag", (0, Xt._)`${r}${(0, Xt.getProperty)(i)}`);
    t.if((0, Xt._)`typeof ${d} == "string"`, () => u(), () => e.error(!1, { discrError: Is.DiscrError.Tag, tag: d, tagName: i })), e.ok(l);
    function u() {
      const _ = S();
      t.if(!1);
      for (const b in _)
        t.elseIf((0, Xt._)`${d} === ${b}`), t.assign(l, m(_[b]));
      t.else(), e.error(!1, { discrError: Is.DiscrError.Mapping, tag: d, tagName: i }), t.endIf();
    }
    function m(_) {
      const b = t.name("valid"), v = e.subschema({ keyword: "oneOf", schemaProp: _ }, b);
      return e.mergeEvaluated(v, Xt.Name), b;
    }
    function S() {
      var _;
      const b = {}, v = $(s);
      let w = !0;
      for (let A = 0; A < c.length; A++) {
        let C = c[A];
        if (C != null && C.$ref && !(0, $_.schemaHasRulesButRef)(C, o.self.RULES)) {
          const q = C.$ref;
          if (C = Fi.resolveRef.call(o.self, o.schemaEnv.root, o.baseId, q), C instanceof Fi.SchemaEnv && (C = C.schema), C === void 0)
            throw new p_.default(o.opts.uriResolver, o.baseId, q);
        }
        const G = (_ = C == null ? void 0 : C.properties) === null || _ === void 0 ? void 0 : _[i];
        if (typeof G != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${i}"`);
        w = w && (v || $(C)), R(G, A);
      }
      if (!w)
        throw new Error(`discriminator: "${i}" must be required`);
      return b;
      function $({ required: A }) {
        return Array.isArray(A) && A.includes(i);
      }
      function R(A, C) {
        if (A.const)
          T(A.const, C);
        else if (A.enum)
          for (const G of A.enum)
            T(G, C);
        else
          throw new Error(`discriminator: "properties/${i}" must have "const" or "enum"`);
      }
      function T(A, C) {
        if (typeof A != "string" || A in b)
          throw new Error(`discriminator: "${i}" values must be unique strings`);
        b[A] = C;
      }
    }
  }
};
Ra.default = __;
const g_ = "http://json-schema.org/draft-07/schema#", v_ = "http://json-schema.org/draft-07/schema#", E_ = "Core schema meta-schema", w_ = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $ref: "#"
    }
  },
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    allOf: [
      {
        $ref: "#/definitions/nonNegativeInteger"
      },
      {
        default: 0
      }
    ]
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, b_ = [
  "object",
  "boolean"
], S_ = {
  $id: {
    type: "string",
    format: "uri-reference"
  },
  $schema: {
    type: "string",
    format: "uri"
  },
  $ref: {
    type: "string",
    format: "uri-reference"
  },
  $comment: {
    type: "string"
  },
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  readOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  additionalItems: {
    $ref: "#"
  },
  items: {
    anyOf: [
      {
        $ref: "#"
      },
      {
        $ref: "#/definitions/schemaArray"
      }
    ],
    default: !0
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  contains: {
    $ref: "#"
  },
  maxProperties: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/definitions/stringArray"
  },
  additionalProperties: {
    $ref: "#"
  },
  definitions: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependencies: {
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#"
        },
        {
          $ref: "#/definitions/stringArray"
        }
      ]
    }
  },
  propertyNames: {
    $ref: "#"
  },
  const: !0,
  enum: {
    type: "array",
    items: !0,
    minItems: 1,
    uniqueItems: !0
  },
  type: {
    anyOf: [
      {
        $ref: "#/definitions/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/definitions/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  format: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentEncoding: {
    type: "string"
  },
  if: {
    $ref: "#"
  },
  then: {
    $ref: "#"
  },
  else: {
    $ref: "#"
  },
  allOf: {
    $ref: "#/definitions/schemaArray"
  },
  anyOf: {
    $ref: "#/definitions/schemaArray"
  },
  oneOf: {
    $ref: "#/definitions/schemaArray"
  },
  not: {
    $ref: "#"
  }
}, P_ = {
  $schema: g_,
  $id: v_,
  title: E_,
  definitions: w_,
  type: b_,
  properties: S_,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = yl, n = Yo, s = Ra, o = P_, c = ["/properties"], i = "http://json-schema.org/draft-07/schema";
  class l extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((b) => this.addVocabulary(b)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const b = this.opts.$data ? this.$dataMetaSchema(o, c) : o;
      this.addMetaSchema(b, i, !1), this.refs["http://json-schema.org/schema"] = i;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(i) ? i : void 0);
    }
  }
  t.Ajv = l, e.exports = t = l, e.exports.Ajv = l, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = l;
  var d = Ln();
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return d.KeywordCxt;
  } });
  var u = re;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return u._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return u.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return u.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return u.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return u.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return u.CodeGen;
  } });
  var m = Wo();
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return m.default;
  } });
  var S = Vn();
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return S.default;
  } });
})(bs, bs.exports);
var R_ = bs.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = R_, r = re, n = r.operators, s = {
    formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
    formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
    formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
  }, o = {
    message: ({ keyword: i, schemaCode: l }) => r.str`should be ${s[i].okStr} ${l}`,
    params: ({ keyword: i, schemaCode: l }) => r._`{comparison: ${s[i].okStr}, limit: ${l}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(s),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: o,
    code(i) {
      const { gen: l, data: d, schemaCode: u, keyword: m, it: S } = i, { opts: _, self: b } = S;
      if (!_.validateFormats)
        return;
      const v = new t.KeywordCxt(S, b.RULES.all.format.definition, "format");
      v.$data ? w() : $();
      function w() {
        const T = l.scopeValue("formats", {
          ref: b.formats,
          code: _.code.formats
        }), A = l.const("fmt", r._`${T}[${v.schemaCode}]`);
        i.fail$data(r.or(r._`typeof ${A} != "object"`, r._`${A} instanceof RegExp`, r._`typeof ${A}.compare != "function"`, R(A)));
      }
      function $() {
        const T = v.schema, A = b.formats[T];
        if (!A || A === !0)
          return;
        if (typeof A != "object" || A instanceof RegExp || typeof A.compare != "function")
          throw new Error(`"${m}": format "${T}" does not define "compare" function`);
        const C = l.scopeValue("formats", {
          key: T,
          ref: A,
          code: _.code.formats ? r._`${_.code.formats}${r.getProperty(T)}` : void 0
        });
        i.fail$data(R(C));
      }
      function R(T) {
        return r._`${T}.compare(${d}, ${u}) ${s[m].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const c = (i) => (i.addKeyword(e.formatLimitDefinition), i);
  e.default = c;
})($l);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = pl, n = $l, s = re, o = new s.Name("fullFormats"), c = new s.Name("fastFormats"), i = (d, u = { keywords: !0 }) => {
    if (Array.isArray(u))
      return l(d, u, r.fullFormats, o), d;
    const [m, S] = u.mode === "fast" ? [r.fastFormats, c] : [r.fullFormats, o], _ = u.formats || r.formatNames;
    return l(d, _, m, S), u.keywords && n.default(d), d;
  };
  i.get = (d, u = "full") => {
    const S = (u === "fast" ? r.fastFormats : r.fullFormats)[d];
    if (!S)
      throw new Error(`Unknown format "${d}"`);
    return S;
  };
  function l(d, u, m, S) {
    var _, b;
    (_ = (b = d.opts.code).formats) !== null && _ !== void 0 || (b.formats = s._`require("ajv-formats/dist/formats").${S}`);
    for (const v of u)
      d.addFormat(v, m[v]);
  }
  e.exports = t = i, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = i;
})(ws, ws.exports);
var O_ = ws.exports;
const N_ = (e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const s = Object.getOwnPropertyDescriptor(e, r), o = Object.getOwnPropertyDescriptor(t, r);
  !T_(s, o) && n || Object.defineProperty(e, r, o);
}, T_ = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, I_ = (e, t) => {
  const r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, j_ = (e, t) => `/* Wrapped ${e}*/
${t}`, A_ = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), k_ = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), C_ = (e, t, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, s = j_.bind(null, n, t.toString());
  Object.defineProperty(s, "name", k_), Object.defineProperty(e, "toString", { ...A_, value: s });
}, D_ = (e, t, { ignoreNonConfigurable: r = !1 } = {}) => {
  const { name: n } = e;
  for (const s of Reflect.ownKeys(t))
    N_(e, t, s, r);
  return I_(e, t), C_(e, t, n), e;
};
var M_ = D_;
const L_ = M_;
var V_ = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError(`Expected the first argument to be a function, got \`${typeof e}\``);
  const {
    wait: r = 0,
    before: n = !1,
    after: s = !0
  } = t;
  if (!n && !s)
    throw new Error("Both `before` and `after` are false, function wouldn't be called.");
  let o, c;
  const i = function(...l) {
    const d = this, u = () => {
      o = void 0, s && (c = e.apply(d, l));
    }, m = n && !o;
    return clearTimeout(o), o = setTimeout(u, r), m && (c = e.apply(d, l)), c;
  };
  return L_(i, e), i.cancel = () => {
    o && (clearTimeout(o), o = void 0);
  }, i;
}, js = { exports: {} };
const F_ = "2.0.0", Kl = 256, z_ = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, U_ = 16, q_ = Kl - 6, K_ = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var Kn = {
  MAX_LENGTH: Kl,
  MAX_SAFE_COMPONENT_LENGTH: U_,
  MAX_SAFE_BUILD_LENGTH: q_,
  MAX_SAFE_INTEGER: z_,
  RELEASE_TYPES: K_,
  SEMVER_SPEC_VERSION: F_,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const G_ = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var Gn = G_;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: s
  } = Kn, o = Gn;
  t = e.exports = {};
  const c = t.re = [], i = t.safeRe = [], l = t.src = [], d = t.safeSrc = [], u = t.t = {};
  let m = 0;
  const S = "[a-zA-Z0-9-]", _ = [
    ["\\s", 1],
    ["\\d", s],
    [S, n]
  ], b = (w) => {
    for (const [$, R] of _)
      w = w.split(`${$}*`).join(`${$}{0,${R}}`).split(`${$}+`).join(`${$}{1,${R}}`);
    return w;
  }, v = (w, $, R) => {
    const T = b($), A = m++;
    o(w, A, $), u[w] = A, l[A] = $, d[A] = T, c[A] = new RegExp($, R ? "g" : void 0), i[A] = new RegExp(T, R ? "g" : void 0);
  };
  v("NUMERICIDENTIFIER", "0|[1-9]\\d*"), v("NUMERICIDENTIFIERLOOSE", "\\d+"), v("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${S}*`), v("MAINVERSION", `(${l[u.NUMERICIDENTIFIER]})\\.(${l[u.NUMERICIDENTIFIER]})\\.(${l[u.NUMERICIDENTIFIER]})`), v("MAINVERSIONLOOSE", `(${l[u.NUMERICIDENTIFIERLOOSE]})\\.(${l[u.NUMERICIDENTIFIERLOOSE]})\\.(${l[u.NUMERICIDENTIFIERLOOSE]})`), v("PRERELEASEIDENTIFIER", `(?:${l[u.NUMERICIDENTIFIER]}|${l[u.NONNUMERICIDENTIFIER]})`), v("PRERELEASEIDENTIFIERLOOSE", `(?:${l[u.NUMERICIDENTIFIERLOOSE]}|${l[u.NONNUMERICIDENTIFIER]})`), v("PRERELEASE", `(?:-(${l[u.PRERELEASEIDENTIFIER]}(?:\\.${l[u.PRERELEASEIDENTIFIER]})*))`), v("PRERELEASELOOSE", `(?:-?(${l[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${l[u.PRERELEASEIDENTIFIERLOOSE]})*))`), v("BUILDIDENTIFIER", `${S}+`), v("BUILD", `(?:\\+(${l[u.BUILDIDENTIFIER]}(?:\\.${l[u.BUILDIDENTIFIER]})*))`), v("FULLPLAIN", `v?${l[u.MAINVERSION]}${l[u.PRERELEASE]}?${l[u.BUILD]}?`), v("FULL", `^${l[u.FULLPLAIN]}$`), v("LOOSEPLAIN", `[v=\\s]*${l[u.MAINVERSIONLOOSE]}${l[u.PRERELEASELOOSE]}?${l[u.BUILD]}?`), v("LOOSE", `^${l[u.LOOSEPLAIN]}$`), v("GTLT", "((?:<|>)?=?)"), v("XRANGEIDENTIFIERLOOSE", `${l[u.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), v("XRANGEIDENTIFIER", `${l[u.NUMERICIDENTIFIER]}|x|X|\\*`), v("XRANGEPLAIN", `[v=\\s]*(${l[u.XRANGEIDENTIFIER]})(?:\\.(${l[u.XRANGEIDENTIFIER]})(?:\\.(${l[u.XRANGEIDENTIFIER]})(?:${l[u.PRERELEASE]})?${l[u.BUILD]}?)?)?`), v("XRANGEPLAINLOOSE", `[v=\\s]*(${l[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[u.XRANGEIDENTIFIERLOOSE]})(?:${l[u.PRERELEASELOOSE]})?${l[u.BUILD]}?)?)?`), v("XRANGE", `^${l[u.GTLT]}\\s*${l[u.XRANGEPLAIN]}$`), v("XRANGELOOSE", `^${l[u.GTLT]}\\s*${l[u.XRANGEPLAINLOOSE]}$`), v("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), v("COERCE", `${l[u.COERCEPLAIN]}(?:$|[^\\d])`), v("COERCEFULL", l[u.COERCEPLAIN] + `(?:${l[u.PRERELEASE]})?(?:${l[u.BUILD]})?(?:$|[^\\d])`), v("COERCERTL", l[u.COERCE], !0), v("COERCERTLFULL", l[u.COERCEFULL], !0), v("LONETILDE", "(?:~>?)"), v("TILDETRIM", `(\\s*)${l[u.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", v("TILDE", `^${l[u.LONETILDE]}${l[u.XRANGEPLAIN]}$`), v("TILDELOOSE", `^${l[u.LONETILDE]}${l[u.XRANGEPLAINLOOSE]}$`), v("LONECARET", "(?:\\^)"), v("CARETTRIM", `(\\s*)${l[u.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", v("CARET", `^${l[u.LONECARET]}${l[u.XRANGEPLAIN]}$`), v("CARETLOOSE", `^${l[u.LONECARET]}${l[u.XRANGEPLAINLOOSE]}$`), v("COMPARATORLOOSE", `^${l[u.GTLT]}\\s*(${l[u.LOOSEPLAIN]})$|^$`), v("COMPARATOR", `^${l[u.GTLT]}\\s*(${l[u.FULLPLAIN]})$|^$`), v("COMPARATORTRIM", `(\\s*)${l[u.GTLT]}\\s*(${l[u.LOOSEPLAIN]}|${l[u.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", v("HYPHENRANGE", `^\\s*(${l[u.XRANGEPLAIN]})\\s+-\\s+(${l[u.XRANGEPLAIN]})\\s*$`), v("HYPHENRANGELOOSE", `^\\s*(${l[u.XRANGEPLAINLOOSE]})\\s+-\\s+(${l[u.XRANGEPLAINLOOSE]})\\s*$`), v("STAR", "(<|>)?=?\\s*\\*"), v("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), v("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(js, js.exports);
var Dr = js.exports;
const B_ = Object.freeze({ loose: !0 }), H_ = Object.freeze({}), W_ = (e) => e ? typeof e != "object" ? B_ : e : H_;
var Oa = W_;
const zi = /^[0-9]+$/, Gl = (e, t) => {
  const r = zi.test(e), n = zi.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, J_ = (e, t) => Gl(t, e);
var Bl = {
  compareIdentifiers: Gl,
  rcompareIdentifiers: J_
};
const en = Gn, { MAX_LENGTH: Ui, MAX_SAFE_INTEGER: tn } = Kn, { safeRe: qi, safeSrc: Ki, t: rn } = Dr, X_ = Oa, { compareIdentifiers: Wt } = Bl;
let Y_ = class st {
  constructor(t, r) {
    if (r = X_(r), t instanceof st) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > Ui)
      throw new TypeError(
        `version is longer than ${Ui} characters`
      );
    en("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? qi[rn.LOOSE] : qi[rn.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > tn || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > tn || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > tn || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((s) => {
      if (/^[0-9]+$/.test(s)) {
        const o = +s;
        if (o >= 0 && o < tn)
          return o;
      }
      return s;
    }) : this.prerelease = [], this.build = n[5] ? n[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (en("SemVer.compare", this.version, this.options, t), !(t instanceof st)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new st(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof st || (t = new st(t, this.options)), Wt(this.major, t.major) || Wt(this.minor, t.minor) || Wt(this.patch, t.patch);
  }
  comparePre(t) {
    if (t instanceof st || (t = new st(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], s = t.prerelease[r];
      if (en("prerelease compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return Wt(n, s);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof st || (t = new st(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], s = t.build[r];
      if (en("build compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return Wt(n, s);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const s = new RegExp(`^${this.options.loose ? Ki[rn.PRERELEASELOOSE] : Ki[rn.PRERELEASE]}$`), o = `-${r}`.match(s);
        if (!o || o[1] !== r)
          throw new Error(`invalid identifier: ${r}`);
      }
    }
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", r, n);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", r, n);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "release":
        if (this.prerelease.length === 0)
          throw new Error(`version ${this.raw} is not a prerelease`);
        this.prerelease.length = 0;
        break;
      case "major":
        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
        break;
      case "pre": {
        const s = Number(n) ? 1 : 0;
        if (this.prerelease.length === 0)
          this.prerelease = [s];
        else {
          let o = this.prerelease.length;
          for (; --o >= 0; )
            typeof this.prerelease[o] == "number" && (this.prerelease[o]++, o = -2);
          if (o === -1) {
            if (r === this.prerelease.join(".") && n === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(s);
          }
        }
        if (r) {
          let o = [r, s];
          n === !1 && (o = [r]), Wt(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = o) : this.prerelease = o;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var De = Y_;
const Gi = De, Q_ = (e, t, r = !1) => {
  if (e instanceof Gi)
    return e;
  try {
    return new Gi(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var lr = Q_;
const Z_ = lr, x_ = (e, t) => {
  const r = Z_(e, t);
  return r ? r.version : null;
};
var eg = x_;
const tg = lr, rg = (e, t) => {
  const r = tg(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var ng = rg;
const Bi = De, sg = (e, t, r, n, s) => {
  typeof r == "string" && (s = n, n = r, r = void 0);
  try {
    return new Bi(
      e instanceof Bi ? e.version : e,
      r
    ).inc(t, n, s).version;
  } catch {
    return null;
  }
};
var og = sg;
const Hi = lr, ag = (e, t) => {
  const r = Hi(e, null, !0), n = Hi(t, null, !0), s = r.compare(n);
  if (s === 0)
    return null;
  const o = s > 0, c = o ? r : n, i = o ? n : r, l = !!c.prerelease.length;
  if (!!i.prerelease.length && !l) {
    if (!i.patch && !i.minor)
      return "major";
    if (i.compareMain(c) === 0)
      return i.minor && !i.patch ? "minor" : "patch";
  }
  const u = l ? "pre" : "";
  return r.major !== n.major ? u + "major" : r.minor !== n.minor ? u + "minor" : r.patch !== n.patch ? u + "patch" : "prerelease";
};
var ig = ag;
const cg = De, lg = (e, t) => new cg(e, t).major;
var ug = lg;
const dg = De, fg = (e, t) => new dg(e, t).minor;
var hg = fg;
const mg = De, pg = (e, t) => new mg(e, t).patch;
var $g = pg;
const yg = lr, _g = (e, t) => {
  const r = yg(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var gg = _g;
const Wi = De, vg = (e, t, r) => new Wi(e, r).compare(new Wi(t, r));
var rt = vg;
const Eg = rt, wg = (e, t, r) => Eg(t, e, r);
var bg = wg;
const Sg = rt, Pg = (e, t) => Sg(e, t, !0);
var Rg = Pg;
const Ji = De, Og = (e, t, r) => {
  const n = new Ji(e, r), s = new Ji(t, r);
  return n.compare(s) || n.compareBuild(s);
};
var Na = Og;
const Ng = Na, Tg = (e, t) => e.sort((r, n) => Ng(r, n, t));
var Ig = Tg;
const jg = Na, Ag = (e, t) => e.sort((r, n) => jg(n, r, t));
var kg = Ag;
const Cg = rt, Dg = (e, t, r) => Cg(e, t, r) > 0;
var Bn = Dg;
const Mg = rt, Lg = (e, t, r) => Mg(e, t, r) < 0;
var Ta = Lg;
const Vg = rt, Fg = (e, t, r) => Vg(e, t, r) === 0;
var Hl = Fg;
const zg = rt, Ug = (e, t, r) => zg(e, t, r) !== 0;
var Wl = Ug;
const qg = rt, Kg = (e, t, r) => qg(e, t, r) >= 0;
var Ia = Kg;
const Gg = rt, Bg = (e, t, r) => Gg(e, t, r) <= 0;
var ja = Bg;
const Hg = Hl, Wg = Wl, Jg = Bn, Xg = Ia, Yg = Ta, Qg = ja, Zg = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return Hg(e, r, n);
    case "!=":
      return Wg(e, r, n);
    case ">":
      return Jg(e, r, n);
    case ">=":
      return Xg(e, r, n);
    case "<":
      return Yg(e, r, n);
    case "<=":
      return Qg(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var Jl = Zg;
const xg = De, e0 = lr, { safeRe: nn, t: sn } = Dr, t0 = (e, t) => {
  if (e instanceof xg)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? nn[sn.COERCEFULL] : nn[sn.COERCE]);
  else {
    const l = t.includePrerelease ? nn[sn.COERCERTLFULL] : nn[sn.COERCERTL];
    let d;
    for (; (d = l.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || d.index + d[0].length !== r.index + r[0].length) && (r = d), l.lastIndex = d.index + d[1].length + d[2].length;
    l.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], s = r[3] || "0", o = r[4] || "0", c = t.includePrerelease && r[5] ? `-${r[5]}` : "", i = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return e0(`${n}.${s}.${o}${c}${i}`, t);
};
var r0 = t0;
class n0 {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(t) {
    const r = this.map.get(t);
    if (r !== void 0)
      return this.map.delete(t), this.map.set(t, r), r;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, r) {
    if (!this.delete(t) && r !== void 0) {
      if (this.map.size >= this.max) {
        const s = this.map.keys().next().value;
        this.delete(s);
      }
      this.map.set(t, r);
    }
    return this;
  }
}
var s0 = n0, os, Xi;
function nt() {
  if (Xi) return os;
  Xi = 1;
  const e = /\s+/g;
  class t {
    constructor(F, B) {
      if (B = s(B), F instanceof t)
        return F.loose === !!B.loose && F.includePrerelease === !!B.includePrerelease ? F : new t(F.raw, B);
      if (F instanceof o)
        return this.raw = F.value, this.set = [[F]], this.formatted = void 0, this;
      if (this.options = B, this.loose = !!B.loose, this.includePrerelease = !!B.includePrerelease, this.raw = F.trim().replace(e, " "), this.set = this.raw.split("||").map((z) => this.parseRange(z.trim())).filter((z) => z.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const z = this.set[0];
        if (this.set = this.set.filter((O) => !v(O[0])), this.set.length === 0)
          this.set = [z];
        else if (this.set.length > 1) {
          for (const O of this.set)
            if (O.length === 1 && w(O[0])) {
              this.set = [O];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let F = 0; F < this.set.length; F++) {
          F > 0 && (this.formatted += "||");
          const B = this.set[F];
          for (let z = 0; z < B.length; z++)
            z > 0 && (this.formatted += " "), this.formatted += B[z].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(F) {
      const z = ((this.options.includePrerelease && _) | (this.options.loose && b)) + ":" + F, O = n.get(z);
      if (O)
        return O;
      const I = this.options.loose, y = I ? l[d.HYPHENRANGELOOSE] : l[d.HYPHENRANGE];
      F = F.replace(y, X(this.options.includePrerelease)), c("hyphen replace", F), F = F.replace(l[d.COMPARATORTRIM], u), c("comparator trim", F), F = F.replace(l[d.TILDETRIM], m), c("tilde trim", F), F = F.replace(l[d.CARETTRIM], S), c("caret trim", F);
      let h = F.split(" ").map((f) => R(f, this.options)).join(" ").split(/\s+/).map((f) => x(f, this.options));
      I && (h = h.filter((f) => (c("loose invalid filter", f, this.options), !!f.match(l[d.COMPARATORLOOSE])))), c("range list", h);
      const E = /* @__PURE__ */ new Map(), p = h.map((f) => new o(f, this.options));
      for (const f of p) {
        if (v(f))
          return [f];
        E.set(f.value, f);
      }
      E.size > 1 && E.has("") && E.delete("");
      const a = [...E.values()];
      return n.set(z, a), a;
    }
    intersects(F, B) {
      if (!(F instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((z) => $(z, B) && F.set.some((O) => $(O, B) && z.every((I) => O.every((y) => I.intersects(y, B)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(F) {
      if (!F)
        return !1;
      if (typeof F == "string")
        try {
          F = new i(F, this.options);
        } catch {
          return !1;
        }
      for (let B = 0; B < this.set.length; B++)
        if (Z(this.set[B], F, this.options))
          return !0;
      return !1;
    }
  }
  os = t;
  const r = s0, n = new r(), s = Oa, o = Hn(), c = Gn, i = De, {
    safeRe: l,
    t: d,
    comparatorTrimReplace: u,
    tildeTrimReplace: m,
    caretTrimReplace: S
  } = Dr, { FLAG_INCLUDE_PRERELEASE: _, FLAG_LOOSE: b } = Kn, v = (L) => L.value === "<0.0.0-0", w = (L) => L.value === "", $ = (L, F) => {
    let B = !0;
    const z = L.slice();
    let O = z.pop();
    for (; B && z.length; )
      B = z.every((I) => O.intersects(I, F)), O = z.pop();
    return B;
  }, R = (L, F) => (c("comp", L, F), L = G(L, F), c("caret", L), L = A(L, F), c("tildes", L), L = oe(L, F), c("xrange", L), L = Q(L, F), c("stars", L), L), T = (L) => !L || L.toLowerCase() === "x" || L === "*", A = (L, F) => L.trim().split(/\s+/).map((B) => C(B, F)).join(" "), C = (L, F) => {
    const B = F.loose ? l[d.TILDELOOSE] : l[d.TILDE];
    return L.replace(B, (z, O, I, y, h) => {
      c("tilde", L, z, O, I, y, h);
      let E;
      return T(O) ? E = "" : T(I) ? E = `>=${O}.0.0 <${+O + 1}.0.0-0` : T(y) ? E = `>=${O}.${I}.0 <${O}.${+I + 1}.0-0` : h ? (c("replaceTilde pr", h), E = `>=${O}.${I}.${y}-${h} <${O}.${+I + 1}.0-0`) : E = `>=${O}.${I}.${y} <${O}.${+I + 1}.0-0`, c("tilde return", E), E;
    });
  }, G = (L, F) => L.trim().split(/\s+/).map((B) => q(B, F)).join(" "), q = (L, F) => {
    c("caret", L, F);
    const B = F.loose ? l[d.CARETLOOSE] : l[d.CARET], z = F.includePrerelease ? "-0" : "";
    return L.replace(B, (O, I, y, h, E) => {
      c("caret", L, O, I, y, h, E);
      let p;
      return T(I) ? p = "" : T(y) ? p = `>=${I}.0.0${z} <${+I + 1}.0.0-0` : T(h) ? I === "0" ? p = `>=${I}.${y}.0${z} <${I}.${+y + 1}.0-0` : p = `>=${I}.${y}.0${z} <${+I + 1}.0.0-0` : E ? (c("replaceCaret pr", E), I === "0" ? y === "0" ? p = `>=${I}.${y}.${h}-${E} <${I}.${y}.${+h + 1}-0` : p = `>=${I}.${y}.${h}-${E} <${I}.${+y + 1}.0-0` : p = `>=${I}.${y}.${h}-${E} <${+I + 1}.0.0-0`) : (c("no pr"), I === "0" ? y === "0" ? p = `>=${I}.${y}.${h}${z} <${I}.${y}.${+h + 1}-0` : p = `>=${I}.${y}.${h}${z} <${I}.${+y + 1}.0-0` : p = `>=${I}.${y}.${h} <${+I + 1}.0.0-0`), c("caret return", p), p;
    });
  }, oe = (L, F) => (c("replaceXRanges", L, F), L.split(/\s+/).map((B) => K(B, F)).join(" ")), K = (L, F) => {
    L = L.trim();
    const B = F.loose ? l[d.XRANGELOOSE] : l[d.XRANGE];
    return L.replace(B, (z, O, I, y, h, E) => {
      c("xRange", L, z, O, I, y, h, E);
      const p = T(I), a = p || T(y), f = a || T(h), N = f;
      return O === "=" && N && (O = ""), E = F.includePrerelease ? "-0" : "", p ? O === ">" || O === "<" ? z = "<0.0.0-0" : z = "*" : O && N ? (a && (y = 0), h = 0, O === ">" ? (O = ">=", a ? (I = +I + 1, y = 0, h = 0) : (y = +y + 1, h = 0)) : O === "<=" && (O = "<", a ? I = +I + 1 : y = +y + 1), O === "<" && (E = "-0"), z = `${O + I}.${y}.${h}${E}`) : a ? z = `>=${I}.0.0${E} <${+I + 1}.0.0-0` : f && (z = `>=${I}.${y}.0${E} <${I}.${+y + 1}.0-0`), c("xRange return", z), z;
    });
  }, Q = (L, F) => (c("replaceStars", L, F), L.trim().replace(l[d.STAR], "")), x = (L, F) => (c("replaceGTE0", L, F), L.trim().replace(l[F.includePrerelease ? d.GTE0PRE : d.GTE0], "")), X = (L) => (F, B, z, O, I, y, h, E, p, a, f, N) => (T(z) ? B = "" : T(O) ? B = `>=${z}.0.0${L ? "-0" : ""}` : T(I) ? B = `>=${z}.${O}.0${L ? "-0" : ""}` : y ? B = `>=${B}` : B = `>=${B}${L ? "-0" : ""}`, T(p) ? E = "" : T(a) ? E = `<${+p + 1}.0.0-0` : T(f) ? E = `<${p}.${+a + 1}.0-0` : N ? E = `<=${p}.${a}.${f}-${N}` : L ? E = `<${p}.${a}.${+f + 1}-0` : E = `<=${E}`, `${B} ${E}`.trim()), Z = (L, F, B) => {
    for (let z = 0; z < L.length; z++)
      if (!L[z].test(F))
        return !1;
    if (F.prerelease.length && !B.includePrerelease) {
      for (let z = 0; z < L.length; z++)
        if (c(L[z].semver), L[z].semver !== o.ANY && L[z].semver.prerelease.length > 0) {
          const O = L[z].semver;
          if (O.major === F.major && O.minor === F.minor && O.patch === F.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return os;
}
var as, Yi;
function Hn() {
  if (Yi) return as;
  Yi = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(u, m) {
      if (m = r(m), u instanceof t) {
        if (u.loose === !!m.loose)
          return u;
        u = u.value;
      }
      u = u.trim().split(/\s+/).join(" "), c("comparator", u, m), this.options = m, this.loose = !!m.loose, this.parse(u), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, c("comp", this);
    }
    parse(u) {
      const m = this.options.loose ? n[s.COMPARATORLOOSE] : n[s.COMPARATOR], S = u.match(m);
      if (!S)
        throw new TypeError(`Invalid comparator: ${u}`);
      this.operator = S[1] !== void 0 ? S[1] : "", this.operator === "=" && (this.operator = ""), S[2] ? this.semver = new i(S[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(u) {
      if (c("Comparator.test", u, this.options.loose), this.semver === e || u === e)
        return !0;
      if (typeof u == "string")
        try {
          u = new i(u, this.options);
        } catch {
          return !1;
        }
      return o(u, this.operator, this.semver, this.options);
    }
    intersects(u, m) {
      if (!(u instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new l(u.value, m).test(this.value) : u.operator === "" ? u.value === "" ? !0 : new l(this.value, m).test(u.semver) : (m = r(m), m.includePrerelease && (this.value === "<0.0.0-0" || u.value === "<0.0.0-0") || !m.includePrerelease && (this.value.startsWith("<0.0.0") || u.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && u.operator.startsWith(">") || this.operator.startsWith("<") && u.operator.startsWith("<") || this.semver.version === u.semver.version && this.operator.includes("=") && u.operator.includes("=") || o(this.semver, "<", u.semver, m) && this.operator.startsWith(">") && u.operator.startsWith("<") || o(this.semver, ">", u.semver, m) && this.operator.startsWith("<") && u.operator.startsWith(">")));
    }
  }
  as = t;
  const r = Oa, { safeRe: n, t: s } = Dr, o = Jl, c = Gn, i = De, l = nt();
  return as;
}
const o0 = nt(), a0 = (e, t, r) => {
  try {
    t = new o0(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var Wn = a0;
const i0 = nt(), c0 = (e, t) => new i0(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var l0 = c0;
const u0 = De, d0 = nt(), f0 = (e, t, r) => {
  let n = null, s = null, o = null;
  try {
    o = new d0(t, r);
  } catch {
    return null;
  }
  return e.forEach((c) => {
    o.test(c) && (!n || s.compare(c) === -1) && (n = c, s = new u0(n, r));
  }), n;
};
var h0 = f0;
const m0 = De, p0 = nt(), $0 = (e, t, r) => {
  let n = null, s = null, o = null;
  try {
    o = new p0(t, r);
  } catch {
    return null;
  }
  return e.forEach((c) => {
    o.test(c) && (!n || s.compare(c) === 1) && (n = c, s = new m0(n, r));
  }), n;
};
var y0 = $0;
const is = De, _0 = nt(), Qi = Bn, g0 = (e, t) => {
  e = new _0(e, t);
  let r = new is("0.0.0");
  if (e.test(r) || (r = new is("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const s = e.set[n];
    let o = null;
    s.forEach((c) => {
      const i = new is(c.semver.version);
      switch (c.operator) {
        case ">":
          i.prerelease.length === 0 ? i.patch++ : i.prerelease.push(0), i.raw = i.format();
        case "":
        case ">=":
          (!o || Qi(i, o)) && (o = i);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${c.operator}`);
      }
    }), o && (!r || Qi(r, o)) && (r = o);
  }
  return r && e.test(r) ? r : null;
};
var v0 = g0;
const E0 = nt(), w0 = (e, t) => {
  try {
    return new E0(e, t).range || "*";
  } catch {
    return null;
  }
};
var b0 = w0;
const S0 = De, Xl = Hn(), { ANY: P0 } = Xl, R0 = nt(), O0 = Wn, Zi = Bn, xi = Ta, N0 = ja, T0 = Ia, I0 = (e, t, r, n) => {
  e = new S0(e, n), t = new R0(t, n);
  let s, o, c, i, l;
  switch (r) {
    case ">":
      s = Zi, o = N0, c = xi, i = ">", l = ">=";
      break;
    case "<":
      s = xi, o = T0, c = Zi, i = "<", l = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (O0(e, t, n))
    return !1;
  for (let d = 0; d < t.set.length; ++d) {
    const u = t.set[d];
    let m = null, S = null;
    if (u.forEach((_) => {
      _.semver === P0 && (_ = new Xl(">=0.0.0")), m = m || _, S = S || _, s(_.semver, m.semver, n) ? m = _ : c(_.semver, S.semver, n) && (S = _);
    }), m.operator === i || m.operator === l || (!S.operator || S.operator === i) && o(e, S.semver))
      return !1;
    if (S.operator === l && c(e, S.semver))
      return !1;
  }
  return !0;
};
var Aa = I0;
const j0 = Aa, A0 = (e, t, r) => j0(e, t, ">", r);
var k0 = A0;
const C0 = Aa, D0 = (e, t, r) => C0(e, t, "<", r);
var M0 = D0;
const ec = nt(), L0 = (e, t, r) => (e = new ec(e, r), t = new ec(t, r), e.intersects(t, r));
var V0 = L0;
const F0 = Wn, z0 = rt;
var U0 = (e, t, r) => {
  const n = [];
  let s = null, o = null;
  const c = e.sort((u, m) => z0(u, m, r));
  for (const u of c)
    F0(u, t, r) ? (o = u, s || (s = u)) : (o && n.push([s, o]), o = null, s = null);
  s && n.push([s, null]);
  const i = [];
  for (const [u, m] of n)
    u === m ? i.push(u) : !m && u === c[0] ? i.push("*") : m ? u === c[0] ? i.push(`<=${m}`) : i.push(`${u} - ${m}`) : i.push(`>=${u}`);
  const l = i.join(" || "), d = typeof t.raw == "string" ? t.raw : String(t);
  return l.length < d.length ? l : t;
};
const tc = nt(), ka = Hn(), { ANY: cs } = ka, $r = Wn, Ca = rt, q0 = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new tc(e, r), t = new tc(t, r);
  let n = !1;
  e: for (const s of e.set) {
    for (const o of t.set) {
      const c = G0(s, o, r);
      if (n = n || c !== null, c)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, K0 = [new ka(">=0.0.0-0")], rc = [new ka(">=0.0.0")], G0 = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === cs) {
    if (t.length === 1 && t[0].semver === cs)
      return !0;
    r.includePrerelease ? e = K0 : e = rc;
  }
  if (t.length === 1 && t[0].semver === cs) {
    if (r.includePrerelease)
      return !0;
    t = rc;
  }
  const n = /* @__PURE__ */ new Set();
  let s, o;
  for (const _ of e)
    _.operator === ">" || _.operator === ">=" ? s = nc(s, _, r) : _.operator === "<" || _.operator === "<=" ? o = sc(o, _, r) : n.add(_.semver);
  if (n.size > 1)
    return null;
  let c;
  if (s && o) {
    if (c = Ca(s.semver, o.semver, r), c > 0)
      return null;
    if (c === 0 && (s.operator !== ">=" || o.operator !== "<="))
      return null;
  }
  for (const _ of n) {
    if (s && !$r(_, String(s), r) || o && !$r(_, String(o), r))
      return null;
    for (const b of t)
      if (!$r(_, String(b), r))
        return !1;
    return !0;
  }
  let i, l, d, u, m = o && !r.includePrerelease && o.semver.prerelease.length ? o.semver : !1, S = s && !r.includePrerelease && s.semver.prerelease.length ? s.semver : !1;
  m && m.prerelease.length === 1 && o.operator === "<" && m.prerelease[0] === 0 && (m = !1);
  for (const _ of t) {
    if (u = u || _.operator === ">" || _.operator === ">=", d = d || _.operator === "<" || _.operator === "<=", s) {
      if (S && _.semver.prerelease && _.semver.prerelease.length && _.semver.major === S.major && _.semver.minor === S.minor && _.semver.patch === S.patch && (S = !1), _.operator === ">" || _.operator === ">=") {
        if (i = nc(s, _, r), i === _ && i !== s)
          return !1;
      } else if (s.operator === ">=" && !$r(s.semver, String(_), r))
        return !1;
    }
    if (o) {
      if (m && _.semver.prerelease && _.semver.prerelease.length && _.semver.major === m.major && _.semver.minor === m.minor && _.semver.patch === m.patch && (m = !1), _.operator === "<" || _.operator === "<=") {
        if (l = sc(o, _, r), l === _ && l !== o)
          return !1;
      } else if (o.operator === "<=" && !$r(o.semver, String(_), r))
        return !1;
    }
    if (!_.operator && (o || s) && c !== 0)
      return !1;
  }
  return !(s && d && !o && c !== 0 || o && u && !s && c !== 0 || S || m);
}, nc = (e, t, r) => {
  if (!e)
    return t;
  const n = Ca(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, sc = (e, t, r) => {
  if (!e)
    return t;
  const n = Ca(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var B0 = q0;
const ls = Dr, oc = Kn, H0 = De, ac = Bl, W0 = lr, J0 = eg, X0 = ng, Y0 = og, Q0 = ig, Z0 = ug, x0 = hg, ev = $g, tv = gg, rv = rt, nv = bg, sv = Rg, ov = Na, av = Ig, iv = kg, cv = Bn, lv = Ta, uv = Hl, dv = Wl, fv = Ia, hv = ja, mv = Jl, pv = r0, $v = Hn(), yv = nt(), _v = Wn, gv = l0, vv = h0, Ev = y0, wv = v0, bv = b0, Sv = Aa, Pv = k0, Rv = M0, Ov = V0, Nv = U0, Tv = B0;
var Iv = {
  parse: W0,
  valid: J0,
  clean: X0,
  inc: Y0,
  diff: Q0,
  major: Z0,
  minor: x0,
  patch: ev,
  prerelease: tv,
  compare: rv,
  rcompare: nv,
  compareLoose: sv,
  compareBuild: ov,
  sort: av,
  rsort: iv,
  gt: cv,
  lt: lv,
  eq: uv,
  neq: dv,
  gte: fv,
  lte: hv,
  cmp: mv,
  coerce: pv,
  Comparator: $v,
  Range: yv,
  satisfies: _v,
  toComparators: gv,
  maxSatisfying: vv,
  minSatisfying: Ev,
  minVersion: wv,
  validRange: bv,
  outside: Sv,
  gtr: Pv,
  ltr: Rv,
  intersects: Ov,
  simplifyRange: Nv,
  subset: Tv,
  SemVer: H0,
  re: ls.re,
  src: ls.src,
  tokens: ls.t,
  SEMVER_SPEC_VERSION: oc.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: oc.RELEASE_TYPES,
  compareIdentifiers: ac.compareIdentifiers,
  rcompareIdentifiers: ac.rcompareIdentifiers
}, Jn = { exports: {} }, Da = { exports: {} };
const Yl = (e, t) => {
  for (const r of Reflect.ownKeys(t))
    Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
  return e;
};
Da.exports = Yl;
Da.exports.default = Yl;
var jv = Da.exports;
const Av = jv, Pn = /* @__PURE__ */ new WeakMap(), Ql = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError("Expected a function");
  let r, n = 0;
  const s = e.displayName || e.name || "<anonymous>", o = function(...c) {
    if (Pn.set(o, ++n), n === 1)
      r = e.apply(this, c), e = null;
    else if (t.throw === !0)
      throw new Error(`Function \`${s}\` can only be called once`);
    return r;
  };
  return Av(o, e), Pn.set(o, n), o;
};
Jn.exports = Ql;
Jn.exports.default = Ql;
Jn.exports.callCount = (e) => {
  if (!Pn.has(e))
    throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
  return Pn.get(e);
};
var kv = Jn.exports;
(function(e, t) {
  var r = wt && wt.__classPrivateFieldSet || function(z, O, I, y, h) {
    if (y === "m") throw new TypeError("Private method is not writable");
    if (y === "a" && !h) throw new TypeError("Private accessor was defined without a setter");
    if (typeof O == "function" ? z !== O || !h : !O.has(z)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return y === "a" ? h.call(z, I) : h ? h.value = I : O.set(z, I), I;
  }, n = wt && wt.__classPrivateFieldGet || function(z, O, I, y) {
    if (I === "a" && !y) throw new TypeError("Private accessor was defined without a getter");
    if (typeof O == "function" ? z !== O || !y : !O.has(z)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return I === "m" ? y : I === "a" ? y.call(z) : y ? y.value : O.get(z);
  }, s, o, c, i, l, d;
  Object.defineProperty(t, "__esModule", { value: !0 });
  const u = hc, m = ks, S = Ot, _ = eu, b = tu, v = fc, w = pu, $ = Ru, R = Iu, T = at, A = np, C = O_, G = V_, q = Iv, oe = kv, K = "aes-256-cbc", Q = () => /* @__PURE__ */ Object.create(null), x = (z) => z != null;
  let X = "";
  try {
    delete require.cache[__filename], X = S.dirname((o = (s = e.parent) === null || s === void 0 ? void 0 : s.filename) !== null && o !== void 0 ? o : ".");
  } catch {
  }
  const Z = (z, O) => {
    const I = /* @__PURE__ */ new Set([
      "undefined",
      "symbol",
      "function"
    ]), y = typeof O;
    if (I.has(y))
      throw new TypeError(`Setting a value of type \`${y}\` for key \`${z}\` is not allowed as it's not supported by JSON`);
  }, L = "__internal__", F = `${L}.migrations.version`;
  class B {
    constructor(O = {}) {
      var I;
      c.set(this, void 0), i.set(this, void 0), l.set(this, void 0), d.set(this, {}), this._deserialize = (f) => JSON.parse(f), this._serialize = (f) => JSON.stringify(f, void 0, "	");
      const y = {
        configName: "config",
        fileExtension: "json",
        projectSuffix: "nodejs",
        clearInvalidConfig: !1,
        accessPropertiesByDotNotation: !0,
        configFileMode: 438,
        ...O
      }, h = oe(() => {
        const f = $.sync({ cwd: X }), N = f && JSON.parse(m.readFileSync(f, "utf8"));
        return N ?? {};
      });
      if (!y.cwd) {
        if (y.projectName || (y.projectName = h().name), !y.projectName)
          throw new Error("Project name could not be inferred. Please specify the `projectName` option.");
        y.cwd = R(y.projectName, { suffix: y.projectSuffix }).config;
      }
      if (r(this, l, y, "f"), y.schema) {
        if (typeof y.schema != "object")
          throw new TypeError("The `schema` option must be an object.");
        const f = new A.default({
          allErrors: !0,
          useDefaults: !0
        });
        (0, C.default)(f);
        const N = {
          type: "object",
          properties: y.schema
        };
        r(this, c, f.compile(N), "f");
        for (const [D, M] of Object.entries(y.schema))
          M != null && M.default && (n(this, d, "f")[D] = M.default);
      }
      y.defaults && r(this, d, {
        ...n(this, d, "f"),
        ...y.defaults
      }, "f"), y.serialize && (this._serialize = y.serialize), y.deserialize && (this._deserialize = y.deserialize), this.events = new v.EventEmitter(), r(this, i, y.encryptionKey, "f");
      const E = y.fileExtension ? `.${y.fileExtension}` : "";
      this.path = S.resolve(y.cwd, `${(I = y.configName) !== null && I !== void 0 ? I : "config"}${E}`);
      const p = this.store, a = Object.assign(Q(), y.defaults, p);
      this._validate(a);
      try {
        b.deepEqual(p, a);
      } catch {
        this.store = a;
      }
      if (y.watch && this._watch(), y.migrations) {
        if (y.projectVersion || (y.projectVersion = h().version), !y.projectVersion)
          throw new Error("Project version could not be inferred. Please specify the `projectVersion` option.");
        this._migrate(y.migrations, y.projectVersion, y.beforeEachMigration);
      }
    }
    get(O, I) {
      if (n(this, l, "f").accessPropertiesByDotNotation)
        return this._get(O, I);
      const { store: y } = this;
      return O in y ? y[O] : I;
    }
    set(O, I) {
      if (typeof O != "string" && typeof O != "object")
        throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof O}`);
      if (typeof O != "object" && I === void 0)
        throw new TypeError("Use `delete()` to clear values");
      if (this._containsReservedKey(O))
        throw new TypeError(`Please don't use the ${L} key, as it's used to manage this module internal operations.`);
      const { store: y } = this, h = (E, p) => {
        Z(E, p), n(this, l, "f").accessPropertiesByDotNotation ? w.set(y, E, p) : y[E] = p;
      };
      if (typeof O == "object") {
        const E = O;
        for (const [p, a] of Object.entries(E))
          h(p, a);
      } else
        h(O, I);
      this.store = y;
    }
    /**
        Check if an item exists.
    
        @param key - The key of the item to check.
        */
    has(O) {
      return n(this, l, "f").accessPropertiesByDotNotation ? w.has(this.store, O) : O in this.store;
    }
    /**
        Reset items to their default values, as defined by the `defaults` or `schema` option.
    
        @see `clear()` to reset all items.
    
        @param keys - The keys of the items to reset.
        */
    reset(...O) {
      for (const I of O)
        x(n(this, d, "f")[I]) && this.set(I, n(this, d, "f")[I]);
    }
    /**
        Delete an item.
    
        @param key - The key of the item to delete.
        */
    delete(O) {
      const { store: I } = this;
      n(this, l, "f").accessPropertiesByDotNotation ? w.delete(I, O) : delete I[O], this.store = I;
    }
    /**
        Delete all items.
    
        This resets known items to their default values, if defined by the `defaults` or `schema` option.
        */
    clear() {
      this.store = Q();
      for (const O of Object.keys(n(this, d, "f")))
        this.reset(O);
    }
    /**
        Watches the given `key`, calling `callback` on any changes.
    
        @param key - The key wo watch.
        @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
        @returns A function, that when called, will unsubscribe.
        */
    onDidChange(O, I) {
      if (typeof O != "string")
        throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof O}`);
      if (typeof I != "function")
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof I}`);
      return this._handleChange(() => this.get(O), I);
    }
    /**
        Watches the whole config object, calling `callback` on any changes.
    
        @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
        @returns A function, that when called, will unsubscribe.
        */
    onDidAnyChange(O) {
      if (typeof O != "function")
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof O}`);
      return this._handleChange(() => this.store, O);
    }
    get size() {
      return Object.keys(this.store).length;
    }
    get store() {
      try {
        const O = m.readFileSync(this.path, n(this, i, "f") ? null : "utf8"), I = this._encryptData(O), y = this._deserialize(I);
        return this._validate(y), Object.assign(Q(), y);
      } catch (O) {
        if ((O == null ? void 0 : O.code) === "ENOENT")
          return this._ensureDirectory(), Q();
        if (n(this, l, "f").clearInvalidConfig && O.name === "SyntaxError")
          return Q();
        throw O;
      }
    }
    set store(O) {
      this._ensureDirectory(), this._validate(O), this._write(O), this.events.emit("change");
    }
    *[(c = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new WeakMap(), Symbol.iterator)]() {
      for (const [O, I] of Object.entries(this.store))
        yield [O, I];
    }
    _encryptData(O) {
      if (!n(this, i, "f"))
        return O.toString();
      try {
        if (n(this, i, "f"))
          try {
            if (O.slice(16, 17).toString() === ":") {
              const I = O.slice(0, 16), y = _.pbkdf2Sync(n(this, i, "f"), I.toString(), 1e4, 32, "sha512"), h = _.createDecipheriv(K, y, I);
              O = Buffer.concat([h.update(Buffer.from(O.slice(17))), h.final()]).toString("utf8");
            } else {
              const I = _.createDecipher(K, n(this, i, "f"));
              O = Buffer.concat([I.update(Buffer.from(O)), I.final()]).toString("utf8");
            }
          } catch {
          }
      } catch {
      }
      return O.toString();
    }
    _handleChange(O, I) {
      let y = O();
      const h = () => {
        const E = y, p = O();
        (0, u.isDeepStrictEqual)(p, E) || (y = p, I.call(this, p, E));
      };
      return this.events.on("change", h), () => this.events.removeListener("change", h);
    }
    _validate(O) {
      if (!n(this, c, "f") || n(this, c, "f").call(this, O) || !n(this, c, "f").errors)
        return;
      const y = n(this, c, "f").errors.map(({ instancePath: h, message: E = "" }) => `\`${h.slice(1)}\` ${E}`);
      throw new Error("Config schema violation: " + y.join("; "));
    }
    _ensureDirectory() {
      m.mkdirSync(S.dirname(this.path), { recursive: !0 });
    }
    _write(O) {
      let I = this._serialize(O);
      if (n(this, i, "f")) {
        const y = _.randomBytes(16), h = _.pbkdf2Sync(n(this, i, "f"), y.toString(), 1e4, 32, "sha512"), E = _.createCipheriv(K, h, y);
        I = Buffer.concat([y, Buffer.from(":"), E.update(Buffer.from(I)), E.final()]);
      }
      if (process.env.SNAP)
        m.writeFileSync(this.path, I, { mode: n(this, l, "f").configFileMode });
      else
        try {
          T.writeFileSync(this.path, I, { mode: n(this, l, "f").configFileMode });
        } catch (y) {
          if ((y == null ? void 0 : y.code) === "EXDEV") {
            m.writeFileSync(this.path, I, { mode: n(this, l, "f").configFileMode });
            return;
          }
          throw y;
        }
    }
    _watch() {
      this._ensureDirectory(), m.existsSync(this.path) || this._write(Q()), process.platform === "win32" ? m.watch(this.path, { persistent: !1 }, G(() => {
        this.events.emit("change");
      }, { wait: 100 })) : m.watchFile(this.path, { persistent: !1 }, G(() => {
        this.events.emit("change");
      }, { wait: 5e3 }));
    }
    _migrate(O, I, y) {
      let h = this._get(F, "0.0.0");
      const E = Object.keys(O).filter((a) => this._shouldPerformMigration(a, h, I));
      let p = { ...this.store };
      for (const a of E)
        try {
          y && y(this, {
            fromVersion: h,
            toVersion: a,
            finalVersion: I,
            versions: E
          });
          const f = O[a];
          f(this), this._set(F, a), h = a, p = { ...this.store };
        } catch (f) {
          throw this.store = p, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${f}`);
        }
      (this._isVersionInRangeFormat(h) || !q.eq(h, I)) && this._set(F, I);
    }
    _containsReservedKey(O) {
      return typeof O == "object" && Object.keys(O)[0] === L ? !0 : typeof O != "string" ? !1 : n(this, l, "f").accessPropertiesByDotNotation ? !!O.startsWith(`${L}.`) : !1;
    }
    _isVersionInRangeFormat(O) {
      return q.clean(O) === null;
    }
    _shouldPerformMigration(O, I, y) {
      return this._isVersionInRangeFormat(O) ? I !== "0.0.0" && q.satisfies(I, O) ? !1 : q.satisfies(y, O) : !(q.lte(O, I) || q.gt(O, y));
    }
    _get(O, I) {
      return w.get(this.store, O, I);
    }
    _set(O, I) {
      const { store: y } = this;
      w.set(y, O, I), this.store = y;
    }
  }
  t.default = B, e.exports = B, e.exports.default = B;
})(fs, fs.exports);
var Cv = fs.exports;
const ic = Ot, { app: pn, ipcMain: As, ipcRenderer: cc, shell: Dv } = Nr, Mv = Cv;
let lc = !1;
const uc = () => {
  if (!As || !pn)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: pn.getPath("userData"),
    appVersion: pn.getVersion()
  };
  return lc || (As.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), lc = !0), e;
};
class Lv extends Mv {
  constructor(t) {
    let r, n;
    if (cc) {
      const s = cc.sendSync("electron-store-get-data");
      if (!s)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = s);
    } else As && pn && ({ defaultCwd: r, appVersion: n } = uc());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = n), t.cwd ? t.cwd = ic.isAbsolute(t.cwd) ? t.cwd : ic.join(r, t.cwd) : t.cwd = r, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    uc();
  }
  async openInEditor() {
    const t = await Dv.openPath(this.path);
    if (t)
      throw new Error(t);
  }
}
var Vv = Lv;
const { app: Rn, BrowserWindow: Zl, ipcMain: $t } = Nr, { enable: Fv } = du, zv = Vv, dc = Ot, tt = new zv();
Fv();
function xl() {
  const e = new Zl({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: !0,
      contextIsolation: !0,
      preload: dc.join(__dirname, "preload.cjs"),
      webviewTag: !0,
      enableRemoteModule: !0
    }
  });
  process.env.NODE_ENV === "development" ? (e.loadURL("http://localhost:5173"), e.webContents.openDevTools()) : e.loadFile(dc.join(__dirname, "../dist/index.html"));
}
Rn.whenReady().then(xl);
Rn.on("window-all-closed", () => {
  process.platform !== "darwin" && Rn.quit();
});
Rn.on("activate", () => {
  Zl.getAllWindows().length === 0 && xl();
});
$t.on("get-store", (e, t) => {
  e.returnValue = tt.get(t);
});
$t.on("set-store", (e, t, r) => {
  tt.set(t, r);
});
$t.on("save-history", (e, t) => {
  const r = tt.get("history", []);
  r.push(t), tt.set("history", r);
});
$t.on("get-history", (e) => {
  e.returnValue = tt.get("history", []);
});
$t.on("clear-history", () => {
  tt.set("history", []);
});
$t.on("save-bookmark", (e, t) => {
  const r = tt.get("bookmarks", []);
  r.push(t), tt.set("bookmarks", r);
});
$t.on("get-bookmarks", (e) => {
  e.returnValue = tt.get("bookmarks", []);
});
$t.on("save-settings", (e, t) => {
  tt.set("settings", t);
});
$t.on("get-settings", (e) => {
  e.returnValue = tt.get("settings", {
    homepage: "https://google.com",
    searchEngine: "Google",
    darkMode: !1
  });
});
export {
  Xv as default
};

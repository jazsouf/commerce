import crypto from "crypto";
function documentEventHandler(handler2) {
  if (typeof handler2 !== "function")
    throw new TypeError("`handler` must be a function");
  return handler2;
}
const e = !(typeof navigator > "u") && "ReactNative" === navigator.product, t = { timeout: e ? 6e4 : 12e4 }, r = function(r2) {
  const a2 = { ...t, ..."string" == typeof r2 ? { url: r2 } : r2 };
  if (a2.timeout = n$1(a2.timeout), a2.query) {
    const { url: t2, searchParams: r3 } = function(t3) {
      const r4 = t3.indexOf("?");
      if (-1 === r4) return { url: t3, searchParams: new URLSearchParams() };
      const n2 = t3.slice(0, r4), a3 = t3.slice(r4 + 1);
      if (!e) return { url: n2, searchParams: new URLSearchParams(a3) };
      if ("function" != typeof decodeURIComponent) throw new Error("Broken `URLSearchParams` implementation, and `decodeURIComponent` is not defined");
      const s2 = new URLSearchParams();
      for (const e2 of a3.split("&")) {
        const [t4, r5] = e2.split("=");
        t4 && s2.append(o$1(t4), o$1(r5 || ""));
      }
      return { url: n2, searchParams: s2 };
    }(a2.url);
    for (const [e2, o2] of Object.entries(a2.query)) {
      if (void 0 !== o2) if (Array.isArray(o2)) for (const t3 of o2) r3.append(e2, t3);
      else r3.append(e2, o2);
      const n2 = r3.toString();
      n2 && (a2.url = `${t2}?${n2}`);
    }
  }
  return a2.method = a2.body && !a2.method ? "POST" : (a2.method || "GET").toUpperCase(), a2;
};
function o$1(e2) {
  return decodeURIComponent(e2.replace(/\+/g, " "));
}
function n$1(e2) {
  if (false === e2 || 0 === e2) return false;
  if (e2.connect || e2.socket) return e2;
  const r2 = Number(e2);
  return isNaN(r2) ? n$1(t.timeout) : { connect: r2, socket: r2 };
}
const a$2 = /^https?:\/\//i, s$2 = function(e2) {
  if (!a$2.test(e2.url)) throw new Error(`"${e2.url}" is not a valid URL`);
};
function c$3(e2) {
  return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
}
const o = ["request", "response", "progress", "error", "abort"], n = ["processOptions", "validateOptions", "interceptRequest", "finalizeOptions", "onRequest", "onResponse", "onError", "onReturn", "onHeaders"];
function s$1(r$1, a2) {
  const i2 = [], u2 = n.reduce((e2, t2) => (e2[t2] = e2[t2] || [], e2), { processOptions: [r], validateOptions: [s$2] });
  function l3(e2) {
    const t2 = o.reduce((e3, t3) => (e3[t3] = /* @__PURE__ */ function() {
      const e4 = /* @__PURE__ */ Object.create(null);
      let t4 = 0;
      return { publish: function(t5) {
        for (const r3 in e4) e4[r3](t5);
      }, subscribe: function(r3) {
        const o2 = t4++;
        return e4[o2] = r3, function() {
          delete e4[o2];
        };
      } };
    }(), e3), {}), r2 = /* @__PURE__ */ ((e3) => function(t3, r3, ...o2) {
      const n3 = "onError" === t3;
      let s3 = r3;
      for (let r4 = 0; r4 < e3[t3].length && (s3 = (0, e3[t3][r4])(s3, ...o2), !n3 || s3); r4++) ;
      return s3;
    })(u2), n2 = r2("processOptions", e2);
    r2("validateOptions", n2);
    const s2 = { options: n2, channels: t2, applyMiddleware: r2 };
    let i3;
    const l4 = t2.request.subscribe((e3) => {
      i3 = a2(e3, (o2, n3) => ((e4, o3, n4) => {
        let s3 = e4, a3 = o3;
        if (!s3) try {
          a3 = r2("onResponse", o3, n4);
        } catch (e5) {
          a3 = null, s3 = e5;
        }
        s3 = s3 && r2("onError", s3, n4), s3 ? t2.error.publish(s3) : a3 && t2.response.publish(a3);
      })(o2, n3, e3));
    });
    t2.abort.subscribe(() => {
      l4(), i3 && i3.abort();
    });
    const c2 = r2("onReturn", t2, s2);
    return c2 === t2 && t2.request.publish(s2), c2;
  }
  return l3.use = function(e2) {
    if (!e2) throw new Error("Tried to add middleware that resolved to falsey value");
    if ("function" == typeof e2) throw new Error("Tried to add middleware that was a function. It probably expects you to pass options to it.");
    if (e2.onReturn && u2.onReturn.length > 0) throw new Error("Tried to add new middleware with `onReturn` handler, but another handler has already been registered for this event");
    return n.forEach((t2) => {
      e2[t2] && u2[t2].push(e2[t2]);
    }), i2.push(e2), l3;
  }, l3.clone = () => s$1(i2, a2), r$1.forEach(l3.use), l3;
}
var a$1, i, u$2 = /* @__PURE__ */ c$3(function() {
  if (i) return a$1;
  i = 1;
  var e2 = function(e3) {
    return e3.replace(/^\s+|\s+$/g, "");
  };
  return a$1 = function(t2) {
    if (!t2) return {};
    for (var r2 = {}, o2 = e2(t2).split("\n"), n2 = 0; n2 < o2.length; n2++) {
      var s2 = o2[n2], a2 = s2.indexOf(":"), i2 = e2(s2.slice(0, a2)).toLowerCase(), u2 = e2(s2.slice(a2 + 1));
      typeof r2[i2] > "u" ? r2[i2] = u2 : (l3 = r2[i2], "[object Array]" === Object.prototype.toString.call(l3) ? r2[i2].push(u2) : r2[i2] = [r2[i2], u2]);
    }
    var l3;
    return r2;
  };
}());
let l$1 = class l {
  onabort;
  onerror;
  onreadystatechange;
  ontimeout;
  readyState = 0;
  response;
  responseText = "";
  responseType = "";
  status;
  statusText;
  withCredentials;
  #e;
  #t;
  #r;
  #o = {};
  #n;
  #s = {};
  #a;
  open(e2, t2, r2) {
    this.#e = e2, this.#t = t2, this.#r = "", this.readyState = 1, this.onreadystatechange?.(), this.#n = void 0;
  }
  abort() {
    this.#n && this.#n.abort();
  }
  getAllResponseHeaders() {
    return this.#r;
  }
  setRequestHeader(e2, t2) {
    this.#o[e2] = t2;
  }
  setInit(e2, t2 = true) {
    this.#s = e2, this.#a = t2;
  }
  send(e2) {
    const t2 = "arraybuffer" !== this.responseType, r2 = { ...this.#s, method: this.#e, headers: this.#o, body: e2 };
    "function" == typeof AbortController && this.#a && (this.#n = new AbortController(), typeof EventTarget < "u" && this.#n.signal instanceof EventTarget && (r2.signal = this.#n.signal)), typeof document < "u" && (r2.credentials = this.withCredentials ? "include" : "omit"), fetch(this.#t, r2).then((e3) => (e3.headers.forEach((e4, t3) => {
      this.#r += `${t3}: ${e4}\r
`;
    }), this.status = e3.status, this.statusText = e3.statusText, this.readyState = 3, this.onreadystatechange?.(), t2 ? e3.text() : e3.arrayBuffer())).then((e3) => {
      "string" == typeof e3 ? this.responseText = e3 : this.response = e3, this.readyState = 4, this.onreadystatechange?.();
    }).catch((e3) => {
      "AbortError" !== e3.name ? this.onerror?.(e3) : this.onabort?.();
    });
  }
};
const c$2 = "function" == typeof XMLHttpRequest ? "xhr" : "fetch", h = "xhr" === c$2 ? XMLHttpRequest : l$1, d$1 = (e2, t2) => {
  const r2 = e2.options, o2 = e2.applyMiddleware("finalizeOptions", r2), n2 = {}, s2 = e2.applyMiddleware("interceptRequest", void 0, { adapter: c$2, context: e2 });
  if (s2) {
    const e3 = setTimeout(t2, 0, null, s2);
    return { abort: () => clearTimeout(e3) };
  }
  let a2 = new h();
  a2 instanceof l$1 && "object" == typeof o2.fetch && a2.setInit(o2.fetch, o2.useAbortSignal ?? true);
  const i2 = o2.headers, d2 = o2.timeout;
  let p2 = false, f2 = false, b = false;
  if (a2.onerror = (e3) => {
    m(a2 instanceof l$1 ? e3 instanceof Error ? e3 : new Error(`Request error while attempting to reach is ${o2.url}`, { cause: e3 }) : new Error(`Request error while attempting to reach is ${o2.url}${e3.lengthComputable ? `(${e3.loaded} of ${e3.total} bytes transferred)` : ""}`));
  }, a2.ontimeout = (e3) => {
    m(new Error(`Request timeout while attempting to reach ${o2.url}${e3.lengthComputable ? `(${e3.loaded} of ${e3.total} bytes transferred)` : ""}`));
  }, a2.onabort = () => {
    w(true), p2 = true;
  }, a2.onreadystatechange = function() {
    d2 && (w(), n2.socket = setTimeout(() => y("ESOCKETTIMEDOUT"), d2.socket)), !p2 && a2 && 4 === a2.readyState && 0 !== a2.status && function() {
      if (!(p2 || f2 || b)) {
        if (0 === a2.status) return void m(new Error("Unknown XHR error"));
        w(), f2 = true, t2(null, { body: a2.response || ("" === a2.responseType || "text" === a2.responseType ? a2.responseText : ""), url: o2.url, method: o2.method, headers: u$2(a2.getAllResponseHeaders()), statusCode: a2.status, statusMessage: a2.statusText });
      }
    }();
  }, a2.open(o2.method, o2.url, true), a2.withCredentials = !!o2.withCredentials, i2 && a2.setRequestHeader) for (const e3 in i2) i2.hasOwnProperty(e3) && a2.setRequestHeader(e3, i2[e3]);
  return o2.rawBody && (a2.responseType = "arraybuffer"), e2.applyMiddleware("onRequest", { options: o2, adapter: c$2, request: a2, context: e2 }), a2.send(o2.body || null), d2 && (n2.connect = setTimeout(() => y("ETIMEDOUT"), d2.connect)), { abort: function() {
    p2 = true, a2 && a2.abort();
  } };
  function y(t3) {
    b = true, a2.abort();
    const r3 = new Error("ESOCKETTIMEDOUT" === t3 ? `Socket timed out on request to ${o2.url}` : `Connection timed out on request to ${o2.url}`);
    r3.code = t3, e2.channels.error.publish(r3);
  }
  function w(e3) {
    (e3 || p2 || a2 && a2.readyState >= 2 && n2.connect) && clearTimeout(n2.connect), n2.socket && clearTimeout(n2.socket);
  }
  function m(e3) {
    if (f2) return;
    w(true), f2 = true, a2 = null;
    const r3 = e3 || new Error(`Network error while attempting to reach ${o2.url}`);
    r3.isNetworkError = true, r3.request = o2, t2(r3);
  }
}, p$1 = (e2 = [], t2 = d$1) => s$1(e2, t2);
var a, c$1, u$1, l2, p, d = { exports: {} };
/* @__PURE__ */ c$3((p || (p = 1, function(e2, t2) {
  t2.formatArgs = function(t3) {
    if (t3[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + t3[0] + (this.useColors ? "%c " : " ") + "+" + e2.exports.humanize(this.diff), !this.useColors) return;
    const s3 = "color: " + this.color;
    t3.splice(1, 0, s3, "color: inherit");
    let n2 = 0, r2 = 0;
    t3[0].replace(/%[a-zA-Z%]/g, (e3) => {
      "%%" !== e3 && (n2++, "%c" === e3 && (r2 = n2));
    }), t3.splice(r2, 0, s3);
  }, t2.save = function(e3) {
    try {
      e3 ? t2.storage.setItem("debug", e3) : t2.storage.removeItem("debug");
    } catch {
    }
  }, t2.load = function() {
    let e3;
    try {
      e3 = t2.storage.getItem("debug");
    } catch {
    }
    return !e3 && typeof process < "u" && "env" in process && (e3 = process.env.DEBUG), e3;
  }, t2.useColors = function() {
    if (typeof window < "u" && window.process && ("renderer" === window.process.type || window.process.__nwjs)) return true;
    if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return false;
    let e3;
    return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator < "u" && navigator.userAgent && (e3 = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(e3[1], 10) >= 31 || typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }, t2.storage = function() {
    try {
      return localStorage;
    } catch {
    }
  }(), t2.destroy = /* @__PURE__ */ (() => {
    let e3 = false;
    return () => {
      e3 || (e3 = true, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })(), t2.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], t2.log = console.debug || console.log || (() => {
  }), e2.exports = (l2 ? u$1 : (l2 = 1, u$1 = function(e3) {
    function t3(e4) {
      let n3, r2, o2, i2 = null;
      function a2(...e5) {
        if (!a2.enabled) return;
        const s4 = a2, r3 = Number(/* @__PURE__ */ new Date()), o3 = r3 - (n3 || r3);
        s4.diff = o3, s4.prev = n3, s4.curr = r3, n3 = r3, e5[0] = t3.coerce(e5[0]), "string" != typeof e5[0] && e5.unshift("%O");
        let i3 = 0;
        e5[0] = e5[0].replace(/%([a-zA-Z%])/g, (n4, r4) => {
          if ("%%" === n4) return "%";
          i3++;
          const o4 = t3.formatters[r4];
          if ("function" == typeof o4) {
            const t4 = e5[i3];
            n4 = o4.call(s4, t4), e5.splice(i3, 1), i3--;
          }
          return n4;
        }), t3.formatArgs.call(s4, e5), (s4.log || t3.log).apply(s4, e5);
      }
      return a2.namespace = e4, a2.useColors = t3.useColors(), a2.color = t3.selectColor(e4), a2.extend = s3, a2.destroy = t3.destroy, Object.defineProperty(a2, "enabled", { enumerable: true, configurable: false, get: () => null !== i2 ? i2 : (r2 !== t3.namespaces && (r2 = t3.namespaces, o2 = t3.enabled(e4)), o2), set: (e5) => {
        i2 = e5;
      } }), "function" == typeof t3.init && t3.init(a2), a2;
    }
    function s3(e4, s4) {
      const n3 = t3(this.namespace + (typeof s4 > "u" ? ":" : s4) + e4);
      return n3.log = this.log, n3;
    }
    function n2(e4, t4) {
      let s4 = 0, n3 = 0, r2 = -1, o2 = 0;
      for (; s4 < e4.length; ) if (n3 < t4.length && (t4[n3] === e4[s4] || "*" === t4[n3])) "*" === t4[n3] ? (r2 = n3, o2 = s4, n3++) : (s4++, n3++);
      else {
        if (-1 === r2) return false;
        n3 = r2 + 1, o2++, s4 = o2;
      }
      for (; n3 < t4.length && "*" === t4[n3]; ) n3++;
      return n3 === t4.length;
    }
    return t3.debug = t3, t3.default = t3, t3.coerce = function(e4) {
      return e4 instanceof Error ? e4.stack || e4.message : e4;
    }, t3.disable = function() {
      const e4 = [...t3.names, ...t3.skips.map((e5) => "-" + e5)].join(",");
      return t3.enable(""), e4;
    }, t3.enable = function(e4) {
      t3.save(e4), t3.namespaces = e4, t3.names = [], t3.skips = [];
      const s4 = ("string" == typeof e4 ? e4 : "").trim().replace(" ", ",").split(",").filter(Boolean);
      for (const e5 of s4) "-" === e5[0] ? t3.skips.push(e5.slice(1)) : t3.names.push(e5);
    }, t3.enabled = function(e4) {
      for (const s4 of t3.skips) if (n2(e4, s4)) return false;
      for (const s4 of t3.names) if (n2(e4, s4)) return true;
      return false;
    }, t3.humanize = function() {
      if (c$1) return a;
      c$1 = 1;
      var e4 = 1e3, t4 = 60 * e4, s4 = 60 * t4, n3 = 24 * s4, r2 = 7 * n3;
      function o2(e5, t5, s5, n4) {
        var r3 = t5 >= 1.5 * s5;
        return Math.round(e5 / s5) + " " + n4 + (r3 ? "s" : "");
      }
      return a = function(i2, a2) {
        a2 = a2 || {};
        var c2, u2, l3 = typeof i2;
        if ("string" === l3 && i2.length > 0) return function(o3) {
          if (!((o3 = String(o3)).length > 100)) {
            var i3 = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(o3);
            if (i3) {
              var a3 = parseFloat(i3[1]);
              switch ((i3[2] || "ms").toLowerCase()) {
                case "years":
                case "year":
                case "yrs":
                case "yr":
                case "y":
                  return 315576e5 * a3;
                case "weeks":
                case "week":
                case "w":
                  return a3 * r2;
                case "days":
                case "day":
                case "d":
                  return a3 * n3;
                case "hours":
                case "hour":
                case "hrs":
                case "hr":
                case "h":
                  return a3 * s4;
                case "minutes":
                case "minute":
                case "mins":
                case "min":
                case "m":
                  return a3 * t4;
                case "seconds":
                case "second":
                case "secs":
                case "sec":
                case "s":
                  return a3 * e4;
                case "milliseconds":
                case "millisecond":
                case "msecs":
                case "msec":
                case "ms":
                  return a3;
                default:
                  return;
              }
            }
          }
        }(i2);
        if ("number" === l3 && isFinite(i2)) return a2.long ? (c2 = i2, (u2 = Math.abs(c2)) >= n3 ? o2(c2, u2, n3, "day") : u2 >= s4 ? o2(c2, u2, s4, "hour") : u2 >= t4 ? o2(c2, u2, t4, "minute") : u2 >= e4 ? o2(c2, u2, e4, "second") : c2 + " ms") : function(r3) {
          var o3 = Math.abs(r3);
          return o3 >= n3 ? Math.round(r3 / n3) + "d" : o3 >= s4 ? Math.round(r3 / s4) + "h" : o3 >= t4 ? Math.round(r3 / t4) + "m" : o3 >= e4 ? Math.round(r3 / e4) + "s" : r3 + "ms";
        }(i2);
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(i2));
      };
    }(), t3.destroy = function() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }, Object.keys(e3).forEach((s4) => {
      t3[s4] = e3[s4];
    }), t3.names = [], t3.skips = [], t3.formatters = {}, t3.selectColor = function(e4) {
      let s4 = 0;
      for (let t4 = 0; t4 < e4.length; t4++) s4 = (s4 << 5) - s4 + e4.charCodeAt(t4), s4 |= 0;
      return t3.colors[Math.abs(s4) % t3.colors.length];
    }, t3.enable(t3.load()), t3;
  }))(t2);
  const { formatters: s2 } = e2.exports;
  s2.j = function(e3) {
    try {
      return JSON.stringify(e3);
    } catch (e4) {
      return "[UnexpectedJSONParseError]: " + e4.message;
    }
  };
}(d, d.exports)), d.exports));
const F = typeof Buffer > "u" ? () => false : (e2) => Buffer.isBuffer(e2);
function O$1(e2) {
  return "[object Object]" === Object.prototype.toString.call(e2);
}
function j(e2) {
  if (false === O$1(e2)) return false;
  const t2 = e2.constructor;
  if (void 0 === t2) return true;
  const s2 = t2.prototype;
  return !(false === O$1(s2) || false === s2.hasOwnProperty("isPrototypeOf"));
}
const v = ["boolean", "string", "number"];
function x() {
  return { processOptions: (e2) => {
    const t2 = e2.body;
    return !t2 || "function" == typeof t2.pipe || F(t2) || -1 === v.indexOf(typeof t2) && !Array.isArray(t2) && !j(t2) ? e2 : Object.assign({}, e2, { body: JSON.stringify(e2.body), headers: Object.assign({}, e2.headers, { "Content-Type": "application/json" }) });
  } };
}
function E$1(e2) {
  return { onResponse: (s2) => {
    const n2 = s2.headers["content-type"] || "", r2 = e2 && e2.force || -1 !== n2.indexOf("application/json");
    return s2.body && n2 && r2 ? Object.assign({}, s2, { body: t2(s2.body) }) : s2;
  }, processOptions: (e3) => Object.assign({}, e3, { headers: Object.assign({ Accept: "application/json" }, e3.headers) }) };
  function t2(e3) {
    try {
      return JSON.parse(e3);
    } catch (e4) {
      throw e4.message = `Failed to parsed response body as JSON: ${e4.message}`, e4;
    }
  }
}
let R = {};
typeof globalThis < "u" ? R = globalThis : typeof window < "u" ? R = window : typeof global < "u" ? R = global : typeof self < "u" && (R = self);
var q = R;
function A(e2 = {}) {
  const t2 = e2.implementation || q.Observable;
  if (!t2) throw new Error("`Observable` is not available in global scope, and no implementation was passed");
  return { onReturn: (e3, s2) => new t2((t3) => (e3.error.subscribe((e4) => t3.error(e4)), e3.progress.subscribe((e4) => t3.next(Object.assign({ type: "progress" }, e4))), e3.response.subscribe((e4) => {
    t3.next(Object.assign({ type: "response" }, e4)), t3.complete();
  }), e3.request.publish(s2), () => e3.abort.publish())) };
}
function S$1() {
  return { onRequest: (e2) => {
    if ("xhr" !== e2.adapter) return;
    const t2 = e2.request, s2 = e2.context;
    function n2(e3) {
      return (t3) => {
        const n3 = t3.lengthComputable ? t3.loaded / t3.total * 100 : -1;
        s2.channels.progress.publish({ stage: e3, percent: n3, total: t3.total, loaded: t3.loaded, lengthComputable: t3.lengthComputable });
      };
    }
    "upload" in t2 && "onprogress" in t2.upload && (t2.upload.onprogress = n2("upload")), "onprogress" in t2 && (t2.onprogress = n2("download"));
  } };
}
var $ = (e2, t2, s2) => ("GET" === s2.method || "HEAD" === s2.method) && (e2.isNetworkError || false);
function _$1(e2) {
  return 100 * Math.pow(2, e2) + 100 * Math.random();
}
const P = (e2 = {}) => ((e3) => {
  const t2 = e3.maxRetries || 5, s2 = e3.retryDelay || _$1, n2 = e3.shouldRetry;
  return { onError: (e4, r2) => {
    const o2 = r2.options, i2 = o2.maxRetries || t2, a2 = o2.retryDelay || s2, c2 = o2.shouldRetry || n2, u2 = o2.attemptNumber || 0;
    if (null !== (l3 = o2.body) && "object" == typeof l3 && "function" == typeof l3.pipe || !c2(e4, u2, o2) || u2 >= i2) return e4;
    var l3;
    const p2 = Object.assign({}, r2, { options: Object.assign({}, o2, { attemptNumber: u2 + 1 }) });
    return setTimeout(() => r2.channels.request.publish(p2), a2(u2)), null;
  } };
})({ shouldRetry: $, ...e2 });
P.shouldRetry = $;
var extendStatics = function(d2, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b2) {
    d3.__proto__ = b2;
  } || function(d3, b2) {
    for (var p2 in b2) if (Object.prototype.hasOwnProperty.call(b2, p2)) d3[p2] = b2[p2];
  };
  return extendStatics(d2, b);
};
function __extends(d2, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d2, b);
  function __() {
    this.constructor = d2;
  }
  d2.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __awaiter(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _2 = { label: 0, sent: function() {
    if (t2[0] & 1) throw t2[1];
    return t2[1];
  }, trys: [], ops: [] }, f2, y, t2, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n2) {
    return function(v2) {
      return step([n2, v2]);
    };
  }
  function step(op) {
    if (f2) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_2 = 0)), _2) try {
      if (f2 = 1, y && (t2 = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t2 = y["return"]) && t2.call(y), 0) : y.next) && !(t2 = t2.call(y, op[1])).done) return t2;
      if (y = 0, t2) op = [op[0] & 2, t2.value];
      switch (op[0]) {
        case 0:
        case 1:
          t2 = op;
          break;
        case 4:
          _2.label++;
          return { value: op[1], done: false };
        case 5:
          _2.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _2.ops.pop();
          _2.trys.pop();
          continue;
        default:
          if (!(t2 = _2.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _2 = 0;
            continue;
          }
          if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
            _2.label = op[1];
            break;
          }
          if (op[0] === 6 && _2.label < t2[1]) {
            _2.label = t2[1];
            t2 = op;
            break;
          }
          if (t2 && _2.label < t2[2]) {
            _2.label = t2[2];
            _2.ops.push(op);
            break;
          }
          if (t2[2]) _2.ops.pop();
          _2.trys.pop();
          continue;
      }
      op = body.call(thisArg, _2);
    } catch (e2) {
      op = [6, e2];
      y = 0;
    } finally {
      f2 = t2 = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __values(o2) {
  var s2 = typeof Symbol === "function" && Symbol.iterator, m = s2 && o2[s2], i2 = 0;
  if (m) return m.call(o2);
  if (o2 && typeof o2.length === "number") return {
    next: function() {
      if (o2 && i2 >= o2.length) o2 = void 0;
      return { value: o2 && o2[i2++], done: !o2 };
    }
  };
  throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o2, n2) {
  var m = typeof Symbol === "function" && o2[Symbol.iterator];
  if (!m) return o2;
  var i2 = m.call(o2), r2, ar = [], e2;
  try {
    while ((n2 === void 0 || n2-- > 0) && !(r2 = i2.next()).done) ar.push(r2.value);
  } catch (error) {
    e2 = { error };
  } finally {
    try {
      if (r2 && !r2.done && (m = i2["return"])) m.call(i2);
    } finally {
      if (e2) throw e2.error;
    }
  }
  return ar;
}
function __spreadArray(to, from2, pack) {
  if (pack || arguments.length === 2) for (var i2 = 0, l3 = from2.length, ar; i2 < l3; i2++) {
    if (ar || !(i2 in from2)) {
      if (!ar) ar = Array.prototype.slice.call(from2, 0, i2);
      ar[i2] = from2[i2];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from2));
}
function __await(v2) {
  return this instanceof __await ? (this.v = v2, this) : new __await(v2);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i2, q2 = [];
  return i2 = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i2[Symbol.asyncIterator] = function() {
    return this;
  }, i2;
  function awaitReturn(f2) {
    return function(v2) {
      return Promise.resolve(v2).then(f2, reject);
    };
  }
  function verb(n2, f2) {
    if (g[n2]) {
      i2[n2] = function(v2) {
        return new Promise(function(a2, b) {
          q2.push([n2, v2, a2, b]) > 1 || resume(n2, v2);
        });
      };
      if (f2) i2[n2] = f2(i2[n2]);
    }
  }
  function resume(n2, v2) {
    try {
      step(g[n2](v2));
    } catch (e2) {
      settle(q2[0][3], e2);
    }
  }
  function step(r2) {
    r2.value instanceof __await ? Promise.resolve(r2.value.v).then(fulfill, reject) : settle(q2[0][2], r2);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f2, v2) {
    if (f2(v2), q2.shift(), q2.length) resume(q2[0][0], q2[0][1]);
  }
}
function __asyncValues(o2) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o2[Symbol.asyncIterator], i2;
  return m ? m.call(o2) : (o2 = typeof __values === "function" ? __values(o2) : o2[Symbol.iterator](), i2 = {}, verb("next"), verb("throw"), verb("return"), i2[Symbol.asyncIterator] = function() {
    return this;
  }, i2);
  function verb(n2) {
    i2[n2] = o2[n2] && function(v2) {
      return new Promise(function(resolve, reject) {
        v2 = o2[n2](v2), settle(resolve, reject, v2.done, v2.value);
      });
    };
  }
  function settle(resolve, reject, d2, v2) {
    Promise.resolve(v2).then(function(v3) {
      resolve({ value: v3, done: d2 });
    }, reject);
  }
}
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e2 = new Error(message);
  return e2.name = "SuppressedError", e2.error = error, e2.suppressed = suppressed, e2;
};
function isFunction(value) {
  return typeof value === "function";
}
function createErrorClass(createImpl) {
  var _super = function(instance) {
    Error.call(instance);
    instance.stack = new Error().stack;
  };
  var ctorFunc = createImpl(_super);
  ctorFunc.prototype = Object.create(Error.prototype);
  ctorFunc.prototype.constructor = ctorFunc;
  return ctorFunc;
}
var UnsubscriptionError = createErrorClass(function(_super) {
  return function UnsubscriptionErrorImpl(errors) {
    _super(this);
    this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i2) {
      return i2 + 1 + ") " + err.toString();
    }).join("\n  ") : "";
    this.name = "UnsubscriptionError";
    this.errors = errors;
  };
});
function arrRemove(arr, item) {
  if (arr) {
    var index = arr.indexOf(item);
    0 <= index && arr.splice(index, 1);
  }
}
var Subscription = function() {
  function Subscription2(initialTeardown) {
    this.initialTeardown = initialTeardown;
    this.closed = false;
    this._parentage = null;
    this._finalizers = null;
  }
  Subscription2.prototype.unsubscribe = function() {
    var e_1, _a, e_2, _b;
    var errors;
    if (!this.closed) {
      this.closed = true;
      var _parentage = this._parentage;
      if (_parentage) {
        this._parentage = null;
        if (Array.isArray(_parentage)) {
          try {
            for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
              var parent_1 = _parentage_1_1.value;
              parent_1.remove(this);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
        } else {
          _parentage.remove(this);
        }
      }
      var initialFinalizer = this.initialTeardown;
      if (isFunction(initialFinalizer)) {
        try {
          initialFinalizer();
        } catch (e2) {
          errors = e2 instanceof UnsubscriptionError ? e2.errors : [e2];
        }
      }
      var _finalizers = this._finalizers;
      if (_finalizers) {
        this._finalizers = null;
        try {
          for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
            var finalizer = _finalizers_1_1.value;
            try {
              execFinalizer(finalizer);
            } catch (err) {
              errors = errors !== null && errors !== void 0 ? errors : [];
              if (err instanceof UnsubscriptionError) {
                errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
              } else {
                errors.push(err);
              }
            }
          }
        } catch (e_2_1) {
          e_2 = { error: e_2_1 };
        } finally {
          try {
            if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
          } finally {
            if (e_2) throw e_2.error;
          }
        }
      }
      if (errors) {
        throw new UnsubscriptionError(errors);
      }
    }
  };
  Subscription2.prototype.add = function(teardown) {
    var _a;
    if (teardown && teardown !== this) {
      if (this.closed) {
        execFinalizer(teardown);
      } else {
        if (teardown instanceof Subscription2) {
          if (teardown.closed || teardown._hasParent(this)) {
            return;
          }
          teardown._addParent(this);
        }
        (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
      }
    }
  };
  Subscription2.prototype._hasParent = function(parent) {
    var _parentage = this._parentage;
    return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
  };
  Subscription2.prototype._addParent = function(parent) {
    var _parentage = this._parentage;
    this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
  };
  Subscription2.prototype._removeParent = function(parent) {
    var _parentage = this._parentage;
    if (_parentage === parent) {
      this._parentage = null;
    } else if (Array.isArray(_parentage)) {
      arrRemove(_parentage, parent);
    }
  };
  Subscription2.prototype.remove = function(teardown) {
    var _finalizers = this._finalizers;
    _finalizers && arrRemove(_finalizers, teardown);
    if (teardown instanceof Subscription2) {
      teardown._removeParent(this);
    }
  };
  Subscription2.EMPTY = function() {
    var empty = new Subscription2();
    empty.closed = true;
    return empty;
  }();
  return Subscription2;
}();
var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
  return value instanceof Subscription || value && "closed" in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe);
}
function execFinalizer(finalizer) {
  if (isFunction(finalizer)) {
    finalizer();
  } else {
    finalizer.unsubscribe();
  }
}
var config = {
  Promise: void 0
};
var timeoutProvider = {
  setTimeout: function(handler2, timeout) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    return setTimeout.apply(void 0, __spreadArray([handler2, timeout], __read(args)));
  },
  clearTimeout: function(handle) {
    return clearTimeout(handle);
  },
  delegate: void 0
};
function reportUnhandledError(err) {
  timeoutProvider.setTimeout(function() {
    {
      throw err;
    }
  });
}
function noop() {
}
function errorContext(cb) {
  {
    cb();
  }
}
var Subscriber = function(_super) {
  __extends(Subscriber2, _super);
  function Subscriber2(destination) {
    var _this = _super.call(this) || this;
    _this.isStopped = false;
    if (destination) {
      _this.destination = destination;
      if (isSubscription(destination)) {
        destination.add(_this);
      }
    } else {
      _this.destination = EMPTY_OBSERVER;
    }
    return _this;
  }
  Subscriber2.create = function(next, error, complete) {
    return new SafeSubscriber(next, error, complete);
  };
  Subscriber2.prototype.next = function(value) {
    if (this.isStopped) ;
    else {
      this._next(value);
    }
  };
  Subscriber2.prototype.error = function(err) {
    if (this.isStopped) ;
    else {
      this.isStopped = true;
      this._error(err);
    }
  };
  Subscriber2.prototype.complete = function() {
    if (this.isStopped) ;
    else {
      this.isStopped = true;
      this._complete();
    }
  };
  Subscriber2.prototype.unsubscribe = function() {
    if (!this.closed) {
      this.isStopped = true;
      _super.prototype.unsubscribe.call(this);
      this.destination = null;
    }
  };
  Subscriber2.prototype._next = function(value) {
    this.destination.next(value);
  };
  Subscriber2.prototype._error = function(err) {
    try {
      this.destination.error(err);
    } finally {
      this.unsubscribe();
    }
  };
  Subscriber2.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  };
  return Subscriber2;
}(Subscription);
var ConsumerObserver = function() {
  function ConsumerObserver2(partialObserver) {
    this.partialObserver = partialObserver;
  }
  ConsumerObserver2.prototype.next = function(value) {
    var partialObserver = this.partialObserver;
    if (partialObserver.next) {
      try {
        partialObserver.next(value);
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  };
  ConsumerObserver2.prototype.error = function(err) {
    var partialObserver = this.partialObserver;
    if (partialObserver.error) {
      try {
        partialObserver.error(err);
      } catch (error) {
        handleUnhandledError(error);
      }
    } else {
      handleUnhandledError(err);
    }
  };
  ConsumerObserver2.prototype.complete = function() {
    var partialObserver = this.partialObserver;
    if (partialObserver.complete) {
      try {
        partialObserver.complete();
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  };
  return ConsumerObserver2;
}();
var SafeSubscriber = function(_super) {
  __extends(SafeSubscriber2, _super);
  function SafeSubscriber2(observerOrNext, error, complete) {
    var _this = _super.call(this) || this;
    var partialObserver;
    if (isFunction(observerOrNext) || !observerOrNext) {
      partialObserver = {
        next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
        error: error !== null && error !== void 0 ? error : void 0,
        complete: complete !== null && complete !== void 0 ? complete : void 0
      };
    } else {
      {
        partialObserver = observerOrNext;
      }
    }
    _this.destination = new ConsumerObserver(partialObserver);
    return _this;
  }
  return SafeSubscriber2;
}(Subscriber);
function handleUnhandledError(error) {
  {
    reportUnhandledError(error);
  }
}
function defaultErrorHandler(err) {
  throw err;
}
var EMPTY_OBSERVER = {
  closed: true,
  next: noop,
  error: defaultErrorHandler,
  complete: noop
};
var observable = function() {
  return typeof Symbol === "function" && Symbol.observable || "@@observable";
}();
function identity(x2) {
  return x2;
}
function pipe() {
  var fns = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    fns[_i] = arguments[_i];
  }
  return pipeFromArray(fns);
}
function pipeFromArray(fns) {
  if (fns.length === 0) {
    return identity;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return function piped(input) {
    return fns.reduce(function(prev, fn) {
      return fn(prev);
    }, input);
  };
}
var Observable = function() {
  function Observable2(subscribe) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }
  Observable2.prototype.lift = function(operator) {
    var observable2 = new Observable2();
    observable2.source = this;
    observable2.operator = operator;
    return observable2;
  };
  Observable2.prototype.subscribe = function(observerOrNext, error, complete) {
    var _this = this;
    var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
    errorContext(function() {
      var _a = _this, operator = _a.operator, source = _a.source;
      subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
    });
    return subscriber;
  };
  Observable2.prototype._trySubscribe = function(sink) {
    try {
      return this._subscribe(sink);
    } catch (err) {
      sink.error(err);
    }
  };
  Observable2.prototype.forEach = function(next, promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var subscriber = new SafeSubscriber({
        next: function(value) {
          try {
            next(value);
          } catch (err) {
            reject(err);
            subscriber.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
      _this.subscribe(subscriber);
    });
  };
  Observable2.prototype._subscribe = function(subscriber) {
    var _a;
    return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
  };
  Observable2.prototype[observable] = function() {
    return this;
  };
  Observable2.prototype.pipe = function() {
    var operations = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      operations[_i] = arguments[_i];
    }
    return pipeFromArray(operations)(this);
  };
  Observable2.prototype.toPromise = function(promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var value;
      _this.subscribe(function(x2) {
        return value = x2;
      }, function(err) {
        return reject(err);
      }, function() {
        return resolve(value);
      });
    });
  };
  Observable2.create = function(subscribe) {
    return new Observable2(subscribe);
  };
  return Observable2;
}();
function getPromiseCtor(promiseCtor) {
  var _a;
  return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
  return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
}
function isSubscriber(value) {
  return value && value instanceof Subscriber || isObserver(value) && isSubscription(value);
}
function hasLift(source) {
  return isFunction(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init) {
  return function(source) {
    if (hasLift(source)) {
      return source.lift(function(liftedSource) {
        try {
          return init(liftedSource, this);
        } catch (err) {
          this.error(err);
        }
      });
    }
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
  return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
var OperatorSubscriber = function(_super) {
  __extends(OperatorSubscriber2, _super);
  function OperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
    var _this = _super.call(this, destination) || this;
    _this.onFinalize = onFinalize;
    _this.shouldUnsubscribe = shouldUnsubscribe;
    _this._next = onNext ? function(value) {
      try {
        onNext(value);
      } catch (err) {
        destination.error(err);
      }
    } : _super.prototype._next;
    _this._error = onError ? function(err) {
      try {
        onError(err);
      } catch (err2) {
        destination.error(err2);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._error;
    _this._complete = onComplete ? function() {
      try {
        onComplete();
      } catch (err) {
        destination.error(err);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._complete;
    return _this;
  }
  OperatorSubscriber2.prototype.unsubscribe = function() {
    var _a;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var closed_1 = this.closed;
      _super.prototype.unsubscribe.call(this);
      !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
    }
  };
  return OperatorSubscriber2;
}(Subscriber);
var ObjectUnsubscribedError = createErrorClass(function(_super) {
  return function ObjectUnsubscribedErrorImpl() {
    _super(this);
    this.name = "ObjectUnsubscribedError";
    this.message = "object unsubscribed";
  };
});
var Subject = function(_super) {
  __extends(Subject2, _super);
  function Subject2() {
    var _this = _super.call(this) || this;
    _this.closed = false;
    _this.currentObservers = null;
    _this.observers = [];
    _this.isStopped = false;
    _this.hasError = false;
    _this.thrownError = null;
    return _this;
  }
  Subject2.prototype.lift = function(operator) {
    var subject = new AnonymousSubject(this, this);
    subject.operator = operator;
    return subject;
  };
  Subject2.prototype._throwIfClosed = function() {
    if (this.closed) {
      throw new ObjectUnsubscribedError();
    }
  };
  Subject2.prototype.next = function(value) {
    var _this = this;
    errorContext(function() {
      var e_1, _a;
      _this._throwIfClosed();
      if (!_this.isStopped) {
        if (!_this.currentObservers) {
          _this.currentObservers = Array.from(_this.observers);
        }
        try {
          for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
            var observer = _c.value;
            observer.next(value);
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
      }
    });
  };
  Subject2.prototype.error = function(err) {
    var _this = this;
    errorContext(function() {
      _this._throwIfClosed();
      if (!_this.isStopped) {
        _this.hasError = _this.isStopped = true;
        _this.thrownError = err;
        var observers = _this.observers;
        while (observers.length) {
          observers.shift().error(err);
        }
      }
    });
  };
  Subject2.prototype.complete = function() {
    var _this = this;
    errorContext(function() {
      _this._throwIfClosed();
      if (!_this.isStopped) {
        _this.isStopped = true;
        var observers = _this.observers;
        while (observers.length) {
          observers.shift().complete();
        }
      }
    });
  };
  Subject2.prototype.unsubscribe = function() {
    this.isStopped = this.closed = true;
    this.observers = this.currentObservers = null;
  };
  Object.defineProperty(Subject2.prototype, "observed", {
    get: function() {
      var _a;
      return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
    },
    enumerable: false,
    configurable: true
  });
  Subject2.prototype._trySubscribe = function(subscriber) {
    this._throwIfClosed();
    return _super.prototype._trySubscribe.call(this, subscriber);
  };
  Subject2.prototype._subscribe = function(subscriber) {
    this._throwIfClosed();
    this._checkFinalizedStatuses(subscriber);
    return this._innerSubscribe(subscriber);
  };
  Subject2.prototype._innerSubscribe = function(subscriber) {
    var _this = this;
    var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
    if (hasError || isStopped) {
      return EMPTY_SUBSCRIPTION;
    }
    this.currentObservers = null;
    observers.push(subscriber);
    return new Subscription(function() {
      _this.currentObservers = null;
      arrRemove(observers, subscriber);
    });
  };
  Subject2.prototype._checkFinalizedStatuses = function(subscriber) {
    var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
    if (hasError) {
      subscriber.error(thrownError);
    } else if (isStopped) {
      subscriber.complete();
    }
  };
  Subject2.prototype.asObservable = function() {
    var observable2 = new Observable();
    observable2.source = this;
    return observable2;
  };
  Subject2.create = function(destination, source) {
    return new AnonymousSubject(destination, source);
  };
  return Subject2;
}(Observable);
var AnonymousSubject = function(_super) {
  __extends(AnonymousSubject2, _super);
  function AnonymousSubject2(destination, source) {
    var _this = _super.call(this) || this;
    _this.destination = destination;
    _this.source = source;
    return _this;
  }
  AnonymousSubject2.prototype.next = function(value) {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
  };
  AnonymousSubject2.prototype.error = function(err) {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
  };
  AnonymousSubject2.prototype.complete = function() {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
  };
  AnonymousSubject2.prototype._subscribe = function(subscriber) {
    var _a, _b;
    return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
  };
  return AnonymousSubject2;
}(Subject);
var dateTimestampProvider = {
  now: function() {
    return (dateTimestampProvider.delegate || Date).now();
  },
  delegate: void 0
};
var ReplaySubject = function(_super) {
  __extends(ReplaySubject2, _super);
  function ReplaySubject2(_bufferSize, _windowTime, _timestampProvider) {
    if (_bufferSize === void 0) {
      _bufferSize = Infinity;
    }
    if (_windowTime === void 0) {
      _windowTime = Infinity;
    }
    if (_timestampProvider === void 0) {
      _timestampProvider = dateTimestampProvider;
    }
    var _this = _super.call(this) || this;
    _this._bufferSize = _bufferSize;
    _this._windowTime = _windowTime;
    _this._timestampProvider = _timestampProvider;
    _this._buffer = [];
    _this._infiniteTimeWindow = true;
    _this._infiniteTimeWindow = _windowTime === Infinity;
    _this._bufferSize = Math.max(1, _bufferSize);
    _this._windowTime = Math.max(1, _windowTime);
    return _this;
  }
  ReplaySubject2.prototype.next = function(value) {
    var _a = this, isStopped = _a.isStopped, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow, _timestampProvider = _a._timestampProvider, _windowTime = _a._windowTime;
    if (!isStopped) {
      _buffer.push(value);
      !_infiniteTimeWindow && _buffer.push(_timestampProvider.now() + _windowTime);
    }
    this._trimBuffer();
    _super.prototype.next.call(this, value);
  };
  ReplaySubject2.prototype._subscribe = function(subscriber) {
    this._throwIfClosed();
    this._trimBuffer();
    var subscription = this._innerSubscribe(subscriber);
    var _a = this, _infiniteTimeWindow = _a._infiniteTimeWindow, _buffer = _a._buffer;
    var copy = _buffer.slice();
    for (var i2 = 0; i2 < copy.length && !subscriber.closed; i2 += _infiniteTimeWindow ? 1 : 2) {
      subscriber.next(copy[i2]);
    }
    this._checkFinalizedStatuses(subscriber);
    return subscription;
  };
  ReplaySubject2.prototype._trimBuffer = function() {
    var _a = this, _bufferSize = _a._bufferSize, _timestampProvider = _a._timestampProvider, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow;
    var adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
    _bufferSize < Infinity && adjustedBufferSize < _buffer.length && _buffer.splice(0, _buffer.length - adjustedBufferSize);
    if (!_infiniteTimeWindow) {
      var now = _timestampProvider.now();
      var last2 = 0;
      for (var i2 = 1; i2 < _buffer.length && _buffer[i2] <= now; i2 += 2) {
        last2 = i2;
      }
      last2 && _buffer.splice(0, last2 + 1);
    }
  };
  return ReplaySubject2;
}(Subject);
var Action = function(_super) {
  __extends(Action2, _super);
  function Action2(scheduler, work) {
    return _super.call(this) || this;
  }
  Action2.prototype.schedule = function(state, delay) {
    return this;
  };
  return Action2;
}(Subscription);
var intervalProvider = {
  setInterval: function(handler2, timeout) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    return setInterval.apply(void 0, __spreadArray([handler2, timeout], __read(args)));
  },
  clearInterval: function(handle) {
    return clearInterval(handle);
  },
  delegate: void 0
};
var AsyncAction = function(_super) {
  __extends(AsyncAction2, _super);
  function AsyncAction2(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;
    _this.scheduler = scheduler;
    _this.work = work;
    _this.pending = false;
    return _this;
  }
  AsyncAction2.prototype.schedule = function(state, delay) {
    var _a;
    if (delay === void 0) {
      delay = 0;
    }
    if (this.closed) {
      return this;
    }
    this.state = state;
    var id = this.id;
    var scheduler = this.scheduler;
    if (id != null) {
      this.id = this.recycleAsyncId(scheduler, id, delay);
    }
    this.pending = true;
    this.delay = delay;
    this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay);
    return this;
  };
  AsyncAction2.prototype.requestAsyncId = function(scheduler, _id, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    return intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
  };
  AsyncAction2.prototype.recycleAsyncId = function(_scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    if (delay != null && this.delay === delay && this.pending === false) {
      return id;
    }
    if (id != null) {
      intervalProvider.clearInterval(id);
    }
    return void 0;
  };
  AsyncAction2.prototype.execute = function(state, delay) {
    if (this.closed) {
      return new Error("executing a cancelled action");
    }
    this.pending = false;
    var error = this._execute(state, delay);
    if (error) {
      return error;
    } else if (this.pending === false && this.id != null) {
      this.id = this.recycleAsyncId(this.scheduler, this.id, null);
    }
  };
  AsyncAction2.prototype._execute = function(state, _delay) {
    var errored = false;
    var errorValue;
    try {
      this.work(state);
    } catch (e2) {
      errored = true;
      errorValue = e2 ? e2 : new Error("Scheduled action threw falsy error");
    }
    if (errored) {
      this.unsubscribe();
      return errorValue;
    }
  };
  AsyncAction2.prototype.unsubscribe = function() {
    if (!this.closed) {
      var _a = this, id = _a.id, scheduler = _a.scheduler;
      var actions = scheduler.actions;
      this.work = this.state = this.scheduler = null;
      this.pending = false;
      arrRemove(actions, this);
      if (id != null) {
        this.id = this.recycleAsyncId(scheduler, id, null);
      }
      this.delay = null;
      _super.prototype.unsubscribe.call(this);
    }
  };
  return AsyncAction2;
}(Action);
var Scheduler = function() {
  function Scheduler2(schedulerActionCtor, now) {
    if (now === void 0) {
      now = Scheduler2.now;
    }
    this.schedulerActionCtor = schedulerActionCtor;
    this.now = now;
  }
  Scheduler2.prototype.schedule = function(work, delay, state) {
    if (delay === void 0) {
      delay = 0;
    }
    return new this.schedulerActionCtor(this, work).schedule(state, delay);
  };
  Scheduler2.now = dateTimestampProvider.now;
  return Scheduler2;
}();
var AsyncScheduler = function(_super) {
  __extends(AsyncScheduler2, _super);
  function AsyncScheduler2(SchedulerAction, now) {
    if (now === void 0) {
      now = Scheduler.now;
    }
    var _this = _super.call(this, SchedulerAction, now) || this;
    _this.actions = [];
    _this._active = false;
    return _this;
  }
  AsyncScheduler2.prototype.flush = function(action) {
    var actions = this.actions;
    if (this._active) {
      actions.push(action);
      return;
    }
    var error;
    this._active = true;
    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while (action = actions.shift());
    this._active = false;
    if (error) {
      while (action = actions.shift()) {
        action.unsubscribe();
      }
      throw error;
    }
  };
  return AsyncScheduler2;
}(Scheduler);
var asyncScheduler = new AsyncScheduler(AsyncAction);
var async = asyncScheduler;
var EMPTY = new Observable(function(subscriber) {
  return subscriber.complete();
});
function isScheduler(value) {
  return value && isFunction(value.schedule);
}
function last(arr) {
  return arr[arr.length - 1];
}
function popResultSelector(args) {
  return isFunction(last(args)) ? args.pop() : void 0;
}
function popScheduler(args) {
  return isScheduler(last(args)) ? args.pop() : void 0;
}
function popNumber(args, defaultValue) {
  return typeof last(args) === "number" ? args.pop() : defaultValue;
}
var isArrayLike = function(x2) {
  return x2 && typeof x2.length === "number" && typeof x2 !== "function";
};
function isPromise(value) {
  return isFunction(value === null || value === void 0 ? void 0 : value.then);
}
function isInteropObservable(input) {
  return isFunction(input[observable]);
}
function isAsyncIterable(obj) {
  return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}
function createInvalidObservableTypeError(input) {
  return new TypeError("You provided " + (input !== null && typeof input === "object" ? "an invalid object" : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
function getSymbolIterator() {
  if (typeof Symbol !== "function" || !Symbol.iterator) {
    return "@@iterator";
  }
  return Symbol.iterator;
}
var iterator = getSymbolIterator();
function isIterable(input) {
  return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
}
function readableStreamLikeToAsyncGenerator(readableStream) {
  return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
    var reader, _a, value, done;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          reader = readableStream.getReader();
          _b.label = 1;
        case 1:
          _b.trys.push([1, , 9, 10]);
          _b.label = 2;
        case 2:
          return [4, __await(reader.read())];
        case 3:
          _a = _b.sent(), value = _a.value, done = _a.done;
          if (!done) return [3, 5];
          return [4, __await(void 0)];
        case 4:
          return [2, _b.sent()];
        case 5:
          return [4, __await(value)];
        case 6:
          return [4, _b.sent()];
        case 7:
          _b.sent();
          return [3, 2];
        case 8:
          return [3, 10];
        case 9:
          reader.releaseLock();
          return [7];
        case 10:
          return [2];
      }
    });
  });
}
function isReadableStreamLike(obj) {
  return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
}
function innerFrom(input) {
  if (input instanceof Observable) {
    return input;
  }
  if (input != null) {
    if (isInteropObservable(input)) {
      return fromInteropObservable(input);
    }
    if (isArrayLike(input)) {
      return fromArrayLike(input);
    }
    if (isPromise(input)) {
      return fromPromise(input);
    }
    if (isAsyncIterable(input)) {
      return fromAsyncIterable(input);
    }
    if (isIterable(input)) {
      return fromIterable(input);
    }
    if (isReadableStreamLike(input)) {
      return fromReadableStreamLike(input);
    }
  }
  throw createInvalidObservableTypeError(input);
}
function fromInteropObservable(obj) {
  return new Observable(function(subscriber) {
    var obs = obj[observable]();
    if (isFunction(obs.subscribe)) {
      return obs.subscribe(subscriber);
    }
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function fromArrayLike(array) {
  return new Observable(function(subscriber) {
    for (var i2 = 0; i2 < array.length && !subscriber.closed; i2++) {
      subscriber.next(array[i2]);
    }
    subscriber.complete();
  });
}
function fromPromise(promise) {
  return new Observable(function(subscriber) {
    promise.then(function(value) {
      if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
      }
    }, function(err) {
      return subscriber.error(err);
    }).then(null, reportUnhandledError);
  });
}
function fromIterable(iterable) {
  return new Observable(function(subscriber) {
    var e_1, _a;
    try {
      for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
        var value = iterable_1_1.value;
        subscriber.next(value);
        if (subscriber.closed) {
          return;
        }
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
    subscriber.complete();
  });
}
function fromAsyncIterable(asyncIterable) {
  return new Observable(function(subscriber) {
    process$1(asyncIterable, subscriber).catch(function(err) {
      return subscriber.error(err);
    });
  });
}
function fromReadableStreamLike(readableStream) {
  return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
}
function process$1(asyncIterable, subscriber) {
  var asyncIterable_1, asyncIterable_1_1;
  var e_2, _a;
  return __awaiter(this, void 0, void 0, function() {
    var value, e_2_1;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 5, 6, 11]);
          asyncIterable_1 = __asyncValues(asyncIterable);
          _b.label = 1;
        case 1:
          return [4, asyncIterable_1.next()];
        case 2:
          if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
          value = asyncIterable_1_1.value;
          subscriber.next(value);
          if (subscriber.closed) {
            return [2];
          }
          _b.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          e_2_1 = _b.sent();
          e_2 = { error: e_2_1 };
          return [3, 11];
        case 6:
          _b.trys.push([6, , 9, 10]);
          if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
          return [4, _a.call(asyncIterable_1)];
        case 7:
          _b.sent();
          _b.label = 8;
        case 8:
          return [3, 10];
        case 9:
          if (e_2) throw e_2.error;
          return [7];
        case 10:
          return [7];
        case 11:
          subscriber.complete();
          return [2];
      }
    });
  });
}
function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
  if (delay === void 0) {
    delay = 0;
  }
  if (repeat === void 0) {
    repeat = false;
  }
  var scheduleSubscription = scheduler.schedule(function() {
    work();
    if (repeat) {
      parentSubscription.add(this.schedule(null, delay));
    } else {
      this.unsubscribe();
    }
  }, delay);
  parentSubscription.add(scheduleSubscription);
  if (!repeat) {
    return scheduleSubscription;
  }
}
function observeOn(scheduler, delay) {
  if (delay === void 0) {
    delay = 0;
  }
  return operate(function(source, subscriber) {
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.next(value);
      }, delay);
    }, function() {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.complete();
      }, delay);
    }, function(err) {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.error(err);
      }, delay);
    }));
  });
}
function subscribeOn(scheduler, delay) {
  if (delay === void 0) {
    delay = 0;
  }
  return operate(function(source, subscriber) {
    subscriber.add(scheduler.schedule(function() {
      return source.subscribe(subscriber);
    }, delay));
  });
}
function scheduleObservable(input, scheduler) {
  return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}
function schedulePromise(input, scheduler) {
  return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}
function scheduleArray(input, scheduler) {
  return new Observable(function(subscriber) {
    var i2 = 0;
    return scheduler.schedule(function() {
      if (i2 === input.length) {
        subscriber.complete();
      } else {
        subscriber.next(input[i2++]);
        if (!subscriber.closed) {
          this.schedule();
        }
      }
    });
  });
}
function scheduleIterable(input, scheduler) {
  return new Observable(function(subscriber) {
    var iterator$1;
    executeSchedule(subscriber, scheduler, function() {
      iterator$1 = input[iterator]();
      executeSchedule(subscriber, scheduler, function() {
        var _a;
        var value;
        var done;
        try {
          _a = iterator$1.next(), value = _a.value, done = _a.done;
        } catch (err) {
          subscriber.error(err);
          return;
        }
        if (done) {
          subscriber.complete();
        } else {
          subscriber.next(value);
        }
      }, 0, true);
    });
    return function() {
      return isFunction(iterator$1 === null || iterator$1 === void 0 ? void 0 : iterator$1.return) && iterator$1.return();
    };
  });
}
function scheduleAsyncIterable(input, scheduler) {
  if (!input) {
    throw new Error("Iterable cannot be null");
  }
  return new Observable(function(subscriber) {
    executeSchedule(subscriber, scheduler, function() {
      var iterator2 = input[Symbol.asyncIterator]();
      executeSchedule(subscriber, scheduler, function() {
        iterator2.next().then(function(result) {
          if (result.done) {
            subscriber.complete();
          } else {
            subscriber.next(result.value);
          }
        });
      }, 0, true);
    });
  });
}
function scheduleReadableStreamLike(input, scheduler) {
  return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input), scheduler);
}
function scheduled(input, scheduler) {
  if (input != null) {
    if (isInteropObservable(input)) {
      return scheduleObservable(input, scheduler);
    }
    if (isArrayLike(input)) {
      return scheduleArray(input, scheduler);
    }
    if (isPromise(input)) {
      return schedulePromise(input, scheduler);
    }
    if (isAsyncIterable(input)) {
      return scheduleAsyncIterable(input, scheduler);
    }
    if (isIterable(input)) {
      return scheduleIterable(input, scheduler);
    }
    if (isReadableStreamLike(input)) {
      return scheduleReadableStreamLike(input, scheduler);
    }
  }
  throw createInvalidObservableTypeError(input);
}
function from(input, scheduler) {
  return scheduler ? scheduled(input, scheduler) : innerFrom(input);
}
function of() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var scheduler = popScheduler(args);
  return from(args, scheduler);
}
function throwError(errorOrErrorFactory, scheduler) {
  var errorFactory = isFunction(errorOrErrorFactory) ? errorOrErrorFactory : function() {
    return errorOrErrorFactory;
  };
  var init = function(subscriber) {
    return subscriber.error(errorFactory());
  };
  return new Observable(init);
}
function isObservable(obj) {
  return !!obj && (obj instanceof Observable || isFunction(obj.lift) && isFunction(obj.subscribe));
}
var EmptyError = createErrorClass(function(_super) {
  return function EmptyErrorImpl() {
    _super(this);
    this.name = "EmptyError";
    this.message = "no elements in sequence";
  };
});
function lastValueFrom(source, config2) {
  return new Promise(function(resolve, reject) {
    var _hasValue = false;
    var _value;
    source.subscribe({
      next: function(value) {
        _value = value;
        _hasValue = true;
      },
      error: reject,
      complete: function() {
        if (_hasValue) {
          resolve(_value);
        } else {
          reject(new EmptyError());
        }
      }
    });
  });
}
function firstValueFrom(source, config2) {
  return new Promise(function(resolve, reject) {
    var subscriber = new SafeSubscriber({
      next: function(value) {
        resolve(value);
        subscriber.unsubscribe();
      },
      error: reject,
      complete: function() {
        {
          reject(new EmptyError());
        }
      }
    });
    source.subscribe(subscriber);
  });
}
function isValidDate(value) {
  return value instanceof Date && !isNaN(value);
}
function map(project, thisArg) {
  return operate(function(source, subscriber) {
    var index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      subscriber.next(project.call(thisArg, value, index++));
    }));
  });
}
var isArray$1 = Array.isArray;
function callOrApply(fn, args) {
  return isArray$1(args) ? fn.apply(void 0, __spreadArray([], __read(args))) : fn(args);
}
function mapOneOrManyArgs(fn) {
  return map(function(args) {
    return callOrApply(fn, args);
  });
}
function combineLatestInit(observables, scheduler, valueTransform) {
  if (valueTransform === void 0) {
    valueTransform = identity;
  }
  return function(subscriber) {
    maybeSchedule(scheduler, function() {
      var length = observables.length;
      var values = new Array(length);
      var active = length;
      var remainingFirstValues = length;
      var _loop_1 = function(i3) {
        maybeSchedule(scheduler, function() {
          var source = from(observables[i3], scheduler);
          var hasFirstValue = false;
          source.subscribe(createOperatorSubscriber(subscriber, function(value) {
            values[i3] = value;
            if (!hasFirstValue) {
              hasFirstValue = true;
              remainingFirstValues--;
            }
            if (!remainingFirstValues) {
              subscriber.next(valueTransform(values.slice()));
            }
          }, function() {
            if (!--active) {
              subscriber.complete();
            }
          }));
        }, subscriber);
      };
      for (var i2 = 0; i2 < length; i2++) {
        _loop_1(i2);
      }
    });
  };
}
function maybeSchedule(scheduler, execute, subscription) {
  {
    execute();
  }
}
function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
  var buffer = [];
  var active = 0;
  var index = 0;
  var isComplete = false;
  var checkComplete = function() {
    if (isComplete && !buffer.length && !active) {
      subscriber.complete();
    }
  };
  var outerNext = function(value) {
    return active < concurrent ? doInnerSub(value) : buffer.push(value);
  };
  var doInnerSub = function(value) {
    active++;
    var innerComplete = false;
    innerFrom(project(value, index++)).subscribe(createOperatorSubscriber(subscriber, function(innerValue) {
      {
        subscriber.next(innerValue);
      }
    }, function() {
      innerComplete = true;
    }, void 0, function() {
      if (innerComplete) {
        try {
          active--;
          var _loop_1 = function() {
            var bufferedValue = buffer.shift();
            if (innerSubScheduler) ;
            else {
              doInnerSub(bufferedValue);
            }
          };
          while (buffer.length && active < concurrent) {
            _loop_1();
          }
          checkComplete();
        } catch (err) {
          subscriber.error(err);
        }
      }
    }));
  };
  source.subscribe(createOperatorSubscriber(subscriber, outerNext, function() {
    isComplete = true;
    checkComplete();
  }));
  return function() {
  };
}
function mergeMap(project, resultSelector, concurrent) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }
  if (isFunction(resultSelector)) {
    return mergeMap(function(a2, i2) {
      return map(function(b, ii) {
        return resultSelector(a2, b, i2, ii);
      })(innerFrom(project(a2, i2)));
    }, concurrent);
  } else if (typeof resultSelector === "number") {
    concurrent = resultSelector;
  }
  return operate(function(source, subscriber) {
    return mergeInternals(source, subscriber, project, concurrent);
  });
}
function mergeAll(concurrent) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }
  return mergeMap(identity, concurrent);
}
function concatAll() {
  return mergeAll(1);
}
function concat() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  return concatAll()(from(args, popScheduler(args)));
}
function defer(observableFactory) {
  return new Observable(function(subscriber) {
    innerFrom(observableFactory()).subscribe(subscriber);
  });
}
function timer(dueTime, intervalOrScheduler, scheduler) {
  if (scheduler === void 0) {
    scheduler = async;
  }
  return new Observable(function(subscriber) {
    var due = isValidDate(dueTime) ? 1e3 - scheduler.now() : dueTime;
    if (due < 0) {
      due = 0;
    }
    var n2 = 0;
    return scheduler.schedule(function() {
      if (!subscriber.closed) {
        subscriber.next(n2++);
        {
          subscriber.complete();
        }
      }
    }, due);
  });
}
function merge() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var scheduler = popScheduler(args);
  var concurrent = popNumber(args, Infinity);
  var sources = args;
  return !sources.length ? EMPTY : sources.length === 1 ? innerFrom(sources[0]) : mergeAll(concurrent)(from(sources, scheduler));
}
var isArray = Array.isArray;
function argsOrArgArray(args) {
  return args.length === 1 && isArray(args[0]) ? args[0] : args;
}
function filter(predicate, thisArg) {
  return operate(function(source, subscriber) {
    var index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      return predicate.call(thisArg, value, index++) && subscriber.next(value);
    }));
  });
}
function catchError(selector) {
  return operate(function(source, subscriber) {
    var innerSub = null;
    var syncUnsub = false;
    var handledResult;
    innerSub = source.subscribe(createOperatorSubscriber(subscriber, void 0, void 0, function(err) {
      handledResult = innerFrom(selector(err, catchError(selector)(source)));
      if (innerSub) {
        innerSub.unsubscribe();
        innerSub = null;
        handledResult.subscribe(subscriber);
      } else {
        syncUnsub = true;
      }
    }));
    if (syncUnsub) {
      innerSub.unsubscribe();
      innerSub = null;
      handledResult.subscribe(subscriber);
    }
  });
}
function combineLatest() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var resultSelector = popResultSelector(args);
  return resultSelector ? pipe(combineLatest.apply(void 0, __spreadArray([], __read(args))), mapOneOrManyArgs(resultSelector)) : operate(function(source, subscriber) {
    combineLatestInit(__spreadArray([source], __read(argsOrArgArray(args))))(subscriber);
  });
}
function combineLatestWith() {
  var otherSources = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    otherSources[_i] = arguments[_i];
  }
  return combineLatest.apply(void 0, __spreadArray([], __read(otherSources)));
}
function finalize(callback) {
  return operate(function(source, subscriber) {
    try {
      source.subscribe(subscriber);
    } finally {
      subscriber.add(callback);
    }
  });
}
function share(options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.connector, connector = _a === void 0 ? function() {
    return new Subject();
  } : _a, _b = options.resetOnError, resetOnError = _b === void 0 ? true : _b, _c = options.resetOnComplete, resetOnComplete = _c === void 0 ? true : _c, _d = options.resetOnRefCountZero, resetOnRefCountZero = _d === void 0 ? true : _d;
  return function(wrapperSource) {
    var connection;
    var resetConnection;
    var subject;
    var refCount = 0;
    var hasCompleted = false;
    var hasErrored = false;
    var cancelReset = function() {
      resetConnection === null || resetConnection === void 0 ? void 0 : resetConnection.unsubscribe();
      resetConnection = void 0;
    };
    var reset = function() {
      cancelReset();
      connection = subject = void 0;
      hasCompleted = hasErrored = false;
    };
    var resetAndUnsubscribe = function() {
      var conn = connection;
      reset();
      conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
    };
    return operate(function(source, subscriber) {
      refCount++;
      if (!hasErrored && !hasCompleted) {
        cancelReset();
      }
      var dest = subject = subject !== null && subject !== void 0 ? subject : connector();
      subscriber.add(function() {
        refCount--;
        if (refCount === 0 && !hasErrored && !hasCompleted) {
          resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero);
        }
      });
      dest.subscribe(subscriber);
      if (!connection && refCount > 0) {
        connection = new SafeSubscriber({
          next: function(value) {
            return dest.next(value);
          },
          error: function(err) {
            hasErrored = true;
            cancelReset();
            resetConnection = handleReset(reset, resetOnError, err);
            dest.error(err);
          },
          complete: function() {
            hasCompleted = true;
            cancelReset();
            resetConnection = handleReset(reset, resetOnComplete);
            dest.complete();
          }
        });
        innerFrom(source).subscribe(connection);
      }
    })(wrapperSource);
  };
}
function handleReset(reset, on) {
  var args = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    args[_i - 2] = arguments[_i];
  }
  if (on === true) {
    reset();
    return;
  }
  if (on === false) {
    return;
  }
  var onSubscriber = new SafeSubscriber({
    next: function() {
      onSubscriber.unsubscribe();
      reset();
    }
  });
  return innerFrom(on.apply(void 0, __spreadArray([], __read(args)))).subscribe(onSubscriber);
}
function shareReplay(configOrBufferSize, windowTime, scheduler) {
  var bufferSize;
  var refCount = false;
  {
    bufferSize = configOrBufferSize;
  }
  return share({
    connector: function() {
      return new ReplaySubject(bufferSize, windowTime, scheduler);
    },
    resetOnError: true,
    resetOnComplete: false,
    resetOnRefCountZero: refCount
  });
}
function tap(observerOrNext, error, complete) {
  var tapObserver = isFunction(observerOrNext) || error || complete ? { next: observerOrNext, error, complete } : observerOrNext;
  return tapObserver ? operate(function(source, subscriber) {
    var _a;
    (_a = tapObserver.subscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
    var isUnsub = true;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      var _a2;
      (_a2 = tapObserver.next) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver, value);
      subscriber.next(value);
    }, function() {
      var _a2;
      isUnsub = false;
      (_a2 = tapObserver.complete) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver);
      subscriber.complete();
    }, function(err) {
      var _a2;
      isUnsub = false;
      (_a2 = tapObserver.error) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver, err);
      subscriber.error(err);
    }, function() {
      var _a2, _b;
      if (isUnsub) {
        (_a2 = tapObserver.unsubscribe) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver);
      }
      (_b = tapObserver.finalize) === null || _b === void 0 ? void 0 : _b.call(tapObserver);
    }));
  }) : identity;
}
function isRecord(value) {
  return typeof value == "object" && value !== null && !Array.isArray(value);
}
var s = { 0: 8203, 1: 8204, 2: 8205, 3: 8290, 4: 8291, 5: 8288, 6: 65279, 7: 8289, 8: 119155, 9: 119156, a: 119157, b: 119158, c: 119159, d: 119160, e: 119161, f: 119162 }, c = { 0: 8203, 1: 8204, 2: 8205, 3: 65279 }, u = new Array(4).fill(String.fromCodePoint(c[0])).join("");
function E(t2) {
  let e2 = JSON.stringify(t2);
  return `${u}${Array.from(e2).map((r2) => {
    let n2 = r2.charCodeAt(0);
    if (n2 > 255) throw new Error(`Only ASCII edit info can be encoded. Error attempting to encode ${e2} on character ${r2} (${n2})`);
    return Array.from(n2.toString(4).padStart(4, "0")).map((o2) => String.fromCodePoint(c[o2])).join("");
  }).join("")}`;
}
function I(t2) {
  return !Number.isNaN(Number(t2)) || /[a-z]/i.test(t2) && !/\d+(?:[-:\/]\d+){2}(?:T\d+(?:[-:\/]\d+){1,2}(\.\d+)?Z?)?/.test(t2) ? false : !!Date.parse(t2);
}
function T(t2) {
  try {
    new URL(t2, t2.startsWith("/") ? "https://acme.com" : void 0);
  } catch {
    return false;
  }
  return true;
}
function C(t2, e2, r2 = "auto") {
  return r2 === true || r2 === "auto" && (I(t2) || T(t2)) ? t2 : `${t2}${E(e2)}`;
}
Object.fromEntries(Object.entries(c).map((t2) => t2.reverse()));
Object.fromEntries(Object.entries(s).map((t2) => t2.reverse()));
var S = `${Object.values(s).map((t2) => `\\u{${t2.toString(16)}}`).join("")}`, f = new RegExp(`[${S}]{4,}`, "gu");
function _(t2) {
  var e2;
  return { cleaned: t2.replace(f, ""), encoded: ((e2 = t2.match(f)) == null ? void 0 : e2[0]) || "" };
}
function O(t2) {
  return t2 && JSON.parse(_(JSON.stringify(t2)).cleaned);
}
function stegaClean(result) {
  return O(result);
}
const DRAFTS_FOLDER = "drafts", VERSION_FOLDER = "versions", PATH_SEPARATOR = ".", DRAFTS_PREFIX = `${DRAFTS_FOLDER}${PATH_SEPARATOR}`, VERSION_PREFIX = `${VERSION_FOLDER}${PATH_SEPARATOR}`;
function isDraftId(id) {
  return id.startsWith(DRAFTS_PREFIX);
}
function isVersionId(id) {
  return id.startsWith(VERSION_PREFIX);
}
function getDraftId(id) {
  if (isVersionId(id)) {
    const publishedId = getPublishedId(id);
    return DRAFTS_PREFIX + publishedId;
  }
  return isDraftId(id) ? id : DRAFTS_PREFIX + id;
}
function getVersionId(id, version) {
  if (version === "drafts" || version === "published")
    throw new Error('Version can not be "published" or "drafts"');
  return `${VERSION_PREFIX}${version}${PATH_SEPARATOR}${getPublishedId(id)}`;
}
function getVersionFromId(id) {
  if (!isVersionId(id)) return;
  const [_versionPrefix, versionId, ..._publishedId] = id.split(PATH_SEPARATOR);
  return versionId;
}
function getPublishedId(id) {
  return isVersionId(id) ? id.split(PATH_SEPARATOR).slice(2).join(PATH_SEPARATOR) : isDraftId(id) ? id.slice(DRAFTS_PREFIX.length) : id;
}
const POOL_SIZE_MULTIPLIER = 128;
let pool, poolOffset;
let fillPool = (bytes) => {
  if (!pool || pool.length < bytes) {
    pool = Buffer.allocUnsafe(bytes * POOL_SIZE_MULTIPLIER);
    crypto.randomFillSync(pool);
    poolOffset = 0;
  } else if (poolOffset + bytes > pool.length) {
    crypto.randomFillSync(pool);
    poolOffset = 0;
  }
  poolOffset += bytes;
};
let random = (bytes) => {
  fillPool(bytes |= 0);
  return pool.subarray(poolOffset - bytes, poolOffset);
};
let customRandom = (alphabet, defaultSize, getRandom) => {
  let mask = (2 << 31 - Math.clz32(alphabet.length - 1 | 1)) - 1;
  let step = Math.ceil(1.6 * mask * defaultSize / alphabet.length);
  return (size = defaultSize) => {
    let id = "";
    while (true) {
      let bytes = getRandom(step);
      let i2 = step;
      while (i2--) {
        id += alphabet[bytes[i2] & mask] || "";
        if (id.length === size) return id;
      }
    }
  };
};
let customAlphabet = (alphabet, size = 21) => customRandom(alphabet, size, random);
const NEWLINE = /\r\n|[\n\r\u2028\u2029]/;
function codeFrame(query, location2, message) {
  const lines = query.split(NEWLINE), loc = {
    start: columnToLine(location2.start, lines),
    end: location2.end ? columnToLine(location2.end, lines) : void 0
  }, { start, end, markerLines } = getMarkerLines(loc, lines), numberMaxWidth = `${end}`.length;
  return query.split(NEWLINE, end).slice(start, end).map((line, index) => {
    const number = start + 1 + index, gutter = ` ${` ${number}`.slice(-numberMaxWidth)} |`, hasMarker = markerLines[number], lastMarkerLine = !markerLines[number + 1];
    if (!hasMarker)
      return ` ${gutter}${line.length > 0 ? ` ${line}` : ""}`;
    let markerLine = "";
    if (Array.isArray(hasMarker)) {
      const markerSpacing = line.slice(0, Math.max(hasMarker[0] - 1, 0)).replace(/[^\t]/g, " "), numberOfMarkers = hasMarker[1] || 1;
      markerLine = [
        `
 `,
        gutter.replace(/\d/g, " "),
        " ",
        markerSpacing,
        "^".repeat(numberOfMarkers)
      ].join(""), lastMarkerLine && message && (markerLine += " " + message);
    }
    return [">", gutter, line.length > 0 ? ` ${line}` : "", markerLine].join("");
  }).join(`
`);
}
function getMarkerLines(loc, source) {
  const startLoc = { ...loc.start }, endLoc = { ...startLoc, ...loc.end }, linesAbove = 2, linesBelow = 3, startLine = startLoc.line ?? -1, startColumn = startLoc.column ?? 0, endLine = endLoc.line, endColumn = endLoc.column;
  let start = Math.max(startLine - (linesAbove + 1), 0), end = Math.min(source.length, endLine + linesBelow);
  startLine === -1 && (start = 0), endLine === -1 && (end = source.length);
  const lineDiff = endLine - startLine, markerLines = {};
  if (lineDiff)
    for (let i2 = 0; i2 <= lineDiff; i2++) {
      const lineNumber = i2 + startLine;
      if (!startColumn)
        markerLines[lineNumber] = true;
      else if (i2 === 0) {
        const sourceLength = source[lineNumber - 1].length;
        markerLines[lineNumber] = [startColumn, sourceLength - startColumn + 1];
      } else if (i2 === lineDiff)
        markerLines[lineNumber] = [0, endColumn];
      else {
        const sourceLength = source[lineNumber - i2].length;
        markerLines[lineNumber] = [0, sourceLength];
      }
    }
  else
    startColumn === endColumn ? startColumn ? markerLines[startLine] = [startColumn, 0] : markerLines[startLine] = true : markerLines[startLine] = [startColumn, endColumn - startColumn];
  return { start, end, markerLines };
}
function columnToLine(column, lines) {
  let offset = 0;
  for (let i2 = 0; i2 < lines.length; i2++) {
    const lineLength = lines[i2].length + 1;
    if (offset + lineLength > column)
      return {
        line: i2 + 1,
        // 1-based line
        column: column - offset
        // 0-based column
      };
    offset += lineLength;
  }
  return {
    line: lines.length,
    column: lines[lines.length - 1]?.length ?? 0
  };
}
const MAX_ITEMS_IN_ERROR_MESSAGE = 5;
class ClientError extends Error {
  response;
  statusCode = 400;
  responseBody;
  details;
  constructor(res, context) {
    const props = extractErrorProps(res, context);
    super(props.message), Object.assign(this, props);
  }
}
class ServerError extends Error {
  response;
  statusCode = 500;
  responseBody;
  details;
  constructor(res) {
    const props = extractErrorProps(res);
    super(props.message), Object.assign(this, props);
  }
}
function extractErrorProps(res, context) {
  const body = res.body, props = {
    response: res,
    statusCode: res.statusCode,
    responseBody: stringifyBody(body, res),
    message: "",
    details: void 0
  };
  if (!isRecord(body))
    return props.message = httpErrorMessage(res, body), props;
  const error = body.error;
  if (typeof error == "string" && typeof body.message == "string")
    return props.message = `${error} - ${body.message}`, props;
  if (typeof error != "object" || error === null)
    return typeof error == "string" ? props.message = error : typeof body.message == "string" ? props.message = body.message : props.message = httpErrorMessage(res, body), props;
  if (isMutationError(error) || isActionError(error)) {
    const allItems = error.items || [], items = allItems.slice(0, MAX_ITEMS_IN_ERROR_MESSAGE).map((item) => item.error?.description).filter(Boolean);
    let itemsStr = items.length ? `:
- ${items.join(`
- `)}` : "";
    return allItems.length > MAX_ITEMS_IN_ERROR_MESSAGE && (itemsStr += `
...and ${allItems.length - MAX_ITEMS_IN_ERROR_MESSAGE} more`), props.message = `${error.description}${itemsStr}`, props.details = body.error, props;
  }
  if (isQueryParseError(error)) {
    const tag = context?.options?.query?.tag;
    return props.message = formatQueryParseError(error, tag), props.details = body.error, props;
  }
  return "description" in error && typeof error.description == "string" ? (props.message = error.description, props.details = error, props) : (props.message = httpErrorMessage(res, body), props);
}
function isMutationError(error) {
  return "type" in error && error.type === "mutationError" && "description" in error && typeof error.description == "string";
}
function isActionError(error) {
  return "type" in error && error.type === "actionError" && "description" in error && typeof error.description == "string";
}
function isQueryParseError(error) {
  return isRecord(error) && error.type === "queryParseError" && typeof error.query == "string" && typeof error.start == "number" && typeof error.end == "number";
}
function formatQueryParseError(error, tag) {
  const { query, start, end, description } = error;
  if (!query || typeof start > "u")
    return `GROQ query parse error: ${description}`;
  const withTag = tag ? `

Tag: ${tag}` : "";
  return `GROQ query parse error:
${codeFrame(query, { start, end }, description)}${withTag}`;
}
function httpErrorMessage(res, body) {
  const details = typeof body == "string" ? ` (${sliceWithEllipsis(body, 100)})` : "", statusMessage = res.statusMessage ? ` ${res.statusMessage}` : "";
  return `${res.method}-request to ${res.url} resulted in HTTP ${res.statusCode}${statusMessage}${details}`;
}
function stringifyBody(body, res) {
  return (res.headers["content-type"] || "").toLowerCase().indexOf("application/json") !== -1 ? JSON.stringify(body, null, 2) : body;
}
function sliceWithEllipsis(str, max) {
  return str.length > max ? `${str.slice(0, max)}…` : str;
}
class CorsOriginError extends Error {
  projectId;
  addOriginUrl;
  constructor({ projectId: projectId2 }) {
    super("CorsOriginError"), this.name = "CorsOriginError", this.projectId = projectId2;
    const url = new URL(`https://sanity.io/manage/project/${projectId2}/api`);
    if (typeof location < "u") {
      const { origin } = location;
      url.searchParams.set("cors", "add"), url.searchParams.set("origin", origin), this.addOriginUrl = url, this.message = `The current origin is not allowed to connect to the Live Content API. Add it here: ${url}`;
    } else
      this.message = `The current origin is not allowed to connect to the Live Content API. Change your configuration here: ${url}`;
  }
}
const httpError = {
  onResponse: (res, context) => {
    if (res.statusCode >= 500)
      throw new ServerError(res);
    if (res.statusCode >= 400)
      throw new ClientError(res, context);
    return res;
  }
};
function printWarnings() {
  const seen = {};
  return {
    onResponse: (res) => {
      const warn = res.headers["x-sanity-warning"], warnings = Array.isArray(warn) ? warn : [warn];
      for (const msg of warnings)
        !msg || seen[msg] || (seen[msg] = true, console.warn(msg));
      return res;
    }
  };
}
function defineHttpRequest(envMiddleware2) {
  return p$1([
    P({ shouldRetry }),
    ...envMiddleware2,
    printWarnings(),
    x(),
    E$1(),
    S$1(),
    httpError,
    A({ implementation: Observable })
  ]);
}
function shouldRetry(err, attempt, options) {
  if (options.maxRetries === 0) return false;
  const isSafe = options.method === "GET" || options.method === "HEAD", isQuery2 = (options.uri || options.url).startsWith("/data/query"), isRetriableResponse = err.response && (err.response.statusCode === 429 || err.response.statusCode === 502 || err.response.statusCode === 503);
  return (isSafe || isQuery2) && isRetriableResponse ? true : P.shouldRetry(err, attempt, options);
}
const BASE_URL = "https://www.sanity.io/help/";
function generateHelpUrl(slug) {
  return BASE_URL + slug;
}
const VALID_ASSET_TYPES = ["image", "file"], VALID_INSERT_LOCATIONS = ["before", "after", "replace"], dataset = (name) => {
  if (!/^(~[a-z0-9]{1}[-\w]{0,63}|[a-z0-9]{1}[-\w]{0,63})$/.test(name))
    throw new Error(
      "Datasets can only contain lowercase characters, numbers, underscores and dashes, and start with tilde, and be maximum 64 characters"
    );
}, projectId = (id) => {
  if (!/^[-a-z0-9]+$/i.test(id))
    throw new Error("`projectId` can only contain only a-z, 0-9 and dashes");
}, validateAssetType = (type) => {
  if (VALID_ASSET_TYPES.indexOf(type) === -1)
    throw new Error(`Invalid asset type: ${type}. Must be one of ${VALID_ASSET_TYPES.join(", ")}`);
}, validateObject = (op, val) => {
  if (val === null || typeof val != "object" || Array.isArray(val))
    throw new Error(`${op}() takes an object of properties`);
}, validateDocumentId = (op, id) => {
  if (typeof id != "string" || !/^[a-z0-9_][a-z0-9_.-]{0,127}$/i.test(id) || id.includes(".."))
    throw new Error(`${op}(): "${id}" is not a valid document ID`);
}, requireDocumentId = (op, doc) => {
  if (!doc._id)
    throw new Error(`${op}() requires that the document contains an ID ("_id" property)`);
  validateDocumentId(op, doc._id);
}, validateDocumentType = (op, type) => {
  if (typeof type != "string")
    throw new Error(`\`${op}()\`: \`${type}\` is not a valid document type`);
}, requireDocumentType = (op, doc) => {
  if (!doc._type)
    throw new Error(`\`${op}()\` requires that the document contains a type (\`_type\` property)`);
  validateDocumentType(op, doc._type);
}, validateVersionIdMatch = (builtVersionId, document2) => {
  if (document2._id && document2._id !== builtVersionId)
    throw new Error(
      `The provided document ID (\`${document2._id}\`) does not match the generated version ID (\`${builtVersionId}\`)`
    );
}, validateInsert = (at, selector, items) => {
  const signature = "insert(at, selector, items)";
  if (VALID_INSERT_LOCATIONS.indexOf(at) === -1) {
    const valid = VALID_INSERT_LOCATIONS.map((loc) => `"${loc}"`).join(", ");
    throw new Error(`${signature} takes an "at"-argument which is one of: ${valid}`);
  }
  if (typeof selector != "string")
    throw new Error(`${signature} takes a "selector"-argument which must be a string`);
  if (!Array.isArray(items))
    throw new Error(`${signature} takes an "items"-argument which must be an array`);
}, hasDataset = (config2) => {
  if (!config2.dataset)
    throw new Error("`dataset` must be provided to perform queries");
  return config2.dataset || "";
}, requestTag = (tag) => {
  if (typeof tag != "string" || !/^[a-z0-9._-]{1,75}$/i.test(tag))
    throw new Error(
      "Tag can only contain alphanumeric characters, underscores, dashes and dots, and be between one and 75 characters long."
    );
  return tag;
}, resourceConfig = (config2) => {
  if (!config2["~experimental_resource"])
    throw new Error("`resource` must be provided to perform resource queries");
  const { type, id } = config2["~experimental_resource"];
  switch (type) {
    case "dataset": {
      if (id.split(".").length !== 2)
        throw new Error('Dataset resource ID must be in the format "project.dataset"');
      return;
    }
    case "dashboard":
    case "media-library":
    case "canvas":
      return;
    default:
      throw new Error(`Unsupported resource type: ${type.toString()}`);
  }
}, resourceGuard = (service, config2) => {
  if (config2["~experimental_resource"])
    throw new Error(`\`${service}\` does not support resource-based operations`);
};
function once(fn) {
  let didCall = false, returnValue;
  return (...args) => (didCall || (returnValue = fn(...args), didCall = true), returnValue);
}
const createWarningPrinter = (message) => (
  // eslint-disable-next-line no-console
  once((...args) => console.warn(message.join(" "), ...args))
), printCdnAndWithCredentialsWarning = createWarningPrinter([
  "Because you set `withCredentials` to true, we will override your `useCdn`",
  "setting to be false since (cookie-based) credentials are never set on the CDN"
]), printCdnWarning = createWarningPrinter([
  "Since you haven't set a value for `useCdn`, we will deliver content using our",
  "global, edge-cached API-CDN. If you wish to have content delivered faster, set",
  "`useCdn: false` to use the Live API. Note: You may incur higher costs using the live API."
]), printCdnPreviewDraftsWarning = createWarningPrinter([
  "The Sanity client is configured with the `perspective` set to `drafts` or `previewDrafts`, which doesn't support the API-CDN.",
  "The Live API will be used instead. Set `useCdn: false` in your configuration to hide this warning."
]), printPreviewDraftsDeprecationWarning = createWarningPrinter([
  "The `previewDrafts` perspective has been renamed to  `drafts` and will be removed in a future API version"
]), printBrowserTokenWarning = createWarningPrinter([
  "You have configured Sanity client to use a token in the browser. This may cause unintentional security issues.",
  `See ${generateHelpUrl(
    "js-client-browser-token"
  )} for more information and how to hide this warning.`
]), printCredentialedTokenWarning = createWarningPrinter([
  "You have configured Sanity client to use a token, but also provided `withCredentials: true`.",
  "This is no longer supported - only token will be used - remove `withCredentials: true`."
]), printNoApiVersionSpecifiedWarning = createWarningPrinter([
  "Using the Sanity client without specifying an API version is deprecated.",
  `See ${generateHelpUrl("js-client-api-version")}`
]), defaultCdnHost = "apicdn.sanity.io", defaultConfig = {
  apiHost: "https://api.sanity.io",
  apiVersion: "1",
  useProjectHostname: true,
  stega: { enabled: false }
}, LOCALHOSTS = ["localhost", "127.0.0.1", "0.0.0.0"], isLocal = (host) => LOCALHOSTS.indexOf(host) !== -1;
function validateApiVersion(apiVersion) {
  if (apiVersion === "1" || apiVersion === "X")
    return;
  const apiDate = new Date(apiVersion);
  if (!(/^\d{4}-\d{2}-\d{2}$/.test(apiVersion) && apiDate instanceof Date && apiDate.getTime() > 0))
    throw new Error("Invalid API version string, expected `1` or date in format `YYYY-MM-DD`");
}
function validateApiPerspective(perspective) {
  if (Array.isArray(perspective) && perspective.length > 1 && perspective.includes("raw"))
    throw new TypeError(
      'Invalid API perspective value: "raw". The raw-perspective can not be combined with other perspectives'
    );
}
const initConfig = (config2, prevConfig) => {
  const specifiedConfig = {
    ...prevConfig,
    ...config2,
    stega: {
      ...typeof prevConfig.stega == "boolean" ? { enabled: prevConfig.stega } : prevConfig.stega || defaultConfig.stega,
      ...typeof config2.stega == "boolean" ? { enabled: config2.stega } : config2.stega || {}
    }
  };
  specifiedConfig.apiVersion || printNoApiVersionSpecifiedWarning();
  const newConfig = {
    ...defaultConfig,
    ...specifiedConfig
  }, projectBased = newConfig.useProjectHostname && !newConfig["~experimental_resource"];
  if (typeof Promise > "u") {
    const helpUrl = generateHelpUrl("js-client-promise-polyfill");
    throw new Error(`No native Promise-implementation found, polyfill needed - see ${helpUrl}`);
  }
  if (projectBased && !newConfig.projectId)
    throw new Error("Configuration must contain `projectId`");
  if (newConfig["~experimental_resource"] && resourceConfig(newConfig), typeof newConfig.perspective < "u" && validateApiPerspective(newConfig.perspective), "encodeSourceMap" in newConfig)
    throw new Error(
      "It looks like you're using options meant for '@sanity/preview-kit/client'. 'encodeSourceMap' is not supported in '@sanity/client'. Did you mean 'stega.enabled'?"
    );
  if ("encodeSourceMapAtPath" in newConfig)
    throw new Error(
      "It looks like you're using options meant for '@sanity/preview-kit/client'. 'encodeSourceMapAtPath' is not supported in '@sanity/client'. Did you mean 'stega.filter'?"
    );
  if (typeof newConfig.stega.enabled != "boolean")
    throw new Error(`stega.enabled must be a boolean, received ${newConfig.stega.enabled}`);
  if (newConfig.stega.enabled && newConfig.stega.studioUrl === void 0)
    throw new Error("stega.studioUrl must be defined when stega.enabled is true");
  if (newConfig.stega.enabled && typeof newConfig.stega.studioUrl != "string" && typeof newConfig.stega.studioUrl != "function")
    throw new Error(
      `stega.studioUrl must be a string or a function, received ${newConfig.stega.studioUrl}`
    );
  const isBrowser = typeof window < "u" && window.location && window.location.hostname, isLocalhost = isBrowser && isLocal(window.location.hostname), hasToken = !!newConfig.token;
  newConfig.withCredentials && hasToken && (printCredentialedTokenWarning(), newConfig.withCredentials = false), isBrowser && isLocalhost && hasToken && newConfig.ignoreBrowserTokenWarning !== true ? printBrowserTokenWarning() : typeof newConfig.useCdn > "u" && printCdnWarning(), projectBased && projectId(newConfig.projectId), newConfig.dataset && dataset(newConfig.dataset), "requestTagPrefix" in newConfig && (newConfig.requestTagPrefix = newConfig.requestTagPrefix ? requestTag(newConfig.requestTagPrefix).replace(/\.+$/, "") : void 0), newConfig.apiVersion = `${newConfig.apiVersion}`.replace(/^v/, ""), newConfig.isDefaultApi = newConfig.apiHost === defaultConfig.apiHost, newConfig.useCdn === true && newConfig.withCredentials && printCdnAndWithCredentialsWarning(), newConfig.useCdn = newConfig.useCdn !== false && !newConfig.withCredentials, validateApiVersion(newConfig.apiVersion);
  const hostParts = newConfig.apiHost.split("://", 2), protocol = hostParts[0], host = hostParts[1], cdnHost = newConfig.isDefaultApi ? defaultCdnHost : host;
  return projectBased ? (newConfig.url = `${protocol}://${newConfig.projectId}.${host}/v${newConfig.apiVersion}`, newConfig.cdnUrl = `${protocol}://${newConfig.projectId}.${cdnHost}/v${newConfig.apiVersion}`) : (newConfig.url = `${newConfig.apiHost}/v${newConfig.apiVersion}`, newConfig.cdnUrl = newConfig.url), newConfig;
};
class ConnectionFailedError extends Error {
  name = "ConnectionFailedError";
}
class DisconnectError extends Error {
  name = "DisconnectError";
  reason;
  constructor(message, reason, options = {}) {
    super(message, options), this.reason = reason;
  }
}
class ChannelError extends Error {
  name = "ChannelError";
  data;
  constructor(message, data) {
    super(message), this.data = data;
  }
}
class MessageError extends Error {
  name = "MessageError";
  data;
  constructor(message, data, options = {}) {
    super(message, options), this.data = data;
  }
}
class MessageParseError extends Error {
  name = "MessageParseError";
}
const REQUIRED_EVENTS = ["channelError", "disconnect"];
function connectEventSource(initEventSource, events) {
  return defer(() => {
    const es = initEventSource();
    return isObservable(es) ? es : of(es);
  }).pipe(mergeMap((es) => connectWithESInstance(es, events)));
}
function connectWithESInstance(es, events) {
  return new Observable((observer) => {
    const emitOpen = events.includes("open"), emitReconnect = events.includes("reconnect");
    function onError(evt) {
      if ("data" in evt) {
        const [parseError, event] = parseEvent(evt);
        observer.error(
          parseError ? new MessageParseError("Unable to parse EventSource error message", { cause: event }) : new MessageError((event?.data).message, event)
        );
        return;
      }
      es.readyState === es.CLOSED ? observer.error(new ConnectionFailedError("EventSource connection failed")) : emitReconnect && observer.next({ type: "reconnect" });
    }
    function onOpen() {
      observer.next({ type: "open" });
    }
    function onMessage(message) {
      const [parseError, event] = parseEvent(message);
      if (parseError) {
        observer.error(
          new MessageParseError("Unable to parse EventSource message", { cause: parseError })
        );
        return;
      }
      if (message.type === "channelError") {
        const tag = new URL(es.url).searchParams.get("tag");
        observer.error(new ChannelError(extractErrorMessage(event?.data, tag), event.data));
        return;
      }
      if (message.type === "disconnect") {
        observer.error(
          new DisconnectError(
            `Server disconnected client: ${event.data?.reason || "unknown error"}`
          )
        );
        return;
      }
      observer.next({
        type: message.type,
        id: message.lastEventId,
        ...event.data ? { data: event.data } : {}
      });
    }
    es.addEventListener("error", onError), emitOpen && es.addEventListener("open", onOpen);
    const cleanedEvents = [.../* @__PURE__ */ new Set([...REQUIRED_EVENTS, ...events])].filter((type) => type !== "error" && type !== "open" && type !== "reconnect");
    return cleanedEvents.forEach((type) => es.addEventListener(type, onMessage)), () => {
      es.removeEventListener("error", onError), emitOpen && es.removeEventListener("open", onOpen), cleanedEvents.forEach((type) => es.removeEventListener(type, onMessage)), es.close();
    };
  });
}
function parseEvent(message) {
  try {
    const data = typeof message.data == "string" && JSON.parse(message.data);
    return [
      null,
      {
        type: message.type,
        id: message.lastEventId,
        ...isEmptyObject(data) ? {} : { data }
      }
    ];
  } catch (err) {
    return [err, null];
  }
}
function extractErrorMessage(err, tag) {
  const error = err.error;
  return error ? isQueryParseError(error) ? formatQueryParseError(error, tag) : error.description ? error.description : typeof error == "string" ? error : JSON.stringify(error, null, 2) : err.message || "Unknown listener error";
}
function isEmptyObject(data) {
  for (const _2 in data)
    return false;
  return true;
}
function getSelection(sel) {
  if (typeof sel == "string")
    return { id: sel };
  if (Array.isArray(sel))
    return { query: "*[_id in $ids]", params: { ids: sel } };
  if (typeof sel == "object" && sel !== null && "query" in sel && typeof sel.query == "string")
    return "params" in sel && typeof sel.params == "object" && sel.params !== null ? { query: sel.query, params: sel.params } : { query: sel.query };
  const selectionOpts = [
    "* Document ID (<docId>)",
    "* Array of document IDs",
    "* Object containing `query`"
  ].join(`
`);
  throw new Error(`Unknown selection - must be one of:

${selectionOpts}`);
}
class BasePatch {
  selection;
  operations;
  constructor(selection, operations = {}) {
    this.selection = selection, this.operations = operations;
  }
  /**
   * Sets the given attributes to the document. Does NOT merge objects.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attributes to set. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "value"\}
   */
  set(attrs) {
    return this._assign("set", attrs);
  }
  /**
   * Sets the given attributes to the document if they are not currently set. Does NOT merge objects.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attributes to set. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "value"\}
   */
  setIfMissing(attrs) {
    return this._assign("setIfMissing", attrs);
  }
  /**
   * Performs a "diff-match-patch" operation on the string attributes provided.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attributes to perform operation on. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "dmp"\}
   */
  diffMatchPatch(attrs) {
    return validateObject("diffMatchPatch", attrs), this._assign("diffMatchPatch", attrs);
  }
  /**
   * Unsets the attribute paths provided.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attribute paths to unset.
   */
  unset(attrs) {
    if (!Array.isArray(attrs))
      throw new Error("unset(attrs) takes an array of attributes to unset, non-array given");
    return this.operations = Object.assign({}, this.operations, { unset: attrs }), this;
  }
  /**
   * Increment a numeric value. Each entry in the argument is either an attribute or a JSON path. The value may be a positive or negative integer or floating-point value. The operation will fail if target value is not a numeric value, or doesn't exist.
   *
   * @param attrs - Object of attribute paths to increment, values representing the number to increment by.
   */
  inc(attrs) {
    return this._assign("inc", attrs);
  }
  /**
   * Decrement a numeric value. Each entry in the argument is either an attribute or a JSON path. The value may be a positive or negative integer or floating-point value. The operation will fail if target value is not a numeric value, or doesn't exist.
   *
   * @param attrs - Object of attribute paths to decrement, values representing the number to decrement by.
   */
  dec(attrs) {
    return this._assign("dec", attrs);
  }
  /**
   * Provides methods for modifying arrays, by inserting, appending and replacing elements via a JSONPath expression.
   *
   * @param at - Location to insert at, relative to the given selector, or 'replace' the matched path
   * @param selector - JSONPath expression, eg `comments[-1]` or `blocks[_key=="abc123"]`
   * @param items - Array of items to insert/replace
   */
  insert(at, selector, items) {
    return validateInsert(at, selector, items), this._assign("insert", { [at]: selector, items });
  }
  /**
   * Append the given items to the array at the given JSONPath
   *
   * @param selector - Attribute/path to append to, eg `comments` or `person.hobbies`
   * @param items - Array of items to append to the array
   */
  append(selector, items) {
    return this.insert("after", `${selector}[-1]`, items);
  }
  /**
   * Prepend the given items to the array at the given JSONPath
   *
   * @param selector - Attribute/path to prepend to, eg `comments` or `person.hobbies`
   * @param items - Array of items to prepend to the array
   */
  prepend(selector, items) {
    return this.insert("before", `${selector}[0]`, items);
  }
  /**
   * Change the contents of an array by removing existing elements and/or adding new elements.
   *
   * @param selector - Attribute or JSONPath expression for array
   * @param start - Index at which to start changing the array (with origin 0). If greater than the length of the array, actual starting index will be set to the length of the array. If negative, will begin that many elements from the end of the array (with origin -1) and will be set to 0 if absolute value is greater than the length of the array.x
   * @param deleteCount - An integer indicating the number of old array elements to remove.
   * @param items - The elements to add to the array, beginning at the start index. If you don't specify any elements, splice() will only remove elements from the array.
   */
  splice(selector, start, deleteCount, items) {
    const delAll = typeof deleteCount > "u" || deleteCount === -1, startIndex = start < 0 ? start - 1 : start, delCount = delAll ? -1 : Math.max(0, start + deleteCount), delRange = startIndex < 0 && delCount >= 0 ? "" : delCount, rangeSelector = `${selector}[${startIndex}:${delRange}]`;
    return this.insert("replace", rangeSelector, items || []);
  }
  /**
   * Adds a revision clause, preventing the document from being patched if the `_rev` property does not match the given value
   *
   * @param rev - Revision to lock the patch to
   */
  ifRevisionId(rev) {
    return this.operations.ifRevisionID = rev, this;
  }
  /**
   * Return a plain JSON representation of the patch
   */
  serialize() {
    return { ...getSelection(this.selection), ...this.operations };
  }
  /**
   * Return a plain JSON representation of the patch
   */
  toJSON() {
    return this.serialize();
  }
  /**
   * Clears the patch of all operations
   */
  reset() {
    return this.operations = {}, this;
  }
  _assign(op, props, merge2 = true) {
    return validateObject(op, props), this.operations = Object.assign({}, this.operations, {
      [op]: Object.assign({}, merge2 && this.operations[op] || {}, props)
    }), this;
  }
  _set(op, props) {
    return this._assign(op, props, false);
  }
}
class ObservablePatch extends BasePatch {
  #client;
  constructor(selection, operations, client) {
    super(selection, operations), this.#client = client;
  }
  /**
   * Clones the patch
   */
  clone() {
    return new ObservablePatch(this.selection, { ...this.operations }, this.#client);
  }
  commit(options) {
    if (!this.#client)
      throw new Error(
        "No `client` passed to patch, either provide one or pass the patch to a clients `mutate()` method"
      );
    const returnFirst = typeof this.selection == "string", opts = Object.assign({ returnFirst, returnDocuments: true }, options);
    return this.#client.mutate({ patch: this.serialize() }, opts);
  }
}
class Patch extends BasePatch {
  #client;
  constructor(selection, operations, client) {
    super(selection, operations), this.#client = client;
  }
  /**
   * Clones the patch
   */
  clone() {
    return new Patch(this.selection, { ...this.operations }, this.#client);
  }
  commit(options) {
    if (!this.#client)
      throw new Error(
        "No `client` passed to patch, either provide one or pass the patch to a clients `mutate()` method"
      );
    const returnFirst = typeof this.selection == "string", opts = Object.assign({ returnFirst, returnDocuments: true }, options);
    return this.#client.mutate({ patch: this.serialize() }, opts);
  }
}
const defaultMutateOptions = { returnDocuments: false };
class BaseTransaction {
  operations;
  trxId;
  constructor(operations = [], transactionId) {
    this.operations = operations, this.trxId = transactionId;
  }
  /**
   * Creates a new Sanity document. If `_id` is provided and already exists, the mutation will fail. If no `_id` is given, one will automatically be generated by the database.
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param doc - Document to create. Requires a `_type` property.
   */
  create(doc) {
    return validateObject("create", doc), this._add({ create: doc });
  }
  /**
   * Creates a new Sanity document. If a document with the same `_id` already exists, the create operation will be ignored.
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param doc - Document to create if it does not already exist. Requires `_id` and `_type` properties.
   */
  createIfNotExists(doc) {
    const op = "createIfNotExists";
    return validateObject(op, doc), requireDocumentId(op, doc), this._add({ [op]: doc });
  }
  /**
   * Creates a new Sanity document, or replaces an existing one if the same `_id` is already used.
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param doc - Document to create or replace. Requires `_id` and `_type` properties.
   */
  createOrReplace(doc) {
    const op = "createOrReplace";
    return validateObject(op, doc), requireDocumentId(op, doc), this._add({ [op]: doc });
  }
  /**
   * Deletes the document with the given document ID
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param documentId - Document ID to delete
   */
  delete(documentId) {
    return validateDocumentId("delete", documentId), this._add({ delete: { id: documentId } });
  }
  transactionId(id) {
    return id ? (this.trxId = id, this) : this.trxId;
  }
  /**
   * Return a plain JSON representation of the transaction
   */
  serialize() {
    return [...this.operations];
  }
  /**
   * Return a plain JSON representation of the transaction
   */
  toJSON() {
    return this.serialize();
  }
  /**
   * Clears the transaction of all operations
   */
  reset() {
    return this.operations = [], this;
  }
  _add(mut) {
    return this.operations.push(mut), this;
  }
}
class Transaction extends BaseTransaction {
  #client;
  constructor(operations, client, transactionId) {
    super(operations, transactionId), this.#client = client;
  }
  /**
   * Clones the transaction
   */
  clone() {
    return new Transaction([...this.operations], this.#client, this.trxId);
  }
  commit(options) {
    if (!this.#client)
      throw new Error(
        "No `client` passed to transaction, either provide one or pass the transaction to a clients `mutate()` method"
      );
    return this.#client.mutate(
      this.serialize(),
      Object.assign({ transactionId: this.trxId }, defaultMutateOptions, options || {})
    );
  }
  patch(patchOrDocumentId, patchOps) {
    const isBuilder = typeof patchOps == "function", isPatch = typeof patchOrDocumentId != "string" && patchOrDocumentId instanceof Patch, isMutationSelection = typeof patchOrDocumentId == "object" && ("query" in patchOrDocumentId || "id" in patchOrDocumentId);
    if (isPatch)
      return this._add({ patch: patchOrDocumentId.serialize() });
    if (isBuilder) {
      const patch = patchOps(new Patch(patchOrDocumentId, {}, this.#client));
      if (!(patch instanceof Patch))
        throw new Error("function passed to `patch()` must return the patch");
      return this._add({ patch: patch.serialize() });
    }
    if (isMutationSelection) {
      const patch = new Patch(patchOrDocumentId, patchOps || {}, this.#client);
      return this._add({ patch: patch.serialize() });
    }
    return this._add({ patch: { id: patchOrDocumentId, ...patchOps } });
  }
}
class ObservableTransaction extends BaseTransaction {
  #client;
  constructor(operations, client, transactionId) {
    super(operations, transactionId), this.#client = client;
  }
  /**
   * Clones the transaction
   */
  clone() {
    return new ObservableTransaction([...this.operations], this.#client, this.trxId);
  }
  commit(options) {
    if (!this.#client)
      throw new Error(
        "No `client` passed to transaction, either provide one or pass the transaction to a clients `mutate()` method"
      );
    return this.#client.mutate(
      this.serialize(),
      Object.assign({ transactionId: this.trxId }, defaultMutateOptions, options || {})
    );
  }
  patch(patchOrDocumentId, patchOps) {
    const isBuilder = typeof patchOps == "function";
    if (typeof patchOrDocumentId != "string" && patchOrDocumentId instanceof ObservablePatch)
      return this._add({ patch: patchOrDocumentId.serialize() });
    if (isBuilder) {
      const patch = patchOps(new ObservablePatch(patchOrDocumentId, {}, this.#client));
      if (!(patch instanceof ObservablePatch))
        throw new Error("function passed to `patch()` must return the patch");
      return this._add({ patch: patch.serialize() });
    }
    return this._add({ patch: { id: patchOrDocumentId, ...patchOps } });
  }
}
const projectHeader = "X-Sanity-Project-ID";
function requestOptions(config2, overrides = {}) {
  const headers = {};
  config2.headers && Object.assign(headers, config2.headers);
  const token = overrides.token || config2.token;
  token && (headers.Authorization = `Bearer ${token}`), !overrides.useGlobalApi && !config2.useProjectHostname && config2.projectId && (headers[projectHeader] = config2.projectId);
  const withCredentials = !!(typeof overrides.withCredentials > "u" ? config2.withCredentials : overrides.withCredentials), timeout = typeof overrides.timeout > "u" ? config2.timeout : overrides.timeout;
  return Object.assign({}, overrides, {
    headers: Object.assign({}, headers, overrides.headers || {}),
    timeout: typeof timeout > "u" ? 5 * 60 * 1e3 : timeout,
    proxy: overrides.proxy || config2.proxy,
    json: true,
    withCredentials,
    fetch: typeof overrides.fetch == "object" && typeof config2.fetch == "object" ? { ...config2.fetch, ...overrides.fetch } : overrides.fetch || config2.fetch
  });
}
const encodeQueryString = ({
  query,
  params = {},
  options = {}
}) => {
  const searchParams = new URLSearchParams(), { tag, includeMutations, returnQuery, ...opts } = options;
  tag && searchParams.append("tag", tag), searchParams.append("query", query);
  for (const [key, value] of Object.entries(params))
    value !== void 0 && searchParams.append(`$${key}`, JSON.stringify(value));
  for (const [key, value] of Object.entries(opts))
    value && searchParams.append(key, `${value}`);
  return returnQuery === false && searchParams.append("returnQuery", "false"), includeMutations === false && searchParams.append("includeMutations", "false"), `?${searchParams}`;
}, excludeFalsey = (param, defValue) => param === false ? void 0 : typeof param > "u" ? defValue : param, getMutationQuery = (options = {}) => ({
  dryRun: options.dryRun,
  returnIds: true,
  returnDocuments: excludeFalsey(options.returnDocuments, true),
  visibility: options.visibility || "sync",
  autoGenerateArrayKeys: options.autoGenerateArrayKeys,
  skipCrossDatasetReferenceValidation: options.skipCrossDatasetReferenceValidation
}), isResponse = (event) => event.type === "response", getBody = (event) => event.body, indexBy = (docs, attr) => docs.reduce((indexed, doc) => (indexed[attr(doc)] = doc, indexed), /* @__PURE__ */ Object.create(null)), getQuerySizeLimit = 11264;
function _fetch(client, httpRequest, _stega, query, _params = {}, options = {}) {
  const stega = "stega" in options ? {
    ..._stega || {},
    ...typeof options.stega == "boolean" ? { enabled: options.stega } : options.stega || {}
  } : _stega, params = stega.enabled ? stegaClean(_params) : _params, mapResponse = options.filterResponse === false ? (res) => res : (res) => res.result, { cache, next, ...opts } = {
    // Opt out of setting a `signal` on an internal `fetch` if one isn't provided.
    // This is necessary in React Server Components to avoid opting out of Request Memoization.
    useAbortSignal: typeof options.signal < "u",
    // Set `resultSourceMap' when stega is enabled, as it's required for encoding.
    resultSourceMap: stega.enabled ? "withKeyArraySelector" : options.resultSourceMap,
    ...options,
    // Default to not returning the query, unless `filterResponse` is `false`,
    // or `returnQuery` is explicitly set. `true` is the default in Content Lake, so skip if truthy
    returnQuery: options.filterResponse === false && options.returnQuery !== false
  }, reqOpts = typeof cache < "u" || typeof next < "u" ? { ...opts, fetch: { cache, next } } : opts, $request = _dataRequest(client, httpRequest, "query", { query, params }, reqOpts);
  return stega.enabled ? $request.pipe(
    combineLatestWith(
      from(
        import("./assets/stegaEncodeSourceMap-CpgbwboV.js").then(function(n2) {
          return n2.stegaEncodeSourceMap$1;
        }).then(
          ({ stegaEncodeSourceMap }) => stegaEncodeSourceMap
        )
      )
    ),
    map(
      ([res, stegaEncodeSourceMap]) => {
        const result = stegaEncodeSourceMap(res.result, res.resultSourceMap, stega);
        return mapResponse({ ...res, result });
      }
    )
  ) : $request.pipe(map(mapResponse));
}
function _getDocument(client, httpRequest, id, opts = {}) {
  const docId = (() => {
    if (!opts.releaseId)
      return id;
    const versionId = getVersionFromId(id);
    if (!versionId) {
      if (isDraftId(id))
        throw new Error(
          `The document ID (\`${id}\`) is a draft, but \`options.releaseId\` is set as \`${opts.releaseId}\``
        );
      return getVersionId(id, opts.releaseId);
    }
    if (versionId !== opts.releaseId)
      throw new Error(
        `The document ID (\`${id}\`) is already a version of \`${versionId}\` release, but this does not match the provided \`options.releaseId\` (\`${opts.releaseId}\`)`
      );
    return id;
  })(), options = {
    uri: _getDataUrl(client, "doc", docId),
    json: true,
    tag: opts.tag,
    signal: opts.signal
  };
  return _requestObservable(client, httpRequest, options).pipe(
    filter(isResponse),
    map((event) => event.body.documents && event.body.documents[0])
  );
}
function _getDocuments(client, httpRequest, ids, opts = {}) {
  const options = {
    uri: _getDataUrl(client, "doc", ids.join(",")),
    json: true,
    tag: opts.tag,
    signal: opts.signal
  };
  return _requestObservable(client, httpRequest, options).pipe(
    filter(isResponse),
    map((event) => {
      const indexed = indexBy(event.body.documents || [], (doc) => doc._id);
      return ids.map((id) => indexed[id] || null);
    })
  );
}
function _getReleaseDocuments(client, httpRequest, releaseId, opts = {}) {
  return _dataRequest(
    client,
    httpRequest,
    "query",
    {
      query: "*[sanity::partOfRelease($releaseId)]",
      params: {
        releaseId
      }
    },
    opts
  );
}
function _createIfNotExists(client, httpRequest, doc, options) {
  return requireDocumentId("createIfNotExists", doc), _create(client, httpRequest, doc, "createIfNotExists", options);
}
function _createOrReplace(client, httpRequest, doc, options) {
  return requireDocumentId("createOrReplace", doc), _create(client, httpRequest, doc, "createOrReplace", options);
}
function _createVersion(client, httpRequest, doc, publishedId, options) {
  return requireDocumentId("createVersion", doc), requireDocumentType("createVersion", doc), _action(client, httpRequest, {
    actionType: "sanity.action.document.version.create",
    publishedId,
    document: doc
  }, options);
}
function _delete(client, httpRequest, selection, options) {
  return _dataRequest(
    client,
    httpRequest,
    "mutate",
    { mutations: [{ delete: getSelection(selection) }] },
    options
  );
}
function _discardVersion(client, httpRequest, versionId, purge = false, options) {
  return _action(client, httpRequest, {
    actionType: "sanity.action.document.version.discard",
    versionId,
    purge
  }, options);
}
function _replaceVersion(client, httpRequest, doc, options) {
  return requireDocumentId("replaceVersion", doc), requireDocumentType("replaceVersion", doc), _action(client, httpRequest, {
    actionType: "sanity.action.document.version.replace",
    document: doc
  }, options);
}
function _unpublishVersion(client, httpRequest, versionId, publishedId, options) {
  return _action(client, httpRequest, {
    actionType: "sanity.action.document.version.unpublish",
    versionId,
    publishedId
  }, options);
}
function _mutate(client, httpRequest, mutations, options) {
  let mut;
  mutations instanceof Patch || mutations instanceof ObservablePatch ? mut = { patch: mutations.serialize() } : mutations instanceof Transaction || mutations instanceof ObservableTransaction ? mut = mutations.serialize() : mut = mutations;
  const muts = Array.isArray(mut) ? mut : [mut], transactionId = options && options.transactionId || void 0;
  return _dataRequest(client, httpRequest, "mutate", { mutations: muts, transactionId }, options);
}
function _action(client, httpRequest, actions, options) {
  const acts = Array.isArray(actions) ? actions : [actions], transactionId = options && options.transactionId || void 0, skipCrossDatasetReferenceValidation = options && options.skipCrossDatasetReferenceValidation || void 0, dryRun = options && options.dryRun || void 0;
  return _dataRequest(
    client,
    httpRequest,
    "actions",
    { actions: acts, transactionId, skipCrossDatasetReferenceValidation, dryRun },
    options
  );
}
function _dataRequest(client, httpRequest, endpoint, body, options = {}) {
  const isMutation = endpoint === "mutate", isAction = endpoint === "actions", isQuery2 = endpoint === "query", strQuery = isMutation || isAction ? "" : encodeQueryString(body), useGet = !isMutation && !isAction && strQuery.length < getQuerySizeLimit, stringQuery = useGet ? strQuery : "", returnFirst = options.returnFirst, { timeout, token, tag, headers, returnQuery, lastLiveEventId, cacheMode } = options, uri = _getDataUrl(client, endpoint, stringQuery), reqOptions = {
    method: useGet ? "GET" : "POST",
    uri,
    json: true,
    body: useGet ? void 0 : body,
    query: isMutation && getMutationQuery(options),
    timeout,
    headers,
    token,
    tag,
    returnQuery,
    perspective: options.perspective,
    resultSourceMap: options.resultSourceMap,
    lastLiveEventId: Array.isArray(lastLiveEventId) ? lastLiveEventId[0] : lastLiveEventId,
    cacheMode,
    canUseCdn: isQuery2,
    signal: options.signal,
    fetch: options.fetch,
    useAbortSignal: options.useAbortSignal,
    useCdn: options.useCdn
  };
  return _requestObservable(client, httpRequest, reqOptions).pipe(
    filter(isResponse),
    map(getBody),
    map((res) => {
      if (!isMutation)
        return res;
      const results = res.results || [];
      if (options.returnDocuments)
        return returnFirst ? results[0] && results[0].document : results.map((mut) => mut.document);
      const key = returnFirst ? "documentId" : "documentIds", ids = returnFirst ? results[0] && results[0].id : results.map((mut) => mut.id);
      return {
        transactionId: res.transactionId,
        results,
        [key]: ids
      };
    })
  );
}
function _create(client, httpRequest, doc, op, options = {}) {
  const mutation = { [op]: doc }, opts = Object.assign({ returnFirst: true, returnDocuments: true }, options);
  return _dataRequest(client, httpRequest, "mutate", { mutations: [mutation] }, opts);
}
const hasDataConfig = (client) => client.config().dataset !== void 0 && client.config().projectId !== void 0 || client.config()["~experimental_resource"] !== void 0, isQuery = (client, uri) => hasDataConfig(client) && uri.startsWith(_getDataUrl(client, "query")), isMutate = (client, uri) => hasDataConfig(client) && uri.startsWith(_getDataUrl(client, "mutate")), isDoc = (client, uri) => hasDataConfig(client) && uri.startsWith(_getDataUrl(client, "doc", "")), isListener = (client, uri) => hasDataConfig(client) && uri.startsWith(_getDataUrl(client, "listen")), isHistory = (client, uri) => hasDataConfig(client) && uri.startsWith(_getDataUrl(client, "history", "")), isData = (client, uri) => uri.startsWith("/data/") || isQuery(client, uri) || isMutate(client, uri) || isDoc(client, uri) || isListener(client, uri) || isHistory(client, uri);
function _requestObservable(client, httpRequest, options) {
  const uri = options.url || options.uri, config2 = client.config(), canUseCdn = typeof options.canUseCdn > "u" ? ["GET", "HEAD"].indexOf(options.method || "GET") >= 0 && isData(client, uri) : options.canUseCdn;
  let useCdn = (options.useCdn ?? config2.useCdn) && canUseCdn;
  const tag = options.tag && config2.requestTagPrefix ? [config2.requestTagPrefix, options.tag].join(".") : options.tag || config2.requestTagPrefix;
  if (tag && options.tag !== null && (options.query = { tag: requestTag(tag), ...options.query }), ["GET", "HEAD", "POST"].indexOf(options.method || "GET") >= 0 && isQuery(client, uri)) {
    const resultSourceMap = options.resultSourceMap ?? config2.resultSourceMap;
    resultSourceMap !== void 0 && resultSourceMap !== false && (options.query = { resultSourceMap, ...options.query });
    const perspectiveOption = options.perspective || config2.perspective;
    typeof perspectiveOption < "u" && (perspectiveOption === "previewDrafts" && printPreviewDraftsDeprecationWarning(), validateApiPerspective(perspectiveOption), options.query = {
      perspective: Array.isArray(perspectiveOption) ? perspectiveOption.join(",") : perspectiveOption,
      ...options.query
    }, (Array.isArray(perspectiveOption) && perspectiveOption.length > 0 || // previewDrafts was renamed to drafts, but keep for backwards compat
    perspectiveOption === "previewDrafts" || perspectiveOption === "drafts") && useCdn && (useCdn = false, printCdnPreviewDraftsWarning())), options.lastLiveEventId && (options.query = { ...options.query, lastLiveEventId: options.lastLiveEventId }), options.returnQuery === false && (options.query = { returnQuery: "false", ...options.query }), useCdn && options.cacheMode == "noStale" && (options.query = { cacheMode: "noStale", ...options.query });
  }
  const reqOptions = requestOptions(
    config2,
    Object.assign({}, options, {
      url: _getUrl(client, uri, useCdn)
    })
  ), request = new Observable(
    (subscriber) => httpRequest(reqOptions, config2.requester).subscribe(subscriber)
  );
  return options.signal ? request.pipe(_withAbortSignal(options.signal)) : request;
}
function _request(client, httpRequest, options) {
  return _requestObservable(client, httpRequest, options).pipe(
    filter((event) => event.type === "response"),
    map((event) => event.body)
  );
}
function _getDataUrl(client, operation, path) {
  const config2 = client.config();
  if (config2["~experimental_resource"]) {
    resourceConfig(config2);
    const resourceBase = resourceDataBase(config2), uri2 = path !== void 0 ? `${operation}/${path}` : operation;
    return `${resourceBase}/${uri2}`.replace(/\/($|\?)/, "$1");
  }
  const catalog = hasDataset(config2), baseUri = `/${operation}/${catalog}`;
  return `/data${path !== void 0 ? `${baseUri}/${path}` : baseUri}`.replace(/\/($|\?)/, "$1");
}
function _getUrl(client, uri, canUseCdn = false) {
  const { url, cdnUrl } = client.config();
  return `${canUseCdn ? cdnUrl : url}/${uri.replace(/^\//, "")}`;
}
function _withAbortSignal(signal) {
  return (input) => new Observable((observer) => {
    const abort = () => observer.error(_createAbortError(signal));
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const subscription = input.subscribe(observer);
    return signal.addEventListener("abort", abort), () => {
      signal.removeEventListener("abort", abort), subscription.unsubscribe();
    };
  });
}
const isDomExceptionSupported = !!globalThis.DOMException;
function _createAbortError(signal) {
  if (isDomExceptionSupported)
    return new DOMException(signal?.reason ?? "The operation was aborted.", "AbortError");
  const error = new Error(signal?.reason ?? "The operation was aborted.");
  return error.name = "AbortError", error;
}
const resourceDataBase = (config2) => {
  if (!config2["~experimental_resource"])
    throw new Error("`resource` must be provided to perform resource queries");
  const { type, id } = config2["~experimental_resource"];
  switch (type) {
    case "dataset": {
      const segments = id.split(".");
      if (segments.length !== 2)
        throw new Error('Dataset ID must be in the format "project.dataset"');
      return `/projects/${segments[0]}/datasets/${segments[1]}`;
    }
    case "canvas":
      return `/canvases/${id}`;
    case "media-library":
      return `/media-libraries/${id}`;
    case "dashboard":
      return `/dashboards/${id}`;
    default:
      throw new Error(`Unsupported resource type: ${type.toString()}`);
  }
};
function _generate(client, httpRequest, request) {
  const dataset2 = hasDataset(client.config());
  return _request(client, httpRequest, {
    method: "POST",
    uri: `/agent/action/generate/${dataset2}`,
    body: request
  });
}
function _patch(client, httpRequest, request) {
  const dataset2 = hasDataset(client.config());
  return _request(client, httpRequest, {
    method: "POST",
    uri: `/agent/action/patch/${dataset2}`,
    body: request
  });
}
function _prompt(client, httpRequest, request) {
  const dataset2 = hasDataset(client.config());
  return _request(client, httpRequest, {
    method: "POST",
    uri: `/agent/action/prompt/${dataset2}`,
    body: request
  });
}
function _transform(client, httpRequest, request) {
  const dataset2 = hasDataset(client.config());
  return _request(client, httpRequest, {
    method: "POST",
    uri: `/agent/action/transform/${dataset2}`,
    body: request
  });
}
function _translate(client, httpRequest, request) {
  const dataset2 = hasDataset(client.config());
  return _request(client, httpRequest, {
    method: "POST",
    uri: `/agent/action/translate/${dataset2}`,
    body: request
  });
}
class ObservableAgentsActionClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  /**
   * Run an instruction to generate content in a target document.
   * @param request - instruction request
   */
  generate(request) {
    return _generate(this.#client, this.#httpRequest, request);
  }
  /**
   * Transform a target document based on a source.
   * @param request - translation request
   */
  transform(request) {
    return _transform(this.#client, this.#httpRequest, request);
  }
  /**
   * Translate a target document based on a source.
   * @param request - translation request
   */
  translate(request) {
    return _translate(this.#client, this.#httpRequest, request);
  }
}
class AgentActionsClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  /**
   * Run an instruction to generate content in a target document.
   * @param request - instruction request
   */
  generate(request) {
    return lastValueFrom(_generate(this.#client, this.#httpRequest, request));
  }
  /**
   * Transform a target document based on a source.
   * @param request - translation request
   */
  transform(request) {
    return lastValueFrom(_transform(this.#client, this.#httpRequest, request));
  }
  /**
   * Translate a target document based on a source.
   * @param request - translation request
   */
  translate(request) {
    return lastValueFrom(_translate(this.#client, this.#httpRequest, request));
  }
  /**
   * Run a raw instruction and return the result either as text or json
   * @param request - prompt request
   */
  prompt(request) {
    return lastValueFrom(_prompt(this.#client, this.#httpRequest, request));
  }
  /**
   * Patch a document using a schema aware API.
   * Does not use an LLM, but uses the schema to ensure paths and values matches the schema.
   * @param request - instruction request
   */
  patch(request) {
    return lastValueFrom(_patch(this.#client, this.#httpRequest, request));
  }
}
class ObservableAssetsClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  upload(assetType, body, options) {
    return _upload(this.#client, this.#httpRequest, assetType, body, options);
  }
}
class AssetsClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  upload(assetType, body, options) {
    const observable2 = _upload(this.#client, this.#httpRequest, assetType, body, options);
    return lastValueFrom(
      observable2.pipe(
        filter((event) => event.type === "response"),
        map(
          (event) => event.body.document
        )
      )
    );
  }
}
function _upload(client, httpRequest, assetType, body, opts = {}) {
  validateAssetType(assetType);
  let meta = opts.extract || void 0;
  meta && !meta.length && (meta = ["none"]);
  const config2 = client.config(), options = optionsFromFile(opts, body), { tag, label, title, description, creditLine, filename, source } = options, query = {
    label,
    title,
    description,
    filename,
    meta,
    creditLine
  };
  return source && (query.sourceId = source.id, query.sourceName = source.name, query.sourceUrl = source.url), _requestObservable(client, httpRequest, {
    tag,
    method: "POST",
    timeout: options.timeout || 0,
    uri: buildAssetUploadUrl(config2, assetType),
    headers: options.contentType ? { "Content-Type": options.contentType } : {},
    query,
    body
  });
}
function buildAssetUploadUrl(config2, assetType) {
  const assetTypeEndpoint = assetType === "image" ? "images" : "files";
  if (config2["~experimental_resource"]) {
    const { type, id } = config2["~experimental_resource"];
    switch (type) {
      case "dataset":
        throw new Error(
          "Assets are not supported for dataset resources, yet. Configure the client with `{projectId: <projectId>, dataset: <datasetId>}` instead."
        );
      case "canvas":
        return `/canvases/${id}/assets/${assetTypeEndpoint}`;
      case "media-library":
        return `/media-libraries/${id}/upload`;
      case "dashboard":
        return `/dashboards/${id}/assets/${assetTypeEndpoint}`;
      default:
        throw new Error(`Unsupported resource type: ${type.toString()}`);
    }
  }
  const dataset2 = hasDataset(config2);
  return `assets/${assetTypeEndpoint}/${dataset2}`;
}
function optionsFromFile(opts, file) {
  return typeof File > "u" || !(file instanceof File) ? opts : Object.assign(
    {
      filename: opts.preserveFilename === false ? void 0 : file.name,
      contentType: file.type
    },
    opts
  );
}
var defaults = (obj, defaults2) => Object.keys(defaults2).concat(Object.keys(obj)).reduce((target, prop) => (target[prop] = typeof obj[prop] > "u" ? defaults2[prop] : obj[prop], target), {});
const pick = (obj, props) => props.reduce((selection, prop) => (typeof obj[prop] > "u" || (selection[prop] = obj[prop]), selection), {}), eventSourcePolyfill = defer(() => import("./assets/node-CtsxRpIY.js").then((n2) => n2.n)).pipe(
  map(({ default: EventSource2 }) => EventSource2),
  shareReplay(1)
);
function reconnectOnConnectionFailure() {
  return function(source) {
    return source.pipe(
      catchError((err, caught) => err instanceof ConnectionFailedError ? concat(of({ type: "reconnect" }), timer(1e3).pipe(mergeMap(() => caught))) : throwError(() => err))
    );
  };
}
const MAX_URL_LENGTH = 14800, possibleOptions = [
  "includePreviousRevision",
  "includeResult",
  "includeMutations",
  "includeAllVersions",
  "visibility",
  "effectFormat",
  "tag"
], defaultOptions = {
  includeResult: true
};
function _listen(query, params, opts = {}) {
  const { url, token, withCredentials, requestTagPrefix, headers: configHeaders } = this.config(), tag = opts.tag && requestTagPrefix ? [requestTagPrefix, opts.tag].join(".") : opts.tag, options = { ...defaults(opts, defaultOptions), tag }, listenOpts = pick(options, possibleOptions), qs = encodeQueryString({ query, params, options: { tag, ...listenOpts } }), uri = `${url}${_getDataUrl(this, "listen", qs)}`;
  if (uri.length > MAX_URL_LENGTH)
    return throwError(() => new Error("Query too large for listener"));
  const listenFor = options.events ? options.events : ["mutation"], esOptions = {};
  return withCredentials && (esOptions.withCredentials = true), (token || configHeaders) && (esOptions.headers = {}, token && (esOptions.headers.Authorization = `Bearer ${token}`), configHeaders && Object.assign(esOptions.headers, configHeaders)), connectEventSource(() => (
    // use polyfill if there is no global EventSource or if we need to set headers
    (typeof EventSource > "u" || esOptions.headers ? eventSourcePolyfill : of(EventSource)).pipe(map((EventSource2) => new EventSource2(uri, esOptions)))
  ), listenFor).pipe(
    reconnectOnConnectionFailure(),
    filter((event) => listenFor.includes(event.type)),
    map(
      (event) => ({
        type: event.type,
        ..."data" in event ? event.data : {}
      })
    )
  );
}
function shareReplayLatest(configOrPredicate, config2) {
  return _shareReplayLatest(
    typeof configOrPredicate == "function" ? { predicate: configOrPredicate, ...config2 } : configOrPredicate
  );
}
function _shareReplayLatest(config2) {
  return (source) => {
    let latest, emitted = false;
    const { predicate, ...shareConfig } = config2, wrapped = source.pipe(
      tap((value) => {
        config2.predicate(value) && (emitted = true, latest = value);
      }),
      finalize(() => {
        emitted = false, latest = void 0;
      }),
      share(shareConfig)
    ), emitLatest = new Observable((subscriber) => {
      emitted && subscriber.next(
        // this cast is safe because of the emitted check which asserts that we got T from the source
        latest
      ), subscriber.complete();
    });
    return merge(wrapped, emitLatest);
  };
}
const requiredApiVersion = "2021-03-25";
class LiveClient {
  #client;
  constructor(client) {
    this.#client = client;
  }
  /**
   * Requires `apiVersion` to be `2021-03-25` or later.
   */
  events({
    includeDrafts = false,
    tag: _tag
  } = {}) {
    resourceGuard("live", this.#client.config());
    const {
      projectId: projectId2,
      apiVersion: _apiVersion,
      token,
      withCredentials,
      requestTagPrefix,
      headers: configHeaders
    } = this.#client.config(), apiVersion = _apiVersion.replace(/^v/, "");
    if (apiVersion !== "X" && apiVersion < requiredApiVersion)
      throw new Error(
        `The live events API requires API version ${requiredApiVersion} or later. The current API version is ${apiVersion}. Please update your API version to use this feature.`
      );
    if (includeDrafts && !token && !withCredentials)
      throw new Error(
        "The live events API requires a token or withCredentials when 'includeDrafts: true'. Please update your client configuration. The token should have the lowest possible access role."
      );
    const path = _getDataUrl(this.#client, "live/events"), url = new URL(this.#client.getUrl(path, false)), tag = _tag && requestTagPrefix ? [requestTagPrefix, _tag].join(".") : _tag;
    tag && url.searchParams.set("tag", tag), includeDrafts && url.searchParams.set("includeDrafts", "true");
    const esOptions = {};
    includeDrafts && withCredentials && (esOptions.withCredentials = true), (includeDrafts && token || configHeaders) && (esOptions.headers = {}, includeDrafts && token && (esOptions.headers.Authorization = `Bearer ${token}`), configHeaders && Object.assign(esOptions.headers, configHeaders));
    const key = `${url.href}::${JSON.stringify(esOptions)}`, existing = eventsCache.get(key);
    if (existing)
      return existing;
    const events = connectEventSource(() => (
      // use polyfill if there is no global EventSource or if we need to set headers
      (typeof EventSource > "u" || esOptions.headers ? eventSourcePolyfill : of(EventSource)).pipe(map((EventSource2) => new EventSource2(url.href, esOptions)))
    ), [
      "message",
      "restart",
      "welcome",
      "reconnect",
      "goaway"
    ]).pipe(
      reconnectOnConnectionFailure(),
      map((event) => {
        if (event.type === "message") {
          const { data, ...rest } = event;
          return { ...rest, tags: data.tags };
        }
        return event;
      })
    ), checkCors = fetchObservable(url, {
      method: "OPTIONS",
      mode: "cors",
      credentials: esOptions.withCredentials ? "include" : "omit",
      headers: esOptions.headers
    }).pipe(
      mergeMap(() => EMPTY),
      catchError(() => {
        throw new CorsOriginError({ projectId: projectId2 });
      })
    ), observable2 = concat(checkCors, events).pipe(
      finalize(() => eventsCache.delete(key)),
      shareReplayLatest({
        predicate: (event) => event.type === "welcome"
      })
    );
    return eventsCache.set(key, observable2), observable2;
  }
}
function fetchObservable(url, init) {
  return new Observable((observer) => {
    const controller = new AbortController(), signal = controller.signal;
    return fetch(url, { ...init, signal: controller.signal }).then(
      (response) => {
        observer.next(response), observer.complete();
      },
      (err) => {
        signal.aborted || observer.error(err);
      }
    ), () => controller.abort();
  });
}
const eventsCache = /* @__PURE__ */ new Map();
class ObservableDatasetsClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  /**
   * Create a new dataset with the given name
   *
   * @param name - Name of the dataset to create
   * @param options - Options for the dataset
   */
  create(name, options) {
    return _modify(this.#client, this.#httpRequest, "PUT", name, options);
  }
  /**
   * Edit a dataset with the given name
   *
   * @param name - Name of the dataset to edit
   * @param options - New options for the dataset
   */
  edit(name, options) {
    return _modify(this.#client, this.#httpRequest, "PATCH", name, options);
  }
  /**
   * Delete a dataset with the given name
   *
   * @param name - Name of the dataset to delete
   */
  delete(name) {
    return _modify(this.#client, this.#httpRequest, "DELETE", name);
  }
  /**
   * Fetch a list of datasets for the configured project
   */
  list() {
    return _request(this.#client, this.#httpRequest, {
      uri: "/datasets",
      tag: null
    });
  }
}
class DatasetsClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  /**
   * Create a new dataset with the given name
   *
   * @param name - Name of the dataset to create
   * @param options - Options for the dataset
   */
  create(name, options) {
    return resourceGuard("dataset", this.#client.config()), lastValueFrom(
      _modify(this.#client, this.#httpRequest, "PUT", name, options)
    );
  }
  /**
   * Edit a dataset with the given name
   *
   * @param name - Name of the dataset to edit
   * @param options - New options for the dataset
   */
  edit(name, options) {
    return resourceGuard("dataset", this.#client.config()), lastValueFrom(
      _modify(this.#client, this.#httpRequest, "PATCH", name, options)
    );
  }
  /**
   * Delete a dataset with the given name
   *
   * @param name - Name of the dataset to delete
   */
  delete(name) {
    return resourceGuard("dataset", this.#client.config()), lastValueFrom(_modify(this.#client, this.#httpRequest, "DELETE", name));
  }
  /**
   * Fetch a list of datasets for the configured project
   */
  list() {
    return resourceGuard("dataset", this.#client.config()), lastValueFrom(
      _request(this.#client, this.#httpRequest, { uri: "/datasets", tag: null })
    );
  }
}
function _modify(client, httpRequest, method, name, options) {
  return resourceGuard("dataset", client.config()), dataset(name), _request(client, httpRequest, {
    method,
    uri: `/datasets/${name}`,
    body: options,
    tag: null
  });
}
class ObservableProjectsClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  list(options) {
    resourceGuard("projects", this.#client.config());
    const uri = options?.includeMembers === false ? "/projects?includeMembers=false" : "/projects";
    return _request(this.#client, this.#httpRequest, { uri });
  }
  /**
   * Fetch a project by project ID
   *
   * @param projectId - ID of the project to fetch
   */
  getById(projectId2) {
    return resourceGuard("projects", this.#client.config()), _request(this.#client, this.#httpRequest, { uri: `/projects/${projectId2}` });
  }
}
class ProjectsClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  list(options) {
    resourceGuard("projects", this.#client.config());
    const uri = options?.includeMembers === false ? "/projects?includeMembers=false" : "/projects";
    return lastValueFrom(_request(this.#client, this.#httpRequest, { uri }));
  }
  /**
   * Fetch a project by project ID
   *
   * @param projectId - ID of the project to fetch
   */
  getById(projectId2) {
    return resourceGuard("projects", this.#client.config()), lastValueFrom(
      _request(this.#client, this.#httpRequest, { uri: `/projects/${projectId2}` })
    );
  }
}
const generateReleaseId = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  8
), getDocumentVersionId = (publishedId, releaseId) => releaseId ? getVersionId(publishedId, releaseId) : getDraftId(publishedId);
function deriveDocumentVersionId(op, {
  releaseId,
  publishedId,
  document: document2
}) {
  if (publishedId && document2._id) {
    const versionId = getDocumentVersionId(publishedId, releaseId);
    return validateVersionIdMatch(versionId, document2), versionId;
  }
  if (document2._id) {
    const isDraft = isDraftId(document2._id), isVersion = isVersionId(document2._id);
    if (!isDraft && !isVersion)
      throw new Error(
        `\`${op}()\` requires a document with an \`_id\` that is a version or draft ID`
      );
    if (releaseId) {
      if (isDraft)
        throw new Error(
          `\`${op}()\` was called with a document ID (\`${document2._id}\`) that is a draft ID, but a release ID (\`${releaseId}\`) was also provided.`
        );
      const builtVersionId = getVersionFromId(document2._id);
      if (builtVersionId !== releaseId)
        throw new Error(
          `\`${op}()\` was called with a document ID (\`${document2._id}\`) that is a version ID, but the release ID (\`${releaseId}\`) does not match the document's version ID (\`${builtVersionId}\`).`
        );
    }
    return document2._id;
  }
  if (publishedId)
    return getDocumentVersionId(publishedId, releaseId);
  throw new Error(`\`${op}()\` requires either a publishedId or a document with an \`_id\``);
}
const getArgs = (releaseOrOptions, maybeOptions) => {
  if (typeof releaseOrOptions == "object" && releaseOrOptions !== null && ("releaseId" in releaseOrOptions || "metadata" in releaseOrOptions)) {
    const { releaseId = generateReleaseId(), metadata = {} } = releaseOrOptions;
    return [releaseId, metadata, maybeOptions];
  }
  return [generateReleaseId(), {}, releaseOrOptions];
}, createRelease = (releaseOrOptions, maybeOptions) => {
  const [releaseId, metadata, options] = getArgs(releaseOrOptions, maybeOptions), finalMetadata = {
    ...metadata,
    releaseType: metadata.releaseType || "undecided"
  };
  return { action: {
    actionType: "sanity.action.release.create",
    releaseId,
    metadata: finalMetadata
  }, options };
};
class ObservableReleasesClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  /**
   * @public
   *
   * Retrieve a release by id.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to retrieve.
   * @param options - Additional query options including abort signal and query tag.
   * @returns An observable that resolves to the release document {@link ReleaseDocument}.
   *
   * @example Retrieving a release by id
   * ```ts
   * client.observable.releases.get({releaseId: 'my-release'}).pipe(
   *   tap((release) => console.log(release)),
   *   // {
   *   //   _id: '_.releases.my-release',
   *   //   name: 'my-release'
   *   //   _type: 'system.release',
   *   //   metadata: {releaseType: 'asap'},
   *   //   _createdAt: '2021-01-01T00:00:00.000Z',
   *   //   ...
   *   // }
   * ).subscribe()
   * ```
   */
  get({ releaseId }, options) {
    return _getDocument(
      this.#client,
      this.#httpRequest,
      `_.releases.${releaseId}`,
      options
    );
  }
  create(releaseOrOptions, maybeOptions) {
    const { action, options } = createRelease(releaseOrOptions, maybeOptions), { releaseId, metadata } = action;
    return _action(this.#client, this.#httpRequest, action, options).pipe(
      map((actionResult) => ({
        ...actionResult,
        releaseId,
        metadata
      }))
    );
  }
  /**
   * @public
   *
   * Edits an existing release, updating the metadata.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to edit.
   *   - `patch` - The patch operation to apply on the release metadata {@link PatchMutationOperation}.
   * @param options - Additional action options.
   * @returns An observable that resolves to the `transactionId`.
   */
  edit({ releaseId, patch }, options) {
    const editAction = {
      actionType: "sanity.action.release.edit",
      releaseId,
      patch
    };
    return _action(this.#client, this.#httpRequest, editAction, options);
  }
  /**
   * @public
   *
   * Publishes all documents in a release at once. For larger releases the effect of the publish
   * will be visible immediately when querying but the removal of the `versions.<releasesId>.*`
   * documents and creation of the corresponding published documents with the new content may
   * take some time.
   *
   * During this period both the source and target documents are locked and cannot be
   * modified through any other means.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to publish.
   * @param options - Additional action options.
   * @returns An observable that resolves to the `transactionId`.
   */
  publish({ releaseId }, options) {
    const publishAction = {
      actionType: "sanity.action.release.publish",
      releaseId
    };
    return _action(this.#client, this.#httpRequest, publishAction, options);
  }
  /**
   * @public
   *
   * An archive action removes an active release. The documents that comprise the release
   * are deleted and therefore no longer queryable.
   *
   * While the documents remain in retention the last version can still be accessed using document history endpoint.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to archive.
   * @param options - Additional action options.
   * @returns An observable that resolves to the `transactionId`.
   */
  archive({ releaseId }, options) {
    const archiveAction = {
      actionType: "sanity.action.release.archive",
      releaseId
    };
    return _action(this.#client, this.#httpRequest, archiveAction, options);
  }
  /**
   * @public
   *
   * An unarchive action restores an archived release and all documents
   * with the content they had just prior to archiving.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to unarchive.
   * @param options - Additional action options.
   * @returns An observable that resolves to the `transactionId`.
   */
  unarchive({ releaseId }, options) {
    const unarchiveAction = {
      actionType: "sanity.action.release.unarchive",
      releaseId
    };
    return _action(this.#client, this.#httpRequest, unarchiveAction, options);
  }
  /**
   * @public
   *
   * A schedule action queues a release for publishing at the given future time.
   * The release is locked such that no documents in the release can be modified and
   * no documents that it references can be deleted as this would make the publish fail.
   * At the given time, the same logic as for the publish action is triggered.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to schedule.
   *   - `publishAt` - The serialised date and time to publish the release. If the `publishAt` is in the past, the release will be published immediately.
   * @param options - Additional action options.
   * @returns An observable that resolves to the `transactionId`.
   */
  schedule({ releaseId, publishAt }, options) {
    const scheduleAction = {
      actionType: "sanity.action.release.schedule",
      releaseId,
      publishAt
    };
    return _action(this.#client, this.#httpRequest, scheduleAction, options);
  }
  /**
   * @public
   *
   * An unschedule action stops a release from being published.
   * The documents in the release are considered unlocked and can be edited again.
   * This may fail if another release is scheduled to be published after this one and
   * has a reference to a document created by this one.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to unschedule.
   * @param options - Additional action options.
   * @returns An observable that resolves to the `transactionId`.
   */
  unschedule({ releaseId }, options) {
    const unscheduleAction = {
      actionType: "sanity.action.release.unschedule",
      releaseId
    };
    return _action(this.#client, this.#httpRequest, unscheduleAction, options);
  }
  /**
   * @public
   *
   * A delete action removes a published or archived release.
   * The backing system document will be removed from the dataset.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to delete.
   * @param options - Additional action options.
   * @returns An observable that resolves to the `transactionId`.
   */
  delete({ releaseId }, options) {
    const deleteAction = {
      actionType: "sanity.action.release.delete",
      releaseId
    };
    return _action(this.#client, this.#httpRequest, deleteAction, options);
  }
  /**
   * @public
   *
   * Fetch the documents in a release by release id.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to fetch documents for.
   * @param options - Additional mutation options {@link BaseMutationOptions}.
   * @returns An observable that resolves to the documents in the release.
   */
  fetchDocuments({ releaseId }, options) {
    return _getReleaseDocuments(this.#client, this.#httpRequest, releaseId, options);
  }
}
class ReleasesClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  /**
   * @public
   *
   * Retrieve a release by id.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to retrieve.
   * @param options - Additional query options including abort signal and query tag.
   * @returns A promise that resolves to the release document {@link ReleaseDocument}.
   *
   * @example Retrieving a release by id
   * ```ts
   * const release = await client.releases.get({releaseId: 'my-release'})
   * console.log(release)
   * // {
   * //   _id: '_.releases.my-release',
   * //   name: 'my-release'
   * //   _type: 'system.release',
   * //   metadata: {releaseType: 'asap'},
   * //   _createdAt: '2021-01-01T00:00:00.000Z',
   * //   ...
   * // }
   * ```
   */
  get({ releaseId }, options) {
    return lastValueFrom(
      _getDocument(
        this.#client,
        this.#httpRequest,
        `_.releases.${releaseId}`,
        options
      )
    );
  }
  async create(releaseOrOptions, maybeOptions) {
    const { action, options } = createRelease(releaseOrOptions, maybeOptions), { releaseId, metadata } = action;
    return { ...await lastValueFrom(
      _action(this.#client, this.#httpRequest, action, options)
    ), releaseId, metadata };
  }
  /**
   * @public
   *
   * Edits an existing release, updating the metadata.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to edit.
   *   - `patch` - The patch operation to apply on the release metadata {@link PatchMutationOperation}.
   * @param options - Additional action options.
   * @returns A promise that resolves to the `transactionId`.
   */
  edit({ releaseId, patch }, options) {
    const editAction = {
      actionType: "sanity.action.release.edit",
      releaseId,
      patch
    };
    return lastValueFrom(_action(this.#client, this.#httpRequest, editAction, options));
  }
  /**
   * @public
   *
   * Publishes all documents in a release at once. For larger releases the effect of the publish
   * will be visible immediately when querying but the removal of the `versions.<releasesId>.*`
   * documents and creation of the corresponding published documents with the new content may
   * take some time.
   *
   * During this period both the source and target documents are locked and cannot be
   * modified through any other means.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to publish.
   * @param options - Additional action options.
   * @returns A promise that resolves to the `transactionId`.
   */
  publish({ releaseId }, options) {
    const publishAction = {
      actionType: "sanity.action.release.publish",
      releaseId
    };
    return lastValueFrom(_action(this.#client, this.#httpRequest, publishAction, options));
  }
  /**
   * @public
   *
   * An archive action removes an active release. The documents that comprise the release
   * are deleted and therefore no longer queryable.
   *
   * While the documents remain in retention the last version can still be accessed using document history endpoint.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to archive.
   * @param options - Additional action options.
   * @returns A promise that resolves to the `transactionId`.
   */
  archive({ releaseId }, options) {
    const archiveAction = {
      actionType: "sanity.action.release.archive",
      releaseId
    };
    return lastValueFrom(_action(this.#client, this.#httpRequest, archiveAction, options));
  }
  /**
   * @public
   *
   * An unarchive action restores an archived release and all documents
   * with the content they had just prior to archiving.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to unarchive.
   * @param options - Additional action options.
   * @returns A promise that resolves to the `transactionId`.
   */
  unarchive({ releaseId }, options) {
    const unarchiveAction = {
      actionType: "sanity.action.release.unarchive",
      releaseId
    };
    return lastValueFrom(_action(this.#client, this.#httpRequest, unarchiveAction, options));
  }
  /**
   * @public
   *
   * A schedule action queues a release for publishing at the given future time.
   * The release is locked such that no documents in the release can be modified and
   * no documents that it references can be deleted as this would make the publish fail.
   * At the given time, the same logic as for the publish action is triggered.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to schedule.
   *   - `publishAt` - The serialised date and time to publish the release. If the `publishAt` is in the past, the release will be published immediately.
   * @param options - Additional action options.
   * @returns A promise that resolves to the `transactionId`.
   */
  schedule({ releaseId, publishAt }, options) {
    const scheduleAction = {
      actionType: "sanity.action.release.schedule",
      releaseId,
      publishAt
    };
    return lastValueFrom(_action(this.#client, this.#httpRequest, scheduleAction, options));
  }
  /**
   * @public
   *
   * An unschedule action stops a release from being published.
   * The documents in the release are considered unlocked and can be edited again.
   * This may fail if another release is scheduled to be published after this one and
   * has a reference to a document created by this one.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to unschedule.
   * @param options - Additional action options.
   * @returns A promise that resolves to the `transactionId`.
   */
  unschedule({ releaseId }, options) {
    const unscheduleAction = {
      actionType: "sanity.action.release.unschedule",
      releaseId
    };
    return lastValueFrom(_action(this.#client, this.#httpRequest, unscheduleAction, options));
  }
  /**
   * @public
   *
   * A delete action removes a published or archived release.
   * The backing system document will be removed from the dataset.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to delete.
   * @param options - Additional action options.
   * @returns A promise that resolves to the `transactionId`.
   */
  delete({ releaseId }, options) {
    const deleteAction = {
      actionType: "sanity.action.release.delete",
      releaseId
    };
    return lastValueFrom(_action(this.#client, this.#httpRequest, deleteAction, options));
  }
  /**
   * @public
   *
   * Fetch the documents in a release by release id.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to fetch documents for.
   * @param options - Additional mutation options {@link BaseMutationOptions}.
   * @returns A promise that resolves to the documents in the release.
   */
  fetchDocuments({ releaseId }, options) {
    return lastValueFrom(_getReleaseDocuments(this.#client, this.#httpRequest, releaseId, options));
  }
}
class ObservableUsersClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  /**
   * Fetch a user by user ID
   *
   * @param id - User ID of the user to fetch. If `me` is provided, a minimal response including the users role is returned.
   */
  getById(id) {
    return _request(
      this.#client,
      this.#httpRequest,
      { uri: `/users/${id}` }
    );
  }
}
class UsersClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  /**
   * Fetch a user by user ID
   *
   * @param id - User ID of the user to fetch. If `me` is provided, a minimal response including the users role is returned.
   */
  getById(id) {
    return lastValueFrom(
      _request(this.#client, this.#httpRequest, {
        uri: `/users/${id}`
      })
    );
  }
}
class ObservableSanityClient {
  assets;
  datasets;
  live;
  projects;
  users;
  agent;
  releases;
  /**
   * Private properties
   */
  #clientConfig;
  #httpRequest;
  /**
   * Instance properties
   */
  listen = _listen;
  constructor(httpRequest, config2 = defaultConfig) {
    this.config(config2), this.#httpRequest = httpRequest, this.assets = new ObservableAssetsClient(this, this.#httpRequest), this.datasets = new ObservableDatasetsClient(this, this.#httpRequest), this.live = new LiveClient(this), this.projects = new ObservableProjectsClient(this, this.#httpRequest), this.users = new ObservableUsersClient(this, this.#httpRequest), this.agent = {
      action: new ObservableAgentsActionClient(this, this.#httpRequest)
    }, this.releases = new ObservableReleasesClient(this, this.#httpRequest);
  }
  /**
   * Clone the client - returns a new instance
   */
  clone() {
    return new ObservableSanityClient(this.#httpRequest, this.config());
  }
  config(newConfig) {
    if (newConfig === void 0)
      return { ...this.#clientConfig };
    if (this.#clientConfig && this.#clientConfig.allowReconfigure === false)
      throw new Error(
        "Existing client instance cannot be reconfigured - use `withConfig(newConfig)` to return a new client"
      );
    return this.#clientConfig = initConfig(newConfig, this.#clientConfig || {}), this;
  }
  /**
   * Clone the client with a new (partial) configuration.
   *
   * @param newConfig - New client configuration properties, shallowly merged with existing configuration
   */
  withConfig(newConfig) {
    const thisConfig = this.config();
    return new ObservableSanityClient(this.#httpRequest, {
      ...thisConfig,
      ...newConfig,
      stega: {
        ...thisConfig.stega || {},
        ...typeof newConfig?.stega == "boolean" ? { enabled: newConfig.stega } : newConfig?.stega || {}
      }
    });
  }
  fetch(query, params, options) {
    return _fetch(
      this,
      this.#httpRequest,
      this.#clientConfig.stega,
      query,
      params,
      options
    );
  }
  /**
   * Fetch a single document with the given ID.
   *
   * @param id - Document ID to fetch
   * @param options - Request options
   */
  getDocument(id, options) {
    return _getDocument(this, this.#httpRequest, id, options);
  }
  /**
   * Fetch multiple documents in one request.
   * Should be used sparingly - performing a query is usually a better option.
   * The order/position of documents is preserved based on the original array of IDs.
   * If any of the documents are missing, they will be replaced by a `null` entry in the returned array
   *
   * @param ids - Document IDs to fetch
   * @param options - Request options
   */
  getDocuments(ids, options) {
    return _getDocuments(this, this.#httpRequest, ids, options);
  }
  create(document2, options) {
    return _create(this, this.#httpRequest, document2, "create", options);
  }
  createIfNotExists(document2, options) {
    return _createIfNotExists(this, this.#httpRequest, document2, options);
  }
  createOrReplace(document2, options) {
    return _createOrReplace(this, this.#httpRequest, document2, options);
  }
  createVersion({
    document: document2,
    publishedId,
    releaseId
  }, options) {
    const documentVersionId = deriveDocumentVersionId("createVersion", {
      document: document2,
      publishedId,
      releaseId
    }), documentVersion = { ...document2, _id: documentVersionId }, versionPublishedId = publishedId || getPublishedId(document2._id);
    return _createVersion(
      this,
      this.#httpRequest,
      documentVersion,
      versionPublishedId,
      options
    );
  }
  delete(selection, options) {
    return _delete(this, this.#httpRequest, selection, options);
  }
  /**
   * @public
   *
   * Deletes the draft or release version of a document.
   *
   * @remarks
   * * Discarding a version with no `releaseId` will discard the draft version of the published document.
   * * If the draft or release version does not exist, any error will throw.
   *
   * @param params - Version action parameters:
   *   - `releaseId` - The ID of the release to discard the document from.
   *   - `publishedId` - The published ID of the document to discard.
   * @param purge - if `true` the document history is also discarded.
   * @param options - Additional action options.
   * @returns an observable that resolves to the `transactionId`.
   *
   * @example Discarding a release version of a document
   * ```ts
   * client.observable.discardVersion({publishedId: 'myDocument', releaseId: 'myRelease'})
   * // The document with the ID `versions.myRelease.myDocument` will be discarded.
   * ```
   *
   * @example Discarding a draft version of a document
   * ```ts
   * client.observable.discardVersion({publishedId: 'myDocument'})
   * // The document with the ID `drafts.myDocument` will be discarded.
   * ```
   */
  discardVersion({ releaseId, publishedId }, purge, options) {
    const documentVersionId = getDocumentVersionId(publishedId, releaseId);
    return _discardVersion(this, this.#httpRequest, documentVersionId, purge, options);
  }
  replaceVersion({
    document: document2,
    publishedId,
    releaseId
  }, options) {
    const documentVersionId = deriveDocumentVersionId("replaceVersion", {
      document: document2,
      publishedId,
      releaseId
    }), documentVersion = { ...document2, _id: documentVersionId };
    return _replaceVersion(this, this.#httpRequest, documentVersion, options);
  }
  /**
   * @public
   *
   * Used to indicate when a document within a release should be unpublished when
   * the release is run.
   *
   * @remarks
   * * If the published document does not exist, an error will be thrown.
   *
   * @param params - Version action parameters:
   *   - `releaseId` - The ID of the release to unpublish the document from.
   *   - `publishedId` - The published ID of the document to unpublish.
   * @param options - Additional action options.
   * @returns an observable that resolves to the `transactionId`.
   *
   * @example Unpublishing a release version of a published document
   * ```ts
   * client.observable.unpublishVersion({publishedId: 'myDocument', releaseId: 'myRelease'})
   * // The document with the ID `versions.myRelease.myDocument` will be unpublished. when `myRelease` is run.
   * ```
   */
  unpublishVersion({ releaseId, publishedId }, options) {
    const versionId = getVersionId(publishedId, releaseId);
    return _unpublishVersion(this, this.#httpRequest, versionId, publishedId, options);
  }
  mutate(operations, options) {
    return _mutate(this, this.#httpRequest, operations, options);
  }
  /**
   * Create a new buildable patch of operations to perform
   *
   * @param selection - Document ID, an array of document IDs, or an object with `query` and optional `params`, defining which document(s) to patch
   * @param operations - Optional object of patch operations to initialize the patch instance with
   * @returns Patch instance - call `.commit()` to perform the operations defined
   */
  patch(selection, operations) {
    return new ObservablePatch(selection, operations, this);
  }
  /**
   * Create a new transaction of mutations
   *
   * @param operations - Optional array of mutation operations to initialize the transaction instance with
   */
  transaction(operations) {
    return new ObservableTransaction(operations, this);
  }
  /**
   * Perform action operations against the configured dataset
   *
   * @param operations - Action operation(s) to execute
   * @param options - Action options
   */
  action(operations, options) {
    return _action(this, this.#httpRequest, operations, options);
  }
  /**
   * Perform an HTTP request against the Sanity API
   *
   * @param options - Request options
   */
  request(options) {
    return _request(this, this.#httpRequest, options);
  }
  /**
   * Get a Sanity API URL for the URI provided
   *
   * @param uri - URI/path to build URL for
   * @param canUseCdn - Whether or not to allow using the API CDN for this route
   */
  getUrl(uri, canUseCdn) {
    return _getUrl(this, uri, canUseCdn);
  }
  /**
   * Get a Sanity API URL for the data operation and path provided
   *
   * @param operation - Data operation (eg `query`, `mutate`, `listen` or similar)
   * @param path - Path to append after the operation
   */
  getDataUrl(operation, path) {
    return _getDataUrl(this, operation, path);
  }
}
class SanityClient {
  assets;
  datasets;
  live;
  projects;
  users;
  agent;
  releases;
  /**
   * Observable version of the Sanity client, with the same configuration as the promise-based one
   */
  observable;
  /**
   * Private properties
   */
  #clientConfig;
  #httpRequest;
  /**
   * Instance properties
   */
  listen = _listen;
  constructor(httpRequest, config2 = defaultConfig) {
    this.config(config2), this.#httpRequest = httpRequest, this.assets = new AssetsClient(this, this.#httpRequest), this.datasets = new DatasetsClient(this, this.#httpRequest), this.live = new LiveClient(this), this.projects = new ProjectsClient(this, this.#httpRequest), this.users = new UsersClient(this, this.#httpRequest), this.agent = {
      action: new AgentActionsClient(this, this.#httpRequest)
    }, this.releases = new ReleasesClient(this, this.#httpRequest), this.observable = new ObservableSanityClient(httpRequest, config2);
  }
  /**
   * Clone the client - returns a new instance
   */
  clone() {
    return new SanityClient(this.#httpRequest, this.config());
  }
  config(newConfig) {
    if (newConfig === void 0)
      return { ...this.#clientConfig };
    if (this.#clientConfig && this.#clientConfig.allowReconfigure === false)
      throw new Error(
        "Existing client instance cannot be reconfigured - use `withConfig(newConfig)` to return a new client"
      );
    return this.observable && this.observable.config(newConfig), this.#clientConfig = initConfig(newConfig, this.#clientConfig || {}), this;
  }
  /**
   * Clone the client with a new (partial) configuration.
   *
   * @param newConfig - New client configuration properties, shallowly merged with existing configuration
   */
  withConfig(newConfig) {
    const thisConfig = this.config();
    return new SanityClient(this.#httpRequest, {
      ...thisConfig,
      ...newConfig,
      stega: {
        ...thisConfig.stega || {},
        ...typeof newConfig?.stega == "boolean" ? { enabled: newConfig.stega } : newConfig?.stega || {}
      }
    });
  }
  fetch(query, params, options) {
    return lastValueFrom(
      _fetch(
        this,
        this.#httpRequest,
        this.#clientConfig.stega,
        query,
        params,
        options
      )
    );
  }
  /**
   * Fetch a single document with the given ID.
   *
   * @param id - Document ID to fetch
   * @param options - Request options
   */
  getDocument(id, options) {
    return lastValueFrom(_getDocument(this, this.#httpRequest, id, options));
  }
  /**
   * Fetch multiple documents in one request.
   * Should be used sparingly - performing a query is usually a better option.
   * The order/position of documents is preserved based on the original array of IDs.
   * If any of the documents are missing, they will be replaced by a `null` entry in the returned array
   *
   * @param ids - Document IDs to fetch
   * @param options - Request options
   */
  getDocuments(ids, options) {
    return lastValueFrom(_getDocuments(this, this.#httpRequest, ids, options));
  }
  create(document2, options) {
    return lastValueFrom(
      _create(this, this.#httpRequest, document2, "create", options)
    );
  }
  createIfNotExists(document2, options) {
    return lastValueFrom(
      _createIfNotExists(this, this.#httpRequest, document2, options)
    );
  }
  createOrReplace(document2, options) {
    return lastValueFrom(
      _createOrReplace(this, this.#httpRequest, document2, options)
    );
  }
  createVersion({
    document: document2,
    publishedId,
    releaseId
  }, options) {
    const documentVersionId = deriveDocumentVersionId("createVersion", {
      document: document2,
      publishedId,
      releaseId
    }), documentVersion = { ...document2, _id: documentVersionId }, versionPublishedId = publishedId || getPublishedId(document2._id);
    return firstValueFrom(
      _createVersion(
        this,
        this.#httpRequest,
        documentVersion,
        versionPublishedId,
        options
      )
    );
  }
  delete(selection, options) {
    return lastValueFrom(_delete(this, this.#httpRequest, selection, options));
  }
  /**
   * @public
   *
   * Deletes the draft or release version of a document.
   *
   * @remarks
   * * Discarding a version with no `releaseId` will discard the draft version of the published document.
   * * If the draft or release version does not exist, any error will throw.
   *
   * @param params - Version action parameters:
   *   - `releaseId` - The ID of the release to discard the document from.
   *   - `publishedId` - The published ID of the document to discard.
   * @param purge - if `true` the document history is also discarded.
   * @param options - Additional action options.
   * @returns a promise that resolves to the `transactionId`.
   *
   * @example Discarding a release version of a document
   * ```ts
   * client.discardVersion({publishedId: 'myDocument', releaseId: 'myRelease'})
   * // The document with the ID `versions.myRelease.myDocument` will be discarded.
   * ```
   *
   * @example Discarding a draft version of a document
   * ```ts
   * client.discardVersion({publishedId: 'myDocument'})
   * // The document with the ID `drafts.myDocument` will be discarded.
   * ```
   */
  discardVersion({ releaseId, publishedId }, purge, options) {
    const documentVersionId = getDocumentVersionId(publishedId, releaseId);
    return lastValueFrom(
      _discardVersion(this, this.#httpRequest, documentVersionId, purge, options)
    );
  }
  replaceVersion({
    document: document2,
    publishedId,
    releaseId
  }, options) {
    const documentVersionId = deriveDocumentVersionId("replaceVersion", {
      document: document2,
      publishedId,
      releaseId
    }), documentVersion = { ...document2, _id: documentVersionId };
    return firstValueFrom(
      _replaceVersion(this, this.#httpRequest, documentVersion, options)
    );
  }
  /**
   * @public
   *
   * Used to indicate when a document within a release should be unpublished when
   * the release is run.
   *
   * @remarks
   * * If the published document does not exist, an error will be thrown.
   *
   * @param params - Version action parameters:
   *   - `releaseId` - The ID of the release to unpublish the document from.
   *   - `publishedId` - The published ID of the document to unpublish.
   * @param options - Additional action options.
   * @returns a promise that resolves to the `transactionId`.
   *
   * @example Unpublishing a release version of a published document
   * ```ts
   * await client.unpublishVersion({publishedId: 'myDocument', releaseId: 'myRelease'})
   * // The document with the ID `versions.myRelease.myDocument` will be unpublished. when `myRelease` is run.
   * ```
   */
  unpublishVersion({ releaseId, publishedId }, options) {
    const versionId = getVersionId(publishedId, releaseId);
    return lastValueFrom(
      _unpublishVersion(this, this.#httpRequest, versionId, publishedId, options)
    );
  }
  mutate(operations, options) {
    return lastValueFrom(_mutate(this, this.#httpRequest, operations, options));
  }
  /**
   * Create a new buildable patch of operations to perform
   *
   * @param selection - Document ID, an array of document IDs, or an object with `query` and optional `params`, defining which document(s) to patch
   * @param operations - Optional object of patch operations to initialize the patch instance with
   * @returns Patch instance - call `.commit()` to perform the operations defined
   */
  patch(documentId, operations) {
    return new Patch(documentId, operations, this);
  }
  /**
   * Create a new transaction of mutations
   *
   * @param operations - Optional array of mutation operations to initialize the transaction instance with
   */
  transaction(operations) {
    return new Transaction(operations, this);
  }
  /**
   * Perform action operations against the configured dataset
   * Returns a promise that resolves to the transaction result
   *
   * @param operations - Action operation(s) to execute
   * @param options - Action options
   */
  action(operations, options) {
    return lastValueFrom(_action(this, this.#httpRequest, operations, options));
  }
  /**
   * Perform a request against the Sanity API
   * NOTE: Only use this for Sanity API endpoints, not for your own APIs!
   *
   * @param options - Request options
   * @returns Promise resolving to the response body
   */
  request(options) {
    return lastValueFrom(_request(this, this.#httpRequest, options));
  }
  /**
   * Perform an HTTP request a `/data` sub-endpoint
   * NOTE: Considered internal, thus marked as deprecated. Use `request` instead.
   *
   * @deprecated - Use `request()` or your own HTTP library instead
   * @param endpoint - Endpoint to hit (mutate, query etc)
   * @param body - Request body
   * @param options - Request options
   * @internal
   */
  dataRequest(endpoint, body, options) {
    return lastValueFrom(_dataRequest(this, this.#httpRequest, endpoint, body, options));
  }
  /**
   * Get a Sanity API URL for the URI provided
   *
   * @param uri - URI/path to build URL for
   * @param canUseCdn - Whether or not to allow using the API CDN for this route
   */
  getUrl(uri, canUseCdn) {
    return _getUrl(this, uri, canUseCdn);
  }
  /**
   * Get a Sanity API URL for the data operation and path provided
   *
   * @param operation - Data operation (eg `query`, `mutate`, `listen` or similar)
   * @param path - Path to append after the operation
   */
  getDataUrl(operation, path) {
    return _getDataUrl(this, operation, path);
  }
}
function defineCreateClientExports(envMiddleware2, ClassConstructor) {
  return { requester: defineHttpRequest(envMiddleware2), createClient: (config2) => {
    const clientRequester = defineHttpRequest(envMiddleware2);
    return new ClassConstructor(
      (options, requester2) => (requester2 || clientRequester)({
        maxRedirects: 0,
        maxRetries: config2.maxRetries,
        retryDelay: config2.retryDelay,
        ...options
      }),
      config2
    );
  } };
}
var envMiddleware = [];
const exp = defineCreateClientExports(envMiddleware, SanityClient), createClient = exp.createClient;
const handler = documentEventHandler(async ({ context, event }) => {
  const time = (/* @__PURE__ */ new Date()).toLocaleTimeString();
  console.log(`👋 Your Sanity Function was called at ${time}`);
  const shopifySlug = event.data?.store?.slug?.current;
  const sanitySlug = event.data?.slug?.current;
  console.log("slugs -> Shopify:", shopifySlug, " | Sanity:", sanitySlug);
  if (!event.data?.store?.slug?.current) {
    console.error("Shopify Slug not found");
    return;
  }
  if (shopifySlug === sanitySlug) {
    console.error("Shopify and Sanity slugs already match, the blueprint groq filter is not working properly");
    return;
  }
  createClient({
    ...context.clientOptions,
    apiVersion: "2025-05-08",
    useCdn: false
  }).patch(event.data._id, {
    set: {
      slug: {
        _type: "slug",
        current: event.data.store.slug.current
      }
    }
  }).commit().then((res) => {
    console.log("Sanity slug set to match Shopify", res);
  }).catch((err) => {
    console.error("Error setting Sanity slug", err);
  });
});
export {
  C,
  handler,
  isRecord as i
};
//# sourceMappingURL=index.js.map

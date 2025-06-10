import require$$0 from "url";
import require$$1 from "events";
import require$$2 from "https";
import require$$3 from "http";
import require$$4 from "util";
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var eventsource;
var hasRequiredEventsource;
function requireEventsource() {
  if (hasRequiredEventsource) return eventsource;
  hasRequiredEventsource = 1;
  var parse = require$$0.parse;
  var events = require$$1;
  var https = require$$2;
  var http = require$$3;
  var util = require$$4;
  var httpsOptions = [
    "pfx",
    "key",
    "passphrase",
    "cert",
    "ca",
    "ciphers",
    "rejectUnauthorized",
    "secureProtocol",
    "servername",
    "checkServerIdentity"
  ];
  var bom = [239, 187, 191];
  var colon = 58;
  var space = 32;
  var lineFeed = 10;
  var carriageReturn = 13;
  var maxBufferAheadAllocation = 1024 * 256;
  var reUnsafeHeader = /^(cookie|authorization)$/i;
  function hasBom(buf) {
    return bom.every(function(charCode, index) {
      return buf[index] === charCode;
    });
  }
  function EventSource(url, eventSourceInitDict) {
    var readyState = EventSource.CONNECTING;
    var headers = eventSourceInitDict && eventSourceInitDict.headers;
    var hasNewOrigin = false;
    Object.defineProperty(this, "readyState", {
      get: function() {
        return readyState;
      }
    });
    Object.defineProperty(this, "url", {
      get: function() {
        return url;
      }
    });
    var self = this;
    self.reconnectInterval = 1e3;
    self.connectionInProgress = false;
    function onConnectionClosed(message) {
      if (readyState === EventSource.CLOSED) return;
      readyState = EventSource.CONNECTING;
      _emit("error", new Event("error", { message }));
      if (reconnectUrl) {
        url = reconnectUrl;
        reconnectUrl = null;
        hasNewOrigin = false;
      }
      setTimeout(function() {
        if (readyState !== EventSource.CONNECTING || self.connectionInProgress) {
          return;
        }
        self.connectionInProgress = true;
        connect();
      }, self.reconnectInterval);
    }
    var req;
    var lastEventId = "";
    if (headers && headers["Last-Event-ID"]) {
      lastEventId = headers["Last-Event-ID"];
      delete headers["Last-Event-ID"];
    }
    var discardTrailingNewline = false;
    var data = "";
    var eventName = "";
    var reconnectUrl = null;
    function connect() {
      var options = parse(url);
      var isSecure = options.protocol === "https:";
      options.headers = { "Cache-Control": "no-cache", "Accept": "text/event-stream" };
      if (lastEventId) options.headers["Last-Event-ID"] = lastEventId;
      if (headers) {
        var reqHeaders = hasNewOrigin ? removeUnsafeHeaders(headers) : headers;
        for (var i in reqHeaders) {
          var header = reqHeaders[i];
          if (header) {
            options.headers[i] = header;
          }
        }
      }
      options.rejectUnauthorized = !(eventSourceInitDict && !eventSourceInitDict.rejectUnauthorized);
      if (eventSourceInitDict && eventSourceInitDict.createConnection !== void 0) {
        options.createConnection = eventSourceInitDict.createConnection;
      }
      var useProxy = eventSourceInitDict && eventSourceInitDict.proxy;
      if (useProxy) {
        var proxy = parse(eventSourceInitDict.proxy);
        isSecure = proxy.protocol === "https:";
        options.protocol = isSecure ? "https:" : "http:";
        options.path = url;
        options.headers.Host = options.host;
        options.hostname = proxy.hostname;
        options.host = proxy.host;
        options.port = proxy.port;
      }
      if (eventSourceInitDict && eventSourceInitDict.https) {
        for (var optName in eventSourceInitDict.https) {
          if (httpsOptions.indexOf(optName) === -1) {
            continue;
          }
          var option = eventSourceInitDict.https[optName];
          if (option !== void 0) {
            options[optName] = option;
          }
        }
      }
      if (eventSourceInitDict && eventSourceInitDict.withCredentials !== void 0) {
        options.withCredentials = eventSourceInitDict.withCredentials;
      }
      req = (isSecure ? https : http).request(options, function(res) {
        self.connectionInProgress = false;
        if (res.statusCode === 500 || res.statusCode === 502 || res.statusCode === 503 || res.statusCode === 504) {
          _emit("error", new Event("error", { status: res.statusCode, message: res.statusMessage }));
          onConnectionClosed();
          return;
        }
        if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307) {
          var location = res.headers.location;
          if (!location) {
            _emit("error", new Event("error", { status: res.statusCode, message: res.statusMessage }));
            return;
          }
          var prevOrigin = new URL(url).origin;
          var nextOrigin = new URL(location).origin;
          hasNewOrigin = prevOrigin !== nextOrigin;
          if (res.statusCode === 307) reconnectUrl = url;
          url = location;
          process.nextTick(connect);
          return;
        }
        if (res.statusCode !== 200) {
          _emit("error", new Event("error", { status: res.statusCode, message: res.statusMessage }));
          return self.close();
        }
        readyState = EventSource.OPEN;
        res.on("close", function() {
          res.removeAllListeners("close");
          res.removeAllListeners("end");
          onConnectionClosed();
        });
        res.on("end", function() {
          res.removeAllListeners("close");
          res.removeAllListeners("end");
          onConnectionClosed();
        });
        _emit("open", new Event("open"));
        var buf;
        var newBuffer;
        var startingPos = 0;
        var startingFieldLength = -1;
        var newBufferSize = 0;
        var bytesUsed = 0;
        res.on("data", function(chunk) {
          if (!buf) {
            buf = chunk;
            if (hasBom(buf)) {
              buf = buf.slice(bom.length);
            }
            bytesUsed = buf.length;
          } else {
            if (chunk.length > buf.length - bytesUsed) {
              newBufferSize = buf.length * 2 + chunk.length;
              if (newBufferSize > maxBufferAheadAllocation) {
                newBufferSize = buf.length + chunk.length + maxBufferAheadAllocation;
              }
              newBuffer = Buffer.alloc(newBufferSize);
              buf.copy(newBuffer, 0, 0, bytesUsed);
              buf = newBuffer;
            }
            chunk.copy(buf, bytesUsed);
            bytesUsed += chunk.length;
          }
          var pos = 0;
          var length = bytesUsed;
          while (pos < length) {
            if (discardTrailingNewline) {
              if (buf[pos] === lineFeed) {
                ++pos;
              }
              discardTrailingNewline = false;
            }
            var lineLength = -1;
            var fieldLength = startingFieldLength;
            var c;
            for (var i2 = startingPos; lineLength < 0 && i2 < length; ++i2) {
              c = buf[i2];
              if (c === colon) {
                if (fieldLength < 0) {
                  fieldLength = i2 - pos;
                }
              } else if (c === carriageReturn) {
                discardTrailingNewline = true;
                lineLength = i2 - pos;
              } else if (c === lineFeed) {
                lineLength = i2 - pos;
              }
            }
            if (lineLength < 0) {
              startingPos = length - pos;
              startingFieldLength = fieldLength;
              break;
            } else {
              startingPos = 0;
              startingFieldLength = -1;
            }
            parseEventStreamLine(buf, pos, fieldLength, lineLength);
            pos += lineLength + 1;
          }
          if (pos === length) {
            buf = void 0;
            bytesUsed = 0;
          } else if (pos > 0) {
            buf = buf.slice(pos, bytesUsed);
            bytesUsed = buf.length;
          }
        });
      });
      req.on("error", function(err) {
        self.connectionInProgress = false;
        onConnectionClosed(err.message);
      });
      if (req.setNoDelay) req.setNoDelay(true);
      req.end();
    }
    connect();
    function _emit() {
      if (self.listeners(arguments[0]).length > 0) {
        self.emit.apply(self, arguments);
      }
    }
    this._close = function() {
      if (readyState === EventSource.CLOSED) return;
      readyState = EventSource.CLOSED;
      if (req.abort) req.abort();
      if (req.xhr && req.xhr.abort) req.xhr.abort();
    };
    function parseEventStreamLine(buf, pos, fieldLength, lineLength) {
      if (lineLength === 0) {
        if (data.length > 0) {
          var type = eventName || "message";
          _emit(type, new MessageEvent(type, {
            data: data.slice(0, -1),
            // remove trailing newline
            lastEventId,
            origin: new URL(url).origin
          }));
          data = "";
        }
        eventName = void 0;
      } else if (fieldLength > 0) {
        var noValue = fieldLength < 0;
        var step = 0;
        var field = buf.slice(pos, pos + (noValue ? lineLength : fieldLength)).toString();
        if (noValue) {
          step = lineLength;
        } else if (buf[pos + fieldLength + 1] !== space) {
          step = fieldLength + 1;
        } else {
          step = fieldLength + 2;
        }
        pos += step;
        var valueLength = lineLength - step;
        var value = buf.slice(pos, pos + valueLength).toString();
        if (field === "data") {
          data += value + "\n";
        } else if (field === "event") {
          eventName = value;
        } else if (field === "id") {
          lastEventId = value;
        } else if (field === "retry") {
          var retry = parseInt(value, 10);
          if (!Number.isNaN(retry)) {
            self.reconnectInterval = retry;
          }
        }
      }
    }
  }
  eventsource = EventSource;
  util.inherits(EventSource, events.EventEmitter);
  EventSource.prototype.constructor = EventSource;
  ["open", "error", "message"].forEach(function(method) {
    Object.defineProperty(EventSource.prototype, "on" + method, {
      /**
       * Returns the current listener
       *
       * @return {Mixed} the set function or undefined
       * @api private
       */
      get: function get() {
        var listener = this.listeners(method)[0];
        return listener ? listener._listener ? listener._listener : listener : void 0;
      },
      /**
       * Start listening for events
       *
       * @param {Function} listener the listener
       * @return {Mixed} the set function or undefined
       * @api private
       */
      set: function set(listener) {
        this.removeAllListeners(method);
        this.addEventListener(method, listener);
      }
    });
  });
  Object.defineProperty(EventSource, "CONNECTING", { enumerable: true, value: 0 });
  Object.defineProperty(EventSource, "OPEN", { enumerable: true, value: 1 });
  Object.defineProperty(EventSource, "CLOSED", { enumerable: true, value: 2 });
  EventSource.prototype.CONNECTING = 0;
  EventSource.prototype.OPEN = 1;
  EventSource.prototype.CLOSED = 2;
  EventSource.prototype.close = function() {
    this._close();
  };
  EventSource.prototype.addEventListener = function addEventListener(type, listener) {
    if (typeof listener === "function") {
      listener._listener = listener;
      this.on(type, listener);
    }
  };
  EventSource.prototype.dispatchEvent = function dispatchEvent(event) {
    if (!event.type) {
      throw new Error("UNSPECIFIED_EVENT_TYPE_ERR");
    }
    this.emit(event.type, event.detail);
  };
  EventSource.prototype.removeEventListener = function removeEventListener(type, listener) {
    if (typeof listener === "function") {
      listener._listener = void 0;
      this.removeListener(type, listener);
    }
  };
  function Event(type, optionalProperties) {
    Object.defineProperty(this, "type", { writable: false, value: type, enumerable: true });
    if (optionalProperties) {
      for (var f in optionalProperties) {
        if (optionalProperties.hasOwnProperty(f)) {
          Object.defineProperty(this, f, { writable: false, value: optionalProperties[f], enumerable: true });
        }
      }
    }
  }
  function MessageEvent(type, eventInitDict) {
    Object.defineProperty(this, "type", { writable: false, value: type, enumerable: true });
    for (var f in eventInitDict) {
      if (eventInitDict.hasOwnProperty(f)) {
        Object.defineProperty(this, f, { writable: false, value: eventInitDict[f], enumerable: true });
      }
    }
  }
  function removeUnsafeHeaders(headers) {
    var safe = {};
    for (var key in headers) {
      if (reUnsafeHeader.test(key)) {
        continue;
      }
      safe[key] = headers[key];
    }
    return safe;
  }
  return eventsource;
}
var node$2;
var hasRequiredNode;
function requireNode() {
  if (hasRequiredNode) return node$2;
  hasRequiredNode = 1;
  node$2 = requireEventsource();
  return node$2;
}
var nodeExports = /* @__PURE__ */ requireNode();
const node = /* @__PURE__ */ getDefaultExportFromCjs(nodeExports);
const node$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: node
}, [nodeExports]);
export {
  node$1 as n
};
//# sourceMappingURL=node-CtsxRpIY.js.map

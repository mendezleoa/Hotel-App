import {
  require_prop_types,
  require_react
} from "./chunk-TBVIDBVX.js";
import {
  __commonJS
} from "./chunk-ZS7NZCD4.js";

// node_modules/uuid/lib/rng-browser.js
var require_rng_browser = __commonJS({
  "node_modules/uuid/lib/rng-browser.js"(exports, module) {
    var getRandomValues = typeof crypto != "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto != "undefined" && typeof window.msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto);
    if (getRandomValues) {
      rnds8 = new Uint8Array(16);
      module.exports = function whatwgRNG() {
        getRandomValues(rnds8);
        return rnds8;
      };
    } else {
      rnds = new Array(16);
      module.exports = function mathRNG() {
        for (var i = 0, r; i < 16; i++) {
          if ((i & 3) === 0)
            r = Math.random() * 4294967296;
          rnds[i] = r >>> ((i & 3) << 3) & 255;
        }
        return rnds;
      };
    }
    var rnds8;
    var rnds;
  }
});

// node_modules/uuid/lib/bytesToUuid.js
var require_bytesToUuid = __commonJS({
  "node_modules/uuid/lib/bytesToUuid.js"(exports, module) {
    var byteToHex = [];
    for (i = 0; i < 256; ++i) {
      byteToHex[i] = (i + 256).toString(16).substr(1);
    }
    var i;
    function bytesToUuid(buf, offset) {
      var i2 = offset || 0;
      var bth = byteToHex;
      return [
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        "-",
        bth[buf[i2++]],
        bth[buf[i2++]],
        "-",
        bth[buf[i2++]],
        bth[buf[i2++]],
        "-",
        bth[buf[i2++]],
        bth[buf[i2++]],
        "-",
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]]
      ].join("");
    }
    module.exports = bytesToUuid;
  }
});

// node_modules/uuid/v4.js
var require_v4 = __commonJS({
  "node_modules/uuid/v4.js"(exports, module) {
    var rng = require_rng_browser();
    var bytesToUuid = require_bytesToUuid();
    function v4(options, buf, offset) {
      var i = buf && offset || 0;
      if (typeof options == "string") {
        buf = options === "binary" ? new Array(16) : null;
        options = null;
      }
      options = options || {};
      var rnds = options.random || (options.rng || rng)();
      rnds[6] = rnds[6] & 15 | 64;
      rnds[8] = rnds[8] & 63 | 128;
      if (buf) {
        for (var ii = 0; ii < 16; ++ii) {
          buf[i + ii] = rnds[ii];
        }
      }
      return buf || bytesToUuid(rnds);
    }
    module.exports = v4;
  }
});

// node_modules/react-validation/build/input.js
var require_input = __commonJS({
  "node_modules/react-validation/build/input.js"(exports, module) {
    !function(e, t) {
      "object" === typeof exports && "object" === typeof module ? module.exports = t(require_react(), require_prop_types(), require_v4()) : "function" === typeof define && define.amd ? define(["react", "prop-types", "uuid/v4"], t) : "object" === typeof exports ? exports.input = t(require_react(), require_prop_types(), require_v4()) : e.input = t(e.React, e.PropTypes, e.uuid);
    }(exports, function(e, t, n) {
      return function(e2) {
        function t2(r) {
          if (n2[r])
            return n2[r].exports;
          var o = n2[r] = { i: r, l: false, exports: {} };
          return e2[r].call(o.exports, o, o.exports, t2), o.l = true, o.exports;
        }
        var n2 = {};
        return t2.m = e2, t2.c = n2, t2.d = function(e3, n3, r) {
          t2.o(e3, n3) || Object.defineProperty(e3, n3, { configurable: false, enumerable: true, get: r });
        }, t2.n = function(e3) {
          var n3 = e3 && e3.__esModule ? function() {
            return e3.default;
          } : function() {
            return e3;
          };
          return t2.d(n3, "a", n3), n3;
        }, t2.o = function(e3, t3) {
          return Object.prototype.hasOwnProperty.call(e3, t3);
        }, t2.p = "/", t2(t2.s = 12);
      }([function(t2, n2) {
        t2.exports = e;
      }, function(e2, n2) {
        e2.exports = t;
      }, function(e2, t2, n2) {
        "use strict";
        function r(e3, t3) {
          if (!(e3 instanceof t3))
            throw new TypeError("Cannot call a class as a function");
        }
        function o(e3, t3) {
          if (!e3)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !t3 || "object" !== typeof t3 && "function" !== typeof t3 ? e3 : t3;
        }
        function i(e3, t3) {
          if ("function" !== typeof t3 && null !== t3)
            throw new TypeError("Super expression must either be null or a function, not " + typeof t3);
          e3.prototype = Object.create(t3 && t3.prototype, { constructor: { value: e3, enumerable: false, writable: true, configurable: true } }), t3 && (Object.setPrototypeOf ? Object.setPrototypeOf(e3, t3) : e3.__proto__ = t3);
        }
        function u(e3) {
          var t3, n3;
          return n3 = t3 = function(t4) {
            function n4() {
              return r(this, n4), o(this, (n4.__proto__ || Object.getPrototypeOf(n4)).apply(this, arguments));
            }
            return i(n4, t4), f(n4, [{ key: "render", value: function() {
              var t5 = this.context._getProps(this.id);
              return t5 ? c.a.createElement(e3, Object.assign({}, t5, { onChange: this.handleChange, onBlur: this.handleBlur })) : null;
            } }]), n4;
          }(s.a), t3.displayName = "Control(" + e3.name + ")", n3;
        }
        t2.a = u;
        var a = n2(0), c = n2.n(a), s = n2(3), f = /* @__PURE__ */ function() {
          function e3(e4, t3) {
            for (var n3 = 0; n3 < t3.length; n3++) {
              var r2 = t3[n3];
              r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(e4, r2.key, r2);
            }
          }
          return function(t3, n3, r2) {
            return n3 && e3(t3.prototype, n3), r2 && e3(t3, r2), t3;
          };
        }();
      }, function(e2, t2, n2) {
        "use strict";
        function r(e3, t3) {
          var n3 = {};
          for (var r2 in e3)
            t3.indexOf(r2) >= 0 || Object.prototype.hasOwnProperty.call(e3, r2) && (n3[r2] = e3[r2]);
          return n3;
        }
        function o(e3, t3) {
          if (!(e3 instanceof t3))
            throw new TypeError("Cannot call a class as a function");
        }
        function i(e3, t3) {
          if (!e3)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !t3 || "object" !== typeof t3 && "function" !== typeof t3 ? e3 : t3;
        }
        function u(e3, t3) {
          if ("function" !== typeof t3 && null !== t3)
            throw new TypeError("Super expression must either be null or a function, not " + typeof t3);
          e3.prototype = Object.create(t3 && t3.prototype, { constructor: { value: e3, enumerable: false, writable: true, configurable: true } }), t3 && (Object.setPrototypeOf ? Object.setPrototypeOf(e3, t3) : e3.__proto__ = t3);
        }
        var a = n2(0), c = (n2.n(a), n2(1)), s = n2.n(c), f = n2(4), p = n2.n(f), l = n2(5), d = n2.n(l), h = n2(6), y = n2.n(h), v = /* @__PURE__ */ function() {
          function e3(e4, t3) {
            for (var n3 = 0; n3 < t3.length; n3++) {
              var r2 = t3[n3];
              r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(e4, r2.key, r2);
            }
          }
          return function(t3, n3, r2) {
            return n3 && e3(t3.prototype, n3), r2 && e3(t3, r2), t3;
          };
        }(), b = function(e3) {
          function t3() {
            var e4, n3, r2, u2;
            o(this, t3);
            for (var a2 = arguments.length, c2 = Array(a2), s2 = 0; s2 < a2; s2++)
              c2[s2] = arguments[s2];
            return n3 = r2 = i(this, (e4 = t3.__proto__ || Object.getPrototypeOf(t3)).call.apply(e4, [this].concat(c2))), r2.id = y()(), r2.handleChange = function(e5) {
              e5.persist(), r2.context._handleChange(e5, r2.id), r2.props.onChange && r2.props.onChange(e5);
            }, r2.handleBlur = function(e5) {
              e5.persist(), r2.context._handleBlur(e5, r2.id), r2.props.onBlur && r2.props.onBlur(e5);
            }, u2 = n3, i(r2, u2);
          }
          return u(t3, e3), v(t3, [{ key: "componentDidMount", value: function() {
            this.context._register(this, this.id);
          } }, { key: "componentWillUnmount", value: function() {
            this.context._unregister(this, this.id);
          } }, { key: "componentWillReceiveProps", value: function(e4) {
            var t4 = e4.validations, n3 = r(e4, ["validations"]), o2 = this.props, i2 = o2.validations, u2 = r(o2, ["validations"]);
            d()(u2, n3) && p()(i2, t4) || this.context._setProps(n3, this.id);
          } }, { key: "shouldComponentUpdate", value: function(e4, t4, n3) {
            return n3 !== this.context;
          } }, { key: "render", value: function() {
            return null;
          } }]), t3;
        }(a.Component);
        b.contextTypes = { _register: s.a.func.isRequired, _unregister: s.a.func.isRequired, _setProps: s.a.func.isRequired, _handleChange: s.a.func.isRequired, _handleBlur: s.a.func.isRequired, _getProps: s.a.func.isRequired }, b.propTypes = { validations: s.a.arrayOf(s.a.func), onChange: s.a.func, onBlur: s.a.func }, b.defaultProps = { validations: [] }, t2.a = b;
      }, function(e2, t2) {
        e2.exports = function(e3, t3) {
          if (e3 === t3)
            return true;
          var n2 = e3.length;
          if (t3.length !== n2)
            return false;
          for (var r = 0; r < n2; r++)
            if (e3[r] !== t3[r])
              return false;
          return true;
        };
      }, function(e2, t2) {
        e2.exports = function(e3, t3) {
          if (e3 === t3)
            return true;
          var n2 = Object.keys(e3), r = Object.keys(t3), o = n2.length;
          if (r.length !== o)
            return false;
          for (var i = 0; i < o; i++) {
            var u = n2[i];
            if (e3[u] !== t3[u])
              return false;
          }
          return true;
        };
      }, function(e2, t2) {
        e2.exports = n;
      }, , , , , , function(e2, t2, n2) {
        "use strict";
        function r(e3, t3) {
          var n3 = {};
          for (var r2 in e3)
            t3.indexOf(r2) >= 0 || Object.prototype.hasOwnProperty.call(e3, r2) && (n3[r2] = e3[r2]);
          return n3;
        }
        Object.defineProperty(t2, "__esModule", { value: true });
        var o = n2(0), i = n2.n(o), u = n2(1), a = n2.n(u), c = n2(2), s = function(e3) {
          var t3 = e3.error, n3 = e3.isChanged, o2 = e3.isUsed, u2 = r(e3, ["error", "isChanged", "isUsed"]);
          return i.a.createElement("div", null, i.a.createElement("input", Object.assign({}, u2, n3 && o2 && t3 ? { className: "is-invalid-input " + u2.className } : { className: u2.className })), n3 && o2 && t3);
        };
        s.propTypes = { error: a.a.oneOfType([a.a.node, a.a.string]) }, t2.default = Object(c.a)(s);
      }]);
    });
  }
});
export default require_input();
//# sourceMappingURL=react-validation_build_input.js.map

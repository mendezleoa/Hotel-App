import {
  require_prop_types,
  require_react
} from "./chunk-TBVIDBVX.js";
import {
  __commonJS
} from "./chunk-ZS7NZCD4.js";

// node_modules/react-validation/build/button.js
var require_button = __commonJS({
  "node_modules/react-validation/build/button.js"(exports, module) {
    !function(e, t) {
      "object" === typeof exports && "object" === typeof module ? module.exports = t(require_react(), require_prop_types()) : "function" === typeof define && define.amd ? define(["react", "prop-types"], t) : "object" === typeof exports ? exports.button = t(require_react(), require_prop_types()) : e.button = t(e.React, e.PropTypes);
    }(exports, function(e, t) {
      return function(e2) {
        function t2(n) {
          if (r[n])
            return r[n].exports;
          var o = r[n] = { i: n, l: false, exports: {} };
          return e2[n].call(o.exports, o, o.exports, t2), o.l = true, o.exports;
        }
        var r = {};
        return t2.m = e2, t2.c = r, t2.d = function(e3, r2, n) {
          t2.o(e3, r2) || Object.defineProperty(e3, r2, { configurable: false, enumerable: true, get: n });
        }, t2.n = function(e3) {
          var r2 = e3 && e3.__esModule ? function() {
            return e3.default;
          } : function() {
            return e3;
          };
          return t2.d(r2, "a", r2), r2;
        }, t2.o = function(e3, t3) {
          return Object.prototype.hasOwnProperty.call(e3, t3);
        }, t2.p = "/", t2(t2.s = 15);
      }({ 0: function(t2, r) {
        t2.exports = e;
      }, 1: function(e2, r) {
        e2.exports = t;
      }, 15: function(e2, t2, r) {
        "use strict";
        function n(e3, t3) {
          var r2 = {};
          for (var n2 in e3)
            t3.indexOf(n2) >= 0 || Object.prototype.hasOwnProperty.call(e3, n2) && (r2[n2] = e3[n2]);
          return r2;
        }
        Object.defineProperty(t2, "__esModule", { value: true });
        var o = r(0), u = r.n(o), a = r(1), c = r.n(a), i = r(9), s = function(e3) {
          var t3 = e3.hasErrors, r2 = n(e3, ["hasErrors"]);
          return u.a.createElement("button", Object.assign({}, r2, { disabled: t3 }));
        };
        s.contextTypes = { hasErrors: c.a.bool }, t2.default = Object(i.a)(s);
      }, 9: function(e2, t2, r) {
        "use strict";
        function n(e3, t3) {
          if (!(e3 instanceof t3))
            throw new TypeError("Cannot call a class as a function");
        }
        function o(e3, t3) {
          if (!e3)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !t3 || "object" !== typeof t3 && "function" !== typeof t3 ? e3 : t3;
        }
        function u(e3, t3) {
          if ("function" !== typeof t3 && null !== t3)
            throw new TypeError("Super expression must either be null or a function, not " + typeof t3);
          e3.prototype = Object.create(t3 && t3.prototype, { constructor: { value: e3, enumerable: false, writable: true, configurable: true } }), t3 && (Object.setPrototypeOf ? Object.setPrototypeOf(e3, t3) : e3.__proto__ = t3);
        }
        function a(e3) {
          var t3, r2;
          return r2 = t3 = function(t4) {
            function r3() {
              return n(this, r3), o(this, (r3.__proto__ || Object.getPrototypeOf(r3)).apply(this, arguments));
            }
            return u(r3, t4), f(r3, [{ key: "shouldComponentUpdate", value: function(e4, t5, r4) {
              return r4._errors !== this.context._errors;
            } }, { key: "render", value: function() {
              var t5 = !!Object.keys(this.context._errors).length;
              return i.a.createElement(e3, Object.assign({}, this.props, { hasErrors: t5 }));
            } }]), r3;
          }(c.Component), t3.contextTypes = { _errors: p.a.arrayOf(p.a.oneOfType([p.a.object, p.a.string])) }, t3.displayName = "Button(" + e3.name + ")", r2;
        }
        t2.a = a;
        var c = r(0), i = r.n(c), s = r(1), p = r.n(s), f = /* @__PURE__ */ function() {
          function e3(e4, t3) {
            for (var r2 = 0; r2 < t3.length; r2++) {
              var n2 = t3[r2];
              n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(e4, n2.key, n2);
            }
          }
          return function(t3, r2, n2) {
            return r2 && e3(t3.prototype, r2), n2 && e3(t3, n2), t3;
          };
        }();
      } });
    });
  }
});
export default require_button();
//# sourceMappingURL=react-validation_build_button.js.map

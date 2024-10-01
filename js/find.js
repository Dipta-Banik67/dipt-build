"use strict";
Array.prototype.find = Array.prototype.find || function(r) {
    if (null === this) throw new TypeError("Array.prototype.find called on null or undefined");
    if ("function" != typeof r) throw new TypeError("callback must be a function");
    for (var t = Object(this), e = t.length >>> 0, n = arguments[1], o = 0; o < e; o++) {
        var i = t[o];
        if (r.call(n, i, o, t)) return i
    }
}, Array.prototype.findIndex = Array.prototype.findIndex || function(r) {
    if (null === this) throw new TypeError("Array.prototype.findIndex called on null or undefined");
    if ("function" != typeof r) throw new TypeError("callback must be a function");
    for (var t = Object(this), e = t.length >>> 0, n = arguments[1], o = 0; o < e; o++)
        if (r.call(n, t[o], o, t)) return o;
    return -1
}, Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", {
    value: function(r, t) {
        if (null == this) throw new TypeError('"this" is null or not defined');
        var e = Object(this),
            n = e.length >>> 0;
        if (0 === n) return !1;
        var o, i, f = 0 | t,
            a = Math.max(f >= 0 ? f : n - Math.abs(f), 0);
        for (; a < n;) {
            if ((o = e[a]) === (i = r) || "number" == typeof o && "number" == typeof i && isNaN(o) && isNaN(i)) return !0;
            a++
        }
        return !1
    }
});
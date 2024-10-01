! function(o) {
    var e = o.requestAnimationFrame || o.webkitRequestAnimationFrame || o.mozRequestAnimationFrame || function(e) {
            o.setTimeout(e, 1e3 / 60)
        },
        n = function(o, n, t, l) {
            var i = o.scrollTop,
                r = n - i,
                a = +new Date,
                u = !0,
                m = null,
                s = function() {
                    if (u) {
                        e(s);
                        var c, d, f, p = +new Date,
                            T = Math.floor((c = p - a, d = i, f = r, (c /= t / 2) < 1 ? f / 2 * c * c + d : -f / 2 * (--c * (c - 2) - 1) + d));
                        m ? m === o.scrollTop ? (m = T, o.scrollTop = T) : u = !1 : (m = T, o.scrollTop = T), p > a + t && (o.scrollTop = n, u = !1, l && l())
                    }
                };
            e(s)
        };
    "undefined" != typeof module && void 0 !== module.exports ? module.exports = n : o.animatedScrollTo = n
}(window);
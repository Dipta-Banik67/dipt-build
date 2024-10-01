if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");
! function(e) {
    var t = jQuery.fn.jquery.split(" ")[0].split(".");
    if (t[0] < 2 && t[1] < 9 || 1 == t[0] && 9 == t[1] && t[2] < 1 || t[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
}(),
function(e) {
    "use strict";
    var t = function(e, t, n) {
            for (var i = !0; i;) {
                var s = e,
                    r = t,
                    o = n;
                i = !1, null === s && (s = Function.prototype);
                var a = Object.getOwnPropertyDescriptor(s, r);
                if (void 0 !== a) {
                    if ("value" in a) return a.value;
                    var l = a.get;
                    if (void 0 === l) return;
                    return l.call(o)
                }
                var h = Object.getPrototypeOf(s);
                if (null === h) return;
                e = h, t = r, n = o, i = !0, a = h = void 0
            }
        },
        n = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n), i && e(t, i), t
            }
        }();

    function i(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    var s = function(e) {
            var t = !1,
                n = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };

            function i(e) {
                return {}.toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
            }

            function s(t) {
                var n = this,
                    i = !1;
                return e(this).one(r.TRANSITION_END, function() {
                    i = !0
                }), setTimeout(function() {
                    i || r.triggerTransitionEnd(n)
                }, t), this
            }
            var r = {
                TRANSITION_END: "bsTransitionEnd",
                getUID: function(e) {
                    do {
                        e += ~~(1e6 * Math.random())
                    } while (document.getElementById(e));
                    return e
                },
                getSelectorFromElement: function(e) {
                    var t = e.getAttribute("data-target");
                    return t || (t = e.getAttribute("href") || "", t = /^#[a-z]/i.test(t) ? t : null), t
                },
                reflow: function(e) {
                    new Function("bs", "return bs")(e.offsetHeight)
                },
                triggerTransitionEnd: function(n) {
                    e(n).trigger(t.end)
                },
                supportsTransitionEnd: function() {
                    return Boolean(t)
                },
                typeCheckConfig: function(e, t, n) {
                    for (var s in n)
                        if (n.hasOwnProperty(s)) {
                            var r = n[s],
                                o = t[s],
                                a = void 0;
                            if (a = o && ((l = o)[0] || l).nodeType ? "element" : i(o), !new RegExp(r).test(a)) throw new Error(e.toUpperCase() + ': Option "' + s + '" provided type "' + a + '" but expected type "' + r + '".')
                        }
                    var l
                }
            };
            return t = function() {
                if (window.QUnit) return !1;
                var e = document.createElement("bootstrap");
                for (var t in n)
                    if (void 0 !== e.style[t]) return {
                        end: n[t]
                    };
                return !1
            }(), e.fn.emulateTransitionEnd = s, r.supportsTransitionEnd() && (e.event.special[r.TRANSITION_END] = {
                bindType: t.end,
                delegateType: t.end,
                handle: function(t) {
                    if (e(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
                }
            }), r
        }(jQuery),
        r = (function(e) {
            var t = e.fn.alert,
                r = {
                    CLOSE: "close.bs.alert",
                    CLOSED: "closed.bs.alert",
                    CLICK_DATA_API: "click.bs.alert.data-api"
                },
                o = "alert",
                a = "fade",
                l = "in",
                h = function() {
                    function t(e) {
                        i(this, t), this._element = e
                    }
                    return n(t, [{
                        key: "close",
                        value: function(e) {
                            e = e || this._element;
                            var t = this._getRootElement(e);
                            this._triggerCloseEvent(t).isDefaultPrevented() || this._removeElement(t)
                        }
                    }, {
                        key: "dispose",
                        value: function() {
                            e.removeData(this._element, "bs.alert"), this._element = null
                        }
                    }, {
                        key: "_getRootElement",
                        value: function(t) {
                            var n = s.getSelectorFromElement(t),
                                i = !1;
                            return n && (i = e(n)[0]), i || (i = e(t).closest("." + o)[0]), i
                        }
                    }, {
                        key: "_triggerCloseEvent",
                        value: function(t) {
                            var n = e.Event(r.CLOSE);
                            return e(t).trigger(n), n
                        }
                    }, {
                        key: "_removeElement",
                        value: function(t) {
                            e(t).removeClass(l), s.supportsTransitionEnd() && e(t).hasClass(a) ? e(t).one(s.TRANSITION_END, e.proxy(this._destroyElement, this, t)).emulateTransitionEnd(150) : this._destroyElement(t)
                        }
                    }, {
                        key: "_destroyElement",
                        value: function(t) {
                            e(t).detach().trigger(r.CLOSED).remove()
                        }
                    }], [{
                        key: "_jQueryInterface",
                        value: function(n) {
                            return this.each(function() {
                                var i = e(this),
                                    s = i.data("bs.alert");
                                s || (s = new t(this), i.data("bs.alert", s)), "close" === n && s[n](this)
                            })
                        }
                    }, {
                        key: "_handleDismiss",
                        value: function(e) {
                            return function(t) {
                                t && t.preventDefault(), e.close(this)
                            }
                        }
                    }, {
                        key: "VERSION",
                        get: function() {
                            return "4.0.0-alpha.4"
                        }
                    }]), t
                }();
            e(document).on(r.CLICK_DATA_API, '[data-dismiss="alert"]', h._handleDismiss(new h)), e.fn.alert = h._jQueryInterface, e.fn.alert.Constructor = h, e.fn.alert.noConflict = function() {
                return e.fn.alert = t, h._jQueryInterface
            }
        }(jQuery), function(e) {
            var t = "button",
                s = e.fn[t],
                r = "active",
                o = "btn",
                a = "focus",
                l = '[data-toggle^="button"]',
                h = '[data-toggle="buttons"]',
                u = "input",
                c = ".active",
                d = ".btn",
                f = {
                    CLICK_DATA_API: "click.bs.button.data-api",
                    FOCUS_BLUR_DATA_API: "focus.bs.button.data-api blur.bs.button.data-api"
                },
                _ = function() {
                    function t(e) {
                        i(this, t), this._element = e
                    }
                    return n(t, [{
                        key: "toggle",
                        value: function() {
                            var t = !0,
                                n = e(this._element).closest(h)[0];
                            if (n) {
                                var i = e(this._element).find(u)[0];
                                if (i) {
                                    if ("radio" === i.type)
                                        if (i.checked && e(this._element).hasClass(r)) t = !1;
                                        else {
                                            var s = e(n).find(c)[0];
                                            s && e(s).removeClass(r)
                                        }
                                    t && (i.checked = !e(this._element).hasClass(r), e(this._element).trigger("change")), i.focus()
                                }
                            } else this._element.setAttribute("aria-pressed", !e(this._element).hasClass(r));
                            t && e(this._element).toggleClass(r)
                        }
                    }, {
                        key: "dispose",
                        value: function() {
                            e.removeData(this._element, "bs.button"), this._element = null
                        }
                    }], [{
                        key: "_jQueryInterface",
                        value: function(n) {
                            return this.each(function() {
                                var i = e(this).data("bs.button");
                                i || (i = new t(this), e(this).data("bs.button", i)), "toggle" === n && i[n]()
                            })
                        }
                    }, {
                        key: "VERSION",
                        get: function() {
                            return "4.0.0-alpha.4"
                        }
                    }]), t
                }();
            e(document).on(f.CLICK_DATA_API, l, function(t) {
                t.preventDefault();
                var n = t.target;
                e(n).hasClass(o) || (n = e(n).closest(d)), _._jQueryInterface.call(e(n), "toggle")
            }).on(f.FOCUS_BLUR_DATA_API, l, function(t) {
                var n = e(t.target).closest(d)[0];
                e(n).toggleClass(a, /^focus(in)?$/.test(t.type))
            }), e.fn[t] = _._jQueryInterface, e.fn[t].Constructor = _, e.fn[t].noConflict = function() {
                return e.fn[t] = s, _._jQueryInterface
            }
        }(jQuery), function(e) {
            var t = "carousel",
                r = "bs.carousel",
                o = "." + r,
                a = e.fn[t],
                l = {
                    interval: 5e3,
                    keyboard: !0,
                    slide: !1,
                    pause: "hover",
                    wrap: !0
                },
                h = {
                    interval: "(number|boolean)",
                    keyboard: "boolean",
                    slide: "(boolean|string)",
                    pause: "(string|boolean)",
                    wrap: "boolean"
                },
                u = "next",
                c = "prev",
                d = {
                    SLIDE: "slide" + o,
                    SLID: "slid" + o,
                    KEYDOWN: "keydown" + o,
                    MOUSEENTER: "mouseenter" + o,
                    MOUSELEAVE: "mouseleave" + o,
                    LOAD_DATA_API: "load.bs.carousel.data-api",
                    CLICK_DATA_API: "click.bs.carousel.data-api"
                },
                f = "carousel",
                _ = "active",
                g = "slide",
                v = "right",
                m = "left",
                p = {
                    ACTIVE: ".active",
                    ACTIVE_ITEM: ".active.carousel-item",
                    ITEM: ".carousel-item",
                    NEXT_PREV: ".next, .prev",
                    INDICATORS: ".carousel-indicators",
                    DATA_SLIDE: "[data-slide], [data-slide-to]",
                    DATA_RIDE: '[data-ride="carousel"]'
                },
                y = function() {
                    function a(t, n) {
                        i(this, a), this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this._config = this._getConfig(n), this._element = e(t)[0], this._indicatorsElement = e(this._element).find(p.INDICATORS)[0], this._addEventListeners()
                    }
                    return n(a, [{
                        key: "next",
                        value: function() {
                            this._isSliding || this._slide(u)
                        }
                    }, {
                        key: "nextWhenVisible",
                        value: function() {
                            document.hidden || this.next()
                        }
                    }, {
                        key: "prev",
                        value: function() {
                            this._isSliding || this._slide(c)
                        }
                    }, {
                        key: "pause",
                        value: function(t) {
                            t || (this._isPaused = !0), e(this._element).find(p.NEXT_PREV)[0] && s.supportsTransitionEnd() && (s.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
                        }
                    }, {
                        key: "cycle",
                        value: function(t) {
                            t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval(e.proxy(document.visibilityState ? this.nextWhenVisible : this.next, this), this._config.interval))
                        }
                    }, {
                        key: "to",
                        value: function(t) {
                            var n = this;
                            this._activeElement = e(this._element).find(p.ACTIVE_ITEM)[0];
                            var i = this._getItemIndex(this._activeElement);
                            if (!(t > this._items.length - 1 || t < 0))
                                if (this._isSliding) e(this._element).one(d.SLID, function() {
                                    return n.to(t)
                                });
                                else {
                                    if (i === t) return this.pause(), void this.cycle();
                                    var s = t > i ? u : c;
                                    this._slide(s, this._items[t])
                                }
                        }
                    }, {
                        key: "dispose",
                        value: function() {
                            e(this._element).off(o), e.removeData(this._element, r), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
                        }
                    }, {
                        key: "_getConfig",
                        value: function(n) {
                            return n = e.extend({}, l, n), s.typeCheckConfig(t, n, h), n
                        }
                    }, {
                        key: "_addEventListeners",
                        value: function() {
                            this._config.keyboard && e(this._element).on(d.KEYDOWN, e.proxy(this._keydown, this)), "hover" !== this._config.pause || "ontouchstart" in document.documentElement || e(this._element).on(d.MOUSEENTER, e.proxy(this.pause, this)).on(d.MOUSELEAVE, e.proxy(this.cycle, this))
                        }
                    }, {
                        key: "_keydown",
                        value: function(e) {
                            if (e.preventDefault(), !/input|textarea/i.test(e.target.tagName)) switch (e.which) {
                                case 37:
                                    this.prev();
                                    break;
                                case 39:
                                    this.next();
                                    break;
                                default:
                                    return
                            }
                        }
                    }, {
                        key: "_getItemIndex",
                        value: function(t) {
                            return this._items = e.makeArray(e(t).parent().find(p.ITEM)), this._items.indexOf(t)
                        }
                    }, {
                        key: "_getItemByDirection",
                        value: function(e, t) {
                            var n = e === u,
                                i = e === c,
                                s = this._getItemIndex(t),
                                r = this._items.length - 1;
                            if ((i && 0 === s || n && s === r) && !this._config.wrap) return t;
                            var o = (s + (e === c ? -1 : 1)) % this._items.length;
                            return -1 === o ? this._items[this._items.length - 1] : this._items[o]
                        }
                    }, {
                        key: "_triggerSlideEvent",
                        value: function(t, n) {
                            var i = e.Event(d.SLIDE, {
                                relatedTarget: t,
                                direction: n
                            });
                            return e(this._element).trigger(i), i
                        }
                    }, {
                        key: "_setActiveIndicatorElement",
                        value: function(t) {
                            if (this._indicatorsElement) {
                                e(this._indicatorsElement).find(p.ACTIVE).removeClass(_);
                                var n = this._indicatorsElement.children[this._getItemIndex(t)];
                                n && e(n).addClass(_)
                            }
                        }
                    }, {
                        key: "_slide",
                        value: function(t, n) {
                            var i = this,
                                r = e(this._element).find(p.ACTIVE_ITEM)[0],
                                o = n || r && this._getItemByDirection(t, r),
                                a = Boolean(this._interval),
                                l = t === u ? m : v;
                            if (o && e(o).hasClass(_)) this._isSliding = !1;
                            else if (!this._triggerSlideEvent(o, l).isDefaultPrevented() && r && o) {
                                this._isSliding = !0, a && this.pause(), this._setActiveIndicatorElement(o);
                                var h = e.Event(d.SLID, {
                                    relatedTarget: o,
                                    direction: l
                                });
                                s.supportsTransitionEnd() && e(this._element).hasClass(g) ? (e(o).addClass(t), s.reflow(o), e(r).addClass(l), e(o).addClass(l), e(r).one(s.TRANSITION_END, function() {
                                    e(o).removeClass(l).removeClass(t), e(o).addClass(_), e(r).removeClass(_).removeClass(t).removeClass(l), i._isSliding = !1, setTimeout(function() {
                                        return e(i._element).trigger(h)
                                    }, 0)
                                }).emulateTransitionEnd(600)) : (e(r).removeClass(_), e(o).addClass(_), this._isSliding = !1, e(this._element).trigger(h)), a && this.cycle()
                            }
                        }
                    }], [{
                        key: "_jQueryInterface",
                        value: function(t) {
                            return this.each(function() {
                                var n = e(this).data(r),
                                    i = e.extend({}, l, e(this).data());
                                "object" == typeof t && e.extend(i, t);
                                var s = "string" == typeof t ? t : i.slide;
                                if (n || (n = new a(this, i), e(this).data(r, n)), "number" == typeof t) n.to(t);
                                else if ("string" == typeof s) {
                                    if (void 0 === n[s]) throw new Error('No method named "' + s + '"');
                                    n[s]()
                                } else i.interval && (n.pause(), n.cycle())
                            })
                        }
                    }, {
                        key: "_dataApiClickHandler",
                        value: function(t) {
                            var n = s.getSelectorFromElement(this);
                            if (n) {
                                var i = e(n)[0];
                                if (i && e(i).hasClass(f)) {
                                    var o = e.extend({}, e(i).data(), e(this).data()),
                                        l = this.getAttribute("data-slide-to");
                                    l && (o.interval = !1), a._jQueryInterface.call(e(i), o), l && e(i).data(r).to(l), t.preventDefault()
                                }
                            }
                        }
                    }, {
                        key: "VERSION",
                        get: function() {
                            return "4.0.0-alpha.4"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return l
                        }
                    }]), a
                }();
            e(document).on(d.CLICK_DATA_API, p.DATA_SLIDE, y._dataApiClickHandler), e(window).on(d.LOAD_DATA_API, function() {
                e(p.DATA_RIDE).each(function() {
                    var t = e(this);
                    y._jQueryInterface.call(t, t.data())
                })
            }), e.fn[t] = y._jQueryInterface, e.fn[t].Constructor = y, e.fn[t].noConflict = function() {
                return e.fn[t] = a, y._jQueryInterface
            }
        }(jQuery), function(e) {
            var t = "collapse",
                r = "bs.collapse",
                o = e.fn[t],
                a = {
                    toggle: !0,
                    parent: ""
                },
                l = {
                    toggle: "boolean",
                    parent: "string"
                },
                h = {
                    SHOW: "show.bs.collapse",
                    SHOWN: "shown.bs.collapse",
                    HIDE: "hide.bs.collapse",
                    HIDDEN: "hidden.bs.collapse",
                    CLICK_DATA_API: "click.bs.collapse.data-api"
                },
                u = "in",
                c = "collapse",
                d = "collapsing",
                f = "collapsed",
                _ = "width",
                g = "height",
                v = ".panel > .in, .panel > .collapsing",
                m = '[data-toggle="collapse"]',
                p = function() {
                    function o(t, n) {
                        i(this, o), this._isTransitioning = !1, this._element = t, this._config = this._getConfig(n), this._triggerArray = e.makeArray(e('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]')), this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
                    }
                    return n(o, [{
                        key: "toggle",
                        value: function() {
                            e(this._element).hasClass(u) ? this.hide() : this.show()
                        }
                    }, {
                        key: "show",
                        value: function() {
                            var t = this;
                            if (!this._isTransitioning && !e(this._element).hasClass(u)) {
                                var n = void 0,
                                    i = void 0;
                                if (this._parent && ((n = e.makeArray(e(v))).length || (n = null)), !(n && (i = e(n).data(r)) && i._isTransitioning)) {
                                    var a = e.Event(h.SHOW);
                                    if (e(this._element).trigger(a), !a.isDefaultPrevented()) {
                                        n && (o._jQueryInterface.call(e(n), "hide"), i || e(n).data(r, null));
                                        var l = this._getDimension();
                                        e(this._element).removeClass(c).addClass(d), this._element.style[l] = 0, this._element.setAttribute("aria-expanded", !0), this._triggerArray.length && e(this._triggerArray).removeClass(f).attr("aria-expanded", !0), this.setTransitioning(!0);
                                        var _ = function() {
                                            e(t._element).removeClass(d).addClass(c).addClass(u), t._element.style[l] = "", t.setTransitioning(!1), e(t._element).trigger(h.SHOWN)
                                        };
                                        if (s.supportsTransitionEnd()) {
                                            var g = "scroll" + (l[0].toUpperCase() + l.slice(1));
                                            e(this._element).one(s.TRANSITION_END, _).emulateTransitionEnd(600), this._element.style[l] = this._element[g] + "px"
                                        } else _()
                                    }
                                }
                            }
                        }
                    }, {
                        key: "hide",
                        value: function() {
                            var t = this;
                            if (!this._isTransitioning && e(this._element).hasClass(u)) {
                                var n = e.Event(h.HIDE);
                                if (e(this._element).trigger(n), !n.isDefaultPrevented()) {
                                    var i = this._getDimension(),
                                        r = i === _ ? "offsetWidth" : "offsetHeight";
                                    this._element.style[i] = this._element[r] + "px", s.reflow(this._element), e(this._element).addClass(d).removeClass(c).removeClass(u), this._element.setAttribute("aria-expanded", !1), this._triggerArray.length && e(this._triggerArray).addClass(f).attr("aria-expanded", !1), this.setTransitioning(!0);
                                    var o = function() {
                                        t.setTransitioning(!1), e(t._element).removeClass(d).addClass(c).trigger(h.HIDDEN)
                                    };
                                    this._element.style[i] = 0, s.supportsTransitionEnd() ? e(this._element).one(s.TRANSITION_END, o).emulateTransitionEnd(600) : o()
                                }
                            }
                        }
                    }, {
                        key: "setTransitioning",
                        value: function(e) {
                            this._isTransitioning = e
                        }
                    }, {
                        key: "dispose",
                        value: function() {
                            e.removeData(this._element, r), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
                        }
                    }, {
                        key: "_getConfig",
                        value: function(n) {
                            return (n = e.extend({}, a, n)).toggle = Boolean(n.toggle), s.typeCheckConfig(t, n, l), n
                        }
                    }, {
                        key: "_getDimension",
                        value: function() {
                            return e(this._element).hasClass(_) ? _ : g
                        }
                    }, {
                        key: "_getParent",
                        value: function() {
                            var t = this,
                                n = e(this._config.parent)[0],
                                i = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
                            return e(n).find(i).each(function(e, n) {
                                t._addAriaAndCollapsedClass(o._getTargetFromElement(n), [n])
                            }), n
                        }
                    }, {
                        key: "_addAriaAndCollapsedClass",
                        value: function(t, n) {
                            if (t) {
                                var i = e(t).hasClass(u);
                                t.setAttribute("aria-expanded", i), n.length && e(n).toggleClass(f, !i).attr("aria-expanded", i)
                            }
                        }
                    }], [{
                        key: "_getTargetFromElement",
                        value: function(t) {
                            var n = s.getSelectorFromElement(t);
                            return n ? e(n)[0] : null
                        }
                    }, {
                        key: "_jQueryInterface",
                        value: function(t) {
                            return this.each(function() {
                                var n = e(this),
                                    i = n.data(r),
                                    s = e.extend({}, a, n.data(), "object" == typeof t && t);
                                if (!i && s.toggle && /show|hide/.test(t) && (s.toggle = !1), i || (i = new o(this, s), n.data(r, i)), "string" == typeof t) {
                                    if (void 0 === i[t]) throw new Error('No method named "' + t + '"');
                                    i[t]()
                                }
                            })
                        }
                    }, {
                        key: "VERSION",
                        get: function() {
                            return "4.0.0-alpha.4"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return a
                        }
                    }]), o
                }();
            e(document).on(h.CLICK_DATA_API, m, function(t) {
                t.preventDefault();
                var n = p._getTargetFromElement(this),
                    i = e(n).data(r) ? "toggle" : e(this).data();
                p._jQueryInterface.call(e(n), i)
            }), e.fn[t] = p._jQueryInterface, e.fn[t].Constructor = p, e.fn[t].noConflict = function() {
                return e.fn[t] = o, p._jQueryInterface
            }
        }(jQuery), function(e) {
            var t = "dropdown",
                r = ".bs.dropdown",
                o = e.fn[t],
                a = {
                    HIDE: "hide" + r,
                    HIDDEN: "hidden" + r,
                    SHOW: "show" + r,
                    SHOWN: "shown" + r,
                    CLICK: "click" + r,
                    CLICK_DATA_API: "click.bs.dropdown.data-api",
                    KEYDOWN_DATA_API: "keydown.bs.dropdown.data-api"
                },
                l = "dropdown-backdrop",
                h = "disabled",
                u = "open",
                c = ".dropdown-backdrop",
                d = '[data-toggle="dropdown"]',
                f = ".dropdown form",
                _ = '[role="menu"]',
                g = '[role="listbox"]',
                v = ".navbar-nav",
                m = '[role="menu"] li:not(.disabled) a, [role="listbox"] li:not(.disabled) a',
                p = function() {
                    function t(e) {
                        i(this, t), this._element = e, this._addEventListeners()
                    }
                    return n(t, [{
                        key: "toggle",
                        value: function() {
                            if (this.disabled || e(this).hasClass(h)) return !1;
                            var n = t._getParentFromElement(this),
                                i = e(n).hasClass(u);
                            if (t._clearMenus(), i) return !1;
                            if ("ontouchstart" in document.documentElement && !e(n).closest(v).length) {
                                var s = document.createElement("div");
                                s.className = l, e(s).insertBefore(this), e(s).on("click", t._clearMenus)
                            }
                            var r = {
                                    relatedTarget: this
                                },
                                o = e.Event(a.SHOW, r);
                            return e(n).trigger(o), !o.isDefaultPrevented() && (this.focus(), this.setAttribute("aria-expanded", "true"), e(n).toggleClass(u), e(n).trigger(e.Event(a.SHOWN, r)), !1)
                        }
                    }, {
                        key: "dispose",
                        value: function() {
                            e.removeData(this._element, "bs.dropdown"), e(this._element).off(r), this._element = null
                        }
                    }, {
                        key: "_addEventListeners",
                        value: function() {
                            e(this._element).on(a.CLICK, this.toggle)
                        }
                    }], [{
                        key: "_jQueryInterface",
                        value: function(n) {
                            return this.each(function() {
                                var i = e(this).data("bs.dropdown");
                                if (i || e(this).data("bs.dropdown", i = new t(this)), "string" == typeof n) {
                                    if (void 0 === i[n]) throw new Error('No method named "' + n + '"');
                                    i[n].call(this)
                                }
                            })
                        }
                    }, {
                        key: "_clearMenus",
                        value: function(n) {
                            if (!n || 3 !== n.which) {
                                var i = e(c)[0];
                                i && i.parentNode.removeChild(i);
                                for (var s = e.makeArray(e(d)), r = 0; r < s.length; r++) {
                                    var o = t._getParentFromElement(s[r]),
                                        l = {
                                            relatedTarget: s[r]
                                        };
                                    if (e(o).hasClass(u) && !(n && "click" === n.type && /input|textarea/i.test(n.target.tagName) && e.contains(o, n.target))) {
                                        var h = e.Event(a.HIDE, l);
                                        e(o).trigger(h), h.isDefaultPrevented() || (s[r].setAttribute("aria-expanded", "false"), e(o).removeClass(u).trigger(e.Event(a.HIDDEN, l)))
                                    }
                                }
                            }
                        }
                    }, {
                        key: "_getParentFromElement",
                        value: function(t) {
                            var n = void 0,
                                i = s.getSelectorFromElement(t);
                            return i && (n = e(i)[0]), n || t.parentNode
                        }
                    }, {
                        key: "_dataApiKeydownHandler",
                        value: function(n) {
                            if (/(38|40|27|32)/.test(n.which) && !/input|textarea/i.test(n.target.tagName) && (n.preventDefault(), n.stopPropagation(), !this.disabled && !e(this).hasClass(h))) {
                                var i = t._getParentFromElement(this),
                                    s = e(i).hasClass(u);
                                if (!s && 27 !== n.which || s && 27 === n.which) {
                                    if (27 === n.which) {
                                        var r = e(i).find(d)[0];
                                        e(r).trigger("focus")
                                    }
                                    e(this).trigger("click")
                                } else {
                                    var o = e.makeArray(e(m));
                                    if ((o = o.filter(function(e) {
                                            return e.offsetWidth || e.offsetHeight
                                        })).length) {
                                        var a = o.indexOf(n.target);
                                        38 === n.which && a > 0 && a--, 40 === n.which && a < o.length - 1 && a++, a < 0 && (a = 0), o[a].focus()
                                    }
                                }
                            }
                        }
                    }, {
                        key: "VERSION",
                        get: function() {
                            return "4.0.0-alpha.4"
                        }
                    }]), t
                }();
            e(document).on(a.KEYDOWN_DATA_API, d, p._dataApiKeydownHandler).on(a.KEYDOWN_DATA_API, _, p._dataApiKeydownHandler).on(a.KEYDOWN_DATA_API, g, p._dataApiKeydownHandler).on(a.CLICK_DATA_API, p._clearMenus).on(a.CLICK_DATA_API, d, p.prototype.toggle).on(a.CLICK_DATA_API, f, function(e) {
                e.stopPropagation()
            }), e.fn[t] = p._jQueryInterface, e.fn[t].Constructor = p, e.fn[t].noConflict = function() {
                return e.fn[t] = o, p._jQueryInterface
            }
        }(jQuery), function(e) {
            var t = "modal",
                r = ".bs.modal",
                o = e.fn.modal,
                a = {
                    backdrop: !0,
                    keyboard: !0,
                    focus: !0,
                    show: !0
                },
                l = {
                    backdrop: "(boolean|string)",
                    keyboard: "boolean",
                    focus: "boolean",
                    show: "boolean"
                },
                h = {
                    HIDE: "hide.bs.modal",
                    HIDDEN: "hidden.bs.modal",
                    SHOW: "show.bs.modal",
                    SHOWN: "shown.bs.modal",
                    FOCUSIN: "focusin.bs.modal",
                    RESIZE: "resize.bs.modal",
                    CLICK_DISMISS: "click.dismiss.bs.modal",
                    KEYDOWN_DISMISS: "keydown.dismiss.bs.modal",
                    MOUSEUP_DISMISS: "mouseup.dismiss.bs.modal",
                    MOUSEDOWN_DISMISS: "mousedown.dismiss.bs.modal",
                    CLICK_DATA_API: "click.bs.modal.data-api"
                },
                u = "modal-scrollbar-measure",
                c = "modal-backdrop",
                d = "modal-open",
                f = "fade",
                _ = "in",
                g = {
                    DIALOG: ".modal-dialog",
                    DATA_TOGGLE: '[data-toggle="modal"]',
                    DATA_DISMISS: '[data-dismiss="modal"]',
                    FIXED_CONTENT: ".navbar-fixed-top, .navbar-fixed-bottom, .is-fixed"
                },
                v = function() {
                    function o(t, n) {
                        i(this, o), this._config = this._getConfig(n), this._element = t, this._dialog = e(t).find(g.DIALOG)[0], this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._originalBodyPadding = 0, this._scrollbarWidth = 0
                    }
                    return n(o, [{
                        key: "toggle",
                        value: function(e) {
                            return this._isShown ? this.hide() : this.show(e)
                        }
                    }, {
                        key: "show",
                        value: function(t) {
                            var n = this,
                                i = e.Event(h.SHOW, {
                                    relatedTarget: t
                                });
                            e(this._element).trigger(i), this._isShown || i.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), e(document.body).addClass(d), this._setEscapeEvent(), this._setResizeEvent(), e(this._element).on(h.CLICK_DISMISS, g.DATA_DISMISS, e.proxy(this.hide, this)), e(this._dialog).on(h.MOUSEDOWN_DISMISS, function() {
                                e(n._element).one(h.MOUSEUP_DISMISS, function(t) {
                                    e(t.target).is(n._element) && (n._ignoreBackdropClick = !0)
                                })
                            }), this._showBackdrop(e.proxy(this._showElement, this, t)))
                        }
                    }, {
                        key: "hide",
                        value: function(t) {
                            t && t.preventDefault();
                            var n = e.Event(h.HIDE);
                            e(this._element).trigger(n), this._isShown && !n.isDefaultPrevented() && (this._isShown = !1, this._setEscapeEvent(), this._setResizeEvent(), e(document).off(h.FOCUSIN), e(this._element).removeClass(_), e(this._element).off(h.CLICK_DISMISS), e(this._dialog).off(h.MOUSEDOWN_DISMISS), s.supportsTransitionEnd() && e(this._element).hasClass(f) ? e(this._element).one(s.TRANSITION_END, e.proxy(this._hideModal, this)).emulateTransitionEnd(300) : this._hideModal())
                        }
                    }, {
                        key: "dispose",
                        value: function() {
                            e.removeData(this._element, "bs.modal"), e(window).off(r), e(document).off(r), e(this._element).off(r), e(this._backdrop).off(r), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._originalBodyPadding = null, this._scrollbarWidth = null
                        }
                    }, {
                        key: "_getConfig",
                        value: function(n) {
                            return n = e.extend({}, a, n), s.typeCheckConfig(t, n, l), n
                        }
                    }, {
                        key: "_showElement",
                        value: function(t) {
                            var n = this,
                                i = s.supportsTransitionEnd() && e(this._element).hasClass(f);
                            this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.scrollTop = 0, i && s.reflow(this._element), e(this._element).addClass(_), this._config.focus && this._enforceFocus();
                            var r = e.Event(h.SHOWN, {
                                    relatedTarget: t
                                }),
                                o = function() {
                                    n._config.focus && n._element.focus(), e(n._element).trigger(r)
                                };
                            i ? e(this._dialog).one(s.TRANSITION_END, o).emulateTransitionEnd(300) : o()
                        }
                    }, {
                        key: "_enforceFocus",
                        value: function() {
                            var t = this;
                            e(document).off(h.FOCUSIN).on(h.FOCUSIN, function(n) {
                                document === n.target || t._element === n.target || e(t._element).has(n.target).length || t._element.focus()
                            })
                        }
                    }, {
                        key: "_setEscapeEvent",
                        value: function() {
                            var t = this;
                            this._isShown && this._config.keyboard ? e(this._element).on(h.KEYDOWN_DISMISS, function(e) {
                                27 === e.which && t.hide()
                            }) : this._isShown || e(this._element).off(h.KEYDOWN_DISMISS)
                        }
                    }, {
                        key: "_setResizeEvent",
                        value: function() {
                            this._isShown ? e(window).on(h.RESIZE, e.proxy(this._handleUpdate, this)) : e(window).off(h.RESIZE)
                        }
                    }, {
                        key: "_hideModal",
                        value: function() {
                            var t = this;
                            this._element.style.display = "none", this._element.setAttribute("aria-hidden", "true"), this._showBackdrop(function() {
                                e(document.body).removeClass(d), t._resetAdjustments(), t._resetScrollbar(), e(t._element).trigger(h.HIDDEN)
                            })
                        }
                    }, {
                        key: "_removeBackdrop",
                        value: function() {
                            this._backdrop && (e(this._backdrop).remove(), this._backdrop = null)
                        }
                    }, {
                        key: "_showBackdrop",
                        value: function(t) {
                            var n = this,
                                i = e(this._element).hasClass(f) ? f : "";
                            if (this._isShown && this._config.backdrop) {
                                var r = s.supportsTransitionEnd() && i;
                                if (this._backdrop = document.createElement("div"), this._backdrop.className = c, i && e(this._backdrop).addClass(i), e(this._backdrop).appendTo(document.body), e(this._element).on(h.CLICK_DISMISS, function(e) {
                                        n._ignoreBackdropClick ? n._ignoreBackdropClick = !1 : e.target === e.currentTarget && ("static" === n._config.backdrop ? n._element.focus() : n.hide())
                                    }), r && s.reflow(this._backdrop), e(this._backdrop).addClass(_), !t) return;
                                if (!r) return void t();
                                e(this._backdrop).one(s.TRANSITION_END, t).emulateTransitionEnd(150)
                            } else if (!this._isShown && this._backdrop) {
                                e(this._backdrop).removeClass(_);
                                var o = function() {
                                    n._removeBackdrop(), t && t()
                                };
                                s.supportsTransitionEnd() && e(this._element).hasClass(f) ? e(this._backdrop).one(s.TRANSITION_END, o).emulateTransitionEnd(150) : o()
                            } else t && t()
                        }
                    }, {
                        key: "_handleUpdate",
                        value: function() {
                            this._adjustDialog()
                        }
                    }, {
                        key: "_adjustDialog",
                        value: function() {
                            var e = this._element.scrollHeight > document.documentElement.clientHeight;
                            !this._isBodyOverflowing && e && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !e && (this._element.style.paddingRight = this._scrollbarWidth + "px")
                        }
                    }, {
                        key: "_resetAdjustments",
                        value: function() {
                            this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
                        }
                    }, {
                        key: "_checkScrollbar",
                        value: function() {
                            this._isBodyOverflowing = document.body.clientWidth < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
                        }
                    }, {
                        key: "_setScrollbar",
                        value: function() {
                            var t = parseInt(e(g.FIXED_CONTENT).css("padding-right") || 0, 10);
                            this._originalBodyPadding = document.body.style.paddingRight || "", this._isBodyOverflowing && (document.body.style.paddingRight = t + this._scrollbarWidth + "px")
                        }
                    }, {
                        key: "_resetScrollbar",
                        value: function() {
                            document.body.style.paddingRight = this._originalBodyPadding
                        }
                    }, {
                        key: "_getScrollbarWidth",
                        value: function() {
                            var e = document.createElement("div");
                            e.className = u, document.body.appendChild(e);
                            var t = e.offsetWidth - e.clientWidth;
                            return document.body.removeChild(e), t
                        }
                    }], [{
                        key: "_jQueryInterface",
                        value: function(t, n) {
                            return this.each(function() {
                                var i = e(this).data("bs.modal"),
                                    s = e.extend({}, o.Default, e(this).data(), "object" == typeof t && t);
                                if (i || (i = new o(this, s), e(this).data("bs.modal", i)), "string" == typeof t) {
                                    if (void 0 === i[t]) throw new Error('No method named "' + t + '"');
                                    i[t](n)
                                } else s.show && i.show(n)
                            })
                        }
                    }, {
                        key: "VERSION",
                        get: function() {
                            return "4.0.0-alpha.4"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return a
                        }
                    }]), o
                }();
            e(document).on(h.CLICK_DATA_API, g.DATA_TOGGLE, function(t) {
                var n = this,
                    i = void 0,
                    r = s.getSelectorFromElement(this);
                r && (i = e(r)[0]);
                var o = e(i).data("bs.modal") ? "toggle" : e.extend({}, e(i).data(), e(this).data());
                "A" === this.tagName && t.preventDefault();
                var a = e(i).one(h.SHOW, function(t) {
                    t.isDefaultPrevented() || a.one(h.HIDDEN, function() {
                        e(n).is(":visible") && n.focus()
                    })
                });
                v._jQueryInterface.call(e(i), o, this)
            }), e.fn.modal = v._jQueryInterface, e.fn.modal.Constructor = v, e.fn.modal.noConflict = function() {
                return e.fn.modal = o, v._jQueryInterface
            }
        }(jQuery), function(e) {
            var t = "scrollspy",
                r = e.fn[t],
                o = {
                    offset: 10,
                    method: "auto",
                    target: ""
                },
                a = {
                    offset: "number",
                    method: "string",
                    target: "(string|element)"
                },
                l = {
                    ACTIVATE: "activate.bs.scrollspy",
                    SCROLL: "scroll.bs.scrollspy",
                    LOAD_DATA_API: "load.bs.scrollspy.data-api"
                },
                h = "dropdown-item",
                u = "active",
                c = {
                    DATA_SPY: '[data-spy="scroll"]',
                    ACTIVE: ".active",
                    LIST_ITEM: ".list-item",
                    LI: "li",
                    LI_DROPDOWN: "li.dropdown",
                    NAV_LINKS: ".nav-link",
                    DROPDOWN: ".dropdown",
                    DROPDOWN_ITEMS: ".dropdown-item",
                    DROPDOWN_TOGGLE: ".dropdown-toggle"
                },
                d = "offset",
                f = "position",
                _ = function() {
                    function r(t, n) {
                        i(this, r), this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(n), this._selector = this._config.target + " " + c.NAV_LINKS + "," + this._config.target + " " + c.DROPDOWN_ITEMS, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, e(this._scrollElement).on(l.SCROLL, e.proxy(this._process, this)), this.refresh(), this._process()
                    }
                    return n(r, [{
                        key: "refresh",
                        value: function() {
                            var t = this,
                                n = this._scrollElement !== this._scrollElement.window ? f : d,
                                i = "auto" === this._config.method ? n : this._config.method,
                                r = i === f ? this._getScrollTop() : 0;
                            this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), e.makeArray(e(this._selector)).map(function(t) {
                                var n = void 0,
                                    o = s.getSelectorFromElement(t);
                                return o && (n = e(o)[0]), n && (n.offsetWidth || n.offsetHeight) ? [e(n)[i]().top + r, o] : null
                            }).filter(function(e) {
                                return e
                            }).sort(function(e, t) {
                                return e[0] - t[0]
                            }).forEach(function(e) {
                                t._offsets.push(e[0]), t._targets.push(e[1])
                            })
                        }
                    }, {
                        key: "dispose",
                        value: function() {
                            e.removeData(this._element, "bs.scrollspy"), e(this._scrollElement).off(".bs.scrollspy"), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
                        }
                    }, {
                        key: "_getConfig",
                        value: function(n) {
                            if ("string" != typeof(n = e.extend({}, o, n)).target) {
                                var i = e(n.target).attr("id");
                                i || (i = s.getUID(t), e(n.target).attr("id", i)), n.target = "#" + i
                            }
                            return s.typeCheckConfig(t, n, a), n
                        }
                    }, {
                        key: "_getScrollTop",
                        value: function() {
                            return this._scrollElement === window ? this._scrollElement.scrollY : this._scrollElement.scrollTop
                        }
                    }, {
                        key: "_getScrollHeight",
                        value: function() {
                            return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                        }
                    }, {
                        key: "_process",
                        value: function() {
                            var e = this._getScrollTop() + this._config.offset,
                                t = this._getScrollHeight(),
                                n = this._config.offset + t - this._scrollElement.offsetHeight;
                            if (this._scrollHeight !== t && this.refresh(), e >= n) {
                                var i = this._targets[this._targets.length - 1];
                                this._activeTarget !== i && this._activate(i)
                            }
                            if (this._activeTarget && e < this._offsets[0]) return this._activeTarget = null, void this._clear();
                            for (var s = this._offsets.length; s--;) {
                                this._activeTarget !== this._targets[s] && e >= this._offsets[s] && (void 0 === this._offsets[s + 1] || e < this._offsets[s + 1]) && this._activate(this._targets[s])
                            }
                        }
                    }, {
                        key: "_activate",
                        value: function(t) {
                            this._activeTarget = t, this._clear();
                            var n = this._selector.split(",");
                            n = n.map(function(e) {
                                return e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]'
                            });
                            var i = e(n.join(","));
                            i.hasClass(h) ? (i.closest(c.DROPDOWN).find(c.DROPDOWN_TOGGLE).addClass(u), i.addClass(u)) : i.parents(c.LI).find(c.NAV_LINKS).addClass(u), e(this._scrollElement).trigger(l.ACTIVATE, {
                                relatedTarget: t
                            })
                        }
                    }, {
                        key: "_clear",
                        value: function() {
                            e(this._selector).filter(c.ACTIVE).removeClass(u)
                        }
                    }], [{
                        key: "_jQueryInterface",
                        value: function(t) {
                            return this.each(function() {
                                var n = e(this).data("bs.scrollspy");
                                if (n || (n = new r(this, "object" == typeof t && t || null), e(this).data("bs.scrollspy", n)), "string" == typeof t) {
                                    if (void 0 === n[t]) throw new Error('No method named "' + t + '"');
                                    n[t]()
                                }
                            })
                        }
                    }, {
                        key: "VERSION",
                        get: function() {
                            return "4.0.0-alpha.4"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return o
                        }
                    }]), r
                }();
            e(window).on(l.LOAD_DATA_API, function() {
                for (var t = e.makeArray(e(c.DATA_SPY)), n = t.length; n--;) {
                    var i = e(t[n]);
                    _._jQueryInterface.call(i, i.data())
                }
            }), e.fn[t] = _._jQueryInterface, e.fn[t].Constructor = _, e.fn[t].noConflict = function() {
                return e.fn[t] = r, _._jQueryInterface
            }
        }(jQuery), function(e) {
            var t = e.fn.tab,
                r = {
                    HIDE: "hide.bs.tab",
                    HIDDEN: "hidden.bs.tab",
                    SHOW: "show.bs.tab",
                    SHOWN: "shown.bs.tab",
                    CLICK_DATA_API: "click.bs.tab.data-api"
                },
                o = "dropdown-menu",
                a = "active",
                l = "fade",
                h = "in",
                u = ".dropdown",
                c = "ul:not(.dropdown-menu)",
                d = "> .nav-item .fade, > .fade",
                f = ".active",
                _ = "> .nav-item > .active, > .active",
                g = '[data-toggle="tab"], [data-toggle="pill"]',
                v = ".dropdown-toggle",
                m = "> .dropdown-menu .active",
                p = function() {
                    function t(e) {
                        i(this, t), this._element = e
                    }
                    return n(t, [{
                        key: "show",
                        value: function() {
                            var t = this;
                            if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE || !e(this._element).hasClass(a)) {
                                var n = void 0,
                                    i = void 0,
                                    o = e(this._element).closest(c)[0],
                                    l = s.getSelectorFromElement(this._element);
                                o && (i = (i = e.makeArray(e(o).find(f)))[i.length - 1]);
                                var h = e.Event(r.HIDE, {
                                        relatedTarget: this._element
                                    }),
                                    u = e.Event(r.SHOW, {
                                        relatedTarget: i
                                    });
                                if (i && e(i).trigger(h), e(this._element).trigger(u), !u.isDefaultPrevented() && !h.isDefaultPrevented()) {
                                    l && (n = e(l)[0]), this._activate(this._element, o);
                                    var d = function() {
                                        var n = e.Event(r.HIDDEN, {
                                                relatedTarget: t._element
                                            }),
                                            s = e.Event(r.SHOWN, {
                                                relatedTarget: i
                                            });
                                        e(i).trigger(n), e(t._element).trigger(s)
                                    };
                                    n ? this._activate(n, n.parentNode, d) : d()
                                }
                            }
                        }
                    }, {
                        key: "dispose",
                        value: function() {
                            e.removeClass(this._element, "bs.tab"), this._element = null
                        }
                    }, {
                        key: "_activate",
                        value: function(t, n, i) {
                            var r = e(n).find(_)[0],
                                o = i && s.supportsTransitionEnd() && (r && e(r).hasClass(l) || Boolean(e(n).find(d)[0])),
                                a = e.proxy(this._transitionComplete, this, t, r, o, i);
                            r && o ? e(r).one(s.TRANSITION_END, a).emulateTransitionEnd(150) : a(), r && e(r).removeClass(h)
                        }
                    }, {
                        key: "_transitionComplete",
                        value: function(t, n, i, r) {
                            if (n) {
                                e(n).removeClass(a);
                                var c = e(n).find(m)[0];
                                c && e(c).removeClass(a), n.setAttribute("aria-expanded", !1)
                            }
                            if (e(t).addClass(a), t.setAttribute("aria-expanded", !0), i ? (s.reflow(t), e(t).addClass(h)) : e(t).removeClass(l), t.parentNode && e(t.parentNode).hasClass(o)) {
                                var d = e(t).closest(u)[0];
                                d && e(d).find(v).addClass(a), t.setAttribute("aria-expanded", !0)
                            }
                            r && r()
                        }
                    }], [{
                        key: "_jQueryInterface",
                        value: function(n) {
                            return this.each(function() {
                                var i = e(this),
                                    s = i.data("bs.tab");
                                if (s || (s = s = new t(this), i.data("bs.tab", s)), "string" == typeof n) {
                                    if (void 0 === s[n]) throw new Error('No method named "' + n + '"');
                                    s[n]()
                                }
                            })
                        }
                    }, {
                        key: "VERSION",
                        get: function() {
                            return "4.0.0-alpha.4"
                        }
                    }]), t
                }();
            e(document).on(r.CLICK_DATA_API, g, function(t) {
                t.preventDefault(), p._jQueryInterface.call(e(this), "show")
            }), e.fn.tab = p._jQueryInterface, e.fn.tab.Constructor = p, e.fn.tab.noConflict = function() {
                return e.fn.tab = t, p._jQueryInterface
            }
        }(jQuery), function(e) {
            if (void 0 === window.Tether) throw new Error("Bootstrap tooltips require Tether (http://github.hubspot.com/tether/)");
            var t = "tooltip",
                r = ".bs.tooltip",
                o = e.fn[t],
                a = {
                    animation: !0,
                    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
                    trigger: "hover focus",
                    title: "",
                    delay: 0,
                    html: !1,
                    selector: !1,
                    placement: "top",
                    offset: "0 0",
                    constraints: []
                },
                l = {
                    animation: "boolean",
                    template: "string",
                    title: "(string|element|function)",
                    trigger: "string",
                    delay: "(number|object)",
                    html: "boolean",
                    selector: "(string|boolean)",
                    placement: "(string|function)",
                    offset: "string",
                    constraints: "array"
                },
                h = {
                    TOP: "bottom center",
                    RIGHT: "middle left",
                    BOTTOM: "top center",
                    LEFT: "middle right"
                },
                u = "in",
                c = "out",
                d = {
                    HIDE: "hide" + r,
                    HIDDEN: "hidden" + r,
                    SHOW: "show" + r,
                    SHOWN: "shown" + r,
                    INSERTED: "inserted" + r,
                    CLICK: "click" + r,
                    FOCUSIN: "focusin" + r,
                    FOCUSOUT: "focusout" + r,
                    MOUSEENTER: "mouseenter" + r,
                    MOUSELEAVE: "mouseleave" + r
                },
                f = "fade",
                _ = "in",
                g = ".tooltip-inner",
                v = {
                    element: !1,
                    enabled: !1
                },
                m = "hover",
                p = "focus",
                y = "manual",
                E = function() {
                    function o(e, t) {
                        i(this, o), this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._tether = null, this.element = e, this.config = this._getConfig(t), this.tip = null, this._setListeners()
                    }
                    return n(o, [{
                        key: "enable",
                        value: function() {
                            this._isEnabled = !0
                        }
                    }, {
                        key: "disable",
                        value: function() {
                            this._isEnabled = !1
                        }
                    }, {
                        key: "toggleEnabled",
                        value: function() {
                            this._isEnabled = !this._isEnabled
                        }
                    }, {
                        key: "toggle",
                        value: function(t) {
                            if (t) {
                                var n = this.constructor.DATA_KEY,
                                    i = e(t.currentTarget).data(n);
                                i || (i = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(n, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i)
                            } else {
                                if (e(this.getTipElement()).hasClass(_)) return void this._leave(null, this);
                                this._enter(null, this)
                            }
                        }
                    }, {
                        key: "dispose",
                        value: function() {
                            clearTimeout(this._timeout), this.cleanupTether(), e.removeData(this.element, this.constructor.DATA_KEY), e(this.element).off(this.constructor.EVENT_KEY), this.tip && e(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, this._tether = null, this.element = null, this.config = null, this.tip = null
                        }
                    }, {
                        key: "show",
                        value: function() {
                            var t = this,
                                n = e.Event(this.constructor.Event.SHOW);
                            if (this.isWithContent() && this._isEnabled) {
                                e(this.element).trigger(n);
                                var i = e.contains(this.element.ownerDocument.documentElement, this.element);
                                if (n.isDefaultPrevented() || !i) return;
                                var r = this.getTipElement(),
                                    a = s.getUID(this.constructor.NAME);
                                r.setAttribute("id", a), this.element.setAttribute("aria-describedby", a), this.setContent(), this.config.animation && e(r).addClass(f);
                                var l = "function" == typeof this.config.placement ? this.config.placement.call(this, r, this.element) : this.config.placement,
                                    h = this._getAttachment(l);
                                e(r).data(this.constructor.DATA_KEY, this).appendTo(document.body), e(this.element).trigger(this.constructor.Event.INSERTED), this._tether = new Tether({
                                    attachment: h,
                                    element: r,
                                    target: this.element,
                                    classes: v,
                                    classPrefix: "bs-tether",
                                    offset: this.config.offset,
                                    constraints: this.config.constraints,
                                    addTargetClasses: !1
                                }), s.reflow(r), this._tether.position(), e(r).addClass(_);
                                var u = function() {
                                    var n = t._hoverState;
                                    t._hoverState = null, e(t.element).trigger(t.constructor.Event.SHOWN), n === c && t._leave(null, t)
                                };
                                if (s.supportsTransitionEnd() && e(this.tip).hasClass(f)) return void e(this.tip).one(s.TRANSITION_END, u).emulateTransitionEnd(o._TRANSITION_DURATION);
                                u()
                            }
                        }
                    }, {
                        key: "hide",
                        value: function(t) {
                            var n = this,
                                i = this.getTipElement(),
                                r = e.Event(this.constructor.Event.HIDE),
                                o = function() {
                                    n._hoverState !== u && i.parentNode && i.parentNode.removeChild(i), n.element.removeAttribute("aria-describedby"), e(n.element).trigger(n.constructor.Event.HIDDEN), n.cleanupTether(), t && t()
                                };
                            e(this.element).trigger(r), r.isDefaultPrevented() || (e(i).removeClass(_), s.supportsTransitionEnd() && e(this.tip).hasClass(f) ? e(i).one(s.TRANSITION_END, o).emulateTransitionEnd(150) : o(), this._hoverState = "")
                        }
                    }, {
                        key: "isWithContent",
                        value: function() {
                            return Boolean(this.getTitle())
                        }
                    }, {
                        key: "getTipElement",
                        value: function() {
                            return this.tip = this.tip || e(this.config.template)[0]
                        }
                    }, {
                        key: "setContent",
                        value: function() {
                            var t = e(this.getTipElement());
                            this.setElementContent(t.find(g), this.getTitle()), t.removeClass(f).removeClass(_), this.cleanupTether()
                        }
                    }, {
                        key: "setElementContent",
                        value: function(t, n) {
                            var i = this.config.html;
                            "object" == typeof n && (n.nodeType || n.jquery) ? i ? e(n).parent().is(t) || t.empty().append(n) : t.text(e(n).text()) : t[i ? "html" : "text"](n)
                        }
                    }, {
                        key: "getTitle",
                        value: function() {
                            var e = this.element.getAttribute("data-original-title");
                            return e || (e = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), e
                        }
                    }, {
                        key: "cleanupTether",
                        value: function() {
                            this._tether && this._tether.destroy()
                        }
                    }, {
                        key: "_getAttachment",
                        value: function(e) {
                            return h[e.toUpperCase()]
                        }
                    }, {
                        key: "_setListeners",
                        value: function() {
                            var t = this;
                            this.config.trigger.split(" ").forEach(function(n) {
                                if ("click" === n) e(t.element).on(t.constructor.Event.CLICK, t.config.selector, e.proxy(t.toggle, t));
                                else if (n !== y) {
                                    var i = n === m ? t.constructor.Event.MOUSEENTER : t.constructor.Event.FOCUSIN,
                                        s = n === m ? t.constructor.Event.MOUSELEAVE : t.constructor.Event.FOCUSOUT;
                                    e(t.element).on(i, t.config.selector, e.proxy(t._enter, t)).on(s, t.config.selector, e.proxy(t._leave, t))
                                }
                            }), this.config.selector ? this.config = e.extend({}, this.config, {
                                trigger: "manual",
                                selector: ""
                            }) : this._fixTitle()
                        }
                    }, {
                        key: "_fixTitle",
                        value: function() {
                            var e = typeof this.element.getAttribute("data-original-title");
                            (this.element.getAttribute("title") || "string" !== e) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
                        }
                    }, {
                        key: "_enter",
                        value: function(t, n) {
                            var i = this.constructor.DATA_KEY;
                            (n = n || e(t.currentTarget).data(i)) || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(i, n)), t && (n._activeTrigger["focusin" === t.type ? p : m] = !0), e(n.getTipElement()).hasClass(_) || n._hoverState === u ? n._hoverState = u : (clearTimeout(n._timeout), n._hoverState = u, n.config.delay && n.config.delay.show ? n._timeout = setTimeout(function() {
                                n._hoverState === u && n.show()
                            }, n.config.delay.show) : n.show())
                        }
                    }, {
                        key: "_leave",
                        value: function(t, n) {
                            var i = this.constructor.DATA_KEY;
                            (n = n || e(t.currentTarget).data(i)) || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(i, n)), t && (n._activeTrigger["focusout" === t.type ? p : m] = !1), n._isWithActiveTrigger() || (clearTimeout(n._timeout), n._hoverState = c, n.config.delay && n.config.delay.hide ? n._timeout = setTimeout(function() {
                                n._hoverState === c && n.hide()
                            }, n.config.delay.hide) : n.hide())
                        }
                    }, {
                        key: "_isWithActiveTrigger",
                        value: function() {
                            for (var e in this._activeTrigger)
                                if (this._activeTrigger[e]) return !0;
                            return !1
                        }
                    }, {
                        key: "_getConfig",
                        value: function(n) {
                            return (n = e.extend({}, this.constructor.Default, e(this.element).data(), n)).delay && "number" == typeof n.delay && (n.delay = {
                                show: n.delay,
                                hide: n.delay
                            }), s.typeCheckConfig(t, n, this.constructor.DefaultType), n
                        }
                    }, {
                        key: "_getDelegateConfig",
                        value: function() {
                            var e = {};
                            if (this.config)
                                for (var t in this.config) this.constructor.Default[t] !== this.config[t] && (e[t] = this.config[t]);
                            return e
                        }
                    }], [{
                        key: "_jQueryInterface",
                        value: function(t) {
                            return this.each(function() {
                                var n = e(this).data("bs.tooltip"),
                                    i = "object" == typeof t ? t : null;
                                if ((n || !/destroy|hide/.test(t)) && (n || (n = new o(this, i), e(this).data("bs.tooltip", n)), "string" == typeof t)) {
                                    if (void 0 === n[t]) throw new Error('No method named "' + t + '"');
                                    n[t]()
                                }
                            })
                        }
                    }, {
                        key: "VERSION",
                        get: function() {
                            return "4.0.0-alpha.4"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return a
                        }
                    }, {
                        key: "NAME",
                        get: function() {
                            return t
                        }
                    }, {
                        key: "DATA_KEY",
                        get: function() {
                            return "bs.tooltip"
                        }
                    }, {
                        key: "Event",
                        get: function() {
                            return d
                        }
                    }, {
                        key: "EVENT_KEY",
                        get: function() {
                            return r
                        }
                    }, {
                        key: "DefaultType",
                        get: function() {
                            return l
                        }
                    }]), o
                }();
            return e.fn[t] = E._jQueryInterface, e.fn[t].Constructor = E, e.fn[t].noConflict = function() {
                return e.fn[t] = o, E._jQueryInterface
            }, E
        }(jQuery));
    ! function(e) {
        var s = "popover",
            o = ".bs.popover",
            a = e.fn[s],
            l = e.extend({}, r.Default, {
                placement: "right",
                trigger: "click",
                content: "",
                template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
            }),
            h = e.extend({}, r.DefaultType, {
                content: "(string|element|function)"
            }),
            u = "fade",
            c = "in",
            d = ".popover-title",
            f = ".popover-content",
            _ = {
                HIDE: "hide" + o,
                HIDDEN: "hidden" + o,
                SHOW: "show" + o,
                SHOWN: "shown" + o,
                INSERTED: "inserted" + o,
                CLICK: "click" + o,
                FOCUSIN: "focusin" + o,
                FOCUSOUT: "focusout" + o,
                MOUSEENTER: "mouseenter" + o,
                MOUSELEAVE: "mouseleave" + o
            },
            g = function(a) {
                function g() {
                    i(this, g), t(Object.getPrototypeOf(g.prototype), "constructor", this).apply(this, arguments)
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(g, r), n(g, [{
                    key: "isWithContent",
                    value: function() {
                        return this.getTitle() || this._getContent()
                    }
                }, {
                    key: "getTipElement",
                    value: function() {
                        return this.tip = this.tip || e(this.config.template)[0]
                    }
                }, {
                    key: "setContent",
                    value: function() {
                        var t = e(this.getTipElement());
                        this.setElementContent(t.find(d), this.getTitle()), this.setElementContent(t.find(f), this._getContent()), t.removeClass(u).removeClass(c), this.cleanupTether()
                    }
                }, {
                    key: "_getContent",
                    value: function() {
                        return this.element.getAttribute("data-content") || ("function" == typeof this.config.content ? this.config.content.call(this.element) : this.config.content)
                    }
                }], [{
                    key: "_jQueryInterface",
                    value: function(t) {
                        return this.each(function() {
                            var n = e(this).data("bs.popover"),
                                i = "object" == typeof t ? t : null;
                            if ((n || !/destroy|hide/.test(t)) && (n || (n = new g(this, i), e(this).data("bs.popover", n)), "string" == typeof t)) {
                                if (void 0 === n[t]) throw new Error('No method named "' + t + '"');
                                n[t]()
                            }
                        })
                    }
                }, {
                    key: "VERSION",
                    get: function() {
                        return "4.0.0-alpha.4"
                    }
                }, {
                    key: "Default",
                    get: function() {
                        return l
                    }
                }, {
                    key: "NAME",
                    get: function() {
                        return s
                    }
                }, {
                    key: "DATA_KEY",
                    get: function() {
                        return "bs.popover"
                    }
                }, {
                    key: "Event",
                    get: function() {
                        return _
                    }
                }, {
                    key: "EVENT_KEY",
                    get: function() {
                        return o
                    }
                }, {
                    key: "DefaultType",
                    get: function() {
                        return h
                    }
                }]), g
            }();
        e.fn[s] = g._jQueryInterface, e.fn[s].Constructor = g, e.fn[s].noConflict = function() {
            return e.fn[s] = a, g._jQueryInterface
        }
    }(jQuery)
}(jQuery);
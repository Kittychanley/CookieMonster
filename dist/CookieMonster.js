/*! For license information please see CookieMonster.js.LICENSE.txt */
(() => {
    var e = {
        877: function (e) {
            !function (t, o) {
                "use strict";
                "object" != typeof e.exports ? o(t) : e.exports = t.document ? o(t) : function (e) {
                    if (!e.document)
                        throw new Error("jscolor needs a window with document");
                    return o(e)
                }
            }
            ("undefined" != typeof window ? window : this, (function (e) {
                    "use strict";
                    var t,
                    o,
                    n,
                    a,
                    i = (a = {
                            initialized: !1,
                            instances: [],
                            readyQueue: [],
                            register: function () {
                                void 0 !== e && e.document && e.document.addEventListener("DOMContentLoaded", a.pub.init, !1)
                            },
                            installBySelector: function (t, o) {
                                if (!(o = o ? a.node(o) : e.document))
                                    throw new Error("Missing root node");
                                for (var n = o.querySelectorAll(t), i = new RegExp("(^|\\s)(" + a.pub.lookupClass + ")(\\s*(\\{[^}]*\\})|\\s|$)", "i"), r = 0; r < n.length; r += 1) {
                                    var s,
                                    l;
                                    if (!(n[r].jscolor && n[r].jscolor instanceof a.pub) && (void 0 === n[r].type || "color" != n[r].type.toLowerCase() || !a.isColorAttrSupported) && (null !== (s = a.getDataAttr(n[r], "jscolor")) || n[r].className && (l = n[r].className.match(i)))) {
                                        var c = n[r],
                                        d = "";
                                        null !== s ? d = s : l && (console.warn('Installation using class name is DEPRECATED. Use data-jscolor="" attribute instead.' + a.docsRef), l[4] && (d = l[4]));
                                        var m = null;
                                        if (d.trim())
                                            try {
                                                m = a.parseOptionsStr(d)
                                            } catch (e) {
                                                console.warn(e + "\n" + d)
                                            }
                                        try {
                                            new a.pub(c, m)
                                        } catch (e) {
                                            console.warn(e)
                                        }
                                    }
                                }
                            },
                            parseOptionsStr: function (e) {
                                var t = null;
                                try {
                                    t = JSON.parse(e)
                                } catch (o) {
                                    if (!a.pub.looseJSON)
                                        throw new Error("Could not parse jscolor options as JSON: " + o);
                                    try {
                                        t = new Function("var opts = (" + e + '); return typeof opts === "object" ? opts : {};')()
                                    } catch (e) {
                                        throw new Error("Could not evaluate jscolor options: " + e)
                                    }
                                }
                                return t
                            },
                            getInstances: function () {
                                for (var e = [], t = 0; t < a.instances.length; t += 1)
                                    a.instances[t] && a.instances[t].targetElement && e.push(a.instances[t]);
                                return e
                            },
                            createEl: function (t) {
                                var o = e.document.createElement(t);
                                return a.setData(o, "gui", !0),
                                o
                            },
                            node: function (t) {
                                if (!t)
                                    return null;
                                if ("string" == typeof t) {
                                    var o = t,
                                    n = null;
                                    try {
                                        n = e.document.querySelector(o)
                                    } catch (e) {
                                        return console.warn(e),
                                        null
                                    }
                                    return n || console.warn("No element matches the selector: %s", o),
                                    n
                                }
                                return a.isNode(t) ? t : (console.warn("Invalid node of type %s: %s", typeof t, t), null)
                            },
                            isNode: function (e) {
                                return "object" == typeof Node ? e instanceof Node : e && "object" == typeof e && "number" == typeof e.nodeType && "string" == typeof e.nodeName
                            },
                            nodeName: function (e) {
                                return !(!e || !e.nodeName) && e.nodeName.toLowerCase()
                            },
                            removeChildren: function (e) {
                                for (; e.firstChild; )
                                    e.removeChild(e.firstChild)
                            },
                            isTextInput: function (e) {
                                return e && "input" === a.nodeName(e) && "text" === e.type.toLowerCase()
                            },
                            isButton: function (e) {
                                if (!e)
                                    return !1;
                                var t = a.nodeName(e);
                                return "button" === t || "input" === t && ["button", "submit", "reset"].indexOf(e.type.toLowerCase()) > -1
                            },
                            isButtonEmpty: function (e) {
                                switch (a.nodeName(e)) {
                                case "input":
                                    return !e.value || "" === e.value.trim();
                                case "button":
                                    return "" === e.textContent.trim()
                                }
                                return null
                            },
                            isPassiveEventSupported: function () {
                                var t = !1;
                                try {
                                    var o = Object.defineProperty({}, "passive", {
                                        get: function () {
                                            t = !0
                                        }
                                    });
                                    e.addEventListener("testPassive", null, o),
                                    e.removeEventListener("testPassive", null, o)
                                } catch (e) {}
                                return t
                            }
                            (),
                            isColorAttrSupported: (n = e.document.createElement("input"), !(!n.setAttribute || (n.setAttribute("type", "color"), "color" != n.type.toLowerCase()))),
                            dataProp: "_data_jscolor",
                            setData: function () {
                                var e = arguments[0];
                                if (3 === arguments.length) {
                                    var t = e.hasOwnProperty(a.dataProp) ? e[a.dataProp] : e[a.dataProp] = {},
                                    o = arguments[2];
                                    return t[i = arguments[1]] = o,
                                    !0
                                }
                                if (2 === arguments.length && "object" == typeof arguments[1]) {
                                    t = e.hasOwnProperty(a.dataProp) ? e[a.dataProp] : e[a.dataProp] = {};
                                    var n = arguments[1];
                                    for (var i in n)
                                        n.hasOwnProperty(i) && (t[i] = n[i]);
                                    return !0
                                }
                                throw new Error("Invalid arguments")
                            },
                            removeData: function () {
                                var e = arguments[0];
                                if (!e.hasOwnProperty(a.dataProp))
                                    return !0;
                                for (var t = 1; t < arguments.length; t += 1) {
                                    var o = arguments[t];
                                    delete e[a.dataProp][o]
                                }
                                return !0
                            },
                            getData: function (e, t, o) {
                                if (!e.hasOwnProperty(a.dataProp)) {
                                    if (void 0 === o)
                                        return;
                                    e[a.dataProp] = {}
                                }
                                var n = e[a.dataProp];
                                return n.hasOwnProperty(t) || void 0 === o || (n[t] = o),
                                n[t]
                            },
                            getDataAttr: function (e, t) {
                                var o = "data-" + t;
                                return e.getAttribute(o)
                            },
                            setDataAttr: function (e, t, o) {
                                var n = "data-" + t;
                                e.setAttribute(n, o)
                            },
                            _attachedGroupEvents: {},
                            attachGroupEvent: function (e, t, o, n) {
                                a._attachedGroupEvents.hasOwnProperty(e) || (a._attachedGroupEvents[e] = []),
                                a._attachedGroupEvents[e].push([t, o, n]),
                                t.addEventListener(o, n, !1)
                            },
                            detachGroupEvents: function (e) {
                                if (a._attachedGroupEvents.hasOwnProperty(e)) {
                                    for (var t = 0; t < a._attachedGroupEvents[e].length; t += 1) {
                                        var o = a._attachedGroupEvents[e][t];
                                        o[0].removeEventListener(o[1], o[2], !1)
                                    }
                                    delete a._attachedGroupEvents[e]
                                }
                            },
                            preventDefault: function (e) {
                                e.preventDefault && e.preventDefault(),
                                e.returnValue = !1
                            },
                            captureTarget: function (e) {
                                e.setCapture && (a._capturedTarget = e, a._capturedTarget.setCapture())
                            },
                            releaseTarget: function () {
                                a._capturedTarget && (a._capturedTarget.releaseCapture(), a._capturedTarget = null)
                            },
                            triggerEvent: function (t, o, n, i) {
                                if (t) {
                                    var r = null;
                                    return "function" == typeof Event ? r = new Event(o, {
                                        bubbles: n,
                                        cancelable: i
                                    }) : (r = e.document.createEvent("Event")).initEvent(o, n, i),
                                    !!r && (a.setData(r, "internal", !0), t.dispatchEvent(r), !0)
                                }
                            },
                            triggerInputEvent: function (e, t, o, n) {
                                e && a.isTextInput(e) && a.triggerEvent(e, t, o, n)
                            },
                            eventKey: function (e) {
                                var t = {
                                    9: "Tab",
                                    13: "Enter",
                                    27: "Escape"
                                };
                                return "string" == typeof e.code ? e.code : void 0 !== e.keyCode && t.hasOwnProperty(e.keyCode) ? t[e.keyCode] : null
                            },
                            strList: function (e) {
                                return e ? e.replace(/^\s+|\s+$/g, "").split(/\s+/) : []
                            },
                            hasClass: function (e, t) {
                                return !!t && (void 0 !== e.classList ? e.classList.contains(t) : -1 != (" " + e.className.replace(/\s+/g, " ") + " ").indexOf(" " + t + " "))
                            },
                            addClass: function (e, t) {
                                var o = a.strList(t);
                                if (void 0 === e.classList)
                                    for (n = 0; n < o.length; n += 1)
                                        a.hasClass(e, o[n]) || (e.className += (e.className ? " " : "") + o[n]);
                                else
                                    for (var n = 0; n < o.length; n += 1)
                                        e.classList.add(o[n])
                            },
                            removeClass: function (e, t) {
                                var o = a.strList(t);
                                if (void 0 === e.classList)
                                    for (i = 0; i < o.length; i += 1) {
                                        var n = new RegExp("^\\s*" + o[i] + "\\s*|\\s*" + o[i] + "\\s*$|\\s+" + o[i] + "(\\s+)", "g");
                                        e.className = e.className.replace(n, "$1")
                                    }
                                else
                                    for (var i = 0; i < o.length; i += 1)
                                        e.classList.remove(o[i])
                            },
                            getCompStyle: function (t) {
                                return (e.getComputedStyle ? e.getComputedStyle(t) : t.currentStyle) || {}
                            },
                            setStyle: function (e, t, o, n) {
                                var i = o ? "important" : "",
                                r = null;
                                for (var s in t)
                                    if (t.hasOwnProperty(s)) {
                                        var l = null;
                                        null === t[s] ? (r || (r = a.getData(e, "origStyle")), r && r.hasOwnProperty(s) && (l = r[s])) : (n && (r || (r = a.getData(e, "origStyle", {})), r.hasOwnProperty(s) || (r[s] = e.style[s])), l = t[s]),
                                        null !== l && e.style.setProperty(s, l, i)
                                    }
                            },
                            hexColor: function (e, t, o) {
                                return "#" + (("0" + Math.round(e).toString(16)).substr(-2) + ("0" + Math.round(t).toString(16)).substr(-2) + ("0" + Math.round(o).toString(16)).substr(-2)).toUpperCase()
                            },
                            hexaColor: function (e, t, o, n) {
                                return "#" + (("0" + Math.round(e).toString(16)).substr(-2) + ("0" + Math.round(t).toString(16)).substr(-2) + ("0" + Math.round(o).toString(16)).substr(-2) + ("0" + Math.round(255 * n).toString(16)).substr(-2)).toUpperCase()
                            },
                            rgbColor: function (e, t, o) {
                                return "rgb(" + Math.round(e) + "," + Math.round(t) + "," + Math.round(o) + ")"
                            },
                            rgbaColor: function (e, t, o, n) {
                                return "rgba(" + Math.round(e) + "," + Math.round(t) + "," + Math.round(o) + "," + Math.round(100 * (null == n ? 1 : n)) / 100 + ")"
                            },
                            linearGradient: (o = function () {
                                for (var t = "linear-gradient", o = ["", "-webkit-", "-moz-", "-o-", "-ms-"], n = e.document.createElement("div"), a = 0; a < o.length; a += 1) {
                                    var i = o[a] + t,
                                    r = i + "(to right, rgba(0,0,0,0), rgba(0,0,0,0))";
                                    if (n.style.background = r, n.style.background)
                                        return i
                                }
                                return t
                            }
                                (), function () {
                                return o + "(" + Array.prototype.join.call(arguments, ", ") + ")"
                            }),
                            setBorderRadius: function (e, t) {
                                a.setStyle(e, {
                                    "border-radius": t || "0"
                                })
                            },
                            setBoxShadow: function (e, t) {
                                a.setStyle(e, {
                                    "box-shadow": t || "none"
                                })
                            },
                            getElementPos: function (e, t) {
                                var o = 0,
                                n = 0,
                                i = e.getBoundingClientRect();
                                if (o = i.left, n = i.top, !t) {
                                    var r = a.getViewPos();
                                    o += r[0],
                                    n += r[1]
                                }
                                return [o, n]
                            },
                            getElementSize: function (e) {
                                return [e.offsetWidth, e.offsetHeight]
                            },
                            getAbsPointerPos: function (e) {
                                var t = 0,
                                o = 0;
                                return void 0 !== e.changedTouches && e.changedTouches.length ? (t = e.changedTouches[0].clientX, o = e.changedTouches[0].clientY) : "number" == typeof e.clientX && (t = e.clientX, o = e.clientY), {
                                    x: t,
                                    y: o
                                }
                            },
                            getRelPointerPos: function (e) {
                                var t = (e.target || e.srcElement).getBoundingClientRect(),
                                o = 0,
                                n = 0;
                                return void 0 !== e.changedTouches && e.changedTouches.length ? (o = e.changedTouches[0].clientX, n = e.changedTouches[0].clientY) : "number" == typeof e.clientX && (o = e.clientX, n = e.clientY), {
                                    x: o - t.left,
                                    y: n - t.top
                                }
                            },
                            getViewPos: function () {
                                var t = e.document.documentElement;
                                return [(e.pageXOffset || t.scrollLeft) - (t.clientLeft || 0), (e.pageYOffset || t.scrollTop) - (t.clientTop || 0)]
                            },
                            getViewSize: function () {
                                var t = e.document.documentElement;
                                return [e.innerWidth || t.clientWidth, e.innerHeight || t.clientHeight]
                            },
                            RGB_HSV: function (e, t, o) {
                                e /= 255,
                                t /= 255,
                                o /= 255;
                                var n = Math.min(Math.min(e, t), o),
                                a = Math.max(Math.max(e, t), o),
                                i = a - n;
                                if (0 === i)
                                    return [null, 0, 100 * a];
                                var r = e === n ? 3 + (o - t) / i : t === n ? 5 + (e - o) / i : 1 + (t - e) / i;
                                return [60 * (6 === r ? 0 : r), i / a * 100, 100 * a]
                            },
                            HSV_RGB: function (e, t, o) {
                                var n = o / 100 * 255;
                                if (null === e)
                                    return [n, n, n];
                                e /= 60,
                                t /= 100;
                                var a = Math.floor(e),
                                i = n * (1 - t),
                                r = n * (1 - t * (a % 2 ? e - a : 1 - (e - a)));
                                switch (a) {
                                case 6:
                                case 0:
                                    return [n, r, i];
                                case 1:
                                    return [r, n, i];
                                case 2:
                                    return [i, n, r];
                                case 3:
                                    return [i, r, n];
                                case 4:
                                    return [r, i, n];
                                case 5:
                                    return [n, i, r]
                                }
                            },
                            parseColorString: function (e) {
                                var t,
                                o = {
                                    rgba: null,
                                    format: null
                                };
                                if (t = e.match(/^\W*([0-9A-F]{3,8})\W*$/i)) {
                                    if (8 === t[1].length)
                                        o.format = "hexa", o.rgba = [parseInt(t[1].substr(0, 2), 16), parseInt(t[1].substr(2, 2), 16), parseInt(t[1].substr(4, 2), 16), parseInt(t[1].substr(6, 2), 16) / 255];
                                    else if (6 === t[1].length)
                                        o.format = "hex", o.rgba = [parseInt(t[1].substr(0, 2), 16), parseInt(t[1].substr(2, 2), 16), parseInt(t[1].substr(4, 2), 16), null];
                                    else {
                                        if (3 !== t[1].length)
                                            return !1;
                                        o.format = "hex",
                                        o.rgba = [parseInt(t[1].charAt(0) + t[1].charAt(0), 16), parseInt(t[1].charAt(1) + t[1].charAt(1), 16), parseInt(t[1].charAt(2) + t[1].charAt(2), 16), null]
                                    }
                                    return o
                                }
                                if (t = e.match(/^\W*rgba?\(([^)]*)\)\W*$/i)) {
                                    var n,
                                    a,
                                    i,
                                    r,
                                    s = t[1].split(","),
                                    l = /^\s*(\d+|\d*\.\d+|\d+\.\d*)\s*$/;
                                    if (s.length >= 3 && (n = s[0].match(l)) && (a = s[1].match(l)) && (i = s[2].match(l)))
                                        return o.format = "rgb", o.rgba = [parseFloat(n[1]) || 0, parseFloat(a[1]) || 0, parseFloat(i[1]) || 0, null], s.length >= 4 && (r = s[3].match(l)) && (o.format = "rgba", o.rgba[3] = parseFloat(r[1]) || 0), o
                                }
                                return !1
                            },
                            parsePaletteValue: function (e) {
                                var t = [];
                                "string" == typeof e ? e.replace(/#[0-9A-F]{3}([0-9A-F]{3})?|rgba?\(([^)]*)\)/gi, (function (e) {
                                        t.push(e)
                                    })) : Array.isArray(e) && (t = e);
                                for (var o = [], n = 0; n < t.length; n++) {
                                    var i = a.parseColorString(t[n]);
                                    i && o.push(i)
                                }
                                return o
                            },
                            containsTranparentColor: function (e) {
                                for (var t = 0; t < e.length; t++) {
                                    var o = e[t].rgba[3];
                                    if (null !== o && o < 1)
                                        return !0
                                }
                                return !1
                            },
                            isAlphaFormat: function (e) {
                                switch (e.toLowerCase()) {
                                case "hexa":
                                case "rgba":
                                    return !0
                                }
                                return !1
                            },
                            scaleCanvasForHighDPR: function (t) {
                                var o = e.devicePixelRatio || 1;
                                t.width *= o,
                                t.height *= o,
                                t.getContext("2d").scale(o, o)
                            },
                            genColorPreviewCanvas: function (e, t, o, n) {
                                var i = Math.round(a.pub.previewSeparator.length),
                                r = a.pub.chessboardSize,
                                s = a.pub.chessboardColor1,
                                l = a.pub.chessboardColor2,
                                c = o || 2 * r,
                                d = 2 * r,
                                m = a.createEl("canvas"),
                                p = m.getContext("2d");
                                m.width = c,
                                m.height = d,
                                n && a.scaleCanvasForHighDPR(m),
                                p.fillStyle = s,
                                p.fillRect(0, 0, c, d),
                                p.fillStyle = l;
                                for (var u = 0; u < c; u += 2 * r)
                                    p.fillRect(u, 0, r, r), p.fillRect(u + r, r, r, r);
                                e && (p.fillStyle = e, p.fillRect(0, 0, c, d));
                                var h = null;
                                switch (t) {
                                case "left":
                                    h = 0,
                                    p.clearRect(0, 0, i / 2, d);
                                    break;
                                case "right":
                                    h = c - i,
                                    p.clearRect(c - i / 2, 0, i / 2, d)
                                }
                                if (null !== h) {
                                    p.lineWidth = 1;
                                    for (var g = 0; g < a.pub.previewSeparator.length; g += 1)
                                        p.beginPath(), p.strokeStyle = a.pub.previewSeparator[g], p.moveTo(.5 + h + g, 0), p.lineTo(.5 + h + g, d), p.stroke()
                                }
                                return {
                                    canvas: m,
                                    width: c,
                                    height: d
                                }
                            },
                            genColorPreviewGradient: function (e, t, o) {
                                var n;
                                return n = t && o ? ["to " + {
                                            left: "right",
                                            right: "left"
                                        }
                                        [t], e + " 0%", e + " " + o + "px", "rgba(0,0,0,0) " + (o + 1) + "px", "rgba(0,0,0,0) 100%"] : ["to right", e + " 0%", e + " 100%"],
                                a.linearGradient.apply(this, n)
                            },
                            redrawPosition: function () {
                                if (a.picker && a.picker.owner) {
                                    var e,
                                    t,
                                    o = a.picker.owner;
                                    o.fixed ? (e = a.getElementPos(o.targetElement, !0), t = [0, 0]) : (e = a.getElementPos(o.targetElement), t = a.getViewPos());
                                    var n,
                                    i,
                                    r,
                                    s = a.getElementSize(o.targetElement),
                                    l = a.getViewSize(),
                                    c = a.getPickerDims(o),
                                    d = [c.borderW, c.borderH];
                                    switch (o.position.toLowerCase()) {
                                    case "left":
                                        n = 1,
                                        i = 0,
                                        r = -1;
                                        break;
                                    case "right":
                                        n = 1,
                                        i = 0,
                                        r = 1;
                                        break;
                                    case "top":
                                        n = 0,
                                        i = 1,
                                        r = -1;
                                        break;
                                    default:
                                        n = 0,
                                        i = 1,
                                        r = 1
                                    }
                                    var m = (s[i] + d[i]) / 2;
                                    if (o.smartPosition)
                                        p = [-t[n] + e[n] + d[n] > l[n] && -t[n] + e[n] + s[n] / 2 > l[n] / 2 && e[n] + s[n] - d[n] >= 0 ? e[n] + s[n] - d[n] : e[n], -t[i] + e[i] + s[i] + d[i] - m + m * r > l[i] ? -t[i] + e[i] + s[i] / 2 > l[i] / 2 && e[i] + s[i] - m - m * r >= 0 ? e[i] + s[i] - m - m * r : e[i] + s[i] - m + m * r : e[i] + s[i] - m + m * r >= 0 ? e[i] + s[i] - m + m * r : e[i] + s[i] - m - m * r];
                                    else
                                        var p = [e[n], e[i] + s[i] - m + m * r];
                                    var u = p[n],
                                    h = p[i],
                                    g = o.fixed ? "fixed" : "absolute",
                                    f = (p[0] + d[0] > e[0] || p[0] < e[0] + s[0]) && p[1] + d[1] < e[1] + s[1];
                                    a._drawPosition(o, u, h, g, f)
                                }
                            },
                            _drawPosition: function (e, t, o, n, i) {
                                var r = i ? 0 : e.shadowBlur;
                                a.picker.wrap.style.position = n,
                                a.picker.wrap.style.left = t + "px",
                                a.picker.wrap.style.top = o + "px",
                                a.setBoxShadow(a.picker.boxS, e.shadow ? new a.BoxShadow(0, r, e.shadowBlur, 0, e.shadowColor) : null)
                            },
                            getPickerDims: function (e) {
                                var t = 2 * e.controlBorderWidth + e.width,
                                o = 2 * e.controlBorderWidth + e.height,
                                n = 2 * e.controlBorderWidth + 2 * a.getControlPadding(e) + e.sliderSize;
                                a.getSliderChannel(e) && (t += n),
                                e.hasAlphaChannel() && (t += n);
                                var i = a.getPaletteDims(e, t);
                                i.height && (o += i.height + e.padding),
                                e.closeButton && (o += 2 * e.controlBorderWidth + e.padding + e.buttonHeight);
                                var r = t + 2 * e.padding,
                                s = o + 2 * e.padding;
                                return {
                                    contentW: t,
                                    contentH: o,
                                    paddedW: r,
                                    paddedH: s,
                                    borderW: r + 2 * e.borderWidth,
                                    borderH: s + 2 * e.borderWidth,
                                    palette: i
                                }
                            },
                            getPaletteDims: function (e, t) {
                                var o = 0,
                                n = 0,
                                a = 0,
                                i = 0,
                                r = 0,
                                s = e._palette ? e._palette.length : 0;
                                return s && (n = (o = e.paletteCols) > 0 ? Math.ceil(s / o) : 0, a = Math.max(1, Math.floor((t - (o - 1) * e.paletteSpacing) / o)), i = e.paletteHeight ? Math.min(e.paletteHeight, a) : a),
                                n && (r = n * i + (n - 1) * e.paletteSpacing), {
                                    cols: o,
                                    rows: n,
                                    cellW: a,
                                    cellH: i,
                                    width: t,
                                    height: r
                                }
                            },
                            getControlPadding: function (e) {
                                return Math.max(e.padding / 2, 2 * e.pointerBorderWidth + e.pointerThickness - e.controlBorderWidth)
                            },
                            getPadYChannel: function (e) {
                                return "v" === e.mode.charAt(1).toLowerCase() ? "v" : "s"
                            },
                            getSliderChannel: function (e) {
                                if (e.mode.length > 2)
                                    switch (e.mode.charAt(2).toLowerCase()) {
                                    case "s":
                                        return "s";
                                    case "v":
                                        return "v"
                                    }
                                return null
                            },
                            triggerCallback: function (e, t) {
                                if (e[t]) {
                                    var o = null;
                                    if ("string" == typeof e[t])
                                        try {
                                            o = new Function(e[t])
                                        } catch (e) {
                                            console.error(e)
                                        }
                                    else
                                        o = e[t];
                                    o && o.call(e)
                                }
                            },
                            triggerGlobal: function (e) {
                                for (var t = a.getInstances(), o = 0; o < t.length; o += 1)
                                    t[o].trigger(e)
                            },
                            _pointerMoveEvent: {
                                mouse: "mousemove",
                                touch: "touchmove"
                            },
                            _pointerEndEvent: {
                                mouse: "mouseup",
                                touch: "touchend"
                            },
                            _pointerOrigin: null,
                            _capturedTarget: null,
                            onDocumentKeyUp: function (e) {
                                -1 !== ["Tab", "Escape"].indexOf(a.eventKey(e)) && a.picker && a.picker.owner && a.picker.owner.tryHide()
                            },
                            onWindowResize: function (e) {
                                a.redrawPosition()
                            },
                            onWindowScroll: function (e) {
                                a.redrawPosition()
                            },
                            onParentScroll: function (e) {
                                a.picker && a.picker.owner && a.picker.owner.tryHide()
                            },
                            onDocumentMouseDown: function (e) {
                                var t = e.target || e.srcElement;
                                t.jscolor && t.jscolor instanceof a.pub ? t.jscolor.showOnClick && !t.disabled && t.jscolor.show() : a.getData(t, "gui") ? a.getData(t, "control") && a.onControlPointerStart(e, t, a.getData(t, "control"), "mouse") : a.picker && a.picker.owner && a.picker.owner.tryHide()
                            },
                            onPickerTouchStart: function (e) {
                                var t = e.target || e.srcElement;
                                a.getData(t, "control") && a.onControlPointerStart(e, t, a.getData(t, "control"), "touch")
                            },
                            onControlPointerStart: function (t, o, n, i) {
                                var r = a.getData(o, "instance");
                                a.preventDefault(t),
                                a.captureTarget(o);
                                var s = function (e, r) {
                                    a.attachGroupEvent("drag", e, a._pointerMoveEvent[i], a.onDocumentPointerMove(t, o, n, i, r)),
                                    a.attachGroupEvent("drag", e, a._pointerEndEvent[i], a.onDocumentPointerEnd(t, o, n, i))
                                };
                                if (s(e.document, [0, 0]), e.parent && e.frameElement) {
                                    var l = e.frameElement.getBoundingClientRect(),
                                    c = [-l.left, -l.top];
                                    s(e.parent.window.document, c)
                                }
                                var d = a.getAbsPointerPos(t),
                                m = a.getRelPointerPos(t);
                                switch (a._pointerOrigin = {
                                        x: d.x - m.x,
                                        y: d.y - m.y
                                    }, n) {
                                case "pad":
                                    "v" === a.getSliderChannel(r) && 0 === r.channels.v && r.fromHSVA(null, null, 100, null),
                                    a.setPad(r, t, 0, 0);
                                    break;
                                case "sld":
                                    a.setSld(r, t, 0);
                                    break;
                                case "asld":
                                    a.setASld(r, t, 0)
                                }
                                r.trigger("input")
                            },
                            onDocumentPointerMove: function (e, t, o, n, i) {
                                return function (e) {
                                    var n = a.getData(t, "instance");
                                    switch (o) {
                                    case "pad":
                                        a.setPad(n, e, i[0], i[1]);
                                        break;
                                    case "sld":
                                        a.setSld(n, e, i[1]);
                                        break;
                                    case "asld":
                                        a.setASld(n, e, i[1])
                                    }
                                    n.trigger("input")
                                }
                            },
                            onDocumentPointerEnd: function (e, t, o, n) {
                                return function (e) {
                                    var o = a.getData(t, "instance");
                                    a.detachGroupEvents("drag"),
                                    a.releaseTarget(),
                                    o.trigger("input"),
                                    o.trigger("change")
                                }
                            },
                            onPaletteSampleClick: function (e) {
                                var t = e.currentTarget,
                                o = a.getData(t, "instance"),
                                n = a.getData(t, "color");
                                "any" === o.format.toLowerCase() && (o._setFormat(n.format), a.isAlphaFormat(o.getFormat()) || (n.rgba[3] = 1)),
                                null === n.rgba[3] && (!0 === o.paletteSetsAlpha || "auto" === o.paletteSetsAlpha && o._paletteHasTransparency) && (n.rgba[3] = 1),
                                o.fromRGBA.apply(o, n.rgba),
                                o.trigger("input"),
                                o.trigger("change"),
                                o.hideOnPaletteClick && o.hide()
                            },
                            setPad: function (e, t, o, n) {
                                var i = a.getAbsPointerPos(t),
                                r = o + i.x - a._pointerOrigin.x - e.padding - e.controlBorderWidth,
                                s = n + i.y - a._pointerOrigin.y - e.padding - e.controlBorderWidth,
                                l = r * (360 / (e.width - 1)),
                                c = 100 - s * (100 / (e.height - 1));
                                switch (a.getPadYChannel(e)) {
                                case "s":
                                    e.fromHSVA(l, c, null, null);
                                    break;
                                case "v":
                                    e.fromHSVA(l, null, c, null)
                                }
                            },
                            setSld: function (e, t, o) {
                                var n = 100 - (o + a.getAbsPointerPos(t).y - a._pointerOrigin.y - e.padding - e.controlBorderWidth) * (100 / (e.height - 1));
                                switch (a.getSliderChannel(e)) {
                                case "s":
                                    e.fromHSVA(null, n, null, null);
                                    break;
                                case "v":
                                    e.fromHSVA(null, null, n, null)
                                }
                            },
                            setASld: function (e, t, o) {
                                var n = 1 - (o + a.getAbsPointerPos(t).y - a._pointerOrigin.y - e.padding - e.controlBorderWidth) * (1 / (e.height - 1));
                                if (n < 1) {
                                    var i = e.getFormat();
                                    "any" !== e.format.toLowerCase() || a.isAlphaFormat(i) || e._setFormat("hex" === i ? "hexa" : "rgba")
                                }
                                e.fromHSVA(null, null, null, n)
                            },
                            createPadCanvas: function () {
                                var e = {
                                    elm: null,
                                    draw: null
                                },
                                t = a.createEl("canvas"),
                                o = t.getContext("2d");
                                return e.elm = t,
                                e.draw = function (e, n, a) {
                                    t.width = e,
                                    t.height = n,
                                    o.clearRect(0, 0, t.width, t.height);
                                    var i = o.createLinearGradient(0, 0, t.width, 0);
                                    i.addColorStop(0, "#F00"),
                                    i.addColorStop(1 / 6, "#FF0"),
                                    i.addColorStop(2 / 6, "#0F0"),
                                    i.addColorStop(.5, "#0FF"),
                                    i.addColorStop(4 / 6, "#00F"),
                                    i.addColorStop(5 / 6, "#F0F"),
                                    i.addColorStop(1, "#F00"),
                                    o.fillStyle = i,
                                    o.fillRect(0, 0, t.width, t.height);
                                    var r = o.createLinearGradient(0, 0, 0, t.height);
                                    switch (a.toLowerCase()) {
                                    case "s":
                                        r.addColorStop(0, "rgba(255,255,255,0)"),
                                        r.addColorStop(1, "rgba(255,255,255,1)");
                                        break;
                                    case "v":
                                        r.addColorStop(0, "rgba(0,0,0,0)"),
                                        r.addColorStop(1, "rgba(0,0,0,1)")
                                    }
                                    o.fillStyle = r,
                                    o.fillRect(0, 0, t.width, t.height)
                                },
                                e
                            },
                            createSliderGradient: function () {
                                var e = {
                                    elm: null,
                                    draw: null
                                },
                                t = a.createEl("canvas"),
                                o = t.getContext("2d");
                                return e.elm = t,
                                e.draw = function (e, n, a, i) {
                                    t.width = e,
                                    t.height = n,
                                    o.clearRect(0, 0, t.width, t.height);
                                    var r = o.createLinearGradient(0, 0, 0, t.height);
                                    r.addColorStop(0, a),
                                    r.addColorStop(1, i),
                                    o.fillStyle = r,
                                    o.fillRect(0, 0, t.width, t.height)
                                },
                                e
                            },
                            createASliderGradient: function () {
                                var e = {
                                    elm: null,
                                    draw: null
                                },
                                t = a.createEl("canvas"),
                                o = t.getContext("2d");
                                return e.elm = t,
                                e.draw = function (e, n, i) {
                                    t.width = e,
                                    t.height = n,
                                    o.clearRect(0, 0, t.width, t.height);
                                    var r = t.width / 2,
                                    s = a.pub.chessboardColor1,
                                    l = a.pub.chessboardColor2;
                                    if (o.fillStyle = s, o.fillRect(0, 0, t.width, t.height), r > 0)
                                        for (var c = 0; c < t.height; c += 2 * r)
                                            o.fillStyle = l, o.fillRect(0, c, r, r), o.fillRect(r, c + r, r, r);
                                    var d = o.createLinearGradient(0, 0, 0, t.height);
                                    d.addColorStop(0, i),
                                    d.addColorStop(1, "rgba(0,0,0,0)"),
                                    o.fillStyle = d,
                                    o.fillRect(0, 0, t.width, t.height)
                                },
                                e
                            },
                            BoxShadow: (t = function (e, t, o, n, a, i) {
                                this.hShadow = e,
                                this.vShadow = t,
                                this.blur = o,
                                this.spread = n,
                                this.color = a,
                                this.inset = !!i
                            }, t.prototype.toString = function () {
                                var e = [Math.round(this.hShadow) + "px", Math.round(this.vShadow) + "px", Math.round(this.blur) + "px", Math.round(this.spread) + "px", this.color];
                                return this.inset && e.push("inset"),
                                e.join(" ")
                            }, t),
                            flags: {
                                leaveValue: 1,
                                leaveAlpha: 2,
                                leavePreview: 4
                            },
                            enumOpts: {
                                format: ["auto", "any", "hex", "hexa", "rgb", "rgba"],
                                previewPosition: ["left", "right"],
                                mode: ["hsv", "hvs", "hs", "hv"],
                                position: ["left", "right", "top", "bottom"],
                                alphaChannel: ["auto", !0, !1],
                                paletteSetsAlpha: ["auto", !0, !1]
                            },
                            deprecatedOpts: {
                                styleElement: "previewElement",
                                onFineChange: "onInput",
                                overwriteImportant: "forceStyle",
                                closable: "closeButton",
                                insetWidth: "controlBorderWidth",
                                insetColor: "controlBorderColor",
                                refine: null
                            },
                            docsRef: " See https://jscolor.com/docs/",
                            pub: function (t, o) {
                                var n = this;
                                function i(e, t) {
                                    if ("string" != typeof e)
                                        throw new Error("Invalid value for option name: " + e);
                                    if (a.enumOpts.hasOwnProperty(e) && ("string" == typeof t && (t = t.toLowerCase()), -1 === a.enumOpts[e].indexOf(t)))
                                        throw new Error("Option '" + e + "' has invalid value: " + t);
                                    if (a.deprecatedOpts.hasOwnProperty(e)) {
                                        var o = e,
                                        i = a.deprecatedOpts[e];
                                        if (!i)
                                            throw new Error("Option '" + e + "' is DEPRECATED");
                                        console.warn("Option '%s' is DEPRECATED, using '%s' instead." + a.docsRef, o, i),
                                        e = i
                                    }
                                    var r = "set__" + e;
                                    if ("function" == typeof n[r])
                                        return n[r](t), !0;
                                    if (e in n)
                                        return n[e] = t, !0;
                                    throw new Error("Unrecognized configuration option: " + e)
                                }
                                function r(e) {
                                    if ("string" != typeof e)
                                        throw new Error("Invalid value for option name: " + e);
                                    if (a.deprecatedOpts.hasOwnProperty(e)) {
                                        var t = e,
                                        o = a.deprecatedOpts[e];
                                        if (!o)
                                            throw new Error("Option '" + e + "' is DEPRECATED");
                                        console.warn("Option '%s' is DEPRECATED, using '%s' instead." + a.docsRef, t, o),
                                        e = o
                                    }
                                    var i = "get__" + e;
                                    if ("function" == typeof n[i])
                                        return n[i](value);
                                    if (e in n)
                                        return n[e];
                                    throw new Error("Unrecognized configuration option: " + e)
                                }
                                function s() {
                                    n._processParentElementsInDOM(),
                                    a.picker || (a.picker = {
                                            owner: null,
                                            wrap: a.createEl("div"),
                                            box: a.createEl("div"),
                                            boxS: a.createEl("div"),
                                            boxB: a.createEl("div"),
                                            pad: a.createEl("div"),
                                            padB: a.createEl("div"),
                                            padM: a.createEl("div"),
                                            padCanvas: a.createPadCanvas(),
                                            cross: a.createEl("div"),
                                            crossBY: a.createEl("div"),
                                            crossBX: a.createEl("div"),
                                            crossLY: a.createEl("div"),
                                            crossLX: a.createEl("div"),
                                            sld: a.createEl("div"),
                                            sldB: a.createEl("div"),
                                            sldM: a.createEl("div"),
                                            sldGrad: a.createSliderGradient(),
                                            sldPtrS: a.createEl("div"),
                                            sldPtrIB: a.createEl("div"),
                                            sldPtrMB: a.createEl("div"),
                                            sldPtrOB: a.createEl("div"),
                                            asld: a.createEl("div"),
                                            asldB: a.createEl("div"),
                                            asldM: a.createEl("div"),
                                            asldGrad: a.createASliderGradient(),
                                            asldPtrS: a.createEl("div"),
                                            asldPtrIB: a.createEl("div"),
                                            asldPtrMB: a.createEl("div"),
                                            asldPtrOB: a.createEl("div"),
                                            pal: a.createEl("div"),
                                            btn: a.createEl("div"),
                                            btnT: a.createEl("span")
                                        }, a.picker.pad.appendChild(a.picker.padCanvas.elm), a.picker.padB.appendChild(a.picker.pad), a.picker.cross.appendChild(a.picker.crossBY), a.picker.cross.appendChild(a.picker.crossBX), a.picker.cross.appendChild(a.picker.crossLY), a.picker.cross.appendChild(a.picker.crossLX), a.picker.padB.appendChild(a.picker.cross), a.picker.box.appendChild(a.picker.padB), a.picker.box.appendChild(a.picker.padM), a.picker.sld.appendChild(a.picker.sldGrad.elm), a.picker.sldB.appendChild(a.picker.sld), a.picker.sldB.appendChild(a.picker.sldPtrOB), a.picker.sldPtrOB.appendChild(a.picker.sldPtrMB), a.picker.sldPtrMB.appendChild(a.picker.sldPtrIB), a.picker.sldPtrIB.appendChild(a.picker.sldPtrS), a.picker.box.appendChild(a.picker.sldB), a.picker.box.appendChild(a.picker.sldM), a.picker.asld.appendChild(a.picker.asldGrad.elm), a.picker.asldB.appendChild(a.picker.asld), a.picker.asldB.appendChild(a.picker.asldPtrOB), a.picker.asldPtrOB.appendChild(a.picker.asldPtrMB), a.picker.asldPtrMB.appendChild(a.picker.asldPtrIB), a.picker.asldPtrIB.appendChild(a.picker.asldPtrS), a.picker.box.appendChild(a.picker.asldB), a.picker.box.appendChild(a.picker.asldM), a.picker.box.appendChild(a.picker.pal), a.picker.btn.appendChild(a.picker.btnT), a.picker.box.appendChild(a.picker.btn), a.picker.boxB.appendChild(a.picker.box), a.picker.wrap.appendChild(a.picker.boxS), a.picker.wrap.appendChild(a.picker.boxB), a.picker.wrap.addEventListener("touchstart", a.onPickerTouchStart, !!a.isPassiveEventSupported && {
                                            passive: !1
                                        }));
                                    var t,
                                    o,
                                    i = a.picker,
                                    r = !!a.getSliderChannel(n),
                                    s = n.hasAlphaChannel(),
                                    m = a.getPickerDims(n),
                                    p = 2 * n.pointerBorderWidth + n.pointerThickness + 2 * n.crossSize,
                                    u = a.getControlPadding(n),
                                    h = Math.min(n.borderRadius, Math.round(n.padding * Math.PI));
                                    i.wrap.className = "jscolor-picker-wrap",
                                    i.wrap.style.clear = "both",
                                    i.wrap.style.width = m.borderW + "px",
                                    i.wrap.style.height = m.borderH + "px",
                                    i.wrap.style.zIndex = n.zIndex,
                                    i.box.className = "jscolor-picker",
                                    i.box.style.width = m.paddedW + "px",
                                    i.box.style.height = m.paddedH + "px",
                                    i.box.style.position = "relative",
                                    i.boxS.className = "jscolor-picker-shadow",
                                    i.boxS.style.position = "absolute",
                                    i.boxS.style.left = "0",
                                    i.boxS.style.top = "0",
                                    i.boxS.style.width = "100%",
                                    i.boxS.style.height = "100%",
                                    a.setBorderRadius(i.boxS, h + "px"),
                                    i.boxB.className = "jscolor-picker-border",
                                    i.boxB.style.position = "relative",
                                    i.boxB.style.border = n.borderWidth + "px solid",
                                    i.boxB.style.borderColor = n.borderColor,
                                    i.boxB.style.background = n.backgroundColor,
                                    a.setBorderRadius(i.boxB, h + "px"),
                                    i.padM.style.background = "rgba(255,0,0,.2)",
                                    i.sldM.style.background = "rgba(0,255,0,.2)",
                                    i.asldM.style.background = "rgba(0,0,255,.2)",
                                    i.padM.style.opacity = i.sldM.style.opacity = i.asldM.style.opacity = "0",
                                    i.pad.style.position = "relative",
                                    i.pad.style.width = n.width + "px",
                                    i.pad.style.height = n.height + "px",
                                    i.padCanvas.draw(n.width, n.height, a.getPadYChannel(n)),
                                    i.padB.style.position = "absolute",
                                    i.padB.style.left = n.padding + "px",
                                    i.padB.style.top = n.padding + "px",
                                    i.padB.style.border = n.controlBorderWidth + "px solid",
                                    i.padB.style.borderColor = n.controlBorderColor,
                                    i.padM.style.position = "absolute",
                                    i.padM.style.left = "0px",
                                    i.padM.style.top = "0px",
                                    i.padM.style.width = n.padding + 2 * n.controlBorderWidth + n.width + u + "px",
                                    i.padM.style.height = 2 * n.controlBorderWidth + 2 * n.padding + n.height + "px",
                                    i.padM.style.cursor = "crosshair",
                                    a.setData(i.padM, {
                                        instance: n,
                                        control: "pad"
                                    }),
                                    i.cross.style.position = "absolute",
                                    i.cross.style.left = i.cross.style.top = "0",
                                    i.cross.style.width = i.cross.style.height = p + "px",
                                    i.crossBY.style.position = i.crossBX.style.position = "absolute",
                                    i.crossBY.style.background = i.crossBX.style.background = n.pointerBorderColor,
                                    i.crossBY.style.width = i.crossBX.style.height = 2 * n.pointerBorderWidth + n.pointerThickness + "px",
                                    i.crossBY.style.height = i.crossBX.style.width = p + "px",
                                    i.crossBY.style.left = i.crossBX.style.top = Math.floor(p / 2) - Math.floor(n.pointerThickness / 2) - n.pointerBorderWidth + "px",
                                    i.crossBY.style.top = i.crossBX.style.left = "0",
                                    i.crossLY.style.position = i.crossLX.style.position = "absolute",
                                    i.crossLY.style.background = i.crossLX.style.background = n.pointerColor,
                                    i.crossLY.style.height = i.crossLX.style.width = p - 2 * n.pointerBorderWidth + "px",
                                    i.crossLY.style.width = i.crossLX.style.height = n.pointerThickness + "px",
                                    i.crossLY.style.left = i.crossLX.style.top = Math.floor(p / 2) - Math.floor(n.pointerThickness / 2) + "px",
                                    i.crossLY.style.top = i.crossLX.style.left = n.pointerBorderWidth + "px",
                                    i.sld.style.overflow = "hidden",
                                    i.sld.style.width = n.sliderSize + "px",
                                    i.sld.style.height = n.height + "px",
                                    i.sldGrad.draw(n.sliderSize, n.height, "#000", "#000"),
                                    i.sldB.style.display = r ? "block" : "none",
                                    i.sldB.style.position = "absolute",
                                    i.sldB.style.left = n.padding + n.width + 2 * n.controlBorderWidth + 2 * u + "px",
                                    i.sldB.style.top = n.padding + "px",
                                    i.sldB.style.border = n.controlBorderWidth + "px solid",
                                    i.sldB.style.borderColor = n.controlBorderColor,
                                    i.sldM.style.display = r ? "block" : "none",
                                    i.sldM.style.position = "absolute",
                                    i.sldM.style.left = n.padding + n.width + 2 * n.controlBorderWidth + u + "px",
                                    i.sldM.style.top = "0px",
                                    i.sldM.style.width = n.sliderSize + 2 * u + 2 * n.controlBorderWidth + (s ? 0 : Math.max(0, n.padding - u)) + "px",
                                    i.sldM.style.height = 2 * n.controlBorderWidth + 2 * n.padding + n.height + "px",
                                    i.sldM.style.cursor = "default",
                                    a.setData(i.sldM, {
                                        instance: n,
                                        control: "sld"
                                    }),
                                    i.sldPtrIB.style.border = i.sldPtrOB.style.border = n.pointerBorderWidth + "px solid " + n.pointerBorderColor,
                                    i.sldPtrOB.style.position = "absolute",
                                    i.sldPtrOB.style.left =  - (2 * n.pointerBorderWidth + n.pointerThickness) + "px",
                                    i.sldPtrOB.style.top = "0",
                                    i.sldPtrMB.style.border = n.pointerThickness + "px solid " + n.pointerColor,
                                    i.sldPtrS.style.width = n.sliderSize + "px",
                                    i.sldPtrS.style.height = a.pub.sliderInnerSpace + "px",
                                    i.asld.style.overflow = "hidden",
                                    i.asld.style.width = n.sliderSize + "px",
                                    i.asld.style.height = n.height + "px",
                                    i.asldGrad.draw(n.sliderSize, n.height, "#000"),
                                    i.asldB.style.display = s ? "block" : "none",
                                    i.asldB.style.position = "absolute",
                                    i.asldB.style.left = n.padding + n.width + 2 * n.controlBorderWidth + u + (r ? n.sliderSize + 3 * u + 2 * n.controlBorderWidth : 0) + "px",
                                    i.asldB.style.top = n.padding + "px",
                                    i.asldB.style.border = n.controlBorderWidth + "px solid",
                                    i.asldB.style.borderColor = n.controlBorderColor,
                                    i.asldM.style.display = s ? "block" : "none",
                                    i.asldM.style.position = "absolute",
                                    i.asldM.style.left = n.padding + n.width + 2 * n.controlBorderWidth + u + (r ? n.sliderSize + 2 * u + 2 * n.controlBorderWidth : 0) + "px",
                                    i.asldM.style.top = "0px",
                                    i.asldM.style.width = n.sliderSize + 2 * u + 2 * n.controlBorderWidth + Math.max(0, n.padding - u) + "px",
                                    i.asldM.style.height = 2 * n.controlBorderWidth + 2 * n.padding + n.height + "px",
                                    i.asldM.style.cursor = "default",
                                    a.setData(i.asldM, {
                                        instance: n,
                                        control: "asld"
                                    }),
                                    i.asldPtrIB.style.border = i.asldPtrOB.style.border = n.pointerBorderWidth + "px solid " + n.pointerBorderColor,
                                    i.asldPtrOB.style.position = "absolute",
                                    i.asldPtrOB.style.left =  - (2 * n.pointerBorderWidth + n.pointerThickness) + "px",
                                    i.asldPtrOB.style.top = "0",
                                    i.asldPtrMB.style.border = n.pointerThickness + "px solid " + n.pointerColor,
                                    i.asldPtrS.style.width = n.sliderSize + "px",
                                    i.asldPtrS.style.height = a.pub.sliderInnerSpace + "px",
                                    i.pal.className = "jscolor-palette",
                                    i.pal.style.display = m.palette.rows ? "block" : "none",
                                    i.pal.style.position = "absolute",
                                    i.pal.style.left = n.padding + "px",
                                    i.pal.style.top = 2 * n.controlBorderWidth + 2 * n.padding + n.height + "px",
                                    i.pal.innerHTML = "";
                                    for (var g = a.genColorPreviewCanvas("rgba(0,0,0,0)"), f = 0, k = 0; k < m.palette.rows; k++)
                                        for (var M = 0; M < m.palette.cols && f < n._palette.length; M++, f++) {
                                            var y = n._palette[f],
                                            C = a.rgbaColor.apply(null, y.rgba),
                                            b = a.createEl("div");
                                            b.style.width = m.palette.cellW - 2 * n.controlBorderWidth + "px",
                                            b.style.height = m.palette.cellH - 2 * n.controlBorderWidth + "px",
                                            b.style.backgroundColor = C;
                                            var G = a.createEl("div");
                                            G.className = "jscolor-palette-sample",
                                            G.style.display = "block",
                                            G.style.position = "absolute",
                                            G.style.left = (m.palette.cols <= 1 ? 0 : Math.round(M * ((m.contentW - m.palette.cellW) / (m.palette.cols - 1)) * 10) / 10) + "px",
                                            G.style.top = k * (m.palette.cellH + n.paletteSpacing) + "px",
                                            G.style.border = n.controlBorderWidth + "px solid",
                                            G.style.borderColor = n.controlBorderColor,
                                            G.style.cursor = "pointer",
                                            null !== y.rgba[3] && y.rgba[3] < 1 && (G.style.backgroundImage = "url('" + g.canvas.toDataURL() + "')", G.style.backgroundRepeat = "repeat", G.style.backgroundPosition = "center center"),
                                            a.setData(G, {
                                                instance: n,
                                                control: "palette-sample",
                                                color: y
                                            }),
                                            G.addEventListener("click", a.onPaletteSampleClick, !1),
                                            G.appendChild(b),
                                            i.pal.appendChild(G)
                                        }
                                    i.btn.className = "jscolor-btn-close",
                                    i.btn.style.display = n.closeButton ? "block" : "none",
                                    i.btn.style.position = "absolute",
                                    i.btn.style.left = n.padding + "px",
                                    i.btn.style.bottom = n.padding + "px",
                                    i.btn.style.padding = "0 15px",
                                    i.btn.style.maxWidth = m.contentW - 2 * n.controlBorderWidth - 30 + "px",
                                    i.btn.style.overflow = "hidden",
                                    i.btn.style.height = n.buttonHeight + "px",
                                    i.btn.style.whiteSpace = "nowrap",
                                    i.btn.style.border = n.controlBorderWidth + "px solid",
                                    o = (t = n.controlBorderColor.split(/\s+/)).length < 2 ? t[0] : t[1] + " " + t[0] + " " + t[0] + " " + t[1],
                                    i.btn.style.borderColor = o,
                                    i.btn.style.color = n.buttonColor,
                                    i.btn.style.font = "12px sans-serif",
                                    i.btn.style.textAlign = "center",
                                    i.btn.style.cursor = "pointer",
                                    i.btn.onmousedown = function () {
                                        n.hide()
                                    },
                                    i.btnT.style.lineHeight = n.buttonHeight + "px",
                                    i.btnT.innerHTML = "",
                                    i.btnT.appendChild(e.document.createTextNode(n.closeText)),
                                    l(),
                                    c(),
                                    d(),
                                    a.picker.owner && a.picker.owner !== n && a.removeClass(a.picker.owner.targetElement, a.pub.activeClassName),
                                    a.picker.owner = n,
                                    n.container === e.document.body ? a.redrawPosition() : a._drawPosition(n, 0, 0, "relative", !1),
                                    i.wrap.parentNode !== n.container && n.container.appendChild(i.wrap),
                                    a.addClass(n.targetElement, a.pub.activeClassName)
                                }
                                function l() {
                                    var e = a.getPadYChannel(n),
                                    t = Math.round(n.channels.h / 360 * (n.width - 1)),
                                    o = Math.round((1 - n.channels[e] / 100) * (n.height - 1)),
                                    i = 2 * n.pointerBorderWidth + n.pointerThickness + 2 * n.crossSize,
                                    r = -Math.floor(i / 2);
                                    switch (a.picker.cross.style.left = t + r + "px", a.picker.cross.style.top = o + r + "px", a.getSliderChannel(n)) {
                                    case "s":
                                        var s = a.HSV_RGB(n.channels.h, 100, n.channels.v),
                                        l = a.HSV_RGB(n.channels.h, 0, n.channels.v),
                                        c = "rgb(" + Math.round(s[0]) + "," + Math.round(s[1]) + "," + Math.round(s[2]) + ")",
                                        d = "rgb(" + Math.round(l[0]) + "," + Math.round(l[1]) + "," + Math.round(l[2]) + ")";
                                        a.picker.sldGrad.draw(n.sliderSize, n.height, c, d);
                                        break;
                                    case "v":
                                        var m = a.HSV_RGB(n.channels.h, n.channels.s, 100);
                                        c = "rgb(" + Math.round(m[0]) + "," + Math.round(m[1]) + "," + Math.round(m[2]) + ")",
                                        d = "#000",
                                        a.picker.sldGrad.draw(n.sliderSize, n.height, c, d)
                                    }
                                    a.picker.asldGrad.draw(n.sliderSize, n.height, n.toHEXString())
                                }
                                function c() {
                                    var e = a.getSliderChannel(n);
                                    if (e) {
                                        var t = Math.round((1 - n.channels[e] / 100) * (n.height - 1));
                                        a.picker.sldPtrOB.style.top = t - (2 * n.pointerBorderWidth + n.pointerThickness) - Math.floor(a.pub.sliderInnerSpace / 2) + "px"
                                    }
                                    a.picker.asldGrad.draw(n.sliderSize, n.height, n.toHEXString())
                                }
                                function d() {
                                    var e = Math.round((1 - n.channels.a) * (n.height - 1));
                                    a.picker.asldPtrOB.style.top = e - (2 * n.pointerBorderWidth + n.pointerThickness) - Math.floor(a.pub.sliderInnerSpace / 2) + "px"
                                }
                                function m() {
                                    return a.picker && a.picker.owner === n
                                }
                                if (o || (o = {}), this.channels = {
                                        r: 255,
                                        g: 255,
                                        b: 255,
                                        h: 0,
                                        s: 0,
                                        v: 100,
                                        a: 1
                                    }, this.format = "auto", this.value = void 0, this.alpha = void 0, this.random = !1, this.onChange = void 0, this.onInput = void 0, this.valueElement = void 0, this.alphaElement = void 0, this.previewElement = void 0, this.previewPosition = "left", this.previewSize = 32, this.previewPadding = 8, this.required = !0, this.hash = !0, this.uppercase = !0, this.forceStyle = !0, this.width = 181, this.height = 101, this.mode = "HSV", this.alphaChannel = "auto", this.position = "bottom", this.smartPosition = !0, this.showOnClick = !0, this.hideOnLeave = !0, this.palette = [], this.paletteCols = 10, this.paletteSetsAlpha = "auto", this.paletteHeight = 16, this.paletteSpacing = 4, this.hideOnPaletteClick = !1, this.sliderSize = 16, this.crossSize = 8, this.closeButton = !1, this.closeText = "Close", this.buttonColor = "rgba(0,0,0,1)", this.buttonHeight = 18, this.padding = 12, this.backgroundColor = "rgba(255,255,255,1)", this.borderWidth = 1, this.borderColor = "rgba(187,187,187,1)", this.borderRadius = 8, this.controlBorderWidth = 1, this.controlBorderColor = "rgba(187,187,187,1)", this.shadow = !0, this.shadowBlur = 15, this.shadowColor = "rgba(0,0,0,0.2)", this.pointerColor = "rgba(76,76,76,1)", this.pointerBorderWidth = 1, this.pointerBorderColor = "rgba(255,255,255,1)", this.pointerThickness = 2, this.zIndex = 5e3, this.container = void 0, this.minS = 0, this.maxS = 100, this.minV = 0, this.maxV = 100, this.minA = 0, this.maxA = 1, this.option = function () {
                                    if (!arguments.length)
                                        throw new Error("No option specified");
                                        if (1 === arguments.length && "string" == typeof arguments[0]) {
                                            try {
                                                return r(arguments[0])
                                            } catch (e) {
                                                console.warn(e)
                                            }
                                            return !1
                                        }
                                        if (arguments.length >= 2 && "string" == typeof arguments[0]) {
                                            try {
                                                if (!i(arguments[0], arguments[1]))
                                                    return !1
                                            } catch (e) {
                                                return console.warn(e),
                                                !1
                                            }
                                            return this.redraw(),
                                            this.exposeColor(),
                                            !0
                                        }
                                        if (1 === arguments.length && "object" == typeof arguments[0]) {
                                            var e = arguments[0],
                                            t = !0;
                                            for (var o in e)
                                                if (e.hasOwnProperty(o))
                                                    try {
                                                        i(o, e[o]) || (t = !1)
                                                    } catch (e) {
                                                        console.warn(e),
                                                        t = !1
                                                    }
                                            return this.redraw(),
                                            this.exposeColor(),
                                            t
                                        }
                                        throw new Error("Invalid arguments")
                                    }, this.channel = function (e, t) {
                                        if ("string" != typeof e)
                                            throw new Error("Invalid value for channel name: " + e);
                                        if (void 0 === t)
                                            return this.channels.hasOwnProperty(e.toLowerCase()) ? this.channels[e.toLowerCase()] : (console.warn("Getting unknown channel: " + e), !1);
                                        var o = !1;
                                        switch (e.toLowerCase()) {
                                        case "r":
                                            o = this.fromRGBA(t, null, null, null);
                                            break;
                                        case "g":
                                            o = this.fromRGBA(null, t, null, null);
                                            break;
                                        case "b":
                                            o = this.fromRGBA(null, null, t, null);
                                            break;
                                        case "h":
                                            o = this.fromHSVA(t, null, null, null);
                                            break;
                                        case "s":
                                            o = this.fromHSVA(null, t, null, null);
                                            break;
                                        case "v":
                                            o = this.fromHSVA(null, null, t, null);
                                            break;
                                        case "a":
                                            o = this.fromHSVA(null, null, null, t);
                                            break;
                                        default:
                                            return console.warn("Setting unknown channel: " + e),
                                            !1
                                        }
                                        return !!o && (this.redraw(), !0)
                                    }, this.trigger = function (e) {
                                        for (var t = a.strList(e), o = 0; o < t.length; o += 1) {
                                            var n = t[o].toLowerCase(),
                                            i = null;
                                            switch (n) {
                                            case "input":
                                                i = "onInput";
                                                break;
                                            case "change":
                                                i = "onChange"
                                            }
                                            i && a.triggerCallback(this, i),
                                            a.triggerInputEvent(this.valueElement, n, !0, !0)
                                        }
                                    }, this.fromHSVA = function (e, t, o, n, i) {
                                        if (void 0 === e && (e = null), void 0 === t && (t = null), void 0 === o && (o = null), void 0 === n && (n = null), null !== e) {
                                            if (isNaN(e))
                                                return !1;
                                            this.channels.h = Math.max(0, Math.min(360, e))
                                        }
                                        if (null !== t) {
                                            if (isNaN(t))
                                                return !1;
                                            this.channels.s = Math.max(0, Math.min(100, this.maxS, t), this.minS)
                                        }
                                        if (null !== o) {
                                            if (isNaN(o))
                                                return !1;
                                            this.channels.v = Math.max(0, Math.min(100, this.maxV, o), this.minV)
                                        }
                                        if (null !== n) {
                                            if (isNaN(n))
                                                return !1;
                                            this.channels.a = this.hasAlphaChannel() ? Math.max(0, Math.min(1, this.maxA, n), this.minA) : 1
                                        }
                                        var r = a.HSV_RGB(this.channels.h, this.channels.s, this.channels.v);
                                        return this.channels.r = r[0],
                                        this.channels.g = r[1],
                                        this.channels.b = r[2],
                                        this.exposeColor(i),
                                        !0
                                    }, this.fromRGBA = function (e, t, o, n, i) {
                                        if (void 0 === e && (e = null), void 0 === t && (t = null), void 0 === o && (o = null), void 0 === n && (n = null), null !== e) {
                                            if (isNaN(e))
                                                return !1;
                                            e = Math.max(0, Math.min(255, e))
                                        }
                                        if (null !== t) {
                                            if (isNaN(t))
                                                return !1;
                                            t = Math.max(0, Math.min(255, t))
                                        }
                                        if (null !== o) {
                                            if (isNaN(o))
                                                return !1;
                                            o = Math.max(0, Math.min(255, o))
                                        }
                                        if (null !== n) {
                                            if (isNaN(n))
                                                return !1;
                                            this.channels.a = this.hasAlphaChannel() ? Math.max(0, Math.min(1, this.maxA, n), this.minA) : 1
                                        }
                                        var r = a.RGB_HSV(null === e ? this.channels.r : e, null === t ? this.channels.g : t, null === o ? this.channels.b : o);
                                        null !== r[0] && (this.channels.h = Math.max(0, Math.min(360, r[0]))),
                                        0 !== r[2] && (this.channels.s = Math.max(0, this.minS, Math.min(100, this.maxS, r[1]))),
                                        this.channels.v = Math.max(0, this.minV, Math.min(100, this.maxV, r[2]));
                                        var s = a.HSV_RGB(this.channels.h, this.channels.s, this.channels.v);
                                        return this.channels.r = s[0],
                                        this.channels.g = s[1],
                                        this.channels.b = s[2],
                                        this.exposeColor(i),
                                        !0
                                    }, this.fromHSV = function (e, t, o, n) {
                                        return console.warn("fromHSV() method is DEPRECATED. Using fromHSVA() instead." + a.docsRef),
                                        this.fromHSVA(e, t, o, null, n)
                                    }, this.fromRGB = function (e, t, o, n) {
                                        return console.warn("fromRGB() method is DEPRECATED. Using fromRGBA() instead." + a.docsRef),
                                        this.fromRGBA(e, t, o, null, n)
                                    }, this.fromString = function (e, t) {
                                        if (!this.required && "" === e.trim())
                                            return this.setPreviewElementBg(null), this.setValueElementValue(""), !0;
                                        var o = a.parseColorString(e);
                                        return !!o && ("any" === this.format.toLowerCase() && (this._setFormat(o.format), a.isAlphaFormat(this.getFormat()) || (o.rgba[3] = 1)), this.fromRGBA(o.rgba[0], o.rgba[1], o.rgba[2], o.rgba[3], t), !0)
                                    }, this.randomize = function (e, t, o, n, a, i, r, s) {
                                        void 0 === e && (e = 0),
                                        void 0 === t && (t = 100),
                                        void 0 === o && (o = 0),
                                        void 0 === n && (n = 100),
                                        void 0 === a && (a = 0),
                                        void 0 === i && (i = 359),
                                        void 0 === r && (r = 1),
                                        void 0 === s && (s = 1),
                                        this.fromHSVA(a + Math.floor(Math.random() * (i - a + 1)), o + Math.floor(Math.random() * (n - o + 1)), e + Math.floor(Math.random() * (t - e + 1)), (100 * r + Math.floor(Math.random() * (100 * (s - r) + 1))) / 100)
                                    }, this.toString = function (e) {
                                        switch (void 0 === e && (e = this.getFormat()), e.toLowerCase()) {
                                        case "hex":
                                            return this.toHEXString();
                                        case "hexa":
                                            return this.toHEXAString();
                                        case "rgb":
                                            return this.toRGBString();
                                        case "rgba":
                                            return this.toRGBAString()
                                        }
                                        return !1
                                    }, this.toHEXString = function () {
                                        return a.hexColor(this.channels.r, this.channels.g, this.channels.b)
                                    }, this.toHEXAString = function () {
                                        return a.hexaColor(this.channels.r, this.channels.g, this.channels.b, this.channels.a)
                                    }, this.toRGBString = function () {
                                        return a.rgbColor(this.channels.r, this.channels.g, this.channels.b)
                                    }, this.toRGBAString = function () {
                                        return a.rgbaColor(this.channels.r, this.channels.g, this.channels.b, this.channels.a)
                                    }, this.toGrayscale = function () {
                                        return .213 * this.channels.r + .715 * this.channels.g + .072 * this.channels.b
                                    }, this.toCanvas = function () {
                                        return a.genColorPreviewCanvas(this.toRGBAString()).canvas
                                    }, this.toDataURL = function () {
                                        return this.toCanvas().toDataURL()
                                    }, this.toBackground = function () {
                                        return a.pub.background(this.toRGBAString())
                                    }, this.isLight = function () {
                                        return this.toGrayscale() > 127.5
                                    }, this.hide = function () {
                                        m() && (a.removeClass(n.targetElement, a.pub.activeClassName), a.picker.wrap.parentNode.removeChild(a.picker.wrap), delete a.picker.owner)
                                    }, this.show = function () {
                                        s()
                                    }, this.redraw = function () {
                                        m() && s()
                                    }, this.getFormat = function () {
                                        return this._currentFormat
                                    }, this._setFormat = function (e) {
                                        this._currentFormat = e.toLowerCase()
                                    }, this.hasAlphaChannel = function () {
                                        return "auto" === this.alphaChannel ? "any" === this.format.toLowerCase() || a.isAlphaFormat(this.getFormat()) || void 0 !== this.alpha || void 0 !== this.alphaElement : this.alphaChannel
                                    }, this.processValueInput = function (e) {
                                        this.fromString(e) || this.exposeColor()
                                    }, this.processAlphaInput = function (e) {
                                        this.fromHSVA(null, null, null, parseFloat(e)) || this.exposeColor()
                                    }, this.exposeColor = function (e) {
                                        var t = this.toString(),
                                        o = this.getFormat();
                                        if (a.setDataAttr(this.targetElement, "current-color", t), e & a.flags.leaveValue || !this.valueElement || ("hex" !== o && "hexa" !== o || (this.uppercase || (t = t.toLowerCase()), this.hash || (t = t.replace(/^#/, ""))), this.setValueElementValue(t)), !(e & a.flags.leaveAlpha) && this.alphaElement) {
                                            var n = Math.round(100 * this.channels.a) / 100;
                                            this.setAlphaElementValue(n)
                                        }
                                        e & a.flags.leavePreview || !this.previewElement || ((a.isTextInput(this.previewElement) || a.isButton(this.previewElement) && !a.isButtonEmpty(this.previewElement)) && this.previewPosition, this.setPreviewElementBg(this.toRGBAString())),
                                        m() && (l(), c(), d())
                                    }, this.setPreviewElementBg = function (e) {
                                        if (this.previewElement) {
                                            var t = null,
                                            o = null;
                                            (a.isTextInput(this.previewElement) || a.isButton(this.previewElement) && !a.isButtonEmpty(this.previewElement)) && (t = this.previewPosition, o = this.previewSize);
                                            var n = [];
                                            if (e) {
                                                n.push({
                                                    image: a.genColorPreviewGradient(e, t, o ? o - a.pub.previewSeparator.length : null),
                                                    position: "left top",
                                                    size: "auto",
                                                    repeat: t ? "repeat-y" : "repeat",
                                                    origin: "padding-box"
                                                });
                                                var i = a.genColorPreviewCanvas("rgba(0,0,0,0)", t ? {
                                                    left: "right",
                                                    right: "left"
                                                }
                                                        [t] : null, o, !0);
                                                n.push({
                                                    image: "url('" + i.canvas.toDataURL() + "')",
                                                    position: (t || "left") + " top",
                                                    size: i.width + "px " + i.height + "px",
                                                    repeat: t ? "repeat-y" : "repeat",
                                                    origin: "padding-box"
                                                })
                                            } else
                                                n.push({
                                                    image: "none",
                                                    position: "left top",
                                                    size: "auto",
                                                    repeat: "no-repeat",
                                                    origin: "padding-box"
                                                });
                                            for (var r = {
                                                    image: [],
                                                    position: [],
                                                    size: [],
                                                    repeat: [],
                                                    origin: []
                                                }, s = 0; s < n.length; s += 1)
                                                r.image.push(n[s].image), r.position.push(n[s].position), r.size.push(n[s].size), r.repeat.push(n[s].repeat), r.origin.push(n[s].origin);
                                            var l = {
                                                "background-image": r.image.join(", "),
                                                "background-position": r.position.join(", "),
                                                "background-size": r.size.join(", "),
                                                "background-repeat": r.repeat.join(", "),
                                                "background-origin": r.origin.join(", ")
                                            };
                                            a.setStyle(this.previewElement, l, this.forceStyle);
                                            var c = {
                                                left: null,
                                                right: null
                                            };
                                            t && (c[t] = this.previewSize + this.previewPadding + "px"),
                                            l = {
                                                "padding-left": c.left,
                                                "padding-right": c.right
                                            },
                                            a.setStyle(this.previewElement, l, this.forceStyle, !0)
                                        }
                                    }, this.setValueElementValue = function (e) {
                                        this.valueElement && ("input" === a.nodeName(this.valueElement) ? this.valueElement.value = e : this.valueElement.innerHTML = e)
                                    }, this.setAlphaElementValue = function (e) {
                                        this.alphaElement && ("input" === a.nodeName(this.alphaElement) ? this.alphaElement.value = e : this.alphaElement.innerHTML = e)
                                    }, this._processParentElementsInDOM = function () {
                                        if (!this._parentElementsProcessed) {
                                            this._parentElementsProcessed = !0;
                                            var e = this.targetElement;
                                            do {
                                                var t = a.getCompStyle(e);
                                                t.position && "fixed" === t.position.toLowerCase() && (this.fixed = !0),
                                                e !== this.targetElement && (a.getData(e, "hasScrollListener") || (e.addEventListener("scroll", a.onParentScroll, !1), a.setData(e, "hasScrollListener", !0)))
                                            } while ((e = e.parentNode) && "body" !== a.nodeName(e))
                                        }
                                    }, this.tryHide = function () {
                                        this.hideOnLeave && this.hide()
                                    }, this.set__palette = function (e) {
                                        this.palette = e,
                                        this._palette = a.parsePaletteValue(e),
                                        this._paletteHasTransparency = a.containsTranparentColor(this._palette)
                                    }, a.pub.options)for (var p in a.pub.options)
                                        if (a.pub.options.hasOwnProperty(p))
                                            try {
                                                i(p, a.pub.options[p])
                                            } catch (e) {
                                                console.warn(e)
                                            }
                                var u = [];
                                o.preset && ("string" == typeof o.preset ? u = o.preset.split(/\s+/) : Array.isArray(o.preset) ? u = o.preset.slice() : console.warn("Unrecognized preset value")),
                                -1 === u.indexOf("default") && u.push("default");
                                for (var h = u.length - 1; h >= 0; h -= 1) {
                                    var g = u[h];
                                    if (g)
                                        if (a.pub.presets.hasOwnProperty(g)) {
                                            for (var p in a.pub.presets[g])
                                                if (a.pub.presets[g].hasOwnProperty(p))
                                                    try {
                                                        i(p, a.pub.presets[g][p])
                                                    } catch (e) {
                                                        console.warn(e)
                                                    }
                                        } else
                                            console.warn("Unknown preset: %s", g)
                                }
                                var f = ["preset"];
                                for (var p in o)
                                    if (o.hasOwnProperty(p) && -1 === f.indexOf(p))
                                        try {
                                            i(p, o[p])
                                        } catch (e) {
                                            console.warn(e)
                                        }
                                if (void 0 === this.container ? this.container = e.document.body : this.container = a.node(this.container), !this.container)
                                    throw new Error("Cannot instantiate color picker without a container element");
                                if (this.targetElement = a.node(t), !this.targetElement) {
                                    if ("string" == typeof t && /^[a-zA-Z][\w:.-]*$/.test(t))
                                        throw new Error("If '" + t + "' is supposed to be an ID, please use '#" + t + "' or any valid CSS selector.");
                                    throw new Error("Cannot instantiate color picker without a target element")
                                }
                                if (this.targetElement.jscolor && this.targetElement.jscolor instanceof a.pub)
                                    throw new Error("Color picker already installed on this element");
                                if (this.targetElement.jscolor = this, a.addClass(this.targetElement, a.pub.className), a.instances.push(this), a.isButton(this.targetElement) && ("button" !== this.targetElement.type.toLowerCase() && (this.targetElement.type = "button"), a.isButtonEmpty(this.targetElement))) {
                                    a.removeChildren(this.targetElement),
                                    this.targetElement.appendChild(e.document.createTextNode(" "));
                                    var k = a.getCompStyle(this.targetElement);
                                    (parseFloat(k["min-width"]) || 0) < this.previewSize && a.setStyle(this.targetElement, {
                                        "min-width": this.previewSize + "px"
                                    }, this.forceStyle)
                                }
                                if (void 0 === this.valueElement ? a.isTextInput(this.targetElement) && (this.valueElement = this.targetElement) : null === this.valueElement || (this.valueElement = a.node(this.valueElement)), this.alphaElement && (this.alphaElement = a.node(this.alphaElement)), void 0 === this.previewElement ? this.previewElement = this.targetElement : null === this.previewElement || (this.previewElement = a.node(this.previewElement)), this.valueElement && a.isTextInput(this.valueElement)) {
                                    var M = {
                                        onInput: this.valueElement.oninput
                                    };
                                    this.valueElement.oninput = null,
                                    this.valueElement.addEventListener("keydown", (function (e) {
                                            "Enter" === a.eventKey(e) && (n.valueElement && n.processValueInput(n.valueElement.value), n.tryHide())
                                        }), !1),
                                    this.valueElement.addEventListener("change", (function (e) {
                                            if (!a.getData(e, "internal")) {
                                                var t = n.valueElement.value;
                                                n.processValueInput(n.valueElement.value),
                                                a.triggerCallback(n, "onChange"),
                                                n.valueElement.value !== t && a.triggerInputEvent(n.valueElement, "change", !0, !0)
                                            }
                                        }), !1),
                                    this.valueElement.addEventListener("input", (function (e) {
                                            a.getData(e, "internal") || (n.valueElement && n.fromString(n.valueElement.value, a.flags.leaveValue), a.triggerCallback(n, "onInput"))
                                        }), !1),
                                    M.onInput && this.valueElement.addEventListener("input", M.onInput, !1),
                                    this.valueElement.setAttribute("autocomplete", "off"),
                                    this.valueElement.setAttribute("autocorrect", "off"),
                                    this.valueElement.setAttribute("autocapitalize", "off"),
                                    this.valueElement.setAttribute("spellcheck", !1)
                                }
                                this.alphaElement && a.isTextInput(this.alphaElement) && (this.alphaElement.addEventListener("keydown", (function (e) {
                                            "Enter" === a.eventKey(e) && (n.alphaElement && n.processAlphaInput(n.alphaElement.value), n.tryHide())
                                        }), !1), this.alphaElement.addEventListener("change", (function (e) {
                                            if (!a.getData(e, "internal")) {
                                                var t = n.alphaElement.value;
                                                n.processAlphaInput(n.alphaElement.value),
                                                a.triggerCallback(n, "onChange"),
                                                a.triggerInputEvent(n.valueElement, "change", !0, !0),
                                                n.alphaElement.value !== t && a.triggerInputEvent(n.alphaElement, "change", !0, !0)
                                            }
                                        }), !1), this.alphaElement.addEventListener("input", (function (e) {
                                            a.getData(e, "internal") || (n.alphaElement && n.fromHSVA(null, null, null, parseFloat(n.alphaElement.value), a.flags.leaveAlpha), a.triggerCallback(n, "onInput"), a.triggerInputEvent(n.valueElement, "input", !0, !0))
                                        }), !1), this.alphaElement.setAttribute("autocomplete", "off"), this.alphaElement.setAttribute("autocorrect", "off"), this.alphaElement.setAttribute("autocapitalize", "off"), this.alphaElement.setAttribute("spellcheck", !1));
                                var y = "FFFFFF";
                                void 0 !== this.value ? y = this.value : this.valueElement && void 0 !== this.valueElement.value && (y = this.valueElement.value);
                                var C = void 0;
                                if (void 0 !== this.alpha ? C = "" + this.alpha : this.alphaElement && void 0 !== this.alphaElement.value && (C = this.alphaElement.value), this._currentFormat = null, ["auto", "any"].indexOf(this.format.toLowerCase()) > -1) {
                                    var b = a.parseColorString(y);
                                    this._currentFormat = b ? b.format : "hex"
                                } else
                                    this._currentFormat = this.format.toLowerCase();
                                this.processValueInput(y),
                                void 0 !== C && this.processAlphaInput(C),
                                this.random && this.randomize.apply(this, Array.isArray(this.random) ? this.random : [])
                            }
                        }, a.pub.className = "jscolor", a.pub.activeClassName = "jscolor-active", a.pub.looseJSON = !0, a.pub.presets = {}, a.pub.presets.default = {}, a.pub.presets.light = {
                            backgroundColor: "rgba(255,255,255,1)",
                            controlBorderColor: "rgba(187,187,187,1)",
                            buttonColor: "rgba(0,0,0,1)"
                        }, a.pub.presets.dark = {
                            backgroundColor: "rgba(51,51,51,1)",
                            controlBorderColor: "rgba(153,153,153,1)",
                            buttonColor: "rgba(240,240,240,1)"
                        }, a.pub.presets.small = {
                            width: 101,
                            height: 101,
                            padding: 10,
                            sliderSize: 14,
                            paletteCols: 8
                        }, a.pub.presets.medium = {
                            width: 181,
                            height: 101,
                            padding: 12,
                            sliderSize: 16,
                            paletteCols: 10
                        }, a.pub.presets.large = {
                            width: 271,
                            height: 151,
                            padding: 12,
                            sliderSize: 24,
                            paletteCols: 15
                        }, a.pub.presets.thin = {
                            borderWidth: 1,
                            controlBorderWidth: 1,
                            pointerBorderWidth: 1
                        }, a.pub.presets.thick = {
                            borderWidth: 2,
                            controlBorderWidth: 2,
                            pointerBorderWidth: 2
                        }, a.pub.sliderInnerSpace = 3, a.pub.chessboardSize = 8, a.pub.chessboardColor1 = "#666666", a.pub.chessboardColor2 = "#999999", a.pub.previewSeparator = ["rgba(255,255,255,.65)", "rgba(128,128,128,.65)"], a.pub.init = function () {
                        if (!a.initialized)
                            for (e.document.addEventListener("mousedown", a.onDocumentMouseDown, !1), e.document.addEventListener("keyup", a.onDocumentKeyUp, !1), e.addEventListener("resize", a.onWindowResize, !1), e.addEventListener("scroll", a.onWindowScroll, !1), a.pub.install(), a.initialized = !0; a.readyQueue.length; )
                                a.readyQueue.shift()()
                    }, a.pub.install = function (e) {
                        var t = !0;
                        try {
                            a.installBySelector("[data-jscolor]", e)
                        } catch (e) {
                            t = !1,
                            console.warn(e)
                        }
                        if (a.pub.lookupClass)
                            try {
                                a.installBySelector("input." + a.pub.lookupClass + ", button." + a.pub.lookupClass, e)
                            } catch (e) {}
                        return t
                    }, a.pub.ready = function (e) {
                        return "function" != typeof e ? (console.warn("Passed value is not a function"), !1) : (a.initialized ? e() : a.readyQueue.push(e), !0)
                    }, a.pub.trigger = function (e) {
                        var t = function () {
                            a.triggerGlobal(e)
                        };
                        a.initialized ? t() : a.pub.ready(t)
                    }, a.pub.hide = function () {
                        a.picker && a.picker.owner && a.picker.owner.hide()
                    }, a.pub.chessboard = function (e) {
                        return e || (e = "rgba(0,0,0,0)"),
                        a.genColorPreviewCanvas(e).canvas.toDataURL()
                    }, a.pub.background = function (e) {
                        var t = [];
                        t.push(a.genColorPreviewGradient(e));
                        var o = a.genColorPreviewCanvas();
                        return t.push(["url('" + o.canvas.toDataURL() + "')", "left top", "repeat"].join(" ")),
                        t.join(", ")
                    }, a.pub.options = {}, a.pub.lookupClass = "jscolor", a.pub.installByClassName = function () {
                        return console.error('jscolor.installByClassName() is DEPRECATED. Use data-jscolor="" attribute instead of a class name.' + a.docsRef),
                        !1
                    }, a.register(), a.pub);
                    return void 0 === e.jscolor && (e.jscolor = e.JSColor = i),
                    i
                }))
        }
    },
    t = {};
    function o(n) {
        var a = t[n];
        if (void 0 !== a)
            return a.exports;
        var i = t[n] = {
            exports: {}
        };
        return e[n].call(i.exports, i, i.exports, o),
        i.exports
    }
    o.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return o.d(t, {
            a: t
        }),
        t
    },
    o.d = (e, t) => {
        for (var n in t)
            o.o(t, n) && !o.o(e, n) && Object.defineProperty(e, n, {
                enumerable: !0,
                get: t[n]
            })
    },
    o.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t),
    (() => {
        "use strict";
        class e {
            constructor(e, t, o) {
                this.defaultValue = e,
                this.type = t,
                this.group = o
            }
        }
        function t(e, t) {
            Game.promptWrapL.className = "framed",
            Game.promptL.innerHTML = `${e}<div class="optionBox"></div>`,
            Object.keys(t).forEach((e => {
                    const o = document.createElement("a");
                    o.id = `promptOption${e}`,
                    o.className = "option",
                    o.onclick = function () {
                        PlaySound("snd/tick.mp3"),
                        t[e][1]()
                    },
                    o.textContent = t[e][0],
                    Game.promptL.children[1].appendChild(o)
                })),
            Game.promptAnchorL.style.display = "block",
            Game.darkenL.style.display = "block",
            Game.promptL.focus(),
            Game.promptOn = 1,
            Game.UpdatePrompt()
        }
        function n(e, t, o, a) {
            (1 === Game.mods.cookieMonsterFramework.saveData[e].settings[o] || a) && 3 === t && !1 === window.cookieMonsterFrameworkData.isInitializing || 1 === t ? (l("CMFlashScreen").style.backgroundColor = Game.mods.cookieMonsterFramework.saveData[e].settings[`Colour${o}`], l("CMFlashScreen").style.opacity = "0.5", 3 === t ? (l("CMFlashScreen").style.display = "inline", setTimeout((() => {
                            n(e, 2, o, !0)
                        }), 1e3 / Game.fps)) : setTimeout((() => {
                        n(e, 0, o, !0)
                    }), 1e3 / Game.fps)) : 2 === t ? (l("CMFlashScreen").style.opacity = "1", setTimeout((() => {
                        n(e, 1, o, !0)
                    }), 1e3 / Game.fps)) : 0 === t && (l("CMFlashScreen").style.display = "none")
        }
        function a() {
            Object.keys(Game.mods.cookieMonsterFramework.saveData).forEach((e => {
                    const t = JSON.stringify(Game.mods.cookieMonsterFramework.saveData[e]),
                    o = b64_to_utf8(unescape(localStorage.getItem("CookieClickerGame")).split("!END!")[0]),
                    n = new RegExp(`${e}.*(;|$)`),
                    a = o.match(n);
                    if (null !== a) {
                        const n = o.replace(a[0], `${e}:${t}`);
                        localStorage.setItem("CookieClickerGame", escape(`${utf8_to_b64(n)}!END!`))
                    }
                }))
        }
        function i(e, t) {
            void 0 === Game.mods.cookieMonsterFramework.saveData[e].headers[t] && (Game.mods.cookieMonsterFramework.saveData[e].headers[t] = 1),
            0 === Game.mods.cookieMonsterFramework.saveData[e].headers[t] ? Game.mods.cookieMonsterFramework.saveData[e].headers[t] = 1 : Game.mods.cookieMonsterFramework.saveData[e].headers[t] = 0,
            a()
        }
        var r = o(877),
        s = o.n(r);
        function c(e, t, o, n, a) {
            if ((1 === Game.mods.cookieMonsterFramework.saveData[e].settings[o] || a) && !1 === window.cookieMonsterFrameworkData.isInitializing) {
                const o = new Audio(t);
                Game.mods.cookieMonsterFramework.saveData[e].settings.GeneralSound ? o.volume = Game.mods.cookieMonsterFramework.saveData[e].settings[n] / 100 * (Game.volume / 100) : o.volume = Game.mods.cookieMonsterFramework.saveData[e].settings[n] / 100,
                o.play()
            }
        }
        function d(e, t) {
            null !== l(`slider${e}${t}`) && (l(`slider${e}${t}right`).innerHTML = `${l(` slider$ {
                    e
                }
                $ {
                t
            }
`).value}%`, Game.mods.cookieMonsterFramework.saveData[e].settings[t] = Math.round(l(`slider${e}${t}`).value)),
            a()
        }
        function m(e, t) {
            t.disconnect(),
            "log" === Game.onMenu ? function () {
                const e = l("menu").children[1];
                if (e.insertBefore(function () {
                        const e = document.createElement("div");
                        e.className = "subsection",
                        e.id = "cookieMonsterFrameworkMenuSection";
                        const t = document.createElement("div");
                        t.className = "title",
                        t.innerHTML = "Cookie Monster Mod Family";
                        const o = document.createElement("span");
                        if (o.style.cursor = "pointer", o.style.display = "inline-block", o.style.height = "14px", o.style.width = "14px", o.style.borderRadius = "7px", o.style.textAlign = "center", o.style.backgroundColor = "#C0C0C0", o.style.color = "black", o.style.fontSize = "13px", o.style.verticalAlign = "middle", o.textContent = Game.mods.cookieMonsterFramework.saveData.cookieMonsterFramework.headers.infoMenu ? "-" : "+", o.onclick = function () {
                            i("cookieMonsterFramework", "infoMenu"),
                            Game.UpdateMenu()
                        }, t.appendChild(o), e.appendChild(t), Game.mods.cookieMonsterFramework.saveData.cookieMonsterFramework.headers.infoMenu) {
                            const t = document.createElement("div");
                            t.className = "listing",
                            t.innerHTML = '<a href="https://github.com/CookieMonsterTeam" target="blank">Cookie Monster Team</a>\noffers a suite of tools to enhance your game experience.</br>\nOriginally known from our work on the Cookie Monster add-on we are now expanding and working on new tools within the Cookie Monster Mod Family.</br>\nKeep an eye on our GitHub to see future work or use it to report bugs or feature requests!</br>\n',
                            e.appendChild(t)
                        }
                        return e
                    }
                        (), e.children[1]), Game.mods.cookieMonsterFramework.saveData.cookieMonsterFramework.headers.infoMenu) {
                    const e = Game.mods.cookieMonsterFramework.listeners.infoMenu;
                    for (let t = 0; t < e.length; t++)
                        l("cookieMonsterFrameworkMenuSection").appendChild(e[t]())
                }
            }
            () : "prefs" === Game.onMenu && function () {
                const e = l("menu").children[2].children.length - 1;
                if (l("menu").children[2].insertBefore(function () {
                        const e = document.createElement("div");
                        e.className = "subsection",
                        e.id = "cookieMonsterFrameworkMenuSection";
                        const t = document.createElement("div");
                        t.className = "title",
                        t.innerHTML = "Cookie Monster Mod Family";
                        const o = document.createElement("span");
                        return o.style.cursor = "pointer",
                        o.style.display = "inline-block",
                        o.style.height = "14px",
                        o.style.width = "14px",
                        o.style.borderRadius = "7px",
                        o.style.textAlign = "center",
                        o.style.backgroundColor = "#C0C0C0",
                        o.style.color = "black",
                        o.style.fontSize = "13px",
                        o.style.verticalAlign = "middle",
                        o.textContent = Game.mods.cookieMonsterFramework.saveData.cookieMonsterFramework.headers.optionsMenu ? "-" : "+",
                        o.onclick = function () {
                            i("cookieMonsterFramework", "optionsMenu"),
                            Game.UpdateMenu()
                        },
                        t.appendChild(o),
                        e.appendChild(t),
                        e
                    }
                        (), l("menu").children[2].children[e]), Game.mods.cookieMonsterFramework.saveData.cookieMonsterFramework.headers.optionsMenu) {
                    const e = Game.mods.cookieMonsterFramework.listeners.optionsMenu;
                    for (let t = 0; t < e.length; t++)
                        l("cookieMonsterFrameworkMenuSection").appendChild(e[t]())
                }
            }
            (),
            t.observe(document.getElementById("menu"), {
                attributes: !0,
                childList: !0,
                subtree: !0
            })
        }
        function p() {}
        const u = {
            infoMenu: 1,
            optionsMenu: 1
        };
        function h(e, t, o, n, i) {
            const r = JSON.parse(t);
            Game.mods.cookieMonsterFramework.saveData[e] = function (e, t, o) {
                const n = {},
                a = {};
                Object.keys(t).forEach((o => {
                        void 0 === e.settings || void 0 === e.settings[o] ? a[o] = t[o].defaultValue : a[o] = e.settings[o]
                    })),
                n.settings = a;
                const i = {};
                return Object.keys(o).forEach((t => {
                        void 0 === e.headers || void 0 === e.headers[t] ? i[t] = o[t] : i[t] = e.headers[t]
                    })),
                n.headers = i,
                Object.keys(e).forEach((t => {
                        "settings" !== t && "headers" !== t && (n[t] = e[t])
                    })),
                void 0 === n.favouriteSettings && (n.favouriteSettings = []),
                n
            }
            (r, o, n),
            a(),
            i(),
            Object.keys(Game.mods.cookieMonsterFramework.saveData[e].settings).forEach((e => {
                    void 0 !== o[e].func && o[e].func()
                })),
            Game.UpdateMenu()
        }
        function g() {}
        const f = {};
        function k(e) {
            h("cookieMonsterFramework", e, f, u, g)
        }
        const M = {
            init: function () {
                window.cookieMonsterFrameworkData = {
                    isInitializing: !0
                },
                new MutationObserver(m).observe(document.getElementById("menu"), {
                    attributes: !0,
                    childList: !0,
                    subtree: !0
                }),
                function () {
                    const e = document.createElement("div");
                    e.id = "CMFlashScreen",
                    e.style.width = "100%",
                    e.style.height = "100%",
                    e.style.backgroundColor = "white",
                    e.style.display = "none",
                    e.style.zIndex = "9999999999",
                    e.style.position = "absolute",
                    e.style.pointerEvents = "none",
                    l("wrapper").appendChild(e)
                }
                (),
                Game.registerHook("draw", p),
                void 0 === Game.modSaveData.cookieMonsterFramework && k("{}"),
                window.cookieMonsterFrameworkData.isInitializing = !1
            },
            load: k,
            save: function () {
                return JSON.stringify(Game.mods.cookieMonsterFramework.saveData.cookieMonsterFramework)
            },
            listeners: {
                infoMenu: [],
                optionsMenu: []
            },
            saveData: {
                cookieMonsterFramework: {
                    headers: {},
                    settings: {}
                }
            }
        },
        y = function () {
            "undefined" == typeof cookieMonsterFrameworkData && Game.registerMod("cookieMonsterFramework", M)
        },
        C = function (e) {
            Game.mods.cookieMonsterFramework.saveData[e] = {
                favouriteSettings: [],
                headers: {},
                settings: {}
            }
        },
        b = {
            createInfoListing: function (e) {
                const t = document.createElement("div");
                return t.className = "listing",
                t.innerHTML = e,
                t
            },
            createOptionsListing: function (e, o, i, m, p) {
                const u = document.createElement("div");
                if (u.className = "listing", 1 === Game.mods.cookieMonsterFramework.saveData[e].settings.FavouriteSettings && u.appendChild(function (e, t, o) {
                        const n = document.createElement("a");
                        return o.includes(t) ? (n.innerText = "★", n.style.color = "yellow") : n.innerText = "☆",
                        n.className = "option",
                        n.onclick = function () {
                            !function (e, t) {
                                Game.mods.cookieMonsterFramework.saveData[e].favouriteSettings.includes(t) ? Game.mods.cookieMonsterFramework.saveData[e].favouriteSettings = Game.mods.cookieMonsterFramework.saveData[e].favouriteSettings.filter((e => e !== t)) : Game.mods.cookieMonsterFramework.saveData[e].favouriteSettings.push(t),
                                a()
                            }
                            (e, t),
                            a(),
                            Game.UpdateMenu()
                        },
                        n.onmouseover = function () {
                            Game.tooltip.draw(this, escape('<div style="min-width: 250px; margin-bottom: 4px;"><div style="text-align: left;">Click to set this setting as favourite and show it in \'favourite\' settings at the top of the Cookie Monster Settings</div></div>'))
                        },
                        n.onmouseout = function () {
                            Game.tooltip.hide()
                        },
                        n.appendChild(document.createTextNode(" ")),
                        n
                    }
                        (e, o, Game.mods.cookieMonsterFramework.saveData[e].favouriteSettings)), "bool" === i[o].type) {
                    const t = document.createElement("a");
                    i[o].toggle && 0 === Game.mods.cookieMonsterFramework.saveData[e].settings[o] ? t.className = "option off" : t.className = "option",
                    t.id = `${e}Options${o}`,
                    t.onclick = function () {
                        !function (e, t, o) {
                            Game.mods.cookieMonsterFramework.saveData[e].settings[t] += 1,
                            Game.mods.cookieMonsterFramework.saveData[e].settings[t] === o[t].label.length ? (Game.mods.cookieMonsterFramework.saveData[e].settings[t] = 0, o[t].toggle && (l(`${e}Options${t}`).className = "option off")) : l(`${e}Options${t}`).className = "option",
                            void 0 !== o[t].func && o[t].func(),
                            a()
                        }
                        (e, o, i),
                        Game.UpdateMenu()
                    },
                    t.textContent = i[o].label[Game.mods.cookieMonsterFramework.saveData[e].settings[o]],
                    u.appendChild(t);
                    const n = document.createElement("label");
                    return n.textContent = i[o].desc,
                    n.style.lineHeight = "1.6",
                    u.appendChild(n),
                    u
                }
                if ("vol" === i[o].type) {
                    const t = document.createElement("div");
                    t.className = "sliderBox";
                    const n = document.createElement("div");
                    n.style.float = "left",
                    n.innerHTML = i[o].desc,
                    t.appendChild(n);
                    const a = document.createElement("div");
                    a.id = `slider${e}${o}right`,
                    a.style.float = "right",
                    a.innerHTML = `${Game.mods.cookieMonsterFramework.saveData[e].settings[o]}%`,
                    t.appendChild(a);
                    const r = document.createElement("input");
                    r.className = "slider",
                    r.id = `slider${e}${o}`,
                    r.style.clear = "both",
                    r.type = "range",
                    r.min = "0",
                    r.max = "100",
                    r.step = "1",
                    r.value = Game.mods.cookieMonsterFramework.saveData[e].settings[o],
                    r.oninput = function () {
                        d(e, o),
                        Game.UpdateMenu()
                    },
                    r.onchange = function () {
                        d(e, o),
                        Game.UpdateMenu()
                    },
                    t.appendChild(r),
                    u.appendChild(t);
                    const s = document.createElement("a");
                    return s.className = "option",
                    s.onclick = function () {
                        c(e, Game.mods.cookieMonsterFramework.saveData[e].settings[o.replace("Volume", "SoundURL")], o.replace("Volume", "Sound"), o, !0)
                    },
                    s.textContent = "Test sound",
                    u.appendChild(s),
                    u
                }
                if ("url" === i[o].type) {
                    const n = document.createElement("span");
                    n.className = "option",
                    n.textContent = `${i[o].label} `,
                    n.style.lineHeight = "1.6",
                    u.appendChild(n);
                    const r = document.createElement("input");
                    r.id = `${e}Options${o}`,
                    r.className = "option",
                    r.type = "text",
                    r.readOnly = !0,
                    r.value = Game.mods.cookieMonsterFramework.saveData[e].settings[o],
                    r.style.width = "300px",
                    u.appendChild(r),
                    u.appendChild(document.createTextNode(" "));
                    const s = document.createElement("input");
                    s.id = `${e}Options${o}Prompt`,
                    s.className = "option",
                    s.type = "text",
                    s.value = Game.mods.cookieMonsterFramework.saveData[e].settings[o];
                    const c = document.createElement("a");
                    c.className = "option",
                    c.onclick = function () {
                        t(s.outerHTML, [["Save", function () {
                                        Game.mods.cookieMonsterFramework.saveData[e].settings[o] = l(`${e}Options${o}Prompt`).value,
                                        a(),
                                        Game.ClosePrompt(),
                                        Game.UpdateMenu()
                                    }
                                ], ["Cancel", function () {
                                        Game.ClosePrompt()
                                    }
                                ]])
                    },
                    c.textContent = "Edit",
                    u.appendChild(c);
                    const d = document.createElement("label");
                    return d.textContent = i[o].desc,
                    d.style.lineHeight = "1.6",
                    u.appendChild(d),
                    u
                }
                if ("colour" === i[o].type) {
                    const t = document.createElement("span");
                    t.className = "option";
                    const l = document.createElement("input");
                    l.id = o,
                    l.style.width = "65px",
                    l.value = Game.mods.cookieMonsterFramework.saveData[e].settings[o],
                    t.appendChild(l),
                    new r(l, {
                        hash: !0,
                        position: "right",
                        onInput: function () {
                            Game.mods.cookieMonsterFramework.saveData[e].settings[this.targetElement.id] = this.toHEXString(),
                            m(),
                            a(),
                            Game.UpdateMenu()
                        }
                    });
                    const c = document.createElement("label");
                    if (c.textContent = i[o].desc, c.style.lineHeight = "1.6", t.appendChild(c), o.includes("Flash")) {
                        const a = document.createElement("a");
                        a.className = "option",
                        a.onclick = function () {
                            n(e, 3, o.replace("Colour", ""), !0)
                        },
                        a.textContent = "Test flash",
                        t.appendChild(a)
                    }
                    return u.appendChild(t),
                    s().init(),
                    u
                }
                if ("numscale" === i[o].type) {
                    const t = document.createElement("span");
                    t.className = "option",
                    t.textContent = `${i[o].label} `,
                    t.style.lineHeight = "1.6",
                    u.appendChild(t);
                    const n = document.createElement("input");
                    n.id = `${e}Options${o}`,
                    n.className = "option",
                    n.type = "number",
                    n.value = Game.mods.cookieMonsterFramework.saveData[e].settings[o],
                    n.min = i[o].min,
                    n.max = i[o].max,
                    n.oninput = function () {
                        Game.mods.cookieMonsterFramework.saveData[e].settings[o] = this.value,
                        a(),
                        p(),
                        Game.UpdateMenu()
                    },
                    u.appendChild(n),
                    u.appendChild(document.createTextNode(" "));
                    const r = document.createElement("label");
                    return r.textContent = i[o].desc,
                    r.style.lineHeight = "1.6",
                    u.appendChild(r),
                    u
                }
                if ("keycode" === i[o].type) {
                    const n = document.createElement("input");
                    n.id = `${e}Options${o}Prompt`,
                    n.className = "option",
                    n.type = "text",
                    n.value = Game.mods.cookieMonsterFramework.saveData[e].settings[o].displayName;
                    const r = document.createElement("a");
                    r.className = "option",
                    r.id = `${e}Options${o}`,
                    r.onclick = function () {
                        t(n.outerHTML, []),
                        l(`${e}Options${o}Prompt`).addEventListener("keyup", (t => {
                                !function (e, t, o) {
                                    const n = {
                                        key: o.key,
                                        altKey: o.altKey,
                                        ctrlKey: o.ctrlKey,
                                        shiftKey: o.shiftKey,
                                        displayName: `${o.shiftKey?"Shift + ":""}${o.altKey?"Alt + ":""}${o.ctrlKey?"Ctrl + ":""}${o.key}`
                                    };
                                    Game.mods.cookieMonsterFramework.saveData[e].settings[t] = n,
                                    a()
                                }
                                (e, o, t),
                                Game.ClosePrompt(),
                                Game.UpdateMenu()
                            }))
                    },
                    r.textContent = Game.mods.cookieMonsterFramework.saveData[e].settings[o].displayName,
                    u.appendChild(r);
                    const s = document.createElement("label");
                    return s.textContent = i[o].desc,
                    s.style.lineHeight = "1.6",
                    u.appendChild(s),
                    u
                }
                return u
            },
            createOptionsSubHeader: function (e, t, o) {
                const n = document.createElement("div");
                n.className = "title",
                n.style.opacity = "0.7",
                n.style.fontSize = "17px",
                n.appendChild(document.createTextNode(`${o} `));
                const a = document.createElement("span");
                return a.style.cursor = "pointer",
                a.style.display = "inline-block",
                a.style.height = "14px",
                a.style.width = "14px",
                a.style.borderRadius = "7px",
                a.style.textAlign = "center",
                a.style.backgroundColor = "#C0C0C0",
                a.style.color = "black",
                a.style.fontSize = "13px",
                a.style.verticalAlign = "middle",
                a.textContent = Game.mods.cookieMonsterFramework.saveData[e].headers[t] ? "-" : "+",
                a.onclick = function () {
                    i(e, t),
                    Game.UpdateMenu()
                },
                n.appendChild(a),
                n
            }
        },
        G = function (e, t, o) {
            const n = document.createElement("div");
            n.className = "subsection",
            n.id = `${e}MenuSection`;
            const a = document.createElement("div");
            a.className = "title",
            a.style.fontSize = "18px",
            a.innerHTML = t;
            const r = document.createElement("span");
            return r.style.cursor = "pointer",
            r.style.display = "inline-block",
            r.style.height = "14px",
            r.style.width = "14px",
            r.style.borderRadius = "7px",
            r.style.textAlign = "center",
            r.style.backgroundColor = "#C0C0C0",
            r.style.color = "black",
            r.style.fontSize = "13px",
            r.style.verticalAlign = "middle",
            r.textContent = Game.mods.cookieMonsterFramework.saveData[e].headers[o] ? "-" : "+",
            r.onclick = function () {
                i(e, o),
                Game.UpdateMenu()
            },
            a.appendChild(r),
            n.appendChild(a),
            n
        },
        v = {
            createFlash: n,
            createNotification: function (e, t, o, n) {
                1 === Game.mods.cookieMonsterFramework.saveData[e].settings[t] && "hidden" === document.visibilityState && !1 === window.cookieMonsterFrameworkData.isInitializing && new Notification(o, {
                    body: n,
                    badge: "https://orteil.dashnet.org/cookieclicker/favicon.ico"
                })
            },
            cookieMonsterPrompt: t,
            playCMSound: c
        },
        w = {
            loadMod: h,
            saveFramework: a
        },
        x = class extends e {
            constructor(e, t, o, n) {
                super(e, t, o),
                this.desc = n
            }
        },
        T = class extends e {
            constructor(e, t, o, n, a, i, r) {
                super(e, t, o),
                this.label = n,
                this.desc = a,
                this.min = i,
                this.max = r
            }
        },
        S = class extends e {
            constructor(e, t, o, n, a, i) {
                super(e, t, o),
                this.label = n,
                this.desc = a,
                this.toggle = i
            }
        },
        F = class extends e {
            constructor(e, t, o, n, a, i, r) {
                super(e, t, o),
                this.label = n,
                this.desc = a,
                this.toggle = i,
                void 0 !== r && (this.func = r)
            }
        },
        E = class extends e {
            constructor(e, t, o, n, a) {
                super(e, t, o),
                this.label = n,
                this.desc = a;
                for (let e = 0; e < 101; e++)
                    this.label[e] = `${e}%`
            }
        };
        function B() {
            Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.WrinklerButtons && Game.elderWrath ? (l("PopAllNormalWrinklerButton").style.display = "", l("PopFattestWrinklerButton").style.display = "") : (l("PopAllNormalWrinklerButton").style.display = "none", l("PopFattestWrinklerButton").style.display = "none")
        }
        const P = ["", "", "M", "G", "T", "P", "E", "Z", "Y"],
        N = ["", "", "M", "B", "Tr", "Quadr", "Quint", "Sext", "Sept", "Oct", "Non", "Dec", "Undec", "Duodec", "Tredec", "Quattuordec", "Quindec", "Sexdec", "Septendec", "Octodec", "Novemdec", "Vigint", "Unvigint", "Duovigint", "Trevigint", "Quattuorvigint"],
        O = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "De", "UDe", "DDe", "TDe", "QaDe", "QiDe", "SxDe", "SpDe", "ODe", "NDe", "Vi", "UVi", "DVi", "TVi", "QaVi", "QiVi", "SxVi", "SpVi", "OVi", "NVi", "Tr", "UTr", "DTr", "TTr", "QaTr", "QiTr", "SxTr", "SpTr", "OTr", "NTr", "Qaa", "UQa", "DQa", "TQa", "QaQa", "QiQa", "SxQa", "SpQa", "OQa", "NQa", "Qia", "UQi", "DQi", "TQi", "QaQi", "QiQi", "SxQi", "SpQi", "OQi", "NQi", "Sxa", "USx", "DSx", "TSx", "QaSx", "QiSx", "SxSx", "SpSx", "OSx", "NSx", "Spa", "USp", "DSp", "TSp", "QaSp", "QiSp", "SxSp", "SpSp", "OSp", "NSp", "Oco", "UOc", "DOc", "TOc", "QaOc", "QiOc", "SxOc", "SpOc", "OOc", "NOc", "Noa", "UNo", "DNo", "TNo", "QaNo", "QiNo", "SxNo", "SpNo", "ONo", "NNo", "Ct", "UCt"];
        let D,
        L,
        A,
        W,
        j,
        $,
        H,
        U,
        R,
        I,
        z,
        V,
        _,
        X,
        Q,
        q,
        Y = [],
        K = [],
        J = [],
        Z = {},
        ee = Date.now(),
        te = Date.now();
        function oe(e, t, o) {
            const n = Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ScaleDecimals + 1;
            if (e === 1 / 0)
                return "Infinity";
            if (void 0 === e)
                return "0";
            if (0 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.Scale)
                return Z.Beautify(e, t);
            if (Number.isFinite(e)) {
                if (e < 0)
                    return `-${oe(Math.abs(e))}`;
                let a = "";
                if (0 === e)
                    return e.toString();
                if (e > .001 && e < Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ScaleCutoff)
                    return a = Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ScaleSeparator ? e.toLocaleString("nl") : e.toLocaleString("en"), a;
                if (4 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.Scale && !o || 4 === o)
                    a = e.toExponential(n).toString().replace("e", "E");
                else {
                    const t = e.toExponential().toString(),
                    i = Math.floor(t.slice(t.indexOf("e") + 1) / 3);
                    a = (e / Number("1e" + 3 * i)).toFixed(n),
                    1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.Scale && !o || 1 === o ? e >= .01 && e < Number("1e" + 3 * P.length) ? a += ` ${P[i]}` : a = oe(e, 0, 4) : 2 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.Scale && !o || 2 === o ? e >= .01 && e < Number("1e" + 3 * N.length) ? a += ` ${N[i]}` : a = oe(e, 0, 4) : 3 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.Scale && !o || 3 === o ? e >= .01 && e < Number("1e" + 3 * O.length) ? a += ` ${O[i]}` : a = oe(e, 0, 4) : (5 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.Scale && !o || 5 === o) && (a += "E" + 3 * i)
                }
                return "" === a && (console.log(`Could not beautify number with Cookie Monster Beautify: ${e}`), a = Z.Beautify(e, t)),
                Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ScaleSeparator && (a = a.replace(".", ",")),
                a
            }
            return console.log(`Could not beautify number with Cookie Monster Beautify: ${e}`),
            Z.Beautify(e, t)
        }
        let ne,
        ae,
        ie,
        re,
        se,
        le,
        ce,
        de,
        me,
        pe,
        ue,
        he,
        ge,
        fe,
        ke,
        Me,
        ye,
        Ce,
        be,
        Ge,
        ve,
        we,
        xe,
        Te,
        Se,
        Fe,
        Ee,
        Be,
        Pe,
        Ne,
        Oe,
        De,
        Le,
        Ae,
        We,
        je,
        $e,
        He = 0,
        Ue = 0,
        Re = 0,
        Ie = 0,
        ze = 0,
        Ve = 0,
        _e = 0,
        Xe = 0,
        Qe = 0,
        qe = 0,
        Ye = 0,
        Ke = 0,
        Je = 0,
        Ze = 0,
        et = 0,
        tt = 1,
        ot = 1,
        nt = 1,
        at = 0,
        it = 0,
        rt = 0,
        st = 0,
        lt = {},
        ct = {},
        dt = {},
        mt = {},
        pt = 0,
        ut = 0,
        ht = [0, null],
        gt = 0,
        ft = 0,
        kt = {},
        Mt = {},
        yt = {},
        Ct = {},
        bt = {},
        Gt = 0,
        vt = 0,
        wt = [],
        xt = 0,
        Tt = 0,
        St = [],
        Ft = 0,
        Et = 0,
        Bt = [],
        Pt = 0,
        Nt = 0,
        Ot = [],
        Dt = 0,
        Lt = 0,
        At = {},
        Wt = {},
        jt = 0,
        $t = 0,
        Ht = 0,
        Ut = [],
        Rt = {},
        It = 0,
        zt = {
            0: [0, 0, 0],
            1: [0, 0, 0],
            2: [0, 0, 0],
            3: [0, 0, 0],
            4: [0, 0, 0],
            5: [0, 0, 0],
            6: [0, 0, 0],
            7: [0, 0, 0],
            8: [0, 0, 0],
            9: [0, 0, 0],
            10: [0, 0, 0]
        },
        Vt = [],
        _t = [],
        Xt = [];
        function Qt(e) {
            let t = 0;
            return Game.dragonAuras[Be].name !== e && Game.dragonAuras[Pe].name !== e || (t = 1),
            "Reality Bending" !== Game.dragonAuras[Be].name && "Reality Bending" !== Game.dragonAuras[Pe].name || (t += .1),
            t
        }
        function qt() {
            let e = .25;
            return e *= 1 + Qt("Earth Shatterer"),
            e
        }
        function Yt(e, t) {
            return void 0 === Ae[e] ? void 0 === t ? 1 : t : Ae[e]
        }
        function Kt(e) {
            const t = _t[e];
            return (1 !== Game.ascensionMode || "prestige" !== t.pool && "fortune" !== t.tier) && t ? t.bought : 0
        }
        function Jt(e) {
            if (Game.hasGod) {
                void 0 === Vt.Temple.minigame && (Vt.Temple.minigame = Game.Objects.Temple.minigame);
                const t = Vt.Temple.minigame.gods[e];
                if (Ne === t.id)
                    return 1;
                if (Oe === t.id)
                    return 2;
                if (De === t.id)
                    return 3
            }
            return !1
        }
        function Zt(e, t) {
            let o = t;
            if (Kt("Season savings") && (o *= .99), Kt("Santa's dominion") && (o *= .99), Kt("Faberge egg") && (o *= .99), Kt("Divine discount") && (o *= .99), Kt("Fortune #100") && (o *= .99), o *= 1 - .02 * Qt("Fierce Hoarder"), Game.hasBuff("Everything must go") && (o *= .95), Game.hasBuff("Crafty pixies") && (o *= .98), Game.hasBuff("Nasty goblins") && (o *= 1.02), e.fortune && Kt(e.fortune.name) && (o *= .93), o *= Yt("buildingCost"), Vt.Temple.minigameLoaded) {
                const e = Jt("creation");
                1 === e ? o *= .93 : 2 === e ? o *= .95 : 3 === e && (o *= .98)
            }
            return o
        }
        function eo(e, t, o, n, a, i) {
            const r = void 0 === i ? 0 : i;
            let s = a,
            l = o,
            c = 0;
            -1 === a && (s = l),
            a || (s = Game.buyBulk);
            for (let o = 0; o < s; o++) {
                let o = t * Game.priceIncrease ** Math.max(0, l - n);
                o = r ? Game.modifyBuildingPrice(e, o) : Zt(e, o),
                o = Math.ceil(o);
                const a = r ? e.getSellMultiplier() : qt();
                o = Math.floor(o * a),
                l > 0 && (c += o, l -= 1)
            }
            return c
        }
        const to = "CMText",
        oo = "CMBack",
        no = "Blue",
        ao = "Green",
        io = "Yellow",
        ro = "Orange",
        so = "Red",
        lo = "Purple",
        co = "Gray",
        mo = "Pink",
        po = "Brown",
        uo = [no, ao, io, ro, so, lo, mo, po, co],
        ho = [["GoldCookTooltipPlaceholder", "Calculated with Golden Switch off", "200px"], ["GoldCookDragonsFortuneTooltipPlaceholder", "Calculated with Golden Switch off and at least one golden cookie on-screen", "240px"], ["PrestMaxTooltipPlaceholder", "The MAX prestige is calculated with the cookies gained from popping all wrinklers with Skruuia god in Diamond slot, selling all stock market goods, selling all buildings with Earth Shatterer and Reality Bending auras, and buying Chocolate egg", "320px"], ["NextPrestTooltipPlaceholder", "Calculated with cookies gained from wrinklers and Chocolate egg", "200px"], ["HeavenChipMaxTooltipPlaceholder", "The MAX heavenly chips is calculated with the cookies gained from popping all wrinklers with Skruuia god in Diamond slot, selling all stock market goods, selling all buildings with Earth Shatterer and Reality Bending auras, and buying Chocolate egg", "330px"], ["ResetTooltipPlaceholder", "The bonus income you would get from new prestige levels unlocked at 100% of its potential and from ascension achievements if you have the same buildings/upgrades after reset", "370px"], ["ChoEggTooltipPlaceholder", "The amount of cookies you would get from popping all wrinklers with Skruuia god in Diamond slot, selling all stock market goods, selling all buildings with Earth Shatterer and Reality Bending auras, and then buying Chocolate egg", "300px"], ["ChainNextLevelPlaceholder", "Cheated cookies might break this formula", "250px"], ["FavouriteSettingPlaceholder", "Click to set this setting as favourite and show it in 'favourite' settings at the top of the Cookie Monster Settings", "250px"]],
        go = {};
        let fo,
        ko = 0,
        Mo = -1,
        yo = [],
        Co = function () {},
        bo = 1,
        Go = 1,
        vo = 1;
        const wo = [10, 15, 30, 60, 300, 600, 900, 1800],
        xo = [1, 5, 10, 15, 30],
        To = {
            Frenzy: io,
            "Dragon Harvest": po,
            "Elder frenzy": ao,
            Clot: so,
            "Click frenzy": no,
            Dragonflight: mo
        };
        let So,
        Fo,
        Eo,
        Bo,
        Po,
        No,
        Oo,
        Do = {},
        Lo = "";
        function Ao() {
            let e,
            t = Game.buyBulk;
            1 === Game.buyMode ? Go = t : t = Go,
            1 === t ? t = lt : 10 === t ? t = ct : 100 === t && (t = dt),
            l("storeBulk1").style.removeProperty("color"),
            l("storeBulk10").style.removeProperty("color"),
            l("storeBulk100").style.removeProperty("color"),
            1 === Game.buyMode ? 1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.BuildColour ? (Object.keys(t).forEach((e => {
                        l(`productPrice${Game.Objects[e].id}`).style.color = Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings[`Colour${t[e].colour}`]
                    })), l(`storeBulk${Ht}`).style.color = Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ColourGreen) : Object.keys(Game.Objects).forEach((e => {
                    l(`productPrice${Game.Objects[e].id}`).style.removeProperty("color")
                })) : -1 === Game.buyMode && Object.keys(lt).forEach((e => {
                    const t = Game.Objects[e];
                    l(`productPrice${t.id}`).style.color = "",
                    l(`productPrice${t.id}`).innerHTML = oe(eo(t, t.basePrice, t.amount, t.free, Game.buyBulk, 1))
                })),
            1 === Game.buyMode && Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.SortBuildings ? 1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.SortBuildings ? (e = Object.keys(lt).map((e => {
                            const t = {};
                            return t.name = e,
                            t.pp = lt[e].pp,
                            t.colour = lt[e].colour,
                            t
                        })), e.sort(((e, t) => uo.indexOf(e.colour) === uo.indexOf(t.colour) ? e.pp - t.pp : uo.indexOf(e.colour) - uo.indexOf(t.colour)))) : 2 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.SortBuildings ? (e = Object.keys(t).map((e => {
                            const o = {};
                            return o.name = e,
                            o.pp = t[e].pp,
                            o.colour = t[e].colour,
                            o
                        })), e.sort(((e, t) => uo.indexOf(e.colour) === uo.indexOf(t.colour) ? e.pp - t.pp : uo.indexOf(e.colour) - uo.indexOf(t.colour)))) : 3 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.SortBuildings && (e = Object.keys(mt).map((e => {
                            const t = {};
                            return t.name = e,
                            t.id = Game.Objects[e].id,
                            t.amountUntilNext = mt[e].AmountNeeded,
                            t.priceUntilNext = mt[e].price,
                            t
                        })), e.sort(((e, t) => e.id - t.id)), e.sort(((e, t) => (101 !== e.amountUntilNext ? e.priceUntilNext : 1 / 0) - (101 !== t.amountUntilNext ? t.priceUntilNext : 1 / 0)))) : (e = Object.keys(lt).map((e => {
                            const t = {};
                            return t.name = e,
                            t.id = Game.Objects[e].id,
                            t
                        })), e.sort(((e, t) => e.id - t.id)));
            for (let t = 0; t < e.length; t++)
                Game.Objects[e[t].name].l.style.gridRow = `${t+2}/${t+2}`
        }
        function Wo() {
            Object.values(document.getElementsByClassName("storeSection")).forEach((e => {
                    Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.UpgradesNeverCollapse || "products" === e.id ? e.style.height = "auto" : "vaultUpgrades" === e.id ? (e.style.height = "", e.style.minHeight = "0px") : "upgrades" === e.id ? (e.style.height = "", e.className.includes("hasMenu") ? e.style.minHeight = "82px" : e.style.minHeight = "60px") : (e.style.height = "", e.style.minHeight = "60px")
                }))
        }
        function jo() {
            if (Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.UpBarColour > 0) {
                let e = 0,
                t = 0,
                o = 0,
                n = 0,
                a = 0,
                i = 0,
                r = 0;
                Object.keys(Game.UpgradesInStore).forEach((s => {
                        const c = Game.UpgradesInStore[s];
                        let d = !1;
                        for (let e = 0; e < l(`upgrade${s}`).childNodes.length; e += 1)
                            if (-1 !== l(`upgrade${s}`).childNodes[e].className.indexOf(oo)) {
                                l(`upgrade${s}`).childNodes[e].className = oo + kt[c.name].colour,
                                d = !0;
                                break
                            }
                        if (!d) {
                            const e = document.createElement("div");
                            e.style.width = "10px",
                            e.style.height = "10px",
                            e.className = oo + kt[c.name].colour,
                            l(`upgrade${s}`).appendChild(e)
                        }
                        kt[c.name].colour === no ? e += 1 : kt[c.name].colour === ao ? t += 1 : kt[c.name].colour === io ? o += 1 : kt[c.name].colour === ro ? n += 1 : kt[c.name].colour === so ? a += 1 : kt[c.name].colour === lo ? i += 1 : kt[c.name].colour === co && (r += 1)
                    })),
                l("CMUpgradeBarBlue").textContent = e,
                l("CMUpgradeBarGreen").textContent = t,
                l("CMUpgradeBarYellow").textContent = o,
                l("CMUpgradeBarOrange").textContent = n,
                l("CMUpgradeBarRed").textContent = a,
                l("CMUpgradeBarPurple").textContent = i,
                l("CMUpgradeBarGray").textContent = r
            }
            const e = [];
            for (let t = 0; t < Game.UpgradesInStore.length; t += 1) {
                const o = {};
                o.name = Game.UpgradesInStore[t].name,
                o.price = Game.UpgradesInStore[t].basePrice,
                o.pp = kt[o.name].pp,
                o.colour = kt[o.name].colour,
                e.push(o)
            }
            Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.SortUpgrades ? e.sort(((e, t) => uo.indexOf(e.colour) === uo.indexOf(t.colour) ? e.pp - t.pp : uo.indexOf(e.colour) - uo.indexOf(t.colour))) : e.sort(((e, t) => e.price - t.price));
            const t = function (e, t) {
                return e.findIndex((e => e.name === t.name))
            };
            for (let o = 0; o < Game.UpgradesInStore.length; o += 1)
                l(`upgrade${o}`).style.order = t(e, Game.UpgradesInStore[o]) + 1
        }
        function $o(e, t) {
            let o = e;
            if (e === 1 / 0)
                return e;
            if (e < 0)
                return "Negative time period";
            o = Math.ceil(e);
            const n = Math.floor(o / 31536e3),
            a = Math.floor(o % 31536e3 / 86400),
            i = Math.floor(o % 31536e3 % 86400 / 3600),
            r = Math.floor(o % 31536e3 % 86400 % 3600 / 60),
            s = Math.floor(o % 31536e3 % 86400 % 3600 % 60);
            let l = "";
            if (0 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimeFormat) {
                if (o > 7776e5)
                    return t ? "Over 9000 days!" : ">9000d";
                l += n > 0 ? n + (t ? 1 === n ? " year" : " years" : "y") + ", " : "",
                (l.length > 0 || a > 0) && (l += a + (t ? 1 === a ? " day" : " days" : "d") + ", "),
                (l.length > 0 || i > 0) && (l += i + (t ? 1 === i ? " hour" : " hours" : "h") + ", "),
                (l.length > 0 || r > 0) && (l += r + (t ? 1 === r ? " minute" : " minutes" : "m") + ", "),
                l += s + (t ? 1 === s ? " second" : " seconds" : "s")
            } else if (1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimeFormat) {
                if (o > 315576e4)
                    return "XX:XX:XX:XX:XX";
                l += (n < 10 ? "0" : "") + n + ":",
                l += (a < 10 ? "0" : "") + a + ":",
                l += (i < 10 ? "0" : "") + i + ":",
                l += (r < 10 ? "0" : "") + r + ":",
                l += (s < 10 ? "0" : "") + s
            } else {
                if (o > 7776e5)
                    return t ? "Over 9000 days!" : ">9000d";
                n > 0 ? (l += n + (t ? 1 === n ? " year" : " years" : "y") + ", ", l += a + (t ? 1 === a ? " day" : " days" : "d")) : a > 0 ? (l += a + (t ? 1 === a ? " day" : " days" : "d") + ", ", l += i + (t ? 1 === i ? " hour" : " hours" : "h")) : i > 0 ? (l += i + (t ? 1 === i ? " hour" : " hours" : "h") + ", ", l += r + (t ? 1 === r ? " minute" : " minutes" : "m")) : r > 0 ? (l += r + (t ? 1 === r ? " minute" : " minutes" : "m") + ", ", l += s + (t ? 1 === s ? " second" : " seconds" : "s")) : l += s + (t ? 1 === s ? " second" : " seconds" : "s")
            }
            return l
        }
        function Ho(e) {
            let t,
            o;
            return e <= 0 ? (o = 1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimeFormat ? "00:00:00:00:00" : "Done!", t = ao) : (o = $o(e), t = e > 300 ? so : e > 60 ? ro : io), {
                text: o,
                colour: t
            }
        }
        function Uo() {
            return Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.CPSMode ? ye : 0 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.CalcWrink ? Game.cookiesPs * (1 - Game.cpsSucked) : 1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.CalcWrink ? Game.cookiesPs * (gt + (1 - .05 * ft)) : null !== ht[1] && 2 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.CalcWrink && 1 === Game.wrinklers[ht[1]].type ? Game.cookiesPs * (3 * gt / ft + (1 - .05 * ft)) : Game.cookiesPs * (gt / ft + (1 - .05 * ft))
        }
        function Ro() {
            return 1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.CalcWrink ? pt : 2 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.CalcWrink ? ht[0] : 0
        }
        function Io(e, t, o) {
            const n = document.createElement("div");
            n.id = e,
            n.style.height = "12px",
            n.style.margin = "0px 10px",
            n.style.position = "relative";
            const a = document.createElement("div");
            a.style.width = "100%",
            a.style.height = "10px",
            a.style.margin = "auto",
            a.style.position = "absolute",
            a.style.left = "0px",
            a.style.top = "0px",
            a.style.right = "0px",
            a.style.bottom = "0px";
            const i = document.createElement("span");
            i.style.display = "inline-block",
            i.style.textAlign = "right",
            i.style.fontSize = "10px",
            i.style.width = "108px",
            i.style.marginRight = "5px",
            i.style.verticalAlign = "text-top",
            i.textContent = t,
            a.appendChild(i);
            for (let e = 0; e < o.length; e++) {
                const t = document.createElement("span");
                t.id = o[e].id,
                t.style.display = "inline-block",
                t.style.height = "10px",
                t.style.verticalAlign = "text-top",
                t.style.textAlign = "center",
                o.length - 1 === e && (t.style.borderTopRightRadius = "10px", t.style.borderBottomRightRadius = "10px"),
                void 0 !== o[e].colour && (t.className = oo + o[e].colour),
                a.appendChild(t)
            }
            const r = document.createElement("span");
            return r.id = `${e}Time`,
            r.style.marginLeft = "5px",
            r.style.verticalAlign = "text-top",
            a.appendChild(r),
            n.appendChild(a),
            n
        }
        function zo(e) {
            if (null !== l("CMBotBar")) {
                const t = l("CMBotBar").firstChild.firstChild.childNodes[0],
                o = l("CMBotBar").firstChild.firstChild.childNodes[1],
                n = l("CMBotBar").firstChild.firstChild.childNodes[2],
                a = l("CMBotBar").firstChild.firstChild.childNodes[3],
                i = e,
                r = t.appendChild(document.createElement("td"));
                r.appendChild(document.createTextNode(`${-1!==i.indexOf(" ")?i.substring(0,i.indexOf(" ")):i} (`)),
                r.appendChild(document.createElement("span")).className = "CMTextBlue",
                r.appendChild(document.createTextNode(")")),
                t.lastChild.style.paddingLeft = "8px",
                o.appendChild(document.createElement("td")),
                o.lastChild.style.paddingLeft = "8px",
                n.appendChild(document.createElement("td")),
                n.lastChild.style.paddingLeft = "8px",
                a.appendChild(document.createElement("td")),
                a.lastChild.style.paddingLeft = "2px"
            }
        }
        function Vo() {
            if (1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.BotBar && lt && 1 === Game.buyMode) {
                let e = 0;
                Object.keys(lt).forEach((t => {
                        let o,
                        n = Game.buyBulk;
                        1 === Game.buyMode ? bo = n : n = bo,
                        1 === n && (n = lt),
                        10 === n && (n = ct),
                        100 === n && (n = dt),
                        e += 1,
                        l("CMBotBar").firstChild.firstChild.childNodes[0].childNodes[e].childNodes[1].textContent = Game.Objects[t].amount,
                        l("CMBotBar").firstChild.firstChild.childNodes[1].childNodes[e].textContent = oe(n[t].bonus, 2),
                        l("CMBotBar").firstChild.firstChild.childNodes[2].childNodes[e].className = to + n[t].colour,
                        o = Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.PPDisplayTime ? $o(Math.round(n[t].pp)) : oe(Math.round(n[t].pp), 2),
                        l("CMBotBar").firstChild.firstChild.childNodes[2].childNodes[e].textContent = o;
                        const a = Ho((Game.Objects[t].bulkPrice - (Game.cookies + Ro())) / Uo());
                        l("CMBotBar").firstChild.firstChild.childNodes[3].childNodes[e].className = to + a.colour,
                        "Done!" === a.text && Game.cookies < Game.Objects[t].bulkPrice ? l("CMBotBar").firstChild.firstChild.childNodes[3].childNodes[e].textContent = `${a.text} (with Wrink)` : l("CMBotBar").firstChild.firstChild.childNodes[3].childNodes[e].textContent = a.text
                    }))
            }
        }
        function _o() {
            Game.Background.canvas.width = Game.Background.canvas.parentNode.offsetWidth,
            Game.Background.canvas.height = Game.Background.canvas.parentNode.offsetHeight,
            Game.LeftBackground.canvas.width = Game.LeftBackground.canvas.parentNode.offsetWidth,
            Game.LeftBackground.canvas.height = Game.LeftBackground.canvas.parentNode.offsetHeight,
            Game.DrawBackground()
        }
        function Xo() {
            1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.BotBar && 1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimerBar && 1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimerBarPos ? (l("CMBotBar").style.bottom = l("CMTimerBar").style.height, l("game").style.bottom = `${Number(l("CMTimerBar").style.height.replace("px",""))+70}px`) : 1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.BotBar ? (l("CMBotBar").style.bottom = "0px", l("game").style.bottom = "70px") : 1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimerBar && 1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimerBarPos ? l("game").style.bottom = l("CMTimerBar").style.height : l("game").style.bottom = "0px",
            1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimerBar && 0 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimerBarPos ? l("sectionLeft").style.top = l("CMTimerBar").style.height : l("sectionLeft").style.top = "",
            _o()
        }
        function Qo() {
            1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimerBar ? l("CMTimerBar").style.display = "" : l("CMTimerBar").style.display = "none",
            Xo()
        }
        function qo() {
            He = Game.dragonAura,
            Ue = Game.dragonAura2
        }
        function Yo(e) {
            const t = Game.Achievements[e],
            o = {};
            return o.name = t.name,
            o
        }
        function Ko(e) {
            let t = 1;
            if (Object.keys(e.tieredUpgrades).forEach((o => {
                        !Game.Tiers[e.tieredUpgrades[o].tier].special && Kt(e.tieredUpgrades[o].name) && (t *= 2)
                    })), Object.keys(e.synergies).forEach((o => {
                        if (Kt(e.synergies[o].name)) {
                            const n = e.synergies[o];
                            n.buildingTie1.name === e.name ? t *= 1 + .05 * n.buildingTie2.amount : n.buildingTie2.name === e.name && (t *= 1 + .001 * n.buildingTie1.amount)
                        }
                    })), e.fortune && Kt(e.fortune.name) && (t *= 1.07), e.grandma && Kt(e.grandma.name) && (t *= 1 + .01 * Vt.Grandma.amount * (1 / (e.id - 1))), "object" == typeof e.tieredUpgrades.misfortune && 1 === e.vanilla && Kt(e.tieredUpgrades.misfortune.name))
                switch (Game.elderWrath) {
                default:
                    t *= 1;
                    break;
                case 1:
                    t *= 1.02;
                    break;
                case 2:
                    t *= 1.04;
                    break;
                case 3:
                    t *= 1.06
                }
            return t
        }
        function Jo(e) {
            const t = Game.Objects[e],
            o = {};
            return "Cursor" === t.name ? o.cps = function (e) {
                let t = 0;
                Kt("Thousand fingers") && (t += .1),
                Kt("Million fingers") && (t *= 5),
                Kt("Billion fingers") && (t *= 10),
                Kt("Trillion fingers") && (t *= 20),
                Kt("Quadrillion fingers") && (t *= 20),
                Kt("Quintillion fingers") && (t *= 20),
                Kt("Sextillion fingers") && (t *= 20),
                Kt("Septillion fingers") && (t *= 20),
                Kt("Octillion fingers") && (t *= 20),
                Kt("Nonillion fingers") && (t *= 20);
                let o = 1,
                n = 0;
                return Object.keys(Vt).forEach((e => {
                        "Cursor" !== Vt[e].name && (n += Vt[e].amount)
                    })),
                t *= n,
                o *= Ko(e),
                o *= Game.magicCpS("Cursor"),
                o *= Yt("cursorCps"),
                Game.ComputeCps(.1, Kt("Reinforced index finger") + Kt("Carpal tunnel prevention cream") + Kt("Ambidextrous"), t) * o
            }
             : "Grandma" === t.name ? o.cps = function (e) {
                let o = 1;
                if (Object.keys(Game.GrandmaSynergies).forEach((e => {
                            Kt(Game.GrandmaSynergies[e]) && (o *= 2)
                        })), Kt("Bingo center/Research facility") && (o *= 4), Kt("Ritual rolling pins") && (o *= 2), Kt("Naughty list") && (o *= 2), Kt("Elderwort biscuits") && (o *= 1.02), o *= Yt("grandmaCps"), Kt("Cat ladies"))
                    for (let e = 0; e < Game.UpgradesByPool.kitten.length; e++)
                        Kt(Game.UpgradesByPool.kitten[e].name) && (o *= 1.29);
                o *= Ko(e);
                let n = 0;
                Kt("One mind") && (n += .02 * Vt.Grandma.amount),
                Kt("Communal brainsweep") && (n += .02 * Vt.Grandma.amount),
                Kt("Elder Pact") && (n += .05 * Vt.Portal.amount);
                let a = 0;
                return Object.keys(Vt).forEach((e => {
                        "Grandma" !== Vt[e].name && (a += Vt[e].amount)
                    })),
                o *= 1 + .01 * Qt("Elder Battalion") * a,
                o *= Game.magicCpS(t.name),
                (t.baseCps + n) * o
            }
             : o.cps = function (e) {
                let t = 1;
                return t *= Ko(e),
                t *= Game.magicCpS(e.name),
                e.baseCPS * t
            },
            o.baseCps = t.baseCps,
            o.name = t.name,
            o.tieredUpgrades = t.tieredUpgrades,
            o.synergies = t.synergies,
            o.fortune = t.fortune,
            o.grandma = t.grandma,
            o.baseCPS = t.baseCps,
            o.id = t.id,
            o.vanilla = t.vanilla,
            o
        }
        function Zo(e) {
            const t = Game.Upgrades[e],
            o = {};
            return o.power = t.power,
            "function" == typeof o.power && ("Sugar crystal cookies" === t.name ? o.power = function () {
                let e = 5;
                return Object.keys(Vt).forEach((t => {
                        Vt[t].level >= 10 && (e += 1)
                    })),
                e
            }
                 : o.power = function () {
                let e = 2;
                if (Kt("Starlove") && (e = 3), Game.hasGod) {
                    const t = Jt("seasons");
                    1 === t ? e *= 1.3 : 2 === t ? e *= 1.2 : 3 === t && (e *= 1.1)
                }
                return e
            }),
            o.pool = t.pool,
            o.name = t.name,
            o
        }
        function en() {
            xe = Game.UpgradesOwned,
            Te = Game.pledges,
            Se = Game.AchievementsOwned,
            Fe = Game.heavenlyPower,
            Ee = Game.prestige,
            Object.keys(Game.Objects).forEach((e => {
                    const t = Game.Objects[e];
                    let o = Vt[e];
                    void 0 === o && (Vt[e] = Jo(e), o = Vt[e], zo(e)),
                    o.amount = t.amount,
                    o.level = t.level,
                    o.totalCookies = t.totalCookies,
                    o.basePrice = t.basePrice,
                    o.free = t.free,
                    t.minigameLoaded && ("Temple" === t.name && (Ne = t.minigame.slot[0], Oe = t.minigame.slot[1], De = t.minigame.slot[2]), o.minigameLoaded = t.minigameLoaded, o.minigame = t.minigame),
                    Vt[e] = o
                })),
            Object.keys(Game.Upgrades).forEach((e => {
                    const t = Game.Upgrades[e];
                    let o = _t[e];
                    void 0 === o && (_t[e] = Zo(e), o = _t[e]),
                    o.bought = t.bought,
                    _t[e] = o
                })),
            Object.keys(Game.Achievements).forEach((e => {
                    const t = Game.Achievements[e];
                    let o = Xt[e];
                    void 0 === o && (Xt[e] = Yo(e), o = Xt[e]),
                    o.won = t.won,
                    Xt[e] = o
                })),
            qo(),
            Be = He,
            Pe = Ue
        }
        function tn(e) {
            const t = document.createElement("div");
            return t.style.fontWeight = "bold",
            t.id = `${e}Title`,
            t.className = "CMTextBlue",
            t.textContent = e,
            t
        }
        function on(e) {
            e.appendChild(tn("Bonus Income"));
            const t = document.createElement("div");
            t.style.marginBottom = "4px",
            t.style.color = "white",
            t.id = "CMTooltipIncome",
            e.appendChild(t),
            e.appendChild(tn("Bonus Cookies per Click")),
            e.lastChild.style.display = "none";
            const o = document.createElement("div");
            o.style.marginBottom = "4px",
            o.style.color = "white",
            o.style.display = "none",
            o.id = "CMTooltipCookiePerClick",
            e.appendChild(o),
            e.appendChild(tn("Payback Period"));
            const n = document.createElement("div");
            n.style.marginBottom = "4px",
            n.id = "CMTooltipPP",
            e.appendChild(n),
            e.appendChild(tn("Time Left"));
            const a = document.createElement("div");
            if (a.id = "CMTooltipTime", e.appendChild(a), "b" === Eo) {
                e.appendChild(tn("Production left till next achievement")),
                e.lastChild.id = "CMTooltipProductionLeftHeader";
                const t = document.createElement("div");
                t.id = "CMTooltipProductionLeft",
                e.appendChild(t)
            }
            if ("b" === Eo) {
                e.appendChild(tn("Buildings (price / PP) left till next achievement")),
                e.lastChild.id = "CMTooltipNextAchievementHeader";
                const t = document.createElement("div");
                t.id = "CMTooltipNextAchievement",
                e.appendChild(t)
            }
        }
        function nn(e, t) {
            let o = "";
            return o = e.pp <= 0 || e.pp === 1 / 0 ? co : e.pp < $t ? no : e.pp === $t ? ao : e.pp < Ut[10][0] ? io : e.pp < Ut[20][0] ? ro : e.pp < Ut[30][0] ? so : lo,
            0 !== Number(Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.PPSecondsLowerLimit) && t / Uo() < Number(Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.PPSecondsLowerLimit) && (o = no),
            Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.PPOnlyConsiderBuyable && t - Game.cookies > 0 && (o = so),
            o
        }
        function an() {
            let e = 1;
            return Object.keys(Game.buffs).forEach((t => {
                    void 0 !== Game.buffs[t].multCpS && (e *= Game.buffs[t].multCpS)
                })),
            e
        }
        function rn(e) {
            Xt[e] && 0 === Xt[e].won && (Xt[e].won = 1, "shadow" !== Game.Achievements[e].pool && (Se += 1))
        }
        function sn() {
            We = 0;
            let e = 1;
            const t = {};
            Object.keys(Game.Objects).forEach((e => {
                    if (Game.Objects[e].minigameLoaded && Game.Objects[e].minigame.effs) {
                        const o = Game.Objects[e].minigame.effs;
                        Object.keys(o).forEach((e => {
                                t[e] ? t[e] *= o[e] : t[e] = o[e]
                            }))
                    }
                })),
            Ae = t,
            1 !== Game.ascensionMode && (e += .01 * parseFloat(Ee) * Fe * function () {
                let e = 0;
                if (Kt("Heavenly chip secret") && (e += .05), Kt("Heavenly cookie stand") && (e += .2), Kt("Heavenly bakery") && (e += .25), Kt("Heavenly confectionery") && (e += .25), Kt("Heavenly key") && (e += .25), e *= 1 + .05 * Qt("Dragon God"), Kt("Lucky digit") && (e *= 1.01), Kt("Lucky number") && (e *= 1.01), Kt("Lucky payout") && (e *= 1.01), Game.hasGod) {
                    const t = Jt("creation");
                    1 === t ? e *= .7 : 2 === t ? e *= .8 : 3 === t && (e *= .9)
                }
                return e
            }
                ()),
            e *= Yt("cps"),
            Kt("Heralds") && 1 !== Game.ascensionMode && (e *= 1 + .01 * Game.heralds),
            Object.keys(Game.cookieUpgrades).forEach((t => {
                    const o = Game.cookieUpgrades[t];
                    Kt(o.name) && ("function" == typeof o.power ? e *= 1 + .01 * _t[o.name].power(_t[o.name]) : e *= 1 + .01 * o.power)
                })),
            Kt("Specialized chocolate chips") && (e *= 1.01),
            Kt("Designer cocoa beans") && (e *= 1.02),
            Kt("Underworld ovens") && (e *= 1.03),
            Kt("Exotic nuts") && (e *= 1.04),
            Kt("Arcane sugar") && (e *= 1.05),
            Kt("Increased merriness") && (e *= 1.15),
            Kt("Improved jolliness") && (e *= 1.15),
            Kt("A lump of coal") && (e *= 1.01),
            Kt("An itchy sweater") && (e *= 1.01),
            Kt("Santa's dominion") && (e *= 1.2),
            Kt("Fortune #100") && (e *= 1.01),
            Kt("Fortune #101") && (e *= 1.07),
            Kt("Dragon scale") && (e *= 1.03);
            let o = 1;
            if (Jt) {
                let t = Jt("asceticism");
                1 === t ? e *= 1.15 : 2 === t ? e *= 1.1 : 3 === t && (e *= 1.05),
                t = Jt("ages"),
                1 === t ? e *= 1 + .15 * Math.sin(ee / 1e3 / 10800 * Math.PI * 2) : 2 === t ? e *= 1 + .15 * Math.sin(ee / 1e3 / 43200 * Math.PI * 2) : 3 === t && (e *= 1 + .15 * Math.sin(ee / 1e3 / 86400 * Math.PI * 2)),
                t = Jt("decadence"),
                1 === t ? o *= .93 : 2 === t ? o *= .95 : 3 === t && (o *= .98),
                t = Jt("industry"),
                1 === t ? o *= 1.1 : 2 === t ? o *= 1.06 : 3 === t && (o *= 1.03),
                t = Jt("labor"),
                1 === t ? o *= .97 : 2 === t ? o *= .98 : 3 === t && (o *= .99)
            }
            Kt("Santa's legacy") && (e *= 1 + .03 * (Game.santaLevel + 1));
            const n = Se / 25;
            let a = 1;
            if (Kt("Santa's milk and cookies") && (a *= 1.05), a *= 1 + .05 * Qt("Breath of Milk"), Jt) {
                const e = Jt("mother");
                1 === e ? a *= 1.1 : 2 === e ? a *= 1.05 : 3 === e && (a *= 1.03)
            }
            a *= Yt("milk");
            let i = 1;
            Kt("Kitten helpers") && (i *= 1 + .1 * n * a),
            Kt("Kitten workers") && (i *= 1 + .125 * n * a),
            Kt("Kitten engineers") && (i *= 1 + .15 * n * a),
            Kt("Kitten overseers") && (i *= 1 + .175 * n * a),
            Kt("Kitten managers") && (i *= 1 + .2 * n * a),
            Kt("Kitten accountants") && (i *= 1 + .2 * n * a),
            Kt("Kitten specialists") && (i *= 1 + .2 * n * a),
            Kt("Kitten experts") && (i *= 1 + .2 * n * a),
            Kt("Kitten consultants") && (i *= 1 + .2 * n * a),
            Kt("Kitten assistants to the regional manager") && (i *= 1 + .175 * n * a),
            Kt("Kitten marketeers") && (i *= 1 + .15 * n * a),
            Kt("Kitten analysts") && (i *= 1 + .125 * n * a),
            Kt("Kitten executives") && (i *= 1 + .115 * n * a),
            Kt("Kitten angels") && (i *= 1 + .1 * n * a),
            Kt("Fortune #103") && (i *= 1 + .05 * n * a),
            Object.keys(Vt).forEach((e => {
                    const t = Vt[e];
                    let i = t.cps(t);
                    1 !== Game.ascensionMode && (i *= (1 + .01 * t.level) * o),
                    "Grandma" === t.name && Kt("Milkhelp&reg; lactose intolerance relief tablets") && (i *= 1 + .05 * n * a),
                    We += t.amount * i
                })),
            Kt('"egg"') && (We += 9),
            e *= i;
            let r = 1;
            if (Kt("Chicken egg") && (r *= 1.01), Kt("Duck egg") && (r *= 1.01), Kt("Turkey egg") && (r *= 1.01), Kt("Quail egg") && (r *= 1.01), Kt("Robin egg") && (r *= 1.01), Kt("Ostrich egg") && (r *= 1.01), Kt("Cassowary egg") && (r *= 1.01), Kt("Salmon roe") && (r *= 1.01), Kt("Frogspawn") && (r *= 1.01), Kt("Shark egg") && (r *= 1.01), Kt("Turtle egg") && (r *= 1.01), Kt("Ant larva") && (r *= 1.01), Kt("Century egg")) {
                let e = 10 * Math.floor((te - Game.startDate) / 1e3 / 10) / 60 / 60 / 24;
                e = Math.min(e, 100),
                it = 1 + .1 * (1 - (1 - e / 100) ** 3),
                r *= it
            }
            e *= r,
            Kt("Sugar baking") && (e *= 1 + .01 * Math.min(100, Game.lumps)),
            e *= 1 + Qt("Radiant Appetite");
            const s = We * e;
            Object.keys(Game.CpsAchievements).forEach((e => {
                    s >= Game.CpsAchievements[e].threshold && rn(Game.CpsAchievements[e].name)
                })),
            je = s;
            const {
                n: l
            } = Game.shimmerTypes.golden,
            c = Qt("Dragon's Fortune");
            for (let t = 0; t < l; t++)
                e *= 1 + 1.23 * c;
            const d = Game.bakeryName.toLowerCase();
            if ("orteil" === d ? e *= .99 : "ortiel" === d && (e *= .98), Kt("Elder Covenant") && (e *= .95), Kt("Golden switch [off]")) {
                let t = 1.5;
                if (Kt("Residual luck")) {
                    const e = Game.goldenCookieUpgrades;
                    Object.keys(e).forEach((o => {
                            Kt(e[o]) && (t += .1)
                        }))
                }
                e *= t
            }
            if (Kt("Shimmering veil [off]")) {
                let t = .5;
                Kt("Reinforced membrane") && (t += .1),
                e *= 1 + t
            }
            Kt("Magic shenanigans") && (e *= 1e3),
            Kt("Occult obstruction") && (e *= 0),
            We = Game.runModHookOnValue("cps", We),
            e *= an(),
            We *= e
        }
        const ln = ["Fortune #001", "Fortune #002", "Fortune #003", "Fortune #004", "Fortune #005", "Fortune #006", "Fortune #007", "Fortune #008", "Fortune #009", "Fortune #010", "Fortune #011", "Fortune #012", "Fortune #013", "Fortune #014", "Fortune #015", "Fortune #016", "Fortune #017", "Fortune #018", "Fortune #100", "Fortune #101", "Fortune #102", "Fortune #103", "Fortune #104"],
        cn = ["Skull cookies", "Ghost cookies", "Bat cookies", "Slime cookies", "Pumpkin cookies", "Eyeball cookies", "Spider cookies"],
        dn = ["Christmas tree biscuits", "Snowflake biscuits", "Snowman biscuits", "Holly biscuits", "Candy cane biscuits", "Bell biscuits", "Present biscuits"],
        mn = ["Pure heart biscuits", "Ardent heart biscuits", "Sour heart biscuits", "Weeping heart biscuits", "Golden heart biscuits", "Eternal heart biscuits", "Prism heart biscuits"],
        pn = ["Elderwort biscuits", "Bakeberry cookies", "Duketater cookies", "Green yeast digestives", "Wheat slims", "Fern tea", "Ichor syrup"];
        function un(e) {
            return Xt[e] ? Xt[e].won : 0
        }
        function hn() {
            let e = 0;
            Object.keys(Game.GrandmaSynergies).forEach((t => {
                    Kt(Game.GrandmaSynergies[t]) && (e += 1)
                })),
            !un("Elder") && e >= 7 && rn("Elder"),
            !un("Veteran") && e >= 14 && rn("Veteran");
            let t = 0,
            o = 1,
            n = 1,
            a = 1e5;
            Object.keys(Vt).forEach((e => {
                    t += Vt[e].amount,
                    a = Math.min(Vt[e].amount, a),
                    un("Mathematician") || Vt[e].amount < Math.min(128, 2 ** (Game.ObjectsById.length - Game.Objects[e].id - 1)) && (o = 0),
                    un("Base 10") || Vt[e].amount < 10 * (Game.ObjectsById.length - Game.Objects[e].id) && (n = 0)
                })),
            a >= 1 && rn("One with everything"),
            1 === o && rn("Mathematician"),
            1 === n && rn("Base 10"),
            a >= 100 && rn("Centennial"),
            a >= 150 && rn("Centennial and a half"),
            a >= 200 && rn("Bicentennial"),
            a >= 250 && rn("Bicentennial and a half"),
            a >= 300 && rn("Tricentennial"),
            a >= 350 && rn("Tricentennial and a half"),
            a >= 400 && rn("Quadricentennial"),
            a >= 450 && rn("Quadricentennial and a half"),
            a >= 500 && rn("Quincentennial"),
            a >= 550 && rn("Quincentennial and a half"),
            a >= 600 && rn("Sexcentennial"),
            t >= 100 && rn("Builder"),
            t >= 500 && rn("Architect"),
            t >= 1e3 && rn("Engineer"),
            t >= 2e3 && rn("Lord of Constructs"),
            t >= 4e3 && rn("Grand design"),
            t >= 8e3 && rn("Ecumenopolis"),
            xe >= 20 && rn("Enhancer"),
            xe >= 50 && rn("Augmenter"),
            xe >= 100 && rn("Upgrader"),
            xe >= 200 && rn("Lord of Progress"),
            xe >= 300 && rn("The full picture"),
            xe >= 400 && rn("When there's nothing left to add"),
            t >= 4e3 && xe >= 300 && rn("Polymath"),
            t >= 8e3 && xe >= 400 && rn("Renaissance baker"),
            Vt.Cursor.amount + Vt.Grandma.amount >= 777 && rn("The elder scrolls");
            let i = !0;
            Object.keys(cn).forEach((e => {
                    Kt(cn[e]) || (i = !1)
                })),
            i && rn("Spooky cookies");
            let r = !0;
            if (Object.keys(dn).forEach((e => {
                        Kt(dn[e]) || (r = !1)
                    })), r && rn("Let it snow"), Kt("Fortune cookies")) {
                const e = Game.Tiers.fortune.upgrades;
                let t = 0;
                Object.keys(e).forEach((o => {
                        Kt(e[o].name) && (t += 1)
                    })),
                t >= e.length && rn("O Fortuna")
            }
        }
        function gn(e, t) {
            en(),
            Vt[e].amount += t;
            const o = Vt[e];
            "Cursor" === e ? (o.amount >= 1 && rn("Click"), o.amount >= 2 && rn("Double-click"), o.amount >= 50 && rn("Mouse wheel"), o.amount >= 100 && rn("Of Mice and Men"), o.amount >= 200 && rn("The Digital"), o.amount >= 300 && rn("Extreme polydactyly"), o.amount >= 400 && rn("Dr. T"), o.amount >= 500 && rn("Thumbs, phalanges, metacarpals"), o.amount >= 600 && rn("With her finger and her thumb"), o.amount >= 700 && rn("Gotta hand it to you"), o.amount >= 800 && rn("The devil's workshop")) : Object.keys(Game.Objects[o.name].tieredAchievs).forEach((e => {
                    o.amount >= Game.Tiers[Game.Objects[o.name].tieredAchievs[e].tier].achievUnlock && rn(Game.Objects[o.name].tieredAchievs[e].name)
                }));
            const n = Se;
            return sn(),
            hn(),
            n !== Se && sn(),
            We - Game.cookiesPs
        }
        function fn(e, t, o) {
            let n = e,
            a = 0;
            for (; n < o; )
                n += .002 * Math.max(.002, (n / Math.max(t, 100)) ** .5), a += 1;
            return a / Game.fps
        }
        function kn() {
            null !== l("CMDispTooltipWarningParent") && (0 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ToolWarnPos ? (l("CMDispTooltipWarningParent").style.top = "auto", l("CMDispTooltipWarningParent").style.margin = "4px -4px", l("CMDispTooltipWarningParent").style.padding = "3px 4px") : (l("CMDispTooltipWarningParent").style.right = "auto", l("CMDispTooltipWarningParent").style.margin = "4px", l("CMDispTooltipWarningParent").style.padding = "4px 3px"))
        }
        function Mn() {
            if (en(), "none" !== l("tooltipAnchor").style.display && l("CMTooltipArea")) {
                l("CMTooltipArea").innerHTML = "";
                const e = function () {
                    l("tooltip").firstChild.style.paddingBottom = "4px";
                    const e = document.createElement("div");
                    return e.style.border = "1px solid",
                    e.style.padding = "4px",
                    e.style.margin = "0px -4px",
                    e.id = "CMTooltipBorder",
                    e.className = "CMTextGray",
                    e
                }
                ();
                l("CMTooltipArea").appendChild(e),
                "b" === Eo ? function () {
                    let e;
                    if (1 === Game.buyMode ? vo = e : e = vo, 1 === Game.buyBulk ? e = lt : 10 === Game.buyBulk ? e = ct : 100 === Game.buyBulk && (e = dt), So = Game.Objects[Bo].bulkPrice, Fo = e[Bo].bonus, 1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TooltipBuildUpgrade && 1 === Game.buyMode) {
                        if (on(l("CMTooltipBorder")), 1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TooltipBuildUpgrade && 1 === Game.buyMode) {
                            l("CMTooltipIncome").textContent = oe(Fo, 2);
                            const t = Math.round(Fo / Game.cookiesPs * 1e4);
                            Number.isFinite(t) && 0 !== t ? l("CMTooltipIncome").textContent += ` (${t/100}% of income)` : l("CMTooltipIncome").textContent += ` (<0${Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ScaleSeparator?",":"."}01% of income)`,
                            l("CMTooltipBorder").className = to + e[Bo].colour,
                            Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.PPDisplayTime ? l("CMTooltipPP").textContent = $o(e[Bo].pp) : l("CMTooltipPP").textContent = oe(e[Bo].pp, 2),
                            l("CMTooltipPP").className = to + e[Bo].colour;
                            const o = Ho((So - (Game.cookies + Ro())) / Uo());
                            l("CMTooltipTime").textContent = o.text,
                            "Done!" === o.text && Game.cookies < e[Bo].price ? l("CMTooltipTime").textContent = `${o.text} (with Wrink)` : l("CMTooltipTime").textContent = o.text,
                            l("CMTooltipTime").className = to + o.colour
                        }
                        l("CMTooltipProductionLeftHeader").style.display = "none",
                        l("CMTooltipTime").style.marginBottom = "0px";
                        for (const e of Object.keys(Game.Objects[Bo].productionAchievs))
                            if (!Game.HasAchiev(Game.Objects[Bo].productionAchievs[e].achiev.name)) {
                                const t = Game.Objects[Bo].productionAchievs[e];
                                l("CMTooltipTime").style.marginBottom = "4px",
                                l("CMTooltipProductionLeftHeader").style.display = "",
                                l("CMTooltipProductionLeft").className = `ProdAchievement${Bo}`,
                                l("CMTooltipProductionLeft").textContent = oe(t.pow - Vt[Bo].totalCookies, 15),
                                l("CMTooltipProductionLeft").style.color = "white";
                                break
                            }
                        const t = mt[Bo];
                        if (t.AmountNeeded < 101) {
                            let e;
                            l("CMTooltipProductionLeft").style.marginBottom = "4px",
                            l("CMTooltipNextAchievementHeader").style.display = "",
                            e = Game.cookiesPs ? Math.max(t.price - (Game.cookies + Ro()), 0) / Game.cookiesPs + t.price / gn(Bo, t.AmountNeeded) : t.price / gn(Bo, t.AmountNeeded),
                            l("CMTooltipNextAchievement").textContent = `${oe(t.AmountNeeded)} / ${oe(t.price)} / `,
                            l("CMTooltipNextAchievement").style.color = "white";
                            const o = document.createElement("span");
                            Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.PPDisplayTime ? o.textContent = $o(e) : o.textContent = oe(e),
                            o.className = to + nn({
                                pp: e
                            }, t.price),
                            l("CMTooltipNextAchievement").appendChild(o)
                        } else
                            l("CMTooltipNextAchievementHeader").style.display = "none"
                            l("CMTooltipProductionLeft").style.marginBottom = "0px"
                    } else
                        l("CMTooltipArea").style.display = "none"
                }
                () : "u" === Eo ? function () {
                    if (on(l("CMTooltipBorder")), Fo = kt[Game.UpgradesInStore[Bo].name].bonus, So = Game.Upgrades[Game.UpgradesInStore[Bo].name].getPrice(), Po = kt[Game.UpgradesInStore[Bo].name].bonusMouse, 1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TooltipBuildUpgrade) {
                        l("CMTooltipIncome").textContent = oe(Fo, 2);
                        const e = Math.round(Fo / Game.cookiesPs * 1e4);
                        "0" === l("CMTooltipIncome").textContent ? (l("Bonus IncomeTitle").style.display = "none", l("CMTooltipIncome").style.display = "none", l("Payback PeriodTitle").style.display = "none", l("CMTooltipPP").style.display = "none") : (Number.isFinite(e) && 0 !== e ? l("CMTooltipIncome").textContent += ` (${e/100}% of income)` : l("CMTooltipIncome").textContent += ` (<0${Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ScaleSeparator?",":"."}01% of income)`, l("CMTooltipBorder").className = to + kt[Game.UpgradesInStore[Bo].name].colour),
                        Po && (l("CMTooltipCookiePerClick").textContent = oe(Po), l("CMTooltipCookiePerClick").style.display = "block", l("CMTooltipCookiePerClick").previousSibling.style.display = "block"),
                        !Fo && Po ? (l("CMTooltipPP").textContent = `${oe(So/Po)} Clicks`, l("CMTooltipPP").style.color = "white", l("Payback PeriodTitle").style.display = "block", l("CMTooltipPP").style.display = "block") : (Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.PPDisplayTime ? l("CMTooltipPP").textContent = $o(kt[Game.UpgradesInStore[Bo].name].pp) : l("CMTooltipPP").textContent = oe(kt[Game.UpgradesInStore[Bo].name].pp, 2), l("CMTooltipPP").className = to + kt[Game.UpgradesInStore[Bo].name].colour);
                        const t = Ho((So - (Game.cookies + Ro())) / Uo());
                        if (l("CMTooltipTime").textContent = t.text, "Done!" === t.text && Game.cookies < Game.UpgradesInStore[Bo].getPrice() ? l("CMTooltipTime").textContent = `${t.text} (with Wrink)` : l("CMTooltipTime").textContent = t.text, l("CMTooltipTime").className = to + t.colour, "Chocolate egg" === Game.UpgradesInStore[Bo].name) {
                            l("CMTooltipBorder").lastChild.style.marginBottom = "4px",
                            l("CMTooltipBorder").appendChild(tn("Cookies to be gained (Currently/Max)"));
                            const e = document.createElement("div");
                            e.style.color = "white",
                            e.textContent = `${oe(.05*Game.cookies)} / ${oe(st)}`,
                            l("CMTooltipBorder").appendChild(e)
                        }
                    } else
                        l("CMTooltipArea").style.display = "none"
                }
                () : "s" === Eo ? function () {
                    if (1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TooltipLump) {
                        const t = l("CMTooltipBorder");
                        t.appendChild(tn("Current Sugar Lump"));
                        const o = document.createElement("div");
                        o.id = "CMTooltipTime",
                        t.appendChild(o);
                        const n = 0 === (e = Game.lumpCurrentType) ? {
                            text: "Normal",
                            colour: co
                        }
                         : 1 === e ? {
                            text: "Bifurcated",
                            colour: ao
                        }
                         : 2 === e ? {
                            text: "Golden",
                            colour: io
                        }
                         : 3 === e ? {
                            text: "Meaty",
                            colour: ro
                        }
                         : 4 === e ? {
                            text: "Caramelized",
                            colour: lo
                        }
                         : {
                            text: "Unknown Sugar Lump",
                            colour: so
                        };
                        o.textContent = n.text,
                        o.className = to + n.colour
                    } else
                        l("CMTooltipArea").style.display = "none";
                    var e
                }
                () : "g" === Eo ? function () {
                    const {
                        minigame: e
                    } = Game.Objects["Wizard tower"],
                    t = e.getSpellCost(e.spellsById[Bo]);
                    if (1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TooltipGrim && t <= e.magicM) {
                        const o = l("CMTooltipBorder");
                        o.appendChild(tn("Time Left"));
                        const n = document.createElement("div");
                        n.id = "CMTooltipTime",
                        o.appendChild(n);
                        const a = Ho(fn(e.magic, e.magicM, t));
                        if (n.textContent = a.text, n.className = to + a.colour, t <= e.magic) {
                            o.appendChild(tn("Recover Time"));
                            const n = document.createElement("div");
                            n.id = "CMTooltipRecover",
                            o.appendChild(n);
                            const a = Ho(fn(Math.max(0, e.magic - t), e.magicM, e.magic));
                            n.textContent = a.text,
                            n.className = to + a.colour
                        }
                        if ("0" === Bo) {
                            o.appendChild(tn("Cookies to be gained/lost"));
                            const e = document.createElement("div");
                            e.id = "x",
                            o.appendChild(e);
                            const t = document.createElement("span");
                            t.style.color = "#33FF00",
                            t.textContent = oe(Math.min(.15 * (Game.cookies + Ro()), 60 * et * 30), 2),
                            e.appendChild(t);
                            const n = document.createElement("span");
                            n.textContent = " / ",
                            e.appendChild(n);
                            const a = document.createElement("span");
                            a.style.color = "red",
                            a.textContent = oe(60 * et * 15, 2),
                            e.appendChild(a)
                        }
                        l("CMTooltipArea").appendChild(o)
                    } else
                        l("CMTooltipArea").style.display = "none"
                }
                () : "p" === Eo ? function () {
                    const {
                        minigame: e
                    } = Game.Objects.Farm;
                    if (Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TooltipPlots && 0 !== e.plot[Bo[1]][Bo[0]][0]) {
                        const t = e.plot[Bo[1]][Bo[0]][1] > e.plantsById[e.plot[Bo[1]][Bo[0]][0] - 1].mature,
                        o = e.plantsById[e.plot[Bo[1]][Bo[0]][0] - 1].name;
                        l("CMTooltipBorder").appendChild(tn("Reward (Current / Maximum)"));
                        const n = document.createElement("div");
                        n.id = "CMTooltipPlantReward",
                        l("CMTooltipBorder").appendChild(n),
                        "Bakeberry" === o ? l("CMTooltipPlantReward").textContent = `${t?oe(Math.min(.03*Game.cookies,60*Game.cookiesPs*30)):"0"} / ${oe(60*Game.cookiesPs*30)}` : "Chocoroot" === o || "White chocoroot" === o ? l("CMTooltipPlantReward").textContent = `${t?oe(Math.min(.03*Game.cookies,60*Game.cookiesPs*3)):"0"} / ${oe(60*Game.cookiesPs*3)}` : "Queenbeet" === o ? l("CMTooltipPlantReward").textContent = `${t?oe(Math.min(.04*Game.cookies,60*Game.cookiesPs*60)):"0"} / ${oe(60*Game.cookiesPs*60)}` : "Duketater" === o ? l("CMTooltipPlantReward").textContent = `${t?oe(Math.min(.08*Game.cookies,60*Game.cookiesPs*120)):"0"} / ${oe(60*Game.cookiesPs*120)}` : l("CMTooltipArea").style.display = "none"
                    } else
                        l("CMTooltipArea").style.display = "none"
                }
                () : "ha" === Eo ? function () {
                    const {
                        minigame: e
                    } = Game.Objects.Farm;
                    if (Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TooltipLump) {
                        l("CMTooltipBorder").appendChild(tn("Cookies gained from harvesting:"));
                        let t = 0,
                        o = 0;
                        Game.keys[16] && Game.keys[17] && (o = 1);
                        for (let n = 0; n < 6; n++)
                            for (let a = 0; a < 6; a++)
                                if (e.plot[n][a][0] >= 1) {
                                    const i = e.plot[n][a],
                                    r = e.plantsById[i[0] - 1],
                                    s = r.name;
                                    let l = !0;
                                    o && r.immortal && (l = !1),
                                    i[1] < r.matureBase && (l = !1),
                                    l && "Bakeberry" === s ? t += Math.min(.03 * Game.cookies, 60 * Game.cookiesPs * 30) : l && "Chocoroot" === s || "White chocoroot" === s ? t += Math.min(.03 * Game.cookies, 60 * Game.cookiesPs * 3) : l && "Queenbeet" === s ? t += Math.min(.04 * Game.cookies, 60 * Game.cookiesPs * 60) : l && "Duketater" === s && (t += Math.min(.08 * Game.cookies, 60 * Game.cookiesPs * 120))
                                }
                        l("CMTooltipBorder").appendChild(document.createTextNode(oe(t)))
                    } else
                        l("CMTooltipArea").style.display = "none"
                }
                () : "wb" === Eo ? function () {
                    l("tooltip").innerHTML = "",
                    l("tooltip").appendChild(tn("Reward:"));
                    const e = document.createElement("div");
                    e.id = "CMWrinklerReward",
                    "PopAllNormal" === Bo ? e.textContent = oe(ut) : "PopFattest" === Bo && (e.textContent = oe(ht[0])),
                    l("tooltip").appendChild(e)
                }
                () : ("pag" === Eo || "pas" === Eo && -1 !== Bo[1]) && function () {
                    if (1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TooltipPantheon) {
                        const e = l("CMTooltipBorder");
                        let t;
                        t = "pas" === Eo ? Bo[1] : Bo,
                        e.appendChild(tn("Effect in position 1:"));
                        const o = document.createElement("div");
                        if (o.id = "CMPantheonTooltipPosition1", 0 !== zt[t][0]) {
                            o.textContent = oe(zt[t][0]);
                            const e = Math.round(zt[t][0] / Game.cookiesPs * 1e4);
                            Number.isFinite(e) && 0 !== e ? o.textContent += ` (${e/100}% of income)` : o.textContent += ` (<0${Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ScaleSeparator?",":"."}01% of income)`
                        } else
                            o.textContent = "No effect to CPS";
                        e.appendChild(o),
                        e.appendChild(tn("Effect in position 2:"));
                        const n = document.createElement("div");
                        if (n.id = "CMPantheonTooltipPosition2", 0 !== zt[t][1]) {
                            n.textContent = oe(zt[t][1]);
                            const e = Math.round(zt[t][1] / Game.cookiesPs * 1e4);
                            Number.isFinite(e) && 0 !== e ? n.textContent += ` (${e/100}% of income)` : n.textContent += ` (<0${Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ScaleSeparator?",":"."}01% of income)`
                        } else
                            n.textContent = "No effect to CPS";
                        e.appendChild(n),
                        e.appendChild(tn("Effect in position 3:"));
                        const a = document.createElement("div");
                        if (a.id = "CMPantheonTooltipPosition2", 0 !== zt[t][2]) {
                            a.textContent = oe(zt[t][2]);
                            const e = Math.round(zt[t][2] / Game.cookiesPs * 1e4);
                            Number.isFinite(e) && 0 !== e ? a.textContent += ` (${e/100}% of income)` : a.textContent += ` (<0${Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ScaleSeparator?",":"."}01% of income)`
                        } else
                            a.textContent = "No effect to CPS";
                        e.appendChild(a),
                        l("CMTooltipArea").appendChild(e)
                    } else
                        l("CMTooltipArea").style.display = "none"
                }
                (),
                function () {
                    if ("b" === Eo || "u" === Eo) {
                        null === document.getElementById("CMDispTooltipWarningParent") && (l("tooltipAnchor").appendChild(function () {
                                const e = document.createElement("div");
                                e.style.position = "absolute",
                                e.style.display = "block",
                                e.style.left = "auto",
                                e.style.bottom = "auto",
                                e.id = "CMDispTooltipWarningParent";
                                const t = function (e, t, o, n, a) {
                                    const i = document.createElement("div");
                                    i.id = e,
                                    i.style.display = "none",
                                    i.style.transition = "opacity 0.1s ease-out",
                                    i.className = "CMBorder" + t,
                                    i.style.padding = "2px",
                                    i.style.background = "#000 url(img/darkNoise.png)";
                                    const r = document.createElement("div");
                                    i.appendChild(r);
                                    const s = document.createElement("span");
                                    s.className = to + t,
                                    s.style.fontWeight = "bold",
                                    s.textContent = o,
                                    r.appendChild(s),
                                    r.appendChild(document.createTextNode(n));
                                    const l = document.createElement("div");
                                    i.appendChild(l);
                                    const c = document.createElement("span");
                                    return c.id = a,
                                    l.appendChild(document.createTextNode("Deficit: ")),
                                    l.appendChild(c),
                                    i
                                };
                                return e.appendChild(t("CMDispTooltipWarnLucky", so, "Warning: ", 'Purchase of this item will put you under the number of Cookies required for "Lucky!"', "CMDispTooltipWarnLuckyText")),
                                e.firstChild.style.marginBottom = "4px",
                                e.appendChild(t("CMDispTooltipWarnLuckyFrenzy", io, "Warning: ", 'Purchase of this item will put you under the number of Cookies required for "Lucky!" (Frenzy)', "CMDispTooltipWarnLuckyFrenzyText")),
                                e.lastChild.style.marginBottom = "4px",
                                e.appendChild(t("CMDispTooltipWarnConjure", lo, "Warning: ", 'Purchase of this item will put you under the number of Cookies required for "Conjure Baked Goods"', "CMDispTooltipWarnConjureText")),
                                e.lastChild.style.marginBottom = "4px",
                                e.appendChild(t("CMDispTooltipWarnConjureFrenzy", lo, "Warning: ", 'Purchase of this item will put you under the number of Cookies required for "Conjure Baked Goods" (Frenzy)', "CMDispTooltipWarnConjureFrenzyText")),
                                e.lastChild.style.marginBottom = "4px",
                                e.appendChild(t("CMDispTooltipWarnEdifice", lo, "Warning: ", 'Purchase of this item will put you under the number of Cookies needed for "Spontaneous Edifice" to possibly give you your most expensive building"', "CMDispTooltipWarnEdificeText")),
                                e.lastChild.style.marginBottom = "4px",
                                e.appendChild(t("CMDispTooltipWarnUser", so, "Warning: ", `Purchase of this item will put you under the number of Cookies equal to ${Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ToolWarnUser} seconds of CPS`, "CMDispTooltipWarnUserText")),
                                e
                            }
                                ()), kn()),
                        0 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ToolWarnPos ? l("CMDispTooltipWarningParent").style.right = "0px" : l("CMDispTooltipWarningParent").style.top = `${l("tooltip").offsetHeight}px`,
                        l("CMDispTooltipWarningParent").style.width = l("tooltip").offsetWidth - 6 + "px";
                        const e = Game.cookies + Ro() - So,
                        t = Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ToolWarnBon ? Fo : 0;
                        let o = ze;
                        if (1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ToolWarnBon) {
                            let e = Fo;
                            e /= an(),
                            o += 60 * e * 15 / .15
                        }
                        if (1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ToolWarnLucky && e < o && ("b" !== Eo || 1 === Game.buyMode) ? (l("CMDispTooltipWarnLucky").style.display = "", l("CMDispTooltipWarnLuckyText").textContent = `${oe(o-e)} (${$o((o-e)/(Uo()+t))})`) : l("CMDispTooltipWarnLucky").style.display = "none", 1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ToolWarnLuckyFrenzy) {
                            const n = 7 * o;
                            e < n && ("b" !== Eo || 1 === Game.buyMode) ? (l("CMDispTooltipWarnLuckyFrenzy").style.display = "", l("CMDispTooltipWarnLuckyFrenzyText").textContent = `${oe(n-e)} (${$o((n-e)/(Uo()+t))})`) : l("CMDispTooltipWarnLuckyFrenzy").style.display = "none"
                        } else
                            l("CMDispTooltipWarnLuckyFrenzy").style.display = "none";
                        if (1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ToolWarnConjure) {
                            const n = 2 * o;
                            e < n && ("b" !== Eo || 1 === Game.buyMode) ? (l("CMDispTooltipWarnConjure").style.display = "", l("CMDispTooltipWarnConjureText").textContent = `${oe(n-e)} (${$o((n-e)/(Uo()+t))})`) : l("CMDispTooltipWarnConjure").style.display = "none"
                        } else
                            l("CMDispTooltipWarnConjure").style.display = "none";
                        if (1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ToolWarnConjureFrenzy) {
                            const n = 2 * o * 7;
                            e < n && ("b" !== Eo || 1 === Game.buyMode) ? (l("CMDispTooltipWarnConjureFrenzy").style.display = "", l("CMDispTooltipWarnConjureFrenzyText").textContent = `${oe(n-e)} (${$o((n-e)/(Uo()+t))})`) : l("CMDispTooltipWarnConjureFrenzy").style.display = "none"
                        } else
                            l("CMDispTooltipWarnConjureFrenzy").style.display = "none";
                        1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ToolWarnEdifice && Game.Objects["Wizard tower"].minigameLoaded && Je && e < Je && ("b" !== Eo || 1 === Game.buyMode) ? (l("CMDispTooltipWarnEdifice").style.display = "", l("CMDispTooltipWarnEdificeText").textContent = `${oe(Je-e)} (${$o((Je-e)/(Uo()+t))})`) : l("CMDispTooltipWarnEdifice").style.display = "none",
                        Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ToolWarnUser > 0 && e < Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ToolWarnUser * Uo() && ("b" !== Eo || 1 === Game.buyMode) ? (l("CMDispTooltipWarnUser").style.display = "", l("CMDispTooltipWarnUser").children[0].textContent = `Purchase of this item will put you under the number of Cookies equal to ${Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ToolWarnUser} seconds of CPS`, l("CMDispTooltipWarnUserText").textContent = `${oe(Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ToolWarnUser*Uo()-e)} (${$o((Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ToolWarnUser*Uo()-e)/(Uo()+t))})`) : l("CMDispTooltipWarnUser").style.display = "none"
                    } else
                        null !== l("CMDispTooltipWarningParent") && l("CMDispTooltipWarningParent").remove()
                }
                ()
            } else
                null === l("CMTooltipArea") && null !== l("CMDispTooltipWarningParent") && l("CMDispTooltipWarningParent").remove()
        }
        function yn() {
            if (Game.prefs.autosave && Game.drawT % 10 == 0 && "stats" === Game.onMenu && Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.Stats) {
                const e = document.getElementById("CMStatsAutosaveTimer");
                e && (e.innerText = Game.sayTime(60 * Game.fps - Game.T % (60 * Game.fps), 4))
            }
            if (Ao(), jo(), Wo(), function () {
                if (1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimerBar) {
                    const e = l("CMTimerBar").offsetWidth - 163,
                    t = l("CMTimerBar").offsetWidth - 133;
                    let o = 0;
                    if (Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.AutosaveTimerBar && Game.prefs.autosave) {
                        const e = (60 * Game.fps - (Game.OnAscend ? 0 : Game.T % (60 * Game.fps))) / Game.fps;
                        l("CMTimerBarAutosave").style.display = "",
                        l("CMTimerBarAutosaveBar").style.width = `${Math.round(e*(t-8*Math.ceil(e).toString().length)/60)}px`,
                        Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimerBarOverlay >= 1 ? l("CMTimerBarAutosaveBar").textContent = Math.ceil(e) : l("CMTimerBarAutosaveBar").textContent = "",
                        l("CMTimerBarAutosaveTime").textContent = Math.ceil(e),
                        o += 1
                    } else
                        l("CMTimerBarAutosave").style.display = "none";
                    if (0 !== Game.shimmerTypes.golden.spawned || Game.Has("Golden switch [off]"))
                        l("CMTimerBarGC")
                            .style.display = "none";
                        else {
                            l("CMTimerBarGC").style.display = "",
                            l("CMTimerBarGCMinBar").style.width = `${Math.round(Math.max(0,Game.shimmerTypes.golden.minTime-Game.shimmerTypes.golden.time)*e/Game.shimmerTypes.golden.maxTime)}px`,
                            Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimerBarOverlay >= 1 ? l("CMTimerBarGCMinBar").textContent = Math.ceil((Game.shimmerTypes.golden.minTime - Game.shimmerTypes.golden.time) / Game.fps) : l("CMTimerBarGCMinBar").textContent = "",
                            Game.shimmerTypes.golden.minTime === Game.shimmerTypes.golden.maxTime ? (l("CMTimerBarGCMinBar").style.borderTopRightRadius = "10px", l("CMTimerBarGCMinBar").style.borderBottomRightRadius = "10px") : (l("CMTimerBarGCMinBar").style.borderTopRightRadius = "", l("CMTimerBarGCMinBar").style.borderBottomRightRadius = ""),
                            l("CMTimerBarGCBar").style.width = `${Math.round(Math.min(Game.shimmerTypes.golden.maxTime-Game.shimmerTypes.golden.minTime,Game.shimmerTypes.golden.maxTime-Game.shimmerTypes.golden.time)*e/Game.shimmerTypes.golden.maxTime)}px`,
                            Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimerBarOverlay >= 1 ? l("CMTimerBarGCBar").textContent = Math.ceil(Math.min(Game.shimmerTypes.golden.maxTime - Game.shimmerTypes.golden.minTime, Game.shimmerTypes.golden.maxTime - Game.shimmerTypes.golden.time) / Game.fps) : l("CMTimerBarGCBar").textContent = "";
                            const t = Math.max(0, (Game.shimmerTypes.golden.time - Game.shimmerTypes.golden.minTime) / (Game.shimmerTypes.golden.maxTime - Game.shimmerTypes.golden.minTime)) ** 5;
                            l("CMTimerBarGCTime").textContent = `${Math.ceil((Game.shimmerTypes.golden.maxTime-Game.shimmerTypes.golden.time)/Game.fps)} ${t<.01?"<":""}${t.toLocaleString("en",{style:"percent"})}`,
                            o += 1
                        }
                        if ("christmas" === Game.season && 0 === Game.shimmerTypes.reindeer.spawned) {
                            l("CMTimerBarRen").style.display = "",
                            l("CMTimerBarRenMinBar").style.width = `${Math.round(Math.max(0,Game.shimmerTypes.reindeer.minTime-Game.shimmerTypes.reindeer.time)*e/Game.shimmerTypes.reindeer.maxTime)}px`,
                            Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimerBarOverlay >= 1 ? l("CMTimerBarRenMinBar").textContent = Math.ceil((Game.shimmerTypes.reindeer.minTime - Game.shimmerTypes.reindeer.time) / Game.fps) : l("CMTimerBarRenMinBar").textContent = "",
                            l("CMTimerBarRenBar").style.width = `${Math.round(Math.min(Game.shimmerTypes.reindeer.maxTime-Game.shimmerTypes.reindeer.minTime,Game.shimmerTypes.reindeer.maxTime-Game.shimmerTypes.reindeer.time)*e/Game.shimmerTypes.reindeer.maxTime)}px`,
                            Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimerBarOverlay >= 1 ? l("CMTimerBarRenBar").textContent = Math.ceil(Math.min(Game.shimmerTypes.reindeer.maxTime - Game.shimmerTypes.reindeer.minTime, Game.shimmerTypes.reindeer.maxTime - Game.shimmerTypes.reindeer.time) / Game.fps) : l("CMTimerBarRenBar").textContent = "";
                            const t = Math.max(0, (Game.shimmerTypes.reindeer.time - Game.shimmerTypes.reindeer.minTime) / (Game.shimmerTypes.reindeer.maxTime - Game.shimmerTypes.reindeer.minTime)) ** 5;
                            l("CMTimerBarRenTime").textContent = `${Math.ceil((Game.shimmerTypes.reindeer.maxTime-Game.shimmerTypes.reindeer.time)/Game.fps)} ${t<.01?"<":""}${t.toLocaleString("en",{style:"percent"})}`,
                            o += 1
                        } else
                            l("CMTimerBarRen").style.display = "none";
                        const n = {};
                        l("CMTimerBarBuffTimers").innerHTML = "",
                        Object.keys(Game.buffs).forEach((e => {
                                if (Game.buffs[e]) {
                                    const a = Io(Game.buffs[e].name, Game.buffs[e].name, [{
                                                    id: `${Game.buffs[e].name}Bar`
                                                }
                                            ]);
                                    a.style.display = "";
                                    let i = "";
                                    i = void 0 !== To[Game.buffs[e].name] ? To[Game.buffs[e].name] : lo,
                                    a.lastChild.children[1].className = oo + i,
                                    a.lastChild.children[1].style.color = "black",
                                    2 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimerBarOverlay ? a.lastChild.children[1].textContent = `${Math.round(Game.buffs[e].time/Game.buffs[e].maxTime*100)}%` : a.lastChild.children[1].textContent = "",
                                    a.lastChild.children[1].style.width = `${Math.round(Game.buffs[e].time*(t-8*Math.ceil(Game.buffs[e].time/Game.fps).toString().length)/Game.buffs[e].maxTime)}px`,
                                    a.lastChild.children[2].textContent = Math.ceil(Game.buffs[e].time / Game.fps),
                                    o += 1,
                                    n[Game.buffs[e].name] = a
                                }
                            })),
                        Object.keys(n).forEach((e => {
                                l("CMTimerBarBuffTimers").appendChild(n[e])
                            })),
                        0 !== o && (l("CMTimerBar").style.height = 12 * o + 2 + "px"),
                        Oo !== o && (Oo = o, Xo())
                    }
                }
                    (), Vo(), Mn(), function () {
                    if (1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TooltipWrink && 1 === ko) {
                        let e = !1;
                        Object.keys(Game.wrinklers).forEach((t => {
                                const o = Game.wrinklers[t];
                                if (o.phase > 0 && o.selected) {
                                    if (e = !0, 0 === yo[t] || void 0 === yo[t]) {
                                        const e = document.createElement("div"),
                                        o = document.createElement("div");
                                        o.style.minWidth = "120px",
                                        o.style.marginBottom = "4px";
                                        const n = document.createElement("div");
                                        n.style.textAlign = "center",
                                        n.id = "CMTooltipWrinkler",
                                        o.appendChild(n),
                                        e.appendChild(o),
                                        Game.tooltip.draw(this, escape(e.innerHTML)),
                                        Mo = t,
                                        yo[t] = 1
                                    }
                                } else
                                    yo[t] = 0
                            })),
                        e || Game.tooltip.hide()
                    }
                }
                    (), function () {
                    if (1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TooltipWrink && null !== l("CMTooltipWrinkler")) {
                        let {
                            sucked: e
                        } = Game.wrinklers[Mo],
                        t = 1.1;
                        if (Game.Has("Sacrilegious corruption") && (t *= 1.05), 1 === Game.wrinklers[Mo].type && (t *= 3), e *= t, Game.Has("Wrinklerspawn") && (e *= 1.05), Vt.Temple.minigameLoaded) {
                            const t = Game.hasGod("scorn");
                            1 === t ? e *= 1.15 : 2 === t ? e *= 1.1 : 3 === t && (e *= 1.05)
                        }
                        l("CMTooltipWrinkler").textContent = oe(e)
                    }
                }
                    (), Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.UpStats && "stats" === Game.onMenu && (Game.drawT - 1) % (5 * Game.fps) != 0 && (Game.drawT - 1) % Game.fps == 0 && Game.UpdateMenu(), B(), Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.Scale && !Game.OnAscend) {
                    let e = l("cookies").innerHTML.replace(/.*(?=<br>)/i, oe(Game.cookies));
                    Game.prefs.monospace && (e = `<span class="monospace">${e}</span>`),
                    l("cookies").innerHTML = e
                }
        }
        function Cn() {
            ne.addLatest(Game.computedMouseCps)
        }
        class bn {
            constructor(e) {
                this.maxLength = e,
                this.queue = []
            }
            addLatest(e) {
                this.queue.push(e) > this.maxLength && this.queue.shift()
            }
            calcAverage(e) {
                let t = e;
                t > this.maxLength && (t = this.maxLength),
                t > this.queue.length && (t = this.queue.length);
                let o = 0;
                for (let e = this.queue.length - 1; e >= 0 && e > this.queue.length - 1 - t; e--)
                    o += this.queue[e];
                return 0 === o ? 0 : o / t
            }
            calcSum(e) {
                let t = e;
                return t > this.maxLength && (t = this.maxLength),
                t > this.queue.length && (t = this.queue.length),
                0 === t ? 0 : this.queue.slice(-t).reduce(((e, t) => e + t), 0)
            }
        }
        function Gn() {
            const e = Math.floor(Date.now() / 1e3);
            if (Game.T / Game.fps % 1 == 0) {
                let t = Game.cookies + It;
                Game.cpsSucked > 0 && (t += pt),
                Dt = Math.max(Game.cookiesEarned, t),
                t *= .05;
                const o = e - de,
                n = Math.max(0, Game.cookies - me) / o,
                a = Math.max(0, pt - pe) / o,
                i = Math.max(0, ht[0] - ue) / o,
                r = Math.max(0, t - st) / o,
                s = (Game.cookieClicks - he) / o;
                for (let e = 0; e < o; e++)
                    ae.addLatest(n), ie.addLatest(a), re.addLatest(i), se.addLatest(r), le.addLatest(s);
                de = e,
                me = Game.cookies,
                pe = pt,
                ue = ht[0],
                st = t,
                he = Game.cookieClicks;
                const l = wo[Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.AvgCPSHist];
                ge = ae.calcAverage(l),
                fe = ie.calcAverage(l),
                ke = re.calcAverage(l),
                Me = se.calcAverage(l),
                ye = ge,
                1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.CalcWrink && (ye += fe),
                2 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.CalcWrink && (ye += ke);
                const c = Game.HasUnlocked("Chocolate egg") && !Game.Has("Chocolate egg");
                Lt = c || 0 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.CalcWrink ? ge + fe + (c ? Me : 0) : ye,
                Mt = le.calcAverage(xo[Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.AvgClicksHist])
            }
        }
        function vn(e, t, o, n, a) {
            let i = 0;
            for (let e = Math.max(0, o); e < Math.max(0, o + a); e++)
                i += Game.priceIncrease ** Math.max(0, e - n);
            let r = t * i;
            return r = Game.modifyBuildingPrice(Game.Objects[e], r),
            Math.ceil(r)
        }
        function wn(e, t) {
            Object.keys(e).forEach((o => {
                    if (Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.PPRigidelMode && 1 === t)
                        e[o].colour = co;
                    else {
                        e[o].colour = nn(e[o], vn(o, Game.Objects[o].basePrice, Game.Objects[o].amount, Game.Objects[o].free, t));
                        for (let t = 0; t < Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.PPExcludeTop; t++)
                            e[o].pp === Ut[t][0] && (e[o].colour = co)
                    }
                }))
        }
        function xn(e, t) {
            Object.keys(e).forEach((o => {
                    const n = vn(o, Game.Objects[o].basePrice, Game.Objects[o].amount, Game.Objects[o].free, t);
                    Game.cookiesPs ? e[o].pp = Math.max(n - (Game.cookies + Ro()), 0) / Game.cookiesPs + n / e[o].bonus : e[o].pp = n / e[o].bonus,
                    Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.PPRigidelMode && 1 === t || Ut.push([e[o].pp, t, n])
                }))
        }
        function Tn() {
            !function () {
                $t = 1 / 0,
                Ut = [],
                void 0 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.PPExcludeTop && (Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.PPExcludeTop = 0),
                xn(lt, 1),
                xn(ct, 10),
                xn(dt, 100),
                Ut.sort(((e, t) => e[0] - t[0]));
                let e = Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.PPExcludeTop;
                if (Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.PPOnlyConsiderBuyable)
                    for (; Ut[e][2] > Game.cookies && (e += 1, Ut.length !== e + 1); );
                $t = Ut[e][0],
                Ht = Ut[e][1],
                wn(lt, 1),
                wn(ct, 10),
                wn(dt, 100)
            }
            (),
            Object.keys(kt).forEach((e => {
                    Game.cookiesPs ? kt[e].pp = Math.max(Game.Upgrades[e].getPrice() - (Game.cookies + Ro()), 0) / Game.cookiesPs + Game.Upgrades[e].getPrice() / kt[e].bonus : kt[e].pp = Game.Upgrades[e].getPrice() / kt[e].bonus,
                    Number.isNaN(kt[e].pp) && (kt[e].pp = 1 / 0),
                    kt[e].colour = nn(kt[e], Game.Upgrades[e].getPrice())
                })),
            window.CookieMonsterData.Objects1 = JSON.parse(JSON.stringify(lt)),
            window.CookieMonsterData.Objects10 = JSON.parse(JSON.stringify(ct)),
            window.CookieMonsterData.Objects100 = JSON.parse(JSON.stringify(dt)),
            window.CookieMonsterData.Upgrades = [],
            Object.entries(kt).forEach((e => {
                    window.CookieMonsterData.Upgrades[e[0]] = JSON.parse(JSON.stringify(e[1]))
                }))
        }
        function Sn(e) {
            if ("toggle" === Game.Upgrades[e].pool || 0 === Game.Upgrades[e].bought && Game.Upgrades[e].unlocked && "prestige" !== Game.Upgrades[e].pool) {
                en(),
                "Shimmering veil [on]" === _t[e].name ? _t["Shimmering veil [off]"].bought = 0 : "Golden switch [on]" === _t[e].name ? _t["Golden switch [off]"].bought = 0 : _t[e].bought = (_t[e].bought + 1) % 2,
                Game.CountsAsUpgradeOwned(Game.Upgrades[e].pool) && (xe += 1),
                "Elder Pledge" === e ? (Te += 1, Te > 0 && rn("Elder nap"), Te >= 5 && rn("Elder slumber")) : "Elder Covenant" === e ? rn("Elder calm") : "Prism heart biscuits" === e ? rn("Lovely cookies") : "Heavenly key" === e && rn("Wholesome");
                const t = Se;
                sn(),
                hn(),
                t !== Se && sn();
                const o = function () {
                    let e = 0;
                    Kt("Thousand fingers") && (e += .1),
                    Kt("Million fingers") && (e *= 5),
                    Kt("Billion fingers") && (e *= 10),
                    Kt("Trillion fingers") && (e *= 20),
                    Kt("Quadrillion fingers") && (e *= 20),
                    Kt("Quintillion fingers") && (e *= 20),
                    Kt("Sextillion fingers") && (e *= 20),
                    Kt("Septillion fingers") && (e *= 20),
                    Kt("Octillion fingers") && (e *= 20),
                    Kt("Nonillion fingers") && (e *= 20);
                    let t = 0;
                    Object.keys(Vt).forEach((e => {
                            t += Vt[e].amount
                        })),
                    t -= Vt.Cursor.amount,
                    e *= t,
                    Kt("Plastic mouse") && (e += .01 * We),
                    Kt("Iron mouse") && (e += .01 * We),
                    Kt("Titanium mouse") && (e += .01 * We),
                    Kt("Adamantium mouse") && (e += .01 * We),
                    Kt("Unobtainium mouse") && (e += .01 * We),
                    Kt("Eludium mouse") && (e += .01 * We),
                    Kt("Wishalloy mouse") && (e += .01 * We),
                    Kt("Fantasteel mouse") && (e += .01 * We),
                    Kt("Nevercrack mouse") && (e += .01 * We),
                    Kt("Armythril mouse") && (e += .01 * We),
                    Kt("Technobsidian mouse") && (e += .01 * We),
                    Kt("Plasmarble mouse") && (e += .01 * We),
                    Kt("Miraculite mouse") && (e += .01 * We),
                    Kt("Fortune #104") && (e += .01 * We);
                    let o = 1;
                    if (Kt("Santa's helpers") && (o *= 1.1), Kt("Cookie egg") && (o *= 1.1), Kt("Halo gloves") && (o *= 1.1), Kt("Dragon claw") && (o *= 1.03), Kt("Aura gloves") && (o *= 1 + .05 * Math.min(Game.Objects.Cursor.level, Kt("Luminous gloves") ? 20 : 10)), o *= Yt("click"), Vt.Temple.minigameLoaded && Jt) {
                        const e = Jt("labor");
                        1 === e ? o *= 1.15 : 2 === e ? o *= 1.1 : 3 === e && (o *= 1.05)
                    }
                    Object.keys(Game.buffs).forEach((e => {
                            void 0 !== Game.buffs[e].multClick && (o *= Game.buffs[e].multClick)
                        })),
                    o *= 1 + .05 * Qt("Dragon Cursor");
                    let n = o * Game.ComputeCps(1, Kt("Reinforced index finger") + Kt("Carpal tunnel prevention cream") + Kt("Ambidextrous"), e);
                    return n = Game.runModHookOnValue("cookiesPerClick", n),
                    Game.hasBuff("Cursed finger") && (n = Game.buffs["Cursed finger"].power),
                    n
                }
                () - Game.computedMouseCps;
                return o ? [We - Game.cookiesPs, o] : [We - Game.cookiesPs]
            }
            return []
        }
        function Fn(e) {
            const t = {};
            return Object.keys(Game.Objects).forEach((o => {
                    t[o] = {},
                    t[o].bonus = gn(o, e),
                    1 !== e && (Ge = 1)
                })),
            t
        }
        function En() {
            Object.keys(Game.Objects).forEach((e => {
                    lt[e].price = vn(e, Game.Objects[e].basePrice, Game.Objects[e].amount, Game.Objects[e].free, 1),
                    ct[e].price = vn(e, Game.Objects[e].basePrice, Game.Objects[e].amount, Game.Objects[e].free, 10),
                    dt[e].price = vn(e, Game.Objects[e].basePrice, Game.Objects[e].amount, Game.Objects[e].free, 100),
                    mt[e].price = vn(e, Game.Objects[e].basePrice, Game.Objects[e].amount, Game.Objects[e].free, mt[e].AmountNeeded)
                }))
        }
        function Bn() {
            lt = Fn(1),
            ct = Fn(10),
            dt = Fn(100),
            function () {
                kt = {};
                for (let e = 0; e < Game.UpgradesInStore.length; e++) {
                    const t = Game.UpgradesInStore[e].name,
                    o = Sn(t);
                    "Elder Pledge" === t ? (kt[t] = {
                            bonus: Game.cookiesPs - ge
                        }, 1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.CalcWrink ? kt[t].bonus -= fe : 2 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.CalcWrink && (kt[t].bonus -= ke), Number.isFinite(kt[t].bonus) || (kt[t].bonus = 0)) : (kt[t] = {}, o[0] && (kt[t].bonus = o[0]), o[1] && (kt[t].bonusMouse = o[1]))
                }
            }
            ()
        }
        function Pn(e, t, o) {
            let n = 0,
            a = 0,
            i = 0,
            r = 0,
            s = 1 + Math.max(0, Math.ceil(Math.log(Game.cookies) / Math.LN10) - 10);
            for (; i < t * o; )
                a = Math.max(e, Math.min(Math.floor(1 / 9 * 10 ** s * e * o), t * o)), i = Math.max(e, Math.min(Math.floor(1 / 9 * 10 ** (s + 1) * e * o), t * o)), r = Math.floor(1 / 9 * 10 ** (s + 1) * e * o), n += a, s += 1;
            return [n, a, r]
        }
        function Nn() {
            let e = 60 * et * 60 * 6 * tt;
            const t = an();
            t > 0 ? e /= t : e = 0,
            wt = Pn(7, e, ot),
            Gt = 2 * wt[1] / ot,
            vt = wt[2] / 60 / 60 / 6 / tt,
            St = Pn(6, e, nt),
            xt = 2 * St[1] / nt,
            Tt = St[2] / 60 / 60 / 6 / tt,
            Bt = Pn(7, 7 * e, ot),
            Ft = 2 * Bt[1] / ot,
            Et = Bt[2] / 60 / 60 / 6 / tt,
            Ot = Pn(6, 7 * e, nt),
            Pt = 2 * Ot[1] / nt,
            Nt = Ot[2] / 60 / 60 / 6 / tt
        }
        function On() {
            const e = Math.floor(Date.now() / 1e3);
            if (Game.T / Game.fps % 1 == 0) {
                const t = Game.HowMuchPrestige(Game.cookiesReset),
                o = Math.floor(Game.HowMuchPrestige(Game.cookiesReset + Game.cookiesEarned)) - Math.floor(t),
                n = e - Ce,
                a = Math.max(0, o - be) / n;
                for (let e = 0; e < n; e++)
                    ce.addLatest(a);
                Ce = e,
                be = o,
                at = ce.calcAverage(5)
            }
        }
        function Dn() {
            yt = "",
            bt = "",
            Ct = "";
            const e = [];
            Object.keys(Game.Upgrades).forEach((t => {
                    e.push(Game.Upgrades[t])
                })),
            e.sort((function (e, t) {
                    return e.order > t.order ? 1 : e.order < t.order ? -1 : 0
                })),
            Object.keys(e).forEach((t => {
                    const o = e[t];
                    if (0 === o.bought) {
                        let e = "";
                        e += function (e) {
                            let t = "crate upgrade missing";
                            "prestige" === e.pool && (t += " heavenly");
                            let o = 0;
                            Game.prefs.crates || (o = 1),
                            o && (t += " noFrame");
                            let {
                                icon: n
                            } = e;
                            e.iconFunction && (n = e.iconFunction());
                            const a = `function() {return Game.crateTooltip(Game.UpgradesById[${e.id}], 'stats');}`;
                            return `<div class="${t}"\n\t${Game.getDynamicTooltip(a,"top",!0)}\n\tstyle = "${n[2]?` background - image: url($ {
                                n[2]
                            });
`:""}background-position:${48*-n[0]}px ${48*-n[1]}px;">\n\t</div>`
                        }
                        (o),
                        "prestige" === o.pool ? Ct += e : "cookie" === o.pool ? bt += e : "toggle" !== o.pool && "unused" !== o.pool && "debug" !== o.pool && (yt += e)
                    }
                }))
        }
        function Ln() {
            if ("christmas" === Game.season) {
                let e = 60 * Game.cookiesPs;
                Game.hasBuff("Elder frenzy") && (e *= .5),
                Game.hasBuff("Frenzy") && (e *= .75),
                rt = Math.max(25, e),
                Game.Has("Ho ho ho-flavored frosting") && (rt *= 2)
            }
        }
        function An() {
            ze = 900 * et / .15,
            ze *= tt;
            const e = an();
            e > 0 ? ze /= e : ze = 0,
            Ve = ot * (.15 * ze) + 13,
            _e = nt * (.15 * ze) + 13,
            Xe = 7 * ze,
            Qe = ot * (.15 * Xe) + 13,
            qe = nt * (.15 * Xe) + 13,
            Ye = 2 * ze,
            Ke = .15 * Ye,
            Je = 0;
            let t = 0,
            o = 0;
            Object.keys(Game.Objects).forEach((e => {
                    if (Game.Objects[e].amount > t && (t = Game.Objects[e].amount), Game.Objects[e].amount > 0) {
                        o += 1
                    }
                })),
            Object.keys(Game.Objects).forEach((e => {
                    if ((Game.Objects[e].amount < t || 1 === o) && Game.Objects[e].amount < 400 && 0.5 * Game.Objects[e].price > Je) {
                        Je = 0.5 * Game.Objects[e].price;
                        Ze = e
                    }
                }))
        }
        function Wn() {
            let e = 1,
            t = 1,
            o = 1;
            Kt("Green yeast digestives") && (o *= 1.01),
            Kt("Dragon fang") && (o *= 1.03),
            e *= 1 + .1 * Game.auraMult("Ancestral Metamorphosis"),
            e *= Game.eff("goldenCookieGain"),
            t *= 1 + .1 * Game.auraMult("Unholy Dominion"),
            t *= Game.eff("wrathCookieGain"),
            ot = o * e,
            nt = o * t,
            tt = 1,
            0 === Game.shimmerTypes.golden.n && (tt *= 1 + 1.23 * Game.auraMult("Dragon's Fortune"))
        }
        function jn(e) {
            const t = {};
            Object.keys(Game.Objects).forEach((o => {
                    if (0 !== Object.keys(mt).length && mt[o].TotalNeeded > Game.Objects[o].amount && !e)
                        t[o] = {
                            AmountNeeded: mt[o].TotalNeeded - Game.Objects[o].amount,
                            TotalNeeded: mt[o].TotalNeeded,
                            price: vn(o, Game.Objects[o].basePrice, Game.Objects[o].amount, Game.Objects[o].free, mt[o].TotalNeeded - Game.Objects[o].amount)
                        };
                    else {
                        const e = function (e) {
                            const t = Game.AchievementsOwned;
                            let o = 100,
                            n = 100;
                            for (; o > -1; )
                                if (gn(e, o), Se > t)
                                    n = o, o -= 10;
                                else {
                                    if (100 === o)
                                        return 101;
                                    for (o += 1; o <= n; ) {
                                        if (gn(e, o), Se > t)
                                            return o;
                                        o += 1
                                    }
                                }
                            return 101
                        }
                        (o);
                        t[o] = {
                            AmountNeeded: e,
                            TotalNeeded: Game.Objects[o].amount + e,
                            price: vn(o, Game.Objects[o].basePrice, Game.Objects[o].amount, Game.Objects[o].free, e)
                        }
                    }
                })),
            mt = t
        }
        function $n() {
            pt = 0,
            ut = 0,
            ht = [0, null];
            for (let e = 0; e < Game.wrinklers.length; e++) {
                let {
                    sucked: t
                } = Game.wrinklers[e],
                o = 1.1;
                if (Game.Has("Sacrilegious corruption") && (o *= 1.05), 1 === Game.wrinklers[e].type && (o *= 3), t *= o, Game.Has("Wrinklerspawn") && (t *= 1.05), Vt.Temple.minigameLoaded) {
                    const e = Game.hasGod("scorn");
                    1 === e ? t *= 1.15 : 2 === e ? t *= 1.1 : 3 === e && (t *= 1.05)
                }
                pt += t,
                0 === Game.wrinklers[e].type && (ut += t, t > ht[0] && (ht = [t, e]))
            }
        }
        function Hn() {
            qo(),
            $n(),
            An(),
            Wn(),
            Nn(),
            Dn(),
            Ln(),
            ae = new bn(wo[wo.length - 1]),
            ie = new bn(wo[wo.length - 1]),
            re = new bn(wo[wo.length - 1]),
            se = new bn(wo[wo.length - 1]),
            le = new bn(xo[xo.length - 1]),
            ce = new bn(5),
            ne = new bn(20 * xo[xo.length - 1]),
            On(),
            jn(),
            Gn(),
            Bn(),
            En(),
            Tn()
        }
        function Un() {
            Object.keys(Game.wrinklers).forEach((e => {
                    Game.wrinklers[e].sucked > 0 && 0 === Game.wrinklers[e].type && (Game.wrinklers[e].hp = 0)
                }))
        }
        function Rn(e, t) {
            if ("b" === e) {
                if (l("tooltip").innerHTML = Game.Objects[t].tooltip(), 1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TooltipAmor) {
                    const e = vn(t, Game.Objects[t].basePrice, 0, Game.Objects[t].free, Game.Objects[t].amount),
                    o = e - Game.Objects[t].totalCookies;
                    o > 0 && (l("tooltip").innerHTML = l("tooltip").innerHTML.split("so far</div>").join(`so far<br/>&bull; <b>${oe(o)}</b> ${1===Math.floor(o)?"cookie":"cookies"} left to amortize (${Ho((e-Game.Objects[t].totalCookies)/(Game.Objects[t].storedTotalCps*Game.globalCpsMult)).text})</div>`))
                }
                -1 === Game.buyMode && (l("tooltip").innerHTML = l("tooltip").innerHTML.split(oe(Game.Objects[t].bulkPrice)).join(oe((Game.Objects[t], Game.Objects[t].basePrice, Game.Objects[t].amount, Game.Objects[t].free, Game.buyBulk, 1))))
            } else if ("u" === e) {
                if (!Game.UpgradesInStore[t])
                    return "";
                l("tooltip").innerHTML = Game.crateTooltip(Game.UpgradesInStore[t], "store")
            } else
                "s" === e ? l("tooltip").innerHTML = Game.lumpTooltip() : "g" === e ? l("tooltip").innerHTML = Game.Objects["Wizard tower"].minigame.spellTooltip(t)() : "p" === e ? l("tooltip").innerHTML = Game.ObjectsById[2].minigame.tileTooltip(t[0], t[1])() : "ha" === e ? l("tooltip").innerHTML = Game.ObjectsById[2].minigame.toolTooltip(1)() : "wb" === e ? l("tooltip").innerHTML = "" : "pag" === e ? l("tooltip").innerHTML = Game.Objects.Temple.minigame.godTooltip(t)() : "pas" === e && (l("tooltip").innerHTML = Game.Objects.Temple.minigame.slotTooltip(t[0])());
            if ("b" === e && 1 === Game.buyMode || "u" === e || "s" === e || "g" === e || "p" === e && !Game.keys[16] || "ha" === e || "wb" === e || "pag" === e || "pas" === e && -1 !== t[1]) {
                const e = document.createElement("div");
                e.id = "CMTooltipArea",
                l("tooltip").appendChild(e)
            }
            return Eo = e,
            Bo = t,
            Mn(),
            l("tooltip").innerHTML
        }
        function In() {
            1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.Favicon && V > 0 ? At.wrath ? l("CMFavicon").href = "https://CookieMonsterTeam.github.io/CookieMonster/favicon/wrathCookie.ico" : l("CMFavicon").href = "https://CookieMonsterTeam.github.io/CookieMonster/favicon/goldenCookie.ico" : l("CMFavicon").href = "https://orteil.dashnet.org/cookieclicker/favicon.ico"
        }
        function zn() {
            Vt = [],
            Object.keys(Game.Objects).forEach((e => {
                    Vt[e] = Jo(e)
                })),
            _t = [],
            Object.keys(Game.Upgrades).forEach((e => {
                    _t[e] = Zo(e)
                })),
            Xt = [],
            Object.keys(Game.Achievements).forEach((e => {
                    Xt[e] = Yo(e)
                })),
            en()
        }
        function Vn() {
            Game.Objects["Wizard tower"].minigameLoaded && Object.keys(Game.Objects["Wizard tower"].minigame.spellsById).forEach((e => {
                    null !== l(`grimoireSpell${e}`).onmouseover && (K[e] = l(`grimoireSpell${e}`).onmouseover, l(`grimoireSpell${e}`).onmouseover = function () {
                        Game.tooltip.dynamic = 1,
                        Game.tooltip.draw(this, (() => Rn("g", `${e}`)), "this"),
                        Game.tooltip.wobble()
                    })
                }))
        }
        function _n() {
            if (!H && Game.Objects["Wizard tower"].minigameLoaded) {
                const {
                    minigame: e
                } = Game.Objects["Wizard tower"];
                j = e.draw,
                Game.Objects["Wizard tower"].minigame.draw = function () {
                    j(),
                    1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.GrimoireBar && e.magic < e.magicM && ("undefined" == typeof Steam || Game.drawT % 5 == 0) && (e.magicBarTextL.innerHTML += ` (${$o(fn(e.magic,e.magicM,e.magicM))})`, e.magicBarL.style.width = "75%")
                },
                H = !0
            }
        }
        function Xn() {
            !function () {
                if (!$ && Game.Objects["Wizard tower"].minigameLoaded) {
                    const {
                        minigame: e
                    } = Game.Objects["Wizard tower"];
                    A = e.launch,
                    W = new Function(`return ${e.launch.toString().split("=this").join("= Game.Objects['Wizard tower'].minigame")}`),
                    Game.Objects["Wizard tower"].minigame.launch = function () {
                        W(),
                        Vn(),
                        H = !1,
                        _n(),
                        $ = !0
                    }
                }
            }
            (),
            _n()
        }
        function Qn() {
            if (Re !== Game.dragonLevel || Le) {
                if (Game.dragonLevel < 25 && Game.dragonLevels[Game.dragonLevel].buy.toString().includes("sacrifice")) {
                    const e = Game.dragonLevels[Game.dragonLevel].buy.toString().match(/Objects\[(.*)\]/);
                    let t = null !== e ? e[1] : Game.ObjectsById[Game.dragonLevel - 5].name;
                    const o = Game.dragonLevels[Game.dragonLevel].buy.toString().match(/sacrifice\((.*?)\)/)[1];
                    if ("i" !== t)
                        if (t = t.replaceAll("'", ""), Game.Objects[t].amount < o)
                            Ie = "Not enough buildings to sell";
                        else {
                            let e = 0;
                            en();
                            for (let n = 0; n < o; n++) {
                                let o = Vt[t].basePrice * Game.priceIncrease ** Math.max(0, Vt[t].amount - 1 - Vt[t].free);
                                o = Game.modifyBuildingPrice(Vt[t], o),
                                o = Math.ceil(o),
                                e += o,
                                Vt[t].amount -= 1
                            }
                            Ie = `Cost to rebuy: ${oe(e)}`
                        }
                    else {
                        let e = 0;
                        en(),
                        Object.keys(Game.Objects).forEach((n => {
                                if (t = n, Game.Objects[t].amount < o)
                                    Ie = "Not enough buildings to sell";
                                else {
                                    for (let n = 0; n < o; n++) {
                                        let o = Vt[t].basePrice * Game.priceIncrease ** Math.max(0, Vt[t].amount - 1 - Vt[t].free);
                                        o = Game.modifyBuildingPrice(Vt[t], o),
                                        o = Math.ceil(o),
                                        e += o,
                                        Vt[t].amount -= 1
                                    }
                                    Ie = `Cost to rebuy: ${oe(e)}`
                                }
                            }))
                    }
                }
                Re = Game.dragonLevel
            }
        }
        function qn(e, t) {
            const o = document.createElement("div");
            o.className = "title",
            o.style.padding = "0px 16px",
            o.style.opacity = "0.7",
            o.style.fontSize = "17px",
            o.style.fontFamily = '"Kavoon", Georgia, serif',
            o.appendChild(document.createTextNode(`${e} `));
            const n = document.createElement("span");
            return n.style.cursor = "pointer",
            n.style.display = "inline-block",
            n.style.height = "14px",
            n.style.width = "14px",
            n.style.borderRadius = "7px",
            n.style.textAlign = "center",
            n.style.backgroundColor = "#C0C0C0",
            n.style.color = "black",
            n.style.fontSize = "13px",
            n.style.verticalAlign = "middle",
            n.textContent = Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers[t] ? "-" : "+",
            n.onclick = function () {
                !function (e) {
                    Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers[e] += 1,
                    Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers[e] > 1 && (Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers[e] = 0),
                    w.saveFramework()
                }
                (t),
                Game.UpdateMenu()
            },
            o.appendChild(n),
            o
        }
        function Yn(e, t, o, n) {
            const a = document.createElement("div");
            a.className = "listing";
            const i = document.createElement("b");
            if (i.textContent = t, a.appendChild(i), "withTooltip" === e) {
                a.className = "listing",
                a.appendChild(document.createTextNode(" "));
                const e = document.createElement("span");
                e.onmouseout = function () {
                    Game.tooltip.hide()
                },
                e.onmouseover = function () {
                    Game.tooltip.draw(this, escape(go[n].innerHTML))
                },
                e.style.cursor = "default",
                e.style.display = "inline-block",
                e.style.height = "10px",
                e.style.width = "10px",
                e.style.borderRadius = "5px",
                e.style.textAlign = "center",
                e.style.backgroundColor = "#C0C0C0",
                e.style.color = "black",
                e.style.fontSize = "9px",
                e.style.verticalAlign = "bottom",
                e.textContent = "?",
                a.appendChild(e)
            }
            return a.appendChild(document.createTextNode(": ")),
            a.appendChild(o),
            a
        }
        function Kn(e, t, o, n) {
            const a = document.createElement("div");
            a.className = "listing";
            const i = document.createElement("b");
            return i.textContent = t,
            !0 === n && (i.style.color = Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ColourGreen),
            a.appendChild(i),
            a.appendChild(document.createTextNode(": ")),
            a.appendChild(o),
            a
        }
        function Jn(e) {
            const t = document.createDocumentFragment();
            t.appendChild(document.createTextNode(`${e.length} `));
            const o = document.createElement("span");
            o.onmouseout = function () {
                Game.tooltip.hide()
            };
            const n = document.createElement("div"),
            a = document.createElement("div");
            a.style.minWidth = "140px",
            a.style.marginBottom = "4px";
            const i = document.createElement("div");
            return i.className = "name",
            i.style.marginBottom = "4px",
            i.style.textAlign = "center",
            i.textContent = "Missing",
            a.appendChild(i),
            Object.keys(e).forEach((t => {
                    const o = document.createElement("div");
                    o.style.textAlign = "center",
                    o.appendChild(document.createTextNode(e[t])),
                    a.appendChild(o)
                })),
            n.appendChild(a),
            o.onmouseover = function () {
                Game.tooltip.draw(this, escape(n.innerHTML))
            },
            o.style.cursor = "default",
            o.style.display = "inline-block",
            o.style.height = "10px",
            o.style.width = "10px",
            o.style.borderRadius = "5px",
            o.style.textAlign = "center",
            o.style.backgroundColor = "#C0C0C0",
            o.style.color = "black",
            o.style.fontSize = "9px",
            o.style.verticalAlign = "bottom",
            o.textContent = "?",
            t.appendChild(o),
            t
        }
        function Zn(e) {
            const t = document.createElement("div");
            if (t.className = "subsection", t.appendChild(e), t.appendChild(qn("Lucky Cookies", "Lucky")), Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers.Lucky && t.appendChild(function () {
                    const e = Game.auraMult("Dragon's Fortune") ? "GoldCookDragonsFortuneTooltipPlaceholder" : "GoldCookTooltipPlaceholder",
                    t = document.createElement("div");
                    t.className = "CMStatsLuckySection";
                    const o = Game.cookies + Ro() < ze ? so : ao,
                    n = Game.cookies + Ro() < ze ? $o((ze - (Game.cookies + Ro())) / Uo()) : "",
                    a = document.createDocumentFragment(),
                    i = document.createElement("span");
                    if (i.style.fontWeight = "bold", i.className = to + o, i.textContent = oe(ze), a.appendChild(i), "" !== n) {
                        const e = document.createElement("small");
                        e.textContent = ` (${n})`,
                        a.appendChild(e)
                    }
                    t.appendChild(Yn("withTooltip", '"Lucky!" cookies required', a, e));
                    const r = Game.cookies + Ro() < Xe ? so : ao,
                    s = Game.cookies + Ro() < Xe ? $o((Xe - (Game.cookies + Ro())) / Uo()) : "",
                    l = document.createDocumentFragment(),
                    c = document.createElement("span");
                    if (c.style.fontWeight = "bold", c.className = to + r, c.textContent = oe(Xe), l.appendChild(c), "" !== s) {
                        const e = document.createElement("small");
                        e.textContent = ` (${s})`,
                        l.appendChild(e)
                    }
                    t.appendChild(Yn("withTooltip", '"Lucky!" cookies required (frenzy)', l, e));
                    const d = Ve !== _e,
                    m = document.createElement("span");
                    m.style.fontWeight = "bold",
                    m.className = to + Ve,
                    m.textContent = oe(Ve) + (d ? ` / ${oe(_e)}` : ""),
                    t.appendChild(Yn("withTooltip", '"Lucky!" reward (max)' + (d ? " (golden / wrath)" : ""), m, e));
                    const p = document.createElement("span");
                    p.style.fontWeight = "bold",
                    p.className = to + p,
                    p.textContent = oe(Qe) + (d ? ` / ${oe(qe)}` : ""),
                    t.appendChild(Yn("withTooltip", '"Lucky!" reward (max) (frenzy)' + (d ? " (golden / wrath)" : ""), p, e));
                    const u = Math.min(.15 * (Game.cookies + Ro()), et * tt * 60 * 15) + 13,
                    h = document.createElement("span");
                    return h.style.fontWeight = "bold",
                    h.className = to + h,
                    h.textContent = oe(ot * u) + (d ? ` / ${oe(nt*u)}` : ""),
                    t.appendChild(Yn("withTooltip", '"Lucky!" reward (cur)' + (d ? " (golden / wrath)" : ""), h, e)),
                    t
                }
                    ()), t.appendChild(qn("Chain Cookies", "Chain")), Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers.Chain && t.appendChild(function () {
                    const e = Game.auraMult("Dragon's Fortune") ? "GoldCookDragonsFortuneTooltipPlaceholder" : "GoldCookTooltipPlaceholder",
                    t = document.createElement("div");
                    t.className = "CMStatsChainSection";
                    const o = Game.cookies + Ro() < Gt ? so : ao,
                    n = Game.cookies + Ro() < Gt ? $o((Gt - (Game.cookies + Ro())) / Uo()) : "",
                    a = document.createDocumentFragment(),
                    i = document.createElement("span");
                    if (i.style.fontWeight = "bold", i.className = to + o, i.textContent = oe(Gt), a.appendChild(i), "" !== n) {
                        const e = document.createElement("small");
                        e.textContent = ` (${n})`,
                        a.appendChild(e)
                    }
                    t.appendChild(Yn("withTooltip", '"Chain" cookies required', a, e));
                    const r = Game.cookies + Ro() < xt ? so : ao,
                    s = Game.cookies + Ro() < xt ? $o((xt - (Game.cookies + Ro())) / Uo()) : "",
                    l = document.createDocumentFragment(),
                    c = document.createElement("span");
                    if (c.style.fontWeight = "bold", c.className = to + r, c.textContent = oe(xt), l.appendChild(c), "" !== s) {
                        const e = document.createElement("small");
                        e.textContent = ` (${s})`,
                        l.appendChild(e)
                    }
                    t.appendChild(Yn("withTooltip", '"Chain" cookies required (Wrath)', l, e));
                    const d = Game.cookies + Ro() < Ft ? so : ao,
                    m = Game.cookies + Ro() < Ft ? $o((Ft - (Game.cookies + Ro())) / Uo()) : "",
                    p = document.createDocumentFragment(),
                    u = document.createElement("span");
                    if (u.style.fontWeight = "bold", u.className = to + d, u.textContent = oe(Ft), p.appendChild(u), "" !== m) {
                        const e = document.createElement("small");
                        e.textContent = ` (${m})`,
                        p.appendChild(e)
                    }
                    t.appendChild(Yn("withTooltip", '"Chain" cookies required (Frenzy)', p, e));
                    const h = Game.cookies + Ro() < Pt ? so : ao,
                    g = Game.cookies + Ro() < Pt ? $o((Pt - (Game.cookies + Ro())) / Uo()) : "",
                    f = document.createDocumentFragment(),
                    k = document.createElement("span");
                    if (k.style.fontWeight = "bold", k.className = to + h, k.textContent = oe(Pt), f.appendChild(k), "" !== g) {
                        const e = document.createElement("small");
                        e.textContent = ` (${g})`,
                        f.appendChild(e)
                    }
                    t.appendChild(Yn("withTooltip", '"Chain" cookies required (frenzy) (Wrath)', f, e)),
                    t.appendChild(Yn("withTooltip", '"Chain" reward (max) (golden / wrath)', document.createTextNode(`${oe(wt[0])} / ${oe(St[0])}`), e)),
                    t.appendChild(Yn("withTooltip", '"Chain" reward (max) (frenzy) (golden / wrath)', document.createTextNode(`${oe(Bt[0])} / ${oe(Bt[0])}`), e));
                    const M = Math.min(60 * Game.cookiesPs * 60 * 6 * tt, .5 * Game.cookies),
                    y = Pn(7, M, ot)[0],
                    C = Pn(6, M, nt)[0];
                    return t.appendChild(Yn("withTooltip", '"Chain" reward (cur) (golden / wrath)', document.createTextNode(`${oe(y)} / ${oe(C)}`), e)),
                    t.appendChild(Yn("withTooltip", "CPS needed for next level (g / w)", document.createTextNode(`${oe(vt)} / ${oe(Tt)}`), "ChainNextLevelPlaceholder")),
                    t.appendChild(Yn("withTooltip", "CPS needed for next level (frenzy) (g / w)", document.createTextNode(`${oe(Et)} / ${oe(Nt)}`), "ChainNextLevelPlaceholder")),
                    t
                }
                    ()), Game.Objects["Wizard tower"].minigameLoaded && (t.appendChild(qn("Spells", "Spells")), Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers.Spells && t.appendChild(function () {
                        const e = document.createElement("div");
                        e.className = "CMStatsSpellsSection";
                        const t = Game.cookies + Ro() < Ye ? so : ao,
                        o = Game.cookies + Ro() < Ye ? $o((Ye - (Game.cookies + Ro())) / Uo()) : "",
                        n = document.createDocumentFragment(),
                        a = document.createElement("span");
                        if (a.style.fontWeight = "bold", a.className = to + t, a.textContent = oe(Ye), n.appendChild(a), "" !== o) {
                            const e = document.createElement("small");
                            e.textContent = ` (${o})`,
                            n.appendChild(e)
                        }
                        e.appendChild(Yn("withTooltip", '"Conjure Baked Goods" cookies required', n, "GoldCookTooltipPlaceholder")),
                        e.appendChild(Yn("withTooltip", '"Conjure Baked Goods" reward (max)', document.createTextNode(oe(Ke)), "GoldCookTooltipPlaceholder"));
                        const i = Game.cookies + Ro() < 7 * Ye ? so : ao,
                        r = Math.min(.15 * (Game.cookies + Ro()), 60 * et * 30),
                        s = Game.cookies + Ro() < 7 * Ye ? $o((7 * Ye - (Game.cookies + Ro())) / Uo()) : "",
                        l = document.createDocumentFragment(),
                        c = document.createElement("span");
                        if (c.style.fontWeight = "bold", c.className = to + i, c.textContent = oe(7 * Ye), l.appendChild(c), "" !== s) {
                            const e = document.createElement("small");
                            e.textContent = ` (${s})`,
                            l.appendChild(e)
                        }
                        return e.appendChild(Yn("withTooltip", '"Conjure Baked Goods" cookies required (frenzy)', l, "GoldCookTooltipPlaceholder")),
                        e.appendChild(Yn("withTooltip", '"Conjure Baked Goods" reward (max) (frenzy)', document.createTextNode(oe(7 * Ke)), "GoldCookTooltipPlaceholder")),
                        e.appendChild(Yn("withTooltip", '"Conjure Baked Goods" reward (cur)', document.createTextNode(oe(r)), "GoldCookTooltipPlaceholder")),
                        Je && e.appendChild(Yn("withTooltip", '"Spontaneous Edifice" cookies required (most expensive building)', document.createTextNode(`${oe(Je)} (${Ze})`), "GoldCookTooltipPlaceholder")),
                        e
                    }
                        ())), Game.Objects.Farm.minigameLoaded && (t.appendChild(qn("Garden", "Garden")), Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers.Garden && t.appendChild(function () {
                        const e = document.createElement("div");
                        e.className = "CMStatsGardenSection";
                        const t = Game.cookies < 60 * Game.cookiesPs * 10 * 100 ? so : ao,
                        o = document.createElement("span");
                        o.style.fontWeight = "bold",
                        o.className = to + t,
                        o.textContent = oe(60 * Game.cookiesPs * 10 * 100),
                        e.appendChild(Yn("basic", "Cookies required for max reward of Bakeberry: ", o));
                        const n = Game.cookies < 60 * Game.cookiesPs * 100 ? so : ao,
                        a = document.createElement("span");
                        a.style.fontWeight = "bold",
                        a.className = to + n,
                        a.textContent = oe(60 * Game.cookiesPs * 100),
                        e.appendChild(Yn("basic", "Cookies required for max reward of Chocoroot: ", a));
                        const i = Game.cookies < 60 * Game.cookiesPs * 60 * 25 ? so : ao,
                        r = document.createElement("span");
                        r.style.fontWeight = "bold",
                        r.className = to + i,
                        r.textContent = oe(60 * Game.cookiesPs * 60 * 25),
                        e.appendChild(Yn("basic", "Cookies required for max reward of Queenbeet: ", r));
                        const s = Game.cookies < 60 * Game.cookiesPs * 15 * 100 ? so : ao,
                        l = document.createElement("span");
                        l.style.fontWeight = "bold",
                        l.className = to + s,
                        l.textContent = oe(60 * Game.cookiesPs * 15 * 100),
                        e.appendChild(Yn("basic", "Cookies required for max reward of Duketater: ", l));
                        const c = [];
                        return Object.keys(pn).forEach((e => {
                                Game.HasUnlocked(pn[e]) || c.push(pn[e])
                            })),
                        0 !== c.length && e.appendChild(Yn("basic", "Rare plant drops left to unlock", Jn(c))),
                        e
                    }
                        ())), t.appendChild(qn("Prestige", "Prestige")), Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers.Prestige && t.appendChild(function () {
                    const e = document.createElement("div");
                    e.className = "CMStatsPrestigeSection";
                    const t = Math.floor(Game.HowMuchPrestige(Dt + Game.cookiesReset + pt + (Game.HasUnlocked("Chocolate egg") && !Game.Has("Chocolate egg") ? st : 0)));
                    e.appendChild(Yn("withTooltip", "Prestige level (cur / max)", document.createTextNode(`${oe(Game.prestige)} / ${oe(t)}`), "PrestMaxTooltipPlaceholder"));
                    const o = Math.max(0, Game.HowManyCookiesReset(t + 1) - (Dt + Game.cookiesReset + pt + (Game.HasUnlocked("Chocolate egg") && !Game.Has("Chocolate egg") && st ? st : 0))),
                    n = document.createDocumentFragment();
                    n.appendChild(document.createTextNode(oe(o)));
                    const a = document.createElement("small");
                    a.textContent = ` (${$o(o/Lt,1)})`,
                    n.appendChild(a),
                    e.appendChild(Yn("withTooltip", "Cookies to next level", n, "NextPrestTooltipPlaceholder")),
                    e.appendChild(Yn("withTooltip", "Heavenly chips (cur / max)", document.createTextNode(`${oe(Game.heavenlyChips)} / ${oe(t-Game.prestige+Game.heavenlyChips)}`), "HeavenChipMaxTooltipPlaceholder")),
                    e.appendChild(Yn("basic", "Heavenly chips per second (last 5 seconds)", document.createTextNode(oe(at, 2))));
                    const i = Number(Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.HeavenlyChipsTarget);
                    if (!Number.isNaN(i)) {
                        const t = i - Math.floor(Game.HowMuchPrestige(Game.cookiesReset + Game.cookiesEarned));
                        t > 0 && (e.appendChild(Yn("basic", "Heavenly chips to target set in settings (cur)", document.createTextNode(oe(t)))), e.appendChild(Yn("basic", "Time till target (cur, current 5 second average)", document.createTextNode($o(t / at)))))
                    }
                    const r = function (e) {
                        let t = Game.cookiesPs;
                        en(),
                        0 === _t["Heavenly key"].bought && (_t["Heavenly chip secret"].bought = 1, _t["Heavenly cookie stand"].bought = 1, _t["Heavenly bakery"].bought = 1, _t["Heavenly confectionery"].bought = 1, _t["Heavenly key"].bought = 1, sn(), t = We, en()),
                        Dt >= 1e6 && rn("Sacrifice"),
                        Dt >= 1e9 && rn("Oblivion"),
                        Dt >= 1e12 && rn("From scratch"),
                        Dt >= 1e15 && rn("Nihilism"),
                        Dt >= 1e18 && rn("Dematerialize"),
                        Dt >= 1e21 && rn("Nil zero zilch"),
                        Dt >= 1e24 && rn("Transcendence"),
                        Dt >= 1e27 && rn("Obliterate"),
                        Dt >= 1e30 && rn("Negative void"),
                        Dt >= 1e33 && rn("To crumbs, you say?"),
                        Dt >= 1e36 && rn("You get nothing"),
                        Dt >= 1e39 && rn("Humble rebeginnings"),
                        Dt >= 1e42 && rn("The end of the world"),
                        Dt >= 1e45 && rn("Oh, you're back"),
                        Dt >= 1e48 && rn("Lazarus"),
                        Dt >= 1e51 && rn("Smurf account"),
                        Dt >= 1e54 && rn("If at first you don't succeed"),
                        _t["Heavenly chip secret"].bought = 1,
                        _t["Heavenly cookie stand"].bought = 1,
                        _t["Heavenly bakery"].bought = 1,
                        _t["Heavenly confectionery"].bought = 1,
                        _t["Heavenly key"].bought = 1,
                        Ee = e;
                        const o = Se;
                        sn(),
                        hn(),
                        o !== Se && sn();
                        const n = We - t;
                        return Ee = Game.prestige,
                        n
                    }
                    (t),
                    s = document.createDocumentFragment();
                    s.appendChild(document.createTextNode(oe(r)));
                    const l = Math.round(r / Game.cookiesPs * 1e4);
                    if (Number.isFinite(l) && 0 !== l) {
                        const e = document.createElement("small");
                        e.textContent = ` (${l/100}% of income)`,
                        s.appendChild(e)
                    }
                    e.appendChild(Yn("withTooltip", "Reset bonus income", s, "ResetTooltipPlaceholder"));
                    const c = Math.floor(Game.HowMuchPrestige(Game.cookiesReset)),
                    d = Math.floor(Game.HowMuchPrestige(Game.cookiesReset + Game.cookiesEarned)),
                    m = d - c;
                    if (!Game.Has("Lucky digit")) {
                        let t = 7 - d % 10;
                        t < 0 && (t += 10);
                        const o = m + t,
                        n = d + t,
                        a = document.createDocumentFragment();
                        a.appendChild(document.createTextNode(`${n.toLocaleString()} / ${o.toLocaleString()} (+${t})`)),
                        e.appendChild(Yn("basic", 'Next "Lucky Digit" (total / reset)', a))
                    }
                    if (!Game.Has("Lucky number")) {
                        let t = 777 - d % 1e3;
                        t < 0 && (t += 1e3);
                        const o = m + t,
                        n = d + t,
                        a = document.createDocumentFragment();
                        a.appendChild(document.createTextNode(`${n.toLocaleString()} / ${o.toLocaleString()} (+${t})`)),
                        e.appendChild(Yn("basic", 'Next "Lucky Number" (total / reset)', a))
                    }
                    if (!Game.Has("Lucky payout")) {
                        let t = 777777 - d % 1e6;
                        t < 0 && (t += 1e6);
                        const o = m + t,
                        n = d + t,
                        a = document.createDocumentFragment();
                        a.appendChild(document.createTextNode(`${n.toLocaleString()} / ${o.toLocaleString()} (+${t})`)),
                        e.appendChild(Yn("basic", 'Next "Lucky Payout" (total / reset)', a))
                    }
                    return e
                }
                    ()), Game.cpsSucked > 0 && (t.appendChild(qn("Wrinklers", "Wrink")), Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers.Wrink)) {
                const e = document.createDocumentFragment();
                e.appendChild(document.createTextNode(`${oe(pt)} / ${oe(ut)} `));
                const o = document.createElement("a");
                o.textContent = "Pop All Normal",
                o.className = "option",
                o.onclick = function () {
                    Un()
                },
                e.appendChild(o),
                t.appendChild(Yn("basic", "Rewards of Popping (All/Normal)", e));
                const n = document.createDocumentFragment();
                n.appendChild(document.createTextNode(`${oe(ht[0])} `));
                const a = document.createElement("a");
                a.textContent = "Pop Single Fattest",
                a.className = "option",
                a.onclick = function () {
                    null !== ht[1] && (Game.wrinklers[ht[1]].hp = 0)
                },
                n.appendChild(a),
                t.appendChild(Yn("basic", `Rewards of Popping Single Fattest Non-Shiny Wrinkler (id: ${null!==ht[1]?ht[1]:"None"})`, n))
            }
            if (t.appendChild(function () {
                    const e = document.createElement("div");
                    e.className = "CMStatsSeasonSection";
                    let t = !1;
                    const o = [];
                    Object.keys(cn).forEach((e => {
                            Game.Has(cn[e]) || (o.push(cn[e]), t = !0)
                        }));
                    const n = [];
                    Object.keys(dn).forEach((e => {
                            Game.Has(dn[e]) || (n.push(dn[e]), t = !0)
                        }));
                    const a = [];
                    Object.keys(mn).forEach((e => {
                            Game.Has(mn[e]) || (a.push(mn[e]), t = !0)
                        }));
                    const i = [];
                    Object.keys(Game.eggDrops).forEach((e => {
                            Game.HasUnlocked(Game.eggDrops[e]) || (i.push(Game.eggDrops[e]), t = !0)
                        }));
                    const r = [];
                    Object.keys(Game.rareEggDrops).forEach((e => {
                            Game.HasUnlocked(Game.rareEggDrops[e]) || (r.push(Game.rareEggDrops[e]), t = !0)
                        }));
                    const s = Game.HasUnlocked("Chocolate egg") && !Game.Has("Chocolate egg"),
                    l = Game.Has("Century egg");
                    if (("christmas" === Game.season || t || s || l) && (e.appendChild(qn("Season Specials", "Sea")), Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers.Sea)) {
                        if (0 !== o.length) {
                            e.appendChild(Kn(0, "Halloween cookies left to buy", Jn(o), "halloween" === Game.season));
                            let t = .95;
                            if (Game.HasAchiev("Spooky cookies") && (t = .8), Game.Has("Starterror") && (t *= .9), t *= 1 / Game.dropRateMult(), Game.hasGod) {
                                const e = Game.hasGod("seasons");
                                1 === e ? t *= .9 : 2 === e ? t *= .95 : 3 === e && (t *= .97)
                            }
                            const n = o.length / 7;
                            e.appendChild(Kn(0, "Chance of receiving a cookie from wrinkler/shiny wrinkler", document.createTextNode(`${oe((1-t)*n*100)}% / ${oe((1-.9*t)*n*100)}%`), "halloween" === Game.season))
                        }
                        if (0 !== n.length) {
                            e.appendChild(Kn(0, "Christmas cookies left to buy", Jn(n), "christmas" === Game.season));
                            let t = .8;
                            if (Game.HasAchiev("Let it snow") && (t = .6), t *= 1 / Game.dropRateMult(), Game.Has("Starsnow") && (t *= .95), Game.hasGod) {
                                const e = Game.hasGod("seasons");
                                1 === e ? t *= .9 : 2 === e ? t *= .95 : 3 === e && (t *= .97)
                            }
                            const o = n.length / 7;
                            e.appendChild(Kn(0, "Chance of receiving a cookie from reindeer", document.createTextNode(`${oe((1-t)*o*100)}%`), "christmas" === Game.season))
                        }
                        0 !== a.length && e.appendChild(Kn(0, "Valentine cookies left to buy", Jn(a), "valentines" === Game.season));
                        const t = function (e) {
                            let t = e * (1 / Game.dropRateMult());
                            if (Game.HasAchiev("Hide & seek champion") && (t *= .7), Game.Has("Omelette") && (t *= .9), Game.Has("Starspawn") && (t *= .9), Game.hasGod) {
                                const e = Game.hasGod("seasons");
                                1 === e ? t *= .9 : 2 === e ? t *= .95 : 3 === e && (t *= .97)
                            }
                            const o = 1 - t,
                            n = Game.eggDrops.length - i.length,
                            a = Game.rareEggDrops.length - r.length,
                            s = .9 * o * (1 - n / Game.eggDrops.length),
                            l = .1 * o * (1 - a / Game.rareEggDrops.length),
                            c = .9 * o * (n / Game.eggDrops.length) + .1 * o * (a / Game.rareEggDrops.length);
                            return [s + .9 * c * (1 - n / Game.eggDrops.length), l + .1 * c * (1 - a / Game.rareEggDrops.length)]
                        };
                        0 !== i.length && (e.appendChild(Kn(0, "Normal easter eggs left to unlock", Jn(i), "easter" === Game.season)), e.appendChild(Kn(0, "Chance of receiving an egg from wrinkler/golden cookie", document.createTextNode(`${oe(100*t(.98)[0])}% / ${oe(100*t(.9)[0])}%`), "easter" === Game.season))),
                        0 !== r.length && (e.appendChild(Kn(0, "Rare easter eggs left to unlock", Jn(r), "easter" === Game.season)), e.appendChild(Kn(0, "Chance of receiving a rare egg from wrinkler/golden cookie", document.createTextNode(`${oe(100*t(.98)[1])}% / ${oe(100*t(.9)[1])}%`), "easter" === Game.season))),
                        "christmas" === Game.season && e.appendChild(Kn(0, "Reindeer reward", document.createTextNode(oe(rt)), !0)),
                        s && e.appendChild(Yn("withTooltip", "Chocolate egg cookies", document.createTextNode(oe(st)), "ChoEggTooltipPlaceholder")),
                        l && e.appendChild(Yn("basic", "Century egg multiplier", document.createTextNode(Math.round(1e4 * (it - 1)) / 100 + "%")))
                    }
                    return e
                }
                    ()), t.appendChild(qn("Achievements", "Achievs")), Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers.Achievs && Object.keys(Game.Objects).forEach((e => {
                        const o = mt[e];
                        t.appendChild(Yn("basic", e, o.AmountNeeded < 101 ? document.createTextNode(`Next achievement in ${o.AmountNeeded}, price: ${oe(o.price)}`) : document.createTextNode("No new achievement for next 100 buildings")))
                    })), t.appendChild(qn("Miscellaneous", "Misc")), Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers.Misc) {
                if (t.appendChild(Yn("basic", `Average cookies per second (past ${wo[Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.AvgCPSHist]<60?` $ {
                            wo[Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.AvgCPSHist]
                        }
                            seconds `:wo[Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.AvgCPSHist]/60+(3===Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.AvgCPSHist?" minute":" minutes")})`, document.createTextNode(oe(Uo(), 3)))), t.appendChild(Yn("basic", `Average cookie clicks per second (past ${xo[Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.AvgClicksHist]}${0===Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.AvgClicksHist?" second":" seconds"})`, document.createTextNode(oe(Mt, 1)))), t.appendChild(Yn("basic", `Cookies from clicking (past ${xo[Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.AvgClicksHist]}${0===Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.AvgClicksHist?" second":" seconds"})`, document.createTextNode(oe(ne.calcSum(Mt * xo[Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.AvgClicksHist]))))), Game.Has("Fortune cookies")) {
                    const e = [];
                    Object.keys(ln).forEach((t => {
                            Game.Has(ln[t]) || e.push(ln[t])
                        })),
                    0 !== e.length && t.appendChild(Yn("basic", "Fortune Upgrades Left to Buy", Jn(e)))
                }
                if (Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ShowMissedGC && t.appendChild(Yn("basic", "Missed golden cookies", document.createTextNode(oe(Game.missedGoldenClicks)))), Game.prefs.autosave) {
                    const e = document.createElement("span");
                    e.id = "CMStatsAutosaveTimer",
                    e.innerText = Game.sayTime(60 * Game.fps - (Game.OnAscend ? 0 : Game.T % (60 * Game.fps)), 4),
                    t.appendChild(Yn("basic", "Time till autosave", e))
                }
            }
            l("menu").insertBefore(t, l("menu").childNodes[2]),
            Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.MissingUpgrades && l("menu").childNodes.forEach((e => {
                    if (e.children[0])
                        if ("Prestige" === e.children[0].innerHTML && Ct) {
                            const t = Ct.match(new RegExp("div", "g") || 0).length / 2,
                            o = document.createElement("div");
                            o.id = "CMMissingUpgradesPrestigeTitle",
                            o.className = "listing";
                            const n = document.createElement("div");
                            n.innerHTML = `<b>Missing Prestige upgrades:</b> ${t}/${Game.PrestigeUpgrades.length} (${Math.floor(t/Game.PrestigeUpgrades.length*100)}%)`,
                            o.appendChild(n),
                            e.appendChild(o);
                            const a = document.createElement("div");
                            a.className = "listing crateBox",
                            a.innerHTML = Ct,
                            e.appendChild(a)
                        } else if ("Upgrades" === e.children[0].innerHTML) {
                            if (yt) {
                                const t = yt.match(new RegExp("div", "g") || 0).length / 2,
                                o = document.createElement("div");
                                o.id = "CMMissingUpgradesTitle",
                                o.className = "listing";
                                const n = document.createElement("div");
                                n.innerHTML = `<b>Missing normal upgrades:</b> ${t}/${Game.UpgradesByPool[""].length+Game.UpgradesByPool.tech.length} (${Math.floor(t/(Game.UpgradesByPool[""].length+Game.UpgradesByPool.tech.length)*100)}%)`,
                                o.appendChild(n),
                                e.insertBefore(o, e.childNodes[3]);
                                const a = document.createElement("div");
                                a.className = "listing crateBox",
                                a.innerHTML = yt,
                                e.insertBefore(a, document.getElementById("CMMissingUpgradesTitle").nextSibling)
                            }
                            if (bt) {
                                const t = bt.match(new RegExp("div", "g") || 0).length / 2,
                                o = document.createElement("div");
                                o.id = "CMMissingUpgradesCookiesTitle",
                                o.className = "listing";
                                const n = document.createElement("div");
                                n.innerHTML = `<b>Missing Cookie upgrades:</b> ${t}/${Game.UpgradesByPool.cookie.length} (${Math.floor(t/Game.UpgradesByPool.cookie.length*100)}%)`,
                                o.appendChild(n),
                                e.appendChild(o);
                                const a = document.createElement("div");
                                a.className = "listing crateBox",
                                a.innerHTML = bt,
                                e.appendChild(a)
                            }
                        }
                })),
            Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.MissingAchievements && function () {
                let e;
                Object.values(document.querySelectorAll("div.title")).forEach((t => {
                        t.textContent.includes("Achievements") && (e = t.parentElement.querySelectorAll("div.listing.crateBox")[0])
                    })),
                Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.MissingAchievements && Object.values(e.children).forEach((e => {
                        if (!e.className.includes("enabled")) {
                            const t = e.onclick.toString().split(/\[(.*)\]/gi)[1], {
                                icon: o
                            } = Game.AchievementsById[t];
                            e.style.backgroundPosition = `${48*-o[0]}px ${48*-o[1]}px`,
                            e.onmouseover = function () {
                                Game.mouseDown || (Game.setOnCrate(this), Game.tooltip.dynamic = 1, Game.tooltip.draw(this, (() => function (e) {
                                            const t = [];
                                            "shadow" === e.pool ? t.push("Shadow Achievement", "#9700cf") : t.push("Achievement", 0),
                                            t.push("Locked", 0);
                                            let o = 0;
                                            (Game.Has("Neuromancy") || Game.sesame && "debug" === e.pool) && (o = 1),
                                            o && 0 === e.won ? t.push("Click to win!", "#00c462") : o && e.won > 0 && t.push("Click to lose!", "#00c462");
                                            let {
                                                icon: n
                                            } = e;
                                            e.iconFunction && (n = e.iconFunction());
                                            let {
                                                desc: a
                                            } = e;
                                            e.descFunc && (a = e.descFunc("stats"));
                                            let i = "";
                                            for (let e = 0; e < t.length; e += 2)
                                                e % 2 == 0 && (i += ` <div class="tag" style="color:${0===t[e+1]?"#fff":t[e+1]};">[${t[e]}]</div>`);
                                            return i = i.substring(1),
`<div style="padding:8px 4px;min-width:350px;opacity:0.5">\n  <div class="icon" style="float:left;margin-left:-8px;margin-top:-8px;background-position:${48*-n[0]}px ${48*-n[1]}px;"></div>\n  <div class="name">${e.name}</div>\n  ${i}<div class="line"></div><div class="description">${a}</div></div>\n  ${Game.sesame?` < div style = "font-size:9px;" > Id: $ {
                                                e.id
                                            }
                                             | Order: $ {
                                                Math.floor(e.order)
                                            }
                                            $ {
                                                e.tier ? ` | Tier : ${e.tier}` : ""
                                            }
                                             <  / div > `:""}`
                                        }
                                            (Game.AchievementsById[t])), "top"), Game.tooltip.wobble())
                            }
                        }
                    }))
            }
            ()
        }
        function ea(e) {
            if (1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimerBar && 0 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimerBarPos) {
                const t = parseInt(l("CMTimerBar").style.height, 10);
                Game.mouseY -= t,
                e(),
                Game.mouseY += t
            } else
                e()
        }
        function ta() {
            Z.Beautify = Beautify,
            Beautify = oe,
            Z.CalculateGains = Game.CalculateGains,
            Game.CalculateGains = function () {
                Z.CalculateGains(),
                Le = 1,
                ee = Date.now(),
                te = Date.now()
            },
            Z.tooltip = {},
            Z.tooltip.draw = Game.tooltip.draw,
            Z.tooltip.drawMod = new Function(`return ${Game.tooltip.draw.toString().split("this").join("Game.tooltip")}`)(),
            Game.tooltip.draw = function (e, t, o) {
                Z.tooltip.drawMod(e, t, o)
            },
            Z.tooltip.update = Game.tooltip.update,
            Z.tooltip.updateMod = new Function(`return ${Game.tooltip.update.toString().split("this.").join("Game.tooltip.")}`)(),
            Game.tooltip.update = function () {
                Z.tooltip.updateMod(),
                function () {
                    if ("store" === Game.tooltip.origin) {
                        let e = 0;
                        1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ToolWarnLucky && 1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ToolWarnPos && null !== l("CMDispTooltipWarningParent") && (e = l("CMDispTooltipWarningParent").clientHeight - 4),
                        Game.tooltip.tta.style.top = `${Math.min(parseInt(Game.tooltip.tta.style.top,10),l("game").clientHeight+l("topBar").clientHeight-Game.tooltip.tt.clientHeight-e-46)}px`
                    }
                }
                ()
            },
            Z.UpdateWrinklers = Game.UpdateWrinklers,
            Game.UpdateWrinklers = function () {
                ea(Z.UpdateWrinklers)
            },
            Z.UpdateSpecial = Game.UpdateSpecial,
            Game.UpdateSpecial = function () {
                ea(Z.UpdateSpecial)
            },
            l("bigCookie").removeEventListener("click", Game.ClickCookie, !1),
            l("bigCookie").addEventListener("click", (e => {
                    ea((() => Game.ClickCookie(e, 0)))
                }), !1),
            Z.RebuildUpgrades = Game.RebuildUpgrades,
            Game.RebuildUpgrades = function () {
                Z.RebuildUpgrades(),
                J = [],
                Object.keys(Game.UpgradesInStore).forEach((e => {
                        null !== l(`upgrade${e}`).onmouseover && (J[e] = l(`upgrade${e}`).onmouseover, l(`upgrade${e}`).onmouseover = function () {
                            Game.mouseDown || (Game.setOnCrate(this), Game.tooltip.dynamic = 1, Game.tooltip.draw(this, (() => Rn("u", `${e}`)), "store"), Game.tooltip.wobble())
                        })
                    })),
                Game.CalculateGains()
            },
            Z.ClickProduct = Game.ClickProduct,
            Game.ClickProduct = function (e) {
                (!Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.BulkBuyBlock || Game.ObjectsById[e].bulkPrice < Game.cookies || -1 === Game.buyMode) && Z.ClickProduct(e)
            },
            Z.DescribeDragonAura = Game.DescribeDragonAura,
            Game.DescribeDragonAura = function (e) {
                Z.DescribeDragonAura(e),
                function (e) {
                    if (1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.DragonAuraInfo) {
                        const[t, o] = function (e) {
                            en(),
                            l("promptContent").children[0].innerHTML.includes("secondary") ? Pe = e : Be = e;
                            let t = 0;
                            if (Be !== He || Pe !== Ue)
                                for (let e = Game.ObjectsById.length - 1; e > -1; --e)
                                    if (Game.ObjectsById[e].amount > 0) {
                                        const o = Vt[Game.ObjectsById[e].name].name;
                                        Vt[o].amount -= 1,
                                        we -= 1,
                                        t = Vt[o].basePrice * Game.priceIncrease ** Math.max(0, Vt[o].amount - 1 - Vt[o].free),
                                        t = Game.modifyBuildingPrice(Vt[o], t),
                                        t = Math.ceil(t);
                                        break
                                    }
                            const o = Se;
                            return sn(),
                            hn(),
                            o !== Se && sn(),
                            [We - Game.cookiesPs, t]
                        }
                        (e),
                        n = $o(o / (t + Game.cookiesPs));
                        let a;
                        a = 0 === Game.cookiesPs ? oe(1 / 0) : oe(t / Game.cookiesPs * 100),
                        l("dragonAuraInfo").style.minHeight = "60px",
                        l("dragonAuraInfo").style.margin = "8px",
                        l("dragonAuraInfo").appendChild(document.createElement("div")).className = "line";
                        const i = document.createElement("div");
                        i.style.minWidth = "200px",
                        i.style.textAlign = "center",
                        i.textContent = `Picking this aura will change CPS by ${oe(t)} (${a}% of current CPS).`,
                        l("dragonAuraInfo").appendChild(i);
                        const r = document.createElement("div");
                        r.style.minWidth = "200px",
                        r.style.textAlign = "center",
                        r.textContent = `It will take ${n} to recover the cost.`,
                        l("dragonAuraInfo").appendChild(r)
                    }
                }
                (e)
            },
            Z.ToggleSpecialMenu = Game.ToggleSpecialMenu,
            Game.ToggleSpecialMenu = function (e) {
                Z.ToggleSpecialMenu(e),
                function () {
                    if (null !== (l("specialPopup").className.match(/onScreen/) && l("specialPopup").children[0].style.background.match(/dragon/)))
                        for (let e = 0; e < l("specialPopup").childNodes.length; e++)
                            "optionBox" === l("specialPopup").childNodes[e].className && (l("specialPopup").children[e].onmouseover = function () {
                                Qn(),
                                Game.tooltip.dynamic = 1,
                                Game.tooltip.draw(l("specialPopup"), `<div style="min-width:200px;text-align:center;">${Ie}</div>`, "this"),
                                Game.tooltip.wobble()
                            }, l("specialPopup").children[e].onmouseout = function () {
                                Game.tooltip.shouldHide = 1
                            })
                }
                ()
            },
            Z.UpdateMenu = Game.UpdateMenu,
            Game.UpdateMenu = function () {
                void 0 !== s().picker && void 0 !== s().picker.owner || (Z.UpdateMenu(), function () {
                    const e = document.createElement("div");
                    e.className = "title",
                    "stats" === Game.onMenu && Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.Stats && (e.textContent = "Cookie Monster Statistics", Zn(e))
                }
                    ())
            },
            Z.sayTime = Game.sayTime,
            Co = function (e, t) {
                return Number.isNaN(e) || e <= 0 ? Z.sayTime(e, t) : $o(e / Game.fps, 1)
            },
            Z.Logic = Game.Logic,
            Game.Logic = function () {
                Z.Logic();
                let e = "Cookie Clicker";
                "fools" === Game.season && (e = "Cookie Baker"),
                Lo = `${Game.OnAscend?"Ascending! ":""}${oe(Game.cookies)} ${1===Game.cookies?"cookie":"cookies"} - ${e}`,
                function () {
                    if (Game.OnAscend || 0 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.Title)
                        document.title = Lo;
                    else if (1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.Title) {
                        let e,
                        t,
                        o,
                        n = !1,
                        a = !1;
                        e = At ? At.wrath ? `[W${Math.ceil(At.life/Game.fps)}]` : `[G${Math.ceil(At.life/Game.fps)}]` : Game.Has("Golden switch [off]") ? "[GS]" : `[${Number(l("CMTimerBarGCMinBar").textContent)<0?"!":""}${Math.ceil((Game.shimmerTypes.golden.maxTime-Game.shimmerTypes.golden.time)/Game.fps)}]`,
                        I && (n = !0, t = "[F]"),
                        "christmas" === Game.season && (a = !0, o = R ? `[R${Math.ceil(Wt.life/Game.fps)}]` : `[${Number(l("CMTimerBarRenMinBar").textContent)<0?"!":""}${Math.ceil((Game.shimmerTypes.reindeer.maxTime-Game.shimmerTypes.reindeer.time)/Game.fps)}]`);
                        let i = Lo;
                        "[" === i.charAt(0) && (i = i.substring(i.lastIndexOf("]") + 1)),
                        document.title = `${e+(n?t:"")+(a?o:"")} ${i}`
                    } else if (2 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.Title) {
                        let e = "",
                        t = !1;
                        At && (t = !0, At.wrath ? e += `[W${Math.ceil(At.life/Game.fps)}]` : e += `[G${Math.ceil(At.life/Game.fps)}]`),
                        I && (t = !0, e += "[F]"),
                        "christmas" === Game.season && R && (e += `[R${Math.ceil(Wt.life/Game.fps)}]`, t = !0),
                        t && (e += " - ");
                        let o = "Cookie Clicker";
                        "fools" === Game.season && (o = "Cookie Baker"),
                        e += o,
                        document.title = e
                    }
                }
                (),
                function () {
                    const e = Math.max(0, Game.HowManyCookiesReset(Math.floor(Game.HowMuchPrestige(Game.cookiesReset + Game.cookiesEarned)) + 1) - (Game.cookiesEarned + Game.cookiesReset)),
                    t = Game.sayTime((Date.now() - Game.startDate) / 1e3 * Game.fps, -1);
                    let o = `You've been on this run for <b>${""===t?"not very long":t}</b>.<br>\n  <div class="line"></div>`;
                    Game.prestige > 0 && (o += `Your prestige level is currently <b>${oe(Game.prestige)}</b>.<br>(CpS +${oe(Game.prestige)}%)\n    <div class="line"></div>`),
                    o += be < 1 ? "Ascending now would grant you no prestige." : be < 2 ? "Ascending now would grant you<br><b>1 prestige level</b> (+1% CpS)<br>and <b>1 heavenly chip</b> to spend." : `Ascending now would grant you<br><b>${oe(be)} prestige levels</b> (+${oe(be)}% CpS)<br>and <b>${oe(be)} heavenly chips</b> to spend.`,
                    o += `<div class="line"></div>\n  You need <b>${oe(e)} more cookies</b> for the next level.<br>\n  ${Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TooltipAscendButton?` < div class = 'line' >  <  / div > It takes $ {
                        jt
                    }
                    to reach the next level and you were making $ {
                        oe(at, 2)
                    }
                    chips on average in the last 5 seconds. < br > `:""}`,
                    l("ascendTooltip").innerHTML = o
                }
                ()
            }
        }
        function oa() {
            const e = G("cookieMonsterMod", "Cookie Monster", "infoMenu");
            return Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers.infoMenu && (e.appendChild(b.createInfoListing('<a href="https://github.com/CookieMonsterTeam/CookieMonster" target="blank">Cookie Monster</a>\n offers a wide range of tools and statistics to enhance your game experience.\n It is not a cheat interface – although it does offer helpers for golden cookies and such, everything can be toggled off at will to only leave how much information you want.</br>\n Progess on new updates and all previous release notes can be found on the GitHub page linked above!</br>\n Please also report any bugs you may find over there!</br>\n ')), e.appendChild(b.createInfoListing('This update implements the following functions:</br>\n- This updates adds a number of performance improvements which make CookieMonster about 33% more efficient</br>\n- Added a button to all buildings in the middle section that can "lock" the building. This makes the building unclickable, which might be useful for frantic clicking during cookie storms</br>\n- Added a percentage to the Golden Cookie timer bar</br>\n</br>\nThis update fixes the following bugs:\n- Fix considerable lag on the Ascension screen when using the monospace font</br>\n- Fix sound playing at start-up</br>\n- Fix building tooltips and warnings not updating correctly</br>\n- Fix upgrade bar not displaying</br>\n- Fix loading of mod when no save was found</br>'))),
            e
        }
        const na = {
            Favourite: "Favourite Settings",
            Calculation: "Calculation",
            Notation: "Notation",
            Colours: "Colours and colour coding",
            BarsDisplay: "Infobars and visual settings",
            Tooltip: "Tooltips",
            Statistics: "Statistics",
            Notification: "Notifications",
            Miscellaneous: "Miscellaneous"
        },
        aa = {
            NotificationGeneral: "General Notifications",
            NotificationGC: "Golden Cookie",
            NotificationFC: "Fortune Cookie",
            NotificationSea: "Season Special",
            NotificationGard: "Garden Tick",
            NotificationMagi: "Full Magic Bar",
            NotificationWrink: "Wrinkler",
            NotificationWrinkMax: "Maximum Wrinklers"
        },
        ia = function (e) {
            if (1 === e) {
                const e = function () {
                    try {
                        Notification.requestPermission().then()
                    } catch (e) {
                        return !1
                    }
                    return !0
                };
                "Notification" in window ? e() ? Notification.requestPermission().then() : Notification.requestPermission() : console.log("This browser does not support notifications.")
            }
        };
        function ra() {
            BeautifyAll(),
            Game.RefreshStore(),
            Game.RebuildUpgrades(),
            Vo(),
            Ao(),
            jo()
        }
        function sa() {
            1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.BotBar ? (l("CMBotBar").style.display = "", Vo()) : l("CMBotBar").style.display = "none",
            Xo()
        }
        const la = {
            CPSMode: new S(1, "bool", "Calculation", ["Current cookies per second", "Average cookies per second"], "Calculate times using current cookies per second or average cookies per second", !1),
            AvgCPSHist: new S(3, "bool", "Calculation", ["Average CPS in past 10s", "Average CPS in past 15s", "Average CPS in past 30s", "Average CPS in past 1m", "Average CPS in past 5m", "Average CPS in past 10m", "Average CPS in past 15m", "Average CPS in past 30m"], "How much time average Cookies Per Second should consider", !1),
            AvgClicksHist: new S(0, "bool", "Calculation", ["Average clicks in past 1s", "Average clicks in past 5s", "Average clicks in past 10s", "Average clicks in past 15s", "Average clicks in past 30s"], "How much time average Cookie Clicks should consider", !1),
            CalcWrink: new F(0, "bool", "Calculation", ["Calculate with wrinklers OFF", "Calculate with wrinklers ON", "Calculate with single fattest wrinkler ON"], "Calculate times and average Cookies Per Second with (only the single non-shiny fattest) wrinklers", !0, (() => {
                    Le = !0
                })),
            Scale: new F(2, "bool", "Notation", ["Game's setting scale", "Metric", "Short scale", "Short scale (Abbreviated)", "Scientific notation", "Engineering notation"], "Change how long numbers are formatted", !1, (() => {
                    ra()
                })),
            ScaleDecimals: new F(2, "bool", "Notation", ["1 decimals", "2 decimals", "3 decimals"], 'Set the number of decimals used when applicable. This only works with Cookie Monster scales and not with "Game\'s Setting Scale"', !1, (() => {
                    ra()
                })),
            ScaleSeparator: new F(0, "bool", "Notation", [". for decimals (standard)", ". for thousands"], "Set the separator used for decimals and thousands", !1, (() => {
                    ra()
                })),
            ScaleCutoff: new T(999999, "numscale", "Notation", "Notation cut-off point: ", "The number from which Cookie Monster will start formatting numbers based on chosen scale. Standard is 999,999. Setting this above 999,999,999 might break certain notations", 1, 999999999),
            TimeFormat: new S(0, "bool", "Notation", ["Time XXd, XXh, XXm, XXs", "Time XX:XX:XX:XX:XX", "Time XXx, XXx"], "Change the time format", !1),
            DetailedTime: new F(1, "bool", "Notation", ["Detailed time OFF", "Detailed time ON"], "Change how time is displayed in certain statistics and tooltips", !0, (() => {
                    1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.DetailedTime ? Game.sayTime = Co : Game.sayTime = Z.sayTime
                })),
            PPDisplayTime: new S(0, "bool", "Notation", ["PP as value (standard)", "PP as time unit"], "Display PP as calculated value or as approximate time unit. Note that PP does not translate directly into a time unit and this is therefore only an approximation.", !1),
            BuildColour: new F(1, "bool", "Colours", ["Building colours OFF", "Building colours ON"], "Colour code buildings", !0, (() => {
                    Ao()
                })),
            PPOnlyConsiderBuyable: new S(0, "bool", "Colours", ["Don't ignore non-buyable", "Ignore non-buyable"], "Makes Cookie Monster label buildings and upgrades you can't buy right now red, useful in those situations where you just want to spend your full bank 'most optimally'", !0),
            PPExcludeTop: new S(0, "bool", "Colours", ["Don't ignore any", "Ignore 1st best", "Ignore 1st and 2nd best", "Ignore 1st, 2nd and 3rd best"], "Makes Cookie Monster ignore the 1st, 2nd or 3rd best buildings in labeling and colouring PP values", !0),
            PPRigidelMode: new S(0, "bool", "Colours", ["Rigidel mode OFF", "Rigidel mode ON"], 'Makes Cookie Monster ignore all "buy 1" options when colouring PP in order to stay at a total building count ending in 10 for pantheon god Rigidel', !0),
            PPSecondsLowerLimit: new T(0, "numscale", "Colours", "Lower limit for PP (in seconds): ", 'If a building or upgrade costs less than the specified seconds of CPS it will also be considered optimal and label it as such ("PP is less than xx seconds of CPS"); setting to 0 ignores this option', 0, 1 / 0),
            ColourBlue: new x("#4bb8f0", "colour", "Colours", "Standard colour is blue. Used to show upgrades better than best PP building, for Click Frenzy bar, and for various labels"),
            ColourGreen: new x("#00ff00", "colour", "Colours", "Standard colour is green. Used to show best PP building, for Blood Frenzy bar, and for various labels"),
            ColourYellow: new x("#ffff00", "colour", "Colours", "Standard colour is yellow. Used to show buildings within the top 10 of PP, for Frenzy bar, and for various labels"),
            ColourOrange: new x("#ff7f00", "colour", "Colours", "Standard colour is orange. Used to show buildings within the top 20 of PP, for Next Reindeer bar, and for various labels"),
            ColourRed: new x("#ff0000", "colour", "Colours", "Standard colour is Red. Used to show buildings within the top 30 of PP, for Clot bar, and for various labels"),
            ColourPurple: new x("#ff00ff", "colour", "Colours", "Standard colour is purple. Used to show buildings outside of the top 30 of PP, for Next Cookie bar, and for various labels"),
            ColourGray: new x("#b3b3b3", "colour", "Colours", "Standard colour is gray. Used to show negative or infinity PP, and for Next Cookie/Next Reindeer bar"),
            ColourPink: new x("#ff1493", "colour", "Colours", "Standard colour is pink. Used for Dragonflight bar"),
            ColourBrown: new x("#8b4513", "colour", "Colours", "Standard colour is brown. Used for Dragon Harvest bar"),
            BotBar: new F(1, "bool", "BarsDisplay", ["Bottom bar OFF", "Bottom bar ON"], "Building information", !0, (() => {
                    sa()
                })),
            TimerBar: new F(1, "bool", "BarsDisplay", ["Timer bar OFF", "Timer bar ON"], "Bar with timers for golden cookie, season popup, Frenzy (Normal, Clot, Elder), Click Frenzy", !0, (() => {
                    Qo()
                })),
            TimerBarPos: new F(0, "bool", "BarsDisplay", ["Timer bar position (top left)", "Timer bar position (bottom)"], "Placement of the timer bar", !1, (() => {
                    0 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimerBarPos ? (l("CMTimerBar").style.width = "30%", l("CMTimerBar").style.bottom = "", l("game").insertBefore(l("CMTimerBar"), l("sectionLeft"))) : (l("CMTimerBar").style.width = "100%", l("CMTimerBar").style.bottom = "0px", l("wrapper").appendChild(l("CMTimerBar"))),
                    Xo()
                })),
            TimerBarOverlay: new S(2, "bool", "BarsDisplay", ["Timer bar overlay OFF", "Timer bar overlay only seconds", "Timer bar overlay full"], "Overlay on timers displaying seconds and/or percentage left", !0),
            AutosaveTimerBar: new S(0, "bool", "BarsDisplay", ["Autosave timer bar OFF", "Autosave timer bar ON"], "Show a timer counting down till next autosave in the timer bar", !0),
            UpBarColour: new F(1, "bool", "BarsDisplay", ["Upgrade colours/bar OFF", "Upgrade colours with bar ON", "Upgrade colours without bar ON"], "Colour code upgrades and optionally add a counter bar", !1, (() => {
                    1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.UpBarColour ? (l("CMUpgradeBar").style.display = "", jo()) : 2 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.UpBarColour ? (l("CMUpgradeBar").style.display = "none", jo()) : (l("CMUpgradeBar").style.display = "none", Game.RebuildUpgrades())
                })),
            UpgradeBarFixedPos: new F(1, "bool", "BarsDisplay", ["Upgrade bar fixed position OFF", "Upgrade bar fixed position ON"], "Lock the upgrade bar at top of the screen to prevent it from moving ofscreen when scrolling", !0, (() => {
                    1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.UpgradeBarFixedPos ? (l("CMUpgradeBar").style.position = "sticky", l("CMUpgradeBar").style.top = "0px") : l("CMUpgradeBar").style.position = ""
                })),
            SortBuildings: new F(0, "bool", "BarsDisplay", ["Sort buildings: default", "Sort buildings: PP of x1 purchase", "Sort buildings: PP of selected bulk mode", "Sort buildings: price until next achievement"], "Sort the display of buildings in default order, by PP, or until next achievement", !1, (() => {
                    Ao()
                })),
            SortUpgrades: new F(0, "bool", "BarsDisplay", ["Sort upgrades: default", "Sort upgrades: PP"], "Sort the display of upgrades in either default order or by PP", !1, (() => {
                    jo()
                })),
            UpgradesNeverCollapse: new F(0, "bool", "BarsDisplay", ["Upgrades always expanded OFF", "Upgrades always expanded ON"], "Toggle to make the upgrades sections always expanded to the size needed to display all upgrades", !0, (() => {
                    Wo()
                })),
            DragonAuraInfo: new S(1, "bool", "BarsDisplay", ["Extra dragon aura info OFF", "Extra dragon aura info ON"], "Shows information about changes in CPS and costs in the dragon aura interface.", !0),
            GrimoireBar: new S(1, "bool", "BarsDisplay", ["Grimoire magic meter timer OFF", "Grimoire magic meter timer ON"], "A timer overlay showing how long till the Grimoire magic meter is full", !0),
            GCTimer: new F(1, "bool", "BarsDisplay", ["Golden cookie timer OFF", "Golden cookie timer ON"], "A timer on the golden cookie when it has been spawned", !0, (() => {
                    1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.GCTimer ? Object.keys(Do).forEach((e => {
                            Do[e].style.display = "block",
                            Do[e].style.left = Rt[e].l.style.left,
                            Do[e].style.top = Rt[e].l.style.top
                        })) : Object.keys(Do).forEach((e => Do[e].style.display = "none"))
                })),
            Favicon: new F(1, "bool", "BarsDisplay", ["Favicon OFF", "Favicon ON"], "Update favicon with golden/wrath cookie", !0, (() => {
                    In()
                })),
            WrinklerButtons: new F(1, "bool", "BarsDisplay", ["Extra wrinkler buttons OFF", "Extra wrinkler buttons ON"], "Show buttons for popping wrinklers at bottom of cookie section", !0, (() => {
                    B()
                })),
            HideSectionsButtons: new F(0, "bool", "BarsDisplay", ["Hide buildings/upgrades button OFF", "Hide buildings/upgrades button ON"], "Show buttons for hiding and showing the buildings and upgrades sections in the right column", !0, (() => {
                    Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.HideSectionsButtons ? l("CMSectionHidButtons").style.display = "" : l("CMSectionHidButtons").style.display = "none"
                })),
            TooltipBuildUpgrade: new S(1, "bool", "Tooltip", ["Building/upgrade tooltip information OFF", "Building/upgrade tooltip information ON"], "Extra information in building/upgrade tooltips", !0),
            TooltipAmor: new S(0, "bool", "Tooltip", ["Buildings tooltip amortization information OFF", "Buildings tooltip amortization information ON"], "Add amortization information to buildings tooltip", !0),
            ToolWarnLucky: new S(1, "bool", "Tooltip", ["Tooltip lucky warning OFF", "Tooltip lucky warning ON"], 'A warning when buying if it will put the bank under the amount needed for max "Lucky!" rewards', !0),
            ToolWarnLuckyFrenzy: new S(1, "bool", "Tooltip", ["Tooltip lucky frenzy warning OFF", "Tooltip lucky frenzy warning ON"], 'A warning when buying if it will put the bank under the amount needed for max "Lucky!" (Frenzy) rewards', !0),
            ToolWarnConjure: new S(1, "bool", "Tooltip", ["Tooltip conjure warning OFF", "Tooltip conjure warning ON"], 'A warning when buying if it will put the bank under the amount needed for max "Conjure Baked Goods" rewards', !0),
            ToolWarnConjureFrenzy: new S(1, "bool", "Tooltip", ["Tooltip conjure frenzy warning OFF", "Tooltip conjure frenzy warning ON"], 'A warning when buying if it will put the bank under the amount needed for max "Conjure Baked Goods" rewards with Frenzy active', !0),
            ToolWarnEdifice: new S(1, "bool", "Tooltip", ["Tooltip edifice warning OFF", "Tooltip edifice warning ON"], 'A warning when buying if it will put the bank under the amount needed for "Spontaneous Edifice" to possibly give you your most expensive building', !0),
            ToolWarnUser: new T(0, "numscale", "Tooltip", "Tooltip warning at x times CPS: ", "Use this to show a customized warning if buying it will put the bank under the amount equal to value times cps; setting to 0 disables the function altogether", 0, 1 / 0),
            ToolWarnBon: new S(1, "bool", "Tooltip", ["Calculate tooltip warning with bonus CPS OFF", "Calculate tooltip warning with bonus CPS ON"], "Calculate the warning with or without the bonus CPS you get from buying", !0),
            ToolWarnPos: new F(1, "bool", "Tooltip", ["Tooltip warning position (left)", "Tooltip warning position (bottom)"], "Placement of the warning boxes", !1, (() => {
                    kn()
                })),
            TooltipGrim: new S(1, "bool", "Tooltip", ["Grimoire tooltip information OFF", "Grimoire tooltip information ON"], "Extra information in tooltip for grimoire", !0),
            TooltipWrink: new S(1, "bool", "Tooltip", ["Wrinkler tooltip OFF", "Wrinkler tooltip ON"], "Shows the amount of cookies a wrinkler will give when popping it", !0),
            TooltipLump: new S(1, "bool", "Tooltip", ["Sugar lump tooltip OFF", "Sugar lump tooltip ON"], "Shows the current Sugar Lump type in Sugar lump tooltip.", !0),
            TooltipPlots: new S(1, "bool", "Tooltip", ["Garden plots tooltip OFF", "Garden plots tooltip ON"], "Shows a tooltip for plants that have a cookie reward.", !0),
            TooltipPantheon: new S(1, "bool", "Tooltip", ["Pantheon tooltip OFF", "Pantheon tooltip ON"], "Shows additional info in the pantheon tooltip", !0),
            TooltipAscendButton: new S(1, "bool", "Tooltip", ["Show Extra Info Ascend Tooltip OFF", "Show Extra Info Ascend Tooltip ON"], "Shows additional info in the ascend tooltip", !0),
            Stats: new S(1, "bool", "Statistics", ["Statistics OFF", "Statistics ON"], "Extra Cookie Monster statistics!", !0),
            MissingUpgrades: new S(1, "bool", "Statistics", ["Missing upgrades OFF", "Missing upgrades ON"], "Shows missing upgrades in statistics menu", !0),
            MissingAchievements: new S(0, "bool", "Statistics", ["Missing Achievements OFF", "Missing Normal Achievements ON"], "Shows missing normal achievements in statistics menu.", !0),
            UpStats: new S(1, "bool", "Statistics", ["Statistics update rate (default)", "Statistics update rate (1s)"], "Default rate is once every 5 seconds", !1),
            HeavenlyChipsTarget: new T(1, "numscale", "Statistics", "Heavenly chips target: ", 'Use this to set a heavenly chips target that will be counted towards in the "prestige" statsistics sections', 1, 1 / 0),
            ShowMissedGC: new S(1, "bool", "Statistics", ["Missed GC OFF", "Missed GC ON"], "Show a stat in the statistics screen that counts how many golden cookies you have missed", !0),
            Title: new S(1, "bool", "NotificationGeneral", ["Title OFF", "Title ON", "Title pinned tab highlight"], 'Update title with colden cookie/season popup timers; pinned tab highlight only changes the title when a golden cookie/season popup spawns; "!" means that golden cookie/reindeer can spawn', !0),
            GeneralSound: new S(1, "bool", "NotificationGeneral", ["Consider game volume setting OFF", "Consider game volume setting ON"], 'Turning this toggle to "off" makes Cookie Monster no longer consider the volume setting of the base game, allowing mod notifications to play with base game volume turned down', !0),
            GCNotification: new F(0, "bool", "NotificationGC", ["Notification OFF", "Notification ON"], "Create a notification when golden cookie spawns", !0, (() => {
                    ia(Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.GCNotification)
                })),
            GCFlash: new S(1, "bool", "NotificationGC", ["Flash OFF", "Flash ON"], "Flash screen on golden cookie", !0),
            ColourGCFlash: new x("#ffffff", "colour", "NotificationGC", "The colour of the GC flash, standard colour is white"),
            GCSound: new S(1, "bool", "NotificationGC", ["Sound OFF", "Sound ON"], "Play a sound on golden cookie", !0),
            GCVolume: new E(100, "vol", "NotificationGC", [], "Volume"),
            GCSoundURL: new S("https://freesound.org/data/previews/66/66717_931655-lq.mp3", "url", "NotificationGC", "Sound URL:", "URL of the sound to be played when a golden cookie spawns"),
            FortuneNotification: new F(0, "bool", "NotificationFC", ["Notification OFF", "Notification ON"], "Create a notification when fortune cookie is on the ticker", !0, (() => {
                    ia(Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.FortuneNotification)
                })),
            FortuneFlash: new S(1, "bool", "NotificationFC", ["Flash OFF", "Flash ON"], "Flash screen on fortune cookie spawn", !0),
            ColourFortuneFlash: new x("#ffffff", "colour", "NotificationFC", "The colour of the fortune flash, standard colour is white"),
            FortuneSound: new S(1, "bool", "NotificationFC", ["Sound OFF", "Sound ON"], "Play a sound on fortune cookie spawn", !0),
            FortuneVolume: new E(100, "vol", "NotificationFC", [], "Volume"),
            FortuneSoundURL: new S("https://freesound.org/data/previews/174/174027_3242494-lq.mp3", "url", "NotificationFC", "Sound URL:", "URL of the sound to be played when the ticker has a fortune cookie"),
            SeaNotification: new F(0, "bool", "NotificationSea", ["Notification OFF", "Notification ON"], "Create a notification on season popup", !0, (() => {
                    ia(Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.SeaNotification)
                })),
            SeaFlash: new S(1, "bool", "NotificationSea", ["Flash OFF", "Flash ON"], "Flash screen on season popup", !0),
            ColourSeaFlash: new x("#ffffff", "colour", "NotificationSea", "The colour of the season popup flash, standard colour is white"),
            SeaSound: new S(1, "bool", "NotificationSea", ["Sound OFF", "Sound ON"], "Play a sound on season popup", !0),
            SeaVolume: new E(100, "vol", "NotificationSea", [], "Volume"),
            SeaSoundURL: new S("https://www.freesound.org/data/previews/121/121099_2193266-lq.mp3", "url", "NotificationSea", "Sound URL:", "URL of the sound to be played when on season popup spawns"),
            GardFlash: new S(1, "bool", "NotificationGard", ["Garden Tick Flash OFF", "Flash ON"], "Flash screen on garden tick", !0),
            ColourGardFlash: new x("#ffffff", "colour", "NotificationGard", "The colour of the garden flash, standard colour is white"),
            GardSound: new S(1, "bool", "NotificationGard", ["Sound OFF", "Sound ON"], "Play a sound on garden tick", !0),
            GardVolume: new E(100, "vol", "NotificationGard", [], "Volume"),
            GardSoundURL: new S("https://freesound.org/data/previews/103/103046_861714-lq.mp3", "url", "NotificationGard", "Garden Tick Sound URL:", "URL of the sound to be played when the garden ticks"),
            MagicNotification: new F(0, "bool", "NotificationMagi", ["Notification OFF", "Notification ON"], "Create a notification when magic reaches maximum", !0, (() => {
                    ia(Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.MagicNotification)
                })),
            MagicFlash: new S(1, "bool", "NotificationMagi", ["Flash OFF", "Flash ON"], "Flash screen when magic reaches maximum", !0),
            ColourMagicFlash: new x("#ffffff", "colour", "NotificationMagi", "The colour of the magic flash, standard colour is white"),
            MagicSound: new S(1, "bool", "NotificationMagi", ["Sound OFF", "Sound ON"], "Play a sound when magic reaches maximum", !0),
            MagicVolume: new E(100, "vol", "NotificationMagi", [], "Volume"),
            MagicSoundURL: new S("https://freesound.org/data/previews/221/221683_1015240-lq.mp3", "url", "NotificationMagi", "Sound URL:", "URL of the sound to be played when magic reaches maxium"),
            WrinklerNotification: new F(0, "bool", "NotificationWrink", ["Notification OFF", "Notification ON"], "Create a notification when a wrinkler appears", !0, (() => {
                    ia(Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.WrinklerNotification)
                })),
            WrinklerFlash: new S(1, "bool", "NotificationWrink", ["Flash OFF", "Flash ON"], "Flash screen when a wrinkler appears", !0),
            ColourWrinklerFlash: new x("#ffffff", "colour", "NotificationWrink", "The colour of the wrinkler flash, standard colour is white"),
            WrinklerSound: new S(1, "bool", "NotificationWrink", ["Sound OFF", "Sound ON"], "Play a sound when a wrinkler appears", !0),
            WrinklerVolume: new E(100, "vol", "NotificationWrink", [], "Volume"),
            WrinklerSoundURL: new S("https://freesound.org/data/previews/124/124186_8043-lq.mp3", "url", "NotificationWrink", "Sound URL:", "URL of the sound to be played when a wrinkler appears"),
            WrinklerMaxNotification: new F(0, "bool", "NotificationWrinkMax", ["Notification OFF", "Notification ON"], "Create a notification when the maximum amount of wrinklers has appeared", !0, (() => {
                    ia(Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.WrinklerMaxNotification)
                })),
            WrinklerMaxFlash: new S(1, "bool", "NotificationWrinkMax", ["Flash OFF", "Flash ON"], "Flash screen when the maximum amount of Wrinklers has appeared", !0),
            ColourWrinklerMaxFlash: new x("#ffffff", "colour", "NotificationWrinkMax", "The colour of the maximum wrinkler flash, standard colour is white"),
            WrinklerMaxSound: new S(1, "bool", "NotificationWrinkMax", ["Sound OFF", "Sound ON"], "Play a sound when the maximum amount of wrinklers has appeared", !0),
            WrinklerMaxVolume: new E(100, "vol", "NotificationWrinkMax", [], "Volume"),
            WrinklerMaxSoundURL: new S("https://freesound.org/data/previews/152/152743_15663-lq.mp3", "url", "NotificationWrinkMax", "Sound URL:", "URL of the sound to be played when the maximum amount of wrinklers has appeared"),
            BulkBuyBlock: new S(1, "bool", "Miscellaneous", ["Block bulk buying OFF", "Block bulk buying ON"], "Block clicking bulk buying when you can't buy all. This prevents buying 7 of a building when you are in buy-10 or buy-100 mode.", !0),
            FavouriteSettings: new F(1, "bool", "Miscellaneous", ["Favourite settings section OFF", "Favourite settings section ON", "Favourite settings section ON (Locked)"], "Show stars before each setting which allows selecting it for a 'favourites' section at the top of the Cookie Monster settings. Setting this to Locked removes the stars but shows the 'favourites' section", !0, (() => {
                    Game.UpdateMenu()
                }))
        };
        function ca() {
            let e = "";
            for (let t = 0; t < uo.length; t++)
                e += `.CMText${uo[t]} { color: ${Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings[` Colour$ {
                    uo[t]
                }
`]}; }\n`;
            for (let t = 0; t < uo.length; t++)
                e += `.CMBack${uo[t]} { background-color: ${Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings[` Colour$ {
                    uo[t]
                }
`]}; }\n`;
            for (let t = 0; t < uo.length; t++)
                e += `.CMBorder${uo[t]} { border: 1px solid ${Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings[` Colour$ {
                    uo[t]
                }
`]}; }\n`;
            l("CMCSS").textContent = e,
            Ao()
        }
        function da() {
            const e = G("cookieMonsterMod", "Cookie Monster", "optionsMenu");
            return Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers.optionsMenu && Object.keys(na).forEach((t => {
                    if ("Favourite" === t) {
                        if (0 !== Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.favouriteSettings.length && Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.FavouriteSettings > 0 && (e.appendChild(b.createOptionsSubHeader("cookieMonsterMod", t, na[t])), Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers[t]))
                            for (let t = 0; t < Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.favouriteSettings.length; t++)
                                e.appendChild(b.createOptionsListing("cookieMonsterMod", Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.favouriteSettings[t], la, ca, ra))
                    } else
                        e.appendChild(b.createOptionsSubHeader("cookieMonsterMod", t, na[t])),
                        Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers[t] && ("Notification" === t ? Object.keys(aa).forEach((t => {
                                    const o = b.createOptionsSubHeader("cookieMonsterMod", t, aa[t]);
                                    o.style.fontSize = "15px",
                                    o.style.opacity = "0.5",
                                    e.appendChild(o),
                                    Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers[t] && Object.keys(la).forEach((o => {
                                            la[o].group === t && e.appendChild(b.createOptionsListing("cookieMonsterMod", o, la, ca, ra))
                                        }))
                                })) : Object.keys(la).forEach((o => {
                                    la[o].group === t && e.appendChild(b.createOptionsListing("cookieMonsterMod", o, la, ca, ra))
                                })))
                })),
            e
        }
        function ma() {
            window.CookieMonsterData = {},
            Game.mods.cookieMonsterFramework.listeners.infoMenu.push(oa),
            Game.mods.cookieMonsterFramework.listeners.optionsMenu.push(da),
            zn(),
            An(),
            Hn(),
            D = Object.keys(Game.mods).length,
            $e = document.createElement("style"),
            $e.type = "text/css",
            $e.id = "CMCSS",
            document.head.appendChild($e),
            function () {
                const e = document.createElement("div");
                e.id = "CMBotBar",
                e.style.height = "69px",
                e.style.width = "100%",
                e.style.position = "absolute",
                e.style.display = "none",
                e.style.backgroundColor = "#262224",
                e.style.backgroundImage = "linear-gradient(to bottom, #4d4548, #000000)",
                e.style.borderTop = "1px solid black",
                e.style.overflow = "auto",
                e.style.textShadow = "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
                const t = e.appendChild(document.createElement("table"));
                t.style.width = "100%",
                t.style.textAlign = "center",
                t.style.whiteSpace = "nowrap";
                const o = t.appendChild(document.createElement("tbody")),
                n = function (e, t) {
                    const o = document.createElement("td");
                    return o.style.textAlign = "right",
                    o.className = to + t,
                    o.textContent = e,
                    o
                },
                a = o.appendChild(document.createElement("tr"));
                a.style.fontWeight = "bold",
                a.appendChild(n("CM 2.031.10", io)),
                o.appendChild(document.createElement("tr")).appendChild(n("Bonus Income", no)),
                o.appendChild(document.createElement("tr")).appendChild(n("Payback Period", no)),
                o.appendChild(document.createElement("tr")).appendChild(n("Time Left", no)),
                l("wrapper").appendChild(e),
                Object.keys(Game.Objects).forEach((e => {
                        zo(e)
                    }))
            }
            (),
            function () {
                const e = document.createElement("div");
                e.id = "CMTimerBar",
                e.style.position = "absolute",
                e.style.display = "none",
                e.style.height = "0px",
                e.style.fontSize = "10px",
                e.style.fontWeight = "bold",
                e.style.backgroundColor = "black";
                const t = Io("CMTimerBarAutosave", "Autosave", [{
                                id: "CMTimerBarAutosaveBar",
                                colour: lo
                            }
                        ]);
                e.appendChild(t);
                const o = Io("CMTimerBarGC", "Next Cookie", [{
                                id: "CMTimerBarGCMinBar",
                                colour: co
                            }, {
                                id: "CMTimerBarGCBar",
                                colour: lo
                            }
                        ]);
                e.appendChild(o);
                const n = Io("CMTimerBarRen", "Next Reindeer", [{
                                id: "CMTimerBarRenMinBar",
                                colour: co
                            }, {
                                id: "CMTimerBarRenBar",
                                colour: ro
                            }
                        ]);
                e.appendChild(n);
                const a = document.createElement("div");
                a.id = "CMTimerBarBuffTimers",
                e.appendChild(a),
                l("wrapper").appendChild(e)
            }
            (),
            function () {
                const e = document.createElement("div");
                e.id = "CMUpgradeBar",
                e.style.width = "100%",
                e.style.backgroundColor = "black",
                e.style.textAlign = "center",
                e.style.fontWeight = "bold",
                e.style.display = "none",
                e.style.zIndex = "21",
                e.onmouseout = function () {
                    Game.tooltip.hide()
                };
                const t = document.createElement("div");
                t.appendChild(function () {
                    const e = document.createElement("div");
                    e.style.minWidth = "330px",
                    e.style.marginBottom = "4px";
                    const t = document.createElement("div");
                    t.className = "name",
                    t.style.marginBottom = "4px",
                    t.textContent = "Legend",
                    e.appendChild(t);
                    const o = function (e, t) {
                        const o = document.createElement("div");
                        o.style.verticalAlign = "middle";
                        const n = document.createElement("span");
                        return n.className = oo + e,
                        n.style.display = "inline-block",
                        n.style.height = "10px",
                        n.style.width = "10px",
                        n.style.marginRight = "4px",
                        o.appendChild(n),
                        o.appendChild(document.createTextNode(t)),
                        o
                    };
                    return e.appendChild(o(no, "Better than the best PP of a building option")),
                    e.appendChild(o(ao, "Same as the best PP building option")),
                    e.appendChild(o(io, "Within the top 10 of PP for buildings")),
                    e.appendChild(o(ro, "Within the top 20 of PP for buildings")),
                    e.appendChild(o(so, "Within the top 30 of PP for buildings")),
                    e.appendChild(o(lo, "Outside of the top 30 of PP for buildings")),
                    e.appendChild(o(co, "Negative or infinity PP")),
                    e
                }
                    ()),
                e.onmouseover = function () {
                    Game.tooltip.draw(this, escape(t.innerHTML), "store")
                };
                const o = function (e, t) {
                    const o = document.createElement("span");
                    return o.id = e,
                    o.className = to + t,
                    o.style.width = "14.28571428571429%",
                    o.style.display = "inline-block",
                    o.textContent = "0",
                    o
                };
                e.appendChild(o("CMUpgradeBarBlue", no)),
                e.appendChild(o("CMUpgradeBarGreen", ao)),
                e.appendChild(o("CMUpgradeBarYellow", io)),
                e.appendChild(o("CMUpgradeBarOrange", ro)),
                e.appendChild(o("CMUpgradeBarRed", so)),
                e.appendChild(o("CMUpgradeBarPurple", lo)),
                e.appendChild(o("CMUpgradeBarGray", co)),
                l("upgrades").parentNode.insertBefore(e, l("upgrades").parentNode.childNodes[3])
            }
            (),
            function () {
                const e = document.createElement("div");
                e.id = "CMSectionHidButtons",
                e.style.textAlign = "center";
                const t = document.createElement("a");
                t.className = "option",
                t.onclick = function () {
                    "flex" === l("upgrades").style.display ? (l("upgrades").style.display = "none", l("toggleUpgrades").style.display = "none", l("techUpgrades").style.display = "none", l("vaultUpgrades").style.display = "none") : (l("upgrades").style.display = "flex", 0 !== l("toggleUpgrades").children.length && (l("toggleUpgrades").style.display = "block"), 0 !== l("techUpgrades").children.length && (l("techUpgrades").style.display = "block"), 0 !== l("vaultUpgrades").children.length && (l("vaultUpgrades").style.display = "block"))
                },
                t.textContent = "Hide/Show Upgrades",
                e.appendChild(t);
                const o = document.createElement("a");
                o.className = "option",
                o.onclick = function () {
                    "grid" === l("products").style.display ? l("products").style.display = "none" : l("products").style.display = "grid"
                },
                o.textContent = "Hide/Show Buildings",
                e.appendChild(o),
                l("store").insertBefore(e, l("store").childNodes[2])
            }
            (),
            function () {
                const e = document.createElement("link");
                e.id = "CMFavicon",
                e.rel = "shortcut icon",
                e.href = "https://orteil.dashnet.org/cookieclicker/favicon.ico",
                document.getElementsByTagName("head")[0].appendChild(e)
            }
            (),
            Object.keys(ho).forEach((e => {
                    !function (e, t, o) {
                        const n = document.createElement("div");
                        n.id = e;
                        const a = document.createElement("div");
                        a.style.minWidth = o,
                        a.style.marginBottom = "4px";
                        const i = document.createElement("div");
                        i.style.textAlign = "left",
                        i.textContent = t,
                        a.appendChild(i),
                        n.appendChild(a),
                        go[e] = n
                    }
                    (ho[e][0], ho[e][1], ho[e][2])
                })),
            function () {
                const e = document.createElement("a");
                e.id = "PopAllNormalWrinklerButton",
                e.textContent = "Pop All Normal",
                e.className = "option",
                e.onclick = function () {
                    Un()
                },
                e.onmouseout = function () {
                    Game.tooltip.shouldHide = 1
                },
                e.onmouseover = function () {
                    Game.tooltip.dynamic = 1,
                    Game.tooltip.draw(this, (() => Rn("wb", "PopAllNormal")), "this"),
                    Game.tooltip.wobble()
                },
                l("sectionLeftExtra").children[0].append(e);
                const t = document.createElement("a");
                t.id = "PopFattestWrinklerButton",
                t.textContent = "Pop Single Fattest",
                t.className = "option",
                t.onclick = function () {
                    null !== ht[1] && (Game.wrinklers[ht[1]].hp = 0)
                },
                t.onmouseout = function () {
                    Game.tooltip.shouldHide = 1
                },
                t.onmouseover = function () {
                    Game.tooltip.dynamic = 1,
                    Game.tooltip.draw(this, (() => Rn("wb", "PopFattest")), "this"),
                    Game.tooltip.wobble()
                },
                l("sectionLeftExtra").children[0].append(t)
            }
            (),
            l("products").style.display = "grid",
            l("storeBulk").style.gridRow = "1/1",
            l("upgrades").style.display = "flex",
            l("upgrades").style["flex-wrap"] = "wrap",
            Object.keys(l("rows").children).forEach((e => {
                    const t = l("rows").children[e].children[1],
                    o = document.createElement("div");
                    o.id = `productLock${Number(e)+1}`,
                    o.className = "productButton",
                    o.innerHTML = "Lock",
                    o.onclick = function () {
                        !function (e) {
                            "Lock" === l(`productLock${e}`).innerHTML ? (Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.lockedMinigames.push(e.toString()), l(`row${e}`).style.pointerEvents = "none", l(`row${e}`).style.opacity = "0.4", l(`productLock${e}`).innerHTML = "Unlock", l(`productLock${e}`).style.pointerEvents = "auto") : (Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.lockedMinigames.includes(e.toString()) && (Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.lockedMinigames = Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.lockedMinigames.filter((t => t !== e.toString()))), l(`productLock${e}`).innerHTML = "Lock", l(`row${e}`).style.pointerEvents = "auto", l(`row${e}`).style.opacity = "1")
                        }
                        (Number(e) + 1)
                    },
                    t.appendChild(o)
                })),
            Object.keys(Game.Objects).forEach((e => {
                    const t = Game.Objects[e];
                    null !== l(`product${t.id}`).onmouseover && (Y[e] = l(`product${t.id}`).onmouseover, l(`product${t.id}`).onmouseover = function () {
                        Game.tooltip.dynamic = 1,
                        Game.tooltip.draw(this, (() => Rn("b", `${e}`)), "store"),
                        Game.tooltip.wobble()
                    })
                })),
            Game.canLumps() && (L = l("lumps").onmouseover, l("lumps").onmouseover = function () {
                Game.tooltip.dynamic = 1,
                Game.tooltip.draw(this, (() => Rn("s", "Lump")), "this"),
                Game.tooltip.wobble()
            }),
            U = Game.LoadMinigames,
            Game.LoadMinigames = function () {
                U(),
                Game.Objects.Farm.minigameLoaded && (l("gardenTool-1").onmouseover = function () {
                    Game.tooltip.dynamic = 1,
                    Game.tooltip.draw(this, (() => Rn("ha", "HarvestAllButton")), "this"),
                    Game.tooltip.wobble()
                }, Array.from(l("gardenPlot").children).forEach((e => {
                            const t = e.id.slice(-3);
                            e.onmouseover = function () {
                                Game.tooltip.dynamic = 1,
                                Game.tooltip.draw(this, (() => Rn("p", [`${t[0]}`, `${t[2]}`])), "this"),
                                Game.tooltip.wobble()
                            }
                        }))),
                Vn(),
                function () {
                    if (Game.Objects.Temple.minigameLoaded) {
                        for (let e = 0; e < 11; e += 1)
                            l(`templeGod${e}`).onmouseover = function () {
                                Game.tooltip.dynamic = 1,
                                Game.tooltip.draw(this, (() => Rn("pag", e)), "this"),
                                Game.tooltip.wobble()
                            };
                        for (let e = 0; e < 3; e += 1)
                            l(`templeSlot${e}`).onmouseover = function () {
                                Game.tooltip.dynamic = 1,
                                Game.tooltip.draw(this, (() => Rn("pas", [e, Game.Objects.Temple.minigame.slot[e]])), "this"),
                                Game.tooltip.wobble()
                            }
                    }
                }
                (),
                Xn()
            },
            Game.LoadMinigames(),
            l("backgroundLeftCanvas").onmouseover = function () {
                ko = 1
            },
            l("backgroundLeftCanvas").onmouseout = function () {
                ko = 0,
                Game.tooltip.hide(),
                Object.keys(Game.wrinklers).forEach((e => {
                        yo[e] = 0
                    }))
            },
            ta(),
            Xn(),
            Game.CalculateGains(),
            fo = Game.OnAscend,
            Game.prefs.popups ? Game.Popup("Cookie Monster version 2.031.10 loaded!") : Game.Notify("Cookie Monster version 2.031.10 loaded!", "", "", 0, 1),
            Game.Win("Third-party")
        }
        function pa(e, t) {
            if (!Game.Objects.Temple.minigameLoaded)
                return 0;
            en();
            const {
                minigame: o
            } = Game.Objects.Temple,
            n = o.godsById[e].slot;
            "0" === n ? Ne = o.slot[t] : "1" === n ? Oe = o.slot[t] : "2" === n && (De = o.slot[t]),
            0 === t ? Ne = e : 1 === t ? Oe = e : 2 === t && (De = e);
            const a = Se;
            return sn(),
            hn(),
            a !== Se && sn(),
            We - Game.cookiesPs
        }
        function ua() {
            if (No !== Game.OnAscend && (No = Game.OnAscend, Game.OnAscend ? (l("game").style.bottom = "0px", 1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.BotBar && (l("CMBotBar").style.display = "none"), 1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimerBar && (l("CMTimerBar").style.display = "none")) : (sa(), Qo()), _o()), !Game.OnAscend && 0 === Game.AscendTimer) {
                D !== Object.keys(Game.mods).length && (zn(), Hn(), D = Object.keys(Game.mods).length),
                Le && (jn(!0), Bn(), Game.Has("Golden switch [off]") ? (en(), _t["Golden switch [off]"].bought = 0, sn(), et = We) : et = Game.cookiesPs, Wn(), An(), Dn(), Nn(), Qn(), function () {
                    for (let e = 0; e < 11; e += 1)
                        for (let t = 0; t < 3; t += 1)
                            zt[e][t] = pa(e, t)
                }
                    (), Ln(), function () {
                    let e = 0;
                    if (Game.Objects.Bank.minigameLoaded) {
                        const t = Game.Objects.Bank.minigame.goods;
                        let o = 0;
                        Object.keys(t).forEach((e => {
                                const n = t[e];
                                o += n.stock * n.val
                            })),
                        e += o * Game.cookiesPsRawHighest
                    }
                    e += function () {
                        let e = 0;
                        en();
                        let t = 2;
                        5 !== Be && 18 !== Be || (t -= 1),
                        5 !== Pe && 18 !== Pe || (t -= 1),
                        Be = 5,
                        Pe = 18;
                        for (let e = 0; e < t; ++e) {
                            let e = "Cursor";
                            Object.keys(Vt).forEach((t => {
                                    Vt[t].amount > 0 && (e = t)
                                })),
                            Vt[e].amount -= 1,
                            we -= 1
                        }
                        return Object.keys(Vt).forEach((t => {
                                const o = Vt[t];
                                e += eo(Game.Objects[o.name], Game.Objects[t].basePrice, o.amount, Game.Objects[t].free, o.amount)
                            })),
                        e
                    }
                    (),
                    It = e
                }
                    (), Le = 0);
                const e = Game.auraMult("Fierce Hoarder") > 0;
                !ve && e ? (ve = !0, Ge = 1) : ve && !e && (ve = !1, Ge = 1),
                Ge && (En(), Ge = 0),
                function () {
                    $n(),
                    Tn(),
                    jn(!1),
                    function () {
                        gt = 0;
                        let e = 0;
                        Object.keys(Game.wrinklers).forEach((t => {
                                2 === Game.wrinklers[t].phase && (e += 1)
                            }));
                        let t = 1;
                        if (Vt.Temple.minigameLoaded) {
                            const e = Game.hasGod("scorn");
                            1 === e ? t *= 1.15 : 2 === e ? t *= 1.1 : 3 === e && (t *= 1.05)
                        }
                        ft = e,
                        gt = e * (.05 * e * 1.1) * (.05 * Game.Has("Sacrilegious corruption") + 1) * (.05 * Game.Has("Wrinklerspawn") + 1) * t
                    }
                    (),
                    Gn(),
                    On();
                    const e = Game.HowManyCookiesReset(Math.floor(Game.HowMuchPrestige(Game.cookiesReset + Game.cookiesEarned)) + 1) - (Game.cookiesEarned + Game.cookiesReset);
                    jt = $o(e / Uo())
                }
                (),
                I !== (Game.TickerEffect && "fortune" === Game.TickerEffect.type) && (I = Game.TickerEffect && "fortune" === Game.TickerEffect.type, I && (v.createFlash("cookieMonsterMod", 3, "FortuneFlash", !1), v.playCMSound("cookieMonsterMod", Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.FortuneSoundURL, "FortuneSound", "FortuneVolume", !1), v.createNotification("cookieMonsterMod", "FortuneNotification", "Fortune Cookie found", "A Fortune Cookie has appeared on the Ticker."))),
                R !== Game.shimmerTypes.reindeer.spawned && (R = Game.shimmerTypes.reindeer.spawned, Object.keys(Game.shimmers).forEach((e => {
                            Game.shimmers[e].spawnLead && "reindeer" === Game.shimmers[e].type && (Wt = Game.shimmers[e])
                        })), v.createFlash("cookieMonsterMod", 3, "SeaFlash", !1), v.playCMSound("cookieMonsterMod", Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.SeaSoundURL, "SeaSound", "SeaVolume", !1), v.createNotification("cookieMonsterMod", "SeaNotification", "Reindeer sighted!", "A Reindeer has spawned. Click it now!")),
                Game.Objects.Farm.minigameLoaded && z !== Game.Objects.Farm.minigame.nextStep && (0 !== z && z < Date.now() && (v.createFlash("cookieMonsterMod", 3, "GardFlash", !1), v.playCMSound("cookieMonsterMod", Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.GardSoundURL, "GardSound", "GardVolume", !1)), z = Game.Objects.Farm.minigame.nextStep),
                function () {
                    if (Game.Objects["Wizard tower"].minigameLoaded && 1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.GrimoireBar) {
                        const {
                            minigame: e
                        } = Game.Objects["Wizard tower"];
                        e.magic < e.magicM ? X = !1 : X || (X = !0, v.createFlash("cookieMonsterMod", 3, "MagicFlash", !1), v.playCMSound("cookieMonsterMod", Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.MagicSoundURL, "MagicSound", "MagicVolume", !1), v.createNotification("cookieMonsterMod", "MagicNotification", "Magic Meter full", "Your Magic Meter is full. Cast a spell!"))
                    }
                }
                (),
                function () {
                    if (Game.elderWrath > 0) {
                        let e = 0;
                        Object.keys(Game.wrinklers).forEach((t => {
                                2 === Game.wrinklers[t].phase && (e += 1)
                            })),
                        e > q ? (q = e, e === Game.getWrinklersMax() && Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.WrinklerMaxFlash ? v.createFlash("cookieMonsterMod", 3, "WrinklerMaxFlash", !1) : v.createFlash("cookieMonsterMod", 3, "WrinklerFlash", !1), e === Game.getWrinklersMax() && Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.WrinklerMaxSound ? v.playCMSound("cookieMonsterMod", Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.WrinklerMaxSoundURL, "WrinklerMaxSound", "WrinklerMaxVolume", !1) : v.playCMSound("cookieMonsterMod", Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.WrinklerSoundURL, "WrinklerSound", "WrinklerVolume", !1), e === Game.getWrinklersMax() && Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.WrinklerMaxNotification ? v.createNotification("cookieMonsterMod", "WrinklerMaxNotification", "Maximum Wrinklers Reached", "You have reached your maximum ammount of wrinklers") : v.createNotification("cookieMonsterMod", "WrinklerNotification", "A Wrinkler appeared", "A new wrinkler has appeared")) : q = e
                    }
                }
                ()
            }
            Q = 0,
            Rt = {},
            Object.keys(Game.shimmers).forEach((e => {
                    Rt[Game.shimmers[e].id] = Game.shimmers[e],
                    Game.shimmers[e].spawnLead && "golden" === Game.shimmers[e].type && (At = Game.shimmers[e], Q += 1)
                })),
            Object.keys(Do).forEach((e => {
                    void 0 === Rt[e] && (Do[e].parentNode.removeChild(Do[e]), delete Do[e])
                })),
            V !== Game.shimmerTypes.golden.n ? (V = Game.shimmerTypes.golden.n, V && (_ < Q && (v.createFlash("cookieMonsterMod", 3, "GCFlash", !1), v.playCMSound("cookieMonsterMod", Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.GCSoundURL, "GCSound", "GCVolume", !1), v.createNotification("cookieMonsterMod", "GCNotification", "Golden Cookie Spawned", "A Golden Cookie has spawned. Click it now!")), Object.keys(Game.shimmers).forEach((e => {
                            void 0 === Do[Game.shimmers[e].id] && function (e) {
                                const t = document.createElement("div");
                                t.id = `GCTimer${e.id}`,
                                t.style.width = "96px",
                                t.style.height = "96px",
                                t.style.position = "absolute",
                                t.style.zIndex = "10000000001",
                                t.style.textAlign = "center",
                                t.style.lineHeight = "96px",
                                t.style.fontFamily = '"Kavoon", Georgia, serif',
                                t.style.fontSize = "35px",
                                t.style.cursor = "pointer",
                                t.style.display = "block",
                                t.style.pointerEvents = "none",
                                0 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.GCTimer && (t.style.display = "none"),
                                t.style.left = e.l.style.left,
                                t.style.top = e.l.style.top,
                                t.onclick = function () {
                                    e.pop()
                                },
                                t.onmouseover = function () {
                                    e.l.style.filter = "brightness(125%) drop-shadow(0px 0px 3px rgba(255,255,255,1))",
                                    e.l.style.webkitFilter = "brightness(125%) drop-shadow(0px 0px 3px rgba(255,255,255,1))"
                                },
                                t.onmouseout = function () {
                                    e.l.style.filter = "",
                                    e.l.style.webkitFilter = ""
                                },
                                Do[e.id] = t,
                                l("shimmers").appendChild(t)
                            }
                            (Game.shimmers[e])
                        }))), In(), _ = Q, 0 === Q && (At = 0)) : 1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.GCTimer && V && Object.keys(Do).forEach((e => {
                    Do[e].style.opacity = Rt[e].l.style.opacity,
                    Do[e].style.transform = Rt[e].l.style.transform,
                    Do[e].textContent = Math.ceil(Rt[e].life / Game.fps)
                }))
        }
        const ha = {
            Favourite: 1,
            Calculation: 1,
            Notation: 1,
            Colours: 1,
            BarsDisplay: 1,
            Tooltip: 1,
            Statistics: 1,
            Notification: 1,
            NotificationGeneral: 1,
            NotificationGC: 1,
            NotificationFC: 1,
            NotificationSea: 1,
            NotificationGard: 1,
            NotificationMagi: 1,
            NotificationWrink: 1,
            NotificationWrinkMax: 1,
            Miscellaneous: 1,
            Lucky: 1,
            Chain: 1,
            Spells: 1,
            Garden: 1,
            Prestige: 1,
            Wrink: 1,
            Sea: 1,
            Achievs: 1,
            Misc: 1,
            infoMenu: 1,
            optionsMenu: 1
        };
        function ga(e) {
            zn(),
            w.loadMod("cookieMonsterMod", e, la, ha, ua),
            void 0 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.lockedMinigames && (Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.lockedMinigames = []),
            ca();
            for (let e = 0; e < Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.lockedMinigames.length; e++) {
                const t = Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.lockedMinigames[e];
                l(`row${t}`).style.pointerEvents = "none",
                l(`row${t}`).style.opacity = "0.4",
                l(`productLock${t}`).innerHTML = "Unlock",
                l(`productLock${t}`).style.pointerEvents = "auto"
            }
            void 0 !== Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.version && "2.031.10" !== Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.version && (Game.prefs.popups ? Game.Popup("A new version of Cookie Monster has been loaded, check out the release notes in the info tab!") : Game.Notify("A new version of Cookie Monster has been loaded, check out the release notes in the info tab!", "", "", 0, 1))
        }
        const fa = {
            init: function () {
                let e = !0;
                y(),
                window.cookieMonsterFrameworkData.isInitializing = !0,
                C("cookieMonsterMod"),
                Game.version !== Number("2.031") && (e = confirm("Cookie Monster version 2.031.10 is meant for Game version 2.031. Loading a different version may cause errors. Do you still want to load Cookie Monster?")),
                e && (ma(), Game.registerHook("click", Cn), Game.registerHook("draw", yn), Game.registerHook("logic", ua), void 0 === Game.modSaveData.cookieMonsterMod && ga("{}"))
            },
            load: ga,
            save: function () {
                const e = Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod;
                return e.version = "2.031.10",
                JSON.stringify(e)
            }
        };
        "undefined" != typeof Steam ? setTimeout((function () {
                Game.registerMod("CookieMonster", fa),
                window.cookieMonsterFrameworkData.isInitializing = !1
            }), 2e3) : (Game.registerMod("CookieMonster", fa), window.cookieMonsterFrameworkData.isInitializing = !1)
    })()
})();
//# sourceMappingURL=https://cookiemonsterteam.github.io/CookieMonster/dist/CookieMonster.js.map

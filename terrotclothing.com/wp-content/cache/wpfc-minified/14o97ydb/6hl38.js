"use strict";
jQuery(document).ready(function(t) {
    function n() {
        t(".wmd-enq-btn").each(function() {
            var n = t(this),
                o = n.data("popup_id"),
                e = n.data("product_props");
            n.on("click", function(n) {
                var i, d, f;
                if (n.preventDefault(), o) {
                    if (d = t("#popup_overlay_" + (i = o)), (f = t("#popup_" + i)).fadeIn(500, function() {
                            f.show()
                        }), d.fadeIn(500, function() {
                            d.show()
                        }), e) a(e, t("#popup_" + o + " .wmodes-pp-form"))
                }
            })
        }), t(".wmodes-popup").each(function() {
            var n = t(this),
                a = n.data("popup_id");
            a && (n.find(".wmodes-pp-close").on("click", function(t) {
                t.preventDefault(), o(a)
            }), t("#popup_overlay_" + a).on("click", function() {
                o(a)
            }), n.find(".wmodes-pp-body").css("margin-top", n.find(".wmodes-pp-header").outerHeight() + "px"))
        })
    }

    function o(n) {
        var o = t("#popup_overlay_" + n),
            a = t("#popup_" + n);
        a.fadeOut(500, function() {
            a.hide()
        }), o.fadeOut(500, function() {
            o.hide()
        })
    }

    function a(t, n) {
        for (var o = 0; o < t.length; o++) {
            var a = t[o];
            e(n, a.field_value, a.field_id, a.field_name)
        }
    }

    function e(t, n, o, a) {
        var e = "";
        "" != o && (e = "#" + o), "" != a && (e = e + '[name="' + a + '"]');
        var i = t.find(e);
        i.length > 0 && i.val(n)
    }

    function i(t) {
        return t.data("wmodes_sales_bar")
    }

    function d(t, n, o) {
        var a = RegExp("{{" + t + "}}", "g");
        return o.replace(a, n)
    }
    t(".wmodes-timer").each(function() {
            var n = t(this),
                o = n.attr("data-wmodes_datetime"),
                a = n.attr("data-wmodes_refresh"),
                e = n.attr("data-wmodes_url");
            n.countdown(o).on("update.countdown", function(t) {
                n.find(".wmd-tm-days").html(t.strftime("%D")), n.find(".wmd-tm-hours").html(t.strftime("%H")), n.find(".wmd-tm-minutes").html(t.strftime("%M")), n.find(".wmd-tm-seconds").html(t.strftime("%S"))
            }).on("finish.countdown", function(t) {
                "yes" === a && ("" !== e ? location.href = e : location.reload())
            })
        }), n(), t(".wmodes-form").each(function() {
            var n = t(this),
                o = n.data("product_props");
            o && a(o, n)
        }),
        function n() {
            if (wmodes.total_sold.enable) {
                var o, a, e = t(".wmodes-sales-total"),
                    f = (o = e, a = [], o.each(function() {
                        var n = t(this);
                        a.push(i(n))
                    }), a);
                setInterval(function() {
                    (function n(o, a) {
                        for (var e = [], f = 0, u = a.length; f < u; f++) e.push(a[f].product_id);
                        (function t(n, o, a) {
                            jQuery.post(wmodes.ajaxurl, n, function(t, n, a) {
                                o(t, n, a)
                            }).fail(function() {
                                a && a()
                            })
                        })({
                            product_ids: e,
                            action: wmodes.total_sold.action
                        }, function(n, a, e) {
                            (function n(o, a) {
                                o.each(function() {
                                    (function n(o, a) {
                                        var e = i(o);
                                        t(a).each(function() {
                                            if (e.product_id == this.id) {
                                                var t = this.sales - e.sold_qty,
                                                    n = e.max_qty;
                                                o.find(".wmodes-sb-track").css("width", t / n * 100 + "%");
                                                var a = wmodes.total_sold.sold_replacement,
                                                    i = d(wmodes.total_sold.total_replacement, n, d(a, t, e.label));
                                                o.find(".wmodes-sb-label").html(i)
                                            }
                                        })
                                    })(t(this), a)
                                })
                            })(o, n)
                        })
                    })(e, f)
                }, wmodes.total_sold.delay_time)
            }
        }(), t(document.body).on("updated_cart_totals", function(t, o) {
            n()
        })
});
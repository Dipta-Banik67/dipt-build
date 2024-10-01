var graph, jobsDataset, catsData, futureSkills, nodes, links, clickedId, pathwayW, jobsDataSetFormatted, globalmode, levels = ["Feeder", "Entry-Level", "Mid-Level", "Advanced-Level"],
    clicked = !1,
    formatThousand = d3.format(",d"),
    once = !0;
master_ksa_task_map = null, workrole_kt_mapping_map = null;
var currentEl = null,
    currentData = null,
    currentI = null,
    cirlceSizeAttr = "job_openings";
if ("widget" != (globalmode = d3.select("body").classed("widget") ? "widget" : "standard") &&   navigator.userAgent.match(/(Android|Blackberry|iPhone|iPod|iPad)/i)) {
    $("body").addClass("mobile-device"), $("body").removeClass("desktop-device");
    var windowHeight = $(window).height()
}
let basefile = "widget" == globalmode ? "../" : "";

function auxSlugifyKeys(e) {
    for (var t, a = Object.keys(e), r = a.length, l = {}; r--;) l[(t = a[r]).toLowerCase()] = e[t];
    return l
}

function ready(e, t, a, r, l, s, n) {
    var i = auxSlugifyKeys(l);
    console.log(l), a.forEach((function(e) {
        var t = i[e.job_title.toLowerCase()];
        t && Object.assign(e, t);
        let a = e["sub-ba"] + e.bachelor + e.graduate;
        e["sub-ba"] = Math.round(e["sub-ba"] / a * 100), e.bachelor = Math.round(e.bachelor / a * 100), e.graduate = Math.round(e.graduate / a * 100)
    })), master_ksa_task_map = d3.nest().key((function(e) {
        return e.ksat_id
    })).rollup((function(e) {
        return e[0].ksat_description
    })).map(s), jobsDataSetFormatted = a, pathwayW = parseInt(d3.select(".container").style("width")), graph = {
        nodes: [],
        links: []
    }, t.forEach((function(e, t) {
        graph.nodes.push({
            id: e.source_id,
            name: e.source,
            level: e.level
        }), graph.links.push({
            source: e.source,
            source_id: e.source_id,
            target: e.target,
            target_id: e.target_id,
            value: e.value
        })
    }));
    var o, d = d3.nest().key((function(e) {
        return e.name
    })).entries(graph.nodes);
    graph.nodes = d.map((function(e) {
        return e.values[0]
    })), graph.links.forEach((function(e, t) {
        graph.links[t].source = graph.nodes.map((function(e, a) {
            if (e.name == graph.links[t].source) return a
        })).filter(isFinite)[0], graph.links[t].target = graph.nodes.map((function(e, a) {
            if (e.name == graph.links[t].target) return a
        })).filter(isFinite)[0]
    })), graph.nodes.forEach((function(e, t) {
        graph.nodes[t] = {
            id: e.id,
            name: e.name,
            level: e.level
        }
    }));
    for (var c = 0; c < levels.length; c++) {
        o = graph.nodes.filter((function(e) {
            return e.level == levels[c]
        }));
        for (var u = 0; u < o.length; u++) o[u].levelIndex = u, o[u].levelLength = o.length
    }
    if (jobsDataset = d3.nest().key((function(e) {
            return e.id
        })).entries(a), catsData = d3.nest().key((function(e) {
            return e.id
        })).key((function(e) {
            return e.nice_areas
        })).key((function(e) {
            return e.nice_subcategories
        })).entries(r), futureSkills = d3.nest().key((function(e) {
            return e.id
        })).map(n), draw(), "widget" != globalmode) {
        drawCircleChart("average_salary", ".no1"), drawCircleChart("job_openings", "#no2"), drawStackedBar(), fillList("commonJobsList", "e1", "common_job_titles"), fillList("topCertificationsList", "e1", "top_certifications"), fillList("topSkillsList", "e1", "top_skills"), fillFutureSkill("future-skills-cont", "e1"), d3.selectAll(".educationChart").style("display", "inherit").style("overflow", "visible"), updateStackedBar("e1"), fillAreas("e1"), new ShareButton({
            networks: {
                email: {
                    enabled: !1
                }
            }
        }), setBoxHeight();
        var p = document.getElementById("r1"),
            f = document.getElementById("c2"),
            y = document.getElementById("c4"),
            h = document.getElementById("c3");
        pathwayW < 1e3 && pathwayW > 575 ? p.insertBefore(y, f) : pathwayW <= 575 && (p.insertBefore(y, f), p.insertBefore(h, f))
    }
    var v = debounce((function() {
        $(".container").css("width", ""), $(".pathway").html(""), pathwayW = parseInt(d3.select(".container").style("width")), draw(), null !== currentData && null !== currentI && null !== currentEl && (currentI < 10 && ($("#average_salaryChart").html(""), drawCircleChart("average_salary", ".no1")), $("#job_openingsChart").html(""), drawCircleChart("job_openings", "#no2"), $(".educationChart").html(""), drawStackedBar(), clickHandler(currentData, currentI, currentEl, !0))
    }), 100);
    d3.select(window).on("resize", v), $(".table").css("display", "none"), d3.selectAll(".infIcon").on("click", (function(e) {
        d3.select("#b" + d3.select(this).attr("rel")).style("display", "inherit")
    })), d3.selectAll(".closeBtn").on("click", (function(e) {
        d3.select("#b" + d3.select(this).attr("rel")).style("display", "none")
    }))
}

function draw() {
    nodes = graph.nodes, links = graph.links, d3.select(".pathway").append("div").attr("class", "tooltip");
    var e, t, a = d3.select(".pathway").node().getBoundingClientRect(),
        r = {
            top: 60,
            right: .1 * a.width,
            bottom: 15,
            left: .1 * a.width
        };
    r.top = pathwayW > 550 ? r.top : 20, r.left = pathwayW > 550 ? r.left : 0, r.right = pathwayW > 550 ? r.right : 50, e = a.width - r.left - r.right, t = pathwayW > 550 ? .75 * a.width - r.top - r.bottom : 1.1 * a.width - r.top - r.bottom;
    for (var l = d3.scale.ordinal().domain(levels).rangeRoundPoints([40, e]), s = jobsDataSetFormatted.filter((function(e) {
            return "Feeder" != nodes.find((function(t) {
                return e.id == t.id
            })).level
        })).map((function(e) {
            return parseInt(e[cirlceSizeAttr]) || 0
        })), n = (d3.scale.sqrt().domain(d3.extent(jobsDataset.map((function(e) {
            return +e.values[0].job_openings
        })))).range([t / 10, t / 7]), d3.scale.linear().domain([Math.min(...s), Math.max(...s)]).range([10, 40])), i = 0; i < nodes.length; i++) nodes[i].fixed = !0, nodes[i].x = l(nodes[i].level), nodes[i].y = nodes[i].levelIndex * (t / nodes[i].levelLength) + t / 2 / nodes[i].levelLength;
    var o = d3.svg.diagonal().projection((function(e) {
            return [e.y, e.x]
        })),
        d = d3.select(".pathway").append("svg").attr("width", e + r.left + r.right).attr("height", t + r.top + r.bottom);
    d.append("rect").attr("width", e + r.left + r.right).attr("height", t + r.top + r.bottom).attr("class", "backGrndClick").style("z-index", -100).style("fill", "#fff").on("click", unclick), d.append("rect").attr("width", (function() {
        return pathwayW > 550 ? 150 : 80
    })).attr("height", (function() {
        return pathwayW > 550 ? t + 30 : t + 15
    })).attr("y", (function() {
        return pathwayW > 550 ? 40 : 20
    })).attr("x", (function() {
        return pathwayW > 550 ? 43 : 0
    })).attr("class", "backgr").attr("rx", 6).attr("ry", 6).style("z-index", -100).style("fill", "#fff");
    var c = d.append("g").attr("transform", "translate(" + r.left + ",0)").selectAll(".levLines").data(levels).enter().append("g");
    c.append("text").attr("class", "levLab").attr("x", (function(e, t) {
        return l(e)
    })).attr("y", 10).attr("text-anchor", "middle").text((function(e) {
        return "Feeder" !== e ? e.toUpperCase() : "FEEDER ROLE"
    })), c.append("line").style("stroke-width", 2).style("stroke", (function(e, t) {
        switch (e) {
            case "Feeder":
                return "#bcdef9";
            case "Entry-Level":
                return "#438FE8";
            case "Mid-Level":
                return "#AF6CA5";
            case "Advanced-Level":
                return "#7EE0C5"
        }
    })).attr("x1", (function(t, a) {
        return l(t) - .12 * e
    })).attr("y1", 20).attr("x2", (function(t, a) {
        return l(t) + .12 * e
    })).attr("y2", 20), d.append("defs").append("marker").attr("id", "marker").attr("class", "mark").attr("viewBox", "0 -5 10 10").attr("refX", 10).attr("refY", 0).attr("markerWidth", 10).attr("markerHeight", 10).attr("orient", "auto").append("path").attr("fill", "#546e7a").attr("d", "M0,-5L10,0L0,5");
    var u = d3.selectAll(".levLab"),
        p = u[0][0].getBBox(),
        f = u[0][1].getBBox(),
        y = u[0][2].getBBox(),
        h = u[0][3].getBBox(),
        v = (p.x, p.width, f.x, f.x, f.width, y.x, y.x, y.width, h.x, d.append("defs"));
    v.append("marker").attr("id", "marker").attr("class", "mark").attr("viewBox", "0 -5 10 10").attr("refX", 10).attr("refY", 0).attr("markerWidth", 10).attr("markerHeight", 10).attr("orient", "auto").append("path").attr("fill", "#546e7a").attr("d", "M0,-5L10,0L0,5");
    var g = function(e, t, a) {
        var r = v.append("linearGradient").attr("id", e).attr("gradientUnits", "userSpaceOnUse");
        r.append("stop").attr("offset", "0%").attr("stop-color", t), r.append("stop").attr("offset", "100%").attr("stop-color", a)
    };
    g("Entry-Level-Entry-Level", "#438FE8", "#438FE8"), g("Entry-Level-Mid-Level", "#438FE8", "#BD75B2"), g("Mid-Level-Mid-Level", "#BD75B2", "#BD75B2"), g("Mid-Level-Advanced-Level", "#BD75B2", "#7FE2C6"), g("Advanced-Level-Advanced-Level", "#7FE2C6", "#7FE2C6"), d.append("g").attr("transform", "translate(" + r.left + ",40)").selectAll("path").data(links).enter().append("path").attr("class", (function(e) {
        return "link frontLink "
    })).attr("stroke", (function(e) {
        var t = graph.nodes.find((function(t) {
                return t.id == e.source_id
            })),
            a = graph.nodes.find((function(t) {
                return t.id == e.target_id
            }));
        return "url(#" + t.level + "-" + a.level + ")"
    })).attr("marker-end", "url(#marker)").attr("d", (function(e, t) {
        var a = jobsDataSetFormatted.find((function(t) {
                return t.id == e.target_id
            })),
            r = Math.round(n(parseInt(a[cirlceSizeAttr]) || 0));
        if (r += 6, "f" !== e.source_id.charAt(0)) {
            if (e.source_id.charAt(0) == e.target_id.charAt(0)) {
                var l = 2 * Math.PI * r * .25 - 8,
                    s = 2 * Math.PI * .25 - 8,
                    i = nodes[e.target].x - nodes[e.source].x,
                    d = nodes[e.target].y - nodes[e.source].y,
                    c = Math.sqrt(.4 * (i * i + d * d));
                return nodes[e.source].y > nodes[e.target].y ? "M" + (nodes[e.source].x - s / 2) + "," + (nodes[e.source].y - s / 2) + "A" + c + "," + c + " 0 0,1 " + (nodes[e.target].x - l / 2) + "," + (nodes[e.target].y + l / 2) : "M" + (nodes[e.source].x + s / 2) + "," + (nodes[e.source].y + s / 2) + "A" + c + "," + c + " 0 0,1 " + (nodes[e.target].x + l / 2) + "," + (nodes[e.target].y - l / 2)
            }
            jobsDataset.filter((function(t) {
                return t.key == e.source_id
            })), jobsDataset.filter((function(t) {
                return t.key == e.target_id
            }));
            var u = {
                    x: nodes[e.source].y,
                    y: nodes[e.source].x
                },
                p = {
                    x: nodes[e.target].y,
                    y: nodes[e.target].x - r
                };
            return o({
                source: u,
                target: p
            })
        }
    })).style("display", "none");
    var m = d.append("g").attr("transform", "translate(" + r.left + ",40)").selectAll("g").data(nodes).enter().append("g").attr("class", "circleCont");
    m.append("circle").attr("class", (function(e) {
        return e.circleEl = this, "jobRoles " + e.level
    })).attr("id", (function(e) {
        return e.id
    })).attr("cx", (function(e) {
        return e.x
    })).attr("cy", (function(e) {
        return e.y
    })).attr("r", (function(e) {
        var t = jobsDataSetFormatted.find((function(t) {
                return t.id == e.id
            })),
            a = n(parseInt(t[cirlceSizeAttr]) || 0);
        return "Feeder" === e.level ? 50 : a
    })).on("mouseover", (function(e) {
        highlightSelection(e, this), showToolTip(e, this)
    })).on("mouseout", (function(e) {
        d3.selectAll(".circleCont").style("opacity", 1), d3.selectAll(".jobRoles").style("stroke", "#29B6F6").style("stroke-width", "2px").style("fill", "#f7f8f9"), d3.selectAll(".link").style("display", "none"), d3.select(".tooltip").style("display", "none")
    })).on("click", (function(e, t) {
        if (1 == clicked && e.id == clickedId ? unclick() : (clickHandler(e, t, this), currentEl = this, currentData = e, currentI = t), "widget" != globalmode && setBoxHeight(), $("body").hasClass("mobile-device") && void 0 !== windowHeight && windowHeight < 800) {
            var a = $("h1.job");
            $("html,body").stop(!0, !0).delay(800).animate({
                scrollTop: a.offset().top
            }, "slow")
        }
    }));
    var k = 150;
    pathwayW < 700 && (k = 90), m.append("text").attr("x", (function(e) {
        return e.x
    })).attr("y", (function(e) {
        return e.y
    })).attr("dy", ".35em").style("text-anchor", "middle").text((function(e) {
        return e.name
    })).call(wrap, k).attr("transform", (function(e) {
        if ("Feeder" != e.level) {
            var t = this.getBBox();
            return "translate(0," + (-e.circleEl.getBBox().height / 2 - t.height + 3) + ")"
        }
        if (pathwayW < 700) return "translate(0,-" + (t = this.getBBox()).height / 2 + ")"
    })), m.append("line").style("stroke-width", 1).style("stroke", "#6799E3").attr("x1", (function(e) {
        var t = d3.select(this.parentNode).select("text").node().getBBox();
        return e.x - t.width / 2 - 5
    })).attr("y1", (function(e) {
        return e.y + 13
    })).attr("x2", (function(e) {
        var t = d3.select(this.parentNode).select("text").node().getBBox();
        return e.x + t.width / 2 + 5
    })).attr("y2", (function(e) {
        return e.y + 13
    })).attr("style", (function(e) {
        return "Feeder" != e.level ? "display:none;" : "stroke: #6799E3; stroke-width: 1px"
    }));
    var b = d.append("g").attr("class", "feederBlock").style("pointer-events", "none").style("opacity", 0);
    b.append("rect").attr("class", "rolesInfoBG").attr("y", 38).attr("x", (function() {
        return l("Feeder")
    })).attr("width", 160).attr("height", 260).style("fill", "#eceff1"), b.append("text").attr("class", "rolesInfo").text("Common cybersecurity feeder roles are career areas that are most likely to serve as stepping stones into a career in cybersecurity. Many career areas may prepare workers for jobs in cybersecurity, but common feeder roles were identified by analyzing similarities in skill requirements between jobs and pinpointing those jobs with significant skill overlap with multiple core cybersecurity roles.").attr("y", 53).attr("x", (function() {
        return l("Feeder") + 8
    })).attr("dy", ".35em").attr("text-anchor", "start").style("font-size", "12px").call(wrap, 148);
    var x = d.append("g").attr("class", "coreBlock").style("pointer-events", "none").style("opacity", 0);
    x.append("rect").attr("class", "coreInfoBG").attr("y", 28).attr("x", (function() {
        return l("Mid-Level") - 58
    })).attr("width", 300).attr("height", 100).style("fill", "#eceff1"), x.append("text").attr("class", "rolesInfo").text("Core cybersecurity roles are the most commonly requested job categories across the cybersecurity ecosystem.  They are classified as entry-level, mid-level, or advanced-level based upon the experience, education levels, and credentials requested by employers.").attr("y", 43).attr("x", (function() {
        return l("Mid-Level") - 50
    })).attr("dy", ".35em").attr("text-anchor", "start").style("font-size", "12px").call(wrap, 290)
}

function clickHandler(e, t, a, r) {
    $(".table").css("opacity", 1), $(".table").slideDown("fast"), "Feeder" === e.level && 1 == once ? ($("#c1").css("display", "none"), $("#c5").css("display", "block"), $(".col1").css("display", "none"), $("#no4").css("display", "none"), $(".no5").addClass("remove-line-right"), $("#no7").removeClass("is-bottom-row"), $("#no7").removeClass("remove-line-right"), $("#no2").insertAfter($(".no3")), $("#no2").addClass("is-bottom-row"), $("#no2").removeClass("remove-line-right"), $(".feeder").css("display", "block"), $(".core").css("display", "none"), once = !1) : "Feeder" === e.level && 0 == once || ($("#c1").css("display", "block"), $("#c5").css("display", "none"), $(".col1").css("display", "block"), $("#no4").css("display", "block"), $(".no5").removeClass("remove-line-right"), $("#no7").addClass("is-bottom-row"), $("#no7").addClass("remove-line-right"), $("#no2").insertBefore($("#no7")), $("#no2").removeClass("is-bottom-row"), $("#no2").addClass("remove-line-right"), $(".feeder").css("display", "none"), $(".core").css("display", "block"), once = !0), d3.select(".job").html(e.name), d3.selectAll(".link").style("display", "none");
    var l = jobsDataset.filter((function(t) {
        return t.key == e.id
    }));
    d3.select(".salaryNum").html("$" + formatThousand(l[0].values[0].average_salary)), d3.selectAll(".circ").style("opacity", .5).style("stroke-width", "0px"), d3.selectAll(".jobTitle").style("display", "none"), d3.selectAll(".number").style("display", "none"), d3.select("#average_salarySvg").selectAll("rect").style("display", "none"), d3.select("#job_openingsSvg").selectAll("rect").style("display", "none");
    var s = d3.select(a).attr("id");
    d3.select("#average_salarySvg").select("#rect" + s).moveToFront().style("display", "inherit"), d3.select("#average_salarySvg").select("#cf" + s).moveToFront().style("fill", "#f46d43").style("opacity", 1).style("stroke", "#455A64").style("stroke-width", "2px"), d3.select("#average_salarySvg").select("#tsf" + s).moveToFront().style("display", "inherit"), d3.select(".openingsNumber").html(formatThousand(l[0].values[0].job_openings)), d3.select("#job_openingsSvg").select("#rect" + s).moveToFront().style("display", "inherit"), d3.select("#job_openingsSvg").select("#cf" + s).moveToFront().style("fill", "#74add1").style("opacity", 1).style("stroke", "#455A64").style("stroke-width", "2px"), d3.select("#job_openingsSvg").select("#tsf" + s).moveToFront().style("display", "inherit"), !0 === r ? highlightSelection(e, a, !0) : highlightSelection(e, a), !0 !== r && "widget" != globalmode && (fillList("commonJobsList", e.id, "common_job_titles"), fillList("topCertificationsList", e.id, "top_certifications"), fillList("topSkillsList", e.id, "top_skills"), "Feeder" === e.level ? ($(".areas").css("display", "none"), $("#topSkillsToAddList").css("display", "block"), fillList("topSkillsToAddList", e.id, "top_skills_add")) : (fillFutureSkill("future-skills-cont", e.id), $(".areas").css("display", "block"), $("#topSkillsToAddList").css("display", "none")), fillAreas(e.id)), "widget" != globalmode && (d3.selectAll(".educationChart").style("display", "inherit").style("overflow", "visible"), updateStackedBar(e.id)), d3.selectAll(".jobRoles").on("mouseover", null).on("mouseout", null), clicked = !0, clickedId = e.id, d3.select(".tooltip").style("display", "none")
}

function highlightSelection(e, t, a) {
    var r = e.id;
    d3.selectAll(".jobRoles").style("stroke", "#d4f0fd").style("stroke-width", "2px").style("fill", "#f7f8f9"), d3.selectAll(".circleCont:not(#" + r + ")").style("opacity", .2);
    var l = d3.selectAll(".link").filter((function(e) {
            return nodes[e.source].id == r
        })),
        s = d3.selectAll(".link").filter((function(e) {
            return nodes[e.target].id == r
        })),
        n = d3.selectAll(".frontLink").filter((function(e) {
            return nodes[e.source].id == r
        })),
        i = d3.selectAll(".frontLink").filter((function(e) {
            return nodes[e.target].id == r
        }));
    l.style("display", "inherit"), s.style("display", "inherit");
    for (var o = 0; o < n[0].length; o++) {
        var d = d3.select(n[0][o]),
            c = n[0][o].getTotalLength();
        d.attr("stroke-dasharray", c + " " + c).attr("stroke-dashoffset", c).transition().duration(250).ease("linear").attr("stroke-dashoffset", 0), d3.selectAll(".circleCont").filter((function(e) {
            return e.name == nodes[l[0][o].__data__.target].name
        })).style("opacity", 1)
    }
    for (o = 0; o < i[0].length; o++) d = d3.select(i[0][o]), c = i[0][o].getTotalLength(), d.attr("stroke-dasharray", c + " " + c).attr("stroke-dashoffset", c).transition().duration(250).ease("linear").attr("stroke-dashoffset", 0), d3.selectAll(".circleCont").filter((function(e) {
        return e.name == nodes[s[0][o].__data__.source].name
    })).style("opacity", 1);
    d3.select(t.parentNode).style("opacity", 1), !0 === a ? (d3.select("#" + r).style("stroke", "#455a64").style("stroke-width", "3px").style("fill", "#9addfb"), $("#" + r).parent().find("text").css("opacity", 1)) : d3.select(t).style("stroke", "#455a64").style("stroke-width", "3px").style("fill", "#9addfb")
}

function unclick() {
    $(".table").slideUp("fast"), d3.select(".job").html(" "), d3.selectAll(".circleCont").style("opacity", 1), d3.selectAll(".jobRoles").style("stroke", "#29B6F6").style("stroke-width", "2px").style("fill", "#f7f8f9"), d3.selectAll(".link").style("display", "none"), d3.selectAll(".circ").style("opacity", .5).style("stroke-width", "0px"), d3.selectAll(".jobRoles").on("mouseover", (function(e) {
        highlightSelection(e, this), showToolTip(e, this)
    })).on("mouseout", (function(e) {
        d3.selectAll(".circleCont").style("opacity", 1), d3.selectAll(".link").style("display", "none"), d3.selectAll(".jobRoles").style("stroke", "#29B6F6").style("stroke-width", "2px").style("fill", "#f7f8f9"), d3.select(".tooltip").style("display", "none")
    })), clicked = !1, clickedId = "", currentEl = null, currentData = null, currentI = null
}

function showToolTip(e, t) {
    var a, r = jobsDataset.filter((function(t) {
        return t.key == e.id
    }));
    a = "f" !== e.id.charAt(0) ? "<div class='tipJob'>" + e.name + "</div><div class='var'>Job openings</div><div class='tipValue op'>" + formatThousand(r[0].values[0].job_openings) + "</div><div class='var'>Average salary</div><div class='tipValue sal'>$" + formatThousand(r[0].values[0].average_salary) + "</div><div class='more'>Click the circle for more info</div>" : "<div class='tipJob'>" + e.name + "</div><div class='var'>Job openings</div><div class='tipValue op'>" + formatThousand(r[0].values[0].job_openings) + "</div><div class='more'>Click the circle for more info</div>", d3.select(".tooltip").html(a).style("display", "inherit");
    var l = d3.select(".tooltip").node().getBoundingClientRect(),
        s = d3.select(".pathway").node().getBoundingClientRect();
    d3.select(".tooltip").style("top", e.y + 65 + +d3.select(t).attr("r") + "px").style("left", e.x + .1 * s.width - l.width / 2 + "px")
}

function drawCircleChart(e, t) {
    var a = [];
    jobsDataset.forEach((function(t) {
        var r = {};
        r.id = t.key, r.title = t.values[0].job_title, r.value = +t.values[0][e], a.push(r)
    }));
    var r = d3.select(t).select(".boxContent").node().getBoundingClientRect().width - 0,
        l = a.filter((function(e) {
            return "f" == e.id.charAt(0)
        })),
        s = a.filter((function(e) {
            return "f" !== e.id.charAt(0)
        })),
        n = d3.scale.linear().domain(d3.extent(l, (function(e) {
            return e.value
        }))).range([20, r - 20]),
        i = d3.scale.linear().domain(d3.extent(s, (function(e) {
            return e.value
        }))).range([20, r - 20]),
        o = d3.select("#" + e + "Chart").append("svg").attr("id", e + "Svg").attr("width", r).attr("height", 120);
    o.append("line").style("stroke", "#455A64").attr("x1", 0).attr("y1", 60).attr("x2", r).attr("y2", 60), o.selectAll("circles").data(a).enter().append("circle").attr("id", (function(e) {
        return "cf" + e.id
    })).attr("class", (function(t) {
        return "f" == t.id.charAt(0) ? e + " circ feeder" : e + " circ core"
    })).attr("cy", 60).attr("r", 15).attr("cx", (function(e) {
        return "f" == e.id.charAt(0) ? n(e.value) : i(e.value)
    })).on("mouseover", (function(t, a) {
        d3.select(this).moveToFront().style("stroke", "#455A64").style("stroke-width", "2px").style("opacity", 1), d3.select("#" + e + "Svg").select("#rect" + t.id).moveToFront().style("display", "inherit"), d3.select("#" + e + "Svg").select("#tf" + t.id).moveToFront().style("display", "inherit"), d3.select("#" + e + "Svg").select("#tsf" + t.id).moveToFront().style("display", "inherit"), d3.select(d3.select("#" + e + "Svg").select("#tsf" + t.id)[0][0].parentNode).moveToFront(), d3.select("#" + e + "Svg").select("#rect" + clickedId).style("display", "none"), d3.select("#" + e + "Svg").select("#tsf" + clickedId).style("display", "none")
    })).on("mouseout", (function(t) {
        d3.select(this).moveToBack().style("stroke", "none").style("opacity", .5), d3.select("#" + e + "Svg").select("#rect" + t.id).moveToBack().style("display", "none"), d3.select("#" + e + "Svg").select("#tf" + t.id).style("display", "none"), d3.select("#" + e + "Svg").select("#tsf" + t.id).style("display", "none"), d3.select("#" + e + "Svg").select("#cf" + clickedId).moveToFront().style("stroke", "#455A64").style("stroke-width", "2px").style("opacity", 1), d3.select("#" + e + "Svg").select("#rect" + clickedId).moveToFront().style("display", "inherit"), d3.select("#" + e + "Svg").select("#tsf" + clickedId).moveToFront().style("display", "inherit")
    })).on("click", (function(e, t) {
        var a = d3.select("#" + e.id)[0][0].__data__,
            r = d3.select("#" + e.id)[0][0];
        clickHandler(a, t, r), currentEl = r, currentData = e, currentI = t, setBoxHeight()
    }));
    var d = o.selectAll("nums").data(a).enter().append("g");
    d.append("text").text((function(e) {
        return formatThousand(e.value)
    })).attr("id", (function(e) {
        return "tf" + e.id
    })).attr("class", e + " number").attr("x", (function(e) {
        return "f" == e.id.charAt(0) ? n(e.value) : i(e.value)
    })).attr("y", 93).attr("text-anchor", (function(e) {
        var t = d3.select(this).node().getBBox();
        return t.x + t.width / 2 >= r - 5 ? "end" : t.x - t.width / 2 <= 10 ? "start" : "middle"
    })).style("display", "none"), d.append("text").text((function(e) {
        return e.title
    })).attr("id", (function(e) {
        return "tsf" + e.id
    })).attr("class", e + " jobTitle").attr("x", (function(e) {
        return "f" == e.id.charAt(0) ? n(e.value) : i(e.value)
    })).attr("y", 50).attr("dy", ".45em").attr("text-anchor", "middle").call(wrap, 80), d3.select(".salaryNum").html("$0"), d3.select("#" + e + "Chart").selectAll(".jobTitle").each((function(t, a) {
        var l = d3.select(this).node().getBBox(),
            s = +d3.select("#" + e + "Svg").select("#cf" + t.id).attr("cy") - +d3.select("#" + e + "Svg").select("#cf" + t.id).attr("r") / 2;
        l.y + l.height >= s - 5 && d3.select(this).selectAll("tspan").attr("y", s - (l.height + 5)), l.x + l.width / 2 >= r - 35 && d3.select(this).selectAll("tspan").attr("x", r - l.width / 2), l.x - l.width / 2 <= 25 && "m3" != t.id && d3.select(this).selectAll("tspan").attr("x", 10 + l.width / 2);
        var n = d3.select(this).node().getBBox();
        d3.select(this.parentNode).insert("rect", ":first-child").attr("id", (function(e) {
            return "rect" + e.id
        })).attr("class", "rect_jobTitle").attr("x", n.x - 10).attr("y", n.y).attr("width", n.width + 20).attr("height", n.height).attr("fill", "#fff").style("display", "none")
    })), d3.selectAll(".jobTitle").style("display", "none")
}

function fillList(e, t, a) {
    for (var r = jobsDataset.filter((function(e) {
            return e.key == t
        })), l = [], s = 1; s < 10; s++) {
        var n = r[0].values[0][a + "_" + s];
        null != n && n.length > 2 && l.push(r[0].values[0][a + "_" + s])
    }
    document.getElementById(e).innerHTML = "", d3.select("#" + e).selectAll("li").data(l).enter().append("li").html((function(e) {
        return e
    }))
}

function fillFutureSkill(e, t) {
    var a = futureSkills[t];
    document.getElementById(e).innerHTML = "";
    var r = d3.select("#" + e).selectAll("tr").data(a).enter().append("tr");
    r.append("td").html((function(e) {
        return e.Skill
    })), r.append("td").html((function(e) {
        return Math.ceil(+e.Growth.replace("%", "")) + "%"
    }))
}
var causes, colors, margin, width, height, x, barSvg;
queue().defer(d3.csv, basefile + "data/career_pathway_links_data.csv").defer(d3.csv, basefile + "data/career_pathway_jobs_data.csv").defer(d3.csv, basefile + "data/areas_subcategories_ksa_updated.csv").defer(d3.json, "data/api.js").defer(d3.tsv, basefile + "data/master_ksa_task.tsv").defer(d3.csv, basefile + "data/career_pathway_skill_proj.csv").await(ready);
var barHeight = 45;

function drawStackedBar() {
    causes = ["Sub-BA", "Bachelor's Degree", "Graduate Degree"], colors = ["#6e016b", "#8c6bb1", "#bfd3e6"], margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 25
    }, width = d3.select(".no5").select(".boxContent").node().getBoundingClientRect().width - (margin.left + margin.right), height = 70, x = d3.scale.linear().rangeRound([2, width]), barSvg = d3.select(".educationChart").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")")
}

function updateStackedBar(e) {
    var t = jobsDataset.filter((function(t) {
            return t.key == e
        })),
        a = [+t[0].values[0]["sub-ba"], +t[0].values[0].bachelor, +t[0].values[0].graduate];
    x.domain([0, 100]);
    var r = [0, x(a[0]), x(a[0]) + x(a[1])],
        l = x(a[0]) + x(a[1]) + x(a[2]),
        s = barSvg.selectAll("rect").data(a);
    s.enter().append("rect").attr("y", height / 1.47).attr("height", barHeight).attr("stroke", "#fff").attr("stroke-width", 2).attr("fill", (function(e, t) {
        return colors[t]
    })), s.transition().duration(500).attr("x", (function(e, t) {
        return r[t]
    })).attr("width", (function(e) {
        return x(e)
    }));
    var n = barSvg.selectAll(".barNum").data(a);
    n.enter().append("text").attr("class", "barNum").attr("y", margin.top + barHeight + 16).attr("dy", ".35em").attr("text-anchor", "end"), n.transition().duration(500).attr("x", (function(e, t) {
        switch (t) {
            case 0:
                return e > 6 ? r[t] + x(e) - 3 : 0;
            case 1:
                return e > 6 ? r[t] + x(e) - 3 : -100;
            case 2:
                return e > 6 ? r[t] + x(e) - 3 : l + 12;
            default:
                return e > 6 ? r[t] + x(e) - 3 : 0
        }
        return xPos
    })).text((function(e) {
        return e
    })).attr("fill", (function(e, t) {
        return e > 6 && 0 == t || 1 == t ? "#fff" : "333"
    }));
    var i = barSvg.selectAll(".causeLabels").data(a),
        o = (i.enter().append("text").attr("class", "causeLabels").attr("y", margin.top).attr("dy", ".35em"), []);
    i.attr("text-anchor", (function(e, t) {
        return e < 10 ? (o[t] = "middle", "middle") : (o[t] = "end", "end")
    })).attr("x", (function(e, t) {
        return r[t] + x(e) - 5
    })).text((function(e, t) {
        return causes[t]
    })).call(wrap, 70);
    var d = d3.select(i[0][0]).node().getBBox(),
        c = Number(d3.select(i[0][0]).attr("x"));
    "middle" === o[0] && (c = Number(d3.select(i[0][0]).attr("x")) + d.width / 2);
    var u = d3.select(i[0][1]).node().getBBox(),
        p = Number(d3.select(i[0][1]).attr("x")) - u.width,
        f = Number(d3.select(i[0][1]).attr("x"));
    "middle" === o[1] && (p = Number(d3.select(i[0][1]).attr("x")) - u.width / 2, f = Number(d3.select(i[0][1]).attr("x")) + u.width / 2);
    var y = d3.select(i[0][2]).node().getBBox(),
        h = Number(d3.select(i[0][2]).attr("x")) - y.width,
        v = Number(d3.select(i[0][2]).attr("x"));
    "middle" === o[2] && (h = Number(d3.select(i[0][2]).attr("x")) - y.width / 2, v = Number(d3.select(i[0][2]).attr("x")) + y.width / 2);
    var g = v - l - 10;
    g > 0 && (d3.select(i[0][2]).selectAll("tspan").attr("x", (function(e, t) {
        return d3.select(this).attr("x") - g
    })), h -= g);
    var m = f - h;
    m > 0 && (d3.select(i[0][1]).selectAll("tspan").attr("x", (function(e, t) {
        return d3.select(this).attr("x") - m - 10
    })), p = p - m - 10);
    var k = c - p;
    k > 0 && (d3.select(i[0][0]).selectAll("tspan").attr("x", (function(e, t) {
        return d3.select(this).attr("x") - k - 10
    })), c = c - k - 10)
}

function fillAreas(e) {
    var t = catsData.filter((function(t) {
        return t.key == e
    }));
    if (d3.select(".ksas").html(""), d3.select(".tasks").html(""), d3.selectAll(".areaBtns").remove(), d3.selectAll(".subCatsUl").remove(), d3.select(".row2").style("display", "none"), null != t[0]) {
        var a = d3.select(".areas").selectAll("areaBtns").data(t[0].values).enter().append("div").attr("id", (function(e, t) {
            return "area" + t
        })).attr("class", "areaBtns accordion").html((function(e) {
            return e.key
        })).on("click", (function(e, t) {
            d3.select(this.nextSibling).classed("show", (function() {
                return 1 == d3.select(this).classed("show") ? (d3.selectAll(".accordion").classed("active", !1), !1) : (d3.selectAll(".subCatsUl").classed("show", !1), d3.selectAll(".accordion").classed("active", !1), d3.select(this.previousSibling).classed("active", !0), !0)
            })), setBoxHeight()
        }));
        d3.select(".ksas").append("div").attr("class", "noData").html("No data"), d3.select(".tasks").append("div").attr("class", "noData").html("No data"), a.each((function(e, t) {
            d3.select(".areas").insert("ul", "#area" + (t + 1)).attr("class", "subCatsUl").selectAll("subCats").data(e.values).enter().append("li").attr("class", "subCatsLi").attr("id", (function(e) {
                return idStrip(e.key)
            })).html((function(e) {
                return e.key
            })).on("click", (function(e) {
                d3.select(this).classed("active", (function() {
                    return 0 == d3.select(this).classed("active") ? (d3.select(".row2").style("display", "block"), d3.selectAll(".subCatsLi").classed("active", !1), d3.selectAll(".ksa").style("display", "none"), d3.selectAll(".task").style("display", "none"), d3.select(".ksas").selectAll("." + idStrip(e.key))[0][0].childNodes.length >= 0 && (d3.select(".ksas").selectAll("." + idStrip(e.key)).style("display", "none"), d3.select(".ksas").select(".noData").style("display", "block")), 0 == d3.select(".tasks").selectAll("." + idStrip(e.key))[0][0].childNodes.length ? (d3.select(".tasks").selectAll("." + idStrip(e.key)).style("display", "none"), d3.select(".tasks").select(".noData").style("display", "block")) : (d3.select(".ksas").select(".noData").style("display", "none"), d3.select(".tasks").select(".noData").style("display", "none"), d3.select(".ksas").selectAll("." + idStrip(e.key)).style("display", "block"), d3.select(".tasks").selectAll("." + idStrip(e.key)).style("display", "block")), !0) : (d3.select(".row2").style("display", "none"), d3.selectAll(".ksa").style("display", "none"), d3.selectAll(".task").style("display", "none"), !1)
                }));
                var t = getOffsetTop(document.getElementById("scrollTo"));
                animatedScrollTo(document.body, t, 500)
            }))
        })), d3.selectAll(".subCatsLi").each((function(e, t) {
            var a = e;
            d3.select(".ksas").append("ul").attr("class", (function(e) {
                return "ksa " + idStrip(a.key)
            })).style("display", "none").selectAll("ksaList").data(e.values.filter((function(e) {
                return "K" === e.description_id[0]
            }))).enter().append("li").html((function(e) {
                return master_ksa_task_map[e.description_id]
            })), d3.select(".tasks").append("ul").attr("class", (function(e) {
                return "task " + idStrip(a.key)
            })).style("display", "none").selectAll("taskList").data(e.values.filter((function(e) {
                return "T" === e.description_id[0]
            }))).enter().append("li").html((function(e) {
                return master_ksa_task_map[e.description_id]
            }))
        })), d3.select(".tasks").selectAll("li").each((function(e, t) {
            "" == d3.select(this).html() && d3.select(this).remove()
        })), d3.select(".ksas").selectAll("li").each((function(e, t) {
            "" == d3.select(this).html() && d3.select(this).remove()
        }))
    }
}

function copyToClipboard(e) {
    var t, a, r = "INPUT" === e.tagName || "TEXTAREA" === e.tagName;
    if (r) l = e, t = e.selectionStart, a = e.selectionEnd;
    else {
        if (!(l = document.getElementById("_hiddenCopyText_"))) {
            var l = document.createElement("textarea");
            l.style.position = "absolute", l.style.left = "-9999px", l.style.top = "0", l.id = "_hiddenCopyText_", document.body.appendChild(l)
        }
        l.textContent = e.textContent
    }
    var s, n = document.activeElement;
    l.focus(), l.setSelectionRange(0, l.value.length);
    try {
        s = document.execCommand("copy")
    } catch (e) {
        s = !1
    }
    return n && "function" == typeof n.focus && n.focus(), r ? e.setSelectionRange(t, a) : l.textContent = "", s
}

function getOffsetTop(e) {
    var t = 0;
    do {
        isNaN(e.offsetTop) || (t += e.offsetTop)
    } while (e = e.offsetParent);
    return t
}

function setBoxHeight() {}

function wrap(e, t) {
    e.each((function() {
        for (var e, a = d3.select(this), r = a.text().split(/\s+/).reverse(), l = [], s = 0, n = a.attr("y"), i = a.attr("x"), o = parseFloat(a.attr("dy")), d = a.text(null).append("tspan").attr("x", i).attr("y", n).attr("dy", o + "em"); e = r.pop();) l.push(e), d.text(l.join(" ")), d.node().getComputedTextLength() > t && (l.pop(), d.text(l.join(" ")), l = [e], d = a.append("tspan").attr("x", i).attr("y", n).attr("dy", 1.1 * ++s + o + "em").text(e))
    }))
}

function idStrip(e) {
    return e.replace(/\s+/g, "").replace(/\.+/g, "").replace(/\'+/g, "").toLowerCase().substring(0, 20).replace(/\,+/g, "").replace(/\/+/g, "").replace(/\&+/g, "").replace(/\-/g, "")
}
"widget" != globalmode && document.getElementById("copyButton").addEventListener("click", (function() {
    copyToClipboard(document.getElementById("copyTarget"))
})), d3.selection.prototype.moveToFront = function() {
    return this.each((function() {
        this.parentNode.appendChild(this)
    }))
}, d3.selection.prototype.moveToBack = function() {
    return this.each((function() {
        var e = this.parentNode.firstChild;
        e && this.parentNode.insertBefore(this, e)
    }))
};
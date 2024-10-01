var cxScale, width, height, svgMain, margin, certs, jobs, skills, zoom = {},
    drag = {},
    svg = {},
    columnWidth = 150,
    colours = {
        Feeder: "#BCDFF9",
        "Entry-Level": "#448FE8",
        "Mid-Level": "#BD75B2",
        "Advanced-Level": "#7FE2C6"
    };

function wrap(t, e) {
    t.each(function() {
        for (var t, n = d3.select(this), r = n.text().split(/\s+/).reverse(), o = [], a = 0, i = n.attr("y") || 0, s = n.attr("x") || 0, l = parseFloat(n.attr("dy")) || 0, c = n.text(null).append("tspan").attr("x", s).attr("y", i).attr("dy", l + "em"); t = r.pop();) o.push(t), c.text(o.join(" ")), c.node().getComputedTextLength() > e && (o.pop(), c.text(o.join(" ")), o = [t], c = n.append("tspan").attr("x", s).attr("y", i).attr("dy", 1.1 * ++a + l + "em").text(t))
    })
}
queue().defer(d3.csv, "data/career_pathway_jobs_data.csv").defer(d3.csv, "data/career_pathway_links_data.csv").defer(d3.csv, "data/certifications.csv").await(ready);
var resizeFunc = debounce(draw, 100);

function ready(t, e, n, r) {
    jobs = e.sort(function(t, e) {
        return parseInt(e.job_openings) - parseInt(t.job_openings)
    }), skills = r.filter(function(t) {
        return "Skill" === t.type
    }), certs = r.filter(function(t) {
        return "Certification" === t.type
    }), jobs.forEach(function(t) {
        var e = n.find(function(e) {
            return t.id == e.source_id
        });
        t.level = e.level
    }), certs = certs.map(function(t) {
        var e = t.jobCodes.split(", ").map(function(t) {
            return jobs.find(function(e) {
                return e.id == t
            })
        });
        return e = e.sort(function(t, e) {
            return parseInt(e.job_openings) - parseInt(t.job_openings)
        }), {
            name: t.name,
            jobCodes: t.jobCodes.split(", "),
            jobs: e,
            id: Math.random().toString(36).substr(2, 9)
        }
    }), skills = skills.map(function(t) {
        var e = t.jobCodes.split(", ").map(function(t) {
            return jobs.find(function(e) {
                return e.id == t
            })
        });
        return e = e.sort(function(t, e) {
            return parseInt(e.job_openings) - parseInt(t.job_openings)
        }), {
            name: t.name,
            jobCodes: t.jobCodes.split(", "),
            jobs: e,
            id: Math.random().toString(36).substr(2, 9)
        }
    }), jobs.forEach(function(t) {
        t.certs = certs.filter(function(e) {
            return e.jobCodes.includes(t.id)
        })
    }), skills = skills.sort(function(t, e) {
        return e.jobs.length - t.jobs.length
    }), jobs.forEach(function(t) {
        t.skills = skills.filter(function(e) {
            return e.jobCodes.includes(t.id)
        })
    }), jobs = jobs.filter(function(t) {
        return t.skills.length || t.certs.length
    }), draw()
}

function draw() {
    var t = d3.select("#sankey").node().getBoundingClientRect();
    margin = {
        top: 40,
        right: 0,
        bottom: 30,
        left: 0
    }, width = t.width - margin.left - margin.right, height = t.height, t.width < 750 && (columnWidth = 100), cxScale = d3.scale.ordinal().domain([1, 2, 3]).rangeRoundPoints([0, width]), svgMain = d3.select("#sankey").html("").append("svg").attr("width", width).attr("height", height), svg = svgMain.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"), drawCerts(certs), drawJobs(jobs), drawSkills(skills), drawPaths(jobs)
}

function drawPaths(t) {
    var e = $("#sankey").get(0).getBoundingClientRect(),
        n = [];
    t.forEach(function(t, r) {
        t.certs.forEach(function(r, o) {
            var a = svg.select("#node-" + r.id)[0][0].__data__.jobs.findIndex(function(e) {
                    return e.id == t.id
                }),
                i = svg.select("#node-" + r.id).select(".node-line").node().getBoundingClientRect();
            i.x = i.x || i.left, i.y = i.y || i.top, i.y += a + 1 * a + 1, i.x += 2, i.y -= e.top, i.x -= e.left;
            var s = svg.select("#node-" + t.id).select(".node-line").node().getBoundingClientRect();
            s.x = s.x || s.left, s.y = s.y || s.top, s.y += o + 1 * o + 1, s.x -= 2, s.y -= e.top, s.x -= e.left, n.push({
                ids: [r.id, t.id],
                source: i,
                target: s,
                color: colours[t.level]
            })
        }), t.skills.forEach(function(r, o) {
            var a = svg.select("#node-" + t.id).select(".node-line-2").node().getBoundingClientRect();
            a.x = a.x || a.left, a.y = a.y || a.top, a.y += o + 1 * o + 1, a.x += 2, a.y -= e.top, a.x -= e.left;
            var i = svg.select("#node-" + r.id)[0][0].__data__.jobs.findIndex(function(e) {
                    return e.id == t.id
                }),
                s = svg.select("#node-" + r.id).select(".node-line").node().getBoundingClientRect();
            s.x = s.x || s.left, s.y = s.y || s.top, s.y += i + 1 * i + 1, s.x -= 2, s.y -= e.top, s.x -= e.left, n.push({
                ids: [r.id, t.id],
                source: a,
                target: s,
                color: colours[t.level]
            })
        })
    });
    var r = .5;
    svgMain.append("g").attr("transform", function(t, e) {
        return "translate(0, 0)"
    }).selectAll(".node-link").data(n).enter().append("path").attr("class", "node-link").attr("d", function(t) {
        var e = t.source.x,
            n = t.target.x,
            o = d3.interpolateNumber(e, n),
            a = o(r),
            i = o(1 - r),
            s = t.source.y,
            l = t.target.y;
        return "M" + e + "," + s + "C" + a + "," + s + " " + i + "," + l + " " + n + "," + l
    }).attr("stroke", function(t) {
        return t.color
    })
}

function drawCerts(t) {
    var e = d3.scale.linear().domain([0, t.length]).range([0, height - margin.bottom]),
        n = (svgMain.append("text").attr("class", "title").text("TOP CERTIFICATION").attr("transform", function(t, e) {
            return "translate(" + (cxScale(1) + .7 * columnWidth) + ", 10)"
        }), svg.append("g").attr("transform", "translate(" + cxScale(1) + ", 0)").selectAll(".node").data(t).enter().append("g").attr("class", "node").attr("transform", function(t, n) {
            return "translate(" + columnWidth + ", " + e(n) + ")"
        }));
    n.append("text").attr("class", "node-text").text(function(t) {
        return t.name
    }).call(wrap, columnWidth - 10), n.append("line").attr("x1", 15).attr("y1", function(t) {
        var e = this.parentNode.getBBox();
        return e.y + e.height / 2 - t.jobs.length
    }).attr("x2", 15).attr("y2", function(t) {
        var e = this.parentNode.getBBox();
        return e.y + e.height / 2 + (t.jobs.length > 5 ? t.jobs.length + 1 : t.jobs.length)
    }).attr("class", "node-line"), n.attr("id", function(t) {
        return t.bbox = this.getBBox(), "node-" + t.id
    }).append("rect").attr("x", function(t) {
        return t.bbox.x
    }).attr("y", function(t) {
        return t.bbox.y
    }).attr("width", function(t) {
        return t.bbox.width
    }).attr("height", function(t) {
        return t.bbox.height
    }).attr("fill", "transparent").on("mouseover", function(t, e) {
        var n = [];
        t.jobs.forEach(function(t) {
            n.push(t.id)
        }), n.push(t.id), mouseover(n)
    }).on("mouseout", function(t, e) {
        mouseout()
    })
}

function mouseover(t) {
    svgMain.selectAll(".node-link").attr("style", function(e) {
        return t.filter(function(t) {
            return e.ids.includes(t)
        }).length > 1 ? "opacity: 1" : "opacity: 0"
    }), svgMain.selectAll(".node").attr("style", function(e) {
        return t.includes(e.id) ? "opacity: 1" : "opacity: 0.3"
    })
}

function mouseout() {
    svgMain.selectAll(".node-link").attr("style", "opacity: 0"), svgMain.selectAll(".node").attr("style", "opacity: 1")
}

function drawJobs(t) {
    svgMain.append("text").attr("class", "title").text("JOB TITLE").attr("transform", function(t, e) {
        return "translate(" + cxScale(2) + ", 10)"
    });
    var e = d3.scale.linear().domain([0, t.length]).range([0, height - margin.bottom]),
        n = svg.append("g").attr("transform", function(t, e) {
            return "translate(" + (cxScale(2) - columnWidth) + ", 0)"
        }).selectAll(".node").data(t).enter().append("g").attr("class", "node").attr("transform", function(t, n) {
            return "translate(" + columnWidth + ", " + e(n) + ")"
        });
    n.append("text").attr("class", "node-text middle").text(function(t) {
        return t.job_title
    }).call(wrap, columnWidth - 10), n.append("line").attr("x1", -.5 * columnWidth).attr("y1", function(t) {
        var e = this.parentNode.getBBox();
        return e.y + e.height / 2 - t.certs.length
    }).attr("x2", -.5 * columnWidth).attr("y2", function(t) {
        var e = this.parentNode.getBBox();
        return e.y + e.height / 2 + t.certs.length
    }).attr("class", "node-line").attr("style", function(t) {
        return "stroke:" + colours[t.level]
    }), n.append("line").attr("x1", .5 * columnWidth).attr("y1", function(t) {
        var e = this.parentNode.getBBox();
        return e.y + e.height / 2 - t.skills.length
    }).attr("x2", .5 * columnWidth).attr("y2", function(t) {
        var e = this.parentNode.getBBox();
        return e.y + e.height / 2 + t.skills.length
    }).attr("class", "node-line node-line-2").attr("style", function(t) {
        return "stroke:" + colours[t.level]
    }), n.attr("id", function(t) {
        return t.bbox = this.getBBox(), "node-" + t.id
    }).append("rect").attr("x", function(t) {
        return t.bbox.x
    }).attr("y", function(t) {
        return t.bbox.y
    }).attr("width", function(t) {
        return t.bbox.width
    }).attr("height", function(t) {
        return t.bbox.height
    }).attr("fill", "transparent").on("mouseover", function(t, e) {
        var n = [];
        t.certs.forEach(function(t) {
            n.push(t.id)
        }), t.skills.forEach(function(t) {
            n.push(t.id)
        }), n.push(t.id), mouseover(n)
    }).on("mouseout", function(t, e) {
        mouseout()
    })
}

function drawSkills(t) {
    svgMain.append("text").attr("class", "title").text("TOP SKILLS").attr("transform", function(t, e) {
        return "translate(" + (cxScale(3) - columnWidth / 2) + ", 10)"
    });
    var e = d3.scale.linear().domain([0, t.length]).range([0, height - margin.bottom]),
        n = svg.append("g").attr("transform", function(t, e) {
            return "translate(" + cxScale(3) + ", 0)"
        }).selectAll(".node").data(t).enter().append("g").attr("class", "node").attr("transform", function(t, n) {
            return "translate(0, " + e(n) + ")"
        });
    n.append("text").attr("class", "node-text right").text(function(t) {
        return t.name
    }).call(wrap, columnWidth - 10), n.append("line").attr("x1", -columnWidth).attr("y1", function(t) {
        var e = this.parentNode.getBBox();
        return e.y + e.height / 2 - t.jobs.length
    }).attr("x2", -columnWidth).attr("y2", function(t) {
        var e = this.parentNode.getBBox();
        return e.y + e.height / 2 + (t.jobs.length > 5 ? t.jobs.length + 2 : t.jobs.length)
    }).attr("class", "node-line"), n.attr("id", function(t) {
        return t.bbox = this.getBBox(), "node-" + t.id
    }).append("rect").attr("x", function(t) {
        return t.bbox.x
    }).attr("y", function(t) {
        return t.bbox.y
    }).attr("width", function(t) {
        return t.bbox.width
    }).attr("height", function(t) {
        return t.bbox.height
    }).attr("fill", "transparent").on("mouseover", function(t, e) {
        var n = [];
        t.jobs.forEach(function(t) {
            n.push(t.id)
        }), n.push(t.id), mouseover(n)
    }).on("mouseout", function(t, e) {
        mouseout()
    })
}
d3.select(window).on("resize", resizeFunc), $(document).ready(function() {
    try {
        localStorage.getItem("gotit") && $("#gotit").parents(".pure-g").hide()
    } catch (t) {}
    $("#gotit").on("click", function() {
        $("#gotit").parents(".pure-g").slideUp();
        try {
            localStorage.setItem("gotit", !0)
        } catch (t) {}
    })
}), $(document).ready(function() {
    $(".scrollUp").on("click", function() {
        $("html, body").animate({
            scrollTop: 0
        }, 1e3)
    })
});
/* ============================================================
   CivicPulse — admin.js
   Range switcher, approval actions and SVG line chart drawing.
   ============================================================ */
(function (window, document) {
  "use strict";
  var CP = window.CP;

  var DATASETS = {
    "7d":  [42, 55, 38, 61, 72, 49, 66],
    "30d": [120, 145, 132, 168, 155, 190, 210],
    "90d": [310, 355, 402, 388, 445, 470, 512]
  };
  var LABELS = {
    "7d":  ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "30d": ["W1", "W2", "W3", "W4", "W5", "W6", "W7"],
    "90d": ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"]
  };

  function drawLineChart(key) {
    var svg = document.getElementById("trend-chart");
    if (!svg) return;
    var data = DATASETS[key], labels = LABELS[key];
    var w = 700, h = 220, padL = 36, padR = 12, padT = 16, padB = 28;
    var max = Math.max.apply(null, data) * 1.15;
    var stepX = (w - padL - padR) / (data.length - 1);
    var pts = data.map(function (v, i) {
      return [padL + i * stepX, padT + (h - padT - padB) * (1 - v / max)];
    });

    var grid = "";
    for (var g = 0; g <= 4; g++) {
      var y = padT + ((h - padT - padB) / 4) * g;
      grid += '<line class="grid-line" x1="' + padL + '" y1="' + y + '" x2="' + (w - padR) + '" y2="' + y + '"/>';
      grid += '<text x="4" y="' + (y + 4) + '">' + Math.round(max - (max / 4) * g) + "</text>";
    }
    var line = pts.map(function (p, i) { return (i ? "L" : "M") + p[0] + " " + p[1]; }).join(" ");
    var area = line + " L" + pts[pts.length - 1][0] + " " + (h - padB) + " L" + padL + " " + (h - padB) + " Z";
    var dots = pts.map(function (p) {
      return '<circle class="pt" cx="' + p[0] + '" cy="' + p[1] + '" r="4"/>';
    }).join("");
    var xlabels = pts.map(function (p, i) {
      return '<text x="' + p[0] + '" y="' + (h - 8) + '" text-anchor="middle">' + labels[i] + "</text>";
    }).join("");

    svg.setAttribute("viewBox", "0 0 " + w + " " + h);
    svg.innerHTML = grid + '<path class="area" d="' + area + '"/><path class="line" d="' + line + '"/>' + dots + xlabels;
  }

  function initRange() {
    var group = document.getElementById("range-switch");
    if (!group) return;
    CP.qsa("button", group).forEach(function (btn) {
      CP.on(btn, "click", function () {
        CP.qsa("button", group).forEach(function (b) {
          b.classList.remove("active");
          b.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");
        drawLineChart(btn.getAttribute("data-range"));
      });
    });
  }

  function initApprovals() {
    CP.qsa("[data-approve]").forEach(function (btn) {
      CP.on(btn, "click", function () {
        var row = btn.closest(".approval");
        var approve = btn.getAttribute("data-approve") === "yes";
        if (row) row.parentNode.removeChild(row);
        updatePendingCount();
        CP.toast(approve ? "Report approved and routed to department."
                         : "Report rejected and archived.", approve ? "success" : "warning");
      });
    });
    updatePendingCount();
  }

  function updatePendingCount() {
    var count = CP.qsa(".approval").length;
    var el = document.getElementById("pending-count");
    if (el) el.textContent = count + " pending";
    var empty = document.getElementById("approvals-empty");
    if (empty) empty.classList.toggle("is-hidden", count !== 0);
  }

  document.addEventListener("DOMContentLoaded", function () {
    drawLineChart("7d");
    initRange();
    initApprovals();
  });
})(window, document);

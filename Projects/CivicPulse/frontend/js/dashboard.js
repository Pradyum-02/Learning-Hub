/* ============================================================
   CivicPulse — dashboard.js
   Greeting, animated stats, CSS/SVG charts, notification
   interactions, table search / sort / pagination (UI only).
   ============================================================ */
(function (window, document) {
  "use strict";
  var CP = window.CP;

  /* ---------- Personalised greeting ---------- */
  function initGreeting() {
    var el = document.getElementById("greeting-text");
    if (el) el.textContent = CP.greeting() + ", " + (el.getAttribute("data-name") || "Citizen");
    var dateEl = document.getElementById("today-date");
    if (dateEl) {
      dateEl.textContent = new Date().toLocaleDateString(undefined, {
        weekday: "long", year: "numeric", month: "long", day: "numeric"
      });
    }
  }

  /* ---------- Animated statistic counters ---------- */
  function initCounters() {
    CP.qsa("[data-count]").forEach(function (el) {
      CP.countUp(el, parseInt(el.getAttribute("data-count"), 10) || 0, 900);
    });
  }

  /* ---------- CSS bar chart heights ---------- */
  function initBars() {
    CP.qsa(".bar").forEach(function (bar) {
      var v = parseInt(bar.getAttribute("data-value"), 10) || 0;
      var max = parseInt(bar.getAttribute("data-max"), 10) || 100;
      requestAnimationFrame(function () {
        bar.style.height = Math.max(4, Math.round((v / max) * 100)) + "%";
      });
    });
    CP.qsa(".progress i[data-pct]").forEach(function (p) {
      requestAnimationFrame(function () { p.style.width = p.getAttribute("data-pct") + "%"; });
    });
  }

  /* ---------- SVG donut chart ---------- */
  function initDonut() {
    CP.qsa(".donut").forEach(function (svg) {
      var segs = CP.qsa("circle[data-part]", svg);
      var total = segs.reduce(function (s, c) { return s + parseFloat(c.getAttribute("data-part")); }, 0);
      var r = 54, circumference = 2 * Math.PI * r, offset = 0;
      segs.forEach(function (c) {
        var part = parseFloat(c.getAttribute("data-part")) / total;
        var len = part * circumference;
        c.setAttribute("r", r);
        c.setAttribute("stroke-dasharray", len + " " + (circumference - len));
        c.setAttribute("stroke-dashoffset", -offset);
        offset += len;
      });
    });
  }

  /* ---------- Notifications ---------- */
  function initNotifications() {
    CP.qsa(".notif").forEach(function (n) {
      CP.on(n, "click", function () { n.classList.remove("unread"); updateCount(); });
      CP.on(n, "keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); n.click(); }
      });
    });
    var markAll = document.getElementById("mark-all-read");
    if (markAll) {
      CP.on(markAll, "click", function () {
        CP.qsa(".notif.unread").forEach(function (n) { n.classList.remove("unread"); });
        updateCount();
        CP.toast("All notifications marked as read.", "success");
      });
    }
    CP.qsa("[data-notif-filter]").forEach(function (btn) {
      CP.on(btn, "click", function () {
        var f = btn.getAttribute("data-notif-filter");
        CP.qsa("[data-notif-filter]").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        CP.qsa(".notif").forEach(function (n) {
          var show = f === "all"
            || (f === "unread" && n.classList.contains("unread"))
            || n.getAttribute("data-type") === f;
          n.classList.toggle("is-hidden", !show);
        });
      });
    });
    function updateCount() {
      var count = CP.qsa(".notif.unread").length;
      var badge = document.getElementById("unread-count");
      if (badge) badge.textContent = count + " unread";
      var dot = CP.qs(".dot-badge");
      if (dot) dot.classList.toggle("is-hidden", count === 0);
    }
    updateCount();
  }

  /* ---------- Issue table: search, filter, sort, pagination ---------- */
  function initIssueTable() {
    var table = document.getElementById("issues-table");
    if (!table) return;
    var rows = CP.qsa("tbody tr", table);
    var pageSize = 6, current = 1, filtered = rows.slice();

    var search = document.getElementById("issue-search");
    var status = document.getElementById("filter-status");
    var category = document.getElementById("filter-category");
    var priority = document.getElementById("filter-priority");
    var empty = document.getElementById("issues-empty");
    var info = document.getElementById("table-info");
    var pager = document.getElementById("issues-pagination");

    function matches(row) {
      var q = search ? search.value.trim().toLowerCase() : "";
      var text = row.textContent.toLowerCase();
      if (q && text.indexOf(q) === -1) return false;
      if (status && status.value && row.getAttribute("data-status") !== status.value) return false;
      if (category && category.value && row.getAttribute("data-category") !== category.value) return false;
      if (priority && priority.value && row.getAttribute("data-priority") !== priority.value) return false;
      return true;
    }

    function render() {
      filtered = rows.filter(matches);
      var pages = Math.max(1, Math.ceil(filtered.length / pageSize));
      if (current > pages) current = pages;
      rows.forEach(function (r) { r.classList.add("is-hidden"); });
      filtered.slice((current - 1) * pageSize, current * pageSize)
        .forEach(function (r) { r.classList.remove("is-hidden"); });

      if (empty) empty.classList.toggle("is-hidden", filtered.length !== 0);
      if (info) {
        info.textContent = filtered.length
          ? "Showing " + ((current - 1) * pageSize + 1) + "–" +
            Math.min(current * pageSize, filtered.length) + " of " + filtered.length + " issues"
          : "No issues match your filters";
      }
      renderPager(pages);
    }

    function renderPager(pages) {
      if (!pager) return;
      pager.innerHTML = "";
      pager.appendChild(makeBtn("Previous", current === 1, function () { current--; render(); }));
      for (var i = 1; i <= pages; i++) {
        (function (n) {
          var b = makeBtn(String(n), false, function () { current = n; render(); });
          if (n === current) { b.classList.add("active"); b.setAttribute("aria-current", "page"); }
          pager.appendChild(b);
        })(i);
      }
      pager.appendChild(makeBtn("Next", current === pages, function () { current++; render(); }));
    }

    function makeBtn(label, disabled, onClick) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = label;
      if (disabled) b.disabled = true;
      b.addEventListener("click", onClick);
      return b;
    }

    [search].forEach(function (el) {
      if (el) el.addEventListener("input", CP.debounce(function () { current = 1; render(); }, 180));
    });
    [status, category, priority].forEach(function (el) {
      if (el) el.addEventListener("change", function () { current = 1; render(); });
    });
    var reset = document.getElementById("reset-filters");
    if (reset) {
      CP.on(reset, "click", function () {
        if (search) search.value = "";
        [status, category, priority].forEach(function (s) { if (s) s.value = ""; });
        current = 1; render();
        CP.toast("Filters cleared.", "info");
      });
    }

    /* Column sorting */
    CP.qsa("th.sortable", table).forEach(function (th) {
      var asc = true;
      CP.on(th, "click", function () {
        var idx = Array.prototype.indexOf.call(th.parentNode.children, th);
        rows.sort(function (a, b) {
          var x = a.children[idx].textContent.trim();
          var y = b.children[idx].textContent.trim();
          var nx = parseFloat(x.replace(/[^0-9.]/g, ""));
          var ny = parseFloat(y.replace(/[^0-9.]/g, ""));
          var cmp = (!isNaN(nx) && !isNaN(ny)) ? nx - ny : x.localeCompare(y);
          return asc ? cmp : -cmp;
        });
        var tbody = table.querySelector("tbody");
        rows.forEach(function (r) { tbody.appendChild(r); });
        CP.qsa("th.sortable", table).forEach(function (o) { o.removeAttribute("aria-sort"); });
        th.setAttribute("aria-sort", asc ? "ascending" : "descending");
        asc = !asc;
        render();
      });
      CP.on(th, "keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); th.click(); }
      });
    });

    render();
  }

  /* ---------- Comment box on issue details ---------- */
  function initComments() {
    var form = document.getElementById("comment-form");
    if (!form) return;
    CP.on(form, "submit", function (e) {
      e.preventDefault();
      var input = form.elements.comment;
      if (!input.value.trim()) { CP.setFieldError(input, "Write a comment before posting."); return; }
      CP.setFieldError(input, "");
      var list = document.getElementById("comment-list");
      var item = document.createElement("div");
      item.className = "comment";
      item.innerHTML =
        '<div class="avatar avatar-sm" aria-hidden="true">AR</div>' +
        '<div class="body"><strong>Aarav Rao</strong><time>Just now</time>' +
        "<p></p></div>";
      item.querySelector("p").textContent = input.value;
      list.appendChild(item);
      form.reset();
      CP.toast("Comment posted.", "success");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initGreeting(); initCounters(); initBars(); initDonut();
    initNotifications(); initIssueTable(); initComments();
  });
})(window, document);

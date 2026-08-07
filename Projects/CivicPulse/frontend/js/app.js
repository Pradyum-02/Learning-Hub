/* ============================================================
   CivicPulse — app.js
   Global behaviour shared by every page:
   navbar, sidebar, dropdowns, modals, tabs, accordions,
   smooth scrolling, active-link highlighting, skeleton removal.
   ============================================================ */
(function (window, document) {
  "use strict";
  var CP = window.CP;

  /* ---------- Public navbar (mobile hamburger) ---------- */
  function initNavbar() {
    var toggle = CP.qs(".nav-toggle");
    var links = CP.qs(".nav-links");
    if (!toggle || !links) return;
    CP.on(toggle, "click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  /* ---------- App sidebar (off-canvas on mobile) ---------- */
  function initSidebar() {
    var sidebar = CP.qs(".sidebar");
    var toggle = CP.qs(".sidebar-toggle");
    var backdrop = CP.qs(".sidebar-backdrop");
    if (!sidebar || !toggle) return;

    function setOpen(open) {
      sidebar.classList.toggle("open", open);
      if (backdrop) backdrop.classList.toggle("show", open);
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open && window.innerWidth <= 768 ? "hidden" : "";
    }
    CP.on(toggle, "click", function () { setOpen(!sidebar.classList.contains("open")); });
    CP.on(backdrop, "click", function () { setOpen(false); });
    CP.on(document, "keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
    CP.qsa(".sidebar-nav a").forEach(function (a) {
      CP.on(a, "click", function () { if (window.innerWidth <= 768) setOpen(false); });
    });
  }

  /* ---------- Dropdowns ---------- */
  function initDropdowns() {
    var triggers = CP.qsa("[data-dropdown]");
    triggers.forEach(function (trigger) {
      var menu = document.getElementById(trigger.getAttribute("data-dropdown"));
      if (!menu) return;
      trigger.setAttribute("aria-expanded", "false");
      CP.on(trigger, "click", function (e) {
        e.stopPropagation();
        var open = !menu.classList.contains("show");
        closeAll();
        menu.classList.toggle("show", open);
        trigger.setAttribute("aria-expanded", String(open));
      });
    });
    function closeAll() {
      CP.qsa(".dropdown-menu.show").forEach(function (m) { m.classList.remove("show"); });
      triggers.forEach(function (t) { t.setAttribute("aria-expanded", "false"); });
    }
    CP.on(document, "click", closeAll);
    CP.on(document, "keydown", function (e) { if (e.key === "Escape") closeAll(); });
  }

  /* ---------- Modals ---------- */
  function initModals() {
    var lastFocus = null;
    function open(modal) {
      lastFocus = document.activeElement;
      modal.classList.add("show");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      var focusable = modal.querySelector("button, [href], input, select, textarea");
      if (focusable) focusable.focus();
    }
    function close(modal) {
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }
    CP.qsa("[data-modal-open]").forEach(function (btn) {
      CP.on(btn, "click", function () {
        var m = document.getElementById(btn.getAttribute("data-modal-open"));
        if (m) open(m);
      });
    });
    CP.qsa("[data-modal-close]").forEach(function (btn) {
      CP.on(btn, "click", function () {
        var m = btn.closest(".modal");
        if (m) close(m);
      });
    });
    CP.qsa(".modal").forEach(function (m) {
      CP.on(m, "click", function (e) { if (e.target === m) close(m); });
    });
    CP.on(document, "keydown", function (e) {
      if (e.key !== "Escape") return;
      CP.qsa(".modal.show").forEach(close);
    });
    window.CP.openModal = open;
  }

  /* ---------- Tabs ---------- */
  function initTabs() {
    CP.qsa("[data-tabs]").forEach(function (group) {
      var tabs = CP.qsa(".tab", group);
      tabs.forEach(function (tab) {
        CP.on(tab, "click", function () { activate(tab); });
        CP.on(tab, "keydown", function (e) {
          var i = tabs.indexOf(tab);
          if (e.key === "ArrowRight") { e.preventDefault(); tabs[(i + 1) % tabs.length].focus(); }
          if (e.key === "ArrowLeft") { e.preventDefault(); tabs[(i - 1 + tabs.length) % tabs.length].focus(); }
        });
      });
      function activate(tab) {
        tabs.forEach(function (t) {
          var on = t === tab;
          t.classList.toggle("active", on);
          t.setAttribute("aria-selected", String(on));
          var panel = document.getElementById(t.getAttribute("aria-controls"));
          if (panel) panel.classList.toggle("active", on);
        });
      }
    });
  }

  /* ---------- Accordions ---------- */
  function initAccordions() {
    CP.qsa(".accordion-trigger").forEach(function (trigger) {
      var panel = document.getElementById(trigger.getAttribute("aria-controls"));
      if (!panel) return;
      CP.on(trigger, "click", function () {
        var open = trigger.getAttribute("aria-expanded") === "true";
        trigger.setAttribute("aria-expanded", String(!open));
        panel.style.maxHeight = open ? "0px" : panel.scrollHeight + "px";
      });
    });
  }

  /* ---------- Highlight the current page in navigation ---------- */
  function initActiveLinks() {
    var page = location.pathname.split("/").pop() || "index.html";
    CP.qsa(".nav-links a, .sidebar-nav a, .bottom-nav a").forEach(function (a) {
      var href = a.getAttribute("href");
      if (href && href === page) {
        a.classList.add("active");
        a.setAttribute("aria-current", "page");
      }
    });
  }

  /* ---------- Smooth scrolling for in-page anchors ---------- */
  function initSmoothScroll() {
    CP.qsa('a[href^="#"]').forEach(function (a) {
      CP.on(a, "click", function (e) {
        var id = a.getAttribute("href");
        if (id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  /* ---------- Replace skeleton placeholders once "loaded" ---------- */
  function initSkeletons() {
    var skeletons = CP.qsa("[data-skeleton]");
    if (!skeletons.length) return;
    setTimeout(function () {
      skeletons.forEach(function (sk) {
        sk.classList.add("is-hidden");
        var real = document.getElementById(sk.getAttribute("data-skeleton"));
        if (real) real.classList.remove("is-hidden");
      });
    }, 650);
  }

  /* ---------- Sign out links (demo only) ---------- */
  function initSignOut() {
    CP.qsa("[data-signout]").forEach(function (btn) {
      CP.on(btn, "click", function (e) {
        e.preventDefault();
        CP.toast("You have been signed out.", "success");
        setTimeout(function () { location.href = "login.html"; }, 900);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNavbar(); initSidebar(); initDropdowns(); initModals();
    initTabs(); initAccordions(); initActiveLinks(); initSmoothScroll();
    initSkeletons(); initSignOut();
  });
})(window, document);

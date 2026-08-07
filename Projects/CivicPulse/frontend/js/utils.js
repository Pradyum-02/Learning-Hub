/* ============================================================
   CivicPulse — utils.js
   Small shared helpers used by every page. No dependencies.
   ============================================================ */
(function (window) {
  "use strict";

  var CP = window.CP || {};

  /** querySelector shorthand */
  CP.qs = function (sel, root) { return (root || document).querySelector(sel); };
  /** querySelectorAll shorthand -> real Array */
  CP.qsa = function (sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  };
  /** Attach a delegated listener */
  CP.on = function (el, evt, handler) { if (el) el.addEventListener(evt, handler); };

  /** Format a number with thousand separators */
  CP.formatNumber = function (n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  /** Simple debounce */
  CP.debounce = function (fn, wait) {
    var t;
    return function () {
      var args = arguments, ctx = this;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(ctx, args); }, wait || 200);
    };
  };

  /** Greeting based on local time */
  CP.greeting = function () {
    var h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  /** Inline SVG icon set (no emoji, no icon fonts) */
  var ICONS = {
    check: '<path d="M20 6L9 17l-5-5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    alert: '<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L14.7 3.9a2 2 0 00-3.4 0z"/>',
    close: '<path d="M18 6L6 18M6 6l12 12"/>'
  };

  /** Toast notifications */
  CP.toast = function (message, type) {
    var stack = CP.qs(".toast-stack");
    if (!stack) {
      stack = document.createElement("div");
      stack.className = "toast-stack";
      stack.setAttribute("role", "status");
      stack.setAttribute("aria-live", "polite");
      document.body.appendChild(stack);
    }
    var icon = type === "success" ? ICONS.check
             : type === "error" ? ICONS.alert
             : type === "warning" ? ICONS.alert : ICONS.info;
    var el = document.createElement("div");
    el.className = "toast " + (type || "");
    el.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + icon + "</svg>" +
      "<div>" + message + "</div>";
    stack.appendChild(el);
    requestAnimationFrame(function () { el.classList.add("show"); });
    setTimeout(function () {
      el.classList.remove("show");
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 300);
    }, 3600);
  };

  /** Validators used by auth + report forms */
  CP.validators = {
    required: function (v) { return v.trim().length > 0; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); },
    phone: function (v) { return /^[0-9+\-\s]{10,15}$/.test(v.trim()); },
    govId: function (v) { return /^[A-Za-z0-9]{8,16}$/.test(v.trim()); },
    minLength: function (v, n) { return v.length >= n; }
  };

  /** Show / clear a field error */
  CP.setFieldError = function (input, message) {
    var holder = input.closest(".field");
    var err = holder ? holder.querySelector(".error-text") : null;
    if (message) {
      input.classList.add("is-invalid");
      input.setAttribute("aria-invalid", "true");
      if (err) { err.textContent = message; err.classList.add("show"); }
    } else {
      input.classList.remove("is-invalid");
      input.removeAttribute("aria-invalid");
      if (err) { err.classList.remove("show"); err.textContent = ""; }
    }
  };

  /** Animate a numeric counter (used for stats) */
  CP.countUp = function (el, target, duration) {
    var start = 0, t0 = null, dur = duration || 900;
    function frame(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      el.textContent = CP.formatNumber(Math.floor(start + (target - start) * p));
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  };

  window.CP = CP;
})(window);

/* ============================================================
   CivicPulse — auth.js
   Client-side validation for login + registration (UI only).
   ============================================================ */
(function (window, document) {
  "use strict";
  var CP = window.CP, V = CP.validators;

  function fieldValue(form, name) {
    var el = form.elements[name];
    return el ? el.value : "";
  }

  function submitState(btn, loading) {
    if (!btn) return;
    btn.disabled = loading;
    btn.innerHTML = loading
      ? '<span class="spinner" aria-hidden="true"></span> Please wait'
      : btn.getAttribute("data-label");
  }

  /* ---------- Password visibility toggle ---------- */
  function initReveal() {
    CP.qsa("[data-reveal]").forEach(function (btn) {
      CP.on(btn, "click", function () {
        var input = document.getElementById(btn.getAttribute("data-reveal"));
        if (!input) return;
        var show = input.type === "password";
        input.type = show ? "text" : "password";
        btn.setAttribute("aria-label", show ? "Hide password" : "Show password");
        btn.setAttribute("aria-pressed", String(show));
      });
    });
  }

  /* ---------- Password strength meter ---------- */
  function initMeter() {
    var input = document.getElementById("password");
    var meter = CP.qs(".password-meter i");
    if (!input || !meter) return;
    CP.on(input, "input", function () {
      var v = input.value, score = 0;
      if (v.length >= 8) score++;
      if (/[A-Z]/.test(v)) score++;
      if (/[0-9]/.test(v)) score++;
      if (/[^A-Za-z0-9]/.test(v)) score++;
      var pct = [0, 25, 50, 75, 100][score];
      var color = score <= 1 ? "#DC2626" : score === 2 ? "#F59E0B"
                : score === 3 ? "#3B82F6" : "#16A34A";
      meter.style.width = pct + "%";
      meter.style.background = color;
    });
  }

  /* ---------- Login ---------- */
  function initLogin() {
    var form = document.getElementById("login-form");
    if (!form) return;
    CP.on(form, "submit", function (e) {
      e.preventDefault();
      var ok = true;
      var email = form.elements.email, pass = form.elements.password;

      if (!V.email(email.value)) { CP.setFieldError(email, "Enter a valid email address."); ok = false; }
      else CP.setFieldError(email, "");

      if (!V.minLength(pass.value, 8)) { CP.setFieldError(pass, "Password must be at least 8 characters."); ok = false; }
      else CP.setFieldError(pass, "");

      if (!ok) { CP.toast("Please correct the highlighted fields.", "error"); return; }

      var btn = form.querySelector('button[type="submit"]');
      submitState(btn, true);
      setTimeout(function () {
        submitState(btn, false);
        CP.toast("Signed in successfully. Redirecting…", "success");
        setTimeout(function () { location.href = "dashboard.html"; }, 800);
      }, 900);
    });
  }

  /* ---------- Admin login ---------- */
  function initAdminLogin() {
    var form = document.getElementById("admin-login-form");
    if (!form) return;
    CP.on(form, "submit", function (e) {
      e.preventDefault();
      var ok = true;
      var email = form.elements.adminEmail, pass = form.elements.adminPassword;

      if (!V.email(email.value)) { CP.setFieldError(email, "Enter a valid admin email address."); ok = false; }
      else CP.setFieldError(email, "");

      if (!V.minLength(pass.value, 8)) { CP.setFieldError(pass, "Password must be at least 8 characters."); ok = false; }
      else CP.setFieldError(pass, "");

      if (!ok) { CP.toast("Please correct the admin credentials.", "error"); return; }

      var btn = form.querySelector('button[type="submit"]');
      submitState(btn, true);
      setTimeout(function () {
        submitState(btn, false);
        CP.toast("Admin signed in. Redirecting…", "success");
        setTimeout(function () { location.href = "admin.html"; }, 800);
      }, 900);
    });
  }

  /* ---------- Registration ---------- */
  function initRegister() {
    var form = document.getElementById("register-form");
    if (!form) return;
    CP.on(form, "submit", function (e) {
      e.preventDefault();
      var ok = true;
      var checks = [
        ["fullname", function (v) { return V.minLength(v.trim(), 3); }, "Enter your full name."],
        ["govid", V.govId, "Government ID must be 8–16 letters or numbers."],
        ["email", V.email, "Enter a valid email address."],
        ["phone", V.phone, "Enter a valid phone number."],
        ["password", function (v) { return V.minLength(v, 8); }, "Use at least 8 characters."]
      ];
      checks.forEach(function (c) {
        var el = form.elements[c[0]];
        if (!el) return;
        if (!c[1](el.value)) { CP.setFieldError(el, c[2]); ok = false; }
        else CP.setFieldError(el, "");
      });

      var pass = form.elements.password, confirm = form.elements.confirm;
      if (confirm.value !== pass.value || !confirm.value) {
        CP.setFieldError(confirm, "Passwords do not match."); ok = false;
      } else CP.setFieldError(confirm, "");

      var terms = form.elements.terms;
      if (terms && !terms.checked) { ok = false; CP.toast("Please accept the terms to continue.", "warning"); }

      if (!ok) return;

      var btn = form.querySelector('button[type="submit"]');
      submitState(btn, true);
      setTimeout(function () {
        submitState(btn, false);
        CP.toast("Account created. Please sign in.", "success");
        setTimeout(function () { location.href = "login.html"; }, 900);
      }, 1000);
    });
  }

  /* ---------- Forgot password modal ---------- */
  function initForgot() {
    var form = document.getElementById("forgot-form");
    if (!form) return;
    CP.on(form, "submit", function (e) {
      e.preventDefault();
      var email = form.elements.resetEmail;
      if (!V.email(email.value)) { CP.setFieldError(email, "Enter a valid email address."); return; }
      CP.setFieldError(email, "");
      var modal = form.closest(".modal");
      if (modal) { modal.classList.remove("show"); modal.setAttribute("aria-hidden", "true"); }
      document.body.style.overflow = "";
      CP.toast("Reset instructions sent to " + email.value + ".", "success");
      form.reset();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initReveal(); initMeter(); initLogin(); initAdminLogin(); initRegister(); initForgot();
    // Preserve original button labels for the loading state.
    CP.qsa('button[type="submit"]').forEach(function (b) {
      if (!b.getAttribute("data-label")) b.setAttribute("data-label", b.innerHTML);
    });
  });
})(window, document);

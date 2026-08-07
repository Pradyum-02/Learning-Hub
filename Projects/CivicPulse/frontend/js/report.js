/* ============================================================
   CivicPulse — report.js
   Multi-step progress indicator, image preview, geolocation
   placeholder and validation for the report form.
   ============================================================ */
(function (window, document) {
  "use strict";
  var CP = window.CP;

  function initStepper() {
    var form = document.getElementById("report-form");
    if (!form) return;
    var dots = CP.qsa(".stepper .step-dot");
    var lines = CP.qsa(".stepper .line");

    function setStep(n) {
      dots.forEach(function (d, i) {
        d.classList.toggle("active", i === n);
        d.classList.toggle("done", i < n);
      });
      lines.forEach(function (l, i) { l.classList.toggle("done", i < n); });
    }

    function currentStep() {
      var hasCategory = !!form.querySelector('input[name="category"]:checked');
      var hasLocation = form.elements.location.value.trim().length > 3;
      var hasDetails = form.elements.description.value.trim().length > 15;
      if (!hasCategory) return 0;
      if (!hasLocation) return 1;
      if (!hasDetails) return 2;
      return 3;
    }

    form.addEventListener("input", function () { setStep(currentStep()); });
    form.addEventListener("change", function () { setStep(currentStep()); });
    setStep(0);
  }

  /* ---------- Image upload preview (client-side only) ---------- */
  function initUpload() {
    var zone = document.getElementById("dropzone");
    var input = document.getElementById("photos");
    var grid = document.getElementById("preview-grid");
    if (!zone || !input || !grid) return;

    CP.on(zone, "click", function () { input.click(); });
    CP.on(zone, "keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); input.click(); }
    });
    ["dragenter", "dragover"].forEach(function (evt) {
      zone.addEventListener(evt, function (e) { e.preventDefault(); zone.classList.add("dragover"); });
    });
    ["dragleave", "drop"].forEach(function (evt) {
      zone.addEventListener(evt, function (e) { e.preventDefault(); zone.classList.remove("dragover"); });
    });
    zone.addEventListener("drop", function (e) { addFiles(e.dataTransfer.files); });
    CP.on(input, "change", function () { addFiles(input.files); });

    function addFiles(files) {
      Array.prototype.slice.call(files).slice(0, 4).forEach(function (file) {
        if (!/^image\//.test(file.type)) { CP.toast("Only image files are supported.", "warning"); return; }
        var reader = new FileReader();
        reader.onload = function (ev) {
          var item = document.createElement("div");
          item.className = "preview-item";
          item.innerHTML =
            '<img alt="Selected evidence photo" loading="lazy">' +
            '<button type="button" aria-label="Remove photo">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
            'stroke-linecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg></button>';
          item.querySelector("img").src = ev.target.result;
          item.querySelector("button").addEventListener("click", function () {
            grid.removeChild(item);
          });
          grid.appendChild(item);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  /* ---------- "Use my location" placeholder ---------- */
  function initLocate() {
    var btn = document.getElementById("locate-btn");
    var field = document.getElementById("location");
    if (!btn || !field) return;
    CP.on(btn, "click", function () {
      btn.disabled = true;
      var label = btn.innerHTML;
      btn.innerHTML = '<span class="spinner spinner-dark" aria-hidden="true"></span> Locating';
      setTimeout(function () {
        btn.disabled = false;
        btn.innerHTML = label;
        field.value = "MG Road, Ward 12, Sector 4";
        var coords = document.getElementById("coords");
        if (coords) coords.textContent = "Detected coordinates: 12.9716° N, 77.5946° E";
        CP.toast("Location detected from your device.", "success");
      }, 900);
    });
  }

  /* ---------- Submit validation ---------- */
  function initSubmit() {
    var form = document.getElementById("report-form");
    if (!form) return;
    CP.on(form, "submit", function (e) {
      e.preventDefault();
      var ok = true;
      if (!form.querySelector('input[name="category"]:checked')) {
        ok = false; CP.toast("Select an issue category.", "error");
      }
      var loc = form.elements.location;
      if (loc.value.trim().length < 4) { CP.setFieldError(loc, "Enter the issue location."); ok = false; }
      else CP.setFieldError(loc, "");

      var desc = form.elements.description;
      if (desc.value.trim().length < 20) {
        CP.setFieldError(desc, "Describe the issue in at least 20 characters."); ok = false;
      } else CP.setFieldError(desc, "");

      if (!ok) return;

      var btn = form.querySelector('button[type="submit"]');
      var label = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner" aria-hidden="true"></span> Submitting';
      setTimeout(function () {
        btn.disabled = false;
        btn.innerHTML = label;
        var modal = document.getElementById("success-modal");
        if (modal && window.CP.openModal) window.CP.openModal(modal);
        else CP.toast("Report submitted.", "success");
      }, 1100);
    });

    var reset = document.getElementById("clear-form");
    if (reset) {
      CP.on(reset, "click", function () {
        form.reset();
        var grid = document.getElementById("preview-grid");
        if (grid) grid.innerHTML = "";
        CP.toast("Draft cleared.", "info");
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initStepper(); initUpload(); initLocate(); initSubmit();
  });
})(window, document);

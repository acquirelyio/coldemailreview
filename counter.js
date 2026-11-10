// Free visitor counter (abacus.jasoncameron.dev, no account needed).
(function () {
  var el = document.getElementById("visits");
  if (!el) return;
  fetch("https://abacus.jasoncameron.dev/hit/coldemailreview.com/visits")
    .then(function (r) { return r.json(); })
    .then(function (d) {
      if (typeof d.value === "number") el.textContent = d.value.toLocaleString() + " visits";
    })
    .catch(function () {});
})();

// Shared page behaviour: header shadow, mobile menu, mobile CTA bar, table of contents highlight.
(function () {
  var hd = document.querySelector(".hd"), body = document.body;
  function onScroll() { if (hd) hd.classList.toggle("up", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  var burger = document.querySelector(".burger");
  if (burger) {
    burger.addEventListener("click", function () {
      var open = body.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".mnav a").forEach(function (a) {
      a.addEventListener("click", function () { body.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); });
    });
  }

  // Mobile CTA: shows after the hero, hides while the finder or footer is on screen.
  var mcta = document.querySelector(".mcta");
  if (mcta && "IntersectionObserver" in window) {
    var seen = {};
    var targets = document.querySelectorAll("[data-hide-cta]");
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { seen[e.target.dataset.hideCta] = e.isIntersecting; });
      var hide = Object.keys(seen).some(function (k) { return seen[k]; });
      mcta.classList.toggle("show", !hide);
    });
    targets.forEach(function (t) { io.observe(t); });
  }

  // Table of contents: highlight the section being read.
  var links = document.querySelectorAll(".toc a[href^='#']");
  if (links.length && "IntersectionObserver" in window) {
    var map = {};
    links.forEach(function (a) { var s = document.getElementById(a.getAttribute("href").slice(1)); if (s) map[s.id] = a; });
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove("on"); });
        if (map[e.target.id]) map[e.target.id].classList.add("on");
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    Object.keys(map).forEach(function (id) { spy.observe(document.getElementById(id)); });
  }
})();

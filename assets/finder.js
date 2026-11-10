// "Find your tool" quiz. Three questions, scored from the "Which one should you pick?"
// section of the comparison. Renders into every element with [data-finder].
(function () {
  var R = "/reviews/instantly-vs-smartlead-vs-acquirely/";
  var TOOLS = {
    I: { name: "Instantly", tile: "#2b5cff", why: "The biggest name, with a 450M+ lead database and many AI agents. Sending and leads are separate plans, so budget for both.", from: "From $47/mo", review: R + "#instantly", site: "https://instantly.ai/pricing" },
    S: { name: "Smartlead", tile: "#6a3df0", why: "The most sending per dollar (90,000 sends on the $94 Pro plan), with deep options to buy your own mailboxes and servers.", from: "From $39/mo", review: R + "#smartlead", site: "https://www.smartlead.ai/pricing" },
    A: { name: "Acquirely", tile: "#1c1418", why: "One price covers sending, warm-up, AI replies and placement tests; you pay only for verified leads. Newer and smaller than the other two.", from: "From $29/mo", review: R + "#acquirely", site: "https://acquirely.io/pricing" }
  };
  var QS = [
    { q: "What matters most to you?", o: [["A huge lead database", { I: 2 }], ["The most sends for the money", { S: 2 }], ["One price that covers everything", { A: 2 }]] },
    { q: "How many emails will you send a month?", o: [["Under 10,000", { A: 1, I: 1 }], ["10,000 to 100,000", { S: 1, I: 1 }], ["Over 100,000", { S: 2 }]] },
    { q: "Do you want to buy and run your own mailboxes and servers?", o: [["Yes, I want control", { S: 1 }], ["No, keep it simple", { A: 1, I: 1 }]] }
  ];

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

  function mount(root) {
    var step = 0, picks = [];
    function tally() {
      var s = { I: 0, S: 0, A: 0 };
      picks.forEach(function (p) { for (var k in p) s[k] += p[k]; });
      return s;
    }
    function render() {
      root.innerHTML = "";
      if (step < QS.length) {
        root.appendChild(el("div", "fd-step", "Question " + (step + 1) + " of " + QS.length));
        root.appendChild(el("div", "fd-q", QS[step].q));
        var opts = el("div", "fd-opts");
        QS[step].o.forEach(function (o) {
          var b = el("button", "fd-btn", o[0]);
          b.type = "button";
          b.onclick = function () { picks[step] = o[1]; step++; render(); };
          opts.appendChild(b);
        });
        root.appendChild(opts);
        var foot = el("div", "fd-foot");
        var bar = el("div", "fd-bar"); bar.appendChild(el("i")); bar.firstChild.style.width = ((step + 1) / QS.length * 100) + "%";
        foot.appendChild(bar);
        if (step > 0) {
          var back = el("button", "fd-back", "← Back"); back.type = "button";
          back.onclick = function () { step--; picks.length = step; render(); };
          foot.appendChild(back);
        }
        root.appendChild(foot);
        return;
      }
      var score = tally();
      var order = ["I", "S", "A"].sort(function (a, b) { return score[b] - score[a]; }), t = TOOLS[order[0]], alt = TOOLS[order[1]];
      var res = el("div", "fd-res");
      res.innerHTML = '<div class="fd-step">Your best fit</div>' +
        '<div class="fd-name"><span class="fd-tile" style="background:' + t.tile + '">' + t.name[0] + "</span>" + t.name + '<small>' + t.from + "</small></div>" +
        '<p class="fd-why">' + t.why + "</p>" +
        '<div class="fd-cta"><a class="fd-go" href="' + t.review + '">Read our take</a><a class="fd-alt" href="' + t.site + '" rel="nofollow">Their pricing ↗</a></div>' +
        '<div class="fd-also">Also worth a look: <a href="' + alt.review + '">' + alt.name + "</a> (" + alt.from.toLowerCase() + ")</div>";
      var again = el("button", "fd-again", "Start again"); again.type = "button";
      again.onclick = function () { step = 0; picks = []; render(); };
      res.appendChild(again);
      root.appendChild(res);
    }
    render();
  }
  document.querySelectorAll("[data-finder]").forEach(mount);
})();

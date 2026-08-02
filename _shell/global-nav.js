/* 统一外壳：顶部跨导航 + 底部引流条。路径自动适配页面深度。 */
(function () {
  // 把 CTA 换成你的真实会员站链接（小鹅通/知识星球/独立站）
  var CTA_URL = "https://your-membership-link.example.com";
  var CTA_TEXT = "完整体系在这里 →";

  // 当前页面深度：/index.html -> 0; /pages/cope.html -> 1; /pages/cases/x.html -> 2
  var p = location.pathname.replace(/index\.html$/, "");
  var depth = (p.match(/\//g) || []).length - 1; // 仓库根下的斜杠数
  if (depth < 0) depth = 0;
  if (depth > 2) depth = 2;
  var R = "../".repeat(depth); // 指向仓库根

  var nav = document.createElement("header");
  nav.className = "gn-bar";
  nav.innerHTML =
    '<div class="gn-inner">' +
    '<a class="gn-brand" href="' + R + 'index.html">面对网暴 · 专题</a>' +
    '<a class="gn-link" href="' + R + 'pages/cope.html">总论 / 应对</a>' +
    '<a class="gn-link" href="' + R + 'pages/cases.html">案例库</a>' +
    '<a class="gn-link" href="' + R + 'pages/read.html">拓展阅读</a>' +
    '<a class="gn-cta" href="' + CTA_URL + '" target="_blank" rel="noopener">进会员站</a>' +
    '<button class="gn-burger" aria-label="菜单">≡</button>' +
    "</div>";
  document.body.insertBefore(nav, document.body.firstChild);

  // 底部引流条（滚动后出现）
  var band = document.createElement("div");
  band.className = "cta-band";
  band.innerHTML =
    '<div class="cta-inner">' +
    '<div class="txt">这篇对你有用？<b>善良的人如何系统应对网暴</b>的完整体系，在会员站持续更新。</div>' +
    '<a class="btn" href="' + CTA_URL + '" target="_blank" rel="noopener">' + CTA_TEXT + "</a>" +
    '<button class="cta-close" aria-label="关闭">×</button>' +
    "</div>";
  document.body.appendChild(band);

  var shown = false;
  function onScroll() {
    if (!shown && window.scrollY > 600) {
      band.classList.add("show");
      shown = true;
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  band.querySelector(".cta-close").addEventListener("click", function () {
    band.classList.remove("show");
  });
})();

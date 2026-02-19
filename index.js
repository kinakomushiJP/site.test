document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ヘッダーボタン：スクロール
  ========================= */
  document.querySelectorAll("[data-scroll]").forEach(button => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.scroll;
      const target = document.getElementById(targetId);
      if (!target) return;

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  /* =========================
     ライト / ダークモード
  ========================= */
  const lightBtn = document.querySelector(".header .light");
  const darkBtn  = document.querySelector(".header .dark");
  const img = document.getElementById("server-img");

  function fadeImage(src) {
    if (!img) return;
    img.style.opacity = 0;
    setTimeout(() => {
      img.src = src;
      img.style.opacity = 1;
    }, 300);
  }

  // 初期テーマ
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    fadeImage("image/main_dark.png");
  } else {
    document.body.classList.remove("light-mode");
    fadeImage("image/main_light.png");
  }

  // ライト
  lightBtn.addEventListener("click", () => {
    document.body.classList.add("light-mode");
    fadeImage("image/main_dark.png");
    localStorage.setItem("theme", "light");
  });

  // ダーク
  darkBtn.addEventListener("click", () => {
    document.body.classList.remove("light-mode");
    fadeImage("image/main_light.png");
    localStorage.setItem("theme", "dark");
  });

});

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     共通要素取得
  ========================= */
  const serverImg = document.getElementById("server-img");
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  /* =========================
     セクションスクロール
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
     ヘッダーアイコン設定
  ========================= */
  const iconMap = {
    home: {
      light: "https://github.com/kinakomushiJP/kinakomushi.discord/blob/main/image/home_light.png?raw=true",
      dark:  "https://github.com/kinakomushiJP/kinakomushi.discord/blob/main/image/home_dark.png?raw=true"
    },
    admin: {
      light: "https://github.com/kinakomushiJP/kinakomushi.discord/blob/main/image/admin_light.png?raw=true",
      dark:  "https://github.com/kinakomushiJP/kinakomushi.discord/blob/main/image/admin_dark.png?raw=true"
    },
    otoiawase: {
      light: "https://github.com/kinakomushiJP/kinakomushi.discord/blob/main/image/otoiawase_light.png?raw=true",
      dark:  "https://github.com/kinakomushiJP/kinakomushi.discord/blob/main/image/otoiawase_dark.png?raw=true"
    },
    version: {
      light: "https://github.com/kinakomushiJP/kinakomushi.discord/blob/main/image/kousin_light.png?raw=true",
      dark:  "https://github.com/kinakomushiJP/kinakomushi.discord/blob/main/image/kousin_dark.png?raw=true"
    }
  };

  function updateHeaderIcons(theme) {
    document.querySelectorAll(".header button[data-icon]").forEach(btn => {
      const type = btn.dataset.icon;
      const img = btn.querySelector(".icon");
      if (!iconMap[type] || !img) return;

      img.style.opacity = 0;
      setTimeout(() => {
        img.src = iconMap[type][theme];
        img.style.opacity = 1;
      }, 200);
    });
  }

  /* =========================
     テーマ切替（1ボタン）
  ========================= */
  const themeIcons = {
    light: "https://github.com/kinakomushiJP/kinakomushi.discord/blob/main/image/light_mode.png?raw=true",
    dark:  "https://github.com/kinakomushiJP/kinakomushi.discord/blob/main/image/dark_mode.png?raw=true"
  };

  function setTheme(theme) {
    // フェードアウト
    themeIcon.style.opacity = 0;
    if (serverImg) serverImg.style.opacity = 0;

    setTimeout(() => {
      if (theme === "light") {
        document.body.classList.add("light-mode");
        themeIcon.src = themeIcons.light;
        if (serverImg) serverImg.src = "image/main_dark.png";
      } else {
        document.body.classList.remove("light-mode");
        themeIcon.src = themeIcons.dark;
        if (serverImg) serverImg.src = "image/main_light.png";
      }

      // フェードイン
      themeIcon.style.opacity = 1;
      if (serverImg) serverImg.style.opacity = 1;

      localStorage.setItem("theme", theme);
      updateHeaderIcons(theme);
    }, 300);
  }

  /* =========================
     初期化
  ========================= */
  const savedTheme = localStorage.getItem("theme") || "dark";
  setTheme(savedTheme);

  /* =========================
     テーマ切替クリック
  ========================= */
  themeToggleBtn.addEventListener("click", () => {
    const isLight = document.body.classList.contains("light-mode");
    setTheme(isLight ? "dark" : "light");
  });

});

document.addEventListener("DOMContentLoaded", () => {
  const sections = Array.from(document.querySelectorAll(".scroll-section"));
  let currentActive = null;
  let observer = null;

  function activateSection(section) {
    if (currentActive === section) return;

    if (currentActive) {
      currentActive.classList.remove("active");
    }

    section.classList.add("active");
    currentActive = section;
  }

  function createObserver() {
    if (observer) observer.disconnect();

    observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .map(e => {
            const rect = e.target.getBoundingClientRect();
            const centerY = rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            return {
              el: e.target,
              distance: Math.abs(centerY - viewportCenter)
            };
          });

        if (visible.length === 0) return;

        // 画面中央に一番近い section を選ぶ
        visible.sort((a, b) => a.distance - b.distance);
        activateSection(visible[0].el);
      },
      {
        root: null,
        rootMargin: "-30% 0px -30% 0px",
        threshold: 0
      }
    );

    sections.forEach(sec => observer.observe(sec));
  }

  createObserver();

  /* 初期表示保証 */
  if (sections.length > 0) {
    activateSection(sections[0]);
  }

  /* resize・回転対応（超重要） */
  window.addEventListener("resize", () => {
    createObserver();
  });
});

/* =========================
   スピード依存モーションブラー
========================= */

let cursor = null;

if (!isTouchDevice()) {

  cursor = document.createElement("div");
  cursor.id = "custom-cursor";
  document.body.appendChild(cursor);

  /* 通常カーソル無効化 */
  document.body.style.cursor = "none";
  document.querySelectorAll("*").forEach(el => {
    el.style.cursor = "none";
  });

}

let mouseX = innerWidth / 2;
let mouseY = innerHeight / 2;
let currentX = mouseX;
let currentY = mouseY;

let lastX = mouseX;
let lastY = mouseY;

if (!isTouchDevice()) {

if (!isTouchDevice()) {
let mouseX = innerWidth / 2;
let mouseY = innerHeight / 2;
let currentX = mouseX;
let currentY = mouseY;
let lastX = mouseX;
let lastY = mouseY;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  const dx = mouseX - lastX;
  const dy = mouseY - lastY;
  const speed = Math.sqrt(dx * dx + dy * dy);

  /* ブラー：かなり弱め＋低上限 */
  const blur = Math.min(speed * 0.1, 3);

  cursor.style.filter = `blur(${blur}px)`;

  lastX = mouseX;
  lastY = mouseY;
});

function animate() {
  currentX += (mouseX - currentX) * 0.12;
  currentY += (mouseY - currentY) * 0.12;

  cursor.style.left = `${currentX}px`;
  cursor.style.top  = `${currentY}px`;

  requestAnimationFrame(animate);
}
animate();
}

function animate() {
  if (!cursor) return;

  currentX += (mouseX - currentX) * 0.12;
  currentY += (mouseY - currentY) * 0.12;

  cursor.style.left = `${currentX}px`;
  cursor.style.top  = `${currentY}px`;

  requestAnimationFrame(animate);
}
animate();

}

/* ホバー演出 */
document.querySelectorAll("a, button").forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
  });
  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
  });
});

/* =========================
   本来のマウス位置の青い点
========================= */

let dot = null;

if (!isTouchDevice()) {
  dot = document.createElement("div");
  dot.id = "cursor-dot";
  document.body.appendChild(dot);
}

window.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  /* 小さい点は遅れず即座に追従 */
  if (dot) {
    dot.style.left = `${mouseX}px`;
    dot.style.top  = `${mouseY}px`;
  }

  const dx = mouseX - lastX;
  const dy = mouseY - lastY;
  const speed = Math.sqrt(dx * dx + dy * dy);

  const blur = Math.min(speed * 0.08, 2); // ← 弱め
  if (cursor) {
    cursor.style.filter = `blur(${blur}px)`;
  }

  lastX = mouseX;
  lastY = mouseY;
});

const form = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // ← 二重送信防止の要

  // 二重送信防止
  if (submitBtn.disabled) return;
  submitBtn.disabled = true;
  submitBtn.textContent = "送信中…";

  const nameInput = document.getElementById("name");
  const emailInput = form.querySelector('input[name="email"]');
  const messageInput = document.getElementById("message");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const originalMessage = messageInput.value;

  // 送信用メッセージを生成
  let sendMessage = originalMessage;
  if (name !== "") {
    sendMessage = originalMessage;
  }

  try {
    /* =========================
       ① Formspree（メール）
    ========================= */
    await fetch(form.action, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        message: sendMessage
      })
    });

/* =========================
   ② Discord Webhook（Embed）
========================= */
await fetch("https://discord.com/api/webhooks/1477218371958472724/WT_O6AVWs4jNa1fGfvVo2AZ8LLd7OK4DEespF54El7MQwEAJk6bXbRk7b3FKiyGBvNa7", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    username: "お問い合わせフォーム",

    // 👇 ここが重要（メンション）
    content: "<@1338042027878645762> 新しいお問い合わせが届きました",

    embeds: [
      {
        title: "📩 新しいお問い合わせ",
        color: 0x4aa3ff,
        fields: [
          {
            name: "👤 名前",
            value: name || "未入力",
            inline: true
          },
          {
  name: "📧 メール",
  value: email || "未入力",
  inline: true
          },
          {
            name: "📝 メッセージ",
            value: originalMessage
          }
        ],
        timestamp: new Date().toISOString()
      }
    ]
  })
});

    /* =========================
       成功時
    ========================= */
    showAlert("送信が完了しました！");
    form.reset();

  } catch (err) {
    showAlert("送信に失敗しました。再度お試しください。", true);
    submitBtn.disabled = false;
    submitBtn.textContent = "送信";
    return;
  }

  // ボタン復帰（再送信可能に）
  submitBtn.disabled = false;
  submitBtn.textContent = "送信";
});

function showAlert(message, isError = false) {
  const alertBox = document.getElementById("custom-alert");
  const alertText = alertBox.querySelector(".alert-text");
  const alertIcon = alertBox.querySelector(".alert-icon");

  alertText.textContent = message;

  if (isError) {
    alertBox.classList.add("error");
    alertIcon.textContent = "✖";
  } else {
    alertBox.classList.remove("error");
    alertIcon.textContent = "✔";
  }

  alertBox.classList.add("show");

  setTimeout(() => {
    alertBox.classList.remove("show");
  }, 3000);
}

function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
  );
}

if (!isTouchDevice()) {
  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
    });
  });
}

if (!isTouchDevice()) {
  window.addEventListener("mousemove", (e) => {
    if (!dot) return;

    dot.style.left = `${e.clientX}px`;
    dot.style.top  = `${e.clientY}px`;
  });
}

if (!isTouchDevice()) {
  window.addEventListener("mousedown", (e) => {
    const ripple = document.createElement("div");
    ripple.className = "cursor-ripple";

    ripple.style.left = `${e.clientX}px`;
    ripple.style.top  = `${e.clientY}px`;

    document.body.appendChild(ripple);

    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });
  });
}
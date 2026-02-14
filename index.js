const menuContainer = document.querySelector('.menu-container');

let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // メニューが開いているときは隠さない（重要）
    if (menu.classList.contains('open')) return;

    // 下にスクロール → 非表示
    if (currentScrollY > lastScrollY && currentScrollY > 10) {
        menuContainer.classList.add('hide');
    }
    // 上にスクロール → 表示
    else {
        menuContainer.classList.remove('hide');
    }

    lastScrollY = currentScrollY;
});

const menu = document.querySelector('.menu');
const toggle = document.querySelector('.menu-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const lightButton = document.querySelector('.menu .light');
const darkButton = document.querySelector('.menu .dark');
const serverImg = document.getElementById('server-img');

// メニュー開閉
menuToggle.addEventListener('click', () => {
  menu.classList.toggle('open');
});

// フェードで画像切り替え
function fadeImage(newSrc) {
  serverImg.style.opacity = 0;
  setTimeout(() => {
    serverImg.src = newSrc;
    serverImg.style.opacity = 1;
  }, 300);
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  const savedMode = localStorage.getItem('theme');

  if (savedMode === 'light') {
    // ライトモード → 暗い画像
    document.body.classList.add('light-mode');
    fadeImage('image/main_dark.png');
  } else {
    // ダークモード → 明るい画像
    document.body.classList.remove('light-mode');
    fadeImage('image/main_light.png');
  }
});

// ライトモード
lightButton.addEventListener('click', () => {
  document.body.classList.add('light-mode');
  fadeImage('image/main_dark.png');
  localStorage.setItem('theme', 'light');
});

// ダークモード
darkButton.addEventListener('click', () => {
  document.body.classList.remove('light-mode');
  fadeImage('image/main_light.png');
  localStorage.setItem('theme', 'dark');
});

document.addEventListener('click', (e) => {
    // メニューが開いていないなら何もしない
    if (!menu.classList.contains('open')) return;

    // メニューコンテナの外をクリックしたか？
    if (!menuContainer.contains(e.target)) {
        menu.classList.remove('open');
    }
});

// メニュー内スクロールボタン
document.querySelectorAll('[data-scroll]').forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.dataset.scroll;
        const target = document.getElementById(targetId);

        if (!target) return;

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // メニューを閉じる
        menu.classList.remove('open');
    });
});

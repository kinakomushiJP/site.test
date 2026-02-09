const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const lightButton = document.querySelector('.menu .light');
const darkButton = document.querySelector('.menu .dark');
const serverImg = document.getElementById('server-img');

// メニュー開閉
menuToggle.addEventListener('click', () => {
    menu.classList.toggle('open');
});

// フェード切り替え
function fadeImage(newSrc) {
    if (!serverImg) return;

    serverImg.style.opacity = 0;
    setTimeout(() => {
        serverImg.src = newSrc;
        serverImg.style.opacity = 1;
    }, 300);
}

// 初期読み込み
document.addEventListener('DOMContentLoaded', () => {
    const savedMode = localStorage.getItem('theme');

    if (savedMode === 'light') {
        document.body.classList.add('light-mode');
        fadeImage('image/main_light.png');
    } else {
        document.body.classList.remove('light-mode');
        fadeImage('image/main_dark.png');
    }
});

// ライト
lightButton.addEventListener('click', () => {
    document.body.classList.add('light-mode');
    fadeImage('image/main_light.png');
    localStorage.setItem('theme', 'light');
});

// ダーク
darkButton.addEventListener('click', () => {
    document.body.classList.remove('light-mode');
    fadeImage('image/main_dark.png');
    localStorage.setItem('theme', 'dark');
});
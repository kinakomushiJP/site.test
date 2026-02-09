// theme-switcher.js

const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const lightButton = document.querySelector('.menu .light');
const darkButton = document.querySelector('.menu .dark');
const serverImg = document.getElementById('server-img');

// メニュー開閉
menuToggle.addEventListener('click', () => {
    menu.classList.toggle('open');
});

// 画像をフェードで切り替える関数
function fadeImage(newSrc) {
    serverImg.style.opacity = 0;
    setTimeout(() => {
        serverImg.src = newSrc;
        serverImg.style.opacity = 1;
    }, 300);
}

// ページ読み込み時に保存されたモードを反映
document.addEventListener('DOMContentLoaded', () => {
    const savedMode = localStorage.getItem('theme'); // 'light' または 'dark'
    if(savedMode === 'light') {
        document.body.classList.add('light-mode');
        fadeImage('image/main_dark.png');
    } else {
        document.body.classList.remove('light-mode');
        fadeImage('image/main_light.png');
    }
});

// ライトモード
lightButton.addEventListener('click', () => {
    document.body.classList.add('light-mode');
    fadeImage('image.main_dark.png');
    localStorage.setItem('theme', 'light'); // 保存
});

// ダークモード
darkButton.addEventListener('click', () => {
    document.body.classList.remove('light-mode');
    fadeImage('image/main_light.png');
    localStorage.setItem('theme', 'dark'); // 保存
});

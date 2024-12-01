import { $, $$, initTimeUpdate, handleScroll, handleTouch } from './utils.js';

// 导航链接点击处理
function handleNavClick(e, isNavPanel = false) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const targetElement = $(targetId);
    
    if (targetElement) {
        if (isNavPanel) {
            document.body.classList.remove('nav-visible');
            requestAnimationFrame(() => handleScroll(targetElement));
        } else {
            handleScroll(targetElement);
        }
    }
}

// 初始化导航功能
function initNavigation() {
    const body = document.body;
    const navToggle = $('.nav-toggle');
    const content = $('.content');

    // 导航切换按钮
    navToggle?.addEventListener('click', () => body.classList.toggle('nav-visible'));

    // 内容区域点击关闭导航
    content?.addEventListener('click', () => body.classList.remove('nav-visible'));

    // 导航链接点击处理
    $$('.left-nav a, .right-nav a').forEach(link => {
        link.addEventListener('click', e => {
            handleNavClick(e);
            if (window.innerWidth <= 768) {
                body.classList.remove('nav-visible');
            }
        });
    });

    // 触摸滑动支持
    handleTouch(document, {
        onSwipeRight: () => body.classList.add('nav-visible'),
        onSwipeLeft: () => body.classList.remove('nav-visible')
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initTimeUpdate();
    initNavigation();
}); 
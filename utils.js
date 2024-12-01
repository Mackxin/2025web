// DOM 工具函数
export const $ = selector => document.querySelector(selector);
export const $$ = selector => document.querySelectorAll(selector);

// 时间更新功能
export function initTimeUpdate(elementId = 'current-time') {
    const timeElement = document.getElementById(elementId);
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    
    function updateTime() {
        const now = new Date();
        const time = now.toLocaleTimeString('zh-CN', { hour12: false });
        const weekday = weekdays[now.getDay()];
        timeElement.textContent = `${time} ${weekday}`;
    }

    updateTime();
    return setInterval(updateTime, 1000);
}

// 平滑滚动处理
export function handleScroll(targetElement, offset = 10) {
    const headerHeight = $('header').offsetHeight;
    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerHeight - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// 触摸滑动处理
export function handleTouch(element, options = {}) {
    const { threshold = 50, onSwipeLeft, onSwipeRight } = options;
    let touchStartX = 0;

    element.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    element.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].screenX;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > threshold) {
            if (swipeDistance > 0 && onSwipeRight) {
                onSwipeRight();
            } else if (swipeDistance < 0 && onSwipeLeft) {
                onSwipeLeft();
            }
        }
    });
}

// 防抖函数
export function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
export function throttle(func, limit = 300) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
} 
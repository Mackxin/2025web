// 广告卡片关闭功能
document.addEventListener('DOMContentLoaded', function() {
    const cardTags = document.querySelectorAll('.card-tag');
    
    cardTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const adCard = this.closest('.content-card');
            if (adCard) {
                // 获取元素高度，用于动画
                const height = adCard.offsetHeight;
                adCard.style.height = height + 'px';
                adCard.style.transition = 'all 0.3s ease';
                
                // 触发回流，确保高度设置生效
                void adCard.offsetHeight;
                
                // 添加隐藏类并设置高度为0
                adCard.classList.add('hide');
                adCard.style.height = '0';
                adCard.style.margin = '0';
                adCard.style.padding = '0';
                
                // 动画结束后移除元素
                setTimeout(() => {
                    adCard.remove();
                    // 平滑滚动到正确位置
                    window.scrollTo({
                        top: window.scrollY - height,
                        behavior: 'smooth'
                    });
                }, 300);
            }
        });
    });
});

// 时间轴展开/收起功能
document.addEventListener('DOMContentLoaded', function() {
    const dates = document.querySelectorAll('.date');
    const toggleAll = document.querySelector('.toggle-all');
    let isAllVisible = true;  // 跟踪全局显示状态
    
    // 日期点击事件
    dates.forEach(date => {
        date.addEventListener('click', function(e) {
            e.stopPropagation();  // 防止事件冒泡到标题
            const content = this.nextElementSibling;
            if (!content || !content.classList.contains('timeline-content')) return;
            
            // 切换当前内容的显示/隐藏状态
            content.classList.toggle('hidden');
        });
    });
    
    // 标题点击事件 - 控制全部显示/隐藏
    if (toggleAll) {
        toggleAll.addEventListener('click', function() {
            const allContents = document.querySelectorAll('.timeline-content');
            isAllVisible = !isAllVisible;  // 切换状态
            
            allContents.forEach(content => {
                if (isAllVisible) {
                    content.classList.remove('hidden');
                } else {
                    content.classList.add('hidden');
                }
            });
        });
    }
});

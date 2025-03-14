// 音乐控制
document.addEventListener('DOMContentLoaded', function() {
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('toggleMusic');
    let isMusicPlaying = false;

    // 音乐控制按钮点击事件
    musicToggle.addEventListener('click', function() {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicToggle.classList.add('paused');
        } else {
            bgMusic.play();
            musicToggle.classList.remove('paused');
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // 自动播放策略
    document.addEventListener('click', function() {
        if (!isMusicPlaying) {
            bgMusic.play();
            musicToggle.classList.remove('paused');
            isMusicPlaying = true;
        }
    }, { once: true });

    // 视频控制
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        // 鼠标悬停时播放
        video.addEventListener('mouseenter', function() {
            if (video !== bgMusic) { // 不控制背景音乐
                video.play();
            }
        });

        // 鼠标离开时暂停
        video.addEventListener('mouseleave', function() {
            if (video !== bgMusic) { // 不控制背景音乐
                video.pause();
            }
        });

        // 错误处理
        video.addEventListener('error', function(e) {
            console.error('视频加载错误:', e);
        });
    });

    // 模态框动画效果
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('show.bs.modal', function() {
            const modalDialog = this.querySelector('.modal-dialog');
            modalDialog.style.transform = 'scale(1)';
        });

        modal.addEventListener('hide.bs.modal', function() {
            const modalDialog = this.querySelector('.modal-dialog');
            modalDialog.style.transform = 'scale(0.8)';
        });
    });

    // 滚动动画效果
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.timeline-item, .work-item, .skill-item');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // 初始化元素样式
    const elements = document.querySelectorAll('.timeline-item, .work-item, .skill-item');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });

    // 监听滚动事件
    window.addEventListener('scroll', animateOnScroll);
    // 初始检查
    animateOnScroll();

    // 技能进度条动画
    const skillBars = document.querySelectorAll('.skill-progress');
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            if (barTop < window.innerHeight) {
                bar.style.width = bar.getAttribute('data-width') || '0%';
            }
        });
    };

    // 初始化技能条
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        bar.setAttribute('data-width', width);
    });

    // 监听滚动事件
    window.addEventListener('scroll', animateSkillBars);
    // 初始检查
    animateSkillBars();

    // 图片加载错误处理
    document.querySelectorAll('img').forEach(img => {
        img.onerror = function() {
            console.error('图片加载失败:', this.src);
            this.src = 'https://via.placeholder.com/800x600?text=图片加载失败';
        };
    });

    // 音乐加载错误处理
    bgMusic.onerror = function() {
        console.error('音乐加载失败');
    };
}); 
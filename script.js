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

    // 视频处理
    const productionVideo = document.getElementById('productionVideo');
    const videoPlaceholder = productionVideo.parentNode.querySelector('.image-placeholder');

    // 视频加载完成后移除占位符
    productionVideo.addEventListener('loadeddata', function() {
        this.classList.add('loaded');
        if (videoPlaceholder) {
            videoPlaceholder.style.display = 'none';
        }
    });

    // 视频加载错误处理
    productionVideo.addEventListener('error', function(e) {
        console.error('视频加载错误:', e);
        if (videoPlaceholder) {
            videoPlaceholder.innerHTML = '<div style="text-align: center; padding: 20px;">视频加载失败，请稍后重试</div>';
        }
    });

    // 视频播放性能优化
    productionVideo.addEventListener('play', function() {
        this.style.willChange = 'transform';
    });

    productionVideo.addEventListener('pause', function() {
        this.style.willChange = 'auto';
    });

    // 移动端优化
    if ('ontouchstart' in window) {
        productionVideo.setAttribute('controls', 'controls');
    }

    // 自动暂停其他媒体
    productionVideo.addEventListener('play', function() {
        if (bgMusic && !bgMusic.paused) {
            bgMusic.pause();
            musicToggle.classList.add('paused');
            isMusicPlaying = false;
        }
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

    // 图片加载处理
    document.querySelectorAll('.timeline-image').forEach(img => {
        const placeholder = img.parentNode.querySelector('.image-placeholder');
        
        if (img.complete) {
            img.classList.add('loaded');
            if (placeholder) placeholder.classList.add('hidden');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
                if (placeholder) placeholder.classList.add('hidden');
            });
            
            img.addEventListener('error', function() {
                console.warn('图片加载失败:', this.src);
                this.src = 'assets/placeholder.jpg';
                if (placeholder) placeholder.classList.add('hidden');
            });
        }
    });

    // 预加载关键图片
    function preloadImages() {
        const imageUrls = [
            // 添加关键图片的本地路径
            'assets/hero-bg.jpg',
            'assets/logo.png'
        ];
        
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }

    // 页面加载完成后预加载图片
    window.addEventListener('load', preloadImages);

    // 音乐加载错误处理
    bgMusic.onerror = function() {
        console.error('音乐加载失败');
    };

    // 图片加载完成处理
    document.querySelectorAll('img').forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });

    // 添加图片占位符
    document.querySelectorAll('.timeline-content img, .work-image, .article-image').forEach(img => {
        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder';
        placeholder.style.width = '100%';
        placeholder.style.height = img.height + 'px';
        img.parentNode.insertBefore(placeholder, img);
        
        img.addEventListener('load', function() {
            placeholder.remove();
        });
    });
}); 
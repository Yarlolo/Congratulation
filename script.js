// Video slider functionality
const videoSources = [
    'congratulations/1.mp4',
    'congratulations/2.mp4',
    'congratulations/3.mp4',
    'congratulations/4.mp4',
    'congratulations/5.mp4',
    'congratulations/6.mp4',
    'congratulations/7.mp4',
    'congratulations/8.mp4',
    'congratulations/9.mp4',
    'congratulations/10.mp4',
    'congratulations/11.mp4',
    'congratulations/12.mp4',
    'congratulations/13.mp4',
    'congratulations/14.mp4',
    'congratulations/15.mp4',
    'congratulations/16.mp4',
    'congratulations/17.mp4',
    'congratulations/18.mp4'
];
let currentVideoIndex = 0;
let videoStarted = false;

function playFirstVideo() {
    videoStarted = true;
    currentVideoIndex = 0;
    showVideoPlaceholder(false);
    updateVideo();
}

function updateVideo() {
    const videoElement = document.getElementById('currentVideo');
    if (videoElement) {
        videoElement.src = videoSources[currentVideoIndex];
        videoElement.poster = '';

        const videoNumberElement = document.getElementById('videoNumber');
        if (videoNumberElement) {
            videoNumberElement.textContent = currentVideoIndex + 1;
        }

        videoElement.load();
        setTimeout(() => {
            videoElement.play().catch(e => console.log('Auto-play prevented'));
        }, 100);
    }
}

function changeVideo(direction) {
    currentVideoIndex += direction;

    if (currentVideoIndex >= videoSources.length) {
        currentVideoIndex = 0;
    } else if (currentVideoIndex < 0) {
        currentVideoIndex = videoSources.length - 1;
    }

    updateVideo();
}

function showVideoPlaceholder(show) {
    const placeholder = document.getElementById('videoPlaceholder');
    const videoElement = document.getElementById('currentVideo');

    if (placeholder && videoElement) {
        if (show) {
            placeholder.style.display = 'block';
            videoElement.style.display = 'none';
        } else {
            placeholder.style.display = 'none';
            videoElement.style.display = 'block';
        }
    }
}

function initVideoSlider() {
    const totalVideosElement = document.getElementById('totalVideos');
    if (totalVideosElement) {
        totalVideosElement.textContent = videoSources.length;
    }

    const videoNumberElement = document.getElementById('videoNumber');
    if (videoNumberElement) {
        videoNumberElement.textContent = 1;
    }
}

// Family video functionality
const familyVideoSources = [
    'congratulations/family/1.mp4',
    'congratulations/family/2.mp4'
];

function playFamilyVideo(index) {
    const videoElement = document.getElementById('familyVideo' + index);
    const placeholderElement = document.getElementById('familyVideo' + index + 'Placeholder');
    
    if (videoElement && placeholderElement) {
        videoElement.src = familyVideoSources[index - 1];
        videoElement.poster = '';
        videoElement.load();
        setTimeout(() => {
            videoElement.play().catch(e => console.log('Auto-play prevented'));
        }, 100);
        
        placeholderElement.style.display = 'none';
        videoElement.style.display = 'block';
    }
}

// Music video functionality
const musicVideoSource = 'congratulations/music/1.mp4';

let musicVideoStarted = false;

function playMusicVideo() {
    musicVideoStarted = true;
    showMusicPlaceholder(false);
    const musicVideoElement = document.getElementById('musicVideo');
    if (musicVideoElement) {
        musicVideoElement.src = musicVideoSource;
        musicVideoElement.poster = '';
        musicVideoElement.load();
        setTimeout(() => {
            musicVideoElement.play().catch(e => console.log('Auto-play prevented'));
        }, 100);
    }
}

function showMusicPlaceholder(show) {
    const placeholder = document.getElementById('musicPlaceholder');
    const videoElement = document.getElementById('musicVideo');

    if (placeholder && videoElement) {
        if (show) {
            placeholder.style.display = 'block';
            videoElement.style.display = 'none';
        } else {
            placeholder.style.display = 'none';
            videoElement.style.display = 'block';
        }
    }
}

// Confetti effect - НАЧАЛЬНЫЙ ВЗРЫВ СВЕРХУ
function createInitialConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    // Показываем canvas
    canvas.style.display = 'block';
    canvas.style.opacity = '1';

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = [
        '#FFD700', '#FFA500', '#FF4500', '#FF6B6B',
        '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
        '#DDA0DD', '#FF69B4', '#FFB6C1', '#98D8C8',
        '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471'
    ];

    const shapes = ['square', 'circle', 'triangle', 'star'];
    const confetti = [];
    const confettiCount = 250;

    for (let i = 0; i < confettiCount; i++) {
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        confetti.push({
            x: Math.random() * canvas.width,
            y: -50 - Math.random() * 200,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 14 + 4,
            speedY: Math.random() * 3 + 1.5,
            speedX: Math.random() * 4 - 2,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5,
            shape: shape,
            opacity: Math.random() * 0.5 + 0.5,
            wobble: Math.random() * 10,
            wobbleSpeed: Math.random() * 0.05 + 0.02,
            delay: Math.random() * 0.5
        });
    }

    let startTime = Date.now();
    const duration = 4000;
    let animationRunning = true;

    function drawShape(ctx, x, y, size, shape, color, rotation, opacity) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.globalAlpha = opacity;
        ctx.fillStyle = color;

        switch (shape) {
            case 'square':
                ctx.fillRect(-size / 2, -size / 2, size, size);
                break;
            case 'circle':
                ctx.beginPath();
                ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
                ctx.fill();
                break;
            case 'triangle':
                ctx.beginPath();
                ctx.moveTo(0, -size / 2);
                ctx.lineTo(-size / 2, size / 2);
                ctx.lineTo(size / 2, size / 2);
                ctx.closePath();
                ctx.fill();
                break;
            case 'star':
                const points = 5;
                const outerRadius = size / 2;
                const innerRadius = size / 4;
                ctx.beginPath();
                for (let i = 0; i < points * 2; i++) {
                    const radius = i % 2 === 0 ? outerRadius : innerRadius;
                    const angle = (i * Math.PI) / points - Math.PI / 2;
                    const xPos = Math.cos(angle) * radius;
                    const yPos = Math.sin(angle) * radius;
                    if (i === 0) ctx.moveTo(xPos, yPos);
                    else ctx.lineTo(xPos, yPos);
                }
                ctx.closePath();
                ctx.fill();
                break;
        }
        ctx.restore();
    }

    function draw() {
        if (!animationRunning) return;

        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let allFinished = true;

        confetti.forEach(c => {
            if (elapsed < c.delay * 1000) {
                allFinished = false;
                return;
            }

            c.y += c.speedY;
            c.x += c.speedX + Math.sin(c.y * c.wobbleSpeed) * 0.5;
            c.rotation += c.rotationSpeed;
            c.wobble += c.wobbleSpeed;

            if (progress > 0.7) {
                const fadeProgress = (progress - 0.7) / 0.3;
                c.opacity = c.opacity * (1 - fadeProgress);
            }

            if (c.opacity > 0.01 && c.y < canvas.height + 50) {
                drawShape(ctx, c.x, c.y, c.size, c.shape, c.color, c.rotation, c.opacity);
                allFinished = false;
            }
        });

        if (allFinished || progress >= 1) {
            animationRunning = false;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.style.opacity = '0';
            setTimeout(() => {
                canvas.style.display = 'none';
            }, 500);
            return;
        }

        requestAnimationFrame(draw);
    }

    draw();
}

// Инициализация при загрузке
window.addEventListener('load', function() {
    setTimeout(() => {
        createInitialConfetti();
    }, 500);

    initVideoSlider();
});

// Обработка изменения размера окна
window.addEventListener('resize', function() {
    const canvas = document.getElementById('confetti-canvas');
    if (canvas && canvas.style.display !== 'none') {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});

// Добавляем плавную прокрутку
document.documentElement.style.scrollBehavior = 'smooth';

// Создание хаотичных фоновых цветов
// Создание хаотичных фоновых цветов (обходим контент)
function createBackgroundFlowers() {
    const flowers = ['🌸', '🌺', '🌹', '🌷', '❤️'];
    
    const flowerCount = 30;
    
    const pageHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
    );
    const pageWidth = Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth
    );
    
    // Получаем все элементы контента, которые не должны перекрываться
    const contentElements = document.querySelectorAll(
        '.header, .intro-section, .video-section, .audio-section, .music-section, .text-congrats-section, .footer'
    );
    
    const fragment = document.createDocumentFragment();
    let attempts = 0;
    let created = 0;
    const maxAttempts = 1000; // Защита от бесконечного цикла
    
    while (created < flowerCount && attempts < maxAttempts) {
        attempts++;
        
        const posX = Math.random() * (pageWidth - 60);
        const posY = Math.random() * (pageHeight - 60);
        
        // Проверяем, не перекрывается ли с контентом
        let overlapping = false;
        
        for (const element of contentElements) {
            const rect = element.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Преобразуем координаты с учетом скролла
            const elementTop = rect.top + scrollTop;
            const elementBottom = rect.bottom + scrollTop;
            const elementLeft = rect.left + window.pageXOffset;
            const elementRight = rect.right + window.pageXOffset;
            
            // Добавляем отступ 40px вокруг элементов
            const margin = 40;
            
            if (
                posX > elementLeft - margin &&
                posX < elementRight + margin &&
                posY > elementTop - margin &&
                posY < elementBottom + margin
            ) {
                overlapping = true;
                break;
            }
        }
        
        if (!overlapping) {
            const flower = document.createElement('div');
            flower.className = 'background-flower';
            flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
            
            const size = Math.random() * 25 + 18;
            const delay = Math.random() * 8;
            const duration = Math.random() * 4 + 6;
            
            flower.style.cssText = `
                left: ${posX}px;
                top: ${posY}px;
                font-size: ${size}px;
                animation-delay: ${delay}s;
                animation-duration: ${duration}s;
                opacity: ${Math.random() * 0.12 + 0.06};
            `;
            
            fragment.appendChild(flower);
            created++;
        }
    }
    
    document.body.appendChild(fragment);
}

// Запускаем при загрузке
window.addEventListener('load', function() {
    createBackgroundFlowers();
});

// При ресайзе пересоздаем с debounce
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        document.querySelectorAll('.background-flower').forEach(el => el.remove());
        createBackgroundFlowers();
    }, 500);
});


// Audio player functionality - FIXED for mobile
let audioInstances = {};

function formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins + ':' + (secs < 10 ? '0' : '') + secs;
}

function toggleAudio(id) {
    const audio = document.getElementById('audio' + id);
    const playBtn = document.querySelector(`.play-btn[data-audio="${id}"]`);
    const cover = document.getElementById('cover' + id);
    
    if (!audio) return;
    
    // Если аудио загружается, ждем
    if (audio.readyState < 2) {
        audio.load();
        setTimeout(() => {
            toggleAudio(id);
        }, 500);
        return;
    }
    
    if (audio.paused) {
        // Останавливаем все другие аудио
        document.querySelectorAll('audio').forEach(otherAudio => {
            if (otherAudio !== audio && !otherAudio.paused) {
                otherAudio.pause();
                const otherId = otherAudio.id.replace('audio', '');
                const otherBtn = document.querySelector(`.play-btn[data-audio="${otherId}"]`);
                const otherCover = document.getElementById('cover' + otherId);
                if (otherBtn) otherBtn.textContent = '▶';
                if (otherCover) otherCover.classList.remove('playing');
            }
        });
        
        // Пробуем воспроизвести
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                if (playBtn) playBtn.textContent = '⏸';
                if (cover) cover.classList.add('playing');
            }).catch(error => {
                console.log('Playback error:', error);
                // Показываем сообщение пользователю
                if (playBtn) {
                    playBtn.textContent = '⚠️';
                    setTimeout(() => {
                        playBtn.textContent = '▶';
                    }, 2000);
                }
                // Пробуем альтернативный способ
                setTimeout(() => {
                    audio.load();
                    audio.play().catch(e => console.log('Retry failed:', e));
                }, 1000);
            });
        }
    } else {
        audio.pause();
        if (playBtn) playBtn.textContent = '▶';
        if (cover) cover.classList.remove('playing');
    }
}

function seekAudio(id, event) {
    const audio = document.getElementById('audio' + id);
    const progressBar = document.getElementById('progress' + id);
    if (!audio || !progressBar || !audio.duration) return;
    
    const rect = progressBar.getBoundingClientRect();
    let x = 0;
    
    if (event.touches) {
        x = (event.touches[0].clientX - rect.left) / rect.width;
    } else {
        x = (event.clientX - rect.left) / rect.width;
    }
    
    x = Math.max(0, Math.min(1, x));
    audio.currentTime = x * audio.duration;
    updateProgress(id);
}

function updateProgress(id) {
    const audio = document.getElementById('audio' + id);
    const progressFill = document.getElementById('progressFill' + id);
    const currentTimeDisplay = document.getElementById('currentTime' + id);
    
    if (!audio || !progressFill) return;
    
    if (audio.duration && !isNaN(audio.duration)) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = progress + '%';
        if (currentTimeDisplay) {
            currentTimeDisplay.textContent = formatTime(audio.currentTime);
        }
    }
}

function toggleMute(id) {
    const audio = document.getElementById('audio' + id);
    const volumeBtn = document.querySelector(`.volume-btn[data-audio="${id}"]`);
    if (!audio || !volumeBtn) return;
    
    audio.muted = !audio.muted;
    volumeBtn.textContent = audio.muted ? '🔇' : '🔊';
}

function handleAudioError(id) {
    console.log('Audio error for:', id);
    const playBtn = document.querySelector(`.play-btn[data-audio="${id}"]`);
    if (playBtn) {
        playBtn.textContent = '❌';
        setTimeout(() => {
            playBtn.textContent = '▶';
        }, 3000);
    }
}

// Инициализация аудио
document.addEventListener('DOMContentLoaded', function() {
    for (let i = 1; i <= 2; i++) {
        const audio = document.getElementById('audio' + i);
        const durationDisplay = document.getElementById('duration' + i);
        
        if (audio) {
            // Загружаем метаданные
            audio.addEventListener('loadedmetadata', function() {
                if (durationDisplay && audio.duration) {
                    durationDisplay.textContent = formatTime(audio.duration);
                }
            });
            
            // Обновляем прогресс
            audio.addEventListener('timeupdate', function() {
                updateProgress(i);
            });
            
            // При окончании
            audio.addEventListener('ended', function() {
                const playBtn = document.querySelector(`.play-btn[data-audio="${i}"]`);
                const cover = document.getElementById('cover' + i);
                if (playBtn) playBtn.textContent = '▶';
                if (cover) cover.classList.remove('playing');
                const progressFill = document.getElementById('progressFill' + i);
                if (progressFill) progressFill.style.width = '0%';
                const currentTimeDisplay = document.getElementById('currentTime' + i);
                if (currentTimeDisplay) currentTimeDisplay.textContent = '0:00';
            });
            
            // При паузе
            audio.addEventListener('pause', function() {
                const playBtn = document.querySelector(`.play-btn[data-audio="${i}"]`);
                if (playBtn && audio.currentTime < audio.duration) {
                    playBtn.textContent = '▶';
                }
            });
            
            // При воспроизведении
            audio.addEventListener('play', function() {
                const playBtn = document.querySelector(`.play-btn[data-audio="${i}"]`);
                if (playBtn) playBtn.textContent = '⏸';
            });
            
            // При ошибке
            audio.addEventListener('error', function(e) {
                console.log('Audio error:', e);
                handleAudioError(i);
            });
            
            // Принудительно загружаем
            audio.load();
        }
    }
});

// Добавляем поддержку touch для прогресс-бара
document.addEventListener('DOMContentLoaded', function() {
    for (let i = 1; i <= 2; i++) {
        const progressBar = document.getElementById('progress' + i);
        if (progressBar) {
            let isDragging = false;
            
            progressBar.addEventListener('touchstart', function(e) {
                e.preventDefault();
                isDragging = true;
                seekAudio(i, e);
            });
            
            progressBar.addEventListener('touchmove', function(e) {
                e.preventDefault();
                if (isDragging) {
                    seekAudio(i, e);
                }
            });
            
            progressBar.addEventListener('touchend', function() {
                isDragging = false;
            });
            
            progressBar.addEventListener('mousedown', function(e) {
                isDragging = true;
                seekAudio(i, e);
            });
            
            document.addEventListener('mousemove', function(e) {
                if (isDragging) {
                    seekAudio(i, e);
                }
            });
            
            document.addEventListener('mouseup', function() {
                isDragging = false;
            });
        }
    }
});

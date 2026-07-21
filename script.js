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


// Audio player functionality - enlarge photo when playing
document.addEventListener('DOMContentLoaded', function() {
    const audioItems = document.querySelectorAll('.audio-item');
    
    audioItems.forEach(item => {
        const audio = item.querySelector('audio');
        const cover = item.querySelector('.audio-cover');
        
        if (audio && cover) {
            // При начале воспроизведения
            audio.addEventListener('play', function() {
                cover.classList.add('playing');
                // Останавливаем другие аудио и убираем их анимацию
                audioItems.forEach(otherItem => {
                    const otherAudio = otherItem.querySelector('audio');
                    const otherCover = otherItem.querySelector('.audio-cover');
                    if (otherAudio && otherAudio !== audio && !otherAudio.paused) {
                        otherAudio.pause();
                        if (otherCover) {
                            otherCover.classList.remove('playing');
                        }
                    }
                });
            });
            
            // При паузе
            audio.addEventListener('pause', function() {
                cover.classList.remove('playing');
            });
            
            // При окончании воспроизведения
            audio.addEventListener('ended', function() {
                cover.classList.remove('playing');
            });
        }
    });
});


// Custom Audio Player
document.addEventListener('DOMContentLoaded', function() {
    const audioPlayers = {};

    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return mins + ':' + (secs < 10 ? '0' : '') + secs;
    }

    function setupAudioPlayer(audioId) {
        const audio = document.getElementById('audio' + audioId);
        const playBtn = document.querySelector(`.play-btn[data-audio="${audioId}"]`);
        const progressFill = document.getElementById('progressFill' + audioId);
        const progressBar = document.getElementById('progress' + audioId);
        const currentTimeDisplay = document.getElementById('currentTime' + audioId);
        const durationDisplay = document.getElementById('duration' + audioId);
        const volumeBtn = document.querySelector(`.volume-btn[data-audio="${audioId}"]`);
        const cover = document.getElementById('cover' + audioId);

        if (!audio || !playBtn) return;

        let isDragging = false;

        // Обработчик воспроизведения/паузы
        playBtn.addEventListener('click', function() {
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
                
                audio.play().catch(e => console.log('Play prevented'));
                playBtn.textContent = '⏸';
                if (cover) cover.classList.add('playing');
            } else {
                audio.pause();
                playBtn.textContent = '▶';
                if (cover) cover.classList.remove('playing');
            }
        });

        // Обновление прогресса
        audio.addEventListener('timeupdate', function() {
            if (!isDragging && audio.duration) {
                const progress = (audio.currentTime / audio.duration) * 100;
                progressFill.style.width = progress + '%';
                currentTimeDisplay.textContent = formatTime(audio.currentTime);
            }
        });

        // Загрузка метаданных
        audio.addEventListener('loadedmetadata', function() {
            durationDisplay.textContent = formatTime(audio.duration);
        });

        // Клик по прогресс-бару
        progressBar.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            audio.currentTime = x * audio.duration;
            progressFill.style.width = (x * 100) + '%';
        });

        // Перетаскивание прогресса
        progressBar.addEventListener('mousedown', function(e) {
            isDragging = true;
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            audio.currentTime = x * audio.duration;
            progressFill.style.width = (x * 100) + '%';
        });

        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                const rect = progressBar.getBoundingClientRect();
                let x = (e.clientX - rect.left) / rect.width;
                x = Math.max(0, Math.min(1, x));
                audio.currentTime = x * audio.duration;
                progressFill.style.width = (x * 100) + '%';
            }
        });

        document.addEventListener('mouseup', function() {
            isDragging = false;
        });

        // Touch events для мобильных
        progressBar.addEventListener('touchstart', function(e) {
            e.preventDefault();
            isDragging = true;
            const rect = this.getBoundingClientRect();
            const touch = e.touches[0];
            const x = (touch.clientX - rect.left) / rect.width;
            audio.currentTime = x * audio.duration;
            progressFill.style.width = (x * 100) + '%';
        });

        progressBar.addEventListener('touchmove', function(e) {
            e.preventDefault();
            if (isDragging) {
                const rect = this.getBoundingClientRect();
                const touch = e.touches[0];
                let x = (touch.clientX - rect.left) / rect.width;
                x = Math.max(0, Math.min(1, x));
                audio.currentTime = x * audio.duration;
                progressFill.style.width = (x * 100) + '%';
            }
        });

        progressBar.addEventListener('touchend', function() {
            isDragging = false;
        });

        // Громкость
        let volumeVisible = false;
        volumeBtn.addEventListener('click', function() {
            if (audio.muted) {
                audio.muted = false;
                volumeBtn.textContent = '🔊';
            } else {
                audio.muted = true;
                volumeBtn.textContent = '🔇';
            }
        });

        // Обновление при окончании
        audio.addEventListener('ended', function() {
            playBtn.textContent = '▶';
            if (cover) cover.classList.remove('playing');
            progressFill.style.width = '0%';
            currentTimeDisplay.textContent = '0:00';
        });

        // При паузе
        audio.addEventListener('pause', function() {
            if (audio.currentTime < audio.duration) {
                playBtn.textContent = '▶';
            }
            if (cover) cover.classList.remove('playing');
        });

        // При воспроизведении
        audio.addEventListener('play', function() {
            playBtn.textContent = '⏸';
            if (cover) cover.classList.add('playing');
        });

        // Сохраняем ссылку
        audioPlayers[audioId] = audio;
    }

    // Настраиваем оба аудиоплеера
    setupAudioPlayer(1);
    setupAudioPlayer(2);
});

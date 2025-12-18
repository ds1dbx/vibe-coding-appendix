// 명상 앱 JavaScript
class MeditationApp {
    constructor() {
        this.images = [
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop'
        ];

        this.quotes = [
            "마음의 평안은 외부 상황이 아니라 내면의 선택입니다.",
            "호흡 하나하나에 집중하며 현재 순간을 받아들이세요.",
            "모든 생각은 구름처럼 오고 가는 것입니다. 그것을 붙잡지 마세요.",
            "당신은 충분히 잘하고 있고, 충분히 사랑받을 자격이 있습니다.",
            "평온함은 혼란이 찾아올 때 더욱 빛납니다.",
            "지금 이 순간에 충실하세요. 그것이 진정한 자유입니다.",
            "마음의 고요함 속에서 진정한 자아를 만날 수 있습니다.",
            "모든 것은 변합니다. 그 변화를 두려워하지 마세요."
        ];

        this.currentImageIndex = 0;
        this.timer = null;
        this.seconds = 0;
        this.isRunning = false;
        this.likes = new Array(this.images.length).fill(false);

        this.initializeElements();
        this.bindEvents();
        this.showCurrentImage();
    }

    initializeElements() {
        this.imageElement = document.getElementById('meditation-image');
        this.likeButton = document.getElementById('like-button');
        this.timerElement = document.querySelector('.timer');
        this.startButton = document.getElementById('start-button');
        this.pauseButton = document.getElementById('pause-button');
        this.restartButton = document.getElementById('restart-button');
        this.quoteContainer = document.getElementById('quote-container');
        this.quoteText = document.getElementById('quote-text');
        this.audioElement = document.getElementById('background-music');
    }

    bindEvents() {
        this.startButton.addEventListener('click', () => this.startMeditation());
        this.pauseButton.addEventListener('click', () => this.pauseMeditation());
        this.restartButton.addEventListener('click', () => this.restartMeditation());
        this.likeButton.addEventListener('click', () => this.toggleLike());

        // 이미지 자동 슬라이드 (5초마다)
        setInterval(() => {
            if (this.isRunning) {
                this.nextImage();
            }
        }, 5000);
    }

    showCurrentImage() {
        this.imageElement.src = this.images[this.currentImageIndex];
        this.updateLikeButton();
    }

    nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        this.showCurrentImage();
    }

    updateLikeButton() {
        if (this.likes[this.currentImageIndex]) {
            this.likeButton.classList.add('liked');
            this.likeButton.textContent = '❤️';
        } else {
            this.likeButton.classList.remove('liked');
            this.likeButton.textContent = '🤍';
        }
    }

    toggleLike() {
        this.likes[this.currentImageIndex] = !this.likes[this.currentImageIndex];
        this.updateLikeButton();

        // 애니메이션 효과
        this.likeButton.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.likeButton.style.transform = 'scale(1)';
        }, 200);
    }

    startMeditation() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startButton.classList.add('hidden');
            this.pauseButton.classList.remove('hidden');
            this.playMusic();
            this.startTimer();
        }
    }

    pauseMeditation() {
        this.isRunning = false;
        this.startButton.classList.remove('hidden');
        this.pauseButton.classList.add('hidden');
        this.pauseMusic();
        this.stopTimer();
    }

    restartMeditation() {
        this.seconds = 0;
        this.currentImageIndex = 0;
        this.isRunning = false;
        this.quoteContainer.classList.add('hidden');
        this.startButton.classList.remove('hidden');
        this.pauseButton.classList.add('hidden');
        this.stopMusic();
        this.updateTimerDisplay();
        this.showCurrentImage();
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.seconds++;
            this.updateTimerDisplay();

            // 3분 (180초) 후 명언 표시
            if (this.seconds >= 180) {
                this.showQuote();
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.seconds / 60);
        const remainingSeconds = this.seconds % 60;
        this.timerElement.textContent =
            `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    showQuote() {
        this.isRunning = false;
        this.pauseMusic();
        this.stopTimer();

        const randomQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
        this.quoteText.textContent = randomQuote;
        this.quoteContainer.classList.remove('hidden');

        this.startButton.classList.add('hidden');
        this.pauseButton.classList.add('hidden');
    }

    playMusic() {
        // 실제 음악 파일이 없으므로 시뮬레이션
        // 실제 구현시에는 잔잔한 음악 파일을 추가해야 함
        console.log('음악 재생 시작');
        // this.audioElement.play().catch(e => console.log('음악 재생 실패:', e));
    }

    pauseMusic() {
        console.log('음악 일시 정지');
        // this.audioElement.pause();
    }

    stopMusic() {
        console.log('음악 정지');
        // this.audioElement.pause();
        // this.audioElement.currentTime = 0;
    }
}

// 앱 초기화
document.addEventListener('DOMContentLoaded', () => {
    new MeditationApp();
});

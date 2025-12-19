// 명상 이미지들 (실제 이미지 URL로 교체 가능)
const meditationImages = [
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', // 산
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', // 호수
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', // 숲
    'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', // 바다
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', // 일출
    'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'  // 별
];

// 명언들
const quotes = [
    {
        text: "마음이 평안할 때, 세상은 아름답다.",
        author: "불교 명언"
    },
    {
        text: "지금 이 순간에 집중하라. 그것이 진정한 평화의 길이다.",
        author: "달라이 라마"
    },
    {
        text: "호흡은 마음의 닻이다. 숨을 쉴 때마다 현재로 돌아오라.",
        author: "명상 격언"
    },
    {
        text: "마음의 평화를 찾는 것은 여행이지 목적지가 아니다.",
        author: "불교 속담"
    },
    {
        text: "고요함 속에서 진정한 자아를 만난다.",
        author: "명상 명언"
    }
];

// DOM 요소들
const meditationImage = document.getElementById('meditationImage');
const likeBtn = document.getElementById('likeBtn');
const timerElement = document.getElementById('timer');
const backgroundMusic = document.getElementById('backgroundMusic');
const quoteContainer = document.getElementById('quoteContainer');
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');

// 상태 변수들
let currentImageIndex = 0;
let likedImages = new Set();
let timer;
let timeLeft = 180; // 3분 = 180초

// 이미지 슬라이드 함수
function showNextImage() {
    // 현재 이미지 fade out
    meditationImage.classList.remove('active');

    setTimeout(() => {
        currentImageIndex = (currentImageIndex + 1) % meditationImages.length;

        // 다음 이미지 로드
        meditationImage.src = meditationImages[currentImageIndex];

        // 이미지가 로드되면 fade in
        meditationImage.onload = () => {
            meditationImage.classList.add('active');
        };

        // 로드 실패 시에도 active 클래스 추가 (fallback)
        meditationImage.onerror = () => {
            meditationImage.classList.add('active');
        };
    }, 2000);
}

// 타이머 업데이트 함수
function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if (timeLeft > 0) {
        timeLeft--;
    } else {
        endMeditation();
    }
}

// 명상 종료 함수
function endMeditation() {
    clearInterval(timer);
    backgroundMusic.pause();
    
    // 랜덤 명언 선택 및 표시
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteText.textContent = `"${randomQuote.text}"`;
    quoteAuthor.textContent = `- ${randomQuote.author}`;
    
    // 명언 컨테이너 표시
    quoteContainer.style.display = 'flex';
    
    // 부드러운 전환 효과
    setTimeout(() => {
        quoteContainer.style.opacity = '1';
    }, 100);
}

// 좋아요 버튼 클릭 이벤트
likeBtn.addEventListener('click', () => {
    const currentImage = meditationImages[currentImageIndex];

    if (likedImages.has(currentImage)) {
        likedImages.delete(currentImage);
        likeBtn.classList.remove('liked');
    } else {
        likedImages.add(currentImage);
        likeBtn.classList.add('liked');

        // 좋아요 애니메이션 - 기존 애니메이션 정리 후 실행
        likeBtn.style.transform = '';
        setTimeout(() => {
            likeBtn.style.transform = 'scale(1.2)';
            setTimeout(() => {
                likeBtn.style.transform = '';
            }, 200);
        }, 10);
    }
});

// 초기화 및 시작 함수
function initMeditation() {
    // 첫 번째 이미지 로드
    meditationImage.src = meditationImages[0];
    meditationImage.classList.add('active');
    
    // 배경 음악 시작 (사용자 상호작용 후)
    document.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play().catch(console.error);
        }
    }, { once: true });
    
    // 이미지 슬라이드 시작 (10초마다)
    setInterval(showNextImage, 10000);
    
    // 타이머 시작
    timer = setInterval(updateTimer, 1000);
}

// 페이지 로드 시 시작
window.addEventListener('load', initMeditation);

// 키보드 이벤트 (스페이스바로 좋아요)
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        likeBtn.click();
    }
});

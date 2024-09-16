// 輪播區
const carouselImages = document.querySelector('.carousel-images');
const images = document.querySelectorAll('.carousel-images img');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let counter = 0;
const size = images[0].clientWidth;

// 初始設置
carouselImages.style.transform = 'translateX(' + (-size * counter) + 'px)';

// 下一張圖片
function nextSlide() {
    if (counter >= images.length - 1) {
        // 當到達最後一張時，先瞬間跳到第一張，再右滑到第一張
        carouselImages.style.transition = "none";  // 關閉過渡效果
        counter = 0; // 重置計數器
        carouselImages.style.transform = 'translateX(' + (-size * counter) + 'px)';  // 瞬間跳轉到第一張
        setTimeout(() => {
            carouselImages.style.transition = "transform 0.5s ease-in-out";  // 恢復過渡效果
            counter++; // 向右滑動到第一張
            carouselImages.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }, 0);  // 使用setTimeout讓下一個動畫幀更新
    } else {
        carouselImages.style.transition = "transform 0.5s ease-in-out";
        counter++;
        carouselImages.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
}

// 上一張圖片
function prevSlide() {
    if (counter <= 0) {
        // 當在第一張時，先瞬間跳到最後一張，再左滑回最後一張
        carouselImages.style.transition = "none";  // 關閉過渡效果
        counter = images.length - 1; // 設置為最後一張
        carouselImages.style.transform = 'translateX(' + (-size * counter) + 'px)';  // 瞬間跳轉到最後一張
        setTimeout(() => {
            carouselImages.style.transition = "transform 0.5s ease-in-out";  // 恢復過渡效果
            counter--; // 左滑動到最後一張
            carouselImages.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }, 0);
    } else {
        carouselImages.style.transition = "transform 0.5s ease-in-out";
        counter--;
        carouselImages.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
}

// 點擊下一個按鈕
nextButton.addEventListener('click', () => {
    nextSlide();
});

// 點擊上一個按鈕
prevButton.addEventListener('click', () => {
    prevSlide();
});

// 自動輪播
let autoPlay = setInterval(nextSlide, 3000); // 每3秒切換一次

// 當用戶點擊按鈕時，暫停自動輪播，過一段時間後再繼續
const stopAutoPlay = () => {
    clearInterval(autoPlay);  // 停止自動播放
    autoPlay = setInterval(nextSlide, 3000);  // 設定自動播放
};

nextButton.addEventListener('click', stopAutoPlay);
prevButton.addEventListener('click', stopAutoPlay);

// 當用戶改變窗口大小時，重新計算圖片大小
window.addEventListener('resize', () => {
    const size = images[0].clientWidth;
    carouselImages.style.transform = 'translateX(' + (-size * counter) + 'px)';
});


// 跑馬燈區
const marquee = document.querySelector('.marquee');
const slides = document.querySelectorAll('.marquee img'); // 將 images 換成 slides
let currentIndex = 0;
const totalSlides = slides.length; // 使用 slides 來替代 images
const marqueeWidth = marquee.scrollWidth / totalSlides; // 計算每個 slide 的寬度

function startMarquee() {
    // 每3秒滾動一次
    setInterval(() => {
        if (currentIndex < totalSlides - 1) {
            // 如果還沒到最後一張，繼續滾動
            currentIndex++;
            marquee.style.transform = `translateX(${-marqueeWidth * currentIndex}px)`;
        } else {
            // 滾動到最後一張後，延遲一秒，然後回到第一張
            setTimeout(() => {
                currentIndex = 0;
                marquee.style.transition = "none"; // 關閉過渡效果
                marquee.style.transform = `translateX(0)`; // 回到第一張
                setTimeout(() => {
                    marquee.style.transition = "transform 1s ease-in-out"; // 恢復過渡效果
                }, 50); // 確保在過渡效果被關閉後立即重置
            }, 1000); // 在最後一張停留1秒
        }
    }, 3000); // 每次滾動間隔3秒
}

startMarquee();

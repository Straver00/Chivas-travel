document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');
    let currentIndex = 0;

    leftBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    });

    rightBtn.addEventListener('click', () => {
        if (currentIndex < items.length - 1) {
            currentIndex++;
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    });
});

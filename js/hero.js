
let currentIndex = 0;
const slides = document.querySelectorAll('.hero-slide');
const totalSlides = slides.length;
const slider = document.getElementById('heroSlider');

function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}vw)`;

    // Remove animation from all slides
    document.querySelectorAll('.hero-content').forEach(content => {
        content.classList.remove('animate-slide');
    });

    // Add animation to the current slide
    setTimeout(() => {
        slides[currentIndex].querySelector('.hero-content').classList.add('animate-slide');
    }, 100); // Slight delay to ensure animation restarts
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
}

// Auto-slide every 5 seconds
setInterval(nextSlide, 10000);

// Ensure first slide has animation when page loads
document.addEventListener("DOMContentLoaded", () => {
    slides[0].querySelector('.hero-content').classList.add('animate-slide');
});

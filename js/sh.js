let scrollPosition = 0;
const reviewWidth = document.querySelector('.review').offsetWidth + 3; // Include margin/padding
const reviewsWrapper = document.getElementById('reviewsWrapper');
const visibleReviews = 3; // Number of reviews visible at a time
const totalReviews = reviewsWrapper.children.length;
const maxScroll = (Math.ceil(totalReviews / visibleReviews) - 1) * (visibleReviews * reviewWidth);

function scrollReviews(direction) {
    if (direction === 1 && scrollPosition < maxScroll) {
        scrollPosition += visibleReviews * reviewWidth;
    } else if (direction === -1 && scrollPosition > 0) {
        scrollPosition -= visibleReviews * reviewWidth;
    }

    reviewsWrapper.style.transform = `translateX(-${scrollPosition}px)`;
}

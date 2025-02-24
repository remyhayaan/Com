
let scrollPosition = 0;
const reviewWidth = document.querySelector('.review').offsetWidth + 20;
const reviewsWrapper = document.getElementById('reviewsWrapper');

function scrollReviews(direction) {
    const maxScroll = (reviewsWrapper.children.length - 3) * reviewWidth;

    if (direction === 1 && scrollPosition < maxScroll) { // Corrected typo here: "sc" to "maxScroll"
        scrollPosition += reviewWidth;
    } else if (direction === -1 && scrollPosition > 0) {
        scrollPosition -= reviewWidth;
    }

        reviewsWrapper.style.transform = `translateX(-${scrollPosition}px)`;
    }


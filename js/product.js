function increaseQuantity() {
    let quantityElement = document.getElementById('quantity');
    let quantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = quantity + 1;
}

function decreaseQuantity() {
    let quantityElement = document.getElementById('quantity');
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
        quantityElement.textContent = quantity - 1;
    }
}

// Collapsible sections
document.addEventListener("DOMContentLoaded", function () {
    let coll = document.querySelectorAll(".collapsible");
    coll.forEach(button => {
        button.addEventListener("click", function () {
            this.classList.toggle("active");
            let content = this.nextElementSibling;
            content.style.display = content.style.display === "block" ? "none" : "block";
        });
    });
});
// Function to change main image when thumbnail is clicked
// Select all thumbnails and add click event listener
document.querySelectorAll(".thumbnail").forEach(thumbnail => {
    thumbnail.addEventListener("click", function() {
        const mainImage = document.getElementById("main-image");
        mainImage.src = this.src; // Change the source of the main image
        
        // Remove 'active' class from all thumbnails
        document.querySelectorAll(".thumbnail").forEach(img => img.classList.remove("active"));
        
        // Add 'active' class to clicked thumbnail
        this.classList.add("active");
    });
});

/// Function to open the product popup
// Function to open the product popup
function openPopup(productImages, productTitle, oldPrice, newPrice, singlePrice) {
    const popupImage = document.getElementById('popupProductImage');
    document.getElementById('popupProductTitle').innerText = productTitle;

    const oldPriceElement = document.getElementById('popupOldPrice');
    const newPriceElement = document.getElementById('popupNewPrice');
    const discountElement = document.getElementById('popupDiscount');
    const saleBadgeElement = document.getElementById('popupSaleBadge');

    // Display prices correctly
    if (oldPrice && newPrice) {
        oldPriceElement.innerText = oldPrice;
        newPriceElement.innerText = newPrice;
        oldPriceElement.style.display = "inline";  
        newPriceElement.style.display = "inline";  

        // Calculate discount percentage
        const oldPriceValue = parseFloat(oldPrice.replace(/[^\d.]/g, ''));
        const newPriceValue = parseFloat(newPrice.replace(/[^\d.]/g, ''));

        if (!isNaN(oldPriceValue) && !isNaN(newPriceValue) && oldPriceValue > newPriceValue) {
            const discountPercentage = Math.round(((oldPriceValue - newPriceValue) / oldPriceValue) * 100);
            discountElement.innerText = `-${discountPercentage}%`;
            discountElement.style.display = "inline";  
            saleBadgeElement.style.display = "inline"; // Show SALE badge
        } else {
            discountElement.style.display = "none";
            saleBadgeElement.style.display = "none";
        }
    } else {
        oldPriceElement.style.display = "none";
        newPriceElement.innerText = `Price: ${singlePrice}`;
        discountElement.style.display = "none";
        saleBadgeElement.style.display = "none";
    }

    popupImage.src = productImages['default']; // Set default image

    // Handle color selection
    document.querySelectorAll('.color-btn').forEach((button) => {
        button.addEventListener('click', function () {
            const selectedColor = this.innerText.toLowerCase();
            if (productImages[selectedColor]) {
                popupImage.src = productImages[selectedColor]; // Change image based on color
            }
        });
    });

    document.getElementById('productPopup').style.display = 'flex';
}

// Function to close the popup
function closePopup() {
    document.getElementById('productPopup').style.display = 'none';
}

// Add event listeners to product cards
document.querySelectorAll('.recommended-product-card .fa-plus, .recommended-product-card .fa-eye').forEach((icon) => {
    icon.addEventListener('click', () => {
        const card = icon.closest('.recommended-product-card');
        const productTitle = card.querySelector('.recommended-product-info h3').innerText;

        // Extract price elements
        const oldPriceElement = card.querySelector('.old-price');
        const newPriceElement = card.querySelector('.new-price');
        const singlePriceElement = card.querySelector('.recommended-product-info p:not(:has(span))');

        const oldPrice = oldPriceElement ? oldPriceElement.innerText : null;
        const newPrice = newPriceElement ? newPriceElement.innerText : null;
        const singlePrice = singlePriceElement ? singlePriceElement.innerText : null;

        // Define product images for each product
        const productImages = {
            "Ornex Blender": {
                default: "./images/watch-1.jfif",
                black: "./images/phone-1.jfif",
                red: "./images/watch-1.jfif",
                blue: "./images/pc-2.jfif"
            },
            "Phone": {
                default: "./images/phone-1.jfif",
                black: "./images/pc-2.jfif",
                red: "./images/watch-1.jfif",
                blue: "./images/pc-2.jfif"
            },
            "Watch": {
                default: "./images/watch-1.jfif",
                black: "./images/phone-1.jfif",
                red: "./images/watch-1.jfif",
                blue: "./images/pc-2.jfif"
            },
            "Speaker": {
                default: "./images/phone-1.jfif",
                black: "./images/pc-2.jfif",
                red: "./images/watch-1.jfif",
                blue: "./images/pc-2.jfif"
            }
        };

        // Open popup with corresponding product images
        openPopup(productImages[productTitle] || productImages["Watch"], productTitle, oldPrice, newPrice, singlePrice);
    });
});

function startCountdown(elementId, durationInHours, storageKey) {
    let endTime = localStorage.getItem(storageKey);

    if (!endTime) {
        // Set new end time and store it
        endTime = new Date().getTime() + durationInHours * 60 * 60 * 2000;
        localStorage.setItem(storageKey, endTime);
    } else {
        // Convert to number
        endTime = parseInt(endTime, 10);
    }

    function updateTimer() {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance <= 0) {
            document.getElementById(elementId).innerHTML = "Sale Ended";
            localStorage.removeItem(storageKey); // Remove from storage when expired
            return;
        }

        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById(elementId).innerHTML = `${hours}h ${minutes}m ${seconds}s`;
        setTimeout(updateTimer, 1000);
    }

    updateTimer();
}

// Start countdown timers for each card (example: 5-hour sales)
startCountdown("timer1", 6, "saleTimer1"); // Set 6 hours for the first card
startCountdown("timer2", 8, "saleTimer2"); // Set 8 hours for the second card
startCountdown("timer3", 2, "saleTimer3"); // Set 2 hours for the third card

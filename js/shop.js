const productsData = [
    {
        name: "Laptop",
        category: "electronics",
        price: 800,
        imgSrc: "../images/pc-2.jfif",
        oldPrice: 1000,
        discount: "20%",
        colors: ["Silver", "Black", "Blue"],
        sizes: ["13\"", "15\"", "17\""]
    },
    {
        name: "Shirt",
        category: "fashion",
        price: 30,
        imgSrc: "../images/watch-1.jfif",
        oldPrice: 40,
        discount: "25%",
        colors: ["Red", "Blue", "Green"],
        sizes: ["S", "M", "L"]
    },
    {
        name: "Blender",
        category: "home",
        price: 100,
        imgSrc: "../images/phone-1.jfif",
        oldPrice: 120,
        discount: "17%",
        colors: ["White", "Black", "Silver"],
        sizes: ["1.5L", "2L"]
    },
    {
        name: "Headphones",
        category: "electronics",
        price: 150,
        imgSrc: "../images/watch-1.jfif",
        oldPrice: 200,
        colors: ["White", "Black", "Silver"],
        sizes: ["S", "M", "L"],
        discount: "25%"
    },
    {
        name: "Dress",
        category: "fashion",
        price: 50,
        imgSrc: "../images/phone-1.jfif",
        oldPrice: 60,
        colors: ["Red", "Blue", "Green"],
        sizes: ["S", "M"],
        discount: "17%"
    },
    {
        name: "Microwave",
        category: "home",
        price: 200,
        imgSrc: "../images/pc-2.jfif",
        oldPrice: 250,
        discount: "20%",
        colors: ["White", "Black", "Silver"],
        sizes: ["S", "M", "L"],
    },

];

// Render Products
function renderProducts() {
    const categoryFilter = document.getElementById("category").value;
    const priceFilter = document.getElementById("price").value;
    const alphabetFilter = document.getElementById("alphabet").value;

    let filteredProducts = productsData;

    if (categoryFilter !== "all") {
        filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
    }

    if (priceFilter === "low") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (priceFilter === "high") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    if (alphabetFilter === "az") {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (alphabetFilter === "za") {
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = '';

    filteredProducts.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        productElement.innerHTML = `
            <div class="icon-container">
                <span class="icon" onclick="showModal(${index})">&#128065;</span>
                <span class="icon">&#10084;</span>
                <span class="icon" onclick="showModal(${index})">&#10133;</span>
            </div>
            <img src="${product.imgSrc}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${index})">Add to Cart</button>
        `;

        productsContainer.appendChild(productElement);
    });
}

document.getElementById("category").addEventListener("change", renderProducts);
document.getElementById("price").addEventListener("change", renderProducts);
document.getElementById("alphabet").addEventListener("change", renderProducts);

renderProducts();

// Show Modal
function showModal(index) {
    const modal = document.getElementById("productModal");
    const product = productsData[index];

    document.getElementById("modalImg").src = product.imgSrc;
    document.getElementById("modalTitle").textContent = product.name;
    document.getElementById("modalPrice").textContent = "Tk " + product.price;
    document.getElementById("modalOldPrice").textContent = "Tk " + product.oldPrice;
    document.getElementById("modalDiscount").textContent = "-" + product.discount;

    // Update Color Options
    const colorContainer = document.querySelector(".color-buttons");
    colorContainer.innerHTML = "";
    product.colors.forEach((color, i) => {
        const colorButton = document.createElement("button");
        colorButton.classList.add("color-btn");
        if (i === 0) colorButton.classList.add("active");
        colorButton.textContent = color;
        colorButton.onclick = () => {
            document.querySelectorAll(".color-btn").forEach(b => b.classList.remove("active"));
            colorButton.classList.add("active");
        };
        colorContainer.appendChild(colorButton);
    });

    // Update Size Options
    const sizeContainer = document.querySelector(".size-buttons");
    sizeContainer.innerHTML = "";
    product.sizes.forEach((size, i) => {
        const sizeButton = document.createElement("button");
        sizeButton.classList.add("size-btn");
        if (i === 0) sizeButton.classList.add("active");
        sizeButton.textContent = size;
        sizeButton.onclick = () => {
            document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
            sizeButton.classList.add("active");
        };
        sizeContainer.appendChild(sizeButton);
    });

    // Reset Quantity to 1
    let quantity = 1;
    const quantityDisplay = document.getElementById("quantity");
    quantityDisplay.textContent = quantity;

    document.getElementById("plus-btn").onclick = () => {
        if (quantity < 10) {
            quantity++;
            quantityDisplay.textContent = quantity;
        }
    };

    document.getElementById("minus-btn").onclick = () => {
        if (quantity > 1) {
            quantity--;
            quantityDisplay.textContent = quantity;
        }
    };

    // Open Modal
    modal.style.display = "flex";
}

// Close Modal
document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("productModal").style.display = "none";
});

// Add to Cart (Product-Specific)
function addToCart(index) {
    const product = productsData[index];

    const selectedColor = document.querySelector(".color-btn.active")?.textContent || product.colors[0];
    const selectedSize = document.querySelector(".size-btn.active")?.textContent || product.sizes[0];
    const quantity = document.getElementById("quantity").textContent;

    console.log(`Added to cart: ${product.name}, Color: ${selectedColor}, Size: ${selectedSize}, Quantity: ${quantity}`);
    alert(`Added ${quantity}x ${product.name} (Color: ${selectedColor}, Size: ${selectedSize}) to cart.`);
}

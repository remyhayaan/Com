

    // Toggle Filter Sidebar visibility on small screens (Slide-in from right)
    function toggleFilter() {
        const sidebar = document.getElementById("filterSidebar");
        sidebar.style.right = (sidebar.style.right === "0px") ? "-250px" : "0"; // Slide in/out
    }

    // Close the Filter Sidebar (Slide-out)
    function closeFilter() {
        const sidebar = document.getElementById("filterSidebar");
        sidebar.style.right = "-250px"; // Slide out to the right
    }

    function applyFilters() {
        // Get selected categories and price ranges
        let selectedCategories = Array.from(document.querySelectorAll('.filter-checkbox:checked')).map(cb => cb.value);
        let selectedPriceRanges = Array.from(document.querySelectorAll('.price-checkbox:checked')).map(cb => cb.value);
    
        // Get all product cards
        let products = document.querySelectorAll(".recommended-product-card");
    
        products.forEach(product => {
            let category = product.dataset.category;
            let price = Number(product.dataset.price);
    
            // Check if product matches selected filters
            let matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(category);
            let matchesPrice = selectedPriceRanges.length === 0 || (
                (selectedPriceRanges.includes("low") && price < 100) ||
                (selectedPriceRanges.includes("mid") && price >= 100 && price <= 500) ||
                (selectedPriceRanges.includes("high") && price > 500)
            );
    
            // Show or hide product based on filters
            product.style.display = (matchesCategory && matchesPrice) ? "block" : "none";
        });
    }
    
    function applySort() {
        // Get selected sort option
        let alphabeticalSort = document.querySelector('input[name="sortAlphabetical"]:checked')?.value;
        let priceSort = document.querySelector('input[name="sortPrice"]:checked')?.value;
        
        let container = document.getElementById("productContainer");
        let products = Array.from(container.getElementsByClassName("recommended-product-card"));
    
        // First, apply alphabetical sorting
        if (alphabeticalSort === "alphabeticalAtoZ") {
            products.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));
        } else if (alphabeticalSort === "alphabeticalZtoA") {
            products.sort((a, b) => b.dataset.name.localeCompare(a.dataset.name));
        }
    
        // Then, apply price sorting if selected
        if (priceSort === "priceLowHigh") {
            products.sort((a, b) => Number(a.dataset.price) - Number(b.dataset.price));
        } else if (priceSort === "priceHighLow") {
            products.sort((a, b) => Number(b.dataset.price) - Number(a.dataset.price));
        }
    
        // Reorder products in the container
        container.innerHTML = "";
        products.forEach(product => container.appendChild(product));

    }
    
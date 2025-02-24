function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('active');
}

function toggleSearchPopup() {
  document.getElementById('searchPopup').classList.toggle('active');
}

function performSearch() {
  const query = document.getElementById('searchQuery').value;
  if (query) {
      alert('Searching for: ' + query);
  } else {
      alert('Please enter a search query');
  }
}

function toggleCartSidebar() {
  document.getElementById('cartSidebar').classList.toggle('open');
}

const cart = [
  { name: 'Product 1', price: 19.99, image: '../images/phone-1.jfif' },
  { name: 'Product 2', price: 29.99, image: '../images/watch-1.jfif' },
  { name: 'Product 1', price: 19.99, image: '../images/phone-1.jfif' },
  { name: 'Product 2', price: 29.99, image: '../images/watch-1.jfif' }
];

function populateCartItems() {
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const cartTotal = document.getElementById('cartTotal');
  let total = 0;

  cartItemsContainer.innerHTML = '';

  cart.forEach((item, index) => {
      const cartItemElement = document.createElement('div');
      cartItemElement.classList.add('cart-item');
      cartItemElement.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div class="item-details">
              <div class="item-name">${item.name}</div>
              <div class="item-price">$${item.price.toFixed(2)}</div>
              <div class="quantity-selection">
                  <button class="quantity-btn" onclick="changeQuantity(${index}, -1)">-</button>
                  <span id="quantity-${index}">1</span>
                  <button class="quantity-btn" onclick="changeQuantity(${index}, 1)">+</button>
              </div>
          </div>
      `;
      cartItemsContainer.appendChild(cartItemElement);
      total += item.price;
  });

  cartTotal.textContent = total.toFixed(2);
}

function changeQuantity(index, change) {
  const quantitySpan = document.getElementById(`quantity-${index}`);
  let quantity = parseInt(quantitySpan.textContent);
  quantity = Math.max(1, quantity + change);
  quantitySpan.textContent = quantity;
}

populateCartItems();
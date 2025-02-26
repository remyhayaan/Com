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
    { name: 'KB Phone 15 Pro', price: 93000.00, image: './images/phone-1.jfif', color: 'Silver', size: '6"' },
    { name: 'KB Phone 15 Pro', price: 93000.00, image: './images/phone-1.jfif', color: 'Silver', size: '6"' },
    { name: 'KB Phone 15 Pro', price: 93000.00, image: './images/phone-1.jfif', color: 'Silver', size: '6"' }
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
                <div>Color: ${item.color}, Size: ${item.size}</div>
                <div class="item-price">Tk ${item.price.toFixed(2)}</div>
               <div class="quantity-wrappers">
    <p class="quantity-labels">Quantity:</p>
    <div class="quantity-containers">
        <button class="quantity-btns decrease" onclick="decreaseQuantity()">-</button>
        <span id="quantity-value">1</span>
        <button class="quantity-btns increase" onclick="increaseQuantity()">+</button>
    </div>
</div>

                 <a class="removeBEtn" onclick="removeItem(${index})">Remove</a>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemElement);
        total += item.price;
    });

    cartTotal.textContent = `Tk ${total.toFixed(2)}`;
}

function changeQuantity(index, change) {
    const quantitySpan = document.getElementById(`quantity-${index}`);
    let quantity = parseInt(quantitySpan.textContent);
    quantity = Math.max(1, quantity + change);
    quantitySpan.textContent = quantity;
}

function removeItem(index) {
    cart.splice(index, 1);
    populateCartItems();
}

populateCartItems();

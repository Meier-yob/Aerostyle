let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in navbar
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
        cartCount.style.display = cart.length > 0 ? 'inline' : 'none';
    }
}

// Display cart items (Shopee-like: image, name, price, quantity controls, remove)
function displayCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const totalPriceSpan = document.getElementById('total-price');
    cartItemsDiv.innerHTML = '';
    let total = 0;
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty. <a href="/pages/index.html">Continue shopping</a>.</p>';
    } else {
        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                        <img src="${item.image}" alt="${item.name}" style="width: 100px; height: 100px;">
                        <div class="item-details">
                            <h4>${item.name}</h4>
                            <p>₱${item.price}</p>
                            <div class="quantity-controls">
                                <button onclick="changeQuantity(${index}, -1)">-</button>
                                <span>${item.quantity}</span>
                                <button onclick="changeQuantity(${index}, 1)">+</button>
                            </div>
                            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                        </div>
                    `;
            cartItemsDiv.appendChild(itemDiv);
            total += item.price * item.quantity;
        });
    }
    totalPriceSpan.textContent = total.toFixed(2);
}

// Change quantity (like Shopee: + and - buttons)
function changeQuantity(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1); // Remove if quantity is 0
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

// Checkout (placeholder - can integrate with payment later)
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert(`Checkout total: ₱${document.getElementById('total-price').textContent}. (This is a placeholder - integrate with payment gateway for real checkout.)`);
        // Example: Redirect to a checkout page
        // window.location.href = 'checkout.html';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
    displayCart();
});
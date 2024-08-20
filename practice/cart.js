const cartItemsList = document.querySelector('.cart-items');
const totalPriceEl = document.getElementById('total-price');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the cart display
function updateCart() {
    cartItemsList.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;

        const cartItem = document.createElement('li');
        cartItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        cartItem.innerHTML = `
            <div class="item-details d-flex align-items-center">
                <img src="${item.image}" alt="${item.title}">
                <div>
                    <span class="item-title">${item.title}</span><br>
                    <span class="item-price">$${item.price}</span>
                </div>
            </div>
            <div class="item-actions d-flex align-items-center">
                <div class="quantity-control">
                    <button class="btn btn-primary btn-sm decrease-quantity" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="btn btn-primary btn-sm increase-quantity" data-id="${item.id}">+</button>
                </div>
                <span class="remove-item" data-id="${item.id}">&times;</span>
            </div>
        `;
        cartItemsList.appendChild(cartItem);
    });

    totalPriceEl.innerText = totalPrice.toFixed(2);

    // Add event listeners to Remove and Quantity buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeItem);
    });

    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });

    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });
}

// Remove item from the cart
function removeItem(event) {
    const productId = event.target.dataset.id;
    cart = cart.filter(item => item.id !== parseInt(productId));
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Decrease item quantity in the cart
function decreaseQuantity(event) {
    const productId = event.target.dataset.id;
    const cartItem = cart.find(item => item.id === parseInt(productId));
    if (cartItem.quantity > 1) {
        cartItem.quantity--;
    } else {
        removeItem(event);
        return;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Increase item quantity in the cart
function increaseQuantity(event) {
    const productId = event.target.dataset.id;
    const cartItem = cart.find(item => item.id === parseInt(productId));
    cartItem.quantity++;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Initial update
updateCart();


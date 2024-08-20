const productList = document.getElementById('product-list');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Fetch products from the API
fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => displayProducts(products));

// Display products using Bootstrap cards
function displayProducts(products) {
    products.forEach(product => {
        const productCol = document.createElement('div');
        productCol.classList.add('col-md-4', 'col-sm-6', 'mb-4');

        const productCard = document.createElement('div');
        productCard.classList.add('card', 'h-100', 'product-card');

        productCard.innerHTML = `
            <img src="${product.image}" class="card-img-top" alt="${product.title}">
            <div class="card-body d-flex flex-column justify-content-between">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">$${product.price}</p>
                <button class="btn btn-primary mt-auto add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productCol.appendChild(productCard);
        productList.appendChild(productCol);
    });

    // Add event listeners to the Add to Cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add product to the cart
function addToCart(event) {
    const productId = event.target.dataset.id;
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            const cartItem = cart.find(item => item.id === product.id);
            if (cartItem) {
                cartItem.quantity++;
            } else {
                product.quantity = 1;
                cart.push(product);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
        });
}


// Mock data for products
const products = [
    {
        id: 1,
        name: "Яблоки Голден",
        price: 2.99,
        category: "fruits",
        icon: "fas fa-apple-alt"
    },
    {
        id: 2,
        name: "Куриное филе",
        price: 8.49,
        category: "meat",
        icon: "fas fa-drumstick-bite"
    },
    {
        id: 3,
        name: "Молоко Простоквашино",
        price: 1.89,
        category: "dairy",
        icon: "fas fa-wine-bottle"
    },
    {
        id: 4,
        name: "Хлеб Бородинский",
        price: 1.29,
        category: "bakery",
        icon: "fas fa-bread-slice"
    },
    {
        id: 5,
        name: "Сок Яблочный",
        price: 2.49,
        category: "drinks",
        icon: "fas fa-wine-bottle"
    },
    {
        id: 6,
        name: "Пельмени Сибирские",
        price: 5.99,
        category: "frozen",
        icon: "fas fa-snowflake"
    },
    {
        id: 7,
        name: "Бананы",
        price: 3.49,
        category: "fruits",
        icon: "fas fa-apple-alt"
    },
    {
        id: 8,
        name: "Сыр Российский",
        price: 6.99,
        category: "dairy",
        icon: "fas fa-cheese"
    }
];

// Cart functionality
let cart = [];
let totalPrice = 0;

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const totalPriceElement = document.getElementById('totalPrice');
const cartCount = document.querySelector('.cart-count');
const cartIcon = document.querySelector('.cart-icon');
const closeCart = document.querySelector('.close-cart');
const checkoutBtn = document.querySelector('.checkout-btn');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupEventListeners();
});

function loadProducts() {
    productsGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <i class="${product.icon}"></i>
        </div>
        <div class="product-info">
            <div class="product-title">${product.name}</div>
            <div class="product-price">${product.price.toFixed(2)} руб.</div>
            <button class="add-to-cart" data-id="${product.id}">
                Добавить в корзину
            </button>
        </div>
    `;
    return card;
}

function setupEventListeners() {
    // Cart icon click
    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'block';
        updateCartDisplay();
    });

    // Close cart modal
    closeCart.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Add to cart buttons
    productsGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        }
    });

    // Checkout button
    checkoutBtn.addEventListener('click', checkout);

    // Category filters
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const category = e.currentTarget.getAttribute('data-category');
            filterProducts(category);
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    
    searchButton.addEventListener('click', () => {
        performSearch(searchInput.value);
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartCount();
    showNotification(`${product.name} добавлен в корзину!`);
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function updateCartDisplay() {
    cartItems.innerHTML = '';
    totalPrice = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${item.price.toFixed(2)} руб. × ${item.quantity}</div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
            </div>
        `;
        cartItems.appendChild(cartItemElement);
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);

    // Add event listeners for quantity buttons
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            updateQuantity(id, -1);
        });
    });

    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            updateQuantity(id, 1);
        });
    });
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        updateCartCount();
        updateCartDisplay();
    }
}

function filterProducts(category) {
    const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);
    
    productsGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function performSearch(query) {
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
    );
    
    productsGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function checkout() {
    if (cart.length === 0) {
        alert('Корзина пуста!');
        return;
    }

    alert(`Заказ оформлен! Сумма: ${totalPrice.toFixed(2)} руб.\nСпасибо за покупку!`);
    cart = [];
    updateCartCount();
    updateCartDisplay();
    cartModal.style.display = 'none';
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// ========== Update Cart Count ==========
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0); // Count total items, not just products
    const cartCountElement = document.getElementById('cart-count');
    console.log("cartCountElement?//////////////", cartCountElement);

    if (cartCountElement) {
        cartCountElement.textContent = count;
    }
}

// ========== Add to Cart ==========
function addToCart(button) {
    const productInfo = button.closest('.product-info');

    const product = {
        name: productInfo.querySelector('.product-name')?.textContent.trim() || '',
        price: productInfo.querySelector('.current-price')?.textContent.trim() || '',
        image: productInfo.closest('.product-card')?.querySelector('.product-image')?.src || '',
        quantity: 1
    };

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.name === product.name);
    console.log("cart>>>>", cart);
    
    if (existing) {
        existing.quantity += 1; 
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Item added to cart');
}

// ========== Load Cart Items ==========
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('cartItemsContainer');

    if (!container) return; 

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="px-6 py-12 text-center text-gray-500">
                <i class="fas fa-shopping-cart text-5xl mb-4"></i>
                <p class="text-lg">Your cart is empty</p>
            </div>
        `;
        updateCartSummary();
        return;
    }

    container.innerHTML = cart.map((item, index) => `
        <div class="grid grid-cols-12 gap-4 px-6 py-6 border-b items-center" data-index="${index}">
            <div class="col-span-1">
                <i class="fa-solid fa-trash-can text-gray-400 hover:text-red-500 cursor-pointer" onclick="removeFromCart(${index})"></i>
            </div>
            <div class="col-span-4 flex items-center space-x-4">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded" onerror="this.src='https://via.placeholder.com/100'">
                <span class="text-sm font-medium text-gray-800">${item.name}</span>
            </div>
            <div class="col-span-2 text-center">
                <span class="text-gray-800 font-semibold current-price">${item.price}</span>
            </div>
            <div class="col-span-3 flex justify-center">
                <div class="flex items-center border border-gray-300 rounded">
                    <button class="px-3 py-1 text-gray-600 hover:bg-gray-100" onclick="updateQuantity(${index}, -1)">−</button>
                    <input type="text" value="${item.quantity}" class="w-12 text-center border-x border-gray-300 py-1 focus:outline-none" readonly>
                    <button class="px-3 py-1 text-gray-600 hover:bg-gray-100" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
            </div>
            <div class="col-span-2 text-right font-semibold text-gray-800 current-price">$${calculateItemTotal(item)}</div>
        </div>
    `).join('');

    updateCartSummary();
}

// ========== Calculate Item Total ==========
function calculateItemTotal(item) {
    const price = parseFloat(item.price.replace('$', ''));
    return (price * item.quantity).toFixed(2);
}

// ========== Update Quantity ==========
function updateQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity < 1) cart[index].quantity = 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
        updateCartCount();
    }
}

// ========== Remove from Cart ==========
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
    updateCartCount();
    showNotification('Item removed from cart');
}

// ========== Update Cart Summary (Single Function) ==========
function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;

    // Calculate subtotal
    cart.forEach(item => {
        const price = parseFloat(item.price.replace('$', '').trim());
        subtotal += price * item.quantity;
    });

    // Get shipping from global variable or default
    const shippingCost = typeof shipping !== 'undefined' ? shipping : 22.00;
    const total = subtotal + shippingCost;

    // Update all possible elements (for different pages)
    const subtotalEl = document.getElementById('subtotal') || document.getElementById('cartSubtotal');
    const shippingEl = document.getElementById('shippingCost');
    const totalEl = document.getElementById('total') || document.getElementById('cartTotal');

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = `$${shippingCost.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

// ========== Show Notification ==========
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ef4444' : '#02B290'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 1800);
}

// ========== Notification Animations CSS ==========
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {opacity: 0; transform: translateY(-10px);}
        to {opacity: 1; transform: translateY(0);}
    }
    @keyframes fadeOut {
        from {opacity: 1; transform: translateY(0);}
        to {opacity: 0; transform: translateY(-10px);}
    }
`;
document.head.appendChild(style);

// ========== DOM Content Loaded ==========
document.addEventListener('DOMContentLoaded', function() {
    loadCartItems();
    updateCartCount();
});

// ========== Shipping & Address Modal ==========
let shipping = 22;
let address = "CA";

const modal = document.getElementById("addressModal");
const changeAddressBtn = document.getElementById("changeAddress");
const saveAddressBtn = document.getElementById("saveAddress");
const shippingAddress = document.getElementById("shippingAddress");

if (changeAddressBtn) {
    changeAddressBtn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.classList.remove("hidden");
    });
}

if (saveAddressBtn) {
    saveAddressBtn.addEventListener("click", () => {
        const select = document.getElementById("addressSelect");
        const selectedOption = select.options[select.selectedIndex];
        address = selectedOption.value;
        shipping = parseFloat(selectedOption.dataset.shipping);
        shippingAddress.textContent = address;
        modal.classList.add("hidden");
        updateCartSummary();
    });
}
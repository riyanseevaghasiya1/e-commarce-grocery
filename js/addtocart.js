// ========== Update Cart Count ==========
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (!cartCount) return;

    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    const totalUniqueItems = cartData.length;
    cartCount.textContent = totalUniqueItems;
}

// ========== Add to Cart ==========
function addToCart(button) {
    const productInfo = button.closest('.product-info');
    const productCard = button.closest('.product-card');

    // Get product name
    const productNameElement = productInfo.querySelector('.product-name');
    const productName = productNameElement 
        ? productNameElement.childNodes[0]?.textContent.trim() || productNameElement.textContent.trim()
        : '';
    
    // Clean up the name
    const cleanName = productName.replace(/\s+/g, ' ').trim();
    const weightText = productInfo.querySelector('.weight')?.textContent.trim() || '';
    const weight = weightText.replace(/[()]/g, '').trim();

    const product = {
        id: cleanName,
        name: cleanName,
        weight: weight,
        price: productInfo.querySelector('.current-price')?.textContent.trim() || '',
        image: productCard?.querySelector('.product-image')?.src || '',
        quantity: 1
    };

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.name === product.name && item.weight === product.weight);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateAddToCartButtons();
    showNotification('Item added to cart');
}

// ========== Update Add to Cart Buttons ==========
function updateAddToCartButtons() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    document.querySelectorAll('.product-card').forEach(card => {
        // Extract and clean the name the SAME way as in addToCart
        const productNameElement = card.querySelector('.product-name');
        const productName = productNameElement 
            ? productNameElement.childNodes[0]?.textContent.trim() || productNameElement.textContent.trim()
            : '';
        
        const cleanName = productName.replace(/\s+/g, ' ').trim();
        
        const weightText = card.querySelector('.weight')?.textContent.trim() || '';
        const weight = weightText.replace(/[()]/g, '').trim();
        
        const btn = card.querySelector('.add-to-cart');

        if (!btn || !cleanName) return;

        // Check if product exists in cart (match both name AND weight)
        const exists = cart.some(item => item.name === cleanName && item.weight === weight);

        if (exists) {
            btn.classList.add('added');
            btn.disabled = true;
        } else {
            btn.classList.remove('added');
            btn.disabled = false;
        }
    });
}

// ========== Show Cart Skeleton ==========
function showCartSkeleton() {
    const container = document.getElementById('cartItemsContainer');
    if (!container) return;

    container.innerHTML = `
        ${[1, 2, 3].map(() => `
            <div class="grid grid-cols-12 gap-4 px-6 py-6 border-b items-center animate-pulse">
                <div class="col-span-1">
                    <div class="w-5 h-5 bg-gray-200 rounded"></div>
                </div>
                <div class="col-span-4 flex items-center space-x-4">
                    <div class="w-16 h-16 bg-gray-200 rounded"></div>
                    <div class="space-y-2 flex-1">
                        <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div class="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
                <div class="col-span-2 flex justify-center">
                    <div class="h-5 bg-gray-200 rounded w-16"></div>
                </div>
                <div class="col-span-3 flex justify-center">
                    <div class="flex items-center border border-gray-200 rounded">
                        <div class="w-8 h-8 bg-gray-200"></div>
                        <div class="w-12 h-8 bg-gray-100"></div>
                        <div class="w-8 h-8 bg-gray-200"></div>
                    </div>
                </div>
                <div class="col-span-2 flex justify-end">
                    <div class="h-5 bg-gray-200 rounded w-20"></div>
                </div>
            </div>
        `).join('')}
    `;
}
// Function to get product index by name
function getProductIndexByName(name) {
    return allProducts.findIndex(p => p.name === name);
}
// ========== Load Cart Items ==========
// ========== Load Cart Items ==========
function loadCartItems() {
    const container = document.getElementById('cartItemsContainer');
    if (!container) return;

    showCartSkeleton();

    setTimeout(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length === 0) {
            container.innerHTML = `
                <div class="px-6 py-12 text-center text-gray-500">
                    <i class="fas fa-shopping-cart text-5xl mb-4"></i>
                    <p class="text-lg">Your cart is empty</p>
                    <button class="bg-[#02B290] text-white mt-2 px-3 py-2 rounded-lg text-sm hover:bg-[#4dc9b1] transition">
                        <a href="./Shop.html">Shop Now</a>
                    </button>
                </div>
            `;
            updateCartSummary();
            return;
        }

        container.innerHTML = cart.map((item, index) => `
            <div class="grid grid-cols-12 gap-4 px-6 py-6 border-b items-center" data-index="${index}" data-id="${item.id || ''}">
                <div class="col-span-1">
                    <i class="fa-solid fa-trash-can text-gray-400 hover:text-red-500 cursor-pointer" onclick="removeFromCart(${index})"></i>
                </div>
                <div class="col-span-4 flex items-center space-x-4">
                    <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded cursor-pointer" onclick="viewProductDetails(getProductIndexByName('${item.name}'))" onerror="this.src='https://via.placeholder.com/100'">
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
    }, 800);
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
        updateAddToCartButtons();
    }
}

// ========== Remove from Cart ==========
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
    updateCartCount();
    updateAddToCartButtons();
    showNotification('Item removed from cart');
}

// ========== Update Cart Summary ==========
function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;

    const isCartEmpty = cart.length === 0;

    if (!isCartEmpty) {
        cart.forEach(item => {
            const price = parseFloat(item.price.replace('$', '').trim());
            subtotal += price * item.quantity;
        });
    }

    const shippingCost = isCartEmpty ? 0 : 22.00;
    const total = subtotal + shippingCost;

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

// ========== DOM Content Loaded - FIX IS HERE ==========
document.addEventListener('DOMContentLoaded', function () {
    // ✅ THIS RUNS WHEN DOM IS READY
    updateCartCount();
    loadCartItems();
    // updateAddToCartButtons();
    setTimeout(() => {
        updateAddToCartButtons();
    }, 700);
    if (document.getElementById('cartItemsContainer')) {
        loadCartItems();
    }

    updateCartSummary();
});

// ✅ ALSO UPDATE ON PAGE SHOW (handles back/forward navigation)
window.addEventListener('pageshow', function (event) {
    updateCartCount();
    // updateAddToCartButtons();
    setTimeout(() => {
        updateAddToCartButtons();
    }, 100);
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

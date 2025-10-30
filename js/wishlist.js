
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];


function saveWishlistToStorage() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function updateWishlistCount() {
    const countElement = document.getElementById('wishlistCount');
    console.log("countElement",countElement);
    
    if (!countElement) return;

    countElement.textContent = wishlist.length;
    countElement.style.display = wishlist.length > 0 ? 'flex' : 'none';
}
function addToWishlist(button) {
    const productCard = button.closest('.product-card');
    if (!productCard) return;
    const productId = productCard.dataset.id || productCard.querySelector('.product-name').textContent.trim();
    const productData = {
        id: productId,
        image: productCard.querySelector('.product-image')?.src || '',
        name: productCard.querySelector('.product-name')?.textContent.trim() || '',
        price: productCard.querySelector('.current-price')?.textContent.trim() || '',
        rating: productCard.querySelector('.stars')?.textContent.trim() || '',
        badge: productCard.querySelector('.product-badge')?.textContent.trim() || ''
    };
    const existingIndex = wishlist.findIndex(item => item.id === productId);
    const heartIcon = button.querySelector('i');
    if (existingIndex === -1) {
        wishlist.push(productData);
        heartIcon.classList.remove('far');
        heartIcon.classList.add('fas');
        button.style.color = '#ef4444';
        showNotification('✓ Added to wishlist!');
    } else {
        // Remove existing
        wishlist.splice(existingIndex, 1);
        heartIcon.classList.remove('fas');
        heartIcon.classList.add('far');
        button.style.color = '';
        showNotification(' Removed from wishlist!');
    }

    saveWishlistToStorage();
    updateWishlistCount();
}
function checkWishlistStatus() {
    const heartButtons = document.querySelectorAll('.wishlist-btn');
    heartButtons.forEach(button => {
        const productCard = button.closest('.product-card');
        if (!productCard) return;
        const productId = productCard.dataset.id || productCard.querySelector('.product-name').textContent.trim();
        const isInWishlist = wishlist.some(item => item.id === productId);
        const heartIcon = button.querySelector('i');
        if (isInWishlist) {
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
            button.style.color = '#ef4444';
        } else {
            heartIcon.classList.remove('fas');
            heartIcon.classList.add('far');
            button.style.color = '';
        }
    });
}
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #10b981;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 9999;
        font-weight: 600;
        transition: opacity 0.3s;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

function openQuickView(button) {
    showNotification('Quick view clicked!');
}

window.addEventListener('storage', (e) => {
    if (e.key === 'wishlist') {
        wishlist = JSON.parse(e.newValue) || [];
        updateWishlistCount();
        checkWishlistStatus();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    checkWishlistStatus();

    const checkHeaderLoaded = setInterval(() => {
        const countElement = document.getElementById('wishlistCount');
        if (countElement) {
            updateWishlistCount();
            clearInterval(checkHeaderLoaded); 
        }
    }, 200); 
});
function renderWishlistPage() {
    const wishlistContainer = document.getElementById('wishlistContainer');
    if (!wishlistContainer) return; 

    wishlistContainer.innerHTML = ''; 

    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = `
            <div class="text-center py-16">
                <h2 class="text-2xl font-semibold text-gray-700">Your wishlist is empty 😢</h2>
                <p class="text-gray-500 mt-2">Add some products you love!</p>
            </div>
        `;
        return;
    }
    wishlist.forEach((item) => {
        const row = document.createElement('div');
        row.className = "p-6 border-b border-gray-100 ";
        row.innerHTML = `
            <div class="grid grid-cols-6 gap-4 items-center ">
                <div>
                    <img src="${item.image}" alt="${item.name}" width="100px" class="rounded-md">
                </div>
                <div class="col-span-2 text-left">
                    <h3 class="text-gray-900 font-medium text-lg mb-1">${item.name}</h3>
                    <p class="text-gray-600 text-sm mb-1">${item.badge ? `Badge: ${item.badge}` : ''}</p>
                </div>
                <div class="text-left">
                    <p class="text-gray-900 font-medium text-lg">${item.price || '—'}</p>
                </div>
                <div class="text-left">
                    <span class="inline-block text-green-600 font-medium">In Stock</span>
                </div>
                <div class="flex gap-2 justify-start">
                    <button class="bg-[#02B290] hover:bg-[#029b80] text-white p-3 rounded transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </button>
                    <button onclick="removeFromWishlist('${item.id}')" 
                        class="bg-gray-700 hover:bg-gray-800 text-white p-3 rounded transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        `;
        wishlistContainer.appendChild(row);
    });
}
function removeFromWishlist(productId) {
    wishlist = wishlist.filter(item => item.id !== productId);
    saveWishlistToStorage();
    updateWishlistCount();
    renderWishlistPage();
    showNotification('✗ Removed from wishlist!');
}
document.addEventListener('DOMContentLoaded', () => {
    renderWishlistPage();
});

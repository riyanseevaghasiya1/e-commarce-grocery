let wishlist = [];
let cart = [];

try {
  wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  cart = JSON.parse(localStorage.getItem('cart')) || [];
} catch (e) {
  console.warn('localStorage not available, using in-memory storage');
}

console.log("wishlist????????", wishlist);
console.log('cart>>>>>>>>>', cart);

function uniqueById(items) {
  const map = new Map();
  items.forEach(it => {
    if (it && typeof it.id !== 'undefined') {
      if (!map.has(String(it.id))) map.set(String(it.id), it);
    }
  });
  return Array.from(map.values());
}
wishlist = uniqueById(wishlist);

function normalizeId(text) {
  const t = String(text || '').trim();
  if (!t) return '';
  const noParen = t.replace(/\s*\([^)]*\)\s*$/, '').trim();
  return noParen;
}

// Normalize existing wishlist IDs on load for cross-page consistency
wishlist = wishlist.map(it => Object.assign({}, it, { id: normalizeId(it.id), name: normalizeId(it.name) }));
wishlist = uniqueById(wishlist);

function deriveDefaultWeightByName(name) {
  try {
    if (typeof allProducts === 'undefined' || !Array.isArray(allProducts)) return '';
    const p = allProducts.find(q => normalizeId(q.name) === normalizeId(name));
    if (!p) return '';
    if (Array.isArray(p.options) && p.options.length) {
      const u = (p.unit || '').toLowerCase();
      let desired = '';
      if (u === 'g') desired = `${p.quantity} g`;
      else if (u === 'kg') desired = `${p.quantity} Kg`;
      else if (u === 'ml') desired = `${p.quantity} ml`;
      else if (u === 'l') desired = `${p.quantity} L`;
      else if (u === 'pcs') desired = `${p.quantity} pcs`;
      const match = p.options.find(o => (o.label || '').toLowerCase() === (desired || '').toLowerCase());
      return match ? match.label : p.options[0].label;
    } else {
      const u = p.unit;
      const q = p.quantity;
      return u === 'ml' ? `${q} ml` : u === 'L' ? `${q} L` : u === 'g' ? `${q} g` : u === 'pcs' ? `${q} pcs` : `${q} Kg`;
    }
  } catch (e) { return ''; }
}

wishlist = wishlist.map(it => {
  if (!it.weight || !String(it.weight).trim()) {
    return Object.assign({}, it, { weight: deriveDefaultWeightByName(it.name) });
  }
  return it;
});
saveWishlistToStorage();

function saveWishlistToStorage() {
  try {
    wishlist = uniqueById(wishlist);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  } catch (e) {
    console.warn('Could not save to localStorage');
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (e) {
    console.warn('Could not save to localStorage');
  }
}

function updateWishlistCount() {
  const countElement = document.getElementById('wishlistCount');
  if (!countElement) return;

  countElement.textContent = wishlist.length;
  countElement.style.display = 'flex';
}

function updateCartCount() {
  const countElement = document.getElementById('cartCount');
  if (!countElement) return;

  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  countElement.textContent = totalQty;
  countElement.style.display = totalQty > 0 ? 'flex' : 'none';
}

function addToWishlist(button) {
  const card = button.closest('.product-card');
  let productId = '';
  let productData = null;

  if (card) {
    const rawName = card.querySelector('.product-name')?.textContent.trim() || card.dataset.id || '';
    productId = normalizeId(rawName);

    // Extract weight
    const weightText = card.querySelector('.weight')?.textContent.trim() || '';
    let weight = weightText.replace(/[()]/g, '').trim();
    if (!weight) {
      try {
        if (typeof allProducts !== 'undefined' && Array.isArray(allProducts)) {
          const p = allProducts.find(q => normalizeId(q.name) === productId);
          if (p) {
            if (Array.isArray(p.options) && p.options.length) {
              const u = (p.unit || '').toLowerCase();
              let desired = '';
              if (u === 'g') desired = `${p.quantity} g`;
              else if (u === 'kg') desired = `${p.quantity} Kg`;
              else if (u === 'ml') desired = `${p.quantity} ml`;
              else if (u === 'l') desired = `${p.quantity} L`;
              else if (u === 'pcs') desired = `${p.quantity} pcs`;
              const match = p.options.find(o => (o.label || '').toLowerCase() === (desired || '').toLowerCase());
              weight = match ? match.label : p.options[0].label;
            } else {
              const u = p.unit;
              const q = p.quantity;
              weight = u === 'ml' ? `${q} ml` : u === 'L' ? `${q} L` : u === 'g' ? `${q} g` : u === 'pcs' ? `${q} pcs` : `${q} Kg`;
            }
          }
        }
      } catch (e) {}
    }

    productData = {
      id: productId,
      image: card.querySelector('.product-image')?.src || '',
      name: normalizeId(rawName),
      price: card.querySelector('.current-price')?.textContent.trim() || '',
      rating: card.querySelector('.stars')?.textContent.trim() || '',
      badge: card.querySelector('.product-badge')?.textContent.trim() || '',
      weight: weight
    };
  } else {
    const nameEl = document.querySelector('.mainproductname') || document.querySelector('.productname') || document.querySelector('h1');
    const name = normalizeId((nameEl?.textContent || '').trim());
    productId = name;
    const img = document.getElementById('mainImg')?.src || '';
    let price = '$0.00';
    const pc = document.getElementById('currentPrice');
    if (pc) {
      const t = pc.textContent.trim();
      const m = t.match(/\$?\d+(?:\.\d+)?/);
      if (m) price = m[0].includes('$') ? m[0] : `$${m[0]}`;
    }
    const selectedWeightEl =
      document.querySelector('[class*="weight-option"][class*="bg-[#02B290]"]') ||
      document.querySelector('[class*="weight-option"][class*="bg-\\[\\#02B290\\]"]') ||
      document.querySelector('[class*="weight-option"].active') ||
      document.querySelector('.weight-option');
    const selectedWeight = selectedWeightEl ? selectedWeightEl.textContent.trim() : '';
    productData = {
      id: productId,
      image: img,
      name,
      price,
      rating: '',
      badge: '',
      weight: selectedWeight
    };
  }

  const existingIndex = wishlist.findIndex((item) => item.id === productId);
  const heartIcon = button.querySelector('i');

  if (existingIndex === -1) {
    wishlist.push(productData);
    if (heartIcon) {
      heartIcon.classList.remove('far');
      heartIcon.classList.add('fas');
    }
    if (card) {
      button.style.backgroundColor = '#ef4444';
      button.style.color = '#ffffff';
      button.style.borderRadius = '50%';
      button.style.padding = '8px';
    } else {
      button.textContent = 'Remove from Wishlist';
      button.disabled = false;
      button.style.backgroundColor = '#ef4444';
      button.style.color = '#ffffff';
    }
    showNotification('✓ Added to Wishlist!');
  } else {
    wishlist.splice(existingIndex, 1);
    if (heartIcon) {
      heartIcon.classList.remove('fas');
      heartIcon.classList.add('far');
    }
    if (card) {
      button.style.backgroundColor = '';
      button.style.color = '';
      button.style.borderRadius = '';
      button.style.padding = '';
    } else {
      button.textContent = 'Add to Wishlist';
      button.disabled = false;
      button.style.backgroundColor = '#02B290';
      button.style.color = '#ffffff';
    }
    showNotification('✗ Removed from wishlist!');
  }

  saveWishlistToStorage();
  updateWishlistCount();
  checkWishlistStatus();
  checkProductDetailWishlistStatus();
}

function checkWishlistStatus() {
  // ✅ FIXED: Find ALL buttons with heart icons, not just .wishlist-btn
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach((productCard) => {
    // Find the button with onclick="addToWishlist(this)"
    const button = productCard.querySelector('button[onclick*="addToWishlist"]');
    if (!button) return;

    const rawName =
      productCard.querySelector('.product-name')?.textContent.trim() ||
      productCard.dataset.id || '';
    const productId = normalizeId(rawName);

    if (!productId) return;

    const isInWishlist = wishlist.some((item) => item.id === productId);
    const heartIcon = button.querySelector('i');
    if (!heartIcon) return;

    if (isInWishlist) {
      heartIcon.classList.remove('far');
      heartIcon.classList.add('fas');
      button.style.backgroundColor = '#ef4444';
      button.style.color = '#ffffff';
      button.style.borderRadius = '50%';
      button.style.padding = '8px';
    } else {
      heartIcon.classList.remove('fas');
      heartIcon.classList.add('far');
      button.style.backgroundColor = '';
      button.style.color = '';
      button.style.borderRadius = '';
      button.style.padding = '';
    }
  });
}

function checkProductDetailWishlistStatus() {
  const detailButton = Array.from(document.querySelectorAll('button[onclick*="addToWishlist"]'))
    .find(btn => !btn.closest('.product-card'));
  if (!detailButton) return;

  const nameEl = document.querySelector('.mainproductname') || document.querySelector('.productname') || document.querySelector('h1');
  const name = normalizeId((nameEl?.textContent || '').trim());
  const productId = name;

  if (!productId) return;

  const isInWishlist = wishlist.some((item) => item.id === productId);
  detailButton.style.transition = 'background-color 0.3s ease';

  if (isInWishlist) {
    detailButton.textContent = 'Remove from Wishlist';
    detailButton.disabled = false;
    detailButton.style.backgroundColor = '#ef4444';
    detailButton.style.color = '#ffffff';
    detailButton.onmouseenter = () => {
      detailButton.style.backgroundColor = '#dc2626';
    };
    detailButton.onmouseleave = () => {
      detailButton.style.backgroundColor = '#ef4444';
    };
  } else {
    detailButton.textContent = 'Add to Wishlist';
    detailButton.disabled = false;
    detailButton.style.backgroundColor = '#02B290';
    detailButton.style.color = '#ffffff';
    detailButton.onmouseenter = () => {
      detailButton.style.backgroundColor = '#4dc9b1';
    };
    detailButton.onmouseleave = () => {
      detailButton.style.backgroundColor = '#02B290';
    };
  }
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #02B290;
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

window.addEventListener('storage', (e) => {
  if (e.key === 'wishlist') {
    wishlist = JSON.parse(e.newValue) || [];
    wishlist = wishlist.map(it => Object.assign({}, it, { id: normalizeId(it.id), name: normalizeId(it.name) }));
    wishlist = uniqueById(wishlist);
    updateWishlistCount();
    checkWishlistStatus();
    checkProductDetailWishlistStatus();
  }
  if (e.key === 'cart') {
    cart = JSON.parse(e.newValue) || [];
    updateCartCount();
  }
});

function renderWishlistPage() {
  const wishlistContainer = document.getElementById('wishlistContainer');
  const wishlistSkeleton = document.getElementById('wishlistSkeleton');

  if (!wishlistContainer) return;

  showWishlistSkeleton(wishlist.length === 0 ? 3 : wishlist.length);

  setTimeout(() => {
    wishlistSkeleton.classList.add("hidden");
    wishlistContainer.classList.remove("hidden");
    wishlistContainer.innerHTML = '';

    if (wishlist.length === 0) {
      wishlistContainer.innerHTML = `
        <div class="text-center py-16">
          <i class="fas fa-heart text-5xl mb-4"></i>
          <p class="text-lg">Your wishlist is empty</p>
          <p class="text-gray-500 mt-2">Add some products you love!</p>
          <button class="bg-[#02B290] text-white mt-2 px-3 py-2 rounded-lg text-sm hover:bg-[#4dc9b1] transition">
            <a href="./Shop.html">Shop Now</a>
          </button>
        </div>
      `;
      return;
    }

    wishlist.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'p-6 border-b border-gray-100';
      row.dataset.id = item.id;
      console.log("item,,,,,,,,,,,", item);

      row.innerHTML = `
        <div class="grid grid-cols-6 gap-4 items-center">
          <div>
            <img src="${item.image}" alt="${item.name}" width="100px" class="rounded-md">
          </div>

          <div class="col-span-2 text-left">
            <h3 class="text-gray-900 font-medium text-lg mb-1 product-name1">${item.name} ${item.weight ? `<span class="text-xs text-gray-500 weight1">(${item.weight})</span>` : ''}</h3>
            <p class="text-gray-600 text-sm mb-1">${item.badge ? `Badge: ${item.badge}` : ''}</p>
          </div>

          <div class="text-left">
            <p class="text-gray-900 font-medium text-lg current-price">${item.price || '—'}</p>
          </div>

          <div class="text-left">
            <span class="inline-block text-[#4dc9b1] font-medium">In Stock</span>
          </div>

          <div class="flex gap-2 justify-start">
            <button class="add-to-cart bg-[#02B290] hover:bg-[#4dc9b1] text-white p-3 rounded transition-colors"
              onclick="addToCartFromWishlist(this)">
              <i class="fas fa-shopping-bag"></i>
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
  }, 1800);
}

function removeFromWishlist(productId) {
  wishlist = wishlist.filter((item) => item.id !== productId);
  saveWishlistToStorage();
  updateWishlistCount();
  renderWishlistPage();
  checkWishlistStatus();
  showNotification('✗ Removed from wishlist!');
}
function removeItemFromWishlistById(productId) {
  const index = wishlist.findIndex(item => item.id === productId);
  if (index === -1) return;

  wishlist.splice(index, 1);
  saveWishlistToStorage();
  updateWishlistCount();
  checkWishlistStatus();
}

function addToCartFromWishlist(button) {
  const row = button.closest('.p-6.border-b');
  if (!row) return;

  const productId = row.dataset.id;
  if (!productId) return;

  // 🔹 Get product directly from wishlist
  const wishlistItem = wishlist.find(item => item.id === productId);
  if (!wishlistItem) return;
  console.log(wishlistItem);


  // 🔹 Create cart product using wishlist data
  const product = {
    id: wishlistItem.id,
    name: wishlistItem.name,
    weight: wishlistItem.weight || '',
    price: wishlistItem.price,
    image: wishlistItem.image,
    quantity: 1
  };

  // 🔹 Check if product already in cart
  const existingIndex = cart.findIndex(item => item.name === product.name && item.weight === product.weight);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += 1;
    showNotification('🛒 Quantity updated in cart!');
  } else {
    cart.push(product);
    showNotification('🛍️ Added to cart!');
  }

  saveCartToStorage();
  updateCartCount();
  try { if (typeof updateAddToCartButtons === 'function') updateAddToCartButtons(); } catch (e) {}

  // 🔹 Remove from wishlist after adding to cart
  removeItemFromWishlistById(productId);
  renderWishlistPage();
}



// function addToCart(button) {
//   const productCard = button.closest('.product-card') || button.closest('.product-info');
//   if (!productCard) return;

//   const productId =
//     productCard.dataset.id ||
//     productCard.querySelector('.product-name')?.textContent.trim();

//   if (!productId) return;

//   const product = {
//     id: productId,
//     name: productCard.querySelector('.product-name')?.textContent.trim() || '',
//     price: productCard.querySelector('.current-price')?.textContent.trim() || '',
//     image: productCard.querySelector('.product-image')?.src || '',
//     quantity: 1,
//   };

//   const existingIndex = cart.findIndex(item => item.id === product.id);

//   if (existingIndex !== -1) {
//     cart[existingIndex].quantity += 1;
//     showNotification('🛒 Quantity updated in cart!');
//   } else {
//     cart.push(product);
//     showNotification('✓ Added to cart!');
//   }

//   saveCartToStorage();
//   updateCartCount();


//   removeItemFromWishlistById(productId);
// }


document.addEventListener('DOMContentLoaded', () => {
  checkWishlistStatus();
  checkProductDetailWishlistStatus();
  renderWishlistPage();
  updateCartCount();
  updateWishlistCount();

  const checkHeaderLoaded = setInterval(() => {
    const countElement = document.getElementById('wishlistCount');
    if (countElement) {
      updateWishlistCount();
      clearInterval(checkHeaderLoaded);
    }
  }, 100);
  let tries = 0;
  const iv = setInterval(() => {
    checkProductDetailWishlistStatus();
    tries += 1;
    if (tries >= 10) clearInterval(iv);
  }, 200);
});

function showWishlistSkeleton(count = 3) {
  const skeleton = document.getElementById("wishlistSkeleton");
  if (!skeleton) return;

  skeleton.innerHTML = "";

  for (let i = 0; i < count; i++) {
    skeleton.innerHTML += `
      <div class="grid grid-cols-6 gap-4 p-6 animate-pulse">
        <div class="h-16 w-16 bg-gray-300 rounded-md"></div>

        <div class="col-span-2">
          <div class="h-4 w-40 bg-gray-300 mb-2 rounded"></div>
          <div class="h-4 w-24 bg-gray-200 rounded"></div>
        </div>

        <div class="h-4 w-20 bg-gray-300 rounded"></div>

        <div class="h-4 w-24 bg-gray-300 rounded"></div>

        <div class="h-10 w-28 bg-gray-300 rounded-md"></div>
      </div>
    `;
  }

  skeleton.classList.remove("hidden");
}

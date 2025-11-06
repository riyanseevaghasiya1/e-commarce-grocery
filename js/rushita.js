fetch('./header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header-placeholder').innerHTML = data;

    initializeHeader();
    renderCartItems();
    updateCartCount();

    window.updateQuantity = updateQuantity;
  })
  .catch(error => console.error('Error loading header:', error));


fetch('./Footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer_add').innerHTML = data;
  })
  .catch(error => console.error('Error loading footer:', error));

function initializeHeader() {
  const menuToggle = document.getElementById('menuToggle');
  const closeMenu = document.getElementById('closeMenu');
  const offcanvas = document.getElementById('offcanvas');
  const offcanvasPanel = document.getElementById('offcanvasPanel');
  const backdrop = document.getElementById('backdrop');

  const cartButton = document.getElementById('cartButton');
  const closeCart = document.getElementById('closeCart');
  const overlay = document.getElementById('overlay');
  const cartOffcanvas = document.getElementById('cartOffcanvas');


  if (menuToggle && closeMenu && offcanvas && offcanvasPanel && backdrop) {
    menuToggle.addEventListener('click', () => {
      offcanvas.classList.remove('hidden');
      setTimeout(() => offcanvasPanel.classList.remove('-translate-x-full'), 10);
      document.body.style.overflow = 'hidden';
    });

    const closeMenuFunc = () => {
      offcanvasPanel.classList.add('-translate-x-full');
      setTimeout(() => {
        offcanvas.classList.add('hidden');
        document.body.style.overflow = '';
      }, 300);
    };

    closeMenu.addEventListener('click', closeMenuFunc);
    backdrop.addEventListener('click', closeMenuFunc);
  }


  if (cartButton && closeCart && overlay && cartOffcanvas) {
    cartButton.addEventListener('click', () => {
      overlay.classList.remove('hidden');
      cartOffcanvas.classList.remove('translate-x-full');
      document.body.style.overflow = 'hidden';
      renderCartItems();
    });

    const closeCartFunc = () => {
      overlay.classList.add('hidden');
      cartOffcanvas.classList.add('translate-x-full');
      document.body.style.overflow = 'auto';
    };

    closeCart.addEventListener('click', closeCartFunc);
    overlay.addEventListener('click', closeCartFunc);
    document.addEventListener('keydown', e => e.key === 'Escape' && closeCartFunc());
  }
}

function renderCartItems() {
  const cartData = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('cartItems');
  const subtotalEl = document.getElementById('subtotal');
  if (!cartContainer || !subtotalEl) return;

  cartContainer.innerHTML = '';
  let subtotal = 0;

  if (cartData.length === 0) {
    cartContainer.innerHTML = `<div class="text-center text-gray-500 py-10">Your cart is empty.</div>`;
    subtotalEl.textContent = "$0.00";
    return;
  }

  cartData.forEach((item, index) => {
    const name = item.name || "Unnamed Product";
    const priceText = item.price || "$0.00";
    const priceValue = parseFloat(priceText.replace(/[^0-9.]/g, "")) || 0;
    const image = item.image || "https://via.placeholder.com/100";
    const quantity = item.quantity || 1;
    const total = priceValue * quantity;
    subtotal += total;

    const itemHTML = `
      <div class="mb-6 border-b pb-4">
        <div class="flex gap-4 items-center">
          <img src="${image}" alt="${name}" class="w-20 h-20 object-cover rounded-lg">

          <div class="flex-1">
            <h3 class="font-semibold text-gray-800 mb-1">${name}</h3>
            <p class="text-sm text-gray-500 mb-3">Unit price: ${priceText}</p>

            <div class="flex items-center gap-3">
              <button data-index="${index}" data-change="-1" class="qty-btn w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
                <i class="fas fa-minus text-xs text-gray-600"></i>
              </button>
              <span class="text-gray-800 font-medium w-8 text-center qty-value">${quantity}</span>
              <button data-index="${index}" data-change="1" class="qty-btn w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
                <i class="fas fa-plus text-xs text-gray-600"></i>
              </button>
            </div>
          </div>

          <div class="text-right">
            <p class="font-bold text-gray-800 text-lg item-total">$${total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    `;
    cartContainer.insertAdjacentHTML("beforeend", itemHTML);
  });

  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;

  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const index = parseInt(btn.getAttribute('data-index'));
      const change = parseInt(btn.getAttribute('data-change'));
      updateQuantity(index, change, btn);
    });
  });
}

function updateQuantity(index, change, btnElement) {
  let cartData = JSON.parse(localStorage.getItem('cart')) || [];
  if (!cartData[index]) return;

  cartData[index].quantity = (cartData[index].quantity || 1) + change;

  if (cartData[index].quantity < 1) {
    cartData.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartData));
    renderCartItems();
    updateCartCount();
    return;
  }

  localStorage.setItem('cart', JSON.stringify(cartData));

  // Update display IMMEDIATELY - FIXED SELECTORS
  if (btnElement) {
    // Find the quantity span and update it
    const qtyContainer = btnElement.parentElement;
    const qtyValueEl = qtyContainer.querySelector('.qty-value');
    if (qtyValueEl) {
      qtyValueEl.textContent = cartData[index].quantity;
    }

    // Find the item total price and update it
    const mainContainer = btnElement.closest('.flex.gap-4.items-center');
    const itemTotalEl = mainContainer.querySelector('.item-total');
    const priceText = cartData[index].price || "$0.00";
    const priceValue = parseFloat(priceText.replace(/[^0-9.]/g, "")) || 0;
    if (itemTotalEl) {
      itemTotalEl.textContent = `$${(priceValue * cartData[index].quantity).toFixed(2)}`;
    }
  }

  updateSubtotal();
  updateCartCount();
}

function updateSubtotal() {
  const cartData = JSON.parse(localStorage.getItem('cart')) || [];
  const subtotalEl = document.getElementById('subtotal');
  if (!subtotalEl) return;
  const subtotal = cartData.reduce((sum, item) => {
    const priceValue = parseFloat((item.price || '').replace(/[^0-9.]/g, "")) || 0;
    return sum + priceValue * (item.quantity || 1);
  }, 0);
  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
}

function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  if (!cartCount) return;
  const cartData = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cartData.reduce((sum, item) => sum + (item.quantity || 1), 0);
  cartCount.textContent = totalItems;
}

(function () {
  function closestByClass(el, cls) {
    while (el && el !== document) {
      if (el.classList && el.classList.contains(cls)) return el;
      el = el.parentNode;
    }
    return null;
  }

  document.addEventListener('click', function (ev) {
    const toggle = ev.target.closest('.mobile-accordion-toggle');
    if (!toggle) return; 

    const accordion = closestByClass(toggle, 'mobile-accordion');
    if (!accordion) {
      console.warn('mobile-accordion-toggle clicked but parent .mobile-accordion not found');
      return;
    }

    const content = accordion.querySelector('.mobile-accordion-content');
    const icon = toggle.querySelector('i');

    if (!content) {
      console.warn('mobile-accordion-content not found for', accordion);
      return;
    }
    ev.preventDefault();

    const isOpen = !content.classList.contains('hidden');

    document.querySelectorAll('.mobile-accordion-content').forEach((c) => {
      if (c !== content) c.classList.add('hidden');
    });
    document.querySelectorAll('.mobile-accordion-toggle i').forEach((ic) => {
      if (ic !== icon) ic.classList.remove('rotate-180');
    });

    if (isOpen) {
      content.classList.add('hidden');
      if (icon) icon.classList.remove('rotate-180');
    } else {
      content.classList.remove('hidden');
      if (icon) icon.classList.add('rotate-180');
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    const found = document.querySelectorAll('.mobile-accordion').length;
    if (found === 0) {
      console.warn('No .mobile-accordion elements found on page — check your HTML or script placement.');
    } else {
      console.info('Mobile accordions found:', found);
    }
  });
})();



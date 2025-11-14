
let discount = 0;


fetch('./header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header-placeholder').innerHTML = data;
    initializeHeader();
    renderCartItems();
    updateCartCount();
    setupProceedToCheckout();
     const header = document.getElementById("myHeader");
    if (header) {
      const stickyOffset = header.offsetTop;
      window.addEventListener("scroll", () => {
        if (window.pageYOffset > stickyOffset) {
          header.classList.add("sticky");
        } else {
          header.classList.remove("sticky");
        }
      });
    }
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

// ========== Calculate Cart Totals ==========
function calculateTotals() {
  const cartData = JSON.parse(localStorage.getItem("cart")) || [];
  
  const originalTotal = cartData.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0;
    return sum + price * (item.quantity || 1);
  }, 0);

  return {
    original: originalTotal,
    final: originalTotal
  };
}

// ========== Render Cart Items ==========
function renderCartItems() {
  const cartItemsContainer = document.getElementById("cartItems");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="text-gray-500 text-center py-4">Your cart is empty 🛒</p>`;
  } else {
    cart.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("flex", "items-center", "justify-between", "mb-4");

      itemDiv.innerHTML = `
        <div class="flex items-center space-x-4">
          <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg border">
          <div>
            <h3 class="font-semibold text-gray-800">${item.name}</h3>
            <p class="text-sm text-gray-600">${item.price}</p>
          </div>
        </div>
        <div class="flex items-center">
          <button class="decrement bg-gray-200 px-2 py-1 rounded" data-index="${index}">−</button>
          <span class="mx-2">${item.quantity}</span>
          <button class="increment bg-gray-200 px-2 py-1 rounded" data-index="${index}">+</button>
        </div>
      `;
      cartItemsContainer.appendChild(itemDiv);
    });
  }

  attachQuantityHandlers();
  updateCartSummary();
}

// ========== Quantity Handlers ==========
function attachQuantityHandlers() {
  document.querySelectorAll(".increment").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart[index].quantity++;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartItems();
      updateCartCount();
    });
  });

  document.querySelectorAll(".decrement").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        cart.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartItems();
      updateCartCount();
    });
  });
}

// ========== Update Cart Summary ==========
function updateCartSummary() {
  const totals = calculateTotals();
  const summaryEl = document.getElementById("cartSummary");

  if (summaryEl) {
    summaryEl.innerHTML = `
      <div class="text-gray-700">
        <p class="flex justify-between font-semibold text-lg">
          <span>Subtotal:</span> 
          <span class="text-teal-600">$${totals.final.toFixed(2)}</span>
        </p>
      </div>
    `;
  }

  console.log(' UPDATED:', {
    subtotal: `$${totals.final.toFixed(2)}`
  });
}

// ========== Checkout Setup ==========
function setupProceedToCheckout() {
  const proceedBtn = document.getElementById("proceedCheckoutBtn");
  if (!proceedBtn) return;

  const newBtn = proceedBtn.cloneNode(true);
  proceedBtn.parentNode.replaceChild(newBtn, proceedBtn);

  newBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartData.length === 0) {
      alert("🛒 Your cart is empty!");
      return;
    }
    
    localStorage.setItem("checkoutCart", JSON.stringify(cartData));
    window.location.href = "./checkout.html";
  });
}

// ========== Cart Count ==========
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  if (!cartCount) return;
  const cartData = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cartData.reduce((sum, item) => sum + (item.quantity || 1), 0);
  cartCount.textContent = totalItems;
}

  document.addEventListener('click', function (e) {
      // Find nearest toggle button
      const toggle = e.target.closest('.mobile-accordion-toggle');
      if (!toggle) return;

      const accordion = toggle.closest('.mobile-accordion');
      if (!accordion) return;

      const content = accordion.querySelector('.mobile-accordion-content');
      const icon = toggle.querySelector('i');

      // Toggle Tailwind 'hidden'
      const opened = toggle.getAttribute('aria-expanded') === 'true';
      if (opened) {
        content.classList.add('hidden');
        toggle.setAttribute('aria-expanded', 'false');
        if (icon) icon.classList.remove('rotate-180');
      } else {
        content.classList.remove('hidden');
        toggle.setAttribute('aria-expanded', 'true');
        if (icon) icon.classList.add('rotate-180');
      }
    });



     window.onscroll = function() {
      myFunction();
    };

    // var header = document.getElementById("myHeader");
    // var stickyOffset = header.offsetTop; // Get the initial offset of the header

    // function myFunction() {
    //   if (window.pageYOffset > stickyOffset) {
    //     header.classList.add("sticky");
    //   } else {
    //     header.classList.remove("sticky");
    //   }
    // }
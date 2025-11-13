let discount = 0;

// Check if header needs to be loaded dynamically or is already in page
document.addEventListener('DOMContentLoaded', function() {
  const headerPlaceholder = document.getElementById('header-placeholder');
  
  if (headerPlaceholder) {
    // Load header dynamically
    fetch('./header.html')
      .then(response => response.text())
      .then(data => {
        headerPlaceholder.innerHTML = data;
        initializeEverything();
      })
      .catch(error => console.error('Error loading header:', error));

    // Load footer
    const footerPlaceholder = document.getElementById('footer_add');
    if (footerPlaceholder) {
      fetch('./Footer.html')
        .then(response => response.text())
        .then(data => {
          footerPlaceholder.innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
    }
  } else {
    // Header is already in the page, just initialize
    console.log('Header already in page, initializing...');
    initializeEverything();
  }
});

// Combined initialization function
function initializeEverything() {
  initializeHeader();
  initializeCurrency();
  initializeUserMenu();
  renderCartItems();
  updateCartCount();
  setupProceedToCheckout();
}

// ========== Initialize Header ==========
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

  // Mobile accordion
  document.addEventListener('click', function (e) {
    const toggle = e.target.closest('.mobile-accordion-toggle');
    if (!toggle) return;

    const accordion = toggle.closest('.mobile-accordion');
    if (!accordion) return;

    const content = accordion.querySelector('.mobile-accordion-content');
    const icon = toggle.querySelector('i');

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
  if (!cartItemsContainer) return;
  
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
            <p class="text-sm text-gray-600 current-price">${item.price}</p>
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
          <span class="text-teal-600 current-price">$${totals.final.toFixed(2)}</span>
        </p>
      </div>
    `;
  }

  // Also update subtotal in cart offcanvas
  const subtotalEl = document.getElementById("subtotal");
  if (subtotalEl) {
    subtotalEl.textContent = `$${totals.final.toFixed(2)}`;
  }

  console.log('Cart Updated:', {
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

// ========== CURRENCY SYSTEM - SINGLE CLEAN VERSION ==========
let currentCurrency = {
  code: 'USD',
  symbol: '$',
  rate: 1.00
};

function loadCurrency() {
  const saved = localStorage.getItem('selectedCurrency');
  if (saved) {
    currentCurrency = JSON.parse(saved);
    const selectedCurrencyEl = document.getElementById('selectedCurrency');
    if (selectedCurrencyEl) {
      selectedCurrencyEl.textContent = currentCurrency.code;
    }
    const mobileSelect = document.getElementById('mobileCurrencySelect');
    if (mobileSelect) {
      mobileSelect.value = currentCurrency.code;
    }
  }
}

function changeCurrency(code, symbol, rate) {
  console.log('changeCurrency called:', code, symbol, rate); // Debug
  currentCurrency = { code, symbol, rate };
  localStorage.setItem('selectedCurrency', JSON.stringify(currentCurrency));
  
  const selectedCurrencyEl = document.getElementById('selectedCurrency');
  if (selectedCurrencyEl) {
    selectedCurrencyEl.textContent = code;
  }
  
  const mobileSelect = document.getElementById('mobileCurrencySelect');
  if (mobileSelect) {
    mobileSelect.value = code;
  }
  
  // Dispatch custom event for price updates
  window.dispatchEvent(new CustomEvent('currencyChanged', { detail: currentCurrency }));
  
  // Close dropdown using 'show' class
  const dropdown = document.getElementById('currencyDropdown');
  if (dropdown) {
    console.log('Closing dropdown'); // Debug
    dropdown.classList.remove('show');
  }
}

function initializeCurrency() {
  console.log('initializeCurrency called'); // Debug
  loadCurrency();
  
  // Mobile currency select handler
  const mobileSelect = document.getElementById('mobileCurrencySelect');
  if (mobileSelect) {
    mobileSelect.addEventListener('change', function (e) {
      const selected = e.target.selectedOptions[0];
      const code = selected.value;
      const rate = parseFloat(selected.dataset.rate);
      const symbol = '';

// ========== USER AUTHENTICATION SYSTEM ==========
let isLoggedIn = false;

function checkLoginStatus() {
  const user = localStorage.getItem('currentUser');
  if (user) {
    isLoggedIn = true;
    showUserMenu();
  } else {
    isLoggedIn = false;
    showLoginButton();
  }
}

function showUserMenu() {
  const loginBtn = document.getElementById('loginBtn');
  const userMenuContainer = document.getElementById('userMenuContainer');
  const mobileLoginBtn = document.getElementById('mobileLoginBtn');
  const mobileUserMenu = document.getElementById('mobileUserMenu');
  
  if (loginBtn) loginBtn.classList.add('hidden');
  if (userMenuContainer) userMenuContainer.classList.remove('hidden');
  if (mobileLoginBtn) mobileLoginBtn.classList.add('hidden');
  if (mobileUserMenu) mobileUserMenu.classList.remove('hidden');
}

function showLoginButton() {
  const loginBtn = document.getElementById('loginBtn');
  const userMenuContainer = document.getElementById('userMenuContainer');
  const mobileLoginBtn = document.getElementById('mobileLoginBtn');
  const mobileUserMenu = document.getElementById('mobileUserMenu');
  
  if (loginBtn) loginBtn.classList.remove('hidden');
  if (userMenuContainer) userMenuContainer.classList.add('hidden');
  if (mobileLoginBtn) mobileLoginBtn.classList.remove('hidden');
  if (mobileUserMenu) mobileUserMenu.classList.add('hidden');
}

function handleLogout() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('currentUser');
    isLoggedIn = false;
    showLoginButton();
    alert('Logged out successfully!');
  }
}

function initializeUserMenu() {
  checkLoginStatus();
  
  // Login button handlers
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', function () {
      window.location.href = './login.html';
    });
  }

  const mobileLoginBtn = document.getElementById('mobileLoginBtn');
  if (mobileLoginBtn) {
    mobileLoginBtn.addEventListener('click', function () {
      window.location.href = './login.html';
    });
  }

  // User dropdown toggle
  const userMenuBtn = document.getElementById('userMenuBtn');
  if (userMenuBtn) {
    userMenuBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      const dropdown = document.getElementById('userDropdown');
      if (dropdown) {
        dropdown.classList.toggle('show');
      }
    });
  }
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function (e) {
    const userDropdown = document.getElementById('userDropdown');
    if (userDropdown && !e.target.closest('#userMenuBtn')) {
      userDropdown.classList.remove('show');
    }
  });
}

// ========== EXPOSE FUNCTIONS GLOBALLY ==========
window.getCurrentCurrency = function() {
  return currentCurrency;
};

window.convertPrice = function(price) {
  return (price * currentCurrency.rate).toFixed(2);
};

window.formatPrice = function(price) {
  return currentCurrency.symbol + window.convertPrice(price);
};

window.handleLogout = handleLogout;
window.changeCurrency = changeCurrency; // Make it globally accessible for onclick;
      changeCurrency(code, symbol, rate);
    });
  }

  // Currency dropdown toggle - DESKTOP - FIXED VERSION
  const currencyBtn = document.getElementById('currencyBtn');
  if (currencyBtn) {
    console.log('Currency button found, attaching listener'); // Debug
    
    // Remove any existing listeners by cloning
    const newCurrencyBtn = currencyBtn.cloneNode(true);
    currencyBtn.parentNode.replaceChild(newCurrencyBtn, currencyBtn);
    
    newCurrencyBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      
      const dropdown = document.getElementById('currencyDropdown');
      console.log('Click detected! Dropdown:', dropdown); // Debug
      
      if (dropdown) {
        const isVisible = dropdown.classList.contains('show');
        console.log('Current state - show class:', isVisible); // Debug
        
        if (isVisible) {
          dropdown.classList.remove('show');
          console.log('Removed show class'); // Debug
        } else {
          dropdown.classList.add('show');
          console.log('Added show class'); // Debug
        }
        
        // Force inline styles as backup
        if (dropdown.classList.contains('show')) {
          dropdown.style.display = 'block';
          dropdown.style.opacity = '1';
          dropdown.style.visibility = 'visible';
          console.log('Applied inline styles'); // Debug
        } else {
          dropdown.style.display = 'none';
          dropdown.style.opacity = '0';
          dropdown.style.visibility = 'hidden';
        }
      } else {
        console.log('Dropdown element not found!'); // Debug
      }
    });
  } else {
    console.log('Currency button not found!'); // Debug
  }
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function (e) {
    const currencyDropdown = document.getElementById('currencyDropdown');
    const currencyBtn = document.getElementById('currencyBtn');
    
    if (currencyDropdown && currencyBtn && !currencyBtn.contains(e.target) && !currencyDropdown.contains(e.target)) {
      currencyDropdown.classList.remove('show');
      currencyDropdown.style.display = 'none';
      currencyDropdown.style.opacity = '0';
      currencyDropdown.style.visibility = 'hidden';
    }
  });
}

// ========== USER AUTHENTICATION SYSTEM ==========
let isLoggedIn = false;

function checkLoginStatus() {
  const user = localStorage.getItem('currentUser');
  if (user) {
    isLoggedIn = true;
    showUserMenu();
  } else {
    isLoggedIn = false;
    showLoginButton();
  }
}

function showUserMenu() {
  const loginBtn = document.getElementById('loginBtn');
  const userMenuContainer = document.getElementById('userMenuContainer');
  const mobileLoginBtn = document.getElementById('mobileLoginBtn');
  const mobileUserMenu = document.getElementById('mobileUserMenu');
  
  if (loginBtn) loginBtn.classList.add('hidden');
  if (userMenuContainer) userMenuContainer.classList.remove('hidden');
  if (mobileLoginBtn) mobileLoginBtn.classList.add('hidden');
  if (mobileUserMenu) mobileUserMenu.classList.remove('hidden');
}

function showLoginButton() {
  const loginBtn = document.getElementById('loginBtn');
  const userMenuContainer = document.getElementById('userMenuContainer');
  const mobileLoginBtn = document.getElementById('mobileLoginBtn');
  const mobileUserMenu = document.getElementById('mobileUserMenu');
  
  if (loginBtn) loginBtn.classList.remove('hidden');
  if (userMenuContainer) userMenuContainer.classList.add('hidden');
  if (mobileLoginBtn) mobileLoginBtn.classList.remove('hidden');
  if (mobileUserMenu) mobileUserMenu.classList.add('hidden');
}

function handleLogout() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('currentUser');
    isLoggedIn = false;
    showLoginButton();
    alert('Logged out successfully!');
  }
}

function initializeUserMenu() {
  checkLoginStatus();
  
  // Login button handlers
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', function () {
      window.location.href = './login.html';
    });
  }

  const mobileLoginBtn = document.getElementById('mobileLoginBtn');
  if (mobileLoginBtn) {
    mobileLoginBtn.addEventListener('click', function () {
      window.location.href = './login.html';
    });
  }

  // User dropdown toggle
  const userMenuBtn = document.getElementById('userMenuBtn');
  if (userMenuBtn) {
    userMenuBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      const dropdown = document.getElementById('userDropdown');
      if (dropdown) {
        dropdown.classList.toggle('show');
      }
    });
  }
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function (e) {
    const userDropdown = document.getElementById('userDropdown');
    if (userDropdown && !e.target.closest('#userMenuBtn')) {
      userDropdown.classList.remove('show');
    }
  });
}

// ========== EXPOSE FUNCTIONS GLOBALLY ==========
window.getCurrentCurrency = function() {
  return currentCurrency;
};

window.convertPrice = function(price) {
  return (price * currentCurrency.rate).toFixed(2);
};

window.formatPrice = function(price) {
  return currentCurrency.symbol + window.convertPrice(price);
};

window.handleLogout = handleLogout;



window.changeCurrency = changeCurrency; // Make it globally accessible for onclick



// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// === GLOBAL PRICE UPDATE LISTENER ===
window.addEventListener('currencyChanged', function (e) {
  const { symbol, rate } = e.detail;
  
  document.querySelectorAll('.current-price').forEach(priceEl => {
    const basePrice = parseFloat(priceEl.dataset.basePrice || priceEl.textContent.replace(/[^0-9.]/g, ''));
    priceEl.dataset.basePrice = basePrice; // Store original USD price once
    priceEl.textContent = symbol + (basePrice * rate).toFixed(2);
  });
});

// category filter
document.addEventListener('click', function (e) {
    const link = e.target.closest('.category-link');
    if (link) {
        e.preventDefault();
        const category = link.dataset.category;
        localStorage.setItem('selectedCategory', category);
        window.location.href = './Shop.html';
    }
});




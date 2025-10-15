// ============================
//  rushita.js (FINAL FIXED FOR CART)
// ============================

// Load header dynamically
fetch('./header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header-placeholder').innerHTML = data;

    // ==============================
    // Header Elements
    // ==============================
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const offcanvas = document.getElementById('offcanvas');
    const offcanvasPanel = document.getElementById('offcanvasPanel');
    const backdrop = document.getElementById('backdrop');

    // ==============================
    // Offcanvas (Mobile Menu)
    // ==============================
    function openOffcanvas() {
      offcanvas.classList.remove('hidden');
      setTimeout(() => {
        offcanvasPanel.classList.remove('-translate-x-full');
      }, 10);
      document.body.style.overflow = 'hidden';
    }

    function closeOffcanvas() {
      offcanvasPanel.classList.add('-translate-x-full');
      setTimeout(() => {
        offcanvas.classList.add('hidden');
        document.body.style.overflow = '';
      }, 300);
    }

    if (menuToggle) menuToggle.addEventListener('click', openOffcanvas);
    if (closeMenu) closeMenu.addEventListener('click', closeOffcanvas);
    if (backdrop) backdrop.addEventListener('click', closeOffcanvas);

    // ==============================
    // Dropdown Hover (Desktop)
    // ==============================
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('a');
      const menu = dropdown.querySelector('.dropdown-menu');
      if (!toggle || !menu) return;

      dropdown.addEventListener('mouseenter', () => {
        menu.classList.remove('hidden');
        toggle.classList.add('border-emerald-500');
        toggle.classList.remove('border-transparent');
      });

      dropdown.addEventListener('mouseleave', () => {
        menu.classList.add('hidden');
        toggle.classList.remove('border-emerald-500');
        toggle.classList.add('border-transparent');
      });

      toggle.addEventListener('click', e => e.preventDefault());
    });

    // ==============================
    // Mobile Accordion
    // ==============================
    const accordions = document.querySelectorAll('.mobile-accordion');
    accordions.forEach(accordion => {
      const toggle = accordion.querySelector('.mobile-accordion-toggle');
      const content = accordion.querySelector('.mobile-accordion-content');
      const icon = toggle.querySelector('i');

      toggle.addEventListener('click', () => {
        const isOpen = !content.classList.contains('hidden');

        // Close all others
        accordions.forEach(other => {
          const otherContent = other.querySelector('.mobile-accordion-content');
          const otherIcon = other.querySelector('.mobile-accordion-toggle i');
          otherContent.classList.add('hidden');
          otherIcon.classList.remove('rotate-180');
        });

        // Toggle current
        if (isOpen) {
          content.classList.add('hidden');
          icon.classList.remove('rotate-180');
        } else {
          content.classList.remove('hidden');
          icon.classList.add('rotate-180');
        }
      });
    });

    // ==============================
    // ✅ CART OFFCANVAS (Moved inside header load)
    // ==============================
    const cartButton = document.getElementById('cartButton');
    const closeCart = document.getElementById('closeCart');
    const overlay = document.getElementById('overlay');
    const cartOffcanvas = document.getElementById('cartOffcanvas');
    const quantityElement = document.getElementById('quantity');
    const itemTotalElement = document.getElementById('itemTotal');
    const subtotalElement = document.getElementById('subtotal');
    const cartCount = document.getElementById('cartCount');

    if (cartButton && closeCart && overlay && cartOffcanvas) {
      let quantity = 2;
      const unitPrice = 35.00;

      function openCart() {
        overlay.classList.remove('hidden');
        cartOffcanvas.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden';
      }

      function closeCartFunc() {
        overlay.classList.add('hidden');
        cartOffcanvas.classList.add('translate-x-full');
        document.body.style.overflow = 'auto';
      }

      function updateTotals() {
        const total = quantity * unitPrice;
        quantityElement.textContent = quantity;
        itemTotalElement.textContent = `$${total.toFixed(2)}`;
        subtotalElement.textContent = `$${total.toFixed(2)}`;
        cartCount.textContent = quantity;
      }

      function increaseQuantity() {
        quantity++;
        updateTotals();
      }

      function decreaseQuantity() {
        if (quantity > 1) {
          quantity--;
          updateTotals();
        }
      }

      cartButton.addEventListener('click', openCart);
      closeCart.addEventListener('click', closeCartFunc);
      overlay.addEventListener('click', closeCartFunc);
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeCartFunc();
      });

      updateTotals();
    }
  })
  .catch(error => console.error('Error loading header:', error));


// ============================
// FOOTER
// ============================
fetch('./Footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer_add').innerHTML = data;
  })
  .catch(error => console.error('Error loading footer:', error));


// ============================
// PAYMENT METHOD LOGIC
// ============================
const netBankingOption = document.getElementById("netbankingOption");
const upiOption = document.getElementById("upiOption");
const bankList = document.getElementById("bankList");
const upiField = document.getElementById("upiField");
const paymentRadios = document.querySelectorAll('input[name="payment"]');

paymentRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (netBankingOption.checked) {
      bankList.classList.remove("hidden");
    } else {
      bankList.classList.add("hidden");
    }

    if (upiOption.checked) {
      upiField.classList.remove("hidden");
    } else {
      upiField.classList.add("hidden");
    }
  });
});

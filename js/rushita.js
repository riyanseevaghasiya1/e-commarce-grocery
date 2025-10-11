// ============================
//  rushita.js (FINAL WORKING)
// ============================

// Load header dynamically
fetch('./header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header-placeholder').innerHTML = data;

    // ==============================
    // Select Elements After Loading
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

    // ✅ Safe Event Bindings (with null check)
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
  })
  .catch(error => console.error('Error loading header:', error));
// footer
  fetch('./Footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer_add').innerHTML = data;
  })
  .catch(error => console.error('Error loading footer:', error));

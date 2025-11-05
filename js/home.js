/* ============================================
   HOME.JS - COMPLETE UPDATED VERSION
   With Circular Category Slider & Dots Below Names
   ============================================ */

// ==========================================
// SHOP BY CATEGORY SLIDER - DOTS BELOW NAMES
// ==========================================

let shopCurrentSlide = 0;
const shopTrack = document.getElementById('shopCategoriesTrack');
const shopItems = document.querySelectorAll('.shop-category-item');
const shopTotalItems = shopItems.length;

// Get number of visible items based on screen width
function getShopVisibleItems() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1200) return 8;      // Desktop: 8 items
    if (screenWidth >= 992) return 6;       // Tablet Landscape: 6 items
    if (screenWidth >= 768) return 5;       // Tablet: 5 items
    if (screenWidth >= 576) return 4;       // Mobile Large: 4 items
    if (screenWidth >= 481) return 3;       // Mobile Medium: 3 items
    return 2;                               // Mobile Small: 2 items
}

// Calculate maximum slide position
function getShopMaxSlide() {
    const visibleItems = getShopVisibleItems();
    return Math.max(0, shopTotalItems - visibleItems);
}

// Create dots navigation
function createShopDots() {
    const dotsContainer = document.getElementById('categoryDots');
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    const totalDots = getShopMaxSlide() + 1;
    
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('span');
        dot.className = 'shop-dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToShopSlide(i));
        dotsContainer.appendChild(dot);
    }
}

// Update dots
function updateShopDots() {
    const dots = document.querySelectorAll('.shop-dot');
    dots.forEach((dot, index) => {
        if (index === shopCurrentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Go to specific slide
function goToShopSlide(slideIndex) {
    const maxSlide = getShopMaxSlide();
    shopCurrentSlide = Math.max(0, Math.min(slideIndex, maxSlide));
    updateShopSlidePosition();
}

// Update slide position
function updateShopSlidePosition() {
    if (!shopTrack || shopItems.length === 0) return;
    
    const itemWidth = shopItems[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(shopTrack).gap) || 30;
    const slideAmount = shopCurrentSlide * (itemWidth + gap);
    
    shopTrack.style.transform = `translateX(-${slideAmount}px)`;
    updateShopDots();
}

// Auto slide function
let autoSlideInterval;

function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(() => {
        const maxSlide = getShopMaxSlide();
        if (shopCurrentSlide >= maxSlide) {
            shopCurrentSlide = 0;
        } else {
            shopCurrentSlide++;
        }
        updateShopSlidePosition();
    }, 3000);
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
}

// Click animation for category items
shopItems.forEach((item) => {
    item.addEventListener('click', function() {
        const categoryName = this.querySelector('.shop-category-name').textContent;
        console.log(`Selected category: ${categoryName}`);
        
        // Visual feedback
        this.style.transform = 'scale(0.95) translateY(-10px)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// Touch swipe support
let shopTouchStartX = 0;
let shopTouchEndX = 0;

if (shopTrack) {
    shopTrack.addEventListener('touchstart', function(e) {
        shopTouchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    }, { passive: true });

    shopTrack.addEventListener('touchend', function(e) {
        shopTouchEndX = e.changedTouches[0].screenX;
        handleShopSwipe();
        startAutoSlide();
    }, { passive: true });
}

function handleShopSwipe() {
    const swipeThreshold = 50;
    const diff = shopTouchStartX - shopTouchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        const maxSlide = getShopMaxSlide();
        if (diff > 0) {
            shopCurrentSlide = Math.min(shopCurrentSlide + 1, maxSlide);
        } else {
            shopCurrentSlide = Math.max(shopCurrentSlide - 1, 0);
        }
        updateShopSlidePosition();
    }
}

// Mouse drag support for desktop
let shopIsDragging = false;
let shopStartX;
let shopScrollLeft;

if (shopTrack) {
    shopTrack.addEventListener('mousedown', function(e) {
        shopIsDragging = true;
        shopStartX = e.pageX - shopTrack.offsetLeft;
        shopScrollLeft = shopCurrentSlide;
        shopTrack.style.cursor = 'grabbing';
        stopAutoSlide();
    });

    shopTrack.addEventListener('mouseleave', function() {
        shopIsDragging = false;
        shopTrack.style.cursor = 'grab';
        startAutoSlide();
    });

    shopTrack.addEventListener('mouseup', function() {
        shopIsDragging = false;
        shopTrack.style.cursor = 'grab';
        startAutoSlide();
    });

    shopTrack.addEventListener('mousemove', function(e) {
        if (!shopIsDragging) return;
        e.preventDefault();
        
        const x = e.pageX - shopTrack.offsetLeft;
        const walk = (x - shopStartX) * 2;
        
        const itemWidth = shopItems[0].offsetWidth + 30;
        const draggedSlides = Math.round(-walk / itemWidth);
        const newSlide = Math.max(0, Math.min(shopScrollLeft + draggedSlides, getShopMaxSlide()));
        
        if (newSlide !== shopCurrentSlide) {
            shopCurrentSlide = newSlide;
            updateShopSlidePosition();
        }
    });
    
    shopTrack.style.cursor = 'grab';
}

// Pause auto-slide on hover
if (shopTrack) {
    shopTrack.parentElement.addEventListener('mouseenter', stopAutoSlide);
    shopTrack.parentElement.addEventListener('mouseleave', startAutoSlide);
}

// ==========================================
// PRODUCTS SLIDER NAVIGATION
// ==========================================

function scrollProducts(sliderId, direction) {
    const slider = document.getElementById(sliderId);
    if (!slider) return;
    
    const productCard = slider.querySelector('.product-card');
    if (!productCard) return;
    
    const cardWidth = productCard.offsetWidth;
    const gap = 20;
    const scrollAmount = (cardWidth + gap) * 1;
    
    slider.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

// ==========================================
// QUICK VIEW MODAL
// ==========================================

window.openQuickView = function(button) {
    console.log('Opening Quick View...');
    
    const productCard = button.closest('.product-card');
    if (!productCard) {
        console.error('Product card not found!');
        return;
    }
    
    const productImage = productCard.querySelector('.product-image');
    const productName = productCard.querySelector('.product-name');
    const productPrice = productCard.querySelector('.current-price');

    const modal = document.getElementById('quickViewModal');
    
    if (!modal) {
        console.error('Modal not found!');
        return;
    }

    const modalImage = document.getElementById('modalProductImage');
    const modalName = document.getElementById('modalProductName');
    const modalPrice = document.getElementById('modalProductPrice');
    const quantityInput = document.getElementById('quantityInput');

    if (modalImage && productImage) {
        modalImage.src = productImage.src;
        modalImage.alt = productName ? productName.textContent : 'Product';
    }
    
    if (modalName && productName) {
        modalName.textContent = productName.textContent;
    }
    
    if (modalPrice && productPrice) {
        modalPrice.textContent = productPrice.textContent;
    }
    
    if (quantityInput) {
        quantityInput.value = 1;
    }

    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    document.body.style.overflow = 'hidden';
    console.log('Modal opened successfully');
};

window.closeQuickView = function() {
    console.log('Closing Quick View...');
    
    const modal = document.getElementById('quickViewModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        document.body.style.overflow = 'auto';
    }
};

// ==========================================
// QUANTITY CONTROLS
// ==========================================

window.increaseQuantity = function() {
    const input = document.getElementById('quantityInput');
    if (input) {
        const currentValue = parseInt(input.value) || 1;
        input.value = Math.min(currentValue + 1, 99);
    }
};

window.decreaseQuantity = function() {
    const input = document.getElementById('quantityInput');
    if (input) {
        const currentValue = parseInt(input.value) || 1;
        input.value = Math.max(currentValue - 1, 1);
    }
};

// ==========================================
// ADD TO CART FROM MODAL
// ==========================================

window.addToCartFromModal = function() {
  const productNameEl = document.getElementById('modalProductName');
  const productPriceEl = document.getElementById('modalProductPrice');
  const productImageEl = document.getElementById('modalProductImage');
  const quantityInput = document.getElementById('quantityInput');

  if (!productNameEl || !productPriceEl || !productImageEl) {
    console.error('❌ Missing modal product info!');
    return;
  }

  const product = {
    name: productNameEl.textContent.trim(),
    price: productPriceEl.textContent.trim(),
    image: productImageEl.src,
    quantity: parseInt(quantityInput?.value || 1)
  };

  console.log('🛒 Adding from Quick View:', product);

  // === Same logic as your addToCart() ===
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.name === product.name);

  if (existing) {
    existing.quantity += product.quantity;
  } else {
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  // Update UI
  if (typeof updateCartCount === 'function') updateCartCount();
  if (typeof showNotification === 'function') showNotification('Item added to cart');

  // Close modal
  closeQuickView();
};

// ==========================================
// WINDOW RESIZE HANDLER
// ==========================================

let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        const maxSlide = getShopMaxSlide();
        if (shopCurrentSlide > maxSlide) {
            shopCurrentSlide = maxSlide;
        }
        createShopDots();
        updateShopSlidePosition();
    }, 250);
});

// ==========================================
// KEYBOARD NAVIGATION
// ==========================================

document.addEventListener('keydown', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
    }
    
    const modal = document.getElementById('quickViewModal');
    
    if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
        closeQuickView();
        return;
    }
    
    if (!modal || !modal.classList.contains('show')) {
        const maxSlide = getShopMaxSlide();
        
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            stopAutoSlide();
            shopCurrentSlide = Math.max(shopCurrentSlide - 1, 0);
            updateShopSlidePosition();
            startAutoSlide();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            stopAutoSlide();
            shopCurrentSlide = Math.min(shopCurrentSlide + 1, maxSlide);
            updateShopSlidePosition();
            startAutoSlide();
        }
    }
});

// ==========================================
// DOM CONTENT LOADED - INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', function () {
    console.log('==========================================');
    console.log('Grocery Store - Home Page Initialized');
    console.log('==========================================');
    console.log(`Total Categories: ${shopTotalItems}`);
    console.log(`Visible Categories: ${getShopVisibleItems()}`);
    console.log(`Max Slides: ${getShopMaxSlide()}`);
    console.log('==========================================');

    // Initialize dots navigation
    createShopDots();
    updateShopSlidePosition();
    
    // Start auto-slide
    startAutoSlide();

    const modal = document.getElementById('quickViewModal');
    if (!modal) {
        console.error('⚠️ Quick View Modal not found! Check HTML.');
    } else {
        console.log('✓ Modal found and ready');
        
        modal.addEventListener('click', function (e) {
            if (e.target === this) {
                closeQuickView();
            }
        });
    }

    // Product sliders drag functionality
    const sliders = document.querySelectorAll('.products-slider');

    sliders.forEach(slider => {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.style.cursor = 'grabbing';
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });

        slider.style.cursor = 'grab';
    });

    // Collection cards click handler
    const collectionCards = document.querySelectorAll('.collection-card');
    collectionCards.forEach(card => {
        card.addEventListener('click', function () {
            const title = this.querySelector('.collection-title').textContent;
            console.log(`Collection selected: ${title}`);
        });
    });

    // Feature cards click handler
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('click', function (e) {
            if (e.target.tagName !== 'A') {
                const title = this.querySelector('.feature-title').textContent;
                console.log(`Feature selected: ${title}`);
            }
        });
    });

    // Quantity input validation
    const quantityInput = document.getElementById('quantityInput');
    if (quantityInput) {
        quantityInput.addEventListener('input', function () {
            let value = parseInt(this.value);
            if (isNaN(value) || value < 1) this.value = 1;
            if (value > 99) this.value = 99;
        });

        quantityInput.addEventListener('blur', function () {
            if (this.value === '' || isNaN(this.value)) {
                this.value = 1;
            }
        });
    }

    // Prevent default for demo links
    const demoLinks = document.querySelectorAll('a[href="#"]');
    demoLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
        });
    });

    // Scroll reveal animation
    revealOnScroll();
    
    console.log('==========================================');
    console.log('✓ All event listeners attached');
    console.log('✓ Sliders initialized');
    console.log('✓ Dots navigation created (below names)');
    console.log('✓ Auto-slide started');
    console.log('✓ Modal ready');
    console.log('==========================================');
});

// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================

function revealOnScroll() {
    const elements = document.querySelectorAll('.collection-card, .feature-card, .product-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}

// ==========================================
// WISHLIST & CART FUNCTIONS
// ==========================================

// window.addToWishlist = function(button) {
//     const productCard = button.closest('.product-card');
//     if (productCard) {
//         const productName = productCard.querySelector('.product-name').textContent;
//         console.log(`Added "${productName}" to wishlist!`);
        
//         button.style.transform = 'scale(1.2)';
//         setTimeout(() => {
//             button.style.transform = '';
//         }, 200);
        
//         // wishlist.js ma actual logic add thase
//     }
// };

// window.addToCart = function(button) {
//     const productCard = button.closest('.product-card');
//     if (productCard) {
//         const productName = productCard.querySelector('.product-name').textContent;
//         console.log(`Added "${productName}" to cart!`);
        
//         button.style.transform = 'scale(1.2)';
//         setTimeout(() => {
//             button.style.transform = '';
//         }, 200);
        
//         // addtocart.js ma actual logic add thase
//     }
// };

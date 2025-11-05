/* ============================================
   HOME.JS - Complete Fixed JavaScript
   ============================================ */

// ==========================================
// SHOP BY CATEGORY SLIDER
// ==========================================

let shopCurrentSlide = 0;
const shopTrack = document.getElementById('shopCategoriesTrack');
const shopItems = document.querySelectorAll('.shop-category-item');
const shopTotalItems = shopItems.length;

function getShopVisibleItems() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1200) return 8;
    if (screenWidth >= 992) return 6;
    if (screenWidth >= 768) return 5;
    if (screenWidth >= 576) return 4;
    return 3;
}

function getShopMaxSlide() {
    const visibleItems = getShopVisibleItems();
    return Math.max(0, shopTotalItems - visibleItems);
}

function updateShopSlidePosition() {
    if (!shopTrack || shopItems.length === 0) return;
    
    const itemWidth = shopItems[0].offsetWidth;
    const gap = 20;
    const slideAmount = shopCurrentSlide * (itemWidth + gap);
    
    shopTrack.style.transform = `translateX(-${slideAmount}px)`;
}

function slideShopCategories(direction) {
    const maxSlide = getShopMaxSlide();
    
    shopCurrentSlide += direction;
    
    if (shopCurrentSlide < 0) {
        shopCurrentSlide = 0;
    }
    if (shopCurrentSlide > maxSlide) {
        shopCurrentSlide = maxSlide;
    }
    
    updateShopSlidePosition();
}

shopItems.forEach((item, index) => {
    item.addEventListener('click', function() {
        const categoryName = this.querySelector('.shop-category-name').textContent;
        console.log(`Clicked on ${categoryName} category`);
        
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

let shopTouchStartX = 0;
let shopTouchEndX = 0;

if (shopTrack) {
    shopTrack.addEventListener('touchstart', function(e) {
        shopTouchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    shopTrack.addEventListener('touchend', function(e) {
        shopTouchEndX = e.changedTouches[0].screenX;
        handleShopSwipe();
    }, { passive: true });
}

function handleShopSwipe() {
    const swipeThreshold = 50;
    const diff = shopTouchStartX - shopTouchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            slideShopCategories(1);
        } else {
            slideShopCategories(-1);
        }
    }
}

let shopIsDragging = false;
let shopStartX;
let shopScrollLeft;

if (shopTrack) {
    shopTrack.addEventListener('mousedown', function(e) {
        shopIsDragging = true;
        shopStartX = e.pageX - shopTrack.offsetLeft;
        shopScrollLeft = shopCurrentSlide;
        shopTrack.style.cursor = 'grabbing';
    });

    shopTrack.addEventListener('mouseleave', function() {
        shopIsDragging = false;
        shopTrack.style.cursor = 'grab';
    });

    shopTrack.addEventListener('mouseup', function() {
        shopIsDragging = false;
        shopTrack.style.cursor = 'grab';
    });

    shopTrack.addEventListener('mousemove', function(e) {
        if (!shopIsDragging) return;
        e.preventDefault();
        
        const x = e.pageX - shopTrack.offsetLeft;
        const walk = (x - shopStartX) * 2;
        
        const itemWidth = shopItems[0].offsetWidth + 20;
        const draggedSlides = Math.round(-walk / itemWidth);
        const newSlide = Math.max(0, Math.min(shopScrollLeft + draggedSlides, getShopMaxSlide()));
        
        if (newSlide !== shopCurrentSlide) {
            shopCurrentSlide = newSlide;
            updateShopSlidePosition();
        }
    });
    
    shopTrack.style.cursor = 'grab';
}

// ==========================================
// PRODUCTS SLIDER NAVIGATION
// ==========================================

function scrollProducts(sliderId, direction) {
    const slider = document.getElementById(sliderId);
    if (!slider) return;
    
    const scrollAmount = 270;
    slider.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

// ==========================================
// QUICK VIEW MODAL - FIXED VERSION
// ==========================================

window.openQuickView = function(button) {
    console.log('=== Quick View Opening ===');
    
    const productCard = button.closest('.product-card');
    if (!productCard) {
        console.error('Product card not found!');
        return;
    }
    
    const productImage = productCard.querySelector('.product-image');
    const productName = productCard.querySelector('.product-name');
    const productPrice = productCard.querySelector('.current-price');

    console.log('Product found:', {
        name: productName ? productName.textContent : 'N/A',
        price: productPrice ? productPrice.textContent : 'N/A',
        hasImage: !!productImage
    });

    const modal = document.getElementById('quickViewModal');
    
    if (!modal) {
        console.error('Modal element #quickViewModal not found in HTML!');
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

    // Force display modal
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    document.body.style.overflow = 'hidden';
    
    console.log('Modal displayed successfully');
};

window.closeQuickView = function() {
    console.log('=== Quick View Closing ===');
    
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
        input.value = currentValue + 1;
    }
};

window.decreaseQuantity = function() {
    const input = document.getElementById('quantityInput');
    if (input) {
        const currentValue = parseInt(input.value) || 1;
        if (currentValue > 1) {
            input.value = currentValue - 1;
        }
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
            updateShopSlidePosition();
        }
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
    }
    
    if (!modal || !modal.classList.contains('show')) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            slideShopCategories(-1);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            slideShopCategories(1);
        }
    }
});

// ==========================================
// DOM CONTENT LOADED
// ==========================================

document.addEventListener('DOMContentLoaded', function () {
    console.log('==========================================');
    console.log('Grocery Store - Home Page Initialized');
    console.log('==========================================');
    console.log(`Shop Categories: ${shopTotalItems}`);
    console.log(`Visible Shop Items: ${getShopVisibleItems()}`);
    console.log('==========================================');

    // Check if modal exists
    const modal = document.getElementById('quickViewModal');
    if (!modal) {
        console.error('⚠️ Quick View Modal not found! Check HTML structure.');
    } else {
        console.log('✓ Modal found in DOM');
        
        // Click outside to close
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

    // Collection cards click
    const collectionCards = document.querySelectorAll('.collection-card');
    collectionCards.forEach(card => {
        card.addEventListener('click', function () {
            const title = this.querySelector('.collection-title').textContent;
            console.log(`Collection clicked: ${title}`);
        });
    });

    // Feature cards click
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('click', function (e) {
            if (e.target.tagName !== 'A') {
                const title = this.querySelector('.feature-title').textContent;
                console.log(`Feature clicked: ${title}`);
            }
        });
    });

    // Quantity input validation
    const quantityInput = document.getElementById('quantityInput');
    if (quantityInput) {
        quantityInput.addEventListener('input', function () {
            if (this.value < 1) this.value = 1;
            if (this.value > 99) this.value = 99;
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
    console.log('All event listeners attached successfully');
    console.log('==========================================');
});

// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================

function revealOnScroll() {
    const elements = document.querySelectorAll('.collection-card, .feature-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}

// ==========================================
// WISHLIST & CART FUNCTIONS (Keep for external files)
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
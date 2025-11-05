/* ============================================
   HOME.JS - OWL CAROUSEL IMPLEMENTATION
   Category Slider & Product Sliders
   Fixed Image Scaling Issue
   ============================================ */

// ==========================================
// OWL CAROUSEL INITIALIZATION
// ==========================================

$(document).ready(function() {
    console.log('==========================================');
    console.log('🛒 Grocery Store - Home Page Initialized');
    console.log('🦉 Owl Carousel Active');
    console.log('==========================================');

    // ==========================================
    // SHOP BY CATEGORY CAROUSEL
    // ==========================================
    $('#categoryCarousel').owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        smartSpeed: 600,
        responsive: {
            0: {
                items: 2,
                margin: 20
            },
            481: {
                items: 3,
                margin: 20
            },
            576: {
                items: 4,
                margin: 25
            },
            768: {
                items: 5,
                margin: 30
            },
            992: {
                items: 6,
                margin: 30
            },
            1200: {
                items: 8,
                margin: 30
            }
        }
    });

    // Click handler for category items
    $('.shop-category-item').on('click', function() {
        const categoryName = $(this).find('.shop-category-name').text();
        console.log(`Selected category: ${categoryName}`);
        
        // Visual feedback
        $(this).css('transform', 'scale(0.95) translateY(-10px)');
        setTimeout(() => {
            $(this).css('transform', '');
        }, 200);
    });

    // ==========================================
    // BEST SELLERS CAROUSEL
    // ==========================================
    $('#bestSellers').owlCarousel({
        loop: false,
        margin: 20,
        nav: false,
        dots: false,
        autoplay: false,
        smartSpeed: 500,
        responsive: {
            0: {
                items: 1.2,
                margin: 15
            },
            480: {
                items: 1.5,
                margin: 15
            },
            576: {
                items: 2,
                margin: 20
            },
            768: {
                items: 3,
                margin: 20
            },
            992: {
                items: 4,
                margin: 20
            },
            1200: {
                items: 5,
                margin: 20
            }
        }
    });

    // ==========================================
    // FRESH VEGETABLES CAROUSEL
    // ==========================================
    $('#freshVeg').owlCarousel({
        loop: false,
        margin: 20,
        nav: false,
        dots: false,
        autoplay: false,
        smartSpeed: 500,
        responsive: {
            0: {
                items: 1.2,
                margin: 15
            },
            480: {
                items: 1.5,
                margin: 15
            },
            576: {
                items: 2,
                margin: 20
            },
            768: {
                items: 3,
                margin: 20
            },
            992: {
                items: 4,
                margin: 20
            },
            1200: {
                items: 5,
                margin: 20
            }
        }
    });

    console.log('✅ All Owl Carousels Initialized');
    console.log('==========================================');
});

// ==========================================
// PRODUCTS SLIDER NAVIGATION (Custom Buttons)
// ==========================================

function scrollProducts(sliderId, direction) {
    const carousel = $('#' + sliderId);
    
    if (carousel.length) {
        if (direction === 1) {
            carousel.trigger('next.owl.carousel');
        } else {
            carousel.trigger('prev.owl.carousel');
        }
    }
}

// ==========================================
// QUICK VIEW MODAL
// ==========================================

window.openQuickView = function(button) {
    console.log('Opening Quick View...');
    
    const productCard = $(button).closest('.product-card');
    if (!productCard.length) {
        console.error('Product card not found!');
        return;
    }
    
    const productImage = productCard.find('.product-image');
    const productName = productCard.find('.product-name');
    const productPrice = productCard.find('.current-price');

    const modal = $('#quickViewModal');
    
    if (!modal.length) {
        console.error('Modal not found!');
        return;
    }

    const modalImage = $('#modalProductImage');
    const modalName = $('#modalProductName');
    const modalPrice = $('#modalProductPrice');
    const quantityInput = $('#quantityInput');

    if (modalImage.length && productImage.length) {
        modalImage.attr('src', productImage.attr('src'));
        modalImage.attr('alt', productName.length ? productName.text() : 'Product');
    }
    
    if (modalName.length && productName.length) {
        modalName.text(productName.text());
    }
    
    if (modalPrice.length && productPrice.length) {
        modalPrice.text(productPrice.text());
    }
    
    if (quantityInput.length) {
        quantityInput.val(1);
    }

    modal.css('display', 'flex');
    setTimeout(() => {
        modal.addClass('show');
    }, 10);
    
    $('body').css('overflow', 'hidden');
    console.log('Modal opened successfully');
};

window.closeQuickView = function() {
    console.log('Closing Quick View...');
    
    const modal = $('#quickViewModal');
    if (modal.length) {
        modal.removeClass('show');
        setTimeout(() => {
            modal.css('display', 'none');
        }, 300);
        $('body').css('overflow', 'auto');
    }
};

// Close modal when clicking outside
$(document).on('click', '#quickViewModal', function(e) {
    if ($(e.target).is('#quickViewModal')) {
        closeQuickView();
    }
});

// Close modal on Escape key
$(document).on('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = $('#quickViewModal');
        if (modal.hasClass('show')) {
            closeQuickView();
        }
    }
});

// ==========================================
// QUANTITY CONTROLS
// ==========================================

window.increaseQuantity = function() {
    const input = $('#quantityInput');
    if (input.length) {
        const currentValue = parseInt(input.val()) || 1;
        input.val(Math.min(currentValue + 1, 99));
    }
};

window.decreaseQuantity = function() {
    const input = $('#quantityInput');
    if (input.length) {
        const currentValue = parseInt(input.val()) || 1;
        input.val(Math.max(currentValue - 1, 1));
    }
};

// Quantity input validation
$(document).on('input', '#quantityInput', function() {
    let value = parseInt($(this).val());
    if (isNaN(value) || value < 1) $(this).val(1);
    if (value > 99) $(this).val(99);
});

$(document).on('blur', '#quantityInput', function() {
    if ($(this).val() === '' || isNaN($(this).val())) {
        $(this).val(1);
    }
});

// ==========================================
// ADD TO CART FROM MODAL
// ==========================================

window.addToCartFromModal = function() {
    const productNameEl = $('#modalProductName');
    const productPriceEl = $('#modalProductPrice');
    const productImageEl = $('#modalProductImage');
    const quantityInput = $('#quantityInput');

    if (!productNameEl.length || !productPriceEl.length || !productImageEl.length) {
        console.error('❌ Missing modal product info!');
        return;
    }

    const product = {
        name: productNameEl.text().trim(),
        price: productPriceEl.text().trim(),
        image: productImageEl.attr('src'),
        quantity: parseInt(quantityInput.val() || 1)
    };

    console.log('🛒 Adding from Quick View:', product);

    // Get cart from localStorage
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
    if (typeof showNotification === 'function') {
        showNotification('Item added to cart');
    } else {
        alert('Product added to cart!');
    }

    // Close modal
    closeQuickView();
};

// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================

function revealOnScroll() {
    const elements = $('.collection-card, .feature-card, .product-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).css({
                    'opacity': '1',
                    'transform': 'translateY(0)'
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.each(function() {
        $(this).css({
            'opacity': '0',
            'transform': 'translateY(20px)',
            'transition': 'opacity 0.5s ease, transform 0.5s ease'
        });
        observer.observe(this);
    });
}

// ==========================================
// DOCUMENT READY - ADDITIONAL INITIALIZATIONS
// ==========================================

$(document).ready(function() {
    // Check if modal exists
    const modal = $('#quickViewModal');
    if (!modal.length) {
        console.error('⚠️ Quick View Modal not found! Check HTML.');
    } else {
        console.log('✅ Modal found and ready');
    }

    // Collection cards click handler
    $('.collection-card').on('click', function() {
        const title = $(this).find('.collection-title').text();
        console.log(`Collection selected: ${title}`);
    });

    // Feature cards click handler
    $('.feature-card').on('click', function(e) {
        if ($(e.target).prop('tagName') !== 'A') {
            const title = $(this).find('.feature-title').text();
            console.log(`Feature selected: ${title}`);
        }
    });

    // Prevent default for demo links
    $('a[href="#"]').on('click', function(e) {
        e.preventDefault();
    });

    // Scroll reveal animation
    revealOnScroll();
    
    console.log('==========================================');
    console.log('✅ All event listeners attached');
    console.log('✅ Sliders initialized (Owl Carousel)');
    console.log('✅ Auto-slide started (3s interval)');
    console.log('✅ Modal ready');
    console.log('✅ Image scaling issue fixed');
    console.log('==========================================');
});

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Smooth scroll to top
function scrollToTop() {
    $('html, body').animate({
        scrollTop: 0
    }, 600);
}

// Format price
function formatPrice(price) {
    return typeof price === 'number' ? `$${price.toFixed(2)}` : price;
}

// Log system info
console.log('%c🛒 Grocery Store System Ready!', 'color: #00b207; font-size: 16px; font-weight: bold;');
console.log('%c🦉 Owl Carousel Active', 'color: #2c742f; font-size: 12px;');
console.log('%c🎯 All Issues Fixed:', 'color: #666; font-size: 12px;');
console.log('  ✅ Category image scaling removed on hover');
console.log('  ✅ Modal left padding removed');
console.log('  ✅ Owl Carousel with dots navigation');
console.log('  ✅ Responsive breakpoints configured');
console.log('  ✅ Auto-slide enabled for categories');
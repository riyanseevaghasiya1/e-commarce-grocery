 $(document).ready(function() {
            // Category Carousel - Custom Implementation
            initializeCategorySlider();

            // Best Sellers Carousel
            var bestSellersCarousel = $('#bestSellers').owlCarousel({
                loop: false,
                margin: 20,
                nav: false,
                dots: false,
                autoplay: false,
                responsive: {
                    0: {
                        items: 1
                    },
                    480: {
                        items: 2
                    },
                    768: {
                        items: 3
                    },
                    992: {
                        items: 4
                    },
                    1200: {
                        items: 4
                    }
                }
            });

            // deal of the day
            var freshVegCarousel = $('#freshVeg').owlCarousel({
                loop: false,
                margin: 20,
                nav: false,
                dots: false,
                autoplay: false,
                responsive: {
                    0: {
                        items: 1
                    },
                    480: {
                        items: 2
                    },
                    768: {
                        items: 3
                    },
                    992: {
                        items: 4
                    },
                    1200: {
                        items: 5
                    }
                }
            });

            // Custom Navigation Buttons - Now handled by scrollProducts function

            // Category Item Click Animation
            $('.shop-category-item').click(function() {
                var categoryName = $(this).find('.shop-category-name').text();
                console.log('Selected category: ' + categoryName);
                
                $(this).css('transform', 'scale(0.95) translateY(-10px)');
                setTimeout(() => {
                    $(this).css('transform', '');
                }, 200);
            });
        });


        
        // Quick View Modal Functions
        function openQuickView(button) {
            const productCard = button.closest('.product-card');
            const productImage = productCard.querySelector('.product-image');
            const productName = productCard.querySelector('.product-name');
            const productPrice = productCard.querySelector('.current-price');

            const modal = document.getElementById('quickViewModal');
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
        }

        function closeQuickView() {
            const modal = document.getElementById('quickViewModal');
            if (modal) {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
                document.body.style.overflow = 'auto';
            }
        }

        // Quantity Controls
        function increaseQuantity() {
            const input = document.getElementById('quantityInput');
            if (input) {
                const currentValue = parseInt(input.value) || 1;
                input.value = Math.min(currentValue + 1, 99);
            }
        }

        function decreaseQuantity() {
            const input = document.getElementById('quantityInput');
            if (input) {
                const currentValue = parseInt(input.value) || 1;
                input.value = Math.max(currentValue - 1, 1);
            }
        }

        // Add to Cart from Modal
        function addToCartFromModal() {
            const productName = document.getElementById('modalProductName');
            const quantity = document.getElementById('quantityInput');
            
            if (productName && quantity) {
                console.log(`Added ${quantity.value}x "${productName.textContent}" to cart!`);
                
                const btn = document.querySelector('.modal-add-to-cart');
                if (btn) {
                    const originalText = btn.innerHTML;
                    btn.innerHTML = '<i class="fas fa-check"></i> Added!';
                    btn.style.background = '#10b981';
                    
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.background = '';
                    }, 1500);
                }
                
                setTimeout(() => {
                    closeQuickView();
                }, 1500);
            }
        }

        // Add to Wishlist - This function is now in wishlist.js
        // Keeping this as a fallback if wishlist.js is not loaded
        if (typeof window.addToWishlist === 'undefined') {
            window.addToWishlist = function(button) {
                const productCard = button.closest('.product-card');
                if (productCard) {
                    const productName = productCard.querySelector('.product-name').textContent;
                    console.log(`❤️ Added "${productName}" to wishlist!`);
                    
                    const icon = button.querySelector('i');
                    if (icon) {
                        icon.classList.remove('far');
                        icon.classList.add('fas');
                        button.style.color = '#ff6b6b';
                    }
                    
                    button.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        button.style.transform = '';
                    }, 200);
                }
            };
        }

        // Add to Cart - This function is now in wishlist.js
        // Keeping this as a fallback if wishlist.js is not loaded
        if (typeof window.addToCart === 'undefined') {
            window.addToCart = function(button) {
                const productCard = button.closest('.product-card');
                if (productCard) {
                    const productName = productCard.querySelector('.product-name').textContent;
                    const productPrice = productCard.querySelector('.current-price').textContent;
                    console.log(`🛒 Added "${productName}" (${productPrice}) to cart!`);
                    
                    button.style.transform = 'scale(1.2)';
                    button.style.background = '#10b981';
                    button.style.color = 'white';
                    
                    setTimeout(() => {
                        button.style.transform = '';
                        button.style.background = '';
                        button.style.color = '';
                    }, 300);
                }
            };
        }

        // Modal Close on Outside Click
        document.getElementById('quickViewModal')?.addEventListener('click', function(e) {
            if (e.target === this) {
                closeQuickView();
            }
        });

        // Keyboard Navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const modal = document.getElementById('quickViewModal');
                if (modal && modal.classList.contains('show')) {
                    closeQuickView();
                }
            }
        });

        // Quantity Input Validation
        const quantityInput = document.getElementById('quantityInput');
        if (quantityInput) {
            quantityInput.addEventListener('input', function() {
                let value = parseInt(this.value);
                if (isNaN(value) || value < 1) this.value = 1;
                if (value > 99) this.value = 99;
            });

            quantityInput.addEventListener('blur', function() {
                if (this.value === '' || isNaN(this.value)) {
                    this.value = 1;
                }
            });
        }

        // Hero Button Actions
        document.querySelectorAll('.hero-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                console.log('Explore More clicked');
            });
        });

        // Feature Cards Click Handler
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('click', function(e) {
                if (e.target.tagName !== 'A') {
                    const title = this.querySelector('.feature-title').textContent;
                    console.log(`Feature selected: ${title}`);
                }
            });
        });

        // Collection Cards Click Handler
        document.querySelectorAll('.collection-card').forEach(card => {
            card.addEventListener('click', function() {
                const title = this.querySelector('.collection-title').textContent;
                console.log(`Collection selected: ${title}`);
            });
        });

        // Prevent Default for Demo Links
        document.querySelectorAll('a[href="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
            });
        });

        // Scroll Reveal Animation
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

        // Initialize Scroll Reveal
        revealOnScroll();

        // Add click handlers to product cards for viewing product details
        // This will be called again after Owl Carousel initializes
        setupProductCardClicks();

// ==========================================
// SETUP PRODUCT CARD CLICKS
// ==========================================
function setupProductCardClicks() {
        // Add click handlers to all product cards
        document.querySelectorAll('.product-card').forEach(card => {
        // Skip if already has click handler
        if (card.dataset.clickHandlerAdded === 'true') {
            return;
        }
        
        // Mark as having click handler
        card.dataset.clickHandlerAdded = 'true';
        
        // Ensure buttons stop propagation
        const buttons = card.querySelectorAll('button, .action-btn, .add-to-cart');
        buttons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        });
        
        // Add click handler to card
        card.addEventListener('click', function(e) {
            // Don't navigate if clicking on buttons, links, or action buttons
            if (e.target.closest('button') || 
                e.target.closest('a') || 
                e.target.closest('.product-actions') ||
                e.target.closest('.action-btn') ||
                e.target.closest('.add-to-cart')) {
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            handleProductCardClick(this);
        });
    });
}

// Re-setup clicks after Owl Carousel initializes (in case it recreates elements)
$(document).ready(function() {
    // Setup clicks after a short delay to ensure Owl Carousel has initialized
    setTimeout(() => {
        setupProductCardClicks();
    }, 500);
    
    // Also setup clicks when Owl Carousel is ready
    if (typeof $.fn.owlCarousel !== 'undefined') {
        $('#bestSellers, #freshVeg').on('initialized.owl.carousel', function() {
            setTimeout(() => {
                setupProductCardClicks();
            }, 100);
        });
    }
});

// ==========================================
// PRODUCT CARD CLICK HANDLER
// ==========================================
function handleProductCardClick(cardElement) {
    // Get product name from the card
    const productNameElement = cardElement.querySelector('.product-name');
    if (!productNameElement) {
        console.error('Product name not found in card');
        return;
    }
    
    const productName = productNameElement.textContent.trim();
    
    // Find matching product in allProducts array
    if (typeof allProducts !== 'undefined' && allProducts.length > 0) {
        // Try exact match first
        let productIndex = allProducts.findIndex(p => p.name === productName);
        
        // If no exact match, try partial match
        if (productIndex === -1) {
            productIndex = allProducts.findIndex(p => 
                p.name.toLowerCase().includes(productName.toLowerCase()) ||
                productName.toLowerCase().includes(p.name.toLowerCase())
            );
        }
        
        // If still no match, try to create product data from card
        if (productIndex === -1) {
            const productImage = cardElement.querySelector('.product-image');
            const productPrice = cardElement.querySelector('.current-price');
            const oldPriceElement = cardElement.querySelector('.old-price');
            const ratingElement = cardElement.querySelector('.stars');
            
            // Create product object from card data
            const productData = {
                name: productName,
                price: productPrice ? productPrice.textContent.trim() : '$0.00',
                oldPrice: oldPriceElement ? oldPriceElement.textContent.trim() : '',
                img: productImage ? productImage.src : '',
                rating: ratingElement ? ratingElement.textContent.trim() : '★★★★☆',
                badge: '',
                category: 'Vegetables',
                sku: 'HOME-' + Date.now(),
                description: `${productName} - Fresh and organic product delivered right to your doorstep. Our products are carefully selected to ensure the highest quality and freshness.`
            };
            
            // Store directly and navigate
            sessionStorage.setItem('selectedProductData', JSON.stringify(productData));
            window.location.href = './ProductDetails.html';
            return;
        }
        
        // Found matching product, use viewProductDetails function
        if (typeof viewProductDetails === 'function') {
            viewProductDetails(productIndex);
        } else {
            console.error('viewProductDetails function not found');
        }
    } else {
        console.error('allProducts array not loaded');
        // Fallback: navigate anyway with card data
        const productImage = cardElement.querySelector('.product-image');
        const productPrice = cardElement.querySelector('.current-price');
        const oldPriceElement = cardElement.querySelector('.old-price');
        const ratingElement = cardElement.querySelector('.stars');
        
        const productData = {
            name: productName,
            price: productPrice ? productPrice.textContent.trim() : '$0.00',
            oldPrice: oldPriceElement ? oldPriceElement.textContent.trim() : '',
            img: productImage ? productImage.src : '',
            rating: ratingElement ? ratingElement.textContent.trim() : '★★★★☆',
            badge: '',
            category: 'Vegetables',
            sku: 'HOME-' + Date.now(),
            description: `${productName} - Fresh and organic product delivered right to your doorstep.`
        };
        
        sessionStorage.setItem('selectedProductData', JSON.stringify(productData));
        window.location.href = './ProductDetails.html';
    }
};

// ==========================================
// CATEGORY SLIDER - CUSTOM IMPLEMENTATION
// ==========================================
function initializeCategorySlider() {
    const track = document.getElementById('shopCategoriesTrack');
    const dotsContainer = document.getElementById('categoryDots');
    if (!track || !dotsContainer) {
        console.warn('Category slider elements not found');
        return;
    }

    const items = track.querySelectorAll('.shop-category-item');
    if (items.length === 0) return;

    let itemsPerView = getItemsPerView();
    const totalItems = items.length;
    let totalPages = Math.ceil(totalItems / itemsPerView);
    let currentPage = 0;
    let autoPlayInterval = null;

    function getItemsPerView() {
        const width = window.innerWidth;
        if (width >= 1200) return 8;
        if (width >= 992) return 6;
        if (width >= 768) return 5;
        if (width >= 576) return 4;
        if (width >= 481) return 3;
        return 2;
    }

    function updateSlider() {
        itemsPerView = getItemsPerView();
        totalPages = Math.ceil(totalItems / itemsPerView);
        if (currentPage >= totalPages) currentPage = Math.max(0, totalPages - 1);
        
        // Update item widths
        const itemWidth = 100 / itemsPerView;
        items.forEach(item => {
            item.style.flex = `0 0 ${itemWidth}%`;
        });
        
        // Recreate dots
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('button');
            dot.className = 'category-dot' + (i === currentPage ? ' active' : '');
            dot.setAttribute('data-page', i);
            dot.setAttribute('aria-label', `Go to page ${i + 1}`);
            dot.addEventListener('click', () => goToPage(i));
            dotsContainer.appendChild(dot);
        }
        
        goToPage(currentPage);
    }

    function goToPage(page) {
        currentPage = Math.max(0, Math.min(page, totalPages - 1));
        const offset = -(currentPage * (100 / itemsPerView));
        track.style.transform = `translateX(${offset}%)`;
        
        // Update dots
        dotsContainer.querySelectorAll('.category-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentPage);
        });
    }

    function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(() => {
            const nextPage = (currentPage + 1) % totalPages;
            goToPage(nextPage);
        }, 4000);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    // Initialize
    updateSlider();
    startAutoPlay();

    // Pause on hover
    const wrapper = track.closest('.shop-category-wrapper');
    if (wrapper) {
        wrapper.addEventListener('mouseenter', stopAutoPlay);
        wrapper.addEventListener('mouseleave', startAutoPlay);
    }

    // Responsive update
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateSlider();
            startAutoPlay();
        }, 250);
    });
}

// ==========================================
// SCROLL PRODUCTS FUNCTION
// ==========================================
function scrollProducts(sliderId, direction) {
    const slider = document.getElementById(sliderId);
    if (!slider) return;

    // Check if Owl Carousel is initialized
    if (typeof $ !== 'undefined' && $(slider).hasClass('owl-carousel')) {
        if (direction === -1) {
            $(slider).trigger('prev.owl.carousel');
        } else {
            $(slider).trigger('next.owl.carousel');
        }
    } else {
        // Fallback: manual scroll
        const scrollAmount = slider.offsetWidth * 0.8;
        slider.scrollBy({
            left: direction * scrollAmount,
            behavior: 'smooth'
        });
    }
}

// CSS is now in home.css file

console.log('✅ Home.js loaded successfully!');
console.log('✅ Grocery Store - Owl Carousel Version Loaded Successfully!');







